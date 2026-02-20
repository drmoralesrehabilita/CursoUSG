1. Visión del Proyecto

Crear un LMS (Learning Management System) para el "Diplomado Internacional en Rehabilitación Intervencionista" del Dr. Raúl Morales. Estética: Dark Mode médico, profesional, alta confianza, tecnológico.

2. Stack Tecnológico (Estricto)

Frontend: Next.js 14, Tailwind CSS, Lucide React (iconos).

Componentes: Shadcn/UI (Radix UI).

Estado/Backend: Supabase (PostgreSQL + Auth).

Video: Player personalizado con soporte para "Pantalla Dual" (Video manos + Video Ecógrafo).

3. Estructura de Datos (Supabase)

Cursor debe crear las siguientes tablas:

profiles: id, full_name, specialty (Rehabilitación, Ortopedia, etc), is_resident (boolean).

modules: id, title, order, description.

lessons: id, module_id, title, video_url, duration, is_free (preview).

enrollments: user_id, module_id, status (active, completed).

workshops: id, title, date, location (CDMX), max_capacity.

4. Temario Académico (Módulos)

Implementar la navegación basada en estos 6 módulos:

M1: Fundamentos del intervencionismo (Materiales, Marco Legal).

M2: Técnicas Terapéuticas (PRP, Proloterapia, Viscosuplementación).

M3: Extremidad Superior (Taller presencial 1).

M4: Extremidad Inferior (Taller presencial 2).

M5: Ecografía MSK (Botonología y Patrones).

M6: Columna y Nervios Periféricos.

5. Instrucciones de UI/UX (Estilo Visual)

Colores: Fondo #0a0f18 (Dark), Primario #1773cf (Azul Médico).

Dashboard: Sidebar colapsable con progreso por módulo.

Video Player: Debe permitir alternar entre vista de cámara externa y feed de ecografía.

Mobile First: El médico debe poder ver el temario en su tablet mientras realiza un procedimiento.

6. Lógica de Negocio Específica

Regla de Bloqueo: El usuario no puede avanzar al Módulo 3 (Extremidad Superior) si no ha completado el examen del Módulo 2.

Gestión de Talleres: Sección especial para confirmar asistencia a los talleres en CDMX y generar un pase (QR simulado).

Precios: Implementar lógica de descuentos:

20% descuento para Residentes (validar con campo en perfil).

Inscripción temprana (Early Bird).

7. Instrucciones para el Chat de Cursor

"Actúa como un Senior Fullstack Developer. Genera código limpio, usando TypeScript y siguiendo las convenciones de Next.js App Router. Prioriza la accesibilidad y el rendimiento de carga de videos."

Esquema de base de datos propuesta (ayudame a mejorarla si crees conveniente)

-- 1. EXTENSIONES Y SEGURIDAD INICIAL
-- Habilitar extensiones necesarias si no están activas
create extension if not exists "uuid-ossp";

-- 2. TABLAS PRINCIPALES

-- Perfiles de Usuario (Extensión de Auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  specialty text,
  is_resident boolean default false,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Módulos del Diplomado
create table modules (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  order_index integer not null,
  is_locked_by_default boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lecciones (Soporte para Pantalla Dual)
create table lessons (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references modules(id) on delete cascade not null,
  title text not null,
  description text,
  video_url_camera text, -- Video de las manos/procedimiento
  video_url_ultrasound text, -- Video del ecógrafo
  duration_minutes integer,
  order_index integer not null,
  is_free_preview boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inscripciones y Progreso
create table enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  module_id uuid references modules(id) on delete cascade not null,
  status text check (status in ('active', 'completed', 'blocked')) default 'blocked',
  progress_percent integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, module_id)
);

-- Talleres Presenciales (CDMX)
create table workshops (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references modules(id) on delete set null,
  title text not null,
  workshop_date timestamp with time zone not null,
  location text default 'CDMX',
  max_capacity integer default 30,
  current_enrolled integer default 0,
  is_active boolean default true
);

-- 3. DATOS INICIALES (SEED DATA)
insert into modules (order_index, title, description, is_locked_by_default) values
(1, 'Fundamentos del intervencionismo', 'Historia, marco legal, materiales y teorías del dolor.', false),
(2, 'Técnicas terapéuticas complementarias', 'Farmacología, PRP, Proloterapia y Viscosuplementación.', true),
(3, 'Extremidad superior', 'Hombro, Codo, Muñeca y Mano. Incluye Taller Presencial 1.', true),
(4, 'Extremidad inferior', 'Cadera, Rodilla, Tobillo y Pie. Incluye Taller Presencial 2.', true),
(5, 'Introducción a la Ecografía MSK', 'Botonología, patrones ecográficos e intervencionismo guiado.', true),
(6, 'Columna y nervios periféricos', 'Anatomía e imagenología de columna cervical, dorsal y lumbosacra.', true);

-- 4. POLÍTICAS DE SEGURIDAD (RLS)
alter table profiles enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;

-- Los usuarios pueden leer todos los módulos
create policy "Módulos visibles para todos" on modules for select using (true);

-- Los usuarios solo pueden ver sus propios progresos
create policy "Usuarios ven su propio progreso" on enrollments for select using (auth.uid() = user_id);

-- Los perfiles son editables por el dueño
create policy "Usuarios editan su perfil" on profiles for update using (auth.uid() = id);