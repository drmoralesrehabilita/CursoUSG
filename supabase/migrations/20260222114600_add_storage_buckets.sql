-- Create docs storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('docs', 'docs', true)
ON CONFLICT (id) DO NOTHING;

-- Create thumbnails storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for docs bucket
DROP POLICY IF EXISTS "Public Access for docs" ON storage.objects;
CREATE POLICY "Public Access for docs" ON storage.objects
FOR SELECT USING (bucket_id = 'docs');

DROP POLICY IF EXISTS "Authenticated users can upload to docs" ON storage.objects;
CREATE POLICY "Authenticated users can upload to docs" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'docs');

DROP POLICY IF EXISTS "Authenticated users can update docs" ON storage.objects;
CREATE POLICY "Authenticated users can update docs" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'docs');

DROP POLICY IF EXISTS "Authenticated users can delete from docs" ON storage.objects;
CREATE POLICY "Authenticated users can delete from docs" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'docs');

-- Policies for thumbnails bucket
DROP POLICY IF EXISTS "Public Access for thumbnails" ON storage.objects;
CREATE POLICY "Public Access for thumbnails" ON storage.objects
FOR SELECT USING (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Authenticated users can upload to thumbnails" ON storage.objects;
CREATE POLICY "Authenticated users can upload to thumbnails" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Authenticated users can update thumbnails" ON storage.objects;
CREATE POLICY "Authenticated users can update thumbnails" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'thumbnails');

DROP POLICY IF EXISTS "Authenticated users can delete from thumbnails" ON storage.objects;
CREATE POLICY "Authenticated users can delete from thumbnails" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'thumbnails');
