'use client'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 2rem',
      borderBottom: '1px solid #e8e0d0',
      backgroundColor: '#faf7f2',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.4rem',
          fontWeight: '700',
          color: '#2d4a3e',
          letterSpacing: '-0.01em'
        }}>
          Know<span style={{ color: '#7a9e7e' }}>Your</span>Remedy
        </div>
      </a>

      {/* Desktop Nav Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }} className="desktop-nav">
        {[
          { label: 'Remedies', href: '/remedies' },
          { label: 'Dosage Calculator', href: '/dosage-calculator' },
          { label: 'Interactions', href: '/interaction-checker' },
          { label: 'Clean Brands', href: '/brands' },
          { label: 'Oil Library', href: '/oils' },
        ].map((link) => (
          <a key={link.href} href={link.href} style={{
            color: '#4a6741',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '500',
            fontFamily: 'var(--font-inter), sans-serif',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.target as HTMLElement).style.color = '#2d4a3e'}
          onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a6741'}
          >
            {link.label}
          </a>
        ))}
        <a href="/app" style={{
          backgroundColor: '#2d4a3e',
          color: '#fff',
          padding: '0.5rem 1.25rem',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '600',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          Get the App
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          flexDirection: 'column',
          gap: '5px',
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#2d4a3e', marginBottom: '5px' }}></span>
        <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#2d4a3e', marginBottom: '5px' }}></span>
        <span style={{ display: 'block', width: '24px', height: '2px', backgroundColor: '#2d4a3e' }}></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#faf7f2',
          borderBottom: '1px solid #e8e0d0',
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 99,
        }}>
          {[
            { label: 'Remedies', href: '/remedies' },
            { label: 'Dosage Calculator', href: '/dosage-calculator' },
            { label: 'Interactions', href: '/interaction-checker' },
            { label: 'Clean Brands', href: '/brands' },
            { label: 'Oil Library', href: '/oils' },
          ].map((link) => (
            <a key={link.href} href={link.href} style={{
              color: '#2d4a3e',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              {link.label}
            </a>
          ))}
          <a href="/app" style={{
            backgroundColor: '#2d4a3e',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: 'var(--font-inter), sans-serif',
          }}>
            Get the App
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}