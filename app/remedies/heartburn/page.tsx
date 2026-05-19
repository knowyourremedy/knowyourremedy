import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Heartburn() {
  return (
    <RemedyPageLayout
      title="Heartburn"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if you experience chest pain that spreads to your arm or jaw, shortness of breath, sweating, or if heartburn is accompanied by difficulty swallowing, vomiting blood, or black tarry stools."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Ginger reduces inflammation in the esophagus and stomach and speeds gastric emptying which reduces acid reflux. One of the most effective natural remedies for heartburn.',
          warning: 'Avoid more than 4g per day in pregnancy. High doses may worsen heartburn in some people.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Apple Cider Vinegar',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Counterintuitively, low stomach acid can cause heartburn. A tablespoon of ACV diluted in water before meals may help balance stomach acid levels.',
          warning: 'Always dilute before drinking. Can erode tooth enamel. Avoid if heartburn is caused by excess acid — this will worsen symptoms.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Slippery Elm',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Forms a soothing gel coating on the esophagus and stomach lining that protects against acid irritation. One of the best studied natural remedies for GERD.',
          warning: 'May slow absorption of other medications — take 1-2 hours apart from other drugs.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Aloe Vera Juice',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Inner leaf aloe vera juice reduces inflammation in the esophagus and stomach. Look for decolorized and purified aloe vera juice specifically formulated for internal use.',
          warning: 'Only use products specifically labeled for internal use with a Supplement Facts panel. Aloe latex (outer leaf) is a strong laxative and should not be ingested.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Licorice Root DGL',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Deglycyrrhizinated licorice (DGL) soothes the stomach lining and esophagus without the blood pressure raising effects of regular licorice root.',
          warning: 'Use DGL form only. Regular licorice root can raise blood pressure significantly.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Baking Soda',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Half a teaspoon of baking soda in 4oz of water neutralizes stomach acid quickly. Fast acting but short lasting relief.',
          warning: 'High in sodium — avoid with high blood pressure or sodium restricted diets. Do not use regularly.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Elevating Head of Bed',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Elevating the head of the bed 6-8 inches uses gravity to keep stomach acid from flowing back into the esophagus during sleep.',
          safeUse: 'Safe for all ages. One of the most effective lifestyle interventions for nighttime heartburn.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tums (Calcium Carbonate)',
          desc: 'Fast acting antacid that neutralizes stomach acid. Safe for occasional use. Also provides calcium.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Pepcid (Famotidine)',
          desc: 'H2 blocker that reduces acid production for up to 12 hours. More sustained relief than antacids. Take 15-60 minutes before meals.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Prilosec (Omeprazole)',
          desc: 'Proton pump inhibitor that dramatically reduces acid production. Most effective for frequent heartburn but not for immediate relief — takes 1-4 days to reach full effect.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Gaviscon',
          desc: 'Forms a foam barrier on top of stomach contents to prevent reflux. Unique mechanism that is particularly effective for nighttime heartburn.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
        },
        {
          name: 'Nexium (Esomeprazole)',
          desc: 'Prescription strength PPI for severe or chronic GERD. Requires physician supervision for long term use.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic calcium carbonate antacid',
          desc: 'Store brand Tums equivalent. Same active ingredient at a fraction of the cost. Available everywhere.',
          note: 'Chew completely before swallowing for fastest relief. Do not exceed 7,500mg per day.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic famotidine',
          desc: 'Store brand Pepcid equivalent. Take 15-60 minutes before eating for best effect.',
          note: 'More sustained relief than antacids. Do not use for more than 14 days without consulting a doctor.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Baking soda in water',
          desc: 'Half a teaspoon in 4oz of water. Fast acting neutralizer available in any kitchen.',
          note: 'High in sodium — avoid with high blood pressure. Do not use regularly. Relief lasts 30-60 minutes only.',
          pregnancySafe: 'ask',
        },
      ]}
    />
  )
}