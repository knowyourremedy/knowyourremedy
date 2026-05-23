import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Nausea() {
  return (
    <ConditionPageLayoutV2
      title="Nausea"
      subtitle="Gastric upset · with or without vomiting"
      bodySystem="digestive"
      emergency="Severe abdominal pain, chest pain, signs of dehydration, blood in vomit, severe headache, stiff neck, or inability to keep fluids down for more than 24 hours — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · ACOG (B6 for pregnancy nausea) · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Ginger Root',
          desc: 'The most clinically studied natural remedy for nausea. Gingerols and shogaols block serotonin receptors in the gut and inhibit the vomiting reflex. Effective for morning sickness, chemotherapy nausea, and motion sickness.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          desc: 'Menthol relaxes the stomach muscles and reduces nausea. Particularly effective for nausea associated with indigestion and IBS.',
          warning: 'Avoid if nausea is associated with acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          desc: 'Inhaling peppermint oil has clinical evidence for reducing postoperative nausea.',
          oilSlug: 'peppermint-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to the abdomen and wrists. Inhale directly from the bottle for postoperative-style nausea relief.',
          },
          diffuse: {
            ageRange: 'Kids 6+',
            pregnancySafe: 'ask',
            desc: 'Diffuse during nausea episodes for ambient relief.',
          },
        },
        {
          name: 'Vitamin B6',
          desc: 'Pyridoxine has the strongest evidence base for pregnancy-related nausea. ACOG recommends B6 as first-line treatment for morning sickness. Also effective for other forms of nausea.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lemon Oil',
          desc: 'Clinical evidence shows inhaling lemon essential oil significantly reduces pregnancy nausea.',
          oilSlug: 'lemon-oil',
          diffuse: {
            ageRange: 'Kids 2+',
            pregnancySafe: 'safe',
            desc: 'Inhale directly from the bottle or diffuse. Most evidence-based for pregnancy nausea.',
          },
          internal: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            desc: 'FDA-cleared culinary lemon oil: 1 drop in warm water with honey. Adults only for direct ingestion. Worwood-supported culinary use.',
            warning: 'Topical application is phototoxic before sun exposure. Use inhalation or culinary route only during pregnancy.',
          },
        },
        {
          name: 'Chamomile Tea',
          desc: 'Gentle antispasmodic that relaxes stomach muscles and reduces nausea associated with anxiety and digestive upset.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Acupressure P6 Point',
          desc: 'Applying pressure to the P6 (Neiguan) point on the inner wrist has multiple clinical trials supporting its effectiveness for various types of nausea. Sea-Bands wristbands provide continuous pressure.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration with Electrolytes',
          desc: 'Small frequent sips of clear fluids with electrolytes prevent dehydration from vomiting and help settle the stomach.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Dramamine (Dimenhydrinate)',
          desc: 'Antihistamine effective for motion sickness and general nausea. Causes drowsiness.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Bonine (Meclizine)',
          desc: 'Antihistamine for motion sickness. Less drowsy than dimenhydrinate. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate for nausea associated with upset stomach. Contains salicylate — avoid in children under 12 and during pregnancy.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 12+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Diclegis (Doxylamine + B6)',
          desc: 'FDA-approved prescription combination of doxylamine and B6 specifically for pregnancy nausea. Most studied treatment for morning sickness.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 18+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Zofran (Ondansetron)',
          desc: 'Prescription antiemetic that blocks serotonin receptors. Very effective for severe nausea and vomiting. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 4+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Ginger ale or ginger tea',
          desc: 'Real ginger ale (check that it contains actual ginger) or ginger tea. Small frequent sips are more effective than drinking large amounts at once.',
          note: 'Most commercial ginger ales contain very little actual ginger. Look for brands that list ginger as an ingredient.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic meclizine',
          desc: 'Store-brand Bonine equivalent for motion sickness and general nausea. Less drowsy than other antihistamine options.',
          note: 'Take 1 hour before travel for motion sickness prevention. Once daily dosing.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cold water and fresh air',
          desc: 'Small sips of cold water and fresh cool air can reduce nausea significantly. Avoid strong smells and stay upright if possible.',
          note: 'Free and always available. Lying flat often worsens nausea — stay seated or slightly reclined.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}