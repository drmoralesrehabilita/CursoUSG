// Apply migration directly via Supabase REST SQL endpoint
const SUPABASE_URL = 'https://sgpxbajxvpvcsyxhcnbg.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncHhiYWp4dnB2Y3N5eGhjbmJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzNjg4MCwiZXhwIjoyMDg3MTEyODgwfQ.5MeJcTpyJivsPu5tPyt9Q7w3tq48NHY6oedYVD-kofY';

const sql = `
CREATE OR REPLACE FUNCTION public.update_enrollment_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_module_id UUID;
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_progress_percent INTEGER;
    v_all_modules_completed BOOLEAN;
BEGIN
    SELECT module_id INTO v_module_id FROM public.lessons WHERE id = NEW.lesson_id;
    IF v_module_id IS NULL THEN
        RETURN NEW;
    END IF;
    INSERT INTO public.enrollments (user_id, module_id, status, progress)
    VALUES (NEW.user_id, v_module_id, 'active', 0)
    ON CONFLICT (user_id, module_id) DO NOTHING;
    SELECT COUNT(*) INTO v_total_lessons FROM public.lessons WHERE module_id = v_module_id AND is_published = true;
    SELECT COUNT(*) INTO v_completed_lessons 
    FROM public.lesson_progress lp
    JOIN public.lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = NEW.user_id AND l.module_id = v_module_id AND lp.is_completed = true AND l.is_published = true;
    IF v_total_lessons > 0 THEN
        v_progress_percent := (v_completed_lessons * 100) / v_total_lessons;
    ELSE
        v_progress_percent := 0;
    END IF;
    UPDATE public.enrollments 
    SET progress = v_progress_percent,
        status = CASE WHEN v_progress_percent = 100 THEN 'completed' ELSE status END
    WHERE user_id = NEW.user_id AND module_id = v_module_id;
    IF v_progress_percent = 100 THEN
        INSERT INTO public.certificates (user_id, module_id, issue_date)
        VALUES (NEW.user_id, v_module_id, now())
        ON CONFLICT DO NOTHING;
    END IF;
    SELECT bool_and(progress = 100) INTO v_all_modules_completed
    FROM public.enrollments
    WHERE user_id = NEW.user_id;
    IF v_all_modules_completed THEN
        INSERT INTO public.certificates (user_id, module_id, issue_date)
        VALUES (NEW.user_id, NULL, now())
        ON CONFLICT DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_update_enrollment_progress ON public.lesson_progress;
CREATE TRIGGER trigger_update_enrollment_progress
    AFTER INSERT OR UPDATE OF is_completed ON public.lesson_progress
    FOR EACH ROW
    WHEN (NEW.is_completed = true)
    EXECUTE FUNCTION public.update_enrollment_progress();
`;

async function run() {
  // Try the pg-meta SQL endpoint (Supabase uses this internally)
  const res = await fetch(SUPABASE_URL + '/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ sql_string: sql })
  });

  if (res.ok) {
    console.log('SUCCESS via rpc/exec_sql');
    return;
  }

  console.log('rpc/exec_sql status:', res.status, await res.text());

  // Fallback: try the pg endpoint  
  const res2 = await fetch(SUPABASE_URL + '/pg/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
    },
    body: JSON.stringify({ query: sql })
  });

  if (res2.ok) {
    console.log('SUCCESS via /pg/query');
    return;
  }
  
  console.log('pg/query status:', res2.status, await res2.text());
  console.log('\\nManual application needed. Please apply via Supabase SQL Editor.');
}

run().catch(console.error);
