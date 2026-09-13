'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
  VERDICT_SUBLINES,
} from '@/lib/clean-picks/verdictLabels';
import type { ActiveIngredient, ActiveSafetyFlag, ProductImage, RatingRecord, RiskLevel } from '@/lib/ratingRecord';
import {
  ingredientWhy,
  loadPreviewCabinetIds,
  matchCleanAlternatives,
  NO_CLEANER_MATCH_COPY,
  previewOverlayImage,
  rememberPreviewViewedId,
  restingTypeLine,
  togglePreviewCabinetId,
  type IngredientWhy,
  type MatchedCleanAlternative,
} from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const BLUE_B = '#4a6781';
const CANVAS = '#faf7f2';
const HAIRLINE = '#ece7de';
const THUMB = 88;
const PHOTO_REVIEW_TOAST = 'Photo review coming soon.';

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

function activeSafetyRisk(flag: ActiveSafetyFlag): RiskLevel {
  return flag.cappedAt === 'avoid' ? 'high' : 'moderate';
}

function inactiveSortRank(level: RiskLevel): number {
  if (level === 'high') return 0;
  if (level === 'moderate' || level === 'limited') return 1;
  return 2;
}

function sortedInactives(record: RatingRecord) {
  return record.inactiveIngredients
    .map((ingredient, index) => ({ ingredient, index }))
    .sort((a, b) => {
      const rank = inactiveSortRank(a.ingredient.riskLevel) - inactiveSortRank(b.ingredient.riskLevel);
      return rank !== 0 ? rank : a.index - b.index;
    })
    .map(({ ingredient }) => ingredient);
}

// Record-level cap only. Match an existing active by name when the flag
// cites one; otherwise the first active. Never invent a flag.
function flaggedActiveIndex(record: RatingRecord): number {
  if (!record.activeSafetyFlag || record.activeIngredients.length === 0) return -1;
  const haystack = `${record.activeSafetyFlag.description} ${record.activeSafetyFlag.source}`.toLowerCase();
  const match = record.activeIngredients.findIndex((active) =>
    haystack.includes(active.name.toLowerCase()),
  );
  return match >= 0 ? match : 0;
}

function Chevron({ open, size = 14 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}
    >
      <path d="M6 9l6 6 6-6" stroke="#8a938e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function hasVerifiedSkuImage(image?: ProductImage): image is ProductImage {
  return Boolean(image?.verifiedSku && image.url);
}

function ProductThumb({
  productName,
  image,
  onAddPhoto,
}: {
  productName: string;
  image?: ProductImage;
  onAddPhoto?: () => void;
}) {
  const box = {
    background: '#fff',
    border: `1px solid ${HAIRLINE}`,
    borderRadius: 10,
    width: THUMB,
    height: THUMB,
    overflow: 'hidden' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ position: 'relative', width: THUMB, height: THUMB, flexShrink: 0 }}>
      {hasVerifiedSkuImage(image) ? (
        <div style={box}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={productName}
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
          />
        </div>
      ) : (
        <div role="img" aria-label={`${productName} — image coming`} style={box}>
          <div style={{
            fontSize: '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#9aa39d',
            textAlign: 'center',
            lineHeight: 1.3,
            padding: '0 6px',
          }}>
            Image coming
          </div>
        </div>
      )}
      {onAddPhoto && (
        <button
          type="button"
          onClick={onAddPhoto}
          aria-label="Add a photo"
          style={{
            position: 'absolute',
            right: -5,
            bottom: -5,
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: '#fff',
            border: `1px solid ${HAIRLINE}`,
            boxShadow: '0 2px 6px rgba(26, 46, 39, 0.08)',
            color: BRAND_GREEN,
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1,
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'inherit',
          }}
        >
          ＋
        </button>
      )}
    </div>
  );
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
        border: `1px solid ${HAIRLINE}`,
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
        border: `1px solid ${HAIRLINE}`,
        borderRadius: compact ? 12 : 16,
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

function WhyPanel({ why }: { why: IngredientWhy }) {
  return (
    <div style={{
      marginTop: 8,
      background: '#fff',
      border: `1px solid ${HAIRLINE}`,
      borderRadius: 12,
      padding: '0.75rem 0.85rem',
    }}>
      <div style={{ fontSize: '0.82rem', color: '#3a433e', lineHeight: 1.45 }}>
        {why.body}
      </div>
      {why.body === 'Why pending review' && !why.sourceName && why.sourceHref == null && (
        <div style={{ fontSize: '0.76rem', color: '#6b756f', lineHeight: 1.4, marginTop: 6 }}>
          Source pending review
        </div>
      )}
      {why.sourceName && (
        <div style={{ marginTop: 8 }}>
          {why.sourceHref ? (
            <a
              href={why.sourceHref}
              target="_blank"
              rel="noreferrer"
              style={{ color: BRAND_GREEN, fontSize: '0.78rem', fontWeight: 600 }}
            >
              {why.sourceName}
            </a>
          ) : (
            <div style={{ color: '#3a433e', fontSize: '0.78rem', lineHeight: 1.4 }}>
              {why.sourceName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function IngredientRow({
  name,
  riskLevel,
  typeLine,
  why,
}: {
  name: string;
  riskLevel: RiskLevel;
  typeLine: string;
  why: IngredientWhy;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      borderBottom: `1px solid ${HAIRLINE}`,
      padding: '0.72rem 0',
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
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: riskDotColor(riskLevel),
            flexShrink: 0,
            marginTop: 6,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#1a2e27',
                flex: 1,
                lineHeight: 1.25,
              }}>
                {name}
              </div>
              <Chevron open={open} />
            </div>
            <div style={{
              fontSize: '0.74rem',
              color: '#8a938e',
              marginTop: 3,
              lineHeight: 1.3,
            }}>
              {typeLine}
            </div>
          </div>
        </div>
      </button>
      {open && <WhyPanel why={why} />}
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
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 14,
        padding: '0.9rem',
        textAlign: 'left',
        cursor: onOpen ? 'pointer' : 'default',
        fontFamily: 'inherit',
      }}
    >
      <ProductTile
        productName={alt.productName}
        image={previewOverlayImage(alt) ?? alt.productImage}
        compact
      />
      <div style={{ fontSize: '0.78rem', color: '#6b756f', marginTop: 10 }}>
        {alt.brand}
      </div>
      <div style={{ marginTop: 10 }}>
        <span style={{
          display: 'inline-block',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: BRAND_GREEN,
          background: '#e7f3ec',
          borderRadius: 999,
          padding: '0.2rem 0.58rem',
          letterSpacing: '0.01em',
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
            border: `1px solid ${HAIRLINE}`,
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
  const [open, setOpen] = useState(false);

  return (
    <section style={{ margin: '0.65rem 0 0' }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          background: '#ffffff',
          border: `1px solid ${HAIRLINE}`,
          borderLeft: `6px solid ${BRAND_GREEN}`,
          borderRadius: 12,
          padding: '1.3rem 1.35rem',
          minHeight: 64,
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span style={{
          flex: 1,
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#4a534e',
        }}>
          Honest note
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <p style={{
          margin: '0.45rem 0 0',
          padding: '1.25rem 1.35rem',
          background: '#ffffff',
          border: `1px solid ${HAIRLINE}`,
          borderLeft: `6px solid ${BRAND_GREEN}`,
          borderRadius: 12,
          fontSize: '0.8rem',
          fontWeight: 500,
          color: '#4a534e',
          lineHeight: 1.5,
        }}>
          {note}
        </p>
      )}
    </section>
  );
}

function activeSafetyWhy(active: ActiveIngredient, flag: ActiveSafetyFlag): IngredientWhy {
  const why = ingredientWhy({
    name: active.name,
    riskLevel: activeSafetyRisk(flag),
    source: flag.source,
  });
  return {
    body: flag.description,
    sourceName: why.sourceName,
    sourceHref: why.sourceHref,
  };
}

function ActiveRow({
  active,
  safetyFlag,
  last = false,
}: {
  active: ActiveIngredient;
  safetyFlag?: ActiveSafetyFlag;
  last?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const riskLevel = safetyFlag ? activeSafetyRisk(safetyFlag) : null;

  const body = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
          <div style={{
            fontWeight: 600,
            fontSize: '0.74rem',
            color: '#1a2e27',
            flex: 1,
            lineHeight: 1.3,
            overflowWrap: 'anywhere',
          }}>
            {active.name}
          </div>
          {riskLevel && (
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: riskDotColor(riskLevel),
              flexShrink: 0,
              marginTop: 4,
            }} />
          )}
          {safetyFlag && <Chevron open={open} size={12} />}
        </div>
        <div style={{
          fontSize: '0.68rem',
          color: '#8a938e',
          marginTop: 1,
          lineHeight: 1.3,
          overflowWrap: 'anywhere',
        }}>
          {active.strength}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: last ? '0.22rem 0 0' : '0.22rem 0 0.28rem',
    }}>
      {safetyFlag ? (
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
          {body}
        </button>
      ) : body}
      {open && safetyFlag && <WhyPanel why={activeSafetyWhy(active, safetyFlag)} />}
    </div>
  );
}

function ActivesBlock({ record }: { record: RatingRecord }) {
  const [open, setOpen] = useState(false);
  const actives = record.activeIngredients;
  const count = actives.length;
  if (count === 0) return null;
  const flaggedIndex = flaggedActiveIndex(record);

  return (
    <section style={{ margin: '0.28rem 0 0' }}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`Active ingredients, ${count}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          width: 'auto',
          maxWidth: '100%',
          background: 'none',
          border: 'none',
          padding: '0.1rem 0',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#3a433e',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}>
          Active ingredients · {count}
        </span>
        <Chevron open={open} size={12} />
      </button>
      {open && (
        <div>
          {actives.map((active, index) => (
            <ActiveRow
              key={`${active.name}-${active.strength}-${index}`}
              active={active}
              last={index === actives.length - 1}
              safetyFlag={index === flaggedIndex ? record.activeSafetyFlag : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function InactiveIngredientsLabel() {
  return (
    <div style={{ margin: '0.85rem 0 0.15rem' }}>
      <div style={{
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: BLUE_B,
        marginBottom: '0.35rem',
      }}>
        Inactive ingredients
      </div>
      <div style={{
        width: 28,
        height: 2,
        background: BLUE_B,
      }} />
    </div>
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
    <section style={{ marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{
            fontSize: '0.92rem',
            fontWeight: 700,
            color: '#27ae60',
            marginBottom: '0.3rem',
          }}>
            {header}
          </div>
          <div style={{ width: 28, height: 2, background: '#27ae60', marginBottom: '0.65rem' }} />
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
            marginRight: -16,
            paddingRight: 16,
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
  const [savedLocal, setSavedLocal] = useState(() => loadPreviewCabinetIds().includes(record.id));
  const [toast, setToast] = useState<string | null>(null);
  const [starBounce, setStarBounce] = useState(false);
  const saved = savedProp ?? savedLocal;

  const inactives = useMemo(() => sortedInactives(record), [record]);
  const label = VERDICT_LABELS[record.verdict];
  const color = VERDICT_COLORS[record.verdict];
  const subline = VERDICT_SUBLINES[record.verdict];

  useEffect(() => {
    rememberPreviewViewedId(record.id);
  }, [record.id]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showToast(message: string) {
    if (onToast) onToast(message);
    else setToast(message);
  }

  function toggleSaved() {
    const next = onToggleSaved
      ? onToggleSaved(record.id)
      : togglePreviewCabinetId(record.id).saved;
    setSavedLocal(next);
    setStarBounce(true);
    window.setTimeout(() => setStarBounce(false), 280);
    showToast(next ? 'Saved to your cabinet.' : 'Removed.');
  }

  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      position: 'relative',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr 44px',
        alignItems: 'center',
        columnGap: 10,
        padding: subline ? '0.62rem 0.7rem 0.68rem' : '0.7rem 0.7rem',
        background: color,
      }}>
        {onBack ? (
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
              justifyContent: 'center',
              minWidth: 44,
              minHeight: 44,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <div />
        )}
        <div style={{ textAlign: 'center', minWidth: 0 }}>
          <div style={{
            fontSize: '1.7rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {label}
          </div>
          {subline && (
            <div style={{
              fontSize: '0.74rem',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.92)',
              marginTop: 4,
            }}>
              {subline}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggleSaved}
          aria-label={saved ? 'Remove from cabinet' : 'Save to cabinet'}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#fff',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'end',
            transform: starBounce ? 'scale(1.22)' : 'scale(1)',
            transition: 'transform 0.18s ease',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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

      <div style={{ padding: '0.7rem 0.9rem 2rem', background: CANVAS }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: 8 }}>
          <ProductThumb
            productName={record.productName}
            image={record.productImage}
            onAddPhoto={() => showToast(PHOTO_REVIEW_TOAST)}
          />
          <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: '#1a2e27',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              {record.productName}
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#5a635e', marginTop: 4 }}>
              {record.brand}
            </div>
            <ActivesBlock key={`actives-${record.id}`} record={record} />
          </div>
        </div>

        {record.honestNote && (
          <HonestNote key={record.id} note={record.honestNote} />
        )}

        <div>
          <InactiveIngredientsLabel />
          {inactives.map((ingredient, index) => (
            <IngredientRow
              key={`${ingredient.name}-${index}`}
              name={ingredient.name}
              riskLevel={ingredient.riskLevel}
              typeLine={restingTypeLine(ingredient)}
              why={ingredientWhy(ingredient)}
            />
          ))}

          {record.verdict !== 'clean' && (
            <AlternativesBlock record={record} onOpenProduct={onOpenProduct} />
          )}
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'sticky',
          bottom: 12,
          margin: '0 0.9rem',
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
