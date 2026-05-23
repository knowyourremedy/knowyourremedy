import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function BloatingAndGas() {
  return (
    <ConditionPageLayoutV2
      title="Bloating and Gas"
      subtitle="Digestive distension · gas accumulation"
      bodySystem="digestive"
      emergency="Severe abdominal pain, fever, vomiting blood, or sudden severe onset — these can indicate a serious condition. Seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · American Gastroenterological Association · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Ginger Tea',
          desc: 'Ginger stimulates digestive motility and reduces gas production. One of the most effective natural remedies for bloating and digestive discomfort.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          desc: 'Menthol in peppermint relaxes the smooth muscles of the GI tract, releasing trapped gas and reducing bloating.',
          warning: 'Avoid if you have acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fennel Seeds',
          desc: 'Chewing fennel seeds or drinking fennel tea after meals reduces gas and bloating. Widely used in traditional medicine and well tolerated.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Activated Charcoal',
          desc: 'Binds to gas-producing compounds in the gut and reduces bloating. Most effective when taken just before or after gas-producing meals.',
          warning: 'Can adsorb medications — do not take within 2 hours of any other medication. May cause black stools.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Probiotics',
          desc: 'Restoring healthy gut bacteria reduces gas production from fermentation imbalances. Most effective with regular daily use over weeks.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          desc: 'Targeted IBS-related bloating relief — enteric-coated peppermint oil capsules are the most clinically studied form for IBS. Topical massage on the abdomen also helps with general bloating.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to the abdomen and massage in a clockwise direction to help release trapped gas.',
          },
          internal: {
            ageRange: 'Age 8+',
            pregnancySafe: 'ask',
            desc: 'Enteric-coated peppermint oil capsules (IBgard, Pepogest) — clinically proven for IBS-related bloating and gas. Take 30 minutes before meals.',
          },
        },
        {
          name: 'Apple Cider Vinegar',
          desc: 'A tablespoon diluted in water before meals may improve digestion and reduce bloating by supporting stomach acid production.',
          warning: 'Always dilute — never drink undiluted. Can erode tooth enamel over time. Rinse mouth after use.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Gas-X (Simethicone)',
          desc: 'Simethicone breaks up gas bubbles in the digestive tract for rapid relief. Single ingredient and very well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Beano (Alpha-Galactosidase)',
          desc: 'Enzyme that breaks down complex carbohydrates before they ferment and cause gas. Take with the first bite of a gas-producing meal.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate can help with bloating associated with upset stomach. Contains salicylate — avoid in children under 12.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic simethicone',
          desc: 'Store-brand Gas-X equivalent. Same active ingredient at a fraction of the cost. Available at any pharmacy.',
          note: 'Chewable tablets work fastest. Can be used safely after every meal if needed.',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          category: 'Warm water with lemon',
          desc: 'Warm water stimulates digestive motility. Lemon juice may help stimulate bile production to aid digestion.',
          note: 'Rinse mouth after to protect tooth enamel from lemon acid.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Walking',
          desc: 'Even a short 10-15 minute walk after a meal significantly speeds up digestion and helps move trapped gas through the digestive tract.',
          note: 'Free, always available, no side effects. One of the most effective immediate interventions for post-meal bloating.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}