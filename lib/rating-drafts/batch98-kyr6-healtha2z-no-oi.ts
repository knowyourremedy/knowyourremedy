// DRAFT / not verified / batch 98 KYR6 HealthA2Z no_OI second look.
// Methodology v1.6 + MAIN §5 after stamp 7561b61 (Sept 24, 2026 HealthA2Z
// maps) and the formaldehyde-releaser Avoid stamp. Harm-first. No invented
// grades. No invented OI. No invented UPCs. Founder owns final Avoid vs
// Caution vs Clean.
//
// ONE write. The 93 SKUs in BATCH96_SKIPPED_NO_OI only. The 9
// BATCH96_SKIPPED_OUT stay dead. Batch96 REFUSED and batch97 rows are not
// rewritten. Hunt ladder this pass: DailyMed labeler 69168, the a2z-life.com
// carousel, then Target / Walmart / iHerb / Vitacost / Amazon US, then Google
// cited US pages only. HTML bullets are not OI. An AI blurb is not OI.
// An NDC is not a UPC. No GTIN-12 printed on these pins.
// recordStatus is 'unverified' on every row.
// Internal keys only: clean | caution | avoid. A pack that shares an inactive
// line already on MAIN reuses that formulaId. Search wiring only. Not wired
// into Clean Picks UI.
//
// Do NOT edit batch70–batch97. No house Amazon. No TIME-Cap. No GoodSense.
// No toothpaste. No Sprouts. No factory. Oil form split stays as it is on main.
//
// TALLY (unverified drafts in THIS file): 14 rows —
// Clean 1 / Caution 5 / Avoid 8.
// NEW 4 / REUSE-formula 10 /
// SKIPPED 61 (no_OI 59 / OUT 2) /
// REFUSED 20.
// Search grade: Clean 1 / Caution 5 / Avoid 8.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';
import { BATCH96_SKIPPED_NO_OI } from './batch96-kyr6-amazon-3p-healtha2z';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'HealthA2Z';
const AMAZON = ['Amazon'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  sio2: 'Methodology §5 Limited (colloidal silicon dioxide / silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.',
  croscarmellose: 'Methodology §5 Cleared (croscarmellose sodium).',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC).',
  lactoseMh: 'Methodology §5 Cleared (lactose monohydrate).',
  lactose: 'Methodology §5 Cleared (lactose / lactose monohydrate). Anhydrous lactose maps here (Sept 24, 2026).',
  mgStearate: 'Methodology §5 Cleared (magnesium stearate).',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs). Not the Avoid driver.',
  tio2: 'Methodology §5 High (titanium dioxide).',
  cornStarch: 'Methodology §5 Cleared (corn starch — named simple starch).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes). The printed spelling is the flag name.',
  gelatin: 'Methodology §5 Cleared (gelatin). Gelatin capsule is that token.',
  povidone: 'Methodology §5 Cleared (povidone).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch). Pregelatinized starch (maize) is that token.',
  stearic: 'Methodology §5 Cleared (stearic acid).',
  hec: 'Methodology §5 Cleared (hydroxyethyl cellulose / hydroxyethylcellulose).',
  ironColor: 'Methodology §5 Caution (iron oxide as color). Red iron oxide and yellow iron oxide map here (Sept 24, 2026). Not Avoid.',
  pgOral: 'Methodology §5 Moderate (propylene glycol, oral). May-contain propylene glycol on an oral tablet is this row.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  water: 'Methodology §5 Cleared (purified water / water).',
  silicon: 'Methodology §5 Caution (silicon — exact word; Sept 15, 2026). This reuse copies the flag already stored on healtha2z-naproxen-220-300. Not a new grade.',
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
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
      'Cold & Flu': [
        'coldcalm-meltaways',
        'Independently Clean Boiron ColdCalm already on main. Form labeled, not a hard filter (§6).',
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
    honestNote: `${d.note} ${LIMITED_STACK} Packs with this OI list share formulaId \`${d.formulaId}\`. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const CETIRIZINE_10_FLAGS: Compact['flags'] = [
  ['colloidal silicon dioxide', 'limited', 'sio2'],
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['lactose monohydrate', 'cleared', 'lactoseMh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['titanium dioxide', 'high', 'tio2'],
];

const ASPIRIN_325_FLAGS: Compact['flags'] = [
  ['corn starch', 'cleared', 'cornStarch'],
];

const LORATADINE_10_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['lactose monohydrate', 'cleared', 'lactoseMh'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['silicon dioxide', 'limited', 'sio2'],
];

const APAP_650_ER_FLAGS: Compact['flags'] = [
  ['hydroxyethyl cellulose', 'cleared', 'hec'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['polyethylene glycol', 'moderate', 'peg'],
  ['povidone', 'cleared', 'povidone'],
  ['pregelatinized starch', 'cleared', 'pregel'],
  ['sodium starch glycolate', 'cleared', 'ssg'],
  ['stearic acid', 'cleared', 'stearic'],
];

const FEXO_180_416_FLAGS: Compact['flags'] = [
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

const NAPROXEN_220_FLAGS: Compact['flags'] = [
  ['FD&C blue #2 aluminum lake', 'high', 'dye'],
  ['Titanium dioxide', 'high', 'tio2'],
  ['Polyethylene glycol', 'moderate', 'peg'],
  ['silicon', 'cleared', 'silicon'],
  ['Hypromellose', 'cleared', 'hpmc'],
  ['Sodium starch glycolate', 'cleared', 'ssg'],
  ['Stearic acid', 'cleared', 'stearic'],
  ['Magnesium stearate', 'cleared', 'mgStearate'],
  ['Corn starch', 'cleared', 'cornStarch'],
  ['Croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['Microcrystalline cellulose', 'cleared', 'mcc'],
  ['Povidone', 'cleared', 'povidone'],
  ['Purified water', 'cleared', 'water'],
];

const PE_5_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['lactose', 'cleared', 'lactose'],
  ['FD&C red #40 aluminum lake', 'high', 'dye'],
  ['FD&C yellow #6 aluminum lake', 'high', 'dye'],
  ['hypromellose', 'cleared', 'hpmc'],
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['titanium dioxide', 'high', 'tio2'],
  ['propylene glycol', 'moderate', 'pgOral'],
];

const PE_10_FLAGS: Compact['flags'] = PE_5_FLAGS;

const BONE_FLAGS: Compact['flags'] = [
  ['magnesium stearate', 'cleared', 'mgStearate'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['Gelatin capsule', 'cleared', 'gelatin'],
];

const MUCUS_FLAGS: Compact['flags'] = [
  ['croscarmellose sodium', 'cleared', 'croscarmellose'],
  ['maltodextrin', 'limited', 'maltodextrin'],
  ['microcrystalline cellulose', 'cleared', 'mcc'],
  ['povidone', 'cleared', 'povidone'],
  ['silicon dioxide', 'limited', 'sio2'],
  ['stearic acid', 'cleared', 'stearic'],
];

const CITE_CET = 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bef9e980-37b4-430d-8635-3354d578b3b8; setid bef9e980-37b4-430d-8635-3354d578b3b8). Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide. Reuses healtha2z-b96-cetirizine-10. No GTIN-12.';
const CITE_ASP = 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=88b54062-8b3d-4024-a957-62b3255184b9; setid 88b54062-8b3d-4024-a957-62b3255184b9). Inactive ingredients: corn starch. Reuses healtha2z-b96-aspirin-325. No GTIN-12.';
const CITE_LOR = 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0991388a-2eb8-4913-9efc-adf411eddf3a; setid 0991388a-2eb8-4913-9efc-adf411eddf3a). Inactive ingredients: croscarmellose sodium, lactose monohydrate, magnesium stearate, microcrystalline cellulose, silicon dioxide. Reuses healtha2z-b96-loratadine-10. No GTIN-12.';
const CITE_650 = 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f4720346-c3e0-4707-b007-1bf1f5e05707; setid f4720346-c3e0-4707-b007-1bf1f5e05707) plus the brand drug-facts tile on the 300-caplet PDP. Inactive ingredients: hydroxyethyl cellulose, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, povidone, pregelatinized starch, sodium starch glycolate, stearic acid. Reuses healtha2z-b96-apap-650-er. No GTIN-12.';
const CITE_FEXO = 'Brand front tile prints NDC 69168-416-30. DailyMed setid 61eebc8a-8d1e-48a2-afb1-eda9cb00ff97. Inactive ingredients: anhydrous lactose, colloidal silicon dioxide, corn starch, croscarmellose sodium, hypromellose, lactose monohydrate, polyethylene glycol, pregelatinized starch (maize), red iron oxide, stearic acid, titanium dioxide, yellow iron oxide. Reuses healtha2z-b97-fexo-180-416. No GTIN-12.';
const CITE_NAP = 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14554f05-14e1-4c52-99ce-94561c42c0da; setid 14554f05-14e1-4c52-99ce-94561c42c0da; NDC 69168-395-07 is the 10-count). Founder note on healtha2z-naproxen-220-300: the 10-count shares that formulaId. Flags are copied from that row. No GTIN-12 on this 10-count pack. The 300-count barcode was not copied.';
const CITE_PE5 = 'Brand drug-facts tile DF__46012 on the 300-count decongestant PDP, matched to DailyMed setid 7a3098b4-381c-4f32-97a7-87b53fd64428 (NDC 69168-271-17, 300 tablets). Active: phenylephrine HCl 5 mg. Inactive ingredients: croscarmellose sodium, lactose, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, silicon dioxide, titanium dioxide. May contain propylene glycol. Not the 10 mg SPL. No GTIN-12.';
const CITE_PE10 = 'Brand drug-facts tile DF__41890 on the phenylephrine 10 mg 24×24 PDP. Printed inactive ingredients: croscarmellose sodium, lactose, FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, hypromellose, magnesium stearate, microcrystalline cellulose, silicon dioxide, titanium dioxide. May contain propylene glycol. This tile does not print polyethylene glycol, so it is not setid 7aef00df (healtha2z-b96-phenylephrine-10). No NDC attached. No GTIN-12.';
const CITE_BONE = 'Brand supplement-facts tile Bone_Support_SF on https://a2z-life.com/healtha2z-bone-support-algae-calcium-complex-90-capsules/. Other ingredients: Magnesium stearate, Silicon dioxide, Gelatin capsule. No GTIN-12.';
const CITE_MUCUS = 'Brand drug-facts tile detail_200 on https://a2z-life.com/healtha2z-mucus-relief-dm-200-count/. Inactive ingredients: croscarmellose sodium, maltodextrin, microcrystalline cellulose, povidone, silicon dioxide, stearic acid. The Allegiant mucus SPL also prints magnesium stearate; that word is not on this tile and was not added. No GTIN-12.';

const COMPACT: Compact[] = [
  {
    id: 'healtha2z-b98-pe-5-300',
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168271173',
    upcNote:
      'UPC-A 369168271173 is printed beside HealthA2Z phenylephrine HCl 5 mg, code FPA067, 300 tablets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). That page has no second UPC for this count.',
    productName: 'HealthA2Z Phenylephrine HCl 5 mg, 300 tablets, NDC 69168-271-17 (FPA067)',
    category: 'Cold & Flu',
    formulaId: 'healtha2z-b98-pe-5-300',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenylephrine HCl', strength: '5 mg' }],
    flags: PE_5_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, titanium dioxide. May-contain propylene glycol is oral Moderate, not the Avoid driver. Adults and children 12 years and over.',
    cite: CITE_PE5,
  },
  {
    id: 'healtha2z-b98-pe-10-24x24',
    productName: 'HealthA2Z Phenylephrine HCl 10 mg, 24 packs of 24 tablets (576) (FP0514)',
    category: 'Cold & Flu',
    formulaId: 'healtha2z-b98-pe-10-24x24',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Phenylephrine HCl', strength: '10 mg' }],
    flags: PE_10_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C red #40 aluminum lake, FD&C yellow #6 aluminum lake, titanium dioxide. Same printed inactive line as the 5 mg tile, including may-contain propylene glycol, and a different strength, so its own formulaId. Not healtha2z-b96-phenylephrine-10.',
    cite: CITE_PE10,
  },
  {
    id: 'healtha2z-b98-bone-90',
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168811829',
    upcNote:
      'UPC-A 369168811829 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z Bone Support algae calcium 90-capsule bottle (BoneSupportBack) (https://a2z-life.com/healtha2z-bone-support-algae-calcium-complex-90-capsules/).',
    productName: 'HealthA2Z Bone Support algae calcium complex, 90 capsules (FPHK1248)',
    category: 'Vitamins',
    formulaId: 'healtha2z-b98-bone-90',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: OTC,
    actives: [
      { name: 'Calcium (from algae powder)', strength: '360 mg' },
      { name: 'Magnesium (from algae powder and magnesium oxide)', strength: '175 mg' },
      { name: 'Vitamin D3', strength: '800 IU' },
      { name: 'Vitamin K2 (MK-7)', strength: '50 mcg' },
    ],
    flags: BONE_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver: silicon dioxide. Gelatin capsule and magnesium stearate are Cleared. Adults, 2 capsules.',
    cite: CITE_BONE,
  },
  {
    id: 'healtha2z-b98-mucus-dm-200',
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168345980',
    upcNote:
      'UPC-A 369168345980 is printed beside HealthA2Z mucus relief DM, code FPA016, 200 tablets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Mucus Relief DM, dextromethorphan HBr 20 mg and guaifenesin 400 mg, 200 tablets (FPA016)',
    category: 'Cold & Flu',
    formulaId: 'healtha2z-b98-mucus-dm-200',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [
      { name: 'Dextromethorphan HBr', strength: '20 mg' },
      { name: 'Guaifenesin', strength: '400 mg' },
    ],
    flags: MUCUS_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Drivers: maltodextrin, silicon dioxide. Limited-only. Adults and children 12 years and older.',
    cite: CITE_MUCUS,
  },
  {
    id: 'healtha2z-b98-aspirin-325-40x24',
    productName: 'HealthA2Z Aspirin 325 mg uncoated tablets, 24 packs of 40 (960), NDC 69168-312-40 (FP1165)',
    category: 'Pain & Fever',
    formulaId: 'healtha2z-b96-aspirin-325',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '325 mg' }],
    flags: ASPIRIN_325_FLAGS,
    verdict: 'clean',
    note: 'FOUNDER-LOCK DRAFT: Clean. Every printed inactive is a locked Cleared token. The inner bottle is the 40-count on the aspirin 325 setid already written.',
    cite: CITE_ASP + ' NDC 69168-312-40. Brand PDP https://a2z-life.com/healtha2z-aspirin-325mg-original-strength-uncoated-tablets-pain-reliever-fever-reducer-24.',
  },
  {
    id: 'healtha2z-b98-cetirizine-10-1',
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168310094',
    upcNote:
      'UPC-A 369168310094 is printed beside HealthA2Z cetirizine HCl 10 mg, code FP0895, 10 tablets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Cetirizine HCl 10 mg, 10 tablets, NDC 69168-396-09 (FP0895)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-cetirizine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    flags: CETIRIZINE_10_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. One pack on the 10-tablet option page.',
    cite: CITE_CET + ' NDC 69168-396-09 is the 10-count carton.',
  },
  {
    id: 'healtha2z-b98-cetirizine-10-3',
    productName: 'HealthA2Z Cetirizine HCl 10 mg, 3 packs of 10 tablets (30), NDC 69168-396-09 (FP0895)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-cetirizine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    flags: CETIRIZINE_10_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Three packs on the 10-tablet option page.',
    cite: CITE_CET + ' NDC 69168-396-09 is the 10-count carton.',
  },
  {
    id: 'healtha2z-b98-cetirizine-10-6',
    productName: 'HealthA2Z Cetirizine HCl 10 mg, 6 packs of 10 tablets (60), NDC 69168-396-09 (FP0895)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-cetirizine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    flags: CETIRIZINE_10_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide. Six packs on the 10-tablet option page.',
    cite: CITE_CET + ' NDC 69168-396-09 is the 10-count carton.',
  },
  {
    id: 'healtha2z-b98-cetirizine-10-30',
    // KYR5-d retailer ladder — Google-cited page.
    barcode: '369168310308',
    upcNote:
      'UPC-A 369168310308 is printed beside HealthA2Z cetirizine HCl 10 mg, code FP0896, 30 tablets per unit in the Allegiant Health 2024 product catalog (https://allegiant-health.com/wp-content/uploads/2024/02/Allegiant-Health-Products-Catalog_final_2024.pdf). The brand-site UPC field for that same code and count matches this line.',
    productName: 'HealthA2Z Cetirizine HCl 10 mg, 30 tablets, NDC 69168-396-30 (FP0896)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-cetirizine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    flags: CETIRIZINE_10_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, titanium dioxide.',
    cite: CITE_CET + ' NDC 69168-396-30 is the 30-count.',
  },
  {
    id: 'healtha2z-b98-loratadine-10-30x24',
    productName: 'HealthA2Z Loratadine 10 mg, 24 packs of 30 tablets (720), NDC 69168-309-30 (FP1011)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-loratadine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORATADINE_10_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver: silicon dioxide. The inner bottle is the 30-count already written on this setid.',
    cite: CITE_LOR + ' NDC 69168-309-30.',
  },
  {
    id: 'healtha2z-b98-loratadine-10-5x24',
    productName: 'HealthA2Z Loratadine 10 mg, 24 packs of 5 tablets (120), NDC 69168-309-08 (FP1009)',
    category: 'Allergies',
    formulaId: 'healtha2z-b96-loratadine-10',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '10 mg' }],
    flags: LORATADINE_10_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver: silicon dioxide. The inner carton is the 5-count already written on this setid.',
    cite: CITE_LOR + ' NDC 69168-309-08.',
  },
  {
    id: 'healtha2z-b98-apap-650-300',
    // KYR5-d retailer ladder — brand-site bar photo.
    barcode: '369168461178',
    upcNote:
      'UPC-A 369168461178 is the 12-digit code printed under the bars on the brand-site image of the HealthA2Z acetaminophen 650 mg extended-release 300-caplet bottle (https://a2z-life.com/healtha2z-pain-relief-extended-release-acetaminophen-650mg-300-caplets-8-hours-arthritis-pain-pain-reliever-fever-reducer-contains-no-aspirin/).',
    productName: 'HealthA2Z Acetaminophen 650 mg extended-release caplets, 300 count, NDC 69168-461-17 (FPN013)',
    category: 'Pain & Fever',
    formulaId: 'healtha2z-b96-apap-650-er',
    audience: ADULT,
    minAge: 18,
    form: 'extended-release caplet',
    productType: OTC,
    actives: [{ name: 'Acetaminophen', strength: '650 mg' }],
    flags: APAP_650_ER_FLAGS,
    verdict: 'caution',
    note: 'FOUNDER-LOCK DRAFT: Caution. Driver: polyethylene glycol. Under 18: ask a doctor.',
    cite: CITE_650,
  },
  {
    id: 'healtha2z-b98-naproxen-220-10x24',
    productName: 'HealthA2Z Naproxen sodium 220 mg, 24 packs of 10 caplets (240), NDC 69168-395-07 (FP0940)',
    category: 'Pain & Fever',
    formulaId: 'healtha2z-naproxen-220-300',
    audience: ADULT,
    minAge: 12,
    form: 'coated tablet',
    productType: OTC,
    actives: [{ name: 'Naproxen sodium', strength: '220 mg' }],
    flags: NAPROXEN_220_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: FD&C blue #2 aluminum lake, titanium dioxide. Reuses healtha2z-naproxen-220-300. The 300-count is not rewritten.',
    cite: CITE_NAP,
  },
  {
    id: 'healtha2z-b98-fexo-180-30x24',
    productName: 'HealthA2Z Fexofenadine HCl 180 mg, 24 packs of 30 caplets (720), NDC 69168-416-30 (FP1179)',
    category: 'Allergies',
    formulaId: 'healtha2z-b97-fexo-180-416',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Fexofenadine HCl', strength: '180 mg' }],
    flags: FEXO_180_416_FLAGS,
    verdict: 'avoid',
    note: 'FOUNDER-LOCK DRAFT: Avoid. Drivers: colloidal silicon dioxide, polyethylene glycol, red iron oxide, titanium dioxide, yellow iron oxide. The front tile prints NDC 69168-416-30, the 30-count already written in batch97. Not the 413 formula and not the paraffin formula.',
    cite: CITE_FEXO,
  },
];

export const BATCH98_KYR6_HEALTHA2Z_NO_OI: RatingRecord[] = COMPACT.map(expand);

export const BATCH98_SKIPPED_NO_OI: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z Allergy Relief | Diphenhydramine 25mg | 24 Packs of 12 Sofgels (288 Total) | Value Pack | Antihistamine for Sneezing, Runny Nose & Itchy Eyes (FP1043)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Blackberry Flavored Melatonin | 5 mg | 60 Pieces | With Melatonin | Improves Sleep Quality, Helps You Fall Asleep Faster & Stay Asleep Longer (FP1062)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Wellness Magnesium Oxide 420mg | Bone & Muscle Support | Dietary Supplement | Value Pack – 24 Packs of 90 Tablets Each (2,160 Tablets Total) (FP1069)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Men's Vitality Boost | 30 Capsules | With Maca, Oyster & Saw Palmetto | Supports Health, Vitality & Endurance (FP1221)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 30 Caplets (720 Total) | Value Pack (FP1125)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, Compare to Simply Sleep, 24 Caplets in a Pack (1 Pack, 3 Pack, 6 Pack)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Multi Collagen Pills | 1735 mg | 270 Collagen Capsules | Types I, II, III, V & X | for Healthy Skin, Hair, Nails & Joint Support (FPA104)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. The brand back tile is marketing copy (Your Body's Glue), not an other-ingredients line. A Target supplement-facts view shows the collagen blend and no separate other-ingredients line." },
  { sku: "HealthA2Z Laxative (BISACODYL 5MG) 250 Count (FPA015)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® CoQ-10 98% Potency | Fast Release 1000 mg | 80 Softgels | Antioxidant Form | Supports Overall Health (FP1186)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Senna Laxative, Sennoside 8.6mg, Compare to Senokot Active Ingredient (FP0921)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. The compare page does not pin one count. The 24×30 and 300-count senna rows are already on MAIN and were not rewritten." },
  { sku: "HealthA2Z Aspirin 81mg Low Strength, 40 Tablets, Compare to Bayer Active Ingredients ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 + K2 | 5000 IU + 100 mcg | 90 Softgels | Bone & Immune Support | Supports Bone, Muscle & Immune Health (FPHK1222)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Cold & Allergy | Chlorpheniramine Maleate & Phenylephrine HCl | 24 Tablets (Pack of 24) | 576 Total Tablets | Value Pack (FP0943V)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Fish oil regular protency, 200 ct (FP1119)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Magnesium Glycinate(100% Chelated) 240 mg - 180 Capsules, Supports Daytime Energy, Nighttime Restful Sleep, Stress Relief, Mood Balance, Bone & Muscle Health, and Natural Beauty - High Absorption Formula (FPHK1313)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Ashwagandha - 120 Capsules - 7,000mg Ashwagandha Root Powder per serving with Magnesium Glycinate and Ergothioneine (FPHK1252)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Allergy Relief, Diphenhydramine 25mg ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 | 2000 IU | 90 Mini Softgels | From Premium Lanolin Extract | Immune Support | Enhances Calcium Absorption | Supports Bones, Muscles, Teeth & Energy (FP1068)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Strawberry Flavored B-Complex | 60 Pieces | With Vitamin C | Supports Energy Health & Nervous System Function (FP1126)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Emulsified Calcium | 600 mg Per Serving | 100 Softgels | With 5 mcg (200 IU) Vitamin D3 | Supports Healthy Bones & Teeth | Superior Absorption (FP1190)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Multi Collagen pills 1735mg -180 collagen capsules (60 servings) - Types I, II, III, V & X for Healthy Skin, Hair, Nails & Joint Support (FPN002)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. The 180-count gallery has no back panel. The 270-count marketing tile was not copied onto it." },
  { sku: "HealthA2Z® Mucus Relief DM | Dextromethorphan HBr 20mg & Guaifenesin 400mg | Cough & Chest Congestion Relief | 24 Packs of 20 Caplets (480 Total) | Value Pack (FP0585)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z CoQ10 200mg Heart Power - 90 Softgels - with Shilajit & Black Pepper Extract (FPHK1255)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Liquid Vitamin B-Complex | 16 oz (473 mL) | Supports Healthy Energy Levels | Promotes Healthy Nerve Function** (FPN016)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 | 25 mcg (1,000 IU) | 90 Softgels | Bone & Immune Support | Supports Immune Health (FP1148)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Mucus Relief DM, Compare to Mucinex DM Dextromethorphan HBr 20mg, Guaifenesin 400mg, 10 Caplets (1 Pack, 3 Packs & 6 Packs) (FPA049E)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 2000IU (25 mcg) | 360 Softgels (FPHK1153)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® 9 in 1 Joint Health for Women | 90 Tablets, 30-Day Supply | Glucosamine, Chondroitin, MSM, Soy Isoflavones & Turmeric | (FPHK1253)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Eye Health - 60 Softgels (Pack of 1) - ARED 2 FORMULA - Macular, Retinal & Photoreceptor - Support for Aging Eyes - Quick Release (FPHK1256)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Mag Oxide 420mg Tablets, 90 ct (FPHK1069)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Pain Relief Extra Strength | 500 Caplets | (FPA080)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin C Gummies | Orange Flavored | 250 mg | 60 Pieces | Immune Support & Antioxidant Support (FPHK1065)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Milk Thistle | Concentrated Extract 300 mg | 60 Tablets | With Milk Thistle Extract | Supports Liver Health & Promotes Healthy Liver Function (FPHK1302)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Anti-Gas, 125mg ( 1 Pack, 3 Packs& 6 Packs) (FP1032)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 (2,000 IU) + K2 (MK-7) Made with Virgin Coconut Oil (Natural MCTs) - 90 Softgels (Pack of 1) - Helps Calcium Absorption for Bones, Teeth, Mood & Immune Health (FPHK1290)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Antarctic Krill Oil | 1000 mg Per Serving | 60 Softgels | With Omega-3 & Astaxanthin | Supports Heart Health | Greater Absorption (FPHK1294)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. The brand back-panel OCR stops at Purified and was not completed. A Target HTML ingredients blurb (gelatin, glycerin, purified water, natural vanillin) is not a printed panel and was not pinned." },
  { sku: "HealthA2Z Extra Strength Pain Relief PM, 20*24 Caplets (480 Caplets Total) (FP1085)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Ovarian Support, Saffron 88.5mg, Inositol, Vitamin D3, 60 Caps (FPHK1318)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Glucosamine Chondroitin MSM | 120 Caplets (FP1138)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Extra Strength Pain Relief | Acetaminophen 500mg | Pain Reliever & Fever Reducer | 24 Packs of 24 Tablets Each (576 Tablets Total) | Value Pack | Contains No Aspirin (FP1090)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Daytime and Nighttime | Cold & Flu Medicine | Decongestant-Free | Powerful Multi-Symptom Daytime and Nighttime Relief | Suitable for Adults with High Blood Pressure (36 Softgels) (FPA192 (FP1317))", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. DailyMed kit setid 0533db78 prints two inactive lists and was not pinned to this decongestant-free 36-softgel pack." },
  { sku: "HealthA2Z Laxative, 25 Tablets ( 1 Pack, 3 Packs& 6 Packs)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Sugar Free Melatonin Gummies | Blackberry Flavored | 5 mg | 60 Pieces | With Melatonin | Improves Sleep Quality, Helps You Fall Asleep Faster & Stay Asleep Longer (FP1127)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Liquid Vitamin B-Complex Supports Healthy Energy Levels* | Promotes Healthy Nerve Function* | 16oz (473ml) (FPN015)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Laxative, Bisacodyl 5mg, 24*25 Tablets ( 600 Tablets Total) (FP0917)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Mucus Relief DM, Dextromethorphan HBr 20mg, Guaifenesin 400mg, 24*10 Caplets (240 Caplets Total) (FP0575)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Cold & Allergy Relief, Chlorpheniramine Maleate 4mg, Phenylephrine HCl 10mg, Antihistamine & Nasal Decongestant, Dye Free, 24 Tablets (FP0943)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Magnesium Glycinate = DHA 120mg - 120 Chewable Tablets - Sugar Free, Aid in Stress Management & Focus, Kids Friendly (FPHK1277)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Women's Multivitamin Gummies | Peach, Orange & Strawberry Flavored | 60 Pieces | For Daily Health & Wellness | Supports Women's Overall Health (FPHK1130)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 25mg | 24 Pack of 30 Caplets Each | Regular Strength Sleeping Pills | Value Pack | 720 Caplets Total (FP0549)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z Sleep Aid, Diphenhydramine HCl 25mg, 24*24 Caplets (576 Caplets Total) (FP0508)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 (5,000 IU) + K2 (MK-7) Made with Virgin Coconut Oil (Natural MCTs) - 90 Softgels (Pack of 1) - Helps Calcium Absorption for Bones, Teeth, Mood & Immune Health (FPHK1287)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Antarctic Krill Oil | 1000 mg Per Serving | 60 Softgels | With Omega-3 & Astaxanthin | Supports Heart Health | Greater Absorption (FPHK1188)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC. This 60-softgel listing has no own back panel. The other krill listing's truncated line was not copied onto it. A Target HTML ingredients blurb is not a printed panel." },
  { sku: "HealthA2Z® Magnesium Glycinate,180 ct (FP1019)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Magnesium Glycinate(100% Chelated) 240 mg - 60 Capsules, Supports Daytime Energy, Nighttime Restful Sleep, Stress Relief, Mood Balance, Bone & Muscle Health, and Natural Beauty - High Absorption Formula (FPHK1312)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Sugar Free Probiotics Gummies | Raspberry & Watermelon Flavored | 2.5 Billion CFUs | 60 Pieces | Supports Digestive Health | Contains Over 2.5 Billion CFUs of Good Bacteria (FPHK1128)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Fish Oil | 900 mg EPA / 600 mg DHA | 180 Softgels | Triple Strength Omega-3 | Supports Heart & Brain Health | Helps Support Optimal Wellness (FPHK1218)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Kids' & Teens' Chewable Vitamin D3 + K2 20 mcg (800IU) + 50mcg - 60 Tablets (Pack of 1) - Bone & Immune Health Support - Sugar Free, Dye Free, Creme and Cocoa Flavor (FPHK1319)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
  { sku: "HealthA2Z® Vitamin D3 + K2 | 2000 IU + 100 mcg | 90 Softgels | Bone & Immune Support | Supports Bone, Muscle & Immune Health (FPHK1226)", reason: "SKIPPED no_OI leftover. Rungs tried: (1) DailyMed Allegiant labeler 69168, by drug name and by package count — no HealthA2Z-pinned Drug Facts inactive paragraph for this exact strength, form, and count. (2) a2z-life.com PDP carousel, count tabs, and accordions were opened; HTML bullets are not OI; no complete printed inactive line for this exact pack. (3) Target, Walmart, iHerb, Vitacost, and Amazon US were requested (iHerb 403, Walmart robot wall, Amazon 503; Target and Vitacost did not return a pinned facts image for this pack). (4) Google last, cited US pages only; an AI blurb is not OI and HTML bullet copy is not OI. No GTIN-12. NDC is not a UPC." },
];

export const BATCH98_SKIPPED_OUT: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z - Ayuda para dormir, 250 cápsulas blandas (FPA028S)", reason: "OUT. Spanish-language duplicate of the English HealthA2Z sleep-aid 50 mg 250-softgel pack already refused in batch96 (FPA028/FP1082, white ink). Not a second Search row and not a second refuse." },
  { sku: "HealthA2Z® Allergy Relief | Cetirizine 10mg | 24 Packs of 45 Tablets Each (1080 Tablets) | All Day Allergy Relief | Indoor & Outdoor | Relief from Itchy Throat, Sneezing, Runny Noses | Value Pack (FP1178V)", reason: "OUT. Twin already on MAIN as healtha2z-b96-cetirizine-10-1080 (FP1178). Same a2z-life.com URL as that 24×45 (1080) pack. Not a second Search row." },
];

export const BATCH98_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH98_SKIPPED_NO_OI,
  ...BATCH98_SKIPPED_OUT,
];

export const BATCH98_REFUSED: { sku: string; reason: string }[] = [
  { sku: "HealthA2Z® Acid Reducer | Omeprazole 20mg | 14 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA173)", reason: "REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sodium stearyl fumarate`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Brand PDP drug-facts tile on the 14-tablet omeprazole pack (same tile on the 42-tablet PDP). The DailyMed 476 inactive paragraph is a different list and was not used. NO Search row." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 50mg | Nighttime Sleep Softgels | 10 Counts (Pack of 24) | 240 Softgels Total | Value Pack (FP0980)", reason: "REFUSED exact panel string `white ink`. DailyMed setid ec57db48-0f3a-4b12-8633-b45a4366c269. NDC 69168-410-09 is the 10-count carton. Same inactive line as the refused 200-count. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | Omeprazole 20mg | 42 Tablets | Delayed - Release Tablets | 24 Hours | Treats Frequent Heartburn | Occuring 2 or More Days A Week (FPA174)", reason: "REFUSED exact panel string(s) `methacrylic acid and ethyl acrylate copolymer dispersion`, `silicified microcrystalline cellulose`, `sodium stearyl fumarate`, `sugar spheres [which contains liquid glucose, starch (maize) and sucrose]`. Same brand drug-facts tile as the 14-tablet pack. NO Search row." },
  { sku: "HealthA2Z Ibuprofen, 10 liquid filled capsules (1 Pack, 3 Packs & 6 Packs) (FP0660)", reason: "REFUSED exact panel string(s) `potassium hydroxide`, `sorbitol sorbitan`, `sorbitan monooleate`. The 10-count liquid-filled option page is the inner unit of NDC 69168-368-07 (setid 8ba06ba0). Gallery tiles are the IB_10 softgels. Same inactive paragraph as the 24×10 value pack. NO Search row." },
  { sku: "HealthA2Z Apple Cider Vinegar 500mg Gummy 4g, 60 ct (FPHK1044)", reason: "REFUSED exact panel string(s) `natural apple flavor`, `unfiltered liquid apple cider vinegar`, `purple carrot concentrate`, `beta-carotene`. Brand supplement-facts tile Apple_Cider_Ingredients. Other ingredients: Glucose syrup, sugar, glucose, pectin, sodium citrate, citric acid, natural apple flavor, vegetable oil, unfiltered liquid apple cider vinegar, purple carrot concentrate, and beta-carotene. Bare sugar, bare glucose, and gummy vegetable oil are locked and are not the block. NO Search row." },
  { sku: "HealthA2Z® Calcium Antacid | 750mg Extra Strength | Relief from Sour & Upset Stomach, Acid Indigestion | 24 Packs of 96 Chewable Tablets (2,304 Tablets Total) | Value Pack | Assorted Berry Flavors (FP0938V)", reason: "REFUSED exact panel string `assorted flavors`. DailyMed setid 51dd53e8-22ff-4967-9124-f15c3986e4dd names HealthA2Z. NDC 69168-229-96 is the 96-count bottle inside this 24×96 value pack. NO Search row." },
  { sku: "HealthA2Z® Stool Softener, Docusate Sodium 100mg, 100 Capsules (FPA002)", reason: "REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`, `sorbitol special`. Brand gallery filename is the red 100-count stool softener. That pack is NDC 69168-420-01 on setid 30c9ff75 (same line as refused FPA059). Not the single-tone 100-count. NO Search row." },
  { sku: "HealthA2Z Stool Softener | Docusate Sodium 100mg | 24 Pack of 30 Capsules | Value Package | 720 Softgels in Total (FP1024)", reason: "REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`, `sorbitol special`. DailyMed setid 30c9ff75-cee4-4632-86fd-acfdf5ee85af. NDC 69168-420-30 is the only Allegiant docusate sodium 100 mg 30-count. Same line as the refused colored 100-count. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | Famotidine 20mg | Maximum Strength | Relief from Heartburn & Acid Indigestion | 24 Packs of 50 Tablets (1,200 Tablets Total) | Value Pack (FP1205)", reason: "REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. DailyMed setid adc2721d-2ca7-4a47-bae1-be298fa1c155 already pinned as HealthA2Z. The 50-count bottle sits in carton NDC 69168-443-50. The gradeable 445 SPL has no 50-count. NO Search row." },
  { sku: "HealthA2Z Nighttime Cold-Flu Relief, 8 Softgels (1 Pack, 3 Packs & 6 Packs)", reason: "REFUSED exact panel string(s) `gelatin USP`, `glycerin USP`, `polyethylene glycol-400 USP`, `povidone USP`, `propylene glycol USP`, `purified water USP`, `sorbitol 70% solution USP`, `sorbitol sorbitan solution USP`. Same nighttime drug-facts tile batch96 pinned on the 24×8 value pack (NDC 69168-357-29). This option page is that 8-softgel inner unit, not one new locked list. NO Search row." },
  { sku: "HealthA2Z® Acid Reducer | Famotidine 20mg | Maximum Strength | Relief from Heartburn & Acid Indigestion | 24 Packs of 10 Tablets (240 Tablets Total) | Value Pack (FP1197)", reason: "REFUSED exact panel string(s) `macrogol`, `pre-gelatinized starch`. Same setid adc2721d. NDC 69168-443-09 is the 10-count blister. The gradeable 445 SPL has no 10-count. NO Search row." },
  { sku: "HealthA2Z® Bismuth | Bismuth Subsalicylate 262mg | Multi-Symptom Relief for Nausea, Upset Stomach & Diarrhea | 24 Pack of 30 Chewable Tablets (720 Tablets Total) | Value Pack (FP0529V)", reason: "REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. Same setid 015ca07a. The value pack is 24 of the 30-count cello NDC 69168-046-88. NO Search row." },
  { sku: "HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 30 Softgels Each (720 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0706)", reason: "REFUSED exact panel string(s) `potassium hydroxide`, `sorbitol sorbitan`, `sorbitan monooleate`. DailyMed setid 8ba06ba0-bfe9-4626-af65-dae4d6a3a2ad. NDC 69168-368-30 is printed on this 24×30 PDP and is the 30-count softgel carton. `sorbitol sorbitan` is not sorbitol sorbitan solution. NO Search row." },
  { sku: "HealthA2Z® Esomeprazole Magnesium | Acid Reducer | 20mg | Delayed-Released Capsules USP | 24 Hours | Treats Frequent Heartburn (FPA156a)", reason: "REFUSED exact panel string(s) `Methacrylic Acid and Ethyl Acrylate Copolymer Dispersion`, `Mono- and Di-Glycerides`, `Pharmaceutical Ink`, `Sugar Spheres`. Brand PDP drug-facts tile (FPA155_FPA156_-drug_Facts) on this esomeprazole PDP. The DailyMed 472 paragraph is a different list and was not used. The SKU title does not pin one count. NO Search row." },
  { sku: "HealthA2Z® Ibuprofen Softgel 200mg | 24 Packs of 10 Softgels Each (240 Softgels Total) | Value Pack | NSAID Pain Reliever & Fever Reducer (FP0660V)", reason: "REFUSED exact panel string(s) `potassium hydroxide`, `sorbitol sorbitan`, `sorbitan monooleate`. DailyMed setid 8ba06ba0-bfe9-4626-af65-dae4d6a3a2ad. NDC 69168-368-07 is printed on this 24×10 PDP and is the 10-count softgel carton. NO Search row." },
  { sku: "HealthA2Z Stool Softener, Docusate Sodium 100mg, 30 Capsules (1 Pack, 3 Packs & 6 Packs) (FP1024/FP0567)", reason: "REFUSED exact panel string(s) `black edible ink`, `FD&Cyellow #6`, `sorbitol special`. The 30-capsule option page is the inner unit of NDC 69168-420-30 on setid 30c9ff75. The single-tone docusate SPL has no 30-count. NO Search row." },
  { sku: "HealthA2Z® Blueberry Flavored Elderberry Gummies | 60 Pieces | With Vitamin C & Zinc | Supports Immune Function | Packed with Antioxidants (FP1066)", reason: "REFUSED exact panel string(s) `Malt syrup`, `citrus pectin`, `sodium hexametophosphate`, `artificial blueberry flavor`. Brand supplement-facts tile Elderberry_Gummy_60_ct_Back. `Malt syrup` is not barley malt syrup. `citrus pectin` is not pectin. NO Search row." },
  { sku: "HealthA2Z® Sleep Aid | Diphenhydramine HCl 25mg | Nighttime Sleep Softgels | 12 Counts (Pack of 24) | 288 Softgels Total | Value Pack (FP1081)", reason: "REFUSED exact panel string `sorbitol special`. DailyMed setid 9746911a-36bc-45eb-adfd-e96439d7a865. NDC 69168-431-86 is the 12-count blister carton. Same inactive line as the refused 96-count and 250-count. NO Search row." },
  { sku: "HealthA2Z® Anti-Diarrheal | Loperamide HCl 2mg | Controls Symptoms of Diarrhea, Including Travelers’ Diarrhea | 24 Packs of 12 Caplets (288 Caplets Total) | Value Pack (FP0697A)", reason: "REFUSED exact panel string(s) `dicalcium phosphate dihydrate`, `FD&C blue #1 brilliant blue lake`. DailyMed setid aca3742c-2a82-4e91-8aaf-2fce08487e56 (Health A2Z). NDC 69168-248-86 is the 12-count (2×6) already refused for the single pack. This value pack is 24 of that carton. NO Search row." },
  { sku: "HealthA2Z Bismuth Subsalicylate 262 mg, 30 Tablets (FP0529)", reason: "REFUSED exact panel string(s) `acacia gum`, `dextrates`, `peppermint flavor`. DailyMed setid 015ca07a-f6b5-4741-a7b0-821cf6d4e418 already pinned as HealthA2Z. NDC 69168-046-88 is the 30-count cello. NO Search row." },
];

const _ROWS = BATCH98_KYR6_HEALTHA2Z_NO_OI;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
const _new = _ROWS.filter((r) => r.formulaId === r.id).length;
const _reuse = _ROWS.filter((r) => r.formulaId !== r.id).length;
if (_ROWS.length !== 14) throw new Error('batch98 row tally drift');
if (_grades.clean !== 1 || _grades.caution !== 5 || _grades.avoid !== 8) {
  throw new Error('batch98 Search grade drift');
}
if (_new !== 4 || _reuse !== 10) throw new Error('batch98 NEW/REUSE drift');
if (BATCH98_SKIPPED_NO_OI.length !== 59) throw new Error('batch98 no_OI drift');
if (BATCH98_SKIPPED_OUT.length !== 2) throw new Error('batch98 OUT drift');
if (BATCH98_SKIPPED.length !== 61) throw new Error('batch98 SKIPPED drift');
if (BATCH98_REFUSED.length !== 20) throw new Error('batch98 REFUSED drift');
if (BATCH98_REFUSED.some((s) => !/`[^`]+`/.test(s.reason))) {
  throw new Error('batch98 REFUSED must quote an exact panel string');
}
if (_ROWS.some((r) => r.brand !== 'HealthA2Z')) throw new Error('batch98 brand drift');
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch98 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'healtha2z-b98-apap-650-300': '369168461178',
  'healtha2z-b98-bone-90': '369168811829',
  'healtha2z-b98-cetirizine-10-1': '369168310094',
  'healtha2z-b98-cetirizine-10-30': '369168310308',
  'healtha2z-b98-mucus-dm-200': '369168345980',
  'healtha2z-b98-pe-5-300': '369168271173',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 6) throw new Error('batch98 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch98 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch98 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch98 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch98 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('healtha2z-b98-'))) {
  throw new Error('batch98 ids must use healtha2z-b98-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch98 duplicate id');
const _external = new Set([
  'healtha2z-b96-aspirin-325',
  'healtha2z-b96-cetirizine-10',
  'healtha2z-b96-loratadine-10',
  'healtha2z-b96-apap-650-er',
  'healtha2z-naproxen-220-300',
  'healtha2z-b97-fexo-180-416',
]);
if (_ROWS.some((r) => r.formulaId === r.id ? false : !_external.has(r.formulaId ?? ''))) {
  throw new Error('batch98 reuse formulaId must be an existing MAIN id');
}
if (_ROWS.some((r) => r.formulaId?.startsWith('healtha2z-b98-') && !_ids.has(r.formulaId))) {
  throw new Error('batch98 in-file formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch98 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && r.inactiveIngredients?.some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch98 Clean row has a non-cleared inactive');
}
if (
  _ROWS.some(
    (r) =>
      r.verdict === 'caution' &&
      !r.inactiveIngredients?.some((f) => f.riskLevel === 'limited' || f.riskLevel === 'moderate'),
  )
) {
  throw new Error('batch98 Caution needs Limited or Moderate');
}
const _handled = new Set([
  ...BATCH98_SKIPPED.map((s) => s.sku),
  ...BATCH98_REFUSED.map((s) => s.sku),
]);
const _writtenCodes = [
  'FP1165', 'FP0895', 'FP0896', 'FP1011', 'FP1009', 'FPN013',
  'FP0940', 'FP1179', 'FPA067', 'FP0514', 'FPHK1248', 'FPA016',
];
if (BATCH96_SKIPPED_NO_OI.length !== 93) throw new Error('batch98 scope must stay the 93');
for (const item of BATCH96_SKIPPED_NO_OI) {
  if (_handled.has(item.sku)) continue;
  if (_writtenCodes.some((c) => item.sku.includes(`(${c})`) || item.sku.includes(`(${c}/`))) continue;
  throw new Error(`batch98 dropped a no_OI SKU: ${item.sku.slice(0, 80)}`);
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH98_SKIPPED.map((s) => s.sku),
  ...BATCH98_REFUSED.map((s) => s.sku),
].join('\n');
if (/\bTIME-Cap\b|GoodSense|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch98 excluded brand leaked');
}
