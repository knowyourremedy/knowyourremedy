import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function BackPain() {
  return (
    <RemedyPageLayout
      title="Back Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if back pain is accompanied by loss of bladder or bowel control, numbness in the groin or inner thighs, severe pain after a fall or injury, or pain with fever and chills."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Turmeric / Curcumin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Curcumin is one of the most studied natural anti-inflammatories. Inhibits NF-kB and COX-2 pathways similar to NSAIDs but without GI side effects. Take with black pepper for up to 2000% better absorption.',
          warning: 'May interact with blood thinners. High doses not recommended in pregnancy.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency contributes to muscle tension and spasms. Glycinate form supports muscle relaxation and is gentlest on the stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Magnesium sulfate absorbed transdermally relaxes muscles and reduces inflammation. Soak for 20 minutes in warm water with 2 cups of Epsom salt.',
          warning: 'Do not use on broken skin. Avoid very hot water during pregnancy.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Arnica (Topical)',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Topical arnica gel or cream reduces muscle soreness, bruising, and inflammation. Well studied for musculoskeletal pain.',
          warning: 'For external use only. Do not apply to broken skin or open wounds.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Menthol in peppermint oil produces a cooling analgesic effect on muscles. Apply diluted to the affected area for temporary relief.',
          warning: 'Always dilute in a carrier oil before skin application. Avoid near eyes.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Heat Therapy',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Heat increases blood flow to muscles, reduces stiffness, and relieves chronic back pain. Use a heating pad or warm compress for 15-20 minutes.',
          warning: 'Do not use heat on acute injuries in the first 48-72 hours — use cold instead.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Therapy',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Ice or cold packs reduce inflammation and numb acute pain. Best used in the first 48-72 hours after an acute injury.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth and limit to 15-20 minutes at a time.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Fish Oil',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Omega-3 fatty acids EPA and DHA reduce systemic inflammation and may help with chronic back pain. Benefits build over weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals to reduce fishy aftertaste.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID that addresses the root cause of most back pain. More effective than acetaminophen for inflammatory back pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer lasting NSAID — one dose lasts 8-12 hours. Good for chronic back pain that needs sustained coverage.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief without anti-inflammatory effect. Better choice if you cannot take NSAIDs.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Any store brand ibuprofen 200-400mg. Most effective OTC option for inflammatory back pain.',
          note: 'Take with food to protect the stomach. Do not exceed 1,200mg per day without physician direction.',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store brand Aleve equivalent. 220mg every 8-12 hours. Longer lasting than ibuprofen.',
          note: 'Do not combine with ibuprofen or other NSAIDs. Choose one NSAID at a time.',
        },
        {
          category: 'Hot or cold pack',
          desc: 'A bag of frozen vegetables wrapped in a cloth for acute pain, or a warm damp towel for chronic stiffness.',
          note: 'Never apply ice or heat directly to skin. Limit sessions to 15-20 minutes.',
        },
      ]}
    />
  )
}