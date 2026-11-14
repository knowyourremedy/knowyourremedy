// DRAFT / not verified / batch 424 KYR6-e (t271u).
// Organic Protein chocolate and vanilla are Avoid from six counting Limited ingredients.
// Collagen Peptides is Caution from silicon dioxide. Organic Greens Unflavored stays held.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { T271U_STACK_NOTE } from '../scan-preview/t271uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'limited'
    ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
    : grade === 'moderate'
      ? `Methodology §5 Caution (founder lock ${mark}). Does not count toward the t137u stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const COCONUT = 'Coconut oil is a pressed oil from coconut meat. It is used as a carrier or fill.';
const SUNFLOWER = 'Sunflower lecithin is a phospholipid from sunflower seeds used as an emulsifier so oils and water stay mixed.';
const INULIN = 'Inulin is a plant fiber from chicory or other roots. It is used as a prebiotic filler.';
const PHOSPHATE = 'Tricalcium phosphate is a mineral salt used as a filler so the tablet holds its shape.';
const CITRATE = 'Sodium citrate is a salt of citric acid used to set acidity.';
const SILICA = 'Silica is an anti-caking powder that keeps ingredients from clumping. Some forms raise questions about nanoparticle absorption.';
const PEA = 'Pea protein. It is used as a protein filler. Pea protein is graded Limited as a processed plant protein (EFSA and FDA treat isolated plant proteins as distinct from whole peas).';
const RICE_PROTEIN = 'Brown rice protein. It is used as a protein filler. Brown rice protein is graded Limited as a processed plant protein (EFSA and FDA treat isolated rice protein as distinct from whole brown rice).';
const RICE_SYRUP = 'Rice syrup solids. It is used as a sweetener and binder. Rice syrup solids are graded Limited as a processed sugar (FDA and EFSA treat refined rice syrups as processed sweeteners).';
const FLAVORS = 'Natural flavors. It adds flavor to the product. Natural flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const CANE = 'Cane sugar. It is used as a sweetener. Cane sugar is graded Limited as a refined sugar (FDA and EFSA treat refined cane sugar as a processed sweetener).';
const GUAR = 'Guar gum, a plant gum. It thickens and stabilizes the liquid.';
const PLANT = (name: string) => `${name}. It is added for its plant compounds or mineral content.`;
const FIBER = (name: string) => `${name}. It is added for its plant compounds or fiber.`;
const REB = 'Rebaudioside A is a purified steviol glycoside from the stevia plant. High-purity forms have FDA GRAS status, but the bare form is graded Limited.';
const PAPAIN = 'Papain. It is added for its enzyme activity.';
const LACTO = 'LactoSpore, a probiotic strain. It is added for its live bacteria.';

function proteinFlags(riceName: string, cocoa: boolean): IngredientFlag[] {
  const rows: IngredientFlag[] = [
    flag('Pea Protein', 'limited', true, PEA, 't259u'),
    flag('Brown Rice Protein', 'limited', true, RICE_PROTEIN, 't271u'),
  ];
  if (cocoa) rows.push(flag('Cocoa', 'cleared', false, 'Cocoa. It is added for flavor and plant compounds.', 't271u'));
  rows.push(
    flag('Coconut Oil', 'cleared', false, COCONUT, 'clean alias'),
    flag(riceName, 'limited', true, RICE_SYRUP, 't271u'),
    flag('Sodium Citrate', 'cleared', false, CITRATE, 't160u'),
    flag('Tricalcium Phosphate', 'cleared', false, PHOSPHATE, 't151u'),
    flag('Sunflower Lecithin', 'cleared', false, SUNFLOWER, 'clean alias'),
    flag('Inulin', 'cleared', false, INULIN, 'clean alias'),
    flag('Natural Flavors', 'limited', true, FLAVORS, 't240u'),
    flag('Cane Sugar', 'limited', true, CANE, 't271u'),
    flag('Guar Gum', 'cleared', false, GUAR, 't251u'),
    flag('Spinach', 'cleared', false, PLANT('Spinach'), 't271u'),
    flag('Broccoli', 'cleared', false, PLANT('Broccoli'), 't271u'),
    flag('Flaxseed', 'cleared', false, FIBER('Flaxseed'), 't259u'),
    flag('Alfalfa extract', 'cleared', false, PLANT('Alfalfa extract'), 't271u'),
    flag('Blueberry', 'cleared', false, FIBER('Blueberry'), 't259u'),
    flag('Rebaudioside A', 'limited', true, REB, 't169u'),
    flag('Sea Salt', 'cleared', false, PLANT('Sea Salt'), 't271u'),
    flag('Papain', 'cleared', false, PAPAIN, 't240u'),
    flag('LactoSpore', 'cleared', false, LACTO, 't271u'),
  );
  return rows;
}

export const BATCH424_KYR6E_T271U: RatingRecord[] = [
  {
    id: 'purelyinspired-b424-organic-protein-decadent-chocolate-1-5-pound',
    productName: 'Organic Protein Decadent Chocolate 1.5 Pound',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b424-organic-protein-decadent-chocolate-1-5-pound',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    barcode: '631656603804',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: proteinFlags('Rice Syrup, Solids', true),
    verdict: 'avoid',
    honestNote: T271U_STACK_NOTE,
    founderHonestNote: T271U_STACK_NOTE,
    sourcesGeneral: [
      't271u. NIH DSLD label 264359 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired Organic Protein Decadent Chocolate. 1.5 pound. Label barcode 631656603804. The check digit passes. Counted Limited: Pea Protein; Brown Rice Protein; Rice Syrup, Solids; Natural Flavors; Cane Sugar; Rebaudioside A. No Avoid ingredient. The exact 3+ note is stored.',
    ],
  },
  {
    id: 'purelyinspired-b424-organic-protein-french-vanilla-1-35-lb',
    productName: 'Organic Protein French Vanilla 1.35 lb',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b424-organic-protein-french-vanilla-1-35-lb',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    barcode: '631656603828',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: proteinFlags('Rice Syrup Solids', false),
    verdict: 'avoid',
    honestNote: T271U_STACK_NOTE,
    founderHonestNote: T271U_STACK_NOTE,
    sourcesGeneral: [
      't271u. NIH DSLD label 323236 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired Organic Protein French Vanilla. 1.35 lb. Label barcode 631656603828. The check digit passes. The label prints Pea Protein twice and Tricalcium Phosphate twice. Each is one token. Counted Limited: Pea Protein; Brown Rice Protein; Rice Syrup Solids; Natural Flavors; Cane Sugar; Rebaudioside A. No Avoid ingredient. The exact 3+ note is stored.',
    ],
  },
  {
    id: 'purelyinspired-b424-collagen-peptides-1-pound',
    productName: 'Collagen Peptides 1 Pound',
    brand: 'Purely Inspired',
    category: 'Vitamins',
    formulaId: 'purelyinspired-b424-collagen-peptides-1-pound',
    form: 'powder',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['Purely Inspired'],
    barcode: '631656712766',
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: [
      flag('hydrolyzed Collagen Peptides', 'cleared', false, 'Hydrolyzed collagen peptides. It is added as a protein source.', 't271u'),
      flag('Silicon Dioxide', 'moderate', false, SILICA, 't160u'),
    ],
    verdict: 'caution',
    sourcesGeneral: [
      't271u. NIH DSLD label 264394 is the other-ingredient panel. The brand site does not print an Other Ingredients line. Purely Inspired Collagen Peptides Unflavored. 1 pound. Label barcode 631656712766. The check digit passes. Counted Limited: none. Silicon dioxide is Caution and does not count. No honest note.',
    ],
  },
];
