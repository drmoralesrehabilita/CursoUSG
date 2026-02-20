-- Enable RLS
-- alter table auth.users enable row level security;

-- PROFILES
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- MODULES
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  order_index integer default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

alter table public.modules enable row level security;

create policy "Modules are viewable by authenticated users."
  on public.modules for select
  to authenticated
  using ( true );

create policy "Admins can insert modules."
  on public.modules for insert
  to authenticated
  with check ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );

create policy "Admins can update modules."
  on public.modules for update
  to authenticated
  using ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );
  
create policy "Admins can delete modules."
  on public.modules for delete
  to authenticated
  using ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );


-- LESSONS
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade,
  title text not null,
  description text,
  video_url_camera text,
  video_url_ultrasound text,
  materials jsonb, -- Array of objects { title, url }
  order_index integer default 0,
  is_published boolean default false,
  created_at timestamptz default now()
);

alter table public.lessons enable row level security;

create policy "Lessons are viewable by authenticated users."
  on public.lessons for select
  to authenticated
  using ( true );

create policy "Admins can manage lessons."
  on public.lessons for all
  to authenticated
  using ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );

-- ENROLLMENTS
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  module_id uuid references public.modules(id) on delete cascade,
  status text default 'active' check (status in ('active', 'completed', 'blocked')),
  progress integer default 0,
  created_at timestamptz default now(),
  unique (user_id, module_id)
);

alter table public.enrollments enable row level security;

create policy "Users can view their own enrollments."
  on public.enrollments for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Admins can view all enrollments."
  on public.enrollments for select
  to authenticated
  using ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );

create policy "Admins can manage enrollments."
  on public.enrollments for all
  to authenticated
  using ( exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' ) );


-- Function to handle new user signup (auto-create profile)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
