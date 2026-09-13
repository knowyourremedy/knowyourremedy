'use client';

import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import type { ProductImage, RatingRecord } from '@/lib/ratingRecord';
import { previewOverlayImage } from '@/lib/scan-preview/previewCatalog';

const BRAND_GREEN = '#2d4a3e';
const HAIRLINE = '#ece7de';
const THUMB = 52;

function rowImage(record: RatingRecord): ProductImage | undefined {
  return previewOverlayImage(record) ?? record.productImage;
}

function MemoryThumb({
  productName,
  image,
}: {
  productName: string;
  image?: ProductImage;
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

export default function MemoryProductRow({
  record,
  onOpen,
  onUnsave,
}: {
  record: RatingRecord;
  onOpen: () => void;
  onUnsave?: () => void;
}) {
  const color = VERDICT_COLORS[record.verdict];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      minHeight: 76,
      boxSizing: 'border-box',
      background: '#fff',
      border: `1px solid ${HAIRLINE}`,
      borderRadius: 14,
      padding: '0.7rem 0.7rem 0.7rem 0.8rem',
    }}>
      <button
        type="button"
        onClick={onOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flex: 1,
          minWidth: 0,
          background: 'none',
          border: 'none',
          padding: 0,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <MemoryThumb productName={record.productName} image={rowImage(record)} />
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
      {onUnsave && (
        <button
          type="button"
          aria-label="Remove from cabinet"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onUnsave();
          }}
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.58 7.3 18.05l.9-5.23-3.8-3.7 5.25-.76L12 3.6z"
              fill={BRAND_GREEN}
              stroke={BRAND_GREEN}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
