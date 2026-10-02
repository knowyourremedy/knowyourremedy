// DRAFT / not verified / batch 141 KYR6-b Zyrtec US OTC scan.
// Brand is Zyrtec only. US packs only. A row is written only when that
// exact pack has both a real other-ingredients panel and a 12-digit UPC.
// Exact twins reuse the formula already on MAIN. batch70–140 were not edited.
//
// TALLY: 2 written — Clean 0 / Caution 1 / Avoid 1.
// NEW 0 / REUSE 2 / missing OI 0 / missing UPC 13 / missing both 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  flavor: 'Methodology §5 Limited (flavor / flavors).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const TABLET_SET = 'b165db38-b302-4220-8627-77cb07bb078c';
const CHEW25_SET = '013ce40e-37c9-4b84-b530-ed895f60ce0e';
const TABLET_FORMULA = 'zyrtec-allergy-tablets-tio2';
const CHEW_FORMULA = 'childrens-zyrtec-chewable';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', cite(setid, METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ADULT_ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];
const KIDS_ALTS: CleanAlternative[] = [
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
];

const CUB40 =
  'Cub PDP https://www.cub.com/store/cub/products/16601500-zyrtec-tablets-10-mg-40-ct retailerLookupCodeString UPC: 300450204462 on ZYRTEC 24 Hour Allergy Relief Tablets, 40 Count Bonus Pack. Ingredients body: Colloidal Silicon Dioxide, Croscarmellose Sodium, Hypromellose, Lactose Monohydrate, Magnesium Stearate, Microcrystalline Cellulose, Polyethylene Glycol, Titanium Dioxide.';

export const BATCH141_KYR6B_ZYRTEC_US_OTC: RatingRecord[] = [
  {
    id: 'zyrtec-b141-10mg-40ct',
    productName: 'Zyrtec Allergy Tablets 10mg (40ct)',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450204462',
    formulaId: TABLET_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', cite(TABLET_SET, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', cite(TABLET_SET, METH.peg)),
      cleared(TABLET_SET, 'Colloidal silicon dioxide'),
      cleared(TABLET_SET, 'Croscarmellose sodium'),
      cleared(TABLET_SET, 'Hypromellose'),
      cleared(TABLET_SET, 'Lactose monohydrate'),
      cleared(TABLET_SET, 'Magnesium stearate'),
      cleared(TABLET_SET, 'Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Same inactive line as zyrtec-allergy-tablets on MAIN. REUSE formula zyrtec-allergy-tablets-tio2. The 30, 45, 60, 90, and 120 count rows were not rewritten. Ages 6+.',
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${CUB40} DailyMed setid ${TABLET_SET} package NDC 50580-726-40 is 40 tablets in 1 bottle. Dollar General PDP slug also names this 40 count bonus pack at /p/zyrtec-24-hour-allergy-relief-tablets-40-count-bonus-pack/300450204462. Check digit verified. Draft, not verified.`,
    ],
  },
  {
    id: 'zyrtec-b141-kids-chew-25mg-24ct',
    productName: "Children's Zyrtec Dye-Free Chewable Tablets 2.5mg (24ct)",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450239242',
    formulaId: CHEW_FORMULA,
    audience: KIDS,
    minAge: 2,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '2.5 mg' }],
    inactiveIngredients: [
      flag('Sucralose', 'moderate', cite(CHEW25_SET, METH.sucralose)),
      flag('Flavor', 'limited', cite(CHEW25_SET, METH.flavor)),
      flag('Mannitol', 'limited', cite(CHEW25_SET, METH.mannitol)),
      cleared(CHEW25_SET, 'Betadex'),
      cleared(CHEW25_SET, 'Corn starch'),
      cleared(CHEW25_SET, 'Lactose monohydrate'),
      cleared(CHEW25_SET, 'Magnesium stearate'),
      cleared(CHEW25_SET, 'Silicified microcrystalline cellulose'),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Caution. Drivers are sucralose and mannitol. Flavor stays on this dye-free grape panel. Same inactive line as childrens-zyrtec-chewable on MAIN. REUSE that formula. The locked Caution call stands. The 12 count 2.5 mg row was not rewritten. Ages 2+.',
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${CHEW25_SET} inactive ingredients: betadex, corn starch, flavor, lactose monohydrate, magnesium stearate, mannitol, silicified microcrystalline cellulose, sucralose. Package NDC 50580-790-02 is 4 blister packs of 6 (24 tablets). epharmastore.com productView UPC field 300450239242 on Children's Dye-Free Chewables, 24 Ct; the opened pack photo reads 2.5 mg and 24 chewable tablets. zyrtec.com/products/zyrtec-chewables-children-2-plus has a 24 count tab; its eanUpc is empty and the 12 count image filename was not used. Check digit verified. Draft, not verified.`,
    ],
  },
];

function upcCheck(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(upc[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(upc[11]);
}

const ROWS = BATCH141_KYR6B_ZYRTEC_US_OTC;
const ALREADY = new Set([
  '312547204361',
  '312547204323',
  '312547204309',
  '300450206602',
  '300450204318',
  '300450204448',
  '300450239129',
  '300450242136',
  '300450209269',
  '300450209047',
  '300450204653',
  '300450206909',
  '300450206121',
  '300450256157',
  '300450256355',
  '300450204271',
  '300450204240',
  '300450138323',
  '300450139146',
  '300450241245',
  '300450241481',
  '300450241283',
  '300450250247',
  '300450242259',
  '300450242242',
  '300450204257',
  '300450209146',
]);
if (ROWS.length !== 2) throw new Error('batch141 row count');
if (new Set(ROWS.map((r) => r.id)).size !== 2) throw new Error('batch141 duplicate id');
if (ROWS.some((r) => !r.barcode || !upcCheck(r.barcode))) throw new Error('batch141 bad upc');
if (ROWS.some((r) => r.barcode && ALREADY.has(r.barcode))) throw new Error('batch141 upc already on MAIN');
const avoid = ROWS.filter((r) => r.verdict === 'avoid');
const caution = ROWS.filter((r) => r.verdict === 'caution');
if (avoid.length !== 1 || caution.length !== 1) throw new Error('batch141 verdict tally');
if (avoid[0]?.formulaId !== TABLET_FORMULA || !avoid[0].inactiveIngredients.some((i) => i.name === 'Titanium dioxide' && i.riskLevel === 'high')) {
  throw new Error('batch141 tablet formula');
}
if (caution[0]?.formulaId !== CHEW_FORMULA || caution[0].audience !== 'kids') throw new Error('batch141 chew formula');
if (caution[0].inactiveIngredients.some((i) => i.riskLevel === 'high')) throw new Error('batch141 chew has High');
