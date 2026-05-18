import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Migraines() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care immediately if you experience the worst headache of your life, a headache that comes on suddenly like a thunderclap, headache with fever and stiff neck, headache with confusion or vision changes, or headache after a head injury. Always consult your doctor for frequent or severe migraines — there are highly effective prescription options available." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Migraines
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#2d4a3e', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          💚 <strong>Migraine vs tension headache:</strong> Migraines cause moderate to severe throbbing pain, usually on one side of the head, often with nausea, light sensitivity, sound sensitivity, and sometimes visual disturbances called aura. They are neurological events, not just bad headaches. Tension headaches cause dull bilateral pressure without these symptoms. Treatment is different for each.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options — Prevention
        </h2>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: '#5a7a6e', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          These remedies work best taken consistently over time to reduce migraine frequency and severity rather than treating an active attack.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The most clinically studied natural migraine preventive. Up to 50 percent of migraine sufferers are magnesium deficient. Multiple clinical trials show significant reduction in migraine frequency.',
              warning: 'High doses can cause loose stools. Consult your doctor if you have kidney disease.',
              safeUse: 'Take 400 to 600mg daily. Glycinate form is best tolerated. Takes 2 to 3 months of consistent use to see full benefit. One of the most evidence backed natural migraine supplements available.'
            },
            {
              name: 'Riboflavin Vitamin B2',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'High dose riboflavin is clinically proven to reduce migraine frequency by up to 50 percent in clinical trials. One of the most evidence backed natural migraine preventives.',
              warning: 'Will turn urine bright yellow — this is harmless. Not recommended during pregnancy without doctor approval.',
              safeUse: 'Take 400mg daily. Takes 3 months of consistent use to see full benefit. Available at most health food stores.'
            },
            {
              name: 'Coenzyme Q10',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinical trials show CoQ10 reduces migraine frequency significantly. Supports mitochondrial energy production in brain cells.',
              warning: 'May interact with blood thinners. Consult your doctor if on medications.',
              safeUse: 'Take 300mg daily in divided doses with meals. Ubiquinol form is the most bioavailable. Takes 3 months to assess effectiveness.'
            },
            {
              name: 'Butterbur',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The most clinically studied herbal migraine preventive. Multiple high quality clinical trials show significant reduction in migraine frequency. Endorsed by the American Academy of Neurology.',
              warning: 'Only use PA free butterbur — unpurified butterbur contains pyrrolizidine alkaloids that can damage the liver. Look for Petadolex brand which is the clinically studied PA free form. Not for use during pregnancy.',
              safeUse: 'Take 75mg twice daily of PA free butterbur. Petadolex is the most trusted brand. Takes 1 to 2 months to see full effect.'
            },
            {
              name: 'Feverfew',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Traditional herbal migraine preventive with clinical evidence supporting reduction in migraine frequency and severity.',
              warning: 'Not recommended during pregnancy. Do not stop suddenly after long term use — rebound headaches can occur. May interact with blood thinners.',
              safeUse: 'Take 50 to 100mg of standardized extract daily. MigraFew is a widely trusted brand. Most effective when taken consistently not just during attacks.'
            },
            {
              name: 'Omega 3 Fish Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Reduces neuroinflammation associated with migraines. Growing evidence for reducing migraine frequency with consistent supplementation.',
              warning: 'May interact with blood thinners.',
              safeUse: 'Take 2 to 4 grams of EPA and DHA combined daily. Nordic Naturals is a widely trusted brand. Most effective when combined with reducing omega 6 intake from processed foods.'
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
          🌿 Natural Options — Acute Relief
        </h2>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9rem', color: '#5a7a6e', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          These remedies are used during an active migraine attack for relief.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Clinically proven to reduce migraine pain when applied to the forehead and temples. As effective as acetaminophen in some studies.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Apply diluted to temples, forehead, and back of neck at first sign of migraine. Reapply every 30 minutes as needed.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Inhaling lavender oil during a migraine attack has clinical evidence for reducing pain intensity and duration.',
              warning: 'Mix with a carrier oil before applying to skin.',
              safeUse: 'Inhale directly from the bottle or apply diluted to temples. A 2012 clinical trial showed significant migraine relief from lavender inhalation within 15 minutes.'
            },
            {
              name: 'Ginger',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinical trial showed ginger powder was as effective as sumatriptan for acute migraine relief with fewer side effects. Anti-inflammatory and anti-nausea.',
              warning: 'High doses may thin blood. Consult your doctor if on blood thinners.',
              safeUse: 'Take at first sign of migraine. Fresh ginger tea, ginger capsules, or ginger chews all work. Most effective when taken at the very earliest sign of an attack.'
            },
            {
              name: 'Dark Room and Sleep',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Light and sound sensitivity during migraines make a dark quiet room one of the most effective ways to manage an active attack. Sleep often ends a migraine.',
              warning: '',
              safeUse: 'At the first sign of a migraine retreat to a dark quiet room if possible. An eye mask and earplugs help when a fully dark room is not available.'
            },
            {
              name: 'Cold and Hot Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Cold compress to the forehead and temples numbs pain. Hot compress or heating pad to the back of the neck reduces muscle tension that amplifies migraine pain.',
              warning: '',
              safeUse: 'Apply a cold pack to the forehead and a warm pack to the back of the neck simultaneously. Many migraine sufferers find this combination more effective than either alone.'
            },
            {
              name: 'Caffeine',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Small amounts of caffeine at migraine onset constrict dilated blood vessels and enhance pain relief. This is why caffeine is included in Excedrin Migraine.',
              warning: 'Only effective if you are not a regular caffeine consumer or have not had caffeine that day. Regular caffeine use can cause rebound headaches when caffeine is skipped.',
              safeUse: 'One cup of coffee or tea at the very first sign of a migraine. Do not use this strategy more than 2 days per week or caffeine rebound headaches will develop.'
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
            { name: 'Excedrin Migraine', desc: 'Acetaminophen, aspirin, and caffeine. The combination is clinically proven for migraine relief. One of the most effective OTC migraine options available.', rating: '🟡 Acceptable' },
            { name: 'Advil Migraine', desc: 'Ibuprofen 200mg in liquid gel form. Faster absorption than tablets. Effective for mild to moderate migraines especially when taken at first sign.', rating: '🟡 Acceptable' },
            { name: 'Sumatriptan Generic', desc: 'Prescription triptan medication. The most effective acute migraine treatment available. Ask your doctor — it is now available as a generic and quite affordable.', rating: '🟢 Most effective — prescription required' },
            { name: 'Nurtec ODT Generic', desc: 'CGRP antagonist. Newer class of migraine medication that both treats acute attacks and prevents future ones. Requires prescription but highly effective for chronic migraine.', rating: '🟢 Most effective — prescription required' },
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
            <li>✅ <strong>At first sign:</strong> Dark quiet room, cold compress to forehead, peppermint oil to temples</li>
            <li>✅ <strong>Look for:</strong> Excedrin Migraine or plain ibuprofen taken as early as possible</li>
            <li>✅ <strong>Consider:</strong> Talking to your doctor about triptans if migraines are frequent — they are life changing for many sufferers</li>
            <li>🔴 <strong>Avoid:</strong> Pain relievers more than 10 days per month — causes medication overuse headache</li>
            <li>🔴 <strong>Avoid:</strong> Bright screens and loud environments during an active attack</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}