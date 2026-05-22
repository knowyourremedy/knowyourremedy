import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Headache() {
  return (
    <ConditionPageLayoutV2
      title="Headache"
      subtitle="Most common: tension headache"
      bodySystem="head"
      emergency="Sudden, severe, &ldquo;worst of your life,&rdquo; or with fever, stiff neck, confusion, or vision changes — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAP guidelines · Tisserand & Young 2014 · AAN migraine guidelines"
      naturalItems={[
        {
          name: 'Peppermint Oil',
          desc: 'One of the most well-studied natural headache remedies.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1-2 diluted drops to temples and base of neck. Cooling sensation relieves within 15-20 min.',
          },
          diffuse: {
            ageRange: 'Adults only',
            pregnancySafe: 'ask',
            desc: 'Use in a diffuser for general tension relief.',
            warning: 'Avoid diffusing around children under 6, infants, or cats.',
          },
          internal: {
            ageRange: 'Age 8+',
            pregnancySafe: 'ask',
            desc: 'Enteric-coated peppermint oil capsules (e.g., IBgard, Pepogest) can reduce IBS-related tension headaches. Take with water 30 min before meals.',
          },
        },
        {
          name: 'Lavender Oil',
          desc: 'Calming and widely tolerated. Effective for stress and tension headaches.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to temples or the base of the neck. Effective for stress and tension headaches.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Safe to smell directly from the bottle. One of the gentlest oils for use around children and most pets.',
          },
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency is one of the most common triggers for chronic headaches and migraines. Glycinate form is the most bioavailable and gentlest on the stomach.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          desc: 'Anti-inflammatory properties help reduce headache intensity. Particularly effective for nausea-related headaches.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Feverfew',
          desc: 'Traditionally used for migraine prevention. Some clinical evidence supports regular use for migraine frequency reduction.',
          warning: 'Consult a doctor before use if on blood thinners.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Hydration',
          desc: 'Dehydration is one of the most common and overlooked causes of headaches. Drink a full glass of water before reaching for anything else.',
          ageRange: 'All ages',
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
          ageRange: 'Age 12+',
        },
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Single active ingredient: acetaminophen. Look specifically for the dye-free version.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Fewer dyes and binders than tablet versions.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          pregnancySafe: 'avoid',
          ageRange: 'Age 6mo+',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic single-ingredient ibuprofen',
          desc: 'Any store or generic brand ibuprofen 200mg. Widely available and effective for headache pain.',
          note: 'Avoid combination products like Advil Cold & Sinus unless you have those symptoms too.',
          pregnancySafe: 'avoid',
          ageRange: 'Age 6mo+',
        },
        {
          category: 'Generic single-ingredient acetaminophen',
          desc: 'Any store or generic brand acetaminophen 325mg or 500mg. Gentler on the stomach than ibuprofen.',
          note: 'Check the label for dyes and artificial ingredients. Plain white tablets are usually the cleanest option available.',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          category: 'Water and electrolytes',
          desc: 'A bottle of water and any electrolyte packet or sports drink. Dehydration is a top cause of headaches.',
          note: 'Sports drinks are high in sugar and artificial ingredients — use sparingly and only if plain water is not helping.',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
      ]}
    />
  )
}