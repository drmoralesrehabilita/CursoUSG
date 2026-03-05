
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sgpxbajxvpvcsyxhcnbg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncHhiYWp4dnB2Y3N5eGhjbmJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzNjg4MCwiZXhwIjoyMDg3MTEyODgwfQ.5MeJcTpyJivsPu5tPyt9Q7w3tq48NHY6oedYVD-kofY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCounts() {
  const tables = ['profiles', 'modules', 'lessons', 'enrollments', 'lesson_progress', 'quiz_attempts', 'certificates'];
  
  const results = [];
  results.push(`Checking project: ${supabaseUrl}`);
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
         results.push(`${table}: ERROR - ${error.message}`);
      } else {
         results.push(`${table}: ${count} rows`);
      }
    } catch (e) {
      results.push(`${table}: EXCEPTION - ${e.message}`);
    }
  }
  console.log("DATABASE_SURVEY_START");
  console.log(results.join("\n"));
  console.log("DATABASE_SURVEY_END");
}

checkCounts();
