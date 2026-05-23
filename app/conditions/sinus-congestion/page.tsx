import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function SinusCongestion() {
  return (
    <ConditionPageLayoutV2
      title="Sinus Congestion"
      subtitle="Sinus inflammation · viral, bacterial, or allergic"
      bodySystem="respiratory"
      emergency="Severe facial pain or pressure, high fever, vision changes, stiff neck, swelling around the eyes, or symptoms worsening after 10 days or improving then returning — seek medical care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · CDC · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Saline Nasal Rinse',
          desc: 'Rinsing nasal passages with sterile saline solution flushes out allergens, mucus, and pathogens. One of the most evidence-based interventions for sinus congestion of any cause.',
          warning: 'Always use distilled, sterile, or previously boiled and cooled water. Never use tap water directly in a neti pot.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Steam Inhalation',
          desc: 'Breathing steam from a bowl of hot water loosens thick mucus and relieves sinus pressure. Add eucalyptus or peppermint oil for added decongestant effect (adults only).',
          warning: 'Supervise children closely — hot steam can cause serious burns. Do not use boiling water. Adults only for added essential oils.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Eucalyptus Oil',
          desc: '1,8-cineole in eucalyptus oil is a proven mucolytic and decongestant.',
          oilSlug: 'eucalyptus-oil',
          topical: {
            ageRange: 'Age 10+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to chest for decongestant effect.',
            warning: 'NEVER use on skin of children under 10 — can cause serious breathing problems and seizures.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse or use 2-3 drops in a steam bowl for immediate sinus relief (adults only for steam).',
          },
        },
        {
          name: 'Peppermint Oil',
          desc: 'Menthol opens nasal passages and reduces sinus pressure.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted under the nose and on the chest. Never apply near face of children under 6.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse for ambient decongestant effect.',
          },
        },
        {
          name: 'Oregano Oil',
          desc: 'Antimicrobial essential oil with strong tradition of internal use for acute bacterial respiratory and sinus infections.',
          oilSlug: 'oregano-oil',
          internal: {
            ageRange: 'Age 18+',
            pregnancySafe: 'avoid',
            desc: 'Adults only: 1 enteric-coated softgel daily during acute illness, OR 1 drop in 1 tsp olive oil at first sign of bacterial sinus infection (Worwood). Short-term use only — maximum 5-7 days.',
            warning: 'Never use neat (undiluted). Avoid with blood thinners and lithium. For suspected bacterial sinusitis only — see doctor for severe or persistent symptoms.',
          },
        },
        {
          name: 'Ginger Tea',
          desc: 'Anti-inflammatory properties reduce sinus inflammation and mucus production. Warming effect promotes sinus drainage.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          desc: 'Natural antihistamine and anti-inflammatory that stabilizes mast cells and reduces histamine-driven sinus congestion. Most effective as a preventive for allergy-related congestion.',
          warning: 'May interact with certain antibiotics and blood thinners.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Horseradish',
          desc: 'Fresh horseradish is a powerful natural decongestant. The volatile compounds stimulate mucus flow and clear sinus passages almost immediately.',
          ageRange: 'Age 12+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Humidifier',
          desc: 'Adding moisture to dry air prevents mucus from thickening and keeps sinus passages from drying out. Cool mist humidifiers are preferred over steam humidifiers for children.',
          warning: 'Clean the humidifier regularly to prevent mold growth.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Sudafed (Pseudoephedrine)',
          desc: 'The most effective OTC decongestant. Shrinks swollen nasal passages. Available behind the pharmacy counter. Avoid with heart conditions or high blood pressure.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Afrin (Oxymetazoline Nasal Spray)',
          desc: 'Fast-acting nasal decongestant spray. Works within minutes. Do not use for more than 3 consecutive days — causes rebound congestion.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Mucinex (Guaifenesin)',
          desc: 'Expectorant that thins and loosens mucus making it easier to drain. Single ingredient and well tolerated.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 4+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Flonase (Fluticasone)',
          desc: 'Nasal corticosteroid spray that reduces sinus inflammation. Most effective for allergy-related congestion with regular use. Takes a few days to reach full effect.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 4+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Amoxicillin (Prescription)',
          desc: 'Antibiotic for bacterial sinusitis. Most sinus infections are viral and do not respond to antibiotics. Requires physician diagnosis.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Saline nasal spray',
          desc: 'Available at any pharmacy. Flushes allergens and mucus from nasal passages without any medication.',
          note: 'Use before any other nasal medication to maximize effectiveness. Safe to use as many times per day as needed.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic pseudoephedrine',
          desc: 'Store-brand decongestant available behind the pharmacy counter. Most effective OTC option for congestion relief.',
          note: 'Avoid with heart disease, high blood pressure, thyroid disease, or diabetes. Do not use with MAOIs.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Hot shower or steam',
          desc: 'A hot shower or bowl of hot water to breathe steam over provides immediate temporary relief from sinus congestion.',
          note: 'Adding a few drops of eucalyptus or peppermint oil to a steam bowl enhances the decongestant effect (adults only).',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}