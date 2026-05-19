import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function TensionHeadaches() {
  return (
    <RemedyPageLayout
      title="Tension Headaches"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if your headache is sudden and severe, the worst of your life, accompanied by fever, stiff neck, confusion, vision changes, or weakness on one side of the body."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'The most clinically studied natural remedy for tension headaches. Apply diluted to the temples, forehead, and back of neck. Menthol activates cold receptors and reduces pain signal transmission.',
          warning: 'Always dilute before skin application. Never apply near eyes. Not for children under 6.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency causes muscle tension and hypersensitivity of pain receptors that trigger tension headaches. Regular supplementation reduces frequency and severity.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Inhaling lavender oil or applying diluted to temples reduces tension headache pain and associated anxiety. Works synergistically with peppermint oil.',
          warning: 'Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Heat Therapy',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Applying heat to the neck and shoulders relaxes the tense muscles that cause tension headaches. A warm shower or heating pad on the neck is often as effective as medication.',
          warning: 'Never apply heat directly to skin. Use a cloth barrier.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Neck and Shoulder Massage',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Tension headaches originate in tight muscles of the neck, shoulders, and scalp. Massage releases these trigger points and provides significant relief.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory properties reduce headache intensity. Also addresses nausea that sometimes accompanies severe tension headaches.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Dehydration is one of the most common triggers for tension headaches. Drinking a full glass of water at the first sign of a headache often provides significant relief.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Frankincense Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Anti-inflammatory and analgesic properties. Apply diluted to temples and forehead or diffuse for tension headache relief and stress reduction.',
          warning: 'Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen is effective for tension headache pain. Single active ingredient dye free version is the cleanest option.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory NSAID that addresses both pain and muscle inflammation contributing to tension headaches.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Aleve (Naproxen)',
          desc: 'Longer lasting NSAID for tension headaches that persist throughout the day. One dose lasts 8-12 hours.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Excedrin Tension Headache',
          desc: 'Combination of acetaminophen and caffeine. Caffeine enhances pain reliever absorption and constricts blood vessels.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand acetaminophen 325-500mg. Take at the first sign of a tension headache for best results.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic ibuprofen',
          desc: 'Store brand ibuprofen 200-400mg. More effective than acetaminophen for tension headaches with a muscle tension component.',
          note: 'Take with food. Do not exceed 1,200mg per day without physician direction.',
          pregnancySafe: 'avoid',
        },
        {
          category: 'Cold or warm compress and dark room',
          desc: 'Some people respond better to cold on the forehead and warm on the neck. Try both and use whichever provides more relief.',
          note: 'Removing yourself from bright light and noise while applying temperature therapy can abort a tension headache without medication.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}