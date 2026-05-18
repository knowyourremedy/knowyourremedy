export default function Fever() {
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
  
        {/* Emergency Warning Bar */}
        <div style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          padding: '1rem 2rem',
          textAlign: 'center',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}>
          🚨 <strong>When to call 911 immediately:</strong> Seizure, difficulty breathing, purple spots on skin, or an infant under 3 months with any fever over 100.4°F. Do not wait.
        </div>
  
        {/* Legal Disclaimer Box */}
        <div style={{
          backgroundColor: '#fff8e1',
          border: '1px solid #f0c040',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          margin: '2rem auto',
          maxWidth: '900px',
          fontSize: '0.875rem',
          color: '#5a4a00',
          lineHeight: '1.7'
        }}>
          <strong>⚠️ Important Legal Disclaimer:</strong> The information on this page is provided for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of your physician, pediatrician, or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this website. KnowYourRemedy.com assumes no liability for any decisions made based on the information provided here.
        </div>
  
        {/* Page Header */}
        <section style={{
          textAlign: 'center',
          padding: '2rem 2rem 1rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            color: '#2d4a3e',
            marginBottom: '0.5rem'
          }}>
            Fever
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#5a7a6e',
            lineHeight: '1.6'
          }}>
            Every option available. You decide what is right for your situation.
          </p>
        </section>
  
        {/* Emergency Thresholds */}
        <section style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1rem 2rem 2rem'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            color: '#2d4a3e',
            borderBottom: '2px solid #c8b89a',
            paddingBottom: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            When to Seek Medical Care
          </h2>
  
          {/* Medical Guidelines */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            marginBottom: '1rem'
          }}>
            <p style={{ 
            fontSize: '0.95rem', 
            color: '#2d4a3e', 
            marginBottom: '0.75rem',
            fontWeight: '600'
            }}>
              Per CDC, American Academy of Pediatrics, and Mayo Clinic guidelines — compiled by KnowYourRemedy.com for informational purposes only
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              lineHeight: '2'
            }}>
              <li>🔴 <strong>Infants under 3 months</strong> — any fever over 100.4°F — emergency room immediately</li>
              <li>🔴 <strong>Infants 3 to 6 months</strong> — fever over 102°F — call doctor same day</li>
              <li>🟡 <strong>Children 6 months to 2 years</strong> — fever over 104°F or lasting more than 24 hours — call doctor</li>
              <li>🟡 <strong>Children 2 and older</strong> — fever over 104°F or lasting more than 3 days — call doctor</li>
              <li>🟡 <strong>Adults</strong> — fever over 103°F lasting more than 3 days or with stiff neck, rash, or confusion — seek emergency care</li>
              <li>🔴 <strong>Any age</strong> — seizure, difficulty breathing, purple spots on skin — call 911 immediately</li>
            </ul>
          </div>
  
          {/* Naturopathic Guidelines */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem'
          }}>
           <p style={{
           fontSize: '0.95rem', 
color: '#2d4a3e', 
marginBottom: '0.75rem',
fontWeight: '600'
            }}>
              Per American Association of Naturopathic Physicians guidelines — compiled by KnowYourRemedy.com for informational purposes only
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              lineHeight: '2'
            }}>
              <li>🌿 Fever is often the body's natural immune response and not always something to suppress immediately</li>
              <li>🌿 Low grade fever under 102°F in children over 6 months may be monitored at home with supportive care</li>
              <li>🌿 Focus on hydration, rest, and comfort measures before reaching for fever reducers</li>
              <li>🌿 Persistent fever over 3 days regardless of temperature warrants professional evaluation</li>
              <li>🌿 Consult a licensed naturopathic physician before using herbal or essential oil interventions for children under 2</li>
            </ul>
          </div>
  
          {/* Natural Options */}
          <h2 style={{ 
            fontSize: '1.25rem', 
            color: '#2d4a3e',
            borderBottom: '2px solid #c8b89a',
            paddingBottom: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            🌿 Natural Options
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { name: 'Elderberry Syrup', desc: 'Immune support, antiviral properties. Safe for children over 1 year.', flag: '' },
              { name: 'Ginger Tea', desc: 'Anti-inflammatory, promotes sweating to naturally reduce fever.', flag: '' },
              { name: 'Echinacea', desc: 'Immune system support. Not recommended for children under 2.', flag: '⚠️ Age restriction' },
              { name: 'Peppermint Oil', desc: 'Dilute and apply topically to back of neck and feet. Never ingest in children.', flag: '⚠️ Dilute before use' },
              { name: 'Lukewarm Bath', desc: 'Helps bring temperature down naturally. Never use cold water or ice.', flag: '' },
              { name: 'Hydration', desc: 'Water, coconut water, or electrolyte drinks. Critical for all ages.', flag: '' },
            ].map((item) => (
              <div key={item.name} style={{
                backgroundColor: '#fff',
                border: '1px solid #e8e0d0',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
                {item.flag && <div style={{ fontSize: '0.8rem', color: '#c0392b' }}>{item.flag}</div>}
              </div>
            ))}
          </div>
  
          {/* Cleaner Mainstream Options */}
          <h2 style={{ 
            fontSize: '1.25rem', 
            color: '#2d4a3e',
            borderBottom: '2px solid #c8b89a',
            paddingBottom: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            🏪 Cleaner Mainstream Options
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { name: 'Childrens Tylenol Dye Free', desc: 'No artificial dyes. Look for the dye free label specifically on the box.', rating: '🟢 Cleaner choice' },
              { name: 'Motrin Childrens Dye Free', desc: 'Ibuprofen without artificial coloring. Available at most major drugstores.', rating: '🟢 Cleaner choice' },
              { name: 'Boiron Childrens Coldcalm', desc: 'Homeopathic option. No artificial ingredients. Results vary.', rating: '🟡 Acceptable' },
            ].map((item) => (
              <div key={item.name} style={{
                backgroundColor: '#fff',
                border: '1px solid #e8e0d0',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
                <div style={{ fontSize: '0.8rem', color: '#2d4a3e', fontWeight: '600' }}>{item.rating}</div>
              </div>
            ))}
          </div>
  
          {/* Last Resort Options */}
          <h2 style={{ 
            fontSize: '1.25rem', 
            color: '#2d4a3e',
            borderBottom: '2px solid #c8b89a',
            paddingBottom: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            ✅ If You Have No Other Choice
          </h2>
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e8e0d0',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            marginBottom: '3rem'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '1rem' }}>
              If you are at a gas station or convenience store with limited options, here is what to look for and what to avoid.
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              lineHeight: '2',
              fontSize: '0.9rem',
              color: '#5a7a6e'
            }}>
              <li>✅ <strong>Look for:</strong> Single ingredient acetaminophen or ibuprofen with no added dyes or flavoring</li>
              <li>🔴 <strong>Avoid:</strong> Products containing Red 40, Yellow 5, Yellow 6, High Fructose Corn Syrup, or Saccharin</li>
              <li>🔴 <strong>Avoid:</strong> Combination products with multiple active ingredients unless all symptoms are present</li>
            </ul>
          </div>
  
          {/* Affiliate Disclosure */}
          <div style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            marginBottom: '1rem',
            fontSize: '0.8rem',
            color: '#888',
            lineHeight: '1.6'
          }}>
            <strong>Affiliate Disclosure:</strong> Some links on this page may be affiliate links. If you purchase through these links KnowYourRemedy.com may earn a small commission at no additional cost to you. This never influences our recommendations. We only suggest products we have researched and believe provide genuine value.
          </div>
  
          {/* Bottom Disclaimer */}
          <div style={{
            backgroundColor: '#fff8e1',
            border: '1px solid #f0c040',
            borderRadius: '8px',
            padding: '1rem 1.5rem',
            fontSize: '0.8rem',
            color: '#5a4a00',
            lineHeight: '1.6'
          }}>
            <strong>Medical Disclaimer:</strong> The statements on this page have not been evaluated by the Food and Drug Administration. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult a qualified healthcare professional before starting any new treatment, supplement, or health regimen. KnowYourRemedy.com is not responsible for any adverse effects or consequences resulting from the use of any suggestions, preparations, or procedures described on this website.
          </div>
  
        </section>
      </main>
    )
  }