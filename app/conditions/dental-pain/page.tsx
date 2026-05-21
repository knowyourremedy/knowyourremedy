import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function DentalPain() {
  return (
    <RemedyPageLayout
      title="Dental Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency dental or medical care if you have severe swelling of the face, jaw, or neck, difficulty swallowing or breathing, fever with dental pain, or a knocked out permanent tooth."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Clove Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Eugenol in clove oil is a natural anesthetic and antiseptic. One of the most studied natural remedies for dental pain. Apply a small amount diluted in carrier oil directly to the affected tooth and gum.',
          warning: 'Must be diluted — undiluted clove oil can burn gum tissue. Apply with a cotton ball. Not for infants under 2.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Garlic',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Allicin in garlic has powerful antimicrobial properties. Crush a garlic clove and apply the paste directly to the affected tooth, or chew raw garlic slowly on the affected side.',
          warning: 'May cause temporary burning sensation. Raw garlic is very potent — start with a small amount.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Salt Water Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Warm salt water reduces inflammation, kills bacteria, and promotes healing. One of the safest and most effective first responses to any dental pain.',
          safeUse: 'Safe for all ages. Rinse for 30 seconds and spit — do not swallow.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea Bag',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A slightly warm or cooled peppermint tea bag pressed against the affected area provides mild numbing and anti-inflammatory relief.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Apply a cold pack to the outside of the cheek for 20 minutes on and 20 minutes off. Reduces swelling and numbs the area.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydrogen Peroxide Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Diluted hydrogen peroxide (1.5% solution or 3% mixed 50/50 with water) kills bacteria and reduces inflammation around infected teeth.',
          warning: 'Never swallow. Do not use on children under 12 without guidance. Spit completely after rinsing.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Turmeric Paste',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Mix turmeric powder with a small amount of coconut oil to make a paste. Apply directly to the affected tooth and gum for anti-inflammatory and antimicrobial relief.',
          warning: 'Will stain teeth and clothing yellow temporarily.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID that is more effective than acetaminophen for dental pain because it addresses the inflammatory component.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief. Can be alternated with ibuprofen every 3-4 hours for better coverage than either alone.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Orajel (Benzocaine)',
          desc: 'Topical anesthetic gel that numbs the affected area on contact. Fast but short lasting relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Anbesol (Benzocaine)',
          desc: 'Similar to Orajel. Topical anesthetic for temporary dental pain relief. Do not use in children under 2.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 400mg is the most effective OTC option for dental pain. Take with food.',
          note: 'Alternating ibuprofen and acetaminophen every 3-4 hours provides better pain control than either alone.',
        },
        {
          category: 'Generic benzocaine gel',
          desc: 'Store brand oral anesthetic gel. Apply directly to the affected tooth and gum with a cotton swab for immediate numbing.',
          note: 'Effects last 15-30 minutes only. This is a temporary measure — see a dentist as soon as possible.',
        },
        {
          category: 'Salt water rinse',
          desc: 'Half a teaspoon of salt in 8oz of warm water. Free and available anywhere. Rinse for 30 seconds every few hours.',
          note: 'Will not cure an infection but reduces bacteria and inflammation significantly.',
        },
      ]}
    />
  )
}