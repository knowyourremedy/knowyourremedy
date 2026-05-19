import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Fever() {
  return (
    <RemedyPageLayout
      title="Fever"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care immediately if fever is above 104°F (40°C), if an infant under 3 months has any fever, or if fever is accompanied by stiff neck, severe headache, difficulty breathing, or rash."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Lukewarm Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'A lukewarm (not cold) bath can help bring down a fever gently. Cold water can cause shivering which actually raises body temperature.',
          warning: 'Never use ice water or alcohol rubs — both can cause dangerous drops in temperature.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Elderberry Syrup',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Supports immune function and may help reduce duration of fever associated with viral illness. Well studied for cold and flu.',
          warning: 'Avoid with autoimmune conditions or immunosuppressant medications.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Warming herb that promotes sweating which is the body\'s natural fever-breaking mechanism. Anti-inflammatory properties also help.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Fever causes fluid loss through sweating. Staying well hydrated is the single most important thing you can do to support recovery.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Apply diluted to the back of the neck and bottoms of feet. The cooling menthol effect can provide comfort during a fever.',
          warning: 'Never apply near face or mouth of children under 6. Always dilute in a carrier oil.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Rest',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Fever is the immune system working. Rest allows the body to direct energy toward fighting infection rather than daily activity.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen is the go-to for fever in all ages including infants. Look specifically for the dye free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen is effective for fever reduction and lasts longer than acetaminophen. Not for infants under 6 months.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Children\'s Motrin Dye Free',
          desc: 'Ibuprofen suspension without artificial dyes. Good option for children 6 months and older.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Any store brand acetaminophen in the appropriate strength for age and weight. Widely available everywhere.',
          note: 'Check the label carefully for correct dosing by weight. Never give adult strength to children.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Any store brand ibuprofen 200mg for adults or children\'s suspension for kids over 6 months.',
          note: 'Not for infants under 6 months. Avoid if dehydrated — ibuprofen is harder on kidneys without adequate fluids.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Cool damp cloth',
          desc: 'A cool damp cloth on the forehead, neck, and wrists can provide comfort and mild temperature reduction.',
          note: 'This is a comfort measure only — it will not significantly lower core body temperature on its own.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}