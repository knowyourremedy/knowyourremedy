'use client'

import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    if (search.trim()) {
      window.location.href = `/remedies?search=${encodeURIComponent(search)}`
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf7f2' }}>
      

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2d4a3e 0%, #3d6b5a 50%, #4a7a6a 100%)',
        padding: '5rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.04)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-40px',
          width: '250px', height: '250px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.03)'
        }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#c8e6c0',
            padding: '0.4rem 1rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-inter), sans-serif'
          }}>
            Honest Always. No Agenda.
          </div>

          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1.25rem',
            lineHeight: '1.15',
            letterSpacing: '-0.02em'
          }}>
            Know Your Remedy
          </h1>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#b8d4c0',
            marginBottom: '2.5rem',
            lineHeight: '1.7',
            maxWidth: '540px',
            margin: '0 auto 2.5rem'
          }}>
            From the shelf to the root and everything in between. Natural options, cleaner mainstream choices, and honest guidance — all in one place.
          </p>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            gap: '0',
            maxWidth: '520px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '50px',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
          }}>
            <input
              type="text"
              placeholder="Search a symptom or ingredient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                border: 'none',
                outline: 'none',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-inter), sans-serif',
                backgroundColor: 'transparent',
                color: '#2d2d2d'
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '1rem 1.75rem',
                backgroundColor: '#2d4a3e',
                color: '#fff',
                border: 'none',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), sans-serif',
                borderRadius: '0 50px 50px 0'
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Four Path Cards */}
      <section style={{
        maxWidth: '1000px',
        margin: '-3rem auto 0',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            {
              emoji: '🌿',
              title: 'Remedies',
              desc: 'Every option, no agenda',
              href: '/remedies',
              accent: '#2d4a3e'
            },
            {
              emoji: '💊',
              title: 'Dosage Calculator',
              desc: 'By weight, age, and medication',
              href: '/dosage-calculator',
              accent: '#4a6741'
            },
            {
              emoji: '⚠️',
              title: 'Interaction Checker',
              desc: 'Check if your medications are safe to combine',
              href: '/interaction-checker',
              accent: '#5a7a55'
            },
            {
              emoji: '🏪',
              title: 'Clean Brand Guide',
              desc: 'OTC brands ranked by ingredients',
              href: '/brands',
              accent: '#5a7a55'
            },
            {
              emoji: '🌱',
              title: 'Oil Library',
              desc: 'Safety, dilution, and sourcing',
              href: '/oils',
              accent: '#6b8f65'
            },
          ].map((card) => (
            <a key={card.href} href={card.href} style={{
              display: 'block',
              backgroundColor: '#ffffff',
              border: '1px solid #e8e0d0',
              borderRadius: '16px',
              padding: '1.75rem 1.5rem',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'
            }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{card.emoji}</div>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: '700',
                color: card.accent,
                fontSize: '1.05rem',
                marginBottom: '0.4rem'
              }}>
                {card.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.825rem',
                color: '#7a8a78',
                lineHeight: '1.4'
              }}>
                {card.desc}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Why KnowYourRemedy Section */}
      <section style={{
        maxWidth: '900px',
        margin: '5rem auto',
        padding: '0 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: '700',
          color: '#2d4a3e',
          marginBottom: '1rem'
        }}>
          The hub every health consumer has been missing
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '1.05rem',
          color: '#5a6a58',
          lineHeight: '1.8',
          maxWidth: '650px',
          margin: '0 auto 3rem'
        }}>
          Every other site picks a lane. Natural health sites ignore conventional medicine. Medical sites ignore natural remedies. Essential oil sites give zero safety warnings. We sit in the middle and tell the full truth.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          textAlign: 'left'
        }}>
          {[
            {
              icon: '🌿',
              title: 'Every option, no agenda',
              desc: 'Natural remedies, cleaner conventional choices, and everything in between — presented honestly without bias toward any approach.'
            },
            {
              icon: '✅❌',
              title: 'Clean or avoid',
              desc: 'Every mainstream brand rated by ingredient cleanliness. Know exactly what you\'re buying before you buy it.'
            },
            {
              icon: '🌱',
              title: 'Oil safety you can trust',
              desc: 'The only guide that clearly tells you what\'s safe to ingest, what to dilute, and what to never swallow.'
            },
            {
              icon: '👨‍👩‍👧',
              title: 'Built for families',
              desc: 'Dosing by weight and age for infants through seniors. The answer you need at 2am when you need it most.'
            },
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontWeight: '700',
                color: '#2d4a3e',
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.875rem',
                color: '#5a6a58',
                lineHeight: '1.6'
              }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App CTA Section */}
      <section style={{
        backgroundColor: '#2d4a3e',
        padding: '4rem 2rem',
        textAlign: 'center',
        margin: '0'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>📱</div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            The app is coming
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: '#b8d4c0',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            Scan any product barcode in any store and instantly know if it\'s clean, caution, or avoid. Save family profiles. Access everything offline. $10 per year — founding member price.
          </p>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: '#fff',
            padding: '0.875rem 2rem',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            fontFamily: 'var(--font-inter), sans-serif',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer'
          }}>
            Join the waitlist — coming soon
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}