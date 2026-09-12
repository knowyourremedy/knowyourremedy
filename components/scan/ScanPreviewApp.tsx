'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import {
  getPreviewRecord,
  PREVIEW_SWITCHER,
  PREVIEW_SWITCHER_IDS,
} from '@/lib/scan-preview/previewCatalog';
import PostScanProductScreen from './PostScanProductScreen';

type Props = {
  initialId?: string;
};

export default function ScanPreviewApp({ initialId }: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(initialId ?? PREVIEW_SWITCHER[0].id);
  const record = useMemo(() => getPreviewRecord(selectedId), [selectedId]);
  const inSwitcher = PREVIEW_SWITCHER_IDS.includes(record.id);

  function selectProduct(id: string) {
    setSelectedId(id);
    router.replace(`/scan-preview?id=${encodeURIComponent(id)}`, { scroll: false });
  }

  return (
    <main style={{
      background: '#faf7f2',
      minHeight: '100vh',
      padding: '1rem 0.75rem 5.5rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{ maxWidth: 390, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#7a8a78',
            marginBottom: 8,
          }}>
            Draft preview · {record.recordStatus ?? 'unverified'}
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
          }}>
            {PREVIEW_SWITCHER.map((item) => {
              const active = record.id === item.id;
              const color = VERDICT_COLORS[item.verdict];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectProduct(item.id)}
                  style={{
                    flex: 1,
                    background: active ? color : '#fff',
                    color: active ? '#fff' : color,
                    border: `1px solid ${color}`,
                    borderRadius: 999,
                    padding: '0.55rem 0.35rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {VERDICT_LABELS[item.verdict]}
                </button>
              );
            })}
          </div>
          {!inSwitcher && (
            <div style={{ fontSize: '0.78rem', color: '#5a635e', marginTop: 8, lineHeight: 1.45 }}>
              Viewing a cleaner match from this shelf. Tap a verdict above to return to the three draft previews.
            </div>
          )}
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(45, 74, 62, 0.06)',
        }}>
          <PostScanProductScreen record={record} onOpenProduct={selectProduct} />
        </div>
      </div>
    </main>
  );
}
