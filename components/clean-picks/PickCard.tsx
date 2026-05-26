'use client';

import { CLASS_COLORS, TOP_PICK_LABELS } from '@/lib/clean-picks/classColors';
import RetailerChips from './RetailerChips';
import type { Pick } from '@/lib/clean-picks/painFeverPicks';

type Props = {
  pick: Pick;
  showTopBadge?: boolean;
};

export default function PickCard({ pick, showTopBadge = false }: Props) {
  const colors = CLASS_COLORS[pick.classKey];
  const topPickLabel = showTopBadge && pick.topPick ? TOP_PICK_LABELS[pick.topPick] : null;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e8e0d0',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '1rem',
    }}>
      <div style={{ height: '6px', background: colors.bar }}></div>

      <div style={{ padding: '1.1rem 1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '8px',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#1a2e27',
              marginBottom: '4px',
            }}>
              {pick.name}
            </div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: colors.label,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {pick.activeIngredient}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', flexShrink: 0 }}>
            {topPickLabel && (
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#fef7e6',
                color: '#5c4a1f',
                whiteSpace: 'nowrap',
              }}>
                {topPickLabel}
              </span>
            )}
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: colors.tagBg,
              color: colors.tagText,
              whiteSpace: 'nowrap',
            }}>
              {pick.classTag}
            </span>
          </div>
        </div>

        <div style={{
          fontSize: '0.88rem',
          color: '#5a7a6e',
          lineHeight: 1.5,
          marginBottom: '0.85rem',
        }}>
          {pick.ageBadge && (
            <span style={{ fontWeight: 600, color: '#2d4a3e', marginRight: '0.4rem' }}>
              {pick.ageBadge} ·
            </span>
          )}
          {pick.subline}
        </div>

        <div style={{
          background: '#faf7f2',
          borderLeft: '3px solid #2d4a3e',
          padding: '0.75rem 1rem',
          marginBottom: '0.7rem',
          fontSize: '0.88rem',
          color: '#2a3a34',
          lineHeight: 1.6,
          borderRadius: '0 6px 6px 0',
        }}>
          <span style={{ fontWeight: 600, color: '#2d4a3e' }}>Why this pick:</span> {pick.why}
        </div>

        {pick.honestNote && (
          <div style={{
            background: '#fff8ec',
            borderLeft: '3px solid #d97706',
            padding: '0.6rem 0.85rem',
            fontSize: '0.83rem',
            color: '#5c4a1f',
            lineHeight: 1.55,
            borderRadius: '0 6px 6px 0',
          }}>
            <span style={{ fontWeight: 600 }}>Honest note:</span> {pick.honestNote}
          </div>
        )}
      </div>

      <RetailerChips retailers={pick.retailers} priceTier={pick.priceTier} />
    </div>
  );
}