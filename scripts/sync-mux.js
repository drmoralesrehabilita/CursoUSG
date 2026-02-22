// Script de diagnóstico: muestra upload_ids en Supabase vs MUX para hacer match manual
const Mux = require('@mux/mux-node');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;

async function diagnose() {
  const muxClient = new Mux.default({ tokenId: MUX_TOKEN_ID, tokenSecret: MUX_TOKEN_SECRET });
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // 1. Mostrar assets de MUX con sus upload_ids completos
  console.log('\n=== ASSETS EN MUX ===');
  const { data: muxAssets } = await muxClient.video.assets.list({ limit: 20 });
  const muxMap = {};
  for (const a of muxAssets) {
    const pub = (a.playback_ids || []).find(p => p.policy === 'public');
    muxMap[a.upload_id] = { asset_id: a.id, playback_id: pub?.id, status: a.status };
    console.log(`  upload_id: ${a.upload_id}`);
    console.log(`  asset_id:  ${a.id}`);
    console.log(`  playback:  ${pub?.id}`);
    console.log(`  status:    ${a.status}`);
    console.log('  ---');
  }

  // 2. Mostrar lecciones en Supabase con sus mux_upload_ids
  console.log('\n=== LECCIONES EN SUPABASE ===');
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title, mux_upload_id, mux_asset_id, mux_playback_id');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  for (const l of lessons) {
    console.log(`  title:      ${l.title}`);
    console.log(`  upload_id:  ${l.mux_upload_id}`);
    console.log(`  asset_id:   ${l.mux_asset_id}`);
    console.log(`  playback:   ${l.mux_playback_id}`);
    // Match check
    if (l.mux_upload_id && muxMap[l.mux_upload_id]) {
      console.log(`  ✅ MATCH con MUX: playback=${muxMap[l.mux_upload_id].playback_id}`);
    } else if (l.mux_upload_id) {
      console.log(`  ❌ NO MATCH - upload_id no encontrado en MUX`);
    }
    console.log('  ---');
  }

  // 3. Aplicar el match y actualizar
  console.log('\n=== ACTUALIZANDO ===');
  for (const l of lessons) {
    if (!l.mux_upload_id) continue;
    const muxData = muxMap[l.mux_upload_id];
    if (!muxData || !muxData.playback_id) continue;
    const { error: updErr } = await supabase
      .from('lessons')
      .update({ mux_asset_id: muxData.asset_id, mux_playback_id: muxData.playback_id })
      .eq('id', l.id);
    if (updErr) console.error(`  ❌ Error actualizando "${l.title}":`, updErr.message);
    else console.log(`  ✅ "${l.title}" actualizada con playback_id: ${muxData.playback_id}`);
  }
}

diagnose().catch(e => console.error('Error fatal:', e.message));
