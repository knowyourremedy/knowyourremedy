export default function Remedies() {
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
  
        {/* Header */}
        <section style={{
          textAlign: 'center',
          padding: '3rem 2rem 2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            color: '#2d4a3e',
            marginBottom: '1rem'
          }}>
            Natural Remedies
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#5a7a6e',
            lineHeight: '1.6'
          }}>
            Every symptom covered. Natural first, honest always. Find what works for your body without the guesswork.
          </p>
        </section>
  
        {/* Symptom Categories */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem'
        }}>
  
          {/* Pain and Inflammation */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: '#2d4a3e',
              borderBottom: '2px solid #c8b89a',
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              Pain and Inflammation
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {['Headache', 'Muscle Pain', 'Joint Pain', 'Back Pain', 'Menstrual Cramps', 'Dental Pain'].map((symptom) => (
                <a key={symptom} href={`/remedies/${symptom.toLowerCase().replace(/ /g, '-')}`} style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2d4a3e',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  🌿 {symptom}
                </a>
              ))}
            </div>
          </div>
  
          {/* Fever and Immune */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: '#2d4a3e',
              borderBottom: '2px solid #c8b89a',
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              Fever and Immune
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {['Fever', 'Cold and Flu', 'Sore Throat', 'Sinus Congestion', 'Ear Pain'].map((symptom) => (
                <a key={symptom} href={`/remedies/${symptom.toLowerCase().replace(/ /g, '-')}`} style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2d4a3e',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  🌿 {symptom}
                </a>
              ))}
            </div>
          </div>
  
          {/* Digestive */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: '#2d4a3e',
              borderBottom: '2px solid #c8b89a',
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              Digestive
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {['Upset Stomach', 'Nausea', 'Heartburn', 'Bloating and Gas', 'Diarrhea', 'Constipation'].map((symptom) => (
                <a key={symptom} href={`/remedies/${symptom.toLowerCase().replace(/ /g, '-')}`} style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2d4a3e',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  🌿 {symptom}
                </a>
              ))}
            </div>
          </div>
  
          {/* Sleep and Stress */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: '#2d4a3e',
              borderBottom: '2px solid #c8b89a',
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              Sleep and Stress
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {['Insomnia', 'Anxiety and Stress', 'Tension Headaches'].map((symptom) => (
                <a key={symptom} href={`/remedies/${symptom.toLowerCase().replace(/ /g, '-')}`} style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2d4a3e',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  🌿 {symptom}
                </a>
              ))}
            </div>
          </div>
  
          {/* Children */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              color: '#2d4a3e',
              borderBottom: '2px solid #c8b89a',
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              Children and Infants
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem'
            }}>
              {['Teething Pain', 'Colic', 'Diaper Rash', 'Growing Pains'].map((symptom) => (
                <a key={symptom} href={`/remedies/${symptom.toLowerCase().replace(/ /g, '-')}`} style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e8e0d0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#2d4a3e',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  🌿 {symptom}
                </a>
              ))}
            </div>
          </div>
  
        </section>
      </main>
    )
  }