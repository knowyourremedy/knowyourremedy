import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function SinusCongestion() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if sinus congestion is accompanied by severe headache, high fever, vision changes, stiff neck, or symptoms lasting more than 10 days. These may indicate a sinus infection requiring antibiotic treatment. Always consult your doctor before starting any new supplement." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Sinus Congestion
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
              name: 'Steam Inhalation',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Inhaling steam loosens mucus and opens nasal passages immediately. One of the most effective and accessible sinus relief methods available.',
              warning: 'Keep a safe distance from hot water to avoid burns. Never leave children unattended near hot water.',
              safeUse: 'Boil water, pour into a bowl, drape a towel over your head and breathe deeply for 5 to 10 minutes. Add a few drops of eucalyptus oil for enhanced relief.'
            },
            {
              name: 'Eucalyptus Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'One of the most effective oils for opening airways and relieving sinus congestion. The cineole compound in eucalyptus is clinically studied for sinus relief.',
              warning: 'Mix with a carrier oil before applying to chest or under the nose. Never swallow. Do not apply near face of children under 10.',
              safeUse: 'Add 3 to 5 drops to a bowl of hot water for steam inhalation. Safe to diffuse for adults and children over 10. Do not diffuse around children under 10, infants, or cats.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Menthol in peppermint oil opens nasal passages and provides immediate congestion relief when inhaled.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Apply a tiny amount diluted under the nose or on the chest. Add to steam inhalation for enhanced effect. Safe to diffuse for adults.'
            },
            {
              name: 'Neti Pot',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Saline nasal irrigation physically flushes mucus and irritants from the nasal passages. One of the most effective non-drug sinus treatments available.',
              warning: 'Use only distilled or sterile water — never tap water. Tap water can contain organisms that cause serious infection when introduced into the nasal passages.',
              safeUse: 'Use once or twice daily when congested. Clean the neti pot thoroughly after every use. Safe for children over 4 with proper supervision.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and decongestant properties. Helps thin mucus and reduce sinus inflammation from the inside.',
              warning: '',
              safeUse: 'Drink hot for best results — the steam also helps. Add raw honey and lemon for additional antimicrobial benefit.'
            },
            {
              name: 'Quercetin',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Natural antihistamine that reduces sinus inflammation driven by allergies. One of the best supplements for allergy related congestion.',
              warning: 'May interact with some antibiotics and blood thinners.',
              safeUse: 'Take with bromelain for better absorption. Most effective taken consistently rather than just when symptoms flare.'
            },
            {
              name: 'Apple Cider Vinegar',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Helps thin mucus and balance the body\'s pH. Popular in the natural health community for sinus congestion relief.',
              warning: 'Always dilute — never drink straight. Can damage tooth enamel if not diluted properly.',
              safeUse: 'Mix one tablespoon in 8 ounces of warm water. Drink two to three times daily when congested. Bragg is the most widely trusted brand.'
            },
            {
              name: 'Hydration',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Staying well hydrated thins mucus and helps the body clear congestion naturally. Often overlooked but highly effective.',
              warning: '',
              safeUse: 'Drink warm fluids as much as possible — warm water, herbal teas, and broths are most effective. Avoid alcohol and caffeine which cause dehydration.'
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
            { name: 'Mucinex Plain', desc: 'Guaifenesin only. No added decongestants or antihistamines. Thins and loosens mucus. Look for the plain version not Mucinex D or DM.', rating: '🟢 Cleaner choice' },
            { name: 'Simply Saline Nasal Spray', desc: 'Plain sterile saline solution. Drug free. Safe for all ages including infants. One of the best first line treatments for congestion.', rating: '🟢 Cleaner choice' },
            { name: 'Afrin Original', desc: 'Oxymetazoline nasal spray. Fast and effective but do not use for more than 3 days — causes rebound congestion with extended use.', rating: '🟡 Acceptable — 3 days max' },
            { name: 'Sudafed PE', desc: 'Phenylephrine decongestant. Less effective than pseudoephedrine but available without signing the pharmacy register. Minimal additives in tablet form.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain saline nasal spray — available almost everywhere and completely drug free</li>
            <li>✅ <strong>Look for:</strong> Plain guaifenesin to thin mucus without added decongestants</li>
            <li>🔴 <strong>Avoid:</strong> Afrin or other oxymetazoline sprays for more than 3 days — causes rebound congestion that is worse than the original</li>
            <li>🔴 <strong>Avoid:</strong> Combination cold and sinus products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}