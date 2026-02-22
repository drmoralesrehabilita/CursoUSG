-- Migration para el Sistema de Contenido, Cuestionarios y Progreso

-- 1. Crear tipo de lección en `lessons` (opcional, pero ayuda a clasificar si es video, doc, o quiz)
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS lesson_type VARCHAR(50) DEFAULT 'video'; -- 'video', 'document', 'quiz'
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS is_master_camera BOOLEAN DEFAULT true;

-- 2. Tabla de Cuestionarios (Quizzes)
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    min_score_to_pass INTEGER DEFAULT 80,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Quizzes son visibles para usuarios autenticados." ON public.quizzes;
CREATE POLICY "Quizzes son visibles para usuarios autenticados."
  ON public.quizzes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins pueden gestionar quizzes." ON public.quizzes;
CREATE POLICY "Admins pueden gestionar quizzes."
  ON public.quizzes FOR ALL
  TO authenticated
  USING ( EXISTS ( SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin' ) );

-- 3. Tabla de Preguntas (Questions)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Ej: [{"id":"A", "text":"Opción 1"}, {"id":"B", "text":"Opción 2"}]
    correct_option_id TEXT NOT NULL,
    score INTEGER DEFAULT 1,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Preguntas son visibles para usuarios autenticados." ON public.questions;
CREATE POLICY "Preguntas son visibles para usuarios autenticados."
  ON public.questions FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins pueden gestionar preguntas." ON public.questions;
CREATE POLICY "Admins pueden gestionar preguntas."
  ON public.questions FOR ALL
  TO authenticated
  USING ( EXISTS ( SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin' ) );

-- 4. Tabla de Progreso de Lecciones (Lesson Progress)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER, -- Null si no es un quiz
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver su propio progreso." ON public.lesson_progress;
CREATE POLICY "Usuarios pueden ver su propio progreso."
  ON public.lesson_progress FOR SELECT
  TO authenticated
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Usuarios pueden insertar/actualizar su propio progreso." ON public.lesson_progress;
CREATE POLICY "Usuarios pueden insertar/actualizar su propio progreso."
  ON public.lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK ( auth.uid() = user_id );
  
DROP POLICY IF EXISTS "Usuarios pueden actualizar su propio progreso." ON public.lesson_progress;
CREATE POLICY "Usuarios pueden actualizar su propio progreso."
  ON public.lesson_progress FOR UPDATE
  TO authenticated
  USING ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Admins pueden ver todo el progreso." ON public.lesson_progress;
CREATE POLICY "Admins pueden ver todo el progreso."
  ON public.lesson_progress FOR SELECT
  TO authenticated
  USING ( EXISTS ( SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin' ) );

-- 5. Trigger para actualizar el progreso del Enrollment automáticamente
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_module_id UUID;
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_progress_percent INTEGER;
    v_all_modules_completed BOOLEAN;
    v_course_id UUID; -- Si aplicara a un curso superior
BEGIN
    -- Obtener el module_id correspondiente a la lección
    SELECT module_id INTO v_module_id FROM public.lessons WHERE id = NEW.lesson_id;

    -- Contar el total de lecciones de ese módulo
    SELECT COUNT(*) INTO v_total_lessons FROM public.lessons WHERE module_id = v_module_id AND is_published = true;

    -- Contar las lecciones completadas por el usuario en ese módulo
    SELECT COUNT(*) INTO v_completed_lessons 
    FROM public.lesson_progress lp
    JOIN public.lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = NEW.user_id AND l.module_id = v_module_id AND lp.is_completed = true AND l.is_published = true;

    -- Calcular porcentaje
    IF v_total_lessons > 0 THEN
        v_progress_percent := (v_completed_lessons * 100) / v_total_lessons;
    ELSE
        v_progress_percent := 0;
    END IF;

    -- Actualizar enrollments
    UPDATE public.enrollments 
    SET progress = v_progress_percent,
        status = CASE WHEN v_progress_percent = 100 THEN 'completed' ELSE status END
    WHERE user_id = NEW.user_id AND module_id = v_module_id;

    -- (Opcional) Trigger para certificado global si todos los módulos llegaron a 100%
    -- Se insertaría lógica aquí para checar si el promedio de todos enrollments de ese usuario es 100
    SELECT bool_and(progress = 100) INTO v_all_modules_completed
    FROM public.enrollments
    WHERE user_id = NEW.user_id;

    IF v_all_modules_completed THEN
        -- Dar certificado global insertando un `module_id` NULL en certificates
        INSERT INTO public.certificates (user_id, module_id, issue_date)
        VALUES (NEW.user_id, NULL, now())
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trigger_update_enrollment_progress
    AFTER INSERT OR UPDATE OF is_completed ON public.lesson_progress
    FOR EACH ROW
    WHEN (NEW.is_completed = true)
    EXECUTE FUNCTION public.update_enrollment_progress();

-- 6. Modificar tabla Certificates para el Global
ALTER TABLE public.certificates ALTER COLUMN module_id DROP NOT NULL;
ALTER TABLE public.certificates DROP CONSTRAINT IF EXISTS certificates_user_id_module_id_key;
CREATE UNIQUE INDEX certificates_global_idx ON public.certificates (user_id) WHERE module_id IS NULL;
CREATE UNIQUE INDEX certificates_module_idx ON public.certificates (user_id, module_id) WHERE module_id IS NOT NULL;
