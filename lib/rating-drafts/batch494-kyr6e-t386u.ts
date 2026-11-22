// DRAFT / not verified / batch 494 KYR6-e (t386u).
// Sundown Naturalist Daily Multi With Iron, 90 tablets.
// FD&C Yellow No. 5 Lake takes the existing FD&C Yellow #5 Avoid lock.
// Avoid ingredients are present, so no 3+ Limited note is stored.

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

export const BATCH494_KYR6E_T386U: RatingRecord[] = [
  {
    id: "sundown-b494-daily-multi-with-iron-90",
    productName: "Daily Multi With Iron",
    brand: "Sundown Naturalist",
    category: 'Vitamins',
    formulaId: "sundown-b494-daily-multi-with-iron-90",
    form: "tablet",
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Sundown'],
    barcode: "030768000547",
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Cellulose", "cleared", false, "Cellulose is a plant-fiber filler that helps a tablet or capsule hold its shape and break apart."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Cellulose Coating", "limited", true, "Cellulose coating (or bare coating). It coats the tablet or capsule. Bare coatings are graded Limited (FDA 21 CFR 172; refined cellulose derivatives used as coatings)."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Gelatin", "cleared", false, "Gelatin is the protein that forms the softgel or gummy shell. It comes from animal collagen and holds the fill."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Croscarmellose", "limited", true, "Croscarmellose. It helps the tablet or capsule break apart. Croscarmellose is graded Limited as a synthetic disintegrant (FDA 21 CFR 182.1745 and related disintegrant listings)."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Dextrose", "cleared", false, "Dextrose is a simple sugar used as a sweetener or filler."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "FD&C Yellow No. 5 Lake", "high", false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "FD&C Yellow No. 6 Lake", "high", false, "This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Hypromellose", "cleared", false, "Hypromellose is a plant-based cellulose used to make vegetarian capsules or as a tablet coating."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Magnesium Silicate", "high", false, "Talc is a mineral powder. The World Health Organization\u2019s cancer research agency classifies it as probably carcinogenic to humans."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Medium Chain Triglycerides", "limited", true, "Middle-chain triglycerides are a processed fat used as a softgel or liquid fill. They are graded Limited and count toward a 3+ Limited stack."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Silica", "moderate", false, "Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Stearic Acid", "cleared", false, "Stearic acid is a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Titanium Dioxide color", "high", false, "Titanium dioxide color. It is a white mineral used to color the product. Titanium dioxide is graded Avoid because of nanoparticle concerns (IARC 2B possible carcinogen)."),
      flag("Sundown Naturalist Daily Multi With Iron. NIH DSLD label 63489.", "Vegetable Magnesium Stearate", "cleared", false, "Magnesium stearate is a salt of a fatty acid used as a lubricant so the tablet presses and releases from the mold cleanly."),
    ],
    verdict: "avoid",
    sourcesGeneral: [
      "t386u. NIH DSLD label 63489 (2016-08-24) is the other-ingredient panel. The brand site does not print an Other Ingredients line. Sundown Naturalist Daily Multi With Iron. 90 Tablet(s). Label barcode 030768000547. The check digit passes. Other ingredients: Cellulose, Cellulose Coating, Gelatin, Croscarmellose, Dextrose, FD&C Yellow No. 5 Lake, FD&C Yellow No. 6 Lake, Hypromellose, Magnesium Silicate, Medium Chain Triglycerides, Silica, Stearic Acid, Titanium Dioxide color, Vegetable Magnesium Stearate. Actives are not graded. Gelatin source words Bovine, Fish, and Porcine are not ingredients. FD&C Yellow No. 5 Lake takes the existing FD&C Yellow #5 Avoid lock. Counted Limited tokens: Cellulose Coating; Croscarmellose; Medium Chain Triglycerides. Avoid ingredients are present, so no 3+ note is stored.",
    ],
  },
];

if (BATCH494_KYR6E_T386U.length !== 1) throw new Error("t386u count");
const row = BATCH494_KYR6E_T386U[0];
if (row.verdict !== "avoid" || row.honestNote || row.barcode !== "030768000547") throw new Error("t386u row");
if (!row.inactiveIngredients.some((item) => item.name === "FD&C Yellow No. 5 Lake" && item.riskLevel === "high" && item.stackCountExempt)) {
  throw new Error("t386u yellow lake");
}
