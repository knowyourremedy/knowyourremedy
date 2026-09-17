// DRAFT / not verified / batch 6 kids allergies
// Allergies · audience 'kids' · recordStatus is 'unverified' on every row.
// Founder calls (locked): see notes below. Do NOT invent Clean. Methodology v1.6
// grades only — do not change locked ingredient grades.
// Homeopathic rows set productSubtype + homeopathicSubtype = 'homeopathic'.
// Barcodes omitted — do not invent UPCs. Pack sizes share formulaId.
// HFCS is parked (Methodology §5) — mentioned in honestNotes only, never graded.
// Form is labeled on cleanAlternatives, not a hard filter (§6).
// Not wired into Clean Picks UI. Do not convert allergyPicks.ts from this file.
//
// CLEAN PICKS STALE NOTE (do not edit live Clean Picks from this draft):
// allergyPicks.ts still lists Genexa Kids' Allergy as a live Clean pick with
// "natural citrus extract." DailyMed SPL a7bc5f7c listed flavor (natural)
// only. Live Genexa.com (batch 32 OI update) now lists Natural Citrus
// Extract. Founder don't-demerit-natural-flavors exception on this REUSE
// id is KEPT — row stays Clean. Live Clean Picks file is unchanged.
//
// FOUNDER CALLS (LOCKED):
// - KA1 Genexa Kids' Allergy DPH liquid = Clean. SPL confirmed
//   (setid a7bc5f7c-eaeb-25d0-e053-2a95a90a9ec4). Live Genexa.com now
//   lists Natural Citrus Extract. Founder don't-demerit-natural-flavors
//   exception KEPT (same as Kids APAP / Kids Multi). minAge 6.
// - KA2 Genexa Kids Allergy Care homeopathic = Caution (maltodextrin).
//   setid ba0da07a-107b-2c66-e053-2995a90ab96a. Do NOT extend the adult
//   Genexa ES Clean exception.
// - KA3 AllergyCalm meltaways = Clean kids-usable twin of adult batch 5
//   (croscarmellose / lactose / Mg stearate). audience kids, minAge 2.
//   formulaId shared with adult `boiron-allergycalm-meltaways`.
// - Children's Zyrtec chewable / dissolve = Caution (sucralose only).
//   Raw demerit math would Avoid (sucralose + flavor + mannitol) — draft
//   follows the locked Caution call.
// - Children's Zyrtec / Claritin / store loratadine liquids = Avoid
//   (sucralose + PG).
// - Claritin chews / Allegra ODT = Avoid (aspartame ± dyes).
// - Children's Allegra liquid = Avoid (TiO2 + PG).
// - Equate Children's cetirizine = Avoid (parabens + PG + sucralose).
// - up&up kids cetirizine = Avoid even if dye-free.
// - Children's Benadryl dyed and dye-free = Avoid.
// - Kids Flonase / Equate fluticasone / Nasacort 2+ = Caution (BKC).
//   Same formulaId as adult batch 5 when inactives match:
//     Children's Flonase → flonase-allergy-relief-bkc-ps80
//     Equate kids-facing fluticasone → equate-fluticasone-bkc-ps80
//     Nasacort kids-facing → nasacort-allergy-24hr-bkc-ps80
// BKC / benzalkonium = Caution (not Avoid). TiO2 / aspartame / dyes /
// parabens / propyl gallate = High Avoid. Sucralose / PG (oral) = Moderate.
//
// NASAL FORMULAID SHARING (adult batch 5):
// Children's Flonase inactives match adult Flonase (BKC + PS80 + dextrose /
// MCC / NaCMC / water; phenylethyl alcohol ungraded). Equate kids-facing
// fluticasone is the same 4+ / 12+ bottle as adult setid bc824143. Nasacort
// 2+ directions live on the same adult setid 4bff57a5. Kids rows reuse those
// adult formulaIds so a later grade change propagates conceptually.
//
// SKIPPED:
// - Basic Care kids cetirizine / allergy — Amazon-only (founder skip).
// - Unclear Walgreens / Signature Care kids allergy SKUs without a
//   confirmed setid (founder skip). Walgreens children's DPH chew SPL
//   0b34b5a3 is titled Delisted — not written.
// - AllergyCalm pellet SPLs (da48192b / deae124a, lactose + sucrose) —
//   different form from the locked meltaway Clean; not this row.
//
// PENDING: none for KA1 (SPL now confirmed). No other pending Clean.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ALLERGIES = 'Allergies';
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  aspartame:
    'Methodology §5 High-tier (aspartame — IARC 2B; locked Avoid, §0 override)',
  parabens: 'Methodology §5 High-tier (parabens)',
  propylGallate: 'Methodology §5 High-tier (propyl gallate — locked v1.6)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin: 'Methodology §5 Limited-risk (maltodextrin — organic and non-organic)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  sorbitol: 'Methodology §5 Limited-risk (sugar alcohols — sorbitol)',
  mannitol: 'Methodology §5 Limited-risk (sugar alcohols — mannitol)',
  maltitol: 'Methodology §5 Limited-risk (sugar alcohols — maltitol)',
  xylitolOral: 'Methodology §5 Limited-risk (sugar alcohols — xylitol, oral)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  carmine:
    'Methodology §5 Caution (cochineal / carmine — population hypersensitivity; not Avoid)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not additive-scored, not Avoid)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic — locked v1.6)',
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
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

// ── Independently Clean rows in THIS batch only ────────────
const GENEXA_DPH = 'genexa-kids-allergy-dph-liquid';
const ALLERGYCALM = 'boiron-allergycalm-meltaways';

const STORE_LORATADINE_LIQUID = 'store-kids-loratadine-liquid';
const UPUP_CETIRIZINE = 'upup-kids-cetirizine-liquid';

// Age-match: AllergyCalm is minAge 2 (age-matched for 2+). Genexa DPH is
// minAge 6 — list it on 2+ rows with an explicit 6+ note. Form is labeled,
// not a hard filter (§6). KA1 pending is closed; two Cleans exist here.

const ORAL_ALTS_AGE6: CleanAlternative[] = [
  {
    productId: GENEXA_DPH,
    rankReason:
      'Closest independently Clean kids conventional oral analog in this batch (diphenhydramine liquid, minAge 6). Form: liquid.',
  },
  {
    productId: ALLERGYCALM,
    rankReason:
      'Independently Clean kids-usable homeopathic meltaway (minAge 2). Form: meltaway tablet — labeled, not a hard filter (§6).',
  },
];

const ORAL_ALTS_AGE2: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean kids oral analog that is age-matched for 2+ (homeopathic meltaway, minAge 2). Form: meltaway tablet.',
  },
  {
    productId: GENEXA_DPH,
    rankReason:
      'Independently Clean kids conventional DPH liquid (minAge 6 — higher than this 2+ product; not an age-matched swap for ages 2–5). First-generation / sedating. Form: liquid — labeled, not a hard filter (§6).',
  },
];

const HOMEOPATHIC_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean homeopathic Allergies peer in this batch (meltaway tablets, minAge 2). Form: meltaway tablet.',
  },
  {
    productId: GENEXA_DPH,
    rankReason:
      'Independently Clean kids conventional DPH liquid (minAge 6) if a non-homeopathic swap is preferred. Form: liquid — labeled, not a hard filter (§6).',
  },
];

const DISSOLVE_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'Closest independently Clean dissolve / melt analog (homeopathic meltaway, minAge 2). Form: meltaway tablet.',
  },
  {
    productId: GENEXA_DPH,
    rankReason:
      'Independently Clean kids conventional DPH liquid (minAge 6). Form: liquid vs dissolve — labeled, not a hard filter (§6).',
  },
];

const CHEW_ALTS_AGE6: CleanAlternative[] = [
  {
    productId: GENEXA_DPH,
    rankReason:
      'Closest independently Clean kids conventional oral analog (DPH liquid, minAge 6). Form: liquid vs chewable — labeled, not a hard filter (§6).',
  },
  {
    productId: ALLERGYCALM,
    rankReason:
      'Independently Clean kids-usable homeopathic meltaway (minAge 2). Form: meltaway tablet vs chewable — labeled, not a hard filter (§6).',
  },
];

const NASAL_ALTS: CleanAlternative[] = [
  {
    productId: ALLERGYCALM,
    rankReason:
      'No independently Clean kids nasal in this batch. Closest same-batch Clean Allergies analog is AllergyCalm meltaways (minAge 2). Form: meltaway tablet vs nasal spray — labeled, not a hard filter (§6).',
  },
  {
    productId: GENEXA_DPH,
    rankReason:
      'Independently Clean kids conventional oral DPH liquid (minAge 6). Form: liquid vs nasal — labeled, not a hard filter (§6).',
  },
];

function storeLoratadineLiquid(opts: {
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
    formulaId: STORE_LORATADINE_LIQUID,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', dailymed(opts.setid, METH.sucralose)),
      flag('Propylene glycol', 'moderate', dailymed(opts.setid, METH.pg)),
      flag('Flavor', 'limited', dailymed(opts.setid, METH.flavors)),
      flag('Maltitol', 'limited', dailymed(opts.setid, METH.maltitol)),
      flag('Sorbitol', 'limited', dailymed(opts.setid, METH.sorbitol)),
      flag('Sodium benzoate', 'limited', dailymed(opts.setid, METH.benzoate)),
      flag('Edetate disodium', 'cleared', dailymed(opts.setid, METH.edta)),
      cleared(opts.setid, 'Glycerin'),
      cleared(opts.setid, 'Monobasic sodium phosphate'),
      cleared(opts.setid, 'Phosphoric acid'),
      cleared(opts.setid, 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: store kids loratadine liquids = Avoid (sucralose + oral PG). Dye-free / sugar-free marketing does not clear two Moderate flags. Equate / up&up / CVS grape liquids share this formulaId (identical inactives). Ages 2+.',
    retailers: opts.retailers,
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      `DailyMed setid ${opts.setid} (store kids loratadine liquid family; draft, not verified)`,
    ],
  };
}

export const BATCH6_KIDS_ALLERGIES: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: GENEXA_DPH,
    productName: "Genexa Kids' Allergy",
    brand: 'Genexa',
    category: ALLERGIES,
    barcode: '850015736001',
    formulaId: GENEXA_DPH,
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
        'Organic agave syrup',
        'cleared',
        dailymed('a7bc5f7c-eaeb-25d0-e053-2a95a90a9ec4', METH.organicFlavor),
      ),
      flag(
        'Natural Citrus Extract',
        'cleared',
        'https://www.genexa.com/products/kids-diphenhydramine-allergy-liquid; Founder exception KEPT: this Kids Allergy DPH liquid stays Clean. Live Genexa.com now lists Natural Citrus Extract (Limited-class flavor under Sept 14 locks). Same don\'t-demerit-natural-flavors exception as Kids APAP / Kids Multi conventional liquids. DailyMed setid a7bc5f7c previously said flavor (natural) only — carton/live site is now citrus extract. Do not apply Limited → Caution on this REUSE id.',
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('a7bc5f7c-eaeb-25d0-e053-2a95a90a9ec4', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER CALL: draft Clean — exception KEPT after live OI update. Live Genexa.com now lists Natural Citrus Extract (Limited-class flavor under Sept 14 locks). This row has an explicit don\'t-demerit-natural-flavors founder exception, same as Kids APAP / Kids Multi conventional liquids — do not apply Limited → Caution on this REUSE id. Organic agave is Cleared. DailyMed setid a7bc5f7c previously said flavor (natural) only. Carton Ages 6+; children 2 to under 6 years: do not use unless directed by a doctor; under 2: do not use. Diphenhydramine is a first-generation (sedating) antihistamine — listed as a cleanliness / use note only, not an efficacy claim. Always dose with the enclosed cup. Live Clean Pick may stay; this draft does not edit allergyPicks.ts.',
    retailers: ['Walmart', 'CVS', 'Target', 'Whole Foods'],
    sourcesGeneral: [
      'https://www.genexa.com/products/kids-diphenhydramine-allergy-liquid (live OI; draft, not verified)',
      'DailyMed setid a7bc5f7c-eaeb-25d0-e053-2a95a90a9ec4 (prior SPL flavor (natural); draft, not verified)',
    ],
  },
  {
    id: ALLERGYCALM,
    productName: 'Boiron AllergyCalm Meltaway Tablets',
    brand: 'Boiron',
    category: ALLERGIES,
    barcode: '306969307045',
    formulaId: ALLERGYCALM,
    audience: KIDS,
    minAge: 2,
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
      'FOUNDER CALL: AllergyCalm meltaways = Clean kids-usable twin of the adult batch 5 formula — inactives match (croscarmellose sodium, lactose, magnesium stearate). Shared formulaId `boiron-allergycalm-meltaways` with the adult row so the Clean grade propagates conceptually. Cited setid d9a509d9 is titled AllergyCalm Kids Tablets and supplies 2+ directions; twin tablet SPL d92d9269 shares the same three inactives. Pellet SPLs (lactose / sucrose) are a different form and are not this row. Homeopathic meltaways — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Contains lactose. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    sourcesGeneral: [
      'DailyMed setid d9a509d9-15c8-20bb-e053-2a95a90a3edd (inactives + 2+ directions); d92d9269-7532-2f0e-e053-2a95a90ab0d6 (twin tablets) — draft, not verified',
      CARLSTON,
    ],
  },

  // ── Caution ──────────────────────────────────────────────
  {
    id: 'genexa-kids-allergy-care',
    productName: "Genexa Kids' Allergy Care",
    brand: 'Genexa',
    category: ALLERGIES,
    barcode: '857630006021',
    formulaId: 'genexa-kids-allergy-care',
    audience: KIDS,
    minAge: 3,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '12X HPUS' },
      { name: 'Dulcamara', strength: '12X HPUS' },
      { name: 'Euphrasia officinalis', strength: '12X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '12X HPUS' },
      { name: 'Rosa damascena', strength: '6X HPUS' },
      { name: 'Sabadilla', strength: '12X HPUS' },
      { name: 'Sinapis nigra', strength: '12X HPUS' },
      { name: 'Wyethia helenioides', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Maltodextrin (organic)',
        'limited',
        dailymed('ba0da07a-107b-2c66-e053-2995a90ab96a', METH.maltodextrin),
      ),
      flag(
        'Açaí berry flavor (organic)',
        'cleared',
        dailymed('ba0da07a-107b-2c66-e053-2995a90ab96a', METH.organicFlavor),
      ),
      cleared('ba0da07a-107b-2c66-e053-2995a90ab96a', 'Carnauba wax (organic)'),
      cleared('ba0da07a-107b-2c66-e053-2995a90ab96a', 'Dextrose (organic)'),
      flag(
        'Organic rice bran extract',
        'cleared',
        dailymed('ba0da07a-107b-2c66-e053-2995a90ab96a', METH.riceBran),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Genexa Kids Allergy Care = Caution (organic maltodextrin Limited 1 pt). Do not extend the adult Genexa ES Clean exception. Organic flavors / dextrose / carnauba wax and organic rice bran extract are Cleared. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 3–11 (under 3: ask a doctor). Separate formulaId from adult Genexa Allergy Care (different actives, including Rosa damascena 6X).',
    retailers: ['CVS', 'Target', 'Walmart', 'Whole Foods', 'Sprouts'],
    cleanAlternatives: HOMEOPATHIC_ALTS,
    sourcesGeneral: [
      'DailyMed setid ba0da07a-107b-2c66-e053-2995a90ab96a (draft, not verified)',
      CARLSTON,
    ],
  },
  {
    id: 'childrens-zyrtec-chewable',
    productName: "Children's Zyrtec Chewable Tablets",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450239129',
    formulaId: 'childrens-zyrtec-chewable',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '2.5mg' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('013ce40e-37c9-4b84-b530-ed895f60ce0e', METH.sucralose),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('013ce40e-37c9-4b84-b530-ed895f60ce0e', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('013ce40e-37c9-4b84-b530-ed895f60ce0e', METH.mannitol),
      ),
      cleared('013ce40e-37c9-4b84-b530-ed895f60ce0e', 'Betadex'),
      cleared('013ce40e-37c9-4b84-b530-ed895f60ce0e', 'Corn starch'),
      cleared('013ce40e-37c9-4b84-b530-ed895f60ce0e', 'Lactose monohydrate'),
      cleared('013ce40e-37c9-4b84-b530-ed895f60ce0e', 'Magnesium stearate'),
      cleared(
        '013ce40e-37c9-4b84-b530-ed895f60ce0e',
        'Silicified microcrystalline cellulose',
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Children\'s Zyrtec chewable = Caution (sucralose only). Raw demerit math is sucralose 2 + flavor 1 + mannitol 1 = 4 pts Avoid — draft follows the locked Caution call, not a 3-pt Avoid stack. 10 mg chewable twin (setid 0fe77356) shares the same inactives (minAge 6 on that carton). Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 013ce40e-37c9-4b84-b530-ed895f60ce0e (2.5 mg); 0fe77356-d945-46a0-882e-b3bbab784556 (10 mg twin) — draft, not verified',
    ],
  },
  {
    id: 'childrens-zyrtec-dissolve',
    productName: "Children's Zyrtec Dissolve Tabs",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450242136',
    formulaId: 'childrens-zyrtec-dissolve',
    audience: KIDS,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10mg' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('a1edc2e6-3661-4d7a-884c-709d73cb89e0', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('a1edc2e6-3661-4d7a-884c-709d73cb89e0', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('a1edc2e6-3661-4d7a-884c-709d73cb89e0', METH.mannitol),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('a1edc2e6-3661-4d7a-884c-709d73cb89e0', METH.sio2),
      ),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Anhydrous citric acid'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Crospovidone'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Hydroxypropyl cellulose'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Magnesium stearate'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Microcrystalline cellulose'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Sodium bicarbonate'),
      cleared('a1edc2e6-3661-4d7a-884c-709d73cb89e0', 'Sodium starch glycolate'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Children\'s Zyrtec dissolve = Caution (sucralose only). Raw demerit math is sucralose 2 + flavors 1 + mannitol 1 = 4 pts Avoid — draft follows the locked Caution call. Amino methacrylate copolymer is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake). Silicon dioxide is the nanoparticle Caution cap (0 demerit points). Ages 6+ (under 6: do not use / ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DISSOLVE_ALTS,
    sourcesGeneral: [
      'DailyMed setid a1edc2e6-3661-4d7a-884c-709d73cb89e0 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-flonase-allergy-relief',
    productName: "Children's Flonase Allergy Relief",
    brand: 'Flonase',
    category: ALLERGIES,
    formulaId: 'flonase-allergy-relief-bkc-ps80',
    audience: KIDS,
    minAge: 4,
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
        dailymed('3adff80f-fca7-4cc5-b106-0f68f71c85b0', METH.bkc),
      ),
      flag(
        'Polysorbate 80',
        'moderate',
        dailymed('3adff80f-fca7-4cc5-b106-0f68f71c85b0', METH.ps80),
      ),
      cleared('3adff80f-fca7-4cc5-b106-0f68f71c85b0', 'Dextrose'),
      cleared('3adff80f-fca7-4cc5-b106-0f68f71c85b0', 'Microcrystalline cellulose'),
      cleared(
        '3adff80f-fca7-4cc5-b106-0f68f71c85b0',
        'Sodium carboxymethylcellulose',
      ),
      cleared('3adff80f-fca7-4cc5-b106-0f68f71c85b0', 'Purified water'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER CALL: Kids Flonase = Caution (BKC). BKC is standalone Caution (not Avoid). PS80 is Moderate (2 pts) → Caution. Phenylethyl alcohol is on the SPL and is not in Methodology §5 (ungraded; v1.6 intake). Inactives match adult batch 5 Flonase — shared formulaId `flonase-allergy-relief-bkc-ps80`. Twin kids SPL fab7a1f4 shares the same inactives. Ages 4+ (under 4: do not use). No independently Clean kids nasal in this batch.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 3adff80f-fca7-4cc5-b106-0f68f71c85b0 (draft, not verified)',
    ],
  },
  {
    id: 'equate-kids-fluticasone-nasal',
    productName: 'Equate Allergy Relief (Fluticasone Propionate) — kids-facing',
    brand: 'Equate',
    category: ALLERGIES,
    formulaId: 'equate-fluticasone-bkc-ps80',
    audience: KIDS,
    minAge: 4,
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
      'FOUNDER CALL: Equate kids fluticasone = Caution (BKC). Same bottle / inactives as adult batch 5 Equate fluticasone (setid bc824143) — the label already carries a 4–11 chart. Shared formulaId `equate-fluticasone-bkc-ps80`. Phenylethyl alcohol is on the SPL and is not in §5 (ungraded). Ages 4+ (under 4: do not use). No independently Clean kids nasal in this batch.',
    retailers: ['Walmart'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid bc824143-b876-4c3d-86fd-81fb58673851 (same formula as adult batch 5; draft, not verified)',
    ],
  },
  {
    id: 'nasacort-allergy-24hr-kids',
    productName: 'Nasacort Allergy 24HR — kids-facing',
    brand: 'Nasacort',
    category: ALLERGIES,
    formulaId: 'nasacort-allergy-24hr-bkc-ps80',
    audience: KIDS,
    minAge: 2,
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
      'FOUNDER CALL: Nasacort kids-facing = Caution (BKC). Same formula / setid as adult batch 5 Nasacort (4bff57a5) — the label already carries 2–under-12 directions. Shared formulaId `nasacort-allergy-24hr-bkc-ps80`. HCl / NaOH pH adjusters are Cleared-class. Ages 2+ (under 2: do not use). No independently Clean kids nasal in this batch.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      'DailyMed setid 4bff57a5-cce0-401c-a0fe-23c65c1b7ddc (same formula as adult batch 5; draft, not verified)',
    ],
  },

  // ── Avoid ────────────────────────────────────────────────
  {
    id: 'childrens-zyrtec-liquid',
    productName: "Children's Zyrtec Allergy Syrup",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450209269',
    formulaId: 'childrens-zyrtec-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('9d8e78ea-af98-4f7c-8db5-044b49582f80', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('9d8e78ea-af98-4f7c-8db5-044b49582f80', METH.pg),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('9d8e78ea-af98-4f7c-8db5-044b49582f80', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('9d8e78ea-af98-4f7c-8db5-044b49582f80', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('9d8e78ea-af98-4f7c-8db5-044b49582f80', METH.benzoate),
      ),
      cleared('9d8e78ea-af98-4f7c-8db5-044b49582f80', 'Anhydrous citric acid'),
      cleared('9d8e78ea-af98-4f7c-8db5-044b49582f80', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Children\'s Zyrtec / Claritin / store loratadine liquids = Avoid (sucralose + oral PG). Dye-free is not Clean. Twin syrup SPL ee8695ac shares the same inactives. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 9d8e78ea-af98-4f7c-8db5-044b49582f80 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-claritin-liquid',
    productName: "Children's Claritin Allergy (Grape)",
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100810991',
    formulaId: 'childrens-claritin-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.pg),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.flavors),
      ),
      flag(
        'Maltitol',
        'limited',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.maltitol),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.benzoate),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('170061e9-e529-4ff0-e054-00144ff8d46c', METH.edta),
      ),
      cleared('170061e9-e529-4ff0-e054-00144ff8d46c', 'Glycerin'),
      cleared('170061e9-e529-4ff0-e054-00144ff8d46c', 'Monobasic sodium phosphate'),
      cleared('170061e9-e529-4ff0-e054-00144ff8d46c', 'Phosphoric acid'),
      cleared('170061e9-e529-4ff0-e054-00144ff8d46c', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Children\'s Claritin liquid = Avoid (sucralose + oral PG). Dye-free is not Clean. Separate formulaId from adult batch 5 Claritin liquid (19afd658 lists menthol; this grape kids SPL does not). Ages 2+.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 170061e9-e529-4ff0-e054-00144ff8d46c (draft, not verified)',
    ],
  },
  {
    id: 'childrens-claritin-chewable',
    productName: "Children's Claritin Chewable Tablets (Grape)",
    brand: 'Claritin',
    category: ALLERGIES,
    barcode: '041100810748',
    formulaId: 'claritin-chewable-aspartame-dye',
    audience: KIDS,
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
      'FOUNDER CALL: Claritin chews = Avoid (aspartame ± dyes). Kids-facing grape carton (setid 37732ca2; also sold as Children\'s Claritin ages 2+). Shared formulaId `claritin-chewable-aspartame-dye` with adult batch 5. Perrigo-labeled twin f3b9c643 is the same grape aspartame + lake-dye list. Bubblegum twin (20938e05) is aspartame + carmine — still Avoid (aspartame High; carmine is Caution-not-Avoid). Cool Mint chewable (98b99bb9) is aspartame + Blue #1 lake, minAge 6 — still Avoid. Phenylketonurics: aspartame.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 37732ca2-b454-4215-91a2-c62e0f7a56af (draft, not verified)',
    ],
  },
  {
    id: 'childrens-allegra-odt',
    productName: "Children's Allegra Allergy Orally Disintegrating Tablets",
    brand: 'Allegra',
    category: ALLERGIES,
    barcode: '041167423332',
    formulaId: 'childrens-allegra-odt',
    audience: KIDS,
    minAge: 6,
    form: 'orally disintegrating tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Fexofenadine HCl', strength: '30mg' }],
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('06115cea-5a44-409d-85ed-bb71743491c1', METH.aspartame),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('06115cea-5a44-409d-85ed-bb71743491c1', METH.flavors),
      ),
      flag(
        'Silicon dioxide',
        'cleared',
        dailymed('06115cea-5a44-409d-85ed-bb71743491c1', METH.sio2),
      ),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Crospovidone'),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Lactose monohydrate'),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Magnesium stearate'),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Methacrylic acid copolymer'),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Microcrystalline cellulose'),
      cleared('06115cea-5a44-409d-85ed-bb71743491c1', 'Povidone'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Allegra ODT = Avoid (aspartame). Phenylketonurics: aspartame. Ages 6+ (under 6: do not use).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: DISSOLVE_ALTS,
    sourcesGeneral: [
      'DailyMed setid 06115cea-5a44-409d-85ed-bb71743491c1 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-allegra-liquid',
    productName: "Children's Allegra Allergy Oral Suspension",
    brand: 'Allegra',
    category: ALLERGIES,
    barcode: '041167424445',
    formulaId: 'childrens-allegra-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Fexofenadine HCl', strength: '30mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Titanium dioxide',
        'high',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.tio2),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.pg),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.flavors),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.sorbate),
      ),
      flag(
        'Xylitol',
        'limited',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.xylitolOral),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.edta),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        dailymed('e2bd23c7-dfba-463a-adbe-2183970da740', METH.gums),
      ),
      cleared('e2bd23c7-dfba-463a-adbe-2183970da740', 'Sucrose'),
      cleared('e2bd23c7-dfba-463a-adbe-2183970da740', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Children\'s Allegra liquid = Avoid (TiO2 + oral PG). Poloxamer 407 is on the SPL and is not in Methodology §5 (ungraded; not the Avoid driver). Oral xylitol is flagged as a sugar alcohol (Limited); nasal xylitol Clearance does not apply. Ages 2+ (under 2: ask a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid e2bd23c7-dfba-463a-adbe-2183970da740 (draft, not verified)',
    ],
  },
  {
    id: 'equate-kids-cetirizine-liquid',
    productName: "Equate Children's Allergy Relief (Cetirizine)",
    brand: 'Equate',
    category: ALLERGIES,
    barcode: '681131447782',
    formulaId: 'equate-kids-cetirizine-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Methylparaben',
        'high',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.parabens),
      ),
      flag(
        'Propylparaben',
        'high',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.parabens),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.pg),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.sucralose),
      ),
      flag(
        'Artificial grape flavor',
        'limited',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.flavors),
      ),
      flag(
        'Natural and artificial banana flavor',
        'limited',
        dailymed('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', METH.flavors),
      ),
      cleared('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', 'Glacial acetic acid'),
      cleared('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', 'Glycerin'),
      cleared('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', 'Sodium acetate (anhydrous)'),
      cleared('b73950f4-af6f-4dc7-bce2-9ec43c45eee5', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Equate Children\'s cetirizine = Avoid (parabens + PG + sucralose). Separate from the dye-free sucralose+PG store set (up&up / CVS). Ages 2+.',
    retailers: ['Walmart'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid b73950f4-af6f-4dc7-bce2-9ec43c45eee5 (draft, not verified)',
    ],
  },
  {
    id: 'upup-kids-cetirizine-grape',
    productName: "up&up Children's Allergy (Cetirizine, Grape)",
    brand: 'up&up',
    category: ALLERGIES,
    barcode: '370030629961',
    formulaId: UPUP_CETIRIZINE,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', METH.pg),
      ),
      flag(
        'Artificial grape flavor',
        'limited',
        dailymed('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', METH.benzoate),
      ),
      cleared('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', 'Anhydrous citric acid'),
      cleared('4b1ee9b1-d22e-4fb2-8dcd-912374da12d7', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: up&up kids cetirizine = Avoid even if dye-free. Sucralose + oral PG. Bubblegum twin (setid 1f37c327) shares this formulaId (flavor line only). Ages 2+.',
    retailers: ['Target'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 4b1ee9b1-d22e-4fb2-8dcd-912374da12d7 (grape); 1f37c327-cd4c-4bc1-ae70-713569694e2e (bubblegum twin) — draft, not verified',
    ],
  },
  {
    id: 'upup-kids-cetirizine-bubblegum',
    productName: "up&up Children's Allergy (Cetirizine, Bubblegum)",
    brand: 'up&up',
    category: ALLERGIES,
    barcode: '370030629909',
    formulaId: UPUP_CETIRIZINE,
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('1f37c327-cd4c-4bc1-ae70-713569694e2e', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('1f37c327-cd4c-4bc1-ae70-713569694e2e', METH.pg),
      ),
      flag(
        'Artificial bubble gum flavor',
        'limited',
        dailymed('1f37c327-cd4c-4bc1-ae70-713569694e2e', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('1f37c327-cd4c-4bc1-ae70-713569694e2e', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('1f37c327-cd4c-4bc1-ae70-713569694e2e', METH.benzoate),
      ),
      cleared('1f37c327-cd4c-4bc1-ae70-713569694e2e', 'Anhydrous citric acid'),
      cleared('1f37c327-cd4c-4bc1-ae70-713569694e2e', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: up&up kids cetirizine = Avoid even if dye-free. Same formulaId as the grape twin. Ages 2+.',
    retailers: ['Target'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 1f37c327-cd4c-4bc1-ae70-713569694e2e (draft, not verified)',
    ],
  },
  storeLoratadineLiquid({
    id: 'equate-kids-loratadine-liquid',
    productName: "Equate Children's Allergy Relief (Loratadine)",
    brand: 'Equate',
    retailers: ['Walmart'],
    setid: '5603d5e1-8d95-44b9-aceb-4bc37b162ab1',
    barcode: '681131276788',
  }),
  storeLoratadineLiquid({
    id: 'upup-kids-loratadine-liquid',
    productName: "up&up Children's Allergy (Loratadine)",
    brand: 'up&up',
    retailers: ['Target'],
    setid: 'a9f6ae02-cf29-4111-99e7-7e6b1ecb88f0',
    barcode: '370030629985',
  }),
  storeLoratadineLiquid({
    id: 'cvs-kids-loratadine-liquid',
    productName: "CVS Children's Allergy Relief (Loratadine)",
    brand: 'CVS Health',
    retailers: ['CVS'],
    setid: '0e84571d-87b6-4742-ac62-9ed68a115c72',
    barcode: '050428057131',
  }),
  {
    id: 'cvs-kids-cetirizine-liquid',
    productName: "CVS Children's Allergy Relief (Cetirizine)",
    brand: 'CVS Health',
    category: ALLERGIES,
    barcode: '050428057162',
    formulaId: 'cvs-kids-cetirizine-liquid',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '5mg / 5mL' }],
    inactiveIngredients: [
      flag(
        'Sucralose',
        'moderate',
        dailymed('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', METH.sucralose),
      ),
      flag(
        'Propylene glycol',
        'moderate',
        dailymed('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', METH.pg),
      ),
      flag(
        'Artificial grape flavor',
        'limited',
        dailymed('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', METH.flavors),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', METH.sorbitol),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', METH.benzoate),
      ),
      cleared('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', 'Anhydrous citric acid'),
      cleared('0210f9e5-c35b-4cfa-92d1-48555e99f1f3', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'Confirmed brick-and-mortar kids cetirizine liquid (CVS). Same sucralose + oral PG Avoid pattern as Children\'s Zyrtec / up&up. Dye-free is not Clean. Ages 2+.',
    retailers: ['CVS'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 0210f9e5-c35b-4cfa-92d1-48555e99f1f3 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-kids-loratadine-chew',
    productName: "CVS Dye-Free Children's Loratadine Chewable",
    brand: 'CVS Health',
    category: ALLERGIES,
    barcode: '050428256138',
    formulaId: 'cvs-kids-loratadine-chew-aspartame',
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Loratadine', strength: '5mg' }],
    inactiveIngredients: [
      flag(
        'Aspartame',
        'high',
        dailymed('0b78fed4-69eb-f66f-e063-6294a90a3b89', METH.aspartame),
      ),
      flag(
        'Flavor',
        'limited',
        dailymed('0b78fed4-69eb-f66f-e063-6294a90a3b89', METH.flavors),
      ),
      flag(
        'Mannitol',
        'limited',
        dailymed('0b78fed4-69eb-f66f-e063-6294a90a3b89', METH.mannitol),
      ),
      flag(
        'Colloidal silicon dioxide',
        'cleared',
        dailymed('0b78fed4-69eb-f66f-e063-6294a90a3b89', METH.sio2),
      ),
      cleared('0b78fed4-69eb-f66f-e063-6294a90a3b89', 'Anhydrous citric acid'),
      cleared('0b78fed4-69eb-f66f-e063-6294a90a3b89', 'Magnesium stearate'),
      cleared('0b78fed4-69eb-f66f-e063-6294a90a3b89', 'Microcrystalline cellulose'),
      cleared('0b78fed4-69eb-f66f-e063-6294a90a3b89', 'Sodium starch glycolate'),
      cleared('0b78fed4-69eb-f66f-e063-6294a90a3b89', 'Stearic acid'),
    ],
    verdict: 'avoid',
    honestNote:
      'Confirmed brick-and-mortar kids loratadine chew (CVS). Dye-free is not Clean — aspartame is High-tier. Phenylketonurics: aspartame. Ages 2+.',
    retailers: ['CVS'],
    cleanAlternatives: ORAL_ALTS_AGE2,
    sourcesGeneral: [
      'DailyMed setid 0b78fed4-69eb-f66f-e063-6294a90a3b89 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-kids-dph-chews',
    productName: "CVS Children's Allergy Chews (Diphenhydramine)",
    brand: 'CVS Health',
    category: ALLERGIES,
    formulaId: 'cvs-kids-dph-chews',
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30',
        'high',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.maltodextrin),
      ),
      flag(
        'Silica',
        'cleared',
        dailymed('569b8efa-8458-49f7-a665-6b7016a10505', METH.sio2),
      ),
      cleared('569b8efa-8458-49f7-a665-6b7016a10505', 'Citric acid'),
      cleared('569b8efa-8458-49f7-a665-6b7016a10505', 'Crospovidone'),
      cleared('569b8efa-8458-49f7-a665-6b7016a10505', 'Dextrose'),
      cleared('569b8efa-8458-49f7-a665-6b7016a10505', 'Magnesium stearate'),
      cleared('569b8efa-8458-49f7-a665-6b7016a10505', 'Starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'KA16 confirmed (DailyMed setid 569b8efa). Dyes + sucralose. Sodium polystyrene sulfonate is on the SPL and is not in Methodology §5 (ungraded; not the Avoid driver). Ages 6+ (2–5: do not use unless directed by a doctor). First-generation / sedating — cleanliness note only.',
    retailers: ['CVS'],
    cleanAlternatives: CHEW_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid 569b8efa-8458-49f7-a665-6b7016a10505 (draft, not verified)',
    ],
  },
  {
    id: 'cvs-kids-dph-liquid',
    productName: "CVS Dye-Free Children's Allergy (Diphenhydramine)",
    brand: 'CVS Health',
    category: ALLERGIES,
    barcode: '050428359396',
    formulaId: 'cvs-kids-dph-liquid',
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
        'Sucralose',
        'moderate',
        dailymed('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', METH.sorbitol),
      ),
      cleared('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', 'Anhydrous citric acid'),
      cleared('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', 'Carboxymethylcellulose sodium'),
      cleared('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', 'Glycerin'),
      cleared('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', 'Potassium citrate'),
      cleared('db5a5eff-1bb1-4d00-8c01-caae7a1c7223', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'Confirmed brick-and-mortar kids DPH liquid (CVS dye-free). Dye-free is not Clean — sucralose + flavors + benzoate + sorbitol stack to Avoid. Ages 6+ (2–5: do not use unless directed by a doctor).',
    retailers: ['CVS'],
    cleanAlternatives: ORAL_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid db5a5eff-1bb1-4d00-8c01-caae7a1c7223 (draft, not verified)',
    ],
  },
  {
    id: 'equate-kids-dph-chews',
    productName: "Equate Dye-Free Children's Allergy Chews (Diphenhydramine)",
    brand: 'Equate',
    category: ALLERGIES,
    formulaId: 'equate-kids-dph-chews',
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'Propyl gallate',
        'high',
        dailymed('18436026-b0e4-4481-a647-d735a27d0b00', METH.propylGallate),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('18436026-b0e4-4481-a647-d735a27d0b00', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('18436026-b0e4-4481-a647-d735a27d0b00', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('18436026-b0e4-4481-a647-d735a27d0b00', METH.maltodextrin),
      ),
      flag(
        'Silica',
        'cleared',
        dailymed('18436026-b0e4-4481-a647-d735a27d0b00', METH.sio2),
      ),
      cleared('18436026-b0e4-4481-a647-d735a27d0b00', 'Citric acid'),
      cleared('18436026-b0e4-4481-a647-d735a27d0b00', 'Crospovidone'),
      cleared('18436026-b0e4-4481-a647-d735a27d0b00', 'Dextrose'),
      cleared('18436026-b0e4-4481-a647-d735a27d0b00', 'Magnesium stearate'),
      cleared('18436026-b0e4-4481-a647-d735a27d0b00', 'Starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'Confirmed brick-and-mortar kids DPH chew (Equate / Walmart dye-free). Dye-free is not Clean — propyl gallate is High-tier (locked v1.6). Sodium polystyrene sulfonate is on the SPL and is not in §5 (ungraded; not the Avoid driver). Ages 6+ (2–5: do not use unless directed by a doctor).',
    retailers: ['Walmart'],
    cleanAlternatives: CHEW_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid 18436026-b0e4-4481-a647-d735a27d0b00 (draft, not verified)',
    ],
  },
  {
    id: 'upup-kids-dph-melts',
    productName: "up&up Children's Allergy Melts (Diphenhydramine)",
    brand: 'up&up',
    category: ALLERGIES,
    formulaId: 'upup-kids-dph-melts',
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg' },
    ],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30',
        'high',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.flavors),
      ),
      flag(
        'Maltodextrin',
        'limited',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.maltodextrin),
      ),
      flag(
        'Silica',
        'cleared',
        dailymed('f98d1d54-8e11-4bb1-825a-ab5447d37847', METH.sio2),
      ),
      cleared('f98d1d54-8e11-4bb1-825a-ab5447d37847', 'Citric acid'),
      cleared('f98d1d54-8e11-4bb1-825a-ab5447d37847', 'Crospovidone'),
      cleared('f98d1d54-8e11-4bb1-825a-ab5447d37847', 'Dextrose'),
      cleared('f98d1d54-8e11-4bb1-825a-ab5447d37847', 'Magnesium stearate'),
      cleared('f98d1d54-8e11-4bb1-825a-ab5447d37847', 'Starch'),
    ],
    verdict: 'avoid',
    honestNote:
      'Confirmed brick-and-mortar kids DPH melt / chew (Target). Dyes + sucralose. Sodium polystyrene sulfonate is on the SPL and is not in §5 (ungraded). Ages 6+ (2–5: do not use unless directed by a doctor).',
    retailers: ['Target'],
    cleanAlternatives: CHEW_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid f98d1d54-8e11-4bb1-825a-ab5447d37847 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-benadryl-allergy-liquid',
    productName: "Children's Benadryl Allergy",
    brand: 'Benadryl',
    category: ALLERGIES,
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
      flag(
        'D&C Red No. 33',
        'high',
        dailymed('fc9181b9-c92d-493e-8d7c-4a4239c6c092', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('fc9181b9-c92d-493e-8d7c-4a4239c6c092', METH.dyes),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('fc9181b9-c92d-493e-8d7c-4a4239c6c092', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('fc9181b9-c92d-493e-8d7c-4a4239c6c092', METH.benzoate),
      ),
      cleared('fc9181b9-c92d-493e-8d7c-4a4239c6c092', 'Anhydrous citric acid'),
      cleared('fc9181b9-c92d-493e-8d7c-4a4239c6c092', 'Glycerin'),
      cleared('fc9181b9-c92d-493e-8d7c-4a4239c6c092', 'Sucrose'),
      cleared('fc9181b9-c92d-493e-8d7c-4a4239c6c092', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Children\'s Benadryl dyed = Avoid. Red #33 + Red #40. Poloxamer 407 and monoammonium glycyrrhizinate are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). HFCS is not on this SPL. Ages 6+ (2–5: do not use unless directed by a doctor; under 2: do not use). First-generation / sedating — cleanliness note only.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid fc9181b9-c92d-493e-8d7c-4a4239c6c092 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-benadryl-dyefree-liquid',
    productName: "Children's Benadryl Dye-Free Allergy",
    brand: 'Benadryl',
    category: ALLERGIES,
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
        dailymed('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', METH.saccharin),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', METH.sorbitol),
      ),
      cleared('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', 'Anhydrous citric acid'),
      cleared('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', 'Carboxymethylcellulose sodium'),
      cleared('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', 'Glycerin'),
      cleared('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', 'Sodium citrate'),
      cleared('10d478ff-ddc6-45da-87ff-cfe1b2b07a8e', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Children\'s Benadryl dye-free = Avoid. Dye-free is not Clean — saccharin + flavors + benzoate + sorbitol. Ages 6+ (2–5: do not use unless directed by a doctor; under 2: do not use). First-generation / sedating — cleanliness note only.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid 10d478ff-ddc6-45da-87ff-cfe1b2b07a8e (draft, not verified)',
    ],
  },
  {
    id: 'childrens-benadryl-chewables',
    productName: "Children's Benadryl Chewables",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450553201',
    formulaId: 'childrens-benadryl-chewables',
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5mg' }],
    inactiveIngredients: [
      flag(
        'D&C Red No. 30 aluminum lake',
        'high',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.dyes),
      ),
      flag(
        'D&C Red No. 7 calcium lake',
        'high',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.dyes),
      ),
      flag(
        'FD&C Blue No. 1 aluminum lake',
        'high',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.flavors),
      ),
      flag(
        'Gum arabic',
        'cleared',
        dailymed('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', METH.gums),
      ),
      cleared('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', 'Crospovidone'),
      cleared('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', 'Dextrose'),
      cleared('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', 'Magnesium stearate'),
      cleared('b08f71d8-a06c-41ba-8ed1-fbc41dbc1919', 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Benadryl family (chewables) = Avoid. Lake dyes + sucralose. Ethylcellulose, hydroxypropyl cellulose, sugar spheres, and tartaric acid are on the SPL and are not in Methodology §5 (ungraded; not the Avoid drivers). Ages 6+ (2–5: do not use unless directed by a doctor).',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: CHEW_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid b08f71d8-a06c-41ba-8ed1-fbc41dbc1919 (draft, not verified)',
    ],
  },
  {
    id: 'childrens-benadryl-allergy-plus-congestion',
    productName: "Children's Benadryl Allergy Plus Congestion",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450170057',
    formulaId: 'childrens-benadryl-allergy-plus-congestion',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 5mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'FD&C Blue No. 1',
        'high',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.dyes),
      ),
      flag(
        'FD&C Red No. 40',
        'high',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.dyes),
      ),
      flag(
        'Sucralose',
        'moderate',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.sucralose),
      ),
      flag(
        'Flavors',
        'limited',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.flavors),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.benzoate),
      ),
      flag(
        'Sorbitol',
        'limited',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.sorbitol),
      ),
      flag(
        'Edetate disodium',
        'cleared',
        dailymed('b8b75904-3806-4258-89c1-d6ff486ed41c', METH.edta),
      ),
      cleared('b8b75904-3806-4258-89c1-d6ff486ed41c', 'Anhydrous citric acid'),
      cleared('b8b75904-3806-4258-89c1-d6ff486ed41c', 'Carboxymethylcellulose sodium'),
      cleared('b8b75904-3806-4258-89c1-d6ff486ed41c', 'Glycerin'),
      cleared('b8b75904-3806-4258-89c1-d6ff486ed41c', 'Sodium citrate'),
      cleared('b8b75904-3806-4258-89c1-d6ff486ed41c', 'Purified water'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER CALL: Benadryl family (Allergy Plus Congestion) = Avoid. Blue #1 + Red #40. Ages 6+ (under 4: do not use; 4–5: do not use unless directed by a doctor). First-generation / sedating — cleanliness note only.',
    retailers: ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'],
    cleanAlternatives: ORAL_ALTS_AGE6,
    sourcesGeneral: [
      'DailyMed setid b8b75904-3806-4258-89c1-d6ff486ed41c (draft, not verified)',
    ],
  },
];