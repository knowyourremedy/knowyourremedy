import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function GrowingPains() {
  return (
    <RemedyPageLayout
      title="Growing Pains"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if pain is in a specific joint rather than the muscles, is present in the morning, causes limping, is accompanied by fever, swelling, redness, or rash, or if the child is consistently waking in severe pain."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency is strongly linked to muscle cramps and growing pains. Glycinate form is the most bioavailable and gentlest on the stomach for children.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Warm Compress or Heating Pad',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Applying warmth to aching legs increases blood flow and relaxes muscles. One of the most effective immediate relief options for growing pains.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier. Do not use on very young children without supervision.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Gentle Massage',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Massaging the affected muscles increases circulation and releases tension. Many children find this the most comforting intervention for nighttime growing pains.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Magnesium sulfate absorbed through the skin relaxes muscles and reduces cramping. A warm Epsom salt bath before bed can prevent nighttime growing pains.',
          warning: 'Do not use on broken skin. Supervise children in bath.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Vitamin D3',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Vitamin D deficiency is associated with musculoskeletal pain in children. Supplementing to optimal levels may reduce frequency and severity of growing pains.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Fish Oil',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Omega-3 fatty acids reduce systemic inflammation that may contribute to growing pains. Benefits build over weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted lavender oil massaged into aching legs has analgesic and relaxing properties that can provide comfort during growing pain episodes.',
          warning: 'Always dilute properly for age. Maximum 1% dilution for children under 6.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief. Safe for children at appropriate weight based doses. Look for the dye free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Children\'s Advil Dye Free',
          desc: 'Ibuprofen suspension without artificial dyes. Anti-inflammatory properties make it more effective than acetaminophen for muscle pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects. Good option for older children.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand children\'s acetaminophen at the appropriate weight based dose. Available at any pharmacy.',
          note: 'Always dose by weight not age. Use the dosing chart on the package.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand children\'s ibuprofen suspension for kids over 6 months. More effective than acetaminophen for muscle pain.',
          note: 'Not for infants under 6 months. Take with food to protect the stomach.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Warm bath and massage',
          desc: 'A warm bath followed by gentle leg massage is free, always available, and one of the most effective interventions for growing pains.',
          note: 'Most effective when done as part of a consistent bedtime routine for children prone to nighttime growing pains.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}