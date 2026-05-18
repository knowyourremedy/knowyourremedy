import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Headache() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor or qualified health provider before starting any new treatment. If your headache is sudden and severe, the worst of your life, or accompanied by fever, stiff neck, confusion, or vision changes — seek emergency care immediately." />

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
          Headache
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#5a7a6e',
          lineHeight: '1.6'
        }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1rem 2rem 2rem'
      }}>

        <OilKey />

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
            { 
              name: 'Peppermint Oil', 
              badge: '🔵 External Only', 
              badgeColor: '#2980b9',
              desc: 'Apply diluted to temples and back of neck for tension headaches. One of the most well studied natural headache remedies.',
              warning: 'Mix with a carrier oil like coconut or jojoba oil before putting on skin. A carrier oil is a plain gentle oil that makes essential oils safe for skin contact. Never put directly on skin without mixing first. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Safe to use in a diffuser for adults. Do not diffuse around children under 6, infants, or cats — it can cause breathing problems for them.'
            },
            { 
              name: 'Lavender Oil', 
              badge: '🟡 Dilute First', 
              badgeColor: '#f39c12',
              desc: 'Inhale directly or apply diluted to temples. Effective for stress and tension headaches. Calming and widely tolerated.',
              warning: 'Mix with a carrier oil like coconut or jojoba oil before applying to skin. A carrier oil is a plain gentle oil that makes essential oils safe for skin contact. Never put directly on skin without mixing first. Not for swallowing on this page.',
              safeUse: 'Safe to smell directly from the bottle. Safe to use in a diffuser and one of the gentlest oils for use around children and most pets.'
            },
            { 
              name: 'Magnesium Glycinate', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is one of the most common triggers for chronic headaches and migraines. Glycinate form is the most bioavailable and gentlest on the stomach.',
              warning: '',
              safeUse: ''
            },
            { 
              name: 'Ginger Tea', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory properties help reduce headache intensity. Particularly effective for nausea related headaches.',
              warning: '',
              safeUse: ''
            },
            { 
              name: 'Feverfew', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Traditionally used for migraine prevention. Some clinical evidence supports regular use for migraine frequency reduction.',
              warning: 'Not recommended during pregnancy. Consult a doctor before use if on blood thinners.',
              safeUse: ''
            },
            { 
              name: 'Hydration', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Dehydration is one of the most common and overlooked causes of headaches. Drink a full glass of water before reaching for anything else.',
              warning: '',
              safeUse: ''
            },
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

        {/* Ingestable Oil Label Education */}
        <div style={{
          backgroundColor: '#fff8e1',
          border: '1px solid #f0c040',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontWeight: '600', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

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
            { name: 'Excedrin Tension Headache', desc: 'Acetaminophen and caffeine only. No aspirin. Fewer ingredients than most combination headache products.', rating: '🟡 Acceptable' },
            { name: 'Tylenol Extra Strength Dye Free', desc: 'Single active ingredient acetaminophen. Look specifically for the dye free version.', rating: '🟢 Cleaner choice' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablet versions.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Single ingredient acetaminophen or ibuprofen with minimal added ingredients</li>
            <li>🔴 <strong>Avoid:</strong> Combination products with multiple active ingredients unless all symptoms are present</li>
            <li>🔴 <strong>Avoid:</strong> Products containing Red 40, Yellow 5, Yellow 6, or artificial sweeteners</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}