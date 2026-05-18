import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function UpsetStomach() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care if stomach pain is severe, sudden, or accompanied by fever, vomiting blood, or pain that radiates to your back or shoulder. Always consult your doctor for persistent or recurring stomach issues." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Upset Stomach
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
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and antispasmodic. One of the most effective natural remedies for general stomach upset, bloating, and indigestion.',
              warning: '',
              safeUse: 'Steep fresh ginger slices in hot water for 10 minutes. Add raw honey if desired. Safe for all ages over 1 year.'
            },
            {
              name: 'Peppermint Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Relaxes stomach muscles and relieves cramping, bloating, and general upset. One of the best studied herbal remedies for digestive issues.',
              warning: 'Not recommended for infants or children under 5. May worsen acid reflux in some people — if you have GERD use chamomile instead.',
              safeUse: 'Drink one cup after meals for best results. Look for pure peppermint tea without added flavors.'
            },
            {
              name: 'Chamomile Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Soothes stomach spasms and inflammation. Gentle enough for children and safe during pregnancy. Also helps with anxiety related stomach upset.',
              warning: 'Avoid if allergic to ragweed or related plants.',
              safeUse: 'Safe for children over 1 year. One of the gentlest digestive herbs available.'
            },
            {
              name: 'Digestive Enzymes',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Help break down food more efficiently. Particularly useful for bloating and upset stomach after heavy or rich meals.',
              warning: '',
              safeUse: 'Take with meals for best results. Look for broad spectrum formulas with amylase, protease, and lipase. Available at most health food stores.'
            },
            {
              name: 'Activated Charcoal',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Binds to toxins and gas in the digestive tract. Effective for food poisoning, bloating, and general stomach upset.',
              warning: 'Do not take within 2 hours of medications or supplements — it will absorb them and reduce their effectiveness. Not recommended for children under 6 without doctor guidance.',
              safeUse: 'Take with a large glass of water. Use only for acute upset — not for daily use.'
            },
            {
              name: 'Fennel Seeds',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Traditional remedy for gas, bloating, and stomach cramps. Chew a small amount of seeds after meals or brew as a tea.',
              warning: '',
              safeUse: 'Safe for most ages. Fennel tea is one of the traditional remedies for infant colic — use very weak tea and consult your pediatrician first.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Enteric coated peppermint oil capsules are clinically proven to reduce stomach cramping and irritable bowel symptoms.',
              warning: 'Only use enteric coated capsules for internal use — regular peppermint oil capsules can cause heartburn. For internal use only purchase oils with a Supplement Facts panel on the label.',
              safeUse: 'Take between meals not with food. Not recommended for children under 8 without doctor guidance.'
            },
            {
              name: 'DigestZen or Zengest',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'doTERRA digestive blend. Apply topically to stomach area for cramping and upset. Popular in the natural health community.',
              warning: 'Mix with a carrier oil — a plain gentle oil like coconut or jojoba oil — before applying to stomach. Never swallow topical grade oil blends.',
              safeUse: 'Rub gently in a clockwise direction on the stomach. Safe to diffuse for adults.'
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
            { name: 'Pepto Bismol Caplets', desc: 'Fewer additives than the liquid. Bismuth subsalicylate only. Effective for general upset stomach, nausea, and diarrhea.', rating: '🟡 Acceptable' },
            { name: 'Gas X Extra Strength', desc: 'Simethicone only. No artificial colors in the softgel form. Effective specifically for gas and bloating.', rating: '🟢 Cleaner choice' },
            { name: 'Tums Ultra Strength', desc: 'Calcium carbonate only. Neutralizes stomach acid fast. Look for the plain variety without artificial colors.', rating: '🟡 Acceptable' },
            { name: 'Iberogast', desc: 'Herbal liquid formula for functional digestive disorders. Clinically studied. Available at most health food stores and some pharmacies.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Look for:</strong> Plain antacids like Tums or Rolaids with minimal ingredients</li>
            <li>✅ <strong>Look for:</strong> Plain crackers, ginger ale with real ginger, or plain sparkling water</li>
            <li>🔴 <strong>Avoid:</strong> Pepto Bismol liquid — contains artificial colors</li>
            <li>🔴 <strong>Avoid:</strong> Combination products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}