import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Insomnia() {
  return (
    <ConditionPageLayoutV2
      title="Insomnia"
      subtitle="Sleep onset or maintenance difficulty"
      bodySystem="nervous"
      emergency="Insomnia accompanied by chest pain, difficulty breathing, severe depression, thoughts of self-harm, or more than 72 hours without sleep — seek medical care. For crisis support, call or text 988."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · NIH Office of Dietary Supplements · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Melatonin',
          desc: 'The body\'s natural sleep hormone. Most effective for resetting the sleep cycle and jet lag rather than chronic insomnia. Start with the lowest effective dose — most people use far more than needed.',
          warning: 'Start with 0.5mg — most adults only need 0.5-1mg despite higher doses being commonly sold. Not for long-term use without physician guidance.',
          ageRange: 'Age 3+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium regulates GABA receptors and reduces cortisol, promoting deeper and more restful sleep. Glycinate form is the most effective for sleep and gentlest on the stomach.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Valerian Root',
          desc: 'Increases GABA availability in the brain producing a calming effect. Takes 2-4 weeks of regular use to reach full effectiveness for chronic insomnia.',
          warning: 'May cause drowsiness. Do not drive after use. Do not combine with alcohol or sedatives.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chamomile Tea',
          desc: 'Apigenin in chamomile binds to GABA receptors producing a gentle sedating effect. Best used as part of a consistent bedtime routine.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ashwagandha',
          desc: 'Reduces cortisol and regulates the stress response which is a common underlying cause of insomnia. Most effective when taken regularly over several weeks.',
          warning: 'May interact with thyroid medications.',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'L-Theanine',
          desc: 'Promotes relaxation without sedation by increasing alpha brain waves. Works well combined with magnesium for sleep onset difficulty.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          desc: 'Clinical evidence for improving sleep quality and reducing nighttime waking.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to pulse points (wrists, behind ears) before bed.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Diffuse in the bedroom 30 minutes before sleep. One of the safest essential oils for diffusion around children and pets.',
          },
        },
        {
          name: 'Passionflower',
          desc: 'Clinically studied for insomnia and anxiety-related sleep disruption. Works by potentiating GABA receptors similar to benzodiazepines without dependency risk.',
          warning: 'May cause drowsiness. Do not combine with sedatives or alcohol.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Unisom (Doxylamine)',
          desc: 'First-generation antihistamine with strong sedating properties. More effective than diphenhydramine for sleep. Tolerance develops quickly with regular use.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'ZzzQuil (Diphenhydramine)',
          desc: 'Antihistamine sleep aid. Effective for occasional sleeplessness but tolerance develops within days. Not for regular use.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ambien (Zolpidem)',
          desc: 'Prescription sedative-hypnotic. Effective but carries risks of dependence, sleepwalking, and next-day impairment. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Lunesta (Eszopiclone)',
          desc: 'Prescription sleep medication approved for longer-term use than other sedative-hypnotics. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic diphenhydramine',
          desc: 'Store-brand sleep aid with diphenhydramine as the active ingredient. Same as ZzzQuil and Benadryl at a fraction of the cost.',
          note: 'Tolerance develops within 3-4 days. Do not use regularly. Avoid in elderly patients due to fall risk and confusion.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Chamomile tea',
          desc: 'Available at any grocery or convenience store. A cup 30-60 minutes before bed as part of a wind-down routine.',
          note: 'Effects are mild — most effective as part of a consistent sleep hygiene routine rather than a standalone treatment.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Sleep hygiene basics',
          desc: 'Dark cool room, no screens 1 hour before bed, consistent sleep and wake time every day including weekends.',
          note: 'Free and more effective than any supplement or medication for chronic insomnia according to sleep medicine research.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}