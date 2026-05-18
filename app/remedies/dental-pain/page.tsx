import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function DentalPain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional dental or medical advice. Dental pain is almost always a sign of an underlying problem that requires professional treatment. These remedies provide temporary relief only — they do not treat the underlying cause. Always see a dentist as soon as possible for any tooth pain." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Dental Pain
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Temporary relief options while you arrange dental care. These do not replace a dentist visit.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>See a dentist if:</strong> Pain is severe or throbbing, you have swelling in your face or jaw, you have a fever, or you have difficulty swallowing or breathing. Dental infections can become life threatening if left untreated. Do not delay seeking care.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Clove Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Eugenol in clove oil is a natural anesthetic and antiseptic. One of the most effective natural remedies for dental pain. Used by dentists for centuries.',
              warning: 'Use only food grade clove oil with a Supplement Facts panel for any oral use. Apply in tiny amounts only — it is very strong and can irritate gum tissue if overused. Not for children under 2.',
              safeUse: 'Apply one drop to a cotton ball and hold against the affected tooth and gum for 5 to 10 minutes. Do not swallow. Repeat as needed every few hours.'
            },
            {
              name: 'Salt Water Rinse',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Kills bacteria, reduces inflammation, and draws out infection. One of the most effective and accessible dental pain remedies available.',
              warning: '',
              safeUse: 'Mix half a teaspoon of salt in 8 ounces of warm water. Swish for 30 seconds and spit. Repeat every few hours. Never swallow.'
            },
            {
              name: 'Garlic',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Allicin in garlic has powerful antimicrobial properties. Crushing a garlic clove and applying it to the affected area can reduce pain and fight infection.',
              warning: 'Raw garlic can irritate gum tissue. Do not leave on for more than a few minutes.',
              safeUse: 'Crush one garlic clove into a paste and apply directly to the affected tooth and gum. Leave for 2 to 3 minutes then rinse. Repeat twice daily.'
            },
            {
              name: 'Peppermint Tea Bag',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'A slightly warm or cooled peppermint tea bag held against the affected area numbs pain and reduces inflammation.',
              warning: '',
              safeUse: 'Steep a peppermint tea bag then let it cool slightly. Hold against the painful area for 20 minutes. Can also be chilled in the freezer for additional numbing effect.'
            },
            {
              name: 'Thyme Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and analgesic properties. Effective against the bacteria that cause dental infections when applied topically to the gum.',
              warning: 'Must be heavily diluted before any oral use. Mix one drop with a full teaspoon of coconut oil before applying to gums. Never swallow.',
              safeUse: 'Apply diluted to affected gum area with a cotton swab. Rinse after a few minutes.'
            },
            {
              name: 'Cold Compress',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Reduces swelling and numbs the area. Particularly effective for dental pain accompanied by facial swelling.',
              warning: 'Never apply ice directly to skin — always wrap in a cloth.',
              safeUse: 'Apply a cold compress to the outside of the cheek for 20 minutes on and 20 minutes off. Safe for all ages.'
            },
            {
              name: 'Hydrogen Peroxide Rinse',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Kills bacteria and reduces plaque. Helps manage infection while awaiting dental care.',
              warning: 'Use only 3 percent hydrogen peroxide diluted 50/50 with water. Never swallow. Not for children under 12 without supervision.',
              safeUse: 'Mix equal parts 3 percent hydrogen peroxide and water. Swish for 30 seconds and spit. Use once or twice daily maximum.'
            },
            {
              name: 'Turmeric Paste',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Anti-inflammatory and antimicrobial. Applied directly to the gum reduces pain and swelling.',
              warning: 'Will stain teeth and gums yellow temporarily.',
              safeUse: 'Mix turmeric powder with a small amount of coconut oil to form a paste. Apply to the affected area and leave for 5 minutes then rinse thoroughly.'
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
            { name: 'Orajel Naturals', desc: 'Clove oil based. One of the cleaner mainstream dental pain options. Fewer synthetic numbing agents than standard Orajel.', rating: '🟢 Cleaner choice' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen. Most effective OTC option for dental pain due to its anti-inflammatory properties. Liquid gel form has fewer additives.', rating: '🟡 Acceptable' },
            { name: 'Tylenol Extra Strength Dye Free', desc: 'Acetaminophen for pain relief when ibuprofen is not appropriate. Look for the dye free version specifically.', rating: '🟢 Cleaner choice' },
            { name: 'Red Cross Toothache Kit', desc: 'Eugenol based toothache drops. Dentist recommended formula for temporary relief. Widely available at pharmacies.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain ibuprofen — most effective OTC option for dental pain</li>
            <li>✅ <strong>Try first:</strong> Salt water rinse — free, immediate, and genuinely effective</li>
            <li>✅ <strong>Try:</strong> A whole clove held against the tooth — contains natural eugenol that numbs pain</li>
            <li>🔴 <strong>Avoid:</strong> Aspirin placed directly on the tooth or gum — it causes chemical burns to gum tissue</li>
            <li>🔴 <strong>Remember:</strong> All of these are temporary. See a dentist as soon as possible.</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}