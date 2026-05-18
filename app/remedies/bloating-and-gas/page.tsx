import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function BloatingAndGas() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if bloating is severe, persistent, accompanied by significant pain, blood in stool, unexplained weight loss, or if symptoms suddenly worsen. Chronic bloating may indicate an underlying digestive condition requiring diagnosis." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Bloating and Gas
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
              name: 'Peppermint Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Relaxes the muscles of the digestive tract and relieves gas and bloating. One of the most effective and widely available natural remedies for digestive discomfort.',
              warning: 'Not recommended for infants or children under 5. May worsen acid reflux in some people.',
              safeUse: 'Drink one cup after meals. Look for pure peppermint tea without added flavors or sweeteners.'
            },
            {
              name: 'Fennel Seeds',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Traditionally used for gas and bloating for thousands of years. Relaxes intestinal muscles and helps expel trapped gas.',
              warning: '',
              safeUse: 'Chew half a teaspoon of fennel seeds after meals or brew as a tea. Safe for most ages. One of the traditional remedies for infant colic in very weak tea form.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Speeds up stomach emptying and reduces bloating caused by slow digestion. Anti-inflammatory and carminative — meaning it helps expel gas.',
              warning: '',
              safeUse: 'Drink before or after meals. Fresh ginger is more potent than dried. Add raw honey if desired.'
            },
            {
              name: 'DigestZen or Zengest',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'doTERRA digestive blend containing ginger, fennel, peppermint, and other digestive oils. Apply topically to the abdomen for bloating and cramping relief.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil blends.',
              safeUse: 'Mix with coconut or jojoba oil and massage in a clockwise direction on the abdomen. Safe to diffuse for adults.'
            },
            {
              name: 'Activated Charcoal',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Binds to gas producing compounds in the digestive tract. Effective for acute bloating especially after eating gas producing foods.',
              warning: 'Do not take within 2 hours of medications or supplements — it absorbs them and reduces their effectiveness. Not for daily use.',
              safeUse: 'Take with a large glass of water at onset of bloating. Available as capsules. Use occasionally not regularly.'
            },
            {
              name: 'Probiotics',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Restore healthy gut bacteria balance which directly reduces gas and bloating. Most effective when taken consistently over time.',
              warning: 'Some people experience temporary increase in gas when first starting probiotics. This usually resolves within a week.',
              safeUse: 'Look for multi-strain formulas with at least 10 billion CFU. Refrigerated probiotics are generally more potent. Lactobacillus and Bifidobacterium strains are the most studied.'
            },
            {
              name: 'Digestive Enzymes',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Help break down food more completely, reducing the amount that reaches gas producing bacteria in the colon. Particularly helpful after large or difficult to digest meals.',
              warning: '',
              safeUse: 'Take with meals for best results. Look for broad spectrum formulas including alpha-galactosidase which specifically breaks down gas producing carbohydrates.'
            },
            {
              name: 'Abdominal Massage',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Massaging the abdomen in a clockwise direction following the path of the colon helps move trapped gas through the digestive tract.',
              warning: '',
              safeUse: 'Use gentle circular motions starting at the lower right abdomen moving up, across, and down the left side. Do this for 5 to 10 minutes lying down for best results.'
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
            { name: 'Gas X Extra Strength Softgels', desc: 'Simethicone only. No artificial colors in the softgel form. Fast and effective for trapped gas and bloating.', rating: '🟢 Cleaner choice' },
            { name: 'Beano', desc: 'Alpha-galactosidase enzyme. Breaks down gas producing carbohydrates before they reach the colon. Take before eating gas producing foods.', rating: '🟡 Acceptable' },
            { name: 'Iberogast', desc: 'Herbal liquid formula clinically studied for functional digestive disorders including bloating and gas. Available at health food stores.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Look for:</strong> Plain simethicone softgels — Gas X or store brand equivalent</li>
            <li>✅ <strong>Try first:</strong> Peppermint tea — available almost everywhere and genuinely effective</li>
            <li>✅ <strong>Try:</strong> Abdominal massage — free and immediately available anywhere</li>
            <li>🔴 <strong>Avoid:</strong> Combination digestive products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}