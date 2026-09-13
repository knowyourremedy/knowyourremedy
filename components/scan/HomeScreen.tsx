'use client';

import type { RatingRecord } from '@/lib/ratingRecord';
import MemoryProductRow from './MemoryProductRow';
import ScanDummyControl from './ScanDummyControl';

const CANVAS = '#faf7f2';

export default function HomeScreen({
  viewed,
  onScan,
  onOpenProduct,
}: {
  viewed: RatingRecord[];
  onScan: () => void;
  onOpenProduct: (id: string) => void;
}) {
  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.2rem 1.1rem 1.5rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '1.7rem',
        fontWeight: 700,
        color: '#1a2e27',
        margin: '0 0 1rem',
        letterSpacing: '-0.02em',
      }}>
        Know Your Remedy
      </h1>

      <ScanDummyControl onScan={onScan} />

      <div style={{
        marginTop: '1.35rem',
        fontSize: '0.82rem',
        fontWeight: 700,
        color: '#1a2e27',
        letterSpacing: '-0.01em',
      }}>
        Previously viewed
      </div>

      {viewed.length === 0 ? (
        <div style={{
          fontSize: '0.92rem',
          color: '#5a635e',
          marginTop: '0.65rem',
        }}>
          Nothing viewed yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '0.7rem' }}>
          {viewed.map((record) => (
            <MemoryProductRow
              key={record.id}
              record={record}
              onOpen={() => onOpenProduct(record.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
