import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function DiaperRash() {
  return (
    <RemedyPageLayout
      title="Diaper Rash"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if the rash has blisters, open sores, or pus, is accompanied by fever, spreads beyond the diaper area, or does not improve after 2-3 days of treatment."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Coconut Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Virgin coconut oil has antifungal and antibacterial properties and creates a gentle moisture barrier. Apply a thin layer to clean dry skin at every diaper change.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Calendula has strong anti-inflammatory and wound healing properties. Clinical studies show it is as effective as aloe vera for diaper rash and very gentle on infant skin.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aloe Vera Gel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Pure aloe vera gel soothes irritated skin and reduces inflammation. Apply a thin layer to clean dry skin. Use 99% pure gel without added alcohol or fragrance.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Breast Milk',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'For breastfeeding mothers, applying a small amount of breast milk to the rash and allowing it to air dry has antimicrobial and healing properties.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oatmeal Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Colloidal oatmeal in a warm bath soothes inflamed skin and reduces itching. Safe from birth and very effective for widespread rash.',
          safeUse: 'Safe for all ages including newborns. Rinse tub carefully after use — oatmeal makes surfaces slippery.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Air Time',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Leaving the diaper off for 10-20 minutes several times per day allows skin to dry completely and is one of the most effective treatments for diaper rash.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Desitin Maximum Strength',
          desc: 'Zinc oxide 40% paste creates a thick moisture barrier. Most effective OTC option for severe diaper rash.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Balmex Diaper Rash Cream',
          desc: 'Zinc oxide based cream with aloe and vitamin E. Gentler formulation than maximum strength options.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Aquaphor Baby Healing Ointment',
          desc: 'Petroleum based protective barrier. Fragrance free and gentle. Good for mild rash and prevention.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Lotrimin AF (Clotrimazole)',
          desc: 'Antifungal cream for diaper rash caused by yeast infection. Yeast rash has bright red edges and satellite spots — looks different from regular diaper rash.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic zinc oxide cream',
          desc: 'Any store brand zinc oxide diaper cream. Same protective barrier as name brands at a fraction of the cost.',
          note: 'Clean and thoroughly dry skin before each application. Moisture trapped under the cream worsens rash.',
        },
        {
          category: 'Petroleum jelly',
          desc: 'Plain petroleum jelly creates a moisture barrier and protects irritated skin. Available everywhere.',
          note: 'Not antifungal — if rash has bright red edges with satellite spots it may be yeast and requires antifungal treatment.',
        },
        {
          category: 'Frequent diaper changes and air time',
          desc: 'The most important intervention regardless of what products you have. Change diapers immediately when wet or soiled and allow air time whenever possible.',
          note: 'Free and always available. Moisture is the primary cause of diaper rash — keeping skin dry is the foundation of all treatment.',
        },
      ]}
    />
  )
}