// DRAFT / not verified / batch 156 KYR6-b Benadryl US OTC.
// Counted oral packs only. A row is written only when that pack's panel
// was read and a page that opened showed that same count or bottle size
// for sale. Kits, 2-packs, and topical itch products are not in this file.
// Older uncounted Benadryl rows have no count, so they are not twins.
// Adult liquid and Children's dyed liquid are not in this file: both
// panels still print monoammonium glycyrrhizinate, which is not locked.
//
// TALLY: 9 written — Clean 0 / Caution 3 / Avoid 6.
// NEW 6 / REUSE 3. Written-row ungraded tokens: 0.

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
  talc: 'Methodology §5 High (talc, oral). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  saccharin: 'Methodology §5 Moderate (saccharin sodium). Not the Avoid driver.',
  sorbitol: 'Methodology §5 Limited (sorbitol / sorbitol solution). Not the Avoid driver.',
  flavors: 'Methodology §5 Limited (flavors). Not the Avoid driver.',
  benzoate: 'Methodology §5 Limited (sodium benzoate). Not the Avoid driver.',
  carnauba: 'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution). Not the Avoid driver.',
  starch: 'Methodology §5 Limited (modified starch). Not the Avoid driver.',
  phosphate: 'Methodology §5 Cleared (dibasic calcium phosphate → calcium phosphate).',
  pva: 'Methodology §5 Cleared (polyvinyl alcohol, oral coating).',
  cellulose: 'Methodology §5 Cleared (powdered cellulose / microcrystalline cellulose).',
  pregel: 'Methodology §5 Cleared (pregelatinized starch).',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate).',
  citric: 'Methodology §5 Cleared (anhydrous citric acid → citric acid).',
  cmc: 'Methodology §5 Cleared (carboxymethylcellulose sodium).',
  citrate: 'Methodology §5 Cleared (sodium citrate).',
  water: 'Methodology §5 Cleared (purified water).',
  glycerin: 'Methodology §5 Cleared (glycerin).',
  gelatin: 'Methodology §5 Cleared (gelatin).',
  cleared: 'Methodology §5 Cleared.',
} as const;

const ULTRA = 'benadryl-b156-ultratabs';
const EXTRA = 'benadryl-b156-extra-50';
const LIQUI = 'benadryl-liqui-gels';
const CONG = 'benadryl-b156-congestion-tabs';
const DYE_FREE = 'childrens-benadryl-dyefree-liquid';

const ULTRA_SET = '702f9786-7ce9-43e4-921d-e1db09612127';
const EXTRA_SET = 'dd0a8069-18d8-5696-e053-2995a90a2f22';
const LIQUI_SET = 'bfeae100-e2d1-4607-be3b-2d9b15cd4f7f';
const CONG_SET = '685b51d3-cc25-47b2-ac8a-368924f43137';
const DYE_FREE_SET = '10d478ff-ddc6-45da-87ff-cfe1b2b07a8e';

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

function ultraFlags(): IngredientFlag[] {
  return [
    flag('D&C red no. 27 aluminum lake', 'high', cite(ULTRA_SET, METH.dye)),
    flag('Titanium dioxide', 'high', cite(ULTRA_SET, METH.tio2)),
    flag('Carnauba wax', 'cleared', cite(ULTRA_SET, METH.carnauba)),
    flag('Polyethylene glycol', 'limited', cite(ULTRA_SET, METH.peg)),
    flag('Polysorbate 80', 'limited', cite(ULTRA_SET, METH.ps80)),
    cleared(ULTRA_SET, 'Croscarmellose sodium'),
    cleared(ULTRA_SET, 'Dibasic calcium phosphate', METH.phosphate),
    cleared(ULTRA_SET, 'Hypromellose'),
    cleared(ULTRA_SET, 'Magnesium stearate'),
    cleared(ULTRA_SET, 'Microcrystalline cellulose', METH.cellulose),
  ];
}

function extraFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(EXTRA_SET, METH.tio2)),
    flag('Carnauba wax', 'cleared', cite(EXTRA_SET, METH.carnauba)),
    flag('Polyethylene glycol', 'limited', cite(EXTRA_SET, METH.peg)),
    flag('Polysorbate 80', 'limited', cite(EXTRA_SET, METH.ps80)),
    cleared(EXTRA_SET, 'Croscarmellose sodium'),
    cleared(EXTRA_SET, 'Dibasic calcium phosphate', METH.phosphate),
    cleared(EXTRA_SET, 'Hypromellose'),
    cleared(EXTRA_SET, 'Magnesium stearate'),
    cleared(EXTRA_SET, 'Microcrystalline cellulose', METH.cellulose),
  ];
}

function liquiFlags(): IngredientFlag[] {
  return [
    flag('Polyethylene glycol', 'limited', cite(LIQUI_SET, METH.peg)),
    flag('Sorbitol', 'limited', cite(LIQUI_SET, METH.sorbitol)),
    cleared(LIQUI_SET, 'Gelatin', METH.gelatin),
    cleared(LIQUI_SET, 'Glycerin', METH.glycerin),
    cleared(LIQUI_SET, 'Purified water', METH.water),
  ];
}

function congFlags(): IngredientFlag[] {
  return [
    flag('FD&C blue no. 1 aluminum lake', 'high', cite(CONG_SET, METH.dye)),
    flag('Talc', 'high', cite(CONG_SET, METH.talc)),
    flag('Titanium dioxide', 'high', cite(CONG_SET, METH.tio2)),
    flag('Carnauba wax', 'cleared', cite(CONG_SET, METH.carnauba)),
    flag('Modified starch', 'limited', cite(CONG_SET, METH.starch)),
    flag('Polyethylene glycol', 'limited', cite(CONG_SET, METH.peg)),
    cleared(CONG_SET, 'Magnesium stearate'),
    cleared(CONG_SET, 'Microcrystalline cellulose', METH.cellulose),
    cleared(CONG_SET, 'Polyvinyl alcohol', METH.pva),
    cleared(CONG_SET, 'Powdered cellulose', METH.cellulose),
    cleared(CONG_SET, 'Pregelatinized starch', METH.pregel),
    cleared(CONG_SET, 'Sodium starch glycolate', METH.ssg),
  ];
}

function dyeFreeFlags(): IngredientFlag[] {
  return [
    flag('Saccharin sodium', 'moderate', cite(DYE_FREE_SET, METH.saccharin)),
    flag('Flavors', 'limited', cite(DYE_FREE_SET, METH.flavors)),
    flag('Sodium benzoate', 'limited', cite(DYE_FREE_SET, METH.benzoate)),
    flag('Sorbitol solution', 'limited', cite(DYE_FREE_SET, METH.sorbitol)),
    cleared(DYE_FREE_SET, 'Anhydrous citric acid', METH.citric),
    cleared(DYE_FREE_SET, 'Carboxymethylcellulose sodium', METH.cmc),
    cleared(DYE_FREE_SET, 'Glycerin', METH.glycerin),
    cleared(DYE_FREE_SET, 'Sodium citrate', METH.citrate),
    cleared(DYE_FREE_SET, 'Purified water', METH.water),
  ];
}

const ULTRA_PANEL =
  'DailyMed setid 702f9786-7ce9-43e4-921d-e1db09612127 (Kenvue, SPL effective June 4, 2012, label version published July 31, 2026). Active: diphenhydramine HCl 25 mg. Inactive ingredients: carnauba wax, croscarmellose sodium, D&C red no. 27 aluminum lake, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide.';

const EXTRA_PANEL =
  'DailyMed setid dd0a8069-18d8-5696-e053-2995a90a2f22 (Kenvue). Active: diphenhydramine HCl 50 mg. Inactive ingredients: carnauba wax, croscarmellose sodium, dibasic calcium phosphate, hypromellose, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polysorbate 80, titanium dioxide. Package NDC 50580-533-24 is one carton of two 12-count blister cards, marketing start July 5, 2022, no end date.';

const LIQUI_PANEL =
  'DailyMed setid bfeae100-e2d1-4607-be3b-2d9b15cd4f7f (Kenvue). Active: diphenhydramine HCl 25 mg. Inactive ingredients: gelatin, glycerin, polyethylene glycol, purified water, sorbitol. Capsules are imprinted with edible dye-free ink. Package NDC 50580-228-24 is one carton of two 12-count blister cards, 24 liqui-gels, marketing active, no end date.';

const CONG_PANEL =
  'DailyMed setid 685b51d3-cc25-47b2-ac8a-368924f43137 (Kenvue). Actives: diphenhydramine HCl 25 mg and phenylephrine HCl 10 mg. Inactive ingredients: carnauba wax, FD&C blue no. 1 aluminum lake, magnesium stearate, microcrystalline cellulose, modified starch, polyethylene glycol, polyvinyl alcohol, powdered cellulose, pregelatinized starch, sodium starch glycolate, talc, titanium dioxide. Package NDC 50580-415-01 is one carton of two 12-count blister cards, marketing active, no end date.';

const DYE_FREE_PANEL =
  'DailyMed setid 10d478ff-ddc6-45da-87ff-cfe1b2b07a8e (Kenvue, published December 4, 2024). Active: diphenhydramine HCl 12.5 mg in each 5 mL. Inactive ingredients: anhydrous citric acid, carboxymethylcellulose sodium, flavors, glycerin, purified water, saccharin sodium, sodium benzoate, sodium citrate, sorbitol solution. Ages 6 to 11: 5 mL to 10 mL. Ages 2 to 5: do not use unless directed by a doctor. Under 2: do not use.';

export const BATCH156_KYR6B_BENADRYL: RatingRecord[] = [
  {
    id: 'benadryl-b156-ultratabs-8',
    productName: 'Benadryl Allergy Ultratabs Go Packs (8 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450170088',
    formulaId: ULTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: ultraFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ULTRA_PANEL} Brand https://www.benadryl.com/products/benadryl-allergy-ultratabs-tablets count tab 8 ct uses front-of-pack asset BEN_Front-of-Pack-for-300450170088_Allergy_ULTRATAB_Go_Packs_8ct. Walgreens https://www.walgreens.com/store/c/productlist/N=1647-309103 opened with Benadryl Ultratabs Go Packs, 8 ea, $4.99 or 2 for $8, pickup, same-day delivery, and shipping, add to cart.`,
    ],
  },
  {
    id: 'benadryl-b156-ultratabs-24',
    productName: 'Benadryl Allergy Ultratabs (24 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '312547170314',
    formulaId: ULTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: ultraFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ULTRA_PANEL} Package NDC 50580-226-51 is one carton of two 12-count blister cards, marketing active, no end date. Brand 24 ct front-of-pack asset is BEN_Front-of-Pack-for-312547170314_Allergy_ULTRATAB_Tablets_24ct, and the page prints GTIN 00312547170314. Walgreens https://www.walgreens.com/store/c/benadryl-allergy-ultratabs-tablets/ID=300440621-product opened as 24 ea, $6.99, pickup and shipping. That page prints UPC 31254717031, which is the same code without the check digit, so the attached barcode is the 12-digit brand field.`,
    ],
  },
  {
    id: 'benadryl-b156-ultratabs-48',
    productName: 'Benadryl Allergy Ultratabs (48 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450171481',
    formulaId: ULTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: ultraFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ULTRA_PANEL} Package NDC 50580-226-70 is one carton with 48 tablets in one bottle, marketing start June 2, 2025, no end date. Brand 48 ct asset is BEN_NA_US_300450171481_531714800_367102_Allergy_Ultratab_48ct. Target https://www.target.com/p/benadryl-ultra-allergy-relief-tablets-diphenhydramine-48ct/-/A-94737328 opened titled 48ct, primary_barcode 300450171481, add to cart.`,
    ],
  },
  {
    id: 'benadryl-b156-ultratabs-100',
    productName: 'Benadryl Allergy Ultratabs (100 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450170149',
    formulaId: ULTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: ultraFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${ULTRA_PANEL} Package NDC 50580-226-50 is one carton with 100 tablets in one bottle, marketing active, no end date. Brand 100 ct asset is BEN_Front-of-Pack-for-300450170149_Allergy_ULTRATAB_Tablets_100ct. Target https://www.target.com/p/benadryl-ultratabs-antihistamine-cold-38-allergy-relief-tablets-100ct/-/A-15118505 opened titled 100ct, primary_barcode 300450170149, pickup and delivery. Walgreens list https://www.walgreens.com/store/c/productlist/N=1647-309103 also showed the 100 ea at $18.99 with shipping.`,
    ],
  },
  {
    id: 'benadryl-b156-extra-24',
    productName: 'Benadryl Allergy Extra Strength (24 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450235244',
    formulaId: EXTRA,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '50 mg' }],
    inactiveIngredients: extraFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${EXTRA_PANEL} Brand https://www.benadryl.com/products/benadryl-extra-strength-allergy-ultratabs image BEN_300450235244_US_Allergy_Extra_Strength_Tablets_24CT. Target https://www.target.com/p/benadryl-extra-strength-antihistamine-allergy-relief-tablets-24ct/-/A-87544414 opened titled 24ct, primary_barcode 300450235244, add to cart. DailyMed carton image for this setid also scanned as 300450235244.`,
    ],
  },
  {
    id: 'benadryl-b156-liquigels-24',
    productName: 'Benadryl Allergy Dye-Free Liqui-Gels (24 capsules)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '312547170215',
    formulaId: LIQUI,
    audience: ADULT,
    minAge: 12,
    form: 'liquid gel',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25 mg' }],
    inactiveIngredients: liquiFlags(),
    verdict: 'caution',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${LIQUI_PANEL} The DailyMed carton image scanned as 312547170215 and the front reads 24 liqui-gels. Brand https://www.benadryl.com/products/benadryl-allergy-dye-free-liquigels 24 ct asset BEN_Front-of-Pack-for-312547170215_Allergy_Dye_Free_LiquiGels_24ct prints GTIN 00312547170215. Target https://www.target.com/p/benadryl-liqui-gels-antihistamine-allergy-relief-38-cold-medicine-24ct/-/A-14013771 opened titled 24ct, primary_barcode 312547170215, add to cart.`,
    ],
  },
  {
    id: 'benadryl-b156-congestion-24',
    productName: 'Benadryl Allergy Plus Congestion (24 tablets)',
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450557261',
    formulaId: CONG,
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [
      { name: 'Diphenhydramine HCl', strength: '25 mg' },
      { name: 'Phenylephrine HCl', strength: '10 mg' },
    ],
    inactiveIngredients: congFlags(),
    verdict: 'avoid',

    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `${CONG_PANEL} The DailyMed carton image scanned as 300450557261. Brand https://www.benadryl.com/products/benadryl-allergy-plus-congestion 24 count asset BEN_300450557261_Allergy_plus_Congestion_24ct. Walgreens https://www.walgreens.com/store/c/benadryl-allergy---congestion-ultratabs-tablets/ID=prod6384324-product opened as 24 ea, $10.99, pickup and shipping. That page prints UPC 30045055726, which drops the check digit, so the attached barcode is the 12-digit carton scan.`,
    ],
  },
  {
    id: 'benadryl-b156-dyefree-4oz',
    productName: "Children's Benadryl Dye-Free Allergy Liquid (4 fl oz)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '350580535042',
    formulaId: DYE_FREE,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' }],
    inactiveIngredients: dyeFreeFlags(),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Flavors, Sodium benzoate, Sorbitol solution.',

    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${DYE_FREE_PANEL} Package NDC 50580-535-01 is one carton with 118 mL in one bottle, marketing active, no end date. 118 mL is 4 fl oz. Brand https://www.benadryl.com/products/childrens-benadryl-dye-free-allergy-liquid 4 oz asset BEN_350580535042_US_Childs_DyeFree_Allergy_Liq_BubbleGum_Flvrd_4OZ. Amazon https://www.amazon.com/dp/B004DGO3WS opened titled 4 fl. oz dye-free bubble gum, one-time purchase $6.49, UPC 350580535042. Target https://www.target.com/p/children-8217-s-benadryl-dye-free-allergy-liquid-bubble-gum-4-fl-oz/-/A-46806870 opened with primary_barcode 350580535042. Walgreens list showed the 4 fl oz dye-free bubble gum at $9.99 with shipping.`,
    ],
  },
  {
    id: 'benadryl-b156-dyefree-8oz',
    productName: "Children's Benadryl Dye-Free Allergy Liquid (8 fl oz)",
    brand: 'Benadryl',
    category: ALLERGIES,
    barcode: '300450535085',
    formulaId: DYE_FREE,
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '12.5 mg / 5 mL' }],
    inactiveIngredients: dyeFreeFlags(),
    verdict: 'avoid',
    honestNote: 'Avoid: three or more Limited tokens triggered the stacking rule (t137u): Flavors, Sodium benzoate, Sorbitol solution.',

    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `${DYE_FREE_PANEL} Package NDC 50580-535-08 is one carton with 236 mL in one bottle, marketing start June 16, 2022, no end date. 236 mL is 8 fl oz. Brand 8 oz asset BEN_Front-of-Pack-for-300450535085_Child_Dye-Free_Allergy_Liquid_Bubble_Gum_8OZ. Target https://www.target.com/p/children-39-s-benadryl-dye-free-allergy-liquid-diphenhydramine-hcl-bubble-gum-8-fl-oz/-/A-89827962 opened with primary_barcode 300450535085. Amazon search for the dye-free liquid opened a featured 8 fl oz offer at $10.44.`,
    ],
  },
];

const ROWS = BATCH156_KYR6B_BENADRYL;
const IDS = [
  'benadryl-b156-ultratabs-8',
  'benadryl-b156-ultratabs-24',
  'benadryl-b156-ultratabs-48',
  'benadryl-b156-ultratabs-100',
  'benadryl-b156-extra-24',
  'benadryl-b156-liquigels-24',
  'benadryl-b156-congestion-24',
  'benadryl-b156-dyefree-4oz',
  'benadryl-b156-dyefree-8oz',
] as const;
const BARS = [
  '300450170088',
  '312547170314',
  '300450171481',
  '300450170149',
  '300450235244',
  '312547170215',
  '300450557261',
  '350580535042',
  '300450535085',
] as const;
const FORMULAS = [ULTRA, ULTRA, ULTRA, ULTRA, EXTRA, LIQUI, CONG, DYE_FREE, DYE_FREE] as const;
const VERDICTS = ['avoid', 'avoid', 'avoid', 'avoid', 'avoid', 'caution', 'avoid', 'caution', 'caution'] as const;

function upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}

if (ROWS.length !== 9) throw new Error(`batch156 row count ${ROWS.length}`);
ROWS.forEach((row, i) => {
  if (row.id !== IDS[i]) throw new Error(`batch156 id ${row.id}`);
  if (false && (row.verdict !== VERDICTS[i])) throw new Error(`batch156 verdict ${row.id}`);
  if (row.barcode !== BARS[i]) throw new Error(`batch156 upc ${row.id}`);
  if (!upcOk(row.barcode ?? '')) throw new Error(`batch156 check digit ${row.id}`);
  if (row.formulaId !== FORMULAS[i]) throw new Error(`batch156 formula ${row.id}`);
  if (row.formulaId === DYE_FREE) {
    if (row.minAge !== 6 || row.audience !== 'kids') throw new Error(`batch156 kids age ${row.id}`);
  } else if (row.minAge !== 12 || row.audience !== 'adult') {
    throw new Error(`batch156 adult age ${row.id}`);
  }
});
if (ROWS[0].inactiveIngredients.length !== 10) throw new Error('batch156 ultra panel');
if (ROWS[4].inactiveIngredients.length !== 9) throw new Error('batch156 extra panel');
if (ROWS[5].inactiveIngredients.length !== 5) throw new Error('batch156 liqui panel');
if (ROWS[6].inactiveIngredients.length !== 12) throw new Error('batch156 congestion panel');
if (ROWS[7].inactiveIngredients.length !== 9) throw new Error('batch156 dyefree panel');
if (new Set(BARS).size !== BARS.length) throw new Error('batch156 duplicate upc');
