import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function Diarrhea() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek emergency care if diarrhea is accompanied by blood, severe abdominal pain, high fever, or signs of dehydration — especially in infants and young children. Dehydration from diarrhea can become life threatening quickly in children under 2." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Diarrhea
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#c0392b', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          🚨 <strong>Watch for dehydration:</strong> In infants — no wet diapers for 6 or more hours, sunken eyes, no tears when crying, dry mouth. In children and adults — extreme thirst, dark urine, dizziness, rapid heartbeat. Seek medical care immediately if these appear.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'BRAT Diet',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Bananas, Rice, Applesauce, Toast. Bland binding foods that slow diarrhea and are easy on the digestive system. The standard first response for diarrhea recovery.',
              warning: '',
              safeUse: 'Start with small amounts and increase as tolerated. Ripe bananas are particularly effective as they contain pectin which helps firm stool. Transition back to normal diet gradually over 24 to 48 hours.'
            },
            {
              name: 'Hydration and Electrolytes',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'The most critical treatment for diarrhea. Replacing fluids and electrolytes lost prevents dangerous dehydration.',
              warning: 'Watch for dehydration signs especially in infants and young children. Seek medical care if dehydration is suspected.',
              safeUse: 'Pedialyte for infants and children. Coconut water for older children and adults. Plain water is better than nothing. Avoid sugary drinks which can worsen diarrhea.'
            },
            {
              name: 'Probiotics',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Clinically shown to reduce duration of infectious diarrhea. Restore healthy gut bacteria disrupted by infection or antibiotics.',
              warning: '',
              safeUse: 'Lactobacillus rhamnosus GG and Saccharomyces boulardii are the most clinically studied strains for diarrhea. Start immediately and take throughout recovery.'
            },
            {
              name: 'Ginger Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and antispasmodic. Reduces intestinal cramping and nausea associated with diarrhea.',
              warning: '',
              safeUse: 'Drink weak ginger tea. Avoid strong ginger which can further stimulate digestion. Add raw honey for additional antimicrobial benefit if over 1 year old.'
            },
            {
              name: 'Chamomile Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Antispasmodic and anti-inflammatory. Calms intestinal cramping and reduces inflammation in the digestive tract.',
              warning: 'Avoid if allergic to ragweed.',
              safeUse: 'Safe for children over 1 year. Drink weak tea. One of the gentlest digestive herbs available.'
            },
            {
              name: 'Psyllium Husk',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Soluble fiber that absorbs excess water in the intestines and helps firm stool. Effective for both diarrhea and constipation.',
              warning: 'Always take with a full glass of water. Do not take without water as it can cause choking or intestinal blockage.',
              safeUse: 'Start with a small amount and work up. Not recommended for children under 6 without doctor guidance. Metamucil is the most widely available brand.'
            },
            {
              name: 'Activated Charcoal',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Binds to toxins and pathogens in the digestive tract. Most effective for diarrhea caused by food poisoning or toxin exposure.',
              warning: 'Do not take within 2 hours of medications or supplements. Not for long term use.',
              safeUse: 'Take with a large glass of water at onset of symptoms. Use only for acute episodes.'
            },
            {
              name: 'DigestZen or Zengest',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Applied topically to the abdomen helps reduce cramping and digestive spasm associated with diarrhea.',
              warning: 'Mix with a carrier oil before applying to skin. Never swallow topical grade oil blends.',
              safeUse: 'Mix with coconut or jojoba oil and massage gently on the abdomen in a clockwise direction.'
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
            { name: 'Imodium A-D Caplets', desc: 'Loperamide only. Slows intestinal movement. Caplets have fewer additives than the liquid. Use for acute diarrhea only — not for diarrhea caused by infection.', rating: '🟡 Acceptable' },
            { name: 'Pepto Bismol Caplets', desc: 'Bismuth subsalicylate. Caplets have fewer additives than the liquid. Effective for traveler\'s diarrhea and food poisoning related diarrhea.', rating: '🟡 Acceptable' },
            { name: 'Pedialyte', desc: 'Oral rehydration solution. The most important treatment for diarrhea in children. Restores fluids and electrolytes safely.', rating: '🟢 Cleaner choice' },
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
            <li>✅ <strong>Most important:</strong> Stay hydrated — water and electrolyte drinks above everything else</li>
            <li>✅ <strong>Look for:</strong> Plain loperamide caplets for acute diarrhea in adults</li>
            <li>✅ <strong>Look for:</strong> Bananas, plain rice, plain crackers — the BRAT diet basics</li>
            <li>🔴 <strong>Avoid:</strong> Dairy, fatty foods, high fiber foods, caffeine, and alcohol until fully recovered</li>
            <li>🔴 <strong>Avoid:</strong> Imodium for diarrhea caused by infection or food poisoning with fever — it can trap the toxin in your system</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}