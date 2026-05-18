import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Heartburn() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care immediately if you experience chest pain, pain that spreads to your arm or jaw, sweating, or shortness of breath — these can be signs of a heart attack, not heartburn. Always consult your doctor for frequent or severe heartburn as it may indicate GERD or other conditions requiring treatment." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Heartburn
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
          🚨 <strong>Important:</strong> Chest pain is not always heartburn. If you have chest pain with sweating, pain spreading to your arm, jaw, or back, or shortness of breath — call 911 immediately. Do not assume it is heartburn.
        </div>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Apple Cider Vinegar',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Counterintuitive but effective for many people. Low stomach acid is often the real cause of heartburn — ACV helps restore proper acid levels.',
              warning: 'Always dilute — never drink straight. Can damage tooth enamel if not diluted. Not recommended for people with ulcers or esophageal damage.',
              safeUse: 'Mix one tablespoon of raw unfiltered apple cider vinegar into 8 ounces of water. Drink before meals. Bragg is the most widely trusted brand.'
            },
            {
              name: 'Aloe Vera Juice',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Soothes and heals the esophagus and stomach lining. Anti-inflammatory and widely used for GERD and acid reflux.',
              warning: 'Only use food grade aloe vera juice specifically labeled for internal use. Do not drink aloe vera gel products meant for skin.',
              safeUse: 'Drink two to four ounces before meals. Look for brands without added sugar or artificial ingredients. Lily of the Desert is a widely trusted brand.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and digestive support. Helps reduce acid reflux symptoms and soothes the stomach lining.',
              warning: 'High doses of ginger may thin the blood. Consult your doctor if on blood thinners.',
              safeUse: 'Drink before or after meals. Avoid adding lemon which can trigger reflux in some people.'
            },
            {
              name: 'Slippery Elm',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Creates a protective coating on the stomach and esophagus lining. One of the best herbs specifically for acid reflux and GERD.',
              warning: 'May slow absorption of medications. Take at least one hour apart from any prescription drugs.',
              safeUse: 'Available as lozenges, powder mixed in water, or capsules. Throat Coat tea by Traditional Medicinals contains slippery elm.'
            },
            {
              name: 'Baking Soda',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Sodium bicarbonate neutralizes stomach acid quickly. Fast acting and available in every kitchen.',
              warning: 'Not for regular use — high sodium content. Not recommended for people on low sodium diets, those with kidney disease, or children under 6. Do not use if you have recently eaten a large meal as it can cause stomach rupture in rare cases.',
              safeUse: 'Mix half a teaspoon in 4 ounces of water. Drink slowly. Use only occasionally for acute relief.'
            },
            {
              name: 'Elevate Head While Sleeping',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Gravity helps keep stomach acid down. One of the most effective lifestyle changes for chronic heartburn and GERD.',
              warning: '',
              safeUse: 'Use a wedge pillow or raise the head of your bed by 6 to 8 inches. Do not just stack regular pillows — this bends your body in a way that can make reflux worse.'
            },
            {
              name: 'DGL Licorice',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Deglycyrrhizinated licorice. Protects and heals the stomach lining without the blood pressure side effects of regular licorice.',
              warning: 'Use only DGL form — not regular licorice root which can raise blood pressure.',
              safeUse: 'Chew tablets before meals. Widely available at health food stores. Enzymatic Therapy makes a well regarded DGL product.'
            },
            {
              name: 'Digestive Enzymes',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Improve food breakdown and reduce the pressure that pushes acid back into the esophagus. Particularly helpful after large or fatty meals.',
              warning: '',
              safeUse: 'Take with meals. Look for broad spectrum formulas with betaine HCl if low stomach acid is suspected.'
            },
          ].map((item) => (
            <div key={item.name} style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'inline-block', fontSize: '0.8rem', color: '#fff', backgroundColor: item.badgeColor, padding: '2px 10px', borderRadius: '20px', fontWeight: '600' }}>
                  {item.badge}
                </div>
                {item.badgeColor === '#27ae60' && (
                  <span style={{ fontSize: '0.75rem', color: '#c0392b', fontStyle: 'italic' }}>(specific type — see notes below)</span>
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

        <div style={{ backgroundColor: '#fff8e1', border: '1px solid #f0c040', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: '600', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Tums Ultra Strength', desc: 'Calcium carbonate only. Fast acting acid neutralizer. Look for plain white variety without artificial colors.', rating: '🟡 Acceptable' },
            { name: 'Pepcid AC Original', desc: 'Famotidine only. Reduces acid production for up to 12 hours. Fewer additives than most combination heartburn products.', rating: '🟡 Acceptable' },
            { name: 'Gaviscon Extra Strength', desc: 'Forms a protective barrier over stomach contents to prevent reflux. Different mechanism than antacids — particularly effective for nighttime reflux.', rating: '🟡 Acceptable' },
            { name: 'Prilosec OTC', desc: 'Omeprazole. For frequent heartburn occurring two or more days per week. Take before eating in the morning. Not for immediate relief.', rating: '🟡 Acceptable — short term use only' },
          ].map((item) => (
            <div key={item.name} style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              <div style={{ fontSize: '0.8rem', color: '#2d4a3e', fontWeight: '600' }}>{item.rating}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          ✅ If You Have No Other Choice
        </h2>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.9rem', color: '#5a7a6e' }}>
            <li>✅ <strong>Look for:</strong> Plain Tums or Rolaids with minimal ingredients</li>
            <li>✅ <strong>Look for:</strong> Plain baking soda — half a teaspoon in water works in a pinch</li>
            <li>🔴 <strong>Avoid:</strong> Combination heartburn and gas products with multiple active ingredients</li>
            <li>🔴 <strong>Avoid:</strong> Long term use of any OTC acid reducer without consulting a doctor</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}