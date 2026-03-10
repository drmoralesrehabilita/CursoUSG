-- Add access_requested columns to profiles for the access request workflow
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS access_requested BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS access_requested_at TIMESTAMPTZ;
