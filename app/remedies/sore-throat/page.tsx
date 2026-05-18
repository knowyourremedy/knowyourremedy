import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function SoreThroat() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor if your sore throat is severe, lasts more than a week, is accompanied by a high fever, difficulty swallowing or breathing, or if you suspect strep throat. Strep throat requires a doctor visit and is not something to treat at home alone." />

      <section style={{
        textAlign: 'center',
        padding: '2rem 2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700',
          color: '#2d4a3e',
          marginBottom: '0.5rem'
        }}>
          Sore Throat
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#5a7a6e',
          lineHeight: '1.6'
        }}>
          Every option available. Natural first, conventional when you need it. You decide what is right for your situation.
        </p>
      </section>

      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1rem 2rem 2rem'
      }}>

        {/* When to See a Doctor */}
        <div style={{
          backgroundColor: '#c0392b',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          lineHeight: '1.7'
        }}>
          🚨 <strong>See a doctor if:</strong> Your throat has white patches or pus, you have a fever over 101°F, you cannot swallow, you have swollen lymph nodes in your neck, or your sore throat came on suddenly without other cold symptoms. These are signs of strep throat which requires antibiotics.
        </div>

        <OilKey />

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          🌿 Natural Options
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            {
              name: 'Raw Honey',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'One of the most effective natural throat soothers. Antimicrobial properties help fight infection. Coats and soothes irritated tissue.',
              warning: 'Never give honey to infants under 1 year — it can cause infant botulism which is life threatening.',
              safeUse: 'Take a spoonful straight or mix into warm water or tea. Raw local honey has stronger antimicrobial properties than processed honey.'
            },
            {
              name: 'Manuka Honey',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Stronger antimicrobial properties than regular honey. Clinically studied for throat and wound care. Worth the extra cost when you are sick.',
              warning: 'Never give to infants under 1 year.',
              safeUse: 'Look for UMF 10+ or MGO 263+ on the label — these ratings indicate therapeutic strength.'
            },
            {
              name: 'Salt Water Gargle',
              badge: '🏠 Home Remedy',
                badgeColor: '#7f8c8d',
              desc: 'Mix half a teaspoon of plain salt into 8 ounces of warm water. Gargle for 30 seconds then spit. Reduces swelling and kills surface bacteria.',
              warning: '',
              safeUse: 'Safe for all ages who can gargle without swallowing. Do this every few hours for best results. Never swallow the salt water.'
            },
            {
              name: 'Ginger and Lemon Tea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Anti-inflammatory and antimicrobial. Ginger reduces pain and swelling. Lemon cuts through mucus and adds vitamin C.',
              warning: '',
              safeUse: 'Add fresh ginger, lemon juice, and raw honey to hot water. Drink as often as needed. Safe for all ages over 1 year.'
            },
            {
              name: 'Slippery Elm',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'An herb that coats and soothes the throat lining. Used for centuries for sore throat and cough. Available as lozenges, powder, or tea.',
              warning: 'May slow absorption of medications. Take at least one hour apart from any prescription drugs.',
              safeUse: 'Look for lozenges without artificial sweeteners or colors. Throat Coat tea by Traditional Medicinals is a widely trusted option.'
            },
            {
              name: 'Oregano Oil',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Powerful antimicrobial properties. Effective against both bacterial and viral throat infections.',
              warning: 'For internal use only purchase oils with a Supplement Facts panel on the label. The words pure, natural, or therapeutic grade do NOT mean safe to ingest. Not recommended for children under 6 or pregnant women without doctor approval.',
              safeUse: 'Mix 1-2 drops of food grade oregano oil into a glass of water or juice. Do not take straight — it is very strong and can burn.'
            },
            {
              name: 'Thieves Oil Blend',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'A blend of clove, lemon, cinnamon, eucalyptus, and rosemary oils. Widely used in the natural health community for immune support.',
              warning: 'Mix with a carrier oil — a plain gentle oil like coconut or jojoba oil — before applying to throat area, chest, or bottoms of feet. Never swallow topical grade oil. Not safe for children under 6.',
              safeUse: 'Safe to diffuse for adults. Do not diffuse around children under 6 or infants.'
            },
            {
              name: 'Echinacea',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Immune system support. May help reduce duration of throat infections when taken at first sign of symptoms.',
              warning: 'Not recommended for children under 2 or people with autoimmune conditions without doctor guidance.',
              safeUse: 'Available as tea, tincture, or capsule. Look for brands without artificial fillers or sweeteners.'
            },
          ].map((item) => (
            <div key={item.name} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  display: 'inline-block',
                  fontSize: '0.8rem', 
                  color: '#fff',
                  backgroundColor: item.badgeColor,
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                }}>
                  {item.badge}
                </div>
                {item.badgeColor === '#27ae60' && (
                  <span style={{ fontSize: '0.75rem', color: '#c0392b', fontStyle: 'italic' }}>
                    (specific type — see notes below)
                  </span>
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

        {/* Ingestable Oil Label Education */}
        <div style={{
          backgroundColor: '#fff8e1',
          border: '1px solid #f0c040',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ fontWeight: '600', color: '#5a4a00', marginBottom: '0.75rem' }}>🏷️ How to identify a food grade essential oil</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.875rem', color: '#5a4a00', lineHeight: '2' }}>
            <li>✅ Look for a <strong>Supplement Facts panel</strong> on the label — this is the only legally recognized indicator that an oil is certified safe for ingestion</li>
            <li>✅ Trusted ingestable brands include doTERRA, Young Living, and Plant Therapy ingestable lines</li>
            <li>🔴 The words <strong>pure, natural, therapeutic grade,</strong> or <strong>100% pure</strong> do NOT mean safe to ingest</li>
            <li>🔴 No Supplement Facts panel means topical use only regardless of any other claims on the bottle</li>
          </ul>
        </div>

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          🏪 Cleaner Mainstream Options
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { name: 'Chloraseptic Spray Dye Free', desc: 'Numbs throat pain fast. Look specifically for the dye free version. Avoid the original which contains artificial dyes.', rating: '🟡 Acceptable' },
            { name: 'Ricola Natural Herb Drops', desc: 'Made with real Swiss herbs. No artificial colors or flavors. One of the cleanest throat drop options available at most drugstores.', rating: '🟢 Cleaner choice' },
            { name: 'Halls Relief Honey Lemon', desc: 'Menthol based throat drops. Fewer artificial ingredients than most other Halls varieties. Still contains some additives.', rating: '🟡 Acceptable' },
            { name: 'Tylenol Dye Free', desc: 'For throat pain and fever. Look specifically for the dye free version. Single active ingredient acetaminophen.', rating: '🟢 Cleaner choice' },
          ].map((item) => (
            <div key={item.name} style={{
              backgroundColor: '#fff',
              border: '1px solid #e8e0d0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}>
              <div style={{ fontWeight: '600', color: '#2d4a3e', marginBottom: '0.5rem' }}>{item.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.5', marginBottom: '0.5rem' }}>{item.desc}</div>
              <div style={{ fontSize: '0.8rem', color: '#2d4a3e', fontWeight: '600' }}>{item.rating}</div>
            </div>
          ))}
        </div>

        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#2d4a3e',
          borderBottom: '2px solid #c8b89a',
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          ✅ If You Have No Other Choice
        </h2>
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #e8e0d0',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '3rem'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#5a7a6e', lineHeight: '1.7', marginBottom: '1rem' }}>
            If you are at a gas station or convenience store with limited options here is what to look for and what to avoid.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.9rem', color: '#5a7a6e' }}>
            <li>✅ <strong>Look for:</strong> Plain menthol throat drops or lozenges with the fewest ingredients on the label</li>
            <li>✅ <strong>Look for:</strong> Plain acetaminophen or ibuprofen for pain and fever</li>
            <li>🔴 <strong>Avoid:</strong> Throat sprays or drops with Red 40, Blue 1, or artificial sweeteners like saccharin</li>
            <li>🔴 <strong>Avoid:</strong> Combination cold and sore throat products with multiple active ingredients you do not need</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />

      </section>
    </RemedyLayout>
  )
}