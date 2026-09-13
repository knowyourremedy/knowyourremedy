'use client';

const BRAND_GREEN = '#2d4a3e';
const HAIRLINE = '#ece7de';

export default function ScanDummyControl({ onScan }: { onScan: () => void }) {
  return (
    <button
      type="button"
      onClick={onScan}
      aria-label="Scan barcode"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: '#fff',
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 18,
        padding: '1.15rem 1rem 1.25rem',
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: '0 8px 22px rgba(26, 46, 39, 0.05)',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 196,
        aspectRatio: '1 / 1',
        borderRadius: 16,
        background: '#faf7f2',
        position: 'relative',
      }}>
        {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => {
          const top = corner.startsWith('t');
          const left = corner.endsWith('l');
          return (
            <span
              key={corner}
              style={{
                position: 'absolute',
                width: 26,
                height: 26,
                top: top ? 12 : undefined,
                bottom: top ? undefined : 12,
                left: left ? 12 : undefined,
                right: left ? undefined : 12,
                borderTop: top ? `3px solid ${BRAND_GREEN}` : undefined,
                borderBottom: top ? undefined : `3px solid ${BRAND_GREEN}`,
                borderLeft: left ? `3px solid ${BRAND_GREEN}` : undefined,
                borderRight: left ? undefined : `3px solid ${BRAND_GREEN}`,
              }}
            />
          );
        })}
      </div>
      <span style={{
        marginTop: '1rem',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: BRAND_GREEN,
        border: '6px solid #d7e0db',
        display: 'block',
      }} />
    </button>
  );
}
