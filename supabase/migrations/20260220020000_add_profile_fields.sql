ALTER TABLE public.profiles
ADD COLUMN license_id text,
ADD COLUMN specialty text,
ADD COLUMN state text,
ADD COLUMN experience_level text,
ADD COLUMN interest_area text,
ADD COLUMN phone text;

-- Update the handle_new_user function to include new fields
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role, license_id, specialty, state, experience_level, interest_area, phone)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'user',
    new.raw_user_meta_data->>'license_id',
    new.raw_user_meta_data->>'specialty',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'experience_level',
    new.raw_user_meta_data->>'interest_area',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;
