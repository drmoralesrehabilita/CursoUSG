-- 1. Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create assignment_submissions table
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_url TEXT,
    file_name TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'graded')),
    grade NUMERIC,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(assignment_id, student_id)
);

-- enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

-- Assignments RLS
CREATE POLICY "Users can view published assignments" ON public.assignments
    FOR SELECT USING (
        is_published = true OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can insert assignments" ON public.assignments
    FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update assignments" ON public.assignments
    FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete assignments" ON public.assignments
    FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Submissions RLS
CREATE POLICY "Users can view their own submissions" ON public.assignment_submissions
    FOR SELECT USING (
        student_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can insert their own submissions" ON public.assignment_submissions
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Users and admins can update submissions" ON public.assignment_submissions
    FOR UPDATE USING (
        student_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can delete submissions" ON public.assignment_submissions
    FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 3. Create Storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('assignment-submissions', 'assignment-submissions', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket policies
CREATE POLICY "assignments_public_access" ON storage.objects FOR SELECT USING (bucket_id = 'assignment-submissions');
CREATE POLICY "assignments_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'assignment-submissions' AND auth.role() = 'authenticated');
CREATE POLICY "assignments_update" ON storage.objects FOR UPDATE USING (bucket_id = 'assignment-submissions' AND auth.role() = 'authenticated');
CREATE POLICY "assignments_delete" ON storage.objects FOR DELETE USING (bucket_id = 'assignment-submissions' AND auth.role() = 'authenticated');
