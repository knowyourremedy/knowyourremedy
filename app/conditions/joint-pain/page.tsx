import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function JointPain() {
  return (
    <RemedyPageLayout
      title="Joint Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if joint pain is accompanied by sudden severe swelling, redness and warmth with fever, inability to bear weight, or follows a significant injury or trauma."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Turmeric / Curcumin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the most clinically studied natural anti-inflammatories for joint pain. Multiple studies show effectiveness comparable to ibuprofen for osteoarthritis pain without GI side effects. Take with black pepper for up to 2000% better absorption.',
          warning: 'May interact with blood thinners. High doses not recommended in pregnancy.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fish Oil (Omega-3)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'EPA and DHA reduce systemic inflammation and have clinical evidence for reducing joint pain and stiffness in rheumatoid arthritis. Benefits build over 8-12 weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency contributes to inflammation and muscle tension around joints. Glycinate form supports muscle relaxation and reduces pain signals.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Boswellia (Frankincense)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Boswellic acids inhibit inflammatory enzymes that contribute to joint destruction in arthritis. Clinical evidence for reducing pain and improving mobility in osteoarthritis.',
          warning: 'May interact with blood thinners and anti-inflammatory medications.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Arnica (Topical)',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Topical arnica gel reduces inflammation, pain, and stiffness in arthritic joints. Well studied for musculoskeletal pain relief.',
          warning: 'External use only. Do not apply to broken skin or open wounds.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Epsom Salt Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Magnesium sulfate absorbed through the skin reduces inflammation and relieves joint pain and stiffness. Particularly effective for multiple affected joints.',
          warning: 'Do not use on broken skin.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Frankincense Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Topical frankincense oil diluted in a carrier and massaged into affected joints has anti-inflammatory properties that complement oral boswellia supplementation.',
          warning: 'Always dilute before skin application. May interact with blood thinners.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Gingerols and shogaols inhibit both COX and LOX inflammatory pathways making ginger a dual action anti-inflammatory for joint pain.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID that addresses the root cause of most joint pain. More effective than acetaminophen for inflammatory joint conditions.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer lasting NSAID — one dose lasts 8-12 hours. Good for chronic joint pain that needs sustained coverage throughout the day.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief without anti-inflammatory effect. Better choice if NSAIDs cannot be tolerated.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
        },
        {
          name: 'Voltaren Gel (Diclofenac)',
          desc: 'Topical NSAID gel applied directly to the affected joint. Effective with fewer systemic side effects than oral NSAIDs.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Celebrex (Celecoxib)',
          desc: 'Prescription COX-2 selective NSAID with fewer GI side effects than traditional NSAIDs. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg. Most effective OTC option for inflammatory joint pain.',
          note: 'Take with food to protect the stomach. Do not combine with other NSAIDs.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store brand Aleve equivalent. 220mg every 8-12 hours for longer lasting joint pain relief.',
          note: 'Do not combine with ibuprofen or other NSAIDs. Choose one at a time.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Heat or cold therapy',
          desc: 'Cold for acute inflamed joints — warm for chronic stiff joints. A simple and always available intervention.',
          note: 'Cold reduces active inflammation. Heat increases blood flow and loosens stiff joints. Never apply directly to skin.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}