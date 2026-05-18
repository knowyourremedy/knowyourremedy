import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function JointPain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if joint pain is severe, follows an injury, is accompanied by significant swelling, redness, warmth, or fever, or if you suspect arthritis or an autoimmune condition. Always consult your doctor before starting any new supplement especially if you are on medications." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Joint Pain
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Turmeric and Black Pepper',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Curcumin is one of the most clinically studied natural anti-inflammatories for joint pain and arthritis. Black pepper increases absorption dramatically.',
              warning: 'May interact with blood thinners. Not recommended in high doses during pregnancy.',
              safeUse: 'Always take with black pepper or piperine. Take with food. Look for high potency curcumin extracts standardized to 95 percent curcuminoids for best results.'
            },
            {
              name: 'Glucosamine and Chondroitin',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The most studied natural supplement combination for osteoarthritis. Helps rebuild cartilage and reduce joint inflammation over time.',
              warning: 'Glucosamine is derived from shellfish — avoid if you have a shellfish allergy. May affect blood sugar in diabetics.',
              safeUse: 'Take consistently for at least two to three months before evaluating results. Effects build slowly over time. Widely available at Costco, Walmart, and health food stores.'
            },
            {
              name: 'Omega 3 Fish Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinically proven to reduce joint inflammation and morning stiffness in rheumatoid arthritis. One of the most evidence backed natural supplements available.',
              warning: 'May interact with blood thinners. Consult your doctor if on anticoagulants.',
              safeUse: 'Take 2 to 4 grams of EPA and DHA combined daily for joint benefits. Look for molecularly distilled fish oil to minimize heavy metal exposure. Nordic Naturals is a widely trusted brand.'
            },
            {
              name: 'Frankincense Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Boswellic acids in frankincense are clinically studied for reducing joint inflammation. Apply topically to affected joints for relief.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil.',
              safeUse: 'Mix 3 to 4 drops with a tablespoon of coconut or jojoba oil and massage into affected joints. Safe to diffuse for adults.'
            },
            {
              name: 'Peppermint and Eucalyptus Blend',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Combined cooling and anti-inflammatory effect when applied topically to joints. Provides fast temporary relief.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oils. Not safe for children under 6.',
              safeUse: 'Mix equal parts peppermint and eucalyptus with a carrier oil and massage gently into joint.'
            },
            {
              name: 'Boswellia',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The oral supplement form of frankincense. Clinically studied for osteoarthritis and rheumatoid arthritis with significant evidence for reducing pain and improving mobility.',
              warning: 'Consult your doctor if on blood thinners or anti-inflammatory medications.',
              safeUse: 'Take 300 to 500mg of standardized boswellia extract daily. Look for products standardized to at least 65 percent boswellic acids.'
            },
            {
              name: 'Collagen Peptides',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Type II collagen specifically supports joint cartilage health. Growing clinical evidence for reducing joint pain and improving mobility especially in knees.',
              warning: '',
              safeUse: 'Take 10 to 15 grams daily. Look for hydrolyzed collagen peptides for best absorption. Vital Proteins and Great Lakes are widely trusted brands.'
            },
            {
              name: 'Epsom Salt Soak',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Magnesium sulfate absorbed through the skin. Reduces joint inflammation and soreness. Particularly effective for hand and foot joint pain.',
              warning: '',
              safeUse: 'Soak affected joints in warm water with two cups of Epsom salt for 20 minutes. Safe for all ages.'
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

        <div style={{ backgroundColor: '#fff8e1', border: '1px solid #f0c040', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: '600', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Aleve', desc: 'Naproxen sodium. Longer lasting anti-inflammatory than ibuprofen. One dose lasts up to 12 hours. Better suited for inflammation driven joint pain.', rating: '🟡 Acceptable' },
            { name: 'Voltaren Arthritis Pain Gel', desc: 'Diclofenac sodium topical gel. Prescription strength anti-inflammatory applied directly to the joint. Less systemic absorption than oral NSAIDs.', rating: '🟢 Cleaner choice' },
            { name: 'Advil Liqui-Gels', desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablet versions. Effective for acute joint pain and inflammation.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain ibuprofen or naproxen with minimal fillers</li>
            <li>✅ <strong>Look for:</strong> Any topical menthol or capsaicin cream with the fewest ingredients</li>
            <li>🔴 <strong>Avoid:</strong> Combination pain products with multiple active ingredients you do not need</li>
            <li>🔴 <strong>Avoid:</strong> Long term daily use of NSAIDs without doctor supervision — they can cause stomach and kidney issues over time</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}