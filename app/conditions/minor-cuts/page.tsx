import RemedyPageLayout from '@/components/ConditionPageLayout'

export default function MinorCuts() {
  return (
    <RemedyPageLayout
      title="Minor Cuts & Wounds"
      subtitle="Every option available. Natural first, conventional when you need it. You decide what is right for your situation."
      emergency="Seek emergency care if bleeding does not stop after 10 minutes of firm pressure, the wound is deep or gaping, caused by an animal bite, shows signs of infection with spreading redness or pus, or if the person has not had a tetanus shot in 5 years."
      dosageLink="/dosage-calculator"
      naturalItems={[
        {
          name: 'Manuka Honey',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Medical grade manuka honey has the strongest clinical evidence of any natural wound care product. Creates a moist healing environment, kills bacteria including MRSA, and reduces inflammation. Used in hospital wound care.',
          warning: 'Use medical grade or high UMF rated manuka honey. Cover with a clean dressing after application.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Tea Tree Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Broad spectrum antimicrobial that kills bacteria, viruses, and fungi at the wound site. Apply diluted around the wound edges — not inside deep wounds.',
          warning: 'Always dilute before application. Never ingest — toxic if swallowed. Do not apply inside deep wounds.',
          pregnancySafe: 'ask',
        },
        {
          name: 'Aloe Vera Gel',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Accelerates wound healing, reduces inflammation, and has antimicrobial properties. Apply pure aloe vera gel to clean minor cuts and abrasions.',
          warning: 'Use 99% pure gel without added alcohol. Do not use on deep wounds.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Calendula Cream',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Strong anti-inflammatory and wound healing properties. Clinical evidence for accelerating healing of minor cuts and abrasions. Very gentle on sensitive skin.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Coconut Oil',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Lauric acid in coconut oil has antimicrobial properties and supports skin barrier repair. Apply a thin layer to clean minor cuts to promote healing.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Saline Rinse',
          badge: 'External Only',
          badgeColor: '#2980b9',
          desc: 'Rinsing a wound with sterile saline solution is the most important first step in wound care. Removes debris, bacteria, and contaminants without damaging healing tissue.',
          safeUse: 'Safe for all ages. Preferred over hydrogen peroxide which can damage healing tissue.',
          pregnancySafe: 'safe',
        },
        {
          name: 'Lavender Oil',
          badge: 'Dilute First',
          badgeColor: '#be185d',
          desc: 'Diluted lavender oil has antimicrobial and analgesic properties that support wound healing and reduce pain at the site.',
          warning: 'Always dilute before application. Apply around wound edges not inside the wound.',
          pregnancySafe: 'ask',
        },
      ]}
      mainstreamItems={[
        {
          name: 'Neosporin (Triple Antibiotic)',
          desc: 'Combination of neomycin, polymyxin B, and bacitracin. Prevents infection in minor cuts. Note that neomycin causes contact dermatitis in some people.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
        {
          name: 'Bacitracin',
          desc: 'Single antibiotic ointment. Fewer allergens than triple antibiotic formulas. Good choice for those sensitive to neomycin.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'ask',
        },
        {
          name: 'Band-Aid Adhesive Bandages',
          desc: 'Keeping a clean wound covered maintains moisture for faster healing and protects from contamination.',
          rating: '🟢 Cleaner choice',
          ratingColor: '#27ae60',
          pregnancySafe: 'safe',
        },
        {
          name: 'Dermabond (Skin Glue)',
          desc: 'Tissue adhesive for closing small lacerations. Available OTC in some forms. Good alternative to stitches for small clean cuts.',
          rating: '🟡 Decent choice',
          ratingColor: '#d97706',
          pregnancySafe: 'ask',
        },
      ]}
      inPinchItems={[
        {
          category: 'Clean water rinse and pressure',
          desc: 'Rinse the wound thoroughly under clean running water for at least 1-2 minutes. Apply firm pressure with a clean cloth to stop bleeding.',
          note: 'The most important first step regardless of what other products you have available.',
          pregnancySafe: 'safe',
        },
        {
          category: 'Generic antibiotic ointment',
          desc: 'Store brand triple antibiotic or bacitracin ointment. Same active ingredients as name brands at a fraction of the cost.',
          note: 'Apply a thin layer only — a thick layer does not provide more protection and can actually slow healing.',
          pregnancySafe: 'ask',
        },
        {
          category: 'Generic adhesive bandages',
          desc: 'Any store brand bandage to keep the wound covered and protected while healing.',
          note: 'Change the bandage daily or whenever it gets wet or dirty. Keep the wound moist for faster healing.',
          pregnancySafe: 'safe',
        },
      ]}
    />
  )
}