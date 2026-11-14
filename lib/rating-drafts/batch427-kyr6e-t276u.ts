// DRAFT / not verified / batch 427 KYR6-e (t276u).
// Daily Probiotic and Intensive Bowel Support are Avoid because titanium dioxide is Avoid.
// No 3+ note.

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

const MALTO = 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).';
const HYPRO = 'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const MAG = 'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const TITANIUM = 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const MCC = 'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const STEARIC = 'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const DEXTRIN = 'Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch permitted by the FDA as a food additive.';

const DAILY: IngredientFlag[] = [
  flag('maltodextrin', 'limited', true, MALTO, 't259u'),
  flag('hypromellose', 'cleared', false, HYPRO, 't160u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
];

const BOWEL: IngredientFlag[] = [
  flag('maltodextrin', 'limited', true, MALTO, 't259u'),
  flag('hypromellose', 'cleared', false, HYPRO, 't160u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('stearic acid', 'cleared', false, STEARIC, 't160u'),
  flag('dextrin', 'limited', true, DEXTRIN, 't162u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
];

function row(id: string, name: string, formulaId: string, barcode: string, ingredients: IngredientFlag[], source: string, minAge: number): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Digestive Advantage',
    category: 'Vitamins',
    formulaId,
    form: 'capsule',
    audience: 'adult',
    minAge,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Digestive Advantage'],
    barcode,
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict: 'avoid',
    sourcesGeneral: [source],
  };
}

const DAILY_SOURCE = 't276u. Schiff brand page https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-daily-probiotic/ is the other-ingredient panel. Reckitt lists the same other ingredients. Digestive Advantage Daily Probiotic capsules. Avoid ingredient: titanium dioxide. Counted Limited: maltodextrin. No 3+ note. The check digit passes.';
const BOWEL_SOURCE = 't276u. Schiff brand page https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-intensive-bowel-support/ is the other-ingredient panel. Reckitt lists the same other ingredients. Digestive Advantage Intensive Bowel Support capsules. Avoid ingredient: titanium dioxide. Counted Limited: maltodextrin; dextrin. No 3+ note. The check digit passes.';

export const BATCH427_KYR6E_T276U: RatingRecord[] = [
  row(
    'digestiveadvantage-b427-daily-probiotic-30-capsules',
    'Daily Probiotic 30 Capsules',
    'digestiveadvantage-b427-daily-probiotic',
    '815066001669',
    DAILY,
    DAILY_SOURCE + ' 30 count. Label barcode 815066001669.',
    18,
  ),
  row(
    'digestiveadvantage-b427-daily-probiotic-60-capsules',
    'Daily Probiotic 60 Capsules',
    'digestiveadvantage-b427-daily-probiotic',
    '020525962621',
    DAILY,
    DAILY_SOURCE + ' 60 count. Label barcode 020525962621.',
    18,
  ),
  row(
    'digestiveadvantage-b427-intensive-bowel-support-32-capsules',
    'Intensive Bowel Support 32 Capsules',
    'digestiveadvantage-b427-intensive-bowel-support',
    '815066001164',
    BOWEL,
    BOWEL_SOURCE + ' 32 count. Label barcode 815066001164. Children 8 years and older may use an opened capsule.',
    8,
  ),
  row(
    'digestiveadvantage-b427-intensive-bowel-support-96-capsules',
    'Intensive Bowel Support 96 Capsules',
    'digestiveadvantage-b427-intensive-bowel-support',
    '815066001171',
    BOWEL,
    BOWEL_SOURCE + ' 96 count. Label barcode 815066001171. Children 8 years and older may use an opened capsule.',
    8,
  ),
];
