export default function Nav() {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e8e0d0'
      }}>
        <a href="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: '#2d4a3e',
          textDecoration: 'none'
        }}>
          KnowYourRemedy
        </a>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/remedies" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Remedies</a>
          <a href="/dosage" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Dosage</a>
          <a href="/brands" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Clean Brands</a>
          <a href="/oils" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Oil Library</a>
        </div>
      </nav>
    )
  }