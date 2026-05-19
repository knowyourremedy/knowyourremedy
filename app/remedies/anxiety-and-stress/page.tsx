import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function AnxietyAndStress() {
  return (
    <RemedyPageLayout
      title="Anxiety & Stress"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="If you are experiencing thoughts of self-harm or suicide, please call or text 988 (Suicide and Crisis Lifeline) immediately. If anxiety is causing chest pain or difficulty breathing seek emergency care."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Ashwagandha',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the most clinically studied adaptogens for stress and anxiety. Reduces cortisol levels and supports HPA axis regulation. KSM-66 is the most researched extract form.',
          warning: 'Avoid in pregnancy. May interact with thyroid medications and immunosuppressants.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Magnesium Glycinate',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Magnesium deficiency is directly linked to increased anxiety and stress response. Glycinate form is the most bioavailable and gentlest on the stomach.',
          pregnancySafe: 'safe',
        },
        {
          name: 'L-Theanine',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Amino acid found in green tea that promotes calm alertness without sedation. Increases alpha brain waves. Works well combined with caffeine to smooth out jitteriness.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Clinical evidence supports lavender aromatherapy for reducing anxiety. Silexan (oral lavender oil capsule) has shown effectiveness comparable to lorazepam in some studies.',
          warning: 'Always dilute before skin application. Do not ingest topical grade oil.',
          safeUse: 'Safe to diffuse. One of the most studied essential oils for anxiety.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Passionflower',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Clinically studied for generalized anxiety. Works by potentiating GABA receptors similar to benzodiazepines but without dependency risk.',
          warning: 'May cause drowsiness. Do not combine with sedatives or alcohol. Avoid in pregnancy.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Valerian Root',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Reduces anxiety and promotes relaxation by increasing GABA availability. Particularly effective for anxiety related to sleep difficulty.',
          warning: 'May cause drowsiness. Do not combine with alcohol or sedatives. Do not drive after use.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Apigenin in chamomile binds to GABA receptors producing a gentle calming effect. Well tolerated and safe for daily use.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Bergamot Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Citrus essential oil with clinical evidence for reducing anxiety and cortisol levels through inhalation.',
          warning: 'Use FCF (furanocoumarin-free) bergamot for skin application. Regular bergamot is strongly phototoxic — do not apply before sun exposure.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Buspar (Buspirone)',
          desc: 'Prescription non-habit-forming anti-anxiety medication. Takes 2-4 weeks to reach full effect. Consult your doctor.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'SSRIs (Sertraline, Escitalopram)',
          desc: 'Prescription first-line medications for generalized anxiety disorder. Require physician supervision. Not listed here for self-treatment.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
        },
        {
          name: 'Benadryl (Diphenhydramine)',
          desc: 'Sometimes used for acute anxiety relief due to sedating effects. Not a long term solution and not recommended for regular use.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
        },
      ]}
      inPinchItems={[
        {
          category: 'Chamomile tea bags',
          desc: 'Available at any grocery or convenience store. A cup of chamomile tea is a safe and effective immediate option for mild anxiety.',
          note: 'Effects are mild — this is a comfort and support measure, not a treatment for clinical anxiety.',
        },
        {
          category: 'Magnesium supplement',
          desc: 'Any store brand magnesium supplement. Citrate or glycinate forms are preferred. Even a single dose can take the edge off acute stress.',
          note: 'High doses may cause diarrhea. Start with the lowest dose on the label.',
        },
        {
          category: 'Deep breathing or box breathing',
          desc: 'Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4 times. Clinically proven to activate the parasympathetic nervous system.',
          note: 'Free, always available, no side effects. One of the most evidence-based interventions for acute anxiety.',
        },
      ]}
    />
  )
}