// DRAFT / not verified / batch 498 KYR6-e (t392u).
// Bestie STACKED whey powders. Brand-site other ingredients.
// Every other ingredient is Cleared and does not stack. No 3+ note.
// The Protein line is printed twice. No side was chosen.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(panel: string, name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why?: string): IngredientFlag {
  const meth = grade === 'high'
    ? 'Methodology §5 Avoid.'
    : grade === 'limited' && counts
      ? 'Methodology §5 Limited. Counts toward the 3+ Limited stack.'
    : grade === 'limited'
      ? 'Methodology §5 Limited. Does not count toward the t137u stack.'
      : grade === 'moderate'
        ? 'Methodology §5 Caution. Does not count toward the t137u stack.'
        : 'Methodology §5 Cleared. Does not count toward the t137u stack.';
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `${panel}; ${meth}`, ...(why ? { why } : {}) };
}

export const BATCH498_KYR6E_T392U: RatingRecord[] = [
  {
    id: "bestie-b498-stacked-cinnamon-swirl",
    productName: "STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl",
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: "bestie-b498-stacked-cinnamon-swirl",
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: "860012739271",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Vanilla Extract Powder", "cleared", false, "Vanilla extract powder is dried vanilla extract. It is included for its flavor."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Organic Cassia Cinnamon", "cleared", false, "Organic cassia cinnamon is dried cinnamon bark. It is included for its plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Luo Han Guo (Monk Fruit) Extract", "cleared", false, "Luo Han Guo fruit extract. It adds flavor, color, or plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Lactase 100,000 ALU/g", "cleared", false, "Lactase. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Protease 5,000 HUT/g", "cleared", false, "Protease. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl.", "Lipase 100,000 FIP/g", "cleared", false, "Lipase. It is included for its plant, enzyme, or nutrient compounds."),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t392u. Bestie brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-cinnamon-swirl is the other-ingredient panel. STACKED Grass Fed Whey + Colostrum + Collagen, Cinnamon Swirl. Serving size 30 g. Label barcode 860012739271. The check digit passes. Other ingredients: Vanilla Extract Powder, Organic Cassia Cinnamon, Luo Han Guo (Monk Fruit) Extract, Lactase 100,000 ALU/g, Protease 5,000 HUT/g, Lipase 100,000 FIP/g. Supplement-facts lines are the actives and are not graded. Contains: Milk is an allergen statement and is not graded. The panel prints the Protein line twice, 0 g and 25 g. No side was chosen. Lactase 100,000 ALU/g, Protease 5,000 HUT/g, and Lipase 100,000 FIP/g take the existing Lactase, Protease, and Lipase locks. Counted Limited tokens: none.",
    ],
  },
  {
    id: "bestie-b498-stacked-lemon-glow",
    productName: "STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow",
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: "bestie-b498-stacked-lemon-glow",
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: "860012739295",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Tahitian Lemon Powder", "cleared", false, "Tahitian lemon powder is dried lemon. It is included for its plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Vanilla Extract Powder", "cleared", false, "Vanilla extract powder is dried vanilla extract. It is included for its flavor."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Malic Acid", "cleared", false, "Malic acid is a natural acid used to set the acidity of the product."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Luo Han Guo (Monk Fruit) Extract", "cleared", false, "Luo Han Guo fruit extract. It adds flavor, color, or plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Lactase 100,000 ALU/g", "cleared", false, "Lactase. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Protease 5,000 HUT/g", "cleared", false, "Protease. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale.", "Lipase 100,000 FIP/g", "cleared", false, "Lipase. It is included for its plant, enzyme, or nutrient compounds."),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t392u. Bestie brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-lemon-glow-pre-sale is the other-ingredient panel. STACKED Grass Fed Whey + Colostrum + Collagen, Lemon Glow. Serving size 35 g. Label barcode 860012739295. The check digit passes. Other ingredients: Tahitian Lemon Powder, Vanilla Extract Powder, Malic Acid, Luo Han Guo (Monk Fruit) Extract, Lactase 100,000 ALU/g, Protease 5,000 HUT/g, Lipase 100,000 FIP/g. Supplement-facts lines are the actives and are not graded. Contains: Milk is an allergen statement and is not graded. The panel prints the Protein line twice, 0 g and 25 g. No side was chosen. Lactase 100,000 ALU/g, Protease 5,000 HUT/g, and Lipase 100,000 FIP/g take the existing Lactase, Protease, and Lipase locks. Counted Limited tokens: none.",
    ],
  },
  {
    id: "bestie-b498-stacked-chocolate",
    productName: "STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate",
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: "bestie-b498-stacked-chocolate",
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: "860012739264",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Cacao Powder", "cleared", false, "Cacao powder is dried cacao. It is included for its plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Vanilla Extract Powder", "cleared", false, "Vanilla extract powder is dried vanilla extract. It is included for its flavor."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Luo Han Guo (Monk Fruit) Extract", "cleared", false, "Luo Han Guo fruit extract. It adds flavor, color, or plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Lactase 100,000 ALU/g", "cleared", false, "Lactase. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Protease 5,000 HUT/g", "cleared", false, "Protease. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale.", "Lipase 100,000 FIP/g", "cleared", false, "Lipase. It is included for its plant, enzyme, or nutrient compounds."),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t392u. Bestie brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-chocolate-pre-sale is the other-ingredient panel. STACKED Grass Fed Whey + Colostrum + Collagen, Chocolate. Serving size 34.5 g. Label barcode 860012739264. The check digit passes. Other ingredients: Cacao Powder, Vanilla Extract Powder, Luo Han Guo (Monk Fruit) Extract, Lactase 100,000 ALU/g, Protease 5,000 HUT/g, Lipase 100,000 FIP/g. Supplement-facts lines are the actives and are not graded. Contains: Milk is an allergen statement and is not graded. The panel prints the Protein line twice, 0 g and 25 g. No side was chosen. Lactase 100,000 ALU/g, Protease 5,000 HUT/g, and Lipase 100,000 FIP/g take the existing Lactase, Protease, and Lipase locks. Counted Limited tokens: none.",
    ],
  },
  {
    id: "bestie-b498-stacked-orange-creamsicle",
    productName: "STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle",
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: "bestie-b498-stacked-orange-creamsicle",
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: "860012739288",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Orange Fruit Powder", "cleared", false, "Orange fruit powder is dried orange. It is included for its plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Vanilla Extract Powder", "cleared", false, "Vanilla extract powder is dried vanilla extract. It is included for its flavor."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Malic Acid", "cleared", false, "Malic acid is a natural acid used to set the acidity of the product."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Luo Han Guo (Monk Fruit) Extract", "cleared", false, "Luo Han Guo fruit extract. It adds flavor, color, or plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Lactase 100,000 ALU/g", "cleared", false, "Lactase. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Protease 5,000 HUT/g", "cleared", false, "Protease. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale.", "Lipase 100,000 FIP/g", "cleared", false, "Lipase. It is included for its plant, enzyme, or nutrient compounds."),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t392u. Bestie brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-orange-creamsicle-pre-sale is the other-ingredient panel. STACKED Grass Fed Whey + Colostrum + Collagen, Orange Creamsicle. Serving size 35 g. Label barcode 860012739288. The check digit passes. Other ingredients: Orange Fruit Powder, Vanilla Extract Powder, Malic Acid, Luo Han Guo (Monk Fruit) Extract, Lactase 100,000 ALU/g, Protease 5,000 HUT/g, Lipase 100,000 FIP/g. Supplement-facts lines are the actives and are not graded. Contains: Milk is an allergen statement and is not graded. The panel prints the Protein line twice, 0 g and 25 g. No side was chosen. Lactase 100,000 ALU/g, Protease 5,000 HUT/g, and Lipase 100,000 FIP/g take the existing Lactase, Protease, and Lipase locks. Counted Limited tokens: none.",
    ],
  },
  {
    id: "bestie-b498-stacked-vanilla",
    productName: "STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla",
    brand: 'Bestie',
    category: 'Vitamins',
    formulaId: "bestie-b498-stacked-vanilla",
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Bestie'],
    barcode: "860012739257",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy.", "Vanilla Extract Powder", "cleared", false, "Vanilla extract powder is dried vanilla extract. It is included for its flavor."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy.", "Luo Han Guo (Monk Fruit) Extract", "cleared", false, "Luo Han Guo fruit extract. It adds flavor, color, or plant compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy.", "Lactase 100,000 ALU/g", "cleared", false, "Lactase. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy.", "Protease 5,000 HUT/g", "cleared", false, "Protease. It is included for its plant, enzyme, or nutrient compounds."),
      flag("Bestie STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy.", "Lipase 100,000 FIP/g", "cleared", false, "Lipase. It is included for its plant, enzyme, or nutrient compounds."),
    ],
    verdict: 'clean',
    sourcesGeneral: [
      "t392u. Bestie brand page https://bestiesupplements.com/products/stacked-grass-fed-whey-colostrum-vanilla-pre-sale-copy is the other-ingredient panel. STACKED Grass Fed Whey + Colostrum + Collagen, Vanilla. Serving size 31 g. Label barcode 860012739257. The check digit passes. Other ingredients: Vanilla Extract Powder, Luo Han Guo (Monk Fruit) Extract, Lactase 100,000 ALU/g, Protease 5,000 HUT/g, Lipase 100,000 FIP/g. Supplement-facts lines are the actives and are not graded. Contains: Milk is an allergen statement and is not graded. The panel prints the Protein line twice, 0 g and 25 g. No side was chosen. Lactase 100,000 ALU/g, Protease 5,000 HUT/g, and Lipase 100,000 FIP/g take the existing Lactase, Protease, and Lipase locks. Counted Limited tokens: none.",
    ],
  },
];

if (BATCH498_KYR6E_T392U.length !== 5) throw new Error('t392u count');
const barcodes = ['860012739271','860012739295','860012739264','860012739288','860012739257'];
BATCH498_KYR6E_T392U.forEach((record, index) => {
  if (record.verdict !== 'clean' || record.honestNote || record.barcode !== barcodes[index]) throw new Error(record.id);
});
