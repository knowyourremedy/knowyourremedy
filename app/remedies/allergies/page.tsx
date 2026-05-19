import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Allergies() {
  return (
    <RemedyPageLayout
      title="Allergies"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care immediately if you experience difficulty breathing, swelling of the throat or tongue, rapid heartbeat, or dizziness — these are signs of anaphylaxis."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Local Raw Honey',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Local raw honey contains small amounts of local pollen which may help desensitize the immune system over time. Best used as a long term preventive strategy.',
          warning: 'Never give to infants under 12 months. Effect is specific to local honey — imported honey will not work the same way.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'A natural flavonoid that stabilizes mast cells and reduces histamine release. Works best as a preventive taken regularly before allergy season.',
          warning: 'May interact with certain antibiotics and blood thinners. Take with food.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Butterbur',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'One of the most clinically studied natural antihistamines. Some studies show effectiveness comparable to cetirizine for hay fever without causing drowsiness.',
          warning: 'Use only PA-free (pyrrolizidine alkaloid free) extracts. Not for use in pregnancy or with liver disease.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Stinging Nettle',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Freeze-dried stinging nettle leaf has evidence for reducing allergy symptoms by inhibiting inflammatory pathways.',
          warning: 'May interact with blood thinners and blood pressure medications.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Saline Nasal Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Rinsing nasal passages with saline flushes out allergens, reduces inflammation, and clears congestion without medication.',
          safeUse: 'Safe for all ages. Always use distilled or previously boiled water for neti pot rinses.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin C',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Acts as a natural antihistamine at higher doses. Supports immune regulation and reduces inflammatory response to allergens.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diffusing lavender oil may help reduce allergic airway inflammation. Can also be applied diluted to temples and chest.',
          warning: 'Always dilute before skin application. Do not ingest.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Claritin (Loratadine)',
          desc: 'Non-drowsy second generation antihistamine. Once daily dosing. Available for adults and children 2 and older.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Zyrtec (Cetirizine)',
          desc: 'Effective second generation antihistamine. May cause mild drowsiness in some people. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Allegra (Fexofenadine)',
          desc: 'Non-drowsy antihistamine. Do not take with fruit juice as it reduces absorption significantly.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
        },
        {
          name: 'Flonase (Fluticasone)',
          desc: 'Nasal corticosteroid spray. Very effective for nasal allergy symptoms. Takes a few days of regular use to reach full effect.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
        },
        {
          name: 'Benadryl (Diphenhydramine)',
          desc: 'First generation antihistamine. Very effective but causes significant drowsiness. Better suited for nighttime or acute reactions.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic loratadine or cetirizine',
          desc: 'Store brand non-drowsy antihistamines. Same active ingredients as Claritin and Zyrtec at a fraction of the cost.',
          note: 'Once daily dosing — do not double up thinking more is better. It will not increase effectiveness.',
        },
        {
          category: 'Generic diphenhydramine',
          desc: 'Store brand Benadryl equivalent. Effective but causes drowsiness — only use if you do not need to drive or operate machinery.',
          note: 'Not recommended for elderly patients due to increased risk of confusion and falls.',
        },
        {
          category: 'Saline nasal spray',
          desc: 'Available at any pharmacy. Flushes allergens from nasal passages and reduces congestion without any medication.',
          note: 'Use before taking any oral antihistamine to maximize effectiveness of both.',
        },
      ]}
    />
  )
}