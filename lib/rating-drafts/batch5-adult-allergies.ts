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
  maltodextrin: 'Methodology §5 Limited-risk (non-organic maltodextrin)',
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
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: ALLERGIES,
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
    honestNote:
      'FOUNDER CALL: plain loratadine tablets with no TiO2 = Clean. L612 store/club family (lactose / magnesium stearate / povidone / pregelatinized starch). Pack sizes share formulaId. Some of the same retailers also sell coated / -D SKUs under similar names — confirm this inactive list on the bottle.',
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
}): RatingRecord {
  return {
    id: opts.id,
    productName: opts.productName,
    brand: opts.brand,
    category: ALLERGIES,
    formulaId: 'loratadine-mint-odt-sucralose',
    audience: ADULT,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '10mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(opts.setid, METH.sucralose)),
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
    honestNote:
      'FOUNDER CALL: Equate / Signature Care mint dissolve loratadine (sucralose) = Caution. Raw demerit math is sucralose 2 + mannitol 1 + mint flavor 1 = 4 pts Avoid — draft follows the locked Caution call, not a 3-pt Avoid stack. Same mint-ODT formulaId across these store brands. Do not treat RediTabs (no sucralose) as this formula.',
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
    honestNote:
      'FOUNDER CALL: AllergyCalm meltaways = Clean. Draft Clean on inactives (croscarmellose sodium, lactose, magnesium stearate). Homeopathic meltaways — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Twin tablet SPL d92d9269 shares the same inactives. Pellet SPLs (lactose / sucrose) are a different form and are not this row. Contains lactose. Ages 6+.',
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
    honestNote:
      'FOUNDER CALL: Xlear no-BKC 4-ingredient formula = Clean, separate formulaId from the BKC decongestant. Manufacturer carton (xlear.com saline+xylitol mist / squeeze) lists purified water, xylitol, USP sodium chloride, grapefruit seed extract — matches Clean Picks. No DailyMed SPL (drug-free saline, not an OTC drug). Grapefruit seed extract is not in Methodology §5 (ungraded; v1.6 intake) — draft Clean follows the locked no-BKC call, not a new ingredient lock. Carton has no numeric age floor beyond keep-out-of-reach; minAge 2 is a conservative adult-batch floor for family saline, not a verified labeled age. Confirm the 4-ingredient list — a BKC / oxymetazoline bottle is a different product.',
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
    honestNote:
      'FOUNDER CALL: NeilMed Sinus Rinse packets = Clean. Manufacturer / Clean Picks: USP-grade sodium chloride + sodium bicarbonate only — preservative-free, iodine-free. No DailyMed SPL (device / saline packet, not an OTC drug). Use only distilled, sterile, or previously boiled-and-cooled water — never untreated tap water (FDA guidance). Carton has no numeric age floor; minAge 2 is a conservative family-rinse floor, not a verified labeled age. Adult drugstore SKU.',
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
    honestNote:
      "FOUNDER CALL: Beekeeper's nasal is Clean ONLY if bottle inactives match Clean Picks. Current manufacturer page lists saline solution, xylitol, propolis extract, E-polylysine, nisin, citric acid — matches Clean Picks (citric acid / nisin / poly-lysine). Nisin and poly-lysine are not in Methodology §5 (ungraded; v1.6 intake) — draft Clean follows the locked match call, not a new ingredient lock. No DailyMed SPL (dietary supplement / nasal hygiene). Bee-product allergy disclaimer. Manufacturer age floor 18+. If a later carton adds BKC or other graded flags, this Clean does not carry over. Max (eucalyptus / oregano) is a different formula and is not this row.",
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
    honestNote:
      'FOUNDER CALL: Similasan Allergy Eye = Clean only if PF / no BKC-type preservative. Single-use SPL (setid 39ee6e65; twin 3f0ddebd) is phosphate buffer + purified water — no BKC, no silver sulfate. Homeopathic — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 2+. DailyMed marks some NDCs inactivated — confirm the single-use carton. Multi-dose silver-sulfate bottle is a separate Caution formulaId.',
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
    honestNote:
      'FOUNDER CALL: Alaway Preservative Free = Clean. Separate formulaId from the multi-dose BAK bottle. No DailyMed SPL for the PF SKU (NDC 24208-600 appears on Bausch listings; DailyMed only publishes the BAK bottle e4c310b5). Inactives from Bausch / Clean Picks / MPR: glycerin, water for injection, HCl and/or NaOH — no benzalkonium chloride. Ages 3+. Remove contact lenses before use. Confirm the single-use “Preservative Free” carton — the 10 mL bottle is Caution.',
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
    honestNote:
      'FOUNDER CALL: plain Claritin tablets with no TiO2 = Clean. Founder-cited setid 219ab9c4 (Navajo convenience) and Bayer national SPLs 660ac9df / ac32d6f9 share corn starch, lactose monohydrate, magnesium stearate. This is not RediTabs, not chewable, not liquid, not -D. Ages 6+.',
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
  }),
  l612Record({
    id: UPUP_LORATADINE,
    productName: 'up&up Allergy Relief (Loratadine 10 mg)',
    brand: 'up&up',
    retailers: ['Target'],
    setid: 'c4ef0110-89c3-4ded-9a9a-75c0f794f869',
  }),
  {
    id: CVS_LORATADINE,
    productName: 'CVS Loratadine 10 mg Tablets',
    brand: 'CVS Health',
    category: ALLERGIES,
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
    honestNote:
      'FOUNDER CALL: plain CVS loratadine with no TiO2 = Clean. Separate formulaId from the L612 Equate / up&up / Kirkland family (this SPL adds corn starch + povidone). Confirm the uncoated tablet list — CVS also sells coated cetirizine and -D SKUs.',
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
  }),

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-allergy-care',
    productName: 'Genexa Allergy Care',
    brand: 'Genexa',
    category: ALLERGIES,
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
      cleared('b5fddd8f-a380-6e88-e053-2a95a90a6b89', 'Carnauba wax (organic)'),
      cleared('b5fddd8f-a380-6e88-e053-2a95a90a6b89', 'Dextrose (organic)'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Genexa Allergy Care = Caution (maltodextrin). Do NOT keep the live Clean Picks Clean grade. Do not extend the adult Genexa ES Clean exception. DailyMed lists organic maltodextrin; organic flavors / dextrose / carnauba wax are Cleared. Rice bran extract is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake). Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Adult directions 12+ (a 3–11 chart exists — this row is the adult SKU).',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Xlear with BKC = Caution, separate formulaId from the no-BKC 4-ingredient saline. This is the DailyMed decongestant SPL (oxymetazoline 0.05% + benzalkonium chloride) — not the drug-free Clean Picks saline. BKC is a standalone Caution (not Avoid, not additive-scored). Grapefruit seed extract is not independently graded in §5. Ages 6+ with adult supervision. Limit oxymetazoline to labeled days (rebound congestion is standard-of-care, not a cleanliness flag).',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Similasan Allergy Eye = Caution if multi-dose preservative on label. 10 mL bottle SPL (setid 3377eced; twin 01b8052d) lists silver sulfate as preservative — not BKC, so this is not an Avoid. Silver sulfate is not in Methodology §5 (ungraded; v1.6 intake) — draft follows the locked multi-dose-preservative Caution, not a new ingredient lock and not the colloidal-silver active-safety cap. ' +
      CARLSTON +
      ' Ages 2+. DailyMed marks some NDCs inactivated — confirm the 10 mL carton still carries silver sulfate. PF single-use is a separate Clean formulaId.',
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
    honestNote:
      'FOUNDER CALL: Claritin RediTabs = Clean IF inactives stay clean (setid 7dc04b48). Matched SPL is anhydrous citric acid, gelatin, mannitol, mint flavor. Mannitol is Limited (sugar alcohol) and mint flavor is Limited (opacity) → 2 pts Caution. Clean is not invented. Twin 10 mg RediTabs SPL b681ea25 shares the same inactives (separate strength, same formula family). Ages 6+. This is not the sucralose mint-ODT store set.',
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
  }),
  mintOdtRecord({
    id: 'signature-care-loratadine-mint-odt',
    productName: 'Signature Care Allergy Relief Loratadine ODT (Mint)',
    brand: 'Signature Care',
    retailers: ['Safeway', 'Albertsons'],
    setid: '0a4b8eef-762e-42cc-84ee-0018a9a3be58',
    preferredAlt: CLARITIN_PLAIN,
  }),
  {
    id: 'flonase-allergy-relief',
    productName: 'Flonase Allergy Relief',
    brand: 'Flonase',
    category: ALLERGIES,
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
        'moderate',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Flonase = Caution (BKC ± PS80). BKC is standalone Caution (not Avoid). PS80 is Moderate (2 pts) → Caution. Phenylethyl alcohol is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake). Adult SKU 12+ (a children\'s Flonase exists — not this row).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid b6134ba0-b70a-4eac-9a82-cef64b242c1d (draft, not verified)',
    ],
  },
  {
    id: 'flonase-sensimist',
    productName: 'Flonase Sensimist Allergy Relief',
    brand: 'Flonase',
    category: ALLERGIES,
    formulaId: 'flonase-sensimist-bkc-ps80',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Fluticasone furoate', strength: '27.5mcg / spray' },
    ],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('107100af-7ca2-44e8-b067-c0ab0a19a6dc', METH.bkc),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('107100af-7ca2-44e8-b067-c0ab0a19a6dc', METH.ps80),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('107100af-7ca2-44e8-b067-c0ab0a19a6dc', METH.edta),
      ),
      cleared('107100af-7ca2-44e8-b067-c0ab0a19a6dc', 'Carboxymethylcellulose sodium'),
      cleared('107100af-7ca2-44e8-b067-c0ab0a19a6dc', 'Dextrose anhydrous'),
      cleared('107100af-7ca2-44e8-b067-c0ab0a19a6dc', 'Microcrystalline cellulose'),
      cleared('107100af-7ca2-44e8-b067-c0ab0a19a6dc', 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Sensimist = Caution (BKC ± PS80). Separate formulaId from Flonase Allergy Relief (furoate vs propionate; EDTA present here). Adult SKU 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 107100af-7ca2-44e8-b067-c0ab0a19a6dc (draft, not verified)',
    ],
  },
  {
    id: 'equate-fluticasone-nasal',
    productName: 'Equate Allergy Relief (Fluticasone Propionate)',
    brand: 'Equate',
    category: ALLERGIES,
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
        'moderate',
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
    honestNote:
      'FOUNDER CALL: Equate fluticasone = Caution (BKC ± PS80). Flonase-style store spray. Phenylethyl alcohol is on the SPL and is not in §5 (ungraded). Adult 12+.',
    retailers: ['Walmart'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid bc824143-b876-4c3d-86fd-81fb58673851 (draft, not verified)',
    ],
  },
  {
    id: 'nasacort-allergy-24hr',
    productName: 'Nasacort Allergy 24HR',
    brand: 'Nasacort',
    category: ALLERGIES,
    formulaId: 'nasacort-allergy-24hr-bkc-ps80',
    audience: ADULT,
    minAge: 12,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Triamcinolone acetonide', strength: '55mcg / spray' },
    ],
    inactiveIngredients: [
      flag(
        'Benzalkonium chloride',
        'cleared',
        dailymed('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', METH.bkc),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', METH.ps80),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', METH.edta),
      ),
      cleared('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', 'Carboxymethylcellulose sodium'),
      cleared('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', 'Dextrose'),
      cleared('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', 'Microcrystalline cellulose'),
      cleared('4bff57a5-cce0-401c-a0fe-23c65c1b7ddc', 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Nasacort = Caution (BKC ± PS80). HCl / NaOH pH adjusters are Cleared-class. Adult SKU 12+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4bff57a5-cce0-401c-a0fe-23c65c1b7ddc (draft, not verified)',
    ],
  },
  {
    id: 'nasalcrom',
    productName: 'NasalCrom',
    brand: 'NasalCrom',
    category: ALLERGIES,
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: NasalCrom = Caution (BKC) if including. BKC is standalone Caution (not Avoid). Ages 2+ (under 2: do not use unless directed by a doctor). Adult drugstore SKU.',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: A36 multi-dose Alaway = Caution. Separate formulaId from Alaway PF. BAK 0.01% is standalone Caution (not Avoid). Ages 3+. The PF single-use carton is the Clean twin.',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Zaditor = Caution (BKC) if including. BAK 0.01%. Ages 3+.',
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
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Pataday = Caution (BKC) if including. This row is Once Daily 0.2% (setid 1c7d2342). Extra Strength 0.7% (setid 6d07a5d6) also has BAK plus PEG 400 (Moderate) — still Caution, separate formula, not this row. Twice Daily 0.1% is another BAK formula. Ages 2+.',
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
        'moderate',
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
    honestNote:
      'FOUNDER CALL: Zyrtec tablets (TiO2) = Avoid. 5 mg film-coated twin (setid 2c1ecee3) shares the same TiO2 / PEG coat. Ages 6+.',
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
    honestNote:
      'FOUNDER CALL: Zyrtec liquid gels (BHT) = Avoid. Pharmaceutical ink is on the SPL (ungraded appearance ink; not the Avoid driver). Ages 6+.',
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
    honestNote:
      'FOUNDER CALL: Claritin chewables = Avoid. Grape chewable (aspartame + lake dyes). Bubblegum twin (setid 20938e05) is aspartame + carmine — still Avoid (aspartame High). Cool Mint chewable (98b99bb9) is aspartame + Blue #1 lake — still Avoid. Phenylketonurics: aspartame. Adult drugstore SKU; labeled down to young children — this row stays audience adult.',
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
        'moderate',
        dailymed('19afd658-8c67-af44-e063-6394a90abada', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
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
    honestNote:
      'FOUNDER CALL: Claritin liquid = Avoid. Sucralose + oral PG (2+2) plus flavors / sugar alcohols / benzoate. Dye-free is not Clean. Adult-labeled Claritin Allergy liquid; a Children Claritin twin exists — this row is the adult SKU name on DailyMed. Menthol is on the SPL (parked as a topical-active pending review; not an inactive-table grade).',
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
        'moderate',
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
    honestNote:
      'FOUNDER CALL: Allegra 24hr tablets (TiO2) = Avoid. Iron oxide blends are on the SPL and are not in Methodology §5 (ungraded; not the Avoid driver). Ages 12+.',
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
    honestNote:
      'FOUNDER CALL: -D combos = Avoid. Claritin-D 12 Hour is TiO2-coated. Claritin-D 24 Hour (setid f046a807) is a separate TiO2 formula (plus PEG / silica) — same Avoid family, not this row. Ages 12+.',
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
        'moderate',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.pg),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('1fb77d6a-fae2-40ae-8f8e-fa2dc66f4403', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: -D combos = Avoid. Allegra-D 24 Hour stacks TiO2, talc, and Blue #1 lake. Ages 12+.',
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
        'moderate',
        dailymed('b33eb97f-5ac3-4eb7-b23a-cf550ce46287', METH.peg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: coated cetirizine store brands (TiO2) = Avoid. Equate / Member\'s Mark / CVS share the Blue #1 lake + TiO2 coat family. Pack sizes share this formulaId when the inactive list matches. Ages 6+.',
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
        'moderate',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.ps80),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('852c8ad2-fc7d-4728-b2c6-f64b960fe2ab', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate fexofenadine / TiO2 store brands = Avoid. Talc is also High. Iron oxides and light liquid paraffin are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). Ages 12+.',
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
        'moderate',
        dailymed('379756fd-f92d-4773-94fd-2682fcbdfba2', METH.peg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Member\'s Mark cetirizine / TiO2 = Avoid. Same Blue #1 lake + TiO2 coat as Equate cetirizine — shared formulaId. Ages 6+.',
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
        'moderate',
        dailymed('98f3f2c6-da18-4055-81f1-962261360f9b', METH.peg),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: coated cetirizine store brands (TiO2) = Avoid. CVS indoor/outdoor 10 mg tablet matches the Equate / Member\'s Mark Blue #1 + TiO2 coat — shared formulaId. Ages 6+.',
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
        'moderate',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('6daeb739-a112-4a37-abbb-0bbc41b42df3', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store -D combos = Avoid. Equate fexofenadine-D is a lake-dye ER tablet (Yellow #10 / Blue #2 / Yellow #6). Ages 12+.',
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
        'moderate',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.peg),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('7b7b8cce-ede6-47c6-91c8-88fd94cb292d', METH.sio2),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store -D combos = Avoid. Equate cetirizine-D is TiO2 + talc. Ages 12+.',
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
    honestNote:
      'FOUNDER CALL: -D combos = Avoid. Equate loratadine-D is the Claritin-D 12 Hour TiO2 coat on a store label. Ages 12+.',
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
        'moderate',
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
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Astepro = Avoid. Sucralose (2) + sorbitol (1) = 3 pts Avoid. BKC is standalone Caution (not Avoid) and is not the Avoid driver. Adult SKU; children under 6 do not use. A children\'s Astepro twin exists — not this row.',
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
        'moderate',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.ps80),
      ),
      flag(
        'Polyethylene glycol',
        'moderate',
        dailymed('702f9786-7ce9-43e4-921d-e1db09612127', METH.peg),
      ),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Carnauba wax'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Croscarmellose sodium'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Hypromellose'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Magnesium stearate'),
      cleared('702f9786-7ce9-43e4-921d-e1db09612127', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Benadryl family (tablets) = Avoid. Ultratabs are Red #27 lake + TiO2. Extra Strength 50 mg tablets (setid dd0a8069) are TiO2 + PS80 without the red lake — still Avoid, separate strength. Ages 6+ (6–11 half dose). First-generation / sedating — listed as a cleanliness note only, not an efficacy claim.',
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
        'moderate',
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
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Benadryl family (Liqui-Gels) = Avoid. Dye-free ink is called out on the SPL; PEG (2) + sorbitol (1) = 3 pts Avoid. Extra Strength Liqui-Gels are a separate SKU in the same Avoid family. Ages 6+.',
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
    honestNote:
      'FOUNDER CALL: Benadryl family (liquid) = Avoid. Red #33 + Red #40. Poloxamer 407 and monoammonium glycyrrhizinate are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). HFCS is not on this SPL. Ages 6+ (adult 12+ dose is 10–20 mL). Children\'s Benadryl twins are out of this adult batch.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: oralAlts(),
    sourcesGeneral: [
      'DailyMed setid 224ba2a3-1a93-29c8-e063-6394a90a9bef (draft, not verified)',
    ],
  },
];
