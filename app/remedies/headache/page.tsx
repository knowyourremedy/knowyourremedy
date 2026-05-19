import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Headache() {
  return (
    <RemedyPageLayout
      title="Headache"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="If your headache is sudden and severe, the worst of your life, or accompanied by fever, stiff neck, confusion, or vision changes — seek emergency care immediately."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Peppermint Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Apply diluted to temples and back of neck for tension headaches. One of the most well studied natural headache remedies.',
          warning: 'Mix with a carrier oil before applying to skin. Never apply undiluted. Never swallow topical grade oil. Not safe for children under 6.',
          safeUse: 'Safe to use in a diffuser for adults. Do not diffuse around children under 6, infants, or cats.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Inhale directly or apply diluted to temples. Effective for stress and tension headaches. Calming and widely tolerated.',
          warning: 'Mix with a carrier oil before applying to skin. Never apply undiluted.',
          safeUse: 'Safe to smell directly from the bottle. One of the gentlest oils for use around children and most pets.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency is one of the most common triggers for chronic headaches and migraines. Glycinate form is the most bioavailable and gentlest on the stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory properties help reduce headache intensity. Particularly effective for nausea related headaches.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Feverfew',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Traditionally used for migraine prevention. Some clinical evidence supports regular use for migraine frequency reduction.',
          warning: 'Not recommended during pregnancy. Consult a doctor before use if on blood thinners.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Hydration',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Dehydration is one of the most common and overlooked causes of headaches. Drink a full glass of water before reaching for anything else.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Excedrin Tension Headache',
          desc: 'Acetaminophen and caffeine only. No aspirin. Fewer ingredients than most combination headache products.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          pregnancySafe: 'ask',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Single active ingredient acetaminophen. Look specifically for the dye free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablet versions.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic single-ingredient ibuprofen',
          desc: 'Any store or generic brand ibuprofen 200mg. Widely available and effective for headache pain.',
          note: 'Avoid combination products like Advil Cold & Sinus unless you have those symptoms too.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Generic single-ingredient acetaminophen',
          desc: 'Any store or generic brand acetaminophen 325mg or 500mg. Gentler on the stomach than ibuprofen.',
          note: 'Check the label for dyes and artificial ingredients. Plain white tablets are usually the cleanest option available.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Water and electrolytes',
          desc: 'A bottle of water and any electrolyte packet or sports drink. Dehydration is a top cause of headaches.',
          note: 'Sports drinks are high in sugar and artificial ingredients — use sparingly and only if plain water is not helping.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}