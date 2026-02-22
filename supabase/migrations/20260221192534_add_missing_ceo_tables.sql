-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    currency VARCHAR(3) DEFAULT 'MXN',
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    certificate_url TEXT,
    UNIQUE(user_id, module_id)
);

-- Create activity_logs table for study time
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    duration_minutes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create live_sessions table
CREATE TABLE IF NOT EXISTS public.live_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    session_date TIMESTAMP WITH TIME ZONE NOT NULL,
    zoom_link TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert a mock live session for dashboard testing
INSERT INTO public.live_sessions (title, description, session_date, zoom_link, status)
VALUES ('Infiltración de Cadera Guiada', 'Sesión en vivo sobre infiltración de cadera guiada por USG', timezone('utc'::text, now() + interval '3 days'), 'https://zoom.us/j/123456789', 'scheduled')
ON CONFLICT DO NOTHING;
