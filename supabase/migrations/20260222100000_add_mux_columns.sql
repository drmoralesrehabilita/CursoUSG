-- Migration to add Mux support for lessons
ALTER TABLE public.lessons 
  ADD COLUMN IF NOT EXISTS mux_asset_id TEXT,
  ADD COLUMN IF NOT EXISTS mux_playback_id TEXT,
  ADD COLUMN IF NOT EXISTS mux_upload_id TEXT;
