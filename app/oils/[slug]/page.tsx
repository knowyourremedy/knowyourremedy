'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { MEDS, REMEDY_TAGS } from '@/lib/medsData'
import { getOilDisplay, formatAgeBadge } from '@/lib/oilCategories'
import DosageCalculatorIcon from '@/components/icons/DosageCalculatorIcon'

type AnyMed = any
const MEDS_ANY = MEDS as Record<string, AnyMed>
const REMEDY_TAGS_ANY = REMEDY_TAGS as Record<string, string>

// Slug helper — converts a med key like "chamomileRomanOil" or
// display name like "Chamomile (Roman) Oil" into a clean URL slug.
function keyToSlug(key: string, med: AnyMed) {
  if (!med?.name) return key.toLowerCase()
  return med.name
    .toLowerCase()
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Reverse — given a URL slug, find the matching oil key in MEDS.
function findOilBySlug(slug: string) {
  const target = slug.toLowerCase()
  for (const [key, med] of Object.entries(MEDS_ANY)) {
    if (med.category !== 'essential_oils') continue
    if (keyToSlug(key, med) === target) return { key, med }
  }
  return null
}

export default function OilDetailPage() {
  const params = useParams()
  const rawSlug = params?.slug
  const slug = typeof rawSlug === 'string' ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] || '' : ''

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

  const formatRows = Object.entries(med.formats || {}).map(([fmtKey, fmt]: [string, any]) => ({
    key: fmtKey,
    label: fmt.label as string,
    concentrations: (fmt.concentrations || []) as any[],
  }))

  const interactionUrl = `/interaction-checker?med=${encodeURIComponent(key)}`

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '1.5rem 1.5rem 4rem' }}>

        {/* Hero illustration strip */}
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
              // Hide the hero strip if no illustration exists yet
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

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}>
          <span style={badgeStyle}>Safe age {ageBadge}</span>
          <span style={badgeStyle}>Topical &amp; diffusion only</span>
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

        {formatRows.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={sectionLabelStyle}>Using this oil</div>
            <div style={sectionLabelRuleStyle}></div>

            <div style={{
              background: '#fef2e8',
              borderLeft: '3px solid #b8651f',
              borderRadius: '0 8px 8px 0',
              padding: '0.75rem 1rem',
              marginBottom: '0.75rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#7a3a0a',
                marginBottom: '2px',
              }}>Always dilute first.</div>
              <div style={{
                fontSize: '0.82rem',
                color: '#7a3a0a',
                fontFamily: 'var(--font-inter), sans-serif',
              }}>Never go from bottle to body.</div>
            </div>

            <div style={{
              background: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              {formatRows.map((row, idx) => {
                const isTopical = (row.label || '').toLowerCase().includes('topical')
                return (
                  <div key={row.key} style={{
                    padding: '0.85rem 1rem',
                    borderBottom: idx < formatRows.length - 1 ? '1px solid #f1ede4' : 'none',
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#2d4a3e',
                      marginBottom: '0.45rem',
                      fontFamily: 'var(--font-inter), sans-serif',
                    }}>
                      {isTopical ? (
                        <>
                          Topical (dilute in a{' '}
                          <Link
                            href="/oils/carriers"
                            style={{
                              color: '#1f3329',
                              fontWeight: 600,
                              textDecoration: 'underline',
                              textDecorationStyle: 'dotted',
                              cursor: 'pointer',
                              transition: 'color 0.15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#0d1a16' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#1f3329' }}
                          >carrier oil →</Link>
                          )
                        </>
                      ) : (
                        row.label
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {row.concentrations.map((c: any, i: number) => {
                        const parts = (c.label as string).split(' — ')
                        return (
                          <div key={i} style={{
                            fontSize: '0.82rem',
                            color: '#5a7a6e',
                            fontFamily: 'var(--font-inter), sans-serif',
                            lineHeight: 1.5,
                          }}>
                            {parts[0]}
                            {parts.length > 1 && (
                              <> — <strong style={{ color: '#2d4a3e', fontWeight: 700 }}>{parts.slice(1).join(' — ')}</strong></>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          <Link href={interactionUrl} style={crossLinkStyle}>
            <div style={crossLinkIconRowStyle}>
              <span style={crossLinkIconStyle}>💊🌿</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={crossLinkSmallStyle}>Compatibility</div>
                <div style={crossLinkBigStyle}>
                  <span style={{ fontWeight: 600 }}>Compare</span> this oil with your meds
                </div>
              </div>
              <span style={crossLinkArrowStyle}>→</span>
            </div>
          </Link>
          <Link href={`/dosage-calculator?med=${encodeURIComponent(key)}`} style={crossLinkStyle}>
            <div style={crossLinkIconRowStyle}>
            <span style={crossLinkIconStyle}><DosageCalculatorIcon size={22} color="#4a6741" /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={crossLinkSmallStyle}>Dosage</div>
                <div style={crossLinkBigStyle}>
                  <span style={{ fontWeight: 600 }}>Calculate</span> the right amount
                </div>
              </div>
              <span style={crossLinkArrowStyle}>→</span>
            </div>
          </Link>
        </div>

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
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#4a6781',
    marginBottom: '0.4rem',
    fontFamily: 'var(--font-inter), sans-serif',
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

const crossLinkStyle: React.CSSProperties = {
  background: '#f0fdf4',
  border: '1px solid #c8ddc0',
  borderRadius: '10px',
  padding: '0.7rem 0.85rem',
  textDecoration: 'none',
  display: 'block',
}

const crossLinkSmallStyle: React.CSSProperties = {
  fontSize: '0.72rem',
  color: '#4a6741',
  marginBottom: '0.2rem',
  fontFamily: 'var(--font-inter), sans-serif',
}

const crossLinkBigStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#2d4a3e',
  fontWeight: 600,
  fontFamily: 'var(--font-inter), sans-serif',
}

const crossLinkIconRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.6rem',
}

const crossLinkIconStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  lineHeight: 1.2,
  paddingTop: '0.1rem',
  flexShrink: 0,
}

const crossLinkArrowStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#4a6741',
  paddingTop: '0.15rem',
  flexShrink: 0,
}