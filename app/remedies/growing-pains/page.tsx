import RemedyLayout from '@/components/RemedyLayout'
import RemedyDisclaimer from '@/components/RemedyDisclaimer'
import OilKey from '@/components/OilKey'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import MedicalDisclaimer from '@/components/MedicalDisclaimer'

export default function GrowingPains() {
  return (
    <RemedyLayout>

      <RemedyDisclaimer message="The information on this page is for educational purposes only and is not a substitute for professional medical advice. Seek medical care if pain is in the joints rather than the muscles, is present in the morning, is accompanied by swelling, redness, fever, limping, or rash, or if your child is consistently waking at night with pain. These may indicate a condition other than growing pains requiring diagnosis." />

      <section style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '2.5rem', fontWeight: '700', color: '#2d4a3e', marginBottom: '0.5rem' }}>
          Growing Pains
        </h1>
        <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1.05rem', color: '#5a7a6e', lineHeight: '1.6' }}>
          Safe and comforting options for your child. Natural first, honest always.
        </p>
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>

        <div style={{ backgroundColor: '#2d4a3e', color: '#fff', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.7', fontFamily: 'var(--font-inter), sans-serif' }}>
          💚 <strong>What are growing pains?</strong> Growing pains are real muscle aches that typically occur in the legs — calves, thighs, and behind the knees — in children ages 3 to 12. They usually occur in the late afternoon or evening and are gone by morning. They are not actually caused by growth but by muscle fatigue and overuse during active days.
        </div>

        <OilKey />

        <h2 style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.25rem', color: '#2d4a3e', borderBottom: '2px solid #c8b89a', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          🌿 Natural Options
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              name: 'Leg Massage',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Gentle massage of the affected muscles is one of the most effective and comforting treatments for growing pains. Increases blood flow and releases muscle tension.',
              warning: '',
              safeUse: 'Use gentle but firm strokes along the calves and thighs. Add a carrier oil or lotion for easier massage. Even 5 to 10 minutes provides significant relief.'
            },
            {
              name: 'Heat Therapy',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Warmth relaxes tight muscles and increases blood flow to the affected area. One of the fastest and most effective treatments for growing pain relief.',
              warning: 'Never apply heat directly to a child\'s skin without a barrier. Always check temperature before applying.',
              safeUse: 'Apply a warm not hot heating pad or warm damp cloth to the affected leg for 15 to 20 minutes. A warm bath before bed is also highly effective for children prone to evening growing pains.'
            },
            {
              name: 'Magnesium Glycinate',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Magnesium deficiency is linked to muscle cramping and growing pains. Supplementing with magnesium has been shown to reduce frequency and severity in children.',
              warning: 'Use children\'s appropriate dosing. High doses can cause loose stools. Consult your pediatrician for appropriate dose by weight.',
              safeUse: 'Children\'s magnesium glycinate powder or gummies are widely available. Give in the evening for best results as magnesium has a calming effect that also supports sleep.'
            },
            {
              name: 'Lavender Oil',
              badge: '🟡 Dilute First',
              badgeColor: '#f39c12',
              desc: 'Anti-inflammatory and analgesic. Applied topically during massage enhances pain relief and promotes relaxation before sleep.',
              warning: 'Mix with a carrier oil before applying to child\'s skin. Use less than adult amounts — children need lighter dilution.',
              safeUse: 'Mix 1 drop of lavender oil with a tablespoon of coconut or jojoba oil and use during leg massage. Safe for children over 2. One of the most gentle oils for children.'
            },
            {
              name: 'Peppermint Oil',
              badge: '🔵 External Only',
              badgeColor: '#2980b9',
              desc: 'Cooling and analgesic effect on sore muscles. Provides a pleasant distraction from pain through the cooling sensation.',
              warning: 'Mix with a carrier oil before applying. Use very small amounts for children. Not for children under 6. Never apply near face or chest of young children.',
              safeUse: 'Mix 1 drop with a tablespoon of carrier oil for children 6 and up. Apply to calves and thighs during massage. Do not apply near face.'
            },
            {
              name: 'Stretching',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Regular stretching of the calf and thigh muscles reduces the frequency and severity of growing pains.',
              warning: '',
              safeUse: 'Calf stretches — standing facing a wall, one foot forward, back heel on the floor — held for 30 seconds. Quad stretches — standing on one leg holding the other ankle behind. Do these before bed on active days.'
            },
            {
              name: 'Vitamin D',
              badge: '🟢 Internal Only',
              badgeColor: '#27ae60',
              desc: 'Vitamin D deficiency is associated with muscle pain and growing pains in children. Many children are deficient especially in northern climates.',
              warning: 'Consult your pediatrician for appropriate dosing by age and weight.',
              safeUse: 'Vitamin D3 drops or gummies are widely available for children. Most pediatricians recommend 400 to 1000 IU daily depending on age and sun exposure.'
            },
            {
              name: 'Reassurance and Comfort',
              badge: '🏠 Home Remedy',
              badgeColor: '#7f8c8d',
              desc: 'Growing pains are scary for children who do not understand what is happening. Calm reassurance that the pain is normal and will pass is genuinely therapeutic.',
              warning: '',
              safeUse: 'Tell your child what growing pains are, that many children experience them, and that they always go away by morning. Physical comfort — holding, rubbing, being present — significantly reduces perceived pain in children.'
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
            { name: 'Childrens Tylenol Dye Free', desc: 'Acetaminophen for significant pain. Look specifically for the dye free version. Follow weight based dosing on the package.', rating: '🟢 Cleaner choice' },
            { name: 'Childrens Motrin Dye Free', desc: 'Ibuprofen. Anti-inflammatory properties address muscle inflammation. Look for dye free version. Only for children 6 months and older.', rating: '🟢 Cleaner choice' },
            { name: 'Biofreeze Gel', desc: 'Menthol based topical pain reliever. Apply to sore leg muscles for cooling relief. For children 12 and older.', rating: '🟡 Acceptable' },
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
            <li>✅ <strong>Try first:</strong> Leg massage and heat — free and highly effective</li>
            <li>✅ <strong>Try:</strong> Warm bath before bed on active days to prevent evening pain</li>
            <li>✅ <strong>Look for:</strong> Dye free children\'s acetaminophen or ibuprofen for significant pain</li>
            <li>🔴 <strong>See a doctor if:</strong> Pain is in the joints, present in the morning, or accompanied by swelling, fever, or limping</li>
            <li>💚 <strong>Remember:</strong> Your presence and reassurance is genuinely therapeutic for children in pain</li>
          </ul>
        </div>

        <AffiliateDisclosure />
        <MedicalDisclaimer />
      </section>
    </RemedyLayout>
  )
}