'use client';

import Link from 'next/link';

type Category = {
  key: string;
  label: string;
  blurb: string;
  accentColor: string;
  live: boolean;
};

type Props = {
  category: Category;
  count: number;
};

export default function CategoryTile({ category, count }: Props) {
  const isLive = category.live;
  const href = `/clean-picks/${category.key}`;

  const tileContent = (
    <>
      <div style={{
        height: '4px',
        background: category.accentColor,
        borderRadius: '2px',
        marginBottom: '0.85rem',
        width: '36px',
      }}></div>
      <div style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: isLive ? '#1a2e27' : '#7a8a78',
        marginBottom: '4px',
      }}>
        {category.label}
      </div>
      <div style={{
        fontSize: '0.82rem',
        color: isLive ? '#5a7a6e' : '#9ca8a3',
        marginBottom: '0.6rem',
        lineHeight: 1.5,
      }}>
        {category.blurb}
      </div>
      {isLive ? (
        <span style={{
          fontSize: '0.78rem',
          color: '#2d4a3e',
          fontWeight: 600,
        }}>
          {count} picks →
        </span>
      ) : (
        <span style={{
          fontSize: '0.78rem',
          color: '#9ca8a3',
          fontStyle: 'italic',
        }}>
          Coming soon
        </span>
      )}
    </>
  );

  const sharedStyle: React.CSSProperties = {
    display: 'block',
    background: isLive ? '#fff' : '#faf7f2',
    border: isLive ? '1px solid #e8e0d0' : '1px dashed #d4cbb8',
    borderRadius: '14px',
    padding: '1.25rem',
    textDecoration: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    opacity: isLive ? 1 : 0.85,
    width: '100%',
    textAlign: 'left',
    cursor: isLive ? 'pointer' : 'default',
  };

  if (isLive) {
    return (
      <Link href={href} style={sharedStyle}>
        {tileContent}
      </Link>
    );
  }

  return (
    <div style={sharedStyle}>{tileContent}</div>
  );
}