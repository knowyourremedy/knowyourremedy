// DRAFT / not verified / batch 432 KYR6-e (t283u).
// Chewables are Avoid from four counting Limited ingredients.
// Multivitamin and AREDS soft gels are Avoid from titanium dioxide or FD&C dyes.
// AREDS3 linseed oil is a softgel fill.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T283U_STACK_NOTE } from '../scan-preview/t283uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'limited'
        ? `Methodology §5 Limited (founder lock ${mark}). Does not count toward the t137u stack.`
        : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const JUICE = 'This is fruit or vegetable juice, puree, concentrate, or powder. It is not a sugar, and it is not high fructose corn syrup.';
const MCC = 'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const MAG = 'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const FLAVOR = 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const HPC = 'Hydroxypropyl cellulose. It is used as a coating and binder. Hydroxypropyl cellulose is graded Limited as a processed cellulose derivative (FDA 21 CFR 172.870).';
const CROSP = 'Crospovidone. It helps the tablet or capsule break apart. Crospovidone is graded Limited as a synthetic disintegrant (FDA 21 CFR 182.1745 and related disintegrant listings).';
const SUCRALOSE = 'Sucralose is an artificial sweetener. A 2023 study raised questions about DNA and gut bacteria. It is graded Limited and counts toward a 3+ Limited stack.';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const MALIC = 'Malic acid is a natural acid used to set the acidity of the product.';
const MCT = 'Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack.';
const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const BEESWAX = 'Yellow beeswax. It is used as a coating and to help the softgel hold its shape.';
const LECITHIN = 'Lecithin is an emulsifier. A 2017 European review found no safety concern and set no daily limit. Soy lecithin is a soy allergen disclosure, not a toxicity flag.';
const TITANIUM = 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const SOY = 'Soybean oil. It is used as a fill in the softgel. Soybean oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const DYE = 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';
const PHOSPHATE = 'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const LINSEED = 'Linseed oil. It is used as a fill in the softgel. Linseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const CHEW: IngredientFlag[] = [
  flag('dextrose', 'cleared', false, 'Dextrose is a simple sugar used as a sweetener or filler.', 't162u'),
  flag('mannitol', 'limited', false, 'Mannitol is a sugar alcohol. Large amounts can cause bloating or loose stools.', 't160u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('beet juice', 'cleared', false, JUICE, 'juice'),
  flag('natural flavor', 'limited', true, FLAVOR, 't240u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
  flag('hydroxypropylcellulose', 'limited', true, HPC, 't280u'),
  flag('crospovidone', 'limited', true, CROSP, 't240u'),
  flag('calcium silicate', 'moderate', false, 'Calcium silicate is a mineral powder used as an anti-caking agent. It is graded Caution.', 't135u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
  flag('malic acid', 'cleared', false, MALIC, 't160u'),
  flag('sucralose', 'limited', true, SUCRALOSE, 't135u'),
  flag('raspberry fruit powder', 'cleared', false, JUICE, 'juice'),
  flag('blueberry fruit powder', 'cleared', false, JUICE, 'juice'),
  flag('strawberry fruit powder', 'cleared', false, JUICE, 'juice'),
];

const MULTI: IngredientFlag[] = [
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('yellow beeswax', 'cleared', false, BEESWAX, 't228u'),
  flag('soy lecithin', 'cleared', false, LECITHIN, 'clean alias'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('sodium copper chlorophyllin', 'cleared', false, 'Sodium copper chlorophyllin, a copper complex of chlorophyll. It is added for color.', 't283u'),
];

const AREDS3: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('soy lecithin', 'cleared', false, LECITHIN, 'clean alias'),
  flag('dicalcium phosphate', 'cleared', false, PHOSPHATE, 't162u'),
  flag('caramel', 'moderate', false, 'Caramel printed alone is graded Caution. It is not caramel color and it is not caramel sugar syrup.', 't141u'),
  flag('yellow beeswax', 'cleared', false, BEESWAX, 't228u'),
  flag('olive fruit oil', 'cleared', false, '', 't256u'),
  flag('linseed oil', 'moderate', false, LINSEED, 't283u'),
  flag('thyme extract', 'cleared', false, 'Thyme extract. It is added for its plant compounds.', 't283u'),
  flag('sunflower lecithin', 'cleared', false, 'Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.', 'clean alias'),
  flag('mixed tocopherols', 'cleared', false, '', 't251u'),
];

const SOFT: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('soybean oil', 'moderate', false, SOY, 't275u'),
  flag('soy lecithin', 'cleared', false, LECITHIN, 'clean alias'),
  flag('yellow beeswax', 'cleared', false, BEESWAX, 't228u'),
  flag('silicone dioxide', 'moderate', false, SILICA, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('FD&C yellow no.6', 'high', false, DYE, 't135u'),
  flag('FD&C red no.40', 'high', false, DYE, 't135u'),
  flag('FD&C blue no.1', 'high', false, DYE, 't135u'),
];

function base(id: string, name: string, formulaId: string, form: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, barcode?: string, note?: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'PreserVision',
    category: 'Vitamins',
    formulaId,
    form,
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['PreserVision'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict,
    ...(note ? { honestNote: note, founderHonestNote: note } : {}),
    sourcesGeneral: [source],
  };
}

export const BATCH432_KYR6E_T283U: RatingRecord[] = [
  base(
    'preservision-b432-areds-2-chewables-70',
    'AREDS 2 Formula Chewables 70 Count',
    'preservision-b432-areds-2-chewables-70',
    'chewable',
    CHEW,
    'avoid',
    't283u. https://www.preservision.com/products/areds-2-formula-chewables/ is the ingredient panel. 70 count. Counted Limited: natural flavor; hydroxypropyl cellulose; crospovidone; sucralose. No Avoid ingredient. The exact 3+ note is stored. No UPC on the brand page. Missing UPC.',
    undefined,
    T283U_STACK_NOTE,
  ),
  base(
    'preservision-b432-areds-2-multivitamin-100',
    'AREDS 2 Formula + Multivitamin 100 Count',
    'preservision-b432-areds-2-multivitamin-100',
    'softgel',
    MULTI,
    'avoid',
    't283u. https://www.preservision.com/products/areds-2-formula-multivitamin/ is the ingredient panel. 100 count. Avoid ingredient: titanium dioxide. No 3+ note. No UPC on the brand page. Missing UPC.',
  ),
  base(
    'preservision-b432-areds3-120',
    'AREDS3 Formula 120 Count',
    'preservision-b432-areds3-120',
    'softgel',
    AREDS3,
    'caution',
    't283u. https://www.preservision.com/products/areds3-formula-eye-vitamins/ is the ingredient panel. 120 count. Linseed oil is only a softgel fill, so it is Caution and does not count. Counted Limited: medium chain triglycerides. No Avoid ingredient. No 3+ note. No UPC on the brand page. Missing UPC.',
  ),
  base(
    'preservision-b432-areds-soft-gels-60',
    'AREDS Formula Soft Gels 60 Count',
    'preservision-b432-areds-soft-gels',
    'softgel',
    SOFT,
    'avoid',
    't283u. https://www.preservision.com/areds-formula-soft-gels/ is the ingredient panel. silicone dioxide uses the existing Silicon Dioxide lock. DSLD 26557 is the 60-count label. UPC 324208532102. The check digit passes. Avoid ingredients: titanium dioxide; FD&C yellow no.6; FD&C red no.40; FD&C blue no.1. No 3+ note.',
    '324208532102',
  ),
  base(
    'preservision-b432-areds-soft-gels-120',
    'AREDS Formula Soft Gels 120 Count',
    'preservision-b432-areds-soft-gels',
    'softgel',
    SOFT,
    'avoid',
    't283u. https://www.preservision.com/areds-formula-soft-gels/ is the ingredient panel. silicone dioxide uses the existing Silicon Dioxide lock. DSLD 208294 is the 120-count label. UPC 324208532300. The check digit passes. Avoid ingredients: titanium dioxide; FD&C yellow no.6; FD&C red no.40; FD&C blue no.1. No 3+ note.',
    '324208532300',
  ),
];
