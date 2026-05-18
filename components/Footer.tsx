export default function Footer() {
    return (
      <footer style={{
        borderTop: '1px solid #e8e0d0',
        backgroundColor: '#faf7f2',
        padding: '3rem 2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '1rem', fontSize: '1.1rem' }}>KnowYourRemedy</div>
            <p style={{ fontSize: '0.875rem', color: '#5a7a6e', lineHeight: '1.7' }}>
              From the shelf to the root and everything in between. Honest always. No agenda.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '1rem' }}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/remedies" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Remedies</a>
              <a href="/dosage" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Dosage Calculator</a>
              <a href="/brands" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Clean Brand Guide</a>
              <a href="/oils" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Oil Library</a>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '1rem' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="/disclaimer" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Medical Disclaimer</a>
              <a href="/affiliate-disclosure" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Affiliate Disclosure</a>
              <a href="/privacy" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="/about" style={{ fontSize: '0.875rem', color: '#5a7a6e', textDecoration: 'none' }}>About</a>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '1rem' }}>Download the App</div>
            <p style={{ fontSize: '0.875rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '0.75rem' }}>
              Full access including barcode scanner, saved family profiles, and offline use.
            </p>
            <div style={{ 
              display: 'inline-block',
              backgroundColor: '#2d4a3e',
              color: '#fff',
              padding: '0.5rem 1.25rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              Coming Soon
            </div>
          </div>
        </div>
        <div style={{
          maxWidth: '900px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e8e0d0',
          fontSize: '0.75rem',
          color: '#888',
          textAlign: 'center'
        }}>
          © 2025 KnowYourRemedy.com — For informational purposes only. Not a substitute for professional medical advice.
        </div>
      </footer>
    )
  }