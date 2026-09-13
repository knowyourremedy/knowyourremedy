'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { Verdict } from '@/lib/clean-picks/verdictLabels';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import type { ProductImage, RatingRecord } from '@/lib/ratingRecord';
import {
  loadedPreviewCategories,
  loadedPreviewDrafts,
  matchesSearchCategory,
  previewOverlayImage,
} from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const CANVAS = '#faf7f2';
const THUMB = 48;
const VERDICT_FILTERS: Verdict[] = ['clean', 'caution', 'avoid'];

export type SearchViewState = {
  query: string;
  selectedCategory: string | null;
  selectedVerdicts: Verdict[];
  listScrollTop: number;
};

export const EMPTY_SEARCH_STATE: SearchViewState = {
  query: '',
  selectedCategory: null,
  selectedVerdicts: [],
  listScrollTop: 0,
};

type Props = {
  onOpenProduct: (id: string) => void;
  state: SearchViewState;
  onStateChange: (patch: Partial<SearchViewState>) => void;
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

export default function SearchScreen({ onOpenProduct, state, onStateChange }: Props) {
  const { query, selectedCategory, selectedVerdicts, listScrollTop } = state;
  const chipRowRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const drafts = useMemo(() => loadedPreviewDrafts(), []);
  const categories = useMemo(() => loadedPreviewCategories(), []);
  const normalized = query.trim().toLowerCase();
  const categoryOn = selectedCategory != null;
  const typeOnly = !categoryOn && normalized.length >= 3;
  const showTiles = !categoryOn && normalized.length < 3;

  const results = useMemo(() => {
    if (showTiles) return null;

    let rows = drafts;
    if (selectedCategory) {
      rows = rows.filter((record) => matchesSearchCategory(record, selectedCategory));
    }
    if (categoryOn && selectedVerdicts.length > 0) {
      rows = rows.filter((record) => selectedVerdicts.includes(record.verdict));
    }
    if (normalized) {
      rows = rows.filter((record) => matchesQuery(record, normalized));
    }
    return sortByName(rows);
  }, [categoryOn, drafts, normalized, selectedCategory, selectedVerdicts, showTiles]);

  function toggleCategory(name: string) {
    const next = selectedCategory === name ? null : name;
    onStateChange({
      selectedCategory: next,
      selectedVerdicts: next ? selectedVerdicts : [],
      listScrollTop: 0,
    });
  }

  function toggleVerdict(verdict: Verdict) {
    const next = selectedVerdicts.includes(verdict)
      ? selectedVerdicts.filter((item) => item !== verdict)
      : [...selectedVerdicts, verdict];
    onStateChange({ selectedVerdicts: next, listScrollTop: 0 });
  }

  const emptyMessage = results && results.length === 0
    ? categoryOn && !normalized && selectedVerdicts.length === 0
      ? 'No products in this category yet.'
      : 'No matches.'
    : null;

  useEffect(() => {
    if (showTiles || typeOnly || !selectedCategory) return;
    const active = chipRowRef.current?.querySelector('[aria-pressed="true"]');
    if (active instanceof HTMLElement) {
      active.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  }, [selectedCategory, showTiles, typeOnly]);

  useEffect(() => {
    if (!listRef.current || showTiles) return;
    listRef.current.scrollTop = listScrollTop;
  }, [showTiles, selectedCategory]);

  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      height: '100%',
      flex: 1,
      boxSizing: 'border-box',
      padding: '1.1rem 1.05rem 1.25rem',
      fontFamily: 'var(--font-inter), sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        fontSize: '0.64rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#7a8a78',
        marginBottom: '0.7rem',
        flexShrink: 0,
      }}>
        Draft · unverified
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => onStateChange({ query: event.target.value, listScrollTop: 0 })}
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
          flexShrink: 0,
        }}
      />

      {showTiles ? (
        <div
          aria-label="Use category"
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridAutoRows: '1fr',
            gap: 10,
            marginTop: '0.75rem',
          }}
        >
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => toggleCategory(name)}
              style={{
                background: '#fff',
                color: '#1a2e27',
                border: '1px solid #ece7de',
                borderRadius: 14,
                padding: '0.85rem 0.7rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                fontFamily: 'inherit',
                lineHeight: 1.25,
                minHeight: 88,
              }}
            >
              {name}
            </button>
          ))}
        </div>
      ) : (
        <>
          {categoryOn && (
            <div
              ref={chipRowRef}
              aria-label="Use category"
              style={{
                display: 'flex',
                gap: 8,
                overflowX: 'auto',
                margin: '0.75rem -1.05rem 0',
                padding: '0 1.05rem',
                WebkitOverflowScrolling: 'touch',
                flexShrink: 0,
              }}
            >
              {categories.map((name) => {
                const active = selectedCategory === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(name)}
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
                    {name}
                  </button>
                );
              })}
            </div>
          )}

          {categoryOn && (
            <div
              aria-label="Grade"
              style={{
                display: 'flex',
                gap: 6,
                marginTop: '0.55rem',
                flexShrink: 0,
              }}
            >
              {VERDICT_FILTERS.map((verdict) => {
                const active = selectedVerdicts.includes(verdict);
                const color = VERDICT_COLORS[verdict];
                return (
                  <button
                    key={verdict}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleVerdict(verdict)}
                    style={{
                      background: active ? color : '#fff',
                      color: active ? '#fff' : color,
                      border: `1px solid ${color}`,
                      borderRadius: 999,
                      padding: '0.22rem 0.55rem',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {VERDICT_LABELS[verdict]}
                  </button>
                );
              })}
            </div>
          )}

          {results && results.length > 0 && (
            <div
              ref={listRef}
              onScroll={(event) => onStateChange({ listScrollTop: event.currentTarget.scrollTop })}
              style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: '0.9rem', flex: 1, minHeight: 0, overflow: 'auto' }}
            >
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
        </>
      )}
    </div>
  );
}
