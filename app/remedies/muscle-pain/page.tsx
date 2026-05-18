import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function MusclePain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if muscle pain is severe, follows an injury, is accompanied by swelling or bruising, or does not improve within a few days. Always consult your doctor before starting any new supplement especially if you are on blood thinners or other medications." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Muscle Pain
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is one of the most common causes of muscle cramps and soreness. Glycinate form is the most bioavailable and gentlest on the stomach.',
              warning: 'High doses can cause loose stools. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 200 to 400mg daily. Particularly effective for nighttime muscle cramps and post exercise soreness.'
            },
            {
              name: 'Turmeric and Black Pepper',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Curcumin in turmeric is one of the most well studied natural anti-inflammatories. Black pepper increases absorption by up to 2000 percent.',
              warning: 'May interact with blood thinners. High doses not recommended during pregnancy. Consult your doctor if on medications.',
              safeUse: 'Always take with black pepper or look for supplements that include piperine. Take with food to reduce stomach upset. Effects build over consistent use.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural analgesic and cooling agent. Applied topically provides significant relief for sore and tired muscles.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Mix 2 to 3 drops with a teaspoon of coconut or jojoba oil and massage into sore muscles. Safe to diffuse for adults.'
            },
            {
              name: 'Eucalyptus Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and analgesic properties. Effective for muscle soreness and tension when applied topically.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow. Do not apply near face of children under 10.',
              safeUse: 'Combine with peppermint oil in a carrier oil for enhanced muscle relief. Massage into affected area.'
            },
            {
              name: 'Arnica Montana',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'One of the most clinically studied natural topical remedies for muscle pain, bruising, and soreness. Available as gel, cream, or homeopathic tablets.',
              warning: 'For topical use only — do not apply to broken skin or open wounds. The topical form is very different from homeopathic oral arnica.',
              safeUse: 'Apply arnica gel directly to sore muscles up to three times daily. Boiron and Traumeel make widely trusted arnica products available at most health food stores.'
            },
            {
              name: 'Epsom Salt Bath',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Magnesium sulfate absorbed through the skin. Widely used for muscle soreness and tension. Particularly effective after intense exercise.',
              warning: '',
              safeUse: 'Add two cups to a warm bath and soak for 20 minutes. Safe for all ages. Add a few drops of lavender oil to the bath for enhanced relaxation.'
            },
            {
              name: 'Ginger',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinical studies show ginger reduces exercise induced muscle pain by up to 25 percent. Anti-inflammatory and widely tolerated.',
              warning: 'High doses may thin the blood. Consult your doctor if on blood thinners.',
              safeUse: 'Take as fresh ginger tea, capsules, or ginger chews daily during periods of high physical activity.'
            },
            {
              name: 'Heat and Cold Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Cold reduces inflammation in the first 48 hours after injury or intense exercise. Heat relaxes muscles and increases blood flow for chronic soreness.',
              warning: '',
              safeUse: 'Use cold packs for 20 minutes at a time in the first two days after acute muscle strain. Switch to heat after 48 hours for chronic or recurring soreness.'
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
            { name: 'Biofreeze Gel', desc: 'Menthol based topical pain reliever. Fewer ingredients than most competing products. Effective for muscle soreness and tension.', rating: '🟡 Acceptable' },
            { name: 'Tiger Balm White', desc: 'Camphor and menthol blend. Fewer synthetic additives than many mainstream muscle rubs. Long trusted formula.', rating: '🟢 Cleaner choice' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablet versions. Effective anti-inflammatory for muscle pain.', rating: '🟡 Acceptable' },
            { name: 'Aleve', desc: 'Naproxen sodium. Longer lasting than ibuprofen — one dose lasts up to 12 hours. Better for inflammation driven muscle pain.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain ibuprofen or naproxen with minimal fillers</li>
            <li>✅ <strong>Look for:</strong> Any menthol based topical rub with the fewest ingredients on the label</li>
            <li>🔴 <strong>Avoid:</strong> Combination muscle and pain products with multiple active ingredients you do not need</li>
            <li>🔴 <strong>Avoid:</strong> Products containing artificial dyes or fragrances in topical applications</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}