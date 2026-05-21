import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function SoreThroat() {
  return (
    <RemedyPageLayout
      title="Sore Throat"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if you have difficulty breathing or swallowing, drooling, muffled voice, severe swelling visible in the throat, high fever with rash, or if symptoms are severe and come on very suddenly."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Raw Honey',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Honey coats and soothes the throat, reduces inflammation, and has antimicrobial properties. Clinical evidence shows honey is as effective as dextromethorphan for throat irritation and cough.',
          warning: 'Never give to infants under 12 months — risk of infant botulism.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Salt Water Gargle',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Gargling with warm salt water reduces throat inflammation, kills bacteria, and draws out fluid from swollen tissues. One of the most evidence based and accessible remedies for sore throat.',
          safeUse: 'Safe for anyone old enough to gargle without swallowing. Rinse and spit — do not swallow.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea with Honey',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Combining ginger\'s anti-inflammatory properties with honey\'s soothing and antimicrobial properties makes a highly effective throat remedy. Add lemon for additional vitamin C.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Slippery Elm',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Forms a soothing gel coating on the throat that reduces irritation and inflammation. Available as lozenges or powder mixed in water. One of the most effective natural throat soothers.',
          warning: 'May slow absorption of other medications — take 1-2 hours apart.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Licorice Root DGL',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'DGL licorice soothes throat mucosa and has antiviral properties. Clinical evidence for reducing sore throat pain and duration.',
          warning: 'Use DGL form only. Regular licorice root can raise blood pressure.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Marshmallow Root Tea',
          badge: 'Internal Only',
          badgeColor: '#78350f',
          desc: 'Mucilage in marshmallow root coats and soothes irritated throat tissue. Similar mechanism to slippery elm but milder.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Oregano Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Carvacrol and thymol in oregano oil have powerful antimicrobial properties. Dilute heavily and gargle for throat infections. Enteric coated capsules for internal use.',
          warning: 'Very potent — must be heavily diluted. Can interact with blood thinners and lithium.',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Apple Cider Vinegar Gargle',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Diluted ACV gargle creates an acidic environment that kills throat bacteria. Mix 1 tablespoon in 8oz warm water and gargle.',
          warning: 'Always dilute before gargling. Do not swallow. Rinse mouth with plain water after to protect tooth enamel.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye Free',
          desc: 'Acetaminophen for sore throat pain relief. Preferred over NSAIDs for children with sore throat as it is gentler on the stomach.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels (Ibuprofen)',
          desc: 'Anti-inflammatory that reduces throat swelling and pain. More effective than acetaminophen for severe throat inflammation.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chloraseptic Spray (Benzocaine)',
          desc: 'Topical anesthetic spray that numbs throat pain on contact. Fast but short lasting relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Cepacol Lozenges',
          desc: 'Benzocaine lozenges that numb the throat for temporary pain relief. Good for sustained relief between doses of oral pain relievers.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Penicillin or Amoxicillin (Prescription)',
          desc: 'Antibiotic treatment for confirmed strep throat. Requires throat swab and physician prescription. Do not use antibiotics for viral sore throat.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Warm salt water gargle',
          desc: 'Half a teaspoon of salt in 8oz of warm water. Gargle for 30 seconds and spit. Repeat every few hours.',
          note: 'Free and available anywhere. One of the most effective immediate interventions for sore throat.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store brand acetaminophen for sore throat pain relief. Safe and effective for all ages at appropriate doses.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Warm water with honey and lemon',
          desc: 'A cup of warm water with a tablespoon of honey and fresh lemon juice soothes the throat and provides antimicrobial and anti-inflammatory benefits.',
          note: 'Not for infants under 12 months due to honey. Use warm not boiling water to preserve honey\'s beneficial properties.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}