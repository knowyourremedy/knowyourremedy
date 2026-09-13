'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import {
  VERDICT_COLORS,
  VERDICT_LABELS,
} from '@/lib/clean-picks/verdictLabels';
import {
  getPreviewCabinetServerSnapshot,
  getPreviewCabinetSnapshot,
  getPreviewRecord,
  getPreviewViewedServerSnapshot,
  getPreviewViewedSnapshot,
  PREVIEW_SWITCHER,
  PREVIEW_SWITCHER_IDS,
  recordsForCabinet,
  subscribePreviewCabinet,
  subscribePreviewViewed,
  togglePreviewCabinetId,
} from '@/lib/scan-preview/previewCatalog';
import CabinetScreen from './CabinetScreen';
import HomeScreen from './HomeScreen';
import PostScanProductScreen from './PostScanProductScreen';
import ScanDummyControl from './ScanDummyControl';
import SearchScreen, { EMPTY_SEARCH_STATE, type SearchViewState } from './SearchScreen';

const BRAND_GREEN = '#2d4a3e';
const CANVAS = '#faf7f2';
const SCANNER_TOAST = 'Scanner coming soon.';

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
      <rect x="4.2" y="4.8" width="15.6" height="15.2" rx="1.4" stroke={stroke} strokeWidth="1.6" />
      <path d="M12 4.8v15.2" stroke={stroke} strokeWidth="1.6" />
      <path d="M4.2 8.6h15.6" stroke={stroke} strokeWidth="1.6" />
      <circle cx="9.8" cy="14.2" r="0.75" fill={stroke} />
      <circle cx="14.2" cy="14.2" r="0.75" fill={stroke} />
    </svg>
  );
}

function ScanTab({ onScan }: { onScan: () => void }) {
  return (
    <div style={{
      background: CANVAS,
      minHeight: '100%',
      padding: '1.35rem 1.15rem 1.5rem',
      fontFamily: 'var(--font-inter), sans-serif',
    }}>
      <div style={{
        fontFamily: 'var(--font-playfair), Georgia, serif',
        fontSize: '1.45rem',
        fontWeight: 700,
        color: '#1a2e27',
        marginBottom: '1.1rem',
        letterSpacing: '-0.02em',
      }}>
        Scan
      </div>
      <ScanDummyControl onScan={onScan} />
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
  const [tab, setTab] = useState<ChromeTab>('home');
  const [productOpen, setProductOpen] = useState(Boolean(initialId));
  const [toast, setToast] = useState<string | null>(null);
  const [searchState, setSearchState] = useState<SearchViewState>(EMPTY_SEARCH_STATE);
  const [cabinetLandKey, setCabinetLandKey] = useState(0);
  const cabinetJson = useSyncExternalStore(
    subscribePreviewCabinet,
    getPreviewCabinetSnapshot,
    getPreviewCabinetServerSnapshot,
  );
  const viewedJson = useSyncExternalStore(
    subscribePreviewViewed,
    getPreviewViewedSnapshot,
    getPreviewViewedServerSnapshot,
  );
  const cabinetIds = useMemo(() => JSON.parse(cabinetJson) as string[], [cabinetJson]);
  const viewedIds = useMemo(() => JSON.parse(viewedJson) as string[], [viewedJson]);
  const record = useMemo(() => getPreviewRecord(selectedId), [selectedId]);
  const inSwitcher = PREVIEW_SWITCHER_IDS.includes(record.id);
  const cabinetRecords = useMemo(() => recordsForCabinet(cabinetIds), [cabinetIds]);
  const viewedRecords = useMemo(() => recordsForCabinet(viewedIds), [viewedIds]);

  function patchSearch(patch: Partial<SearchViewState>) {
    setSearchState((current) => ({ ...current, ...patch }));
  }

  function selectProduct(id: string) {
    setSelectedId(id);
    setProductOpen(true);
    replacePreviewId(id);
  }

  function showScannerToast() {
    setToast(SCANNER_TOAST);
  }

  function goTab(next: ChromeTab) {
    setTab(next);
    setProductOpen(false);
    setToast(null);
    if (next === 'cabinet') setCabinetLandKey((value) => value + 1);
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
          <div style={{
            flex: 1,
            overflow: !productOpen && tab === 'search' ? 'hidden' : 'auto',
            minHeight: 0,
            display: !productOpen && tab === 'search' ? 'flex' : undefined,
            flexDirection: !productOpen && tab === 'search' ? 'column' : undefined,
            position: 'relative',
          }}>
            {productOpen && (
              <PostScanProductScreen
                key={record.id}
                record={record}
                onOpenProduct={selectProduct}
                onBack={() => setProductOpen(false)}
                saved={cabinetIds.includes(record.id)}
                onToggleSaved={handleToggleSaved}
                onToast={setToast}
              />
            )}
            <div
              style={{
                display: productOpen ? 'none' : tab === 'search' ? 'flex' : undefined,
                flex: tab === 'search' ? 1 : undefined,
                minHeight: tab === 'search' ? 0 : undefined,
                height: tab === 'search' ? '100%' : undefined,
                flexDirection: tab === 'search' ? 'column' : undefined,
              }}
            >
            {tab === 'home' ? (
              <HomeScreen
                viewed={viewedRecords}
                onScan={showScannerToast}
                onOpenProduct={selectProduct}
              />
            ) : tab === 'search' ? (
              <div style={{ flex: 1, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SearchScreen
                  state={searchState}
                  onStateChange={patchSearch}
                  onOpenProduct={selectProduct}
                />
              </div>
            ) : tab === 'cabinet' ? (
              <CabinetScreen
                key={cabinetLandKey}
                saved={cabinetRecords}
                onOpenProduct={selectProduct}
                onUnsave={(id) => {
                  handleToggleSaved(id);
                  setToast('Removed.');
                }}
              />
            ) : (
              <ScanTab onScan={showScannerToast} />
            )}
            </div>
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
