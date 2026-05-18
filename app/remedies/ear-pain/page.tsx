import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function EarPain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Ear pain in children under 2 should always be evaluated by a doctor. Seek medical care if ear pain is severe, accompanied by high fever, discharge from the ear, sudden hearing loss, or dizziness. Never put anything inside the ear canal without doctor approval." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Ear Pain
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
          🚨 <strong>Important safety warning:</strong> Never put oils, liquids, or any object inside the ear canal unless directed by a doctor. This includes essential oils. Application is always around the outside of the ear only — never inside. If you suspect a ruptured eardrum do not put anything near the ear and seek medical care immediately.
        </div>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Warm Compress',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'A warm compress held against the ear reduces pain and promotes drainage of fluid. One of the safest and most effective first responses to ear pain.',
              warning: 'Make sure the compress is warm not hot. Never apply heat directly to an infant\'s ear without doctor guidance.',
              safeUse: 'Soak a clean cloth in warm water, wring out, and hold gently against the outer ear for 10 to 15 minutes. Repeat as needed.'
            },
            {
              name: 'Garlic Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Garlic has natural antimicrobial and anti-inflammatory properties. Warm garlic oil applied around the outside of the ear has been used traditionally for ear pain.',
              warning: 'Apply only around the outside of the ear — never inside the ear canal. Never use if eardrum may be ruptured. Not a substitute for medical treatment of ear infections.',
              safeUse: 'Warm a small amount of garlic infused olive oil to body temperature — test on your wrist first. Apply a few drops to a cotton ball and hold gently against the outer ear opening. Never drop directly into the ear canal.'
            },
            {
              name: 'Basil Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural anti-inflammatory and antimicrobial properties. Used in the natural health community for ear pain relief applied around the outer ear.',
              warning: 'Mix with a carrier oil before any skin contact. Apply only around the outside of the ear — never inside the ear canal.',
              safeUse: 'Mix 2 drops with a teaspoon of coconut oil and apply gently around the outer ear. Never inside the canal.'
            },
            {
              name: 'Tea Tree Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial properties effective against bacteria and fungi. Applied very diluted around the outer ear for external ear infections.',
              warning: 'Must be heavily diluted — at least 1 drop per tablespoon of carrier oil. Never use inside the ear canal. Not safe for children under 6. Never ingest.',
              safeUse: 'Apply only to the outer ear and surrounding skin. Not for use inside the ear canal under any circumstances.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory properties help reduce the systemic inflammation that contributes to ear pain, especially when associated with cold or flu.',
              warning: '',
              safeUse: 'Drink warm for best results. Safe for all ages over 1 year. Add raw honey for additional antimicrobial benefit.'
            },
            {
              name: 'Elderberry Syrup',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Immune support to help the body fight the underlying infection causing ear pain. Most effective taken at first sign of illness.',
              warning: 'Never give honey to infants under 1 year.',
              safeUse: 'Safe for children over 1 year. Take at first sign of illness for best results.'
            },
            {
              name: 'Xylitol Nasal Spray',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Xylitol helps prevent bacteria from adhering to the nasal and ear tissues. Particularly useful for ear pain connected to sinus congestion and eustachian tube blockage.',
              warning: '',
              safeUse: 'Use as directed on the label. Available at most health food stores. Xlear is a widely trusted brand that combines xylitol with saline.'
            },
            {
              name: 'Chewing and Yawning',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'For ear pain caused by pressure changes — flying, altitude, or eustachian tube blockage — chewing gum or exaggerated yawning opens the eustachian tube and equalizes pressure.',
              warning: '',
              safeUse: 'Swallowing, yawning, and the Valsalva maneuver — pinching your nose and gently blowing — are all effective for pressure related ear discomfort.'
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

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Childrens Tylenol Dye Free', desc: 'Acetaminophen for pain and fever associated with ear infections. Look specifically for the dye free version.', rating: '🟢 Cleaner choice' },
            { name: 'Childrens Motrin Dye Free', desc: 'Ibuprofen for pain and inflammation. Often more effective than acetaminophen for ear pain specifically. Look for the dye free version.', rating: '🟢 Cleaner choice' },
            { name: 'Debrox Earwax Removal', desc: 'Carbamide peroxide drops for earwax buildup related ear discomfort. Not for use if eardrum may be perforated.', rating: '🟡 Acceptable' },
            { name: 'Similasan Earache Relief', desc: 'Homeopathic ear drops. No antibiotic ingredients. Safe for children. Limited clinical evidence but widely used and generally well tolerated.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain acetaminophen or ibuprofen for pain relief while you seek medical care</li>
            <li>✅ <strong>Try first:</strong> A warm compress against the outer ear — free and immediately available</li>
            <li>🔴 <strong>Avoid:</strong> Putting any liquid or oil inside the ear canal without doctor approval</li>
            <li>🔴 <strong>Avoid:</strong> Cotton swabs inside the ear — they push wax deeper and can damage the eardrum</li>
            <li>🔴 <strong>Children under 2 with ear pain should always see a doctor</strong> — do not attempt to treat at home alone</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}