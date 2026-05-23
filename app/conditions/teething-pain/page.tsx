import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function TeethingPain() {
  return (
    <ConditionPageLayoutV2
      title="Teething Pain"
      subtitle="Infant tooth eruption · gum inflammation"
      bodySystem="dental"
      emergency="Fever above 100.4°F (38°C), diarrhea, or rash along with teething symptoms — these are NOT caused by teething and indicate another illness that needs evaluation."
      dosageLink="/dosage-calculator"
      sources="AAP guidelines · FDA safety advisories · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Cold Teething Ring',
          desc: 'A chilled (not frozen) teething ring numbs gum tissue and provides counter-pressure that relieves teething pain. One of the safest and most effective options.',
          warning: 'Never freeze teething rings — frozen rings can damage delicate gum tissue. Chill in the refrigerator only.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Damp Cloth',
          desc: 'A clean damp washcloth chilled in the refrigerator and given to the baby to chew on provides gum numbing and counter-pressure relief.',
          warning: 'Supervise at all times during use.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          desc: 'Weak cooled chamomile tea given in small amounts has mild analgesic and anti-inflammatory properties that can soothe teething discomfort.',
          warning: 'Avoid in infants under 6 months without pediatrician guidance. Use very weak dilution. Avoid if ragweed allergy present.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Clove Oil',
          desc: 'Eugenol in clove oil is a natural anesthetic. Useful for teething pain in toddlers.',
          oilSlug: 'clove-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1 drop heavily diluted (1 drop per 4 tsp carrier oil = 0.5% dilution) to the gum with a clean cotton swab.',
            warning: 'Must be very heavily diluted — clove oil is extremely potent and can burn gum tissue if undiluted. Not for infants under 2.',
          },
        },
        {
          name: 'Gum Massage',
          desc: 'Gently massaging the baby\'s gums with a clean finger provides counter-pressure that relieves teething pain. Simple, free, and immediately available.',
          warning: 'Ensure hands are clean before massaging gums.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Amber Teething Necklaces (DO NOT USE)',
          desc: 'The FDA and AAP strongly advise against amber teething necklaces due to serious choking and strangulation risks. We list this here only to caution against use.',
          warning: 'Do NOT use amber teething necklaces. The FDA has issued safety warnings. There is no clinical evidence they reduce teething pain and they pose serious safety risks.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Infant Dye-Free (Acetaminophen)',
          desc: 'Acetaminophen at appropriate weight-based doses is the safest OTC option for teething pain relief. Look for the dye-free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Motrin Infant Dye-Free (Ibuprofen)',
          desc: 'Ibuprofen for infants 6 months and older. Anti-inflammatory properties make it effective for teething-associated inflammation.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Orajel Baby (Benzocaine) — DO NOT USE',
          desc: 'The FDA advises against using benzocaine products in children under 2 due to risk of methemoglobinemia. We list this only to caution against use in infants.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic infant acetaminophen',
          desc: 'Store-brand infant acetaminophen drops at the appropriate weight-based dose. Always dose by weight not age.',
          note: 'Use the dosing syringe that comes with the product. Never use a kitchen spoon for measuring liquid medication.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Cold spoon or cold damp cloth',
          desc: 'A chilled metal spoon or damp washcloth from the refrigerator gives immediate gum numbing relief.',
          note: 'Never freeze — chilled is effective and safe, frozen can damage gum tissue.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Clean finger gum massage',
          desc: 'Gently rub the affected gum area with a clean finger applying firm gentle pressure.',
          note: 'Free and always available. Wash hands thoroughly before use.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}