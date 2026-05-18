import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function MenstrualCramps() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if cramps are severe, suddenly worse than usual, accompanied by heavy bleeding, fever, or do not respond to any treatment. Severe menstrual pain can indicate endometriosis or other conditions requiring diagnosis and treatment." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Menstrual Cramps
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
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is directly linked to menstrual cramp severity. Clinically shown to reduce cramp intensity and duration.',
              warning: 'High doses can cause loose stools. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 300 to 400mg daily starting a week before your period for best results. Glycinate form is the gentlest on the stomach.'
            },
            {
              name: 'Clary Sage Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'One of the most effective oils specifically for menstrual cramps. Clinically studied for pain reduction when applied to the abdomen.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Avoid during pregnancy.',
              safeUse: 'Mix 3 to 5 drops with a tablespoon of coconut or jojoba oil and massage gently onto lower abdomen in a clockwise direction. Safe to diffuse for adults.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Reduces pain and anxiety associated with menstrual cramps. Often combined with clary sage for enhanced effect.',
              warning: 'Mix with a carrier oil before applying to skin.',
              safeUse: 'Combine with clary sage in a carrier oil and apply to lower abdomen. Safe to diffuse and inhale directly.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinical studies show ginger is as effective as ibuprofen for menstrual pain relief. Anti-inflammatory and antispasmodic.',
              warning: 'High doses may thin the blood. Consult your doctor if on blood thinners.',
              safeUse: 'Drink 2 to 3 cups of strong ginger tea daily during your period. Start the day before cramping typically begins.'
            },
            {
              name: 'Omega 3 Fish Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Reduces prostaglandins that cause uterine cramping. Clinically shown to reduce menstrual pain when taken consistently.',
              warning: 'May interact with blood thinners.',
              safeUse: 'Take 1 to 2 grams of EPA and DHA combined daily. Most effective when taken consistently throughout the month not just during your period.'
            },
            {
              name: 'Heat Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Heat relaxes uterine muscles and increases blood flow. Clinically proven to be as effective as ibuprofen for menstrual cramp relief.',
              warning: '',
              safeUse: 'Apply a heating pad to your lower abdomen for 20 minutes at a time. A warm bath is also highly effective. Safe to use continuously with breaks.'
            },
            {
              name: 'Turmeric',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory properties reduce prostaglandin production. Helps reduce both cramp intensity and associated inflammation.',
              warning: 'May interact with blood thinners. Not recommended in high doses during pregnancy.',
              safeUse: 'Take with black pepper for absorption. Golden milk — turmeric in warm milk with honey — is a widely used traditional remedy.'
            },
            {
              name: 'Cramp Bark',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'An herb specifically used for uterine cramping for centuries. Antispasmodic properties relax the uterine muscle.',
              warning: 'Not recommended during pregnancy. Consult your doctor if on medications.',
              safeUse: 'Available as tincture or capsule. Take at onset of cramping for best results. Look for standardized extracts from reputable herbal brands.'
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

        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #f0c040', borderLeft: '4px solid #f0c040', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontWeight: '700', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2', fontFamily: 'var(--font-inter), sans-serif' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Midol Complete', desc: 'Acetaminophen, caffeine, and antihistamine. The antihistamine helps with bloating. More ingredients than ideal but widely effective.', rating: '🟡 Acceptable' },
            { name: 'Aleve', desc: 'Naproxen sodium. Longer lasting than ibuprofen — one dose lasts up to 12 hours. Particularly effective for menstrual cramps.', rating: '🟡 Acceptable' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablets. Ibuprofen is clinically the most effective OTC option for menstrual cramps.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain ibuprofen or naproxen — most effective OTC options for cramps</li>
            <li>✅ <strong>Try first:</strong> Heat therapy — a warm compress or hot water bottle is free and clinically proven</li>
            <li>🔴 <strong>Avoid:</strong> Combination menstrual products with multiple active ingredients you do not need</li>
            <li>🔴 <strong>Avoid:</strong> Products containing artificial dyes or sweeteners</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}