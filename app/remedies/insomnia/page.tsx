import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Insomnia() {
  return (
    <RemedyPageLayout
      title="Insomnia"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if insomnia is accompanied by chest pain, difficulty breathing, severe depression, thoughts of self harm, or if you have gone more than 72 hours without sleep."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Melatonin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'The body\'s natural sleep hormone. Most effective for resetting the sleep cycle and jet lag rather than chronic insomnia. Start with the lowest effective dose — most people use far more than needed.',
          warning: 'Start with 0.5mg — most adults only need 0.5-1mg despite higher doses being commonly sold. Not for long term use without physician guidance.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium regulates GABA receptors and reduces cortisol, promoting deeper and more restful sleep. Glycinate form is the most effective for sleep and gentlest on the stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Valerian Root',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Increases GABA availability in the brain producing a calming effect. Takes 2-4 weeks of regular use to reach full effectiveness for chronic insomnia.',
          warning: 'May cause drowsiness. Do not drive after use. Do not combine with alcohol or sedatives. Avoid in pregnancy.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Apigenin in chamomile binds to GABA receptors producing a gentle sedating effect. Best used as part of a consistent bedtime routine.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ashwagandha',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Reduces cortisol and regulates the stress response which is a common underlying cause of insomnia. Most effective when taken regularly over several weeks.',
          warning: 'Avoid in pregnancy. May interact with thyroid medications.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'L-Theanine',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Promotes relaxation without sedation by increasing alpha brain waves. Works well combined with magnesium for sleep onset difficulty.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diffusing lavender oil in the bedroom or applying diluted to pulse points has clinical evidence for improving sleep quality and reducing nighttime waking.',
          warning: 'Always dilute before skin application. Do not ingest topical grade oil.',
          safeUse: 'One of the safest essential oils for diffusion around children and pets.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Passionflower',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Clinically studied for insomnia and anxiety related sleep disruption. Works by potentiating GABA receptors similar to benzodiazepines without dependency risk.',
          warning: 'May cause drowsiness. Do not combine with sedatives or alcohol. Avoid in pregnancy.',
          pregnancySafe: 'avoid',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Unisom (Doxylamine)',
          desc: 'First generation antihistamine with strong sedating properties. More effective than diphenhydramine for sleep. Tolerance develops quickly with regular use.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'ZzzQuil (Diphenhydramine)',
          desc: 'Antihistamine sleep aid. Effective for occasional sleeplessness but tolerance develops within days. Not for regular use.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ambien (Zolpidem)',
          desc: 'Prescription sedative hypnotic. Effective but carries risks of dependence, sleepwalking, and next day impairment. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Lunesta (Eszopiclone)',
          desc: 'Prescription sleep medication approved for longer term use than other sedative hypnotics. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic diphenhydramine',
          desc: 'Store brand sleep aid with diphenhydramine as the active ingredient. Same as ZzzQuil and Benadryl at a fraction of the cost.',
          note: 'Tolerance develops within 3-4 days. Do not use regularly. Avoid in elderly patients due to fall risk and confusion.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Chamomile tea',
          desc: 'Available at any grocery or convenience store. A cup 30-60 minutes before bed as part of a wind down routine.',
          note: 'Effects are mild — most effective as part of a consistent sleep hygiene routine rather than a standalone treatment.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Sleep hygiene basics',
          desc: 'Dark cool room, no screens 1 hour before bed, consistent sleep and wake time every day including weekends.',
          note: 'Free and more effective than any supplement or medication for chronic insomnia according to sleep medicine research.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}