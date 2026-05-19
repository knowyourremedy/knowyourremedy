import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function BurnsAndSunburn() {
  return (
    <RemedyPageLayout
      title="Burns & Sunburn"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care for any burn larger than 3 inches, burns on the face, hands, feet, genitals, or major joints, deep burns with white or charred skin, chemical or electrical burns, or burns with inhalation injury."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Aloe Vera',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'The most well studied natural remedy for sunburn and minor burns. Reduces inflammation, speeds healing, and provides immediate cooling relief. Use pure gel directly from the plant or a 99% pure product.',
          warning: 'Do not use on deep burns or open wounds. Avoid products with added alcohol which can dry and irritate skin.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Apply after the initial heat has left the burn — usually 24-48 hours. Lauric acid has antimicrobial properties and helps moisturize healing skin.',
          warning: 'Do not apply to fresh burns that are still hot — this traps heat and worsens the burn. Wait until skin has cooled completely.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Has antimicrobial and analgesic properties that support burn healing. Can be applied diluted to minor burns and sunburn for pain relief.',
          warning: 'Always dilute in a carrier oil like coconut or aloe vera gel. Do not apply to blistered or broken skin.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Cool Water Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Run cool (not cold) water over a burn for 10-20 minutes immediately after injury. This is the single most important first step for any burn.',
          warning: 'Never use ice water — it can cause frostbite on top of the burn. Never use butter, toothpaste, or oil on a fresh burn.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Honey (Manuka)',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Manuka honey has strong antimicrobial properties and clinical evidence for promoting wound healing in minor burns. Creates a moist healing environment.',
          warning: 'Use medical grade or manuka honey only. Not for deep burns. Cover with a clean dressing after application.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin E Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Antioxidant that supports skin repair and may reduce scarring when applied during the healing phase.',
          warning: 'Apply only during the healing phase — not on fresh burns. Some people may experience contact dermatitis.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Colloidal Oatmeal Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Especially effective for sunburn covering large areas. Colloidal oatmeal reduces inflammation and itching while soothing irritated skin.',
          safeUse: 'Safe for all ages including infants. Rinse tub after use — oatmeal makes surfaces slippery.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Solarcaine (Benzocaine Spray)',
          desc: 'Topical anesthetic that numbs sunburn pain on contact. Fast relief but short duration. Avoid on broken skin.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory that addresses the root cause of sunburn pain and redness from the inside. More effective than topical treatments for severe sunburn.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Cortizone-10 (Hydrocortisone)',
          desc: 'Low potency topical steroid that reduces inflammation and itching. Use sparingly and not on broken or blistered skin.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Aquaphor Healing Ointment',
          desc: 'Petroleum based ointment that creates a protective barrier and keeps healing skin moisturized. Good for the later stages of burn healing.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Cool water and a clean cloth',
          desc: 'Run cool water over the burn for 10-20 minutes. A clean damp cloth can be applied to sunburn for ongoing relief.',
          note: 'This is always the right first step regardless of what else you have available.',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg for pain and inflammation from sunburn. Take with food.',
          note: 'Avoid if dehydrated from sun exposure — drink water before and with the medication.',
        },
        {
          category: 'Plain unscented moisturizer',
          desc: 'Any fragrance free moisturizing lotion applied to cooled sunburn helps prevent peeling and reduces discomfort.',
          note: 'Avoid products with fragrance, alcohol, or benzocaine on broken or blistered skin.',
        },
      ]}
    />
  )
}