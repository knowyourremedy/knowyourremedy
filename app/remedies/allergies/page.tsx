import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Allergies() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care immediately if you experience difficulty breathing, swelling of the throat or tongue, severe hives, or signs of anaphylaxis. Always consult your doctor for severe or worsening allergies." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Seasonal Allergies
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 2rem 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
          🚨 <strong>Anaphylaxis warning:</strong> Difficulty breathing, throat swelling, sudden severe hives, or dizziness after exposure to an allergen — call 911 immediately. Use an epinephrine auto injector if available. Do not wait to see if symptoms improve.
        </div>

        <OilKey />

        <h2 style={{ fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Local Raw Honey',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Contains trace amounts of local pollen which may help desensitize your immune system over time. Best started before allergy season begins.',
              warning: 'Never give honey to infants under 1 year. Not a substitute for emergency allergy treatment.',
              safeUse: 'Take one tablespoon daily of raw honey sourced from your local area. The closer to your home it is produced the more relevant the pollen exposure.'
            },
            {
              name: 'Quercetin',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'A natural plant flavonoid that stabilizes mast cells and reduces histamine release. One of the most effective natural antihistamines available.',
              warning: 'May interact with some antibiotics and blood thinners. Consult your doctor if on medications.',
              safeUse: 'Take with bromelain for better absorption. Start two to four weeks before allergy season for best results. Available at most health food stores.'
            },
            {
              name: 'Stinging Nettle',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Freeze dried stinging nettle leaf is one of the most studied natural antihistamines. Effective for sneezing, itching, and runny nose.',
              warning: 'May interact with blood thinners, diuretics, and diabetes medications. Consult your doctor if on any of these.',
              safeUse: 'Available as capsules or tea. Look for freeze dried form for best potency. Take at start of symptoms for best results.'
            },
            {
              name: 'Neti Pot',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Saline nasal irrigation physically flushes allergens and mucus from the nasal passages. One of the most effective non-drug allergy treatments available.',
              warning: 'Use only distilled or sterile water — never tap water. Tap water can contain organisms that cause serious infection when introduced into the nasal passages.',
              safeUse: 'Use once or twice daily during allergy season. Clean the neti pot thoroughly after every use. Safe for children over 4 with proper supervision.'
            },
            {
              name: 'Eucalyptus Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Opens nasal passages and reduces congestion. Diffusing eucalyptus can provide significant relief during allergy season.',
              warning: 'Never swallow. Mix with a carrier oil before applying to skin.',
              safeUse: 'Safe to diffuse for adults and children over 10. Do not diffuse around children under 10, infants, or cats.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Natural decongestant and anti-inflammatory. Apply diluted under the nose or on chest to open airways.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Safe to diffuse for adults. Do not diffuse around children under 6 or infants.'
            },
            {
              name: 'Vitamin C',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Natural antihistamine properties. High dose vitamin C reduces histamine levels in the blood. Works best taken consistently throughout allergy season.',
              warning: 'High doses over 2000mg per day can cause digestive upset in some people.',
              safeUse: 'Look for whole food vitamin C from acerola cherry for the cleanest form. Take with meals to reduce stomach upset.'
            },
            {
              name: 'HEPA Air Purifier',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Removes pollen, dust, pet dander, and mold spores from indoor air. One of the highest impact investments for allergy sufferers.',
              warning: '',
              safeUse: 'Run continuously in your bedroom and main living areas during allergy season. Change filters as recommended. Winix and Coway make well rated affordable options.'
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
            { name: 'Claritin Non Drowsy', desc: 'Loratadine only. Non sedating. One of the cleaner antihistamine options with fewer additives than many competitors.', rating: '🟡 Acceptable' },
            { name: 'Zyrtec Dye Free', desc: 'Cetirizine. Look specifically for the dye free version. More effective than Claritin for many people but can cause drowsiness.', rating: '🟡 Acceptable' },
            { name: 'Allegra 180mg', desc: 'Fexofenadine. Non drowsy and one of the least sedating antihistamines available. Fewer drug interactions than other options.', rating: '🟢 Cleaner choice' },
            { name: 'Flonase Sensimist', desc: 'Fluticasone furoate nasal spray. Treats nasal allergy symptoms at the source. Less systemic absorption than oral antihistamines.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Look for:</strong> Single ingredient loratadine or cetirizine tablets with minimal fillers</li>
            <li>✅ <strong>Look for:</strong> Plain saline nasal spray — safe for all ages and drug free</li>
            <li>🔴 <strong>Avoid:</strong> Combination allergy and decongestant products unless you specifically need both</li>
            <li>🔴 <strong>Avoid:</strong> Benadryl as a first choice for daytime use — diphenhydramine causes significant drowsiness and cognitive impairment</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}