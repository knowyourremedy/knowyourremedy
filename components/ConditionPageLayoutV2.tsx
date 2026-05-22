'use client'
import { useState } from 'react'
import Link from 'next/link'
import ConditionLayout from './ConditionLayout'
import DosageCalculatorIcon from '@/components/icons/DosageCalculatorIcon'

// ─── Types ─────────────────────────────────────────────────
type PregnancySafe = 'safe' | 'avoid' | 'ask'

interface UseTypeBlock {
  ageRange?: string
  pregnancySafe?: PregnancySafe
  desc?: string
  warning?: string
  safeUse?: string
}

interface NaturalItem {
  name: string
  desc: string
  warning?: string
  pregnancySafe?: PregnancySafe
  oilSlug?: string
  ageRange?: string
  topical?: UseTypeBlock & { dilute?: boolean }
  diffuse?: UseTypeBlock
  internal?: UseTypeBlock & { products?: string }
}

interface MainstreamItem {
  name: string
  desc: string
  rating?: string
  ratingColor?: string
  pregnancySafe?: PregnancySafe
  ageRange?: string
}

interface InPinchItem {
  category: string
  desc: string
  note: string
  pregnancySafe?: PregnancySafe
  ageRange?: string
}

type UnifiedRemedy = {
  id: string
  type: 'natural' | 'otc' | 'backup'
  name: string
  desc: string
  warning?: string
  pregnancySafe?: PregnancySafe
  oilSlug?: string
  ageRange?: string
  topical?: UseTypeBlock & { dilute?: boolean }
  diffuse?: UseTypeBlock
  internal?: UseTypeBlock & { products?: string }
  rating?: string
  ratingColor?: string
  note?: string
}

interface ConditionPageLayoutV2Props {
  title: string
  subtitle: string
  bodySystem?: string
  emergency?: string
  naturalItems: NaturalItem[]
  mainstreamItems: MainstreamItem[]
  inPinchItems: InPinchItem[]
  dosageLink?: string
  sources?: string
}

type FilterType = 'all' | 'natural' | 'otc' | 'backup' | 'pregnancy-safe'

// ─── Body System → Anatomy Plate Mapping ─────────────────────
const BODY_SYSTEM_MAP: Record<string, string> = {
  headache: 'head',
  migraines: 'head',
  'tension-headaches': 'head',
  'sinus-congestion': 'respiratory',
  'cold-and-flu': 'respiratory',
  'sore-throat': 'respiratory',
  'dental-pain': 'dental',
  'teething-pain': 'dental',
  'ear-pain': 'ear',
  'itchy-eyes': 'eye',
  allergies: 'eye',
  'upset-stomach': 'digestive',
  nausea: 'digestive',
  heartburn: 'digestive',
  'bloating-and-gas': 'digestive',
  diarrhea: 'digestive',
  constipation: 'digestive',
  colic: 'digestive',
  'muscle-pain': 'musculoskeletal',
  'joint-pain': 'musculoskeletal',
  'back-pain': 'musculoskeletal',
  'growing-pains': 'musculoskeletal',
  'minor-cuts': 'skin',
  'burns-and-sunburn': 'skin',
  'insect-bites': 'skin',
  rashes: 'skin',
  'diaper-rash': 'skin',
  'skin-allergies': 'skin',
  'menstrual-cramps': 'reproductive',
  insomnia: 'nervous',
  'anxiety-and-stress': 'nervous',
}

// ─── Helpers ─────────────────────────────────────────────────
function isPregnancySafe(remedy: UnifiedRemedy): boolean {
  if (remedy.pregnancySafe === 'safe') return true
  if (remedy.topical?.pregnancySafe === 'safe') return true
  if (remedy.diffuse?.pregnancySafe === 'safe') return true
  if (remedy.internal?.pregnancySafe === 'safe') return true
  return false
}

// Does the age range refer to children under 12?
function isKidAge(ageRange: string | undefined): boolean {
  if (!ageRange) return false
  const lower = ageRange.toLowerCase()
  if (lower.includes('adult')) return false
  if (lower.includes('all ages')) return true
  if (lower.includes('6 months') || lower.includes('6mo')) return true
  if (lower.match(/age (\d+)/)) {
    const age = parseInt(lower.match(/age (\d+)/)![1])
    return age < 12
  }
  if (lower.match(/(\d+)\+/)) {
    const age = parseInt(lower.match(/(\d+)\+/)![1])
    return age < 12
  }
  return false
}

// Render bold age text, with 👶 emoji only if kid age
function AgeBadge({ ageRange }: { ageRange?: string }) {
  if (!ageRange) return null
  const showEmoji = isKidAge(ageRange)
  return (
    <span style={{
      fontSize: '0.78rem',
      color: '#2d4a3e',
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
    }}>
      {showEmoji && <span>👶</span>}{ageRange}
    </span>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function ConditionPageLayoutV2({
  title,
  subtitle,
  bodySystem,
  emergency,
  naturalItems,
  mainstreamItems,
  inPinchItems,
  dosageLink,
  sources,
}: ConditionPageLayoutV2Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [internalExpanded, setInternalExpanded] = useState<Record<string, boolean>>({})
  const [showInternalModal, setShowInternalModal] = useState(false)
  const [pendingInternalKey, setPendingInternalKey] = useState<string | null>(null)
  const [hasSeenInternalWarning, setHasSeenInternalWarning] = useState(false)

  const allRemedies: UnifiedRemedy[] = [
    ...naturalItems.map((item, i) => ({
      id: `natural-${i}-${item.name}`,
      type: 'natural' as const,
      name: item.name,
      desc: item.desc,
      warning: item.warning,
      pregnancySafe: item.pregnancySafe,
      oilSlug: item.oilSlug,
      ageRange: item.ageRange,
      topical: item.topical,
      diffuse: item.diffuse,
      internal: item.internal,
    })),
    ...mainstreamItems.map((item, i) => ({
      id: `otc-${i}-${item.name}`,
      type: 'otc' as const,
      name: item.name,
      desc: item.desc,
      pregnancySafe: item.pregnancySafe,
      ageRange: item.ageRange,
      rating: item.rating,
      ratingColor: item.ratingColor,
    })),
    ...inPinchItems.map((item, i) => ({
      id: `backup-${i}-${item.category}`,
      type: 'backup' as const,
      name: item.category,
      desc: item.desc,
      note: item.note,
      pregnancySafe: item.pregnancySafe,
      ageRange: item.ageRange,
    })),
  ]

  const filteredRemedies = allRemedies.filter(r => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'natural') return r.type === 'natural'
    if (activeFilter === 'otc') return r.type === 'otc'
    if (activeFilter === 'backup') return r.type === 'backup'
    if (activeFilter === 'pregnancy-safe') return isPregnancySafe(r)
    return true
  })

  const plateName = bodySystem || (BODY_SYSTEM_MAP[title.toLowerCase().replace(/\s+/g, '-')] || null)

  function handleInternalTap(remedyId: string) {
    if (hasSeenInternalWarning) {
      setInternalExpanded(prev => ({ ...prev, [remedyId]: !prev[remedyId] }))
    } else {
      setPendingInternalKey(remedyId)
      setShowInternalModal(true)
    }
  }

  function handleModalConfirm() {
    setHasSeenInternalWarning(true)
    if (pendingInternalKey) {
      setInternalExpanded(prev => ({ ...prev, [pendingInternalKey]: true }))
    }
    setShowInternalModal(false)
    setPendingInternalKey(null)
  }

  const filterChips: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'natural', label: '🌿 Natural' },
    { key: 'otc', label: '🏪 OTC' },
    { key: 'backup', label: '🆗 Backup' },
    { key: 'pregnancy-safe', label: '🤰 Pregnancy-safe' },
  ]

  const sectionLabelStyle: React.CSSProperties = {
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#4a6781',
    marginBottom: '0.4rem',
    fontFamily: 'var(--font-inter), sans-serif',
  }
  const sectionRuleStyle: React.CSSProperties = {
    width: '28px',
    height: '2px',
    background: '#4a6781',
    borderRadius: '2px',
    marginBottom: '0.7rem',
  }

  function getBadgeStyle(type: 'natural' | 'otc' | 'backup'): React.CSSProperties {
    if (type === 'natural') return { background: '#eaf3de', color: '#3b6d11' }
    if (type === 'otc') return { background: '#fef7e6', color: '#5c4a1f' }
    return { background: '#fbeaf0', color: '#722e3e' }
  }

  function getBadgeIcon(type: 'natural' | 'otc' | 'backup'): string {
    if (type === 'natural') return '🌿'
    if (type === 'otc') return '🏪'
    return '🆗'
  }

  return (
    <ConditionLayout>
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
              fontSize: '0.85rem',
              color: '#5a7a6e',
              lineHeight: 1.6,
              margin: '0 0 1rem',
            }}>
              Not all &ldquo;100% pure&rdquo; or &ldquo;therapeutic grade&rdquo; oils are safe to ingest.
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
                A <strong>Supplement Facts panel</strong> on the label.
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

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0' }}>

        {/* Hero illustration */}
        {plateName && (
          <div style={{
            background: '#f5efe0',
            margin: '0 -1.5rem 1.5rem',
            padding: '1.5rem 1.5rem 1rem',
            textAlign: 'center',
            borderBottom: '1px solid #e8e0d0',
          }}>
            <img
              src={`/illustrations/conditions/${plateName}.jpg`}
              alt={`${title} body system anatomy illustration`}
              style={{
                maxHeight: '220px',
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
        )}

        {/* Title + subtitle */}
        <div style={{ marginBottom: '1rem', padding: '0 1.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.85rem',
            fontWeight: 700,
            color: '#2d4a3e',
            margin: '0 0 0.3rem',
          }}>{title}</h1>
          <p style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '0.92rem',
            color: '#7a8a78',
            margin: 0,
          }}>{subtitle}</p>
        </div>

        {/* Emergency */}
        {emergency && (
          <div style={{
            margin: '0 1.5rem 1.25rem',
            background: '#fdecea',
            borderLeft: '3px solid #c0392b',
            borderRadius: '0 8px 8px 0',
            padding: '0.7rem 0.85rem',
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#7a1c1c',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.25rem',
            }}>When to see a doctor</div>
            <div style={{ fontSize: '0.82rem', color: '#7a1c1c', lineHeight: 1.55 }}>
              {emergency}
            </div>
          </div>
        )}

        {/* Filter chips */}
        <div style={{ padding: '0 1.5rem 1rem' }}>
          <div style={sectionLabelStyle}>Your options</div>
          <div style={sectionRuleStyle}></div>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {filterChips.map(chip => {
              const isActive = activeFilter === chip.key
              return (
                <button
                  key={chip.key}
                  onClick={() => setActiveFilter(chip.key)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.7rem',
                    background: isActive ? '#2d4a3e' : '#fff',
                    color: isActive ? '#fff' : '#5a7a6e',
                    border: isActive ? '1px solid #2d4a3e' : '1px solid #d9d4c5',
                    borderRadius: '999px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  {chip.label}{isActive && chip.key !== 'all' ? ' ✕' : ''}
                </button>
              )
            })}
          </div>
          {activeFilter !== 'all' && (
            <div style={{
              fontSize: '0.78rem',
              color: '#7a8a78',
              fontStyle: 'italic',
              marginTop: '0.5rem',
            }}>
              Showing {filteredRemedies.length} of {allRemedies.length}
            </div>
          )}
        </div>

        {/* Remedy list */}
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {filteredRemedies.length === 0 ? (
              <div style={{
                padding: '1.5rem',
                textAlign: 'center',
                color: '#7a8a78',
                fontSize: '0.88rem',
              }}>
                No remedies match this filter.
              </div>
            ) : (
              filteredRemedies.map((remedy, i) => {
                const isExpanded = expanded === remedy.id
                const isLast = i === filteredRemedies.length - 1
                const isInternalOpen = internalExpanded[remedy.id]

                return (
                  <div
                    key={remedy.id}
                    style={{
                      borderBottom: isLast ? 'none' : '0.5px solid #f1ede4',
                    }}
                  >
                    <button
                      onClick={() => setExpanded(isExpanded ? null : remedy.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.7rem 0.85rem',
                        background: isExpanded ? '#f0fdf4' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontFamily: 'var(--font-inter), sans-serif',
                      }}
                    >
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        flexShrink: 0,
                        ...getBadgeStyle(remedy.type),
                      }}>
                        {getBadgeIcon(remedy.type)}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: '#2d4a3e',
                        }}>
                          {remedy.name}
                          {remedy.oilSlug && (
                            <span style={{ color: '#4a6741', fontSize: '0.78rem', marginLeft: '0.25rem' }}>→</span>
                          )}
                        </div>
                      </div>
                      <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </button>

                    {isExpanded && (
                      <div style={{ padding: '0.85rem 1rem 1rem' }}>

                        {/* TOPICAL BLOCK (natural only) */}
                        {remedy.type === 'natural' && remedy.topical && (
                          <div style={{ marginBottom: '0.9rem' }}>
                            <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#2980b9',
                                border: '1px solid #2980b9',
                                padding: '2px 9px',
                                borderRadius: '999px',
                                background: '#fff',
                              }}>
                                Topical{remedy.topical.dilute && (
                                  <> (dilute in a <Link href="/oils/carriers" style={{ color: '#2980b9', textDecoration: 'underline', textDecorationStyle: 'dotted', fontWeight: 700 }}>carrier oil →</Link>)</>
                                )}
                              </span>
                              <AgeBadge ageRange={remedy.topical.ageRange} />
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#5a7a6e',
                              lineHeight: 1.6,
                              marginBottom: '0.5rem',
                            }}>
                              {remedy.topical.desc || remedy.desc}
                            </div>
                            {remedy.topical.warning && (
                              <div style={{
                                background: '#fef3e0',
                                borderLeft: '3px solid #d97706',
                                padding: '0.55rem 0.7rem',
                                fontSize: '0.8rem',
                                color: '#92400e',
                                lineHeight: 1.5,
                                marginBottom: '0.5rem',
                              }}>
                                ⚠️ {remedy.topical.warning}
                              </div>
                            )}
                            {remedy.topical.safeUse && (
                              <div style={{
                                background: '#f0fdf4',
                                borderLeft: '3px solid #27ae60',
                                padding: '0.55rem 0.7rem',
                                fontSize: '0.8rem',
                                color: '#166534',
                                lineHeight: 1.5,
                              }}>
                                ✅ {remedy.topical.safeUse}
                              </div>
                            )}
                          </div>
                        )}

                        {/* DIFFUSE BLOCK (natural only) */}
                        {remedy.type === 'natural' && remedy.diffuse && (
                          <div style={{ marginBottom: '0.9rem' }}>
                            <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                color: '#7c3aed',
                                border: '1px solid #7c3aed',
                                padding: '2px 9px',
                                borderRadius: '999px',
                                background: '#fff',
                              }}>Diffuse</span>
                              <AgeBadge ageRange={remedy.diffuse.ageRange} />
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#5a7a6e',
                              lineHeight: 1.6,
                              marginBottom: '0.5rem',
                            }}>
                              {remedy.diffuse.desc}
                            </div>
                            {remedy.diffuse.warning && (
                              <div style={{
                                background: '#fef3e0',
                                borderLeft: '3px solid #d97706',
                                padding: '0.55rem 0.7rem',
                                fontSize: '0.8rem',
                                color: '#92400e',
                                lineHeight: 1.5,
                                marginBottom: '0.5rem',
                              }}>
                                ⚠️ {remedy.diffuse.warning}
                              </div>
                            )}
                            {remedy.diffuse.safeUse && (
                              <div style={{
                                background: '#f0fdf4',
                                borderLeft: '3px solid #27ae60',
                                padding: '0.55rem 0.7rem',
                                fontSize: '0.8rem',
                                color: '#166534',
                                lineHeight: 1.5,
                              }}>
                                ✅ {remedy.diffuse.safeUse}
                              </div>
                            )}
                          </div>
                        )}

                        {/* For natural items with NO topical/diffuse/internal — render default desc */}
                        {remedy.type === 'natural' && !remedy.topical && !remedy.diffuse && (
                          <>
                            {remedy.ageRange && (
                              <div style={{ marginBottom: '0.4rem' }}>
                                <AgeBadge ageRange={remedy.ageRange} />
                              </div>
                            )}
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#5a7a6e',
                              lineHeight: 1.6,
                              marginBottom: '0.75rem',
                            }}>
                              {remedy.desc}
                            </div>
                          </>
                        )}

                        {/* OTC block */}
                        {remedy.type === 'otc' && (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                              {remedy.rating && (
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  color: remedy.ratingColor || '#5c4a1f',
                                }}>
                                  {remedy.rating}
                                </span>
                              )}
                              <AgeBadge ageRange={remedy.ageRange} />
                            </div>
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#5a7a6e',
                              lineHeight: 1.6,
                              marginBottom: '0.75rem',
                            }}>
                              {remedy.desc}
                            </div>
                          </>
                        )}

                        {/* Backup block */}
                        {remedy.type === 'backup' && (
                          <>
                            {remedy.ageRange && (
                              <div style={{ marginBottom: '0.4rem' }}>
                                <AgeBadge ageRange={remedy.ageRange} />
                              </div>
                            )}
                            <div style={{
                              fontSize: '0.85rem',
                              color: '#5a7a6e',
                              lineHeight: 1.6,
                              marginBottom: '0.6rem',
                            }}>
                              {remedy.desc}
                            </div>
                            {remedy.note && (
                              <div style={{
                                background: '#fef3e0',
                                borderLeft: '3px solid #d97706',
                                padding: '0.55rem 0.7rem',
                                fontSize: '0.8rem',
                                color: '#92400e',
                                lineHeight: 1.5,
                                marginBottom: '0.75rem',
                              }}>
                                ⚠️ {remedy.note}
                              </div>
                            )}
                          </>
                        )}

                        {/* INTERNAL collapsed reveal */}
                        {remedy.type === 'natural' && remedy.internal && (
                          <div style={{
                            background: '#fafaf7',
                            border: '0.5px dashed #c8c4b8',
                            borderRadius: '6px',
                            padding: '0.65rem 0.8rem',
                            marginBottom: '0.85rem',
                          }}>
                            <button
                              onClick={() => handleInternalTap(remedy.id)}
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
                                <span style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  color: '#78350f',
                                  border: '1px solid #78350f',
                                  padding: '2px 9px',
                                  borderRadius: '999px',
                                  background: '#fff',
                                }}>Internal</span>
                                {!isInternalOpen && (
                                  <span style={{ fontSize: '0.78rem', color: '#5a7a6e' }}>
                                    Also available — tap to view
                                  </span>
                                )}
                              </div>
                              <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                                {isInternalOpen ? '▲' : '▼'}
                              </span>
                            </button>
                            {isInternalOpen && (
                              <div style={{ marginTop: '0.7rem' }}>
                                <div style={{ marginBottom: '0.4rem' }}>
                                  <AgeBadge ageRange={remedy.internal.ageRange} />
                                </div>
                                <div style={{
                                  fontSize: '0.82rem',
                                  color: '#5a7a6e',
                                  lineHeight: 1.55,
                                  marginBottom: '0.6rem',
                                }}>
                                  {remedy.internal.desc}
                                </div>
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
                                }}>
                                  Look for a <strong>Supplement Facts panel</strong> — the only reliable indicator an oil is safe to ingest.
                                </div>
                                {remedy.internal.warning && (
                                  <div style={{
                                    background: '#fef3e0',
                                    borderLeft: '3px solid #d97706',
                                    padding: '0.5rem 0.7rem',
                                    fontSize: '0.78rem',
                                    color: '#92400e',
                                    lineHeight: 1.5,
                                    marginTop: '0.5rem',
                                  }}>
                                    ⚠️ {remedy.internal.warning}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* General remedy-level warning */}
                        {remedy.warning && (
                          <div style={{
                            background: '#fef3e0',
                            borderLeft: '3px solid #d97706',
                            padding: '0.55rem 0.7rem',
                            fontSize: '0.8rem',
                            color: '#92400e',
                            lineHeight: 1.5,
                            marginBottom: '0.7rem',
                          }}>
                            ⚠️ {remedy.warning}
                          </div>
                        )}

                        {/* Cross-link */}
                        {remedy.oilSlug && (
                          <Link
                          href={`/oils/${remedy.oilSlug}`}
                          style={{
                            textDecoration: 'none',
                            display: 'block',
                            background: '#2d4a3e',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.7rem 0.9rem',
                            marginTop: '0.5rem',
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                            <div>
                              <div style={{
                                fontSize: '0.65rem',
                                color: '#c8ddc0',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}>
                                Full profile
                              </div>
                              <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 700 }}>
                                See {remedy.name} page
                              </div>
                            </div>
                            <span style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700 }}>→</span>
                          </div>
                        </Link>
                        )}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Tools */}
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <div style={sectionLabelStyle}>Tools</div>
          <div style={sectionRuleStyle}></div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
          }}>
            <Link
              href={dosageLink || '/dosage-calculator'}
              style={{
                textDecoration: 'none',
                background: '#f0fdf4',
                border: '0.5px solid #c8ddc0',
                borderRadius: '8px',
                padding: '0.7rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <DosageCalculatorIcon size={20} color="#4a6741" />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#4a6741' }}>Dose helper</div>
                <div style={{ fontSize: '0.82rem', color: '#2d4a3e', fontWeight: 700 }}>Calculate dose</div>
              </div>
            </Link>
            <Link
              href="/interaction-checker"
              style={{
                textDecoration: 'none',
                background: '#f0fdf4',
                border: '0.5px solid #c8ddc0',
                borderRadius: '8px',
                padding: '0.7rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>💊🌿</span>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#4a6741' }}>Compatibility</div>
                <div style={{ fontSize: '0.82rem', color: '#2d4a3e', fontWeight: 700 }}>Check interactions</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sources */}
        {sources && (
          <div style={{ padding: '0 1.5rem 2rem' }}>
            <div style={sectionLabelStyle}>Sources</div>
            <div style={sectionRuleStyle}></div>
            <div style={{
              fontSize: '0.78rem',
              color: '#7a8a78',
              lineHeight: 1.6,
            }}>
              {sources}
            </div>
          </div>
        )}

      </div>
    </ConditionLayout>
  )
}