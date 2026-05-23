import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function EarPain() {
  return (
    <ConditionPageLayoutV2
      title="Ear Pain"
      subtitle="Otalgia · middle or outer ear discomfort"
      bodySystem="ear"
      emergency="High fever, sudden hearing loss, severe dizziness, stiff neck, swelling behind the ear, or a child who is inconsolable — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="AAP guidelines · NIH NCCIH · Sarrell EM et al. Pediatrics 2003 (mullein/garlic for otitis media) · Tisserand & Young 2014"
      naturalItems={[
        {
          name: 'Warm Compress',
          desc: 'A warm cloth or heating pad on low applied to the affected ear reduces pain and pressure. One of the safest and most immediate relief options.',
          warning: 'Never use a compress that is too hot. Test on your wrist first. Do not apply directly to the ear canal.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Garlic Oil (Infused)',
          desc: 'Garlic has powerful antimicrobial properties. Warm garlic-infused oil dropped into the ear canal can reduce pain and fight infection in outer ear infections.',
          warning: 'Never use if eardrum may be perforated. Do not use in children with ear tubes. Warm to body temperature before use — never hot.',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Mullein Ear Drops',
          desc: 'Mullein flower oil has anti-inflammatory and analgesic properties. Clinical studies show mullein ear drops are as effective as anesthetic ear drops for ear pain in children.',
          warning: 'Do not use if eardrum is perforated or if ear tubes are present.',
          ageRange: 'Age 2+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Olive Oil',
          desc: 'Warm olive oil dropped into the ear canal softens earwax buildup which is a common cause of ear pain and pressure.',
          warning: 'Never use if eardrum may be perforated. Warm to body temperature before use.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          desc: 'Antimicrobial essential oil helpful for outer ear infections.',
          oilSlug: 'tea-tree-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply heavily diluted around the OUTER ear only — never inside the ear canal.',
            warning: 'For external use around the outer ear only — never inside the ear canal. Never ingest.',
          },
        },
        {
          name: 'Hydrogen Peroxide',
          desc: 'A few drops of diluted hydrogen peroxide in the ear can help soften and remove earwax buildup causing pressure and pain.',
          warning: 'Use 3% solution diluted 50/50 with warm water. Never use if eardrum may be perforated. Tilt head and allow to sit for 1 minute then drain.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory that reduces both pain and swelling. More effective than acetaminophen for ear pain due to its anti-inflammatory properties.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for pain relief. Good option when ibuprofen cannot be used.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Debrox Ear Drops',
          desc: 'Carbamide peroxide drops that soften and remove earwax. Good for ear pain caused by wax buildup.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Antipyrine and Benzocaine Ear Drops',
          desc: 'OTC anesthetic ear drops that numb the ear canal for temporary pain relief. Not a treatment — pain relief only.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Amoxicillin (Prescription)',
          desc: 'Most commonly prescribed antibiotic for bacterial ear infections. Requires physician diagnosis and prescription.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store-brand ibuprofen 200-400mg for pain and inflammation. Most effective OTC option for ear pain.',
          note: 'Take with food. Do not exceed 1,200mg per day without physician direction.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store-brand acetaminophen for pain relief when ibuprofen cannot be used.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Warm cloth compress',
          desc: 'A warm damp cloth held against the affected ear provides immediate comfort and reduces pain.',
          note: 'Free and always available. Safe for all ages including infants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}