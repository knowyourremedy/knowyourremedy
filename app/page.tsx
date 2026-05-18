export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#faf7f2',
      fontFamily: 'Georgia, serif'
    }}>
      
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #e8e0d0'
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600',
          color: '#2d4a3e'
        }}>
          KnowYourRemedy
        </h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/remedies" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Remedies</a>
          <a href="/dosage" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Dosage</a>
          <a href="/brands" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Clean Brands</a>
          <a href="/oils" style={{ color: '#2d4a3e', textDecoration: 'none' }}>Oil Library</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: 'center',
        padding: '5rem 2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          color: '#2d4a3e',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Know Your Remedy
        </h2>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#5a7a6e',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          From the shelf to the root and everything in between. Natural first. Honest always. No agenda.
        </p>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          maxWidth: '500px',
          margin: '0 auto 4rem'
        }}>
          <input 
            type="text" 
            placeholder="Search a symptom or ingredient..."
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid #c8b89a',
              fontSize: '1rem',
              backgroundColor: '#fff',
              outline: 'none'
            }}
          />
          <button style={{
            padding: '1rem 2rem',
            borderRadius: '50px',
            backgroundColor: '#2d4a3e',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Search
          </button>
        </div>

        {/* Four Path Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <a href="/remedies" style={{
            display: 'block',
            padding: '1.5rem',
            backgroundColor: '#fff',
            border: '1px solid #c8b89a',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.25rem' }}>Natural Remedies</div>
            <div style={{ fontSize: '0.875rem', color: '#5a7a6e' }}>Herbs, supplements, and oils</div>
          </a>
          <a href="/dosage" style={{
            display: 'block',
            padding: '1.5rem',
            backgroundColor: '#fff',
            border: '1px solid #c8b89a',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.25rem' }}>Dosage Calculator</div>
            <div style={{ fontSize: '0.875rem', color: '#5a7a6e' }}>By weight, age, and medication</div>
          </a>
          <a href="/brands" style={{
            display: 'block',
            padding: '1.5rem',
            backgroundColor: '#fff',
            border: '1px solid #c8b89a',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏪</div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.25rem' }}>Clean Brand Guide</div>
            <div style={{ fontSize: '0.875rem', color: '#5a7a6e' }}>OTC brands ranked by ingredients</div>
          </a>
          <a href="/oils" style={{
            display: 'block',
            padding: '1.5rem',
            backgroundColor: '#fff',
            border: '1px solid #c8b89a',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧴</div>
            <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.25rem' }}>Oil Library</div>
            <div style={{ fontSize: '0.875rem', color: '#5a7a6e' }}>Safety, dilution, and sourcing</div>
          </a>
        </div>
      </section>

    </main>
  )
}