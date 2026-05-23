import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function SkinAllergies() {
  return (
    <ConditionPageLayoutV2
      title="Skin Allergies"
      subtitle="Allergic skin reactions · contact, food, or medication triggers"
      bodySystem="skin"
      emergency="Difficulty breathing, swelling of the throat or tongue, rapid heartbeat, dizziness, or hives spreading rapidly with systemic symptoms — these are signs of anaphylaxis. Seek emergency care immediately."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAD clinical recommendations · AAAAI · Tisserand & Young 2014 · Worwood 2016"
      naturalItems={[
        {
          name: 'Colloidal Oatmeal Bath',
          desc: 'FDA-approved skin protectant. Reduces inflammation and itching from hives, contact dermatitis, and allergic flare-ups. Forms a protective barrier and restores moisture. Especially effective for widespread allergic rashes.',
          warning: 'Rinse tub carefully after — oatmeal makes surfaces slippery.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Quercetin',
          desc: 'Natural flavonoid that stabilizes mast cells and reduces histamine release at the source. One of the most evidence-based natural antihistamines for allergic skin reactions. Most effective taken regularly.',
          warning: 'May interact with certain antibiotics and blood thinners. Take with food.',
          ageRange: 'Age 12+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Cold Compress',
          desc: 'Cold reduces histamine release at the bite or contact site, constricts blood vessels, and immediately numbs itching. One of the safest first responses to any allergic skin reaction.',
          warning: 'Never apply ice directly to skin. Wrap in a cloth and limit to 15-20 minutes at a time.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Aloe Vera Gel',
          desc: 'Reduces inflammation, itching, and redness from allergic skin reactions. Apply pure aloe vera gel directly to affected areas. Particularly soothing for contact dermatitis from plants like poison ivy.',
          warning: 'Use 99% pure gel without added alcohol or fragrance — additives can worsen allergic skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          desc: 'Strong anti-inflammatory properties. Clinical evidence for reducing inflammation and itching in contact dermatitis and allergic skin reactions.',
          warning: 'Avoid if allergic to ragweed or daisy family plants.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Vitamin C',
          desc: 'Acts as a natural antihistamine at higher doses. Supports immune regulation and reduces inflammatory response to skin allergens.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Witch Hazel',
          desc: 'Natural astringent that reduces inflammation, itching, and weeping in allergic skin reactions. Apply with a cotton ball directly to affected areas.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Baking Soda Paste',
          desc: 'Mix baking soda with water to make a paste. Apply to itchy hives or allergic rashes to neutralize acid and reduce itching. Particularly effective for histamine-driven hives.',
          warning: 'Do not use on broken skin or open sores.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Chamomile Tea Compress',
          desc: 'A cooled chamomile tea bag pressed against affected skin has anti-inflammatory properties that reduce itching and inflammation.',
          warning: 'Avoid if you have ragweed or daisy family allergies — chamomile may worsen symptoms.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          desc: 'Has mild antimicrobial and anti-inflammatory properties helpful for irritated allergic skin.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted to allergic skin reactions for soothing relief. Patch test first — even gentle oils can occasionally trigger reactions in highly allergic skin.',
            warning: 'Patch test before broad application — sensitive allergic skin can react to almost any topical.',
          },
        },
      ]}
      mainstreamItems={[
        {
          name: 'Cortizone-10 (Hydrocortisone 1%)',
          desc: 'Low-potency topical steroid that reduces inflammation and itching. Most effective OTC option for contact dermatitis and allergic skin reactions.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Cream (Diphenhydramine)',
          desc: 'Topical antihistamine that reduces itching and inflammation locally. Good for localized allergic rashes and hives.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Benadryl Oral (Diphenhydramine)',
          desc: 'Oral antihistamine for widespread allergic skin reactions. Causes drowsiness — better for nighttime use or acute reactions.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 6+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Claritin / Zyrtec / Allegra (Oral)',
          desc: 'Non-drowsy second-generation antihistamines for widespread allergic skin reactions and hives. Once daily dosing.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'Calamine Lotion',
          desc: 'Classic pink lotion that soothes itching and dries weeping allergic skin reactions. Safe and effective for all ages.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Triamcinolone (Prescription)',
          desc: 'Medium-potency prescription topical steroid for moderate to severe inflammatory allergic skin reactions. Requires physician supervision.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          name: 'EpiPen (Epinephrine)',
          desc: 'Emergency injection for anaphylaxis from severe food or medication allergies. Requires physician prescription. Anyone with a history of anaphylaxis should carry one.',
          rating: '🔵 Prescription only',
          ratingColor: '#2563eb',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
      inPinchItems={[
        {
          category: 'Cold water compress',
          desc: 'Cold water on a clean cloth pressed against affected skin provides immediate relief from itching and reduces histamine release.',
          note: 'Free and always available. Safe for all ages as a first response.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic hydrocortisone cream',
          desc: 'Store-brand 1% hydrocortisone cream. Same active ingredient as Cortizone-10 at a fraction of the cost.',
          note: 'Do not use on broken skin. Max 7 days use without consulting a doctor.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic oral antihistamine',
          desc: 'Store-brand loratadine or cetirizine for widespread allergic reactions. Once daily dosing.',
          note: 'Loratadine is truly non-drowsy for most. Cetirizine may cause mild drowsiness.',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
    />
  )
}