// DRAFT / not verified / batch 143 KYR6-b Zyrtec 75-count.
// One pack. The row exists only because DailyMed setid b165db38 puts
// NDC 50580-726-75 (75 tablets in 1 bottle, 1 bottle in 1 carton) on the
// same manufactured product as the single inactive-ingredient section.
// That list matches zyrtec-allergy-tablets-tio2. batch70–142 were not edited.
//
// TALLY: 1 written — Clean 0 / Caution 0 / Avoid 1.
// NEW 0 / REUSE 1.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const TABLET_SET = 'b165db38-b302-4220-8627-77cb07bb078c';
const TABLET_FORMULA = 'zyrtec-allergy-tablets-tio2';
const UPC = '300450204752';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${TABLET_SET}; ${meth}`;
}
function cleared(name: string): IngredientFlag {
  return flag(name, 'cleared', cite(METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ADULT_ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

export const BATCH143_KYR6B_ZYRTEC_75CT: RatingRecord[] = [
  {
    id: 'zyrtec-b143-10mg-75ct',
    productName: 'Zyrtec Allergy Tablets 10mg (75ct)',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: UPC,
    formulaId: TABLET_FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', cite(METH.tio2)),
      flag('Polyethylene glycol', 'moderate', cite(METH.peg)),
      cleared('Colloidal silicon dioxide'),
      cleared('Croscarmellose sodium'),
      cleared('Hypromellose'),
      cleared('Lactose monohydrate'),
      cleared('Magnesium stearate'),
      cleared('Microcrystalline cellulose'),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Same inactive line as zyrtec-allergy-tablets on MAIN. REUSE formula zyrtec-allergy-tablets-tio2. UPC 300450204752 is the founder lock for this 75-count (Amazon product details and eBay). The 40-count was not reopened. Go-Pack codes stay on zyrtec-allergy-tablets. Ages 6+.',
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed SPL setid ${TABLET_SET}. One manufactured product, Zyrtec Allergy, film-coated tablet, NDC 50580-726. Inactive ingredient section 51727-6: colloidal silicon dioxide, croscarmellose sodium, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, titanium dioxide. Package NDC 50580-726-75 is 75 in 1 bottle and 1 bottle in 1 carton, marketing status active, start 2025-07-31. That package is an asContent of the same product, so the inactive list is this 75-count's panel. Founder lock UPC ${UPC} (Amazon product details and eBay for this pack). Check digit verified. Draft, not verified.`,
    ],
  },
];

function upcCheck(upc: string): boolean {
  if (!/^\d{12}$/.test(upc)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(upc[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(upc[11]);
}

const ROWS = BATCH143_KYR6B_ZYRTEC_75CT;
const ALREADY = new Set([
  '312547204361',
  '312547204323',
  '312547204309',
  '300450206602',
  '300450204318',
  '300450204448',
  '300450204462',
  '300450204431',
  '300450205049',
  '300450239129',
  '300450239242',
]);
if (ROWS.length !== 1) throw new Error('batch143 row count');
if (ROWS[0]?.id !== 'zyrtec-b143-10mg-75ct') throw new Error('batch143 id');
if (ROWS[0].barcode !== UPC || !upcCheck(UPC)) throw new Error('batch143 upc');
if (ALREADY.has(UPC)) throw new Error('batch143 upc already on MAIN');
if (ROWS[0].verdict !== 'avoid' || ROWS[0].formulaId !== TABLET_FORMULA) throw new Error('batch143 grade');
const names = ROWS[0].inactiveIngredients.map((i) => i.name).sort();
const expected = [
  'Colloidal silicon dioxide',
  'Croscarmellose sodium',
  'Hypromellose',
  'Lactose monohydrate',
  'Magnesium stearate',
  'Microcrystalline cellulose',
  'Polyethylene glycol',
  'Titanium dioxide',
].sort();
if (names.join('|') !== expected.join('|')) throw new Error('batch143 panel');
if (ROWS[0].inactiveIngredients.find((i) => i.name === 'Titanium dioxide')?.riskLevel !== 'high') {
  throw new Error('batch143 tio2');
}
