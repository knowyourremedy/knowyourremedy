'use client';

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import {
  getPreviewCabinetServerSnapshot,
  getPreviewCabinetSnapshot,
  getPreviewRecord,
  PREVIEW_SWITCHER,
  PREVIEW_SWITCHER_IDS,
  recordsForCabinet,
  subscribePreviewCabinet,
  togglePreviewCabinetId,
} from '@/lib/scan-preview/previewCatalog';
import PostScanProductScreen from './PostScanProductScreen';
import SearchScreen from './SearchScreen';

const BRAND_GREEN = '#2d4a3e';
const CANVAS = '#faf7f2';

type ChromeTab = 'home' | 'scan' | 'search' | 'cabinet';

type Props = {
  initialId?: string;
};

function TabIcon({ tab }: { tab: ChromeTab }) {
  const stroke = 'currentColor';
  if (tab === 'home') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 11.2L12 5l7.5 6.2V19a1.2 1.2 0 0 1-1.2 1.2H5.7A1.2 1.2 0 0 1 4.5 19v-7.8z" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.5 20.2V14h5v6.2" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (tab === 'scan') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 8.5V6.2A1.2 1.2 0 0 1 6.2 5H8.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15.5 5H17.8A1.2 1.2 0 0 1 19 6.2V8.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M19 15.5v2.3A1.2 1.2 0 0 1 17.8 19H15.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8.5 19H6.2A1.2 1.2 0 0 1 5 17.8V15.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4.5 12h15" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (tab === 'search') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="6.2" stroke={stroke} strokeWidth="1.6" />
        <path d="M15.8 15.8L20 20" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.6l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.58 7.3 18.05l.9-5.23-3.8-3.7 5.25-.76L12 3.6z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlaceholderScreen({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.35rem 1.15rem 1.5rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '1.7rem',
        fontWeight: 700,
        color: '#1a2e27',
        margin: '0 0 0.45rem',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: '0.92rem',
        color: '#5a635e',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {body}
      </p>
      {children}
    </div>
  );
}

function ScanDummy({ onScan }: { onScan: () => void }) {
  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.5rem 1.15rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '1.45rem',
        fontWeight: 700,
        color: '#1a2e27',
        marginBottom: '1.25rem',
      }}>
        Scan
      </div>
      <div style={{
        width: '100%',
        maxWidth: 260,
        aspectRatio: '1 / 1',
        borderRadius: 18,
        background: '#fff',
        border: '1px solid #e5dfd4',
        position: 'relative',
        boxShadow: '0 8px 22px rgba(26, 46, 39, 0.05)',
      }}>
        {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => {
          const top = corner.startsWith('t');
          const left = corner.endsWith('l');
          return (
            <span
              key={corner}
              style={{
                position: 'absolute',
                width: 28,
                height: 28,
                top: top ? 14 : undefined,
                bottom: top ? undefined : 14,
                left: left ? 14 : undefined,
                right: left ? undefined : 14,
                borderTop: top ? `3px solid ${BRAND_GREEN}` : undefined,
                borderBottom: top ? undefined : `3px solid ${BRAND_GREEN}`,
                borderLeft: left ? `3px solid ${BRAND_GREEN}` : undefined,
                borderRight: left ? undefined : `3px solid ${BRAND_GREEN}`,
              }}
            />
          );
        })}
      </div>
      <p style={{
        fontSize: '0.88rem',
        color: '#5a635e',
        textAlign: 'center',
        margin: '1.15rem 0 0',
        lineHeight: 1.45,
      }}>
        Camera is a dummy in this preview.
      </p>
      <button
        type="button"
        onClick={onScan}
        aria-label="Scan barcode"
        style={{
          marginTop: '1.35rem',
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: BRAND_GREEN,
          border: '6px solid #d7e0db',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}

function replacePreviewId(id: string) {
  if (typeof window === 'undefined') return;
  const url = `/scan-preview?id=${encodeURIComponent(id)}`;
  window.history.replaceState(window.history.state, '', url);
}

export default function ScanPreviewApp({ initialId }: Props) {
  const [selectedId, setSelectedId] = useState(initialId ?? PREVIEW_SWITCHER[0].id);
  const [tab, setTab] = useState<ChromeTab>('scan');
  const [productOpen, setProductOpen] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const cabinetJson = useSyncExternalStore(
    subscribePreviewCabinet,
    getPreviewCabinetSnapshot,
    getPreviewCabinetServerSnapshot,
  );
  const cabinetIds = useMemo(() => JSON.parse(cabinetJson) as string[], [cabinetJson]);
  const record = useMemo(() => getPreviewRecord(selectedId), [selectedId]);
  const inSwitcher = PREVIEW_SWITCHER_IDS.includes(record.id);
  const cabinetRecords = useMemo(() => recordsForCabinet(cabinetIds), [cabinetIds]);

  function selectProduct(id: string) {
    setSelectedId(id);
    setTab('scan');
    setProductOpen(true);
    replacePreviewId(id);
  }

  function goTab(next: ChromeTab) {
    setTab(next);
    setProductOpen(false);
    setToast(null);
  }

  function handleToggleSaved(id: string) {
    return togglePreviewCabinetId(id).saved;
  }

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <main style={{
      background: CANVAS,
      minHeight: '100dvh',
      padding: '0.65rem 0.5rem 0.75rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{ maxWidth: 390, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#7a8a78',
            marginBottom: 6,
          }}>
            Draft preview · {record.recordStatus ?? 'unverified'}
          </div>
          <div style={{
            display: 'flex',
            gap: 6,
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
                    padding: '0.4rem 0.3rem',
                    fontSize: '0.76rem',
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
          background: CANVAS,
          border: '1px solid #e8e0d0',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(45, 74, 62, 0.06)',
          height: 760,
          maxHeight: 'calc(100dvh - 5.75rem)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            {productOpen ? (
              <PostScanProductScreen
                key={record.id}
                record={record}
                onOpenProduct={selectProduct}
                onBack={() => setProductOpen(false)}
                saved={cabinetIds.includes(record.id)}
                onToggleSaved={handleToggleSaved}
                onToast={setToast}
              />
            ) : tab === 'home' ? (
              <PlaceholderScreen
                title="Home"
                body="Your scan history will live here later. This tab is a placeholder in the preview."
              />
            ) : tab === 'search' ? (
              <SearchScreen onOpenProduct={selectProduct} />
            ) : tab === 'cabinet' ? (
              <PlaceholderScreen
                title="Cabinet"
                body={cabinetRecords.length === 0
                  ? 'Nothing saved yet. Star a product to keep it here.'
                  : 'Products you starred in this preview.'}
              >
                {cabinetRecords.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '1.1rem' }}>
                    {cabinetRecords.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectProduct(item.id)}
                        style={{
                          background: '#fff',
                          border: '1px solid #ece7de',
                          borderRadius: 12,
                          padding: '0.85rem 0.95rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#1a2e27',
                        }}>
                          {item.productName}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#6b756f', marginTop: 3 }}>
                          {item.brand}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </PlaceholderScreen>
            ) : (
              <ScanDummy onScan={() => setProductOpen(true)} />
            )}
          </div>

          {toast && (
            <div
              role="status"
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                bottom: 72,
                background: BRAND_GREEN,
                color: '#fff',
                textAlign: 'center',
                padding: '0.65rem 0.9rem',
                borderRadius: 10,
                fontSize: '0.82rem',
                fontWeight: 600,
                zIndex: 3,
                boxShadow: '0 8px 20px rgba(26, 46, 39, 0.18)',
              }}
            >
              {toast}
            </div>
          )}

          <nav
            aria-label="Preview app"
            style={{
              display: 'flex',
              borderTop: '1px solid #e8e0d0',
              background: '#fff',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {([
              ['home', 'Home'],
              ['scan', 'Scan'],
              ['search', 'Search'],
              ['cabinet', 'Cabinet'],
            ] as const).map(([key, label]) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => goTab(key)}
                  aria-current={active ? 'page' : undefined}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    padding: '0.65rem 0.2rem 0.75rem',
                    minHeight: 56,
                    cursor: 'pointer',
                    color: active ? BRAND_GREEN : '#8a938e',
                    fontFamily: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <TabIcon tab={key} />
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: active ? 700 : 500,
                    letterSpacing: '0.01em',
                  }}>
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </main>
  );
}
