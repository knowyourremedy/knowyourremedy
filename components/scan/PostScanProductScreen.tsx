'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
  VERDICT_SUBLINES,
} from '@/lib/clean-picks/verdictLabels';
import type { IngredientFlag, ProductImage, RatingRecord, RiskLevel } from '@/lib/ratingRecord';
import {
  ingredientWhy,
  loadPreviewCabinetIds,
  matchCleanAlternatives,
  NO_CLEANER_MATCH_COPY,
  restingRiskLabel,
  togglePreviewCabinetId,
  type MatchedCleanAlternative,
} from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const BLUE_B = '#4a6781';
const CANVAS = '#faf7f2';

type TabKey = 'overview' | 'ingredients' | 'photos';

type Props = {
  record: RatingRecord;
  onOpenProduct?: (id: string) => void;
  onBack?: () => void;
  saved?: boolean;
  onToggleSaved?: (id: string) => boolean;
  onToast?: (message: string) => void;
};

function riskDotColor(level: RiskLevel): string {
  if (level === 'high') return VERDICT_COLORS.avoid;
  if (level === 'moderate' || level === 'limited') return VERDICT_COLORS.caution;
  return VERDICT_COLORS.clean;
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

function LineIcon({ kind }: { kind: 'flag' | 'check' }) {
  const stroke = '#6b7280';
  if (kind === 'check') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="1.6" />
        <path d="M8 12.2l2.4 2.4L16.2 9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

function hasVerifiedSkuImage(image?: ProductImage): image is ProductImage {
  return Boolean(image?.verifiedSku && image.url);
}

function ProductTile({
  productName,
  image,
  compact = false,
}: {
  productName: string;
  image?: ProductImage;
  compact?: boolean;
}) {
  if (hasVerifiedSkuImage(image)) {
    return (
      <div style={{
        background: '#fff',
        border: '1px solid #ece7de',
        borderRadius: compact ? 10 : 16,
        width: '100%',
        height: compact ? 132 : 240,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          alt={productName}
          style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${productName} — image coming`}
      style={{
        background: '#fff',
        border: '1px solid #e5dfd4',
        borderRadius: compact ? 10 : 16,
        width: '100%',
        minHeight: compact ? 132 : 240,
        height: compact ? 132 : 240,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: compact ? '0.7rem 0.65rem' : '1.15rem 1.25rem',
        boxSizing: 'border-box',
        boxShadow: compact ? 'none' : '0 8px 22px rgba(26, 46, 39, 0.05)',
        flexShrink: 0,
      }}
    >
      <div style={{
        fontSize: compact ? '0.62rem' : '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#9aa39d',
        marginBottom: compact ? 8 : 12,
      }}>
        Image coming
      </div>
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: compact ? '0.92rem' : '1.35rem',
        fontWeight: 700,
        color: '#1a2e27',
        lineHeight: 1.25,
        letterSpacing: '-0.02em',
      }}>
        {productName}
      </div>
    </div>
  );
}

function IngredientExpand({
  ingredient,
  whyLabel,
}: {
  ingredient: IngredientFlag;
  whyLabel: string;
}) {
  const why = ingredientWhy(ingredient);
  return (
    <div style={{
      marginTop: 10,
      background: '#fff',
      border: '1px solid #ece7de',
      borderRadius: 12,
      padding: '0.8rem 0.9rem',
    }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5a635e', marginBottom: 6 }}>
        {whyLabel}
      </div>
      <div style={{ fontSize: '0.84rem', color: '#3a433e', lineHeight: 1.5 }}>
        {why.body}
      </div>
      {why.body === 'Why pending review' && ingredient.source && (
        <div style={{ fontSize: '0.78rem', color: '#6b756f', lineHeight: 1.45, marginTop: 6 }}>
          {ingredient.source}
        </div>
      )}
      {why.sourceName && (
        <div style={{ marginTop: 10 }}>
          {why.sourceHref ? (
            <a
              href={why.sourceHref}
              target="_blank"
              rel="noreferrer"
              style={{ color: BRAND_GREEN, fontSize: '0.8rem', fontWeight: 600 }}
            >
              {why.sourceName}
            </a>
          ) : (
            <div style={{ color: '#3a433e', fontSize: '0.8rem', lineHeight: 1.45 }}>
              {why.sourceName}
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
  const resting = restingRiskLabel(ingredient.riskLevel);

  return (
    <div style={{
      borderBottom: '1px solid #eeeae3',
      padding: '0.68rem 0',
    }}>
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
          padding: 0,
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
            <div style={{
              fontSize: '0.78rem',
              color: '#8a938e',
              marginTop: 3,
              lineHeight: 1.35,
            }}>
              {resting}
            </div>
          </div>
        </div>
      </button>
      {open && (
        <div style={{ paddingLeft: 28 }}>
          <IngredientExpand
            ingredient={ingredient}
            whyLabel={kind === 'flagged' ? 'Why this is flagged' : 'Why this is cleared'}
          />
        </div>
      )}
    </div>
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
      <ProductTile productName={alt.productName} image={alt.productImage} compact />
      <div style={{ fontSize: '0.78rem', color: '#6b756f', marginTop: 10 }}>
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

function HonestNote({ note }: { note: string }) {
  return (
    <section
      style={{
        marginTop: '1.15rem',
        background: '#fff8ec',
        borderLeft: '4px solid #d97706',
        borderRadius: 10,
        padding: '0.85rem 0.95rem',
      }}
    >
      <div style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: '#d97706',
        marginBottom: 6,
      }}>
        Honest note
      </div>
      <p style={{
        fontSize: '0.8rem',
        color: '#3a433e',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {note}
      </p>
    </section>
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#1a2e27',
            marginBottom: '0.4rem',
          }}>
            {header}
          </div>
          <div style={{ width: 28, height: 2, background: BLUE_B, marginBottom: '0.75rem' }} />
        </div>
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
              padding: '0.15rem 0 0',
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

export default function PostScanProductScreen({
  record,
  onOpenProduct,
  onBack,
  saved: savedProp,
  onToggleSaved,
  onToast,
}: Props) {
  const [tab, setTab] = useState<TabKey>('overview');
  const [clearedOpen, setClearedOpen] = useState(false);
  const [savedLocal, setSavedLocal] = useState(() => loadPreviewCabinetIds().includes(record.id));
  const [toast, setToast] = useState<string | null>(null);
  const [starBounce, setStarBounce] = useState(false);
  const saved = savedProp ?? savedLocal;

  const flagged = record.inactiveIngredients.filter((item) => item.riskLevel !== 'cleared');
  const cleared = record.inactiveIngredients.filter((item) => item.riskLevel === 'cleared');
  const label = VERDICT_LABELS[record.verdict];
  const color = VERDICT_COLORS[record.verdict];
  const subline = VERDICT_SUBLINES[record.verdict];
  const ageLabel = formatAge(record.minAge);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function toggleSaved() {
    const next = onToggleSaved
      ? onToggleSaved(record.id)
      : togglePreviewCabinetId(record.id).saved;
    setSavedLocal(next);
    setStarBounce(true);
    window.setTimeout(() => setStarBounce(false), 280);
    const message = next ? 'Saved to your cabinet.' : 'Removed.';
    if (onToast) onToast(message);
    else setToast(message);
  }

  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      position: 'relative',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: subline ? '0.85rem 1.15rem 0.9rem' : '0.95rem 1.15rem',
        background: color,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                margin: -8,
                color: '#fff',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                minWidth: 44,
                minHeight: 44,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {label}
            </div>
            {subline && (
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.92)',
                marginTop: 6,
              }}>
                {subline}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? 'Remove from cabinet' : 'Save to cabinet'}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#fff',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: starBounce ? 'scale(1.22)' : 'scale(1)',
            transition: 'transform 0.18s ease',
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.58 7.3 18.05l.9-5.23-3.8-3.7 5.25-.76L12 3.6z"
              fill={saved ? BRAND_GREEN : 'none'}
              stroke={BRAND_GREEN}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div style={{ padding: '1.1rem 1.15rem 2.5rem', background: CANVAS }}>
        <ProductTile productName={record.productName} image={record.productImage} />

        <h1 style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}>
          {record.productName}
        </h1>
        <div style={{ fontSize: '0.88rem', color: '#5a635e', marginTop: '0.7rem' }}>
          {record.brand}
        </div>
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          color: BLUE_B,
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
                <div style={{ fontSize: '0.88rem', color: '#6b756f' }}>
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

            <section style={{ marginTop: '1.15rem' }}>
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

            {record.honestNote && (
              <HonestNote key={record.id} note={record.honestNote} />
            )}

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
            <ProductTile productName={record.productName} image={record.productImage} />
            <button
              type="button"
              onClick={() => {
                const message = 'Photo intake is not wired in this preview';
                if (onToast) onToast(message);
                else setToast(message);
              }}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 14,
                background: '#fff',
                border: '1px solid #ece7de',
                color: BRAND_GREEN,
                borderRadius: 12,
                padding: '0.75rem 1rem',
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
