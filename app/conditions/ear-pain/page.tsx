import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function EarPain() {
  return (
    <RemedyPageLayout
      title="Ear Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if ear pain is accompanied by high fever, sudden hearing loss, severe dizziness, stiff neck, swelling behind the ear, or if a child is inconsolable."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Warm Compress',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A warm cloth or heating pad on low applied to the affected ear reduces pain and pressure. One of the safest and most immediate relief options.',
          warning: 'Never use a compress that is too hot. Test on your wrist first. Do not apply directly to the ear canal.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Garlic Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Garlic has powerful antimicrobial properties. Warm garlic infused oil dropped into the ear canal can reduce pain and fight infection in outer ear infections.',
          warning: 'Never use if eardrum may be perforated. Do not use in children with ear tubes. Warm to body temperature before use — never hot.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Mullein Ear Drops',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Mullein flower oil has anti-inflammatory and analgesic properties. Clinical studies show mullein ear drops are as effective as anesthetic ear drops for ear pain in children.',
          warning: 'Do not use if eardrum is perforated or if ear tubes are present.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Olive Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Warm olive oil dropped into the ear canal softens earwax buildup which is a common cause of ear pain and pressure.',
          warning: 'Never use if eardrum may be perforated. Warm to body temperature before use.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted tea tree oil applied around the outer ear has antimicrobial properties helpful for outer ear infections. Never place inside the ear canal.',
          warning: 'For external use around the outer ear only — never inside the ear canal. Always dilute heavily in carrier oil.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Hydrogen Peroxide',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A few drops of diluted hydrogen peroxide in the ear can help soften and remove earwax buildup causing pressure and pain.',
          warning: 'Use 3% solution diluted 50/50 with warm water. Never use if eardrum may be perforated. Tilt head and allow to sit for 1 minute then drain.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ibuprofen or Acetaminophen',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'For pain management while addressing the underlying cause. Ibuprofen is preferred for ear pain as it also reduces inflammation.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory that reduces both pain and swelling. More effective than acetaminophen for ear pain due to its anti-inflammatory properties.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for pain relief. Good option when ibuprofen cannot be used.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Debrox Ear Drops',
          desc: 'Carbamide peroxide drops that soften and remove earwax. Good for ear pain caused by wax buildup.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Antipyrine and Benzocaine Ear Drops',
          desc: 'OTC anesthetic ear drops that numb the ear canal for temporary pain relief. Not a treatment — pain relief only.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Amoxicillin (Prescription)',
          desc: 'Most commonly prescribed antibiotic for bacterial ear infections. Requires physician diagnosis and prescription.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg for pain and inflammation. Most effective OTC option for ear pain.',
          note: 'Take with food. Do not exceed 1,200mg per day without physician direction.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand acetaminophen for pain relief when ibuprofen cannot be used.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Warm cloth compress',
          desc: 'A warm damp cloth held against the affected ear provides immediate comfort and reduces pain.',
          note: 'Free and always available. Safe for all ages including infants.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}