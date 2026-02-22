-- Add thumbnail arrays or Single URL. We use a single text url
ALTER TABLE public.modules ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
