// DRAFT / not verified / batch 5 adult allergies
// Allergies · audience 'adult' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. Do not convert allergyPicks.ts from this file.
//
// CLEAN PICKS STALE NOTE (do not edit live Clean Picks from this draft):
// allergyPicks.ts still lists Genexa Allergy Care as a live Clean pick.
// Founder locked this draft at Caution (maltodextrin). Do NOT keep the live
// Clean Picks Clean grade and do not extend the adult Genexa ES Clean
// exception. Live file is unchanged on purpose.
//
// FOUNDER CALLS (LOCKED):
// - A1 Genexa Allergy Care = Caution (maltodextrin). Not Clean.
// - A2 AllergyCalm meltaways = Clean (croscarmellose / lactose / Mg stearate).
// - A3 Xlear is TWO formulas, not one product:
//     no-BKC 4-ingredient saline (water / xylitol / NaCl / GSE) = Clean
//     BKC present (DailyMed decongestant SPL) = Caution, separate formulaId
// - A4 NeilMed Sinus Rinse packets = Clean (NaCl + sodium bicarbonate).
// - A5 Beekeeper's nasal = Clean ONLY if bottle matches Clean Picks
//   (saline / xylitol / propolis / citric acid / nisin / poly-lysine).
//   Manufacturer page matches — row written. Do not invent Clean if a
//   later carton diverges.
// - A6 Similasan Allergy Eye: Clean only if PF / no BKC-type preservative;
//   Caution if multi-dose preservative on label. Both SKUs confirmed.
// - A7 Alaway Preservative Free = Clean. A36 multi-dose Alaway = Caution.
//   Separate formulaIds.
// - Plain loratadine tablets with no TiO2 = Clean (Claritin 219ab9c4,
//   Equate dd36dc43, up&up c4ef0110, CVS 3d716988, Kirkland 2074d52e).
// - Claritin RediTabs (7dc04b48) = Clean IF inactives stay clean. Matched
//   SPL has mannitol (Limited) + mint flavor (Limited) → Caution, Clean
//   not invented.
// - Claritin chewables / Claritin liquid = Avoid.
// - Zyrtec tablets (TiO2), Zyrtec liquid gels (BHT), Allegra 24hr (TiO2),
//   -D combos, coated cetirizine store brands = Avoid.
// - Flonase / Sensimist / Equate fluticasone / Nasacort = Caution (BKC ± PS80).
// - Astepro = Avoid (sucralose + sorbitol stack; BKC is Caution-not-Avoid).
// - Benadryl family (tablets / Liqui-Gels / liquid) = Avoid.
// - NasalCrom / Zaditor / Pataday = Caution (BKC) if including.
// - Equate / Signature Care mint dissolve loratadine (sucralose) = Caution
//   (founder lock — raw demerit math would Avoid; do not raise).
// BKC / benzalkonium = Caution (not Avoid). TiO2 / aspartame / BHT / dyes =
// High Avoid. Sucralose / PG (oral) / PS80 = Moderate.
//
// XLEAR OUTCOME: 2 rows (no-BKC saline Clean + BKC oxymetazoline Caution).
//
// SKIPPED (unclear / out of approved set / do not invent Clean):
// - Xlear Max homeopathic nasal (setid 0e961ac2, 2016 SPL) — not one of the
//   two current shelf formulas; stale / not confirmed as a live SKU.
// - Claritin Liqui-Gels (Blue #1) — not in the approved A12–A16 chew /
//   liquid / Allegra / -D set.
// - Member's Mark plain loratadine (setid 95c2b45a) — same L612 Clean
//   inactives as Equate / up&up / Kirkland, but not in A17–A20.
// - Kids allergy SKUs (Genexa Kids, Children's Claritin, etc.) — adult batch.
// - Amazon-only / house brands not on the approved list.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ALLERGIES = 'Allergies';
const ADULT = 'adult' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const HERBAL = 'herbal' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  talc: 'Methodology §5 High-tier (talc — IARC 2A; no pharma-grade exception)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  bht: 'Methodology §5 High-tier (BHT — locked Avoid, EU 2022 endocrine restriction)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (maltodextrin — organic and non-organic)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  maltitol: 'Methodology §5 Limited-risk (sugar alcohols — maltitol)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  xylitolNasal: 'Methodology §5 Cleared (xylitol, topical/nasal)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer)',
  cleared: 'Methodology §5 Cleared',
  organicFlavor: 'Methodology §5 Cleared (organic flavors)',
  carnaubaT133u:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
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

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

// ── Independently Clean rows in THIS batch only ────────────
const ALLERGYCALM = 'boiron-allergycalm-meltaways';
const CLARITIN_PLAIN = 'claritin-allergy-tablets-plain';
const EQUATE_LORATADINE = 'equate-loratadine-tablets-plain';
const UPUP_LORATADINE = 'upup-loratadine-tablets-plain';
const CVS_LORATADINE = 'cvs-loratadine-tablets-plain';
const KIRKLAND_LORATADINE = 'kirkland-allerclear-loratadine-plain';
const XLEAR_CLEAN = 'xlear-nasal-spray-no-bkc';
const NEILMED = 'neilmed-sinus-rinse';
const BEEKEEPERS = 'beekeepers-nasal-spray';
const SIMILASAN_PF = 'similasan-allergy-eye-pf';
const ALWAY_PF = 'alaway-preservative-free';

const L612_FORMULA = 'loratadine-l612-plain';

function oralAlts(preferredId?: string): CleanAlternative[] {
  const rows: CleanAlternative[] = [
    {
      productId: CLARITIN_PLAIN,
      rankReason:
        'Closest independently Clean adult oral analog in this batch (plain loratadine 10 mg tablets, no TiO2). Form: tablet.',
    },
    {
      productId: EQUATE_LORATADINE,
      rankReason:
        'Independently Clean store-brand plain loratadine (L612 family). Form: tablet — labeled, not a hard filter (§6).',
    },
    {
      productId: ALLERGYCALM,
      rankReason:
        'Independently Clean adult homeopathic meltaway (minAge 6). Form: meltaway tablet — labeled, not a hard filter (§6).',
    },
  ];
  if (!preferredId) return rows;
  const match = rows.find((row) => row.productId === preferredId);
  const rest = rows.filter((row) => row.productId !== preferredId);
  if (!match) {
    const extra = extraLoratadine(preferredId);
    return extra ? [extra, ...rows] : rows;
  }
  return [
    {
      ...match,
      rankReason: `${match.rankReason} Same-store / closest-brand match.`,
    },
    ...rest,
  ];
}

function extraLoratadine(id: string): CleanAlternative | undefined {
  const map: Record<string, string> = {
    [UPUP_LORATADINE]:
      'Independently Clean Target up&up plain loratadine (L612 family). Form: tablet.',
    [CVS_LORATADINE]:
      'Independently Clean CVS plain loratadine (corn starch / povidone, no TiO2). Form: tablet.',
    [KIRKLAND_LORATADINE]:
      'Independently Clean Kirkland AllerClear plain loratadine (L612 family). Form: tablet.',
  };
  if (!map[id]) return undefined;
  return { productId: id, rankReason: map[id] };
}

const HOMEOPATHIC_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean homeopathic Allergies peer in this batch (meltaway tablets, minAge 6). Form: meltaway tablet.',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult conventional loratadine if a non-homeopathic swap is preferred. Form: tablet — labeled, not a hard filter (§6).',
  },
];

const DISSOLVE_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean dissolve / melt analog (homeopathic meltaway, minAge 6). Form: meltaway tablet.',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult plain loratadine tablets. Form: swallowed tablet vs dissolve — labeled, not a hard filter (§6).',
  },
];

const AGE2_ORAL_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'No independently Clean 2+ oral Allergies row in this batch. Closest Clean homeopathic peer is AllergyCalm meltaways (minAge 6 — higher than this 2+ product; not an age-matched swap for ages 2–5). Form: meltaway tablet.',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult plain loratadine (minAge 6 — same 6+ floor). Form: tablet — labeled, not a hard filter (§6).',
  },
  {
    productId: XLEAR_CLEAN,
    rankReason:
      'Independently Clean drug-free nasal saline (minAge 2) if a non-oral swap is acceptable. Form: nasal spray — labeled, not a hard filter (§6).',
  },
];

const NASAL_ALTS: CleanAlternative[] = [
  {
    productId: XLEAR_CLEAN,
    rankReason:
      'Closest independently Clean adult nasal analog (drug-free xylitol saline, no BKC). Form: nasal spray.',
  },
  {
    productId: NEILMED,
    rankReason:
      'Independently Clean preservative-free saline rinse packets. Form: irrigation packet vs spray — labeled, not a hard filter (§6).',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult oral loratadine if a non-nasal swap is preferred. Form: tablet — labeled, not a hard filter (§6).',
  },
];

const EYE_ALTS: CleanAlternative[] = [
  {
    productId: ALWAY_PF,
    rankReason:
      'Closest independently Clean adult allergy eye analog (ketotifen, preservative-free, minAge 3). Form: single-use eye drop.',
  },
  {
    productId: SIMILASAN_PF,
    rankReason:
      'Independently Clean homeopathic single-use allergy eye drop (phosphate buffer / water, no preservative, minAge 2). Form: single-use eye drop.',
  },
];

const AGE2_NASAL_ALTS: CleanAlternative[] = [
  {
    productId: XLEAR_CLEAN,
    rankReason:
      'Closest independently Clean adult nasal analog (drug-free xylitol saline, no BKC, minAge 2). Form: nasal spray.',
  },
  {
    productId: NEILMED,
    rankReason:
      'Independently Clean preservative-free saline rinse packets (minAge 2). Form: irrigation packet vs spray — labeled, not a hard filter (§6).',
  },
  {
    productId: CLARITIN_PLAIN,
    rankReason:
      'Independently Clean adult oral loratadine (minAge 6 — higher than this 2+ product; not an age-matched swap for ages 2–5). Form: tablet — labeled, not a hard filter (§6).',
  },
];

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function l612Record(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: ALLERGIES,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: L612_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared(opts.setid, 'Lactose monohydrate'),
      cleared(opts.setid, 'Magnesium stearate'),
      cleared(opts.setid, 'Povidone'),
      cleared(opts.setid, 'Pregelatinized starch'),
    ],
    verdict: 'clean',

    retailers: opts.retailers,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (L612 plain loratadine; draft, not verified)`,
    ],
  };
}

function mintOdtRecord(opts: {
  id: string;
  productName: string;
  brand: string;
  retailers: string[];
  setid: string;
  preferredAlt: string;
  barcode?: string;
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: ALLERGIES,
    ...(opts.barcode ? { barcode: opts.barcode } : {}),
    formulaId: 'loratadine-mint-odt-sucralose',
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'limited', dailymed(opts.setid, METH.sucralose)),
      flag('Mannitol', 'limited', dailymed(opts.setid, METH.mannitol)),
      flag(
        'Natural and artificial mint flavor',
        'limited',
        dailymed(opts.setid, METH.flavors),
      ),
      cleared(opts.setid, 'Croscarmellose sodium'),
      cleared(opts.setid, 'Crospovidone'),
      cleared(opts.setid, 'Hypromellose'),
      cleared(opts.setid, 'Magnesium stearate'),
      cleared(opts.setid, 'Microcrystalline cellulose'),
    ],
    verdict: 'caution',

    retailers: opts.retailers,
    cleanAlternatives: (() => {
      const sameStore = extraLoratadine(opts.preferredAlt);
      const rest = DISSOLVE_ALTS.filter(
        (row) => row.productId !== sameStore?.productId,
      );
      return sameStore ? [sameStore, ...rest] : DISSOLVE_ALTS;
    })(),
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (mint ODT sucralose family; draft, not verified)`,
    ],
  };
}

export const BATCH5_ADULT_ALLERGIES: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: ALLERGYCALM,
    productName: 'Boiron AllergyCalm Meltaway Tablets',
    brand: 'Boiron',
    category: ALLERGIES,
    barcode: '306969307045',
    formulaId: ALLERGYCALM,
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '5C HPUS' },
      { name: 'Ambrosia artemisiaefolia', strength: '5C HPUS' },
      { name: 'Euphrasia officinalis', strength: '5C HPUS' },
      { name: 'Histaminum hydrochloricum', strength: '9C HPUS' },
      { name: 'Sabadilla', strength: '5C HPUS' },
      { name: 'Solidago virgaurea', strength: '5C HPUS' },
    ],
    inactiveIngredients: [
      cleared('d9a509d9-15c8-20bb-e053-2a95a90a3edd', 'Croscarmellose sodium'),
      cleared('d9a509d9-15c8-20bb-e053-2a95a90a3edd', 'Lactose'),
      cleared('d9a509d9-15c8-20bb-e053-2a95a90a3edd', 'Magnesium stearate'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid d9a509d9-15c8-20bb-e053-2a95a90a3edd (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: XLEAR_CLEAN,
    productName: 'Xlear Saline Nasal Spray with Xylitol',
    brand: 'Xlear',
    category: ALLERGIES,
    barcode: '700596000001',
    formulaId: XLEAR_CLEAN,
    audience: ADULT,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Xylitol', strength: 'saline rinse' },
      { name: 'Sodium chloride', strength: 'saline rinse' },
    ],
    inactiveIngredients: [
      flag(
        'Purified water',
        'cleared',
        `Xlear manufacturer carton; ${METH.cleared}`,
      ),
      flag(
        'Xylitol',
        'cleared',
        `Xlear manufacturer carton; ${METH.xylitolNasal}`,
      ),
      flag(
        'Sodium chloride (USP)',
        'cleared',
        `Xlear manufacturer carton; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Target', 'Walmart', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'Xlear manufacturer label (purified water, xylitol, USP sodium chloride, grapefruit seed extract) — no DailyMed SPL; draft, not verified',
    ],
  },
  {
    id: NEILMED,
    productName: 'NeilMed Sinus Rinse Premixed Packets',
    brand: 'NeilMed',
    category: ALLERGIES,
    barcode: '705928002005',
    formulaId: NEILMED,
    audience: ADULT,
    minAge: 2,
    form: 'nasal irrigation packet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Sodium chloride', strength: 'USP premix' },
      { name: 'Sodium bicarbonate', strength: 'USP premix' },
    ],
    inactiveIngredients: [
      flag(
        'Sodium chloride (USP)',
        'cleared',
        `NeilMed manufacturer label; ${METH.cleared}`,
      ),
      flag(
        'Sodium bicarbonate (USP)',
        'cleared',
        `NeilMed manufacturer label; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Whole Foods'],
    sourcesGeneral: [
      'NeilMed manufacturer label (sodium chloride + sodium bicarbonate) — no DailyMed SPL; draft, not verified',
    ],
  },
  {
    id: BEEKEEPERS,
    productName: "Beekeeper's Naturals Propolis Nasal Spray",
    brand: "Beekeeper's Naturals",
    category: ALLERGIES,
    barcode: '834706000213',
    formulaId: BEEKEEPERS,
    audience: ADULT,
    minAge: 18,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: HERBAL,
    activeIngredients: [
      { name: 'Bee propolis extract', strength: 'nasal rinse' },
      { name: 'Xylitol', strength: 'saline rinse' },
    ],
    inactiveIngredients: [
      flag(
        'Saline solution',
        'cleared',
        `Beekeeper's manufacturer carton; ${METH.cleared}`,
      ),
      flag(
        'Xylitol',
        'cleared',
        `Beekeeper's manufacturer carton; ${METH.xylitolNasal}`,
      ),
      flag(
        'Citric acid',
        'cleared',
        `Beekeeper's manufacturer carton; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      "Beekeeper's manufacturer label + Clean Picks match (draft, not verified; no DailyMed SPL)",
    ],
  },
  {
    id: SIMILASAN_PF,
    productName: 'Similasan Allergy Eye Relief (Preservative-Free Single-Use)',
    brand: 'Similasan',
    category: ALLERGIES,
    barcode: '094841300238',
    formulaId: SIMILASAN_PF,
    audience: ADULT,
    minAge: 2,
    form: 'single-use eye drop',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Apis mellifica', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Sabadilla', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      cleared('39ee6e65-948f-42cc-88a3-cd8315c8a849', 'Phosphate buffer'),
      cleared('39ee6e65-948f-42cc-88a3-cd8315c8a849', 'Purified water'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid 39ee6e65-948f-42cc-88a3-cd8315c8a849 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: ALWAY_PF,
    productName: 'Alaway Preservative Free',
    brand: 'Alaway',
    category: ALLERGIES,
    formulaId: ALWAY_PF,
    audience: ADULT,
    minAge: 3,
    form: 'single-use eye drop',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Ketotifen', strength: '0.025%' }],
    inactiveIngredients: [
      flag(
        'Glycerin',
        'cleared',
        `Bausch + Lomb / Clean Picks PF listing; ${METH.cleared}`,
      ),
      flag(
        'Water for injection',
        'cleared',
        `Bausch + Lomb / Clean Picks PF listing; ${METH.cleared}`,
      ),
      flag(
        'Hydrochloric acid and/or sodium hydroxide (pH adjusters)',
        'cleared',
        `Bausch + Lomb / Clean Picks PF listing; ${METH.cleared}`,
      ),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      'Bausch + Lomb / Clean Picks PF listing (glycerin, water, pH adjusters) — no DailyMed PF SPL; draft, not verified',
    ],
  },
  {
    id: CLARITIN_PLAIN,
    productName: 'Claritin Allergy Tablets (plain)',
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100806147 041100080165 041100080189 041100810922 041100080226',
    formulaId: CLARITIN_PLAIN,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared('219ab9c4-d0c4-4256-ab64-66d0260886bd', 'Corn starch'),
      cleared('219ab9c4-d0c4-4256-ab64-66d0260886bd', 'Lactose monohydrate'),
      cleared('219ab9c4-d0c4-4256-ab64-66d0260886bd', 'Magnesium stearate'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    sourcesGeneral: [
      'DailyMed setid 219ab9c4-d0c4-4256-ab64-66d0260886bd (draft, not verified)',
      'DailyMed setid 660ac9df-f1b1-4c89-94dd-9fae0a013f3c (Bayer national twin, same inactives)',
    ],
  },
  l612Record({
    id: EQUATE_LORATADINE,
    productName: 'Equate Allergy Relief (Loratadine 10 mg)',
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: 'dd36dc43-a9b7-4cda-86e0-9283d996a60a',
    barcode: '681131731713',
  }),
  l612Record({
    id: UPUP_LORATADINE,
    productName: 'up&up Allergy Relief (Loratadine 10 mg)',
    brand: 'up&up',
    retailers: ['Target'],
    setid: 'c4ef0110-89c3-4ded-9a9a-75c0f794f869',
    barcode: '370030623792',
  }),
  {
    id: CVS_LORATADINE,
    productName: 'CVS Loratadine 10 mg Tablets',
    brand: 'CVS Health',
    category: ALLERGIES,
    barcode: '050428000335',
    formulaId: CVS_LORATADINE,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      cleared('3d716988-da63-59e6-e063-6394a90a5b4b', 'Corn starch'),
      cleared('3d716988-da63-59e6-e063-6394a90a5b4b', 'Lactose monohydrate'),
      cleared('3d716988-da63-59e6-e063-6394a90a5b4b', 'Magnesium stearate'),
      cleared('3d716988-da63-59e6-e063-6394a90a5b4b', 'Povidone'),
    ],
    verdict: 'clean',

    retailers: ['CVS'],
    sourcesGeneral: [
      'DailyMed setid 3d716988-da63-59e6-e063-6394a90a5b4b (draft, not verified)',
    ],
  },
  l612Record({
    id: KIRKLAND_LORATADINE,
    productName: 'Kirkland Signature AllerClear (Loratadine 10 mg)',
    brand: 'Kirkland Signature',
    retailers: ['Costco'],
    setid: '2074d52e-8c0a-4e69-bfb1-864ffc07e25f',
    barcode: '096619529681',
  }),

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-allergy-care',
    productName: 'Genexa Allergy Care',
    brand: 'Genexa',
    category: ALLERGIES,
    barcode: '857630006052',
    formulaId: 'genexa-allergy-care',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '12X HPUS' },
      { name: 'Ambrosia artemisiifolia', strength: '12X HPUS' },
      { name: 'Arundo mauritanica', strength: '12X HPUS' },
      { name: 'Dulcamara', strength: '12X HPUS' },
      { name: 'Euphrasia officinalis', strength: '12X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '12X HPUS' },
      { name: 'Ranunculus bulbosus', strength: '12X HPUS' },
      { name: 'Sabadilla', strength: '12X HPUS' },
      { name: 'Sinapis nigra', strength: '12X HPUS' },
      { name: 'Sticta pulmonaria', strength: '12X HPUS' },
      { name: 'Wyethia helenioides', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Maltodextrin (organic)',
        'limited',
        dailymed('b5fddd8f-a380-6e88-e053-2a95a90a6b89', METH.maltodextrin),
      ),
      flag(
        'Açaí berry flavor (organic)',
        'cleared',
        dailymed('b5fddd8f-a380-6e88-e053-2a95a90a6b89', METH.organicFlavor),
      ),
      flag(
        'Carnauba wax (organic)',
        'cleared',
        dailymed('b5fddd8f-a380-6e88-e053-2a95a90a6b89', METH.carnaubaT133u),
      ),
      cleared('b5fddd8f-a380-6e88-e053-2a95a90a6b89', 'Dextrose (organic)'),
      flag(
        'Organic rice bran extract',
        'cleared',
        dailymed('b5fddd8f-a380-6e88-e053-2a95a90a6b89', METH.riceBran),
      ),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Target', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: HOMEOPATHIC_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid b5fddd8f-a380-6e88-e053-2a95a90a6b89 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'xlear-nasal-spray-bkc',
    productName: 'Xlear Nasal Decongestant',
    brand: 'Xlear',
    category: ALLERGIES,
    barcode: '700596000209',
    formulaId: 'xlear-nasal-spray-bkc',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Oxymetazoline HCl', strength: '0.05%' },
    ],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('1c1db71a-47d0-42ac-8cbe-95e76dca185f', METH.bkc),
      ),
      flag(
        'Xylitol',
        'cleared',
        dailymed('1c1db71a-47d0-42ac-8cbe-95e76dca185f', METH.xylitolNasal),
      ),
      cleared('1c1db71a-47d0-42ac-8cbe-95e76dca185f', 'Purified water'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1c1db71a-47d0-42ac-8cbe-95e76dca185f (draft, not verified)',
    ],
  },
  {
    id: 'similasan-allergy-eye-multidose',
    productName: 'Similasan Allergy Eye Relief (Multi-Dose Bottle)',
    brand: 'Similasan',
    category: ALLERGIES,
    barcode: '094841300252',
    formulaId: 'similasan-allergy-eye-multidose',
    audience: ADULT,
    minAge: 2,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Apis mellifica', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Sabadilla', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      cleared('3377eced-f9dd-4d6e-abfa-aede968d5242', 'Borate buffer'),
      cleared('3377eced-f9dd-4d6e-abfa-aede968d5242', 'Purified water'),
      cleared('3377eced-f9dd-4d6e-abfa-aede968d5242', 'Sodium nitrate'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Sprouts'],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      'DailyMed setid 3377eced-f9dd-4d6e-abfa-aede968d5242 (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'claritin-reditabs',
    productName: 'Claritin RediTabs',
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100805218 041100806024 041100806048',
    formulaId: 'claritin-reditabs',
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg' }],
    inactiveIngredients: [
      flag(
        'Mannitol',
        'limited',
        dailymed('7dc04b48-f053-4e4b-a493-9e8286d2a791', METH.mannitol),
      ),
      flag(
        'Mint flavor',
        'limited',
        dailymed('7dc04b48-f053-4e4b-a493-9e8286d2a791', METH.flavors),
      ),
      cleared('7dc04b48-f053-4e4b-a493-9e8286d2a791', 'Anhydrous citric acid'),
      cleared('7dc04b48-f053-4e4b-a493-9e8286d2a791', 'Gelatin'),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DISSOLVE_ALTS,
    sourcesGeneral: [
      'DailyMed setid 7dc04b48-f053-4e4b-a493-9e8286d2a791 (draft, not verified)',
    ],
  },
  mintOdtRecord({
    id: 'equate-loratadine-mint-odt',
    productName: 'Equate Loratadine Orally Disintegrating Tablets (Mint)',
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '882dc99b-22d2-4f3e-8613-9ac8d9c5d910',
    preferredAlt: EQUATE_LORATADINE,
    barcode: '194346498161',
  }),
  mintOdtRecord({
    id: 'signature-care-loratadine-mint-odt',
    productName: 'Signature Care Allergy Relief Loratadine ODT (Mint)',
    brand: 'Signature Care',
    retailers: ['Safeway', 'Albertsons'],
    setid: '0a4b8eef-762e-42cc-84ee-0018a9a3be58',
    preferredAlt: CLARITIN_PLAIN,
    barcode: '321130168911',
  }),
  {
    id: 'flonase-allergy-relief',
    productName: 'Flonase Allergy Relief',
    brand: 'Flonase',
    category: ALLERGIES,
    barcode: '353100203346 353100228899 353100229575',
    formulaId: 'flonase-allergy-relief-bkc-ps80',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Fluticasone propionate', strength: '50mcg / spray' },
    ],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('b6134ba0-b70a-4eac-9a82-cef64b242c1d', METH.bkc),
      ),
      flag(
        'Polysorbate 80',
        'limited',
        dailymed('b6134ba0-b70a-4eac-9a82-cef64b242c1d', METH.ps80),
      ),
      cleared('b6134ba0-b70a-4eac-9a82-cef64b242c1d', 'Dextrose'),
      cleared('b6134ba0-b70a-4eac-9a82-cef64b242c1d', 'Microcrystalline cellulose'),
      cleared(
        'b6134ba0-b70a-4eac-9a82-cef64b242c1d',
        'Sodium carboxymethylcellulose',
      ),
      cleared('b6134ba0-b70a-4eac-9a82-cef64b242c1d', 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid b6134ba0-b70a-4eac-9a82-cef64b242c1d (draft, not verified)',
    ],
  },
  {
    id: 'equate-fluticasone-nasal',
    productName: 'Equate Allergy Relief (Fluticasone Propionate)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '194346371907',
    formulaId: 'equate-fluticasone-bkc-ps80',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Fluticasone propionate', strength: '50mcg / spray' },
    ],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('bc824143-b876-4c3d-86fd-81fb58673851', METH.bkc),
      ),
      flag(
        'Polysorbate 80',
        'limited',
        dailymed('bc824143-b876-4c3d-86fd-81fb58673851', METH.ps80),
      ),
      cleared('bc824143-b876-4c3d-86fd-81fb58673851', 'Dextrose'),
      cleared('bc824143-b876-4c3d-86fd-81fb58673851', 'Microcrystalline cellulose'),
      cleared(
        'bc824143-b876-4c3d-86fd-81fb58673851',
        'Sodium carboxymethylcellulose',
      ),
      cleared('bc824143-b876-4c3d-86fd-81fb58673851', 'Purified water'),
    ],
    verdict: 'caution',

    retailers: ['Walmart'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid bc824143-b876-4c3d-86fd-81fb58673851 (draft, not verified)',
    ],
  },
  {
    id: 'nasalcrom',
    productName: 'NasalCrom',
    brand: 'NasalCrom',
    category: ALLERGIES,
    barcode: '814832011017',
    formulaId: 'nasalcrom-bkc',
    audience: ADULT,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cromolyn sodium', strength: '5.2mg / spray' }],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('b34d36ca-4df4-458c-af0f-c0d0c9a025d9', METH.bkc),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('b34d36ca-4df4-458c-af0f-c0d0c9a025d9', METH.edta),
      ),
      cleared('b34d36ca-4df4-458c-af0f-c0d0c9a025d9', 'Purified water'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: AGE2_NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid b34d36ca-4df4-458c-af0f-c0d0c9a025d9 (draft, not verified)',
    ],
  },
  {
    id: 'alaway-multidose-bak',
    productName: 'Alaway (Multi-Dose Bottle)',
    brand: 'Alaway',
    category: ALLERGIES,
    barcode: '310119022412',
    formulaId: 'alaway-multidose-bak',
    audience: ADULT,
    minAge: 3,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Ketotifen', strength: '0.025%' }],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('e4c310b5-1dba-4ddc-bc90-b27ebc765871', METH.bkc),
      ),
      cleared('e4c310b5-1dba-4ddc-bc90-b27ebc765871', 'Glycerin'),
      cleared(
        'e4c310b5-1dba-4ddc-bc90-b27ebc765871',
        'Hydrochloric acid and/or sodium hydroxide',
      ),
      cleared('e4c310b5-1dba-4ddc-bc90-b27ebc765871', 'Water for injection'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      'DailyMed setid e4c310b5-1dba-4ddc-bc90-b27ebc765871 (draft, not verified)',
    ],
  },
  {
    id: 'zaditor',
    productName: 'Zaditor',
    brand: 'Zaditor',
    category: ALLERGIES,
    barcode: '300654011057',
    formulaId: 'zaditor-bkc',
    audience: ADULT,
    minAge: 3,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Ketotifen', strength: '0.025%' }],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f', METH.bkc),
      ),
      cleared('ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f', 'Glycerol'),
      cleared('ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f', 'Purified water'),
      cleared(
        'ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f',
        'Sodium hydroxide and/or hydrochloric acid',
      ),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      'DailyMed setid ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f (draft, not verified)',
    ],
  },
  {
    id: 'pataday-once-daily',
    productName: 'Pataday Once Daily Relief',
    brand: 'Pataday',
    category: ALLERGIES,
    barcode: '300658150011',
    formulaId: 'pataday-once-daily-02-bkc',
    audience: ADULT,
    minAge: 2,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Olopatadine', strength: '0.2%' }],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('1c7d2342-ba1c-4244-9814-d92a05725d4e', METH.bkc),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('1c7d2342-ba1c-4244-9814-d92a05725d4e', METH.edta),
      ),
      cleared('1c7d2342-ba1c-4244-9814-d92a05725d4e', 'Dibasic sodium phosphate'),
      cleared('1c7d2342-ba1c-4244-9814-d92a05725d4e', 'Povidone'),
      cleared('1c7d2342-ba1c-4244-9814-d92a05725d4e', 'Purified water'),
      cleared('1c7d2342-ba1c-4244-9814-d92a05725d4e', 'Sodium chloride'),
    ],
    verdict: 'clean',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      'DailyMed setid 1c7d2342-ba1c-4244-9814-d92a05725d4e (draft, not verified)',
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'zyrtec-allergy-tablets',
    productName: 'Zyrtec Allergy Tablets',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '312547204361 312547204323 312547204309 300450206602',
    formulaId: 'zyrtec-allergy-tablets-tio2',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('b165db38-b302-4220-8627-77cb07bb078c', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('b165db38-b302-4220-8627-77cb07bb078c', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('b165db38-b302-4220-8627-77cb07bb078c', METH.sio2),
      ),
      cleared('b165db38-b302-4220-8627-77cb07bb078c', 'Croscarmellose sodium'),
      cleared('b165db38-b302-4220-8627-77cb07bb078c', 'Hypromellose'),
      cleared('b165db38-b302-4220-8627-77cb07bb078c', 'Lactose monohydrate'),
      cleared('b165db38-b302-4220-8627-77cb07bb078c', 'Magnesium stearate'),
      cleared('b165db38-b302-4220-8627-77cb07bb078c', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid b165db38-b302-4220-8627-77cb07bb078c (draft, not verified)',
    ],
  },
  {
    id: 'zyrtec-allergy-liquid-gels',
    productName: 'Zyrtec Allergy Liquid Gels',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450204318 300450204448',
    formulaId: 'zyrtec-allergy-liquid-gels-bht',
    audience: ADULT,
    minAge: 6,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Butylated hydroxytoluene',
        'high',
        dailymed('0face45c-af24-3559-e063-6294a90abde5', METH.bht),
      ),
      flag(
        'Polyethylene glycol 400',
        'moderate',
        dailymed('0face45c-af24-3559-e063-6294a90abde5', METH.peg),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('0face45c-af24-3559-e063-6294a90abde5', METH.sorbitol),
      ),
      cleared('0face45c-af24-3559-e063-6294a90abde5', 'Gelatin'),
      cleared('0face45c-af24-3559-e063-6294a90abde5', 'Glycerin'),
      cleared('0face45c-af24-3559-e063-6294a90abde5', 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 0face45c-af24-3559-e063-6294a90abde5 (draft, not verified)',
    ],
  },
  {
    id: 'claritin-chewable',
    productName: 'Claritin Chewable Tablets (Grape)',
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100810748',
    formulaId: 'claritin-chewable-aspartame-dye',
    audience: ADULT,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg' }],
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.aspartame),
      ),
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.dyes),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.mannitol),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('37732ca2-b454-4215-91a2-c62e0f7a56af', METH.sio2),
      ),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: AGE2_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 37732ca2-b454-4215-91a2-c62e0f7a56af (draft, not verified)',
    ],
  },
  {
    id: 'claritin-allergy-liquid',
    productName: 'Claritin Allergy (Loratadine Liquid)',
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100595416',
    formulaId: 'claritin-allergy-liquid',
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.pg),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.flavors),
      ),
      flag(
        'Maltitol',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.maltitol),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.benzoate),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.edta),
      ),
      cleared('19afd658-8c67-af44-e063-6394a90abada', 'Glycerin'),
      cleared('19afd658-8c67-af44-e063-6394a90abada', 'Purified water'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: AGE2_ORAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 19afd658-8c67-af44-e063-6394a90abada (draft, not verified)',
    ],
  },
  {
    id: 'allegra-allergy-24hr',
    productName: 'Allegra Allergy 24 Hour Tablets',
    brand: 'Allegra',
    category: ALLERGIES,
    barcode: '041167412510 041167412381 041167412060 041167412749',
    formulaId: 'allegra-allergy-24hr-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Fexofenadine HCl', strength: '180mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', METH.tio2),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', METH.sio2),
      ),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Croscarmellose sodium'),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Hypromellose'),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Magnesium stearate'),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Microcrystalline cellulose'),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Povidone'),
      cleared('81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173', 'Pregelatinized starch'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 81c1dcbb-28b3-4ad5-9f3d-9ccc16ddd173 (draft, not verified)',
    ],
  },
  {
    id: 'claritin-d-12hr',
    productName: 'Claritin-D 12 Hour',
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100802088',
    formulaId: 'claritin-d-12hr-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Loratadine', strength: '5mg' },
      { name: 'Pseudoephedrine sulfate', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('a7125705-01ff-4418-8c53-9209c2bbb484', METH.tio2),
      ),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Croscarmellose sodium'),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Dibasic calcium phosphate'),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Hypromellose'),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Lactose monohydrate'),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Magnesium stearate'),
      cleared('a7125705-01ff-4418-8c53-9209c2bbb484', 'Povidone'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Pharmacy'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid a7125705-01ff-4418-8c53-9209c2bbb484 (draft, not verified)',
    ],
  },
  {
    id: 'allegra-d-24hr',
    productName: 'Allegra-D Allergy and Congestion 24 Hour',
    brand: 'Allegra',
    category: ALLERGIES,
    barcode: '041167432075',
    formulaId: 'allegra-d-24hr-tio2-talc',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Fexofenadine HCl', strength: '180mg' },
      { name: 'Pseudoephedrine HCl', strength: '240mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.tio2),
      ),
      flag(
        'Talc',
        'high',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.talc),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.dyes),
      ),
      flag(
        'Propylene glycol',
        'limited',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.pg),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.sio2),
      ),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Pharmacy'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403 (draft, not verified)',
    ],
  },
  {
    id: 'equate-cetirizine-tablets',
    productName: 'Equate Allergy Relief (Cetirizine 10 mg)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '681131288248',
    formulaId: 'store-cetirizine-coated-blue1-tio2',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('b33eb97f-5ac3-4eb7-b23a-cf550ce46287', METH.tio2),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('b33eb97f-5ac3-4eb7-b23a-cf550ce46287', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('b33eb97f-5ac3-4eb7-b23a-cf550ce46287', METH.peg),
      ),
    ],
    verdict: 'avoid',

    retailers: ['Walmart'],
    cleanAlternatives: oralAlts(EQUATE_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid b33eb97f-5ac3-4eb7-b23a-cf550ce46287 (draft, not verified)',
    ],
  },
  {
    id: 'equate-fexofenadine-tablets',
    productName: 'Equate Allergy Relief (Fexofenadine 180 mg)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '681131366403',
    formulaId: 'equate-fexofenadine-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Fexofenadine HCl', strength: '180mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.tio2),
      ),
      flag(
        'Talc',
        'high',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.talc),
      ),
      flag(
        'Polysorbate 80',
        'limited',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.ps80),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.sio2),
      ),
    ],
    verdict: 'avoid',

    retailers: ['Walmart'],
    cleanAlternatives: oralAlts(EQUATE_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 852c8ad2-fc7d-4728-b2c6-f64b960fe2ab (draft, not verified)',
    ],
  },
  {
    id: 'members-mark-cetirizine-tablets',
    productName: "Member's Mark Allergy Relief (Cetirizine 10 mg)",
    brand: "Member's Mark",
    category: ALLERGIES,
    barcode: '193968140366',
    formulaId: 'store-cetirizine-coated-blue1-tio2',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('379756fd-f92d-4773-94fd-2682fcbdfba2', METH.tio2),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('379756fd-f92d-4773-94fd-2682fcbdfba2', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('379756fd-f92d-4773-94fd-2682fcbdfba2', METH.peg),
      ),
    ],
    verdict: 'avoid',

    retailers: ["Sam's Club"],
    cleanAlternatives: oralAlts(KIRKLAND_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 379756fd-f92d-4773-94fd-2682fcbdfba2 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-cetirizine-tablets',
    productName: 'CVS Allergy Relief (Cetirizine 10 mg)',
    brand: 'CVS Health',
    category: ALLERGIES,
    barcode: '050428415368',
    formulaId: 'store-cetirizine-coated-blue1-tio2',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('98f3f2c6-da18-4055-81f1-962261360f9b', METH.tio2),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('98f3f2c6-da18-4055-81f1-962261360f9b', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('98f3f2c6-da18-4055-81f1-962261360f9b', METH.peg),
      ),
    ],
    verdict: 'avoid',

    retailers: ['CVS'],
    cleanAlternatives: oralAlts(CVS_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 98f3f2c6-da18-4055-81f1-962261360f9b (draft, not verified)',
    ],
  },
  {
    id: 'equate-fexofenadine-d',
    productName: 'Equate Allergy Relief D (Fexofenadine / Pseudoephedrine)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '194346065837',
    formulaId: 'equate-fexofenadine-d-dyes',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Fexofenadine HCl', strength: '60mg' },
      { name: 'Pseudoephedrine HCl', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Yellow No. 10 aluminum lake',
        'high',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 2 aluminum lake',
        'high',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.dyes),
      ),
      flag(
        'FD&C Yellow No. 6 aluminum lake',
        'high',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.dyes),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.sio2),
      ),
    ],
    verdict: 'avoid',

    retailers: ['Walmart'],
    cleanAlternatives: oralAlts(EQUATE_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 6daeb739-a112-4a37-abbb-0bbc41b42df3 (draft, not verified)',
    ],
  },
  {
    id: 'equate-cetirizine-d',
    productName: 'Equate Allergy Relief D (Cetirizine / Pseudoephedrine)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '681131099103',
    formulaId: 'equate-cetirizine-d-tio2-talc',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Cetirizine HCl', strength: '5mg' },
      { name: 'Pseudoephedrine HCl', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.tio2),
      ),
      flag(
        'Talc',
        'high',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.talc),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.sio2),
      ),
    ],
    verdict: 'avoid',

    retailers: ['Walmart'],
    cleanAlternatives: oralAlts(EQUATE_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 7b7b8cce-ede6-47c6-91c8-88fd94cb292d (draft, not verified)',
    ],
  },
  {
    id: 'equate-loratadine-d',
    productName: 'Equate Allergy and Congestion Relief (Loratadine-D)',
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '681131355476',
    formulaId: 'equate-loratadine-d-tio2',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Loratadine', strength: '5mg' },
      { name: 'Pseudoephedrine sulfate', strength: '120mg' },
    ],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('306e8736-b27f-4445-b613-3e5b609f8d42', METH.tio2),
      ),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Croscarmellose sodium'),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Dibasic calcium phosphate'),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Hypromellose'),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Lactose monohydrate'),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Magnesium stearate'),
      cleared('306e8736-b27f-4445-b613-3e5b609f8d42', 'Povidone'),
    ],
    verdict: 'avoid',

    retailers: ['Walmart'],
    cleanAlternatives: oralAlts(EQUATE_LORATADINE),
    sourcesGeneral: [
      'DailyMed setid 306e8736-b27f-4445-b613-3e5b609f8d42 (draft, not verified)',
    ],
  },
  {
    id: 'astepro-allergy',
    productName: 'Astepro Allergy',
    brand: 'Astepro',
    category: ALLERGIES,
    barcode: '041100589903',
    formulaId: 'astepro-allergy-sucralose',
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Azelastine HCl', strength: '205.5mcg / spray' },
    ],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'limited',
        dailymed('e0640846-19a6-7f79-e053-2995a90a8176', METH.sucralose),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('e0640846-19a6-7f79-e053-2995a90a8176', METH.sorbitol),
      ),
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('e0640846-19a6-7f79-e053-2995a90a8176', METH.bkc),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('e0640846-19a6-7f79-e053-2995a90a8176', METH.edta),
      ),
      cleared('e0640846-19a6-7f79-e053-2995a90a8176', 'Hypromellose'),
      cleared('e0640846-19a6-7f79-e053-2995a90a8176', 'Purified water'),
      cleared('e0640846-19a6-7f79-e053-2995a90a8176', 'Sodium citrate'),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid e0640846-19a6-7f79-e053-2995a90a8176 (draft, not verified)',
    ],
  },
  {
    id: 'benadryl-ultratabs',
    productName: 'Benadryl Allergy Ultratabs',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450171122 312547171366 312547170314 300450170149',
    formulaId: 'benadryl-ultratabs-dye-tio2',
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 27 aluminum lake',
        'high',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.dyes),
      ),
      flag(
        'Titanium dioxide',
        'high',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.tio2),
      ),
      flag(
        'Polysorbate 80',
        'limited',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.ps80),
      ),
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.peg),
      ),
      flag('Carnauba wax', 'cleared', dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.carnaubaT133u)),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Croscarmellose sodium'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Hypromellose'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Magnesium stearate'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 702f9786-7ce9-43e4-921d-e1db09612127 (draft, not verified)',
    ],
  },
  {
    id: 'benadryl-liqui-gels',
    productName: 'Benadryl Allergy Liqui-Gels',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '312547170215',
    formulaId: 'benadryl-liqui-gels',
    audience: ADULT,
    minAge: 6,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag(
        'Polyethylene glycol',
        'limited',
        dailymed('bfeae100-e2d1-4607-be3b-2d9b15cd4f7f', METH.peg),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('bfeae100-e2d1-4607-be3b-2d9b15cd4f7f', METH.sorbitol),
      ),
      cleared('bfeae100-e2d1-4607-be3b-2d9b15cd4f7f', 'Gelatin'),
      cleared('bfeae100-e2d1-4607-be3b-2d9b15cd4f7f', 'Glycerin'),
      cleared('bfeae100-e2d1-4607-be3b-2d9b15cd4f7f', 'Purified water'),
    ],
    verdict: 'caution',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid bfeae100-e2d1-4607-be3b-2d9b15cd4f7f (draft, not verified)',
    ],
  },
  {
    id: 'benadryl-allergy-liquid',
    productName: 'Benadryl Allergy Liquid',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450534248',
    formulaId: 'benadryl-allergy-liquid-dye',
    audience: ADULT,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('224ba2a3-1a93-29c8-e063-6394a90a9bef', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('224ba2a3-1a93-29c8-e063-6394a90a9bef', METH.dyes),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('224ba2a3-1a93-29c8-e063-6394a90a9bef', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('224ba2a3-1a93-29c8-e063-6394a90a9bef', METH.benzoate),
      ),
      cleared('224ba2a3-1a93-29c8-e063-6394a90a9bef', 'Glycerin'),
      cleared('224ba2a3-1a93-29c8-e063-6394a90a9bef', 'Purified water'),
      cleared('224ba2a3-1a93-29c8-e063-6394a90a9bef', 'Sucrose'),
    ],
    verdict: 'avoid',

    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 224ba2a3-1a93-29c8-e063-6394a90a9bef (draft, not verified)',
    ],
  },
];
