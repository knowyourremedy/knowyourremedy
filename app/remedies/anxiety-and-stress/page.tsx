import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function AnxietyAndStress() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. If you are experiencing severe anxiety, panic attacks, or thoughts of harming yourself please reach out to a mental health professional immediately. Call or text 988 to reach the Suicide and Crisis Lifeline at any time. Always consult your doctor before starting any new supplement especially if you are on medications for anxiety or depression." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Anxiety and Stress
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        {/* Crisis Resource */}
        <div style={{ backgroundColor: '#2d4a3e', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
          💚 <strong>If you are in crisis:</strong> Call or text <strong>988</strong> to reach the Suicide and Crisis Lifeline. Free, confidential, available 24 hours a day seven days a week. You do not have to be suicidal to call — anxiety and panic attacks qualify.
        </div>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Ashwagandha',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'One of the most studied adaptogens for stress and anxiety. Clinically shown to reduce cortisol levels and improve stress response over time.',
              warning: 'Not recommended during pregnancy. May interact with thyroid medications and immunosuppressants. Consult your doctor if on any medications.',
              safeUse: 'Take 300 to 600mg daily. KSM-66 and Sensoril are the most clinically studied forms. Effects build over two to four weeks of consistent use.'
            },
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is directly linked to increased anxiety and stress response. Glycinate form crosses the blood brain barrier and has a calming effect.',
              warning: 'High doses can cause loose stools. Start low and work up. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 200 to 400mg daily. Can be taken morning or evening. One of the safest and most widely recommended supplements for anxiety.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Clinically studied for anxiety reduction. Silexan is a patented oral lavender oil shown in clinical trials to be as effective as some prescription anxiety medications.',
              warning: 'For topical use mix with a carrier oil before applying to skin. For oral use only purchase lavender oil with a Supplement Facts panel on the label.',
              safeUse: 'Apply diluted to wrists and temples. Safe to diffuse and one of the gentlest oils around children and most pets. Calm by Nature Made contains Silexan if you want the clinically studied oral form.'
            },
            {
              name: 'L-Theanine',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'An amino acid found naturally in green tea. Promotes calm focus without sedation. One of the best studied and safest natural anxiety supplements available.',
              warning: 'Generally very well tolerated. May enhance the effects of sedating medications.',
              safeUse: 'Take 100 to 200mg as needed or daily. Works well combined with caffeine to reduce jitteriness. Safe for most ages including teenagers.'
            },
            {
              name: 'Passionflower',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Traditionally used for anxiety and sleep. Works on GABA receptors similar to anti-anxiety medications but without dependency risk.',
              warning: 'Not recommended during pregnancy. May enhance sedating medications. Do not combine with alcohol.',
              safeUse: 'Available as tea, tincture, or capsule. Most effective taken consistently rather than just when anxious.'
            },
            {
              name: 'Lemon Balm',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Gentle calming herb with good clinical evidence for mild anxiety and stress. Works well combined with valerian or passionflower.',
              warning: 'May interact with thyroid medications. Consult your doctor if on thyroid treatment.',
              safeUse: 'Safe for children and widely available as tea. Melissa officinalis is the botanical name to look for on labels.'
            },
            {
              name: 'Bergamot Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Citrus oil with significant clinical evidence for reducing anxiety and stress when inhaled. One of the most effective oils specifically studied for emotional wellbeing.',
              warning: 'Mix with a carrier oil before applying to skin. Bergamot causes photosensitivity — do not apply to skin that will be exposed to sunlight. Never swallow topical grade oil.',
              safeUse: 'Safe to diffuse for adults and children over 2. One of the best oils to diffuse during stressful work or study periods.'
            },
            {
              name: 'Breathwork',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Box breathing and 4-7-8 breathing activate the parasympathetic nervous system and reduce acute anxiety faster than any supplement. Free and available anywhere.',
              warning: '',
              safeUse: 'Box breathing — inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4 times. 4-7-8 breathing — inhale for 4, hold for 7, exhale for 8. Both are clinically validated for acute anxiety reduction.'
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
            { name: 'Buspar Generic', desc: 'Buspirone. Non addictive prescription anxiety medication. Requires a doctor visit but worth asking about if anxiety is significantly impacting your life.', rating: '🟡 Prescription required' },
            { name: 'Nature Made Calm', desc: 'Contains Silexan — the clinically studied oral lavender oil. Available OTC. One of the few mainstream products with genuine clinical evidence behind it.', rating: '🟢 Cleaner choice' },
            { name: 'Olly Goodbye Stress', desc: 'GABA, L-Theanine, and lemon balm blend. Fewer artificial ingredients than most mainstream stress supplements. Gummy form contains some additives.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Plain chamomile tea — available almost everywhere and genuinely effective for mild anxiety</li>
            <li>✅ <strong>Try first:</strong> Box breathing or 4-7-8 breathing — free, immediate, and clinically effective</li>
            <li>🔴 <strong>Avoid:</strong> Alcohol as a stress reliever — it temporarily reduces anxiety but worsens it significantly the next day</li>
            <li>🔴 <strong>Avoid:</strong> Benadryl for anxiety — diphenhydramine is sometimes misused for anxiety but causes cognitive impairment and rebound anxiety</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}