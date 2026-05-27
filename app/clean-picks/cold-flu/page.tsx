'use client';

import { useState } from 'react';
import Link from 'next/link';
import PickCard from '@/components/clean-picks/PickCard';
import { COLD_FLU_PICKS } from '@/lib/clean-picks/coldFluPicks';
import type { Pick } from '@/lib/clean-picks/painFeverPicks';

type FilterKey = 'top' | 'oral' | 'topical' | 'sublingual';

export default function ColdFluPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('top');

  const oralPicks = COLD_FLU_PICKS.filter(p => p.form === 'oral');
  const topicalPicks = COLD_FLU_PICKS.filter(p => p.form === 'topical');
  const sublingualPicks = COLD_FLU_PICKS.filter(p => p.form === 'sublingual');
  const topPicks = COLD_FLU_PICKS.filter(p => p.topPick);

  const FILTERS: { key: FilterKey; label: string; count: number }[] = [
    { key: 'top', label: '⭐ Top Picks', count: topPicks.length },
    { key: 'oral', label: 'Oral', count: oralPicks.length },
    { key: 'topical', label: 'Topical', count: topicalPicks.length },
    { key: 'sublingual', label: 'Sublingual', count: sublingualPicks.length },
  ];

  let visiblePicks: Pick[] = [];
  if (activeFilter === 'top') visiblePicks = topPicks;
  else if (activeFilter === 'oral') visiblePicks = oralPicks;
  else if (activeFilter === 'topical') visiblePicks = topicalPicks;
  else if (activeFilter === 'sublingual') visiblePicks = sublingualPicks;

  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1.5rem 6rem',
      fontFamily: 'var(--font-inter), sans-serif',
      backgroundColor: '#faf7f2',
      minHeight: '100vh',
    }}>
      <Link
        href="/clean-picks"
        style={{
          color: '#4a6741',
          fontSize: '0.9rem',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          marginBottom: '1.5rem',
        }}
      >
        ← Back to all categories
      </Link>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: '#2d4a3e',
          margin: '0 0 0.3rem',
        }}>
          Cold & Flu
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: '#5a7a6e',
          margin: 0,
        }}>
          {COLD_FLU_PICKS.length} verified clean picks for cold and flu symptoms, immune support, and seasonal wellness.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '1.25rem',
      }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            style={{
              fontSize: '0.85rem',
              padding: '6px 13px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 500,
              background: activeFilter === f.key ? '#2d4a3e' : '#f0fdf4',
              color: activeFilter === f.key ? '#fff' : '#166534',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: activeFilter === f.key ? '#2d4a3e' : '#c8ddc0',
              transition: 'all 0.15s',
            }}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {activeFilter === 'top' && (
        <div style={{
          background: '#faf7f2',
          border: '1px solid #e8e0d0',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>⭐</div>
          <div style={{ fontSize: '0.88rem', color: '#2a3a34', lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: '#2d4a3e' }}>Our 3 picks across oral, pediatric, and topical.</span> Chosen for ingredient quality and availability at stores you can actually get to.
          </div>
        </div>
      )}

      {visiblePicks.map((pick, idx) => (
        <PickCard key={idx} pick={pick} showTopBadge={activeFilter === 'top'} />
      ))}
    </main>
  );
}