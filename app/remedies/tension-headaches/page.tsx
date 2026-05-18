import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function TensionHeadaches() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care if your headache is sudden and severe, the worst of your life, or accompanied by fever, stiff neck, confusion, vision changes, or weakness. These can be signs of a serious medical emergency." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Tension Headaches
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>
        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Clinically proven to be as effective as acetaminophen for tension headache relief when applied to the forehead and temples. One of the most evidence backed natural headache remedies.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Mix 2 drops with a teaspoon of coconut or jojoba oil and apply to temples, forehead, and back of neck. Safe to diffuse for adults.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Reduces stress and muscle tension that drives tension headaches. Inhaling lavender oil has clinical evidence for headache relief.',
              warning: 'Mix with a carrier oil before applying to skin.',
              safeUse: 'Inhale directly from the bottle or diffuse. Apply diluted to temples and wrists. One of the safest oils for use around children and most pets.'
            },
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is one of the most common triggers for tension headaches. Supplementing consistently reduces frequency and severity.',
              warning: 'High doses can cause loose stools. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 200 to 400mg daily. Most effective when taken consistently rather than just when headache occurs.'
            },
            {
              name: 'Neck and Shoulder Massage',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Tension headaches originate from muscle tension in the neck and shoulders. Massage directly addresses the root cause.',
              warning: '',
              safeUse: 'Apply firm pressure to the muscles at the base of the skull and across the shoulders. A tennis ball against the wall works well for self massage of the upper back and neck.'
            },
            {
              name: 'Hydration',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Dehydration is one of the most common tension headache triggers. Often the simplest and fastest fix available.',
              warning: '',
              safeUse: 'Drink a full glass of water at onset of headache before reaching for anything else. Many tension headaches resolve within 30 minutes of proper hydration.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory properties help reduce headache intensity. Particularly effective for headaches accompanied by nausea.',
              warning: '',
              safeUse: 'Drink one to two cups of strong ginger tea. Add raw honey and lemon if desired.'
            },
            {
              name: 'Heat Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Applying heat to the neck and shoulders relaxes the muscle tension that causes tension headaches.',
              warning: 'Never apply heat directly to skin without a barrier.',
              safeUse: 'Apply a heating pad to the back of the neck and shoulders for 20 minutes. A warm shower directing water to the neck and shoulders is also highly effective.'
            },
            {
              name: 'Screen and Posture Break',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Most tension headaches in modern life are driven by screen time and poor posture. A break from screens combined with posture correction addresses the root cause.',
              warning: '',
              safeUse: 'Every 30 minutes look away from your screen for 20 seconds at something 20 feet away. Check that your monitor is at eye level and your chin is not jutting forward. Chin tucks — gently pulling the chin straight back — immediately relieve neck tension.'
            },
          ].map((item) => (
            <div key={item.name} style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'inline-block', fontSize: '0.8rem', color: '#fff', backgroundColor: item.badgeColor, padding: '2px 10px', borderRadius: '50px', fontWeight: '600', fontFamily: 'var(--font-inter), sans-serif' }}>
                  {item.badge}
                </div>
                {item.badgeColor === '#27ae60' && (
                  <span style={{ fontSize: '0.75rem', color: '#c0392b', fontStyle: 'italic', fontFamily: 'var(--font-inter), sans-serif' }}>(specific type — see notes below)</span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              {item.warning && (
                <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#e67e22', marginTop: '0.5rem', borderLeft: '3px solid #e67e22', paddingLeft: '0.5rem', lineHeight: '1.5' }}>
                  {item.warning}
                </div>
              )}
              {item.safeUse && (
                <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#27ae60', marginTop: '0.35rem', borderLeft: '3px solid #27ae60', paddingLeft: '0.5rem', lineHeight: '1.5' }}>
                  {item.safeUse}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Excedrin Tension Headache', desc: 'Acetaminophen and caffeine only. No aspirin. Caffeine enhances pain relief and constricts blood vessels. Effective for tension headaches.', rating: '🟡 Acceptable' },
            { name: 'Tylenol Extra Strength Dye Free', desc: 'Single active ingredient acetaminophen. Look specifically for the dye free version. Clean and effective for mild to moderate tension headaches.', rating: '🟢 Cleaner choice' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen in liquid gel form. Anti-inflammatory properties address muscle inflammation contributing to tension headaches.', rating: '🟡 Acceptable' },
          ].map((item) => (
            <div key={item.name} style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              <div style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8rem', color: '#2d4a3e', fontWeight: '600' }}>{item.rating}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          ✅ If You Have No Other Choice
        </h2>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '3rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.9rem', color: '#5a7a6e', fontFamily: 'var(--font-inter), sans-serif' }}>
            <li>✅ <strong>Try first:</strong> Drink a full glass of water and step away from your screen</li>
            <li>✅ <strong>Try:</strong> Neck and shoulder self massage — addresses the root cause</li>
            <li>✅ <strong>Look for:</strong> Plain acetaminophen or ibuprofen with minimal additives</li>
            <li>🔴 <strong>Avoid:</strong> Taking pain relievers more than 10 days per month — causes medication overuse headache</li>
            <li>🔴 <strong>Avoid:</strong> Combination headache products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}