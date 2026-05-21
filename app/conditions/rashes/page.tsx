import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function Rashes() {
  return (
    <RemedyPageLayout
      title="Rashes"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if a rash spreads rapidly, is accompanied by difficulty breathing or swelling of the throat, covers most of the body, or is accompanied by high fever, blistering, or skin peeling."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Colloidal Oatmeal Bath',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'FDA approved skin protectant that reduces inflammation, itching, and irritation from rashes. Forms a protective barrier on skin and restores moisture. Clinically proven for eczema, contact dermatitis, and allergic rashes.',
          safeUse: 'Safe for all ages including newborns. Rinse tub carefully after — oatmeal makes surfaces slippery.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aloe Vera Gel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Pure aloe vera gel reduces inflammation, itching, and redness. Apply a thin layer to affected areas as needed. Use 99% pure gel without added alcohol or fragrance.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Lauric acid has antifungal and antibacterial properties. Restores the skin barrier and reduces inflammation in eczema and dry skin rashes. Apply a thin layer to clean dry skin.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Strong anti-inflammatory and wound healing properties. Clinical evidence for reducing inflammation and itching in contact dermatitis and eczema rashes.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Witch Hazel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Natural astringent that reduces inflammation, itching, and weeping in various types of rashes. Apply with a cotton ball to affected areas.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Antimicrobial and anti-inflammatory properties helpful for rashes caused by bacterial or fungal infections. Always dilute before applying to skin.',
          warning: 'Always dilute in a carrier oil. Never ingest. Not for children under 6. Avoid near eyes.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Baking Soda Paste',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Mix baking soda with water to make a paste. Apply to itchy rashes to neutralize acid and reduce itching. Particularly effective for insect bite reactions and mild allergic rashes.',
          safeUse: 'Safe for most ages. Do not use on broken skin or open sores.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Cold Compress',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Cold reduces inflammation, constricts blood vessels, and numbs itching. Apply a cold damp cloth to affected areas for immediate relief.',
          safeUse: 'Safe for all ages. Use a clean cloth each time.',
          pregnancySafe: 'safe',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Cortizone-10 (Hydrocortisone 1%)',
          desc: 'Low potency topical steroid that reduces inflammation and itching. Most effective OTC option for allergic and contact dermatitis rashes.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Cream (Diphenhydramine)',
          desc: 'Topical antihistamine for itching relief. Good for localized allergic rashes.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Claritin or Zyrtec (Oral)',
          desc: 'Oral antihistamines for rashes caused by allergic reactions. Non-drowsy options for daytime use.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Lotrimin (Clotrimazole)',
          desc: 'Antifungal cream for rashes caused by fungal infections like ringworm or athlete\'s foot.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Triamcinolone (Prescription)',
          desc: 'Medium potency prescription topical steroid for moderate to severe inflammatory rashes. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Generic hydrocortisone cream',
          desc: 'Store brand 1% hydrocortisone cream. Same active ingredient as Cortizone-10 at a fraction of the cost.',
          note: 'Do not use on broken skin. Not for children under 2 without physician guidance. Max 7 days use without consulting a doctor.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic oral antihistamine',
          desc: 'Store brand loratadine or cetirizine for allergic rashes. Once daily dosing.',
          note: 'Cetirizine may cause mild drowsiness in some people. Loratadine is truly non-drowsy for most.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Cool water and clean cloth',
          desc: 'Cool water compress on the affected area provides immediate itch relief and reduces inflammation.',
          note: 'Use a clean cloth each time to avoid introducing bacteria to irritated skin.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}