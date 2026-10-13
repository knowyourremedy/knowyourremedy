// DRAFT / not verified / batch 157 KYR6-b Benadryl US OTC.
// Counted packs held for the monoammonium glycyrrhizinate lock, plus the
// Ultratabs 12 carton that an opened page showed in stock. A row is written
// only when that pack's panel was read and a page that opened showed that
// same count or bottle size for sale. Kits, 2-packs, and out-of-stock-only
// pages are not in this file. Older uncounted Benadryl rows are not twins.
//
// TALLY: 5 written — Clean 0 / Caution 0 / Avoid 5.
// NEW 1 / REUSE 4. Written-row ungraded tokens: 0.

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
  dye: 'Methodology §5 High (synthetic dyes, including lake forms). Avoid.',
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  sucralose: 'Methodology §5 Moderate (sucralose). Not the Avoid driver.',
  glycyrrhizin:
    'Methodology §5 Caution (monoammonium glycyrrhizinate → ammonium glycyrrhizin, Oct 13, 2026). Same salt. Not dipotassium glycyrrhizinate. Not the Cleared licorice row. Not the Avoid driver.',
  poloxamer:
    'Methodology §5 Caution (poloxamer 407 → poloxamer 182). Not the Avoid driver.',
  edta: 'Methodology §5 Caution (edetate disodium → EDTA). Not the Cleared trace row. Not the Avoid driver.',
  sorbitol: 'Methodology §5 Limited (sorbitol solution). Not the Avoid driver.',
  flavors: 'Methodology §5 Limited (flavors). Not the Avoid driver.',
  benzoate: 'Methodology §5 Limited (sodium benzoate). Not the Avoid driver.',
  sucrose: 'Methodology §5 Limited (sucrose). Not the Avoid driver.',
  carnauba: 'Methodology §5 Caution (carnauba wax, Sept 25, 2026). Not the Avoid driver.',
  phosphate: 'Methodology §5 Cleared (dibasic calcium phosphate → calcium phosphate).',
  cellulose: 'Methodology §5 Cleared (microcrystalline cellulose).',
  citric: 'Methodology §5 Cleared (anhydrous citric acid → citric acid).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium).',
  citrate: 'Methodology §5 Cleared (sodium citrate).',
  water: 'Methodology §5 Cleared (purified water).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  salt: 'Methodology §5 Cleared (sodium chloride, saline base).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const DYED = 'benadryl-b157-dyed-liquid';
const ULTRA = 'benadryl-b156-ultratabs';
const CONG = 'childrens-benadryl-allergy-plus-congestion';

const ADULT_SET = '224ba2a3-1a93-29c8-e063-6394a90a9bef';
const DYED_SET = 'fc9181b9-c92d-493e-8d7c-4a4239c6c092';
const ULTRA_SET = '702f9786-7ce9-43e4-921d-e1db09612127';
const CONG_SET = 'b8b75904-3806-4258-89c1-d6ff486ed41c';

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

const ADULT_ALTS: CleanAlternative[] = [
  alt('equate-loratadine-tablets-plain', 'Independently Clean store-brand plain loratadine already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
];

const KIDS_ALTS: CleanAlternative[] = [
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
];

function dyedFlags(setid: string): IngredientFlag[] {
  return [
    flag('D&C red no. 33', 'high', cite(setid, METH.dye)),
    flag('FD&C red no. 40', 'high', cite(setid, METH.dye)),
    flag('Monoammonium glycyrrhizinate', 'limited', cite(setid, METH.glycyrrhizin)),
    flag('Poloxamer 407', 'limited', cite(setid, METH.poloxamer)),
    flag('Flavors', 'limited', cite(setid, METH.flavors)),
    flag('Sodium benzoate', 'limited', cite(setid, METH.benzoate)),
    flag('Sucrose', 'limited', cite(setid, METH.sucrose)),
    cleared(setid, 'Anhydrous citric acid', METH.citric),
    cleared(setid, 'Glycerin', METH.glycerin),
    cleared(setid, 'Purified water', METH.water),
    cleared(setid, 'Sodium chloride', METH.salt),
    cleared(setid, 'Sodium citrate', METH.citrate),
  ];
}

function ultraFlags(): IngredientFlag[] {
  return [
    flag('D&C red no. 27 aluminum lake', 'high', cite(ULTRA_SET, METH.dye)),
    flag('Titanium dioxide', 'high', cite(ULTRA_SET, METH.tio2)),
    flag('Carnauba wax', 'limited', cite(ULTRA_SET, METH.carnauba)),
    flag('Polyethylene glycol', 'moderate', cite(ULTRA_SET, METH.peg)),
    flag('Polysorbate 80', 'moderate', cite(ULTRA_SET, METH.ps80)),
    cleared(ULTRA_SET, 'Croscarmellose sodium'),
    cleared(ULTRA_SET, 'Dibasic calcium phosphate', METH.phosphate),
    cleared(ULTRA_SET, 'Hypromellose'),
    cleared(ULTRA_SET, 'Magnesium stearate'),
    cleared(ULTRA_SET, 'Microcrystalline cellulose', METH.cellulose),
  ];
}

function congFlags(): IngredientFlag[] {
  return [
    flag('FD&C blue no. 1', 'high', cite(CONG_SET, METH.dye)),
    flag('FD&C red no. 40', 'high', cite(CONG_SET, METH.dye)),
    flag('Sucralose', 'moderate', cite(CONG_SET, METH.sucralose)),
    flag('Edetate disodium', 'limited', cite(CONG_SET, METH.edta)),
    flag('Flavors', 'limited', cite(CONG_SET, METH.flavors)),
    flag('Sodium benzoate', 'limited', cite(CONG_SET, METH.benzoate)),
    flag('Sorbitol solution', 'limited', cite(CONG_SET, METH.sorbitol)),
    cleared(CONG_SET, 'Anhydrous citric acid', METH.citric),
    cleared(CONG_SET, 'Carboxymethylcellulose sodium', METH.cmc),
    cleared(CONG_SET, 'Glycerin', METH.glycerin),
    cleared(CONG_SET, 'Sodium citrate', METH.citrate),
    cleared(CONG_SET, 'Purified water', METH.water),
  ];
}

const DYED_NOTE =
  'Avoid. Drivers are D&C red no. 33 and FD&C red no. 40. Monoammonium glycyrrhizinate is the ammonium glycyrrhizin salt, Caution. Poloxamer 407 is Caution. Flavors, sodium benzoate, and sucrose are Limited. Anhydrous citric acid, glycerin, purified water, sodium chloride, and sodium citrate are Cleared. The older uncounted dyed-liquid rows omitted monoammonium glycyrrhizinate, poloxamer 407, sodium chloride, sodium citrate, and anhydrous citric acid, so this line is a new formula. The adult 118 mL panel and the children\'s dyed panel print the same inactive line. Dye-free liquid is a different line. Not a 2-pack.';

const ULTRA_NOTE =
  'Avoid. Drivers are D&C red no. 27 aluminum lake and titanium dioxide. Carnauba wax is Caution. Polyethylene glycol and polysorbate 80 are Moderate. Croscarmellose sodium, dibasic calcium phosphate, hypromellose, magnesium stearate, and microcrystalline cellulose are Cleared. The printed line matches the batch156 Ultratabs formula. Adult minimum age on this row is 12. The label also lists one tablet for ages 6 to under 12. This is the single 12-tablet carton, not a case and not packets of 2.';

const CONG_NOTE =
  'Avoid. Drivers are FD&C blue no. 1 and FD&C red no. 40. Sucralose is Moderate. Edetate disodium is EDTA Caution. Flavors, sodium benzoate, and sorbitol solution are Limited. Anhydrous citric acid, carboxymethylcellulose sodium, glycerin, sodium citrate, and purified water are Cleared. The ingredient names match the older uncounted congestion-liquid formula. That older row stored edetate disodium as Cleared; this row grades it Caution. Actives are diphenhydramine HCl 12.5 mg / 5 mL and phenylephrine HCl 5 mg / 5 mL. Ages 6+. Ages 4 to 5: do not use unless directed by a doctor. Under 4: do not use.';

const ADULT_PANEL =
  'DailyMed setid 224ba2a3-1a93-29c8-e063-6394a90a9bef (Kenvue). Active: diphenhydramine HCl 12.5 mg in each 5 mL. Inactive ingredients: anhydrous citric acid, D&C red no. 33, FD&C red no. 40, flavors, glycerin, monoammonium glycyrrhizinate, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sucrose. Package NDC 50580-573-04 is one carton with 118 mL in one bottle, marketing start December 2, 2024, no end date. Adults and children 12 years and over: 10 mL to 20 mL.';

const DYED_PANEL =
  'DailyMed setid fc9181b9-c92d-493e-8d7c-4a4239c6c092 (Kenvue, published October 9, 2026). Active: diphenhydramine HCl 12.5 mg in each 5 mL. Inactive ingredients match the adult liquid line: anhydrous citric acid, D&C red no. 33, FD&C red no. 40, flavors, glycerin, monoammonium glycyrrhizinate, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sucrose. Ages 6 to 11: 5 mL to 10 mL. Ages 2 to 5: do not use unless directed by a doctor. Under 2: do not use.';

const ULTRA_PANEL =
  'DailyMed setid 702f9786-7ce9-43e4-921d-e1db09612127 (Kenvue). Active: diphenhydramine HCl 25 mg. Inactive ingredients: carnauba wax, croscarmellose sodium, D&C red no. 27 aluminum lake, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide. Package NDC 50580-226-12 is one carton with 12 tablets in one blister pack.';

const CONG_PANEL =
  'DailyMed setid b8b75904-3806-4258-89c1-d6ff486ed41c (Kenvue). Actives: diphenhydramine HCl 12.5 mg in each 5 mL and phenylephrine HCl 5 mg in each 5 mL. Inactive ingredients: anhydrous citric acid, carboxymethylcellulose sodium, edetate disodium, FD&C blue no. 1, FD&C red no. 40, flavors, glycerin, purified water, sodium benzoate, sodium citrate, sorbitol solution, sucralose. Package NDC 50580-341-01 is one carton with 118 mL in one bottle.';

export const BATCH157_KYR6B_BENADRYL: RatingRecord[] = [
  {
    id: 'benadryl-b157-adult-4oz',
    productName: 'Benadryl Allergy Liquid (4 fl oz)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450534248',
    formulaId: DYED,
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' }],
    inactiveIngredients: dyedFlags(ADULT_SET),
    verdict: 'avoid',
    honestNote:
      `${DYED_NOTE} Adult minimum age on this row is 12. The label also lists 5 mL to 10 mL for ages 6 to 11. Wild cherry. 118 mL is 4 fl oz.`,
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ADULT_PANEL} Brand https://www.benadryl.com/products/benadryl-allergy-liquid-wild-cherry prints GTIN 300450534248 on this product. Cub https://www.cub.com/store/cub/products/63978821-benadryl-allergy-relief-liquid-for-adults-wild-cherry-4-fl-oz opened as 4 fl oz, UPC 300450534248, $9.29, schema.org InStock.`,
    ],
  },
  {
    id: 'benadryl-b157-dyed-4oz',
    productName: "Children's Benadryl Allergy Liquid (4 fl oz)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '350580534045',
    formulaId: DYED,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' }],
    inactiveIngredients: dyedFlags(DYED_SET),
    verdict: 'avoid',
    honestNote: `${DYED_NOTE} Cherry. 118 mL is 4 fl oz. Not the dye-free bottle.`,
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${DYED_PANEL} Package NDC 50580-534-04 is one carton with 118 mL in one bottle. Brand 4 fl oz asset BEN_Front-of-Pack-for-350580534045_Childrens_Allergy_LIquid_4oz. Target https://www.target.com/p/benadryl-children-39-s-allergy-liquid-cherry-4-fl-oz/-/A-94605698 opened titled 4 fl oz with primary_barcode 350580534045 and pickup and delivery. Pasteur Pharmacy https://pasteurpharmacy.com/products/benadryl-chd-alg-lq-118ml-chy opened as the cherry 4 oz oral solution, $8.49, available online.`,
    ],
  },
  {
    id: 'benadryl-b157-dyed-8oz',
    productName: "Children's Benadryl Allergy Liquid (8 fl oz)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '350580534083',
    formulaId: DYED,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' }],
    inactiveIngredients: dyedFlags(DYED_SET),
    verdict: 'avoid',
    honestNote: `${DYED_NOTE} Cherry. 236 mL is 8 fl oz. Not the dye-free bottle.`,
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${DYED_PANEL} Package NDC 50580-534-08 is one carton with 236 mL in one bottle. Brand 8 fl oz asset BEN_Front-of-Pack-for-350580534083_Childrens_Allergy_Liquid_8oz. Haggen https://www.haggen.com/shop/pd/benadryl-childrens-allergy-cherry-flavored-liquid-8-fl-oz/960115225 opened as 8 fl oz, $12.99, schema.org InStock, and the ingredient line matches this panel. The Haggen page also prints a placeholder UPC of nines, which is not attached.`,
    ],
  },
  {
    id: 'benadryl-b157-ultratabs-12',
    productName: 'Benadryl Allergy Ultratabs (12 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450171122',
    formulaId: ULTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: ultraFlags(),
    verdict: 'avoid',
    honestNote: ULTRA_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ULTRA_PANEL} Brand https://www.benadryl.com/products/benadryl-allergy-ultratabs-tablets 12 ct asset includes Front-of-Pack-for-300450171122. Dollar General https://www.dollargeneral.com/p/benadryl-allergy-ultratabs-tablets-12-count/300450171122 opened as Benadryl Allergy Relief Tablets, 12 ct, $30.75, 2 in stock. Google AI mode cited that Dollar General page. Target, CVS, and Walgreens searches that opened showed 24, 48, or 100, not a 12-tablet carton. Walmart search for 12 tablets returned no result. Amazon search was blocked.`,
    ],
  },
  {
    id: 'benadryl-b157-cong-4oz',
    productName: "Children's Benadryl Allergy Plus Congestion (4 fl oz)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450170057',
    formulaId: CONG,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' },
      { name: 'Phenylephrine HCl', strength: '5 mg / 5 mL' },
    ],
    inactiveIngredients: congFlags(),
    verdict: 'avoid',
    honestNote: CONG_NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${CONG_PANEL} Brand https://www.benadryl.com/products/childrens-benadryl-allergy-plus-congestion says available in 4 fl oz (118 mL). The page image is BEN_300450170057_Childrens_Allergy_and_Sinus_Liquid_4oz and the product GTIN is 00300450170057. Publix https://delivery.publix.com/store/publix/products/12078-children-s-benadryl-children-s-allergy-plus-congestion-liquid-4-fl-oz opened as 4 fl oz, $9.41, schema.org InStock. Google AI mode cited the brand page.`,
    ],
  },
];

const ROWS = BATCH157_KYR6B_BENADRYL;
const IDS = [
  'benadryl-b157-adult-4oz',
  'benadryl-b157-dyed-4oz',
  'benadryl-b157-dyed-8oz',
  'benadryl-b157-ultratabs-12',
  'benadryl-b157-cong-4oz',
] as const;
const BARS = [
  '300450534248',
  '350580534045',
  '350580534083',
  '300450171122',
  '300450170057',
] as const;
const FORMULAS = [DYED, DYED, DYED, ULTRA, CONG] as const;
const AGES = [12, 6, 6, 12, 6] as const;
const AUDIENCES = ['adult', 'kids', 'kids', 'adult', 'kids'] as const;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 5) throw new Error(`batch157 row count ${ROWS.length}`);
ROWS.forEach((row, i) => {
  if (row.id !== IDS[i]) throw new Error(`batch157 id ${row.id}`);
  if (row.verdict !== 'avoid') throw new Error(`batch157 verdict ${row.id}`);
  if (row.barcode !== BARS[i]) throw new Error(`batch157 upc ${row.id}`);
  if (!upcOk(row.barcode ?? '')) throw new Error(`batch157 check digit ${row.id}`);
  if (row.formulaId !== FORMULAS[i]) throw new Error(`batch157 formula ${row.id}`);
  if (row.minAge !== AGES[i] || row.audience !== AUDIENCES[i]) throw new Error(`batch157 age ${row.id}`);
});
if (ROWS[0].inactiveIngredients.length !== 12) throw new Error('batch157 adult panel');
if (ROWS[1].inactiveIngredients.length !== 12) throw new Error('batch157 dyed panel');
if (ROWS[3].inactiveIngredients.length !== 10) throw new Error('batch157 ultra panel');
if (ROWS[4].inactiveIngredients.length !== 12) throw new Error('batch157 congestion panel');
if (new Set(BARS).size !== BARS.length) throw new Error('batch157 duplicate upc');
