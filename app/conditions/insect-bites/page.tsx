import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function InsectBites() {
  return (
    <RemedyPageLayout
      title="Insect Bites"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care immediately if you experience difficulty breathing, swelling of the throat or tongue, rapid heartbeat, dizziness, or hives spreading beyond the bite area — these are signs of anaphylaxis."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Baking Soda Paste',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Mix baking soda with a small amount of water to make a paste. Apply to the bite to neutralize acid from the bite and reduce itching and inflammation.',
          safeUse: 'Safe for all ages. One of the most effective and accessible immediate relief options.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted tea tree oil has antimicrobial and anti-inflammatory properties that reduce itching and prevent infection at the bite site.',
          warning: 'Always dilute in a carrier oil before applying to skin. Never ingest — toxic if swallowed. Not for children under 6.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted lavender oil reduces itching, inflammation, and pain at insect bite sites. Also has mild antimicrobial properties.',
          warning: 'Always dilute before skin application.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Aloe Vera Gel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Pure aloe vera gel immediately soothes itching and reduces inflammation at bite sites. Apply liberally as needed.',
          safeUse: 'Safe for all ages. Use 99% pure gel without added alcohol or fragrance.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Applying cold to a bite reduces swelling, numbs itching, and slows the spread of venom or irritants.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth and limit to 15-20 minutes at a time.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Witch Hazel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Natural astringent that reduces inflammation, itching, and swelling at bite sites. Apply with a cotton ball directly to the affected area.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Honey',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Raw honey applied to a bite has antimicrobial and anti-inflammatory properties that reduce itching and prevent infection.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oatmeal Paste or Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Colloidal oatmeal reduces inflammation and itching. Make a paste with water for spot treatment or add to a bath for multiple bites.',
          safeUse: 'Safe for all ages including infants.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Cortizone-10 (Hydrocortisone)',
          desc: 'Low potency topical steroid that reduces inflammation and itching. Most effective OTC option for insect bite reactions.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Cream (Diphenhydramine)',
          desc: 'Topical antihistamine that reduces itching and inflammation locally. Good for multiple bites.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Oral (Diphenhydramine)',
          desc: 'Oral antihistamine for more widespread allergic reactions to bites. Causes drowsiness — not for daytime use if driving.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Calamine Lotion',
          desc: 'Classic pink lotion that soothes itching and dries weeping bites. Safe and effective for all ages.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Baking soda and water paste',
          desc: 'Mix baking soda with just enough water to make a thick paste. Apply directly to the bite and let dry.',
          note: 'Free and available in almost any kitchen or store. One of the most effective immediate relief options.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic hydrocortisone cream',
          desc: 'Store brand 1% hydrocortisone cream. Same active ingredient as Cortizone-10 at a fraction of the cost.',
          note: 'Do not use on broken skin. Not for children under 2 without physician guidance.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cold water and ice pack',
          desc: 'Running cold water over the bite or applying a wrapped ice pack immediately reduces swelling and numbs itching.',
          note: 'Always wrap ice in a cloth — never apply directly to skin.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}