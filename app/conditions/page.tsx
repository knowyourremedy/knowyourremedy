'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import ConditionLayout from '@/components/ConditionLayout'

// ─── Featured: most common conditions at top ──────────────────
const FEATURED = [
  { name: 'Headache', slug: 'headache', icon: '🧠', desc: 'Tension, sinus, dehydration' },
  { name: 'Cold and Flu', slug: 'cold-and-flu', icon: '🫁', desc: 'Cough, fever, congestion' },
  { name: 'Insomnia', slug: 'insomnia', icon: '🌙', desc: 'Trouble falling or staying asleep' },
  { name: 'Allergies', slug: 'allergies', icon: '🌿', desc: 'Hay fever, sneezing, itchy eyes' },
  { name: 'Anxiety and Stress', slug: 'anxiety-and-stress', icon: '💭', desc: 'Worry, tension, overwhelm' },
  { name: 'Upset Stomach', slug: 'upset-stomach', icon: '🍵', desc: 'Indigestion, cramping' },
]

// ─── All categories grouped by topic ──────────────────────────
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

// ─── Shared styles ────────────────────────────────────────────
const sectionLabelStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#2d4a3e',
  marginBottom: '0.35rem',
  fontFamily: 'var(--font-playfair), Georgia, serif',
}

const sectionRuleStyle: React.CSSProperties = {
  width: '28px',
  height: '2px',
  background: '#4a6781',
  borderRadius: '2px',
  marginBottom: '1rem',
}

export default function Conditions() {
  const [search, setSearch] = useState('')

  // Filter conditions by search term
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return CATEGORIES

    return CATEGORIES
      .map(cat => {
        const categoryMatches = cat.name.toLowerCase().includes(q)
        const matchingRemedies = cat.remedies.filter(r =>
          r.name.toLowerCase().includes(q)
        )
        if (categoryMatches) return cat
        if (matchingRemedies.length > 0) return { ...cat, remedies: matchingRemedies }
        return null
      })
      .filter(Boolean) as typeof CATEGORIES
  }, [search])

  const totalResults = filtered.reduce((sum, cat) => sum + cat.remedies.length, 0)
  const isSearching = search.trim().length > 0

  return (
    <ConditionLayout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* Hero */}
        <div style={{
          marginBottom: '1.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid #e8e0d0',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2d4a3e',
            margin: '0 0 0.35rem',
            letterSpacing: '-0.01em',
          }}>Conditions</h1>
          <p style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: '#7a8a78',
            margin: 0,
          }}>Find your condition. See the options side by side.</p>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
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
            >✕</button>
          )}
          {search && (
            <p style={{
              marginTop: '0.6rem',
              fontSize: '0.82rem',
              color: '#7a8a78',
              fontStyle: 'italic',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              {totalResults === 0
                ? `No conditions match "${search}"`
                : `${totalResults} condition${totalResults === 1 ? '' : 's'} matching "${search}"`}
            </p>
          )}
        </div>

        {/* Most Common — only show when not searching */}
        {!isSearching && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={sectionLabelStyle}>Most common</div>
            <div style={sectionRuleStyle}></div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '0.75rem',
            }}>
              {FEATURED.map(item => (
                <Link
                  key={item.slug}
                  href={`/conditions/${item.slug}`}
                  style={{
                    background: '#fff',
                    border: '1px solid #e8e0d0',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'border-color 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f0fdf4'
                    e.currentTarget.style.borderColor = '#7ba169'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.style.borderColor = '#e8e0d0'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#f5efe0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    flexShrink: 0,
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#2d4a3e',
                      fontFamily: 'var(--font-inter), sans-serif',
                      marginBottom: '0.15rem',
                    }}>{item.name}</div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#7a8a78',
                      fontFamily: 'var(--font-inter), sans-serif',
                      lineHeight: 1.4,
                    }}>{item.desc}</div>
                  </div>
                  <span style={{
                    color: '#4a6741',
                    fontSize: '0.95rem',
                    flexShrink: 0,
                  }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All conditions grouped */}
        <div>
          <div style={sectionLabelStyle}>
            {isSearching ? 'Search results' : 'All conditions'}
          </div>
          <div style={sectionRuleStyle}></div>

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
              <p style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#2d4a3e',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>No conditions found</p>
              <p style={{
                fontSize: '0.88rem',
                lineHeight: 1.5,
                maxWidth: '380px',
                margin: '0 auto',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>Try a different search term, or clear the search to see all conditions.</p>
            </div>
          ) : (
            filtered.map(category => (
              <div key={category.name} style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4a6781',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  marginBottom: '0.6rem',
                  fontFamily: 'var(--font-inter), sans-serif',
                }}>{category.name}</div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.5rem',
                }}>
                  {category.remedies.map(item => (
                    <Link
                      key={item.slug}
                      href={`/conditions/${item.slug}`}
                      style={{
                        background: '#fff',
                        border: '1px solid #e8e0d0',
                        borderRadius: '8px',
                        padding: '0.7rem 0.9rem',
                        textDecoration: 'none',
                        color: '#2d4a3e',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'border-color 0.15s, transform 0.15s',
                        display: 'block',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#f0fdf4'
                        e.currentTarget.style.borderColor = '#7ba169'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#fff'
                        e.currentTarget.style.borderColor = '#e8e0d0'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </ConditionLayout>
  )
}