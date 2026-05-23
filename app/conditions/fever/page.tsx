import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Fever() {
  return (
    <ConditionPageLayoutV2
      title="Fever"
      subtitle="Elevated body temperature · immune response"
      emergency="Fever above 104°F (40°C), any fever in infants under 3 months, or fever with stiff neck, severe headache, difficulty breathing, or rash — seek emergency care immediately."
      dosageLink="/dosage-calculator"
      sources="AAP guidelines · NIH NCCIH · CDC fever management · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Lukewarm Bath',
          desc: 'A lukewarm (not cold) bath can help bring down a fever gently. Cold water can cause shivering which actually raises body temperature.',
          warning: 'Never use ice water or alcohol rubs — both can cause dangerous drops in temperature.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Elderberry Syrup',
          desc: 'Supports immune function and may help reduce duration of fever associated with viral illness. Well studied for cold and flu.',
          warning: 'Avoid with autoimmune conditions or immunosuppressant medications.',
          ageRange: 'Age 1+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          desc: 'Warming herb that promotes sweating which is the body\'s natural fever-breaking mechanism. Anti-inflammatory properties also help.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration',
          desc: 'Fever causes fluid loss through sweating. Staying well hydrated is the single most important thing you can do to support recovery.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          desc: 'The cooling menthol effect can provide comfort during a fever.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to the back of the neck and bottoms of feet for cooling comfort.',
            warning: 'Never apply near face or mouth of children under 6.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse for ambient cooling effect.',
          },
        },
        {
          name: 'Rest',
          desc: 'Fever is the immune system working. Rest allows the body to direct energy toward fighting infection rather than daily activity.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen is the go-to for fever in all ages including infants. Look specifically for the dye-free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen is effective for fever reduction and lasts longer than acetaminophen.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Children\'s Motrin Dye-Free',
          desc: 'Ibuprofen suspension without artificial dyes. Good option for children 6 months and older.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Any store-brand acetaminophen in the appropriate strength for age and weight. Widely available everywhere.',
          note: 'Check the label carefully for correct dosing by weight. Never give adult strength to children.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Any store-brand ibuprofen 200mg for adults or children\'s suspension for kids over 6 months.',
          note: 'Avoid if dehydrated — ibuprofen is harder on kidneys without adequate fluids.',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Cool damp cloth',
          desc: 'A cool damp cloth on the forehead, neck, and wrists can provide comfort and mild temperature reduction.',
          note: 'This is a comfort measure only — it will not significantly lower core body temperature on its own.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}