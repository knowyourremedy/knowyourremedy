import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Constipation() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if constipation is accompanied by severe abdominal pain, blood in stool, unexplained weight loss, or lasts more than 3 weeks. Chronic constipation may indicate an underlying condition requiring diagnosis." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Constipation
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
              name: 'Magnesium Citrate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'One of the most effective natural laxatives available. Draws water into the intestines to soften stool and stimulate bowel movement. Works within 30 minutes to 6 hours.',
              warning: 'Do not use if you have kidney disease. Not for daily long term use. Consult your doctor if on heart medications.',
              safeUse: 'Take 200 to 400mg at bedtime. Citrate form is more effective for constipation than glycinate. Drink plenty of water.'
            },
            {
              name: 'Psyllium Husk',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Soluble fiber that adds bulk to stool and draws water in. One of the most clinically studied natural remedies for chronic constipation.',
              warning: 'Always take with a full glass of water — never without. Can cause choking or intestinal blockage if taken dry.',
              safeUse: 'Start with a small amount and work up gradually. Take with at least 8 ounces of water. Most effective when taken consistently every day.'
            },
            {
              name: 'Prunes and Prune Juice',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Contain sorbitol and fiber which naturally stimulate bowel movements. Clinically proven as effective as psyllium for mild to moderate constipation.',
              warning: '',
              safeUse: 'Eat 3 to 5 prunes or drink 4 to 8 ounces of prune juice daily. Safe for all ages over 6 months. For infants consult your pediatrician about appropriate amounts.'
            },
            {
              name: 'Warm Water with Lemon',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Stimulates digestion and promotes bowel movement. One of the simplest and most accessible natural constipation remedies.',
              warning: '',
              safeUse: 'Drink one glass of warm water with fresh lemon juice first thing in the morning before eating anything. Safe for all ages.'
            },
            {
              name: 'Castor Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'A powerful natural stimulant laxative. Works within 2 to 6 hours. One of the strongest natural options for acute constipation.',
              warning: 'Not for regular use — can cause dependency with overuse. Not recommended during pregnancy. Not for children under 6 without doctor guidance. Use only food grade castor oil with Supplement Facts panel.',
              safeUse: 'Take one to two tablespoons on an empty stomach. Effects are strong — plan to stay home. Use only occasionally for acute constipation.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Stimulates digestion and helps move food through the intestines. Particularly effective for constipation caused by slow digestion.',
              warning: '',
              safeUse: 'Drink one to two cups daily. Most effective when combined with adequate hydration and fiber intake.'
            },
            {
              name: 'Abdominal Massage',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Massaging the abdomen following the path of the colon helps stimulate bowel movement and relieve discomfort.',
              warning: '',
              safeUse: 'Lie down and use gentle circular motions starting at the lower right abdomen, moving up across and down the left side following the colon. Do for 10 to 15 minutes. Safe for all ages.'
            },
            {
              name: 'Movement and Exercise',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Physical movement stimulates intestinal contractions. Walking is one of the most effective and underutilized treatments for constipation.',
              warning: '',
              safeUse: 'A 20 to 30 minute walk can stimulate a bowel movement within hours. Yoga poses like child\'s pose, wind relieving pose, and seated twists are particularly effective.'
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
            { name: 'Metamucil Plain', desc: 'Psyllium husk fiber. Look for the plain unflavored powder without artificial sweeteners or colors. Most effective fiber supplement available OTC.', rating: '🟢 Cleaner choice' },
            { name: 'Miralax', desc: 'Polyethylene glycol 3350. Osmotic laxative that draws water into the colon. Tasteless and odorless. Widely recommended by gastroenterologists for short term use.', rating: '🟡 Acceptable' },
            { name: 'Dulcolax Stool Softener', desc: 'Docusate sodium only. Softens stool by drawing water in. Gentler than stimulant laxatives. Safe for short term use.', rating: '🟡 Acceptable' },
            { name: 'Colace', desc: 'Docusate sodium stool softener. Fewer additives than many competing products. Safe for pregnancy when recommended by a doctor.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain docusate sodium stool softener with minimal additives</li>
            <li>✅ <strong>Try first:</strong> Warm water with lemon first thing in the morning — free and effective</li>
            <li>✅ <strong>Try:</strong> Prune juice — available at almost any store and clinically effective</li>
            <li>🔴 <strong>Avoid:</strong> Stimulant laxatives like senna or bisacodyl for regular use — they cause dependency</li>
            <li>🔴 <strong>Avoid:</strong> Combination laxative products with multiple active ingredients</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}