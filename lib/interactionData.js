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
      drugs: ['acetaminophen', 'alcohol'],
      status: 'caution',
      summary: 'Significant liver toxicity risk when combined with heavy or chronic alcohol use.',
      mechanism: 'Alcohol induces CYP2E1 enzyme, increasing production of NAPQI (toxic acetaminophen metabolite). Depletes glutathione liver protection.',
      safeLimits: 'If you consume 3+ alcoholic drinks daily, do not take acetaminophen without physician guidance. Occasional drinkers: acetaminophen at standard doses is generally safe.',
      populations: {
        children: 'Alcohol and acetaminophen co-ingestion not applicable in children.',
        elderly: 'Elderly may have reduced liver reserve — exercise caution.',
        pregnancy: 'Alcohol not safe in pregnancy regardless.',
      },
      sources: ['FDA Drug Safety Communication: Acetaminophen and Liver Damage', 'Heard KJ. N Engl J Med 2008'],
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