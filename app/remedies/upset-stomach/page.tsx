import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function UpsetStomach() {
  return (
    <RemedyPageLayout
      title="Upset Stomach"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if stomach pain is severe and sudden, accompanied by fever, vomiting blood, blood in stool, rigid abdomen, or if pain is concentrated in the lower right abdomen which may indicate appendicitis."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the most clinically studied remedies for digestive upset. Gingerols stimulate digestive motility, reduce nausea, and have anti-inflammatory properties that calm an irritated stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Apigenin in chamomile relaxes stomach muscles, reduces inflammation, and calms digestive spasms. One of the most gentle and broadly effective remedies for upset stomach.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Menthol relaxes smooth muscle in the GI tract reducing cramping, bloating, and nausea. Particularly effective for IBS related stomach upset.',
          warning: 'Avoid if stomach upset is associated with acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Apple Cider Vinegar',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'May help balance stomach acid and improve digestion. Dilute one tablespoon in 8oz of water before meals.',
          warning: 'Always dilute before drinking. Can erode tooth enamel. Avoid if stomach upset is caused by excess acid.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Probiotics',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Restoring healthy gut bacteria reduces digestive inflammation and improves overall gut function. Most effective with regular daily use.',
          pregnancySafe: 'safe',
        },
        {
          name: 'BRAT Diet',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Bananas, Rice, Applesauce, and Toast. Bland low-fiber foods that are gentle on an irritated stomach and help normalize digestion.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted peppermint oil massaged clockwise onto the abdomen helps relieve stomach cramping and bloating.',
          warning: 'Always dilute in a carrier oil. Do not ingest topical grade oil. Avoid near face of children under 6.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fennel Seeds',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Chewing fennel seeds or drinking fennel tea after meals reduces gas, bloating, and stomach cramping. Widely used in traditional medicine and very well tolerated.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate for nausea, heartburn, indigestion, upset stomach, and diarrhea. Contains salicylate — avoid in children under 12.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tums (Calcium Carbonate)',
          desc: 'Fast acting antacid for upset stomach caused by excess acid. Also provides calcium.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Pepcid (Famotidine)',
          desc: 'H2 blocker that reduces acid production for up to 12 hours. Good for recurring upset stomach related to acid.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Gas-X (Simethicone)',
          desc: 'Breaks up gas bubbles for upset stomach accompanied by gas and bloating. Single ingredient and very well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Imodium (Loperamide)',
          desc: 'Slows intestinal motility for upset stomach accompanied by diarrhea. Not for use in children under 2.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Ginger ale or ginger tea',
          desc: 'Small frequent sips of real ginger ale or ginger tea. Look for products that contain actual ginger as an ingredient.',
          note: 'Most commercial ginger ales contain very little real ginger. Check the ingredient list.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic calcium carbonate antacid',
          desc: 'Store brand Tums equivalent for upset stomach caused by acid. Same active ingredient at a fraction of the cost.',
          note: 'Chew completely before swallowing for fastest relief. Do not exceed 7,500mg per day.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Plain bland foods and rest',
          desc: 'Plain crackers, white rice, toast, or bananas. Avoid dairy, fatty foods, spicy foods, and caffeine until stomach settles.',
          note: 'Sometimes the best medicine is simply giving your digestive system a rest with easily digestible foods.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}