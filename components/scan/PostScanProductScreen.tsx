'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
  VERDICT_SUBLINES,
} from '@/lib/clean-picks/verdictLabels';
import type { IngredientFlag, RatingRecord, RiskLevel } from '@/lib/ratingRecord';
import {
  matchCleanAlternatives,
  NO_CLEANER_MATCH_COPY,
  type MatchedCleanAlternative,
} from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const BLUE_B = '#4a6781';
const CABINET_KEY = 'kyr-scan-preview-cabinet';

type TabKey = 'overview' | 'ingredients' | 'photos';

type Props = {
  record: RatingRecord;
  onOpenProduct?: (id: string) => void;
};

function riskDotColor(level: RiskLevel): string {
  if (level === 'high') return VERDICT_COLORS.avoid;
  if (level === 'moderate' || level === 'limited') return VERDICT_COLORS.caution;
  return VERDICT_COLORS.clean;
}

function riskReasonLine(level: RiskLevel): string {
  if (level === 'high') return 'High-risk additive';
  if (level === 'moderate') return 'Moderate-risk additive';
  if (level === 'limited') return 'Limited-risk additive';
  return 'Cleared';
}

function sourceSnippet(source?: string): string | null {
  if (!source) return null;
  const parts = source.split(';').map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts.slice(1).join('; ') : parts[0] ?? null;
}

function dailyMedHref(source?: string): string | null {
  if (!source) return null;
  const match = source.match(/DailyMed setid\s+([0-9a-f-]+)/i);
  if (!match) return null;
  return `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${match[1]}`;
}

function formatAge(minAge?: number): string | null {
  if (minAge == null) return null;
  return `Ages ${minAge}+`;
}

function formatActives(record: RatingRecord): string {
  return record.activeIngredients
    .map((active) => `${active.name} ${active.strength}`.trim())
    .join(' · ');
}

function loadCabinet(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CABINET_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: BLUE_B,
        marginBottom: '0.4rem',
      }}>
        {children}
      </div>
      <div style={{ width: 28, height: 2, background: BLUE_B }} />
    </div>
  );
}

function LineIcon({ kind }: { kind: 'flag' | 'check' | 'photo' }) {
  const stroke = '#6b7280';
  if (kind === 'check') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="1.6" />
        <path d="M8 12.2l2.4 2.4L16.2 9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === 'photo') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="6.5" width="17" height="13" rx="2" stroke={stroke} strokeWidth="1.6" />
        <circle cx="9" cy="12" r="1.8" stroke={stroke} strokeWidth="1.6" />
        <path d="M12.5 16.5l3.2-3.4 4.8 3.4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="1.6" />
      <path d="M12 8v5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16.2" r="0.9" fill={stroke} />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
    >
      <path d="M6 9l6 6 6-6" stroke="#8a938e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ImageComing({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{
      background: '#f4f2ee',
      border: '1px solid #ece7de',
      borderRadius: compact ? 10 : 12,
      width: compact ? 72 : '100%',
      height: compact ? 72 : 168,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#8a938e',
      flexShrink: 0,
    }}>
      <LineIcon kind="photo" />
      <div style={{
        marginTop: 6,
        fontSize: compact ? '0.62rem' : '0.82rem',
        fontWeight: 600,
        letterSpacing: compact ? 0 : '-0.01em',
      }}>
        Image coming
      </div>
    </div>
  );
}

function IngredientExpand({
  name,
  reason,
  source,
  whyLabel,
}: {
  name: string;
  reason: string;
  source?: string;
  whyLabel: string;
}) {
  const href = dailyMedHref(source);
  const snippet = sourceSnippet(source);
  return (
    <div style={{
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1px solid #f0ece4',
    }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5a635e', marginBottom: 4 }}>
        {whyLabel}
      </div>
      <div style={{ fontSize: '0.84rem', color: '#3a433e', lineHeight: 1.5 }}>
        {name} — {snippet ?? reason}.
      </div>
      {source && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5a635e', marginBottom: 4 }}>
            Sources
          </div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ color: BRAND_GREEN, fontSize: '0.8rem', fontWeight: 600, wordBreak: 'break-word' }}
            >
              {source}
            </a>
          ) : (
            <div style={{ color: '#3a433e', fontSize: '0.8rem', lineHeight: 1.45 }}>
              {source}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function IngredientRow({
  ingredient,
  kind,
}: {
  ingredient: IngredientFlag;
  kind: 'flagged' | 'cleared';
}) {
  const [open, setOpen] = useState(false);
  const reason = riskReasonLine(ingredient.riskLevel);
  const snippet = sourceSnippet(ingredient.source);

  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      aria-expanded={open}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        borderBottom: '1px solid #eeeae3',
        padding: '0.9rem 0',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ paddingTop: 2 }}>
          <LineIcon kind={kind === 'flagged' ? 'flag' : 'check'} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#1a2e27',
              flex: 1,
            }}>
              {ingredient.name}
            </div>
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: riskDotColor(ingredient.riskLevel),
              flexShrink: 0,
            }} />
            <Chevron open={open} />
          </div>
          {kind === 'flagged' && (
            <div style={{ fontSize: '0.8rem', color: '#8a938e', marginTop: 3, lineHeight: 1.4 }}>
              {snippet ?? reason}
            </div>
          )}
          {open && (
            <IngredientExpand
              name={ingredient.name}
              reason={reason}
              source={ingredient.source}
              whyLabel={kind === 'flagged' ? 'Why this is flagged' : 'Why this is cleared'}
            />
          )}
        </div>
      </div>
    </button>
  );
}

function AlternativeCard({
  item,
  onOpen,
  peeking = false,
}: {
  item: MatchedCleanAlternative;
  onOpen?: (id: string) => void;
  peeking?: boolean;
}) {
  const alt = item.record;
  return (
    <button
      type="button"
      onClick={() => onOpen?.(alt.id)}
      style={{
        flex: peeking ? '0 0 78%' : '1 1 auto',
        width: peeking ? undefined : '100%',
        scrollSnapAlign: peeking ? 'start' : undefined,
        background: '#fff',
        border: '1px solid #ece7de',
        borderRadius: 12,
        padding: '0.85rem',
        textAlign: 'left',
        cursor: onOpen ? 'pointer' : 'default',
        fontFamily: 'inherit',
      }}
    >
      <ImageComing compact />
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '0.98rem',
        fontWeight: 700,
        color: '#1a2e27',
        marginTop: 10,
        lineHeight: 1.25,
      }}>
        {alt.productName}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#6b756f', marginTop: 2 }}>
        {alt.brand}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: VERDICT_COLORS[alt.verdict],
        }} />
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: VERDICT_COLORS[alt.verdict],
        }}>
          {VERDICT_LABELS[alt.verdict]}
        </span>
      </div>
      {alt.form && (
        <div style={{ fontSize: '0.72rem', color: '#8a938e', marginTop: 6 }}>
          Form: {alt.form}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
        {alt.retailers.slice(0, 3).map((retailer) => (
          <span key={retailer} style={{
            fontSize: '0.68rem',
            padding: '3px 7px',
            border: '1px solid #ece7de',
            borderRadius: 6,
            color: '#3a433e',
          }}>
            {retailer}
          </span>
        ))}
      </div>
    </button>
  );
}

function AlternativesBlock({
  record,
  onOpenProduct,
}: {
  record: RatingRecord;
  onOpenProduct?: (id: string) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const matches = useMemo(() => matchCleanAlternatives(record), [record]);
  const count = matches.length;
  const header = count === 1 ? '1 clean alternative' : `${count} clean alternatives`;

  return (
    <section style={{ marginTop: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <SectionLabel>{header}</SectionLabel>
        {count > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            style={{
              background: 'none',
              border: 'none',
              color: BRAND_GREEN,
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              padding: 0,
              marginBottom: '0.75rem',
            }}
          >
            {showAll ? 'Hide' : 'See all →'}
          </button>
        )}
      </div>

      {count === 0 ? (
        <div style={{ fontSize: '0.92rem', color: '#3a433e', lineHeight: 1.5 }}>
          {NO_CLEANER_MATCH_COPY}
        </div>
      ) : showAll ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {matches.map((item) => (
            <AlternativeCard key={item.record.id} item={item} onOpen={onOpenProduct} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: 8,
            marginRight: -20,
            paddingRight: 20,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {matches.map((item) => (
            <AlternativeCard key={item.record.id} item={item} onOpen={onOpenProduct} peeking />
          ))}
        </div>
      )}
    </section>
  );
}

export default function PostScanProductScreen({ record, onOpenProduct }: Props) {
  const [tab, setTab] = useState<TabKey>('overview');
  const [clearedOpen, setClearedOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [starBounce, setStarBounce] = useState(false);

  const flagged = record.inactiveIngredients.filter((item) => item.riskLevel !== 'cleared');
  const cleared = record.inactiveIngredients.filter((item) => item.riskLevel === 'cleared');
  const label = VERDICT_LABELS[record.verdict];
  const color = VERDICT_COLORS[record.verdict];
  const subline = VERDICT_SUBLINES[record.verdict];
  const ageLabel = formatAge(record.minAge);
  const avoidTint = record.verdict === 'avoid';

  useEffect(() => {
    setTab('overview');
    setClearedOpen(false);
    setSaved(loadCabinet().includes(record.id));
    setToast(null);
  }, [record.id]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    setStarBounce(true);
    window.setTimeout(() => setStarBounce(false), 280);
    const current = new Set(loadCabinet());
    if (next) current.add(record.id);
    else current.delete(record.id);
    window.localStorage.setItem(CABINET_KEY, JSON.stringify([...current]));
    setToast(next ? 'Saved to your cabinet' : 'Removed');
  }

  return (
    <div style={{
      background: '#fff',
      minHeight: '100%',
      position: 'relative',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '0.85rem 1.15rem',
        borderBottom: '1px solid #eeeae3',
        background: avoidTint ? `color-mix(in srgb, ${VERDICT_COLORS.avoid} 14%, #fff)` : '#fff',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: color,
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color,
              letterSpacing: '-0.02em',
            }}>
              {label}
            </span>
          </div>
          {subline && (
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color,
              marginTop: 2,
              marginLeft: 18,
            }}>
              {subline}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? 'Remove from Medicine Cabinet' : 'Save to Medicine Cabinet'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: saved ? BRAND_GREEN : '#8a938e',
            transform: starBounce ? 'scale(1.22)' : 'scale(1)',
            transition: 'transform 0.18s ease, color 0.15s',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.58 7.3 18.05l.9-5.23-3.8-3.7 5.25-.76L12 3.6z"
              fill={saved ? BRAND_GREEN : 'none'}
              stroke={saved ? BRAND_GREEN : '#8a938e'}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div style={{ padding: '1.1rem 1.15rem 2.5rem' }}>
        <ImageComing />

        <h1 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.45rem',
          fontWeight: 700,
          color: '#1a2e27',
          margin: '0.95rem 0 0.2rem',
          lineHeight: 1.2,
        }}>
          {record.productName}
        </h1>
        <div style={{ fontSize: '0.92rem', color: '#5a635e' }}>
          {record.brand}
        </div>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          color: BLUE_B,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginTop: 8,
          lineHeight: 1.45,
        }}>
          {formatActives(record)}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginTop: 10,
        }}>
          {record.form && (
            <span style={{
              fontSize: '0.72rem',
              color: '#5a635e',
              border: '1px solid #ece7de',
              borderRadius: 999,
              padding: '3px 8px',
            }}>
              Form: {record.form}
            </span>
          )}
          {ageLabel && (
            <span style={{
              fontSize: '0.72rem',
              color: '#5a635e',
              border: '1px solid #ece7de',
              borderRadius: 999,
              padding: '3px 8px',
            }}>
              {ageLabel}
            </span>
          )}
          {record.category && (
            <span style={{
              fontSize: '0.72rem',
              color: '#5a635e',
              border: '1px solid #ece7de',
              borderRadius: 999,
              padding: '3px 8px',
            }}>
              {record.category}
            </span>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: 18,
          marginTop: '1.25rem',
          borderBottom: '1px solid #eeeae3',
        }}>
          {([
            ['overview', 'Overview'],
            ['ingredients', 'Ingredients'],
            ['photos', 'Photos'],
          ] as const).map(([key, text]) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? `2px solid ${BRAND_GREEN}` : '2px solid transparent',
                  color: active ? BRAND_GREEN : '#8a938e',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.88rem',
                  padding: '0.45rem 0',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {text}
              </button>
            );
          })}
        </div>

        {tab === 'overview' && (
          <div style={{ marginTop: '1.25rem' }}>
            {record.honestNote && (
              <p style={{
                fontSize: '0.86rem',
                color: '#4a534e',
                lineHeight: 1.55,
                margin: '0 0 1.35rem',
              }}>
                {record.honestNote}
              </p>
            )}

            {record.activeSafetyFlag && (
              <div style={{ marginBottom: '1.25rem' }}>
                <SectionLabel>Active-safety note</SectionLabel>
                <div style={{ fontSize: '0.88rem', color: '#3a433e', lineHeight: 1.5 }}>
                  {record.activeSafetyFlag.description}
                </div>
              </div>
            )}

            <section>
              <SectionLabel>Flagged</SectionLabel>
              {flagged.length === 0 ? (
                <div style={{ fontSize: '0.9rem', color: '#6b756f' }}>
                  No flagged inactives
                </div>
              ) : (
                flagged.map((ingredient) => (
                  <IngredientRow
                    key={ingredient.name}
                    ingredient={ingredient}
                    kind="flagged"
                  />
                ))
              )}
            </section>

            <section style={{ marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setClearedOpen((value) => !value)}
                aria-expanded={clearedOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <SectionLabel>{`Cleared · ${cleared.length}`}</SectionLabel>
                <Chevron open={clearedOpen} />
              </button>
              {clearedOpen && (
                cleared.length === 0 ? (
                  <div style={{ fontSize: '0.9rem', color: '#6b756f' }}>
                    No cleared inactives listed
                  </div>
                ) : (
                  cleared.map((ingredient) => (
                    <IngredientRow
                      key={ingredient.name}
                      ingredient={ingredient}
                      kind="cleared"
                    />
                  ))
                )
              )}
            </section>

            {record.verdict !== 'clean' && (
              <AlternativesBlock record={record} onOpenProduct={onOpenProduct} />
            )}
          </div>
        )}

        {tab === 'ingredients' && (
          <div style={{ marginTop: '1.25rem' }}>
            <SectionLabel>Active</SectionLabel>
            {record.activeIngredients.map((active) => (
              <div key={`${active.name}-${active.strength}`} style={{
                padding: '0.7rem 0',
                borderBottom: '1px solid #eeeae3',
                fontSize: '0.92rem',
                color: '#1a2e27',
              }}>
                <strong>{active.name}</strong>
                <span style={{ color: '#6b756f' }}> · {active.strength}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.4rem' }}>
              <SectionLabel>Inactive</SectionLabel>
              {record.inactiveIngredients.map((ingredient) => (
                <IngredientRow
                  key={`${ingredient.name}-${ingredient.riskLevel}`}
                  ingredient={ingredient}
                  kind={ingredient.riskLevel === 'cleared' ? 'cleared' : 'flagged'}
                />
              ))}
            </div>
          </div>
        )}

        {tab === 'photos' && (
          <div style={{ marginTop: '1.25rem' }}>
            <ImageComing />
            <button
              type="button"
              onClick={() => setToast('Photo intake is not wired in this preview')}
              style={{
                marginTop: 14,
                background: 'none',
                border: `1px solid ${BRAND_GREEN}`,
                color: BRAND_GREEN,
                borderRadius: 999,
                padding: '0.55rem 1rem',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ＋ Add a photo
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div style={{
          position: 'sticky',
          bottom: 12,
          margin: '0 1.15rem',
          background: BRAND_GREEN,
          color: '#fff',
          textAlign: 'center',
          padding: '0.65rem 0.9rem',
          borderRadius: 10,
          fontSize: '0.82rem',
          fontWeight: 600,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
