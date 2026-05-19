import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Colic() {
  return (
    <RemedyPageLayout
      title="Colic"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if your baby has a fever over 100.4°F (38°C), is vomiting forcefully, has blood in stool, is not eating, or crying is accompanied by a bulging fontanelle or stiff neck."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Gripe Water',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Traditional remedy combining ginger, fennel, and chamomile to relieve gas and digestive discomfort in infants. Look for alcohol-free formulations.',
          warning: 'Always choose alcohol-free and sucrose-free formulas. Check ingredients carefully — formulations vary widely by brand.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Simethicone Drops',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Breaks up gas bubbles in the digestive tract. Mylicon infant drops are the most commonly used and well tolerated option for gassy infants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Fennel Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Weak fennel tea given in small amounts has clinical evidence for reducing colic symptoms. Relaxes smooth muscle in the GI tract.',
          warning: 'Use very weak dilution for infants. Do not use fennel essential oil concentrate in infants — only weak tea.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Weak chamomile tea has been shown to reduce colic symptoms. Apigenin relaxes GI smooth muscle and reduces gas and cramping.',
          warning: 'Avoid in infants under 6 months without pediatrician guidance. Avoid if ragweed allergy is present in the family.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Probiotics (Lactobacillus reuteri)',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'L. reuteri specifically has the strongest clinical evidence for reducing colic crying time in breastfed infants. Multiple studies show significant reduction in daily crying.',
          warning: 'Look specifically for L. reuteri DSM 17938 strain for best evidence. Consult pediatrician before use in premature infants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted lavender oil massaged gently onto the abdomen in a clockwise direction may help relieve gas and calm a colicky infant.',
          warning: 'Must be heavily diluted — maximum 0.5% dilution for infants (1 drop per 4 teaspoons carrier oil). Avoid near face.',
          pregnancySafe: 'safe',
        },
        {
          name: 'White Noise and Motion',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'White noise mimics sounds heard in the womb and activates the calming reflex. Combined with gentle rhythmic motion — rocking, car rides, or baby swings — can significantly reduce colic crying.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Mylicon Infant Gas Drops',
          desc: 'Simethicone 20mg per dose. The most widely recommended OTC option for infant gas and colic. Well tolerated and safe from birth.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Little Remedies Gas Relief Drops',
          desc: 'Simethicone drops with minimal inactive ingredients. A cleaner alternative to some other infant gas drop brands.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Enfamil Nutramigen Formula',
          desc: 'Hypoallergenic formula for formula-fed infants with colic suspected to be related to cow milk protein sensitivity.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic simethicone infant drops',
          desc: 'Store brand gas drops with simethicone as the only active ingredient. Same effectiveness as name brands.',
          note: 'Check that simethicone is the only active ingredient. Avoid formulations with alcohol or artificial sweeteners.',
        },
        {
          category: 'Bicycle legs and tummy massage',
          desc: 'Gently move baby\'s legs in a bicycle motion while lying on back. Follow with gentle clockwise tummy massage to help move trapped gas.',
          note: 'Free and always available. Can be done as many times as needed without any risk.',
        },
        {
          category: 'Warm bath',
          desc: 'A warm bath can relax abdominal muscles and help relieve gas and cramping in colicky infants.',
          note: 'Always check water temperature carefully. Never leave an infant unattended in water.',
        },
      ]}
    />
  )
}