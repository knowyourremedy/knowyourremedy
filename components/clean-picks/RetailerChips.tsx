'use client';

// Retailer chips footer with 4-visible + "More" rollup
// Visible chips show real retailer names; "More" chip is intentionally vague
// (matches policy: gas stations and other carriers exist but aren't named).

const RETAILER_CAP = 4;

type Props = {
  retailers: string[];
  priceTier: string;
};

export default function RetailerChips({ retailers, priceTier }: Props) {
  const showAll = retailers.length <= RETAILER_CAP;
  const visible = showAll ? retailers : retailers.slice(0, RETAILER_CAP);
  const hasMore = retailers.length > RETAILER_CAP;

  return (
    <div style={{
      borderTop: '1px solid #e8e0d0',
      background: '#faf7f2',
      padding: '0.7rem 1.25rem',
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      <span style={{
        fontSize: '0.72rem',
        fontWeight: 600,
        color: '#7a8a78',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginRight: '4px',
      }}>
        Find at:
      </span>
      {visible.map(r => (
        <span key={r} style={{
          fontSize: '0.78rem',
          padding: '4px 10px',
          background: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '6px',
          color: '#2a3a34',
          fontWeight: 500,
        }}>
          🏪 {r}
        </span>
      ))}
      {hasMore && (
        <span style={{
          fontSize: '0.78rem',
          padding: '4px 10px',
          background: '#fff',
          border: '1px dashed #c8ddc0',
          borderRadius: '6px',
          color: '#7a8a78',
          fontStyle: 'italic',
          fontWeight: 500,
        }}>
          + More
        </span>
      )}
      <span style={{
        fontSize: '0.72rem',
        color: '#7a8a78',
        marginLeft: 'auto',
        fontWeight: 500,
      }}>
        {priceTier}
      </span>
    </div>
  );
}