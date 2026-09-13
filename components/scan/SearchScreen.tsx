'use client';

import { useMemo, useState } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import type { ProductImage, RatingRecord } from '@/lib/ratingRecord';
import {
  loadedPreviewCategories,
  loadedPreviewDrafts,
  previewOverlayImage,
} from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const CANVAS = '#faf7f2';
const ALL_CHIP = 'all';
const THUMB = 48;

type Props = {
  onOpenProduct: (id: string) => void;
};

function matchesQuery(record: RatingRecord, query: string): boolean {
  if (!query) return true;
  const haystack = `${record.productName} ${record.brand}`.toLowerCase();
  return haystack.includes(query);
}

function sortByName(records: RatingRecord[]): RatingRecord[] {
  return [...records].sort((a, b) =>
    a.productName.localeCompare(b.productName, undefined, { sensitivity: 'base' }),
  );
}

function rowImage(record: RatingRecord): ProductImage | undefined {
  return previewOverlayImage(record) ?? record.productImage;
}

function SearchThumb({
  productName,
  image,
}: {
  productName: string;
  image?: ProductImage;
}) {
  const box = {
    background: '#fff',
    border: '1px solid #ece7de',
    borderRadius: 8,
    width: THUMB,
    height: THUMB,
    overflow: 'hidden' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  if (image?.url) {
    return (
      <div style={box}>
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
    <div role="img" aria-label={`${productName} — image coming`} style={box}>
      <div style={{
        fontSize: '0.48rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: '#9aa39d',
        textAlign: 'center',
        lineHeight: 1.25,
        padding: '0 4px',
      }}>
        Image coming
      </div>
    </div>
  );
}

export default function SearchScreen({ onOpenProduct }: Props) {
  const [query, setQuery] = useState('');
  const [chip, setChip] = useState<string | null>(null);
  const drafts = useMemo(() => loadedPreviewDrafts(), []);
  const categories = useMemo(() => loadedPreviewCategories(), []);
  const normalized = query.trim().toLowerCase();
  const chipOn = chip != null;

  const results = useMemo(() => {
    if (!chipOn && normalized.length < 3) return null;

    let rows = drafts;
    if (chip && chip !== ALL_CHIP) {
      rows = rows.filter((record) => record.category === chip);
    }
    if (normalized) {
      rows = rows.filter((record) => matchesQuery(record, normalized));
    }
    return sortByName(rows);
  }, [chip, chipOn, drafts, normalized]);

  function toggleChip(next: string) {
    setChip((current) => (current === next ? null : next));
  }

  const emptyMessage = results && results.length === 0
    ? chip && chip !== ALL_CHIP && !normalized
      ? 'No products in this category yet.'
      : 'No matches.'
    : null;

  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.1rem 1.05rem 1.25rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        fontSize: '0.64rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#7a8a78',
        marginBottom: '0.7rem',
      }}>
        Draft · unverified
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Product or brand"
        aria-label="Product or brand"
        style={{
          display: 'block',
          width: '100%',
          boxSizing: 'border-box',
          background: '#fff',
          border: '1px solid #e5dfd4',
          borderRadius: 12,
          padding: '0.72rem 0.9rem',
          fontSize: '0.92rem',
          color: '#1a2e27',
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />

      <div
        aria-label="Use category"
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          margin: '0.75rem -1.05rem 0',
          padding: '0 1.05rem',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {[{ key: ALL_CHIP, label: 'All' }, ...categories.map((name) => ({ key: name, label: name }))].map((item) => {
          const active = chip === item.key;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={active}
              onClick={() => toggleChip(item.key)}
              style={{
                flexShrink: 0,
                background: active ? BRAND_GREEN : '#fff',
                color: active ? '#fff' : '#3a433e',
                border: `1px solid ${active ? BRAND_GREEN : '#e5dfd4'}`,
                borderRadius: 999,
                padding: '0.38rem 0.78rem',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {results && results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: '0.9rem' }}>
          {results.map((record) => {
            const color = VERDICT_COLORS[record.verdict];
            return (
              <button
                key={record.id}
                type="button"
                onClick={() => onOpenProduct(record.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  minHeight: 72,
                  boxSizing: 'border-box',
                  background: '#fff',
                  border: '1px solid #ece7de',
                  borderRadius: 12,
                  padding: '0.65rem 0.75rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <SearchThumb productName={record.productName} image={rowImage(record)} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#1a2e27',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                  }}>
                    {record.productName}
                  </div>
                  <div style={{
                    fontSize: '0.76rem',
                    color: '#6b756f',
                    marginTop: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {record.brand}
                  </div>
                </div>
                <span style={{
                  flexShrink: 0,
                  color,
                  border: `1px solid ${color}`,
                  borderRadius: 999,
                  padding: '0.18rem 0.5rem',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                }}>
                  {VERDICT_LABELS[record.verdict]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {emptyMessage && (
        <p style={{
          fontSize: '0.86rem',
          color: '#6b756f',
          margin: '1rem 0 0',
          lineHeight: 1.4,
        }}>
          {emptyMessage}
        </p>
      )}
    </div>
  );
}
