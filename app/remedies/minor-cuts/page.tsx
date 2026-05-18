import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function MinorCuts() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care if a cut is deep, will not stop bleeding after 10 minutes of direct pressure, has jagged edges that won't close, is on the face or over a joint, or shows signs of infection including increasing redness, warmth, swelling, or pus." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Minor Cuts and Scrapes
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Seek emergency care if:</strong> Bleeding does not stop after 10 minutes of firm direct pressure, the cut is deep or gaping, you can see fat or muscle tissue, the cut is from a puncture wound or animal bite, or the person has not had a tetanus shot in the last 5 years.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Clean Water Rinse',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'The single most important first step for any cut or scrape. Running clean water over the wound for at least 5 minutes removes debris and bacteria better than any antiseptic.',
              warning: '',
              safeUse: 'Hold the wound under cool running water for at least 5 minutes. Use mild soap around but not in the wound. Pat dry with a clean cloth.'
            },
            {
              name: 'Raw Honey',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Clinically studied wound care agent. Antimicrobial, anti-inflammatory, and promotes healing. Manuka honey specifically is used in hospital wound care.',
              warning: 'Use on clean wounds only. Not for deep puncture wounds. Never give honey internally to infants under 1 year — topical use on skin is fine for all ages.',
              safeUse: 'Apply a thin layer of raw or manuka honey to the wound and cover with a clean bandage. Change daily. Manuka honey with UMF 10 or higher is most effective.'
            },
            {
              name: 'Tea Tree Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Powerful antimicrobial properties effective against bacteria and some antibiotic resistant strains. One of the most studied natural antiseptics.',
              warning: 'Must be diluted before any skin application — at least 1 drop per teaspoon of carrier oil. Never apply undiluted. Never swallow. Not for use inside wounds.',
              safeUse: 'Apply diluted around the wound edges — not inside the wound. Mix with coconut oil for best results.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Antimicrobial and promotes skin healing. One of the gentlest oils for wound care. Reduces scarring when used consistently during healing.',
              warning: 'Mix with a carrier oil before applying to skin around the wound.',
              safeUse: 'Apply diluted around the wound once or twice daily during healing. One of the safest oils for use on children.'
            },
            {
              name: 'Aloe Vera',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and promotes skin healing. Particularly soothing for scrapes and abrasions. Reduces scarring.',
              warning: 'Use pure aloe vera gel without added alcohol, fragrance, or colors. Not for deep wounds.',
              safeUse: 'Apply pure aloe vera gel to clean wound and surrounding skin. Fresh aloe from the plant is most potent. Safe for all ages.'
            },
            {
              name: 'Calendula',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and antimicrobial herb widely used in natural wound care. Promotes healing and reduces inflammation.',
              warning: 'Avoid if allergic to ragweed or related plants.',
              safeUse: 'Apply calendula cream or salve to clean wound. Weleda and Boiron make widely trusted calendula products available at health food stores.'
            },
            {
              name: 'Direct Pressure',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Firm direct pressure is the most effective way to stop bleeding. Hold a clean cloth firmly against the wound without lifting to check — lifting disrupts clot formation.',
              warning: '',
              safeUse: 'Apply firm continuous pressure for at least 10 minutes without lifting the cloth. If blood soaks through add more cloth on top — do not remove the first layer. Elevate the injured area above heart level if possible.'
            },
            {
              name: 'Coconut Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural antimicrobial and moisturizing properties. Helps keep wounds moist which promotes faster healing and reduces scarring.',
              warning: 'Use only on clean wounds. Not for infected wounds.',
              safeUse: 'Apply a thin layer to clean wound and cover with a bandage. Change daily. Safe for all ages.'
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
            { name: 'Aquaphor Healing Ointment', desc: 'Petroleum based but one of the most effective wound healing ointments available. Keeps wounds moist which significantly speeds healing. Fewer additives than Neosporin.', rating: '🟡 Acceptable' },
            { name: 'Band-Aid Adhesive Bandages', desc: 'Cover the wound to keep it clean and moist. Look for fabric bandages without latex if sensitivity is a concern.', rating: '🟢 Cleaner choice' },
            { name: 'Hydrogen Peroxide 3 Percent', desc: 'Kills bacteria but also damages healthy tissue — use only for initial cleaning of heavily contaminated wounds, not for ongoing wound care.', rating: '🟡 Acceptable — initial use only' },
            { name: 'Neosporin Original', desc: 'Triple antibiotic ointment. Effective but some people develop allergic reactions to neomycin. Bacitracin alone is a cleaner alternative.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>First:</strong> Clean running water for at least 5 minutes — most important step</li>
            <li>✅ <strong>Then:</strong> Direct pressure to stop bleeding</li>
            <li>✅ <strong>Look for:</strong> Any adhesive bandage to cover and protect the wound</li>
            <li>✅ <strong>Look for:</strong> Any petroleum based ointment to keep wound moist</li>
            <li>🔴 <strong>Avoid:</strong> Putting essential oils directly into open wounds</li>
            <li>🔴 <strong>Avoid:</strong> Closing a dirty wound before cleaning it thoroughly</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}