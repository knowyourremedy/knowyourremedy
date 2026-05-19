import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function MenstrualCramps() {
  return (
    <RemedyPageLayout
      title="Menstrual Cramps"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if cramps are severely debilitating, significantly worse than usual, accompanied by heavy bleeding soaking more than one pad per hour, fever, or if pain persists after your period ends."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium reduces uterine muscle contractions and prostaglandin production that cause cramps. One of the most evidence based natural interventions for dysmenorrhea. Most effective when taken regularly throughout the month.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Clinical studies show ginger is as effective as ibuprofen for menstrual pain when taken at the start of menstruation. Inhibits prostaglandin synthesis and reduces inflammation.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Heat Therapy',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A heating pad applied to the lower abdomen relaxes uterine muscles and increases blood flow. Clinical evidence shows heat therapy is as effective as ibuprofen for menstrual cramps.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier. Do not sleep with a heating pad.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Clary Sage Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Clary sage has antispasmodic properties that relax uterine muscles. Diluted and massaged into the lower abdomen has clinical evidence for reducing menstrual pain.',
          warning: 'Always dilute before skin application. Do not use during pregnancy — can stimulate uterine contractions.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted lavender oil massaged into the lower abdomen reduces pain intensity and duration of menstrual cramps. Also helps with associated anxiety and mood symptoms.',
          warning: 'Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Fish Oil (Omega-3)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'EPA and DHA reduce prostaglandin production that causes uterine contractions. Most effective when taken regularly throughout the month rather than just during menstruation.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Turmeric / Curcumin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory properties reduce prostaglandin production and uterine inflammation. Take with black pepper for best absorption.',
          warning: 'May interact with blood thinners. Take with food.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Vitamin D3',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Vitamin D deficiency is associated with more severe menstrual cramps. Supplementing to optimal levels has clinical evidence for reducing dysmenorrhea severity.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'The gold standard OTC treatment for menstrual cramps. NSAIDs directly reduce prostaglandin production that causes uterine contractions. Most effective when started 1-2 days before period begins.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer lasting NSAID — one dose lasts 8-12 hours. Good option for severe cramps requiring sustained coverage.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief when NSAIDs cannot be used. Less effective than NSAIDs for menstrual cramps as it does not address prostaglandin production.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hormonal Birth Control',
          desc: 'Oral contraceptives, patches, rings, and hormonal IUDs significantly reduce menstrual cramps by reducing prostaglandin production and thinning the uterine lining.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg. Most effective OTC option for menstrual cramps. Take with food.',
          note: 'Start at the first sign of cramping or ideally 1-2 days before your period begins for best results.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store brand Aleve equivalent. 220mg every 8-12 hours for longer lasting cramp relief.',
          note: 'Do not combine with ibuprofen. Choose one NSAID at a time.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Heating pad or warm water bottle',
          desc: 'Apply to the lower abdomen for 20-30 minutes. Clinically as effective as ibuprofen for menstrual cramp relief.',
          note: 'Always use a cloth barrier between heat source and skin. Do not sleep with a heating pad.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}