import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function GrowingPains() {
  return (
    <ConditionPageLayoutV2
      title="Growing Pains"
      subtitle="Nighttime muscle aches · childhood growth phase"
      bodySystem="musculoskeletal"
      emergency="Pain in a specific joint (not muscles), morning pain, limping, fever, swelling, redness, rash, or a child consistently waking in severe pain — seek medical care."
      dosageLink="/dosage-calculator"
      sources="AAP guidelines · NIH NCCIH · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency is strongly linked to muscle cramps and growing pains. Glycinate form is the most bioavailable and gentlest on the stomach for children.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Warm Compress or Heating Pad',
          desc: 'Applying warmth to aching legs increases blood flow and relaxes muscles. One of the most effective immediate relief options for growing pains.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier. Do not use on very young children without supervision.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Gentle Massage',
          desc: 'Massaging the affected muscles increases circulation and releases tension. Many children find this the most comforting intervention for nighttime growing pains.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          desc: 'Magnesium sulfate absorbed through the skin relaxes muscles and reduces cramping. A warm Epsom salt bath before bed can prevent nighttime growing pains.',
          warning: 'Do not use on broken skin. Supervise children in bath.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Vitamin D3',
          desc: 'Vitamin D deficiency is associated with musculoskeletal pain in children. Supplementing to optimal levels may reduce frequency and severity of growing pains.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Fish Oil',
          desc: 'Omega-3 fatty acids reduce systemic inflammation that may contribute to growing pains. Benefits build over weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          desc: 'Diluted lavender oil massaged into aching legs has analgesic and relaxing properties that can provide comfort during growing pain episodes.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply heavily diluted (0.5-1% maximum for kids under 6) and massage into aching legs before bed.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Diffuse in the bedroom for calming sleep support.',
          },
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief. Safe for children at appropriate weight-based doses. Look for the dye-free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Children\'s Advil Dye-Free',
          desc: 'Ibuprofen suspension without artificial dyes. Anti-inflammatory properties make it more effective than acetaminophen for muscle pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects. Good option for older children.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Store-brand children\'s acetaminophen at the appropriate weight-based dose. Available at any pharmacy.',
          note: 'Always dose by weight not age. Use the dosing chart on the package.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand children\'s ibuprofen suspension for kids over 6 months. More effective than acetaminophen for muscle pain.',
          note: 'Take with food to protect the stomach.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Warm bath and massage',
          desc: 'A warm bath followed by gentle leg massage is free, always available, and one of the most effective interventions for growing pains.',
          note: 'Most effective when done as part of a consistent bedtime routine for children prone to nighttime growing pains.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}