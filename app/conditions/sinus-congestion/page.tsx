import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function SinusCongestion() {
  return (
    <RemedyPageLayout
      title="Sinus Congestion"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek medical care if congestion is accompanied by severe facial pain or pressure, high fever, vision changes, stiff neck, swelling around the eyes, or symptoms that worsen after 10 days or improve then return."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Saline Nasal Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Rinsing nasal passages with sterile saline solution flushes out allergens, mucus, and pathogens. One of the most evidence based interventions for sinus congestion of any cause.',
          warning: 'Always use distilled, sterile, or previously boiled and cooled water. Never use tap water directly in a neti pot.',
          safeUse: 'Safe for all ages. Use age appropriate saline drops or spray for infants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Steam Inhalation',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Breathing steam from a bowl of hot water loosens thick mucus and relieves sinus pressure. Add eucalyptus or peppermint oil for added decongestant effect.',
          warning: 'Supervise children closely — hot steam can cause serious burns. Do not use boiling water.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Eucalyptus Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: '1,8-cineole in eucalyptus oil is a proven mucolytic and decongestant. Add a few drops to a steam bowl or diffuser for immediate sinus relief.',
          warning: 'Never use on or near children under 10. Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Menthol in peppermint oil opens nasal passages and reduces sinus pressure. Diffuse or apply diluted under the nose and on the chest.',
          warning: 'Never apply near face or mouth of children under 6. Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Ginger Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Anti-inflammatory properties reduce sinus inflammation and mucus production. Warming effect promotes sinus drainage.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Natural antihistamine and anti-inflammatory that stabilizes mast cells and reduces histamine driven sinus congestion. Most effective as a preventive for allergy related congestion.',
          warning: 'May interact with certain antibiotics and blood thinners.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Horseradish',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Fresh horseradish is a powerful natural decongestant. The volatile compounds stimulate mucus flow and clear sinus passages almost immediately.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Humidifier',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Adding moisture to dry air prevents mucus from thickening and keeps sinus passages from drying out. Cool mist humidifiers are preferred over steam humidifiers for children.',
          safeUse: 'Safe for all ages. Clean the humidifier regularly to prevent mold growth.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Sudafed (Pseudoephedrine)',
          desc: 'The most effective OTC decongestant. Shrinks swollen nasal passages. Available behind the pharmacy counter. Avoid with heart conditions or high blood pressure.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Afrin (Oxymetazoline Nasal Spray)',
          desc: 'Fast acting nasal decongestant spray. Works within minutes. Do not use for more than 3 consecutive days — causes rebound congestion.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Mucinex (Guaifenesin)',
          desc: 'Expectorant that thins and loosens mucus making it easier to drain. Single ingredient and well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Flonase (Fluticasone)',
          desc: 'Nasal corticosteroid spray that reduces sinus inflammation. Most effective for allergy related congestion with regular use. Takes a few days to reach full effect.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Amoxicillin (Prescription)',
          desc: 'Antibiotic for bacterial sinusitis. Most sinus infections are viral and do not respond to antibiotics. Requires physician diagnosis.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Saline nasal spray',
          desc: 'Available at any pharmacy. Flushes allergens and mucus from nasal passages without any medication.',
          note: 'Use before any other nasal medication to maximize effectiveness. Safe to use as many times per day as needed.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic pseudoephedrine',
          desc: 'Store brand decongestant available behind the pharmacy counter. Most effective OTC option for congestion relief.',
          note: 'Avoid with heart disease, high blood pressure, thyroid disease, or diabetes. Do not use with MAOIs.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Hot shower or steam',
          desc: 'A hot shower or bowl of hot water to breathe steam over provides immediate temporary relief from sinus congestion.',
          note: 'Adding a few drops of eucalyptus or peppermint oil to a steam bowl enhances the decongestant effect.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}