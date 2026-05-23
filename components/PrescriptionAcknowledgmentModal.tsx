'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kyr_rx_acknowledged';

/**
 * Returns true if the current session has already acknowledged the Rx warning.
 * Safe to call on server (returns false during SSR).
 */
export function hasAcknowledgedRx(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

type Props = {
  open: boolean;
  onAcknowledge: () => void;
};

export default function PrescriptionAcknowledgmentModal({ open, onAcknowledge }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  function handleAcknowledge() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* sessionStorage blocked — proceed anyway */
    }
    onAcknowledge();
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rx-modal-title"
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '1.75rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid #e5e7eb',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Banner */}
        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: '1.5rem 0.5rem 1.25rem',
            background: 'linear-gradient(180deg, #eff6ff 0%, #fff 100%)',
            borderRadius: '12px',
            border: '2px solid #2563eb',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '2px',
              background: '#2563eb',
              opacity: 0.4,
            }}
          />
          <div style={{ fontSize: '2.6rem', lineHeight: 1, marginBottom: '0.6rem' }}>⚕️</div>
          <div
            id="rx-modal-title"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#2563eb',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1.15,
            }}
          >
            Please read first
          </div>
          <div
            style={{
              fontSize: '0.7rem',
              color: '#1e40af',
              letterSpacing: '0.14em',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Prescription information
          </div>
        </div>

        {/* Opening statement */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#1a2e27',
            lineHeight: 1.65,
            margin: '0 0 1.25rem',
            fontWeight: 500,
          }}
        >
          The information in this section is for{' '}
          <span style={{ color: '#2563eb', fontWeight: 700 }}>reference and education only</span>.
          It is not medical advice, and it does not replace your prescriber, pharmacist, or the
          label on your bottle.
        </p>

        {/* What this tool is for */}
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '10px',
            padding: '0.95rem 1.1rem',
            marginBottom: '0.7rem',
          }}
        >
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#166534',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            What this tool is for
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.1rem',
              fontSize: '0.85rem',
              color: '#1a2e27',
              lineHeight: 1.7,
            }}
          >
            <li>Understanding standard dose ranges</li>
            <li>Checking interactions with other medications</li>
            <li>Reviewing FDA labeling and warnings</li>
          </ul>
        </div>

        {/* What this tool is not for */}
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '10px',
            padding: '0.95rem 1.1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#7f1d1d',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            What this tool is not for
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '1.1rem',
              fontSize: '0.85rem',
              color: '#1a2e27',
              lineHeight: 1.7,
            }}
          >
            <li>Changing how you take a prescription</li>
            <li>Starting or stopping a medication</li>
            <li>Calculating doses for controlled substances</li>
          </ul>
        </div>

        {/* Closing */}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#6b7c74',
            lineHeight: 1.65,
            margin: '0 0 1.5rem',
            padding: '0.85rem 1rem',
            background: '#fafaf7',
            borderLeft: '3px solid #2d4a3e',
            borderRadius: '0 6px 6px 0',
          }}
        >
          When something doesn&apos;t match your label or you&apos;re not sure, call your pharmacist.
          They answer questions for free.
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={handleAcknowledge}
          style={{
            width: '100%',
            background: '#2d4a3e',
            color: '#fff',
            border: 'none',
            padding: '0.95rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            letterSpacing: '0.01em',
          }}
        >
          I understand — continue
        </button>
      </div>
    </div>
  );
}