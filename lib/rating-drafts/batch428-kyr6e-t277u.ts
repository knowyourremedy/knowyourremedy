// DRAFT / not verified / batch 428 KYR6-e (t277u).
// Daily Probiotic gummies are Avoid from three counting Limited ingredients.
// Fast Acting Enzymes and Lactose Defense are Avoid because titanium dioxide is Avoid.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T277U_STACK_NOTE } from '../scan-preview/t277uLocks';

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

const CORN = 'Corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack.';
const LACTIC = 'Lactic acid. It is added to adjust acidity. Lactic acid is graded Limited as a processed acid (FDA 21 CFR 184.1061; produced by fermentation and purified).';
const FLAVORS = 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const CITRIC = 'Citric acid is a natural acid used to set the acidity of the product.';
const GELATIN = 'Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill.';
const PECTIN = 'Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies.';
const JUICE = 'This is fruit or vegetable juice, puree, concentrate, or powder. It is not a sugar, and it is not high fructose corn syrup.';
const MALTO = 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).';
const HYPRO = 'Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating.';
const MCC = 'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.';
const DEXTRIN = 'Dextrin is a starch breakdown product used as a filler or binder. It is a processed form of starch permitted by the FDA as a food additive.';
const TITANIUM = 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const MAG = 'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const STEARIC = 'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.';
const PHOSPHATE = 'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const BENZOATE = 'Sodium benzoate is a synthetic preservative. On its own it is low-risk, but when combined with vitamin C it can form trace benzene, a known carcinogen noted by the FDA.';
const MANNITOL = 'Mannitol is a sugar alcohol used as a sweetener or bulking agent. Large amounts commonly cause bloating or loose stools; the FDA notes the laxative effect of sugar alcohols at higher intakes.';

const GUMMIES: IngredientFlag[] = [
  flag('corn syrup', 'limited', true, CORN, 't162u'),
  flag('sugar', 'cleared', false, '', 't160u'),
  flag('water', 'cleared', false, 'This is plain water used as the liquid base. Spring or artesian water is groundwater that rises naturally.', 'clean alias'),
  flag('gelatin', 'cleared', false, GELATIN, 't160u'),
  flag('citric acid', 'cleared', false, CITRIC, 't160u'),
  flag('lactic acid', 'limited', true, LACTIC, 't240u'),
  flag('pectin', 'cleared', false, PECTIN, 't240u'),
  flag('natural flavors', 'limited', true, FLAVORS, 't240u'),
  flag('colors from fruits and vegetables', 'cleared', false, JUICE, 'juice'),
];

const ENZYMES: IngredientFlag[] = [
  flag('maltodextrin', 'limited', true, MALTO, 't259u'),
  flag('hypromellose', 'cleared', false, HYPRO, 't160u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('dextrin', 'limited', true, DEXTRIN, 't162u'),
  flag('citric acid', 'cleared', false, CITRIC, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('sodium benzoate', 'limited', false, BENZOATE, 't160u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
  flag('magnesium stearate', 'cleared', false, MAG, 't160u'),
  flag('mannitol', 'limited', false, MANNITOL, 't160u'),
  flag('calcium gluconate', 'cleared', false, 'Calcium gluconate, a calcium salt. It is added as a calcium source.', 't277u'),
  flag('ground limestone', 'cleared', false, 'Ground limestone, a natural calcium carbonate. It is added as a calcium source.', 't277u'),
];

const LACTOSE: IngredientFlag[] = [
  flag('maltodextrin', 'limited', true, MALTO, 't259u'),
  flag('hypromellose', 'cleared', false, HYPRO, 't160u'),
  flag('microcrystalline cellulose', 'cleared', false, MCC, 't160u'),
  flag('dicalcium phosphate', 'cleared', false, PHOSPHATE, 't162u'),
  flag('stearic acid', 'cleared', false, STEARIC, 't160u'),
  flag('titanium dioxide', 'high', false, TITANIUM, 't240u'),
  flag('sodium chloride', 'cleared', false, 'Sodium chloride, table salt. It is added for mineral content.', 't277u'),
  flag('silicon dioxide', 'moderate', false, SILICA, 't160u'),
];

function gummy(count: string, barcode?: string): RatingRecord {
  const id = `digestiveadvantage-b428-daily-probiotic-gummies-${count}`;
  return {
    id,
    productName: `Daily Probiotic Gummies ${count} Count`,
    brand: 'Digestive Advantage',
    category: 'Vitamins',
    formulaId: 'digestiveadvantage-b428-daily-probiotic-gummies',
    form: 'gummy',
    audience: 'adult',
    minAge: 3,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Digestive Advantage'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: GUMMIES,
    verdict: 'avoid',
    honestNote: T277U_STACK_NOTE,
    founderHonestNote: T277U_STACK_NOTE,
    sourcesGeneral: [
      't277u. Schiff brand page https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-probiotic-gummies/ is the other-ingredient panel. Reckitt product line 1524 lists the same other ingredients. Digestive Advantage Daily Probiotic gummies. Counted Limited: corn syrup; lactic acid; natural flavors. No Avoid ingredient. The exact 3+ note is stored.'
      + (barcode ? ` ${count} count. Label barcode ${barcode}. The check digit passes.` : ` ${count} count. No UPC on the Reckitt list is tied to this count. Missing UPC.`),
    ],
  };
}

function capsule(id: string, name: string, formulaId: string, barcode: string, ingredients: IngredientFlag[], source: string): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'Digestive Advantage',
    category: 'Vitamins',
    formulaId,
    form: 'capsule',
    audience: 'adult',
    minAge: 8,
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

export const BATCH428_KYR6E_T277U: RatingRecord[] = [
  gummy('60', '020525183675'),
  gummy('80', '020525183651'),
  gummy('90'),
  gummy('120', '020525183682'),
  capsule(
    'digestiveadvantage-b428-fast-acting-enzymes-32-capsules',
    'Fast Acting Enzymes 32 Capsules',
    'digestiveadvantage-b428-fast-acting-enzymes',
    '020525970220',
    ENZYMES,
    't277u. Schiff brand page https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-fast-acting-enzymes-probiotic/ is the other-ingredient panel. Reckitt product line 1822 lists the 32 count barcode 020525970220. Avoid ingredient: titanium dioxide. No 3+ note. The check digit passes.',
  ),
  capsule(
    'digestiveadvantage-b428-fast-acting-enzymes-40-capsules',
    'Fast Acting Enzymes 40 Capsules',
    'digestiveadvantage-b428-fast-acting-enzymes',
    '020525969491',
    ENZYMES,
    't277u. The other-ingredient panel is the Schiff Fast Acting Enzymes page. Reckitt product line 1822 lists the 40 count barcode 020525969491. The Schiff size selector shows 32 count. Avoid ingredient: titanium dioxide. No 3+ note. The check digit passes.',
  ),
  capsule(
    'digestiveadvantage-b428-lactose-defense-96-capsules',
    'Lactose Defense 96 Capsules',
    'digestiveadvantage-b428-lactose-defense',
    '020525982254',
    LACTOSE,
    't277u. Schiff brand page https://www.schiffvitamins.com/collections/digestive-advantage/products/digestive-advantage-lactose-defense-formula/ is the other-ingredient panel. Reckitt product line 1616 lists the 96 count barcode 020525982254. Avoid ingredient: titanium dioxide. No 3+ note. The check digit passes.',
  ),
  capsule(
    'digestiveadvantage-b428-lactose-defense-32-capsules',
    'Lactose Defense 32 Capsules',
    'digestiveadvantage-b428-lactose-defense',
    '815066001010',
    LACTOSE,
    't277u. The other-ingredient panel is the Schiff Lactose Defense page. Reckitt product line 1616 lists the 32 count barcode 815066001010. The Schiff size selector shows 96 count. Avoid ingredient: titanium dioxide. No 3+ note. The check digit passes.',
  ),
];
