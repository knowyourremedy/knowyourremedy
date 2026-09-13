'use client';

import { useEffect, useMemo, useState } from 'react';
import type { RatingRecord } from '@/lib/ratingRecord';
import { groupRecordsByDisplayCategory } from '@/lib/scan-preview/previewCatalog';
import MemoryProductRow from './MemoryProductRow';

const BRAND_GREEN = '#2d4a3e';
const CANVAS = '#faf7f2';
const HAIRLINE = '#ece7de';
const DOOR_MS = 1000;

function CabinetDoors() {
  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.2rem',
        background: CANVAS,
      }}
    >
      <style>{`
        @keyframes kyr-cabinet-door-left {
          from { transform: perspective(640px) rotateY(0deg); }
          to { transform: perspective(640px) rotateY(-78deg); }
        }
        @keyframes kyr-cabinet-door-right {
          from { transform: perspective(640px) rotateY(0deg); }
          to { transform: perspective(640px) rotateY(78deg); }
        }
      `}</style>
      <div style={{
        width: 188,
        height: 220,
        position: 'relative',
        border: `1.6px solid ${BRAND_GREEN}`,
        borderRadius: 10,
        background: '#fff',
        boxShadow: '0 10px 24px rgba(45, 74, 62, 0.08)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 10,
          border: `1px solid ${HAIRLINE}`,
          borderRadius: 6,
          background: '#f3eee6',
        }} />
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
          display: 'flex',
          perspective: 640,
        }}>
          <div style={{
            flex: 1,
            border: `1.4px solid ${BRAND_GREEN}`,
            borderRight: `0.7px solid ${BRAND_GREEN}`,
            borderRadius: '6px 0 0 6px',
            background: '#fff',
            transformOrigin: 'left center',
            animation: `kyr-cabinet-door-left ${DOOR_MS}ms ease-out forwards`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: BRAND_GREEN,
            }} />
          </div>
          <div style={{
            flex: 1,
            border: `1.4px solid ${BRAND_GREEN}`,
            borderLeft: `0.7px solid ${BRAND_GREEN}`,
            borderRadius: '0 6px 6px 0',
            background: '#fff',
            transformOrigin: 'right center',
            animation: `kyr-cabinet-door-right ${DOOR_MS}ms ease-out forwards`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 8,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: BRAND_GREEN,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CabinetScreen({
  saved,
  onOpenProduct,
  onUnsave,
}: {
  saved: RatingRecord[];
  onOpenProduct: (id: string) => void;
  onUnsave: (id: string) => void;
}) {
  const [doorsOpen, setDoorsOpen] = useState(true);
  const groups = useMemo(() => groupRecordsByDisplayCategory(saved), [saved]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDoorsOpen(false), DOOR_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (doorsOpen) return <CabinetDoors />;

  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.2rem 1.1rem 1.5rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      {saved.length === 0 ? (
        <div style={{
          fontSize: '0.92rem',
          color: '#5a635e',
          marginTop: '0.35rem',
        }}>
          Nothing saved yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {groups.map((group) => (
            <section key={group.category ?? 'uncategorized'}>
              {group.category && (
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1a2e27',
                  letterSpacing: '0.01em',
                  marginBottom: 8,
                }}>
                  {group.category}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.records.map((record) => (
                  <MemoryProductRow
                    key={record.id}
                    record={record}
                    onOpen={() => onOpenProduct(record.id)}
                    onUnsave={() => onUnsave(record.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
