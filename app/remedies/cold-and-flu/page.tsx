import Nav from '@/components/Nav'

export default function ColdAndFlu() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#faf7f2',
      fontFamily: 'Georgia, serif'
    }}>

      <Nav />

      {/* Legal Disclaimer */}
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
        <strong>⚠️ Important Disclaimer:</strong> The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor or qualified health provider before starting any new treatment. If you experience difficulty breathing, chest pain, confusion, or symptoms that are severe or rapidly worsening — seek emergency care immediately.
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
          Cold and Flu
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

        {/* Oil Badge Key */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '8px',
          padding: '1rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Essential Oil Safety Key</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem' }}>
            <span style={{ backgroundColor: '#27ae60', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🟢 Internal Only</span>
            <span style={{ backgroundColor: '#f39c12', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🟡 Dilute First</span>
            <span style={{ backgroundColor: '#2980b9', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>🔵 External Only</span>
            <span style={{ backgroundColor: '#2c3e50', color: '#fff', padding: '3px 12px', borderRadius: '20px', fontWeight: '600' }}>⚫ Avoid</span>
          </div>
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
            { 
              name: 'Elderberry Syrup', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'One of the most well studied natural antivirals. Shown to reduce duration and severity of cold and flu symptoms. Safe for children over 1 year.',
              warning: '',
              safeUse: 'Take at first sign of symptoms. Available in syrup, gummy, and capsule form. Look for brands without added high fructose corn syrup or artificial colors.'
            },
            { 
              name: 'Oregano Oil', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Powerful antimicrobial and antiviral properties. One of the strongest natural options for fighting cold and flu.',
              warning: 'For internal use only purchase oils with a Supplement Facts panel on the label. The words pure, natural, or therapeutic grade do NOT mean safe to ingest. Not recommended for children under 6, pregnant women, or people on blood thinners without doctor approval.',
              safeUse: 'Can also be diluted with a carrier oil — a plain gentle oil like coconut or jojoba oil — and applied to the bottoms of feet. Safe to diffuse for adults.'
            },
            { 
              name: 'Eucalyptus Oil', 
              badge: '🔵 External Only', 
              badgeColor: '#2980b9',
              desc: 'Opens airways and helps with congestion and breathing. One of the most effective oils for respiratory support.',
              warning: 'Mix with a carrier oil — a plain gentle oil like coconut or jojoba oil — before applying to chest or back. Never swallow. Never apply directly to skin without mixing first.',
              safeUse: 'Safe to diffuse for adults and children over 10. Do not diffuse around children under 10, infants, or cats — it can cause serious breathing problems for them.'
            },
            { 
              name: 'Peppermint Oil', 
              badge: '🔵 External Only', 
              badgeColor: '#2980b9',
              desc: 'Helps open airways and reduce congestion. Apply diluted to chest, back, and bottoms of feet.',
              warning: 'Mix with a carrier oil — a plain gentle oil like coconut or jojoba oil — before applying to skin. Never swallow topical grade oil. Never apply directly to skin without mixing first.',
              safeUse: 'Safe to diffuse for adults. Do not diffuse around children under 6, infants, or cats — it can cause breathing problems for them.'
            },
            { 
              name: 'Ginger and Honey Tea', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and antimicrobial. Soothes sore throat, reduces congestion, and supports immune function. Safe and effective for all ages over 1 year.',
              warning: 'Never give honey to infants under 1 year — it can cause infant botulism which is life threatening.',
              safeUse: 'Add fresh ginger slices and raw local honey to hot water. Raw honey has more antimicrobial properties than processed honey.'
            },
            { 
              name: 'Vitamin C', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Supports immune function and may reduce duration of cold symptoms. Widely available and safe for most ages.',
              warning: 'High doses over 2000mg per day in adults can cause digestive upset. Follow age appropriate dosing on the label.',
              safeUse: 'Look for brands without artificial colors or sweeteners. Whole food vitamin C from acerola cherry is the cleanest form.'
            },
            { 
              name: 'Zinc', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Clinical evidence supports zinc lozenges for reducing cold duration when taken at first sign of symptoms.',
              warning: 'Do not exceed recommended dose. Long term high dose zinc can interfere with copper absorption. Not recommended for children under 1 without doctor guidance.',
              safeUse: 'Look for zinc acetate or zinc gluconate lozenges without artificial sweeteners or colors.'
            },
            { 
              name: 'Bone Broth', 
              badge: '🟢 Internal Only', 
              badgeColor: '#27ae60',
              desc: 'Hydrating, anti-inflammatory, and nutrient dense. Genuinely one of the best things you can consume when sick. The old chicken soup remedy has real science behind it.',
              warning: '',
              safeUse: 'Make your own or look for brands with minimal ingredients. Avoid brands with MSG, artificial flavors, or high sodium.'
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
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#e67e22', 
                  marginTop: '0.5rem',
                  borderLeft: '3px solid #e67e22',
                  paddingLeft: '0.5rem',
                  lineHeight: '1.5'
                }}>
                  {item.warning}
                </div>
              )}
              {item.safeUse && (
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#27ae60', 
                  marginTop: '0.35rem',
                  borderLeft: '3px solid #27ae60',
                  paddingLeft: '0.5rem',
                  lineHeight: '1.5'
                }}>
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
            { name: 'Mucinex Plain', desc: 'Guaifenesin only. No added decongestants, antihistamines, or dyes. Helps thin and loosen mucus. Look for the plain version not Mucinex D or Mucinex DM.', rating: '🟢 Cleaner choice' },
            { name: 'Zicam Cold Remedy', desc: 'Zinc based. Fewer artificial ingredients than most cold medicines. Use at first sign of symptoms for best results.', rating: '🟡 Acceptable' },
            { name: 'Childrens Dimetapp Dye Free', desc: 'If you need a childrens cold medicine look specifically for the dye free version. Avoid versions with Red 40 or other artificial dyes.', rating: '🟡 Acceptable' },
            { name: 'Vicks VapoRub', desc: 'Camphor, eucalyptus, and menthol. Effective for congestion relief. Apply to chest and back only. Never ingest.', rating: '🟡 Acceptable' },
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
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            lineHeight: '2',
            fontSize: '0.9rem',
            color: '#5a7a6e'
          }}>
            <li>✅ <strong>Look for:</strong> Single ingredient products — plain acetaminophen for fever and pain, plain guaifenesin for congestion</li>
            <li>✅ <strong>Look for:</strong> Electrolyte drinks like Pedialyte or plain Gatorade to stay hydrated</li>
            <li>🔴 <strong>Avoid:</strong> Multi symptom combination products unless you have every symptom listed — you are taking extra drugs you do not need</li>
            <li>🔴 <strong>Avoid:</strong> Products containing Red 40, Yellow 5, Yellow 6, High Fructose Corn Syrup, or Saccharin</li>
            <li>🔴 <strong>Avoid:</strong> NyQuil or DayQuil as a first choice — they contain multiple active ingredients and alcohol in some formulas</li>
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
          <strong>Affiliate Disclosure:</strong> Some links on this page may be affiliate links. If you purchase through these links KnowYourRemedy.com may earn a small commission at no additional cost to you. This never influences our recommendations.
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
          <strong>Medical Disclaimer:</strong> The statements on this page have not been evaluated by the Food and Drug Administration. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult a qualified healthcare professional before starting any new treatment, supplement, or health regimen. KnowYourRemedy.com is not responsible for any adverse effects or consequences resulting from the use of any suggestions described on this website.
        </div>

      </section>
    </main>
  )
}