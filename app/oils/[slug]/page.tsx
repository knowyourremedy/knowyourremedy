'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { OILS, REMEDY_TAGS } from '@/lib/oilsData'
import { getOilDisplay, formatAgeBadge } from '@/lib/oilCategories'

type AnyMed = any
const OILS_ANY = OILS as Record<string, AnyMed>
const REMEDY_TAGS_ANY = REMEDY_TAGS as Record<string, string>

function keyToSlug(key: string, med: AnyMed) {
  if (!med?.name) return key.toLowerCase()
  return med.name
    .toLowerCase()
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function findOilBySlug(slug: string) {
  const target = slug.toLowerCase()
  for (const [key, med] of Object.entries(OILS_ANY)) {
    if (keyToSlug(key, med) === target) return { key, med }
  }
  return null
}

// Split label at " — " and bold the age portion at the end
function renderConcentrationLabel(label: string) {
  const parts = label.split(' — ')
  if (parts.length <= 1) {
    return <>{label}</>
  }
  return (
    <>
      {parts[0]}
      {' — '}
      <strong style={{ color: '#2d4a3e', fontWeight: 700 }}>
        {parts.slice(1).join(' — ')}
      </strong>
    </>
  )
}

export default function OilDetailPage() {
  const params = useParams()
  const rawSlug = params?.slug
  const slug = typeof rawSlug === 'string' ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] || '' : ''

  const [showInternalModal, setShowInternalModal] = useState(false)
  const [hasSeenInternalWarning, setHasSeenInternalWarning] = useState(false)
  const [internalRevealed, setInternalRevealed] = useState(false)

  const found = useMemo(() => findOilBySlug(slug), [slug])

  if (!found) {
    return (
      <main style={{ minHeight: '70vh', backgroundColor: '#faf7f2', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.75rem', color: '#2d4a3e', marginBottom: '0.5rem',
          }}>Oil not found</h1>
          <p style={{ color: '#5a7a6e', marginBottom: '1.5rem' }}>
            We couldn&rsquo;t find that oil in our library.
          </p>
          <Link href="/oils" style={{
            color: '#4a6741', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
          }}>← Back to all oils</Link>
        </div>
      </main>
    )
  }

  const { key, med } = found
  const display = getOilDisplay(key, med)
  const ageBadge = formatAgeBadge(med)

  const conditionTags: { tag: string; label: string }[] = ((med.tags || []) as string[]).map((t: string) => ({
    tag: t,
    label: REMEDY_TAGS_ANY[t] || t,
  }))

  // Separate format rows into Topical, Diffusion, and Internal buckets
  const formatEntries = Object.entries(med.formats || {})
  const topicalEntry = formatEntries.find(([k, fmt]: [string, any]) => {
    const label = (fmt.label || '').toLowerCase()
    return label.includes('topical') && !label.includes('gum')
  })
  const topicalGumsEntry = formatEntries.find(([k, fmt]: [string, any]) => {
    const label = (fmt.label || '').toLowerCase()
    return label.includes('topical') && label.includes('gum')
  })
  const diffuseEntries = formatEntries.filter(([k, fmt]: [string, any]) => {
    const label = (fmt.label || '').toLowerCase()
    return label.includes('diffusion') || label.includes('inhalation') || label.includes('steam') || label.includes('bug repellent')
  })
  const internalEntry = formatEntries.find(([k, fmt]: [string, any]) => {
    const label = (fmt.label || '').toLowerCase()
    return label.includes('internal') || k === 'internal' || k === 'gelcap'
  })

  // Build dynamic safety pill text
  const availableMethods: string[] = []
  if (topicalEntry || topicalGumsEntry) availableMethods.push('Topical')
  if (diffuseEntries.length > 0) availableMethods.push('Diffuse')
  if (internalEntry) availableMethods.push('Internal')
  const methodsPillText = availableMethods.join(', ')

  function handleInternalReveal() {
    if (hasSeenInternalWarning) {
      setInternalRevealed(!internalRevealed)
    } else {
      setShowInternalModal(true)
    }
  }

  function handleModalConfirm() {
    setHasSeenInternalWarning(true)
    setInternalRevealed(true)
    setShowInternalModal(false)
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>

      {/* Internal Modal */}
      {showInternalModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            maxWidth: '360px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>⚠️</div>
            <h3 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#2d4a3e',
              margin: '0 0 0.6rem',
            }}>Before using internally</h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#2d4a3e',
              fontWeight: 500,
              lineHeight: 1.55,
              margin: '0 0 1rem',
            }}>
              <strong>Not all</strong> &ldquo;100% pure&rdquo; or &ldquo;therapeutic grade&rdquo; oils are safe to ingest.
            </p>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #c8ddc0',
              borderRadius: '10px',
              padding: '0.75rem 0.85rem',
              marginBottom: '1rem',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#166534', marginBottom: '0.3rem' }}>
                ✅ The one reliable indicator
              </div>
              <div style={{ fontSize: '0.82rem', color: '#166534', lineHeight: 1.5 }}>
                A <strong>Supplement Facts panel</strong> on the label. <Link href="/oils/safe-to-ingest" style={{ color: '#166534', textDecoration: 'underline', textDecorationStyle: 'dotted', fontWeight: 700 }}>Learn more →</Link>
              </div>
            </div>
            <button
              onClick={handleModalConfirm}
              style={{
                width: '100%',
                padding: '0.7rem',
                backgroundColor: '#2d4a3e',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              I understand
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

        {/* Hero illustration */}
        <div style={{
          background: '#f5efe0',
          margin: '-1.5rem -1.5rem 1.5rem',
          padding: '1.5rem 1.5rem 1rem',
          textAlign: 'center',
          borderBottom: '1px solid #e8e0d0',
        }}>
          <img
            src={`/illustrations/oils/${slug}.jpg`}
            alt={`${med.name} botanical illustration`}
            style={{
              maxHeight: '240px',
              maxWidth: '100%',
              height: 'auto',
              width: 'auto',
              mixBlendMode: 'multiply',
              display: 'block',
              margin: '0 auto',
            }}
            onError={(e) => {
              const parent = (e.target as HTMLImageElement).parentElement
              if (parent) parent.style.display = 'none'
            }}
          />
        </div>

        <Link href="/oils" style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          color: '#4a6741',
          textDecoration: 'none',
          marginBottom: '1.25rem',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>← All oils</Link>

        <div style={{
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e8e0d0',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2d4a3e',
            margin: '0 0 0.35rem',
            letterSpacing: '-0.01em',
          }}>{med.name}</h1>
          <p style={{
            fontSize: '0.9rem',
            color: '#7a8a78',
            margin: 0,
            fontFamily: 'var(--font-inter), sans-serif',
          }}>{display.scentProfile}{med.brand && med.brand !== 'Various' ? ` · ${med.brand}` : ''}</p>
        </div>

        {/* Dynamic safety pills */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}>
          <span style={badgeStyle}>Safe age {ageBadge}</span>
          <span style={badgeStyle}>{methodsPillText || 'Topical only'}</span>
          {(med.warnings?.adult || '').toLowerCase().includes('phototoxic') && (
            <span style={badgeStyle}>⚠️ Phototoxic (avoid sun)</span>
          )}
        </div>

        {conditionTags.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={sectionLabelStyle}>Best for</div>
            <div style={sectionLabelRuleStyle}></div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {conditionTags.map(({ tag, label }) => (
                <Link
                  key={tag}
                  href={`/conditions/${tag.replace(/_/g, '-')}`}
                  style={tagPillStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eaf5e6'
                    e.currentTarget.style.borderColor = '#7ba169'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.style.borderColor = '#c8ddc0'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {label} <span style={{ color: '#4a6741', fontWeight: 500 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Using this oil */}
        {(topicalEntry || topicalGumsEntry || diffuseEntries.length > 0 || internalEntry) && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={sectionLabelStyle}>Using this oil</div>
            <div style={sectionLabelRuleStyle}></div>

            <div style={{
              background: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>

              {/* Topical */}
              {topicalEntry && (() => {
                const [, fmt] = topicalEntry as [string, any]
                return (
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid #f1ede4',
                  }}>
                    <div style={{ marginBottom: '0.45rem', fontFamily: 'var(--font-inter), sans-serif' }}>
                      <span style={{ color: '#2980b9', fontSize: '1rem', fontWeight: 700 }}>Topical</span>
                      <span style={{ color: '#5a7d96', fontSize: '0.88rem', fontWeight: 700, marginLeft: '0.4rem' }}>
                        (dilute in a{' '}
                        <Link
                          href="/oils/carriers"
                          style={{
                            color: '#5a7d96',
                            fontWeight: 700,
                            textDecoration: 'underline',
                            textDecorationStyle: 'dotted',
                            cursor: 'pointer',
                          }}
                        >carrier oil →</Link>
                        )
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {(fmt.concentrations || []).map((c: any, i: number) => (
                        <div key={i} style={{
                          fontSize: '0.82rem',
                          color: '#5a7a6e',
                          fontFamily: 'var(--font-inter), sans-serif',
                          lineHeight: 1.5,
                        }}>
                          {renderConcentrationLabel(c.label)}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Topical (gums — for clove oil) */}
              {topicalGumsEntry && (() => {
                const [, fmt] = topicalGumsEntry as [string, any]
                return (
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid #f1ede4',
                  }}>
                    <div style={{ marginBottom: '0.45rem', fontFamily: 'var(--font-inter), sans-serif' }}>
                      <span style={{ color: '#2980b9', fontSize: '1rem', fontWeight: 700 }}>Topical on gums</span>
                      <span style={{ color: '#5a7d96', fontSize: '0.88rem', fontWeight: 700, marginLeft: '0.4rem' }}>
                        (heavily diluted in a{' '}
                        <Link
                          href="/oils/carriers"
                          style={{
                            color: '#5a7d96',
                            fontWeight: 700,
                            textDecoration: 'underline',
                            textDecorationStyle: 'dotted',
                            cursor: 'pointer',
                          }}
                        >carrier oil →</Link>
                        )
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {(fmt.concentrations || []).map((c: any, i: number) => (
                        <div key={i} style={{
                          fontSize: '0.82rem',
                          color: '#5a7a6e',
                          fontFamily: 'var(--font-inter), sans-serif',
                          lineHeight: 1.5,
                        }}>
                          {renderConcentrationLabel(c.label)}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Diffusion */}
              {diffuseEntries.map(([k, fmt]: [string, any], idx: number) => (
                <div key={k} style={{
                  padding: '0.85rem 1rem',
                  borderBottom: (idx < diffuseEntries.length - 1) || internalEntry ? '1px solid #f1ede4' : 'none',
                }}>
                  <div style={{ marginBottom: '0.45rem', fontFamily: 'var(--font-inter), sans-serif' }}>
                    <span style={{ color: '#7c3aed', fontSize: '1rem', fontWeight: 700 }}>{fmt.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {(fmt.concentrations || []).map((c: any, i: number) => (
                      <div key={i} style={{
                        fontSize: '0.82rem',
                        color: '#5a7a6e',
                        fontFamily: 'var(--font-inter), sans-serif',
                        lineHeight: 1.5,
                      }}>
                        {renderConcentrationLabel(c.label)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Internal — tap to reveal */}
              {internalEntry && (() => {
                const [, fmt] = internalEntry as [string, any]
                return (
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: internalRevealed ? '#fafaf7' : 'transparent',
                  }}>
                    <button
                      onClick={handleInternalReveal}
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 0,
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#78350f', fontSize: '1rem', fontWeight: 700 }}>Internal</span>
                        {!internalRevealed && (
                          <span style={{ fontSize: '0.82rem', color: '#5a7a6e' }}>
                            Tap to view
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                        {internalRevealed ? '▲' : '▼'}
                      </span>
                    </button>
                    {internalRevealed && (
                      <div style={{ marginTop: '0.7rem' }}>
                        <div style={{ marginBottom: '0.4rem' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            color: '#78350f',
                            border: '1px solid #78350f',
                            padding: '2px 9px',
                            borderRadius: '999px',
                            background: '#fff',
                            display: 'inline-block',
                          }}>Supplement Facts only</span>
                        </div>
                        <div style={{
                          background: '#fff',
                          borderLeft: '3px solid #7ba169',
                          padding: '0.55rem 0.7rem',
                          fontSize: '0.8rem',
                          color: '#2d4a3e',
                          lineHeight: 1.55,
                          borderRadius: '0 6px 6px 0',
                          marginBottom: '0.7rem',
                        }}>
                          Look for a <strong>Supplement Facts panel</strong> on the label — the only reliable indicator an oil is safe to ingest. <Link href="/oils/safe-to-ingest" style={{ color: '#2d4a3e', textDecoration: 'underline', textDecorationStyle: 'dotted', fontWeight: 700 }}>Learn more →</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {(fmt.concentrations || []).map((c: any, i: number) => (
                            <div key={i} style={{
                              fontSize: '0.82rem',
                              color: '#5a7a6e',
                              fontFamily: 'var(--font-inter), sans-serif',
                              lineHeight: 1.5,
                            }}>
                              {renderConcentrationLabel(c.label)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

            </div>
          </div>
        )}

        {/* Use with care */}
        {(med.warnings?.child || med.warnings?.adult) && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={sectionLabelStyle}>Use with care</div>
            <div style={sectionLabelRuleStyle}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {med.warnings?.child && (
                <div style={{
                  background: '#fdecea',
                  borderLeft: '3px solid #c0392b',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.75rem 1rem',
                }}>
                  <div style={warningLabelStyle('#7a1c1c')}>Children</div>
                  <div style={warningTextStyle('#7a1c1c')}>{med.warnings.child}</div>
                </div>
              )}
              {med.warnings?.adult && (
                <div style={{
                  background: '#fef7e6',
                  borderLeft: '3px solid #d97706',
                  borderRadius: '0 8px 8px 0',
                  padding: '0.75rem 1rem',
                }}>
                  <div style={warningLabelStyle('#5c4a1f')}>Adults</div>
                  <div style={warningTextStyle('#5c4a1f')}>{med.warnings.adult}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {med.source && (
          <div style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid #e8e0d0',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#5a7a6e',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginRight: '0.45rem',
            }}>Sources</span>
            <span style={{
              fontSize: '0.72rem',
              color: '#9aa39a',
              fontStyle: 'italic',
              lineHeight: 1.55,
            }}>{med.source}</span>
          </div>
        )}

      </div>
    </main>
  )
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.78rem',
  fontWeight: 700,
  background: '#fff',
  color: '#c0392b',
  border: '1.5px solid #c0392b',
  padding: '0.3rem 0.75rem',
  borderRadius: '999px',
  fontFamily: 'var(--font-inter), sans-serif',
}

const sectionLabelStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#2d4a3e',
  marginBottom: '0.35rem',
  fontFamily: 'var(--font-playfair), Georgia, serif',
  position: 'relative',
}

const sectionLabelRuleStyle: React.CSSProperties = {
  width: '28px',
  height: '2px',
  background: '#4a6781',
  borderRadius: '2px',
  marginBottom: '0.7rem',
}

const tagPillStyle: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.82rem',
  padding: '0.3rem 0.7rem',
  background: '#fff',
  border: '1px solid #c8ddc0',
  borderRadius: '999px',
  color: '#2d4a3e',
  textDecoration: 'none',
  fontFamily: 'var(--font-inter), sans-serif',
  transition: 'background 0.15s, border-color 0.15s, transform 0.15s',
  cursor: 'pointer',
}

const warningLabelStyle = (color: string): React.CSSProperties => ({
  fontSize: '0.7rem',
  fontWeight: 700,
  color,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '0.3rem',
  fontFamily: 'var(--font-inter), sans-serif',
})

const warningTextStyle = (color: string): React.CSSProperties => ({
  fontSize: '0.85rem',
  color,
  lineHeight: 1.55,
  fontFamily: 'var(--font-inter), sans-serif',
})
