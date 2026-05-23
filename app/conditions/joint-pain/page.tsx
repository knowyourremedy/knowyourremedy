import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function JointPain() {
  return (
    <ConditionPageLayoutV2
      title="Joint Pain"
      subtitle="Inflammatory or degenerative joint pain"
      bodySystem="musculoskeletal"
      emergency="Sudden severe swelling, redness and warmth with fever, inability to bear weight, or pain following significant injury or trauma — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · ACR pain guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Turmeric / Curcumin',
          desc: 'One of the most clinically studied natural anti-inflammatories for joint pain. Multiple studies show effectiveness comparable to ibuprofen for osteoarthritis pain without GI side effects. Take with black pepper for up to 2000% better absorption.',
          warning: 'May interact with blood thinners. High doses not recommended in pregnancy.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fish Oil (Omega-3)',
          desc: 'EPA and DHA reduce systemic inflammation and have clinical evidence for reducing joint pain and stiffness in rheumatoid arthritis. Benefits build over 8-12 weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency contributes to inflammation and muscle tension around joints. Glycinate form supports muscle relaxation and reduces pain signals.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Frankincense Oil',
          desc: 'Boswellic acids inhibit inflammatory enzymes that contribute to joint destruction in arthritis. Clinical evidence for reducing pain and improving mobility in osteoarthritis. Available as both topical oil and internal boswellic acid capsules.',
          oilSlug: 'frankincense-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to affected joints. Massage in for anti-inflammatory effect that complements oral boswellia.',
          },
          internal: {
            ageRange: 'Age 18+',
            pregnancySafe: 'ask',
            desc: 'Boswellic acid capsule (300-500mg) with food. The most clinically studied internal use of frankincense — strong evidence for osteoarthritis and joint inflammation.',
            warning: 'May interact with blood thinners and anti-inflammatory medications.',
          },
        },
        {
          name: 'Arnica (Topical)',
          desc: 'Topical arnica gel reduces inflammation, pain, and stiffness in arthritic joints. Well studied for musculoskeletal pain relief.',
          warning: 'External use only. Do not apply to broken skin or open wounds.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Epsom Salt Bath',
          desc: 'Magnesium sulfate absorbed through the skin reduces inflammation and relieves joint pain and stiffness. Particularly effective for multiple affected joints.',
          warning: 'Do not use on broken skin.',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          desc: 'Gingerols and shogaols inhibit both COX and LOX inflammatory pathways making ginger a dual-action anti-inflammatory for joint pain.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory NSAID that addresses the root cause of most joint pain. More effective than acetaminophen for inflammatory joint conditions.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer-lasting NSAID — one dose lasts 8-12 hours. Good for chronic joint pain that needs sustained coverage throughout the day.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief without anti-inflammatory effect. Better choice if NSAIDs cannot be tolerated.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Voltaren Gel (Diclofenac)',
          desc: 'Topical NSAID gel applied directly to the affected joint. Effective with fewer systemic side effects than oral NSAIDs.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Celebrex (Celecoxib)',
          desc: 'Prescription COX-2 selective NSAID with fewer GI side effects than traditional NSAIDs. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 200-400mg. Most effective OTC option for inflammatory joint pain.',
          note: 'Take with food to protect the stomach. Do not combine with other NSAIDs.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store-brand Aleve equivalent. 220mg every 8-12 hours for longer-lasting joint pain relief.',
          note: 'Do not combine with ibuprofen or other NSAIDs. Choose one at a time.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Heat or cold therapy',
          desc: 'Cold for acute inflamed joints — warm for chronic stiff joints. A simple and always available intervention.',
          note: 'Cold reduces active inflammation. Heat increases blood flow and loosens stiff joints. Never apply directly to skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}