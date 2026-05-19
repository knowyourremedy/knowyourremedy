import RemedyPageLayout from '@/components/RemedyPageLayout'

export default function Nausea() {
  return (
    <RemedyPageLayout
      title="Nausea"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if nausea is accompanied by severe abdominal pain, chest pain, signs of dehydration, blood in vomit, severe headache, stiff neck, or if you cannot keep any fluids down for more than 24 hours."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Ginger Root',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'The most clinically studied natural remedy for nausea. Gingerols and shogaols block serotonin receptors in the gut and inhibit the vomiting reflex. Effective for morning sickness, chemotherapy nausea, and motion sickness.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Peppermint Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Menthol relaxes the stomach muscles and reduces nausea. Particularly effective for nausea associated with indigestion and IBS.',
          warning: 'Avoid if nausea is associated with acid reflux — peppermint relaxes the lower esophageal sphincter and can worsen GERD.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Peppermint Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Inhaling peppermint oil has clinical evidence for reducing postoperative nausea. Can also be applied diluted to the abdomen and wrists.',
          warning: 'Never apply near face or mouth of children under 6. Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Vitamin B6',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Pyridoxine has the strongest evidence base for pregnancy related nausea. ACOG recommends B6 as first line treatment for morning sickness. Also effective for other forms of nausea.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lemon Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Clinical evidence shows inhaling lemon essential oil significantly reduces pregnancy nausea. Can be inhaled directly from the bottle or diffused.',
          warning: 'Phototoxic if applied to skin before sun exposure. Use only for inhalation during pregnancy.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Gentle antispasmodic that relaxes stomach muscles and reduces nausea associated with anxiety and digestive upset.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Acupressure P6 Point',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Applying pressure to the P6 (Neiguan) point on the inner wrist has multiple clinical trials supporting its effectiveness for various types of nausea. Sea-Bands wristbands provide continuous pressure.',
          safeUse: 'Safe for all ages including pregnant women. No side effects.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Hydration with Electrolytes',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Small frequent sips of clear fluids with electrolytes prevent dehydration from vomiting and help settle the stomach.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Dramamine (Dimenhydrinate)',
          desc: 'Antihistamine effective for motion sickness and general nausea. Causes drowsiness.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Bonine (Meclizine)',
          desc: 'Antihistamine for motion sickness. Less drowsy than dimenhydrinate. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Pepto-Bismol',
          desc: 'Bismuth subsalicylate for nausea associated with upset stomach. Contains salicylate — avoid in children under 12 and during pregnancy.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Diclegis (Doxylamine + B6)',
          desc: 'FDA approved prescription combination of doxylamine and B6 specifically for pregnancy nausea. Most studied treatment for morning sickness.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'safe',
        },
        {
          name: 'Zofran (Ondansetron)',
          desc: 'Prescription antiemetic that blocks serotonin receptors. Very effective for severe nausea and vomiting. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Ginger ale or ginger tea',
          desc: 'Real ginger ale (check that it contains actual ginger) or ginger tea. Small frequent sips are more effective than drinking large amounts at once.',
          note: 'Most commercial ginger ales contain very little actual ginger. Look for brands that list ginger as an ingredient.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic meclizine',
          desc: 'Store brand Bonine equivalent for motion sickness and general nausea. Less drowsy than other antihistamine options.',
          note: 'Take 1 hour before travel for motion sickness prevention. Once daily dosing.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cold water and fresh air',
          desc: 'Small sips of cold water and fresh cool air can reduce nausea significantly. Avoid strong smells and stay upright if possible.',
          note: 'Free and always available. Lying flat often worsens nausea — stay seated or slightly reclined.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}