import RemedyLayout from '@/components/RemedyLayout'

export default function Remedies() {
  return (
    <RemedyLayout>
      <section style={{
        textAlign: 'center',
        padding: '3rem 2rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          color: '#2d4a3e',
          marginBottom: '1rem'
        }}>
          Remedies
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#5a7a6e',
          lineHeight: '1.6'
        }}>
          Every symptom covered. Every option presented. Find what works for your body without the guesswork.
        </p>
      </section>

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem 4rem'
      }}>

        {/* Pain and Inflammation */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Pain and Inflammation
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Headache', slug: 'headache' },
              { name: 'Muscle Pain', slug: 'muscle-pain' },
              { name: 'Joint Pain', slug: 'joint-pain' },
              { name: 'Back Pain', slug: 'back-pain' },
              { name: 'Menstrual Cramps', slug: 'menstrual-cramps' },
              { name: 'Dental Pain', slug: 'dental-pain' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Fever and Immune */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Fever and Immune
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Fever', slug: 'fever' },
              { name: 'Cold and Flu', slug: 'cold-and-flu' },
              { name: 'Sore Throat', slug: 'sore-throat' },
              { name: 'Sinus Congestion', slug: 'sinus-congestion' },
              { name: 'Ear Pain', slug: 'ear-pain' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Digestive */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Digestive
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Upset Stomach', slug: 'upset-stomach' },
              { name: 'Nausea', slug: 'nausea' },
              { name: 'Heartburn', slug: 'heartburn' },
              { name: 'Bloating and Gas', slug: 'bloating-and-gas' },
              { name: 'Diarrhea', slug: 'diarrhea' },
              { name: 'Constipation', slug: 'constipation' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Allergies and Respiratory */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Allergies and Respiratory
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Seasonal Allergies', slug: 'allergies' },
              { name: 'Itchy Eyes', slug: 'itchy-eyes' },
              { name: 'Skin Allergies', slug: 'skin-allergies' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Skin and External */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Skin and External
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Minor Cuts', slug: 'minor-cuts' },
              { name: 'Burns and Sunburn', slug: 'burns-and-sunburn' },
              { name: 'Insect Bites', slug: 'insect-bites' },
              { name: 'Rashes', slug: 'rashes' },
              { name: 'Muscle Soreness Topical', slug: 'muscle-soreness-topical' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Sleep and Stress */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Sleep and Stress
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Insomnia', slug: 'insomnia' },
              { name: 'Anxiety and Stress', slug: 'anxiety-and-stress' },
              { name: 'Tension Headaches', slug: 'tension-headaches' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Children and Infants */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Children and Infants
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { name: 'Teething Pain', slug: 'teething-pain' },
              { name: 'Colic', slug: 'colic' },
              { name: 'Diaper Rash', slug: 'diaper-rash' },
              { name: 'Growing Pains', slug: 'growing-pains' },
            ].map((item) => (
              <a key={item.slug} href={`/remedies/${item.slug}`} style={{ display: 'block', padding: '1rem 1.25rem', backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', textDecoration: 'none', color: '#2d4a3e', fontSize: '0.95rem', fontWeight: '500' }}>
                🌿 {item.name}
              </a>
            ))}
          </div>
        </div>

      </section>
    </RemedyLayout>
  )
}