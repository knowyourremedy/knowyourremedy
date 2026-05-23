import ConditionPageLayoutV2 from '@/components/ConditionPageLayoutV2'

export default function MinorCuts() {
  return (
    <ConditionPageLayoutV2
      title="Minor Cuts and Wounds"
      subtitle="Skin abrasions and lacerations · wound healing"
      bodySystem="skin"
      emergency="Bleeding that does not stop after 10 minutes of firm pressure, deep or gaping wounds, animal bites, spreading redness or pus, or no tetanus shot in 5 years — seek emergency care."
      dosageLink="/dosage-calculator"
      sources="NIH NCCIH · AAD wound care guidelines · Cochrane Reviews (manuka honey) · Tisserand & Young 2014"
      naturalItems={[
        {
          name: 'Manuka Honey',
          desc: 'Medical-grade manuka honey has the strongest clinical evidence of any natural wound care product. Creates a moist healing environment, kills bacteria including MRSA, and reduces inflammation. Used in hospital wound care.',
          warning: 'Use medical-grade or high UMF-rated manuka honey. Cover with a clean dressing after application. Never give honey internally to infants under 12 months.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          desc: 'Broad-spectrum antimicrobial that kills bacteria, viruses, and fungi at the wound site.',
          oilSlug: 'tea-tree-oil',
          topical: {
            ageRange: 'Age 6+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted around the wound edges — not inside deep wounds.',
            warning: 'Never ingest — toxic if swallowed. Do not apply inside deep wounds.',
          },
        },
        {
          name: 'Aloe Vera Gel',
          desc: 'Accelerates wound healing, reduces inflammation, and has antimicrobial properties. Apply pure aloe vera gel to clean minor cuts and abrasions.',
          warning: 'Use 99% pure gel without added alcohol. Do not use on deep wounds.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          desc: 'Strong anti-inflammatory and wound healing properties. Clinical evidence for accelerating healing of minor cuts and abrasions. Very gentle on sensitive skin.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          desc: 'Lauric acid in coconut oil has antimicrobial properties and supports skin barrier repair. Apply a thin layer to clean minor cuts to promote healing.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Saline Rinse',
          desc: 'Rinsing a wound with sterile saline solution is the most important first step in wound care. Removes debris, bacteria, and contaminants without damaging healing tissue.',
          warning: 'Preferred over hydrogen peroxide which can damage healing tissue.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          desc: 'Antimicrobial and analgesic properties that support wound healing and reduce pain at the site.',
          oilSlug: 'lavender-oil',
          topical: {
            ageRange: 'Age 2+',
            pregnancySafe: 'ask',
            dilute: true,
            desc: 'Apply diluted around wound edges, not inside the wound.',
          },
        },
      ]}
      mainstreamItems={[
        {
          name: 'Neosporin (Triple Antibiotic)',
          desc: 'Combination of neomycin, polymyxin B, and bacitracin. Prevents infection in minor cuts. Note that neomycin causes contact dermatitis in some people.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          name: 'Bacitracin',
          desc: 'Single antibiotic ointment. Fewer allergens than triple antibiotic formulas. Good choice for those sensitive to neomycin.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          name: 'Band-Aid Adhesive Bandages',
          desc: 'Keeping a clean wound covered maintains moisture for faster healing and protects from contamination.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          name: 'Dermabond (Skin Glue)',
          desc: 'Tissue adhesive for closing small lacerations. Available OTC in some forms. Good alternative to stitches for small clean cuts.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          ageRange: 'Age 2+',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Clean water rinse and pressure',
          desc: 'Rinse the wound thoroughly under clean running water for at least 1-2 minutes. Apply firm pressure with a clean cloth to stop bleeding.',
          note: 'The most important first step regardless of what other products you have available.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic antibiotic ointment',
          desc: 'Store-brand triple antibiotic or bacitracin ointment. Same active ingredients as name brands at a fraction of the cost.',
          note: 'Apply a thin layer only — a thick layer does not provide more protection and can actually slow healing.',
          ageRange: 'All ages',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic adhesive bandages',
          desc: 'Any store-brand bandage to keep the wound covered and protected while healing.',
          note: 'Change the bandage daily or whenever it gets wet or dirty. Keep the wound moist for faster healing.',
          ageRange: 'All ages',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}