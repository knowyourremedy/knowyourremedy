// DRAFT / not verified / batch 148 KYR6-b Xyzal US OTC.
// Tablet counts only. A row is written only when the OTC Drug Facts
// panel was read and a page that opened showed that same count for sale.
// The seven-ingredient tablet line does not match any levocetirizine
// formula already on MAIN (those lines omit colloidal anhydrous silica,
// or they add polysorbate 80). One new formula. Children's liquid is
// not in this file: its Drug Facts print sodium acetate trihydrate and
// glacial acetic acid, and those exact tokens are not locked.
//
// TALLY: 8 written — Clean 0 / Caution 0 / Avoid 8.
// NEW 1 / REUSE 7. Written-row ungraded tokens: 0.
// UPC attached only where the Walgreens Product Specifications field
// for that exact count was read and the check digit restored.

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
  peg: 'Methodology §5 Moderate (polyethylene glycol 400). Not the Avoid driver.',
  sio2: 'Methodology §5 Caution (colloidal anhydrous silica → silica / SiO2, 0-point nanoparticle cap). Not the Avoid driver.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const FORMULA = 'xyzal-b148-tablets';
const SETID = '8be45c2a-1eca-4a00-81b9-f7babdbdcd41';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${SETID}; ${meth}`;
}
function cleared(name: string): IngredientFlag {
  return flag(name, 'cleared', cite(METH.cleared));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS: CleanAlternative[] = [
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

function tabletFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(METH.tio2)),
    flag('Polyethylene glycol 400', 'moderate', cite(METH.peg)),
    flag('Colloidal anhydrous silica', 'limited', cite(METH.sio2)),
    cleared('Hypromellose'),
    cleared('Lactose monohydrate'),
    cleared('Magnesium stearate'),
    cleared('Microcrystalline cellulose'),
  ];
}

const ACTIVE = [{ name: 'Levocetirizine dihydrochloride', strength: '5 mg' }];
const NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Colloidal anhydrous silica and polyethylene glycol 400 are not the Avoid driver. Hypromellose, lactose monohydrate, magnesium stearate, and microcrystalline cellulose are Cleared. Ages 6+. Half tablet for ages 6–11. Not the store-brand levocetirizine lines.';

const PANEL =
  'DailyMed setid 8be45c2a-1eca-4a00-81b9-f7babdbdcd41 (OTC, updated March 11, 2026) and https://www.xyzal.com/en-us/products/adult-allergy-relief/ingredients. Active: levocetirizine dihydrochloride 5 mg. Inactive ingredients: colloidal anhydrous silica, hypromellose, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol 400, titanium dioxide. The Rx structured table that adds FD&C Red No. 40 and shellac was not used.';

function upcCheck(eleven: string): string {
  if (!/^\d{11}$/.test(eleven)) throw new Error(`batch148 upc body ${eleven}`);
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += Number(eleven[i]) * (i % 2 === 0 ? 3 : 1);
  }
  return `${eleven}${(10 - (sum % 10)) % 10}`;
}

type Spec = {
  id: string;
  productName: string;
  barcode?: string;
  source: string;
};

function expand(d: Spec): RatingRecord {
  return {
    id: d.id,
    productName: d.productName,
    brand: 'Xyzal',
    category: ALLERGIES,
    barcode: d.barcode,
    formulaId: FORMULA,
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: ACTIVE,
    inactiveIngredients: tabletFlags(),
    verdict: 'avoid',
    honestNote: NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: ALTS,
    sourcesGeneral: [d.source],
  };
}

export const BATCH148_KYR6B_XYZAL_US_OTC: RatingRecord[] = [
  expand({
    id: 'xyzal-b148-tablets-10',
    productName: 'Xyzal Allergy 24HR Tablets (10ct)',
    barcode: upcCheck('04116735100'),
    source: `${PANEL} Walgreens Product Specifications for the 10.0 ea tab (https://www.walgreens.com/store/c/xyzal-24-hour-allergy-relief-medicine,-prescription-strength/ID=prod6340905-product) printed UPC 04116735100. Check digit restored. Shipping price $9.99. Target 10-count (TCIN 51579517) was $7.99.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-20',
    productName: 'Xyzal Allergy 24HR Tablets (20ct)',
    source: `${PANEL} Package NDC 41167-3511-2 is 20 tablets in 1 blister. Dollar General opened the 20-count at $14 with 2 in stock (https://www.dollargeneral.com/p/xyzal-allergy-24hr-allergy-relief-tablets-20-ct/41167351123). The URL slug is not a barcode. UPC left empty.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-35',
    productName: 'Xyzal Allergy 24HR Tablets (35ct)',
    barcode: upcCheck('04116735101'),
    source: `${PANEL} Walgreens Product Specifications for the 35.0 ea tab (https://www.walgreens.com/store/c/xyzal-24-hour-allergy-relief-medicine,-prescription-strength/ID=300404261-product) printed UPC 04116735101. Check digit restored. Target 35-count (TCIN 51579535) showed a price.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-40',
    productName: 'Xyzal Allergy 24HR Tablets (40ct)',
    source: `${PANEL} Package NDC 41167-3511-8 is 40 tablets in 1 blister. Walmart opened the 40-count at $19.96, one bottle, multipack quantity 1 (https://www.walmart.com/ip/Xyzal-Allergy-Relief-5mg-Tablet-40-Count-Carton/17902665379). Amazon brand carousel also showed the 40-count at $19.96 with add to cart. UPC left empty.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-55',
    productName: 'Xyzal Allergy 24HR Tablets (55ct)',
    barcode: upcCheck('04116735102'),
    source: `${PANEL} Walgreens Product Specifications for the 55.0 ea tab (https://www.walgreens.com/store/c/xyzal-24-hour-allergy-relief-medicine,-prescription-strength/ID=300404262-product) printed UPC 04116735102. Check digit restored. Shipping price $32.99. Target 55-count (TCIN 51579540) was $26.49.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-60',
    productName: 'Xyzal Allergy 24HR Tablets (60ct)',
    source: `${PANEL} Package NDC 41167-3511-9 is 60 tablets in 1 blister. Amazon brand carousel (https://www.amazon.com/clp/B01LQBIWT2) showed the 60-count at $27.96 with add to cart. Walmart's opened 35-count page also listed the 60-count at $27.96 with add. UPC left empty.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-80',
    productName: 'Xyzal Allergy 24HR Tablets (80ct)',
    barcode: upcCheck('04116735103'),
    source: `${PANEL} Walgreens Product Specifications for the 80.0 ea tab (https://www.walgreens.com/store/c/xyzal-24-hour-allergy-relief-medicine,-prescription-strength/ID=300404263-product) printed UPC 04116735103. Check digit restored. Shipping price $36.99. Target 80-count (TCIN 51579592) opened on the 80-count tab.`,
  }),
  expand({
    id: 'xyzal-b148-tablets-90',
    productName: 'Xyzal Allergy 24HR Tablets (90ct)',
    source: `${PANEL} Package NDC 41167-3513-4 is 90 tablets in 1 blister. Amazon brand carousel (https://www.amazon.com/clp/B01LQBIWT2) showed the 90-count at $38.96 with add to cart. Walmart's opened 35-count page also listed the 90-count at $38.96 with add. UPC left empty.`,
  }),
];

const ROWS = BATCH148_KYR6B_XYZAL_US_OTC;
const EXPECTED_UPC: Record<string, string> = {
  'xyzal-b148-tablets-10': '041167351000',
  'xyzal-b148-tablets-35': '041167351017',
  'xyzal-b148-tablets-55': '041167351024',
  'xyzal-b148-tablets-80': '041167351031',
};
if (ROWS.length !== 8) throw new Error(`batch148 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 8) throw new Error('batch148 duplicate id');
if (ROWS.some((r) => r.verdict !== 'avoid')) throw new Error('batch148 verdict');
if (ROWS.some((r) => r.formulaId !== FORMULA)) throw new Error('batch148 formula');
if (ROWS.some((r) => r.inactiveIngredients.length !== 7)) throw new Error('batch148 panel');
for (const row of ROWS) {
  const expected = EXPECTED_UPC[row.id];
  if (expected) {
    if (row.barcode !== expected) throw new Error(`batch148 upc ${row.id} ${row.barcode}`);
  } else if (row.barcode) {
    throw new Error(`batch148 unexpected upc ${row.id}`);
  }
}
