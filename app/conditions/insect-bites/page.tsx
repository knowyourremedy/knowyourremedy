import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function InsectBites() {
  return (
    <ConditionPageLayoutV2
      title="Insect Bites"
      subtitle="Skin reaction · mosquitoes, fleas, biting flies"
      bodySystem="skin"
      emergency="Difficulty breathing, swelling of the throat or tongue, rapid heartbeat, dizziness, or hives spreading beyond the bite area — these are signs of anaphylaxis. Seek emergency care immediately."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAD clinical recommendations · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Baking Soda Paste',
          desc: 'Mix baking soda with a small amount of water to make a paste. Apply to the bite to neutralize acid from the bite and reduce itching and inflammation.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          desc: 'Antimicrobial and anti-inflammatory properties that reduce itching and prevent infection at the bite site.',
          oilSlug: 'tea-tree-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply 1-2 diluted drops directly to the bite for itch and infection control.',
            warning: 'Never ingest — toxic if swallowed. Keep out of reach of children.',
          },
        },
        {
          name: 'Lavender Oil',
          desc: 'Reduces itching, inflammation, and pain at insect bite sites. Also has mild antimicrobial properties.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to the bite area for soothing relief.',
          },
        },
        {
          name: 'Aloe Vera Gel',
          desc: 'Pure aloe vera gel immediately soothes itching and reduces inflammation at bite sites. Apply liberally as needed.',
          warning: 'Use 99% pure gel without added alcohol or fragrance.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          desc: 'Applying cold to a bite reduces swelling, numbs itching, and slows the spread of venom or irritants.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth and limit to 15-20 minutes at a time.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Witch Hazel',
          desc: 'Natural astringent that reduces inflammation, itching, and swelling at bite sites. Apply with a cotton ball directly to the affected area.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Honey',
          desc: 'Raw honey applied to a bite has antimicrobial and anti-inflammatory properties that reduce itching and prevent infection.',
          warning: 'Never give honey internally to infants under 12 months. Topical use is fine.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Oatmeal Paste or Bath',
          desc: 'Colloidal oatmeal reduces inflammation and itching. Make a paste with water for spot treatment or add to a bath for multiple bites.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Cortizone-10 (Hydrocortisone)',
          desc: 'Low-potency topical steroid that reduces inflammation and itching. Most effective OTC option for insect bite reactions.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Cream (Diphenhydramine)',
          desc: 'Topical antihistamine that reduces itching and inflammation locally. Good for multiple bites.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Oral (Diphenhydramine)',
          desc: 'Oral antihistamine for more widespread allergic reactions to bites. Causes drowsiness — not for daytime use if driving.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Calamine Lotion',
          desc: 'Classic pink lotion that soothes itching and dries weeping bites. Safe and effective for all ages.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Baking soda and water paste',
          desc: 'Mix baking soda with just enough water to make a thick paste. Apply directly to the bite and let dry.',
          note: 'Free and available in almost any kitchen or store. One of the most effective immediate relief options.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic hydrocortisone cream',
          desc: 'Store-brand 1% hydrocortisone cream. Same active ingredient as Cortizone-10 at a fraction of the cost.',
          note: 'Do not use on broken skin. Not for children under 2 without physician guidance.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cold water and ice pack',
          desc: 'Running cold water over the bite or applying a wrapped ice pack immediately reduces swelling and numbs itching.',
          note: 'Always wrap ice in a cloth — never apply directly to skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}