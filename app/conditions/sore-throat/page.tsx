import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function SoreThroat() {
  return (
    <ConditionPageLayoutV2
      title="Sore Throat"
      subtitle="Pharyngeal irritation · viral, bacterial, or strep"
      bodySystem="respiratory"
      emergency="Difficulty breathing or swallowing, drooling, muffled voice, severe visible throat swelling, high fever with rash, or sudden severe symptoms — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · IDSA strep throat guidelines · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Raw Honey',
          desc: 'Honey coats and soothes the throat, reduces inflammation, and has antimicrobial properties. Clinical evidence shows honey is as effective as dextromethorphan for throat irritation and cough.',
          warning: 'Never give to infants under 12 months — risk of infant botulism.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Salt Water Gargle',
          desc: 'Gargling with warm salt water reduces throat inflammation, kills bacteria, and draws out fluid from swollen tissues. One of the most evidence-based and accessible remedies for sore throat.',
          warning: 'Safe for anyone old enough to gargle without swallowing. Rinse and spit — do not swallow.',
          ageRange: 'Age 6+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Ginger Tea with Honey',
          desc: 'Combining ginger\'s anti-inflammatory properties with honey\'s soothing and antimicrobial properties makes a highly effective throat remedy. Add lemon for additional vitamin C.',
          warning: 'Not for infants under 12 months due to honey.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
        {
          name: 'Slippery Elm',
          desc: 'Forms a soothing gel coating on the throat that reduces irritation and inflammation. Available as lozenges or powder mixed in water. One of the most effective natural throat soothers.',
          warning: 'May slow absorption of other medications — take 1-2 hours apart.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Licorice Root DGL',
          desc: 'DGL licorice soothes throat mucosa and has antiviral properties. Clinical evidence for reducing sore throat pain and duration.',
          warning: 'Use DGL form only. Regular licorice root can raise blood pressure.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Marshmallow Root Tea',
          desc: 'Mucilage in marshmallow root coats and soothes irritated throat tissue. Similar mechanism to slippery elm but milder.',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Oregano Oil',
          desc: 'Carvacrol and thymol in oregano oil have powerful antimicrobial properties. Strong tradition of internal use for acute bacterial throat infections.',
          oilSlug: 'oregano-oil',
          internal: {
            ageRange: 'Age 18+',
            pregnancySafe: 'avoid',
            desc: 'Adults only: 1 enteric-coated softgel daily during acute illness, OR 1 drop in 1 tsp olive oil at first sign of bacterial throat infection (Worwood). Short-term use — maximum 5-7 days.',
            warning: 'Never use neat (undiluted). Avoid with blood thinners and lithium. See a doctor for severe or persistent throat symptoms (possible strep).',
          },
        },
        {
          name: 'Apple Cider Vinegar Gargle',
          desc: 'Diluted ACV gargle creates an acidic environment that kills throat bacteria. Mix 1 tablespoon in 8oz warm water and gargle.',
          warning: 'Always dilute before gargling. Do not swallow. Rinse mouth with plain water after to protect tooth enamel.',
          ageRange: 'Age 6+',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Tylenol Extra Strength Dye-Free',
          desc: 'Acetaminophen for sore throat pain relief. Preferred over NSAIDs for children with sore throat as it is gentler on the stomach.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Advil Liqui-Gels',
          desc: 'Ibuprofen in liquid gel form. Anti-inflammatory that reduces throat swelling and pain. More effective than acetaminophen for severe throat inflammation. Honest: contains FD&C Green No. 3 dye — no widely-available adult oral ibuprofen is currently dye-free.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6mo+',
          pregnancySafe: 'avoid',
        },
        {
          name: 'Chloraseptic Spray (Benzocaine)',
          desc: 'Topical anesthetic spray that numbs throat pain on contact. Fast but short-lasting relief.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Cepacol Lozenges',
          desc: 'Benzocaine lozenges that numb the throat for temporary pain relief. Good for sustained relief between doses of oral pain relievers.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Penicillin or Amoxicillin (Prescription)',
          desc: 'Antibiotic treatment for confirmed strep throat. Requires throat swab and physician prescription. Do not use antibiotics for viral sore throat.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Warm salt water gargle',
          desc: 'Half a teaspoon of salt in 8oz of warm water. Gargle for 30 seconds and spit. Repeat every few hours.',
          note: 'Free and available anywhere. One of the most effective immediate interventions for sore throat.',
          ageRange: 'Age 6+',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic acetaminophen',
          desc: 'Store-brand acetaminophen for sore throat pain relief. Safe and effective for all ages at appropriate doses.',
          note: 'Do not exceed 4,000mg per day. Check all other medications for hidden acetaminophen.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Warm water with honey and lemon',
          desc: 'A cup of warm water with a tablespoon of honey and fresh lemon juice soothes the throat and provides antimicrobial and anti-inflammatory benefits.',
          note: 'Not for infants under 12 months due to honey. Use warm not boiling water to preserve honey\'s beneficial properties.',
          ageRange: 'Age 1+',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}