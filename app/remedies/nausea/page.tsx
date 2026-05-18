import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Nausea() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor if nausea is severe, persistent, accompanied by chest pain, or if you suspect poisoning or pregnancy complications. Seek emergency care immediately if nausea is accompanied by severe abdominal pain, blood in vomit, or signs of dehydration in infants or young children." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          color: '#2d4a3e',
          marginBottom: '0.5rem'
        }}>
          Nausea
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#5a7a6e',
          lineHeight: '1.6'
        }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1rem 2rem 2rem'
      }}>

        {/* When to See a Doctor */}
        <div style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          lineHeight: '1.7'
        }}>
          🚨 <strong>Seek emergency care if:</strong> Nausea is accompanied by chest pain, severe abdominal pain, blood in vomit, signs of dehydration in an infant such as no wet diapers for 6 hours, sunken eyes, or no tears when crying. These require immediate medical attention.
        </div>

        <OilKey />

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          🌿 Natural Options
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            {
              name: 'Ginger',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The most well studied natural remedy for nausea. Effective for morning sickness, motion sickness, and general upset stomach. Works for all ages.',
              warning: '',
              safeUse: 'Take as fresh ginger tea, ginger chews, ginger capsules, or ginger ale made with real ginger. Look for products that list real ginger as an ingredient — most commercial ginger ale contains no actual ginger.'
            },
            {
              name: 'Peppermint Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Relaxes the stomach muscles and reduces nausea and bloating. One of the most effective and accessible natural options.',
              warning: 'Not recommended for infants or children under 5 as strong peppermint can cause breathing issues in young children.',
              safeUse: 'Brew fresh peppermint tea or use a high quality tea bag. Safe during pregnancy for morning sickness in most cases — check with your doctor.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Inhaling peppermint oil can quickly reduce nausea. Apply a tiny amount diluted to your wrists or inhale directly from the bottle.',
              warning: 'Mix with a carrier oil — a plain gentle oil like coconut or jojoba oil — before putting on skin. Never swallow topical grade peppermint oil. Not safe for children under 6.',
              safeUse: 'Safe to smell directly from the bottle for quick nausea relief. Safe to diffuse for adults. Do not diffuse around children under 6 or infants.'
            },
            {
              name: 'Spearmint Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Gentler than peppermint. A better option for children and those sensitive to strong menthol. Effective for nausea and stomach upset.',
              warning: 'Mix with a carrier oil before putting on skin. Never swallow topical grade oil.',
              safeUse: 'Safe to diffuse and generally gentler around children than peppermint. Still avoid diffusing around infants under 6 months.'
            },
            {
              name: 'Acupressure P6 Point',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Press firmly on the inside of your wrist about two finger widths from your wrist crease between the two tendons. Hold for 2-3 minutes. Clinically studied for nausea relief.',
              warning: '',
              safeUse: 'Sea-Bands are wristbands that apply constant pressure to this point. Widely used for motion sickness and morning sickness. Safe for all ages including pregnant women.'
            },
            {
              name: 'BRAT Diet',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Bananas, Rice, Applesauce, Toast. Bland easy to digest foods that settle the stomach. The standard recommendation for nausea and vomiting recovery.',
              warning: '',
              safeUse: 'Start with small amounts and work back to normal eating gradually. Stay hydrated with small sips of water or electrolyte drinks between bites.'
            },
            {
              name: 'Chamomile Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Calms stomach spasms and reduces nausea. Gentle enough for children over 1 year. Also helps with anxiety related nausea.',
              warning: 'Avoid if allergic to ragweed or related plants — chamomile is in the same plant family.',
              safeUse: 'Safe during pregnancy. One of the gentlest and most widely tolerated herbal teas. Look for brands without added flavors or sweeteners.'
            },
            {
              name: 'Hydration',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Dehydration makes nausea worse. Small frequent sips are better than large amounts at once when nauseated.',
              warning: 'Watch for signs of dehydration in children — no tears when crying, dry mouth, no urination for 6 or more hours. Seek medical care if these appear.',
              safeUse: 'Pedialyte or coconut water replace electrolytes lost through vomiting. Plain water is fine if nothing else is available.'
            },
          ].map((item) => (
            <div key={item.name} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  display: 'inline-block',
                  fontSize: '0.8rem', 
                  color: '#fff',
                  backgroundColor: item.badgeColor,
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                }}>
                  {item.badge}
                </div>
                {item.badgeColor === '#27ae60' && (
                  <span style={{ fontSize: '0.75rem', color: '#c0392b', fontStyle: 'italic' }}>
                    (specific type — see notes below)
                  </span>
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

        {/* Ingestable Oil Label Education */}
        <div style={{
          backgroundColor: '#fff8e1',
          border: '1px solid #f0c040',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontWeight: '600', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { name: 'Dramamine Non-Drowsy', desc: 'Ginger based. The cleanest option in the Dramamine line. No artificial dyes. Good for motion sickness and general nausea.', rating: '🟢 Cleaner choice' },
            { name: 'Emetrol', desc: 'Phosphorated carbohydrate solution. Settles the stomach without antihistamines or other sedating ingredients. Available for children and adults.', rating: '🟡 Acceptable' },
            { name: 'Pepto Bismol Caplets', desc: 'Caplets have fewer additives than the liquid which contains artificial colors. Bismuth subsalicylate only.', rating: '🟡 Acceptable' },
            { name: 'Zofran Generic', desc: 'Ondansetron. Prescription strength nausea relief. Requires a doctor visit but extremely effective for severe nausea. Ask your doctor about having some on hand.', rating: '🟡 Prescription required' },
          ].map((item) => (
            <div key={item.name} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}>
              <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              <div style={{ fontSize: '0.8rem', color: '#2d4a3e', fontWeight: '600' }}>{item.rating}</div>
            </div>
          ))}
        </div>

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          ✅ If You Have No Other Choice
        </h2>
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '3rem'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '1rem' }}>
            If you are at a gas station or convenience store with limited options here is what to look for and what to avoid.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.9rem', color: '#5a7a6e' }}>
            <li>✅ <strong>Look for:</strong> Ginger ale — but check the label for real ginger as an ingredient. Most brands do not contain actual ginger.</li>
            <li>✅ <strong>Look for:</strong> Plain crackers like saltines to settle the stomach</li>
            <li>✅ <strong>Look for:</strong> Electrolyte drinks like Pedialyte or Gatorade to stay hydrated</li>
            <li>🔴 <strong>Avoid:</strong> Pepto Bismol liquid — it contains artificial colors and bismuth subsalicylate which is not appropriate for children under 12</li>
            <li>🔴 <strong>Avoid:</strong> Combination nausea and pain products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}