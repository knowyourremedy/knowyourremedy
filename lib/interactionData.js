// KnowYourRemedy — Interaction Compatibility Database
// Sources: FDA Drug Interaction Database · Clinical Pharmacology (Elsevier)
// Stockley's Drug Interactions, 12th ed. · NIH NCCIH Herb-Drug Interactions
// Lexi-Interact, Wolters Kluwer (2024) · Natural Medicines Database (2024)
// Micromedex Drug Interactions (IBM Health, 2024)

// Status levels:
//   "safe"    — generally safe to combine at standard doses
//   "caution" — can combine with monitoring/dose awareness
//   "avoid"   — do not combine; significant risk

export const INTERACTIONS = [

    // ─────────────────────────────────────────────
    // ACETAMINOPHEN pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['acetaminophen', 'ibuprofen'],
      status: 'safe',
      summary: 'Safe to alternate at standard doses; do not exceed total daily limits for each.',
      mechanism: 'Different mechanisms (central vs. peripheral); no pharmacokinetic interaction. Alternating every 3–4 hr covers fever better than either alone.',
      safeLimits: 'Acetaminophen max 4,000 mg/day adults (75 mg/kg/day children). Ibuprofen max 1,200 mg/day OTC adults (40 mg/kg/day children). Do not take both simultaneously.',
      populations: {
        children: 'Safe to alternate in children over 6 months. Weight-dose each separately. A common protocol: acetaminophen, wait 3 hr, ibuprofen, wait 3 hr, repeat.',
        elderly: 'Caution with ibuprofen in elderly (GI and renal risk). Acetaminophen preferred base; add ibuprofen only if needed.',
        pregnancy: 'Acetaminophen preferred throughout pregnancy. Ibuprofen avoid after 20 weeks gestation.',
      },
      sources: ['AAP Policy Statement on Fever Management 2023', 'Perrott DA et al. Ann Emerg Med 2004', 'FDA Drug Safety Communication'],
    },
  
    {
      drugs: ['acetaminophen', 'naproxen'],
      status: 'safe',
      summary: 'Can be taken together at standard OTC doses; monitor total daily limits.',
      mechanism: 'Different mechanisms. Naproxen (NSAID) adds peripheral anti-inflammatory effect acetaminophen lacks.',
      safeLimits: 'Acetaminophen max 4,000 mg/day. Naproxen OTC max 660 mg/day. Take together only if one alone is insufficient.',
      populations: {
        children: 'Naproxen not recommended under 12. Acetaminophen only for younger children.',
        elderly: 'Naproxen carries higher GI and cardiovascular risk in elderly. Use lowest dose shortest time.',
        pregnancy: 'Acetaminophen only after 20 weeks. Naproxen avoid after 20 weeks.',
      },
      sources: ['FDA OTC Monographs', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['acetaminophen', 'diphenhydramine'],
      status: 'safe',
      summary: 'Safe combination — many OTC night-time products (e.g. NyQuil, Tylenol PM) contain both.',
      mechanism: 'No pharmacokinetic interaction. Diphenhydramine adds sedating antihistamine effect.',
      safeLimits: 'Check combined products to avoid double-dosing acetaminophen. Diphenhydramine max 50 mg/dose, 300 mg/day adults.',
      populations: {
        children: 'Not for children under 12 for sleep use. Acetaminophen alone for pain/fever in younger children.',
        elderly: 'Diphenhydramine strongly anticholinergic — Beers Criteria lists it as potentially inappropriate in elderly. Avoid.',
        pregnancy: 'Acetaminophen safe. Diphenhydramine generally considered low-risk; consult OB.',
      },
      sources: ['FDA OTC Labeling', 'American Geriatrics Society Beers Criteria 2023'],
    },
  
    
  
    {
      drugs: ['acetaminophen', 'warfarin'],
      status: 'caution',
      summary: 'Regular acetaminophen use (>2 g/day) can elevate INR in patients on warfarin.',
      mechanism: 'Acetaminophen metabolite inhibits vitamin K-dependent clotting factor synthesis; mechanism not fully elucidated.',
      safeLimits: 'Occasional use (< 2 g/day, < 1 week) is generally safe. Regular use requires INR monitoring. Preferred over NSAIDs for pain in warfarin patients at lower doses.',
      populations: {
        children: 'Children on warfarin are rare — manage with hematologist.',
        elderly: 'Warfarin is commonly used in elderly — INR monitoring essential.',
        pregnancy: 'Warfarin generally avoided in pregnancy.',
      },
      sources: ['Hylek EM et al. Ann Intern Med 1998', 'Lexi-Interact 2024', 'Stockleys Drug Interactions 12th ed.'],
    },
  
    {
      drugs: ['acetaminophen', 'stJohnsWort'],
      status: 'caution',
      summary: "St. John's Wort induces CYP enzymes and may increase formation of acetaminophen's toxic metabolite.",
      mechanism: "St. John's Wort induces CYP3A4 and CYP2E1, potentially increasing NAPQI (hepatotoxic metabolite) production.",
      safeLimits: 'Avoid combining if using acetaminophen regularly. Short-term occasional use may be acceptable.',
      populations: {
        children: "St. John's Wort not recommended under 12.",
        elderly: 'Monitor liver function.',
        pregnancy: "St. John's Wort not recommended in pregnancy.",
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH Herb-Drug Interactions'],
    },
  
    // ─────────────────────────────────────────────
    // IBUPROFEN / NSAID pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['ibuprofen', 'naproxen'],
      status: 'avoid',
      summary: 'Do not combine two NSAIDs — significantly increased risk of GI bleeding and kidney damage with no added benefit.',
      mechanism: 'Both inhibit COX-1 and COX-2 cyclooxygenase enzymes. Combining doubles GI and renal side effects without meaningful extra pain relief.',
      safeLimits: 'Never combine. Choose one NSAID at a time.',
      populations: {
        children: 'Neither should be combined in children.',
        elderly: 'Dual NSAID use in elderly is particularly dangerous — high GI bleed risk.',
        pregnancy: 'Both NSAIDs avoided after 20 weeks.',
      },
      sources: ['FDA Drug Safety Communication: NSAIDs', 'Lexi-Interact 2024', 'Stockleys 12th ed.'],
    },
  
    {
      drugs: ['ibuprofen', 'aspirin'],
      status: 'caution',
      summary: 'Ibuprofen may block the cardioprotective effect of low-dose aspirin if taken first.',
      mechanism: 'Ibuprofen competitively inhibits aspirin from irreversibly binding COX-1 platelet thromboxane site, diminishing aspirin cardioprotection.',
      safeLimits: 'Take low-dose aspirin at least 2 hours before ibuprofen, or 8 hours after. Naproxen does not appear to have this interaction at standard doses.',
      populations: {
        children: 'Aspirin not recommended for children (Reye syndrome risk). Do not combine.',
        elderly: 'Many elderly take aspirin for cardiac protection — ibuprofen timing critical.',
        pregnancy: 'Both avoided in pregnancy (especially after 20 weeks).',
      },
      sources: ['FDA Drug Safety Communication: Ibuprofen-Aspirin Interaction 2006', 'MacDonald TM, Wei L. Lancet 2003'],
    },
  
    {
      drugs: ['ibuprofen', 'warfarin'],
      status: 'avoid',
      summary: 'NSAIDs significantly increase bleeding risk in warfarin patients — GI bleed risk multiplies substantially.',
      mechanism: 'NSAIDs inhibit platelet function and damage GI mucosa (removing a protective barrier), while warfarin reduces clotting ability. Combined risk is synergistic.',
      safeLimits: 'Avoid. Use acetaminophen for pain when on warfarin (at lower doses with monitoring).',
      populations: {
        children: 'Rare — manage with hematologist.',
        elderly: 'Serious risk in elderly on warfarin — well-documented cause of fatal GI bleeds.',
        pregnancy: 'Warfarin avoided in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'Stockleys Drug Interactions 12th ed.', 'Huang SM et al. Clin Pharmacol Ther 1996'],
    },
  
   
  
    {
      drugs: ['ibuprofen', 'garlic'],
      status: 'caution',
      summary: 'Both have mild antiplatelet properties — combined use may modestly increase bleeding risk.',
      mechanism: "Garlic's allicin inhibits platelet aggregation; ibuprofen inhibits COX-mediated thromboxane A2.",
      safeLimits: 'Culinary garlic amounts with occasional ibuprofen: low risk. High-dose garlic supplements with regular ibuprofen use: caution.',
      populations: {
        children: 'Low risk at culinary doses.',
        elderly: 'Monitor for easy bruising or prolonged bleeding.',
        pregnancy: 'Ibuprofen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH Herb-Drug Interactions'],
    },
  
    {
      drugs: ['ibuprofen', 'turmeric'],
      status: 'caution',
      summary: 'Both are anti-inflammatory; high-dose curcumin has mild antiplatelet activity that may add to ibuprofen effects.',
      mechanism: 'Curcumin inhibits arachidonic acid metabolism and reduces thromboxane B2, similar to (but weaker than) NSAIDs.',
      safeLimits: 'Culinary turmeric at standard doses: low risk with ibuprofen. High-dose curcumin supplements (2,000 mg+) with ibuprofen: monitor for bleeding.',
      populations: {
        children: 'Low risk at standard doses.',
        elderly: 'Monitor for unusual bleeding.',
        pregnancy: 'Ibuprofen avoided after 20 weeks. High-dose turmeric supplements also not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024', 'Chainani-Wu N. J Altern Complement Med 2003'],
    },
  
    {
      drugs: ['ibuprofen', 'ginkgoBiloba'],
      status: 'avoid',
      summary: 'Both inhibit platelet function through different mechanisms — combining significantly increases bleeding risk.',
      mechanism: 'Ginkgo inhibits platelet-activating factor (PAF); ibuprofen inhibits COX-mediated thromboxane. Additive antiplatelet effects.',
      safeLimits: 'Avoid combination. There are case reports of serious bleeding events (including intracranial hemorrhage) with this combination.',
      populations: {
        children: 'Ginkgo not recommended under 18.',
        elderly: 'High risk — avoid.',
        pregnancy: 'Both avoided.',
      },
      sources: ['Lexi-Interact 2024', 'Rowin J, Lewis SL. Neurology 1996 (case report)', 'Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['ibuprofen', 'feverfew'],
      status: 'caution',
      summary: 'NSAIDs may reduce feverfew efficacy for migraine prevention; both affect platelet function.',
      mechanism: 'Feverfew inhibits prostaglandin synthesis and platelet aggregation. NSAIDs compete for similar pathways and may blunt feverfew effects.',
      safeLimits: 'Avoid long-term concurrent use for migraine prevention. Occasional ibuprofen for acute migraine while on feverfew is unlikely to cause harm.',
      populations: {
        children: 'Feverfew not under 12.',
        elderly: 'Monitor for bleeding.',
        pregnancy: 'Both avoided.',
      },
      sources: ['Natural Medicines Database 2024', 'Makheja AN, Bailey JM. Lancet 1981'],
    },
    // ─────────────────────────────────────────────
    // NAPROXEN antiplatelet pairs (mirrors of ibuprofen)
    // ─────────────────────────────────────────────
    {
      drugs: ['naproxen', 'fishOil'],
      status: 'caution',
      summary: 'Both have antiplatelet activity — combined use modestly increases bleeding risk, especially at higher doses or with prolonged use.',
      mechanism: 'Naproxen inhibits COX-1 and COX-2, reducing thromboxane A2 production. Fish oil (EPA/DHA) competes for COX substrate and produces less-active thromboxane A3, further inhibiting platelet aggregation.',
      safeLimits: 'Standard fish oil doses (1–2 g/day) with occasional naproxen: low risk. Daily naproxen (440 mg+) with fish oil 3 g+ daily: monitor for easy bruising or prolonged bleeding. Stop fish oil 7 days before any planned surgery.',
      populations: {
        children: 'Low risk at standard doses; naproxen not recommended under 12 without physician guidance.',
        elderly: 'Increased bleeding sensitivity — monitor closely. Consider acetaminophen for routine pain relief if both are needed daily.',
        pregnancy: 'Naproxen avoided after 20 weeks (premature ductus closure). Fish oil generally safe but discuss with OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Harris WS. Prostaglandins Leukot Essent Fatty Acids 2007', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['naproxen', 'ginger'],
      status: 'caution',
      summary: 'Ginger has mild antiplatelet activity that may add to naproxen effects, especially at supplement doses.',
      mechanism: 'Ginger constituents (gingerols, shogaols) inhibit thromboxane synthesis. Naproxen blocks COX-mediated thromboxane production. Mechanisms overlap and produce additive antiplatelet effects.',
      safeLimits: 'Culinary ginger or 1–2 cups ginger tea daily with occasional naproxen: low risk. Concentrated ginger supplements (1 g+ daily) with regular naproxen use: monitor for bleeding signs.',
      populations: {
        children: 'Low risk at culinary doses. Naproxen requires physician guidance under 12.',
        elderly: 'Watch for easy bruising or prolonged bleeding.',
        pregnancy: 'Ginger safe up to 4 g/day for nausea. Naproxen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH Herb-Drug Interactions', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['naproxen', 'turmeric'],
      status: 'caution',
      summary: 'Both are anti-inflammatory; high-dose curcumin has mild antiplatelet activity that may add to naproxen effects, with additional liver metabolism overlap.',
      mechanism: 'Curcumin inhibits arachidonic acid metabolism and thromboxane B2 production. Naproxen inhibits COX-mediated prostaglandin synthesis. Both are also metabolized through hepatic pathways — high doses of either increase liver burden.',
      safeLimits: 'Culinary turmeric at standard doses: low risk with naproxen. High-dose curcumin supplements (2,000 mg+) with regular naproxen: monitor for bleeding and avoid in those with liver disease.',
      populations: {
        children: 'Low risk at standard doses.',
        elderly: 'Monitor for unusual bleeding; consider reducing one if both are daily.',
        pregnancy: 'Naproxen avoided after 20 weeks. High-dose turmeric supplements not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024', 'Chainani-Wu N. J Altern Complement Med 2003', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['naproxen', 'garlic'],
      status: 'caution',
      summary: 'Both have mild antiplatelet properties — combined use may modestly increase bleeding risk at supplement doses.',
      mechanism: "Garlic's allicin and ajoene compounds inhibit platelet aggregation. Naproxen inhibits COX-mediated thromboxane A2 synthesis. Mechanisms differ but produce additive antiplatelet effects.",
      safeLimits: 'Culinary garlic with occasional naproxen: low risk. Aged garlic extract or high-dose garlic supplements (1,500 mg+ daily) with regular naproxen: monitor for bleeding.',
      populations: {
        children: 'Low risk at culinary doses.',
        elderly: 'Monitor for easy bruising or prolonged bleeding.',
        pregnancy: 'Naproxen avoided after 20 weeks. Culinary garlic generally safe.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH Herb-Drug Interactions'],
    },

    {
      drugs: ['naproxen', 'ginkgoBiloba'],
      status: 'avoid',
      summary: 'Both inhibit platelet function through different mechanisms — combining significantly increases bleeding risk, including documented cases of serious bleeding events.',
      mechanism: 'Ginkgo biloba inhibits platelet-activating factor (PAF) through ginkgolides. Naproxen inhibits COX-mediated thromboxane production. Combined effects on different platelet pathways significantly raise bleeding risk.',
      safeLimits: 'Avoid combination. Case reports document serious bleeding events (including intracranial hemorrhage) with NSAIDs and ginkgo. If both are clinically needed, requires physician oversight with bleeding-time monitoring.',
      populations: {
        children: 'Ginkgo not recommended under 18.',
        elderly: 'High risk — avoid combination.',
        pregnancy: 'Both avoided.',
      },
      sources: ['Lexi-Interact 2024', 'Rowin J, Lewis SL. Neurology 1996 (case report)', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['naproxen', 'feverfew'],
      status: 'caution',
      summary: 'NSAIDs may reduce feverfew efficacy for migraine prevention; both affect platelet function with additive bleeding risk.',
      mechanism: 'Feverfew inhibits prostaglandin synthesis and platelet aggregation via parthenolide. Naproxen competes for similar pathways through COX inhibition. May blunt feverfew migraine-prevention effects while adding to bleeding risk.',
      safeLimits: 'Avoid long-term concurrent use for migraine prevention — they may cancel each other out. Occasional naproxen for acute migraine while on feverfew is unlikely to cause harm short-term.',
      populations: {
        children: 'Feverfew not under 12.',
        elderly: 'Monitor for bleeding.',
        pregnancy: 'Both avoided — feverfew may stimulate uterine contractions; naproxen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'Makheja AN, Bailey JM. Lancet 1981'],
    },

    // ─────────────────────────────────────────────
    // DUAL NSAID — never combine
    // ─────────────────────────────────────────────
    {
      drugs: ['ibuprofen', 'naproxen'],
      status: 'avoid',
      summary: 'Do not combine two NSAIDs — significantly increases risk of stomach ulcers, GI bleeding, kidney injury, and cardiovascular events without added pain-relief benefit.',
      mechanism: 'Both inhibit COX-1 and COX-2 enzymes via the same mechanism. Combining doubles the dose-related risks (GI mucosal damage, renal prostaglandin suppression, antiplatelet effects) without proportionally improving pain control. Same pharmacological action; combining creates redundant risk.',
      safeLimits: 'Choose one NSAID. If ibuprofen is insufficient for pain, do not add naproxen — consult a pharmacist about safer alternatives (acetaminophen alternation, topical NSAIDs, or stronger single-agent prescription options).',
      populations: {
        children: 'Never combine. Choose one age-appropriate NSAID.',
        elderly: 'High risk — choose one NSAID at lowest effective dose, with food, and short duration.',
        pregnancy: 'Both avoided after 20 weeks. Acetaminophen is the preferred pain reliever throughout pregnancy.',
      },
      sources: ['FDA OTC Labeling — NSAID Warnings', 'Lexi-Interact 2024', 'AHRQ Effective Health Care 2011'],
    },
    // ─────────────────────────────────────────────
    // NSAID + ANTICOAGULANT pairs (high-risk)
    // ─────────────────────────────────────────────
    {
      drugs: ['ibuprofen', 'warfarin'],
      status: 'avoid',
      summary: 'High bleeding risk — NSAIDs significantly increase the risk of serious bleeding in patients taking warfarin.',
      mechanism: 'Ibuprofen displaces warfarin from plasma protein binding, increasing free warfarin levels. It also damages GI mucosa (raising the chance of GI bleeds) and inhibits platelet function. Net effect: amplified anticoagulation plus more places to bleed from.',
      safeLimits: 'Avoid combination. If pain relief is needed, acetaminophen is preferred (though even acetaminophen can affect INR at doses above 2 g/day — discuss with prescriber). Topical NSAIDs may be a lower-risk option for localized pain.',
      populations: {
        children: 'Pediatric warfarin use requires hematology oversight — combinations should be physician-directed only.',
        elderly: 'Highest risk group — falls and GI bleeds are leading causes of warfarin-related hospitalization.',
        pregnancy: 'Both typically avoided; warfarin is teratogenic and ibuprofen is contraindicated after 20 weeks.',
      },
      sources: ['FDA Drug Safety Communication — Warfarin/NSAID 2014', 'Lexi-Interact 2024', 'Battistella M et al. Arch Intern Med 2005'],
    },

    {
      drugs: ['naproxen', 'warfarin'],
      status: 'avoid',
      summary: 'High bleeding risk — naproxen significantly increases the risk of serious bleeding in patients taking warfarin.',
      mechanism: 'Naproxen displaces warfarin from plasma protein binding, raising free warfarin levels. It also damages GI mucosa and inhibits platelet aggregation. Combined effects significantly raise the risk of GI, intracranial, and other major bleeding events.',
      safeLimits: 'Avoid combination. Acetaminophen is preferred for pain relief in warfarin patients (with INR monitoring at doses above 2 g/day). Topical NSAIDs may be a lower-risk option for localized pain. Any combination requires prescriber oversight.',
      populations: {
        children: 'Pediatric warfarin use requires hematology oversight.',
        elderly: 'Highest risk group — closely linked to warfarin-related hospitalizations.',
        pregnancy: 'Both avoided; warfarin is teratogenic and naproxen is contraindicated after 20 weeks.',
      },
      sources: ['FDA Drug Safety Communication — Warfarin/NSAID 2014', 'Lexi-Interact 2024', 'Battistella M et al. Arch Intern Med 2005'],
    },

    {
      drugs: ['ibuprofen', 'apixaban'],
      status: 'avoid',
      summary: 'Significantly increased bleeding risk — NSAIDs add to apixaban\'s anticoagulant effect and damage GI mucosa.',
      mechanism: 'Apixaban inhibits Factor Xa, preventing clot formation. Ibuprofen inhibits platelet aggregation through COX-1 blockade and causes GI mucosal injury. Combined: weakened clotting from apixaban plus raw GI surfaces from NSAIDs creates real bleeding sites that struggle to seal.',
      safeLimits: 'Avoid combination. Acetaminophen is the preferred pain reliever for patients on apixaban. For localized pain, topical NSAIDs (diclofenac gel) may be a lower-risk option but still require prescriber approval.',
      populations: {
        children: 'Pediatric apixaban use is specialist-directed; do not combine without hematology guidance.',
        elderly: 'Highest risk group — apixaban-related GI bleeds are a leading cause of hospitalization.',
        pregnancy: 'Apixaban not recommended in pregnancy; ibuprofen avoided after 20 weeks.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'Lexi-Interact 2024', 'Chan EW et al. Gastroenterology 2015'],
    },

    {
      drugs: ['naproxen', 'apixaban'],
      status: 'avoid',
      summary: 'Significantly increased bleeding risk — naproxen adds to apixaban\'s anticoagulant effect with prolonged half-life raising sustained risk.',
      mechanism: 'Apixaban inhibits Factor Xa, blocking the coagulation cascade. Naproxen inhibits platelet COX-1 and damages GI mucosa. Naproxen\'s longer half-life (12–17 hours) means the bleeding risk persists longer than with shorter-acting NSAIDs.',
      safeLimits: 'Avoid combination. Acetaminophen is preferred for pain relief on apixaban. Topical NSAIDs may be acceptable for localized pain with prescriber approval.',
      populations: {
        children: 'Pediatric apixaban use is specialist-directed.',
        elderly: 'Highest risk group — combined bleeding risk is substantial.',
        pregnancy: 'Apixaban not recommended in pregnancy; naproxen avoided after 20 weeks.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'Lexi-Interact 2024', 'Chan EW et al. Gastroenterology 2015'],
    },

    // ─────────────────────────────────────────────
    // NSAID + VITAMIN E pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['ibuprofen', 'vitaminE'],
      status: 'caution',
      summary: 'High-dose vitamin E has antiplatelet activity that may add to ibuprofen effects, especially at supplement doses above 400 IU daily.',
      mechanism: 'Vitamin E (especially alpha-tocopherol) inhibits platelet aggregation and may suppress vitamin K-dependent clotting factors at high doses. Ibuprofen inhibits COX-mediated thromboxane A2. Combined effects raise bleeding risk in a dose-dependent way.',
      safeLimits: 'Standard dietary vitamin E (15 mg / 22 IU daily): low risk with occasional ibuprofen. Vitamin E supplements above 400 IU daily with regular ibuprofen use: monitor for bleeding and stop vitamin E 7 days before any surgery.',
      populations: {
        children: 'Low risk at dietary doses; avoid high-dose supplements.',
        elderly: 'Increased bleeding sensitivity — keep vitamin E at recommended intake (not megadose).',
        pregnancy: 'Vitamin E at prenatal-level doses is safe. Ibuprofen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH ODS Vitamin E Fact Sheet 2024', 'Pastori D et al. Circulation 2013'],
    },

    {
      drugs: ['naproxen', 'vitaminE'],
      status: 'caution',
      summary: 'High-dose vitamin E has antiplatelet activity that may add to naproxen effects, especially at supplement doses above 400 IU daily.',
      mechanism: 'Vitamin E inhibits platelet aggregation and may suppress vitamin K-dependent clotting factors at high doses. Naproxen inhibits COX-mediated thromboxane production. Naproxen\'s longer half-life extends combined antiplatelet exposure.',
      safeLimits: 'Standard dietary vitamin E: low risk with occasional naproxen. Vitamin E supplements above 400 IU daily with regular naproxen: monitor for bleeding and stop vitamin E 7 days before any surgery.',
      populations: {
        children: 'Low risk at dietary doses; avoid high-dose supplements.',
        elderly: 'Increased bleeding sensitivity — keep vitamin E at recommended intake.',
        pregnancy: 'Vitamin E at prenatal-level doses is safe. Naproxen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH ODS Vitamin E Fact Sheet 2024'],
    },

    {
      drugs: ['ibuprofen', 'fishOil'],
      status: 'caution',
      summary: 'Both have antiplatelet activity — combined use modestly increases bleeding risk, especially at higher doses or with prolonged use.',
      mechanism: 'Ibuprofen inhibits COX-1 and COX-2, reducing thromboxane A2 production. Fish oil (EPA/DHA) competes for COX substrate and produces less-active thromboxane A3, further inhibiting platelet aggregation.',
      safeLimits: 'Standard fish oil doses (1–2 g/day) with occasional ibuprofen: low risk. Daily ibuprofen with fish oil 3 g+ daily: monitor for bleeding. Stop fish oil 7 days before any planned surgery.',
      populations: {
        children: 'Low risk at standard doses.',
        elderly: 'Increased bleeding sensitivity — monitor for easy bruising or prolonged bleeding.',
        pregnancy: 'Ibuprofen avoided after 20 weeks. Fish oil generally safe but discuss with OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Harris WS. Prostaglandins Leukot Essent Fatty Acids 2007', 'Lexi-Interact 2024'],
    },
    
  
    // ─────────────────────────────────────────────
    // ANTIHISTAMINE pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['diphenhydramine', 'loratadine'],
      status: 'caution',
      summary: 'Avoid combining two antihistamines — additive sedation and side effects without meaningful benefit.',
      mechanism: 'Both block H1 histamine receptors. Diphenhydramine is sedating (first-generation); loratadine is non-sedating (second-generation). No clinical reason to combine.',
      safeLimits: 'Choose one antihistamine. Diphenhydramine max 50 mg/dose 300 mg/day. Loratadine max 10 mg/day.',
      populations: {
        children: 'Choose age-appropriate antihistamine; never combine.',
        elderly: 'Diphenhydramine strongly discouraged in elderly (anticholinergic effects, fall risk).',
        pregnancy: 'Loratadine is preferred antihistamine in pregnancy (low risk data).',
      },
      sources: ['Beers Criteria 2023', 'FDA OTC Labeling', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['diphenhydramine', 'cetirizine'],
      status: 'caution',
      summary: 'No benefit to combining; additive sedation and anticholinergic effects.',
      mechanism: 'Both are H1 blockers. Cetirizine is mildly sedating in some individuals; combined with diphenhydramine produces additive CNS depression.',
      safeLimits: 'Choose one antihistamine. Never double-dose antihistamines.',
      populations: {
        children: 'Choose one; never combine.',
        elderly: 'Diphenhydramine risky in elderly — cetirizine preferred if needed.',
        pregnancy: 'Loratadine or cetirizine preferred if needed.',
      },
      sources: ['Lexi-Interact 2024', 'FDA OTC Labeling'],
    },
  
    {
      drugs: ['diphenhydramine', 'doxylamine'],
      status: 'avoid',
      summary: 'Do not combine — both are first-generation sedating antihistamines; severe CNS depression risk.',
      mechanism: 'Additive CNS and anticholinergic effects: dangerous sedation, confusion, urinary retention, and dry mouth.',
      safeLimits: 'Never combine. Choose one sedating antihistamine at the lowest effective dose.',
      populations: {
        children: 'Neither should be combined. Both have age limits.',
        elderly: 'Both potentially inappropriate in elderly — Beers Criteria.',
        pregnancy: 'Doxylamine used for nausea of pregnancy alone (Diclegis + B6); do not add diphenhydramine.',
      },
      sources: ['Beers Criteria 2023', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['diphenhydramine', 'melatonin'],
      status: 'caution',
      summary: 'Additive sedation — combining may cause excessive drowsiness, especially in elderly and children.',
      mechanism: 'Both promote sleep through different mechanisms (histamine blockade vs. melatonin receptor agonism). Additive CNS depression.',
      safeLimits: 'Avoid combining. If supplementing for sleep, choose one approach. Melatonin is generally safer for long-term use.',
      populations: {
        children: 'Not needed together — diphenhydramine not recommended for sleep in children.',
        elderly: 'Diphenhydramine inappropriate; melatonin alone preferred at lowest effective dose.',
        pregnancy: 'Limited data for both; consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Beers Criteria 2023'],
    },
  
    {
      drugs: ['diphenhydramine', 'valerian'],
      status: 'caution',
      summary: 'Additive CNS depression and sedation — may cause excessive drowsiness.',
      mechanism: 'Valerian potentiates GABA-mediated sedation; diphenhydramine causes CNS depression through H1 blockade. Combined effects are additive.',
      safeLimits: 'Avoid combining. Do not drive or operate machinery if used together.',
      populations: {
        children: 'Diphenhydramine for sleep not recommended in children.',
        elderly: 'Avoid diphenhydramine in elderly; valerian alone at lowest dose may be safer.',
        pregnancy: 'Valerian not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['diphenhydramine', 'passionflower'],
      status: 'caution',
      summary: 'Additive sedation — passionflower has mild sedating properties that can enhance diphenhydramine effects.',
      mechanism: 'Passionflower binds GABA receptors; diphenhydramine blocks H1 receptors. Combined produces additive CNS depression.',
      safeLimits: 'Avoid combining. Choose one sleep aid.',
      populations: {
        children: 'Not applicable at typical ages of use.',
        elderly: 'Diphenhydramine inappropriate in elderly.',
        pregnancy: 'Passionflower avoided in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
    // ─────────────────────────────────────────────
    // BENZO + OPIOID — FDA black box level
    // ─────────────────────────────────────────────
    {
      drugs: ['alprazolam', 'hydrocodoneAcetaminophen'],
      status: 'avoid',
      summary: 'Do not combine — concurrent benzodiazepine and opioid use carries an FDA black box warning for fatal respiratory depression. This is one of the most dangerous combinations in modern medicine.',
      mechanism: 'Both depress the central nervous system through different mechanisms: alprazolam enhances GABA inhibitory signaling, while hydrocodone activates mu-opioid receptors. Combined, they suppress the brainstem respiratory drive far beyond what either drug does alone — slowed breathing can progress to respiratory arrest, especially during sleep.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. Many emergency departments and pain clinics will not prescribe these together. Co-prescribed patients should have naloxone available and someone who can observe overnight breathing.',
      populations: {
        children: 'This combination is not appropriate in pediatric pain management.',
        elderly: 'Highest mortality risk group — falls, aspiration, and respiratory failure are more common. Strong recommendation against combining in adults over 65.',
        pregnancy: 'Both carry significant risks — opioid + benzo exposure in pregnancy can cause severe neonatal abstinence syndrome and breathing problems at birth.',
      },
      sources: ['FDA Drug Safety Communication — Opioids and Benzodiazepines 2016 (Black Box Warning)', 'CDC Guideline for Prescribing Opioids 2022', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['lorazepam', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — concurrent benzodiazepine and opioid use carries an FDA black box warning for fatal respiratory depression. Tramadol\'s seizure risk adds further concern.',
      mechanism: 'Lorazepam enhances GABA inhibitory neurotransmission, slowing the CNS. Tramadol activates mu-opioid receptors AND inhibits serotonin/norepinephrine reuptake — so beyond respiratory depression, this combination can also lower seizure threshold and trigger serotonin syndrome.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. This combination requires close medical supervision; many prescribers will not co-prescribe.',
      populations: {
        children: 'Not appropriate in pediatric pain management.',
        elderly: 'Very high risk for sedation, falls, confusion, and respiratory depression.',
        pregnancy: 'Both should be avoided due to neonatal withdrawal risk and possible birth defects.',
      },
      sources: ['FDA Drug Safety Communication — Opioids and Benzodiazepines 2016 (Black Box Warning)', 'Tramadol FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['clonazepam', 'hydrocodoneAcetaminophen'],
      status: 'avoid',
      summary: 'Do not combine — concurrent benzodiazepine and opioid use carries an FDA black box warning for fatal respiratory depression.',
      mechanism: 'Clonazepam enhances GABA inhibitory signaling; hydrocodone activates mu-opioid receptors. Both independently suppress respiratory drive at the brainstem; combined effects are synergistic, not just additive. Risk is highest in the first weeks of co-administration and during sleep.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. Many emergency departments will not prescribe these together. Co-prescribed patients should have naloxone available.',
      populations: {
        children: 'Not appropriate in pediatric pain management.',
        elderly: 'Highest mortality risk group — strong recommendation against combining over 65.',
        pregnancy: 'Both carry significant risks including neonatal abstinence syndrome.',
      },
      sources: ['FDA Drug Safety Communication — Opioids and Benzodiazepines 2016 (Black Box Warning)', 'CDC Guideline for Prescribing Opioids 2022', 'Lexi-Interact 2024'],
    },

    // ─────────────────────────────────────────────
    // BENZO + Z-DRUG / BENZO + ANTIHISTAMINE
    // ─────────────────────────────────────────────
    {
      drugs: ['zolpidem', 'alprazolam'],
      status: 'avoid',
      summary: 'Do not combine — both are CNS depressants acting on overlapping GABA pathways. Combined use causes profound sedation and increases the risk of falls, confusion, complex sleep behaviors, and respiratory depression.',
      mechanism: 'Zolpidem is a Z-drug that binds GABA-A receptors at the alpha-1 subunit (sleep-selective). Alprazolam is a benzodiazepine that binds GABA-A receptors more broadly. Both increase chloride influx and CNS inhibition — combining amplifies effects and increases the risk of "sleep-driving" episodes and amnesia.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either — typically only one should be used at a time. Z-drugs and benzodiazepines are not meant to be stacked for insomnia.',
      populations: {
        children: 'Neither indicated.',
        elderly: 'High fall and confusion risk — both are on the Beers Criteria list of medications to avoid in older adults.',
        pregnancy: 'Both should generally be avoided; alternatives discussed with prescriber.',
      },
      sources: ['Beers Criteria 2023', 'Ambien (zolpidem) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['alprazolam', 'diphenhydramine'],
      status: 'avoid',
      summary: 'Do not combine — additive sedation plus anticholinergic effects significantly raise the risk of confusion, falls, and respiratory depression, especially in older adults.',
      mechanism: 'Alprazolam enhances GABA inhibitory signaling. Diphenhydramine blocks both H1 histamine receptors (sedation) and muscarinic acetylcholine receptors (anticholinergic effects: confusion, dry mouth, urinary retention, blurred vision). Combined CNS depression plus anticholinergic burden is a documented hospitalization risk.',
      safeLimits: 'Avoid this combination, including OTC sleep aids and cold/flu products containing diphenhydramine (PM versions of Tylenol, Advil, etc.) — patients on alprazolam should check labels carefully. If allergy treatment is needed, second-generation antihistamines (loratadine, cetirizine) are far safer choices.',
      populations: {
        children: 'Neither typically appropriate; this combination should not occur in pediatric care.',
        elderly: 'High risk — both are on Beers Criteria. Combined use significantly increases dementia, fall, and delirium risk.',
        pregnancy: 'Avoid; safer antihistamine and anxiety options should be discussed with prescriber.',
      },
      sources: ['Beers Criteria 2023', 'Lexi-Interact 2024', 'Gray SL et al. JAMA Intern Med 2015 (anticholinergic burden / dementia)'],
    },
    // ─────────────────────────────────────────────
    // Z-DRUG / OPIOID / GABAPENTIN + ANTIHISTAMINE
    // ─────────────────────────────────────────────
    {
      drugs: ['zolpidem', 'diphenhydramine'],
      status: 'avoid',
      summary: 'Do not combine — both cause significant CNS depression, and diphenhydramine adds anticholinergic effects that increase the risk of confusion, falls, and complex sleep behaviors like sleep-driving or sleep-eating.',
      mechanism: 'Zolpidem acts on GABA-A receptors to induce sleep. Diphenhydramine blocks H1 receptors (sedation) and muscarinic receptors (anticholinergic effects). Combined: stronger and unpredictable sedation, plus an increased likelihood of zolpidem\'s known parasomnia side effects — getting up at night with no memory of it.',
      safeLimits: 'Avoid this combination, including OTC sleep aids and PM-version cold/flu products. If insomnia persists on zolpidem alone, consult the prescriber before adding anything else — never stack two sleep aids without medical guidance.',
      populations: {
        children: 'Neither indicated for sleep.',
        elderly: 'High risk — both are on Beers Criteria. Strongly discouraged.',
        pregnancy: 'Both generally avoided; non-pharmacologic sleep approaches preferred.',
      },
      sources: ['Beers Criteria 2023', 'Ambien (zolpidem) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['tramadol', 'diphenhydramine'],
      status: 'caution',
      summary: 'Common combination (often unintentional via PM cold/flu products) that causes additive sedation, anticholinergic side effects, and may lower seizure threshold.',
      mechanism: 'Tramadol activates mu-opioid receptors AND inhibits serotonin/norepinephrine reuptake — it also has dose-related seizure risk. Diphenhydramine blocks H1 receptors (sedation) and muscarinic receptors (anticholinergic effects). Combined effects: more sedation than either alone, plus a slight increase in seizure threshold concern at high doses or in susceptible patients.',
      safeLimits: 'Be aware of hidden diphenhydramine in OTC products: Benadryl, Tylenol PM, Advil PM, Sominex, ZzzQuil, and many cold/flu nighttime formulas all contain it. If you take tramadol regularly, choose non-sedating allergy treatments (loratadine, cetirizine) and acetaminophen for nighttime pain.',
      populations: {
        children: 'Tramadol contraindicated under 12; not appropriate combination.',
        elderly: 'Both increase fall, confusion, and delirium risk — choose one or neither.',
        pregnancy: 'Both should be avoided; safer options discussed with prescriber.',
      },
      sources: ['Tramadol FDA Prescribing Information', 'Lexi-Interact 2024', 'Beers Criteria 2023'],
    },

    {
      drugs: ['gabapentin', 'diphenhydramine'],
      status: 'caution',
      summary: 'Additive sedation and anticholinergic effects — combining can cause excessive drowsiness, confusion, and impaired coordination, especially during the day.',
      mechanism: 'Gabapentin modulates voltage-gated calcium channels in the CNS, producing sedation and a calming effect. Diphenhydramine blocks H1 histamine receptors (sedation) and muscarinic receptors (anticholinergic). Combined: amplified daytime drowsiness, plus the muscarinic burden raises confusion risk.',
      safeLimits: 'If gabapentin is for chronic nerve pain or anxiety, choose non-sedating allergy treatments (loratadine, cetirizine) rather than diphenhydramine. For occasional allergy relief, use the lowest effective diphenhydramine dose and avoid driving until you know how the combination affects you.',
      populations: {
        children: 'Use with caution under prescriber guidance.',
        elderly: 'Higher risk for confusion and falls — diphenhydramine should generally be avoided in adults over 65 (Beers Criteria).',
        pregnancy: 'Gabapentin used cautiously; second-generation antihistamines preferred over diphenhydramine.',
      },
      sources: ['Gabapentin FDA Prescribing Information', 'Lexi-Interact 2024', 'Beers Criteria 2023'],
    },

    {
      drugs: ['trazodone', 'diphenhydramine'],
      status: 'caution',
      summary: 'Additive sedation and anticholinergic effects — combining can cause significant morning grogginess, dry mouth, urinary retention, and dizziness on standing.',
      mechanism: 'Trazodone blocks serotonin reuptake and antagonizes 5-HT2 receptors, producing sedation. Diphenhydramine blocks H1 histamine and muscarinic receptors. Both have mild anticholinergic activity that becomes more pronounced when combined.',
      safeLimits: 'If trazodone is being used for sleep, adding diphenhydramine usually provides no extra benefit and meaningfully increases morning grogginess. Choose one. If allergy treatment is needed alongside trazodone, prefer second-generation antihistamines (loratadine, cetirizine).',
      populations: {
        children: 'Trazodone not first-line in pediatric use; combination should be physician-directed.',
        elderly: 'Higher risk for confusion, falls, and orthostatic hypotension — diphenhydramine should generally be avoided.',
        pregnancy: 'Trazodone use is individualized; second-generation antihistamines preferred.',
      },
      sources: ['Trazodone FDA Prescribing Information', 'Lexi-Interact 2024', 'Beers Criteria 2023'],
    },

    {
      drugs: ['alprazolam', 'melatonin'],
      status: 'caution',
      summary: 'Common real-world combination — both cause sedation but through different pathways. Generally lower-risk than other sedative combinations, but additive sleepiness and impaired morning alertness are real concerns.',
      mechanism: 'Alprazolam enhances GABA inhibitory signaling. Melatonin acts on MT1/MT2 receptors to promote sleep through circadian pathways. Different mechanisms, but the combined sedative effect is additive and can blunt morning alertness even if neither alone does.',
      safeLimits: 'If alprazolam is prescribed for anxiety (not sleep), low-dose melatonin (0.5–3 mg) at night is generally compatible — but check with the prescriber first. Avoid melatonin doses above 5 mg when on alprazolam, and don\'t combine more than 2 sleep aids of any kind.',
      populations: {
        children: 'Alprazolam not appropriate in pediatric anxiety care; combination should not occur.',
        elderly: 'Use caution — alprazolam is on Beers Criteria, and adding melatonin may worsen daytime grogginess and fall risk.',
        pregnancy: 'Alprazolam generally avoided in pregnancy; melatonin use should be discussed with OB.',
      },
      sources: ['Lexi-Interact 2024', 'Natural Medicines Database 2024', 'Beers Criteria 2023'],
    },
    // ─────────────────────────────────────────────
    // SEROTONIN SYNDROME risk pairs
    // (threshold 2 — acute risk, fires fastest of all class rules)
    // ─────────────────────────────────────────────
    {
      drugs: ['sertraline', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — this is the textbook serotonin syndrome combination. Both raise brain serotonin through different mechanisms, and combined use can trigger a potentially life-threatening condition within hours.',
      mechanism: 'Sertraline is an SSRI — it blocks the serotonin reuptake transporter, raising synaptic serotonin. Tramadol is an opioid that ALSO inhibits serotonin and norepinephrine reuptake (its dual mechanism is what makes it useful for pain — and dangerous when combined with SSRIs). Together, serotonin levels can rise to toxic ranges fast.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. Warning signs of serotonin syndrome: agitation, rapid heartbeat, sweating, tremor, muscle twitching, fever, confusion. Symptoms typically start within hours of combining; seek emergency care if they appear.',
      populations: {
        children: 'Tramadol contraindicated under 12. SSRI pediatric use requires close monitoring.',
        elderly: 'High risk — serotonin syndrome can present as confusion or falls that get misdiagnosed.',
        pregnancy: 'Both should be discussed with prescriber — combination not recommended.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Boyer EW, Shannon M. N Engl J Med 2005', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['fluoxetine', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — high risk of serotonin syndrome. Fluoxetine\'s long half-life means the risk extends for weeks even after stopping, so this combination requires special caution.',
      mechanism: 'Fluoxetine is an SSRI that blocks serotonin reuptake. Tramadol independently inhibits serotonin AND norepinephrine reuptake as part of its pain-relief mechanism. Combined effects can trigger toxic serotonin accumulation. Fluoxetine and its active metabolite (norfluoxetine) have unusually long half-lives — meaning the interaction can occur even days or weeks after stopping fluoxetine.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. If switching from fluoxetine to tramadol therapy, a washout period of several weeks is typically required. Watch for: agitation, sweating, rapid heartbeat, tremor, fever, confusion — seek emergency care if present.',
      populations: {
        children: 'Tramadol contraindicated under 12.',
        elderly: 'High risk — symptoms can be subtle (delirium, falls) and easily missed.',
        pregnancy: 'Both require prescriber discussion; combination not recommended.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Prozac (fluoxetine) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['escitalopram', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — high risk of serotonin syndrome through additive serotonergic mechanisms.',
      mechanism: 'Escitalopram is a selective SSRI that raises synaptic serotonin by blocking its reuptake. Tramadol also inhibits serotonin reuptake as part of its dual analgesic mechanism. Combined: serotonin levels can climb to toxic ranges, triggering symptoms within hours.',
      safeLimits: 'If both have been prescribed, talk to your prescriber before taking either. Alternative pain management options (acetaminophen, topical NSAIDs, non-tramadol pain medications) should be discussed when escitalopram is in use.',
      populations: {
        children: 'Tramadol contraindicated under 12. Escitalopram pediatric use requires monitoring.',
        elderly: 'High risk — serotonin syndrome may present atypically and be missed.',
        pregnancy: 'Combination not recommended; alternatives should be discussed.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['sertraline', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — both raise brain serotonin, and the combination has documented case reports of serotonin syndrome. Also, St. John\'s Wort may reduce sertraline\'s effectiveness through liver enzyme induction.',
      mechanism: 'Sertraline is an SSRI that blocks serotonin reuptake. St. John\'s Wort (hyperforin and hypericin) acts as a mild SSRI itself AND induces liver enzymes (CYP3A4, CYP2C9, CYP1A2) that metabolize many medications, including sertraline. Combined: additive serotonergic effects PLUS unpredictable changes in sertraline blood levels.',
      safeLimits: 'Avoid combination. People taking SSRIs should not start St. John\'s Wort without prescriber guidance. If St. John\'s Wort has been used before sertraline was prescribed, mention it to your provider — a washout period may be advised.',
      populations: {
        children: 'St. John\'s Wort not recommended under 12. SSRIs in pediatric care require close monitoring.',
        elderly: 'High risk for serotonin syndrome; also higher risk of drug-drug interactions affecting other medications.',
        pregnancy: 'St. John\'s Wort not recommended in pregnancy.',
      },
      sources: ['NIH NCCIH — St. John\'s Wort 2024', 'Lantz MS et al. J Geriatr Psychiatry Neurol 1999 (serotonin syndrome case reports)', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['fluoxetine', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — both raise brain serotonin, with documented case reports of serotonin syndrome. Fluoxetine\'s long half-life makes the risk window extend for weeks after stopping.',
      mechanism: 'Fluoxetine blocks serotonin reuptake. St. John\'s Wort acts as a mild SSRI itself and also induces liver enzymes (CYP3A4) that metabolize fluoxetine. Combined: additive serotonergic risk plus altered fluoxetine levels. Because fluoxetine and its metabolite have long half-lives (1–3+ weeks), the interaction persists even after stopping the medication.',
      safeLimits: 'Avoid combination. If fluoxetine has been stopped, a washout period of several weeks is typically advised before starting St. John\'s Wort. Watch for serotonin syndrome warning signs: agitation, sweating, tremor, rapid heartbeat, confusion, fever.',
      populations: {
        children: 'St. John\'s Wort not recommended under 12.',
        elderly: 'High risk; symptoms may be missed.',
        pregnancy: 'Both not recommended in pregnancy.',
      },
      sources: ['NIH NCCIH — St. John\'s Wort 2024', 'Prozac (fluoxetine) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['tramadol', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — both have serotonergic activity, and combined use can trigger serotonin syndrome. St. John\'s Wort may also reduce tramadol\'s effectiveness through liver enzyme induction.',
      mechanism: 'Tramadol inhibits serotonin and norepinephrine reuptake as part of its analgesic effect. St. John\'s Wort acts as a mild SSRI and also induces CYP enzymes that metabolize tramadol. Combined: additive serotonin effects plus unpredictable tramadol blood levels.',
      safeLimits: 'Avoid combination. If tramadol is prescribed, do not add St. John\'s Wort without prescriber discussion. Many users combine these unintentionally — St. John\'s Wort is sold OTC and tramadol patients may not realize the herb is serotonergic. Always mention all supplements to your prescriber.',
      populations: {
        children: 'Tramadol contraindicated under 12. St. John\'s Wort not recommended under 12.',
        elderly: 'High risk — serotonin syndrome plus tramadol\'s seizure threshold lowering creates compound risk.',
        pregnancy: 'Both not recommended in pregnancy.',
      },
      sources: ['NIH NCCIH — St. John\'s Wort 2024', 'Tramadol FDA Prescribing Information', 'Lexi-Interact 2024'],
    },
    // ─────────────────────────────────────────────
    // LIVER STRESS pairs
    // (threshold 3 — dose-cumulative hepatic burden)
    // ─────────────────────────────────────────────
    {
      drugs: ['acetaminophen', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — acetaminophen and alcohol together are the leading cause of acute liver failure in the United States. The risk is highest with chronic alcohol use plus standard acetaminophen doses, but acute combinations can also cause damage.',
      mechanism: 'Acetaminophen is normally metabolized by the liver through safe pathways. Alcohol induces CYP2E1, an enzyme that shifts acetaminophen metabolism toward a toxic intermediate (NAPQI). Glutathione normally neutralizes NAPQI, but heavy or regular alcohol use depletes glutathione stores — the toxic intermediate then attacks liver cells directly, sometimes causing irreversible damage even at "safe" acetaminophen doses.',
      safeLimits: 'For occasional drinkers: limit acetaminophen to 2 g/day (4 regular Tylenol) when drinking. For regular drinkers (more than 3 drinks/day): consider non-acetaminophen pain relievers entirely, or talk to a doctor. CHECK ALL MEDICATIONS for hidden acetaminophen — it\'s in Tylenol PM, NyQuil, Excedrin, Theraflu, Percocet, Vicodin, Norco, and dozens of other products.',
      populations: {
        children: 'Alcohol is not appropriate for anyone under 21.',
        elderly: 'Higher baseline liver risk — combination is especially dangerous. Older adults should not exceed 2 g acetaminophen per day if they drink at all.',
        pregnancy: 'Alcohol should be avoided in pregnancy. Acetaminophen is the preferred pain reliever during pregnancy.',
      },
      sources: ['FDA Drug Safety Communication — Acetaminophen Liver Injury 2011', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'LiverTox Database (NIH) 2024'],
    },

  

    {
      drugs: ['acetaminophen', 'atorvastatin'],
      status: 'caution',
      summary: 'Both are metabolized in the liver — at standard doses, the combination is generally safe, but high acetaminophen use can compound the liver enzyme elevation that statins sometimes cause.',
      mechanism: 'Atorvastatin can occasionally raise liver enzymes (ALT/AST) as a known side effect — usually mild and reversible. Acetaminophen at high doses or with chronic use also stresses liver metabolism. Combined: the chance of needing a statin dose adjustment or liver enzyme monitoring increases.',
      safeLimits: 'At standard acetaminophen doses (under 3 g/day) and routine atorvastatin use: low risk. If acetaminophen is being used daily for chronic pain at doses near 4 g/day, mention it to your prescriber so they can monitor liver enzymes. Routine liver tests (LFTs) at 3 and 6 months of statin therapy are standard.',
      populations: {
        children: 'Statin pediatric use is specialist-directed.',
        elderly: 'Both more carefully monitored in older adults; daily acetaminophen above 3 g should prompt liver enzyme checks.',
        pregnancy: 'Atorvastatin contraindicated in pregnancy. Acetaminophen is preferred pain reliever in pregnancy.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'Lexi-Interact 2024', 'LiverTox Database (NIH) 2024'],
    },

    
    {
      drugs: ['hydrocodoneAcetaminophen', 'acetaminophen'],
      status: 'avoid',
      summary: 'Do not combine — hydrocodone/acetaminophen combination products ALREADY contain acetaminophen. Adding more acetaminophen (Tylenol, NyQuil, Excedrin, etc.) on top is one of the most common ways people accidentally exceed the daily liver limit.',
      mechanism: 'Hydrocodone/acetaminophen products contain 300–325 mg of acetaminophen per tablet (some older formulations had 500–750 mg). Taking 6–8 tablets a day already approaches or exceeds the 4 g/day acetaminophen safety limit. Adding standalone acetaminophen pushes the total dose into liver-toxic territory — and most users do not realize their pain combo pill contains acetaminophen.',
      safeLimits: 'CHECK YOUR LABELS. Hydrocodone/acetaminophen brand names include Norco, Vicodin, and Lortab — all contain acetaminophen. For additional pain relief, talk to your prescriber about adding ibuprofen or naproxen (with their own cautions) instead of more acetaminophen. Never exceed 4 g acetaminophen per day from ALL sources combined.',
      populations: {
        children: 'Hydrocodone/acetaminophen is not appropriate in pediatric pain management.',
        elderly: 'Highest risk group — limit total acetaminophen to 3 g/day from all sources.',
        pregnancy: 'Hydrocodone/acetaminophen use in pregnancy is prescriber-directed only.',
      },
      sources: ['FDA Drug Safety Communication — Acetaminophen Liver Injury 2011', 'Norco / Vicodin / Lortab FDA Prescribing Information', 'LiverTox Database (NIH) 2024'],
    },

    {
      drugs: ['hydrocodoneAcetaminophen', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — this is a triple-risk combination: opioid + alcohol (respiratory depression and overdose risk) PLUS acetaminophen + alcohol (acute liver injury). One of the most dangerous everyday combinations in medicine.',
      mechanism: 'Three overlapping risks: (1) hydrocodone and alcohol both depress the central nervous system and can cause fatal respiratory depression, especially during sleep; (2) the acetaminophen in the combination product becomes more liver-toxic when alcohol depletes glutathione and induces CYP2E1; (3) alcohol increases the absorption of some opioids, raising peak blood levels.',
      safeLimits: 'Avoid combination. If hydrocodone/acetaminophen has been prescribed, do not drink alcohol while taking it — even one drink can be dangerous depending on dose and timing. If alcohol use is a daily part of life, talk to your prescriber about non-opioid pain management options. Naloxone availability is recommended for anyone co-using opioids and alcohol.',
      populations: {
        children: 'Neither appropriate for pediatric use; alcohol not for anyone under 21.',
        elderly: 'Highest mortality risk group — strong recommendation against this combination.',
        pregnancy: 'Both should be avoided; combination is especially dangerous.',
      },
      sources: ['FDA Drug Safety Communication — Opioids and CNS Depressants 2016', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'CDC Guideline for Prescribing Opioids 2022'],
    },
    // ─────────────────────────────────────────────
    // ABSORPTION BLOCK pairs
    // (threshold 2 — timing-sensitive interactions)
    // ─────────────────────────────────────────────
    {
      drugs: ['levothyroxine', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Calcium binds to levothyroxine in the stomach and significantly reduces its absorption. This is a timing problem, not a "do not combine" problem — they can be taken safely if spaced apart.',
      mechanism: 'Calcium carbonate forms an insoluble complex with levothyroxine in the gastrointestinal tract, reducing levothyroxine absorption by up to 30%. The effect is dose-dependent and occurs whenever the two are in the stomach simultaneously.',
      safeLimits: 'Take levothyroxine first thing in the morning on an empty stomach with water. Wait at least 4 hours before taking calcium supplements or calcium-containing antacids (Tums). Many people take levothyroxine at 6 AM and calcium at lunch or dinner.',
      populations: {
        children: 'Pediatric levothyroxine dosing requires careful absorption — separate from calcium-containing foods/supplements by 4 hours.',
        elderly: 'Common combination in older adults — strict timing separation is essential for thyroid stability.',
        pregnancy: 'Levothyroxine dose often increases in pregnancy; absorption stability matters more than ever. Separate from prenatal calcium by 4 hours.',
      },
      sources: ['FDA Levothyroxine Prescribing Information', 'American Thyroid Association Guidelines 2024', 'Singh N et al. JAMA 2000'],
    },

    {
      drugs: ['levothyroxine', 'iron'],
      status: 'caution',
      summary: 'Iron supplements bind to levothyroxine and significantly reduce its absorption. Timing them apart by 4 hours solves the problem.',
      mechanism: 'Ferrous sulfate (and other iron forms) chelates levothyroxine in the GI tract, forming an insoluble complex that cannot be absorbed. The effect is most pronounced when both are taken simultaneously.',
      safeLimits: 'Take levothyroxine first thing in the morning on an empty stomach. Take iron supplements at least 4 hours later (commonly at lunch or with a vitamin C source for better iron absorption). Do not take both with the same meal.',
      populations: {
        children: 'Pediatric thyroid management requires careful absorption — separate from iron by 4 hours.',
        elderly: 'Iron deficiency anemia is common in older adults — proper timing keeps both treatments effective.',
        pregnancy: 'Both iron and levothyroxine are often needed in pregnancy. Take levothyroxine at 6 AM, iron at lunch with vitamin C for best results.',
      },
      sources: ['FDA Levothyroxine Prescribing Information', 'American Thyroid Association Guidelines 2024', 'Campbell NR et al. Ann Intern Med 1992'],
    },

    {
      drugs: ['levothyroxine', 'magnesium'],
      status: 'caution',
      summary: 'Magnesium can bind to levothyroxine and reduce its absorption, especially at higher supplement doses. Separating them by 4 hours prevents the interaction.',
      mechanism: 'Magnesium-containing antacids and supplements form complexes with levothyroxine in the GI tract, similar to calcium and iron. The effect is dose-related; higher magnesium intake produces a stronger absorption block.',
      safeLimits: 'Take levothyroxine first thing in the morning on an empty stomach. Take magnesium at bedtime (a common pairing for sleep) or at least 4 hours after levothyroxine. Avoid magnesium-containing antacids around levothyroxine dosing.',
      populations: {
        children: 'Pediatric levothyroxine dosing requires careful absorption — separate from magnesium by 4 hours.',
        elderly: 'Common supplement combination — strict timing matters for thyroid stability.',
        pregnancy: 'Magnesium often used in pregnancy for leg cramps and sleep. Separate from morning levothyroxine.',
      },
      sources: ['FDA Levothyroxine Prescribing Information', 'American Thyroid Association Guidelines 2024', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['levothyroxine', 'omeprazole'],
      status: 'caution',
      summary: 'Long-term proton pump inhibitor use can reduce levothyroxine absorption by raising stomach pH. The effect is gradual but can require dose adjustment.',
      mechanism: 'Levothyroxine absorption is pH-dependent — it dissolves and absorbs best in the acidic environment of a normal stomach. Omeprazole suppresses stomach acid production, raising gastric pH and reducing levothyroxine bioavailability over time.',
      safeLimits: 'Take levothyroxine first thing in the morning, at least 30–60 minutes before any food, drink, or other medication. If omeprazole is needed long-term, mention it to your thyroid prescriber — they may need to increase the levothyroxine dose to maintain TSH targets. Routine TSH monitoring (every 6–12 months) is recommended.',
      populations: {
        children: 'Pediatric PPI use requires similar caution and TSH monitoring if on levothyroxine.',
        elderly: 'Common combination — long-term PPI users often need higher levothyroxine doses. Don\'t change either dose without prescriber input.',
        pregnancy: 'Both used in pregnancy as needed; close TSH monitoring required.',
      },
      sources: ['FDA Levothyroxine Prescribing Information', 'American Thyroid Association Guidelines 2024', 'Centanni M et al. N Engl J Med 2006'],
    },

    {
      drugs: ['levothyroxine', 'famotidine'],
      status: 'caution',
      summary: 'H2 blockers like famotidine raise stomach pH and may modestly reduce levothyroxine absorption, especially with chronic daily use.',
      mechanism: 'Famotidine reduces stomach acid by blocking histamine H2 receptors on parietal cells. Higher gastric pH reduces the dissolution and absorption of levothyroxine. The effect is smaller than with PPIs (omeprazole) but real with long-term use.',
      safeLimits: 'Take levothyroxine first thing in the morning on an empty stomach. Famotidine can be taken later in the day (e.g., before bed). If using famotidine daily for reflux, mention it to your thyroid prescriber so TSH can be monitored for any dose adjustments.',
      populations: {
        children: 'Pediatric thyroid dosing requires careful monitoring if H2 blockers are used regularly.',
        elderly: 'Common combination — pay attention to TSH stability if either dose changes.',
        pregnancy: 'Both used in pregnancy when needed; TSH monitoring recommended.',
      },
      sources: ['FDA Levothyroxine Prescribing Information', 'Lexi-Interact 2024'],
    },

    // ─────────────────────────────────────────────
    // CARDIOVASCULAR STRESS pairs
    // (threshold 3 — sympathomimetic + SSRI/serotonergic risk)
    // ─────────────────────────────────────────────
    {
      drugs: ['pseudoephedrine', 'sertraline'],
      status: 'avoid',
      summary: 'Do not combine — pseudoephedrine can cause sudden, severe blood pressure spikes in people on SSRIs, plus added serotonergic risk. The combination is more dangerous than either alone.',
      mechanism: 'Pseudoephedrine stimulates alpha- and beta-adrenergic receptors, raising blood pressure and heart rate. Sertraline raises synaptic serotonin, which can amplify vascular responses and also creates a small risk of serotonin syndrome through pseudoephedrine\'s mild norepinephrine reuptake activity. Hypertensive crisis has been reported with this combination.',
      safeLimits: 'Avoid pseudoephedrine if on sertraline. For nasal congestion, choose: saline nasal sprays, steam inhalation, oxymetazoline nasal spray (max 3 days), or second-generation antihistamines (loratadine, cetirizine). Phenylephrine is also a sympathomimetic and has similar concerns.',
      populations: {
        children: 'Pediatric sertraline use requires prescriber-directed cold/flu treatment choices.',
        elderly: 'High cardiovascular risk — avoid combination strictly.',
        pregnancy: 'Pseudoephedrine generally avoided in first trimester; sertraline use individualized.',
      },
      sources: ['Lexi-Interact 2024', 'Sudafed (pseudoephedrine) FDA Prescribing Information', 'Sternbach H. Am J Psychiatry 1991 (serotonin syndrome review)'],
    },

    {
      drugs: ['pseudoephedrine', 'fluoxetine'],
      status: 'avoid',
      summary: 'Do not combine — pseudoephedrine can cause severe blood pressure spikes in people on fluoxetine. Fluoxetine\'s long half-life extends the risk for weeks after stopping.',
      mechanism: 'Pseudoephedrine raises blood pressure and heart rate through adrenergic stimulation. Fluoxetine blocks serotonin reuptake and has a uniquely long half-life (its active metabolite persists 1–3+ weeks). Combined: amplified vascular response with extended risk window — hypertensive episodes have been reported.',
      safeLimits: 'Avoid pseudoephedrine if on fluoxetine, and for several weeks after stopping fluoxetine. Use saline nasal rinses, steam inhalation, or short-term oxymetazoline (max 3 days) for congestion instead. If pseudoephedrine has been recently used, mention it to your prescriber.',
      populations: {
        children: 'Pediatric fluoxetine use requires careful cold/flu treatment choices.',
        elderly: 'High cardiovascular risk — avoid combination strictly.',
        pregnancy: 'Pseudoephedrine generally avoided in first trimester; fluoxetine use individualized.',
      },
      sources: ['Lexi-Interact 2024', 'Prozac (fluoxetine) FDA Prescribing Information', 'Sudafed (pseudoephedrine) FDA Prescribing Information'],
    },

    {
      drugs: ['pseudoephedrine', 'escitalopram'],
      status: 'avoid',
      summary: 'Do not combine — pseudoephedrine raises blood pressure significantly and can produce hypertensive responses in people on escitalopram.',
      mechanism: 'Pseudoephedrine stimulates adrenergic receptors, raising blood pressure and heart rate. Escitalopram raises synaptic serotonin which can amplify vasoconstrictive responses. The combination carries documented risk of hypertensive episodes and may also slightly increase serotonin syndrome risk.',
      safeLimits: 'Avoid pseudoephedrine if on escitalopram. Use non-stimulant decongestion options: saline rinses, steam inhalation, short-term oxymetazoline nasal spray (max 3 days), or second-generation antihistamines for allergy-related congestion.',
      populations: {
        children: 'Pediatric SSRI use requires prescriber-directed cold treatment.',
        elderly: 'High cardiovascular risk — avoid.',
        pregnancy: 'Both have individualized use cases in pregnancy — discuss with prescriber.',
      },
      sources: ['Lexi-Interact 2024', 'Lexapro (escitalopram) FDA Prescribing Information', 'Sudafed (pseudoephedrine) FDA Prescribing Information'],
    },

    {
      drugs: ['phenylephrine', 'sertraline'],
      status: 'avoid',
      summary: 'Do not combine — phenylephrine raises blood pressure through adrenergic stimulation, and sertraline can amplify vascular responses. The combination has documented risk of hypertensive episodes.',
      mechanism: 'Phenylephrine is a direct alpha-1 adrenergic agonist — it constricts blood vessels and raises blood pressure. Sertraline raises synaptic serotonin, which interacts with vascular smooth muscle to amplify constrictive responses. Combined: greater blood pressure elevation than either alone.',
      safeLimits: 'Avoid phenylephrine if on sertraline. Use saline rinses, steam, or short-term oxymetazoline (max 3 days) for nasal congestion instead. Note: many multi-symptom cold products contain phenylephrine — check labels carefully.',
      populations: {
        children: 'Pediatric sertraline use requires prescriber-directed cold treatment.',
        elderly: 'High cardiovascular risk — avoid.',
        pregnancy: 'Phenylephrine generally avoided in first trimester; sertraline use individualized.',
      },
      sources: ['Lexi-Interact 2024', 'Sudafed PE (phenylephrine) FDA Prescribing Information'],
    },

    {
      drugs: ['phenylephrine', 'caffeine'],
      status: 'caution',
      summary: 'Both are stimulants — combined use raises heart rate and blood pressure, with risk of palpitations, anxiety, or insomnia. Common because many cold remedies contain phenylephrine and people drink coffee.',
      mechanism: 'Phenylephrine constricts blood vessels through alpha-1 adrenergic agonism. Caffeine blocks adenosine receptors, increasing sympathetic nervous system activity. Combined: additive elevation of heart rate and blood pressure.',
      safeLimits: 'If using phenylephrine for nasal congestion, limit caffeine to 1 cup of coffee per day during that window. Avoid energy drinks (high caffeine doses). Monitor for palpitations, tremor, or anxiety. Stop phenylephrine if symptoms appear.',
      populations: {
        children: 'Phenylephrine not under 6. Caffeine not recommended for children.',
        elderly: 'High cardiovascular sensitivity — consider non-stimulant decongestion options.',
        pregnancy: 'Phenylephrine generally avoided in first trimester. Caffeine limited to under 200 mg/day in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'Sudafed PE (phenylephrine) FDA Prescribing Information', 'ACOG Caffeine in Pregnancy 2023'],
    },
    // ─────────────────────────────────────────────
    // CAFFEINE pairs
    // (sympathomimetic + cns_stimulant interactions)
    // ─────────────────────────────────────────────
    {
      drugs: ['caffeine', 'sertraline'],
      status: 'caution',
      summary: 'Common combination that may worsen SSRI side effects like anxiety, insomnia, jitteriness, and rapid heartbeat. Generally manageable with dose awareness — most people can have moderate caffeine on sertraline without issue.',
      mechanism: 'Sertraline raises synaptic serotonin, which can amplify anxiety responses in some users. Caffeine blocks adenosine receptors, increasing sympathetic nervous system activity (heart rate, alertness). Combined: amplified stimulation, especially in the first few weeks of SSRI therapy when side effects are most prominent.',
      safeLimits: 'If new to sertraline, reduce caffeine to under 200 mg/day (1–2 cups of coffee) for the first 4–6 weeks while your body adjusts. Once stable on sertraline, moderate caffeine (under 400 mg/day) is usually fine. Watch for: jitters, insomnia, racing heart — these signal it\'s time to cut caffeine back.',
      populations: {
        children: 'Caffeine not recommended in children. Pediatric sertraline use should pair with caffeine avoidance.',
        elderly: 'Higher cardiovascular sensitivity — keep caffeine moderate.',
        pregnancy: 'Caffeine limited to 200 mg/day in pregnancy regardless. Sertraline use individualized.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024'],
    },

    {
      drugs: ['caffeine', 'fluoxetine'],
      status: 'caution',
      summary: 'Common combination that may amplify SSRI side effects like anxiety, insomnia, and jitteriness. Fluoxetine specifically may slow caffeine metabolism, making your usual coffee feel stronger.',
      mechanism: 'Fluoxetine raises serotonin AND inhibits CYP1A2 (the liver enzyme that metabolizes caffeine), so caffeine levels can rise higher and last longer than usual. Combined: stronger and longer-lasting stimulant effects than caffeine alone would produce.',
      safeLimits: 'If new to fluoxetine, reduce caffeine intake to under 200 mg/day (1–2 cups of coffee). Many people notice their usual coffee feels "too strong" on fluoxetine — that\'s the CYP1A2 effect, not anxiety. Switch to half-caf or decaf for the morning routine and monitor how you feel.',
      populations: {
        children: 'Caffeine not recommended in children.',
        elderly: 'Both metabolic slowdown and cardiovascular sensitivity matter more — keep caffeine modest.',
        pregnancy: 'Caffeine limited to 200 mg/day in pregnancy. Fluoxetine use individualized.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024', 'Prozac (fluoxetine) FDA Prescribing Information'],
    },

    {
      drugs: ['caffeine', 'alprazolam'],
      status: 'caution',
      summary: 'Caffeine works against alprazolam — it stimulates the same nervous system that alprazolam is calming. Combined use can make alprazolam less effective and worsen anxiety symptoms.',
      mechanism: 'Alprazolam enhances GABA inhibitory signaling, calming the central nervous system. Caffeine blocks adenosine receptors and increases sympathetic nervous system activity, working in the opposite direction. The two essentially fight each other — caffeine reduces alprazolam\'s anti-anxiety effect, and alprazolam reduces caffeine\'s alertness benefit.',
      safeLimits: 'If alprazolam is prescribed for anxiety, keep caffeine moderate (under 200 mg/day) and avoid caffeine in the afternoon. Many people on alprazolam find that switching to decaf or herbal tea improves their anxiety control significantly. Avoid energy drinks entirely.',
      populations: {
        children: 'Neither appropriate in pediatric anxiety care.',
        elderly: 'Both more impactful with age — minimize caffeine.',
        pregnancy: 'Alprazolam generally avoided in pregnancy. Caffeine under 200 mg/day.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024'],
    },

    {
      drugs: ['caffeine', 'zolpidem'],
      status: 'caution',
      summary: 'Caffeine works against zolpidem and can prevent sleep onset or cause middle-of-the-night awakenings. Timing matters more than total amount — afternoon and evening caffeine is the main problem.',
      mechanism: 'Zolpidem acts on GABA-A receptors to induce sleep. Caffeine blocks adenosine receptors that normally accumulate throughout the day to make you sleepy. Even if zolpidem successfully starts sleep, residual caffeine can fragment sleep and reduce sleep quality.',
      safeLimits: 'If taking zolpidem at night, stop all caffeine (coffee, tea, energy drinks, chocolate) by 12–2 PM. Caffeine has a 5–6 hour half-life, so a 3 PM coffee still has meaningful effects at 9 PM bedtime. Some people are slow caffeine metabolizers and need an even earlier cutoff.',
      populations: {
        children: 'Zolpidem not appropriate for pediatric sleep.',
        elderly: 'Slower caffeine clearance with age — earlier afternoon cutoff is essential. Both medications are on the Beers Criteria.',
        pregnancy: 'Zolpidem generally avoided in pregnancy. Caffeine under 200 mg/day.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024', 'Beers Criteria 2023'],
    },

    {
      drugs: ['caffeine', 'melatonin'],
      status: 'caution',
      summary: 'Caffeine works against melatonin and reduces its effectiveness for sleep. The two are pharmacologically opposed — caffeine promotes alertness while melatonin signals sleep.',
      mechanism: 'Melatonin signals the brain that it\'s time to sleep through MT1/MT2 receptor activation. Caffeine blocks adenosine receptors and increases alertness through sympathetic activation. Residual caffeine in the evening blunts melatonin\'s sleep-promoting effect, even if you "feel fine" before bed.',
      safeLimits: 'For melatonin to work effectively, stop caffeine by early afternoon (2 PM or earlier). Take melatonin 30–60 minutes before your target bedtime. Caffeine\'s half-life means a 3 PM coffee is still 25% active at 9 PM — that\'s enough to interfere with melatonin\'s signal.',
      populations: {
        children: 'Caffeine not recommended in children. Melatonin under prescriber guidance for kids over 3.',
        elderly: 'Slower caffeine clearance — afternoon cutoff is essential for melatonin to work.',
        pregnancy: 'Caffeine under 200 mg/day; melatonin data limited in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['caffeine', 'warfarin'],
      status: 'caution',
      summary: 'High caffeine intake can modestly alter warfarin metabolism and may slightly change INR stability. Moderate consistent caffeine is generally fine; large fluctuations in caffeine intake matter more than the total amount.',
      mechanism: 'Caffeine is metabolized by CYP1A2, the same liver enzyme that handles part of warfarin metabolism. High doses of caffeine (over 600 mg/day) can compete for this enzyme and slightly raise warfarin levels. The effect is usually modest, but inconsistent caffeine intake makes INR harder to keep in range.',
      safeLimits: 'Keep caffeine intake consistent day-to-day. If you drink 2 cups of coffee daily, keep doing that — don\'t suddenly switch to 4 cups or 0 cups. Avoid energy drinks (often 200–300 mg per can) on warfarin. Mention any major caffeine changes to your warfarin prescriber so INR can be checked.',
      populations: {
        children: 'Pediatric warfarin use requires hematology oversight; caffeine should be limited.',
        elderly: 'Common combination — emphasize consistency over restriction.',
        pregnancy: 'Warfarin generally avoided in pregnancy; caffeine under 200 mg/day.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024', 'Holbrook AM et al. Arch Intern Med 2005'],
    },

    {
      drugs: ['caffeine', 'lTheanine'],
      status: 'safe',
      summary: 'Well-studied safe combination — L-theanine smooths out caffeine\'s jitteriness while preserving its alertness benefit. This is one of the most-researched nootropic combinations in modern wellness.',
      mechanism: 'Caffeine blocks adenosine receptors, increasing alertness, focus, and sometimes anxiety/jitteriness. L-theanine increases alpha brain waves and modulates GABA, producing a calm-focused state. The two are complementary — L-theanine takes the edge off caffeine without blocking its cognitive benefits.',
      safeLimits: 'Common effective ratio: 100 mg L-theanine per 50–100 mg caffeine (roughly 2:1 or 1:1). Found naturally in green tea. Supplemented combinations are widely used in nootropic stacks. Avoid pairing this with other stimulants (energy drinks, decongestants).',
      populations: {
        children: 'Caffeine not recommended in children.',
        elderly: 'Generally well tolerated; useful for those who want caffeine\'s focus benefit without the jitters.',
        pregnancy: 'Caffeine limited to 200 mg/day in pregnancy. L-theanine data limited — consult OB.',
      },
      sources: ['Owen GN et al. Nutr Neurosci 2008', 'NIH NCCIH — Caffeine 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['caffeine', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — caffeine masks alcohol\'s sedating effects without reducing impairment. This "alert drunk" state leads to more drinking, more risky decisions, and significantly higher rates of injury, alcohol poisoning, and DUI.',
      mechanism: 'Alcohol depresses the central nervous system, causing impaired coordination, judgment, and reaction time. Caffeine blocks adenosine receptors and increases alertness — but it does NOT reduce alcohol\'s impairment of motor skills or decision-making. The result: you feel less drunk than you are, drink more than you would otherwise, and overestimate your ability to drive, walk safely, or make sound choices.',
      safeLimits: 'Avoid combining. Energy drinks plus alcohol (Red Bull + vodka style combinations) are particularly dangerous and were specifically targeted by the FDA in 2010 when pre-mixed caffeinated alcoholic drinks were banned from the US market. If you\'re drinking, skip the energy drinks and coffee — let yourself feel your actual level of impairment.',
      populations: {
        children: 'Neither appropriate for anyone under 21.',
        elderly: 'High risk of falls and accidents — the masked impairment is especially dangerous.',
        pregnancy: 'Alcohol should be avoided in pregnancy. Caffeine under 200 mg/day.',
      },
      sources: ['FDA Caffeinated Alcoholic Beverages Warning 2010', 'CDC Alcohol and Caffeine 2023', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },
    // ─────────────────────────────────────────────
    // DIURETIC / FLUID BALANCE pairs
    // (threshold 3 — cumulative dehydration/electrolyte loss)
    // ─────────────────────────────────────────────
    {
      drugs: ['hydrochlorothiazide', 'caffeine'],
      status: 'caution',
      summary: 'Both increase urination — combined use can lead to dehydration and electrolyte imbalances, especially in warm weather or during exercise. Moderate consistent caffeine is generally manageable, but heavy intake amplifies HCTZ side effects.',
      mechanism: 'Hydrochlorothiazide (HCTZ) blocks sodium reabsorption in the kidneys, increasing urine output and sodium/potassium excretion. Caffeine has mild diuretic effects through adenosine receptor blockade and increased renal blood flow. Combined: more fluid loss than either alone, with higher risk of low potassium, dizziness on standing, and dehydration symptoms.',
      safeLimits: 'Keep caffeine moderate (under 300 mg/day, roughly 2–3 cups of coffee) while on HCTZ. Hydrate well throughout the day — aim for clear or pale yellow urine. Avoid energy drinks. If you notice muscle cramps, weakness, or feeling lightheaded on standing, talk to your prescriber — these can signal low potassium or sodium.',
      populations: {
        children: 'Pediatric HCTZ use is specialist-directed; caffeine should be limited.',
        elderly: 'Higher risk of falls from dehydration and low blood pressure on standing. Keep caffeine modest and hydration consistent.',
        pregnancy: 'HCTZ use individualized in pregnancy. Caffeine limited to 200 mg/day in pregnancy regardless.',
      },
      sources: ['Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024', 'HCTZ FDA Prescribing Information'],
    },

    {
      drugs: ['hydrochlorothiazide', 'alcohol'],
      status: 'caution',
      summary: 'Both lower blood pressure and increase fluid loss — combined use can cause significant dizziness on standing, dehydration, and electrolyte imbalances. Risk is highest in older adults and in hot weather.',
      mechanism: 'HCTZ lowers blood pressure by reducing fluid volume and dilating blood vessels. Alcohol also lowers blood pressure (through vasodilation) and is a significant diuretic. Combined: amplified blood pressure drop plus more fluid loss than either alone — leading to dizziness, fainting risk on standing, and lower sodium/potassium levels.',
      safeLimits: 'Limit alcohol while on HCTZ — generally no more than 1 drink per day for women, 2 for men, and not on an empty stomach. If you feel lightheaded when standing up, sit back down and rehydrate. Avoid alcohol entirely on hot days or before exercise. Mention regular alcohol use to your prescriber so they can check sodium and potassium periodically.',
      populations: {
        children: 'Pediatric HCTZ is specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Highest fall risk group — combination is particularly dangerous. Strict moderation or avoidance recommended.',
        pregnancy: 'HCTZ use individualized. Alcohol should be avoided in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'HCTZ FDA Prescribing Information'],
    },

    {
      drugs: ['caffeine', 'alcohol', 'hydrochlorothiazide'],
      status: 'avoid',
      summary: 'Triple-stack of fluid-loss agents — caffeine, alcohol, and HCTZ together significantly increase dehydration, blood pressure swings, electrolyte loss, and fall risk. Particularly dangerous in older adults and during hot weather.',
      mechanism: 'Each substance contributes independently to fluid and electrolyte loss: HCTZ reduces blood volume and potassium, alcohol is a significant diuretic and vasodilator, and caffeine adds mild diuretic and stimulant effects. Combined: rapid dehydration, dizziness on standing, low potassium, and amplified blood pressure changes. Cognitive effects compound too — caffeine masks alcohol\'s impairment while neither addresses HCTZ\'s blood pressure drop.',
      safeLimits: 'Avoid stacking all three. If on HCTZ, choose: moderate caffeine OR moderate alcohol, never both on the same day. Stay hydrated with water (not just caffeinated or alcoholic drinks). Avoid energy drinks entirely. If you notice rapid heartbeat, muscle weakness, or extreme thirst, stop all three and rehydrate immediately.',
      populations: {
        children: 'None of these are appropriate together for anyone under 21.',
        elderly: 'Highest risk group for falls, hospitalization, and cardiovascular events. Strong recommendation against this combination.',
        pregnancy: 'Alcohol avoided in pregnancy. Caffeine under 200 mg/day. HCTZ use individualized — discuss combination concerns with prescriber.',
      },
      sources: ['Lexi-Interact 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'HCTZ FDA Prescribing Information', 'NIH NCCIH — Caffeine 2024'],
    },

    {
      drugs: ['hydrochlorothiazide', 'sennosides'],
      status: 'caution',
      summary: 'HCTZ and senna laxatives both deplete potassium through different mechanisms — combined use can cause significantly low potassium levels, especially with chronic laxative use.',
      mechanism: 'HCTZ increases potassium excretion through the kidneys. Sennosides stimulate intestinal motility and increase potassium loss through the bowel. Combined: more rapid potassium depletion than either alone — particularly with chronic laxative use, which is common in older adults.',
      safeLimits: 'Use sennosides only occasionally if on HCTZ (no more than a few times per week). For chronic constipation, polyethylene glycol (MiraLax) is a safer option because it does not deplete potassium. Mention regular laxative use to your prescriber — they may want to check potassium periodically. Eat potassium-rich foods (bananas, sweet potatoes, leafy greens).',
      populations: {
        children: 'Pediatric HCTZ specialist-directed; senna use should be physician-guided.',
        elderly: 'Common combination — older adults often use HCTZ for blood pressure AND laxatives for constipation. Switch to PEG-based laxatives if possible.',
        pregnancy: 'HCTZ use individualized. Senna generally avoided in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'HCTZ FDA Prescribing Information', 'AGA Guideline on Constipation 2024'],
    },

    {
      drugs: ['caffeine', 'sennosides'],
      status: 'caution',
      summary: 'Both can increase fluid loss and bowel motility — combined use may cause dehydration, electrolyte imbalances, or worsen diarrhea. Stacking them for "extra cleanse" effects is not safer than using one.',
      mechanism: 'Sennosides stimulate colon motility and increase fluid secretion into the bowel, producing a laxative effect with some potassium loss. Caffeine has mild diuretic effects and also stimulates colonic motility. Combined: faster transit, more fluid loss, and amplified urgency that some people misinterpret as a "deeper cleanse."',
      safeLimits: 'If using senna for occasional constipation, reduce caffeine that day (especially in the morning when senna is most active). Hydrate well — drink plenty of water with both. Avoid energy drinks. For chronic constipation, choose polyethylene glycol (MiraLax) instead of senna — it does not deplete electrolytes.',
      populations: {
        children: 'Pediatric laxative use should be physician-guided. Caffeine not recommended in children.',
        elderly: 'Higher risk of dehydration — choose gentler options like PEG-based laxatives.',
        pregnancy: 'Senna generally avoided in pregnancy. Caffeine under 200 mg/day.',
      },
      sources: ['Lexi-Interact 2024', 'AGA Guideline on Constipation 2024', 'NIH NCCIH — Caffeine 2024'],
    },
    // ─────────────────────────────────────────────
    // ANTICOAGULANT + NATURAL pairs
    // (warfarin and apixaban interactions with herbs/supplements)
    // ─────────────────────────────────────────────
    {
      drugs: ['warfarin', 'ginkgoBiloba'],
      status: 'avoid',
      summary: 'Do not combine — ginkgo significantly increases bleeding risk in warfarin patients. Documented case reports include intracranial hemorrhage and other major bleeding events.',
      mechanism: 'Warfarin reduces clotting by blocking vitamin K-dependent clotting factor synthesis. Ginkgo biloba inhibits platelet-activating factor (PAF), preventing platelets from clumping at injury sites. Combined: warfarin\'s effect on clotting factors plus ginkgo\'s effect on platelets creates two simultaneous bleeding pathways. Even brief use has caused serious bleeds.',
      safeLimits: 'Avoid combination. If ginkgo is part of your routine, mention it to your warfarin prescriber before continuing — many anticoagulation clinics recommend stopping ginkgo entirely. If considering ginkgo for memory or circulation, alternative supplements (omega-3 at modest doses, vitamin B complex) carry less bleeding risk.',
      populations: {
        children: 'Ginkgo not recommended under 18. Pediatric warfarin use requires hematology oversight.',
        elderly: 'Highest bleeding risk group — strong recommendation against combination.',
        pregnancy: 'Both avoided — warfarin is teratogenic and ginkgo carries bleeding risk.',
      },
      sources: ['Lexi-Interact 2024', 'Rowin J, Lewis SL. Neurology 1996 (intracranial hemorrhage case report)', 'Natural Medicines Database 2024', 'NIH NCCIH — Ginkgo 2024'],
    },

    {
      drugs: ['warfarin', 'fishOil'],
      status: 'caution',
      summary: 'Fish oil has antiplatelet activity that adds to warfarin\'s anticoagulant effect. Modest doses (under 2 g/day EPA+DHA) are generally manageable; higher doses meaningfully raise bleeding risk.',
      mechanism: 'Warfarin reduces vitamin K-dependent clotting factors. Fish oil (EPA/DHA) competes with arachidonic acid for COX, producing less-active thromboxane and reducing platelet aggregation. Combined: clotting factor reduction plus platelet inhibition creates two-way bleeding risk that scales with fish oil dose.',
      safeLimits: 'If on warfarin, keep fish oil at modest doses (under 2 g/day EPA+DHA). Avoid prescription-strength omega-3 (Lovaza, Vascepa) without prescriber input — those are 4 g/day formulations. Stop fish oil 7–10 days before any planned surgery. Mention fish oil to your warfarin prescriber so INR can be monitored when starting, stopping, or changing doses.',
      populations: {
        children: 'Pediatric warfarin specialist-directed.',
        elderly: 'Higher bleeding sensitivity — modest fish oil only.',
        pregnancy: 'Warfarin avoided in pregnancy. Fish oil generally safe in pregnancy at standard doses.',
      },
      sources: ['Lexi-Interact 2024', 'NIH ODS — Omega-3 2024', 'Harris WS. Prostaglandins Leukot Essent Fatty Acids 2007'],
    },

    {
      drugs: ['warfarin', 'garlic'],
      status: 'caution',
      summary: 'Garlic supplements have antiplatelet activity that can add to warfarin\'s effect, especially at high doses. Culinary garlic is generally safe; concentrated supplements warrant INR monitoring.',
      mechanism: 'Warfarin reduces vitamin K-dependent clotting factors. Garlic\'s allicin and ajoene inhibit platelet aggregation. High-dose garlic supplements may also affect CYP enzymes that metabolize warfarin. Combined: additive anticoagulant effect plus potential for unpredictable warfarin levels at supplement doses.',
      safeLimits: 'Culinary garlic (in cooking, garlic-flavored foods) is generally safe with warfarin. Avoid concentrated garlic supplements (aged garlic extract, Kyolic, garlic capsules over 1,000 mg/day) without prescriber input. If you take regular garlic supplements, mention this when starting or adjusting warfarin so INR can be monitored.',
      populations: {
        children: 'Pediatric warfarin specialist-directed.',
        elderly: 'Common combination — focus on consistency in garlic intake to keep INR stable.',
        pregnancy: 'Warfarin avoided in pregnancy. Culinary garlic generally safe.',
      },
      sources: ['Lexi-Interact 2024', 'Natural Medicines Database 2024', 'NIH NCCIH Herb-Drug Interactions'],
    },

    {
      drugs: ['warfarin', 'ginger'],
      status: 'caution',
      summary: 'Ginger has mild antiplatelet activity that can add to warfarin\'s effect at supplement doses. Tea and culinary use are generally fine; concentrated ginger capsules warrant monitoring.',
      mechanism: 'Warfarin reduces vitamin K-dependent clotting factor synthesis. Ginger\'s gingerols and shogaols inhibit thromboxane synthesis and reduce platelet aggregation. The effect is dose-dependent — small amounts in food or tea are unlikely to affect INR, but concentrated supplements can amplify warfarin\'s bleeding risk.',
      safeLimits: 'Ginger tea, fresh ginger in cooking, and pickled ginger with meals: generally safe with warfarin. Concentrated ginger capsules over 1 g/day: mention to prescriber and monitor INR. Stop ginger supplements 7 days before any planned surgery.',
      populations: {
        children: 'Pediatric warfarin specialist-directed.',
        elderly: 'Higher bleeding sensitivity — keep ginger to food and tea amounts.',
        pregnancy: 'Warfarin avoided in pregnancy. Ginger safe up to 4 g/day for nausea.',
      },
      sources: ['Lexi-Interact 2024', 'Natural Medicines Database 2024', 'NIH NCCIH — Ginger 2024'],
    },

    {
      drugs: ['warfarin', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — St. John\'s Wort REDUCES warfarin\'s effectiveness through liver enzyme induction. This sounds less risky than amplified bleeding, but it actually means clots can form: strokes, deep vein thrombosis, pulmonary embolism. Equally dangerous in the opposite direction.',
      mechanism: 'St. John\'s Wort potently induces CYP3A4, CYP2C9, and other liver enzymes that metabolize warfarin. With St. John\'s Wort in the system, warfarin is broken down faster, blood levels drop, and INR falls — meaning the anticoagulation that prevents clots stops working. Stopping St. John\'s Wort later can swing INR the other direction, creating bleeding risk.',
      safeLimits: 'Avoid combination. If St. John\'s Wort is being used for mood support, talk to your warfarin prescriber about safer alternatives. If you have been taking St. John\'s Wort, do not abruptly stop without medical guidance — both starting and stopping it shifts warfarin levels and requires INR re-checking and possible dose adjustment.',
      populations: {
        children: 'St. John\'s Wort not recommended under 12. Pediatric warfarin specialist-directed.',
        elderly: 'High risk — clotting events (stroke, DVT) are leading causes of hospitalization in this age group.',
        pregnancy: 'Both should be avoided in pregnancy.',
      },
      sources: ['NIH NCCIH — St. John\'s Wort 2024', 'Lexi-Interact 2024', 'Yue QY et al. Lancet 2000 (warfarin/SJW interaction cases)'],
    },

    {
      drugs: ['apixaban', 'ginkgoBiloba'],
      status: 'avoid',
      summary: 'Do not combine — ginkgo adds to apixaban\'s bleeding risk through platelet inhibition. Combination raises the risk of serious bleeding without offsetting clinical benefit.',
      mechanism: 'Apixaban inhibits Factor Xa, blocking the coagulation cascade. Ginkgo biloba inhibits platelet-activating factor (PAF), preventing platelet aggregation. Combined: weakened clotting from apixaban plus impaired platelet function from ginkgo — two-way bleeding risk that has been documented to cause clinically significant hemorrhage.',
      safeLimits: 'Avoid combination. If ginkgo is part of your routine, mention it to your apixaban prescriber. Alternative supplements for memory and circulation (omega-3 at modest doses, B vitamins) carry less bleeding risk.',
      populations: {
        children: 'Ginkgo not recommended under 18. Pediatric apixaban specialist-directed.',
        elderly: 'Highest bleeding risk group — strong recommendation against combination.',
        pregnancy: 'Both avoided.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'Lexi-Interact 2024', 'NIH NCCIH — Ginkgo 2024'],
    },

    {
      drugs: ['apixaban', 'fishOil'],
      status: 'caution',
      summary: 'Fish oil has antiplatelet activity that adds to apixaban\'s anticoagulant effect. Modest doses are generally manageable; higher doses raise bleeding risk and require physician input.',
      mechanism: 'Apixaban inhibits Factor Xa in the clotting cascade. Fish oil (EPA/DHA) reduces platelet aggregation through competitive COX substrate effects. Combined: apixaban\'s clotting block plus fish oil\'s platelet effect creates additive bleeding risk that scales with fish oil dose.',
      safeLimits: 'If on apixaban, keep fish oil at modest doses (under 2 g/day EPA+DHA). Avoid prescription-strength omega-3 (Lovaza, Vascepa, 4 g/day) without prescriber input. Stop fish oil 7–10 days before any planned surgery. Watch for unusual bruising, prolonged bleeding from cuts, or blood in urine/stool.',
      populations: {
        children: 'Pediatric apixaban specialist-directed.',
        elderly: 'Higher bleeding sensitivity — modest fish oil only.',
        pregnancy: 'Apixaban not recommended in pregnancy. Fish oil generally safe at standard doses.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'Lexi-Interact 2024', 'NIH ODS — Omega-3 2024'],
    },

    {
      drugs: ['apixaban', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — St. John\'s Wort significantly REDUCES apixaban\'s blood levels through CYP3A4 and P-glycoprotein induction. The clotting protection that apixaban provides can drop dangerously, raising the risk of stroke, deep vein thrombosis, and pulmonary embolism.',
      mechanism: 'Apixaban is metabolized by CYP3A4 and transported by P-glycoprotein (P-gp). St. John\'s Wort is a potent inducer of BOTH systems — it ramps up apixaban metabolism AND increases its efflux, dropping blood levels significantly. The result: less Factor Xa inhibition, more clot formation risk. This is one of the most clinically significant herb-drug interactions for direct oral anticoagulants.',
      safeLimits: 'Avoid combination. If St. John\'s Wort has been part of your routine, mention it to your apixaban prescriber before stopping either — both starting and stopping the herb changes apixaban levels and warrants medical oversight. For mood support, talk to a prescriber about safer alternatives that don\'t affect anticoagulation.',
      populations: {
        children: 'St. John\'s Wort not under 12. Pediatric apixaban specialist-directed.',
        elderly: 'High risk for clotting events (stroke, DVT, PE) when anticoagulation drops.',
        pregnancy: 'Both should be avoided.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'NIH NCCIH — St. John\'s Wort 2024', 'Lexi-Interact 2024'],
    },
    // ─────────────────────────────────────────────
    // DEXTROMETHORPHAN + SEROTONERGIC pairs
    // (FDA-flagged serotonin syndrome risk)
    // ─────────────────────────────────────────────
    {
      drugs: ['dextromethorphan', 'sertraline'],
      status: 'avoid',
      summary: 'Do not combine — dextromethorphan (in most cough syrups) has serotonergic activity that adds to sertraline, with FDA-documented risk of serotonin syndrome. This is a common, dangerous over-the-counter trap during cold and flu season.',
      mechanism: 'Sertraline blocks serotonin reuptake, raising synaptic serotonin levels. Dextromethorphan inhibits serotonin reuptake AND acts on sigma-1 receptors involved in serotonergic signaling. Combined: amplified serotonin activity that can trigger serotonin syndrome — agitation, sweating, rapid heartbeat, tremor, confusion, fever — sometimes within hours.',
      safeLimits: 'Avoid dextromethorphan if on sertraline. CHECK ALL COLD/FLU MEDICATION LABELS — dextromethorphan is in Robitussin DM, Mucinex DM, NyQuil (and most "DM" products). For cough relief, choose: honey (over 1 year of age), humidifier, throat lozenges, or guaifenesin alone (without DM). For congestion, saline rinses and steam are SSRI-safe.',
      populations: {
        children: 'Pediatric sertraline use requires prescriber-directed cough management.',
        elderly: 'High risk — serotonin syndrome can present as confusion or falls that get misdiagnosed.',
        pregnancy: 'Both require prescriber discussion; combination not recommended.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Lexi-Interact 2024', 'Boyer EW, Shannon M. N Engl J Med 2005'],
    },

    {
      drugs: ['dextromethorphan', 'fluoxetine'],
      status: 'avoid',
      summary: 'Do not combine — dextromethorphan adds serotonergic activity to fluoxetine. Fluoxetine\'s long half-life extends the risk window for weeks after stopping, making this a particularly easy combination to accidentally trigger.',
      mechanism: 'Fluoxetine is an SSRI that blocks serotonin reuptake. Dextromethorphan also inhibits serotonin reuptake AND is metabolized by CYP2D6 — the same enzyme fluoxetine strongly inhibits. Combined: amplified serotonin levels PLUS higher-than-expected dextromethorphan levels because fluoxetine slows its clearance. Fluoxetine\'s active metabolite persists 1–3+ weeks after stopping, so the risk continues even during a "washout."',
      safeLimits: 'Avoid dextromethorphan if on fluoxetine, and for several weeks after stopping fluoxetine. For cough relief: honey (over 1 year), humidifier, throat lozenges, or guaifenesin alone. Check every cold/flu medication label — dextromethorphan is in dozens of common products.',
      populations: {
        children: 'Pediatric fluoxetine use requires careful OTC cold medication choices.',
        elderly: 'High risk; symptoms may be subtle and missed.',
        pregnancy: 'Both require prescriber discussion.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Prozac (fluoxetine) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['dextromethorphan', 'escitalopram'],
      status: 'avoid',
      summary: 'Do not combine — dextromethorphan adds to escitalopram\'s serotonergic effect, raising the risk of serotonin syndrome through similar mechanisms.',
      mechanism: 'Escitalopram blocks serotonin reuptake, raising synaptic serotonin. Dextromethorphan also inhibits serotonin reuptake and modulates sigma-1 receptors involved in serotonergic signaling. Combined: amplified serotonin activity that can trigger serotonin syndrome.',
      safeLimits: 'Avoid dextromethorphan if on escitalopram. For cough relief, choose: honey (over 1 year), humidifier, throat lozenges, or guaifenesin alone (without DM). Watch all cold/flu medication labels — dextromethorphan hides in many.',
      populations: {
        children: 'Pediatric SSRI use requires careful OTC choices.',
        elderly: 'High risk for serotonin syndrome.',
        pregnancy: 'Both require prescriber discussion.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Lexapro (escitalopram) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['dextromethorphan', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — both have serotonergic activity, AND both can lower seizure threshold. The combination raises risk of serotonin syndrome and seizures simultaneously.',
      mechanism: 'Tramadol inhibits serotonin and norepinephrine reuptake AND activates mu-opioid receptors. Dextromethorphan inhibits serotonin reuptake and modulates sigma-1 receptors. Combined: amplified serotonin activity plus additive seizure risk (both drugs are known to lower seizure threshold in susceptible patients).',
      safeLimits: 'Avoid combination. If tramadol is prescribed for pain, choose dextromethorphan-free cough remedies: honey (over 1 year), humidifier, throat lozenges, or guaifenesin alone. Watch all combination cold medications carefully.',
      populations: {
        children: 'Tramadol contraindicated under 12.',
        elderly: 'High risk — both drugs and seizure risk are amplified in older adults.',
        pregnancy: 'Both should be avoided in pregnancy.',
      },
      sources: ['FDA Drug Safety Communication — Serotonin Syndrome 2006', 'Tramadol FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    // ─────────────────────────────────────────────
    // DEXTROMETHORPHAN + SEDATING combos
    // (additive CNS depression beyond what's already documented)
    // ─────────────────────────────────────────────
    {
      drugs: ['dextromethorphan', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — dextromethorphan and alcohol both depress the central nervous system, with risk of excessive sedation, impaired coordination, and at higher doses, respiratory depression. The FDA explicitly warns against this on dextromethorphan labels.',
      mechanism: 'Dextromethorphan has CNS depressant effects in addition to its cough-suppressant action. Alcohol depresses the CNS through GABA enhancement and glutamate inhibition. Combined: amplified sedation, impaired judgment, slowed reflexes, and at higher doses, dangerous breathing suppression — especially with extended-release dextromethorphan products.',
      safeLimits: 'Do not drink alcohol while using cough syrups or cold medications containing dextromethorphan. Most cold/flu products warn against this on the label for good reason. If you\'re drinking and need cough relief, use non-drug options: honey, humidifier, warm tea with lemon, throat lozenges.',
      populations: {
        children: 'Neither appropriate for anyone under 21 in combination.',
        elderly: 'Higher risk of falls and confusion — combination should be avoided.',
        pregnancy: 'Alcohol should be avoided in pregnancy regardless.',
      },
      sources: ['FDA OTC Labeling — Dextromethorphan', 'Lexi-Interact 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },

    {
      drugs: ['dextromethorphan', 'alprazolam'],
      status: 'avoid',
      summary: 'Do not combine — both are CNS depressants, and dextromethorphan also has serotonergic activity. Combined use can cause significant sedation, impaired coordination, and at higher dextromethorphan doses, respiratory depression.',
      mechanism: 'Alprazolam enhances GABA inhibitory signaling, slowing the CNS. Dextromethorphan has CNS depressant properties plus serotonergic activity. Combined: amplified sedation that\'s harder to predict than either alone, plus the cognitive effects of dextromethorphan (which can include dissociation at high doses) layered on top of alprazolam\'s anxiolytic effects.',
      safeLimits: 'Avoid combination. If alprazolam is prescribed, choose non-dextromethorphan cough relief: honey (over 1 year), humidifier, throat lozenges, or guaifenesin alone. Many "PM" cold medications contain dextromethorphan PLUS diphenhydramine — both are problems with alprazolam.',
      populations: {
        children: 'Pediatric alprazolam use is not appropriate.',
        elderly: 'High risk — both drugs are problematic in older adults (Beers Criteria).',
        pregnancy: 'Both should be avoided.',
      },
      sources: ['FDA OTC Labeling — Dextromethorphan', 'Lexi-Interact 2024', 'Beers Criteria 2023'],
    },

    // ─────────────────────────────────────────────
    // MECLIZINE pairs (motion sickness antihistamine)
    // ─────────────────────────────────────────────
    {
      drugs: ['meclizine', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — meclizine causes significant drowsiness on its own, and alcohol amplifies this dramatically. Combined use causes impaired coordination, confusion, and serious accident risk.',
      mechanism: 'Meclizine is a first-generation antihistamine with strong CNS-depressant and anticholinergic effects. Alcohol depresses the CNS through GABA enhancement. Combined: amplified sedation, dizziness on standing, slowed reaction time, and impaired judgment — particularly dangerous when used for motion sickness on a cruise or flight where alcohol is often available.',
      safeLimits: 'Do not drink alcohol while using meclizine for motion sickness. If you\'re drinking on a trip and develop motion sickness, choose ginger (capsules, tea, or candied ginger) instead — it\'s effective and non-sedating. Acupressure wristbands are another alcohol-compatible option.',
      populations: {
        children: 'Meclizine not under 12.',
        elderly: 'High risk for falls — both meclizine and alcohol are problematic in older adults.',
        pregnancy: 'Both should be avoided in pregnancy.',
      },
      sources: ['Beers Criteria 2023', 'Lexi-Interact 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },

    {
      drugs: ['meclizine', 'diphenhydramine'],
      status: 'avoid',
      summary: 'Do not combine — both are first-generation antihistamines with strong sedation and anticholinergic effects. Combining offers no added benefit and significantly raises risk of confusion, urinary retention, and falls (especially in elderly).',
      mechanism: 'Both block H1 histamine receptors (sedation) AND muscarinic acetylcholine receptors (anticholinergic effects: confusion, dry mouth, blurred vision, urinary retention). Combined: doubled anticholinergic burden that has been documented to raise dementia risk with chronic use, plus stacked sedation.',
      safeLimits: 'Never combine. Choose ONE first-generation antihistamine if needed. For motion sickness on top of allergies, talk to a pharmacist about second-generation antihistamines (loratadine, cetirizine) for the allergies AND keep meclizine for motion sickness — but only one at a time.',
      populations: {
        children: 'Meclizine not under 12. Diphenhydramine should be avoided for sleep in children.',
        elderly: 'Highest risk — both are on Beers Criteria as inappropriate. Strong recommendation against combination.',
        pregnancy: 'Both should be discussed with OB; safer alternatives exist.',
      },
      sources: ['Beers Criteria 2023', 'Lexi-Interact 2024', 'Gray SL et al. JAMA Intern Med 2015 (anticholinergic burden / dementia)'],
    },
    // ─────────────────────────────────────────────
    // ANTIBIOTIC ABSORPTION pairs
    // (mineral chelation reduces antibiotic effectiveness)
    // ─────────────────────────────────────────────
    {
      drugs: ['ciprofloxacin', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Calcium binds to ciprofloxacin in the gut and significantly reduces its absorption. This is a timing problem, not a "do not combine" problem — separating them by a few hours prevents the issue.',
      mechanism: 'Ciprofloxacin (and other fluoroquinolone antibiotics) contains chemical groups that chelate (bind tightly to) divalent and trivalent metal cations like calcium, magnesium, iron, and aluminum. The chelated complex cannot cross the intestinal wall, so antibiotic absorption drops dramatically — sometimes by 50% or more.',
      safeLimits: 'Take ciprofloxacin at least 2 hours BEFORE or 6 hours AFTER any calcium supplement, calcium-containing antacid (Tums, Rolaids), or dairy product. This applies to milk, yogurt, cheese, fortified juices, AND calcium pills. The whole point of the antibiotic is to fight infection — let it absorb properly.',
      populations: {
        children: 'Ciprofloxacin pediatric use is specialist-directed; same timing rules apply.',
        elderly: 'Common combination — many older adults take calcium supplements daily. Strict timing separation is essential.',
        pregnancy: 'Ciprofloxacin generally avoided in pregnancy unless necessary; timing rules still apply if used.',
      },
      sources: ['Cipro (ciprofloxacin) FDA Prescribing Information', 'Lexi-Interact 2024', 'Lomaestro BM, Bailie GR. Drug Saf 1995'],
    },

    {
      drugs: ['ciprofloxacin', 'iron'],
      status: 'caution',
      summary: 'Iron supplements bind to ciprofloxacin and significantly reduce its absorption. Timing them apart by several hours prevents the antibiotic from being wasted.',
      mechanism: 'Ciprofloxacin chelates iron in the gut, forming an insoluble complex that cannot be absorbed. The effect is dramatic — up to 50% reduction in antibiotic blood levels when taken together. This can mean treatment failure for serious infections.',
      safeLimits: 'Take ciprofloxacin at least 2 hours BEFORE or 6 hours AFTER iron supplements. If iron is for anemia and ciprofloxacin is for an active infection, prioritize the antibiotic timing — finish the course first, or carefully space the two throughout the day with prescriber guidance.',
      populations: {
        children: 'Ciprofloxacin pediatric use is specialist-directed.',
        elderly: 'Iron deficiency anemia is common; strict timing matters for both treatments to work.',
        pregnancy: 'Ciprofloxacin generally avoided in pregnancy. Iron commonly used.',
      },
      sources: ['Cipro (ciprofloxacin) FDA Prescribing Information', 'Lexi-Interact 2024', 'Polk RE et al. Antimicrob Agents Chemother 1989'],
    },

    {
      drugs: ['ciprofloxacin', 'magnesium'],
      status: 'caution',
      summary: 'Magnesium binds to ciprofloxacin and significantly reduces its absorption. Same timing-fix solution as calcium and iron.',
      mechanism: 'Ciprofloxacin chelates magnesium in the gut, forming a non-absorbable complex. Magnesium-containing antacids (Mylanta, Maalox) and supplements can reduce ciprofloxacin absorption by 30–50%, potentially leading to treatment failure.',
      safeLimits: 'Take ciprofloxacin at least 2 hours BEFORE or 6 hours AFTER magnesium supplements or magnesium-containing antacids. If using magnesium for sleep (a common pairing), take it at bedtime and ciprofloxacin in the morning — natural spacing.',
      populations: {
        children: 'Ciprofloxacin pediatric use specialist-directed.',
        elderly: 'Common combination — timing matters.',
        pregnancy: 'Ciprofloxacin generally avoided. Magnesium commonly used.',
      },
      sources: ['Cipro (ciprofloxacin) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['doxycycline', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Calcium significantly reduces doxycycline absorption through mineral chelation. Dairy products and calcium-containing antacids both cause this — though doxycycline is more dairy-tolerant than older tetracyclines.',
      mechanism: 'Doxycycline (a tetracycline antibiotic) chelates calcium in the gut, forming an insoluble complex that cannot be absorbed. The effect is less severe than with older tetracyclines (which prohibited dairy entirely) but still meaningful — absorption can drop 20–30% with co-administration.',
      safeLimits: 'Take doxycycline at least 1–2 hours BEFORE or 2 hours AFTER calcium-containing antacids (Tums, Rolaids). Modest dairy with doxycycline is generally OK, but heavy dairy meals or calcium supplements right at dose time should be avoided. Take with food (non-dairy) to reduce stomach upset.',
      populations: {
        children: 'Doxycycline use under 8 years requires specialist judgment due to tooth staining concerns.',
        elderly: 'Common combination — timing flexibility helps both treatments work.',
        pregnancy: 'Doxycycline generally avoided in pregnancy (fetal tooth/bone effects).',
      },
      sources: ['Doxycycline FDA Prescribing Information', 'Lexi-Interact 2024', 'Neuvonen PJ et al. Br Med J 1970 (classic tetracycline studies)'],
    },

    {
      drugs: ['doxycycline', 'iron'],
      status: 'caution',
      summary: 'Iron supplements significantly reduce doxycycline absorption. Timing them apart by 2–3 hours prevents the antibiotic from being wasted.',
      mechanism: 'Doxycycline chelates iron in the gut, forming a non-absorbable complex. Iron supplements can reduce doxycycline absorption by 50–80% when taken simultaneously — a dramatic effect that can lead to treatment failure.',
      safeLimits: 'Take doxycycline at least 2 hours BEFORE or 3 hours AFTER iron supplements. If both are needed daily, a common schedule is: doxycycline at breakfast, iron at lunch (with vitamin C for better iron absorption).',
      populations: {
        children: 'Doxycycline use under 8 requires specialist judgment.',
        elderly: 'Iron deficiency anemia is common — careful timing keeps both treatments effective.',
        pregnancy: 'Doxycycline avoided in pregnancy. Iron commonly used.',
      },
      sources: ['Doxycycline FDA Prescribing Information', 'Lexi-Interact 2024', 'Neuvonen PJ et al. Br Med J 1970'],
    },

    {
      drugs: ['doxycycline', 'magnesium'],
      status: 'caution',
      summary: 'Magnesium binds to doxycycline and reduces its absorption through the same chelation mechanism as calcium and iron.',
      mechanism: 'Doxycycline chelates magnesium in the gut. Magnesium-containing antacids (Mylanta, Maalox, Milk of Magnesia) and supplements can significantly reduce doxycycline absorption — up to 50% with simultaneous dosing.',
      safeLimits: 'Take doxycycline at least 2 hours BEFORE or 3 hours AFTER magnesium supplements or magnesium-containing antacids. If using magnesium at bedtime for sleep, take doxycycline in the morning with a non-dairy breakfast — natural separation.',
      populations: {
        children: 'Doxycycline use under 8 specialist-directed.',
        elderly: 'Common combination — timing matters for treatment success.',
        pregnancy: 'Doxycycline avoided in pregnancy.',
      },
      sources: ['Doxycycline FDA Prescribing Information', 'Lexi-Interact 2024'],
    },
    // ─────────────────────────────────────────────
    // BUPROPION pairs
    // (seizure threshold + sympathomimetic interactions)
    // ─────────────────────────────────────────────
    {
      drugs: ['bupropion', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — bupropion lowers seizure threshold, and alcohol withdrawal can trigger seizures even in light drinkers. The FDA explicitly warns against this combination on bupropion labels. Heavy use or sudden alcohol cessation while on bupropion has caused fatal seizures.',
      mechanism: 'Bupropion blocks norepinephrine and dopamine reuptake AND lowers the seizure threshold in a dose-dependent way. Alcohol enhances GABA inhibition while active, but during withdrawal, the rebound glutamate activity can trigger seizures — especially with bupropion already lowering the seizure barrier. The interaction is asymmetric: light drinking is risky, and abrupt stopping after regular drinking is dangerous.',
      safeLimits: 'The safest path is to not drink alcohol while on bupropion. If alcohol is part of your life, talk to your prescriber BEFORE starting bupropion — they may choose a different antidepressant. Never stop heavy drinking abruptly while on bupropion — medical supervision is required. Watch for tremors, confusion, or "auras" that can precede seizures.',
      populations: {
        children: 'Bupropion pediatric use is specialist-directed.',
        elderly: 'Higher seizure risk and falls — combination should be strictly avoided.',
        pregnancy: 'Bupropion use individualized in pregnancy. Alcohol should be avoided regardless.',
      },
      sources: ['Wellbutrin (bupropion) FDA Prescribing Information', 'FDA Drug Safety Communication — Bupropion Seizure Risk', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['bupropion', 'tramadol'],
      status: 'avoid',
      summary: 'Do not combine — both medications independently lower seizure threshold, and the combined risk is documented in case reports of unprovoked seizures. Tramadol\'s serotonergic activity adds further concern.',
      mechanism: 'Bupropion lowers seizure threshold in a dose-dependent way (about 0.1% incidence at standard doses; higher at supratherapeutic doses). Tramadol also lowers seizure threshold AND inhibits serotonin/norepinephrine reuptake. Combined: additive seizure risk that has been observed in case reports, with seizures occurring at therapeutic doses of both drugs.',
      safeLimits: 'Avoid combination. If pain relief is needed for someone on bupropion, alternative options include: acetaminophen, topical NSAIDs, or non-tramadol opioids if needed. If tramadol has been prescribed and bupropion is being considered, a different antidepressant should be discussed.',
      populations: {
        children: 'Tramadol contraindicated under 12. Bupropion pediatric use specialist-directed.',
        elderly: 'Higher seizure risk in older adults — strict avoidance.',
        pregnancy: 'Both should be discussed with prescriber; combination not recommended.',
      },
      sources: ['Wellbutrin (bupropion) FDA Prescribing Information', 'Tramadol FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['bupropion', 'pseudoephedrine'],
      status: 'avoid',
      summary: 'Do not combine — pseudoephedrine raises blood pressure, and bupropion can amplify this through its norepinephrine effects. Combined use has caused hypertensive episodes and is associated with increased seizure risk.',
      mechanism: 'Bupropion blocks norepinephrine and dopamine reuptake. Pseudoephedrine is a sympathomimetic that directly stimulates alpha- and beta-adrenergic receptors. Combined: amplified norepinephrine activity that raises blood pressure, heart rate, and risk of arrhythmias. The norepinephrine surge may also contribute to seizure risk.',
      safeLimits: 'Avoid pseudoephedrine if on bupropion. For nasal congestion, choose: saline rinses, steam inhalation, short-term oxymetazoline nasal spray (max 3 days), or second-generation antihistamines (loratadine, cetirizine) for allergy-related congestion. Phenylephrine has similar concerns and should also be avoided.',
      populations: {
        children: 'Bupropion pediatric use specialist-directed.',
        elderly: 'High cardiovascular risk — strict avoidance.',
        pregnancy: 'Pseudoephedrine generally avoided in first trimester. Bupropion use individualized.',
      },
      sources: ['Wellbutrin (bupropion) FDA Prescribing Information', 'Sudafed (pseudoephedrine) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['bupropion', 'caffeine'],
      status: 'caution',
      summary: 'Both stimulate the central nervous system and can amplify each other\'s side effects — jitteriness, insomnia, anxiety, rapid heartbeat. At high caffeine doses, the combination may also raise seizure risk in susceptible people.',
      mechanism: 'Bupropion blocks norepinephrine and dopamine reuptake, producing alerting and activating effects. Caffeine blocks adenosine receptors and increases sympathetic activity. Combined: additive stimulation that\'s most noticeable in the first few weeks of bupropion treatment. Very high caffeine intake (over 600 mg/day) has been associated with seizure risk that bupropion can amplify.',
      safeLimits: 'In the first 2–4 weeks of bupropion, reduce caffeine to under 200 mg/day (1–2 cups of coffee) and avoid afternoon caffeine — bupropion can cause insomnia on its own and caffeine compounds it. Once stable on bupropion, moderate caffeine (under 400 mg/day) is usually fine. Avoid energy drinks — their high caffeine doses (200–300 mg per can) carry real seizure risk on bupropion.',
      populations: {
        children: 'Caffeine not recommended in children. Bupropion pediatric use specialist-directed.',
        elderly: 'Higher cardiovascular sensitivity and seizure risk — keep caffeine modest.',
        pregnancy: 'Caffeine limited to 200 mg/day in pregnancy. Bupropion use individualized.',
      },
      sources: ['Wellbutrin (bupropion) FDA Prescribing Information', 'Lexi-Interact 2024', 'NIH NCCIH — Caffeine 2024'],
    },
    // ─────────────────────────────────────────────
    // SAFE NATURAL pairs
    // (commonly stacked herbs/supps with no adverse interactions)
    // ─────────────────────────────────────────────
    {
      drugs: ['chamomile', 'lemonBalm'],
      status: 'safe',
      summary: 'Safe and complementary combination — chamomile and lemon balm are commonly paired for anxiety, mild stress, and sleep support. Both have gentle calming effects without significant sedation.',
      mechanism: 'Chamomile (apigenin) binds GABA-A benzodiazepine receptors weakly, producing mild anxiolytic effects. Lemon balm (rosmarinic acid) inhibits GABA transaminase and modulates acetylcholine. Different mechanisms producing complementary calming effects without strong sedation.',
      safeLimits: 'Standard tea or supplement doses of both are safe. Chamomile 220–1,500 mg + lemon balm 300–600 mg per day. Commonly combined as bedtime tea blends or stress-support capsules. No driving restrictions at standard doses.',
      populations: {
        children: 'Both gentle and considered safe for kids over 2 at age-appropriate tea amounts. Always consult a pediatrician for chronic use.',
        elderly: 'Well-tolerated. Both are gentler than valerian or melatonin for sleep support.',
        pregnancy: 'Chamomile tea generally safe in moderation. Lemon balm: limited data — consult OB.',
      },
      sources: ['NIH NCCIH — Chamomile 2024', 'NIH NCCIH — Lemon Balm 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['ashwagandha', 'magnesium'],
      status: 'safe',
      summary: 'Safe and complementary — ashwagandha addresses stress through HPA axis modulation while magnesium supports nervous system relaxation. Commonly stacked in evening "wind-down" routines.',
      mechanism: 'Ashwagandha (withanolides) reduces cortisol and modulates the hypothalamic-pituitary-adrenal stress axis. Magnesium regulates NMDA receptors and supports GABA signaling, reducing nervous system excitability. Different mechanisms with complementary calming effects.',
      safeLimits: 'Standard doses are safe together: ashwagandha 300–600 mg + magnesium glycinate 200–400 mg, typically taken in the evening. Magnesium citrate forms can cause loose stools at higher doses — start at 200 mg if new to it.',
      populations: {
        children: 'Ashwagandha not under 12. Magnesium dosed by age.',
        elderly: 'Well-tolerated. Both often deficient in older adults; supplementation may benefit sleep and stress.',
        pregnancy: 'Ashwagandha not recommended in pregnancy. Magnesium is safe at standard doses.',
      },
      sources: ['NIH NCCIH — Ashwagandha 2024', 'NIH ODS — Magnesium 2024', 'Chandrasekhar K et al. Indian J Psychol Med 2012'],
    },

    {
      drugs: ['ginger', 'peppermintOil'],
      status: 'safe',
      summary: 'Safe and well-studied combination for nausea and digestive upset. Both target stomach motility and irritation through different mechanisms, giving complementary relief.',
      mechanism: 'Ginger (gingerols, shogaols) blocks 5-HT3 and NK1 receptors involved in nausea signaling and improves gastric motility. Peppermint oil (menthol) relaxes intestinal smooth muscle and reduces visceral hypersensitivity. Combined: faster relief for nausea, bloating, and stomach cramping than either alone.',
      safeLimits: 'Ginger 250–1,000 mg (tea, capsule, or candied) plus peppermint oil at appropriate dose: enteric-coated 0.2–0.4 mL capsule for IBS, or 1–2 drops in tea for nausea. Avoid peppermint oil with severe acid reflux (can relax lower esophageal sphincter).',
      populations: {
        children: 'Ginger safe over 2 at tea amounts. Peppermint oil ingestion not for infants; tea acceptable over 6.',
        elderly: 'Well-tolerated. Peppermint oil capsules helpful for IBS-related discomfort.',
        pregnancy: 'Ginger safe up to 4 g/day for nausea. Peppermint tea generally safe; concentrated peppermint oil should be discussed with OB.',
      },
      sources: ['NIH NCCIH — Ginger 2024', 'NIH NCCIH — Peppermint Oil 2024', 'Worwood VA: The Complete Book of Essential Oils and Aromatherapy 2016'],
    },

    {
      drugs: ['passionflower', 'magnesium'],
      status: 'safe',
      summary: 'Safe combination for anxiety and sleep support — passionflower and magnesium work through different pathways with complementary calming effects.',
      mechanism: 'Passionflower (chrysin and other flavonoids) modulates GABA-A receptors, producing mild anxiolytic effects without strong sedation. Magnesium regulates NMDA receptors and GABA signaling, calming nervous system excitability. Different mechanisms with no adverse interaction.',
      safeLimits: 'Passionflower 300–500 mg + magnesium glycinate 200–400 mg, typically taken 30–60 minutes before bedtime. Both well-tolerated at standard doses. Avoid driving after if combining with any sedative.',
      populations: {
        children: 'Passionflower limited data under 6. Magnesium dosed by age.',
        elderly: 'Well-tolerated; gentler than benzodiazepines or diphenhydramine for sleep.',
        pregnancy: 'Passionflower not recommended in pregnancy. Magnesium safe at standard doses.',
      },
      sources: ['NIH NCCIH — Passionflower 2024', 'NIH ODS — Magnesium 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['vitaminC', 'zinc'],
      status: 'safe',
      summary: 'Classic immune-support combination — vitamin C and zinc are commonly paired for cold/flu prevention and shortening duration. Well-studied with no adverse interaction.',
      mechanism: 'Vitamin C supports immune cell function (lymphocyte activity, neutrophil migration) and is a key antioxidant. Zinc is essential for over 300 enzymatic reactions, including those involved in immune response and viral replication interference. Complementary nutrients with no pharmacokinetic interaction.',
      safeLimits: 'Standard supplemental doses: Vitamin C 500–1,000 mg/day + Zinc 15–30 mg/day. For acute illness, short-term higher doses (Vitamin C up to 2,000 mg, Zinc lozenges every 2 hours for 3 days) are commonly used. Take zinc with food to prevent nausea.',
      populations: {
        children: 'Both safe at age-appropriate doses. Zinc max 5–9 mg/day for kids depending on age.',
        elderly: 'Beneficial combination; older adults often have suboptimal zinc status.',
        pregnancy: 'Both important; standard prenatal doses include zinc and vitamin C.',
      },
      sources: ['NIH ODS — Vitamin C 2024', 'NIH ODS — Zinc 2024', 'Cochrane Review: Zinc for the common cold 2024'],
    },

    {
      drugs: ['chamomile', 'magnesium'],
      status: 'safe',
      summary: 'Safe and complementary combination for evening relaxation and sleep support — gentle enough for nightly use, with no significant sedation.',
      mechanism: 'Chamomile (apigenin) provides mild GABA-A modulation and anxiolytic effects. Magnesium supports NMDA receptor regulation and reduces nervous system excitability. Different mechanisms producing complementary calming effects without dependence concerns.',
      safeLimits: 'Standard combination: 1–2 cups chamomile tea (or 220–500 mg capsule) + magnesium glycinate 200–400 mg, taken 30–60 minutes before bedtime. Both well-tolerated long-term and considered safer than melatonin for nightly use in most adults.',
      populations: {
        children: 'Chamomile tea generally safe over 2 at modest amounts. Magnesium dosed by age.',
        elderly: 'Excellent option for sleep support — gentler than diphenhydramine or melatonin.',
        pregnancy: 'Chamomile tea in moderation is generally safe. Magnesium safe at standard doses.',
      },
      sources: ['NIH NCCIH — Chamomile 2024', 'NIH ODS — Magnesium 2024', 'Srivastava JK et al. Mol Med Reports 2010'],
    },
    // ─────────────────────────────────────────────
    // DIABETES MED + ALCOHOL pairs
    // (hypoglycemia + medication-specific risks)
    // ─────────────────────────────────────────────
    {
      drugs: ['metformin', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine heavily — metformin and alcohol both stress the liver and can trigger lactic acidosis, a rare but potentially fatal condition. Occasional light drinking with food is generally manageable; binge drinking or chronic heavy use is dangerous.',
      mechanism: 'Metformin reduces hepatic glucose production and improves insulin sensitivity. It also slightly raises blood lactate levels. Alcohol impairs lactate clearance through the liver AND blocks gluconeogenesis (the process that normally raises blood sugar when it drops). Combined: lactate accumulates, blood sugar can crash unpredictably, and the liver is taxed twice — a perfect setup for lactic acidosis (symptoms: weakness, muscle pain, trouble breathing, abdominal pain, irregular heartbeat).',
      safeLimits: 'If you drink alcohol on metformin: limit to 1 drink/day for women, 2 for men. Never drink on an empty stomach. Avoid binge drinking entirely. Talk to your prescriber if you drink more than occasionally — kidney function should be checked yearly to assess lactic acidosis risk. Stop metformin and seek emergency care for: muscle cramps, unusual tiredness, trouble breathing, irregular heartbeat.',
      populations: {
        children: 'Pediatric metformin use is specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Higher lactic acidosis risk due to reduced kidney clearance. Strict moderation or avoidance.',
        pregnancy: 'Metformin sometimes used in pregnancy. Alcohol should be avoided in pregnancy.',
      },
      sources: ['Glucophage (metformin) FDA Prescribing Information', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['semaglutide', 'alcohol'],
      status: 'caution',
      summary: 'Combining can amplify nausea, vomiting, and hypoglycemia risk. Semaglutide already slows stomach emptying significantly — alcohol on top often causes severe nausea and unpredictable blood sugar drops.',
      mechanism: 'Semaglutide (Ozempic, Wegovy) is a GLP-1 agonist that slows gastric emptying, increases insulin secretion when blood sugar is high, and reduces appetite. Alcohol impairs gluconeogenesis (blunting the body\'s ability to correct low blood sugar) AND irritates the stomach. Combined: severe nausea is common, and hypoglycemia risk rises — especially if semaglutide is used with other diabetes meds.',
      safeLimits: 'If you drink alcohol on semaglutide: limit to 1 drink/day with food, never on an empty stomach. Many users find their alcohol tolerance drops significantly on semaglutide — what felt like 2 drinks before may feel like 4. If using semaglutide for weight loss (not diabetes), alcohol\'s empty calories can also work against your goals. Check blood sugar before and after drinking if you have diabetes.',
      populations: {
        children: 'Semaglutide pediatric use specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Higher dehydration and hypoglycemia risk — strict moderation.',
        pregnancy: 'Semaglutide not recommended in pregnancy. Alcohol should be avoided.',
      },
      sources: ['Ozempic (semaglutide) FDA Prescribing Information', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['empagliflozin', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine heavily — empagliflozin causes fluid loss and lowers blood sugar, while alcohol adds further dehydration and blocks the liver\'s sugar-raising response. The combination raises risk of severe hypoglycemia, dehydration, and a dangerous condition called euglycemic ketoacidosis.',
      mechanism: 'Empagliflozin (Jardiance) blocks SGLT2 in the kidneys, causing glucose AND fluid loss through urine. It also shifts the body toward fat metabolism (raising ketone production). Alcohol is a diuretic, impairs gluconeogenesis, and also raises ketone production. Combined: amplified dehydration, blood sugar crashes, and elevated ketone levels — sometimes triggering euglycemic diabetic ketoacidosis even with "normal" blood sugar readings.',
      safeLimits: 'Limit alcohol strictly on empagliflozin — generally no more than 1 drink/day with food. Hydrate well throughout the day with water (not just alcohol). Avoid alcohol entirely when sick, during fasting, on low-carb diets, or in hot weather (all raise ketoacidosis risk on SGLT2 inhibitors). Seek emergency care for: persistent nausea, vomiting, abdominal pain, deep rapid breathing, fruity breath odor.',
      populations: {
        children: 'Empagliflozin pediatric use specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Higher dehydration and DKA risk — strict moderation or avoidance.',
        pregnancy: 'Empagliflozin generally avoided in pregnancy. Alcohol should be avoided.',
      },
      sources: ['Jardiance (empagliflozin) FDA Prescribing Information', 'FDA Drug Safety Communication — SGLT2 Inhibitors and Ketoacidosis 2015', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },

    {
      drugs: ['insulinLongActing', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine heavily — alcohol can cause severe, delayed hypoglycemia in insulin users, sometimes occurring hours after drinking and during sleep. Insulin-related hypoglycemia is the leading cause of diabetes emergency room visits, and alcohol significantly raises the risk.',
      mechanism: 'Long-acting insulin (Lantus, Tresiba, Levemir, Basaglar) provides 24-hour basal coverage to keep blood sugar steady. Alcohol blocks gluconeogenesis in the liver — the very process the body uses to raise low blood sugar overnight or between meals. Combined: insulin keeps pushing glucose down, the liver can\'t push it back up, and severe hypoglycemia can develop hours after drinking — often during sleep, when symptoms are missed.',
      safeLimits: 'If you drink on long-acting insulin: limit to 1 drink/day for women, 2 for men, with food (never on an empty stomach). Eat a carbohydrate-containing snack before bed if you drank that evening. Check blood sugar before bed AND set a 3 AM alarm to check again if you drank heavily. Wear medical ID. Inform anyone you live with about glucagon use for severe hypoglycemia. Avoid binge drinking entirely.',
      populations: {
        children: 'Pediatric insulin specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Hypoglycemia awareness often blunted in older adults — combination is particularly dangerous. Strict moderation.',
        pregnancy: 'Insulin use individualized in pregnancy. Alcohol should be avoided.',
      },
      sources: ['Lantus (insulin glargine) FDA Prescribing Information', 'ADA Standards of Care 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },

    {
      drugs: ['insulinRapidActing', 'alcohol'],
      status: 'avoid',
      summary: 'Do not combine — rapid-acting insulin plus alcohol can cause acute severe hypoglycemia within hours, especially if drinking on an empty stomach or after exercise. This is one of the most dangerous insulin-related combinations.',
      mechanism: 'Rapid-acting insulin (Humalog, Novolog, Apidra) drops blood sugar quickly to handle meal carbohydrates. Alcohol blocks the liver\'s gluconeogenesis response — meaning when blood sugar drops, the body can\'t self-correct. Combined: rapid blood sugar crashes that can progress to confusion, seizures, or loss of consciousness within hours of dosing. Risk is highest when alcohol is consumed on an empty stomach or shortly after exercise.',
      safeLimits: 'NEVER take rapid-acting insulin and drink without eating food at the same time. If you drink alcohol: eat carbohydrates with the drink, count carbs from BOTH the food and any sugar-containing mixers, and check blood sugar 1–2 hours after the meal/drink. Avoid drinking after exercise (exercise-induced hypoglycemia + insulin + alcohol = high risk). Keep glucose tablets or juice readily available.',
      populations: {
        children: 'Pediatric insulin specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Hypoglycemia symptoms often blunted; combination is particularly dangerous.',
        pregnancy: 'Insulin use individualized. Alcohol should be avoided.',
      },
      sources: ['Humalog (insulin lispro) FDA Prescribing Information', 'ADA Standards of Care 2024', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024'],
    },
    // ─────────────────────────────────────────────
    // STATIN (atorvastatin) interactions
    // (CYP3A4 metabolism + liver/muscle risk)
    // ─────────────────────────────────────────────
    {
      drugs: ['atorvastatin', 'grapefruit'],
      status: 'avoid',
      summary: 'Do not combine — grapefruit can raise atorvastatin blood levels 2–3 fold by blocking the enzyme that breaks it down, significantly increasing the risk of muscle damage (rhabdomyolysis) and liver injury. This is the textbook example of a food-drug interaction.',
      mechanism: 'Atorvastatin is metabolized primarily by CYP3A4, a liver and intestinal enzyme. Grapefruit (and grapefruit juice) contains furanocoumarins that irreversibly inhibit intestinal CYP3A4 — meaning more atorvastatin reaches the bloodstream than intended. The effect persists for 24–72 hours after consuming grapefruit, so timing separation does NOT solve the problem.',
      safeLimits: 'Avoid grapefruit and grapefruit juice entirely if taking atorvastatin. Even one 8 oz glass causes meaningful effect. Alternatives: oranges, tangerines, lemons, and most other citrus are SAFE — they don\'t contain furanocoumarins (except Seville oranges and pomelos, which DO and should also be avoided). For breakfast juice, stick to orange juice or apple juice.',
      populations: {
        children: 'Pediatric statin use is specialist-directed.',
        elderly: 'Highest risk for rhabdomyolysis on statins — strict grapefruit avoidance.',
        pregnancy: 'Atorvastatin contraindicated in pregnancy.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'Bailey DG et al. CMAJ 2013', 'FDA Drug Interaction Database 2024'],
    },

    {
      drugs: ['atorvastatin', 'azithromycin'],
      status: 'avoid',
      summary: 'Do not combine — azithromycin inhibits CYP3A4 and raises atorvastatin blood levels, significantly increasing the risk of muscle damage (rhabdomyolysis), liver injury, and dangerous heart rhythm changes (azithromycin already prolongs QT interval).',
      mechanism: 'Atorvastatin is broken down by CYP3A4. Azithromycin is a CYP3A4 inhibitor that slows this breakdown, raising atorvastatin levels. Additionally, both medications can prolong the QT interval on EKG — a marker of dangerous heart rhythm risk. Combined: amplified muscle and liver toxicity from statin accumulation PLUS heart rhythm concerns.',
      safeLimits: 'Avoid combination. Most prescribers hold the statin during a short azithromycin course (typically 5 days — the Z-Pak) and resume after. Tell every prescriber and pharmacist about your atorvastatin BEFORE starting any antibiotic. If you experience unexplained muscle pain, dark urine, or extreme fatigue while on this combination, stop both and seek medical care immediately — these can signal rhabdomyolysis.',
      populations: {
        children: 'Pediatric statin use specialist-directed.',
        elderly: 'Highest risk for both rhabdomyolysis and QT prolongation — strict avoidance.',
        pregnancy: 'Atorvastatin contraindicated in pregnancy.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'Zithromax (azithromycin) FDA Prescribing Information', 'Lexi-Interact 2024', 'Ray WA et al. N Engl J Med 2012 (azithromycin cardiovascular safety)'],
    },

    {
      drugs: ['atorvastatin', 'alcohol'],
      status: 'caution',
      summary: 'Both stress the liver — combined regular use can raise liver enzymes and increase the risk of clinically significant liver injury. Occasional light drinking is generally manageable; daily or heavy drinking warrants discussion with your prescriber.',
      mechanism: 'Atorvastatin is metabolized in the liver and can occasionally raise liver enzymes (ALT/AST) as a known side effect — usually mild and reversible. Alcohol also stresses liver metabolism through CYP2E1 induction and oxidative damage. Combined: additive hepatic burden, with a higher chance of clinically significant liver enzyme elevation that may require statin dose adjustment.',
      safeLimits: 'On atorvastatin: limit alcohol to no more than 1 drink/day for women, 2 for men, with food. Avoid binge drinking entirely. If you drink more than occasionally, mention it to your prescriber so liver enzymes can be monitored every 3–6 months. Watch for: yellowing of skin or eyes, dark urine, persistent fatigue, or right-upper-abdominal pain — these can signal liver problems.',
      populations: {
        children: 'Pediatric statin use specialist-directed. Alcohol not appropriate under 21.',
        elderly: 'Higher liver and muscle injury risk — keep alcohol very modest.',
        pregnancy: 'Atorvastatin contraindicated in pregnancy. Alcohol should be avoided in pregnancy.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'NIAAA — Harmful Interactions: Mixing Alcohol with Medicines 2024', 'LiverTox Database (NIH) 2024'],
    },

    {
      drugs: ['atorvastatin', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — St. John\'s Wort significantly REDUCES atorvastatin blood levels by speeding up its breakdown. The cholesterol-lowering protection drops, raising long-term cardiovascular risk. Equally important as bleeding-direction interactions, but easier to miss because there are no immediate symptoms.',
      mechanism: 'Atorvastatin is metabolized primarily by CYP3A4. St. John\'s Wort is a potent inducer of CYP3A4 — it ramps up the enzyme\'s activity, breaking down atorvastatin faster than normal. Result: lower atorvastatin blood levels, reduced LDL cholesterol lowering, and over months to years, an increased risk of cardiovascular events that the statin was meant to prevent.',
      safeLimits: 'Avoid combination. If St. John\'s Wort has been part of your routine, mention it to your statin prescriber — atorvastatin doses may need adjustment, or an alternative cholesterol approach may be considered. If you have been taking St. John\'s Wort, do not stop abruptly without medical input; both starting AND stopping it shifts atorvastatin levels and warrants a check-in.',
      populations: {
        children: 'St. John\'s Wort not under 12. Pediatric statin use specialist-directed.',
        elderly: 'High cardiovascular risk if statin protection drops — strict avoidance.',
        pregnancy: 'Atorvastatin contraindicated. St. John\'s Wort not recommended in pregnancy.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'NIH NCCIH — St. John\'s Wort 2024', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['apixaban', 'grapefruit'],
      status: 'caution',
      summary: 'Grapefruit raises apixaban blood levels by blocking the enzyme that breaks it down, potentially increasing bleeding risk. The effect is modest but real with regular grapefruit consumption.',
      mechanism: 'Apixaban is partially metabolized by CYP3A4 in the liver and intestine. Grapefruit\'s furanocoumarins inhibit intestinal CYP3A4, allowing more apixaban to reach the bloodstream. The increase is modest (around 20–30%) but consistent with regular grapefruit consumption — enough to meaningfully raise bleeding risk in some patients.',
      safeLimits: 'Limit or avoid grapefruit while on apixaban. If grapefruit is an important part of your diet, mention it to your prescriber so they can factor it in. A small portion 1–2 times per week is generally lower risk than daily consumption. Alternative citrus: oranges, tangerines, lemons are all safe.',
      populations: {
        children: 'Pediatric apixaban specialist-directed.',
        elderly: 'Higher bleeding risk — minimize grapefruit.',
        pregnancy: 'Apixaban not recommended in pregnancy.',
      },
      sources: ['Eliquis (apixaban) FDA Prescribing Information', 'Bailey DG et al. CMAJ 2013', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['atorvastatin', 'ciprofloxacin'],
      status: 'caution',
      summary: 'Ciprofloxacin mildly inhibits the enzyme that breaks down atorvastatin, potentially raising statin blood levels and increasing the risk of muscle and liver side effects. The effect is less severe than with macrolides like azithromycin, but still warrants caution.',
      mechanism: 'Atorvastatin is metabolized by CYP3A4. Ciprofloxacin is a mild CYP3A4 inhibitor — meaning it slows atorvastatin breakdown, raising blood levels modestly. Combined: increased risk of statin-related muscle pain (myalgia), muscle weakness, and rarely, rhabdomyolysis. Liver enzymes may also rise.',
      safeLimits: 'Generally safe for a short ciprofloxacin course (7–10 days) at standard atorvastatin doses. Watch for: muscle pain or weakness, dark urine, extreme fatigue. If symptoms appear, stop the statin and call your prescriber. For longer ciprofloxacin courses (over 2 weeks) or high statin doses (40–80 mg), discuss temporary statin pause with your prescriber.',
      populations: {
        children: 'Both specialist-directed in pediatrics.',
        elderly: 'Higher muscle injury risk — closer monitoring during ciprofloxacin course.',
        pregnancy: 'Atorvastatin contraindicated. Ciprofloxacin generally avoided unless necessary.',
      },
      sources: ['Lipitor (atorvastatin) FDA Prescribing Information', 'Cipro (ciprofloxacin) FDA Prescribing Information', 'Lexi-Interact 2024'],
    },
    // ─────────────────────────────────────────────
    // NATURAL + OTC pairs
    // (common stacking from supplements + drugstore)
    // ─────────────────────────────────────────────
    {
      drugs: ['turmeric', 'omeprazole'],
      status: 'safe',
      summary: 'Generally safe to combine — turmeric and omeprazole address inflammation and acid reflux through different mechanisms with no significant interaction. Commonly stacked for digestive complaints.',
      mechanism: 'Omeprazole is a proton pump inhibitor that reduces stomach acid by blocking the gastric acid pump. Turmeric (curcumin) reduces inflammation through NF-kB and COX-2 inhibition, with some evidence for protecting gastric mucosa. Different pathways with no adverse interaction; curcumin\'s poor oral bioavailability further limits any meaningful overlap.',
      safeLimits: 'Standard doses of both are safe: omeprazole 20 mg/day + turmeric 500–1,000 mg/day. For better curcumin absorption, take turmeric with black pepper (piperine) or fat — this doesn\'t change the omeprazole interaction. Long-term omeprazole use (over 1 year) requires periodic discussion with your prescriber regardless of supplements.',
      populations: {
        children: 'Both have age limits; not typically combined in pediatrics without physician guidance.',
        elderly: 'Common combination — generally well-tolerated. Monitor for any digestive changes.',
        pregnancy: 'Omeprazole generally considered low-risk. High-dose turmeric supplements not recommended in pregnancy (culinary amounts safe).',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH — Turmeric 2024', 'Prilosec (omeprazole) FDA Prescribing Information'],
    },

    {
      drugs: ['ginger', 'omeprazole'],
      status: 'safe',
      summary: 'Safe combination — ginger and omeprazole address nausea and acid reflux through different mechanisms with no adverse interaction. Often paired for nausea associated with reflux or motion sickness.',
      mechanism: 'Omeprazole blocks the gastric acid pump, reducing acid production. Ginger (gingerols, shogaols) acts on serotonin (5-HT3) receptors in the gut to reduce nausea and improves gastric motility. Different mechanisms; no pharmacokinetic interaction.',
      safeLimits: 'Standard doses are safe: omeprazole 20 mg/day + ginger 250–1,000 mg/day (or 1–2 cups ginger tea). Particularly useful combination for nausea associated with GERD or chemotherapy. Take both as directed; timing flexibility.',
      populations: {
        children: 'Ginger safe over 2 at tea amounts. Omeprazole pediatric use is physician-directed.',
        elderly: 'Well-tolerated combination.',
        pregnancy: 'Both used in pregnancy for nausea — ginger up to 4 g/day, omeprazole considered low-risk.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH — Ginger 2024', 'Prilosec (omeprazole) FDA Prescribing Information'],
    },

    {
      drugs: ['echinacea', 'acetaminophen'],
      status: 'safe',
      summary: 'Safe combination — commonly used together during colds and flu. Echinacea supports immune response while acetaminophen manages fever and aches. No adverse interaction.',
      mechanism: 'Echinacea modulates innate immune response (macrophage activity, cytokine release). Acetaminophen reduces fever and pain by affecting prostaglandin synthesis and central pain pathways. Different mechanisms; no pharmacokinetic interaction at standard doses.',
      safeLimits: 'Standard doses are safe together: echinacea 300–500 mg 3x/day (max 10 days continuous) + acetaminophen up to 4 g/day for adults (lower for children, by weight). Watch acetaminophen total daily intake from all sources, including hidden acetaminophen in cold/flu combination products.',
      populations: {
        children: 'Both safe at age-appropriate doses. Echinacea generally over 12; some pediatric formulations available with physician guidance.',
        elderly: 'Generally safe combination.',
        pregnancy: 'Acetaminophen preferred pain reliever in pregnancy. Echinacea: limited data — consult OB.',
      },
      sources: ['NIH NCCIH — Echinacea 2024', 'FDA OTC Monograph (acetaminophen)', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['slipperyElm', 'ibuprofen'],
      status: 'caution',
      summary: 'Slippery elm coats the GI tract and may slow ibuprofen absorption. Not dangerous — just less effective if taken simultaneously. Easy fix with timing separation.',
      mechanism: 'Slippery elm mucilage forms a protective coating over GI mucosa, soothing irritation and reflux. The coating also creates a physical barrier that can slow absorption of medications taken at the same time, reducing peak blood levels. Ibuprofen\'s pain relief depends on getting to peak blood concentrations.',
      safeLimits: 'Take ibuprofen at least 1–2 hours apart from slippery elm. A common schedule: slippery elm in the morning and at bedtime for GI soothing; ibuprofen with food at other times for pain. This timing also reduces ibuprofen\'s well-known stomach irritation risk — slippery elm\'s coating actually helps if used properly.',
      populations: {
        children: 'Slippery elm safe over 2. Ibuprofen safe over 6 months at weight-appropriate doses.',
        elderly: 'Useful pairing if separated by time — slippery elm protects against NSAID stomach irritation.',
        pregnancy: 'Slippery elm generally safe at standard tea/capsule doses. Ibuprofen avoided after 20 weeks.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH — Slippery Elm 2024'],
    },

    {
      drugs: ['milkThistle', 'acetaminophen'],
      status: 'safe',
      summary: 'Generally safe combination — milk thistle is taken for liver support, and some research suggests it may even protect against acetaminophen-related liver injury. Does NOT replace the standard acetaminophen daily limit.',
      mechanism: 'Acetaminophen is metabolized in the liver, with a small fraction converting to a toxic intermediate (NAPQI) that\'s normally neutralized by glutathione. Milk thistle (silymarin) has antioxidant and hepatoprotective properties — it supports glutathione synthesis and may reduce oxidative liver damage. Animal and limited human studies suggest milk thistle may protect against acetaminophen-related liver injury, though it should NEVER be relied on to "make safe" high acetaminophen doses.',
      safeLimits: 'Standard doses are safe together: acetaminophen up to 4 g/day for adults + milk thistle 140 mg 2–3x/day. Milk thistle does NOT change the daily acetaminophen safety limit — never exceed 4 g/day regardless of supplements. If you drink alcohol regularly, milk thistle is not a substitute for the standard "limit acetaminophen to 2 g/day with drinking" rule.',
      populations: {
        children: 'Milk thistle limited pediatric data. Acetaminophen weight-dosed in kids.',
        elderly: 'Generally well-tolerated. Lower acetaminophen ceiling (3 g/day) in older adults.',
        pregnancy: 'Milk thistle: limited data — consult OB. Acetaminophen is preferred pain reliever in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH — Milk Thistle 2024', 'LiverTox Database (NIH) 2024'],
    },
    // ─────────────────────────────────────────────
    // BIRTH CONTROL pairs
    // (hormonal contraceptive interactions)
    // ─────────────────────────────────────────────
    {
      drugs: ['birthControlCombined', 'stJohnsWort'],
      status: 'avoid',
      summary: 'Do not combine — St. John\'s Wort significantly REDUCES birth control effectiveness through liver enzyme induction. Documented cases of unplanned pregnancies have occurred with this combination. Many women don\'t realize the herb they\'re taking for mood is undermining their contraception.',
      mechanism: 'Combined oral contraceptives rely on consistent blood levels of estrogen and progestin to suppress ovulation. St. John\'s Wort is a potent inducer of CYP3A4 — it ramps up the liver enzymes that metabolize both hormones, dropping their blood levels and reducing contraceptive effectiveness. The effect persists for weeks after stopping St. John\'s Wort.',
      safeLimits: 'Avoid combination. If you rely on birth control pills for contraception, do not start St. John\'s Wort without first switching to a different mood-support option (or a different contraceptive method, like an IUD, which is not affected by CYP3A4 induction). If you have been taking St. John\'s Wort, use backup contraception (condoms) for at least 4 weeks after stopping. Mention St. John\'s Wort to your prescriber at every visit.',
      populations: {
        children: 'St. John\'s Wort not under 12.',
        elderly: 'Not applicable to typical use case.',
        pregnancy: 'St. John\'s Wort not recommended in pregnancy.',
      },
      sources: ['NIH NCCIH — St. John\'s Wort 2024', 'FDA Combined Hormonal Contraceptive Labeling', 'Pfrunder A et al. Br J Clin Pharmacol 2003', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['birthControlCombined', 'amoxicillin'],
      status: 'caution',
      summary: 'The traditional warning that "antibiotics reduce birth control effectiveness" is mostly outdated science. For penicillins like amoxicillin, modern evidence shows no meaningful interaction at typical doses. However, GI upset from antibiotics can affect absorption of the pill, and that\'s a real concern.',
      mechanism: 'For decades, women were told antibiotics broadly reduce birth control effectiveness. Modern research has narrowed this down: only rifampin (a TB drug) and rifabutin definitively reduce combined oral contraceptive effectiveness through CYP3A4 induction. Amoxicillin and other penicillins do NOT induce CYP3A4 meaningfully. The real risk: antibiotic-related vomiting or severe diarrhea can reduce pill absorption, just like any GI illness would.',
      safeLimits: 'Continue your birth control pill as scheduled during the amoxicillin course. If you vomit within 2 hours of taking your pill, OR have severe diarrhea (more than 6 watery stools/day) for more than 24 hours, treat that day as a missed pill and use backup contraception (condoms) for 7 days. Otherwise, no special precautions needed.',
      populations: {
        children: 'Pediatric oral contraceptive use is specialist-directed.',
        elderly: 'Not applicable to typical use case.',
        pregnancy: 'Birth control pills are not used in pregnancy.',
      },
      sources: ['ACOG Practice Bulletin — Contraception 2023', 'CDC US Medical Eligibility Criteria for Contraceptive Use 2016', 'Archer DF, Archer JS. Contraception 2002', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['birthControlCombined', 'doxycycline'],
      status: 'caution',
      summary: 'Like other non-rifampin antibiotics, doxycycline does NOT significantly reduce birth control effectiveness through metabolism. The real risk is severe GI side effects (vomiting, diarrhea) that can affect pill absorption.',
      mechanism: 'Modern research has clearly shown that doxycycline and other tetracyclines do NOT induce CYP3A4 in a way that meaningfully reduces estrogen or progestin blood levels. The persistent "antibiotic warning" on contraceptive labels is regulatory caution, not evidence-based. The genuine concern: doxycycline frequently causes nausea, vomiting, and GI upset — and that DOES affect pill absorption like any GI illness.',
      safeLimits: 'Continue your birth control pill as scheduled during the doxycycline course. Take doxycycline with food to reduce nausea (separate from milk/calcium by 2 hours per the absorption rules). If you vomit within 2 hours of taking your pill, OR have severe diarrhea for over 24 hours, use backup contraception (condoms) for 7 days.',
      populations: {
        children: 'Doxycycline under 8 specialist-directed; pediatric birth control use specialist-directed.',
        elderly: 'Not applicable to typical use case.',
        pregnancy: 'Doxycycline avoided in pregnancy. Birth control pills not used in pregnancy.',
      },
      sources: ['ACOG Practice Bulletin — Contraception 2023', 'CDC US Medical Eligibility Criteria for Contraceptive Use 2016', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['birthControlCombined', 'alcohol'],
      status: 'caution',
      summary: 'No direct pharmacological interaction — alcohol doesn\'t reduce birth control effectiveness on its own. The real concern: heavy drinking can lead to missed pills and increased risk-taking behavior, both of which affect contraception in practice.',
      mechanism: 'Alcohol and combined oral contraceptives are metabolized by different liver pathways with no significant overlap. Birth control pill blood levels are not meaningfully affected by alcohol consumption at typical drinking patterns. The indirect concerns: forgetting to take the pill while drinking, vomiting from heavy drinking (which can affect absorption if within 2 hours of dosing), and impaired judgment about other contraceptive precautions (condom use, partner choice).',
      safeLimits: 'No interaction-based limit needed. Standard alcohol moderation rules apply: 1 drink/day for women is the published low-risk limit. Set a daily alarm for your pill so it doesn\'t depend on remembering during evenings out. If you vomit within 2 hours of taking your pill (from drinking or any cause), treat that day as a missed pill and use backup contraception for 7 days.',
      populations: {
        children: 'Alcohol not appropriate under 21.',
        elderly: 'Not applicable to typical use case.',
        pregnancy: 'Alcohol should be avoided in pregnancy. Birth control not used in pregnancy.',
      },
      sources: ['ACOG Practice Bulletin — Contraception 2023', 'NIAAA — Women and Alcohol 2024', 'Lexi-Interact 2024'],
    },
    // ─────────────────────────────────────────────
    // COMMON SAFE & USEFUL CAUTION pairs
    // (everyday combinations users actually search)
    // ─────────────────────────────────────────────
    {
      drugs: ['acetaminophen', 'magnesium'],
      status: 'safe',
      summary: 'Safe combination — acetaminophen and magnesium have completely different mechanisms and no pharmacokinetic interaction. Commonly stacked for nighttime pain relief plus sleep support.',
      mechanism: 'Acetaminophen acts centrally to reduce pain and fever through prostaglandin pathways. Magnesium acts at NMDA receptors, supports GABA signaling, and helps with muscle relaxation. Different pathways, different targets — no interaction.',
      safeLimits: 'Standard doses are safe together: acetaminophen up to 4 g/day adults (lower for kids, by weight) + magnesium glycinate 200–400 mg at bedtime. No timing restrictions. Magnesium may help if your pain is partly tension-related (headaches, muscle aches).',
      populations: {
        children: 'Both safe at age-appropriate doses.',
        elderly: 'Well-tolerated combination. Lower acetaminophen ceiling (3 g/day) in older adults.',
        pregnancy: 'Acetaminophen preferred pain reliever in pregnancy. Magnesium safe at standard doses.',
      },
      sources: ['FDA OTC Monograph (acetaminophen)', 'NIH ODS — Magnesium 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['ibuprofen', 'magnesium'],
      status: 'safe',
      summary: 'Safe combination — ibuprofen targets inflammation while magnesium supports muscle relaxation. Commonly stacked for menstrual cramps, muscle pain, and tension headaches.',
      mechanism: 'Ibuprofen blocks COX-1 and COX-2 enzymes, reducing inflammation and pain. Magnesium regulates calcium channels in muscle cells, supporting muscle relaxation, and modulates NMDA receptors. Different mechanisms with complementary benefits for muscle pain. No pharmacokinetic interaction.',
      safeLimits: 'Standard doses are safe: ibuprofen 200–400 mg every 6–8 hours (OTC max 1,200 mg/day) + magnesium glycinate 200–400 mg/day. Take ibuprofen with food to reduce stomach irritation. Particularly useful pairing for menstrual cramps — both target the muscle pain pathway differently.',
      populations: {
        children: 'Both safe at age-appropriate doses. Ibuprofen safe over 6 months, weight-dosed.',
        elderly: 'Ibuprofen use should be modest in older adults (GI/kidney concerns); magnesium well-tolerated.',
        pregnancy: 'Ibuprofen avoided after 20 weeks. Magnesium safe at standard doses.',
      },
      sources: ['FDA OTC Monograph (ibuprofen)', 'NIH ODS — Magnesium 2024', 'Natural Medicines Database 2024'],
    },

    {
      drugs: ['loratadine', 'acetaminophen'],
      status: 'safe',
      summary: 'Safe combination — loratadine for allergies and acetaminophen for headache or fever have no interaction and are commonly taken together during allergy season or when colds overlap with allergies.',
      mechanism: 'Loratadine blocks H1 histamine receptors (non-sedating) to reduce allergy symptoms. Acetaminophen acts centrally to reduce pain and fever. Different mechanisms, different targets, no pharmacokinetic interaction.',
      safeLimits: 'Standard doses are safe: loratadine 10 mg once daily + acetaminophen up to 4 g/day adults (lower for kids, by weight). No timing restrictions. Loratadine is the preferred antihistamine when combined with daytime tasks because it doesn\'t cause drowsiness.',
      populations: {
        children: 'Both safe at age-appropriate doses.',
        elderly: 'Well-tolerated combination. Loratadine is the preferred antihistamine in older adults (no anticholinergic concerns).',
        pregnancy: 'Loratadine is the preferred antihistamine in pregnancy. Acetaminophen is the preferred pain reliever.',
      },
      sources: ['FDA OTC Monograph (loratadine)', 'FDA OTC Monograph (acetaminophen)', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['cetirizine', 'acetaminophen'],
      status: 'safe',
      summary: 'Safe combination — cetirizine for allergies and acetaminophen for pain or fever have no interaction. Commonly taken together during cold and flu season or for overlapping symptoms.',
      mechanism: 'Cetirizine blocks H1 histamine receptors to reduce allergy symptoms (mildly sedating in some users). Acetaminophen acts centrally to reduce pain and fever. Different mechanisms, no pharmacokinetic interaction.',
      safeLimits: 'Standard doses are safe: cetirizine 10 mg once daily + acetaminophen up to 4 g/day adults (lower for kids, by weight). Take cetirizine in the evening if it makes you drowsy. Acetaminophen has no timing restrictions.',
      populations: {
        children: 'Both safe at age-appropriate doses. Cetirizine available for kids over 6 months.',
        elderly: 'Generally well-tolerated. Cetirizine has less anticholinergic burden than diphenhydramine and is a safer antihistamine choice in older adults.',
        pregnancy: 'Cetirizine has reasonable safety data in pregnancy. Acetaminophen is preferred pain reliever.',
      },
      sources: ['FDA OTC Monograph (cetirizine)', 'FDA OTC Monograph (acetaminophen)', 'Lexi-Interact 2024'],
    },

    {
      drugs: ['omeprazole', 'magnesium'],
      status: 'caution',
      summary: 'Long-term proton pump inhibitor use is the leading cause of clinically significant low magnesium in the US. If you\'ve been on omeprazole for over 1 year, you may benefit from magnesium supplementation — but check with your prescriber first, especially if you have kidney disease.',
      mechanism: 'Omeprazole reduces stomach acid, which is required to release magnesium from food and supplements for absorption in the intestine. Long-term PPI use (over 1 year) has been documented to cause hypomagnesemia (low blood magnesium) in 5–10% of users — sometimes severely. Symptoms: muscle cramps, weakness, irregular heartbeat, fatigue, mood changes.',
      safeLimits: 'If on long-term omeprazole, ask your prescriber to check your magnesium level annually (a simple blood test). Magnesium glycinate or magnesium citrate 200–400 mg/day can help maintain normal levels for most people. Avoid magnesium oxide (poorly absorbed). If you have kidney disease, do NOT supplement without medical supervision — magnesium can build up dangerously when kidneys can\'t clear it.',
      populations: {
        children: 'Long-term pediatric PPI use is physician-monitored; magnesium status checked routinely.',
        elderly: 'Higher risk — older adults often on long-term PPI use AND have reduced kidney function. Regular magnesium monitoring is especially important.',
        pregnancy: 'Magnesium safe at standard doses. Omeprazole considered low-risk in pregnancy.',
      },
      sources: ['FDA Drug Safety Communication — PPIs and Low Magnesium 2011', 'Prilosec (omeprazole) FDA Prescribing Information', 'NIH ODS — Magnesium 2024', 'Cheungpasitporn W et al. Ren Fail 2015'],
    },
  
    // ─────────────────────────────────────────────
    // DECONGESTANT pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['pseudoephedrine', 'phenylephrine'],
      status: 'avoid',
      summary: 'Do not combine two decongestants — risk of hypertension, palpitations, and cardiovascular events.',
      mechanism: 'Both are sympathomimetics that constrict blood vessels and increase heart rate/blood pressure through adrenergic agonism.',
      safeLimits: 'Choose one decongestant. Use for max 3–7 days without physician guidance.',
      populations: {
        children: 'Neither under 6. Choose one.',
        elderly: 'High cardiovascular risk — use only under physician guidance.',
        pregnancy: 'Both generally avoided in first trimester and with caution thereafter.',
      },
      sources: ['FDA OTC Monographs', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['pseudoephedrine', 'oxymetazoline'],
      status: 'caution',
      summary: 'Both raise blood pressure through sympathomimetic mechanisms — avoid combining.',
      mechanism: 'Additive alpha-adrenergic vasoconstriction, increasing risk of hypertension.',
      safeLimits: 'Use one at a time. Max 3 days for oxymetazoline nasal spray.',
      populations: {
        children: 'Choose one decongestant appropriate for age.',
        elderly: 'Cardiovascular risk — use only under physician guidance.',
        pregnancy: 'Use with extreme caution if at all.',
      },
      sources: ['Lexi-Interact 2024', 'FDA OTC Labeling'],
    },
  
    // ─────────────────────────────────────────────
    // SLEEP/SEDATION pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['melatonin', 'valerian'],
      status: 'caution',
      summary: 'Additive sedation — may cause excessive sleepiness; generally low risk at standard doses.',
      mechanism: 'Melatonin acts on MT1/MT2 receptors; valerian potentiates GABA. Different mechanisms but additive CNS depressant effects.',
      safeLimits: 'If combining, use lowest doses of each. Melatonin 0.5–1 mg + valerian 150–300 mg may be acceptable. Avoid driving afterward.',
      populations: {
        children: 'Valerian limited data under 3. Melatonin only after age 3. Consult pediatrician before combining.',
        elderly: 'Start at lowest doses; fall risk with excessive sedation.',
        pregnancy: 'Valerian not recommended in pregnancy. Melatonin data limited — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH'],
    },
  
    {
      drugs: ['melatonin', 'lTheanine'],
      status: 'safe',
      summary: 'Generally safe to combine for sleep support — different mechanisms with mild additive relaxing effects.',
      mechanism: 'Melatonin regulates circadian rhythm via MT1/MT2 receptors; L-theanine promotes relaxation by increasing alpha brain waves and GABA without causing sedation per se.',
      safeLimits: 'Melatonin 0.5–5 mg + L-theanine 100–200 mg 30–60 min before bed. Commonly used together without adverse interactions reported.',
      populations: {
        children: 'Consult a pediatrician before combining supplements for sleep.',
        elderly: 'Low risk at standard doses.',
        pregnancy: 'Limited data for both — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Lyon MR et al. Altern Med Rev 2011'],
    },
  
    {
      drugs: ['melatonin', 'magnesium'],
      status: 'safe',
      summary: 'Safe combination for sleep support — commonly used together; complementary mechanisms.',
      mechanism: 'Magnesium regulates NMDA receptors and GABA signaling, reducing cortisol and promoting muscle relaxation. Melatonin regulates circadian timing. No pharmacokinetic interaction.',
      safeLimits: 'Melatonin 0.5–5 mg + magnesium glycinate 200–400 mg. Well-tolerated combination.',
      populations: {
        children: 'Consult a pediatrician. Both have age-appropriate doses.',
        elderly: 'Low risk. Ensure adequate magnesium intake (reduces muscle cramps too).',
        pregnancy: 'Magnesium generally safe in pregnancy. Melatonin data limited — consult OB.',
      },
      sources: ['NIH ODS — Magnesium 2024', 'Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['valerian', 'lTheanine'],
      status: 'safe',
      summary: 'Generally safe together — mild additive relaxing effects for sleep/anxiety.',
      mechanism: 'Valerian potentiates GABA; L-theanine increases alpha waves and GABA without strong sedation. Additive relaxation without excessive CNS depression at standard doses.',
      safeLimits: 'Valerian 300–600 mg + L-theanine 100–200 mg. Avoid driving after use.',
      populations: {
        children: 'Consult pediatrician.',
        elderly: 'Low risk at standard doses. Monitor for excessive sedation.',
        pregnancy: 'Valerian not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['ashwagandha', 'lTheanine'],
      status: 'safe',
      summary: 'Safe combination for anxiety/stress support — different mechanisms, no known interaction.',
      mechanism: 'Ashwagandha reduces cortisol via HPA axis modulation; L-theanine increases alpha waves and GABA. Complementary adaptogenic and relaxing effects.',
      safeLimits: 'Ashwagandha 150–600 mg + L-theanine 100–200 mg. Well-tolerated combination.',
      populations: {
        children: 'Both have limited pediatric data — consult pediatrician.',
        elderly: 'Low risk at standard doses.',
        pregnancy: 'Ashwagandha not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024', 'Chandrasekhar K et al. Indian J Psychol Med 2012'],
    },
  
    {
      drugs: ['ashwagandha', 'valerian'],
      status: 'safe',
      summary: 'Generally safe together — commonly combined for sleep and stress support.',
      mechanism: 'Ashwagandha modulates HPA axis; valerian potentiates GABA. Additive calming effects; may increase sedation.',
      safeLimits: 'Use lowest effective doses. Avoid if driving. Ashwagandha 300 mg + valerian 300 mg a common combination.',
      populations: {
        children: 'Both have limited pediatric safety data.',
        elderly: 'Monitor for excessive sedation.',
        pregnancy: 'Both not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
  
    // ─────────────────────────────────────────────
    // ST. JOHN'S WORT — major interactions
    // ─────────────────────────────────────────────
    {
      drugs: ['stJohnsWort', 'cetirizine'],
      status: 'caution',
      summary: "St. John's Wort may moderately reduce cetirizine blood levels via CYP enzyme induction.",
      mechanism: "St. John's Wort induces CYP3A4 and P-glycoprotein (P-gp), potentially reducing absorption and increasing elimination of cetirizine.",
      safeLimits: "If taking St. John's Wort regularly, discuss antihistamine dosing with a physician.",
      populations: {
        children: "St. John's Wort not under 12.",
        elderly: 'Monitor allergy symptom control.',
        pregnancy: "St. John's Wort not recommended in pregnancy.",
      },
      sources: ['Natural Medicines Database 2024', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['stJohnsWort', 'melatonin'],
      status: 'caution',
      summary: "St. John's Wort may increase serotonin-related effects; combined with melatonin may cause mild serotonin excess.",
      mechanism: "St. John's Wort inhibits serotonin reuptake (mild SSRI effect); melatonin synthesis is serotonin-dependent. Additive serotonergic activity possible.",
      safeLimits: 'Caution with combination. Risk is low but monitor for headache, dizziness, or agitation.',
      populations: {
        children: "St. John's Wort not under 12.",
        elderly: 'Monitor for serotonergic symptoms.',
        pregnancy: 'Both not recommended.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
  
    // ─────────────────────────────────────────────
    // MAGNESIUM pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['magnesium', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Calcium and magnesium compete for absorption — take at separate times for best results.',
      mechanism: 'Calcium and magnesium compete for the same intestinal transporters. High calcium intake can decrease magnesium absorption by 10–30%.',
      safeLimits: 'Separate by at least 2 hours. Calcium with meals; magnesium at bedtime is a common strategy.',
      populations: {
        children: 'Both important minerals — separate timing preferred.',
        elderly: 'Common supplement combination — separate for optimal absorption.',
        pregnancy: 'Both important in pregnancy — separate dosing recommended.',
      },
      sources: ['NIH ODS — Magnesium 2024', 'NIH ODS — Calcium 2024'],
    },
  
    {
      drugs: ['magnesium', 'iron'],
      status: 'caution',
      summary: 'Magnesium and iron may compete for absorption — separate by at least 2 hours.',
      mechanism: 'Both use divalent metal transporter-1 (DMT1) for intestinal absorption — competitive inhibition at high doses.',
      safeLimits: 'Take iron on empty stomach with vitamin C; take magnesium at a different time (e.g., bedtime).',
      populations: {
        children: 'Iron deficiency common in children — separate timing important to maximize iron absorption.',
        elderly: 'Common supplement combination — separate dosing recommended.',
        pregnancy: 'Both critical in pregnancy — separate dosing maximizes benefit of each.',
      },
      sources: ['NIH ODS — Iron 2024', 'NIH ODS — Magnesium 2024'],
    },
  
    {
      drugs: ['magnesium', 'vitaminD'],
      status: 'safe',
      summary: 'Beneficial combination — magnesium is required for vitamin D metabolism and activation.',
      mechanism: 'Magnesium is a cofactor for the enzymes that convert vitamin D to its active form (1,25-dihydroxyvitamin D). Low magnesium may reduce vitamin D efficacy.',
      safeLimits: 'Standard supplemental doses of both are beneficial together. Magnesium 200–400 mg + Vitamin D3 1,000–2,000 IU is a common and safe combination.',
      populations: {
        children: 'Both important for bone development.',
        elderly: 'Both often deficient in elderly — beneficial combination.',
        pregnancy: 'Both recommended in pregnancy at appropriate doses.',
      },
      sources: ['Uwitonze AM, Razzaque MS. J Am Osteopath Assoc 2018', 'NIH ODS — Magnesium 2024'],
    },
  
    {
      drugs: ['magnesium', 'vitaminC'],
      status: 'safe',
      summary: 'Safe together — vitamin C may enhance magnesium absorption; no significant interaction.',
      mechanism: 'Vitamin C (ascorbic acid) may improve absorption of magnesium; no pharmacokinetic concerns.',
      safeLimits: 'Standard doses of both are safe together.',
      populations: {
        children: 'Safe combination.',
        elderly: 'Safe combination.',
        pregnancy: 'Both generally safe in pregnancy at recommended doses.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH ODS'],
    },
  
    // ─────────────────────────────────────────────
    // VITAMIN & SUPPLEMENT pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['vitaminC', 'iron'],
      status: 'safe',
      summary: 'Vitamin C significantly enhances iron absorption — beneficial combination.',
      mechanism: 'Vitamin C (ascorbic acid) reduces ferric iron (Fe3+) to ferrous iron (Fe2+), which is better absorbed in the duodenum. Also prevents iron from binding with inhibitors in food.',
      safeLimits: 'Take iron with 100–200 mg vitamin C to enhance absorption by up to 3-fold. Standard doses of both are safe.',
      populations: {
        children: 'Highly recommended — improves pediatric iron therapy efficacy.',
        elderly: 'Beneficial for iron absorption in elderly who may have reduced stomach acid.',
        pregnancy: 'Excellent combination — iron + vitamin C important in pregnancy.',
      },
      sources: ['NIH ODS — Iron 2024', 'Hallberg L et al. Am J Clin Nutr 1989', 'Cook JD, Reddy MB. Am J Clin Nutr 2001'],
    },
  
    {
      drugs: ['vitaminD', 'vitaminK2'],
      status: 'safe',
      summary: 'Complementary combination — vitamin K2 directs calcium (mobilized by vitamin D) to bones rather than arteries.',
      mechanism: 'Vitamin D increases intestinal calcium absorption; vitamin K2 (MK-7) activates osteocalcin and matrix Gla-protein, ensuring calcium deposits in bone rather than arterial walls.',
      safeLimits: 'Standard doses: Vitamin D3 1,000–4,000 IU + Vitamin K2 (MK-7) 100–200 mcg. Commonly sold together for bone health.',
      populations: {
        children: 'Both support healthy bone development.',
        elderly: 'Important combination for bone density and cardiovascular health.',
        pregnancy: 'Both recommended; ensure adequate K2 when supplementing high-dose vitamin D.',
      },
      sources: ['Maresz K. Integr Med (Encinitas) 2015', 'NIH ODS — Vitamin D 2024', 'NIH ODS — Vitamin K 2024'],
    },
  
    {
      drugs: ['vitaminD', 'calciumCarbonate'],
      status: 'safe',
      summary: 'Synergistic combination — vitamin D is required for calcium absorption from the gut.',
      mechanism: 'Vitamin D (specifically calcitriol) induces production of calcium-binding proteins in intestinal epithelium, increasing calcium absorption by 30–80%.',
      safeLimits: 'Standard doses of calcium (1,000–1,200 mg/day) with vitamin D3 (600–2,000 IU/day) are safe and recommended for bone health.',
      populations: {
        children: 'Vitamin D + calcium essential for growth and bone development.',
        elderly: 'Standard recommendation for osteoporosis prevention.',
        pregnancy: 'Both important in pregnancy at appropriate doses.',
      },
      sources: ['NIH ODS — Calcium 2024', 'NIH ODS — Vitamin D 2024', 'Institute of Medicine DRI Report 2011'],
    },
  
    {
      drugs: ['zinc', 'iron'],
      status: 'caution',
      summary: 'Zinc and iron compete for absorption — take at different times for best results.',
      mechanism: 'Both use the same intestinal transporter (DMT1). High doses of zinc (>40 mg) can significantly reduce iron absorption and vice versa.',
      safeLimits: 'Separate dosing by 2–3 hours. Take iron with vitamin C; take zinc with food at a different meal.',
      populations: {
        children: 'Children taking iron supplementation should separate zinc timing.',
        elderly: 'Common supplement combination — separate for optimal absorption of each.',
        pregnancy: 'Both important in pregnancy — separate dosing critical.',
      },
      sources: ['NIH ODS — Zinc 2024', 'NIH ODS — Iron 2024', 'Solomons NW. J Nutr 1986'],
    },
  
    {
      drugs: ['zinc', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Calcium may reduce zinc absorption — separate by 1–2 hours.',
      mechanism: 'Calcium competes with zinc at intestinal absorption sites. Calcium supplements (especially at high doses) can reduce zinc absorption by up to 50%.',
      safeLimits: 'Separate by 1–2 hours. Take calcium with meals; zinc between meals or at a different time.',
      populations: {
        children: 'Separate dosing preferred.',
        elderly: 'Important to note since both are commonly supplemented.',
        pregnancy: 'Both important in pregnancy — separate timing maximizes absorption.',
      },
      sources: ['NIH ODS — Zinc 2024', 'Argiratos V, Samman S. Eur J Clin Nutr 1994'],
    },
  
    {
      drugs: ['fishOil', 'vitaminE'],
      status: 'safe',
      summary: 'Complementary combination — vitamin E protects fish oil from oxidation.',
      mechanism: 'Omega-3 fatty acids are prone to lipid peroxidation; vitamin E (alpha-tocopherol) is a fat-soluble antioxidant that helps prevent this. Many fish oil supplements include vitamin E as a preservative.',
      safeLimits: 'Standard doses of both are safe. Vitamin E 200–400 IU with 1–3 g fish oil.',
      populations: {
        children: 'Safe combination.',
        elderly: 'Commonly taken together; low risk.',
        pregnancy: 'Fish oil generally safe and beneficial; vitamin E at standard doses.',
      },
      sources: ['NIH ODS — Vitamin E 2024', 'NIH ODS — Omega-3 2024'],
    },
  
    {
      drugs: ['vitaminB6', 'magnesium'],
      status: 'safe',
      summary: 'Synergistic combination — magnesium and B6 work together in over 300 enzymatic reactions.',
      mechanism: 'Vitamin B6 (pyridoxal-5-phosphate) is a cofactor required for many magnesium-dependent enzymatic reactions. Low B6 impairs magnesium retention in cells.',
      safeLimits: 'Standard doses of both are safe and beneficial. B6 50–100 mg + Magnesium 200–400 mg.',
      populations: {
        children: 'Safe combination at age-appropriate doses.',
        elderly: 'Beneficial — both often deficient in elderly.',
        pregnancy: 'Both used together for nausea of pregnancy and fetal development.',
      },
      sources: ['NIH ODS — Vitamin B6 2024', 'Held K et al. Pharmacopsychiatry 2002'],
    },
  
    // ─────────────────────────────────────────────
    // HERBAL pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['echinacea', 'elderberry'],
      status: 'safe',
      summary: 'Safe combination for immune support — both have complementary immune-modulating properties.',
      mechanism: 'Echinacea activates macrophages and NK cells; elderberry anthocyanins inhibit viral replication and modulate cytokine production. Different mechanisms, no known pharmacokinetic interaction.',
      safeLimits: 'Standard doses of both at symptom onset. Echinacea max 10 days continuous use. Elderberry typically 3–5 days during acute illness.',
      populations: {
        children: 'Both generally safe for children over 1 (elderberry) and 2 (echinacea) at age-appropriate doses.',
        elderly: 'Generally safe.',
        pregnancy: 'Limited safety data — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Hawkins J et al. Complement Ther Med 2019'],
    },
  
    {
      drugs: ['echinacea', 'vitaminC'],
      status: 'safe',
      summary: 'Safe and commonly combined for cold/flu support — complementary immune mechanisms.',
      mechanism: 'Echinacea modulates innate immune response; vitamin C supports lymphocyte function and is an antioxidant. No adverse pharmacokinetic interaction.',
      safeLimits: 'Standard doses of both safe. Vitamin C 500–1,000 mg + Echinacea 300–500 mg 3x/day for acute illness.',
      populations: {
        children: 'Both safe at age-appropriate doses.',
        elderly: 'Generally safe.',
        pregnancy: 'Vitamin C safe; echinacea limited data — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH — Echinacea 2024'],
    },
  
    {
      drugs: ['echinacea', 'elderberry'],
      status: 'safe',
      summary: 'Safe combination — commonly combined for immune support during cold and flu season.',
      mechanism: 'Complementary mechanisms: echinacea stimulates innate immunity; elderberry inhibits viral neuraminidase and has anti-inflammatory cytokine effects.',
      safeLimits: 'Standard doses. Limit echinacea to 10 days continuous use.',
      populations: {
        children: 'Age-appropriate doses of each.',
        elderly: 'Generally safe.',
        pregnancy: 'Limited data — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH'],
    },
  
    {
      drugs: ['ginger', 'chamomile'],
      status: 'safe',
      summary: 'Safe and synergistic combination for nausea and digestive support.',
      mechanism: 'Ginger (gingerols/shogaols) inhibits 5-HT3 and NK1 receptors involved in nausea; chamomile (apigenin) relaxes smooth muscle via calcium channel modulation. Complementary GI effects.',
      safeLimits: 'Standard tea amounts or supplement doses of both are safe.',
      populations: {
        children: 'Both safe at age-appropriate diluted amounts.',
        elderly: 'Generally safe.',
        pregnancy: 'Ginger safe for nausea up to 4 g/day. Chamomile may have uterotonic properties at high doses — limit to tea amounts.',
      },
      sources: ['Natural Medicines Database 2024', 'NIH NCCIH'],
    },
  
    {
      drugs: ['turmeric', 'ginger'],
      status: 'safe',
      summary: 'Safe and synergistic combination for inflammation and pain — commonly combined.',
      mechanism: 'Turmeric (curcumin) inhibits NF-kB and COX-2; ginger (gingerols) inhibits both COX and LOX pathways. Complementary anti-inflammatory mechanisms with potentially additive effects.',
      safeLimits: 'Standard supplement doses of both. Turmeric 500–1,000 mg + Ginger 500–1,000 mg.',
      populations: {
        children: 'Culinary amounts generally safe.',
        elderly: 'Beneficial combination; monitor for blood-thinning effects at high doses.',
        pregnancy: 'Culinary amounts safe; supplement doses — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Chainani-Wu N. J Altern Complement Med 2003'],
    },
  
    {
      drugs: ['garlic', 'fishOil'],
      status: 'caution',
      summary: 'Both have mild antiplatelet and cholesterol-lowering effects — additive bleeding risk at high doses.',
      mechanism: 'Garlic inhibits platelet aggregation via allicin; fish oil EPA/DHA reduce thromboxane A2. Combined high-dose use has additive antiplatelet effects.',
      safeLimits: 'Culinary garlic with standard fish oil doses: low risk. High-dose garlic supplements (>600 mg) with high-dose fish oil (>3 g EPA+DHA): monitor for easy bruising.',
      populations: {
        children: 'Low risk at standard amounts.',
        elderly: 'Monitor for unusual bruising.',
        pregnancy: 'Culinary amounts of garlic with standard fish oil: generally safe.',
      },
      sources: ['Natural Medicines Database 2024', 'Harris WS et al.'],
    },
  
    {
      drugs: ['stJohnsWort', 'valerian'],
      status: 'caution',
      summary: "Additive CNS effects — both can promote sedation; may cause excessive drowsiness.",
      mechanism: "St. John's Wort inhibits serotonin/dopamine reuptake; valerian potentiates GABA. Together may cause additive CNS depression.",
      safeLimits: 'Avoid if driving or operating heavy machinery. Use lowest doses if combining for sleep/anxiety.',
      populations: {
        children: "St. John's Wort not under 12.",
        elderly: 'Avoid combination — fall risk.',
        pregnancy: 'Both not recommended in pregnancy.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['cranberry', 'warfarin'],
      status: 'caution',
      summary: 'Cranberry juice and supplements may significantly increase warfarin blood levels and bleeding risk.',
      mechanism: 'Cranberry inhibits CYP2C9, the enzyme that metabolizes warfarin, leading to elevated warfarin concentrations and higher INR.',
      safeLimits: 'If on warfarin, limit cranberry juice to 240 mL/day or less. Avoid high-dose cranberry supplements. Monitor INR closely.',
      populations: {
        children: 'Warfarin in children is rare — manage with hematologist.',
        elderly: 'High risk — many elderly are on warfarin. Avoid high-dose cranberry.',
        pregnancy: 'Warfarin generally avoided in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'Suvarna R et al. J R Soc Med 2003 (case reports)', 'Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['milkThistle', 'ibuprofen'],
      status: 'safe',
      summary: 'No significant interaction at standard doses — milk thistle may even provide some liver protection.',
      mechanism: 'Silymarin (milk thistle) has mild CYP3A4 inhibitory properties but not at clinically meaningful levels at OTC doses. Does not significantly alter ibuprofen metabolism.',
      safeLimits: 'Standard doses of both are safe.',
      populations: {
        children: 'Milk thistle not under 12.',
        elderly: 'Generally safe.',
        pregnancy: 'Ibuprofen avoided after 20 weeks. Milk thistle limited data — consult OB.',
      },
      sources: ['Natural Medicines Database 2024', 'Lexi-Interact 2024'],
    },
  
    // ─────────────────────────────────────────────
    // ANTACID / GI pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['calciumCarbonate', 'famotidine'],
      status: 'safe',
      summary: 'Can be taken together — complementary mechanisms for heartburn.',
      mechanism: 'Calcium carbonate neutralizes existing stomach acid (fast onset); famotidine (H2 blocker) reduces acid production (sustained effect). Sequential use covers both immediate and ongoing relief.',
      safeLimits: 'Tums for immediate relief; famotidine 30–60 min before meals for prevention. Max 2 doses/day famotidine.',
      populations: {
        children: 'Both have age restrictions (12+ without physician guidance).',
        elderly: 'H2 blockers preferred over PPI for long-term elderly use.',
        pregnancy: 'Calcium carbonate safe in pregnancy. Famotidine generally considered low-risk.',
      },
      sources: ['FDA OTC Labeling', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['simethicone', 'bismuthSubsalicylate'],
      status: 'safe',
      summary: 'Safe to combine — simethicone addresses gas, bismuth subsalicylate addresses upset stomach/diarrhea.',
      mechanism: 'Simethicone reduces gas bubbles (physical mechanism, not absorbed); bismuth subsalicylate has local antisecretory and antimicrobial effects in GI tract. No interaction.',
      safeLimits: 'Standard doses of each. Bismuth max 8 doses/day for 2 days. Simethicone as needed.',
      populations: {
        children: 'Simethicone safe for all ages. Bismuth subsalicylate not under 12 (Reye syndrome risk).',
        elderly: 'Safe combination.',
        pregnancy: 'Simethicone safe in pregnancy. Bismuth subsalicylate generally avoided in pregnancy.',
      },
      sources: ['FDA OTC Labeling', 'Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['probiotics', 'antibiotics'],
      status: 'safe',
      summary: 'Beneficial combination — probiotics help prevent antibiotic-associated diarrhea. Separate by 2 hours.',
      mechanism: 'Antibiotics kill beneficial gut bacteria causing dysbiosis and diarrhea. Probiotic species (Lactobacillus, Bifidobacterium) resist many antibiotics or are given at separate times to partially repopulate the microbiome.',
      safeLimits: 'Take probiotics 2 hours before or 2 hours after antibiotics to avoid destruction of probiotic bacteria by the antibiotic. Continue probiotics for 1–2 weeks after finishing antibiotics.',
      populations: {
        children: 'Well-studied and recommended in children on antibiotics to prevent diarrhea.',
        elderly: 'Beneficial — elderly at higher risk for Clostridioides difficile after antibiotics.',
        pregnancy: 'Probiotics generally safe in pregnancy.',
      },
      sources: ['Cochrane Review: Probiotics for antibiotic-associated diarrhea 2019', 'NIH NCCIH — Probiotics 2024'],
    },
  
    {
      drugs: ['slipperyElm', 'famotidine'],
      status: 'safe',
      summary: 'Safe together — slippery elm coats and soothes GI lining; famotidine reduces acid. Separate by 1–2 hours.',
      mechanism: 'Slippery elm mucilage forms a protective coating on GI mucosa; famotidine reduces acid output. No adverse interaction, but slippery elm may slightly delay absorption of other medications.',
      safeLimits: 'Take famotidine 1–2 hours before or after slippery elm to ensure full medication absorption.',
      populations: {
        children: 'Famotidine not under 12 without physician guidance.',
        elderly: 'Safe combination.',
        pregnancy: 'Slippery elm generally safe. Famotidine generally considered low-risk.',
      },
      sources: ['Natural Medicines Database 2024'],
    },
  
    // ─────────────────────────────────────────────
    // TOPICAL pairs (low systemic risk)
    // ─────────────────────────────────────────────
    {
      drugs: ['aloeVera', 'lavenderOil'],
      status: 'safe',
      summary: 'Safe topical combination — commonly combined for burns, minor skin irritation, and calming effect.',
      mechanism: 'Aloe vera provides moisturizing, anti-inflammatory, and wound-healing properties; lavender oil adds antimicrobial and analgesic effects. Complementary topical actions with no known interaction.',
      safeLimits: 'Standard topical dilutions. Add 2% lavender oil to aloe vera gel for combined use.',
      populations: {
        children: 'Safe topically with proper dilution (1% lavender for young children).',
        elderly: 'Generally safe.',
        pregnancy: 'Topical application of both generally safe.',
      },
      sources: ['Tisserand R, Young R: Essential Oil Safety 2nd ed. 2014', 'NIH NCCIH — Aloe Vera 2024'],
    },
  
    {
      drugs: ['teaTreeOil', 'lavenderOil'],
      status: 'safe',
      summary: 'Safe topical combination — commonly combined for antimicrobial and soothing skin care.',
      mechanism: 'Tea tree oil (terpinen-4-ol) disrupts microbial cell membranes; lavender oil has antimicrobial, anti-inflammatory, and analgesic properties. Complementary mechanisms; no adverse interaction.',
      safeLimits: 'Properly diluted in carrier oil: 2–5% tea tree + 2% lavender. Standard topical use.',
      populations: {
        children: 'Dilute carefully. Tea tree not for under 6. Lavender 1% for children 2–6.',
        elderly: 'Generally safe.',
        pregnancy: 'Topical use in diluted form generally considered low-risk.',
      },
      sources: ['Tisserand R, Young R: Essential Oil Safety 2nd ed. 2014'],
    },
  
    {
      drugs: ['peppermintOil', 'lavenderOil'],
      status: 'safe',
      summary: 'Safe topical combination — frequently combined for headache relief and relaxation.',
      mechanism: 'Peppermint (menthol) produces topical cooling via TRPM8 receptor activation and mild analgesic effects; lavender promotes relaxation. No adverse interaction.',
      safeLimits: 'Dilute each to 1–2% in carrier oil. Apply to temples and back of neck for tension headache.',
      populations: {
        children: 'Peppermint only 6+ and diluted. Lavender 2+ and diluted.',
        elderly: 'Generally safe.',
        pregnancy: 'Topical diluted use generally considered low risk — use sparingly.',
      },
      sources: ['Tisserand R, Young R: Essential Oil Safety 2nd ed. 2014', 'Gobel H et al. Cephalalgia 1994'],
    },
  
    {
      drugs: ['coconutOil', 'teaTreeOil'],
      status: 'safe',
      summary: 'Safe combination — coconut oil serves as an ideal carrier for diluting tea tree oil.',
      mechanism: 'Coconut oil (lauric acid) has its own mild antimicrobial properties and acts as an effective carrier oil that enhances skin penetration of tea tree oil. Complementary effects.',
      safeLimits: 'Standard dilution: 2–5% tea tree oil in coconut oil carrier. For skin infections, minor cuts, or acne.',
      populations: {
        children: 'Tea tree only 6+; dilute in coconut oil carrier.',
        elderly: 'Generally safe.',
        pregnancy: 'Topical diluted use generally safe.',
      },
      sources: ['Tisserand R, Young R: Essential Oil Safety 2nd ed. 2014', 'NIH NCCIH — Tea Tree Oil 2024'],
    },
  
    {
      drugs: ['zincOxide', 'calendula'],
      status: 'safe',
      summary: 'Safe and synergistic combination for diaper rash and skin irritation.',
      mechanism: 'Zinc oxide provides a physical barrier and astringent/antimicrobial action; calendula provides anti-inflammatory and wound-healing effects. Complementary mechanisms with no adverse interaction.',
      safeLimits: 'Standard topical application. Mix calendula cream with zinc oxide paste or apply in layers.',
      populations: {
        children: 'Both safe for infants and children.',
        elderly: 'Generally safe.',
        pregnancy: 'Both considered safe topically.',
      },
      sources: ['FDA OTC Monograph — Zinc Oxide', 'EMA Herbal Monograph — Calendula officinalis 2021'],
    },
  
    {
      drugs: ['aloeVera', 'coconutOil'],
      status: 'safe',
      summary: 'Safe and commonly combined for burns, rashes, and moisturizing.',
      mechanism: 'Aloe vera (acemannan, glycoproteins) provides cooling, anti-inflammatory wound-healing benefits; coconut oil (lauric acid) provides moisturizing, antimicrobial properties and a skin barrier. No adverse interaction.',
      safeLimits: 'Standard topical application of both.',
      populations: {
        children: 'Both safe for all ages topically.',
        elderly: 'Generally safe.',
        pregnancy: 'Topical use of both generally safe.',
      },
      sources: ['NIH NCCIH — Aloe Vera 2024', 'NIH NCCIH — Coconut Oil 2024'],
    },
  
    // ─────────────────────────────────────────────
    // COMMONLY ASKED / HIGH-RISK pairs
    // ─────────────────────────────────────────────
    {
      drugs: ['cetirizine', 'loratadine'],
      status: 'avoid',
      summary: 'Do not combine two antihistamines — no benefit and increased risk of side effects.',
      mechanism: 'Both are second-generation H1 antihistamines. Combining provides no additional antihistamine benefit but increases risk of drowsiness, dry mouth, and urinary retention.',
      safeLimits: 'Choose one antihistamine. Cetirizine tends to be slightly more sedating; loratadine is typically non-sedating. Both dosed once daily.',
      populations: {
        children: 'Choose one age-appropriate antihistamine.',
        elderly: 'Cetirizine may cause more sedation in elderly; loratadine often preferred.',
        pregnancy: 'Loratadine preferred when antihistamine needed in pregnancy.',
      },
      sources: ['FDA OTC Monographs', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['guaifenesin', 'dextromethorphan'],
      status: 'safe',
      summary: 'Safe combination — many OTC products combine these (e.g. Mucinex DM) for cough relief.',
      mechanism: 'Guaifenesin (expectorant) loosens mucus; dextromethorphan (cough suppressant) reduces cough reflex centrally. Complementary mechanisms; no adverse interaction.',
      safeLimits: 'Many combination products: guaifenesin 400 mg + dextromethorphan 20 mg. Max 6 doses/day. Do not exceed individual limits.',
      populations: {
        children: 'Both not for under 2 (4+ recommended by many pediatricians). Check individual age restrictions.',
        elderly: 'Generally safe. Dextromethorphan can cause agitation in elderly at high doses.',
        pregnancy: 'Limited data for dextromethorphan in first trimester — consult OB.',
      },
      sources: ['FDA OTC Labeling — Mucinex DM', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['dextromethorphan', 'diphenhydramine'],
      status: 'caution',
      summary: 'Found together in some multi-symptom cold products; combined CNS depression requires caution.',
      mechanism: 'Dextromethorphan has mild CNS and serotonergic properties; diphenhydramine is a CNS depressant/anticholinergic. Combined use may cause additive sedation.',
      safeLimits: 'Do not combine with alcohol. Do not drive. Do not use multiple cold products that may contain both — check labels carefully.',
      populations: {
        children: 'Not recommended for under 12 for sleep/cough combination.',
        elderly: 'Avoid — both can cause significant CNS side effects in elderly.',
        pregnancy: 'Limited data — consult OB.',
      },
      sources: ['FDA OTC Labeling', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['bismuthSubsalicylate', 'aspirin'],
      status: 'caution',
      summary: 'Both contain salicylates — risk of salicylate toxicity when combined.',
      mechanism: 'Bismuth subsalicylate releases salicylate (aspirin is acetylsalicylate). Combined use can elevate total salicylate levels, increasing risk of tinnitus, confusion, and metabolic acidosis.',
      safeLimits: 'Avoid combining if on regular aspirin. Occasional use at maximum recommended doses is unlikely to cause toxicity in healthy adults, but caution is advised.',
      populations: {
        children: 'Bismuth subsalicylate not under 12 (Reye syndrome risk). Aspirin not for children.',
        elderly: 'Monitor for salicylate toxicity symptoms (tinnitus, confusion).',
        pregnancy: 'Both generally avoided in pregnancy.',
      },
      sources: ['FDA OTC Monograph — Bismuth Subsalicylate', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['pseudoephedrine', 'caffeine'],
      status: 'caution',
      summary: 'Both are stimulants — additive cardiovascular effects (increased heart rate and blood pressure).',
      mechanism: 'Pseudoephedrine stimulates alpha- and beta-adrenergic receptors; caffeine inhibits adenosine receptors. Combined stimulant effects increase heart rate, blood pressure, and risk of palpitations.',
      safeLimits: 'Limit caffeine to 1 cup of coffee when taking pseudoephedrine. Avoid energy drinks. Monitor heart rate and blood pressure.',
      populations: {
        children: 'Pseudoephedrine not under 6. Caffeine in children not recommended.',
        elderly: 'Higher cardiovascular risk — avoid or use with caution.',
        pregnancy: 'Both have restrictions in pregnancy.',
      },
      sources: ['Lexi-Interact 2024', 'Natural Medicines Database 2024'],
    },
  
    {
      drugs: ['fexofenadine', 'calciumCarbonate'],
      status: 'caution',
      summary: 'Antacids containing aluminum or calcium may reduce fexofenadine absorption.',
      mechanism: 'Calcium carbonate (and other antacids) can reduce fexofenadine bioavailability by up to 36% when taken simultaneously.',
      safeLimits: 'Take fexofenadine at least 2 hours before or 4 hours after calcium carbonate antacids.',
      populations: {
        children: 'Separate dosing timing important.',
        elderly: 'Important to note — many elderly take antacids regularly.',
        pregnancy: 'Separate dosing timing important.',
      },
      sources: ['FDA-approved prescribing information — fexofenadine (Allegra)', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['loperamide', 'bismuthSubsalicylate'],
      status: 'safe',
      summary: 'Safe to combine at standard OTC doses for diarrhea — different mechanisms provide complementary relief.',
      mechanism: 'Loperamide slows intestinal motility via opioid receptors; bismuth subsalicylate reduces intestinal inflammation and secretion and has mild antimicrobial properties.',
      safeLimits: 'Use together only for acute severe diarrhea. Loperamide max 16 mg/day. Bismuth max 8 doses/day. Limit use to 2 days without physician guidance.',
      populations: {
        children: 'Loperamide not under 2. Bismuth not under 12. Combination not for children.',
        elderly: 'Safe at standard doses. Monitor for constipation from loperamide.',
        pregnancy: 'Both generally avoided in pregnancy — consult OB.',
      },
      sources: ['FDA OTC Monographs', 'Lexi-Interact 2024'],
    },
  
    {
      drugs: ['quercetin', 'vitaminC'],
      status: 'safe',
      summary: 'Synergistic combination — vitamin C enhances quercetin absorption and both have complementary antioxidant/anti-inflammatory effects.',
      mechanism: 'Vitamin C (ascorbic acid) helps regenerate oxidized quercetin back to its active reduced form and may improve intestinal absorption. Both are flavonoids/antioxidants with complementary mechanisms.',
      safeLimits: 'Standard supplement doses: quercetin 500 mg + vitamin C 500–1,000 mg. Well-tolerated combination.',
      populations: {
        children: 'Both safe at age-appropriate doses.',
        elderly: 'Safe and potentially beneficial combination.',
        pregnancy: 'Both generally safe at standard doses.',
      },
      sources: ['Natural Medicines Database 2024', 'Croft KD et al. Biochem Pharmacol 1993'],
    },
  
    {
      drugs: ['vitaminC', 'vitaminD'],
      status: 'safe',
      summary: 'Safe combination — complementary immune-supportive mechanisms with no adverse interaction.',
      mechanism: 'Vitamin C supports lymphocyte production and antiviral interferon activity; vitamin D regulates adaptive and innate immunity via nuclear receptor signaling. No pharmacokinetic interaction.',
      safeLimits: 'Standard supplement doses of both are safe.',
      populations: {
        children: 'Both important for immune health in children.',
        elderly: 'Both commonly deficient in elderly — beneficial combination.',
        pregnancy: 'Both important in pregnancy at recommended doses.',
      },
      sources: ['NIH ODS — Vitamin C 2024', 'NIH ODS — Vitamin D 2024'],
    },
  
  ];
  
  // Helper: get all interactions for a given medication key
  export function getInteractionsFor(medKey) {
    return INTERACTIONS.filter(i => i.drugs.includes(medKey));
  }
  
  // Helper: get interaction between exactly two medications
  export function getInteractionBetween(medA, medB) {
    return INTERACTIONS.find(i =>
      i.drugs.includes(medA) && i.drugs.includes(medB)
    ) || null;
  }
  
  // Helper: get status summary for UI badge
  export function statusConfig(status) {
    const map = {
      safe:    { label: 'Generally Safe', color: '#2d6a4f', bg: '#d8f3dc', icon: '✅' },
      caution: { label: 'Use Caution',    color: '#7b5e00', bg: '#fff3cd', icon: '⚠️' },
      avoid:   { label: 'Avoid Combining',color: '#7f1d1d', bg: '#fee2e2', icon: '🚫' },
    };
    return map[status] || map['caution'];
  }