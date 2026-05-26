'use client';

import CategoryTile from '@/components/clean-picks/CategoryTile';
import { PAIN_FEVER_PICKS } from '@/lib/clean-picks/painFeverPicks';

// ─── Category metadata ─────────────────────────────────────
const CATEGORIES = [
  {
    key: 'pain-fever',
    label: 'Pain & fever',
    blurb: 'Headaches, muscle pain, fevers, menstrual cramps',
    accentColor: '#185FA5',
    live: true,
  },
  {
    key: 'cold-flu',
    label: 'Cold & flu',
    blurb: 'Decongestants, cough relief, immune support',
    accentColor: '#d4cbb8',
    live: false,
  },
  {
    key: 'allergies',
    label: 'Allergies',
    blurb: 'Antihistamines, nasal sprays, eye drops',
    accentColor: '#d4cbb8',
    live: false,
  },
  {
    key: 'sleep',
    label: 'Sleep',
    blurb: 'Melatonin, magnesium, drug-free options',
    accentColor: '#d4cbb8',
    live: false,
  },
  {
    key: 'first-aid',
    label: 'First aid',
    blurb: 'Wound care, burn relief, bandages, antiseptics',
    accentColor: '#d4cbb8',
    live: false,
  },
];

// ─── Pick counts per category ─────────────────────────────
// As each new category goes live, add its count here AND flip
// the category's `live: false` to `live: true` in CATEGORIES above.
const PICK_COUNTS: Record<string, number> = {
  'pain-fever': PAIN_FEVER_PICKS.length,
  'cold-flu': 0,
  'allergies': 0,
  'sleep': 0,
  'first-aid': 0,
};

export default function CleanPicksPage() {
  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1.5rem 6rem',
      fontFamily: 'var(--font-inter), sans-serif',
      backgroundColor: '#faf7f2',
      minHeight: '100vh',
    }}>

      {/* Hero */}
      <div style={{
        background: '#fff',
        border: '2px solid #2d4a3e',
        borderRadius: '16px',
        padding: '2.5rem 2rem 2rem',
        marginBottom: '1.75rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>✨</div>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#2d4a3e',
          fontFamily: 'var(--font-playfair), Georgia, serif',
          marginBottom: '0.5rem',
          marginTop: 0,
          letterSpacing: '-0.01em',
        }}>
          Everyday Clean Picks
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#5a7a6e',
          lineHeight: 1.6,
          maxWidth: '460px',
          margin: '0 auto',
        }}>
          When you need something today, here are the cleaner options.
        </p>
      </div>

      {/* Section header */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          color: '#4a6781',
          marginBottom: '0.4rem',
        }}>
          Choose a category
        </div>
        <div style={{
          width: '28px',
          height: '2px',
          background: '#4a6781',
          marginBottom: '0.85rem',
        }}></div>
      </div>

      {/* Tile grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '12px',
        marginBottom: '1.75rem',
      }}>
        {CATEGORIES.map(cat => (
          <CategoryTile
            key={cat.key}
            category={cat}
            count={PICK_COUNTS[cat.key]}
          />
        ))}
      </div>

      {/* Progress banner */}
      <div style={{
        background: '#e8f3ec',
        border: '1px solid #c8ddc0',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        fontSize: '0.92rem',
        color: '#2a3a34',
        lineHeight: 1.6,
        marginBottom: '2rem',
      }}>
        <strong style={{ color: '#2d4a3e' }}>1 of 5 categories live.</strong> Pain & Fever ships with {PAIN_FEVER_PICKS.length} verified picks. Other categories are in active build — sign up below to be notified as they go live.
      </div>

      {/* Email signup */}
      <div style={{
        background: '#fff',
        border: '1px solid #e8e0d0',
        borderRadius: '12px',
        padding: '1.5rem',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#2d4a3e',
          marginBottom: '0.5rem',
        }}>
          Be the first to see new categories
        </div>
        <div style={{
          fontSize: '0.9rem',
          color: '#5a7a6e',
          lineHeight: 1.6,
          maxWidth: '440px',
          margin: '0 auto 1rem',
        }}>
          We&apos;ll email you as each new category lands — typically one at a time, fully verified.
        </div>
        <a href="/account" style={{
          display: 'inline-block',
          background: '#2d4a3e',
          color: '#fff',
          padding: '0.65rem 1.4rem',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          Sign up for updates
        </a>
      </div>

    </main>
  );
}