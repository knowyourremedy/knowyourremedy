import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Rashes() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care for rashes accompanied by difficulty breathing, throat swelling, fever over 103F, or a rash that spreads rapidly. Seek medical care for rashes that cover large areas, appear infected, or do not improve within a few days. Some rashes require prescription treatment." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Rashes and Skin Irritation
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Seek emergency care for:</strong> Rash with difficulty breathing or throat swelling — anaphylaxis. Rash with high fever and stiff neck — possible meningitis. Rash that looks like purple or red pinpoints that do not fade when pressed — seek emergency care immediately.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Colloidal Oatmeal',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'One of the most clinically studied natural remedies for skin inflammation and itching. Used by dermatologists for eczema, contact dermatitis, and general rashes.',
              warning: '',
              safeUse: 'Add to a lukewarm bath and soak for 15 to 20 minutes. Or apply colloidal oatmeal cream directly to the rash. Aveeno makes widely available colloidal oatmeal products. Safe for all ages including infants.'
            },
            {
              name: 'Aloe Vera',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and soothing. Effective for contact dermatitis, heat rash, and mild allergic rashes.',
              warning: 'Use pure aloe vera gel without alcohol or artificial additives. Alcohol based products cause burning on irritated skin.',
              safeUse: 'Apply pure aloe vera gel generously to the rash. Fresh aloe from the plant is most potent. Safe for all ages.'
            },
            {
              name: 'Coconut Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and moisturizing. Helps restore the skin barrier and reduces inflammation. Particularly effective for eczema and dry skin rashes.',
              warning: 'Some people with coconut allergies may react. Test on a small area first.',
              safeUse: 'Apply virgin coconut oil directly to the rash several times daily. Safe for all ages including infants.'
            },
            {
              name: 'Tea Tree Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Antimicrobial and anti-inflammatory. Effective for rashes caused by fungal or bacterial infection.',
              warning: 'Must be diluted before skin application. Mix at least 1 drop per teaspoon of carrier oil. Never use undiluted. Not for children under 6.',
              safeUse: 'Apply diluted to the affected area twice daily. Effective for fungal rashes like ringworm and athlete\'s foot.'
            },
            {
              name: 'Calendula Cream',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Anti-inflammatory and healing herb widely used for skin irritation, contact dermatitis, and mild rashes. Gentle enough for infants.',
              warning: 'Avoid if allergic to ragweed or related plants.',
              safeUse: 'Apply calendula cream to the rash several times daily. Weleda and Boiron make trusted calendula products available at health food stores.'
            },
            {
              name: 'Cool Compress',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Reduces inflammation and provides immediate itch relief for most rash types.',
              warning: 'Never apply ice directly to skin.',
              safeUse: 'Apply a clean cool damp cloth to the rash for 10 to 15 minutes several times daily. Safe for all ages.'
            },
            {
              name: 'Witch Hazel',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural astringent with anti-inflammatory properties. Reduces itching and redness effectively.',
              warning: 'Use alcohol free witch hazel to avoid further irritation.',
              safeUse: 'Apply with a cotton ball to the affected area. Thayers alcohol free witch hazel is a widely trusted option. Safe for most ages.'
            },
            {
              name: 'Elimination and Identification',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'The most important long term treatment for recurring rashes is identifying and eliminating the trigger. Common triggers include soaps, detergents, fragrances, foods, and plants.',
              warning: '',
              safeUse: 'Switch to fragrance free laundry detergent and soaps. Avoid synthetic fabrics. Keep a journal of new products, foods, or exposures before rash onset to identify patterns.'
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
            { name: 'Aveeno Eczema Therapy Cream', desc: 'Colloidal oatmeal and ceramides. One of the cleanest mainstream options for eczema and general skin rashes. Fragrance free.', rating: '🟢 Cleaner choice' },
            { name: 'Cortizone 10 Cream', desc: 'Hydrocortisone 1 percent. Reduces inflammation and itching effectively for contact dermatitis and allergic rashes. Use short term only.', rating: '🟡 Acceptable — short term' },
            { name: 'CeraVe Healing Ointment', desc: 'Ceramides and petrolatum. Restores skin barrier without fragrance or additives. Recommended by dermatologists for sensitive skin.', rating: '🟢 Cleaner choice' },
            { name: 'Claritin or Zyrtec', desc: 'Oral antihistamines for allergy driven rashes. Non drowsy options for daytime use. Reduces systemic histamine response.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Try first:</strong> Cool compress — immediately reduces itching and inflammation</li>
            <li>✅ <strong>Look for:</strong> Plain hydrocortisone cream for contact dermatitis or allergic rashes</li>
            <li>✅ <strong>Look for:</strong> Plain fragrance free moisturizer to restore skin barrier</li>
            <li>🔴 <strong>Avoid:</strong> Fragranced products, harsh soaps, or anything new on irritated skin</li>
            <li>🔴 <strong>Avoid:</strong> Scratching — breaks skin and causes infection and scarring</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}