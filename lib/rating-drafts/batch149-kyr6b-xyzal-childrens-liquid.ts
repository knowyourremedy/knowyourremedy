// DRAFT / not verified / batch 149 KYR6-b Children's Xyzal 5 fl oz.
// The two 148 mL liquids held for the Oct 3 aliases. batch70–148 were
// not edited. The Drug Facts inactive line is the same sentence on both
// flavors, so they share one formula. 10 oz bottles, the 5-count and
// 45-count tablets, kits, and the discontinued Tutti Frutti liquid are
// not in this file.
//
// TALLY: 2 written — Clean 0 / Caution 0 / Avoid 2.
// NEW 1 / REUSE 1. Ungraded tokens: 0.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const ALLERGIES = 'Allergies';
const RETAILERS = ['CVS', 'Walgreens', 'Walmart', 'Target', 'Grocery'] as const;

const METH = {
  parabens: 'Methodology §5 High (methylparaben and propylparaben → parabens). Avoid.',
  flavor: 'Methodology §5 Caution (flavor). Distinct from Limited natural flavors.',
  maltitol: 'Methodology §5 Caution (maltitol solution). Distinct from Limited maltitol powder.',
  saccharin: 'Methodology §5 Caution (saccharin sodium → sodium saccharin).',
  acetic: 'Methodology §5 Cleared (glacial acetic acid → acetic acid, Oct 3, 2026). Same row. Not the driver.',
  acetate: 'Methodology §5 Cleared (sodium acetate trihydrate → sodium acetate anhydrous, Oct 3, 2026). Same row. Not potassium acetate. Not the driver.',
  cleared: 'Methodology §5 Cleared.',
} as const;

const FORMULA = 'xyzal-b149-childrens-liquid';
const SETID = 'a33f2704-d350-428b-b467-91f4775ce17f';

function flag(name: string, riskLevel: IngredientFlag['riskLevel'], source: string): IngredientFlag {
  return { name, riskLevel, source };
}
function cite(meth: string): string {
  return `DailyMed setid ${SETID}; ${meth}`;
}
function cleared(name: string, meth: string = METH.cleared): IngredientFlag {
  return flag(name, 'cleared', cite(meth));
}
function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS: CleanAlternative[] = [
  alt('boiron-allergycalm-meltaways', 'Independently Clean homeopathic meltaway already on main. Form labeled, not a hard filter (§6).'),
  alt('genexa-kids-allergy-dph-liquid', 'Independently Clean kids diphenhydramine liquid already on main. Form labeled, not a hard filter (§6).'),
];

function liquidFlags(): IngredientFlag[] {
  return [
    flag('Methylparaben', 'high', cite(METH.parabens)),
    flag('Propylparaben', 'high', cite(METH.parabens)),
    flag('Flavor', 'limited', cite(METH.flavor)),
    flag('Maltitol solution', 'limited', cite(METH.maltitol)),
    flag('Saccharin sodium', 'limited', cite(METH.saccharin)),
    cleared('Glacial acetic acid', METH.acetic),
    cleared('Glycerin'),
    cleared('Purified water'),
    cleared('Sodium acetate trihydrate', METH.acetate),
  ];
}

const ACTIVE = [{ name: 'Levocetirizine dihydrochloride', strength: '2.5 mg / 5 mL' }];
const NOTE =
  'FOUNDER-LOCK DRAFT: Avoid. Drivers are methylparaben and propylparaben. Flavor, maltitol solution, and saccharin sodium are not the Avoid driver. Glacial acetic acid and sodium acetate trihydrate are the Oct 3 Cleared aliases and are not the driver. Dye-free is not Clean. Ages 2+.';

const PANEL =
  'DailyMed setid a33f2704-d350-428b-b467-91f4775ce17f (OTC, updated February 5, 2026) and https://www.xyzal.com/en-us/products/children-allergy-relief/ingredients. Active: levocetirizine dihydrochloride 2.5 mg in each 5 mL. Inactive ingredients: flavor, glacial acetic acid, glycerin, maltitol solution, methylparaben, propylparaben, purified water, saccharin sodium, sodium acetate trihydrate. The brand table lists bubblegum flavor and grape flavor on one shared inactive table. The Drug Facts line prints flavor once for both.';

function upcCheck(eleven: string): string {
  if (!/^\d{11}$/.test(eleven)) throw new Error(`batch149 upc body ${eleven}`);
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += Number(eleven[i]) * (i % 2 === 0 ? 3 : 1);
  }
  return `${eleven}${(10 - (sum % 10)) % 10}`;
}

type Spec = {
  id: string;
  productName: string;
  barcode: string;
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
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: OTC,
    activeIngredients: ACTIVE,
    inactiveIngredients: liquidFlags(),
    verdict: 'avoid',
    honestNote: NOTE,
    retailers: [...RETAILERS],
    cleanAlternatives: ALTS,
    sourcesGeneral: [d.source],
  };
}

export const BATCH149_KYR6B_XYZAL_CHILDRENS_LIQUID: RatingRecord[] = [
  expand({
    id: 'xyzal-b149-liquid-grape-5oz',
    productName: "Children's Xyzal Allergy 24HR Liquid, Grape (5 fl oz)",
    barcode: upcCheck('04116735305'),
    source: `${PANEL} Package NDC 41167-3535-0 is 148 mL in 1 bottle. Flavor characteristic is grape. Walgreens Product Specifications for Children's 24 Hour Allergy Relief Medicine Grape, 5.0 fl oz (https://www.walgreens.com/store/c/xyzal-children's-24-hour-allergy-relief-medicine-grape/ID=300437106-product) printed UPC 04116735305. Check digit restored. Shipping price $10.99. Target grape 5 fl oz (TCIN 87813885) opened with add to cart.`,
  }),
  expand({
    id: 'xyzal-b149-liquid-bubblegum-5oz',
    productName: "Children's Xyzal Allergy 24HR Liquid, Bubble Gum (5 fl oz)",
    barcode: upcCheck('04116735301'),
    source: `${PANEL} Package NDC 41167-3533-0 is 148 mL in 1 bottle. Flavor characteristic is bubble gum. Same Drug Facts inactive line as the grape 5 fl oz. Walgreens Product Specifications for Children's 24 Hour Allergy Medicine Bubble Gum, 5.0 fl oz (https://www.walgreens.com/store/c/xyzal-children's-24-hour-allergy-medicine-bubble-gum/ID=prod6340907-product) printed UPC 04116735301. Check digit restored. Shipping price $10.99. CVS bubble gum 5 fl oz (prodid 1320003) opened. This code is not the grape 5 fl oz.`,
  }),
];

const ROWS = BATCH149_KYR6B_XYZAL_CHILDRENS_LIQUID;
if (ROWS.length !== 2) throw new Error(`batch149 row count ${ROWS.length}`);
if (new Set(ROWS.map((r) => r.id)).size !== 2) throw new Error('batch149 duplicate id');
if (ROWS.some((r) => r.verdict !== 'avoid' || r.formulaId !== FORMULA)) throw new Error('batch149 grade');
if (ROWS[0].barcode !== '041167353059') throw new Error(`batch149 grape upc ${ROWS[0].barcode}`);
if (ROWS[1].barcode !== '041167353011') throw new Error(`batch149 gum upc ${ROWS[1].barcode}`);
if (ROWS.some((r) => r.inactiveIngredients.length !== 9)) throw new Error('batch149 panel');
