export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1e3329',
      padding: '4rem 2rem 2rem',
      marginTop: '0'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>

        {/* Top Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '0.75rem'
            }}>
              Know<span style={{ color: '#7a9e7e' }}>Your</span>Remedy
            </div>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              color: '#7a9e7e',
              lineHeight: '1.7',
              margin: 0
            }}>
              From the shelf to the root and everything in between. Honest always. No agenda.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#7a9e7e',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Explore
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Remedies', href: '/remedies' },
                { label: 'Dosage Calculator', href: '/dosage' },
                { label: 'Clean Brand Guide', href: '/brands' },
                { label: 'Oil Library', href: '/oils' },
              ].map((link) => (
                <a key={link.href} href={link.href} style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.875rem',
                  color: '#b8d4c0',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#7a9e7e',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              Legal
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Medical Disclaimer', href: '/disclaimer' },
                { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <a key={link.href} href={link.href} style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.875rem',
                  color: '#b8d4c0',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* App */}
          <div>
            <div style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#7a9e7e',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              The App
            </div>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              color: '#b8d4c0',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Barcode scanner, saved family profiles, offline access. $10/year founding member price.
            </p>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), sans-serif',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              Coming Soon
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.775rem',
            color: '#4a6a52',
            margin: 0
          }}>
            © 2025 KnowYourRemedy.com — For informational purposes only. Not a substitute for professional medical advice.
          </p>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.775rem',
            color: '#4a6a52',
            margin: 0
          }}>
            Honest always. No agenda.
          </p>
        </div>

      </div>
    </footer>
  )
}