import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function ItchyEyes() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if eye symptoms are accompanied by vision changes, severe pain, significant discharge, or if a foreign object may be in the eye. Never put essential oils directly in or near the eyes under any circumstances." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Itchy Eyes
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Critical oil safety warning:</strong> Never put essential oils in or near the eyes. This includes diffused oil mist near the face. Essential oils near the eyes can cause serious chemical burns and permanent damage. All oil remedies on this page are for external use on surrounding areas only — never the eyes themselves.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Cold Compress',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Reduces inflammation and provides immediate relief for itchy, swollen eyes. One of the safest and most effective first responses.',
              warning: 'Never apply ice directly to the eye or eyelid. Always wrap in a clean cloth.',
              safeUse: 'Apply a clean cold damp cloth to closed eyes for 10 minutes. Repeat as needed. A chilled spoon or refrigerated eye mask also works well.'
            },
            {
              name: 'Saline Eye Rinse',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Flushes allergens and irritants from the eye surface. One of the most effective drug free treatments for allergy related eye itch.',
              warning: 'Use only sterile saline solution specifically made for eye use. Never use tap water in the eyes.',
              safeUse: 'Use sterile saline eye wash as directed. Safe for all ages. Bausch and Lomb Advanced Eye Relief is a widely trusted option.'
            },
            {
              name: 'Quercetin',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Natural antihistamine that reduces histamine release and systemic allergic response including eye symptoms.',
              warning: 'May interact with some antibiotics and blood thinners.',
              safeUse: 'Take with bromelain for better absorption. Most effective when taken consistently throughout allergy season rather than just when symptomatic.'
            },
            {
              name: 'Local Raw Honey',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Taken internally, local honey may help desensitize the immune system to local pollens over time, reducing overall allergy symptoms including eye itch.',
              warning: 'Never put honey in or near the eyes. Internal use only. Never give to infants under 1 year.',
              safeUse: 'Take one tablespoon of raw local honey daily. Start before allergy season for best results.'
            },
            {
              name: 'Omega 3 Fish Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Reduces systemic inflammation and has been shown to improve dry, irritated eye symptoms when taken consistently.',
              warning: 'May interact with blood thinners.',
              safeUse: 'Take 1 to 2 grams of EPA and DHA combined daily. Effects build over several weeks of consistent use.'
            },
            {
              name: 'Green Tea Compress',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Green tea contains antioxidants and anti-inflammatory compounds. A cooled green tea bag applied to closed eyes reduces itching and puffiness.',
              warning: 'Use only cooled tea bags — never hot. Never open the eyes while the tea bag is applied.',
              safeUse: 'Steep two green tea bags, let cool completely, then apply to closed eyes for 10 to 15 minutes. Safe for all ages.'
            },
            {
              name: 'HEPA Air Purifier',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Removes airborne allergens that trigger eye symptoms. Particularly effective for indoor allergy related eye itch.',
              warning: '',
              safeUse: 'Run continuously in bedroom and main living areas during allergy season. Winix and Coway make well rated affordable options.'
            },
            {
              name: 'Vitamin C',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Natural antihistamine properties reduce histamine levels in the blood. Helps reduce overall allergic response including eye symptoms.',
              warning: 'High doses over 2000mg per day can cause digestive upset.',
              safeUse: 'Take consistently throughout allergy season. Whole food vitamin C from acerola cherry is the cleanest form available.'
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
            { name: 'Zaditor Antihistamine Eye Drops', desc: 'Ketotifen fumarate. Over the counter antihistamine eye drops. One of the most effective OTC options for allergy eye itch. Works within minutes.', rating: '🟢 Cleaner choice' },
            { name: 'Alaway Eye Drops', desc: 'Ketotifen fumarate. Same active ingredient as Zaditor. Provides up to 12 hours of relief. Fewer preservatives than many competing eye drops.', rating: '🟢 Cleaner choice' },
            { name: 'Similasan Allergy Eye Relief', desc: 'Homeopathic eye drops. No antihistamine ingredients. Drug free option for mild allergy eye symptoms.', rating: '🟡 Acceptable' },
            { name: 'Visine Allergy Eye Relief', desc: 'Pheniramine and naphazoline. Effective but contains a decongestant that can cause rebound redness with extended use. Use only occasionally.', rating: '🟡 Acceptable — occasional use only' },
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
            <li>✅ <strong>Try first:</strong> Cold compress on closed eyes — free and immediately effective</li>
            <li>✅ <strong>Look for:</strong> Sterile saline eye wash — available at most pharmacies and drug free</li>
            <li>✅ <strong>Look for:</strong> Ketotifen eye drops — Zaditor or Alaway — most effective OTC option</li>
            <li>🔴 <strong>Never:</strong> Put essential oils in or near the eyes under any circumstances</li>
            <li>🔴 <strong>Avoid:</strong> Visine original for regular use — causes rebound redness with extended use</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}