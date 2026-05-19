import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function MusclePain() {
  return (
    <RemedyPageLayout
      title="Muscle Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if muscle pain is severe and sudden, accompanied by weakness or paralysis, follows a significant injury, or if urine becomes dark brown after intense exercise — this can indicate rhabdomyolysis."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium is essential for muscle relaxation and recovery. Deficiency causes muscle cramps, spasms, and delayed recovery after exercise. Glycinate form is the most bioavailable and gentlest on the stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Magnesium sulfate absorbed through the skin relaxes muscles and reduces soreness. Soak for 20 minutes in warm water with 2 cups of Epsom salt after exercise or injury.',
          warning: 'Do not use on broken skin.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Arnica (Topical)',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Topical arnica gel reduces muscle soreness, bruising, and inflammation. Multiple clinical studies support its effectiveness for exercise induced muscle damage.',
          warning: 'External use only. Do not apply to broken skin or open wounds.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Turmeric / Curcumin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Curcumin reduces exercise induced muscle damage and speeds recovery. Multiple studies show significant reduction in delayed onset muscle soreness (DOMS) with curcumin supplementation.',
          warning: 'Take with black pepper for up to 2000% better absorption. May interact with blood thinners.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Menthol in peppermint oil produces a cooling analgesic effect on sore muscles. Apply diluted in a carrier oil to affected areas and massage in.',
          warning: 'Always dilute before skin application. Avoid near eyes and mucous membranes.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fish Oil (Omega-3)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'EPA and DHA reduce exercise induced inflammation and muscle damage. Most effective when taken regularly rather than just after exercise.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Heat and Cold Therapy',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Cold in the first 48-72 hours reduces inflammation in acute muscle injuries. Heat after 72 hours increases blood flow and speeds recovery in chronic muscle soreness.',
          warning: 'Never apply ice or heat directly to skin. Use a cloth barrier and limit to 15-20 minutes.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Clinical evidence shows ginger reduces muscle pain and soreness after exercise. Inhibits both COX and LOX inflammatory pathways.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID that addresses the root cause of muscle pain. More effective than acetaminophen for exercise induced muscle soreness.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for muscle pain relief when NSAIDs cannot be used. Less effective than ibuprofen for inflammatory muscle pain.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects. Good for localized muscle pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Icy Hot (Menthol/Methyl Salicylate)',
          desc: 'Combination topical analgesic with cooling and warming effects. Effective for temporary muscle pain relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Flexeril (Cyclobenzaprine)',
          desc: 'Prescription muscle relaxant for severe muscle spasm and pain. Causes significant drowsiness. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg. Most effective OTC option for muscle pain and inflammation.',
          note: 'Take with food to protect the stomach. Do not exceed 1,200mg per day without physician direction.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand acetaminophen for muscle pain relief when ibuprofen cannot be used.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Heat or cold pack',
          desc: 'Cold for acute injuries in the first 48-72 hours. Heat for chronic soreness after 72 hours. A bag of frozen vegetables wrapped in a cloth works well.',
          note: 'Never apply directly to skin. Limit to 15-20 minute sessions.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}