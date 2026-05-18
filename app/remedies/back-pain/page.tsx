import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function BackPain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care immediately if back pain follows a serious injury, is accompanied by numbness or tingling in the legs, loss of bladder or bowel control, or severe pain that does not improve with rest. Always consult your doctor for chronic or recurring back pain." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Back Pain
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
          🚨 <strong>Seek emergency care if:</strong> Back pain is accompanied by numbness or tingling down one or both legs, loss of bladder or bowel control, or follows a serious fall or accident. These can indicate spinal cord involvement requiring immediate medical attention.
        </div>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Turmeric and Black Pepper',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Curcumin is one of the most studied natural anti-inflammatories. Particularly effective for chronic back pain driven by inflammation.',
              warning: 'May interact with blood thinners. Not recommended in high doses during pregnancy.',
              safeUse: 'Always take with black pepper or piperine for absorption. Take with food. Effects build over consistent use.'
            },
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Muscle tension is a major driver of back pain. Magnesium relaxes muscles and reduces spasm. Deficiency is extremely common.',
              warning: 'High doses can cause loose stools. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 200 to 400mg daily. Particularly effective taken at night for overnight muscle relaxation.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural analgesic and cooling effect. Applied to the lower back provides significant temporary relief for muscle tension and spasm.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Mix 3 to 4 drops with a tablespoon of coconut or jojoba oil and massage into lower back. Safe to diffuse for adults.'
            },
            {
              name: 'Frankincense Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory properties make it effective for chronic back pain. Combine with peppermint for enhanced relief.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil.',
              safeUse: 'Mix with peppermint and a carrier oil and massage into affected area. Safe to diffuse for adults.'
            },
            {
              name: 'Arnica Montana',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Clinically studied topical remedy for muscle pain and inflammation. One of the most effective natural topical options for back pain.',
              warning: 'For topical use only. Do not apply to broken skin or open wounds.',
              safeUse: 'Apply arnica gel directly to the painful area up to three times daily. Boiron and Traumeel make widely trusted products.'
            },
            {
              name: 'Heat Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Heat increases blood flow and relaxes tight muscles. One of the most effective treatments for chronic low back pain and muscle spasm.',
              warning: 'Do not use heat on acute injuries in the first 48 hours — use cold instead. Never apply heat directly to skin without a barrier.',
              safeUse: 'Use a heating pad on low or medium for 20 minutes at a time. A warm bath or shower is also effective. Safe for all ages with supervision.'
            },
            {
              name: 'Devil\'s Claw',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'An herb with significant clinical evidence for reducing lower back pain. Anti-inflammatory and analgesic properties comparable to some OTC pain relievers in studies.',
              warning: 'Not recommended during pregnancy. May interact with blood thinners and some heart medications. Consult your doctor if on medications.',
              safeUse: 'Take 50 to 100mg of harpagoside — the active compound — daily. Look for standardized extracts on the label.'
            },
            {
              name: 'Stretching and Movement',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Bed rest worsens most back pain. Gentle movement, walking, and targeted stretching are among the most effective evidence based treatments for non-acute back pain.',
              warning: '',
              safeUse: 'Child\'s pose, cat-cow stretch, and knee to chest pulls are among the most effective gentle stretches for lower back pain. Walking 20 to 30 minutes daily is one of the best long term treatments.'
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
            { name: 'Voltaren Arthritis Pain Gel', desc: 'Diclofenac sodium topical gel. Applied directly to the painful area with less systemic absorption than oral pain relievers. Effective for localized back pain.', rating: '🟢 Cleaner choice' },
            { name: 'Aleve Back and Muscle Pain', desc: 'Naproxen sodium. Longer lasting than ibuprofen. Better for inflammation driven back pain. One dose lasts up to 12 hours.', rating: '🟡 Acceptable' },
            { name: 'Biofreeze Gel', desc: 'Menthol based topical pain reliever. Effective for temporary relief of back muscle tension and soreness.', rating: '🟡 Acceptable' },
            { name: 'Salonpas Pain Relieving Patches', desc: 'Methyl salicylate and menthol patches. Applied directly to the painful area. Fewer systemic effects than oral medications.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Any menthol based topical rub or patch with the fewest ingredients</li>
            <li>✅ <strong>Try first:</strong> Gentle walking and stretching — movement is medicine for most back pain</li>
            <li>🔴 <strong>Avoid:</strong> Muscle relaxants as a first choice — they cause significant drowsiness and dependency risk</li>
            <li>🔴 <strong>Avoid:</strong> Long term daily use of NSAIDs without doctor supervision</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}