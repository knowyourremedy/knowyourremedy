import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function ItchyEyes() {
  return (
    <ConditionPageLayoutV2
      title="Itchy Eyes"
      subtitle="Allergic conjunctivitis · ocular irritation"
      bodySystem="eye"
      emergency="Sudden vision loss, severe eye pain, chemical exposure to the eye, or a visibly injured eye or embedded object — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAO clinical guidelines · AAAAI"
      naturalItems={[
        {
          name: 'Cold Compress',
          desc: 'A cold damp cloth placed over closed eyes reduces inflammation, constricts blood vessels, and immediately relieves itching. One of the safest and most effective first responses.',
          warning: 'Use a clean cloth each time to avoid introducing bacteria.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Saline Eye Rinse',
          desc: 'Rinsing eyes with sterile saline solution flushes out allergens, dust, and irritants that cause itching. Use preservative-free saline for sensitive eyes.',
          warning: 'Use only sterile saline — never tap water directly in the eyes.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea Compress',
          desc: 'A cooled chamomile tea bag placed over closed eyes has anti-inflammatory properties that reduce itching and irritation.',
          warning: 'Avoid if you have ragweed or daisy family allergies — chamomile may worsen symptoms. Use only cooled tea bags never hot.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Rose Water',
          desc: 'Pure rose water has mild anti-inflammatory and soothing properties. Apply with a clean cotton pad over closed eyes for relief from itching and irritation.',
          warning: 'Use only pure distilled rose water without additives or alcohol. Ensure it is sterile before use near eyes.',
          ageRange: 'Age 6+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          desc: 'Natural flavonoid that stabilizes mast cells and reduces histamine release. Works best as a preventive taken regularly before and during allergy season.',
          warning: 'May interact with certain antibiotics and blood thinners. Take with food.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Omega-3 Fish Oil',
          desc: 'EPA and DHA reduce inflammatory response in the eyes and may help with chronic dry and itchy eyes associated with allergies.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Zaditor / Alaway (Ketotifen)',
          desc: 'OTC antihistamine eye drops specifically formulated for allergic eye itching. Fast-acting and long-lasting — twice daily dosing. One of the most effective OTC options.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 3+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Claritin / Zyrtec / Allegra (Oral)',
          desc: 'Oral second-generation antihistamines that reduce allergic response throughout the body including the eyes. Good for combined nasal and eye allergy symptoms.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Visine-A (Naphazoline/Pheniramine)',
          desc: 'Combination decongestant and antihistamine eye drops. Fast relief but rebound redness can occur with regular use.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Pataday (Olopatadine)',
          desc: 'Antihistamine eye drops. Once daily dosing. Very effective for moderate to severe allergic eye symptoms.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Cold water splash',
          desc: 'Splashing cold water on closed eyes or using a cold wet cloth provides immediate relief from itching and flushes surface allergens.',
          note: 'Free and always available. Safe for all ages as a first response.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ketotifen eye drops',
          desc: 'Store-brand antihistamine eye drops with ketotifen as the active ingredient. Same as Zaditor at a fraction of the cost.',
          note: 'Remove contact lenses before use and wait 10 minutes before reinserting.',
          ageRange: 'Age 3+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic oral antihistamine',
          desc: 'Store-brand loratadine or cetirizine for allergic eye symptoms combined with other allergy symptoms.',
          note: 'Once daily dosing. Cetirizine may cause mild drowsiness in some people.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
    />
  )
}