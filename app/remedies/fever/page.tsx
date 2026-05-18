import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Fever() {
  return (
    <RemedyLayout>

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

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor or qualified health provider before starting any new treatment. If your child has a fever and is under 3 months old go to the emergency room immediately." />

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

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1rem 2rem 2rem'
      }}>

        {/* When to Seek Care */}
        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          When to Seek Medical Care
        </h2>

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
            Per CDC, American Academy of Pediatrics, and Mayo Clinic — compiled by KnowYourRemedy.com for informational purposes only
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li>🔴 <strong>Infants under 3 months</strong> — any fever over 100.4°F — emergency room immediately</li>
            <li>🔴 <strong>Infants 3 to 6 months</strong> — fever over 102°F — call doctor same day</li>
            <li>🟡 <strong>Children 6 months to 2 years</strong> — fever over 104°F or lasting more than 24 hours — call doctor</li>
            <li>🟡 <strong>Children 2 and older</strong> — fever over 104°F or lasting more than 3 days — call doctor</li>
            <li>🟡 <strong>Adults</strong> — fever over 103°F lasting more than 3 days or with stiff neck, rash, or confusion — seek emergency care</li>
            <li>🔴 <strong>Any age</strong> — seizure, difficulty breathing, purple spots on skin — call 911 immediately</li>
          </ul>
        </div>

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
            Per American Association of Naturopathic Physicians — compiled by KnowYourRemedy.com for informational purposes only
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
            <li>🌿 Fever is often the body's natural immune response and not always something to suppress immediately</li>
            <li>🌿 Low grade fever under 102°F in children over 6 months may be monitored at home with supportive care</li>
            <li>🌿 Focus on hydration, rest, and comfort measures before reaching for fever reducers</li>
            <li>🌿 Persistent fever over 3 days regardless of temperature warrants professional evaluation</li>
            <li>🌿 Consult a licensed naturopathic physician before using herbal or essential oil interventions for children under 2</li>
          </ul>
        </div>

        <OilKey />

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
            { name: 'Elderberry Syrup', badge: '🟢 Internal Only', badgeColor: '#27ae60', desc: 'Immune support, antiviral properties. Safe for children over 1 year.', warning: '', safeUse: '' },
            { name: 'Ginger Tea', badge: '🟢 Internal Only', badgeColor: '#27ae60', desc: 'Anti-inflammatory, promotes sweating to naturally reduce fever.', warning: '', safeUse: '' },
            { name: 'Echinacea', badge: '🟢 Internal Only', badgeColor: '#27ae60', desc: 'Immune system support.', warning: 'Not recommended for children under 2.', safeUse: '' },
            { name: 'Peppermint Oil', badge: '🔵 External Only', badgeColor: '#2980b9', desc: 'Apply diluted to back of neck and bottoms of feet to help bring temperature down naturally.', warning: 'Mix with a carrier oil like coconut or jojoba oil before putting on skin. Never put directly on skin without mixing first. Never swallow topical grade oil. Not safe for children under 6.', safeUse: 'Safe to use in a diffuser for adults. Do not diffuse around children under 6, infants, or cats.' },
            { name: 'Lukewarm Bath', badge: '🔵 External Only', badgeColor: '#2980b9', desc: 'Helps bring temperature down naturally. Never use cold water or ice — it can cause shivering which raises body temperature.', warning: '', safeUse: '' },
            { name: 'Hydration', badge: '🟢 Internal Only', badgeColor: '#27ae60', desc: 'Water, coconut water, or electrolyte drinks. Critical for all ages. Fever causes fluid loss faster than normal.', warning: 'Never give honey to infants under 1 year.', safeUse: '' },
          ].map((item) => (
            <div key={item.name} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  display: 'inline-block',
                  fontSize: '0.8rem', 
                  color: '#fff',
                  backgroundColor: item.badgeColor,
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                }}>
                  {item.badge}
                </div>
                {item.badgeColor === '#27ae60' && (
                  <span style={{ fontSize: '0.75rem', color: '#c0392b', fontStyle: 'italic' }}>
                    (specific type — see notes below)
                  </span>
                )}
              </div>
              <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              {item.warning && (
                <div style={{ fontSize: '0.8rem', color: '#e67e22', marginTop: '0.5rem', borderLeft: '3px solid #e67e22', paddingLeft: '0.5rem', lineHeight: '1.5' }}>
                  {item.warning}
                </div>
              )}
              {item.safeUse && (
                <div style={{ fontSize: '0.8rem', color: '#27ae60', marginTop: '0.35rem', borderLeft: '3px solid #27ae60', paddingLeft: '0.5rem', lineHeight: '1.5' }}>
                  {item.safeUse}
                </div>
              )}
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

        {/* Last Resort */}
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
            If you are at a gas station or convenience store with limited options here is what to look for and what to avoid.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.9rem', color: '#5a7a6e' }}>
            <li>✅ <strong>Look for:</strong> Single ingredient acetaminophen or ibuprofen with no added dyes or flavoring</li>
            <li>🔴 <strong>Avoid:</strong> Products containing Red 40, Yellow 5, Yellow 6, High Fructose Corn Syrup, or Saccharin</li>
            <li>🔴 <strong>Avoid:</strong> Combination products with multiple active ingredients unless all symptoms are present</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}