import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function BurnsAndSunburn() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care for any burn larger than 3 inches, burns on the face, hands, feet, genitals, or major joints, burns that appear white or charred, or any burn in an infant or young child. Call 911 for severe burns." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Burns and Sunburn
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Seek emergency care for:</strong> Burns larger than 3 inches, burns on face, hands, feet, or genitals, burns that appear white, brown, or black, burns from chemicals or electricity, or any significant burn in a child. For severe burns call 911 and do not remove clothing stuck to the burn.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Cool Running Water',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'The single most important first step for any burn. Cool running water for 20 minutes stops the burning process, reduces pain, and limits tissue damage.',
              warning: 'Never use ice or ice water — it constricts blood vessels and worsens tissue damage. Never use butter, oil, or toothpaste on a fresh burn.',
              safeUse: 'Hold the burned area under cool not cold running water for at least 20 minutes immediately after the burn occurs. Do this before anything else.'
            },
            {
              name: 'Aloe Vera',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'The most clinically studied natural remedy for minor burns and sunburn. Anti-inflammatory, cooling, and promotes healing. Used in hospital burn units worldwide.',
              warning: 'Use pure aloe vera gel without added alcohol, fragrance, or artificial colors. Alcohol based products cause burning and slow healing.',
              safeUse: 'Apply pure aloe vera gel generously to the burned area. Fresh aloe from the plant is most potent. Refrigerate the gel for additional cooling relief. Apply several times daily. Safe for all ages.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Anti-inflammatory and analgesic. One of the few oils appropriate for burn care. Promotes healing and reduces scarring.',
              warning: 'Mix with a carrier oil or aloe vera gel before applying. Never apply undiluted to burned skin. Only for minor first degree burns — not for blistered or open burns.',
              safeUse: 'Mix 2 to 3 drops with a tablespoon of aloe vera gel and apply gently to the burned area. One of the safest oils for use on children.'
            },
            {
              name: 'Raw Honey',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Clinically studied for minor burn wound care. Antimicrobial, anti-inflammatory, and promotes healing. Manuka honey is used in medical wound dressings.',
              warning: 'Only for clean minor burns. Not for large, deep, or infected burns. Never give honey internally to infants under 1 year — topical use on skin is fine.',
              safeUse: 'Apply a thin layer of raw or manuka honey to the cooled burn and cover with a clean non-stick bandage. Change daily.'
            },
            {
              name: 'Coconut Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Moisturizing and antimicrobial. Helps keep healing burns moist and reduces itching during recovery. Most appropriate for sunburn care.',
              warning: 'Do not apply to fresh burns before cooling — oil traps heat. Only apply after the burn has been thoroughly cooled with water.',
              safeUse: 'Apply to cooled sunburned skin generously. Particularly soothing when combined with aloe vera gel.'
            },
            {
              name: 'Colloidal Oatmeal Bath',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Reduces inflammation and soothes widespread sunburn. Particularly effective for full body sunburn relief.',
              warning: '',
              safeUse: 'Add colloidal oatmeal or finely ground plain oatmeal to a cool bath and soak for 15 to 20 minutes. Pat dry gently — do not rub. Safe for all ages including infants.'
            },
            {
              name: 'Hydration',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Sunburn draws fluid to the skin surface causing dehydration throughout the body. Staying well hydrated speeds recovery and reduces systemic symptoms.',
              warning: '',
              safeUse: 'Drink extra water and electrolyte drinks for 48 hours after significant sunburn. Coconut water is an excellent natural electrolyte replacement.'
            },
            {
              name: 'Vitamin E Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antioxidant and skin healing properties. Applied during healing reduces scarring and promotes skin repair.',
              warning: 'Do not apply to fresh burns. Use only during the healing phase after the burn has closed. Some people are sensitive to vitamin E — test on a small area first.',
              safeUse: 'Apply vitamin E oil or break open a vitamin E capsule and apply to healing burn tissue once or twice daily.'
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
            { name: 'Solarcaine Aloe Vera Gel', desc: 'Lidocaine and aloe vera. Numbs sunburn pain fast. Look for the aloe based formula. Avoid aerosol versions which contain additional propellants.', rating: '🟡 Acceptable' },
            { name: 'Banana Boat Aloe After Sun', desc: 'Aloe based after sun lotion. Fewer additives than many competing after sun products. Effective for soothing sunburn.', rating: '🟡 Acceptable' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen reduces inflammation and pain associated with sunburn from the inside. More effective than acetaminophen for sunburn specifically.', rating: '🟡 Acceptable' },
            { name: 'Mederma Advanced Scar Gel', desc: 'For burn scar prevention during healing phase. Clinically studied for reducing scar appearance. Use only after wound is fully closed.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>First and most important:</strong> Cool running water for 20 minutes — do this before anything else</li>
            <li>✅ <strong>Look for:</strong> Pure aloe vera gel — available at most stores and highly effective</li>
            <li>✅ <strong>Look for:</strong> Plain ibuprofen for pain and inflammation</li>
            <li>🔴 <strong>Never:</strong> Apply butter, oil, or toothpaste to a fresh burn — traps heat and causes infection</li>
            <li>🔴 <strong>Never:</strong> Use ice or ice water on a burn — damages tissue</li>
            <li>🔴 <strong>Never:</strong> Pop burn blisters — they protect against infection</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}