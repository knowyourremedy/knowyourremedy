import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function UpsetStomach() {
  return (
    <ConditionPageLayoutV2
      title="Upset Stomach"
      subtitle="Gastric upset · indigestion or dyspepsia"
      bodySystem="digestive"
      emergency="Severe sudden stomach pain, fever, vomiting blood, blood in stool, rigid abdomen, or pain concentrated in the lower right abdomen (possible appendicitis) — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · American Gastroenterological Association · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Ginger Tea',
          desc: 'One of the most clinically studied remedies for digestive upset. Gingerols stimulate digestive motility, reduce nausea, and have anti-inflammatory properties that calm an irritated stomach.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          desc: 'Apigenin in chamomile relaxes stomach muscles, reduces inflammation, and calms digestive spasms. One of the most gentle and broadly effective remedies for upset stomach.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          desc: 'Menthol relaxes smooth muscle in the GI tract reducing cramping, bloating, and nausea. Particularly effective for IBS-related stomach upset.',
          warning: 'Avoid if stomach upset is associated with acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Apple Cider Vinegar',
          desc: 'May help balance stomach acid and improve digestion. Dilute one tablespoon in 8oz of water before meals.',
          warning: 'Always dilute before drinking. Can erode tooth enamel. Avoid if stomach upset is caused by excess acid.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Probiotics',
          desc: 'Restoring healthy gut bacteria reduces digestive inflammation and improves overall gut function. Most effective with regular daily use.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'BRAT Diet',
          desc: 'Bananas, Rice, Applesauce, and Toast. Bland low-fiber foods that are gentle on an irritated stomach and help normalize digestion.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          desc: 'Targeted relief for IBS-related stomach upset. Topical massage on the abdomen also helps with general cramping.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to the abdomen and massage clockwise to relieve cramping and bloating.',
          },
          internal: {
            ageRange: 'Age 8+',
            pregnancySafe: 'ask',
            desc: 'Enteric-coated peppermint oil capsules (IBgard, Pepogest) — clinically proven for IBS-related stomach upset. Take 30 minutes before meals.',
          },
        },
        {
          name: 'Fennel Seeds',
          desc: 'Chewing fennel seeds or drinking fennel tea after meals reduces gas, bloating, and stomach cramping. Widely used in traditional medicine and very well tolerated.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate for nausea, heartburn, indigestion, upset stomach, and diarrhea. Contains salicylate — avoid in children under 12.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tums (Calcium Carbonate)',
          desc: 'Fast-acting antacid for upset stomach caused by excess acid. Also provides calcium.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Pepcid (Famotidine)',
          desc: 'H2 blocker that reduces acid production for up to 12 hours. Good for recurring upset stomach related to acid.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Gas-X (Simethicone)',
          desc: 'Breaks up gas bubbles for upset stomach accompanied by gas and bloating. Single ingredient and very well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Imodium (Loperamide)',
          desc: 'Slows intestinal motility for upset stomach accompanied by diarrhea.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Ginger ale or ginger tea',
          desc: 'Small frequent sips of real ginger ale or ginger tea. Look for products that contain actual ginger as an ingredient.',
          note: 'Most commercial ginger ales contain very little real ginger. Check the ingredient list.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic calcium carbonate antacid',
          desc: 'Store-brand Tums equivalent for upset stomach caused by acid. Same active ingredient at a fraction of the cost.',
          note: 'Chew completely before swallowing for fastest relief. Do not exceed 7,500mg per day.',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          category: 'Plain bland foods and rest',
          desc: 'Plain crackers, white rice, toast, or bananas. Avoid dairy, fatty foods, spicy foods, and caffeine until stomach settles.',
          note: 'Sometimes the best medicine is simply giving your digestive system a rest with easily digestible foods.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}