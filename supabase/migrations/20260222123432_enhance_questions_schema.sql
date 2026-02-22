-- Migration to enrich Questions table and create storage bucket for images

-- 1. Add new columns to `public.questions` table
ALTER TABLE public.questions
    ADD COLUMN IF NOT EXISTS difficulty INTEGER DEFAULT 1,
    ADD COLUMN IF NOT EXISTS is_critical BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS pearl TEXT,
    ADD COLUMN IF NOT EXISTS source_reference TEXT,
    ADD COLUMN IF NOT EXISTS image_url TEXT,
    ADD COLUMN IF NOT EXISTS findings JSONB DEFAULT '[]'::jsonb;

-- 2. Create Storage Bucket for Question Images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('question_images', 'question_images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Setup Storage Policies for the new bucket
-- Allow public access to view images
CREATE POLICY "Public Access for Question Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'question_images' );

-- Allow authenticated users (Admins) to upload images
CREATE POLICY "Admins can upload Question Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'question_images' 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Allow authenticated users (Admins) to delete images
CREATE POLICY "Admins can delete Question Images"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'question_images' 
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);
