// DRAFT / not verified / batch 4 kids cough-cold
// Cold & Flu · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never a sole
// Avoid driver and never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. Do not convert coldFluPicks.ts from this file.
//
// CLEAN PICKS STALE NOTE (do not edit live Clean Picks from this draft):
// coldFluPicks.ts still lists Genexa Kids Multi-Symptom as
// APAP 320mg + guaifenesin 100mg + DXM 5mg / 10mL. Current DailyMed SPL
// setid 2d918ec8-3098-1d09-e063-6294a90a9e8f is APAP 320mg + DXM 5mg / 10mL
// only — no guaifenesin. Fix that live file on a dedicated write; this draft
// does not list guaifenesin on KC1.
//
// FOUNDER CALLS (LOCKED):
// - KC1 Genexa Kids Multi-Symptom = Clean. Actives APAP + DXM only.
//   Inactives: organic agave, organic blueberry flavor, natural flavors,
//   purified water. Do not list guaifenesin.
// - KC49 Genexa Kids Cold Crush = Caution (maltodextrin). Do NOT extend the
//   adult Genexa ES Clean exception.
// - KC3 Chestal Kids Honey minAge 4 per SPL (not 2). Caution (sodium benzoate).
// - KC27 DayQuil Kids FREE OF ARTIFICIAL DYES & SUGAR = Avoid (sucralose + PG).
// - KC46 / KC47 Signature Care kids rows included (labels matched with setids).
// - KC5 ColdCalm meltaways = kids-usable Clean twin of the adult formula
//   (croscarmellose / lactose / Mg stearate). Separate from KC4 ColdCalm Kids
//   liquid (Caution — alcohol vehicle).
// - Badger Aromatic Chest Rub: ONE Clean formula already in batch 3 — do NOT
//   add a kids mirror row (same formulaId; no second barcode needed).
// - Vicks Children's VapoRub / Equate Children's vaporizing rub / Vicks
//   BabyRub = SKIP (unclear; no petrolatum grade).
// - KC53 Walgreens Children's Chest Rub = INCLUDE as Avoid (TiO2 High).
//   This is not the skipped petrolatum-only pair.
//
// SKIPPED (unclear / founder skip — do not invent Clean):
// - KC51 Vicks Children's VapoRub — petrolatum grade unclear.
// - KC52 Equate Children's vaporizing rub — petrolatum grade unclear.
// - KC54 Vicks BabyRub — petrolatum grade unclear.
// - Badger kids mirror row — same formulaId as batch 3 Clean topical.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const COLD_FLU = 'Cold & Flu';
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const HERBAL = 'herbal' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  parabens: 'Methodology §5 High-tier (parabens)',
  propylGallate: 'Methodology §5 High-tier (propyl gallate — locked v1.6)',
  acek: 'Methodology §5 Moderate-risk (acesulfame potassium)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  cleared: 'Methodology §5 Cleared',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors)',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const GENEXA_MULTI = 'genexa-kids-multi-cold-flu-liquid';
const COLDCALM_MELTAWAYS = 'boiron-coldcalm-meltaways';
const CHESTAL_PELLETS = 'boiron-chestal-kids-pellets';

// Independently Clean rows in THIS batch only. Age-match: same-batch Cleans
// are minAge 4. 2+ Caution rows still list them with an explicit 4+ note
// (no 2+ Clean exists here). Form is labeled, not a hard filter (§6).

const MULTI_LIQUID_ALTS: CleanAlternative[] = [
  {
    productId: GENEXA_MULTI,
    rankReason:
      'Closest independently Clean kids Cold & Flu analog in this batch (conventional liquid, APAP + DXM, minAge 4). Form: liquid.',
  },
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'Independently Clean kids-usable homeopathic meltaway (minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Independently Clean kids cough pellet (minAge 4). Form: pellet — labeled, not a hard filter (§6).',
  },
];

const COUGH_ALTS: CleanAlternative[] = [
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Closest independently Clean kids cough analog in this batch (Chestal Kids pellets, minAge 4). Form: pellet — labeled, not a hard filter (§6).',
  },
  {
    productId: GENEXA_MULTI,
    rankReason:
      'Independently Clean kids conventional liquid (APAP + DXM, minAge 4). Different active mix — same Cold & Flu use-category. Form: liquid.',
  },
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'Independently Clean kids-usable homeopathic meltaway (minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
];

const HOMEOPATHIC_ALTS: CleanAlternative[] = [
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'Closest independently Clean homeopathic Cold & Flu peer in this batch (meltaway tablets, minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Independently Clean kids homeopathic cough peer (pellets, minAge 4). Form: pellet — labeled, not a hard filter (§6).',
  },
  {
    productId: GENEXA_MULTI,
    rankReason:
      'Independently Clean kids conventional liquid (APAP + DXM, minAge 4) if a non-homeopathic swap is preferred. Form: liquid.',
  },
];

const AGE2_HOMEOPATHIC_ALTS: CleanAlternative[] = [
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'No independently Clean 2+ Cold & Flu row in this batch. Closest Clean homeopathic peer is ColdCalm meltaways (minAge 4 — higher than this 2+ product; not an age-matched swap for ages 2–3). Form: meltaway tablet.',
  },
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Independently Clean kids cough pellets (minAge 4 — same 4+ floor). Form: pellet — labeled, not a hard filter (§6).',
  },
];

const AGE2_HERBAL_ALTS: CleanAlternative[] = [
  {
    productId: GENEXA_MULTI,
    rankReason:
      'No independently Clean 2+ Cold & Flu row in this batch. Closest Clean conventional analog is Genexa Kids Multi liquid (minAge 4 — higher than this 2+ product; not an age-matched swap for ages 2–3). Different actives (honey/herbal → APAP + DXM). Form: liquid.',
  },
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'Independently Clean kids-usable homeopathic meltaway (minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
];

const TOPICAL_ALTS: CleanAlternative[] = [
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'No independently Clean kids topical in this batch (Badger stays on the batch 3 adult formulaId — no kids mirror). Closest same-batch Clean Cold & Flu analog is ColdCalm meltaways (minAge 4). Form: meltaway tablet vs topical rub — labeled, not a hard filter (§6).',
  },
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Independently Clean kids cough analog (minAge 4). Form: pellet vs topical — labeled, not a hard filter (§6).',
  },
];

const NIGHT_ALTS: CleanAlternative[] = [
  {
    productId: COLDCALM_MELTAWAYS,
    rankReason:
      'Closest independently Clean kids Cold & Flu analog (minAge 4). No night-specific Clean in this batch; this meltaway is not a sedating night formula. Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: CHESTAL_PELLETS,
    rankReason:
      'Independently Clean kids cough analog (minAge 4). Form: pellet — labeled, not a hard filter (§6).',
  },
  {
    productId: GENEXA_MULTI,
    rankReason:
      'Independently Clean kids conventional liquid (APAP + DXM, minAge 4) — non-drowsy daytime multi, not a night formula. Form: liquid.',
  },
];

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function dyesPgSweet(
  setid: string,
  dyeNames: string[],
  extras: IngredientFlag[] = [],
): IngredientFlag[] {
  return [
    ...dyeNames.map((name) => flag(name, 'high', dailymed(setid, METH.dyes))),
    flag('Propylene glycol', 'moderate', dailymed(setid, METH.pg)),
    flag('Sucralose', 'moderate', dailymed(setid, METH.sucralose)),
    flag('Sodium benzoate', 'limited', dailymed(setid, METH.benzoate)),
    flag('Flavor', 'limited', dailymed(setid, METH.flavors)),
    ...extras,
  ];
}

export const BATCH4_KIDS_COUGH_COLD: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: GENEXA_MULTI,
    productName: "Genexa Kids' Multi-Symptom Cold & Flu",
    brand: 'Genexa',
    category: COLD_FLU,
    formulaId: GENEXA_MULTI,
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '320mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        dailymed('2d918ec8-3098-1d09-e063-6294a90a9e8f', METH.organicFlavor),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        dailymed('2d918ec8-3098-1d09-e063-6294a90a9e8f', METH.organicFlavor),
      ),
      flag(
        'Natural flavors',
        'cleared',
        dailymed(
          '2d918ec8-3098-1d09-e063-6294a90a9e8f',
          'Founder call: this liquid stays Clean. Organic flavors / agave are Cleared; do not demerit the accompanying "natural flavors" line on this SKU.',
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('2d918ec8-3098-1d09-e063-6294a90a9e8f', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: draft Clean. DailyMed actives are acetaminophen 320 mg + dextromethorphan HBr 5 mg per 10 mL only — do not list guaifenesin. Live Clean Picks still shows an older APAP + guaifenesin + DXM trio (stale; fix on that file write). Organic agave + organic blueberry flavor + natural flavors + purified water. Ages 4+ (under 4: do not use). Always dose by weight / the enclosed cup.',
    retailers: ['Walmart', 'Whole Foods', 'CVS', 'Walgreens', 'Target'],
    sourcesGeneral: [
      'DailyMed setid 2d918ec8-3098-1d09-e063-6294a90a9e8f (draft, not verified)',
    ],
  },
  {
    id: COLDCALM_MELTAWAYS,
    productName: 'Boiron Coldcalm Meltaway Tablets',
    brand: 'Boiron',
    category: COLD_FLU,
    formulaId: COLDCALM_MELTAWAYS,
    audience: KIDS,
    minAge: 4,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '3C HPUS' },
      { name: 'Apis mellifica', strength: '6C HPUS' },
      { name: 'Belladonna', strength: '6C HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '3C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6C HPUS' },
      { name: 'Kali bichromicum', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '3C HPUS' },
      { name: 'Phytolacca decandra', strength: '6C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Croscarmellose sodium',
        'cleared',
        dailymed('4ae2f15e-45f3-e2e4-e063-6294a90a92bc', METH.cleared),
      ),
      flag(
        'Lactose',
        'cleared',
        dailymed('4ae2f15e-45f3-e2e4-e063-6294a90a92bc', METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed('4ae2f15e-45f3-e2e4-e063-6294a90a92bc', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: kids-usable Clean twin of the adult meltaway formula — inactives match (croscarmellose sodium, lactose, magnesium stearate). Cited setid 4ae2f15e is the current adult-only 18+ SPL; the 4+ / 6+ meltaway SPL (af4a4765) shares the same three inactives and supplies the kids minAge 4 directions. Separate from ColdCalm Kids liquid (KC4, alcohol vehicle). Homeopathic — cleanliness only, no efficacy claim. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid 4ae2f15e-45f3-e2e4-e063-6294a90a92bc (inactives); af4a4765-8255-44fb-821c-4345a2a45e2a (4+ directions) — draft, not verified',
      CARLSTON,
    ],
  },
  {
    id: CHESTAL_PELLETS,
    productName: 'Boiron Chestal Kids Cold and Cough Pellets',
    brand: 'Boiron',
    category: COLD_FLU,
    formulaId: CHESTAL_PELLETS,
    audience: KIDS,
    minAge: 4,
    form: 'pellet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Lactose',
        'cleared',
        dailymed('2bd87a10-af3d-62dc-e063-6394a90ab125', METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        dailymed('2bd87a10-af3d-62dc-e063-6394a90ab125', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'Draft Clean on inactives (lactose, sucrose). Homeopathic pellets — cleanliness only, no efficacy claim. Ages 4+ (under 4: ask a doctor). Separate formula from Chestal Kids Honey syrup (KC3, benzoate Caution). ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart'],
    sourcesGeneral: [
      'DailyMed setid 2bd87a10-af3d-62dc-e063-6394a90ab125 (draft, not verified)',
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'zarbees-childrens-cough-immune',
    productName: "Zarbee's Children's Cough Syrup + Immune",
    brand: "Zarbee's",
    category: COLD_FLU,
    formulaId: 'zarbees-childrens-cough-immune',
    audience: KIDS,
    minAge: 2,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Dark honey', strength: 'label serving' },
      { name: 'Ivy leaf extract', strength: 'label serving' },
      { name: 'Elderberry', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
      { name: 'Chamomile', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Natural flavor',
        'limited',
        `Zarbee's / Clean Picks label; ${METH.flavors}`,
      ),
      flag(
        'Citric acid',
        'cleared',
        `Zarbee's / Clean Picks label; ${METH.cleared}`,
      ),
      flag(
        'Purified water',
        'cleared',
        `Zarbee's / Clean Picks label; ${METH.cleared}`,
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL / Clean Picks Caution draft: natural flavor is Limited. Honey-based — not for infants under 12 months. No DailyMed SPL (dietary supplement). Same-batch Cleans start at minAge 4 — not an age-matched 2–3 swap.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Walmart'],
    cleanAlternatives: AGE2_HERBAL_ALTS,
    sourcesGeneral: [
      "Clean Picks coldFluPicks.ts + Zarbee's Children's Cough + Immune label (draft, not verified; no DailyMed SPL)",
    ],
  },
  {
    id: 'boiron-chestal-kids-honey',
    productName: "Boiron Chestal Kids Cold and Cough Honey",
    brand: 'Boiron',
    category: COLD_FLU,
    formulaId: 'boiron-chestal-kids-honey',
    audience: KIDS,
    minAge: 4,
    form: 'syrup',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Dulcamara', strength: '5C HPUS' },
      { name: 'Ferrum phosphoricum', strength: '9C HPUS' },
      { name: 'Hydrastis canadensis', strength: '9C HPUS' },
      { name: 'Kali bichromicum', strength: '9C HPUS' },
      { name: 'Nux vomica', strength: '9C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4e8ff89e-f9e8-8618-e063-6294a90a6b3e', METH.benzoate),
      ),
      flag(
        'Citric acid',
        'cleared',
        dailymed('4e8ff89e-f9e8-8618-e063-6294a90a6b3e', METH.cleared),
      ),
      flag(
        'Honey',
        'cleared',
        dailymed('4e8ff89e-f9e8-8618-e063-6294a90a6b3e', METH.cleared),
      ),
      flag(
        'Sucrose',
        'cleared',
        dailymed('4e8ff89e-f9e8-8618-e063-6294a90a6b3e', METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('4e8ff89e-f9e8-8618-e063-6294a90a6b3e', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Caution (sodium benzoate). minAge is 4 per current SPL — not 2 (live Clean Picks ageBadge 2+ is stale). Alcohol appears on the inactive list and is not in Methodology §5 (ungraded; v1.6 intake). Honey — not for infants. Separate from Chestal Kids pellets (KC50, Clean). ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart'],
    cleanAlternatives: HOMEOPATHIC_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4e8ff89e-f9e8-8618-e063-6294a90a6b3e (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'boiron-coldcalm-kids-liquid',
    productName: 'Boiron ColdCalm Kids',
    brand: 'Boiron',
    category: COLD_FLU,
    formulaId: 'boiron-coldcalm-kids-liquid',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '3C HPUS' },
      { name: 'Apis mellifica', strength: '15C HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '3C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6C HPUS' },
      { name: 'Kali bichromicum', strength: '6C HPUS' },
      { name: 'Nux vomica', strength: '3C HPUS' },
      { name: 'Phytolacca decandra', strength: '6C HPUS' },
      { name: 'Pulsatilla', strength: '6C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Purified water',
        'cleared',
        dailymed('6b3d8ff0-065d-85c4-e053-2991aa0a1788', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Caution — alcohol vehicle (alcohol + purified water). Ethyl alcohol is not in Methodology §5 (ungraded; v1.6 intake); draft follows the locked Caution call, not a scored Avoid. Separate from ColdCalm meltaways (KC5, Clean). Ages 4+ (under 4: ask a doctor). ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Whole Foods'],
    cleanAlternatives: HOMEOPATHIC_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6b3d8ff0-065d-85c4-e053-2991aa0a1788 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'hylands-4kids-cold-n-cough',
    productName: "Hyland's 4 Kids Cold 'n Cough (Grape)",
    brand: "Hyland's",
    category: COLD_FLU,
    formulaId: 'hylands-4kids-cold-n-cough',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Phosphorus', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Natural grape flavor',
        'limited',
        dailymed('798e2a4d-da2d-4bbd-a9b8-574490ef7357', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('798e2a4d-da2d-4bbd-a9b8-574490ef7357', METH.benzoate),
      ),
      flag(
        'Glycyrrhiza extract',
        'cleared',
        dailymed(
          '798e2a4d-da2d-4bbd-a9b8-574490ef7357',
          'Methodology §5 Cleared (glycyrrhiza / licorice extract — named botanical; locked Sept 14, 2026). Licorice extract. Very high intakes of glycyrrhizin can affect blood pressure and potassium — that is not this syrup dose.',
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        dailymed('798e2a4d-da2d-4bbd-a9b8-574490ef7357', METH.cleared),
      ),
      flag(
        'Glycerin',
        'cleared',
        dailymed('798e2a4d-da2d-4bbd-a9b8-574490ef7357', METH.cleared),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('798e2a4d-da2d-4bbd-a9b8-574490ef7357', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'Natural grape flavor + sodium benzoate (1+1 → Caution). Glycyrrhiza extract is Cleared — do not Caution on licorice alone. Licorice extract. Very high intakes of glycyrrhizin can affect blood pressure and potassium — that is not this syrup dose. Grape daytime liquid only; grape packets share this formulaId. Do not reuse for Original or Nighttime. Ages 2+. Same-batch Cleans start at minAge 4. ' +
      CARLSTON,
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Whole Foods'],
    cleanAlternatives: AGE2_HOMEOPATHIC_ALTS,
    sourcesGeneral: [
      'DailyMed setid 798e2a4d-da2d-4bbd-a9b8-574490ef7357 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'genexa-kids-cold-crush',
    productName: 'Genexa Kids Cold Crush',
    brand: 'Genexa',
    category: COLD_FLU,
    formulaId: 'genexa-kids-cold-crush',
    audience: KIDS,
    minAge: 4,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '12X HPUS' },
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Bryonia alba', strength: '9X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Echinacea angustifolia', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Ipecacuanha', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '9X HPUS' },
      { name: 'Sambucus nigra', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Maltodextrin (organic)',
        'limited',
        dailymed('ae095073-27d1-0aa5-e053-2a95a90a86d4', METH.maltodextrin),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        dailymed('ae095073-27d1-0aa5-e053-2a95a90a86d4', METH.cleared),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        dailymed('ae095073-27d1-0aa5-e053-2a95a90a86d4', METH.cleared),
      ),
      flag(
        'Organic açaí berry flavor',
        'cleared',
        dailymed('ae095073-27d1-0aa5-e053-2a95a90a86d4', METH.organicFlavor),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        dailymed('ae095073-27d1-0aa5-e053-2a95a90a86d4', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Caution (maltodextrin). Do NOT extend the adult Genexa Extra Strength Clean exception to this chewable. Organic maltodextrin is still the locked Caution driver. Ages 4+ (under 4: ask a doctor). ' +
      CARLSTON,
    retailers: ['Walmart', 'Whole Foods', 'Target'],
    cleanAlternatives: HOMEOPATHIC_ALTS,
    sourcesGeneral: [
      'DailyMed setid ae095073-27d1-0aa5-e053-2a95a90a86d4 (draft, not verified)',
      CARLSTON,
    ],
  },

  // ── Avoid nationals ──────────────────────────────────────
  {
    id: 'mucinex-childrens-multi-cold-liquid',
    productName: "Children's Mucinex Multi-Symptom Cold",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-multi-cold-liquid',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet('60daf6e2-ded8-44e6-bd8d-9d221384adde', ['FD&C Red No. 40'], [
        flag(
          'Propyl gallate',
          'high',
          dailymed('60daf6e2-ded8-44e6-bd8d-9d221384adde', METH.propylGallate),
        ),
        flag(
          'Sorbitol',
          'limited',
          dailymed('60daf6e2-ded8-44e6-bd8d-9d221384adde', METH.sorbitol),
        ),
      ]),
    ],
    verdict: 'avoid',
    honestNote:
      'Red 40 and propyl gallate are each High-tier; oral PG + sucralose add Moderate points. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 60daf6e2-ded8-44e6-bd8d-9d221384adde (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-multi-daynight-kit',
    productName: "Children's Mucinex Multi-Symptom Cold Day & Night Kit",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-multi-daynight-kit',
    audience: KIDS,
    minAge: 4,
    form: 'liquid kit',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr (day)', strength: '5mg / 5mL' },
      { name: 'Guaifenesin (day)', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl (day)', strength: '2.5mg / 5mL' },
      {
        name: 'Night bottle (APAP / diphenhydramine / PE family on kit carton)',
        strength: 'see night Drug Facts',
      },
    ],
    inactiveIngredients: [
      ...dyesPgSweet('85f7d60b-32ec-4ec2-86ec-f677093bce1d', ['FD&C Red No. 40'], [
        flag(
          'Propyl gallate',
          'high',
          dailymed('85f7d60b-32ec-4ec2-86ec-f677093bce1d', METH.propylGallate),
        ),
      ]),
    ],
    verdict: 'avoid',
    honestNote:
      'Day/night kit. Daytime bottle matches the Multi-Symptom Cold Red 40 + propyl gallate + PG + sucralose family. Night bottle is a separate night formula on the same carton — Avoid already stands on the day inactives. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 85f7d60b-32ec-4ec2-86ec-f677093bce1d (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-freefrom-multi',
    productName: "Mucinex Children's FreeFrom Multi-Symptom Cold, Flu & Sore Throat",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-freefrom-multi',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 10mL' },
      { name: 'Guaifenesin', strength: '200mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.benzoate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.sorbitol),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('14c56f3d-67fd-45ef-a16b-f27604722883', METH.maltodextrin),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dye-free FreeFrom trap — sucralose + oral PG (2+2 → Avoid) plus flavors / benzoate / sorbitol / maltodextrin. Cochineal carmine is on this SPL (v1.6 population Caution, not an Avoid driver). Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 14c56f3d-67fd-45ef-a16b-f27604722883 (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-freefrom-stuffy',
    productName: "Mucinex Children's FreeFrom Multi-Symptom Cold & Stuffy Nose",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-freefrom-stuffy',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('c07dad99-87b0-419b-9230-7c22a77ecf9e', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('c07dad99-87b0-419b-9230-7c22a77ecf9e', METH.sucralose),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('c07dad99-87b0-419b-9230-7c22a77ecf9e', METH.benzoate),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('c07dad99-87b0-419b-9230-7c22a77ecf9e', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('c07dad99-87b0-419b-9230-7c22a77ecf9e', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Separate FreeFrom formulaId from the multi-flu bottle. Sucralose + oral PG → Avoid without a synthetic dye. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid c07dad99-87b0-419b-9230-7c22a77ecf9e (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-fever-sore-cough',
    productName: "Mucinex Children's Fever, Sore Throat & Cough",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-fever-sore-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      '1538a75d-582a-9501-e063-6394a90a6c55',
      ['D&C Yellow No. 10', 'FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('1538a75d-582a-9501-e063-6394a90a6c55', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote:
      'Yellow 10 + Red 40 are High-tier; PG + sucralose are Moderate. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1538a75d-582a-9501-e063-6394a90a6c55 (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-mighty-chews-cough',
    productName: "Mucinex Children's Mighty Chews Cough",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-mighty-chews-cough',
    audience: KIDS,
    minAge: 6,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dextromethorphan HBr', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('155e07b3-0a08-3be8-e063-6394a90a7635', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('155e07b3-0a08-3be8-e063-6394a90a7635', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('155e07b3-0a08-3be8-e063-6394a90a7635', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('155e07b3-0a08-3be8-e063-6394a90a7635', METH.maltodextrin),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Mighty Chews cough — Red 40 High-tier. Form of the Clean swaps is liquid / pellet / meltaway, not a chew. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 155e07b3-0a08-3be8-e063-6394a90a7635 (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-mighty-chews-night',
    productName: "Mucinex Children's Mighty Chews Cough Nighttime",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-mighty-chews-night',
    audience: KIDS,
    minAge: 6,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '10mg' },
      { name: 'Doxylamine succinate', strength: '6.25mg' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('156033ae-b16a-007b-e063-6294a90a7445', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('156033ae-b16a-007b-e063-6294a90a7445', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('156033ae-b16a-007b-e063-6294a90a7445', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('156033ae-b16a-007b-e063-6294a90a7445', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('156033ae-b16a-007b-e063-6294a90a7445', METH.maltodextrin),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Night Mighty Chews — Blue 1 + Red 40. No night-specific Clean in this batch. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 156033ae-b16a-007b-e063-6294a90a7445 (draft, not verified)',
    ],
  },
  {
    id: 'mucinex-childrens-mighty-chews-cold-flu',
    productName: "Mucinex Children's Mighty Chews Cold & Flu",
    brand: 'Mucinex',
    category: COLD_FLU,
    formulaId: 'mucinex-childrens-mighty-chews-cold-flu',
    audience: KIDS,
    minAge: 6,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dextromethorphan HBr', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('2ce20ab5-5f2d-1c97-e063-6394a90ad67b', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('2ce20ab5-5f2d-1c97-e063-6394a90ad67b', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('2ce20ab5-5f2d-1c97-e063-6394a90ad67b', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('2ce20ab5-5f2d-1c97-e063-6394a90ad67b', METH.maltodextrin),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'DailyMed title lists APAP + DXM; the current SPL Drug Facts active line on this setid is dextromethorphan HBr 10 mg only. Red 40 High-tier. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 2ce20ab5-5f2d-1c97-e063-6394a90ad67b (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-childrens-dm-liquid',
    productName: "Children's Robitussin Cough & Chest Congestion DM",
    brand: 'Robitussin',
    category: COLD_FLU,
    formulaId: 'robitussin-childrens-dm-liquid',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        'b9772292-9eb6-47cf-abb8-007c25478090',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Polyethylene glycol',
            'moderate',
            dailymed('b9772292-9eb6-47cf-abb8-007c25478090', METH.peg),
          ),
          flag(
            'Sorbitol',
            'limited',
            dailymed('b9772292-9eb6-47cf-abb8-007c25478090', METH.sorbitol),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Blue 1 + Red 40 High-tier; PEG + PG + sucralose are Moderate. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid b9772292-9eb6-47cf-abb8-007c25478090 (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-childrens-honey-night-dm',
    productName: "Children's Robitussin Honey Nighttime Cough DM",
    brand: 'Robitussin',
    category: COLD_FLU,
    formulaId: 'robitussin-childrens-honey-night-dm',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '15mg / 10mL' },
      { name: 'Doxylamine succinate', strength: '6.25mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('6afaf85b-bf0c-4c99-acf3-a34f06be20f1', METH.pg),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('6afaf85b-bf0c-4c99-acf3-a34f06be20f1', METH.peg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('6afaf85b-bf0c-4c99-acf3-a34f06be20f1', METH.sucralose),
      ),
      flag(
        'Natural and artificial flavors',
        'limited',
        dailymed('6afaf85b-bf0c-4c99-acf3-a34f06be20f1', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('6afaf85b-bf0c-4c99-acf3-a34f06be20f1', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Honey nighttime DM — no synthetic dye on this SPL; sucralose + PG + PEG still stack to Avoid. Honey is Cleared. Zinc gluconate is on the inactive list and is parked as a nutrient/active (Methodology §5). Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6afaf85b-bf0c-4c99-acf3-a34f06be20f1 (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-childrens-12hr',
    productName: "Children's Robitussin 12 Hour Cough Relief",
    brand: 'Robitussin',
    category: COLD_FLU,
    formulaId: 'robitussin-childrens-12hr',
    audience: KIDS,
    minAge: 4,
    form: 'ER suspension',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      {
        name: 'Dextromethorphan polistirex',
        strength: '30mg / 5mL (as HBr equivalent)',
      },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30',
        'high',
        dailymed('6bcad434-5714-443c-ba83-ed534df9f20a', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('6bcad434-5714-443c-ba83-ed534df9f20a', METH.dyes),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('6bcad434-5714-443c-ba83-ed534df9f20a', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('6bcad434-5714-443c-ba83-ed534df9f20a', METH.parabens),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('6bcad434-5714-443c-ba83-ed534df9f20a', METH.ps80),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Grape 12-hour polistirex — lake dyes + parabens are High-tier. Sodium metabisulfite is on the SPL (v1.6 sulfite population Caution, not the Avoid driver). HFCS is parked / ungraded. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 6bcad434-5714-443c-ba83-ed534df9f20a (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-childrens-long-acting',
    productName: "Children's Robitussin Cough Long-Acting",
    brand: 'Robitussin',
    category: COLD_FLU,
    formulaId: 'robitussin-childrens-long-acting',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dextromethorphan HBr', strength: '15mg / 10mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('75bc7827-4439-e6a8-a65c-7154d5592e58', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('75bc7827-4439-e6a8-a65c-7154d5592e58', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('75bc7827-4439-e6a8-a65c-7154d5592e58', METH.saccharin),
      ),
      flag(
        'Artificial flavor',
        'limited',
        dailymed('75bc7827-4439-e6a8-a65c-7154d5592e58', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('75bc7827-4439-e6a8-a65c-7154d5592e58', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Red 40 High-tier. HFCS is on this label and is parked / ungraded — Avoid already stands on dye + PG + saccharin. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 75bc7827-4439-e6a8-a65c-7154d5592e58 (draft, not verified)',
    ],
  },
  {
    id: 'robitussin-childrens-night-long-dm',
    productName: "Children's Robitussin Nighttime Cough Long-Acting DM",
    brand: 'Robitussin',
    category: COLD_FLU,
    formulaId: 'robitussin-childrens-night-long-dm',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Chlorpheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '15mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      '8a8380f4-fa8a-4cca-8b8f-f8d7c5a33f9c',
      ['FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('8a8380f4-fa8a-4cca-8b8f-f8d7c5a33f9c', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote: 'Night long-acting DM — Red 40 + PG + sucralose. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 8a8380f4-fa8a-4cca-8b8f-f8d7c5a33f9c (draft, not verified)',
    ],
  },
  {
    id: 'delsym-12hr-grape-or-orange',
    productName: 'Delsym 12-Hour Cough Relief (Grape or Orange)',
    brand: 'Delsym',
    category: COLD_FLU,
    formulaId: 'delsym-12hr-grape-or-orange',
    audience: KIDS,
    minAge: 4,
    form: 'ER suspension',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      {
        name: 'Dextromethorphan polistirex',
        strength: '30mg / 5mL (as HBr equivalent)',
      },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.dyes),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.parabens),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.ps80),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('234e6a2c-a280-4a39-8777-9316e9d681fb', METH.pg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kids-usable 12-hour row (directions down to age 4) for the same grape/orange family as the batch 3 adult grape row. Grape SPL (setid 234e6a2c): Red 33 + Blue 1 + parabens. Orange SPL (setid ce4b477c) uses Yellow 6 and is the same Avoid family. HFCS is parked / ungraded. Pack flavors share this formulaId for grading.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 234e6a2c-a280-4a39-8777-9316e9d681fb (grape); ce4b477c-430e-40a3-b247-b3914ef17793 (orange) — draft, not verified',
    ],
  },
  {
    id: 'delsym-childrens-cough-chest-dm',
    productName: "Children's Delsym Cough Plus Chest Congestion DM",
    brand: 'Delsym',
    category: COLD_FLU,
    formulaId: 'delsym-childrens-cough-chest-dm',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet('d26b5143-aa07-4114-a6ba-4f503aadd46f', ['FD&C Red No. 40'], [
        flag(
          'Propyl gallate',
          'high',
          dailymed('d26b5143-aa07-4114-a6ba-4f503aadd46f', METH.propylGallate),
        ),
        flag(
          'Sorbitol',
          'limited',
          dailymed('d26b5143-aa07-4114-a6ba-4f503aadd46f', METH.sorbitol),
        ),
      ]),
    ],
    verdict: 'avoid',
    honestNote:
      'Children\'s Delsym chest DM — Red 40 + propyl gallate. Separate from 12-hour polistirex. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid d26b5143-aa07-4114-a6ba-4f503aadd46f (draft, not verified)',
    ],
  },
  {
    id: 'delsym-childrens-cough-cold-night',
    productName: "Children's Delsym Cough Plus Cold Night Time",
    brand: 'Delsym',
    category: COLD_FLU,
    formulaId: 'delsym-childrens-cough-cold-night',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 10mL' },
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        '00689aa5-ed39-4c9a-92b8-105d2c0e2e15',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('00689aa5-ed39-4c9a-92b8-105d2c0e2e15', METH.propylGallate),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Night Delsym kids — Blue 1 + Red 40 + propyl gallate. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 00689aa5-ed39-4c9a-92b8-105d2c0e2e15 (draft, not verified)',
    ],
  },
  {
    id: 'dimetapp-cold-cough-liquid',
    productName: "Children's Dimetapp Cold & Cough",
    brand: 'Dimetapp',
    category: COLD_FLU,
    formulaId: 'dimetapp-cold-cough-liquid',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Brompheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      'cc09a8c5-d173-4261-b838-96e6a16e2ff9',
      ['FD&C Blue No. 1', 'FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('cc09a8c5-d173-4261-b838-96e6a16e2ff9', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote: 'Dimetapp grape-style liquid — Blue 1 + Red 40. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid cc09a8c5-d173-4261-b838-96e6a16e2ff9 (draft, not verified)',
    ],
  },
  {
    id: 'dimetapp-cold-allergy-liquid',
    productName: "Children's Dimetapp Cold & Allergy",
    brand: 'Dimetapp',
    category: COLD_FLU,
    formulaId: 'dimetapp-cold-allergy-liquid',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Brompheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      '47317865-4310-4f07-8815-f3130963307d',
      ['FD&C Blue No. 1', 'FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('47317865-4310-4f07-8815-f3130963307d', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote:
      'Cold & Allergy — same Blue 1 / Red 40 / PG / sucralose family as Cold & Cough, different actives (no DXM). Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 47317865-4310-4f07-8815-f3130963307d (draft, not verified)',
    ],
  },
  {
    id: 'dimetapp-night-cold-cough',
    productName: "Children's Dimetapp Nighttime Cold & Cough",
    brand: 'Dimetapp',
    category: COLD_FLU,
    formulaId: 'dimetapp-night-cold-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 10mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        '179115ad-d610-99b2-e063-6294a90ae711',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('179115ad-d610-99b2-e063-6294a90ae711', METH.propylGallate),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Nighttime Cold & Cough (diphenhydramine only on this SPL). Nighttime Cold & Congestion (setid 96a1055f) adds phenylephrine on the same inactive family. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 179115ad-d610-99b2-e063-6294a90ae711 (draft, not verified)',
    ],
  },
  {
    id: 'dayquil-kids-cold-cough-fever-dyed',
    productName: "Vicks DayQuil Kids Cold & Cough + Fever",
    brand: 'Vicks',
    category: COLD_FLU,
    formulaId: 'dayquil-kids-cold-cough-fever-dyed',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        '1a01b294-a5ee-ab35-e063-6394a90a4a1a',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Saccharin sodium',
            'moderate',
            dailymed('1a01b294-a5ee-ab35-e063-6394a90a4a1a', METH.saccharin),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Dyed DayQuil Kids fever/cough — Blue 1 + Red 40. Labeled dose starts at 6 (4–6: ask a doctor). Separate from the dye-free bottle (KC27).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1a01b294-a5ee-ab35-e063-6394a90a4a1a (draft, not verified)',
    ],
  },
  {
    id: 'dayquil-nyquil-kids-berry-cold-cough',
    productName: "Vicks DayQuil / NyQuil Kids Berry Cold & Cough",
    brand: 'Vicks',
    category: COLD_FLU,
    formulaId: 'dayquil-nyquil-kids-berry-cold-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid kit',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Chlorpheniramine maleate', strength: '2mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '15mg / 15mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet('02fbe8b3-49e2-8712-e063-6294a90add50', ['FD&C Red No. 40'], [
        flag(
          'Saccharin sodium',
          'moderate',
          dailymed('02fbe8b3-49e2-8712-e063-6294a90add50', METH.saccharin),
        ),
      ]),
    ],
    verdict: 'avoid',
    honestNote:
      'Berry kids day/night kit representative. This SPL lists chlorpheniramine + DXM with Red 40 + PG + sucralose + saccharin. Kit cartons may pair a day mucus bottle — Avoid already stands on these inactives. Ages 6+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 02fbe8b3-49e2-8712-e063-6294a90add50 (draft, not verified)',
    ],
  },
  {
    id: 'dayquil-kids-dye-free-cold-cough-mucus',
    productName:
      'Vicks DayQuil Kids FREE OF ARTIFICIAL DYES & SUGAR Cold & Cough + Mucus',
    brand: 'Vicks',
    category: COLD_FLU,
    formulaId: 'dayquil-kids-dye-free-cold-cough-mucus',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Guaifenesin', strength: '200mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.saccharin),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('19b2422e-517c-8f94-e063-6394a90aba26', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Avoid (sucralose + PG). Dye-free / sugar-free marketing does not clear two Moderate sweeteners/solvents (plus saccharin). Ages 6+ (4–6: ask a doctor).',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 19b2422e-517c-8f94-e063-6394a90aba26 (draft, not verified)',
    ],
  },
  {
    id: 'sudafed-pe-childrens-cold-cough',
    productName: "Children's Sudafed PE Cold + Cough",
    brand: 'Sudafed',
    category: COLD_FLU,
    formulaId: 'sudafed-pe-childrens-cold-cough',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('20e45243-3989-413a-bcf1-49d754ff2e44', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Blue 1 + Red 40 High-tier. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 20e45243-3989-413a-bcf1-49d754ff2e44 (draft, not verified)',
    ],
  },
  {
    id: 'sudafed-pe-childrens-nasal',
    productName: "Children's Sudafed PE Nasal Decongestant",
    brand: 'Sudafed',
    category: COLD_FLU,
    formulaId: 'sudafed-pe-childrens-nasal',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Red 40 High-tier. Ages 4+.',
    retailers: ['Walmart', 'Target', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4dfd46e4-b9f9-464d-aa47-e8fa9e526a5d (draft, not verified)',
    ],
  },
  {
    id: 'sudafed-childrens-pseudo-liquid',
    productName: "Children's Sudafed Nasal Decongestant (Pseudoephedrine)",
    brand: 'Sudafed',
    category: COLD_FLU,
    formulaId: 'sudafed-childrens-pseudo-liquid',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Pseudoephedrine HCl', strength: '15mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.dyes),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.saccharin),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.peg),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('52e9307b-ad38-4f65-bb2f-4fa262e82010', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Pseudoephedrine kids liquid — Blue 1 + Red 40. Poloxamer 407 is on the SPL and is not in Methodology §5 (ungraded). Ages 4+.',
    retailers: ['Walmart', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 52e9307b-ad38-4f65-bb2f-4fa262e82010 (draft, not verified)',
    ],
  },
  {
    id: 'pediacare-cough-congestion',
    productName: "PediaCare Children's Cough & Congestion (Grape)",
    brand: 'PediaCare',
    category: COLD_FLU,
    formulaId: 'pediacare-cough-congestion',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'Acesulfame potassium',
        'moderate',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.acek),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.saccharin),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.pg),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.peg),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('9576723b-748c-45e7-bc0d-cc109b9f6735', METH.benzoate),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'No synthetic dye on this grape SPL — Ace-K + saccharin + PG + PEG still stack to Avoid. Ages 4+.',
    retailers: ['Walmart', 'CVS', 'Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 9576723b-748c-45e7-bc0d-cc109b9f6735 (draft, not verified)',
    ],
  },
  {
    id: 'pediacare-cough-cold',
    productName: "PediaCare Children's Cough & Cold (Grape)",
    brand: 'PediaCare',
    category: COLD_FLU,
    formulaId: 'pediacare-cough-cold',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Brompheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      'fabafdc1-9dd8-4258-af49-bab1e29ad109',
      ['FD&C Blue No. 1', 'FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('fabafdc1-9dd8-4258-af49-bab1e29ad109', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote: 'Dimetapp-style grape — Blue 1 + Red 40. Ages 6+.',
    retailers: ['Walmart', 'CVS', 'Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid fabafdc1-9dd8-4258-af49-bab1e29ad109 (draft, not verified)',
    ],
  },
  {
    id: 'equate-childrens-cold-cough',
    productName: "Equate Children's Cold & Cough",
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-childrens-cold-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Brompheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.pg),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.saccharin),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('24758ab0-ba08-4b4a-9861-449612bdb89c', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Walmart kids cold/cough — Blue 1 + Red 40. Ages 6+.',
    retailers: ['Walmart'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 24758ab0-ba08-4b4a-9861-449612bdb89c (draft, not verified)',
    ],
  },
  {
    id: 'equate-childrens-cough-congestion-dn',
    productName: "Equate Children's Multi-Symptom Cold Daytime & Nighttime",
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-childrens-cough-congestion-dn',
    audience: KIDS,
    minAge: 4,
    form: 'liquid kit',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr (day)', strength: '5mg / 5mL' },
      { name: 'Guaifenesin (day)', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl (day)', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.saccharin),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('177e3247-402d-98e4-e063-6294a90ae068', METH.parabens),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Day/night kids multi kit. Daytime inactives include Red 33 / Blue 1 / Red 40 + parabens + propyl gallate + PG + sucralose. Night bottle shares the dye/PG family. Daytime chart starts at 4.',
    retailers: ['Walmart'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 177e3247-402d-98e4-e063-6294a90ae068 (draft, not verified)',
    ],
  },
  {
    id: 'equate-childrens-multi-night',
    productName: "Equate Children's Multi-Symptom Cold Nighttime",
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-childrens-multi-night',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 10mL' },
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 10mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 10mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        'bfdaec98-24fe-47e1-ad32-dc2ddc4ce8ee',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('bfdaec98-24fe-47e1-ad32-dc2ddc4ce8ee', METH.propylGallate),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote: 'Nighttime multi — Blue 1 + Red 40 + propyl gallate. Ages 6+.',
    retailers: ['Walmart'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid bfdaec98-24fe-47e1-ad32-dc2ddc4ce8ee (draft, not verified)',
    ],
  },
  {
    id: 'equate-kids-dex-cough-gels',
    productName: 'Equate Kids Daytime Dex Cough Gels',
    brand: 'Equate',
    category: COLD_FLU,
    formulaId: 'equate-kids-dex-cough-gels',
    audience: KIDS,
    minAge: 6,
    form: 'chewable',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Dextromethorphan HBr', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('37269cd6-1528-9879-e063-6394a90a2b54', METH.sucralose),
      ),
      flag(
        'Natural & artificial flavors',
        'limited',
        dailymed('37269cd6-1528-9879-e063-6394a90a2b54', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Chewable cough gels — sucralose + flavors (2+1 → Avoid). Beta-carotene is on the SPL as a color (v1.6 population Caution, not the Avoid driver). Medium-chain triglycerides are not in Methodology §5 (ungraded). Ages 6+.',
    retailers: ['Walmart'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 37269cd6-1528-9879-e063-6394a90a2b54 (draft, not verified)',
    ],
  },
  {
    id: 'upup-childrens-multi-cold',
    productName: "up & up Daytime Children's Multi-Symptom Cold",
    brand: 'up & up',
    category: COLD_FLU,
    formulaId: 'upup-childrens-multi-cold',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        'a2d99bc8-7295-4922-acff-0cb02c91273c',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('a2d99bc8-7295-4922-acff-0cb02c91273c', METH.propylGallate),
          ),
          flag(
            'Sorbitol',
            'limited',
            dailymed('a2d99bc8-7295-4922-acff-0cb02c91273c', METH.sorbitol),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Target kids multi — Blue 1 + Red 40 + propyl gallate. Ages 4+.',
    retailers: ['Target'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid a2d99bc8-7295-4922-acff-0cb02c91273c (draft, not verified)',
    ],
  },
  {
    id: 'cvs-childrens-cough-relief-dm',
    productName: "CVS Children's Cough Relief",
    brand: 'CVS Health',
    category: COLD_FLU,
    formulaId: 'cvs-childrens-cough-relief-dm',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      'fe12f3bd-3237-42d1-aec5-c831b9637175',
      ['FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('fe12f3bd-3237-42d1-aec5-c831b9637175', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote: 'CVS kids cough DM — Red 40 + PG + sucralose. Ages 4+.',
    retailers: ['CVS'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid fe12f3bd-3237-42d1-aec5-c831b9637175 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-childrens-cough-chest-dn',
    productName: "CVS Children's Cough & Chest Congestion Daytime & Nighttime",
    brand: 'CVS Health',
    category: COLD_FLU,
    formulaId: 'cvs-childrens-cough-chest-dn',
    audience: KIDS,
    minAge: 4,
    form: 'liquid kit',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr (day)', strength: '5mg / 5mL' },
      { name: 'Guaifenesin (day)', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      '347f1731-5b85-4220-ae2b-9497a3afa4ed',
      ['FD&C Blue No. 1', 'FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('347f1731-5b85-4220-ae2b-9497a3afa4ed', METH.sorbitol),
        ),
        flag(
          'Potassium sorbate',
          'limited',
          dailymed('347f1731-5b85-4220-ae2b-9497a3afa4ed', METH.sorbate),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote:
      'Kids day/night cough + chest kit. Daytime chart starts at 4; night bottle is 6+. Dyes + PG + sucralose on both.',
    retailers: ['CVS'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid 347f1731-5b85-4220-ae2b-9497a3afa4ed (draft, not verified)',
    ],
  },
  {
    id: 'cvs-childrens-multi-cold',
    productName: "CVS Children's Multi-Symptom Cold Very Berry",
    brand: 'CVS Health',
    category: COLD_FLU,
    formulaId: 'cvs-childrens-multi-cold',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.sucralose),
      ),
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.saccharin),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('2a849ae9-338f-4642-e063-6394a90a1ca4', METH.parabens),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Very Berry kids multi — dyes + parabens + propyl gallate. Ages 4+.',
    retailers: ['CVS'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 2a849ae9-338f-4642-e063-6394a90a1ca4 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-pharmacy-childrens-cold-allergy',
    productName: "CVS Pharmacy Children's Cold & Allergy",
    brand: 'CVS Health',
    category: COLD_FLU,
    formulaId: 'cvs-pharmacy-childrens-cold-allergy',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Brompheniramine maleate', strength: '2mg / 10mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        '004e104b-d6ff-48d5-8685-cd1bff45399a',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('004e104b-d6ff-48d5-8685-cd1bff45399a', METH.propylGallate),
          ),
          flag(
            'Sorbitol',
            'limited',
            dailymed('004e104b-d6ff-48d5-8685-cd1bff45399a', METH.sorbitol),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kids cold & allergy — Blue 1 + Red 40 + propyl gallate. Ages 6+.',
    retailers: ['CVS'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 004e104b-d6ff-48d5-8685-cd1bff45399a (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-childrens-cough-chest',
    productName: "Walgreens Children's Mucus Cough & Congestion Relief",
    brand: 'Walgreens',
    category: COLD_FLU,
    formulaId: 'walgreens-childrens-cough-chest',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      '8b5d391b-6c23-44c3-81d0-c08822bf6d01',
      ['FD&C Red No. 40'],
      [
        flag(
          'Sorbitol',
          'limited',
          dailymed('8b5d391b-6c23-44c3-81d0-c08822bf6d01', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote: 'Walgreens kids cough/chest — Red 40 + PG + sucralose. Ages 4+.',
    retailers: ['Walgreens'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 8b5d391b-6c23-44c3-81d0-c08822bf6d01 (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-childrens-night-cough',
    productName: "Walgreens Children's Nighttime Cough",
    brand: 'Walgreens',
    category: COLD_FLU,
    formulaId: 'walgreens-childrens-night-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Chlorpheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '15mg / 10mL' },
    ],
    inactiveIngredients: dyesPgSweet(
      'a270cbe3-bf0a-44da-9359-00e218eba239',
      ['FD&C Red No. 40'],
      [
        flag(
          'Potassium sorbate',
          'limited',
          dailymed('a270cbe3-bf0a-44da-9359-00e218eba239', METH.sorbate),
        ),
        flag(
          'Sorbitol',
          'limited',
          dailymed('a270cbe3-bf0a-44da-9359-00e218eba239', METH.sorbitol),
        ),
      ],
    ),
    verdict: 'avoid',
    honestNote:
      "Walgreens children's nighttime cough (generic name NIGHTTIME COUGH on the SPL). Red 40 + PG + sucralose. Ages 6+.",
    retailers: ['Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid a270cbe3-bf0a-44da-9359-00e218eba239 (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-kids-honey-night-cold',
    productName: 'Walgreens Nighttime Kids Honey Cold Cough Congestion',
    brand: 'Walgreens',
    category: COLD_FLU,
    formulaId: 'walgreens-kids-honey-night-cold',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Doxylamine succinate', strength: '6.25mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10',
        'high',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.dyes),
      ),
      flag(
        'FD&C Green No. 3',
        'high',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6',
        'high',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('c0f317cd-723d-47f2-b600-aaeae6399482', METH.flavors),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kids honey night cold — four synthetic dyes + propyl gallate. Ages 6+.',
    retailers: ['Walgreens'],
    cleanAlternatives: NIGHT_ALTS,
    sourcesGeneral: [
      'DailyMed setid c0f317cd-723d-47f2-b600-aaeae6399482 (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-childrens-cold-cough-runny',
    productName: "Walgreens Children's Cold + Cough + Runny Nose",
    brand: 'Walgreens',
    category: COLD_FLU,
    formulaId: 'walgreens-childrens-cold-cough-runny',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '160mg / 5mL' },
      { name: 'Chlorpheniramine maleate', strength: '1mg / 5mL' },
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.dyes),
      ),
      flag(
        'Propyl gallate',
        'high',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.propylGallate),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.pg),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('8714d4e6-3a3b-48c8-8ac1-51b933a2ceac', METH.sorbitol),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'Kids cold + cough + runny nose — Red 33 / Blue 1 / Red 40 + propyl gallate. Labeled dose starts at 6 (4–5: ask a doctor).',
    retailers: ['Walgreens'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 8714d4e6-3a3b-48c8-8ac1-51b933a2ceac (draft, not verified)',
    ],
  },
  {
    id: 'signature-care-childrens-multi-cold',
    productName: "Signature Care Children's Multi-Symptom Cold",
    brand: 'Signature Care',
    category: COLD_FLU,
    formulaId: 'signature-care-childrens-multi-cold',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '2.5mg / 5mL' },
    ],
    inactiveIngredients: [
      ...dyesPgSweet(
        '831da7b6-25c7-4601-b7f1-1800a238b016',
        ['FD&C Blue No. 1', 'FD&C Red No. 40'],
        [
          flag(
            'Propyl gallate',
            'high',
            dailymed('831da7b6-25c7-4601-b7f1-1800a238b016', METH.propylGallate),
          ),
          flag(
            'Sorbitol',
            'limited',
            dailymed('831da7b6-25c7-4601-b7f1-1800a238b016', METH.sorbitol),
          ),
        ],
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: include — label matched with setid 831da7b6. Blue 1 + Red 40 + propyl gallate. Ages 4+.',
    retailers: ['Safeway', 'Albertsons'],
    cleanAlternatives: MULTI_LIQUID_ALTS,
    sourcesGeneral: [
      'DailyMed setid 831da7b6-25c7-4601-b7f1-1800a238b016 (draft, not verified)',
    ],
  },
  {
    id: 'signature-care-childrens-12hr-cough',
    productName: "Signature Care Children's 12 Hour Cough Relief",
    brand: 'Signature Care',
    category: COLD_FLU,
    formulaId: 'signature-care-childrens-12hr-cough',
    audience: KIDS,
    minAge: 4,
    form: 'ER suspension',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      {
        name: 'Dextromethorphan polistirex',
        strength: '30mg / 5mL (as HBr equivalent)',
      },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30 aluminum lake',
        'high',
        dailymed('62d71572-d157-484a-8676-7ce6da413ee8', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('62d71572-d157-484a-8676-7ce6da413ee8', METH.dyes),
      ),
      flag(
        'Methylparaben',
        'high',
        dailymed('62d71572-d157-484a-8676-7ce6da413ee8', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('62d71572-d157-484a-8676-7ce6da413ee8', METH.parabens),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('62d71572-d157-484a-8676-7ce6da413ee8', METH.ps80),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: include — label matched with setid 62d71572. Grape 12-hour polistirex (Delsym-style) — lake dyes + parabens. Sodium metabisulfite is on the SPL (v1.6 sulfite population Caution). HFCS is parked / ungraded. Ages 4+.',
    retailers: ['Safeway', 'Albertsons'],
    cleanAlternatives: COUGH_ALTS,
    sourcesGeneral: [
      'DailyMed setid 62d71572-d157-484a-8676-7ce6da413ee8 (draft, not verified)',
    ],
  },
  {
    id: 'walgreens-childrens-chest-rub',
    productName: "Walgreens Children's Chest Rub",
    brand: 'Walgreens',
    category: COLD_FLU,
    formulaId: 'walgreens-childrens-chest-rub',
    audience: KIDS,
    minAge: 2,
    form: 'topical rub',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Camphor', strength: '4.8%' },
      { name: 'Eucalyptus oil', strength: '1.2%' },
      { name: 'Menthol', strength: '2.6%' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('327a7226-84b9-26d7-e063-6394a90a99b9', METH.tio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      "FOUNDER CALL: INCLUDE as Avoid (TiO2 High) — this is not the skipped petrolatum-only Vicks / Equate children's rub pair. Fragrance is on the SPL (v1.6 topical fragrance = population Caution, not the Avoid driver). Petrolatum, thymol, and turpentine oil are not in Methodology §5 (ungraded; same petrolatum-grade gap that skipped KC51/KC52/KC54). Menthol / camphor / eucalyptol as topical actives stay parked. Ages 2+ (under 2: ask a doctor). Same-batch Cleans are oral and start at minAge 4.",
    retailers: ['Walgreens'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 327a7226-84b9-26d7-e063-6394a90a99b9 (draft, not verified)',
    ],
  },
];
