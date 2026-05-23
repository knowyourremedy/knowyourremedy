import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Allergies() {
  return (
    <ConditionPageLayoutV2
      title="Allergies"
      subtitle="Histamine response to environmental triggers"
      bodySystem="eye"
      emergency="Difficulty breathing, swelling of the throat or tongue, rapid heartbeat, or dizziness — these are signs of anaphylaxis. Seek emergency care immediately."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAAAI guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Local Raw Honey',
          desc: 'Contains small amounts of local pollen which may help desensitize the immune system over time. Best used as a long-term preventive strategy.',
          warning: 'Effect is specific to local honey — imported honey will not work the same way. Never give to infants under 12 months.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          desc: 'A natural flavonoid that stabilizes mast cells and reduces histamine release. Works best as a preventive taken regularly before allergy season.',
          warning: 'May interact with certain antibiotics and blood thinners. Take with food.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Butterbur (PA-Free)',
          desc: 'One of the most clinically studied natural antihistamines. Some studies show effectiveness comparable to cetirizine for hay fever without causing drowsiness.',
          warning: 'Use ONLY certified PA-free (pyrrolizidine alkaloid-free) extracts. Regular butterbur is liver-toxic. Not for use with liver disease.',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Stinging Nettle',
          desc: 'Freeze-dried stinging nettle leaf has evidence for reducing allergy symptoms by inhibiting inflammatory pathways.',
          warning: 'May interact with blood thinners and blood pressure medications.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Saline Nasal Rinse',
          desc: 'Rinsing nasal passages with saline flushes out allergens, reduces inflammation, and clears congestion without medication.',
          warning: 'Always use distilled or previously boiled water for neti pot rinses — never tap water.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin C',
          desc: 'Acts as a natural antihistamine at higher doses. Supports immune regulation and reduces inflammatory response to allergens.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          desc: 'Diffusing lavender oil may help reduce allergic airway inflammation. Can also be applied diluted to temples and chest.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to temples and chest for symptom relief.',
          },
          diffuse: {
            ageRange: 'All ages',
            pregnancySafe: 'ask',
            desc: 'Diffuse during allergy flare-ups to support airway comfort.',
          },
        },
      ]}
      mainstreamItems={[
        {
          name: 'Claritin (Loratadine)',
          desc: 'Non-drowsy second-generation antihistamine. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Zyrtec (Cetirizine)',
          desc: 'Effective second-generation antihistamine. May cause mild drowsiness in some people. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Allegra (Fexofenadine)',
          desc: 'Non-drowsy antihistamine. Do not take with fruit juice — it reduces absorption significantly.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Flonase (Fluticasone)',
          desc: 'Nasal corticosteroid spray. Very effective for nasal allergy symptoms. Takes a few days of regular use to reach full effect.',
          rating: '🟡 Decent choice',
          ratingColor: '#f39c12',
          ageRange: 'Age 4+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl (Diphenhydramine)',
          desc: 'First-generation antihistamine. Very effective but causes significant drowsiness. Better suited for nighttime or acute reactions.',
          rating: '🔴 Last choice',
          ratingColor: '#c0392b',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic loratadine or cetirizine',
          desc: 'Store-brand non-drowsy antihistamines. Same active ingredients as Claritin and Zyrtec at a fraction of the cost.',
          note: 'Once daily dosing — do not double up thinking more is better. It will not increase effectiveness.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic diphenhydramine',
          desc: 'Store-brand Benadryl equivalent. Effective but causes drowsiness — only use if you do not need to drive or operate machinery.',
          note: 'Not recommended for elderly patients due to increased risk of confusion and falls.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Saline nasal spray',
          desc: 'Available at any pharmacy. Flushes allergens from nasal passages and reduces congestion without any medication.',
          note: 'Use before taking any oral antihistamine to maximize effectiveness of both.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}