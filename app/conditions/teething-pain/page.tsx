import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function TeethingPain() {
  return (
    <RemedyPageLayout
      title="Teething Pain"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if your baby has a fever above 100.4°F (38°C), diarrhea, or rash along with teething symptoms — these are not caused by teething and indicate another illness that needs evaluation."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Cold Teething Ring',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A chilled (not frozen) teething ring numbs gum tissue and provides counter pressure that relieves teething pain. One of the safest and most effective options.',
          warning: 'Never freeze teething rings — frozen rings can damage delicate gum tissue. Chill in the refrigerator only.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Damp Cloth',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A clean damp washcloth chilled in the refrigerator and given to the baby to chew on provides gum numbing and counter pressure relief.',
          safeUse: 'Safe from birth. Supervise at all times during use.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Weak cooled chamomile tea given in small amounts has mild analgesic and anti-inflammatory properties that can soothe teething discomfort.',
          warning: 'Avoid in infants under 6 months without pediatrician guidance. Use very weak dilution. Avoid if ragweed allergy present.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Clove Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Eugenol in clove oil is a natural anesthetic. Apply a tiny amount heavily diluted in carrier oil to the gum with a clean finger or cotton swab.',
          warning: 'Must be very heavily diluted — clove oil is extremely potent and can burn gum tissue if undiluted. Maximum 0.5% dilution for infants. Not for infants under 2.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Gum Massage',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Gently massaging the baby\'s gums with a clean finger provides counter pressure that relieves teething pain. Simple, free, and immediately available.',
          safeUse: 'Safe from birth. Ensure hands are clean before massaging gums.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Amber Teething Necklaces',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Note: The FDA and AAP strongly advise against amber teething necklaces due to serious choking and strangulation risks. We include this only to caution against use.',
          warning: 'Do not use amber teething necklaces. The FDA has issued safety warnings. There is no clinical evidence they reduce teething pain and they pose serious safety risks.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Infant Dye Free (Acetaminophen)',
          desc: 'Acetaminophen at appropriate weight based doses is the safest OTC option for teething pain relief. Look for the dye free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Motrin Infant Dye Free (Ibuprofen)',
          desc: 'Ibuprofen for infants 6 months and older. Anti-inflammatory properties make it effective for teething associated inflammation.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Orajel Baby (Benzocaine)',
          desc: 'The FDA advises against using benzocaine products in children under 2 due to risk of methemoglobinemia. We include this only to caution against use in infants.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic infant acetaminophen',
          desc: 'Store brand infant acetaminophen drops at the appropriate weight based dose. Always dose by weight not age.',
          note: 'Use the dosing syringe that comes with the product. Never use a kitchen spoon for measuring liquid medication.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Cold spoon or cold damp cloth',
          desc: 'A chilled metal spoon or damp washcloth from the refrigerator gives immediate gum numbing relief.',
          note: 'Never freeze — chilled is effective and safe, frozen can damage gum tissue.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Clean finger gum massage',
          desc: 'Gently rub the affected gum area with a clean finger applying firm gentle pressure.',
          note: 'Free and always available. Wash hands thoroughly before use.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}