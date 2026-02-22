import os
import re

mig_dir = "c:\\Users\\JmYoc\\OneDrive\\Documentos\\DeepLuxMed\\RaulMoralesCurso\\CursoUSG\\supabase\\migrations"
for fname in os.listdir(mig_dir):
    if not fname.endswith(".sql"): continue
    
    path = os.path.join(mig_dir, fname)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find CREATE POLICY "name" ON schema.table
    # and prepend DROP POLICY IF EXISTS "name" ON schema.table;
    
    pattern = r'CREATE\s+POLICY\s+"([^"]+)"\s+ON\s+([a-zA-Z0-9_\.]+)'
    
    def replacer(match):
        policy_name = match.group(1)
        table_name = match.group(2)
        drop_stmt = f'DROP POLICY IF EXISTS "{policy_name}" ON {table_name};\n'
        return drop_stmt + match.group(0)

    # We need to ensure we don't duplicate DROP POLICY statements if they already exist
    # Let's cleanly apply them.
    # First, let's remove existing DROP POLICY statements matching this pattern to be safe.
    drop_pattern = r'DROP\s+POLICY\s+IF\s+EXISTS\s+"[^"]+"\s+ON\s+[a-zA-Z0-9_\.]+;\s*'
    clean_content = re.sub(drop_pattern, '', content)

    new_content = re.sub(pattern, replacer, clean_content, flags=re.IGNORECASE)
    
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {fname}")
