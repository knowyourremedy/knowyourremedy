'use client'
import { useState } from 'react'
import RemedyLayout from './RemedyLayout'

const REMEDY_LINKS = [
  { label: 'Allergies', href: '/remedies/allergies' },
  { label: 'Anxiety & Stress', href: '/remedies/anxiety-and-stress' },
  { label: 'Back Pain', href: '/remedies/back-pain' },
  { label: 'Bloating & Gas', href: '/remedies/bloating-and-gas' },
  { label: 'Burns & Sunburn', href: '/remedies/burns-and-sunburn' },
  { label: 'Cold & Flu', href: '/remedies/cold-and-flu' },
  { label: 'Colic', href: '/remedies/colic' },
  { label: 'Constipation', href: '/remedies/constipation' },
  { label: 'Dental Pain', href: '/remedies/dental-pain' },
  { label: 'Diaper Rash', href: '/remedies/diaper-rash' },
  { label: 'Diarrhea', href: '/remedies/diarrhea' },
  { label: 'Ear Pain', href: '/remedies/ear-pain' },
  { label: 'Fever', href: '/remedies/fever' },
  { label: 'Growing Pains', href: '/remedies/growing-pains' },
  { label: 'Headache', href: '/remedies/headache' },
  { label: 'Heartburn', href: '/remedies/heartburn' },
  { label: 'Insect Bites', href: '/remedies/insect-bites' },
  { label: 'Insomnia', href: '/remedies/insomnia' },
  { label: 'Itchy Eyes', href: '/remedies/itchy-eyes' },
  { label: 'Joint Pain', href: '/remedies/joint-pain' },
  { label: 'Menstrual Cramps', href: '/remedies/menstrual-cramps' },
  { label: 'Migraines', href: '/remedies/migraines' },
  { label: 'Minor Cuts', href: '/remedies/minor-cuts' },
  { label: 'Muscle Pain', href: '/remedies/muscle-pain' },
  { label: 'Nausea', href: '/remedies/nausea' },
  { label: 'Rashes', href: '/remedies/rashes' },
  { label: 'Sinus Congestion', href: '/remedies/sinus-congestion' },
  { label: 'Sore Throat', href: '/remedies/sore-throat' },
  { label: 'Teething Pain', href: '/remedies/teething-pain' },
  { label: 'Tension Headaches', href: '/remedies/tension-headaches' },
  { label: 'Upset Stomach', href: '/remedies/upset-stomach' },
]

type Tab = 'natural' | 'mainstream' | 'inpinch'
type PregnancySafe = 'safe' | 'avoid' | 'ask'

interface NaturalItem {
  name: string
  badge: string
  badgeColor: string
  desc: string
  warning?: string
  safeUse?: string
  pregnancySafe?: PregnancySafe
}

interface MainstreamItem {
  name: string
  desc: string
  rating: string
  ratingColor: string
  pregnancySafe?: PregnancySafe
}

interface InPinchItem {
  category: string
  desc: string
  note: string
  pregnancySafe?: PregnancySafe
}

interface RemedyPageLayoutProps {
  title: string
  subtitle: string
  emergency?: string
  naturalItems: NaturalItem[]
  mainstreamItems: MainstreamItem[]
  inPinchItems: InPinchItem[]
  dosageLink?: string
}

function PregnancyIcon({ status }: { status: PregnancySafe }) {
  const color = status === 'safe' ? '#27ae60' : status === 'avoid' ? '#c0392b' : '#e67e22'
  const label = status === 'safe' ? 'Pregnancy safe' : status === 'avoid' ? 'Avoid in pregnancy' : 'Ask your doctor'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <svg width="32" height="56" viewBox="0 0 32 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="10" r="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8"/>
        <path
          d="M7 26 Q5 38 8 48 Q11 54 16 54 Q22 54 25 48 Q28 38 26 26 Q22 20 16 20 Q10 20 7 26Z"
          fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8"
        />
        <path d="M18 34 Q26 37 28 44" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        {status === 'avoid' && (
          <line x1="2" y1="4" x2="30" y2="52" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
        )}
        {status === 'ask' && (
          <line x1="2" y1="4" x2="30" y2="52" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 3"/>
        )}
      </svg>
      <span style={{
        fontSize: '0.65rem',
        color,
        fontWeight: '600',
        fontFamily: 'var(--font-inter), sans-serif',
        textAlign: 'center',
        lineHeight: '1.2',
        maxWidth: '52px',
      }}>
        {label}
      </span>
    </div>
  )
}

export default function RemedyPageLayout({
  title,
  subtitle,
  emergency,
  naturalItems,
  mainstreamItems,
  inPinchItems,
  dosageLink,
}: RemedyPageLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('natural')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pendingExpand, setPendingExpand] = useState<string | null>(null)
  const [showInternalModal, setShowInternalModal] = useState(false)
  const [hasSeenInternalWarning, setHasSeenInternalWarning] = useState(false)
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: 'natural', label: 'Natural', emoji: '🌿' },
    { key: 'mainstream', label: 'Mainstream', emoji: '🏪' },
    { key: 'inpinch', label: 'In a Pinch', emoji: '⚡' },
  ]

  return (
    <RemedyLayout>

      {/* Internal Only Modal */}
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
            padding: '2rem',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#2d4a3e',
              fontSize: '1.25rem',
              marginBottom: '0.75rem',
              marginTop: 0,
            }}>
              Before you use any <span style={{ color: '#78350f', fontWeight: '900', textDecoration: 'underline' }}>Internal Only</span> remedy
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '1rem' }}>
              This applies to <strong>all <span style={{ color: '#78350f' }}>Internal Only</span> remedies on this page.</strong> Not all products labeled as natural, pure, or therapeutic grade are safe to ingest.
            </p>
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              color: '#166534',
              lineHeight: '1.7',
            }}>
              <strong>✅ The only reliable indicator an oil or supplement is safe to ingest:</strong>
              <br />Look for a <strong>Supplement Facts panel</strong> on the label. This is the FDA's required label for anything intended for internal use.
            </div>
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: '#7f1d1d',
              lineHeight: '1.7',
            }}>
              <strong>🔴 These do NOT mean safe to ingest:</strong>
              <br />"100% Pure" · "Therapeutic Grade" · "Natural" · "Food Grade" · Any brand's own certification
            </div>
            <button
              onClick={() => {
                setHasSeenInternalWarning(true)
                setShowInternalModal(false)
                setExpanded(pendingExpand)
                setPendingExpand(null)
              }}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#2d4a3e',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              I understand — show me the remedy
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '1.5rem 0' }}>

        {/* Sidebar */}
        <aside style={{
          width: '200px',
          flexShrink: 0,
          position: 'sticky',
          top: '80px',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          display: 'none',
        }} className="remedy-sidebar">
          <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: '0.75rem' }}>
            All Conditions
          </div>
          {REMEDY_LINKS.map(link => {
            const active = pathname === link.href
            return (
              <a key={link.href} href={link.href} style={{
                display: 'block',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontWeight: active ? '700' : '400',
                color: active ? '#fff' : '#4a6741',
                backgroundColor: active ? '#2d4a3e' : 'transparent',
                marginBottom: '0.15rem',
                transition: 'all 0.15s',
              }}>
                {link.label}
              </a>
            )
          })}
        </aside>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Emergency banner */}
          {emergency && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.82rem',
              color: '#7f1d1d',
              marginBottom: '1rem',
              lineHeight: '1.5',
            }}>
              🚨 {emergency}
            </div>
          )}

          {/* Title */}
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '2rem',
              fontWeight: '700',
              color: '#2d4a3e',
              margin: '0 0 0.4rem',
            }}>{title}</h1>
            <p style={{ fontSize: '0.95rem', color: '#5a7a6e', lineHeight: '1.6', margin: 0 }}>{subtitle}</p>
          </div>

          {/* Pregnancy icon legend */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            backgroundColor: '#faf7f2',
            border: '1px solid #e8e0d0',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6b7280', fontFamily: 'var(--font-inter), sans-serif' }}>
              Pregnancy indicators:
            </span>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <PregnancyIcon status="safe" />
              <PregnancyIcon status="avoid" />
              <PregnancyIcon status="ask" />
            </div>
          </div>

          {/* Subtle quick actions */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <a href={dosageLink || '/dosage-calculator'} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              color: '#4a6741',
              border: '1px solid #c8ddc0',
              backgroundColor: '#f0fdf4',
              padding: '0.35rem 0.85rem', borderRadius: '50px',
              textDecoration: 'none', fontSize: '0.78rem', fontWeight: '500',
            }}>
              💊 Calculate Dose
            </a>
            <a href="/interaction-checker" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              color: '#4a6741',
              border: '1px solid #c8ddc0',
              backgroundColor: '#f0fdf4',
              padding: '0.35rem 0.85rem', borderRadius: '50px',
              textDecoration: 'none', fontSize: '0.78rem', fontWeight: '500',
            }}>
              ⚠️ Check Interactions
            </a>
          </div>

          {/* Remedy Options label */}
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1rem',
              fontWeight: '700',
              color: '#2d4a3e',
              borderBottom: '2px solid #2d4a3e',
              paddingBottom: '2px',
              letterSpacing: '0.02em',
            }}>
              Remedy Options
            </span>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                padding: '0.55rem 1.1rem',
                border: activeTab === tab.key ? '2px solid #2d4a3e' : '2px solid #e8e0d0',
                borderRadius: '50px',
                background: activeTab === tab.key ? '#2d4a3e' : '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: activeTab === tab.key ? '#fff' : '#6b7280',
                fontFamily: 'var(--font-inter), sans-serif',
                transition: 'all 0.15s',
              }}>
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>

          {/* Natural tab */}
          {activeTab === 'natural' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {naturalItems.map(item => (
                <div key={item.name} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  <button onClick={() => {
                    if (item.badge.includes('Internal') && !hasSeenInternalWarning) {
                      setPendingExpand(item.name)
                      setShowInternalModal(true)
                    } else {
                      setExpanded(expanded === item.name ? null : item.name)
                    }
                  }} style={{
                    width: '100%', textAlign: 'left',
                    padding: '1rem 1.25rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: '700',
                        backgroundColor: 'transparent',
                        color: item.badgeColor,
                        border: `1.5px solid ${item.badgeColor}`,
                        padding: '2px 10px', borderRadius: '20px',
                        whiteSpace: 'nowrap',
                      }}>{item.badge}</span>
                      <span style={{ fontWeight: '600', color: '#2d4a3e', fontSize: '0.95rem' }}>{item.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                      {item.pregnancySafe && <PregnancyIcon status={item.pregnancySafe} />}
                      <span style={{ color: '#9ca3af', fontSize: '1.1rem' }}>
                        {expanded === item.name ? '▲' : '▼'}
                      </span>
                    </div>
                  </button>
                  {expanded === item.name && (
                    <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid #f3f4f6' }}>
                      <p style={{ fontSize: '0.88rem', color: '#5a7a6e', lineHeight: '1.6', margin: '0.75rem 0 0' }}>{item.desc}</p>
                      {item.warning && (
                        <div style={{ fontSize: '0.8rem', color: '#e67e22', marginTop: '0.75rem', borderLeft: '3px solid #e67e22', paddingLeft: '0.75rem', lineHeight: '1.5' }}>
                          ⚠️ {item.warning}
                        </div>
                      )}
                      {item.safeUse && (
                        <div style={{ fontSize: '0.8rem', color: '#27ae60', marginTop: '0.5rem', borderLeft: '3px solid #27ae60', paddingLeft: '0.75rem', lineHeight: '1.5' }}>
                          ✅ {item.safeUse}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mainstream tab */}
          {activeTab === 'mainstream' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {mainstreamItems.map(item => (
                <div key={item.name} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.35rem', fontSize: '0.95rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.87rem', color: '#5a7a6e', lineHeight: '1.55' }}>{item.desc}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: '700',
                      color: item.ratingColor,
                      whiteSpace: 'nowrap',
                    }}>{item.rating}</span>
                    {item.pregnancySafe && <PregnancyIcon status={item.pregnancySafe} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* In a Pinch tab */}
          {activeTab === 'inpinch' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fbbf24',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                color: '#92400e',
                lineHeight: '1.5',
                marginBottom: '0.25rem',
              }}>
                ⚡ These are not ideal choices but are better than nothing when you have limited options at a gas station, airport, or convenience store.
              </div>
              {inPinchItems.map((item, i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                }}>
                 <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: '600', color: '#2d4a3e', fontSize: '0.95rem' }}>{item.name}</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: item.ratingColor, whiteSpace: 'nowrap' }}>{item.rating}</span>
                    </div>
                    <div style={{ fontSize: '0.87rem', color: '#5a7a6e', lineHeight: '1.55' }}>{item.desc}</div>
                  </div>
                  {item.pregnancySafe && (
                    <div style={{ flexShrink: 0 }}>
                      <PregnancyIcon status={item.pregnancySafe} />
                    </div>
                  )}
                  
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .remedy-sidebar { display: block !important; }
        }
      `}</style>

    </RemedyLayout>
  )
}