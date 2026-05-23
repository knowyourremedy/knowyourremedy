import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function MenstrualCramps() {
  return (
    <ConditionPageLayoutV2
      title="Menstrual Cramps"
      subtitle="Dysmenorrhea · uterine prostaglandin response"
      bodySystem="reproductive"
      emergency="Severely debilitating cramps, significantly worse than usual, heavy bleeding soaking more than one pad per hour, fever, or pain that persists after your period ends — seek medical care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · ACOG clinical guidelines · Ou MC et al. 2012 (clary sage) · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium reduces uterine muscle contractions and prostaglandin production that cause cramps. One of the most evidence-based natural interventions for dysmenorrhea. Most effective when taken regularly throughout the month.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          desc: 'Clinical studies show ginger is as effective as ibuprofen for menstrual pain when taken at the start of menstruation. Inhibits prostaglandin synthesis and reduces inflammation.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Heat Therapy',
          desc: 'A heating pad applied to the lower abdomen relaxes uterine muscles and increases blood flow. Clinical evidence shows heat therapy is as effective as ibuprofen for menstrual cramps.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier. Do not sleep with a heating pad.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Clary Sage Oil',
          desc: 'Clary sage has antispasmodic properties that relax uterine muscles. Diluted and massaged into the lower abdomen has clinical evidence for reducing menstrual pain.',
          oilSlug: 'clary-sage-oil',
          topical: {
            ageRange: 'Age 12+',
            pregnancySafe: 'avoid',
            dilute: true,
            desc: 'Apply 2 drops diluted (2% carrier oil) to lower abdomen and massage in. Repeat as needed during menstruation.',
            warning: 'Do not use during pregnancy — can stimulate uterine contractions.',
          },
          diffuse: {
            ageRange: 'Age 12+',
            pregnancySafe: 'avoid',
            desc: 'Diffuse during cramping for general antispasmodic effect.',
          },
        },
        {
          name: 'Lavender Oil',
          desc: 'Diluted lavender oil massaged into the lower abdomen reduces pain intensity and duration of menstrual cramps. Also helps with associated anxiety and mood symptoms.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to lower abdomen and lower back. Massage in during cramping.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Diffuse for general comfort during menstruation.',
          },
        },
        {
          name: 'Fish Oil (Omega-3)',
          desc: 'EPA and DHA reduce prostaglandin production that causes uterine contractions. Most effective when taken regularly throughout the month rather than just during menstruation.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Turmeric / Curcumin',
          desc: 'Anti-inflammatory properties reduce prostaglandin production and uterine inflammation. Take with black pepper for best absorption.',
          warning: 'May interact with blood thinners. Take with food.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Vitamin D3',
          desc: 'Vitamin D deficiency is associated with more severe menstrual cramps. Supplementing to optimal levels has clinical evidence for reducing dysmenorrhea severity.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. The gold standard OTC treatment for menstrual cramps. NSAIDs directly reduce prostaglandin production that causes uterine contractions. Most effective when started 1-2 days before period begins.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer-lasting NSAID — one dose lasts 8-12 hours. Good option for severe cramps requiring sustained coverage.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief when NSAIDs cannot be used. Less effective than NSAIDs for menstrual cramps as it does not address prostaglandin production.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hormonal Birth Control',
          desc: 'Oral contraceptives, patches, rings, and hormonal IUDs significantly reduce menstrual cramps by reducing prostaglandin production and thinning the uterine lining.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 200-400mg. Most effective OTC option for menstrual cramps. Take with food.',
          note: 'Start at the first sign of cramping or ideally 1-2 days before your period begins for best results.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic naproxen',
          desc: 'Store-brand Aleve equivalent. 220mg every 8-12 hours for longer-lasting cramp relief.',
          note: 'Do not combine with ibuprofen. Choose one NSAID at a time.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Heating pad or warm water bottle',
          desc: 'Apply to the lower abdomen for 20-30 minutes. Clinically as effective as ibuprofen for menstrual cramp relief.',
          note: 'Always use a cloth barrier between heat source and skin. Do not sleep with a heating pad.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}