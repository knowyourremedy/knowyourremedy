'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import QuickNav from '@/components/QuickNav';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'pain-fever', label: 'Pain & fever' },
  { key: 'cold-flu', label: 'Cold & flu' },
  { key: 'allergies', label: 'Allergies' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'first-aid', label: 'First aid' },
];

export default function CleanPicksPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  return (
    <>
      <Nav />
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
          border: '1px solid #e8e0d0',
          borderRadius: '16px',
          padding: '3rem 2rem 2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#2d4a3e',
            fontFamily: 'var(--font-playfair), Georgia, serif',
            marginBottom: '0.75rem',
            marginTop: 0,
            letterSpacing: '-0.01em',
          }}>
            Everyday Clean Picks
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: '#5a7a6e',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            When you need something today, here are the cleaner options.
          </p>
        </div>

        {/* Coming soon banner */}
        <div style={{
          background: '#e8f3ec',
          border: '1px solid #c8ddc0',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
        }}>
          <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>🛒</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#2d4a3e',
              marginBottom: '0.4rem',
            }}>
              We're hand-curating this section.
            </div>
            <div style={{
              fontSize: '0.92rem',
              color: '#2a3a34',
              lineHeight: 1.65,
            }}>
              Every pick is verified for ingredient quality, drugstore availability, and price. We're building this carefully — no affiliate-driven recommendations, no fluff. Below is a preview of what's coming.
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.25rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          opacity: 0.7,
        }}>
          <span style={{ fontSize: '1.1rem', color: '#9ca3af' }}>🔍</span>
          <span style={{ fontSize: '0.92rem', color: '#9ca3af' }}>Search will be enabled once picks are live…</span>
        </div>

        {/* Category chips */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              style={{
                fontSize: '0.85rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 500,
                background: activeCat === cat.key ? '#2d4a3e' : '#f0fdf4',
                color: activeCat === cat.key ? '#fff' : '#166534',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: activeCat === cat.key ? '#2d4a3e' : '#c8ddc0',
                transition: 'all 0.15s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Example category section */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#4a6781',
            marginBottom: '0.4rem',
          }}>
            Pain & fever
          </div>
          <div style={{
            width: '28px',
            height: '2px',
            background: '#4a6781',
            marginBottom: '0.7rem',
          }}></div>
        </div>

        {/* Sample pick card 1 */}
        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1rem',
        }}>
          <div style={{ marginBottom: '0.9rem' }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#1a2e27',
              marginBottom: '0.2rem',
            }}>
              Children's Acetaminophen, dye-free (example)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7c74' }}>
              For: fever, pain · Available at most drugstores
            </div>
          </div>
          <div style={{
            background: '#faf7f2',
            borderLeft: '3px solid #2d4a3e',
            padding: '0.8rem 1rem',
            marginBottom: '0.9rem',
            fontSize: '0.9rem',
            color: '#2a3a34',
            lineHeight: 1.6,
            borderRadius: '0 6px 6px 0',
          }}>
            <span style={{ fontWeight: 600, color: '#2d4a3e' }}>Why this pick:</span> No artificial dyes (Red 40, Yellow 6), no high-fructose corn syrup. Same effective acetaminophen as the standard version.
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#6b7c74',
            flexWrap: 'wrap',
          }}>
            <span>🏪 CVS, Walgreens, Target</span>
            <span>💲 Standard pricing</span>
          </div>
        </div>

        {/* Sample pick card 2 */}
        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{ marginBottom: '0.9rem' }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#1a2e27',
              marginBottom: '0.2rem',
            }}>
              Kirkland Signature Acetaminophen (example)
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7c74' }}>
              For: pain, fever · Costco / Costco online
            </div>
          </div>
          <div style={{
            background: '#faf7f2',
            borderLeft: '3px solid #2d4a3e',
            padding: '0.8rem 1rem',
            marginBottom: '0.9rem',
            fontSize: '0.9rem',
            color: '#2a3a34',
            lineHeight: 1.6,
            borderRadius: '0 6px 6px 0',
          }}>
            <span style={{ fontWeight: 600, color: '#2d4a3e' }}>Why this pick:</span> Identical active ingredient to brand-name Tylenol, dramatically lower cost per dose. Comparable inactive ingredients.
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#6b7c74',
            flexWrap: 'wrap',
          }}>
            <span>🏪 Costco</span>
            <span>💲 Lowest cost</span>
          </div>
        </div>

        {/* Email signup */}
        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '12px',
          padding: '1.75rem 1.5rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#2d4a3e',
            marginBottom: '0.6rem',
          }}>
            Be the first to see the full guide
          </div>
          <div style={{
            fontSize: '0.92rem',
            color: '#5a7a6e',
            lineHeight: 1.6,
            maxWidth: '440px',
            margin: '0 auto 1rem',
          }}>
            We'll email you once we've published the full Clean Picks guide — typically launches 1-2 categories at a time.
          </div>
          <a href="/account" style={{
            display: 'inline-block',
            background: '#2d4a3e',
            color: '#fff',
            padding: '0.7rem 1.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.92rem',
            fontWeight: 600,
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Sign up for updates
          </a>
        </div>

      </main>
      <QuickNav />
    </>
  );
}