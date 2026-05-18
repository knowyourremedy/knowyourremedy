import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function TeethingPain() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your pediatrician before giving any supplement, herb, or remedy to an infant. Teething accompanied by fever over 100.4F, diarrhea, or significant behavior changes should be evaluated by a doctor — these are not normal teething symptoms." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Teething Pain
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Safe options for your little one. Natural first, honest always.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Important safety warnings for infants:</strong> Never use benzocaine teething gels for infants under 2 — the FDA has warned these can cause a dangerous blood condition called methemoglobinemia. Never give honey to infants under 1 year. Never use essential oils directly on infants without diluting heavily and consulting your pediatrician first.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Cold Teething Ring',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Cold numbs gum pain and the pressure provides relief. One of the safest and most effective teething remedies available.',
              warning: 'Never freeze teething rings solid — they become too hard and can damage gums. Refrigerate only.',
              safeUse: 'Refrigerate a teething ring for 30 minutes and give to baby to chew. Supervise at all times. Safe from 3 months and up.'
            },
            {
              name: 'Cold Wet Washcloth',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'A clean wet cloth chilled in the refrigerator provides gum pressure and cold relief. Free and immediately available.',
              warning: 'Always supervise to prevent choking.',
              safeUse: 'Wet a clean washcloth, fold it, and refrigerate for 30 minutes. Let baby chew on the cold cloth. Safe from 3 months and up with supervision.'
            },
            {
              name: 'Gum Massage',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Gentle pressure on the gums provides direct relief. One of the most soothing things a parent can do for a teething baby.',
              warning: 'Wash hands thoroughly before placing fingers in baby\'s mouth.',
              safeUse: 'Using a clean finger, apply gentle firm pressure to the gum where the tooth is erupting. Rub back and forth gently for a minute or two.'
            },
            {
              name: 'Chamomile Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Very weak chamomile tea has a mild calming and anti-inflammatory effect. Used traditionally for teething discomfort.',
              warning: 'Only for babies over 6 months. Use very weak tea — one tea bag steeped for 1 minute in 8 ounces of water, cooled completely. Avoid if family history of ragweed allergy. Consult your pediatrician first.',
              safeUse: 'Offer no more than 2 to 4 ounces of very weak cooled chamomile tea. Can also be used to dampen the teething cloth.'
            },
            {
              name: 'Clove Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural anesthetic used carefully and very diluted can provide gum relief for teething. Must be used extremely carefully in infants.',
              warning: 'Requires very heavy dilution for infant use — no more than 1 drop per 2 tablespoons of coconut oil. Never use undiluted. Never let infant ingest. Consult your pediatrician before use. Not for infants under 6 months.',
              safeUse: 'Apply one tiny drop of heavily diluted clove oil to the gum with your fingertip. Less is more — a tiny amount goes a long way.'
            },
            {
              name: 'Amber Teething Necklaces',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Popular in the natural health community. However the FDA and AAP both warn these pose a serious strangulation and choking hazard and there is no clinical evidence they reduce teething pain.',
              warning: 'The FDA and American Academy of Pediatrics advise against amber teething necklaces due to strangulation and choking risk. We include this so parents can make an informed decision.',
              safeUse: 'If you choose to use one despite the risks, never leave baby unattended and always remove before sleep.'
            },
            {
              name: 'Distraction and Comfort',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Teething discomfort is temporary. Extra cuddles, skin to skin contact, and distraction with toys or activity are highly effective and completely safe.',
              warning: '',
              safeUse: 'Sometimes the best remedy is your arms. Teething typically peaks for a few days around each tooth eruption and then passes.'
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
            { name: 'Childrens Tylenol Dye Free', desc: 'Acetaminophen. For significant teething pain look for the dye free version specifically. Follow weight based dosing on the package.', rating: '🟢 Cleaner choice' },
            { name: 'Childrens Motrin Dye Free', desc: 'Ibuprofen. Only for babies 6 months and older. Look for dye free version. Anti-inflammatory properties particularly helpful for teething.', rating: '🟢 Cleaner choice' },
            { name: 'Camilia Teething Drops', desc: 'Homeopathic liquid drops by Boiron. No benzocaine, no artificial flavors, no dyes. Easy to administer. One of the cleanest mainstream teething products.', rating: '🟢 Cleaner choice' },
            { name: 'Zarbees Naturals Baby Gum Massage Gel', desc: 'Drug free gum massaging gel. Designed for gentle gum massage. No benzocaine, no alcohol, no artificial flavors.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Try first:</strong> Cold wet washcloth — free, safe, and immediately effective</li>
            <li>✅ <strong>Try:</strong> Gentle gum massage with a clean finger</li>
            <li>✅ <strong>Look for:</strong> Dye free infant acetaminophen if pain is significant</li>
            <li>🔴 <strong>Never:</strong> Use benzocaine teething gels for infants under 2 — FDA warning</li>
            <li>🔴 <strong>Never:</strong> Give honey to infants under 1 year in any form</li>
            <li>🔴 <strong>Never:</strong> Use amber teething necklaces during sleep or unsupervised</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}