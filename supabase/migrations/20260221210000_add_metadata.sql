ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS duration_minutes integer,
ADD COLUMN IF NOT EXISTS difficulty text,
ADD COLUMN IF NOT EXISTS prerequisite_lesson_id uuid REFERENCES public.lessons(id);

ALTER TABLE public.modules
ADD COLUMN IF NOT EXISTS prerequisite_module_id uuid REFERENCES public.modules(id);
