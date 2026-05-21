'use client'
import { useState, useMemo } from 'react'
import ConditionLayout from '@/components/ConditionLayout'

// ─── Data: all categories and conditions in one structure ─────
const CATEGORIES = [
  {
    name: 'Pain and Inflammation',
    remedies: [
      { name: 'Headache', slug: 'headache' },
      { name: 'Muscle Pain', slug: 'muscle-pain' },
      { name: 'Joint Pain', slug: 'joint-pain' },
      { name: 'Back Pain', slug: 'back-pain' },
      { name: 'Menstrual Cramps', slug: 'menstrual-cramps' },
      { name: 'Dental Pain', slug: 'dental-pain' },
    ],
  },
  {
    name: 'Fever and Immune',
    remedies: [
      { name: 'Fever', slug: 'fever' },
      { name: 'Cold and Flu', slug: 'cold-and-flu' },
      { name: 'Sore Throat', slug: 'sore-throat' },
      { name: 'Sinus Congestion', slug: 'sinus-congestion' },
      { name: 'Ear Pain', slug: 'ear-pain' },
    ],
  },
  {
    name: 'Digestive',
    remedies: [
      { name: 'Upset Stomach', slug: 'upset-stomach' },
      { name: 'Nausea', slug: 'nausea' },
      { name: 'Heartburn', slug: 'heartburn' },
      { name: 'Bloating and Gas', slug: 'bloating-and-gas' },
      { name: 'Diarrhea', slug: 'diarrhea' },
      { name: 'Constipation', slug: 'constipation' },
    ],
  },
  {
    name: 'Allergies and Respiratory',
    remedies: [
      { name: 'Seasonal Allergies', slug: 'allergies' },
      { name: 'Itchy Eyes', slug: 'itchy-eyes' },
      { name: 'Skin Allergies', slug: 'skin-allergies' },
    ],
  },
  {
    name: 'Skin and External',
    remedies: [
      { name: 'Minor Cuts', slug: 'minor-cuts' },
      { name: 'Burns and Sunburn', slug: 'burns-and-sunburn' },
      { name: 'Insect Bites', slug: 'insect-bites' },
      { name: 'Rashes', slug: 'rashes' },
      { name: 'Muscle Soreness Topical', slug: 'muscle-soreness-topical' },
    ],
  },
  {
    name: 'Sleep and Stress',
    remedies: [
      { name: 'Insomnia', slug: 'insomnia' },
      { name: 'Anxiety and Stress', slug: 'anxiety-and-stress' },
      { name: 'Tension Headaches', slug: 'tension-headaches' },
      { name: 'Migraines', slug: 'migraines' },
    ],
  },
  {
    name: 'Children and Infants',
    remedies: [
      { name: 'Teething Pain', slug: 'teething-pain' },
      { name: 'Colic', slug: 'colic' },
      { name: 'Diaper Rash', slug: 'diaper-rash' },
      { name: 'Growing Pains', slug: 'growing-pains' },
    ],
  },
]

// ─── Shared card styling ─────────────────────────────────────
const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: '1rem 1.25rem',
  backgroundColor: '#fff',
  border: '1px solid #e8e0d0',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#2d4a3e',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'all 0.15s',
}

export default function Conditions() {
  const [search, setSearch] = useState('')

  // Filter conditions by search term — case-insensitive, matches name OR category
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return CATEGORIES

    return CATEGORIES
      .map(cat => {
        // If the category name itself matches, include all its conditions
        const categoryMatches = cat.name.toLowerCase().includes(q)
        const matchingRemedies = cat.remedies.filter(r =>
          r.name.toLowerCase().includes(q)
        )
        if (categoryMatches) {
          return cat // keep the whole category
        }
        if (matchingRemedies.length > 0) {
          return { ...cat, remedies: matchingRemedies }
        }
        return null
      })
      .filter(Boolean) as typeof CATEGORIES
  }, [search])

  const totalResults = filtered.reduce((sum, cat) => sum + cat.remedies.length, 0)

  return (
    <ConditionLayout>
      <section style={{
        textAlign: 'center',
        padding: '3rem 2rem 1.5rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#2d4a3e',
          marginBottom: '0.5rem'
        }}>
          Conditions
        </h1>
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: '#5a7a6e',
          marginBottom: '1.25rem',
          letterSpacing: '0.01em',
        }}>
          Remedies — Options from the Shelf, Root, and in Between
        </p>
        <p style={{
          fontSize: '1.05rem',
          color: '#5a7a6e',
          lineHeight: '1.6',
          marginBottom: '2rem',
          maxWidth: '620px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Find your condition and see options side by side — conventional, natural, and everything in between.
        </p>

        {/* Search bar */}
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8b8b8b',
            fontSize: '1rem',
            pointerEvents: 'none',
          }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for a symptom or condition..."
            style={{
              width: '100%',
              padding: '0.7rem 2.5rem 0.7rem 2.5rem',
              fontSize: '0.95rem',
              border: '1.5px solid #d9d4c5',
              borderRadius: '999px',
              backgroundColor: '#fff',
              color: '#2d4a3e',
              outline: 'none',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={e => (e.target.style.borderColor = '#2d4a3e')}
            onBlur={e => (e.target.style.borderColor = '#d9d4c5')}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#8b8b8b',
                fontSize: '1.1rem',
                padding: '0.25rem',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {search && (
          <p style={{
            marginTop: '0.85rem',
            fontSize: '0.85rem',
            color: '#6b6b6b',
            fontStyle: 'italic',
          }}>
            {totalResults === 0
              ? `No conditions match "${search}"`
              : `${totalResults} condition${totalResults === 1 ? '' : 's'} matching "${search}"`}
          </p>
        )}
      </section>

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem 4rem'
      }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            backgroundColor: '#fff',
            border: '1px dashed #d9d4c5',
            borderRadius: '12px',
            color: '#6b6b6b',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#2d4a3e', marginBottom: '0.5rem' }}>
              No conditions found
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.5, maxWidth: '380px', margin: '0 auto' }}>
              Try a different search term, or clear the search to see all conditions.
            </p>
          </div>
        ) : (
          filtered.map((category) => (
            <div key={category.name} style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                color: '#2d4a3e',
                borderBottom: '2px solid #c8b89a',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                {category.name}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem'
              }}>
                {category.remedies.map((item) => (
                  
                  <a key={item.slug}
                    href={`/conditions/${item.slug}`}
                    style={cardStyle}
                  >
                    🌿 {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </ConditionLayout>
  )
}