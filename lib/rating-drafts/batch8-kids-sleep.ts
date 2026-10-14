// DRAFT / not verified / batch 8 kids sleep
// Sleep · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. No live Sleep picks file is edited from this draft.
// Methodology.md / PROJECT_NOTES.md are untouched.
//
// FOUNDER CALLS (LOCKED) — approved rows only:
// - KS1 Hyland's Sleep meltaways = Clean. setid 8ad9775f. Acacia gum + lactose.
//   minAge 6 (6–under 12 chart on SPL).
// - KS2 Hyland's Rest meltaways = Clean. setid 5e9924be. Acacia + lactose. minAge 6.
// - KS3 Hyland's 4 Kids Calm & Restful = Clean. setid 8dae1ad1. Acacia + lactose.
//   minAge 2 (ages 2–12 carton).
// - KS4 Hyland's Calms Forte = Clean. SHARE formulaId `hylands-calms-forte` with
//   adult batch 7 (same inactives; setid 63ce9942). Do not invent a second
//   formulaId. Kids audience + minAge 6 per SPL 6–under-12 chart.
// - KS5 Boiron SleepCalm kids pellets = Clean. setid de0b458d. Lactose + sucrose.
//   minAge 3. Separate from SleepCalm Kids liquid.
// - KS6 Genexa Kids Sleepology = Caution. setid ba0cd3c2. Driver = vanilla
//   lavender / natural flavor (Limited). Organic maltodextrin is Limited
//   (same as non-organic; Sept 14 housekeeping). Organic dextrose /
//   organic carnauba / organic rice bran = Cleared-class.
// - KS7 Boiron SleepCalm Kids liquid = Caution. setid aef7b774. Alcohol vehicle
//   (alcohol + water) — same locked pattern as batch 4 `boiron-coldcalm-kids-liquid`.
//   Ethyl alcohol is ungraded in §5; founder Caution, not a scored Avoid.
//   Separate formulaId from Clean pellets.
// - KS8 Natrol Kids Melatonin gummies = Caution. minAge 4. Natural flavors
//   (Limited); coconut oil is glazing only (not the gummy seed-oil High rule).
//   Brand / CVS ingredient pages — no DailyMed drug SPL expected.
// - KS9 OLLY Kids Sleep (coconut-only oil listing) = Caution. minAge 4. Natural
//   flavor + vegetable oil (coconut) only. Separate formulaId from the canola twin.
// - KS10 Zarbee's Children's Sleep liquid w/ melatonin = Caution. minAge 3.
//   Glycerin / water + natural flavor; no seed oil.
// - KS11 Zarbee's Children's Sleep melatonin gummies = Caution. minAge 3.
//   Natural flavors. Current brand list has NO sunflower / canola / vegetable
//   oil — Caution, not Avoid. A carton that shows seed oil is a different
//   formula (do not invent Avoid here).
// - KS12 Equate Children's Melatonin liquid = Caution. minAge 3. Glycerin +
//   natural flavor (Zarbee's twin pattern) if that label holds.
// - KS13 OLLY Kids Sleep (coconut + canola) = Avoid. minAge 4. Canola oil in a
//   gummy is High. Target / CVS listings. Separate formulaId from coconut-only.
// - KS14 Children's Benadryl Allergy liquid dyed = Avoid. Sleep-category row.
//   SAME formulaId as batch 6 allergies `childrens-benadryl-allergy-liquid`
//   (setid fc9181b9). Dyes Avoid; sedating honestNote.
// - KS15 Children's Benadryl Dye-Free Allergy liquid = Avoid. SAME formulaId
//   `childrens-benadryl-dyefree-liquid` as batch 6 (setid 10d478ff). Dye-free
//   trap: saccharin + flavors.
//
// TALLY (unverified drafts): 15 rows — Clean 5 / Caution 7 / Avoid 3.
// Independently Clean in THIS batch only: Hyland's Sleep, Hyland's Rest,
// Hyland's 4 Kids Calm & Restful, Calms Forte, SleepCalm kids pellets.
// Caution / Avoid rows offer those as §6 alternatives (form labeled).
// Do not invent Clean for melatonin or anything not on the approved list.
//
// OLLY SPLIT: coconut-only oil listing and coconut+canola are separate
// formulaIds. Do not merge them. Seed/industrial oils (soybean, canola,
// "vegetable oil", sunflower) in GUMMIES = High Avoid. Coconut oil alone
// is NOT that High rule.
//
// SLEEPCALM SPLIT: kids pellets = Clean (lactose + sucrose). Kids liquid =
// Caution (alcohol vehicle). Do not collapse them.
//
// SKIPPED (founder skip — do not invent Clean / do not write):
// - Unisom / ZzzQuil / store DPH nighttime sleep-aid under 12
// - Club-store melatonin
// - Amazon-only SKUs
// - Calm Keeper
// - Restful Legs PM
// - Quietude
// - Seed-oil store gummy family without an exact SKU
//
// Melatonin rows: cleanliness grade only — no efficacy claims.
// Sedating DPH: next-day drowsiness style note. BKC = Caution standalone —
// N/A in this batch.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SLEEP = 'Sleep';
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, "vegetable oil", sunflower)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (maltodextrin — organic and non-organic)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / guar / pectin — locked v1.6)',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors / organic colors)',
  cleared: 'Methodology §5 Cleared',
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const HYLANDS_SLEEP = 'hylands-sleep';
const HYLANDS_REST = 'hylands-rest';
const HYLANDS_4KIDS = 'hylands-4kids-calm-restful';
const CALMS_FORTE = 'hylands-calms-forte';
const SLEEPCALM_PELLETS = 'boiron-sleepcalm-kids-pellets';

const SET_SLEEP = '8ad9775f-367c-45c9-890d-69a3734965f1';
const SET_REST = '5e9924be-4dad-324a-e053-2a91aa0a8ec1';
const SET_4KIDS = '8dae1ad1-14fa-4e4e-8c76-889ff1d0bee1';
const SET_CALMS = '63ce9942-a299-4d9b-b63b-35b297472dc9';
const SET_SLEEPCALM_PELLETS = 'de0b458d-5f0a-78f4-e053-2995a90afe4b';
const SET_SLEEPOLOGY = 'ba0cd3c2-9883-9664-e053-2995a90a9fd4';
const SET_SLEEPCALM_LIQUID = 'aef7b774-355a-3fb8-e053-2a95a90a268c';
const SET_BENADRYL_DYED = 'fc9181b9-c92d-493e-8d7c-4a4239c6c092';
const SET_BENADRYL_DYEFREE = '10d478ff-ddc6-45da-87ff-cfe1b2b07a8e';

const NATROL_CITE =
  'Natrol / CVS ingredient pages (Kids Melatonin gummies; no DailyMed drug SPL)';
const OLLY_COCONUT_CITE =
  'OLLY coconut-only listings (PureFormulas / IngredientList; vegetable oil (coconut) only)';
const OLLY_CANOLA_CITE =
  'Target / CVS OLLY Kids Sleep listings (vegetable oil (coconut, canola))';
const ZARBEES_LIQUID_CITE = "Zarbee's brand page + Target listing (Children's Sleep liquid)";
const ZARBEES_GUMMY_CITE =
  "Zarbee's brand page (Children's Sleep melatonin gummies; current list has no seed oil)";
const EQUATE_CITE =
  "Walmart / Instacart Equate Children's Melatonin liquid (Zarbee's twin pattern if label holds)";

// Independently Clean rows in THIS batch only. Form is labeled, not a hard
// filter (§6). No conventional (non-homeopathic) Clean kids sleep aid is
// approved here. Age-match: 4 Kids Calm & Restful is minAge 2; SleepCalm
// pellets are minAge 3; Sleep / Rest / Calms Forte are minAge 6.

const AGE3_ALTS: CleanAlternative[] = [
  {
    productId: SLEEPCALM_PELLETS,
    rankReason:
      'Closest independently Clean kids Sleep analog that is age-matched for 3+ (Boiron SleepCalm kids pellets). Form: pellet — labeled, not a hard filter (§6).',
  },
  {
    productId: HYLANDS_4KIDS,
    rankReason:
      "Independently Clean kids homeopathic meltaway (Hyland's 4 Kids Calm & Restful, minAge 2). Form: meltaway tablet — labeled, not a hard filter (§6).",
  },
  {
    productId: HYLANDS_SLEEP,
    rankReason:
      "Independently Clean kids-usable homeopathic meltaway (Hyland's Sleep, minAge 6 — higher than this 3+ product; not an age-matched swap for ages 3–5). Form: meltaway tablet.",
  },
];

const AGE4_ALTS: CleanAlternative[] = [
  {
    productId: SLEEPCALM_PELLETS,
    rankReason:
      'Closest independently Clean kids Sleep analog that is age-matched for 4+ (SleepCalm kids pellets, minAge 3). Form: pellet vs gummy — labeled, not a hard filter (§6).',
  },
  {
    productId: HYLANDS_4KIDS,
    rankReason:
      "Independently Clean kids homeopathic meltaway (minAge 2). Form: meltaway tablet vs gummy — labeled, not a hard filter (§6).",
  },
  {
    productId: HYLANDS_SLEEP,
    rankReason:
      "Independently Clean kids-usable homeopathic meltaway (minAge 6 — higher than this 4+ product; not an age-matched swap for ages 4–5). Form: meltaway tablet vs gummy.",
  },
];

const AGE6_ALTS: CleanAlternative[] = [
  {
    productId: HYLANDS_SLEEP,
    rankReason:
      "Closest independently Clean kids Sleep analog in this batch that is age-matched for 6+ (Hyland's Sleep meltaways). Form: meltaway tablet vs liquid — labeled, not a hard filter (§6). Not a diphenhydramine swap.",
  },
  {
    productId: CALMS_FORTE,
    rankReason:
      "Independently Clean kids-usable Calms Forte tablets (shared formulaId with adult batch 7; minAge 6). Form: swallowed tablet vs liquid — labeled, not a hard filter (§6).",
  },
  {
    productId: SLEEPCALM_PELLETS,
    rankReason:
      'Independently Clean kids homeopathic pellets (minAge 3). Form: pellet vs liquid — labeled, not a hard filter (§6).',
  },
];

const HOMEOPATHIC_ALTS_AGE3: CleanAlternative[] = [
  {
    productId: SLEEPCALM_PELLETS,
    rankReason:
      'Closest independently Clean homeopathic Sleep peer in this batch (SleepCalm kids pellets, same brand family, minAge 3). Form: pellet vs liquid / chewable — labeled, not a hard filter (§6).',
  },
  {
    productId: HYLANDS_4KIDS,
    rankReason:
      "Independently Clean kids homeopathic meltaway (minAge 2). Form: meltaway tablet — labeled, not a hard filter (§6).",
  },
  {
    productId: HYLANDS_REST,
    rankReason:
      "Independently Clean kids-usable homeopathic meltaway (Hyland's Rest, minAge 6 — higher than this 3+ product). Form: meltaway tablet.",
  },
];

export const BATCH8_KIDS_SLEEP: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: HYLANDS_SLEEP,
    productName: "Hyland's Sleep Quick-Dissolving Tablets",
    brand: "Hyland's",
    category: SLEEP,
    barcode: '354973320611',
    formulaId: HYLANDS_SLEEP,
    audience: KIDS,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Hyoscyamus niger', strength: '6X HPUS' },
      { name: 'Ignatia amara', strength: '6X HPUS' },
      { name: 'Kali phosphoricum', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag('Acacia gum', 'cleared', dailymed(SET_SLEEP, METH.gums)),
      cleared(SET_SLEEP, 'Lactose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_SLEEP} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: HYLANDS_REST,
    productName: "Hyland's Rest Quick-Dissolving Tablets",
    brand: "Hyland's",
    category: SLEEP,
    barcode: '354973333215',
    formulaId: HYLANDS_REST,
    audience: KIDS,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Argentum nitricum', strength: '6X HPUS' },
      { name: 'Causticum', strength: '6X HPUS' },
      { name: 'Chamomilla', strength: '3X HPUS' },
      { name: 'Cocculus', strength: '12X HPUS' },
      { name: 'Natrum muriaticum', strength: '12X HPUS' },
      { name: 'Phosphorus', strength: '12X HPUS' },
      { name: 'Valeriana', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag('Acacia gum', 'cleared', dailymed(SET_REST, METH.gums)),
      cleared(SET_REST, 'Lactose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_REST} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: HYLANDS_4KIDS,
    productName: "Hyland's 4 Kids Calm & Restful",
    brand: "Hyland's",
    category: SLEEP,
    barcode: '354973316119',
    formulaId: HYLANDS_4KIDS,
    audience: KIDS,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '6X HPUS' },
      { name: 'Calcarea phosphorica', strength: '12X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Cina', strength: '6X HPUS' },
      { name: 'Lycopodium', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag('Acacia gum', 'cleared', dailymed(SET_4KIDS, METH.gums)),
      cleared(SET_4KIDS, 'Lactose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_4KIDS} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: CALMS_FORTE,
    productName: "Hyland's Calms Forte Tablets",
    brand: "Hyland's",
    category: SLEEP,
    barcode: '354973325722',
    formulaId: CALMS_FORTE,
    audience: KIDS,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Avena sativa', strength: '4X HPUS' },
      { name: 'Calcarea phosphorica', strength: '3X HPUS' },
      { name: 'Chamomilla', strength: '4X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '3X HPUS' },
      { name: 'Humulus lupulus', strength: '4X HPUS' },
      { name: 'Kali phosphoricum', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '3X HPUS' },
      { name: 'Natrum phosphoricum', strength: '3X HPUS' },
      { name: 'Passiflora', strength: '4X HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_CALMS, 'Lactose'),
      cleared(SET_CALMS, 'Magnesium stearate'),
      cleared(SET_CALMS, 'Microcrystalline cellulose'),
      cleared(SET_CALMS, 'Starch (corn and tapioca)'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      `DailyMed setid ${SET_CALMS} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: SLEEPCALM_PELLETS,
    productName: 'Boiron SleepCalm Kids Pellets',
    brand: 'Boiron',
    category: SLEEP,
    barcode: '306969308424',
    formulaId: SLEEPCALM_PELLETS,
    audience: KIDS,
    minAge: 3,
    form: 'pellet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '9C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '9C HPUS' },
      { name: 'Hyoscyamus niger', strength: '9C HPUS' },
      { name: 'Kali bromatum', strength: '9C HPUS' },
      { name: 'Passiflora incarnata', strength: '3C HPUS' },
      { name: 'Stramonium', strength: '9C HPUS' },
    ],
    inactiveIngredients: [
      cleared(SET_SLEEPCALM_PELLETS, 'Lactose'),
      cleared(SET_SLEEPCALM_PELLETS, 'Sucrose'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods'],
    sourcesGeneral: [
      `DailyMed setid ${SET_SLEEPCALM_PELLETS} (draft, not verified)`,
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-kids-sleepology',
    productName: "Genexa Kids' Sleepology",
    brand: 'Genexa',
    category: SLEEP,
    barcode: '857630006199',
    formulaId: 'genexa-kids-sleepology',
    audience: KIDS,
    minAge: 3,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Alfalfa', strength: '6X HPUS' },
      { name: 'Calcarea phosphorica', strength: '8X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Eschscholtzia californica', strength: '6X HPUS' },
      { name: 'Melissa officinalis', strength: '3X HPUS' },
      { name: 'Passiflora incarnata', strength: '6X HPUS' },
      { name: 'Pulsatilla', strength: '12X HPUS' },
      { name: 'Scutellaria lateriflora', strength: '3X HPUS' },
      { name: 'Valeriana officinalis', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Vanilla lavender flavor',
        'limited',
        dailymed(SET_SLEEPOLOGY, METH.flavors),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        dailymed(SET_SLEEPOLOGY, METH.maltodextrin),
      ),
      flag(
        'Dextrose (organic)',
        'cleared',
        dailymed(SET_SLEEPOLOGY, METH.organicFlavor),
      ),
      flag(
        'Carnauba wax (organic)',
        'cleared',
        dailymed(SET_SLEEPOLOGY, METH.organicFlavor),
      ),
      flag(
        'Rice bran extract (organic)',
        'cleared',
        dailymed(SET_SLEEPOLOGY, METH.riceBran),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Target', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: HOMEOPATHIC_ALTS_AGE3,
    sourcesGeneral: [
      `DailyMed setid ${SET_SLEEPOLOGY} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'boiron-sleepcalm-kids-liquid',
    productName: 'Boiron SleepCalm Kids Liquid',
    brand: 'Boiron',
    category: SLEEP,
    barcode: '306969309094',
    formulaId: 'boiron-sleepcalm-kids-liquid',
    audience: KIDS,
    minAge: 3,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '9C HPUS' },
      { name: 'Gelsemium sempervirens', strength: '9C HPUS' },
      { name: 'Hyoscyamus niger', strength: '9C HPUS' },
      { name: 'Kali bromatum', strength: '9C HPUS' },
      { name: 'Passiflora incarnata', strength: '3C HPUS' },
      { name: 'Stramonium', strength: '9C HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Purified water',
        'cleared',
        dailymed(SET_SLEEPCALM_LIQUID, METH.cleared),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walgreens', 'Whole Foods'],
    cleanAlternatives: HOMEOPATHIC_ALTS_AGE3,
    sourcesGeneral: [
      `DailyMed setid ${SET_SLEEPCALM_LIQUID} (draft, not verified)`,
      CARLSTON,
    ],
  },
  {
    id: 'natrol-kids-melatonin-gummies',
    productName: 'Natrol Kids Melatonin Gummies',
    brand: 'Natrol',
    category: SLEEP,
    barcode: '047469075309',
    formulaId: 'natrol-kids-melatonin-gummies',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [{ name: 'Melatonin', strength: '1mg' }],
    inactiveIngredients: [
      flag('Natural flavors', 'limited', labelCite(NATROL_CITE, METH.flavors)),
      flag(
        'Coconut oil',
        'cleared',
        labelCite(
          NATROL_CITE,
          `${METH.cleared} — coconut oil glazing only; not the gummy seed/industrial-oil High rule`,
        ),
      ),
      flag('Tapioca syrup', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
      flag('Cane sugar', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
      flag('Citric acid', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
      flag('Carnauba wax', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
      flag(
        'Fruit and vegetable juice (color)',
        'cleared',
        labelCite(NATROL_CITE, METH.cleared),
      ),
      flag('Pectin', 'cleared', labelCite(NATROL_CITE, METH.gums)),
      flag('Sodium citrate', 'cleared', labelCite(NATROL_CITE, METH.cleared)),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: AGE4_ALTS,
    sourcesGeneral: [
      'Natrol brand + CVS ingredient pages for Kids Melatonin gummies (draft, not verified; no DailyMed drug SPL)',
    ],
  },
  {
    id: 'olly-kids-sleep-coconut-only',
    productName: 'OLLY Kids Sleep (coconut-only oil listing)',
    brand: 'OLLY',
    category: SLEEP,
    formulaId: 'olly-kids-sleep-coconut-only',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Melatonin', strength: '0.5mg' },
      { name: 'L-Theanine', strength: '15mg' },
      { name: 'Chamomile extract (flower)', strength: '2.5mg' },
      { name: 'Passionflower extract (aerial parts)', strength: '2.5mg' },
      { name: 'Lemon balm extract (aerial parts)', strength: '2.5mg' },
    ],
    inactiveIngredients: [
      flag('Natural flavor', 'limited', labelCite(OLLY_COCONUT_CITE, METH.flavors)),
      flag(
        'Vegetable oil (coconut)',
        'cleared',
        labelCite(
          OLLY_COCONUT_CITE,
          `${METH.cleared} — coconut-only oil listing; not the gummy seed/industrial-oil High rule`,
        ),
      ),
      flag('Glucose syrup', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag('Sugar', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag('Gelatin', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag('Citric acid', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag('Sodium citrate', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
      flag(
        'Coloring (from carrot and black currant juices)',
        'cleared',
        labelCite(OLLY_COCONUT_CITE, METH.cleared),
      ),
      flag('Pectin', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.gums)),
      flag('Carnauba wax', 'cleared', labelCite(OLLY_COCONUT_CITE, METH.cleared)),
    ],
    verdict: 'caution',

    retailers: ['Grocery'],
    cleanAlternatives: AGE4_ALTS,
    sourcesGeneral: [
      'OLLY coconut-only other-ingredients listings (PureFormulas / IngredientList: vegetable oil (coconut) + carnauba wax) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'zarbees-kids-sleep-liquid',
    productName: "Zarbee's Children's Sleep Liquid with Melatonin",
    brand: "Zarbee's",
    category: SLEEP,
    barcode: '858438005711',
    formulaId: 'zarbees-kids-sleep-liquid',
    audience: KIDS,
    minAge: 3,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [{ name: 'Melatonin', strength: '1mg' }],
    inactiveIngredients: [
      flag(
        'Natural flavor',
        'limited',
        labelCite(ZARBEES_LIQUID_CITE, METH.flavors),
      ),
      flag('Glycerin', 'cleared', labelCite(ZARBEES_LIQUID_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(ZARBEES_LIQUID_CITE, METH.cleared)),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Target', 'Walmart', 'Grocery'],
    cleanAlternatives: AGE3_ALTS,
    sourcesGeneral: [
      "Zarbee's.com Children's Sleep liquid + Target listing (glycerin, water, natural flavor) — draft, not verified; no DailyMed drug SPL",
    ],
  },
  {
    id: 'zarbees-kids-sleep-gummies',
    productName: "Zarbee's Children's Sleep Melatonin Gummies",
    brand: "Zarbee's",
    category: SLEEP,
    barcode: '858438005438',
    formulaId: 'zarbees-kids-sleep-gummies',
    audience: KIDS,
    minAge: 3,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [{ name: 'Melatonin', strength: '1mg' }],
    inactiveIngredients: [
      flag(
        'Natural flavors',
        'limited',
        labelCite(ZARBEES_GUMMY_CITE, METH.flavors),
      ),
      flag('Honey', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Sucrose', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Glucose syrup', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Pectin', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag('Sodium citrate', 'cleared', labelCite(ZARBEES_GUMMY_CITE, METH.cleared)),
      flag(
        'Colors added (fruit juice, vegetable juice)',
        'cleared',
        labelCite(ZARBEES_GUMMY_CITE, METH.cleared),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Target', 'Walmart', 'Grocery'],
    cleanAlternatives: AGE3_ALTS,
    sourcesGeneral: [
      "Zarbee's.com Children's Sleep with Melatonin gummies (honey, sucrose, glucose syrup, water, pectin, natural flavors, citric acid, sodium citrate, fruit/vegetable juice colors) — draft, not verified; no DailyMed drug SPL",
    ],
  },
  {
    id: 'equate-childrens-melatonin-liquid',
    productName: "Equate Children's Melatonin Liquid",
    brand: 'Equate',
    category: SLEEP,
    formulaId: 'equate-childrens-melatonin-liquid',
    audience: KIDS,
    minAge: 3,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [{ name: 'Melatonin', strength: '1mg' }],
    inactiveIngredients: [
      flag('Natural flavor', 'limited', labelCite(EQUATE_CITE, METH.flavors)),
      flag('Glycerin', 'cleared', labelCite(EQUATE_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(EQUATE_CITE, METH.cleared)),
    ],
    verdict: 'caution',

    retailers: ['Walmart'],
    cleanAlternatives: AGE3_ALTS,
    sourcesGeneral: [
      "Walmart Equate Children's Melatonin liquid (compares to Zarbee's Sleep Liquid) + Instacart ingredient snapshot — draft, not verified; no DailyMed drug SPL",
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'olly-kids-sleep-canola',
    productName: 'OLLY Kids Sleep (coconut + canola)',
    brand: 'OLLY',
    category: SLEEP,
    barcode: '850004462065',
    formulaId: 'olly-kids-sleep-canola',
    audience: KIDS,
    minAge: 4,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [
      { name: 'Melatonin', strength: '0.5mg' },
      { name: 'L-Theanine', strength: '15mg' },
      { name: 'Chamomile extract (flower)', strength: '2.5mg' },
      { name: 'Passionflower extract (aerial parts)', strength: '2.5mg' },
      { name: 'Lemon balm extract (aerial parts)', strength: '2.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Vegetable oil (coconut, canola)',
        'high',
        labelCite(OLLY_CANOLA_CITE, METH.seedOilGummies),
      ),
      flag('Natural flavors', 'limited', labelCite(OLLY_CANOLA_CITE, METH.flavors)),
      flag('Glucose syrup', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
      flag('Beet sugar', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
      flag('Water', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
      flag('Gelatin', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
      flag('Citric acid', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
      flag(
        'Coloring (from carrot and blackcurrant juices)',
        'cleared',
        labelCite(OLLY_CANOLA_CITE, METH.cleared),
      ),
      flag('Pectin', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.gums)),
      flag('Carnauba wax', 'cleared', labelCite(OLLY_CANOLA_CITE, METH.cleared)),
    ],
    verdict: 'avoid',

    retailers: ['Target', 'CVS'],
    cleanAlternatives: AGE4_ALTS,
    sourcesGeneral: [
      'Target A-81804781 + CVS OLLY Kids Sleep Raspberry ingredient pages (vegetable oil (coconut, canola)) — draft, not verified; no DailyMed drug SPL',
    ],
  },
  {
    id: 'childrens-benadryl-allergy-liquid',
    productName: "Children's Benadryl Allergy",
    brand: 'Benadryl',
    category: SLEEP,
    barcode: '350580534045',
    formulaId: 'childrens-benadryl-allergy-liquid',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag('D&C Red No. 33', 'high', dailymed(SET_BENADRYL_DYED, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET_BENADRYL_DYED, METH.dyes)),
      flag('Flavors', 'limited', dailymed(SET_BENADRYL_DYED, METH.flavors)),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET_BENADRYL_DYED, METH.benzoate),
      ),
      cleared(SET_BENADRYL_DYED, 'Anhydrous citric acid'),
      cleared(SET_BENADRYL_DYED, 'Glycerin'),
      cleared(SET_BENADRYL_DYED, 'Sucrose'),
      cleared(SET_BENADRYL_DYED, 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: AGE6_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_BENADRYL_DYED} (draft, not verified)`,
    ],
  },
  {
    id: 'childrens-benadryl-dyefree-liquid',
    productName: "Children's Benadryl Dye-Free Allergy",
    brand: 'Benadryl',
    category: SLEEP,
    barcode: '350580535042',
    formulaId: 'childrens-benadryl-dyefree-liquid',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'Saccharin sodium',
        'moderate',
        dailymed(SET_BENADRYL_DYEFREE, METH.saccharin),
      ),
      flag('Flavors', 'limited', dailymed(SET_BENADRYL_DYEFREE, METH.flavors)),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed(SET_BENADRYL_DYEFREE, METH.benzoate),
      ),
      flag('Sorbitol', 'limited', dailymed(SET_BENADRYL_DYEFREE, METH.sorbitol)),
      cleared(SET_BENADRYL_DYEFREE, 'Anhydrous citric acid'),
      cleared(SET_BENADRYL_DYEFREE, 'Carboxymethylcellulose sodium'),
      cleared(SET_BENADRYL_DYEFREE, 'Glycerin'),
      cleared(SET_BENADRYL_DYEFREE, 'Sodium citrate'),
      cleared(SET_BENADRYL_DYEFREE, 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: AGE6_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET_BENADRYL_DYEFREE} (draft, not verified)`,
    ],
  },
];
