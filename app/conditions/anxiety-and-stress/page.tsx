import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function AnxietyAndStress() {
  return (
    <ConditionPageLayoutV2
      title="Anxiety and Stress"
      subtitle="Sympathetic nervous system activation · acute or chronic"
      bodySystem="nervous"
      emergency="If you are experiencing thoughts of self-harm or suicide, please call or text 988 (Suicide and Crisis Lifeline) immediately. If anxiety is causing chest pain or difficulty breathing — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · NAMI · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Ashwagandha',
          desc: 'One of the most clinically studied adaptogens for stress and anxiety. Reduces cortisol levels and supports HPA axis regulation. KSM-66 is the most researched extract form.',
          warning: 'May interact with thyroid medications and immunosuppressants.',
          ageRange: 'Age 18+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Magnesium Glycinate',
          desc: 'Magnesium deficiency is directly linked to increased anxiety and stress response. Glycinate form is the most bioavailable and gentlest on the stomach.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'L-Theanine',
          desc: 'Amino acid found in green tea that promotes calm alertness without sedation. Increases alpha brain waves. Works well combined with caffeine to smooth out jitteriness.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          desc: 'Clinical evidence supports lavender aromatherapy for reducing anxiety. Silexan (oral lavender oil capsule) has shown effectiveness comparable to lorazepam in some clinical studies.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to wrists, temples, or chest for ongoing calming effect.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'One of the most studied essential oils for anxiety. Diffuse during stressful moments or before sleep.',
          },
        },
        {
          name: 'Passionflower',
          desc: 'Clinically studied for generalized anxiety. Works by potentiating GABA receptors similar to benzodiazepines but without dependency risk.',
          warning: 'May cause drowsiness. Do not combine with sedatives or alcohol.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Valerian Root',
          desc: 'Reduces anxiety and promotes relaxation by increasing GABA availability. Particularly effective for anxiety related to sleep difficulty.',
          warning: 'May cause drowsiness. Do not combine with alcohol or sedatives. Do not drive after use.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chamomile Tea',
          desc: 'Apigenin in chamomile binds to GABA receptors producing a gentle calming effect. Well tolerated and safe for daily use.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Bergamot Oil',
          desc: 'Citrus essential oil with clinical evidence for reducing anxiety and cortisol levels through inhalation.',
          oilSlug: 'bergamot-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Use FCF (furanocoumarin-free) bergamot for skin application. Regular bergamot is strongly phototoxic.',
            warning: 'Regular bergamot is strongly phototoxic — do not apply before sun exposure. Use FCF version for topical use.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse for mood-lifting calming effect.',
          },
        },
      ]}
      mainstreamItems={[
        {
          name: 'Buspar (Buspirone)',
          desc: 'Prescription non-habit-forming anti-anxiety medication. Takes 2-4 weeks to reach full effect.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'ask',
        },
        {
          name: 'SSRIs (Sertraline, Escitalopram)',
          desc: 'Prescription first-line medications for generalized anxiety disorder. Require physician supervision. Not for self-treatment.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl (Diphenhydramine)',
          desc: 'Sometimes used for acute anxiety relief due to sedating effects. Not a long-term solution and not recommended for regular use.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Chamomile tea bags',
          desc: 'Available at any grocery or convenience store. A cup of chamomile tea is a safe and effective immediate option for mild anxiety.',
          note: 'Effects are mild — this is a comfort and support measure, not a treatment for clinical anxiety.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Magnesium supplement',
          desc: 'Any store-brand magnesium supplement. Citrate or glycinate forms are preferred. Even a single dose can take the edge off acute stress.',
          note: 'High doses may cause diarrhea. Start with the lowest dose on the label.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          category: 'Box breathing',
          desc: 'Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4 times. Clinically proven to activate the parasympathetic nervous system.',
          note: 'Free, always available, no side effects. One of the most evidence-based interventions for acute anxiety.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}