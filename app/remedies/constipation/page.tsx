import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Constipation() {
  return (
    <RemedyPageLayout
      title="Constipation"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if constipation is accompanied by severe abdominal pain, vomiting, blood in stool, or if you have not had a bowel movement in more than a week."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Magnesium Citrate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Draws water into the intestines and stimulates bowel movements. One of the most effective natural laxatives. Works within 30 minutes to 3 hours.',
          warning: 'Do not use regularly without physician guidance. Not for children under 6 without doctor approval.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Prunes and Prune Juice',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Sorbitol and fiber in prunes naturally stimulate bowel movements. Clinically proven and one of the safest options for all ages.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Flaxseed',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Ground flaxseed adds bulk and moisture to stool. One to two tablespoons per day in food or water is effective for chronic constipation.',
          warning: 'Always use ground not whole flaxseed for best absorption. Drink plenty of water.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Psyllium Husk',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Soluble fiber that absorbs water and adds bulk to stool. Metamucil\'s active ingredient. One of the most evidence based options for chronic constipation.',
          warning: 'Must be taken with a full glass of water. Can cause choking if taken without adequate fluid.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Castor Oil',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Stimulant laxative that triggers intestinal contractions. Fast acting — results in 2-6 hours. For occasional use only.',
          warning: 'Do not use during pregnancy — can stimulate uterine contractions. Not for children under 2. Max 1 week use.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Hydration',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Dehydration is one of the most common causes of constipation. Drinking adequate water throughout the day softens stool and supports regular bowel movements.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Abdominal Massage',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Massaging the abdomen in a clockwise direction following the path of the colon stimulates peristalsis and can help relieve constipation.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'MiraLax (PEG 3350)',
          desc: 'Osmotic laxative that draws water into the colon. Gentle, non-habit forming, and tasteless. Recommended by most gastroenterologists for regular use.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Colace (Docusate Sodium)',
          desc: 'Stool softener that adds moisture to stool. Gentle enough for daily use and safe in pregnancy. Works best for prevention rather than acute constipation.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Senokot (Sennosides)',
          desc: 'Stimulant laxative derived from the senna plant. Effective for acute constipation. Produces results in 6-12 hours.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Dulcolax (Bisacodyl)',
          desc: 'Stimulant laxative in tablet or suppository form. Fast acting but can cause cramping. For occasional use only.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic PEG 3350',
          desc: 'Store brand MiraLax equivalent. Same active ingredient at a fraction of the cost. Mix in any beverage — tasteless and odorless.',
          note: 'Takes 1-3 days of regular use to see full effect. Not for immediate relief.',
        },
        {
          category: 'Generic docusate sodium',
          desc: 'Store brand stool softener. Safe for daily use and during pregnancy. Best as a preventive measure.',
          note: 'Not effective for acute constipation — works best when taken regularly before constipation becomes severe.',
        },
        {
          category: 'Prune juice',
          desc: 'An 8oz glass of prune juice is one of the most effective and immediate natural options available at any grocery store.',
          note: 'High in natural sugar — limit to one glass per day. Not suitable for diabetics in large amounts.',
        },
      ]}
    />
  )
}