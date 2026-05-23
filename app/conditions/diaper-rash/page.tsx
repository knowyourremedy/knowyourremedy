import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function DiaperRash() {
  return (
    <ConditionPageLayoutV2
      title="Diaper Rash"
      subtitle="Contact dermatitis · infant skin"
      bodySystem="skin"
      emergency="Blisters, open sores, or pus, fever, rash spreading beyond the diaper area, or no improvement after 2-3 days of treatment — seek medical care."
      dosageLink="/dosage-calculator"
      sources="AAP guidelines · AAD clinical recommendations · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Coconut Oil',
          desc: 'Virgin coconut oil has antifungal and antibacterial properties and creates a gentle moisture barrier. Apply a thin layer to clean dry skin at every diaper change.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          desc: 'Calendula has strong anti-inflammatory and wound-healing properties. Clinical studies show it is as effective as aloe vera for diaper rash and very gentle on infant skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aloe Vera Gel',
          desc: 'Pure aloe vera gel soothes irritated skin and reduces inflammation. Apply a thin layer to clean dry skin. Use 99% pure gel without added alcohol or fragrance.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Breast Milk',
          desc: 'For breastfeeding mothers, applying a small amount of breast milk to the rash and allowing it to air dry has antimicrobial and healing properties.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oatmeal Bath',
          desc: 'Colloidal oatmeal in a warm bath soothes inflamed skin and reduces itching. Safe from birth and very effective for widespread rash.',
          warning: 'Rinse tub carefully after use — oatmeal makes surfaces slippery.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Air Time',
          desc: 'Leaving the diaper off for 10-20 minutes several times per day allows skin to dry completely and is one of the most effective treatments for diaper rash.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Desitin Maximum Strength',
          desc: 'Zinc oxide 40% paste creates a thick moisture barrier. Most effective OTC option for severe diaper rash.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Balmex Diaper Rash Cream',
          desc: 'Zinc oxide-based cream with aloe and vitamin E. Gentler formulation than maximum strength options.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aquaphor Baby Healing Ointment',
          desc: 'Petroleum-based protective barrier. Fragrance-free and gentle. Good for mild rash and prevention.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lotrimin AF (Clotrimazole)',
          desc: 'Antifungal cream for diaper rash caused by yeast infection. Yeast rash has bright red edges and satellite spots — looks different from regular diaper rash.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic zinc oxide cream',
          desc: 'Any store-brand zinc oxide diaper cream. Same protective barrier as name brands at a fraction of the cost.',
          note: 'Clean and thoroughly dry skin before each application. Moisture trapped under the cream worsens rash.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Petroleum jelly',
          desc: 'Plain petroleum jelly creates a moisture barrier and protects irritated skin. Available everywhere.',
          note: 'Not antifungal — if rash has bright red edges with satellite spots it may be yeast and requires antifungal treatment.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Frequent diaper changes and air time',
          desc: 'The most important intervention regardless of what products you have. Change diapers immediately when wet or soiled and allow air time whenever possible.',
          note: 'Free and always available. Moisture is the primary cause of diaper rash — keeping skin dry is the foundation of all treatment.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}