import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function BackPain() {
  return (
    <ConditionPageLayoutV2
      title="Back Pain"
      subtitle="Lumbar musculoskeletal · acute or chronic"
      bodySystem="musculoskeletal"
      emergency="Loss of bladder or bowel control, numbness in the groin or inner thighs, severe pain after a fall or injury, or pain with fever and chills — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · ACR pain guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Turmeric / Curcumin',
          desc: 'Curcumin is one of the most studied natural anti-inflammatories. Inhibits NF-kB and COX-2 pathways similar to NSAIDs but without GI side effects. Take with black pepper for up to 2000% better absorption.',
          warning: 'May interact with blood thinners. High doses not recommended in pregnancy.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency contributes to muscle tension and spasms. Glycinate form supports muscle relaxation and is gentlest on the stomach.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Epsom Salt Bath',
          desc: 'Magnesium sulfate absorbed transdermally relaxes muscles and reduces inflammation. Soak for 20 minutes in warm water with 2 cups of Epsom salt.',
          warning: 'Do not use on broken skin. Avoid very hot water during pregnancy.',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          name: 'Arnica (Topical)',
          desc: 'Topical arnica gel or cream reduces muscle soreness, bruising, and inflammation. Well studied for musculoskeletal pain.',
          warning: 'For external use only. Do not apply to broken skin or open wounds.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          desc: 'Menthol in peppermint oil produces a cooling analgesic effect on muscles. Useful for temporary relief of back pain.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1-2 diluted drops to the affected area for cooling relief.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse for general tension relief alongside topical application.',
          },
        },
        {
          name: 'Heat Therapy',
          desc: 'Heat increases blood flow to muscles, reduces stiffness, and relieves chronic back pain. Use a heating pad or warm compress for 15-20 minutes.',
          warning: 'Do not use heat on acute injuries in the first 48-72 hours — use cold instead.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Therapy',
          desc: 'Ice or cold packs reduce inflammation and numb acute pain. Best used in the first 48-72 hours after an acute injury.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth and limit to 15-20 minutes at a time.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Fish Oil',
          desc: 'Omega-3 fatty acids EPA and DHA reduce systemic inflammation and may help with chronic back pain. Benefits build over weeks of regular use.',
          warning: 'May increase bleeding risk at high doses. Take with meals to reduce fishy aftertaste.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory NSAID that addresses the root cause of most back pain. More effective than acetaminophen for inflammatory back pain.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer-lasting NSAID — one dose lasts 8-12 hours. Good for chronic back pain that needs sustained coverage.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief without anti-inflammatory effect. Better choice if you cannot take NSAIDs.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Biofreeze (Topical Menthol)',
          desc: 'Topical pain relief gel using menthol. Provides temporary cooling relief without systemic side effects.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Any store-brand ibuprofen 200-400mg. Most effective OTC option for inflammatory back pain.',
          note: 'Take with food to protect the stomach. Do not exceed 1,200mg per day without physician direction.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store-brand Aleve equivalent. 220mg every 8-12 hours. Longer-lasting than ibuprofen.',
          note: 'Do not combine with ibuprofen or other NSAIDs. Choose one NSAID at a time.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Hot or cold pack',
          desc: 'A bag of frozen vegetables wrapped in a cloth for acute pain, or a warm damp towel for chronic stiffness.',
          note: 'Never apply ice or heat directly to skin. Limit sessions to 15-20 minutes.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}