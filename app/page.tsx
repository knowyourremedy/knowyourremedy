'use client'

import Footer from '@/components/Footer'

export default function Home() {
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

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/clean-picks" style={{
              backgroundColor: '#fff',
              color: '#2d4a3e',
              padding: '0.85rem 1.75rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              Browse Clean Picks
            </a>
            <a href="/oils" style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '0.85rem 1.75rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), sans-serif',
            }}>
              Explore the Oil Library
            </a>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{
        maxWidth: '1000px',
        margin: '-3rem auto 0',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {[
            {
              emoji: '✨',
              title: 'Clean Picks',
              desc: 'Everyday medicines and remedies rated by ingredient cleanliness',
              href: '/clean-picks',
              accent: '#2d4a3e'
            },
            {
              emoji: '🌱',
              title: 'Oil Library',
              desc: 'Safety, dilution, and sourcing — what to use, dilute, or never ingest',
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
              <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '3rem' }}>
                <span style={{ fontSize: '2.5rem' }}>{card.emoji}</span>
              </div>
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
              desc: 'Every mainstream product rated by ingredient cleanliness. Know exactly what you\'re buying before you buy it.'
            },
            {
              icon: '🌱',
              title: 'Oil safety you can trust',
              desc: 'The only guide that clearly tells you what\'s safe to ingest, what to dilute, and what to never swallow.'
            },
            {
              icon: '👨‍👩‍👧',
              title: 'Built for families',
              desc: 'Clean picks for kids and adults alike, vetted the same honest way — so you know what you\'re giving your family.'
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

      {/* Founding Member CTA Section */}
      <section style={{
        backgroundColor: '#2d4a3e',
        padding: '4rem 2rem',
        textAlign: 'center',
        margin: '0'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.12)',
            color: '#c8e6c0',
            padding: '0.35rem 0.9rem',
            borderRadius: '50px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-inter), sans-serif'
          }}>
            Founding Members
          </div>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Lock in $10/year — for life
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: '#b8d4c0',
            fontSize: '1rem',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            The barcode scanner is on the way — point it at any product and instantly know if it&apos;s clean, caution, or avoid. Join now as a founding member and keep today&apos;s price for life, even as it rises for everyone after. Free to browse everything today; no charge until the scanner launches.
          </p>
          <a href="/account" style={{
            display: 'inline-block',
            backgroundColor: '#fff',
            color: '#2d4a3e',
            padding: '0.875rem 2rem',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            fontFamily: 'var(--font-inter), sans-serif',
            textDecoration: 'none',
          }}>
            Claim your founding spot
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}