import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function TensionHeadaches() {
  return (
    <ConditionPageLayoutV2
      title="Tension Headaches"
      subtitle="Muscular origin · most common headache type"
      bodySystem="head"
      emergency="Sudden, severe, &ldquo;worst of your life,&rdquo; or with fever, stiff neck, confusion, vision changes, or weakness on one side &mdash; seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAP guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Peppermint Oil',
          desc: 'The most clinically studied natural remedy for tension headaches. Menthol activates cold receptors and reduces pain signal transmission.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1-2 diluted drops to temples, forehead, and back of neck at onset.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
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
          desc: 'Inhaling lavender or applying diluted to temples reduces tension headache pain and associated anxiety. Works synergistically with peppermint.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to temples and base of neck.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Safe to smell directly from the bottle. One of the gentlest oils for use around children and most pets.',
          },
        },
        {
          name: 'Frankincense Oil',
          desc: 'Anti-inflammatory and analgesic properties. Useful for tension headache relief and stress reduction.',
          oilSlug: 'frankincense-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to temples and forehead at onset.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Use in a diffuser for general tension relief and stress reduction.',
          },
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency causes muscle tension and hypersensitivity of pain receptors that trigger tension headaches. Regular supplementation reduces frequency and severity.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Heat Therapy',
          desc: 'Applying heat to the neck and shoulders relaxes the tense muscles that cause tension headaches. A warm shower or heating pad on the neck is often as effective as medication.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Neck and Shoulder Massage',
          desc: 'Tension headaches originate in tight muscles of the neck, shoulders, and scalp. Massage releases these trigger points and provides significant relief.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          desc: 'Anti-inflammatory properties reduce headache intensity. Also addresses nausea that sometimes accompanies severe tension headaches.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration',
          desc: 'Dehydration is one of the most common triggers for tension headaches. Drinking a full glass of water at the first sign of a headache often provides significant relief.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Single active ingredient: acetaminophen. Effective for tension headache pain. Dye-free version is the cleanest option.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. NSAID addresses both pain and muscle inflammation contributing to tension headaches.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
          ageRange: 'Age 6mo+',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer-lasting NSAID for tension headaches that persist throughout the day. One dose lasts 8-12 hours.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
          ageRange: 'Age 12+',
        },
        {
          name: 'Excedrin Tension Headache',
          desc: 'Combination of acetaminophen and caffeine. Caffeine enhances pain reliever absorption and constricts blood vessels.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
          ageRange: 'Age 12+',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand acetaminophen 325-500mg. Take at the first sign of a tension headache for best results.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg. More effective than acetaminophen for tension headaches with a muscle tension component.',
          note: 'Take with food. Do not exceed 1,200mg per day without physician direction.',
          pregnancySafe: 'avoid',
          ageRange: 'Age 6mo+',
        },
        {
          category: 'Cold or warm compress and dark room',
          desc: 'Some people respond better to cold on the forehead and warm on the neck. Try both and use whichever provides more relief.',
          note: 'Removing yourself from bright light and noise while applying temperature therapy can abort a tension headache without medication.',
          pregnancySafe: 'safe',
          ageRange: 'All ages',
        },
      ]}
    />
  )
}