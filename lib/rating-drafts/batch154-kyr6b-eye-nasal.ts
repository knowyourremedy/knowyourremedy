// DRAFT / not verified / batch 154 KYR6-b.
// Pataday is not in this file. Extra Strength prints ungraded inactives.
// Store-brand olopatadine, ketotifen, budesonide, and mometasone are not in this file.
// Kits, twin packs, and discontinued counts are not in this file.
//
// TALLY: 7 written — Clean 0 / Caution 7 / Avoid 0.
// NEW 1 / REUSE 6. Written-row ungraded tokens: 0.

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
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Standalone Caution. Not Avoid.',
  hcl: 'Methodology §5 Caution (hydrochloric acid, Oct 7, 2026). Finished-product pH adjuster. Not Avoid. Not Cleared sodium hydroxide.',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster).',
  glycerin: 'Methodology §5 Cleared (glycerin / glycerol).',
  water: 'Methodology §5 Cleared (purified water / water for injection).',
  dextrose:
    'Methodology §5 Caution (dextrose anhydrous → dextrose / bare glucose, Oct 7, 2026). Same row. Not a new ingredient.',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). The label prints disodium edetate. Not Cleared trace disodium EDTA. Not Avoid.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sorbate: 'Methodology §5 Limited (potassium sorbate, synthetic preservatives). Not Avoid.',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium / cellulose gum). The Rhinocort label prints carboxylmethyl cellulose sodium.',
  mcc: 'Methodology §5 Cleared (microcrystalline cellulose).',
  citric: 'Methodology §5 Cleared (citric acid).',
  citrate: 'Methodology §5 Cleared (sodium citrate).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const ZADITOR = 'zaditor-bkc';
const ALAWAY = 'alaway-multidose-bak';
const RHINO = 'rhinocort-b154-allergy';
const NASONEX = 'amazon-basics-mometasone-nasal';

const ZADITOR_SET = 'ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f';
const ALAWAY_SET = 'e4c310b5-1dba-4ddc-bc90-b27ebc765871';
const RHINO_SET = '1ae1c5e8-16c6-4799-9a62-96d974c30f1f';
const NASONEX_SET = '13696a8b-366a-4a5e-adea-d5b7bff9e46f';
const NASONEX_KIDS_SET = 'e15d055e-9a25-46b4-8724-3609cf2dc062';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}
function cleared(setid: string, name: string, meth: string = METH.cleared): IngredientFlag {
  return flag(name, 'cleared', cite(setid, meth));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const EYE_ALTS: CleanAlternative[] = [
  alt('alaway-preservative-free', 'Cataloged Clean ketotifen single-use eye drop already on main. Form labeled, not a hard filter (§6).'),
  alt('similasan-allergy-eye-pf', 'Cataloged Clean homeopathic single-use allergy eye drop already on main. Form labeled, not a hard filter (§6).'),
];

const NASAL_ALTS: CleanAlternative[] = [
  alt('xlear-nasal-spray-no-bkc', 'Independently Clean drug-free xylitol saline already on main. Form labeled, not a hard filter (§6).'),
  alt('neilmed-sinus-rinse', 'Independently Clean preservative-free saline rinse already on main. Form labeled, not a hard filter (§6).'),
  alt('claritin-allergy-tablets-plain', 'Independently Clean plain loratadine tablets already on main. Form labeled, not a hard filter (§6).'),
];

const ZADITOR_NOTE =
  'Caution. Drivers are benzalkonium chloride and hydrochloric acid. Glycerol is the glycerin row. Sodium hydroxide and purified water are Cleared. No High inactive, so this is not Avoid. Ages 3+. Under 3: ask a doctor. Not a store brand. Not the twin pack.';

const ALAWAY_NOTE =
  'Caution. Drivers are benzalkonium chloride and hydrochloric acid. Glycerin, sodium hydroxide, and water for injection are Cleared. No High inactive, so this is not Avoid. Ages 3+. Under 3: ask a doctor. Not the preservative-free vial. Not a store brand. Not the twin pack.';

const RHINO_NOTE =
  'Caution. Drivers are dextrose anhydrous, disodium edetate, hydrochloric acid, polysorbate 80, and potassium sorbate. Disodium edetate is the edetate disodium / EDTA row, not Cleared trace disodium EDTA. Dextrose anhydrous is the dextrose / bare glucose row. No benzalkonium chloride. No High inactive, so this is not Avoid. Carboxylmethyl cellulose sodium, microcrystalline cellulose, and purified water are Cleared. Ages 6+. Under 6: do not use. Not a store brand.';

const NASONEX_NOTE =
  'Caution. Drivers are benzalkonium chloride and polysorbate 80. Citric acid, glycerin, microcrystalline cellulose, carboxymethylcellulose sodium, purified water, and sodium citrate are Cleared. No High inactive, so this is not Avoid. Ages 2+. Under 2: do not use. Not a store brand.';

const NASONEX_KIDS_NOTE =
  'Caution. Same inactive line as adult Nasonex: benzalkonium chloride and polysorbate 80. No High inactive, so this is not Avoid. Ages 2+. Under 2: do not use. Separate children\'s carton. Not a store brand.';

function zaditorFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(ZADITOR_SET, METH.bkc)),
    cleared(ZADITOR_SET, 'Glycerol', METH.glycerin),
    cleared(ZADITOR_SET, 'Purified water', METH.water),
    cleared(ZADITOR_SET, 'Sodium hydroxide', METH.naoh),
    flag('Hydrochloric acid', 'limited', cite(ZADITOR_SET, METH.hcl)),
  ];
}

function alawayFlags(): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(ALAWAY_SET, METH.bkc)),
    cleared(ALAWAY_SET, 'Glycerin', METH.glycerin),
    flag('Hydrochloric acid', 'limited', cite(ALAWAY_SET, METH.hcl)),
    cleared(ALAWAY_SET, 'Sodium hydroxide', METH.naoh),
    cleared(ALAWAY_SET, 'Water for injection', METH.water),
  ];
}

function rhinoFlags(): IngredientFlag[] {
  return [
    cleared(RHINO_SET, 'Carboxylmethyl cellulose sodium', METH.cmc),
    flag('Dextrose anhydrous', 'limited', cite(RHINO_SET, METH.dextrose)),
    flag('Disodium edetate', 'limited', cite(RHINO_SET, METH.edta)),
    flag('Hydrochloric acid', 'limited', cite(RHINO_SET, METH.hcl)),
    cleared(RHINO_SET, 'Microcrystalline cellulose', METH.mcc),
    flag('Polysorbate 80', 'moderate', cite(RHINO_SET, METH.ps80)),
    flag('Potassium sorbate', 'limited', cite(RHINO_SET, METH.sorbate)),
    cleared(RHINO_SET, 'Purified water', METH.water),
  ];
}

function nasonexFlags(setid: string): IngredientFlag[] {
  return [
    flag('Benzalkonium chloride', 'limited', cite(setid, METH.bkc)),
    cleared(setid, 'Citric acid', METH.citric),
    cleared(setid, 'Glycerin', METH.glycerin),
    cleared(setid, 'Microcrystalline cellulose', METH.mcc),
    cleared(setid, 'Carboxymethylcellulose sodium', METH.cmc),
    flag('Polysorbate 80', 'moderate', cite(setid, METH.ps80)),
    cleared(setid, 'Purified water', METH.water),
    cleared(setid, 'Sodium citrate', METH.citrate),
  ];
}

const ZADITOR_PANEL =
  'DailyMed setid ac66b1e4-c2b0-a4c3-09e3-ebd44a2f7c9f (Alcon, published Dec 18, 2023). Active: ketotifen 0.025% (equivalent to ketotifen fumarate 0.035%). Inactive ingredients: benzalkonium chloride 0.01%, glycerol, purified water, sodium hydroxide and/or hydrochloric acid. Ages 3 years and older.';

const ALAWAY_PANEL =
  'DailyMed setid e4c310b5-1dba-4ddc-bc90-b27ebc765871 (Bausch & Lomb, published May 18, 2022). Active: ketotifen 0.025% (equivalent to ketotifen fumarate 0.035%). Inactive ingredients: benzalkonium chloride 0.01%, glycerin, hydrochloric acid and/or sodium hydroxide, water for injection. Children under 3 years of age: consult a doctor. The Alaway drug-facts image at https://www.alaway.com/siteassets/img/img-749x514-popup-product-details-one.png reads the same inactive line on the 10 mL (0.34 fl oz) bottle, NDC 24208-601-10.';

const RHINO_PANEL =
  'DailyMed setid 1ae1c5e8-16c6-4799-9a62-96d974c30f1f (Johnson & Johnson Consumer Inc., HTML label updated March 21, 2023). Active: budesonide 32 mcg per spray. Inactive ingredients: carboxylmethyl cellulose sodium, dextrose anhydrous, disodium edetate, hydrochloric acid (for pH adjustment), microcrystalline cellulose, polysorbate 80, potassium sorbate, purified water. Do not use in children under 6 years of age.';

const NASONEX_PANEL =
  'DailyMed setid 13696a8b-366a-4a5e-adea-d5b7bff9e46f (Perrigo, published Aug 20, 2026). Active: mometasone furoate 50 mcg per spray. Inactive ingredients: benzalkonium chloride, citric acid, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, polysorbate 80, purified water, sodium citrate. Do not use in children under 2 years of age.';

const NASONEX_KIDS_PANEL =
  'DailyMed setid e15d055e-9a25-46b4-8724-3609cf2dc062 (Perrigo, published Sep 06, 2024). Active: mometasone furoate 50 mcg per spray. Inactive ingredients: benzalkonium chloride, citric acid, glycerin, microcrystalline cellulose and carboxymethylcellulose sodium, polysorbate 80, purified water, sodium citrate. Same printed line as adult Nasonex. Do not use in children under 2 years of age.';

export const BATCH154_KYR6B_EYE_NASAL: RatingRecord[] = [
  {
    id: 'zaditor-b154-5ml',
    productName: 'Zaditor Antihistamine Eye Drops (5 mL)',
    brand: 'Zaditor',
    category: ALLERGIES,
    barcode: '300654011057',
    formulaId: ZADITOR,
    audience: ADULT,
    minAge: 3,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ketotifen', strength: '0.025%' }],
    inactiveIngredients: zaditorFlags(),
    verdict: 'caution',
    honestNote: ZADITOR_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `${ZADITOR_PANEL} Package NDC 0065-4011-05 is one 5 mL bottle, no marketing end date. 5 mL is 0.17 fl oz. Target https://www.target.com/p/zaditor-eye-itch-relief-drops-0-17-fl-oz/-/A-14361821 is titled 0.17 fl oz, shows UPC 300654011057, and offers add to cart at $13.99. The twin-pack barcode 300654011064 is not this row.`,
    ],
  },
  {
    id: 'alaway-b154-10ml',
    productName: 'Alaway Antihistamine Eye Drops (10 mL)',
    brand: 'Alaway',
    category: ALLERGIES,
    barcode: '310119022412',
    formulaId: ALAWAY,
    audience: ADULT,
    minAge: 3,
    form: 'multi-dose eye drop',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Ketotifen', strength: '0.025%' }],
    inactiveIngredients: alawayFlags(),
    verdict: 'caution',
    honestNote: ALAWAY_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: EYE_ALTS,
    sourcesGeneral: [
      `${ALAWAY_PANEL} Package NDC 24208-601-10 is one 10 mL bottle, marketing start 20061201, no end date. 10 mL is 0.34 fl oz. Target https://www.target.com/p/alaway-12-hours-allergy-itch-relief-eye-drops-0-34-fl-oz/-/A-12381987 is titled 0.34 fl oz and primary_barcode is 310119022412. Amazon https://www.amazon.com/dp/B001ET7D4W is in stock at $11.99, size 0.34 fl oz (pack of 1).`,
    ],
  },
  {
    id: 'rhinocort-b154-allergy-120',
    productName: 'Rhinocort Allergy (120 sprays)',
    brand: 'Rhinocort',
    category: ALLERGIES,
    barcode: '300450646125',
    formulaId: RHINO,
    audience: ADULT,
    minAge: 6,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Budesonide', strength: '32 mcg / spray' }],
    inactiveIngredients: rhinoFlags(),
    verdict: 'caution',
    honestNote: RHINO_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `${RHINO_PANEL} Package NDC 50580-646-02 is one 120-spray bottle, marketing start 01/14/2016, no end date. https://pasteurpharmacy.com/products/newtons-1 opened as Rhinocort Allergy Nasal Spray, 24 Hour Relief, 120 Spray, $25.89, available for pickup, add to cart. That page prints SKU 300450646125. The 60-spray package NDC 50580-646-01 ended 10/31/2020 and is not this row. The 3-bottle package is not this row.`,
    ],
  },
  {
    id: 'nasonex-b154-allergy-60',
    productName: 'Nasonex 24HR Allergy (60 sprays)',
    brand: 'Nasonex',
    category: ALLERGIES,
    barcode: '370030165766',
    formulaId: NASONEX,
    audience: ADULT,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Mometasone furoate', strength: '50 mcg / spray' }],
    inactiveIngredients: nasonexFlags(NASONEX_SET),
    verdict: 'caution',
    honestNote: NASONEX_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `${NASONEX_PANEL} Package NDC 0113-1720-11 is one 60-spray bottle, marketing start 06/29/2022, no end date. Target https://www.target.com/p/nasonex-24hr-non-drowsy-mometasone-furoate-allergy-medicine-nasal-spray-60-sprays/-/A-86065697 is titled 60 sprays, 0.34 fl oz, and primary_barcode is 370030165766.`,
    ],
  },
  {
    id: 'nasonex-b154-allergy-120',
    productName: 'Nasonex 24HR Allergy (120 sprays)',
    brand: 'Nasonex',
    category: ALLERGIES,
    barcode: '370030165773',
    formulaId: NASONEX,
    audience: ADULT,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Mometasone furoate', strength: '50 mcg / spray' }],
    inactiveIngredients: nasonexFlags(NASONEX_SET),
    verdict: 'caution',
    honestNote: NASONEX_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `${NASONEX_PANEL} Package NDC 0113-1720-02 is one 120-spray bottle, marketing start 06/29/2022, no end date. CVS https://www.cvs.com/shop/nasonex-24hr-non-drowsy-allergy-congestion-nasal-spray-prodid-378903?skuId=513989 is titled 120 sprays, $29.79, shipping 11 in stock, add for shipping. Amazon https://www.amazon.com/dp/B0B5Y8PGGX is in stock, size 120 Spray - Adult, one bottle, and the product details print UPC 370030165773. The same Amazon page prints the Nasonex inactive line. The 2-pack size on that page is not this row.`,
    ],
  },
  {
    id: 'nasonex-b154-child-30',
    productName: "Children's Nasonex 24HR Allergy (30 sprays)",
    brand: 'Nasonex',
    category: ALLERGIES,
    barcode: '370030100675',
    formulaId: NASONEX,
    audience: KIDS,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Mometasone furoate', strength: '50 mcg / spray' }],
    inactiveIngredients: nasonexFlags(NASONEX_KIDS_SET),
    verdict: 'caution',
    honestNote: NASONEX_KIDS_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `${NASONEX_KIDS_PANEL} Package NDC 0113-1999-01 is one 30-spray bottle, no end date on the packaging record. Target https://www.target.com/p/nasonex-children-s-allergy-congestion-24-hour-relief-nasal-spray-0-25-oz/-/A-1005814380 is titled 0.25 oz, sold and shipped by Hey Pharma, with add to cart. The gallery text on that page reads 30 sprays and 0.25 fl oz (7.5 ml). primary_barcode 370030100675.`,
    ],
  },
  {
    id: 'nasonex-b154-child-60',
    productName: "Children's Nasonex 24HR Allergy (60 sprays)",
    brand: 'Nasonex',
    category: ALLERGIES,
    barcode: '370030100767',
    formulaId: NASONEX,
    audience: KIDS,
    minAge: 2,
    form: 'nasal spray',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Mometasone furoate', strength: '50 mcg / spray' }],
    inactiveIngredients: nasonexFlags(NASONEX_KIDS_SET),
    verdict: 'caution',
    honestNote: NASONEX_KIDS_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: NASAL_ALTS,
    sourcesGeneral: [
      `${NASONEX_KIDS_PANEL} Package NDC 0113-1999-11 is one 60-spray bottle, no end date on the packaging record. Amazon https://www.amazon.com/dp/B0BSVJFJD9 is in stock at $13.51, size 60 Spray - Children's, and the product details print UPC 370030100767. The same page prints the Nasonex inactive line and ages 2 and older.`,
    ],
  },
];

const ROWS = BATCH154_KYR6B_EYE_NASAL;
const IDS = [
  'zaditor-b154-5ml',
  'alaway-b154-10ml',
  'rhinocort-b154-allergy-120',
  'nasonex-b154-allergy-60',
  'nasonex-b154-allergy-120',
  'nasonex-b154-child-30',
  'nasonex-b154-child-60',
] as const;
const BARS = [
  '300654011057',
  '310119022412',
  '300450646125',
  '370030165766',
  '370030165773',
  '370030100675',
  '370030100767',
] as const;

if (ROWS.length !== 7) throw new Error(`batch154 row count ${ROWS.length}`);
ROWS.forEach((row, i) => {
  if (row.id !== IDS[i]) throw new Error(`batch154 id ${row.id}`);
  if (row.verdict !== 'caution') throw new Error(`batch154 verdict ${row.id}`);
  if (row.barcode !== BARS[i]) throw new Error(`batch154 upc ${row.id}`);
  if (/store|equate|kit|2pk|twin|pataday/i.test(row.id)) throw new Error(`batch154 scope ${row.id}`);
});
if (ROWS[0].formulaId !== ZADITOR) throw new Error('batch154 zaditor formula');
if (ROWS[1].formulaId !== ALAWAY) throw new Error('batch154 alaway formula');
if (ROWS[2].formulaId !== RHINO) throw new Error('batch154 rhinocort formula');
if (ROWS[3].formulaId !== NASONEX || ROWS[6].formulaId !== NASONEX) throw new Error('batch154 nasonex formula');
if (ROWS[0].inactiveIngredients.length !== 5) throw new Error('batch154 zaditor panel');
if (ROWS[1].inactiveIngredients.length !== 5) throw new Error('batch154 alaway panel');
if (ROWS[2].inactiveIngredients.length !== 8) throw new Error('batch154 rhinocort panel');
if (ROWS[3].inactiveIngredients.length !== 8) throw new Error('batch154 nasonex panel');
if (new Set(BARS).size !== BARS.length) throw new Error('batch154 duplicate upc');
