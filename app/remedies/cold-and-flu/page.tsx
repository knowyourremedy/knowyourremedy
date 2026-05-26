import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function ColdAndFlu() {
  return (
    <RemedyPageLayout
      title="Cold & Flu"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if you experience difficulty breathing, persistent chest pain, confusion, severe vomiting, or symptoms that improve then return with fever and worsening cough."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Elderberry Syrup',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the most studied natural remedies for cold and flu. Clinical evidence supports reducing duration and severity of symptoms.',
          warning: 'Avoid with autoimmune conditions or immunosuppressant medications.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Echinacea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Supports immune function and may reduce duration of upper respiratory infections when taken at first sign of symptoms.',
          warning: 'Do not use for more than 10 consecutive days. Avoid with autoimmune conditions.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Zinc Lozenges',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Zinc taken within 24 hours of symptom onset has clinical evidence for reducing cold duration. Use lozenges for best absorption.',
          warning: 'Do not exceed 40mg per day long term. Nasal zinc sprays have been linked to permanent loss of smell — avoid.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Honey',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Raw or manuka honey is clinically proven to be as effective as dextromethorphan for nighttime cough in children over 1 year.',
          warning: 'Never give to infants under 12 months — risk of infant botulism.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory and warming. Helps relieve sore throat, congestion, and nausea associated with cold and flu.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin C',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'May reduce duration and severity of cold symptoms when taken regularly. Most effective as prevention rather than treatment.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Eucalyptus Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Steam inhalation with eucalyptus oil helps open airways and relieve congestion. Can also be applied diluted to chest.',
          warning: 'Never use on or near children under 10. Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Saline Nasal Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Rinsing nasal passages with saline solution clears mucus, reduces congestion, and flushes out viral particles.',
          safeUse: 'Safe for all ages including infants with appropriate saline drops. Always use distilled or previously boiled water.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Steam Inhalation',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Breathing steam from a bowl of hot water loosens mucus and relieves congestion. Add a few drops of eucalyptus oil for added effect.',
          warning: 'Supervise children closely — hot steam can cause serious burns.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration and Rest',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'The two most important things you can do. Fluids thin mucus and prevent dehydration. Rest allows the immune system to work.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Mucinex (Guaifenesin)',
          desc: 'Expectorant that thins and loosens mucus. Single ingredient — one of the cleaner OTC options for congestion.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for fever and body aches. Single active ingredient, dye free version is the cleanest option.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen for fever, body aches, and inflammation. Fewer dyes and binders than tablet versions.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Sudafed (Pseudoephedrine)',
          desc: 'Most effective OTC decongestant. Available behind the pharmacy counter. Avoid with heart conditions or high blood pressure.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'NyQuil / DayQuil',
          desc: 'Combination products with multiple active ingredients. Only use if you have all the symptoms listed — otherwise you are taking unnecessary ingredients.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic acetaminophen or ibuprofen',
          desc: 'For fever and body aches. Single ingredient versions are available at any pharmacy or convenience store.',
          note: 'Avoid multi-symptom combination products unless you have every symptom listed on the box.',
        },
        {
          category: 'Generic guaifenesin',
          desc: 'Store brand expectorant for congestion. Same active ingredient as Mucinex at a fraction of the cost.',
          note: 'Drink plenty of water — guaifenesin works by thinning mucus which requires adequate hydration.',
        },
        {
          category: 'Hot water with honey and lemon',
          desc: 'Honey soothes the throat and has antimicrobial properties. Lemon provides vitamin C. Hot water helps with congestion.',
          note: 'Not for infants under 12 months due to honey. Use warm not boiling water to preserve honey\'s beneficial properties.',
        },
      ]}
    />
  )
}