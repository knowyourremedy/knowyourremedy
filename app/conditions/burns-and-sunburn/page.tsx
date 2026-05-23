import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function BurnsAndSunburn() {
  return (
    <ConditionPageLayoutV2
      title="Burns and Sunburn"
      subtitle="Thermal or UV skin damage"
      bodySystem="skin"
      emergency="Any burn larger than 3 inches, burns on the face, hands, feet, genitals, or major joints, deep burns with white or charred skin, chemical or electrical burns, or burns with inhalation injury — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · American Burn Association · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Aloe Vera',
          desc: 'The most well-studied natural remedy for sunburn and minor burns. Reduces inflammation, speeds healing, and provides immediate cooling relief. Use pure gel directly from the plant or a 99% pure product.',
          warning: 'Do not use on deep burns or open wounds. Avoid products with added alcohol which can dry and irritate skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          desc: 'Apply after the initial heat has left the burn — usually 24-48 hours. Lauric acid has antimicrobial properties and helps moisturize healing skin.',
          warning: 'Do not apply to fresh burns that are still hot — this traps heat and worsens the burn. Wait until skin has cooled completely.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          desc: 'Has antimicrobial and analgesic properties that support burn healing.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to minor burns and sunburn for pain relief. Mix into aloe vera gel or a carrier oil before applying to skin.',
            warning: 'Do not apply to blistered or broken skin.',
          },
        },
        {
          name: 'Cool Water Rinse',
          desc: 'Run cool (not cold) water over a burn for 10-20 minutes immediately after injury. This is the single most important first step for any burn.',
          warning: 'Never use ice water — it can cause frostbite on top of the burn. Never use butter, toothpaste, or oil on a fresh burn.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Honey (Manuka)',
          desc: 'Manuka honey has strong antimicrobial properties and clinical evidence for promoting wound healing in minor burns. Creates a moist healing environment.',
          warning: 'Use medical-grade or manuka honey only. Not for deep burns. Cover with a clean dressing after application. Never give honey internally to infants under 12 months.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin E Oil',
          desc: 'Antioxidant that supports skin repair and may reduce scarring when applied during the healing phase.',
          warning: 'Apply only during the healing phase — not on fresh burns. Some people may experience contact dermatitis.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Colloidal Oatmeal Bath',
          desc: 'Especially effective for sunburn covering large areas. Colloidal oatmeal reduces inflammation and itching while soothing irritated skin.',
          warning: 'Rinse tub after use — oatmeal makes surfaces slippery.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Solarcaine (Benzocaine Spray)',
          desc: 'Topical anesthetic that numbs sunburn pain on contact. Fast relief but short duration.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Addresses the root cause of sunburn pain and redness from the inside. More effective than topical treatments for severe sunburn.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Cortizone-10 (Hydrocortisone)',
          desc: 'Low-potency topical steroid that reduces inflammation and itching. Use sparingly and not on broken or blistered skin.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Aquaphor Healing Ointment',
          desc: 'Petroleum-based ointment that creates a protective barrier and keeps healing skin moisturized. Good for the later stages of burn healing.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Cool water and a clean cloth',
          desc: 'Run cool water over the burn for 10-20 minutes. A clean damp cloth can be applied to sunburn for ongoing relief.',
          note: 'This is always the right first step regardless of what else you have available.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 200-400mg for pain and inflammation from sunburn. Take with food.',
          note: 'Avoid if dehydrated from sun exposure — drink water before and with the medication.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Plain unscented moisturizer',
          desc: 'Any fragrance-free moisturizing lotion applied to cooled sunburn helps prevent peeling and reduces discomfort.',
          note: 'Avoid products with fragrance, alcohol, or benzocaine on broken or blistered skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}