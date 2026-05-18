import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function DiaperRash() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if the rash is severe, blistering, bleeding, spreading beyond the diaper area, accompanied by fever, or does not improve within 3 days. A rash with bright red borders and satellite spots may be a yeast infection requiring antifungal treatment." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Diaper Rash
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Safe and effective options for your baby. Natural first, honest always.
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
              name: 'Air Time',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'The single most effective treatment for diaper rash. Moisture is the enemy — air exposure heals rash faster than any cream.',
              warning: '',
              safeUse: 'Let baby go diaper free on a waterproof mat for 10 to 15 minutes after each diaper change. Even a few minutes of air time several times a day makes a significant difference.'
            },
            {
              name: 'Coconut Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and moisturizing. Creates a protective barrier and fights both bacterial and fungal causes of diaper rash. One of the most popular natural diaper rash remedies.',
              warning: 'Test on a small area first. Some babies are sensitive to coconut.',
              safeUse: 'Apply a thin layer of virgin coconut oil to clean dry skin at every diaper change. Safe from birth.'
            },
            {
              name: 'Raw Honey',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and healing. Effective for diaper rash when applied topically. Never give honey internally to infants under 1 year — topical use on skin is safe.',
              warning: 'Topical use on skin is safe for all ages. Never give honey internally to infants under 1 year.',
              safeUse: 'Apply a thin layer of raw honey to the rash at diaper changes. Cover with a barrier cream to keep in place.'
            },
            {
              name: 'Oatmeal Bath',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Colloidal oatmeal soothes inflamed and irritated skin. Particularly effective for widespread or severe diaper rash.',
              warning: '',
              safeUse: 'Add colloidal oatmeal or finely ground plain oatmeal to a warm shallow bath. Soak baby\'s bottom for 10 minutes. Pat completely dry before applying any cream. Safe from birth.'
            },
            {
              name: 'Calendula Cream',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and healing herb. Gentle enough for newborns. Clinically studied for diaper rash prevention and treatment.',
              warning: 'Avoid if family history of ragweed allergy.',
              safeUse: 'Apply calendula cream at every diaper change. Weleda Calendula Diaper Cream is a widely trusted product specifically formulated for infants.'
            },
            {
              name: 'Frequent Diaper Changes',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Prolonged contact with urine and stool is the primary cause of diaper rash. More frequent changes is the most important preventive measure.',
              warning: '',
              safeUse: 'Change diapers as soon as possible after soiling. At minimum every 2 hours during the day. Clean thoroughly with each change using fragrance free wipes or a warm damp cloth.'
            },
            {
              name: 'Fragrance Free Wipes',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Fragrances and preservatives in baby wipes are a common cause of diaper rash. Switching to fragrance free wipes often resolves recurring rash.',
              warning: '',
              safeUse: 'Use fragrance free alcohol free wipes or a warm damp cloth for cleaning. Water Wipes contain just water and a tiny amount of fruit extract — one of the cleanest options available.'
            },
            {
              name: 'Baking Soda Bath',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Neutralizes the acids that irritate skin and reduces inflammation. Particularly effective when diaper rash is caused by acidic stool during teething or illness.',
              warning: 'Use only a small amount — 2 tablespoons maximum in a shallow bath. Too much can disrupt skin pH.',
              safeUse: 'Add 2 tablespoons of baking soda to a warm shallow bath. Soak for 10 minutes. Pat completely dry. Safe from 6 weeks and up.'
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
            { name: 'Boudreaux\'s Butt Paste Natural', desc: 'Zinc oxide based with natural ingredients. Fewer synthetic additives than the original formula. Creates an effective moisture barrier.', rating: '🟢 Cleaner choice' },
            { name: 'Desitin Maximum Strength', desc: 'Zinc oxide 40 percent. Highly effective barrier cream. Fragrance free version available. One of the most clinically studied diaper rash creams.', rating: '🟡 Acceptable' },
            { name: 'Aquaphor Baby Healing Ointment', desc: 'Petroleum based barrier ointment. Fewer additives than many diaper creams. Creates an effective moisture barrier for mild rash.', rating: '🟡 Acceptable' },
            { name: 'Earth Mama Diaper Balm', desc: 'Calendula and zinc oxide based. Certified organic ingredients. No petroleum, no parabens, no artificial fragrance. One of the cleanest mainstream options.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Most important:</strong> Air time — free and the most effective treatment available</li>
            <li>✅ <strong>Look for:</strong> Any zinc oxide barrier cream with minimal ingredients</li>
            <li>✅ <strong>Try:</strong> Coconut oil as a barrier and antimicrobial in a pinch</li>
            <li>🔴 <strong>Avoid:</strong> Fragranced wipes, powders, and creams on irritated skin</li>
            <li>🔴 <strong>Avoid:</strong> Talcum powder — inhaled powder poses a respiratory risk to infants</li>
            <li>🔴 <strong>See a doctor if:</strong> Rash has bright red borders with small red dots outside the main rash — this is likely a yeast infection needing antifungal treatment</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}