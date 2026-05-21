'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { MEDS } from '@/lib/medsData'
import { OIL_FILTERS, getOilDisplay, formatAgeBadge } from '@/lib/oilCategories'

// Slug helper — mirrors the one in [slug]/page.tsx
function keyToSlug(key, med) {
  if (!med?.name) return key.toLowerCase()
  return med.name
    .toLowerCase()
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Get all oils from MEDS, sorted alphabetically by display name
function buildOilList() {
  return Object.entries(MEDS)
    .filter(([, m]) => m.category === 'essential_oils')
    .map(([key, med]) => ({
      key,
      med,
      slug: keyToSlug(key, med),
      display: getOilDisplay(key, med),
      ageBadge: formatAgeBadge(med),
    }))
    .sort((a, b) => a.med.name.localeCompare(b.med.name))
}

// All 26 letters
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function OilsHubPage() {
  const allOils = useMemo(() => buildOilList(), [])

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Which letters have at least one oil starting with them?
  const lettersInUse = useMemo(() => {
    const set = new Set()
    allOils.forEach(o => set.add(o.med.name.charAt(0).toUpperCase()))
    return set
  }, [allOils])

  // Filter pipeline: filter chip → search query
  const filteredOils = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allOils.filter(o => {
      // Filter chip
      if (activeFilter !== 'all' && !o.display.categories.includes(activeFilter)) {
        return false
      }
      // Search
      if (q && !o.med.name.toLowerCase().includes(q)) {
        return false
      }
      return true
    })
  }, [allOils, activeFilter, search])

  // Jump to a letter section
  const jumpToLetter = (letter) => {
    const el = document.getElementById(`letter-${letter}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Group filtered oils by first letter for the alphabet anchors
  const groupedOils = useMemo(() => {
    const groups = {}
    filteredOils.forEach(o => {
      const letter = o.med.name.charAt(0).toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(o)
    })
    return groups
  }, [filteredOils])

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid #e8e0d0',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#2d4a3e',
            margin: '0 0 0.4rem',
            letterSpacing: '-0.01em',
          }}>Oil Library</h1>
          <p style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#5a7a6e',
            margin: '0 0 0.85rem',
          }}>Plants distilled, honestly explained.</p>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontWeight: 500,
            background: '#e8f3ec',
            color: '#1f5132',
            border: '1px solid #c8ddc0',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Library v1 — {allOils.length} oils. Growing weekly.
          </span>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto 1rem' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)', color: '#9aa39a',
            fontSize: '0.95rem', pointerEvents: 'none',
          }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by oil name..."
            style={{
              width: '100%',
              padding: '0.65rem 2.5rem',
              fontSize: '0.92rem',
              border: '1.5px solid #d9d4c5',
              borderRadius: '999px',
              backgroundColor: '#fff',
              color: '#2d4a3e',
              outline: 'none',
              fontFamily: 'var(--font-inter), sans-serif',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = '#2d4a3e')}
            onBlur={e => (e.target.style.borderColor = '#d9d4c5')}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              style={{
                position: 'absolute', right: '14px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#9aa39a', fontSize: '1.05rem', lineHeight: 1,
              }}
            >✕</button>
          )}
        </div>

        {/* Filter chips */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '0.65rem',
        }}>
          {OIL_FILTERS.map(f => {
            const active = activeFilter === f.key
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: active ? 600 : 500,
                  padding: '0.35rem 0.85rem',
                  background: active ? '#2d4a3e' : '#fff',
                  color: active ? '#fff' : '#5a7a6e',
                  border: active ? '1px solid #2d4a3e' : '1px solid #d9d4c5',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), sans-serif',
                  transition: 'all 0.15s',
                }}
              >
                {f.label}
                {f.key === 'all' ? ` ${allOils.length}` : ''}
              </button>
            )
          })}
        </div>

        {/* Age key line */}
        <div style={{
          fontSize: '0.72rem',
          fontStyle: 'italic',
          color: '#2d4a3e',
          textAlign: 'center',
          marginBottom: '0.85rem',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          Age badges show minimum recommended age — 2+, 6+, 10+, 12+
        </div>

        {/* Alphabet jump row — only when "all" filter and no search */}
        {activeFilter === 'all' && !search && (
          <div style={{
            background: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '8px',
            padding: '0.5rem 0.65rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2px',
          }}>
            {ALPHABET.map(letter => {
              const inUse = lettersInUse.has(letter)
              return (
                <button
                  key={letter}
                  onClick={() => inUse && jumpToLetter(letter)}
                  disabled={!inUse}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: inUse ? 600 : 400,
                    padding: '0.2rem 0.4rem',
                    minWidth: '20px',
                    textAlign: 'center',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: inUse ? 'pointer' : 'not-allowed',
                    background: inUse ? '#f0fdf4' : 'transparent',
                    color: inUse ? '#2d4a3e' : '#c8c4ba',
                    opacity: inUse ? 1 : 0.45,
                    fontFamily: 'var(--font-inter), sans-serif',
                    transition: 'background 0.15s',
                  }}
                  aria-label={`Jump to ${letter}${inUse ? '' : ' (no oils)'}`}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        )}

        {/* Result summary when filtering/searching */}
        {(activeFilter !== 'all' || search) && (
          <div style={{
            fontSize: '0.82rem',
            color: '#7a8a78',
            textAlign: 'center',
            marginBottom: '1rem',
            fontFamily: 'var(--font-inter), sans-serif',
            fontStyle: 'italic',
          }}>
            {filteredOils.length === 0
              ? 'No oils match your filter or search.'
              : `${filteredOils.length} of ${allOils.length} oils shown`}
          </div>
        )}

        {/* Oil grid, grouped by letter (alphabet anchors) */}
        {Object.entries(groupedOils).map(([letter, oils]) => (
          <div key={letter} id={`letter-${letter}`} style={{ marginBottom: '1.25rem' }}>
            {/* Letter section header — only shows when "all" is active */}
            {activeFilter === 'all' && !search && (
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#9aa39a',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
                paddingLeft: '0.25rem',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>{letter}</div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.65rem',
            }}>
              {oils.map(o => (
                <Link
                  key={o.key}
                  href={`/oils/${o.slug}`}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid #e8e0d0',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#c8ddc0'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e8e0d0'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.4rem',
                    gap: '0.5rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#2d4a3e',
                      lineHeight: 1.25,
                    }}>{o.med.name}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      background: '#f1efe8',
                      color: '#5f5e5a',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}>{o.ageBadge}</span>
                  </div>

                  {o.display.scentProfile && (
                    <div style={{
                      fontSize: '0.78rem',
                      color: '#7a8a78',
                      marginBottom: '0.4rem',
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}>{o.display.scentProfile}</div>
                  )}

                  {/* Top 2 condition tags */}
                  {o.med.tags && o.med.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {o.med.tags.slice(0, 2).map(t => (
                        <span key={t} style={{
                          fontSize: '0.7rem',
                          padding: '0.1rem 0.45rem',
                          background: '#faf7f2',
                          border: '1px solid #e8e0d0',
                          borderRadius: '4px',
                          color: '#7a8a78',
                          fontFamily: 'var(--font-inter), sans-serif',
                        }}>{t.replace(/_/g, ' ')}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Footer — ingestion explainer tease */}
        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2d4a3e',
              marginBottom: '0.15rem',
              fontFamily: 'var(--font-playfair), Georgia, serif',
            }}>Safe to ingest vs. topical only?</div>
            <div style={{
              fontSize: '0.78rem',
              color: '#7a8a78',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>The guide most oil sites don&apos;t tell you about.</div>
          </div>
          <span style={{
            fontSize: '0.72rem',
            color: '#9aa39a',
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>coming next</span>
        </div>

      </div>
    </main>
  )
}