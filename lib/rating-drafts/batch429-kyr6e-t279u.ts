// DRAFT / not verified / batch 429 KYR6-e (t279u).
// Complete Multi-Symptom caplets are Avoid because titanium dioxide is Avoid.
// No 3+ note.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited'
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const INGREDIENTS: IngredientFlag[] = [
  flag('dicalcium phosphate', 'cleared', false, 'Dibasic calcium phosphate is a mineral salt used as a filler so the tablet holds its shape.', 't162u'),
  flag('microcrystalline cellulose', 'cleared', false, 'Microcrystalline cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart in the gut.', 't160u'),
  flag('titanium dioxide', 'high', false, 'Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen).', 't240u'),
  flag('sodium alginate', 'cleared', false, '', 't256u'),
  flag('medium chain triglycerides', 'limited', true, 'Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack.', 't162u'),
  flag('maltodextrin', 'limited', true, 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).', 't259u'),
  flag('riboflavin', 'cleared', false, 'Riboflavin. It is added to help keep the product stable or for its vitamin activity.', 't256u'),
  flag('stearic acid', 'cleared', false, 'Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.', 't160u'),
  flag('croscarmellose sodium', 'cleared', false, 'Croscarmellose sodium is a cellulose derivative that helps a tablet break apart in the gut.', 't160u'),
  flag('magnesium stearate', 'cleared', false, 'Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly.', 't160u'),
];

function row(count: string, barcode: string | undefined): RatingRecord {
  return {
    id: `estroven-b429-complete-multi-symptom-${count}-caplets`,
    productName: `Complete Multi-Symptom ${count} Caplets`,
    brand: 'Estroven',
    category: 'Vitamins',
    formulaId: 'estroven-b429-complete-multi-symptom',
    form: 'caplet',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Estroven'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Rhapontic rhubarb root extract', strength: '4 mg' }],
    inactiveIngredients: INGREDIENTS,
    verdict: 'avoid',
    sourcesGeneral: [
      't279u. Brand supplement-facts image https://estroven.com/cdn/shop/files/ESBM10935_Estroven_Complete_28CT_Supp_Facts.png is the other-ingredient panel for Complete Multi-Symptom. The coating is graded as its listed ingredients. Avoid ingredient: titanium dioxide. Counted Limited: medium chain triglycerides; maltodextrin. No 3+ note.'
      + (barcode
        ? ` ${count} count. DSLD 242625 barcode 092961040294. The brand variant sku ends in 04029. The check digit passes.`
        : ` ${count} count. The brand variant sku ends in 04030, and DSLD 218095 with UPC 092961040300 is a 56-count label, so that code is not this count. Missing UPC.`),
    ],
  };
}

export const BATCH429_KYR6E_T279U: RatingRecord[] = [
  row('28', '092961040294'),
  row('60', undefined),
];
