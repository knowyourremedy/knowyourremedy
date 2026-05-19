'use client';

// KnowYourRemedy — DoseTrackerBadge
// Add this to your root layout.jsx so it appears on every page once a profile exists.
//
// Usage in app/layout.jsx:
//   import DoseTrackerBadge from '@/components/DoseTrackerBadge';
//   // Wrap with a client component that reads localStorage for activeProfile + logs

import { useState, useEffect } from 'react';
import { getLogs } from '@/lib/supabaseHelpers';

export default function DoseTrackerBadge() {
  const [profile, setProfile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kyr_active_profile');
    if (!saved) return;
    const p = JSON.parse(saved);
    setProfile(p);
    fetchLogs(p.id);
  }, []);

  async function fetchLogs(profileId) {
    try {
      const data = await getLogs(profileId, 30);
      setLogs(data);
    } catch {
      const local = JSON.parse(localStorage.getItem('kyr_logs') || '[]');
      setLogs(local.filter(l => l.profile_id === profileId).reverse());
    }
  }

  async function logNextDose(log) {
    if (!profile) return;
    const entry = {
      profile_id: profile.id,
      medication: log.medication,
      dose_mg: log.dose_mg,
      physical_amount: log.physical_amount,
      format: log.format,
      concentration_label: log.concentration_label,
      interval_hours: log.interval_hours,
      max_doses_per_day: log.max_doses_per_day,
    };
    try {
      const { logDose } = await import('@/lib/supabaseHelpers');
      await logDose(entry);
    } catch {
      const fallback = { id: Date.now().toString(), ...entry, administered_at: new Date().toISOString() };
      const all = JSON.parse(localStorage.getItem('kyr_logs') || '[]');
      all.push(fallback);
      localStorage.setItem('kyr_logs', JSON.stringify(all));
    }
    await fetchLogs(profile.id);
  }

  if (!profile) return null;

  // Group logs by medication, most recent per med
  const byMed = {};
  logs.forEach(log => {
    if (!byMed[log.medication]) byMed[log.medication] = log;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCountByMed = {};
  logs.forEach(log => {
    if (new Date(log.administered_at) >= today) {
      todayCountByMed[log.medication] = (todayCountByMed[log.medication] || 0) + 1;
    }
  });

  return (
    <>
      {/* Floating badge */}
      <button
        onClick={() => setOpen(o => !o)}
        title={`${profile.name}'s dose tracker`}
        aria-label={`Open dose tracker for ${profile.name}`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#2d4a3e',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        }}
      >
        💊
      </button>

      {/* Slide-out panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '88px',
            right: '24px',
            zIndex: 999,
            width: '300px',
            maxHeight: '440px',
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid #dde5e2',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a2e27' }}>
                {profile.name}&apos;s tracker
              </div>
              <div style={{ fontSize: '11px', color: '#6b7c74' }}>Tap to log the next dose</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close tracker"
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#6b7c74', lineHeight: 1 }}
            >×</button>
          </div>

          {/* Med entries */}
          {Object.keys(byMed).length === 0 ? (
            <p style={{ fontSize: '13px', color: '#6b7c74', textAlign: 'center', padding: '1rem 0' }}>
              No doses logged yet.
            </p>
          ) : (
            Object.entries(byMed).map(([med, log]) => {
              const lastTime = new Date(log.administered_at);
              const nextTime = new Date(lastTime.getTime() + log.interval_hours * 3600 * 1000);
              const now = new Date();
              const canTake = now >= nextTime;
              const todayCount = todayCountByMed[med] || 0;
              const pct = Math.min(100, Math.round((todayCount / log.max_doses_per_day) * 100));
              const atMax = todayCount >= log.max_doses_per_day;

              return (
                <div key={med} style={{ paddingTop: '10px', borderTop: '1px solid #edf2f0', marginTop: '4px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a2e27' }}>{med}</div>
                  <div style={{ fontSize: '11px', color: '#6b7c74', margin: '2px 0' }}>
                    {log.physical_amount} · last at {lastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: canTake ? '#2d4a3e' : '#c0392b', marginBottom: '6px' }}>
                    {atMax
                      ? 'Max doses reached for today'
                      : canTake
                      ? 'Ready for next dose'
                      : `Next dose: ${nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    }
                  </div>

                  {/* Progress bar */}
                  <div style={{ fontSize: '10px', color: '#6b7c74', marginBottom: '3px' }}>
                    {todayCount} of {log.max_doses_per_day} doses today
                  </div>
                  <div style={{ background: '#edf2f0', borderRadius: '999px', height: '5px', marginBottom: '8px' }}>
                    <div style={{
                      background: atMax ? '#c0392b' : '#2d4a3e',
                      borderRadius: '999px',
                      height: '5px',
                      width: `${pct}%`,
                      transition: 'width 0.3s',
                    }} />
                  </div>

                  <button
                    onClick={() => logNextDose(log)}
                    disabled={!canTake || atMax}
                    style={{
                      width: '100%',
                      padding: '7px',
                      border: `1px solid ${canTake && !atMax ? '#2d4a3e' : '#ccc'}`,
                      borderRadius: '6px',
                      background: 'transparent',
                      color: canTake && !atMax ? '#2d4a3e' : '#aaa',
                      cursor: canTake && !atMax ? 'pointer' : 'not-allowed',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    + Log next dose
                  </button>
                </div>
              );
            })
          )}

          {/* Link to calculator */}
          <a
            href="/dosage-calculator"
            style={{
              display: 'block',
              marginTop: '1rem',
              textAlign: 'center',
              fontSize: '12px',
              color: '#2d4a3e',
              textDecoration: 'underline',
            }}
          >
            Open full calculator
          </a>
        </div>
      )}
    </>
  );
}
