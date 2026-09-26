// DRAFT / not verified / batch 97 KYR6 HealthA2Z leftover-token backfill.
// Methodology v1.6 + MAIN §5 after the Sept 24, 2026 HealthA2Z stamp
// (7561b61). Harm-first. No invented grades. No invented OI. No invented UPCs.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. HealthA2Z only. Unlocks batch96 REFUSED rows whose blocking
// tokens are now stamped on MAIN, and whose other inactive tokens already
// sit on a locked §5 row. A panel that still has one unmapped token stays
// REFUSED with that exact remaining string. A pack that prints two inactive
// lists stays SKIPPED OUT. The 8-softgel option page is still not one pinned
// count and stays REFUSED.
// The pin is the DailyMed inactive paragraph batch96 named, plus the
// principal-display count. NDC is not a UPC. No GTIN-12 printed on these SPLs.
// Empty stays empty.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. Packs with the same inactive
// line share formulaId. No batch96 formula row prints one of these lines, so
// none of those formulaIds are reused. Search wiring only. Not wired into
// Clean Picks UI.
//
// Do NOT edit batch70–batch96. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
// The batch96 no_OI 93 are not hunted here.
//
// TALLY (unverified drafts in THIS file): 11 rows —
// Clean 4 / Caution 0 / Avoid 7.
// NEW 4 / REUSE-formula 7 /
// SKIPPED 1 (no_OI 0 / OUT 1) /
// REFUSED 40.
// Search grade: Clean 4 / Caution 0 / Avoid 7.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';
const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const DM = 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=';

const METH = {
  cmc:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC family). Sodium carboxy methyl cellulose maps here (Sept 24, 2026). Not a new grade.',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  dihydroxy:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate). Also written dihydroxy aluminium aminoacetate (Sept 24, 2026). Same Caution. Not a new grade. Not Avoid.',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  edta:
    'Methodology §5 Cleared (disodium EDTA / edetate disodium, trace preservative/stabilizer). Distinct from Caution tetrasodium EDTA. Not the dihydrate string.',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  ironColor:
    'Methodology §5 Caution (iron oxide as color). Red iron oxide and yellow iron oxide map here (Sept 24, 2026). Not a new grade. Not iron oxide red. Not iron oxide yellow. Not Avoid.',
  lactose:
    'Methodology §5 Cleared (lactose / lactose monohydrate). Anhydrous lactose maps here (Sept 24, 2026). Not a new grade.',
  lactoseMh: 'Methodology §5 Cleared (lactose monohydrate).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  paraben:
    'Methodology §5 High (parabens). Methyl paraben and propyl paraben map here (Sept 24, 2026). Not a new grade. Every form, including patches.',
  peg:
    'Methodology §5 Moderate (PEGs / polyethylene glycol). Polyethyleneglycol maps here (Sept 24, 2026). Not a new grade. Not the Avoid driver.',
  polyacrylic:
    'Methodology §5 Caution (polyacrylic acid — topical gel polymer). Not Avoid.',
  polydextrose: 'Methodology §5 Limited (polydextrose).',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel:
    'Methodology §5 Cleared (pregelatinized starch). Pregelatinized starch (maize) is that token. Pregelantinized starch is this spelling (Sept 24, 2026). Same Cleared row. Not a new grade.',
  pvaTopical:
    'Methodology §5 Cleared (PVA / polyvinyl alcohol, topical film). Distinct from Cleared polyvinyl alcohol as an oral coating. Not a new grade.',
  pgTopical: `Methodology §5 Cleared (propylene glycol, topical). ${PG_TOPICAL_TAP}`,
  sio2:
    'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  sodiumPolyacrylate:
    'Methodology §5 Caution (sodium polyacrylate — topical gel polymer). Not Avoid.',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  tartaric: 'Methodology §5 Cleared (tartaric acid).',
  tio2: 'Methodology §5 High (titanium dioxide).',
  water: 'Methodology §5 Cleared (purified water / water).',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof OTC;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
  upcNote?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
      ],
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const FEXO_180_416 = 'healtha2z-b97-fexo-180-416';
const LORATADINE_10_PREGEL = 'healtha2z-b97-loratadine-10-pregel';
const IBU_200_381 = 'healtha2z-b97-ibu-200-381';
const LIDOCAINE_4_PATCH = 'healtha2z-b97-lidocaine-4-patch';

const FEXO_SET = '61eebc8a-8d1e-48a2-afb1-eda9cb00ff97';
const LORA_SET = 'f0db3a13-43e6-4243-9a3a-7808ddd005e1';
const IBU_SET = 'f3f12b86-89dc-427e-a26f-728be6f73e7b';
const PATCH_SET = '7f715144-f0c8-48fc-a22d-eac85759c66a';

const FEXO_FLAGS: Compact['flags'] = [
  ['anhydrous lactose', 'cleared', 'lactose'],
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['corn starch', 'cleared', 'cornStarch'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['lactose monohydrate', 'cleared', 'lactoseMh'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['pregelatinized starch (maize)', 'cleared', 'pregel'],
  ['red iron oxide', 'limited', 'ironColor'],
  ['stearic acid', 'cleared', 'stearic'],
  ['titanium dioxide', 'high', 'tio2'],
  ['yellow iron oxide', 'limited', 'ironColor'],
];

const LORA_FLAGS: Compact['flags'] = [
  ['corn starch', 'cleared', 'cornStarch'],
  ['lactose monohydrate', 'cleared', 'lactoseMh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['pregelantinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
];

const IBU_FLAGS: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['corn starch', 'cleared', 'cornStarch'],
  ['FD&C yellow #6', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['polydextrose', 'limited', 'polydextrose'],
  ['polyethyleneglycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['purified water', 'cleared', 'water'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
  ['titanium dioxide', 'high', 'tio2'],
];

const PATCH_FLAGS: Compact['flags'] = [
  ['dihydroxy aluminium aminoacetate', 'limited', 'dihydroxy'],
  ['disodium EDTA', 'cleared', 'edta'],
  ['glycerin', 'cleared', 'glycerin'],
  ['methyl paraben', 'high', 'paraben'],
  ['polyacrylic acid', 'limited', 'polyacrylic'],
  ['polyvinyl alcohol', 'cleared', 'pvaTopical'],
  ['propyl paraben', 'high', 'paraben'],
  ['propylene glycol', 'cleared', 'pgTopical'],
  ['sodium carboxy methyl cellulose', 'cleared', 'cmc'],
  ['sodium polyacrylate', 'limited', 'sodiumPolyacrylate'],
  ['tartaric acid', 'cleared', 'tartaric'],
  ['titanium dioxide', 'high', 'tio2'],
  ['water', 'cleared', 'water'],
];

const FEXO_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, red iron oxide, titanium dioxide, yellow iron oxide. Anhydrous lactose, red iron oxide, and yellow iron oxide are the Sept 24 maps that unlocked this panel. Anhydrous lactose maps to Cleared lactose. Red iron oxide and yellow iron oxide map to Caution iron oxide as color. They do not map to iron oxide red or iron oxide yellow. Titanium dioxide is the Avoid driver. Adults and children 12 years and over. Adults 65 and older: ask a doctor. Not the batch96 fexofenadine 413 formula.';

const LORA_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. Pregelantinized starch is the Sept 24 map to Cleared pregelatinized starch. Corn starch and sodium starch glycolate are starred may-contain and stay Cleared. Not the batch96 loratadine 309 formula. Adults and children 6 years and over.';

const IBU_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, FD&C yellow #6, polydextrose, polyethyleneglycol, titanium dioxide. Polyethyleneglycol is the Sept 24 PEG map that unlocked this panel. Not a new grade. FD&C yellow #6 and titanium dioxide are the Avoid drivers. Not NDC 69168-382 or NDC 69168-335 already on MAIN. Adults and children 12 years and over.';

const PATCH_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers: dihydroxy aluminium aminoacetate, methyl paraben, polyacrylic acid, propyl paraben, sodium polyacrylate, titanium dioxide. Dihydroxy aluminium aminoacetate, methyl paraben, propyl paraben, and sodium carboxy methyl cellulose are the Sept 24 maps that unlocked this panel. Methyl paraben and propyl paraben are High parabens. Sodium carboxy methyl cellulose maps to Cleared cellulose gum. Dihydroxy aluminium aminoacetate is Caution, not a new grade. Polyvinyl alcohol on this patch is Cleared topical film, not the oral-coating row. Propylene glycol is topical Cleared, not oral Moderate. Titanium dioxide is High. Ages 12 and over. Under 12: consult a physician.';

const COMPACT: Compact[] = [
  {
    id: FEXO_180_416,
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168416062',
    upcNote:
      'UPC-A 369168416062 is printed beside HealthA2Z fexofenadine HCl 180 mg, code FPA056, 120 coated caplets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName:
      'HealthA2Z Fexofenadine HCl 180 mg, 120 coated caplets, NDC 69168-416-06 (FPA056)',
    category: 'Allergies',
    formulaId: FEXO_180_416,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_FLAGS,
    verdict: 'avoid',
    note: FEXO_NOTE,
    cite: `DailyMed SPL (${DM}${FEXO_SET}; setid ${FEXO_SET}; NDC 69168-416-06; 120). Inactive ingredients: anhydrous lactose, colloidal silicon dioxide, corn starch, croscarmellose sodium, hypromellose, lactose monohydrate, polyethylene glycol, pregelatinized starch (maize), red iron oxide, stearic acid, titanium dioxide, yellow iron oxide. Ages 12+. Adults 65 and older: ask a doctor. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-fexo-180-416-30',
    productName:
      'HealthA2Z Fexofenadine HCl 180 mg, 30 coated caplets, NDC 69168-416-30 (FPA062)',
    category: 'Allergies',
    formulaId: FEXO_180_416,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_FLAGS,
    verdict: 'avoid',
    note: `${FEXO_NOTE} Same inactive list as the 120-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${FEXO_SET}; setid ${FEXO_SET}; NDC 69168-416-30; 30). Same inactive list as the 120-count, including anhydrous lactose, red iron oxide, and yellow iron oxide. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-fexo-180-416-72',
    productName:
      'HealthA2Z Fexofenadine HCl 180 mg, 24 packs of 3 tablets (72), NDC 69168-416-03 (FP1030)',
    category: 'Allergies',
    formulaId: FEXO_180_416,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_FLAGS,
    verdict: 'avoid',
    note: `${FEXO_NOTE} Same inactive list as the 120-count, so they share formulaId. The SPL carton is 3 tablets. The value pack is 24 of those cartons.`,
    cite: `DailyMed SPL (${DM}${FEXO_SET}; setid ${FEXO_SET}; NDC 69168-416-03; carton of 3). Same inactive list as the 120-count, including anhydrous lactose, red iron oxide, and yellow iron oxide. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: LORATADINE_10_PREGEL,
    // KYR5-d retailer ladder — Target spec field.
    barcode: '369168414174',
    upcNote:
      'UPC-A 369168414174 is the Target specifications UPC for HealthA2Z loratadine 10 mg, 300 tablets (https://www.target.com/p/healtha2z-loratadine-10-mg-allergy-relief-antihistamine-24-hour-relief-300-tablets/-/A-1004974136). The Allegiant Health 2024 catalog prints the same code beside code FPA057, 300 tablets per unit.',
    productName:
      'HealthA2Z Loratadine 10 mg, 300 tablets, NDC 69168-414-17 (FPA057)',
    category: 'Allergies',
    formulaId: LORATADINE_10_PREGEL,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORA_FLAGS,
    verdict: 'clean',
    note: LORA_NOTE,
    cite: `DailyMed SPL (${DM}${LORA_SET}; setid ${LORA_SET}; NDC 69168-414-17; 300). Inactive ingredients: *corn starch, lactose monohydrate, magnesium stearate, pregelantinized starch, *sodium starch glycolate. *May contain these ingredients. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-loratadine-10-pregel-150',
    productName:
      'HealthA2Z Loratadine 10 mg, 150 tablets, NDC 69168-414-02 (FPA117)',
    category: 'Allergies',
    formulaId: LORATADINE_10_PREGEL,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORA_FLAGS,
    verdict: 'clean',
    note: `${LORA_NOTE} Same inactive list as the 300-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${LORA_SET}; setid ${LORA_SET}; NDC 69168-414-02; 150). Same inactive list as the 300-count, including pregelantinized starch. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-loratadine-10-pregel-60',
    productName:
      'HealthA2Z Loratadine 10 mg, 60 tablets, NDC 69168-414-60 (FPA087)',
    category: 'Allergies',
    formulaId: LORATADINE_10_PREGEL,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORA_FLAGS,
    verdict: 'clean',
    note: `${LORA_NOTE} Same inactive list as the 300-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${LORA_SET}; setid ${LORA_SET}; NDC 69168-414-60; 60). Same inactive list as the 300-count, including pregelantinized starch. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-loratadine-10-pregel-500',
    productName:
      'HealthA2Z Loratadine 10 mg, 500 tablets, NDC 69168-475-05 (FPA188)',
    category: 'Allergies',
    formulaId: LORATADINE_10_PREGEL,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORA_FLAGS,
    verdict: 'clean',
    note: `${LORA_NOTE} Same inactive list as the 300-count, so they share formulaId. NDC 69168-475-05 is the 500-count on this same SPL.`,
    cite: `DailyMed SPL (${DM}${LORA_SET}; setid ${LORA_SET}; NDC 69168-475-05; 500). Same inactive list as NDC 69168-414, including pregelantinized starch. Ages 6+. No GTIN-12 on the SPL.`,
  },
  {
    id: IBU_200_381,
    productName:
      'HealthA2Z Ibuprofen 200 mg, 250 tablets, NDC 69168-381-03 (FPA116)',
    category: 'Pain & Fever',
    formulaId: IBU_200_381,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: IBU_NOTE,
    cite: `DailyMed SPL (${DM}${IBU_SET}; setid ${IBU_SET}; NDC 69168-381-03; 250). Inactive ingredients: colloidal silicon dioxide, corn starch, FD&C yellow #6, hypromellose, polydextrose, polyethyleneglycol, povidone, pregelatinized starch, purified water, sodium starch glycolate, stearic acid, titanium dioxide. The SPL breaks polyethylene and glycol across a line. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-ibu-200-381-100',
    productName:
      'HealthA2Z Ibuprofen 200 mg, 100 tablets, NDC 69168-381-32 (FPA092)',
    category: 'Pain & Fever',
    formulaId: IBU_200_381,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: `${IBU_NOTE} Same inactive list as the 250-count, so they share formulaId.`,
    cite: `DailyMed SPL (${DM}${IBU_SET}; setid ${IBU_SET}; NDC 69168-381-32; 100). Same inactive list as the 250-count, including polyethyleneglycol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: 'healtha2z-b97-ibu-200-381-500',
    productName:
      'HealthA2Z Ibuprofen 200 mg, 500 tablets, NDC 69168-381-05 (FPA081)',
    category: 'Pain & Fever',
    formulaId: IBU_200_381,
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '200 mg' }],
    flags: IBU_FLAGS,
    verdict: 'avoid',
    note: `${IBU_NOTE} Same inactive list as the 250-count, so they share formulaId. Brand codes FPA081, FP1298, and FP1053 name this 500-count.`,
    cite: `DailyMed SPL (${DM}${IBU_SET}; setid ${IBU_SET}; NDC 69168-381-05; 500). Same inactive list as the 250-count, including polyethyleneglycol. Ages 12+. No GTIN-12 on the SPL.`,
  },
  {
    id: LIDOCAINE_4_PATCH,
    productName:
      'HealthA2Z Lidocaine 4% patch, 30 patches, NDC 69168-481-07 (FPA181)',
    category: 'Pain & Fever',
    formulaId: LIDOCAINE_4_PATCH,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    productType: OTC,
    actives: [{ name: 'Lidocaine', strength: '4%' }],
    flags: PATCH_FLAGS,
    verdict: 'avoid',
    note: PATCH_NOTE,
    cite: `DailyMed SPL (${DM}${PATCH_SET}; setid ${PATCH_SET}; NDC 69168-481-07; 30 patches). Inactive ingredients: dihydroxy aluminium aminoacetate, disodium EDTA, glycerin, methyl paraben, polyacrylic acid, polyvinyl alcohol, propyl paraben, propylene glycol, sodium carboxy methyl cellulose, sodium polyacrylate, tartaric acid, titanium dioxide, water. ${PG_TOPICAL_TAP} Ages 12+. No GTIN-12 on the SPL.`,
  },
];

export const BATCH97_KYR6_HEALTHA2Z_TOKEN_BACKFILL: RatingRecord[] = COMPACT.map(expand);

export const BATCH97_SKIPPED_NO_OI: { sku: string; reason: string }[] = [];

export const BATCH97_SKIPPED_OUT: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Daytime and Nighttime Combo Pack | Cold & Flu Medicine | Powerful Multi-Symptom Daytime and Nighttime Relief | 36 Count | 24 Daytime | 12 Nighttime Softgels (FPA106)',
    reason:
      'SKIPPED OUT. Dual panel. DailyMed setid fa7ed5db- prints two inactive lists on this one pack (daytime and nighttime). Not one pinned list. Day/night dual-panel stays no-row. NO Search row.',
  },
];

export const BATCH97_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH97_SKIPPED_NO_OI,
  ...BATCH97_SKIPPED_OUT,
];

export const BATCH97_REFUSED: { sku: string; reason: string }[] = [
  {
    sku: 'HealthA2Z® Sleep Aid | Doxylamine Succinate 25mg | (200 Counts) (FPA122)',
    reason:
      'REFUSED exact panel string(s) `dibasic calcium phosphate dihydrate`, `microcrystallinecellulose`. Setid 3761182c-275b-40f3-a262-9ef5f5a80723. NDC 69168-439-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength,300 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA013)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. `anhydrous lactose` maps to Cleared lactose (Sept 24). Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-17. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength, 24*40 Tablets (960 Tablets Total) (FP1083)',
    reason:
      'REFUSED exact panel string(s) `D&C Yellow 10`, `iron oxide ochre`, `starch`. `anhydrous lactose` maps to Cleared lactose (Sept 24). Setid 3ca60fa3-0a0c-4b3e-a0a2-da527ccf4fe5. NDC 69168-318-50. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg NSAID, Compare to Bayer Active Ingredients, 36 Chewable Tablets, (1 Pack, 3 Packs & 6 Packs) (FPA035E)',
    reason:
      'REFUSED exact panel string(s) `dextrates`, `orange flavor`, `saccharin sodium`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg NSAID, 24*36 Chewable Tablets (864 Tablets Total) (FP0545)',
    reason:
      'REFUSED exact panel string(s) `dextrates`, `orange flavor`, `saccharin sodium`. Setid 92b8637b-03a9-461f-b2f6-6eddaa214953. NDC 69168-288-36. NO Search row.',
  },
  {
    sku: 'HealthA2Z Fexofenadine Hydrochloride 60mg | 200 Count Coated Caplets | 12-Hour Antihistamine for Allergy Relief (FPA086)',
    reason:
      'REFUSED exact panel string `ironoxide yellow`. `polyethyleneglycol` maps to the Sept 24 PEG row. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Fexofenadine Hydrochloride 60mg | Antihistamine | Allergy Relief | 120 Count Caplets | Indoor/Outdoor Relief | 12 Hours (FPA099)',
    reason:
      'REFUSED exact panel string `ironoxide yellow`. `polyethyleneglycol` maps to the Sept 24 PEG row. Setid 219606a8-9a3e-4c30-adb1-984f3f4e72c7. NDC 69168-437-06. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Aspirin 81 mg | DYE Free | Low Strength | 200 Counts | Pain Relief | Reduces Minor Aches Muscle Pain & Cramps | Fever Reducer | Reduces Headache | (NSAID) (FPA154)',
    reason:
      'REFUSED exact panel string `shellac wax`. `colloidal anhydrous silica` maps to the Sept 24 silica / SiO2 row. Setid 26ad090d-7193-45c2-82eb-a2bc81955fe6. NDC 69168-457-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Aspirin 81mg Low Strength, 365 Tablets, Enteric Coated Compare to Bayer Active Ingredients (FPA069)',
    reason:
      'REFUSED exact panel string `shellac wax`. `silica` is the locked silicon dioxide alias. Setid d9abe780-7e58-43d8-848f-c6c8893aea2e. NDC 69168-430-99. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Azelastine HCl Nasal Spray, 24-Hr Allergy, 2 Pack 240 Spray (FP1282)',
    reason:
      'REFUSED exact panel string(s) `edetate disodium dihydrate`, `sodium citrate (dihydrate)`. Setid 3e2fdb0d-c2f5-41ab-b1cd-4fae80648112. NDC 69168-478-02. NO Search row.',
  },
  {
    sku: 'HealthA2Z Fexofenadine Hydrochloride 180mg, Antihistamine for Allergy Relief, 24-Hour Antihistamine for Allergy Relief (90 Counts) (FPA150)',
    reason:
      'REFUSED exact panel string `light liquid paraffin`. `red iron oxide` and `yellow iron oxide` map to Caution iron oxide as color (Sept 24). Setid 89ece1b5-7604-4dce-a8a6-df5b948e3cff. NDC 69168-450-82. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Allergy Relief | Fexofenadine Hydrochloride 180mg | 180 Caplets | Antihistamine (FPA151)',
    reason:
      'REFUSED exact panel string `light liquid paraffin`. `red iron oxide` and `yellow iron oxide` map to Caution iron oxide as color (Sept 24). Setid 89ece1b5-7604-4dce-a8a6-df5b948e3cff. NDC 69168-450-80. NO Search row.',
  },
  {
    sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | (150 Tablets) (FPA129)",
    reason:
      'REFUSED exact panel string(s) `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`. `colloidal anhydrous silica`, `polyvinyl acetate pthalate`, and `shellac glaze` map to the Sept 24 stamps. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-02. NO Search row.',
  },
  {
    sku: "HealthA2Z Woman's Gentle Laxative, Bisacodyl Stimulant Laxative 5mg, 1 Pack of 25 Tablets (1 Pack, 3 Packs& 6 Packs) (FP0886A)",
    reason:
      'REFUSED exact panel string(s) `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`. `colloidal anhydrous silica`, `polyvinyl acetate pthalate`, and `shellac glaze` map to the Sept 24 stamps. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Woman’s Gentle Laxative | Bisacodyl 5mg Stimulant Laxative | Gentle, Reliable Constipation Relief | Overnight Support | 24 Packs of 25 Tablets (600 Tablets Total) | Value Pack (FP0886)',
    reason:
      'REFUSED exact panel string(s) `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`. `colloidal anhydrous silica`, `polyvinyl acetate pthalate`, and `shellac glaze` map to the Sept 24 stamps. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-92. NO Search row.',
  },
  {
    sku: "HealthA2Z® Woman's Gentle Laxative | Bisacodyl Stimulant Laxative 5mg | 250 Tablets | Constipation Relief | Gentle and Reliable | Overnight Relief (FPA167)",
    reason:
      'REFUSED exact panel string(s) `FD&C yellow # 6 aluminum lake`, `lactose anhydrous`. `colloidal anhydrous silica`, `polyvinyl acetate pthalate`, and `shellac glaze` map to the Sept 24 stamps. Setid 46a377f5-822b-496f-a73b-66d8f902680a. NDC 69168-398-03. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | 100 Chewable Tablets (FPA102)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-32. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief | (200 Count) (FP1345)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z Bismuth, Bismuth Subsalicylate 262mg, 24*12 Chewable Tablets (288 Tablets Total) (FP0528)',
    reason:
      'REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418. NDC 69168-046-69. NO Search row.',
  },
  {
    sku: "HealthA2Z® Tussin DM Sugar Free | Dextromethorphan HBr 20mg, Guaifenesin 200mg | Cough Suppressant & Expectorant | for Adults with High Blood Pressure & Diabetes | 8 FL Oz, Raspberry Flavor (FPA184)",
    reason:
      'REFUSED exact panel string `flavors`. Setid 7a2f8d48-3123-4c37-b238-bd7cc4242bb7. NDC 69168-477-66. NO Search row.',
  },
  {
    sku: "HealthA2Z® Children's Allergy Relief | DYE Free | Diphenhyrdramine 12.5 mg | 5ml Oral Solution | 8Fl Oz (237 mL) | Antihistamine | Clear Bubble Gum Flavored | Alcohol and Sugar Free (FPA164)",
    reason:
      'REFUSED exact panel string `sodium citrate dihydrate`. Setid cb6df361-b8e5-4e2f-945f-c20159d76c4f. NDC 69168-471-59. NO Search row.',
  },
  {
    sku: 'HealthA2Z Calcium Antacid 500mg, Regular Strength, 150 Tablets (FP0535)',
    reason:
      'REFUSED exact panel string `assorted flavors`. Setid 551d6135-2650-4c27-a20d-d56a9aba7b71. NDC 69168-219-02. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | 225 Tablets | Famotidine 20mg | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA125)',
    reason:
      'REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-52. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | Famotidine 20mg | 365 Count | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA161)',
    reason:
      'REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-99. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Acid Reducer | 100 Tablets | Famotidine 20mg | Maximum Strength | Relief from Heart Burn Due to Acid Indigestion (FPA124)',
    reason:
      'REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Setid adc2721d-2ca7-4a47-bae1-be298fa1c155. NDC 69168-443-32. NO Search row.',
  },
  {
    sku: 'HealthA2Z Extra Strength Pain Relief PM, 365 Caplets (FPA004)',
    reason:
      'REFUSED exact panel string `polyethylene glylcol`. Setid 91ba1618-1b2e-4281-a5e1-ba7acbae8346. NDC 69168-267-99. NO Search row.',
  },
  {
    sku: 'HealthA2Z Extra Strength Pain Relief PM, 150 Caplets (FPA061)',
    reason:
      'REFUSED exact panel string `polyethylene glylcol`. Setid 91ba1618-1b2e-4281-a5e1-ba7acbae8346. NDC 69168-267-02. NO Search row.',
  },
  {
    sku: 'HealthA2Z Anti-Diarrheal Loperamide HCI 2mg 12 Caplets (1 Pack, 3 Packs & 6 Packs) (FP0697)',
    reason:
      'REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. Setid aca3742c-2a82-4e91-8aaf-2fce08487e56. NDC 69168-248-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Stool Softener, Docusate Sodium 100mg, 100 capsules (FPA059)',
    reason:
      'REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`, `sorbitol special`. Setid 30c9ff75-cee4-4632-86fd-acfdf5ee85af. NDC 69168-420-01. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg, 24*12 Tablets (288 Tablets Total) (FP0944)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z Motion Sickness Relief 50mg (1 Pack, 3 Packs & 6 Packs) (FPA027E)',
    reason:
      'REFUSED exact panel string `dibasic calcium phosphate dihydrate`. Setid 7b0aa993-f08f-4dff-a82d-f35b3ebe3cc1. NDC 69168-408-86. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Laxative Bisacodyl 5mg | 100 Counts | (FPA094)',
    reason:
      'REFUSED exact panel string `lactose anhydrous`. `colloidal anhydrous silica` and `shellac glaze` map to the Sept 24 stamps. Setid 51f1c6c0-770c-4426-820b-bc1f42e143fd. NDC 69168-404-32. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Nighttime Sleep Aid 250 Softgels | (FPA103)',
    reason:
      'REFUSED exact panel string `sorbitol special`. Setid 9746911a-36bc-45eb-adfd-e96439d7a865. NDC 69168-431-03. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Sleep Aid 96 Softgels (FPA072)',
    reason:
      'REFUSED exact panel string `sorbitol special`. Setid 9746911a-36bc-45eb-adfd-e96439d7a865. NDC 69168-431-96. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Sleep Aid | Diphenhydramine 50mg | 200 Softgels | Supports Deeper | Restful Sleeping (FPA172)',
    reason:
      'REFUSED exact panel string `white ink`. Setid ec57db48-0f3a-4b12-8633-b45a4366c269. NDC 69168-410-98. NO Search row.',
  },
  {
    sku: 'HealthA2Z® Cold Roll-On | Pain Relieving Gel | Menthol 4% External Analgesic | 2.5 OZ | 74 mL | Temporary Relieves Minor Aches and Pains of Muscle (FPA183)',
    reason:
      'REFUSED exact panel string(s) `blue 1`, `yellow 5`. Setid 36463acb-7c28-416f-a45f-a93f0be5692b. NDC 69168-483-67. NO Search row.',
  },
  {
    sku: 'HealthA2Z Sleep Aid, Diphenhydramine HCl 50 mg, 250 softgels (FPA028/FP1082)',
    reason:
      'REFUSED exact panel string `white ink`. Brand PDP drug-facts tile (SleepAid_50mg_250_Softgels_-_Drug_Facts). `white ink` is not the locked white edible ink token. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-356-23 (FP0999)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. `gelatin USP`, `propylene glycol USP`, and `sorbitol sorbitan solution USP` map to the Sept 24 stamps. NO Search row.',
  },
  {
    sku: 'HealthA2Z Daytime Cold & Flu Relief, 8 softgels (1, 3, and 6 packs)',
    reason:
      'REFUSED exact panel string(s) `glycerine USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`. `gelatin USP`, `propylene glycol USP`, and `sorbitol sorbitan solution USP` map to the Sept 24 stamps. The option page is not one pinned count. NO Search row.',
  },
  {
    sku: 'HealthA2Z Nighttime Cold & Flu Relief, 24 packs of 8 softgels (192), NDC 69168-357-29 (FP1003)',
    reason:
      'REFUSED exact panel string(s) `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `purified water USP`, `sorbitol 70% solution USP`. `gelatin USP`, `propylene glycol USP`, and `sorbitol sorbitan solution USP` map to the Sept 24 stamps. NO Search row.',
  },
];

const _ROWS = BATCH97_KYR6_HEALTHA2Z_TOKEN_BACKFILL;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _formulaFirst = new Set<string>();
let _new = 0;
let _reuse = 0;
for (const r of _ROWS) {
  const id = r.formulaId ?? r.id;
  if (_formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}
if (_ROWS.length !== 11) throw new Error('batch97 row tally drift');
if (_grades.clean !== 4 || _grades.caution !== 0 || _grades.avoid !== 7) {
  throw new Error('batch97 Search grade drift');
}
if (_new !== 4 || _reuse !== 7) throw new Error('batch97 NEW/REUSE drift');
if (_ROWS.filter((r) => r.formulaId === r.id).length !== 4) {
  throw new Error('batch97 canonical formula drift');
}
if (BATCH97_SKIPPED_NO_OI.length !== 0) throw new Error('batch97 no_OI drift');
if (BATCH97_SKIPPED_OUT.length !== 1) throw new Error('batch97 OUT drift');
if (BATCH97_SKIPPED.length !== 1) throw new Error('batch97 SKIPPED drift');
if (BATCH97_REFUSED.length !== 40) throw new Error('batch97 REFUSED drift');
if (BATCH97_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch97 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch97 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch97 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'healtha2z-b97-fexo-180-416': '369168416062',
  'healtha2z-b97-loratadine-10-pregel': '369168414174',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 2) throw new Error('batch97 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch97 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch97 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch97 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch97 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b97-'))) {
  throw new Error('batch97 ids must use healtha2z-b97-');
}
if (_ROWS.some((r) => !r.formulaId?.startsWith('healtha2z-b97-'))) {
  throw new Error('batch97 formula ids must use healtha2z-b97-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch97 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch97 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch97 Avoid without High');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'clean' &&
      r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'),
  )
) {
  throw new Error('batch97 Clean row has a non-cleared flag');
}
const _fexo = _ROWS.find((r) => r.id === FEXO_180_416);
if (
  !_fexo?.inactiveIngredients?.some((f) => f.name === 'red iron oxide' && f.riskLevel === 'limited') ||
  !_fexo?.inactiveIngredients?.some((f) => f.name === 'anhydrous lactose' && f.riskLevel === 'cleared')
) {
  throw new Error('batch97 fexofenadine stamp map drift');
}
const _lora = _ROWS.find((r) => r.id === LORATADINE_10_PREGEL);
if (!_lora?.inactiveIngredients?.some((f) => f.name === 'pregelantinized starch' && f.riskLevel === 'cleared')) {
  throw new Error('batch97 pregelantinized starch must map to Cleared');
}
const _ibu = _ROWS.find((r) => r.id === IBU_200_381);
if (!_ibu?.inactiveIngredients?.some((f) => f.name === 'polyethyleneglycol' && f.riskLevel === 'moderate')) {
  throw new Error('batch97 polyethyleneglycol must map to PEG');
}
const _patch = _ROWS.find((r) => r.id === LIDOCAINE_4_PATCH);
if (
  !_patch?.inactiveIngredients?.some((f) => f.name === 'methyl paraben' && f.riskLevel === 'high') ||
  !_patch?.inactiveIngredients?.some(
    (f) => f.name === 'sodium carboxy methyl cellulose' && f.riskLevel === 'cleared',
  )
) {
  throw new Error('batch97 patch stamp map drift');
}
if (_ROWS.some((r) => /white ink|lactose anhydrous|shellac wax|light liquid paraffin/i.test(r.productName))) {
  throw new Error('batch97 wrote a still-blocked token into a product name');
}
if (!BATCH97_SKIPPED_OUT.some((s) => s.sku.includes('FPA106'))) {
  throw new Error('batch97 day/night combo must stay OUT');
}
if (!BATCH97_REFUSED.some((s) => s.reason.includes('`white ink`'))) {
  throw new Error('batch97 white ink must stay refused');
}
const _scope = [..._ROWS.map((r) => r.id), ...BATCH97_SKIPPED.map((s) => s.sku), ...BATCH97_REFUSED.map((s) => s.sku)].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_scope)) {
  throw new Error('batch97 excluded brand leaked');
}
