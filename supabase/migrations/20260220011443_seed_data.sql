-- Modules
INSERT INTO public.modules (id, title, description, order_index, is_published)
VALUES
('d0b3c2a1-0000-0000-0000-000000000001', 'Módulo 1: Fundamentos de USG', 'Introducción a la física del ultrasonido', 1, true),
('d0b3c2a1-0000-0000-0000-000000000002', 'Módulo 2: Miembro Superior', 'Anatomía y abordajes', 2, true)
ON CONFLICT (id) DO NOTHING;

-- Lessons
INSERT INTO public.lessons (id, module_id, title, description, order_index, is_published, video_url_camera, video_url_ultrasound)
VALUES
('d0b3c2a1-0000-0000-0000-000000000003', 'd0b3c2a1-0000-0000-0000-000000000001', '1.1 Principios Físicos', 'Bases del sonido y la imagen.', 1, true, 'video_cam_1', 'video_ultra_1'),
('d0b3c2a1-0000-0000-0000-000000000004', 'd0b3c2a1-0000-0000-0000-000000000001', '1.2 Knobología', 'Uso de los controles del equipo.', 2, true, null, null),
('d0b3c2a1-0000-0000-0000-000000000005', 'd0b3c2a1-0000-0000-0000-000000000002', '2.1 Hombro: Mango Rotador', NULL, 1, true, null, null)
ON CONFLICT (id) DO NOTHING;
