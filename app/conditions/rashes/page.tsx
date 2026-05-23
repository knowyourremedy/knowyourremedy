import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function Rashes() {
  return (
    <ConditionPageLayoutV2
      title="Rashes"
      subtitle="Skin inflammation · contact, allergic, or fungal"
      bodySystem="skin"
      emergency="Rapidly spreading rash, rash with difficulty breathing or throat swelling, rash covering most of the body, or rash with high fever, blistering, or skin peeling — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAD clinical recommendations · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Colloidal Oatmeal Bath',
          desc: 'FDA-approved skin protectant that reduces inflammation, itching, and irritation from rashes. Forms a protective barrier on skin and restores moisture. Clinically proven for eczema, contact dermatitis, and allergic rashes.',
          warning: 'Rinse tub carefully after — oatmeal makes surfaces slippery.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aloe Vera Gel',
          desc: 'Pure aloe vera gel reduces inflammation, itching, and redness. Apply a thin layer to affected areas as needed. Use 99% pure gel without added alcohol or fragrance.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          desc: 'Lauric acid has antifungal and antibacterial properties. Restores the skin barrier and reduces inflammation in eczema and dry skin rashes. Apply a thin layer to clean dry skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          desc: 'Strong anti-inflammatory and wound-healing properties. Clinical evidence for reducing inflammation and itching in contact dermatitis and eczema rashes.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Witch Hazel',
          desc: 'Natural astringent that reduces inflammation, itching, and weeping in various types of rashes. Apply with a cotton ball to affected areas.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          desc: 'Antimicrobial and anti-inflammatory properties helpful for rashes caused by bacterial or fungal infections.',
          oilSlug: 'tea-tree-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to affected areas. Avoid near eyes.',
            warning: 'Never ingest — toxic if swallowed.',
          },
        },
        {
          name: 'Baking Soda Paste',
          desc: 'Mix baking soda with water to make a paste. Apply to itchy rashes to neutralize acid and reduce itching. Particularly effective for insect bite reactions and mild allergic rashes.',
          warning: 'Do not use on broken skin or open sores.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          desc: 'Cold reduces inflammation, constricts blood vessels, and numbs itching. Apply a cold damp cloth to affected areas for immediate relief.',
          warning: 'Use a clean cloth each time.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Cortizone-10 (Hydrocortisone 1%)',
          desc: 'Low-potency topical steroid that reduces inflammation and itching. Most effective OTC option for allergic and contact dermatitis rashes.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Cream (Diphenhydramine)',
          desc: 'Topical antihistamine for itching relief. Good for localized allergic rashes.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Claritin or Zyrtec (Oral)',
          desc: 'Oral antihistamines for rashes caused by allergic reactions. Non-drowsy options for daytime use.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lotrimin (Clotrimazole)',
          desc: 'Antifungal cream for rashes caused by fungal infections like ringworm or athlete\'s foot.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Triamcinolone (Prescription)',
          desc: 'Medium-potency prescription topical steroid for moderate to severe inflammatory rashes. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic hydrocortisone cream',
          desc: 'Store-brand 1% hydrocortisone cream. Same active ingredient as Cortizone-10 at a fraction of the cost.',
          note: 'Do not use on broken skin. Not for children under 2 without physician guidance. Max 7 days use without consulting a doctor.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic oral antihistamine',
          desc: 'Store-brand loratadine or cetirizine for allergic rashes. Once daily dosing.',
          note: 'Cetirizine may cause mild drowsiness in some people. Loratadine is truly non-drowsy for most.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cool water and clean cloth',
          desc: 'Cool water compress on the affected area provides immediate itch relief and reduces inflammation.',
          note: 'Use a clean cloth each time to avoid introducing bacteria to irritated skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}