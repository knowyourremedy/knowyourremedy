import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function MusclePain() {
  return (
    <ConditionPageLayoutV2
      title="Muscle Pain"
      subtitle="Muscular soreness · acute or exercise-induced"
      bodySystem="musculoskeletal"
      emergency="Severe sudden muscle pain, weakness or paralysis, pain following significant injury, or dark brown urine after intense exercise (possible rhabdomyolysis) — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · ACR pain guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium is essential for muscle relaxation and recovery. Deficiency causes muscle cramps, spasms, and delayed recovery after exercise. Glycinate form is the most bioavailable and gentlest on the stomach.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          desc: 'Magnesium sulfate absorbed through the skin relaxes muscles and reduces soreness. Soak for 20 minutes in warm water with 2 cups of Epsom salt after exercise or injury.',
          warning: 'Do not use on broken skin.',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          name: 'Arnica (Topical)',
          desc: 'Topical arnica gel reduces muscle soreness, bruising, and inflammation. Multiple clinical studies support its effectiveness for exercise-induced muscle damage.',
          warning: 'External use only. Do not apply to broken skin or open wounds.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Turmeric / Curcumin',
          desc: 'Curcumin reduces exercise-induced muscle damage and speeds recovery. Multiple studies show significant reduction in delayed onset muscle soreness (DOMS) with curcumin supplementation.',
          warning: 'Take with black pepper for up to 2000% better absorption. May interact with blood thinners.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          desc: 'Menthol in peppermint oil produces a cooling analgesic effect on sore muscles.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to sore muscles and massage in. Avoid near eyes and mucous membranes.',
          },
        },
        {
          name: 'Fish Oil (Omega-3)',
          desc: 'EPA and DHA reduce exercise-induced inflammation and muscle damage. Most effective when taken regularly rather than just after exercise.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Heat and Cold Therapy',
          desc: 'Cold in the first 48-72 hours reduces inflammation in acute muscle injuries. Heat after 72 hours increases blood flow and speeds recovery in chronic muscle soreness.',
          warning: 'Never apply ice or heat directly to skin. Use a cloth barrier and limit to 15-20 minutes.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          desc: 'Clinical evidence shows ginger reduces muscle pain and soreness after exercise. Inhibits both COX and LOX inflammatory pathways.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory NSAID that addresses the root cause of muscle pain. More effective than acetaminophen for exercise-induced muscle soreness.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for muscle pain relief when NSAIDs cannot be used. Less effective than ibuprofen for inflammatory muscle pain.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects. Good for localized muscle pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Icy Hot (Menthol/Methyl Salicylate)',
          desc: 'Combination topical analgesic with cooling and warming effects. Effective for temporary muscle pain relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Flexeril (Cyclobenzaprine)',
          desc: 'Prescription muscle relaxant for severe muscle spasm and pain. Causes significant drowsiness. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 200-400mg. Most effective OTC option for muscle pain and inflammation.',
          note: 'Take with food to protect the stomach. Do not exceed 1,200mg per day without physician direction.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store-brand acetaminophen for muscle pain relief when ibuprofen cannot be used.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Heat or cold pack',
          desc: 'Cold for acute injuries in the first 48-72 hours. Heat for chronic soreness after 72 hours. A bag of frozen vegetables wrapped in a cloth works well.',
          note: 'Never apply directly to skin. Limit to 15-20 minute sessions.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}