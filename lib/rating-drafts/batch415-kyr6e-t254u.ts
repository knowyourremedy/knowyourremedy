// DRAFT / not verified / batch 415 KYR6-e (t254u).
// Probiotic gummies are Avoid. Three counting Limited tokens, with the exact note.
// The other three packs are Caution. No other honest notes are stored.
// Omega-3 Lemon Creme was removed from batch413 and is not rewritten.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T254U_STACK_NOTE } from '../scan-preview/t254uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t254u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t254u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t254u). Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, ...(why ? { why } : {}) };
}

const BORAGE =
  'Borage seed oil. It is the base of this liquid. Borage seed oil is graded Limited when it is the base of the product and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const ANTIOX =
  'Antioxidant blend of ascorbyl palmitate, rosemary extract, and vitamin E. It is added to help keep the product stable.';
const COCONUT =
  'Coconut oil. It is used as a surface coating on the gummies. Coconut oil used as a coating is graded Limited as a processed oil (EFSA and FDA treat refined coconut oil as distinct from whole coconut).';
const LIGNAN = 'Flaxseed particulate with lignans. It is added for its plant fiber and compounds.';
const ISO = 'Isoflavones and saponins from soy. It is added for its plant compounds.';
const ROSEMARY = 'Rosemary. It is added for its plant compounds.';
const EPO =
  'organic Evening Primrose Oil. It is used as a fill in the softgel. organic Evening Primrose Oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const FLAX_FILL =
  'Flaxseed oil. It is used as a fill in the softgel. Flaxseed oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

export const BATCH415_KYR6E_T254U: RatingRecord[] = [
  {
    id: 'barleans-b415-probiotic-gummies-raspberry-60-gummie-s',
    productName: 'Probiotic Gummies Raspberry Flavor 60 Gummie(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b415-probiotic-gummies-raspberry-60-gummie-s',
    form: 'gummy',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875800587',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Maltitol', 'limited', true),
      flag('Corn Starch', 'cleared', false),
      flag('Water', 'cleared', false),
      flag('Sodium Citrate', 'cleared', false),
      flag('Citric Acid', 'cleared', false),
      flag('Natural flavor', 'limited', true),
      flag('Vegetable juice', 'cleared', false),
      flag('Coconut Oil', 'limited', true, COCONUT),
      flag('Carnauba wax', 'cleared', false),
    ],
    verdict: 'avoid',
    honestNote: T254U_STACK_NOTE,
    founderHonestNote: T254U_STACK_NOTE,
    sourcesGeneral: [
      "t254u. NIH DSLD label 67043 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's Probiotic Gummies Raspberry Flavor. 60 Gummie(s). Label barcode 705875800587. The check digit passes. Counted Limited tokens: Maltitol; Natural flavor; Coconut Oil.",
    ],
  },
  {
    id: 'barleans-b415-omega-twin-with-flax-lignans-12-fluid-ounce-s',
    productName: 'Omega Twin with Flax Lignans 12 Fluid Ounce(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b415-omega-twin-with-flax-lignans-12-fluid-ounce-s',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875100113',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('organic Flaxseed Oil', 'limited', true),
      flag('Borage seed Oil', 'limited', true, BORAGE),
      flag('organic Flaxseed particulate', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      "t254u. NIH DSLD label 291829 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's Omega Twin with Flax Lignans. 12 Fluid Ounce(s). Label barcode 705875100113. The check digit passes. Borage seed oil is the base of this liquid. Counted Limited tokens: organic Flaxseed Oil; Borage seed Oil.",
    ],
  },
  {
    id: 'barleans-b415-nurture-essential-woman-120-softgel-s',
    productName: 'Nurture Essential Woman 120 Softgel(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b415-nurture-essential-woman-120-softgel-s',
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('organic Flaxseed Oil', 'moderate', false, FLAX_FILL),
      flag('organic Evening Primrose Oil', 'moderate', false, EPO),
      flag('flaxseed particulate (Lignans)', 'cleared', false, LIGNAN),
      flag('isoflavones and saponins (Soy)', 'cleared', false, ISO),
      flag('Rosemary', 'cleared', false, ROSEMARY),
      flag('Ascorbic Acid', 'cleared', false),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      "t254u. NIH DSLD label 12905 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's Nurture Essential Woman. 120 Softgel(s). No UPC on the label record. Missing UPC. Counted Limited tokens: none.",
    ],
  },
  {
    id: 'barleans-b415-omega-pals-hooty-fuity-tangerine-8-ounce-s',
    productName: 'Omega Pals Hooty Fuity Tangerine Flavor 8 Ounce(s)',
    brand: "Barlean's",
    category: 'Vitamins',
    formulaId: 'barleans-b415-omega-pals-hooty-fuity-tangerine-8-ounce-s',
    form: 'liquid',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ["Barlean's"],
    barcode: '705875801058',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('Water', 'cleared', false),
      flag('Fish Oil (Anchovy, Mackerel, Sardine)', 'cleared', false),
      flag('Xylitol', 'moderate', false),
      flag('Glycerine', 'cleared', false),
      flag('Gum Arabic', 'cleared', false),
      flag('Natural flavors', 'limited', true),
      flag('Lutemax 2020 (Marigold flower extract)', 'cleared', false),
      flag('Blueberry extract', 'cleared', false),
      flag('Citric Acid', 'cleared', false),
      flag('Xanthan Gum', 'cleared', false),
      flag('Antioxidant Blend (Ascorbyl Palmitate, Rosemary extract, Vitamin E)', 'cleared', false, ANTIOX),
      flag('Grape seed extract', 'cleared', false),
      flag('natural Astaxanthin', 'cleared', false),
      flag('Guar Gum', 'cleared', false),
      flag('Sorbic Acid', 'limited', true),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      "t254u. NIH DSLD label 291843 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Barlean's Omega Pals Hooty Fuity Tangerine Flavor. 8 Ounce(s). Label barcode 705875801058. The check digit passes. Counted Limited tokens: Natural flavors; Sorbic Acid.",
    ],
  },
];
