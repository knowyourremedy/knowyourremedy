import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Diarrhea() {
  return (
    <RemedyPageLayout
      title="Diarrhea"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if diarrhea is accompanied by high fever, blood in stool, signs of severe dehydration such as no urination, sunken eyes, or extreme thirst, or if an infant under 3 months has diarrhea."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Probiotics',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Restoring healthy gut bacteria is one of the most evidence based interventions for infectious diarrhea. Lactobacillus rhamnosus GG and Saccharomyces boulardii have the strongest clinical evidence.',
          pregnancySafe: 'safe',
        },
        {
          name: 'BRAT Diet',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Bananas, Rice, Applesauce, and Toast. These bland low-fiber foods are gentle on the digestive tract and help firm up stool. Bananas also replace lost potassium.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Ginger reduces intestinal inflammation and has antimicrobial properties. Particularly helpful for diarrhea accompanied by nausea and cramping.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory and antispasmodic properties help reduce intestinal cramping and inflammation associated with diarrhea.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oral Rehydration Solution',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Replacing lost fluids and electrolytes is the most critical intervention for diarrhea. Pedialyte or homemade ORS (water, salt, sugar, and potassium) prevents dangerous dehydration.',
          safeUse: 'Safe and essential for all ages. Priority number one especially for infants and young children.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Apple Cider Vinegar',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Pectin in ACV may help firm stool and its antimicrobial properties may help fight bacterial causes of diarrhea. Dilute one tablespoon in water before meals.',
          warning: 'Always dilute before drinking. Avoid if diarrhea is caused by acid related conditions.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Imodium (Loperamide)',
          desc: 'Slows intestinal motility to reduce frequency of diarrhea. Fast and effective for non-infectious diarrhea. Not for use in children under 2.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate reduces intestinal inflammation and has mild antimicrobial properties. Effective for traveler\'s diarrhea.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Pedialyte',
          desc: 'Oral rehydration solution specifically formulated to replace fluids and electrolytes lost during diarrhea. Essential for infants and young children.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic loperamide',
          desc: 'Store brand Imodium equivalent. Same active ingredient at a fraction of the cost. Available at any pharmacy.',
          note: 'Do not use if diarrhea is caused by a bacterial infection with fever and blood in stool — stopping diarrhea traps the bacteria.',
        },
        {
          category: 'Sports drink diluted with water',
          desc: 'Dilute a sports drink 50/50 with water for a makeshift electrolyte solution. Better than plain water for rehydration.',
          note: 'Full strength sports drinks have too much sugar which can worsen diarrhea. Always dilute.',
        },
        {
          category: 'Plain white rice and bananas',
          desc: 'Available everywhere. Bland starchy foods that help firm stool and are gentle on an irritated digestive tract.',
          note: 'Avoid dairy, fatty foods, high fiber foods, and caffeine until diarrhea resolves.',
        },
      ]}
    />
  )
}