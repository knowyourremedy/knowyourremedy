// lib/interactionClassRules.js
// ─────────────────────────────────────────────────────────────
// Class Rule Engine for cumulative-effect detection
//
// Detects stacking patterns across categories that pair-wise data
// alone can't catch. Example: 5 antiplatelet items is dangerous even
// when no single pair is "avoid."
//
// Each rule defines:
//   - which meds belong to its class (via pharmClasses tag matching)
//   - the threshold at which the rule fires (2 or 3 items)
//   - severity (avoid or caution)
//   - human-readable explanation, contextual risk, and goal-framed
//     safer alternative
//
// Reads `pharmClasses` arrays from medsData.js. To add a new med to
// an existing class, add the tag in medsData.js — no changes here.
// ─────────────────────────────────────────────────────────────

import { MEDS } from './medsData';

// ─── Class membership helpers ─────────────────────────────────
function hasClass(med, className) {
  return Array.isArray(med?.pharmClasses) && med.pharmClasses.includes(className);
}

function hasAnyClass(med, classNames) {
  if (!Array.isArray(med?.pharmClasses)) return false;
  return classNames.some(c => med.pharmClasses.includes(c));
}

// ─── The 7 Class Rules ────────────────────────────────────────
export const CLASS_RULES = [
  // ═══════════════════════════════════════════════════════════
  // RULE 1 — Bleeding-risk stack
  // Threshold 3 — dose-cumulative effect
  // ═══════════════════════════════════════════════════════════
  {
    id: 'bleeding_stack',
    icon: '🩸',
    title: 'Bleeding-risk stack detected',
    severity: 'avoid',
    threshold: 3,
    matches: (medKey, med) => hasAnyClass(med, ['antiplatelet', 'anticoagulant', 'nsaid']),
    summary: (items) =>
      `You've selected ${items.length} items that all thin the blood through different mechanisms. Even when no two of them have a documented pair-wise interaction, this combination significantly increases bleeding risk.`,
    contextualRisk:
      'Risk is highest if you have a surgery scheduled, are over 65, or take aspirin or warfarin.',
    goalFraming:
      'If your goal is pain relief, acetaminophen (Tylenol) is an option that does not affect bleeding risk and is generally safe for most adults at standard doses.',
    sources: ['Lexi-Interact 2024', 'NIH NCCIH Herb-Drug Interactions', 'Stockley\'s Drug Interactions'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 2 — Sedation stack
  // Threshold 3 — dose-cumulative effect
  // ═══════════════════════════════════════════════════════════
  {
    id: 'sedation_stack',
    icon: '🧠',
    title: 'Sedation stack detected',
    severity: 'avoid',
    threshold: 3,
    matches: (medKey, med) => hasClass(med, 'cns_depressant'),
    summary: (items) =>
      `You've selected ${items.length} items that all depress the central nervous system. Combined, they can cause excessive drowsiness, impaired coordination, slowed breathing, and in severe cases, respiratory depression.`,
    contextualRisk:
      'Risk is highest if you also drink alcohol, are over 65, have sleep apnea, or have liver or kidney impairment. Combining benzodiazepines or opioids with other sedatives carries an FDA black box warning for fatal respiratory depression.',
    goalFraming:
      'If your goal is restful sleep, sleep hygiene improvements (cooler room, consistent schedule, screens off 1 hour before bed) work without medication stacking. If your goal is anxiety relief, talk to a prescriber about a single coordinated treatment plan rather than combining multiple calming agents.',
    sources: ['FDA Black Box Warning — Benzodiazepine/Opioid Interaction 2016', 'Lexi-Interact 2024', 'Natural Medicines Database 2024'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 3 — Serotonin syndrome
  // Threshold 2 — acute risk that compounds within hours
  // ═══════════════════════════════════════════════════════════
  {
    id: 'serotonin_syndrome',
    icon: '🌀',
    title: 'Serotonin syndrome risk',
    severity: 'avoid',
    threshold: 2,
    matches: (medKey, med) => hasClass(med, 'serotonergic'),
    summary: (items) =>
      `You've selected ${items.length} items that all raise serotonin levels in the brain. Combining serotonergic substances can cause serotonin syndrome — a potentially life-threatening condition that develops over hours, not days.`,
    contextualRisk:
      'Warning signs: agitation, rapid heartbeat, sweating, tremor, muscle twitching, fever, confusion. Symptoms can escalate quickly. If you experience these signs after starting a new serotonergic substance, seek emergency medical care.',
    goalFraming:
      'If your goal is mood support and you are already on an SSRI or other serotonergic medication, talk to your prescriber before adding St. John\'s Wort, 5-HTP, tramadol, or another serotonergic substance. They can recommend a single coordinated approach.',
    sources: ['Boyer EW, Shannon M. N Engl J Med 2005 (serotonin syndrome review)', 'FDA Drug Safety Communication 2006', 'Lexi-Interact 2024'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 4 — Cardiovascular stress
  // Threshold 3 — dose-cumulative effect
  // ═══════════════════════════════════════════════════════════
  {
    id: 'cardiovascular_stress',
    icon: '🫀',
    title: 'Cardiovascular stress stack',
    severity: 'caution',
    threshold: 3,
    matches: (medKey, med) => hasAnyClass(med, ['sympathomimetic', 'bp_raiser']),
    summary: (items) =>
      `You've selected ${items.length} items that all raise blood pressure or heart rate. Combined, they may cause palpitations, elevated blood pressure, anxiety, or in rare cases, cardiac events.`,
    contextualRisk:
      'Risk is highest if you have high blood pressure, heart disease, diabetes, thyroid disorders, or take MAOI medications. Risk increases with caffeine on top of these.',
    goalFraming:
      'If your goal is daytime alertness, hydration, walking breaks, and consistent sleep raise energy without raising blood pressure. If your goal is nasal congestion relief, saline rinses and steam are options that do not stress the cardiovascular system.',
    sources: ['FDA OTC Monographs — Sympathomimetics', 'AHA/ACC Hypertension Guidelines 2024', 'Lexi-Interact 2024'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 5 — Liver stress
  // Threshold 3 — dose-cumulative effect
  // ═══════════════════════════════════════════════════════════
  {
    id: 'liver_stress',
    icon: '🫁',
    title: 'Liver stress stack',
    severity: 'caution',
    threshold: 3,
    matches: (medKey, med) => hasAnyClass(med, ['hepatotoxic', 'liver_metabolized']),
    summary: (items) =>
      `You've selected ${items.length} items that are either hepatotoxic at high doses or compete for the same liver metabolism pathways. Stacking these increases the burden on your liver and the risk of liver enzyme elevation or, rarely, liver injury.`,
    contextualRisk:
      'Risk is highest if you drink alcohol regularly, have existing liver disease, or are over 65. Acetaminophen is the most common cause of acute liver injury in the US — check all OTC cold/flu products for hidden acetaminophen before stacking.',
    goalFraming:
      'If your goal is pain or fever relief, choosing one medication and one supplement at a time (rather than multiple) reduces liver burden. Hydration and short courses of single-agent therapy are easier on the liver than long-term stacked regimens.',
    sources: ['LiverTox Database (NIH) 2024', 'Lexi-Interact 2024', 'Stockley\'s Drug Interactions'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 6 — Absorption block
  // Threshold 2 — timing problem, fires immediately
  // ═══════════════════════════════════════════════════════════
  {
    id: 'absorption_block',
    icon: '🥛',
    title: 'Absorption-blocking combination',
    severity: 'caution',
    threshold: 2,
    matches: (medKey, med) =>
      hasAnyClass(med, ['absorption_sensitive', 'absorption_blocker_mineral']),
    // Only fires when BOTH categories are present (one sensitive + one blocker)
    requiresMultipleClassTypes: ['absorption_sensitive', 'absorption_blocker_mineral'],
    summary: (items) =>
      `You've selected medications that interfere with each other's absorption when taken at the same time. Calcium, iron, magnesium, and antacids can bind to certain medications in the stomach, reducing how much actually gets absorbed.`,
    contextualRisk:
      'This is a timing problem, not a "don\'t combine" problem. The medications themselves can be taken together safely — they just need to be spaced apart. Levothyroxine, in particular, must be taken on an empty stomach at least 4 hours away from calcium, iron, antacids, or coffee.',
    goalFraming:
      'If your goal is taking both effectively, separate them by 4 hours minimum. Take the more time-sensitive medication (like levothyroxine) first thing in the morning on an empty stomach, then wait several hours before calcium, iron, or antacids.',
    sources: ['FDA Levothyroxine Prescribing Information', 'American Thyroid Association Guidelines 2024', 'Lexi-Interact 2024'],
  },

  // ═══════════════════════════════════════════════════════════
  // RULE 7 — Dehydration / diuretic stack
  // Threshold 3 — dose-cumulative effect
  // ═══════════════════════════════════════════════════════════
  {
    id: 'dehydration_diuretic',
    icon: '💧',
    title: 'Fluid and electrolyte stack',
    severity: 'caution',
    threshold: 3,
    matches: (medKey, med) => hasAnyClass(med, ['diuretic', 'electrolyte_loss']),
    summary: (items) =>
      `You've selected ${items.length} items that all affect fluid or electrolyte balance. Combined, they can cause dehydration, low potassium, dizziness on standing, or muscle cramps.`,
    contextualRisk:
      'Risk is highest in hot weather, during exercise, or if you have kidney disease. Older adults are more susceptible to dehydration-related falls and confusion.',
    goalFraming:
      'If your goal is blood pressure or edema control, your prescriber can recommend a single medication or a combination pill rather than stacking. Hydration and a balanced electrolyte intake (sodium, potassium, magnesium) help offset diuretic effects.',
    sources: ['AHA/ACC Hypertension Guidelines 2024', 'Lexi-Interact 2024'],
  },
];

// ─── Engine ───────────────────────────────────────────────────
/**
 * Evaluate which class rules fire for a given selection of meds.
 *
 * @param {string[]} selectedMedKeys - array of medsData keys
 * @returns {Array} warnings - sorted by severity (avoid first)
 *
 * Each warning has:
 *   id, icon, title, severity, summary, contextualRisk, goalFraming, sources,
 *   matchedItems: [{ key, name, brand }, ...]
 */
export function evaluateClassRules(selectedMedKeys) {
  if (!Array.isArray(selectedMedKeys) || selectedMedKeys.length === 0) return [];

  const selectedMeds = selectedMedKeys
    .map(key => ({ key, med: MEDS[key] }))
    .filter(({ med }) => !!med);

  const warnings = [];

  for (const rule of CLASS_RULES) {
    const matched = selectedMeds.filter(({ key, med }) => rule.matches(key, med));

    if (matched.length < rule.threshold) continue;

    // Special check: rules with `requiresMultipleClassTypes` must have items
    // from each listed class group present, not just N items from one class.
    if (Array.isArray(rule.requiresMultipleClassTypes)) {
      const allTypesPresent = rule.requiresMultipleClassTypes.every(className =>
        matched.some(({ med }) => hasClass(med, className))
      );
      if (!allTypesPresent) continue;
    }

    const matchedItems = matched.map(({ key, med }) => ({
      key,
      name: med.name,
      brand: med.brand,
    }));

    warnings.push({
      id: rule.id,
      icon: rule.icon,
      title: rule.title,
      severity: rule.severity,
      summary: typeof rule.summary === 'function' ? rule.summary(matchedItems) : rule.summary,
      contextualRisk: rule.contextualRisk,
      goalFraming: rule.goalFraming,
      sources: rule.sources,
      matchedItems,
    });
  }

  // Sort: avoid before caution
  return warnings.sort((a, b) => {
    if (a.severity === 'avoid' && b.severity !== 'avoid') return -1;
    if (b.severity === 'avoid' && a.severity !== 'avoid') return 1;
    return 0;
  });
}