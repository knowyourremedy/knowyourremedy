// KnowYourRemedy — Supabase helpers for dose profiles and logs
// Install: npm install @supabase/supabase-js
// Add to .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=your_project_url
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

import { supabase } from './supabase';

// ─── PROFILES ────────────────────────────────────────────────────────────────

/**
 * Fetch all dose profiles for the current authenticated user.
 */
export async function getProfiles() {
  const { data, error } = await supabase
    .from('dose_profiles')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Create a new dose profile.
 * @param {{ name: string, dob: string, weight_kg: number }} profile
 */
export async function createProfile(profile) {
  const { data, error } = await supabase
    .from('dose_profiles')
    .insert([profile])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Update an existing profile (e.g. new weight).
 * @param {string} id
 * @param {object} updates
 */
export async function updateProfile(id, updates) {
  const { data, error } = await supabase
    .from('dose_profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Delete a profile and all its logs.
 * @param {string} id
 */
export async function deleteProfile(id) {
  await supabase.from('dose_logs').delete().eq('profile_id', id);
  const { error } = await supabase.from('dose_profiles').delete().eq('id', id);
  if (error) throw error;
}

// ─── DOSE LOGS ───────────────────────────────────────────────────────────────

/**
 * Log a dose administration for a profile.
 * @param {{
 *   profile_id: string,
 *   medication: string,
 *   dose_mg: number,
 *   physical_amount: string,
 *   format: string,
 *   concentration_label: string,
 *   interval_hours: number,
 *   max_doses_per_day: number
 * }} log
 */
export async function logDose(log) {
  const { data, error } = await supabase
    .from('dose_logs')
    .insert([{ ...log, administered_at: new Date().toISOString() }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Fetch all dose logs for a profile, most recent first.
 * @param {string} profileId
 * @param {number} limit
 */
export async function getLogs(profileId, limit = 50) {
  const { data, error } = await supabase
    .from('dose_logs')
    .select('*')
    .eq('profile_id', profileId)
    .order('administered_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

/**
 * Fetch today's logs for a profile (for max daily dose enforcement).
 * @param {string} profileId
 */
export async function getTodayLogs(profileId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { data, error } = await supabase
    .from('dose_logs')
    .select('*')
    .eq('profile_id', profileId)
    .gte('administered_at', today.toISOString());
  if (error) throw error;
  return data;
}

// ─── SUPABASE SQL SCHEMA ──────────────────────────────────────────────────────
// Run this in your Supabase SQL editor to create the required tables.
//
// -- Profiles table
// CREATE TABLE dose_profiles (
//   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
//   name        TEXT NOT NULL,
//   dob         DATE,
//   weight_kg   NUMERIC,
//   created_at  TIMESTAMPTZ DEFAULT now(),
//   updated_at  TIMESTAMPTZ DEFAULT now()
// );
//
// ALTER TABLE dose_profiles ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Users manage own profiles"
//   ON dose_profiles FOR ALL
//   USING (auth.uid() = user_id)
//   WITH CHECK (auth.uid() = user_id);
//
// -- Dose logs table
// CREATE TABLE dose_logs (
//   id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   profile_id          UUID REFERENCES dose_profiles(id) ON DELETE CASCADE,
//   medication          TEXT NOT NULL,
//   dose_mg             NUMERIC NOT NULL,
//   physical_amount     TEXT NOT NULL,
//   format              TEXT,
//   concentration_label TEXT,
//   interval_hours      NUMERIC NOT NULL,
//   max_doses_per_day   INTEGER NOT NULL,
//   administered_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
//   created_at          TIMESTAMPTZ DEFAULT now()
// );
//
// ALTER TABLE dose_logs ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Users manage own logs via profile"
//   ON dose_logs FOR ALL
//   USING (
//     profile_id IN (
//       SELECT id FROM dose_profiles WHERE user_id = auth.uid()
//     )
//   );
