// DRAFT / not verified / batch 133 KYR6-b Zyrtec fix.
// Same ids as the batch132 rows they replace. previewCatalog places this
// array before batch132 so uniqueById (first wins) keeps these rows.
// batch132 product rows were not edited. batch70–131 were not edited.
//
// Zyrtec-D is its own formula. It does not share zyrtec-allergy-tablets-tio2.
// Children's dye-free chew 72ct matches childrens-zyrtec-chewable exactly,
// so that formulaId is reused. Its UPC is the Costco spec field, not a filename.

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

const D_SET = 'f1ecf9ba-1c03-7fb7-e053-2a95a90a875a';
const CHEW_SET = '0fe77356-d945-46a0-882e-b3bbab784556';
const D_FORMULA = 'zyrtec-b133-zyrtec-d';
const CHEW_FORMULA = 'childrens-zyrtec-chewable';

const METH = {
  tio2: 'Methodology §5 High (titanium dioxide). Avoid.',
  peg: 'Methodology §5 Moderate (polyethylene glycol). Not the Avoid driver.',
  sio2: 'Methodology §5 Precautionary (colloidal silicon dioxide → silicon dioxide, 0-pt Caution cap). Not the Avoid driver.',
  sucralose: 'Methodology §5 Moderate (sucralose).',
  mannitol: 'Methodology §5 Limited (mannitol).',
  flavor: 'Methodology §5 Limited (flavor).',
  cleared: 'Methodology §5 Cleared.',
} as const;

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

function dFlags(): IngredientFlag[] {
  return [
    flag('Titanium dioxide', 'high', cite(D_SET, METH.tio2)),
    flag('Polyethylene glycol', 'moderate', cite(D_SET, METH.peg)),
    flag('Colloidal silicon dioxide', 'limited', cite(D_SET, METH.sio2)),
    cleared(D_SET, 'Croscarmellose sodium'),
    cleared(D_SET, 'Hypromellose'),
    cleared(D_SET, 'Lactose monohydrate'),
    cleared(D_SET, 'Magnesium stearate'),
    cleared(D_SET, 'Microcrystalline cellulose'),
  ];
}
function chewFlags(): IngredientFlag[] {
  return [
    flag('Sucralose', 'moderate', cite(CHEW_SET, METH.sucralose)),
    flag('Mannitol', 'limited', cite(CHEW_SET, METH.mannitol)),
    flag('Flavor', 'limited', cite(CHEW_SET, METH.flavor)),
    cleared(CHEW_SET, 'Betadex'),
    cleared(CHEW_SET, 'Corn starch'),
    cleared(CHEW_SET, 'Lactose monohydrate'),
    cleared(CHEW_SET, 'Magnesium stearate'),
    cleared(CHEW_SET, 'Silicified microcrystalline cellulose'),
  ];
}

const D_ACTIVES = [
  { name: 'Cetirizine HCl', strength: '5 mg' },
  { name: 'Pseudoephedrine HCl', strength: '120 mg' },
];
const D_NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Driver is titanium dioxide. Polyethylene glycol is Moderate and is not the Avoid driver. Colloidal silicon dioxide is the 0-pt Caution cap. New formula zyrtec-b133-zyrtec-d. Does not share zyrtec-allergy-tablets-tio2. Actives are cetirizine 5 mg and pseudoephedrine 120 mg. Ages 12+.';

export const BATCH133_KYR6B_ZYRTEC_FIX: RatingRecord[] = [
  {
    id: 'zyrtec-b132-d-12ct',
    productName: 'Zyrtec-D Allergy + Congestion Extended-Release Tablets (12ct)',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450204271',
    formulaId: D_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'extended-release tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: D_ACTIVES,
    inactiveIngredients: dFlags(),
    verdict: 'avoid',
    honestNote:
      D_NOTE +
      ' The 12 count tab is on zyrtec.com. Its eanUpc field is empty. The image title that contains 300450204271 was not used as a UPC. UPC is empty.',
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${D_SET}. zyrtec.com/products/zyrtec-d 12 count. UPC empty (draft, not verified).`,
    ],
  },
  {
    id: 'zyrtec-b132-d-24ct',
    productName: 'Zyrtec-D Allergy + Congestion Extended-Release Tablets (24ct)',
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450204240',
    formulaId: D_FORMULA,
    audience: ADULT,
    minAge: 12,
    form: 'extended-release tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: D_ACTIVES,
    inactiveIngredients: dFlags(),
    verdict: 'avoid',
    honestNote: D_NOTE + ' UPC kept from the 24 count variant gtin field.',
    retailers: [...RETAILERS],
    cleanAlternatives: ADULT_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${D_SET}. zyrtec.com/products/zyrtec-d 24 count gtin 00300450204240 (draft, not verified).`,
    ],
  },
  {
    id: 'zyrtec-b132-kids-chew-10mg-72ct',
    productName: "Children's Zyrtec Dye-Free Chewable Tablets 10mg (72ct)",
    brand: 'Zyrtec',
    category: ALLERGIES,
    barcode: '300450241283',
    formulaId: CHEW_FORMULA,
    audience: KIDS,
    minAge: 6,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: [{ name: 'Cetirizine HCl', strength: '10 mg' }],
    inactiveIngredients: chewFlags(),
    verdict: 'caution',
    honestNote:
      'FOUNDER-LOCK DRAFT: Caution. The 72ct dye-free grape panel prints betadex, corn starch, flavor, lactose monohydrate, magnesium stearate, mannitol, silicified microcrystalline cellulose, and sucralose. That list matches childrens-zyrtec-chewable, so this row reuses that formulaId. Dye-free does not remove flavor. The locked Caution call stands.',
    retailers: [...RETAILERS],
    cleanAlternatives: KIDS_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${CHEW_SET} package 50580-791-72 (3 blister packs of 24). Costco item 1794121 upc field 300450241283 on Children's Zyrtec Allergy Cetirizine HCl 10 mg Dye-Free Grape Flavored Chewables, 72 Tablets. Same inactive line on that Costco drug-facts block (draft, not verified).`,
    ],
  },
];

export const BATCH133_UPC_STILL_EMPTY: { id: string; why: string }[] = [
  {
    id: 'zyrtec-b132-5mg-15ct',
    why: '15 count tab is on zyrtec.com. The image name is Zyrtec-Low-Dose-Tablets-15ct.webp and has no digits. No GTIN/UPC field for that count. CVS 15-count PDP returned 403. Left empty. Row not rewritten.',
  },
  {
    id: 'zyrtec-b132-adult-dissolve-12ct',
    why: 'Current zyrtec.com adult dissolve page has a Citrus variant, not a 12 count GTIN. 300450242136 is the children\'s 12ct dissolve already on MAIN. Left empty. Row not rewritten.',
  },
  {
    id: 'zyrtec-b132-d-12ct',
    why: '12 count eanUpc is empty. 300450204271 appears only in the 12ct image title. Not attached.',
  },
];

export const BATCH133_REFUSED: { name: string; token: string }[] = [];
