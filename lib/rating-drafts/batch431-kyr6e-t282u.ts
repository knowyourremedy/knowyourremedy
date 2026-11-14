// DRAFT / not verified / batch 431 KYR6-e (t282u).
// MiniGels and AREDS Lutein are Avoid because titanium dioxide or FD&C dyes are Avoid.
// Vegan and CoQ10 are Caution. No honest note.

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
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const GLYCERIN = 'Glycerin is a sweet, syrupy liquid that keeps the product moist and helps other ingredients mix.';
const MCT = 'Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack.';
const CARMINE = 'Carmine is a red color made from cochineal insects. It can cause allergic reactions in some people; the FDA requires labeling for carmine in foods.';
const TITANIUM = 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const STARCH = 'Corn Starch. It is used as a filler, coating, or added for its plant or nutrient compounds.';
const CARRAGEENAN = 'Carrageenan. It is used as a thickener. Carrageenan is graded Limited as a processed seaweed extract (EFSA 2018 re-evaluation).';
const ANNATTO = 'Annatto is a plant color. Some people with chronic hives react to it, and high intakes can exceed the acceptable daily intake for one of its pigments.';
const BEESWAX = 'Yellow beeswax. It is used as a coating and to help the softgel hold its shape.';
const IRON = 'Iron oxide is a mineral color. It is not a synthetic FD&C dye. It is graded Limited and counts toward a 3+ Limited stack.';
const SOY = 'Soybean oil. It is used as a fill in the softgel. Soybean oil is graded Caution as a fill and Avoid when it is the base of a chewable (highly processed seed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const LECITHIN = 'Lecithin is an emulsifier. A 2017 European review found no safety concern and set no daily limit. Soy lecithin is a soy allergen disclosure, not a toxicity flag.';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const DYE = 'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.';

const MINI: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('carmine', 'limited', true, CARMINE, 't165u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
];

const VEGAN: IngredientFlag[] = [
  flag('corn starch', 'cleared', false, STARCH, 't251u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('carrageenan', 'limited', true, CARRAGEENAN, 't259u'),
  flag('annatto seed extract', 'moderate', false, ANNATTO, 't135u'),
];

const COQ: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('medium chain triglycerides', 'limited', true, MCT, 't162u'),
  flag('yellow beeswax', 'cleared', false, BEESWAX, 't228u'),
  flag('red iron oxide', 'limited', true, IRON, 't165u'),
];

const LUTEIN: IngredientFlag[] = [
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('glycerin', 'cleared', false, GLYCERIN, 't160u'),
  flag('soybean oil', 'moderate', false, SOY, 't275u'),
  flag('soy lecithin', 'cleared', false, LECITHIN, 'clean alias'),
  flag('yellow beeswax', 'cleared', false, BEESWAX, 't228u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('FD&C red 40', 'high', false, DYE, 't135u'),
  flag('FD&C blue 1', 'high', false, DYE, 't135u'),
];

function row(id: string, name: string, formulaId: string, ingredients: IngredientFlag[], verdict: RatingRecord['verdict'], source: string, barcode?: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'PreserVision',
    category: 'Vitamins',
    formulaId,
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['PreserVision'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict,
    sourcesGeneral: [source],
  };
}

export const BATCH431_KYR6E_T282U: RatingRecord[] = [
  row(
    'preservision-b431-areds-2-minigels-120',
    'AREDS 2 Formula MiniGels 120 Count',
    'preservision-b431-areds-2-minigels-120',
    MINI,
    'avoid',
    't282u. https://www.preservision.com/products/areds-2-formula-minigels/ is the ingredient panel. 120 count. Avoid ingredient: titanium dioxide. Counted Limited: medium chain triglycerides; carmine. No 3+ note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'preservision-b431-areds-2-vegan-120',
    'AREDS 2 Formula Vegan 120 Count',
    'preservision-b431-areds-2-vegan-120',
    VEGAN,
    'caution',
    't282u. https://www.preservision.com/products/areds-2-formula-vegan-soft-gels/ is the ingredient panel. 120 count. Counted Limited: medium chain triglycerides; carrageenan. Annatto seed extract is Caution and does not count. No honest note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'preservision-b431-areds-2-coq10-100',
    'AREDS 2 Formula + CoQ10 100 Count',
    'preservision-b431-areds-2-coq10-100',
    COQ,
    'caution',
    't282u. https://www.preservision.com/products/preservision-areds-2-formula-coq10/ is the ingredient panel. 100 count. Counted Limited: medium chain triglycerides; red iron oxide. No honest note. No UPC on the brand page. Missing UPC.',
  ),
  row(
    'preservision-b431-areds-lutein-50',
    'AREDS Lutein 50 Soft Gels',
    'preservision-b431-areds-lutein',
    LUTEIN,
    'avoid',
    't282u. https://www.preservision.com/areds-lutein-formula-soft-gels/ is the ingredient panel. DSLD 17137 is the 50-count label. UPC 324208632109. The check digit passes. Avoid ingredients: titanium dioxide; FD&C red 40; FD&C blue 1. No 3+ note.',
    '324208632109',
  ),
  row(
    'preservision-b431-areds-lutein-120',
    'AREDS Lutein 120 Soft Gels',
    'preservision-b431-areds-lutein',
    LUTEIN,
    'avoid',
    't282u. https://www.preservision.com/areds-lutein-formula-soft-gels/ is the ingredient panel. DSLD 17138 is the 120-count label. UPC 324208632116. The check digit passes. Avoid ingredients: titanium dioxide; FD&C red 40; FD&C blue 1. No 3+ note.',
    '324208632116',
  ),
];
