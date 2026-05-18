import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Insomnia() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Chronic insomnia lasting more than three months may indicate an underlying condition requiring professional evaluation. Always consult your doctor before starting any new supplement especially if you are pregnant, nursing, or taking medications." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Insomnia and Sleep Support
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
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'One of the most effective natural sleep supplements. Magnesium deficiency is extremely common and directly linked to poor sleep quality and restless legs.',
              warning: 'High doses can cause loose stools. Start with a lower dose and work up. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 200 to 400mg about an hour before bed. Glycinate form is the gentlest on the stomach and most bioavailable. Look for brands without artificial fillers or colors.'
            },
            {
              name: 'Melatonin',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The body\'s natural sleep hormone. Most effective for resetting the sleep cycle rather than forcing sleep. Lower doses work better than higher ones for most people.',
              warning: 'Not recommended for children under 3 without doctor guidance. Do not drive or operate heavy machinery after taking. May interact with blood thinners and immunosuppressants.',
              safeUse: 'Start with 0.5mg to 1mg — most people take far more than needed. Take 30 to 60 minutes before bed. Time release formulas help with staying asleep not just falling asleep.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Clinically studied for sleep improvement. Reduces anxiety and promotes relaxation. One of the safest and most effective oils for sleep support.',
              warning: 'Mix with a carrier oil before applying to skin. A carrier oil is a plain gentle oil like coconut or jojoba oil.',
              safeUse: 'Apply diluted to wrists and temples before bed. Safe to diffuse — one of the gentlest oils around children and most pets. Diffuse in the bedroom 30 minutes before sleep.'
            },
            {
              name: 'Chamomile Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Contains apigenin which binds to sleep receptors in the brain. Gentle and effective for mild insomnia and anxiety related sleep issues.',
              warning: 'Avoid if allergic to ragweed.',
              safeUse: 'Drink one strong cup 30 to 45 minutes before bed. Look for pure chamomile without added flavors. Celestial Seasonings Sleepytime is a widely available and trusted option.'
            },
            {
              name: 'Valerian Root',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'One of the most studied herbal sleep aids. Works on the same receptors as anti-anxiety medications but without the dependency risk.',
              warning: 'Not recommended during pregnancy or for children under 3. May cause vivid dreams in some people. Do not combine with alcohol or sedating medications.',
              safeUse: 'Take 300 to 600mg about an hour before bed. Effects build over one to two weeks of consistent use. Available as capsules or tea — capsules are easier to dose.'
            },
            {
              name: 'Ashwagandha',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Adaptogenic herb that reduces cortisol and stress. Particularly effective for people whose insomnia is driven by anxiety or an overactive mind.',
              warning: 'Not recommended during pregnancy. May interact with thyroid medications and immunosuppressants. Consult your doctor if on medications.',
              safeUse: 'Take 300 to 600mg before bed. KSM-66 and Sensoril are the most studied and trusted forms. Effects build over several weeks of consistent use.'
            },
            {
              name: 'Cedarwood Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Contains cedrol which has a natural sedative effect. Often overlooked but one of the most effective oils specifically for sleep.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil.',
              safeUse: 'Apply diluted to the back of the neck or bottoms of feet before bed. Safe to diffuse for adults and generally well tolerated around children over 2.'
            },
            {
              name: 'Sleep Hygiene',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'No supplement works as well as consistent sleep habits. Same bedtime every night, dark and cool room, no screens 30 minutes before bed, and no caffeine after 2pm.',
              warning: '',
              safeUse: 'Blackout curtains, white noise machines, and keeping your room between 65 and 68 degrees Fahrenheit are among the highest impact sleep improvements available.'
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

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Unisom SleepTabs', desc: 'Doxylamine succinate only. One of the most effective OTC sleep aids. Also the active ingredient in some pregnancy nausea medications.', rating: '🟡 Acceptable' },
            { name: 'ZzzQuil Pure Zzzs', desc: 'Melatonin based with botanicals. Fewer synthetic ingredients than most OTC sleep aids. Liquid gel form has fewer additives than gummies.', rating: '🟡 Acceptable' },
            { name: 'Natrol Melatonin Fast Dissolve', desc: 'Melatonin only. No artificial colors in the plain variety. Fast dissolve format works quickly. Available in low doses starting at 1mg.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Look for:</strong> Plain melatonin 1mg or 3mg tablets with minimal fillers</li>
            <li>✅ <strong>Look for:</strong> Plain diphenhydramine sleep aids like Simply Sleep — avoid versions combined with pain relievers unless you need both</li>
            <li>🔴 <strong>Avoid:</strong> Combination sleep and pain products unless you specifically need pain relief</li>
            <li>🔴 <strong>Avoid:</strong> Gummy melatonin — almost always contains artificial colors and sweeteners and doses are often inaccurate</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}