import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Colic() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your pediatrician before giving any supplement, herb, or remedy to an infant. Seek medical care if your baby has a fever, is not eating, has blood in stool, is vomiting forcefully, or if crying is accompanied by other concerning symptoms." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Colic
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Safe options for your baby and sanity saving tips for you. Natural first, honest always.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#2d4a3e', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          💚 <strong>For exhausted parents:</strong> Colic typically peaks at 6 weeks and resolves by 3 to 4 months. It is not caused by bad parenting. Put baby down safely if you feel overwhelmed and take a break. Call a friend, partner, or your pediatrician for support.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Bicycle Legs',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Gently moving baby\'s legs in a bicycle motion while lying on their back helps move trapped gas through the digestive tract.',
              warning: '',
              safeUse: 'Lay baby on their back. Gently move legs in a cycling motion for 1 to 2 minutes. Repeat several times. Safe from birth.'
            },
            {
              name: 'Tummy Time and Pressure',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Laying baby tummy down across your lap or forearm applies gentle pressure to the abdomen which can relieve gas pain.',
              warning: 'Never leave baby unsupervised in this position. Never use for sleep.',
              safeUse: 'Hold baby face down along your forearm with head at your elbow and legs straddling your hand. Gently rub baby\'s back. The football hold position.'
            },
            {
              name: 'White Noise',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'White noise mimics the sounds of the womb and has a calming effect on colicky babies. One of the most effective and evidence backed colic remedies.',
              warning: 'Keep white noise machines at a safe distance from baby\'s head and at a moderate volume.',
              safeUse: 'Use a white noise machine, fan, or white noise app. Shushing sounds, vacuum cleaner sounds, and running water are particularly effective. Safe from birth.'
            },
            {
              name: 'Probiotics',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Lactobacillus reuteri DSM 17938 is the most clinically studied probiotic for infant colic. Multiple studies show significant reduction in crying time.',
              warning: 'Consult your pediatrician before starting probiotics in infants. Use only infant specific probiotic formulas.',
              safeUse: 'BioGaia Protectis drops contain the clinically studied strain. Give as directed on the package. Most effective when started early and given consistently.'
            },
            {
              name: 'Fennel Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Very weak fennel tea has carminative properties that help relieve infant gas and colic. Used traditionally across many cultures.',
              warning: 'Only for babies over 6 months. Use very weak tea only. Consult your pediatrician first. Avoid fennel seed oil which is not safe for infants.',
              safeUse: 'Steep one fennel tea bag for 1 minute in 8 ounces of water. Cool completely. Offer no more than 1 to 2 ounces.'
            },
            {
              name: 'Swaddling',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Snug swaddling mimics the feeling of the womb and reduces the startle reflex that can escalate crying in colicky babies.',
              warning: 'Use safe swaddling technique — hips should be able to move freely. Stop swaddling when baby shows signs of rolling.',
              safeUse: 'Wrap baby snugly with arms at sides. Hips and legs should be able to flex. The DUDU wrap — down, up, down, up — is a widely taught safe technique.'
            },
            {
              name: 'Gripe Water',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Traditional remedy for infant colic and gas. Modern alcohol free formulas contain ginger, fennel, and chamomile. Widely used and generally well tolerated.',
              warning: 'Use only alcohol free and sodium bicarbonate free formulas. Not for infants under 1 month. Consult your pediatrician first.',
              safeUse: 'Mommy\'s Bliss and Zarbees make widely trusted alcohol free gripe water formulas. Give as directed on the package.'
            },
            {
              name: 'Dietary Changes for Breastfeeding Parents',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Some colicky babies react to foods in breastmilk. Common culprits include dairy, caffeine, cruciferous vegetables, and soy.',
              warning: '',
              safeUse: 'Try eliminating one food group at a time for 2 weeks to identify triggers. Dairy elimination is most commonly effective. Keep a food diary alongside baby\'s crying patterns.'
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
            { name: 'BioGaia Protectis Drops', desc: 'Lactobacillus reuteri DSM 17938. The most clinically studied probiotic for infant colic. Multiple clinical trials show significant crying reduction.', rating: '🟢 Cleaner choice' },
            { name: 'Mommy\'s Bliss Gripe Water', desc: 'Alcohol free gripe water with ginger and fennel. No artificial colors or flavors. One of the most trusted gripe water brands.', rating: '🟢 Cleaner choice' },
            { name: 'Little Remedies Gas Relief Drops', desc: 'Simethicone drops. Drug free gas relief for infants. No artificial colors or flavors in the unflavored version.', rating: '🟢 Cleaner choice' },
            { name: 'Zarbees Baby Soothing Drops', desc: 'Agave and chamomile based soothing drops. No alcohol, no artificial sweeteners, no honey. Safe from 2 months.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Try first:</strong> Bicycle legs, swaddling, and white noise — free and evidence based</li>
            <li>✅ <strong>Try:</strong> The football hold with gentle back rubbing</li>
            <li>✅ <strong>Look for:</strong> Simethicone infant gas drops if gas seems to be the issue</li>
            <li>🔴 <strong>Never:</strong> Give honey to infants under 1 year in any form</li>
            <li>🔴 <strong>Never:</strong> Give gripe water containing alcohol or sodium bicarbonate</li>
            <li>💚 <strong>Remember:</strong> Put baby down safely and take a break if you feel overwhelmed. Colic passes.</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}