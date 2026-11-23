// DRAFT / not verified / batch 495 KYR6-e (t387u).
// Sundown Kids Complete Multivitamin Gummies Cars, 60 count.
// Same other-ingredient panel as the written 180 count. Vegetable Oil is already Avoid, so no 3+ note.

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

export const BATCH495_KYR6E_T387U: RatingRecord[] = [
  {
    id: "sundown-b495-complete-multivitamin-gummies-cars-60",
    productName: "Complete Multivitamin Gummies Cars",
    brand: "Sundown Kids",
    category: 'Vitamins',
    formulaId: "sundown-b495-complete-multivitamin-gummies-cars-60",
    form: "gummy",
    audience: 'kids',
    minAge: 4,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Sundown'],
    barcode: "759427679275",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Corn Syrup", "limited", true, "Corn syrup is a sweetener made from corn. It is graded Limited and counts toward a 3+ Limited stack."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Sugar", "cleared", false, "Sucrose is table sugar used as a sweetener or filler."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Gelatin", "cleared", false, "Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Citric Acid", "cleared", false, "Citric acid is a natural acid used to set the acidity of the product."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Fruit juice", "cleared", false, "Fruit juice. It is added for color and plant compounds."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Maltodextrin", "limited", true, "Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018)."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Natural Flavors", "limited", true, "Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22)."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Pectin", "cleared", false, "Pectin, a plant fiber from fruit. It is used as a gelling agent in gummies."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Vegetable juice", "cleared", false, "Vegetable juice. It is added for color and plant compounds."),
      flag("Sundown Kids Complete Multivitamin Gummies Cars. NIH DSLD label 212073.", "Vegetable Oil", "high", false, "Vegetable oil. It is used as a carrier or fill. Vegetable oil is graded Avoid when it is the base of a chewable and Caution as a fill (highly processed oil; form-dependent grade under current methodology)."),
    ],
    verdict: "avoid",
    sourcesGeneral: [
      "t387u. NIH DSLD label 212073 (2020-02-26) is the other-ingredient panel. The brand site does not print an Other Ingredients line. Sundown Kids Complete Multivitamin Gummies Cars. 60 Gummy(ies). Label barcode 759427679275. The check digit passes. Other ingredients: Corn Syrup, Sugar, Gelatin, Citric Acid, Fruit juice, Maltodextrin, Natural Flavors, Pectin, Vegetable juice, Vegetable Oil. Actives are not graded. Counted Limited tokens: Corn Syrup; Maltodextrin; Natural Flavors. Vegetable Oil is already Avoid, so no 3+ note is stored.",
    ],
  },
];

if (BATCH495_KYR6E_T387U.length !== 1) throw new Error("t387u count");
const row = BATCH495_KYR6E_T387U[0];
if (row.verdict !== "avoid" || row.honestNote || row.barcode !== "759427679275") throw new Error("t387u row");
if (!row.inactiveIngredients.some((item) => item.name === "Vegetable Oil" && item.riskLevel === "high")) throw new Error("t387u oil");
