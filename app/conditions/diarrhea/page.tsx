import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Diarrhea() {
  return (
    <ConditionPageLayoutV2
      title="Diarrhea"
      subtitle="Loose stools · acute or chronic"
      bodySystem="digestive"
      emergency="High fever, blood in stool, signs of severe dehydration (no urination, sunken eyes, extreme thirst), or any diarrhea in infants under 3 months — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · American Gastroenterological Association · Cochrane Reviews (probiotics for diarrhea)"
      naturalItems={[
        {
          name: 'Probiotics',
          desc: 'Restoring healthy gut bacteria is one of the most evidence-based interventions for infectious diarrhea. Lactobacillus rhamnosus GG and Saccharomyces boulardii have the strongest clinical evidence.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'BRAT Diet',
          desc: 'Bananas, Rice, Applesauce, and Toast. These bland low-fiber foods are gentle on the digestive tract and help firm up stool. Bananas also replace lost potassium.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          desc: 'Ginger reduces intestinal inflammation and has antimicrobial properties. Particularly helpful for diarrhea accompanied by nausea and cramping.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          desc: 'Anti-inflammatory and antispasmodic properties help reduce intestinal cramping and inflammation associated with diarrhea.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oral Rehydration Solution',
          desc: 'Replacing lost fluids and electrolytes is the most critical intervention for diarrhea. Pedialyte or homemade ORS (water, salt, sugar, and potassium) prevents dangerous dehydration.',
          warning: 'Priority number one especially for infants and young children.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Apple Cider Vinegar',
          desc: 'Pectin in ACV may help firm stool and its antimicrobial properties may help fight bacterial causes of diarrhea. Dilute one tablespoon in water before meals.',
          warning: 'Always dilute before drinking. Avoid if diarrhea is caused by acid-related conditions.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Imodium (Loperamide)',
          desc: 'Slows intestinal motility to reduce frequency of diarrhea. Fast and effective for non-infectious diarrhea.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate reduces intestinal inflammation and has mild antimicrobial properties. Effective for traveler\'s diarrhea.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Pedialyte',
          desc: 'Oral rehydration solution specifically formulated to replace fluids and electrolytes lost during diarrhea. Essential for infants and young children.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic loperamide',
          desc: 'Store-brand Imodium equivalent. Same active ingredient at a fraction of the cost.',
          note: 'Do not use if diarrhea is caused by a bacterial infection with fever and blood in stool — stopping diarrhea traps the bacteria.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Sports drink diluted with water',
          desc: 'Dilute a sports drink 50/50 with water for a makeshift electrolyte solution. Better than plain water for rehydration.',
          note: 'Full strength sports drinks have too much sugar which can worsen diarrhea. Always dilute.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Plain white rice and bananas',
          desc: 'Available everywhere. Bland starchy foods that help firm stool and are gentle on an irritated digestive tract.',
          note: 'Avoid dairy, fatty foods, high-fiber foods, and caffeine until diarrhea resolves.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}