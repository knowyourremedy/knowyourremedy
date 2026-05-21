import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function BloatingAndGas() {
  return (
    <RemedyPageLayout
      title="Bloating & Gas"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if bloating is accompanied by severe abdominal pain, fever, vomiting blood, or has come on suddenly and severely — these can indicate a serious condition."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Ginger stimulates digestive motility and reduces gas production. One of the most effective natural remedies for bloating and digestive discomfort.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Menthol in peppermint relaxes the smooth muscles of the GI tract, releasing trapped gas and reducing bloating. Enteric coated peppermint oil capsules are the most studied form for IBS.',
          warning: 'Avoid if you have acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fennel Seeds',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Chewing fennel seeds or drinking fennel tea after meals reduces gas and bloating. Widely used in traditional medicine and well tolerated.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Activated Charcoal',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Binds to gas producing compounds in the gut and reduces bloating. Most effective when taken just before or after gas producing meals.',
          warning: 'Can adsorb medications — do not take within 2 hours of any other medication. May cause black stools.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Probiotics',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Restoring healthy gut bacteria reduces gas production from fermentation imbalances. Most effective with regular daily use over weeks.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted peppermint oil applied to the abdomen and massaged in a clockwise direction can help relieve bloating and gas.',
          warning: 'Always dilute in a carrier oil. Do not ingest topical grade oil. Avoid near face of children under 6.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Apple Cider Vinegar',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'A tablespoon diluted in water before meals may improve digestion and reduce bloating by supporting stomach acid production.',
          warning: 'Always dilute — never drink undiluted. Can erode tooth enamel over time. Rinse mouth after use.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Gas-X (Simethicone)',
          desc: 'Simethicone breaks up gas bubbles in the digestive tract for rapid relief. Single ingredient and very well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Beano (Alpha-Galactosidase)',
          desc: 'Enzyme that breaks down complex carbohydrates before they ferment and cause gas. Take with the first bite of a gas producing meal.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate can help with bloating associated with upset stomach. Contains salicylate — avoid in children under 12.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic simethicone',
          desc: 'Store brand Gas-X equivalent. Same active ingredient at a fraction of the cost. Available at any pharmacy.',
          note: 'Chewable tablets work fastest. Can be used safely after every meal if needed.',
        },
        {
          category: 'Warm water with lemon',
          desc: 'Warm water stimulates digestive motility. Lemon juice may help stimulate bile production to aid digestion.',
          note: 'Rinse mouth after to protect tooth enamel from lemon acid.',
        },
        {
          category: 'Walking',
          desc: 'Even a short 10-15 minute walk after a meal significantly speeds up digestion and helps move trapped gas through the digestive tract.',
          note: 'Free, always available, no side effects. One of the most effective immediate interventions for post-meal bloating.',
        },
      ]}
    />
  )
}