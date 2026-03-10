-- Migration: Improve enrollment auto-creation and add module-level certificates
-- This fixes two critical issues:
-- 1. Enrollments are not auto-created, so progress never updates (stuck at 0%)
-- 2. Module-level certificates are not emitted when a module reaches 100%

-- Replace the trigger function to auto-create enrollments and issue module certificates
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_module_id UUID;
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_progress_percent INTEGER;
    v_all_modules_completed BOOLEAN;
BEGIN
    -- Obtener el module_id correspondiente a la lección
    SELECT module_id INTO v_module_id FROM public.lessons WHERE id = NEW.lesson_id;

    -- Si no hay módulo asociado, salir
    IF v_module_id IS NULL THEN
        RETURN NEW;
    END IF;

    -- Auto-crear enrollment si no existe (FIX CRÍTICO)
    INSERT INTO public.enrollments (user_id, module_id, status, progress)
    VALUES (NEW.user_id, v_module_id, 'active', 0)
    ON CONFLICT (user_id, module_id) DO NOTHING;

    -- Contar el total de lecciones publicadas de ese módulo
    SELECT COUNT(*) INTO v_total_lessons 
    FROM public.lessons 
    WHERE module_id = v_module_id AND is_published = true;

    -- Contar las lecciones completadas por el usuario en ese módulo
    SELECT COUNT(*) INTO v_completed_lessons 
    FROM public.lesson_progress lp
    JOIN public.lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = NEW.user_id 
      AND l.module_id = v_module_id 
      AND lp.is_completed = true 
      AND l.is_published = true;

    -- Calcular porcentaje
    IF v_total_lessons > 0 THEN
        v_progress_percent := (v_completed_lessons * 100) / v_total_lessons;
    ELSE
        v_progress_percent := 0;
    END IF;

    -- Actualizar enrollment
    UPDATE public.enrollments 
    SET progress = v_progress_percent,
        status = CASE WHEN v_progress_percent = 100 THEN 'completed' ELSE status END
    WHERE user_id = NEW.user_id AND module_id = v_module_id;

    -- Emitir certificado por módulo al completar (NUEVO)
    IF v_progress_percent = 100 THEN
        INSERT INTO public.certificates (user_id, module_id, issue_date)
        VALUES (NEW.user_id, v_module_id, now())
        ON CONFLICT DO NOTHING;
    END IF;

    -- Checar si TODOS los módulos están al 100% para certificado global
    SELECT bool_and(progress = 100) INTO v_all_modules_completed
    FROM public.enrollments
    WHERE user_id = NEW.user_id;

    IF v_all_modules_completed THEN
        INSERT INTO public.certificates (user_id, module_id, issue_date)
        VALUES (NEW.user_id, NULL, now())
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger itself doesn't need to be recreated since we're only replacing the function
-- But let's ensure it's correct
DROP TRIGGER IF EXISTS trigger_update_enrollment_progress ON public.lesson_progress;
CREATE TRIGGER trigger_update_enrollment_progress
    AFTER INSERT OR UPDATE OF is_completed ON public.lesson_progress
    FOR EACH ROW
    WHEN (NEW.is_completed = true)
    EXECUTE FUNCTION public.update_enrollment_progress();
