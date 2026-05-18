import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function InsectBites() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care immediately if a bite is accompanied by difficulty breathing, throat swelling, rapid heartbeat, dizziness, or widespread hives — these are signs of anaphylaxis. Seek medical care for tick bites, spider bites, or any bite that develops a bullseye rash, significant swelling, or signs of infection." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Insect Bites and Stings
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Call 911 immediately for:</strong> Difficulty breathing, throat or tongue swelling, rapid heartbeat, dizziness, or widespread hives after a bite or sting. Use epinephrine auto injector if available. For tick bites — remove tick promptly and watch for bullseye rash or flu like symptoms over the following weeks.
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
              desc: 'Reduces swelling and numbs itching immediately. One of the most effective and accessible first responses to any bite or sting.',
              warning: 'Never apply ice directly to skin. Always wrap in a cloth.',
              safeUse: 'Apply a cold damp cloth or wrapped ice pack to the bite for 10 minutes on and 10 minutes off. Safe for all ages.'
            },
            {
              name: 'Baking Soda Paste',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Neutralizes the acid from bee stings and reduces itching and inflammation. One of the most effective and accessible home remedies.',
              warning: '',
              safeUse: 'Mix baking soda with just enough water to form a thick paste. Apply to the bite and leave for 10 minutes then rinse. Repeat as needed. Safe for all ages.'
            },
            {
              name: 'Tea Tree Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and anti-inflammatory. Reduces itching and prevents secondary infection from scratching.',
              warning: 'Must be diluted before skin application. Mix at least 1 drop per teaspoon of carrier oil. Never swallow. Not for children under 6.',
              safeUse: 'Apply diluted to the bite area with a cotton swab. Particularly effective for mosquito bites and minor bee stings.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Anti-inflammatory and analgesic. Reduces itching, swelling, and pain from insect bites. One of the safest oils for this use.',
              warning: 'Mix with a carrier oil before applying to skin.',
              safeUse: 'Apply diluted directly to the bite. One of the safest options for use on children. Reapply as needed for itching.'
            },
            {
              name: 'Raw Honey',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and anti-inflammatory. Reduces itching and prevents infection. Particularly effective for bee stings.',
              warning: 'Never give honey internally to infants under 1 year — topical use on skin is fine for all ages.',
              safeUse: 'Apply a small amount directly to the bite and cover with a bandage. Leave for 30 minutes then rinse.'
            },
            {
              name: 'Aloe Vera',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Cooling and anti-inflammatory. Reduces itching and swelling from mosquito bites and other insect stings.',
              warning: 'Use pure aloe vera gel without alcohol or artificial additives.',
              safeUse: 'Apply pure aloe vera gel generously to the bite. Refrigerate for additional cooling relief. Safe for all ages.'
            },
            {
              name: 'Witch Hazel',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural astringent with anti-inflammatory properties. Reduces itching and swelling effectively.',
              warning: 'Use alcohol free witch hazel to avoid skin irritation.',
              safeUse: 'Apply with a cotton ball directly to the bite. Thayers makes a widely trusted alcohol free witch hazel. Safe for all ages.'
            },
            {
              name: 'Plantain Leaf',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'The common backyard weed — not the banana. Plantain leaf has natural anti-inflammatory and drawing properties. Used for centuries for insect bites.',
              warning: '',
              safeUse: 'Crush or chew a fresh plantain leaf and apply directly to the bite. This is the original field remedy and genuinely effective for mosquito bites and bee stings.'
            },
          ].map((item) => (
            <div key={item.name} style={{ backgroundColor: '#fff', border: '1px solid #e8e0d0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'inline-block', fontSize: '0.8rem', color: '#fff', backgroundColor: item.badgeColor, padding: '2px 10px', borderRadius: '50px', fontWeight: '600', fontFamily: 'var(--font-inter), sans-serif' }}>
                  {item.badge}
                </div>
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
            { name: 'After Bite', desc: 'Ammonia based itch relief. Fast acting and effective for mosquito bites and bee stings. Minimal ingredients.', rating: '🟡 Acceptable' },
            { name: 'Benadryl Extra Strength Itch Relief Gel', desc: 'Diphenhydramine topical gel. Effective for itching but causes drowsiness if absorbed through skin in large amounts. Use sparingly.', rating: '🟡 Acceptable' },
            { name: 'Cortizone 10 Cream', desc: 'Hydrocortisone 1 percent. Reduces inflammation and itching effectively. Use only for a few days at a time — prolonged use thins skin.', rating: '🟡 Acceptable — short term only' },
            { name: 'Zyrtec or Claritin', desc: 'Oral antihistamines for widespread reaction or multiple bites. Non drowsy options for daytime use.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Try first:</strong> Baking soda paste — in every kitchen and genuinely effective</li>
            <li>✅ <strong>Try:</strong> Cold compress — immediately reduces swelling and itching</li>
            <li>✅ <strong>Look for:</strong> Plain hydrocortisone cream for significant itching</li>
            <li>🔴 <strong>Avoid:</strong> Scratching — breaks skin and causes infection</li>
            <li>🔴 <strong>Watch for:</strong> Signs of allergic reaction — seek emergency care immediately if breathing changes</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}