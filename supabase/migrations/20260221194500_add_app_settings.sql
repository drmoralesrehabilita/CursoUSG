-- Tabla para configuraciones globales del sistema
CREATE TABLE IF NOT EXISTS public.app_settings (
    key VARCHAR(255) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_by UUID REFERENCES public.profiles(id)
);

-- Habilitar RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad: Todos pueden leer, sólo Admins pueden modificar
DROP POLICY IF EXISTS "Permitir lectura a todos" ON public.app_settings;
CREATE POLICY "Permitir lectura a todos" 
    ON public.app_settings FOR SELECT 
    TO authenticated 
    USING (true);

DROP POLICY IF EXISTS "Permitir actualización a admins" ON public.app_settings;
CREATE POLICY "Permitir actualización a admins" 
    ON public.app_settings FOR UPDATE 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Permitir inserción a admins" ON public.app_settings;
CREATE POLICY "Permitir inserción a admins" 
    ON public.app_settings FOR INSERT 
    TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Insertar configuraciones base por defecto
INSERT INTO public.app_settings (key, value, description)
VALUES 
    ('maintenance_mode', 'false'::jsonb, 'Activa el modo mantenimiento para bloquear el acceso a estudiantes.'),
    ('announcement_banner', '{"active": false, "message": "Bienvenidos al nuevo portal", "type": "info"}'::jsonb, 'Banner de anuncio global para el dashboard.')
ON CONFLICT (key) DO NOTHING;

-- Dar permisos básicos
GRANT SELECT, INSERT, UPDATE ON public.app_settings TO authenticated;
