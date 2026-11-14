// DRAFT / not verified / batch 426 KYR6-e (t274u).
// Blue Light and Eye Performance are Avoid from existing Avoid ingredients.
// No 3+ note. No UPC on either panel.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : grade === 'moderate'
        ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
        : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

export const BATCH426_KYR6E_T274U: RatingRecord[] = [
  {
    id: 'ocuvite-b426-blue-light-30-softgels',
    productName: 'Blue Light 30 Softgels',
    brand: 'Ocuvite',
    category: 'Vitamins',
    formulaId: 'ocuvite-b426-blue-light-30-softgels',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Ocuvite'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Soybean oil', 'moderate', false, 'Soybean oil, a seed oil. It is used as a carrier or fill. Soybean oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).', 't240u'),
      flag('gelatin', 'cleared', false, 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.', 't160u'),
      flag('glycerin', 'cleared', false, 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.', 't160u'),
      flag('sunflower oil', 'cleared', false, 'Sunflower oil is a pressed oil from sunflower seeds. It is used as a carrier or fill in softgels.', 'clean alias'),
      flag('yellow beeswax', 'cleared', false, 'Yellow beeswax. It is used as a coating and to help the softgel hold its shape.', 't228u'),
      flag('soy lecithin', 'cleared', false, 'Lecithin is an emulsifier. A 2017 European review found no safety concern and set no daily limit. Soy lecithin is a soy allergen disclosure, not a toxicity flag.', 'clean alias'),
      flag('natural tocopherols', 'cleared', false, 'Natural tocopherols. It is added to help keep the product stable.', 't274u'),
      flag('titanium dioxide', 'high', false, 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).', 't240u'),
      flag('FD&C red 40', 'high', false, 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.', 't135u'),
      flag('FD&C blue 1', 'high', false, 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.', 't135u'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't274u. The brand page https://www.ocuvite.com/product/ocuvite-blue-light/ is the other-ingredient panel. NIH DSLD label 278497 prints the same other ingredients. Ocuvite Blue Light. 30 softgels. No UPC on the brand page or that label. Missing UPC. Avoid ingredients: titanium dioxide; FD&C red 40; FD&C blue 1. No 3+ note.',
    ],
  },
  {
    id: 'ocuvite-b426-eye-performance-50-count',
    productName: 'Eye Performance 50 Count',
    brand: 'Ocuvite',
    category: 'Vitamins',
    formulaId: 'ocuvite-b426-eye-performance-50-count',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Ocuvite'],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Fish oil (from Anchovies, Sardines, Mackerel, Tuna)', 'cleared', false, 'Fish oil from anchovies, sardines, mackerel, and tuna. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.', 't274u'),
      flag('gelatin', 'cleared', false, 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.', 't160u'),
      flag('glycerin', 'cleared', false, 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.', 't160u'),
      flag('yellow beeswax', 'cleared', false, 'Yellow beeswax. It is used as a coating and to help the softgel hold its shape.', 't228u'),
      flag('silicon dioxide', 'moderate', false, 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.', 't160u'),
      flag('carmine', 'limited', true, 'Carmine is a red color made from cochineal insects. It can cause allergic reactions in some people; the FDA requires labeling for carmine in foods.', 't165u'),
      flag('caramel', 'moderate', false, 'Caramel printed alone is graded Caution. It is not caramel color and it is not caramel sugar syrup.', 't141u'),
      flag('natural flavor', 'limited', true, 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).', 't240u'),
      flag('soy lecithin', 'cleared', false, 'Lecithin is an emulsifier. A 2017 European review found no safety concern and set no daily limit. Soy lecithin is a soy allergen disclosure, not a toxicity flag.', 'clean alias'),
      flag('titanium dioxide', 'high', false, 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).', 't240u'),
    ],
    verdict: 'avoid',
    sourcesGeneral: [
      't274u. The brand page https://www.ocuvite.com/product/ocuvite-eye-performance/ is the other-ingredient panel. Ocuvite Eye Performance. 50 count. No UPC on the brand page. Missing UPC. Avoid ingredient: titanium dioxide. Counted Limited: carmine; natural flavor. Caramel is Caution and does not count. No 3+ note.',
    ],
  },
];
