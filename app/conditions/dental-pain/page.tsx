import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function DentalPain() {
  return (
    <ConditionPageLayoutV2
      title="Dental Pain"
      subtitle="Tooth or gum pain · localized inflammation"
      bodySystem="dental"
      emergency="Severe swelling of the face, jaw, or neck, difficulty swallowing or breathing, fever with dental pain, or a knocked-out permanent tooth — seek emergency dental or medical care."
      dosageLink="/dosage-calculator"
      sources="ADA · NIH NCCIH · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Clove Oil',
          desc: 'Eugenol in clove oil is a natural anesthetic and antiseptic. One of the most studied natural remedies for dental pain.',
          oilSlug: 'clove-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1 drop heavily diluted (4 tsp carrier oil for kids, 2 tsp for adults) directly to the affected tooth and gum with a cotton swab.',
            warning: 'Undiluted clove oil can burn gum tissue. Not for infants under 2.',
          },
        },
        {
          name: 'Garlic',
          desc: 'Allicin in garlic has powerful antimicrobial properties. Crush a garlic clove and apply the paste directly to the affected tooth, or chew raw garlic slowly on the affected side.',
          warning: 'May cause temporary burning sensation. Raw garlic is very potent — start with a small amount.',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Salt Water Rinse',
          desc: 'Warm salt water reduces inflammation, kills bacteria, and promotes healing. One of the safest and most effective first responses to any dental pain.',
          warning: 'Rinse for 30 seconds and spit — do not swallow.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea Bag',
          desc: 'A slightly warm or cooled peppermint tea bag pressed against the affected area provides mild numbing and anti-inflammatory relief.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          desc: 'Apply a cold pack to the outside of the cheek for 20 minutes on and 20 minutes off. Reduces swelling and numbs the area.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydrogen Peroxide Rinse',
          desc: 'Diluted hydrogen peroxide (1.5% solution or 3% mixed 50/50 with water) kills bacteria and reduces inflammation around infected teeth.',
          warning: 'Never swallow. Do not use on children under 12 without guidance. Spit completely after rinsing.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Turmeric Paste',
          desc: 'Mix turmeric powder with a small amount of coconut oil to make a paste. Apply directly to the affected tooth and gum for anti-inflammatory and antimicrobial relief.',
          warning: 'Will stain teeth and clothing yellow temporarily.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory NSAID that is more effective than acetaminophen for dental pain because it addresses the inflammatory component.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief. Can be alternated with ibuprofen every 3-4 hours for better coverage than either alone.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Orajel (Benzocaine)',
          desc: 'Topical anesthetic gel that numbs the affected area on contact. Fast but short-lasting relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Anbesol (Benzocaine)',
          desc: 'Similar to Orajel. Topical anesthetic for temporary dental pain relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 400mg is the most effective OTC option for dental pain. Take with food.',
          note: 'Alternating ibuprofen and acetaminophen every 3-4 hours provides better pain control than either alone.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic benzocaine gel',
          desc: 'Store-brand oral anesthetic gel. Apply directly to the affected tooth and gum with a cotton swab for immediate numbing.',
          note: 'Effects last 15-30 minutes only. This is a temporary measure — see a dentist as soon as possible.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Salt water rinse',
          desc: 'Half a teaspoon of salt in 8oz of warm water. Free and available anywhere. Rinse for 30 seconds every few hours.',
          note: 'Will not cure an infection but reduces bacteria and inflammation significantly.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}