// DRAFT / not verified / batch 436 KYR6-e (t289u).
// Brand-page softgel panels. ethyl vanillin uses the existing t265u lock.
// The 3+ note is stored only when no Avoid ingredient is present.

import type { IngredientFlag, RatingRecord } from '../ratingRecord';
import { cleanTokenWhyForName } from '../scan-preview/cleanTokenWhy';
import { t134uWhyForName } from '../scan-preview/t134uTokenWhy';
import { t135uWhyForName } from '../scan-preview/t135uTokenWhy';
import { T128U_SORBITOL_WHY } from '../scan-preview/t128uTokenWhy';
import { T252U_STACK_NOTE } from '../scan-preview/t252uLocks';
import { t251uLock } from '../scan-preview/t251uLocks';
import { t252uLock } from '../scan-preview/t252uLocks';
import { t265uLock } from '../scan-preview/t265uLocks';
import { t289uLock } from '../scan-preview/t289uLocks';

const UNVERIFIED = 'unverified' as const;
const SUPPLEMENT = 'Supplement' as const;

function flag(name: string, grade: IngredientFlag['riskLevel'], counts: boolean, why: string, mark: string): IngredientFlag {
  const meth = grade === 'high'
    ? `Methodology §5 Avoid (founder lock ${mark}).`
    : grade === 'limited' && counts
      ? `Methodology §5 Limited (founder lock ${mark}). Counts toward the 3+ Limited stack.`
      : `Methodology §5 Cleared (founder lock ${mark}). Does not count toward the t137u stack.`;
  return { name, riskLevel: grade, stackCountExempt: !counts, source: `Panel; ${meth}`, why };
}

const VANILLIN = t265uLock('ethyl vanillin');
const CARMINE = t289uLock('carmine color');
const CARAMEL = t251uLock('caramel color', 'softgel');
const TOCO = t251uLock('mixed tocopherols', 'softgel');
const NATURAL_TOCO = t252uLock('natural mixed tocopherols', 'softgel');
const GEL = t134uWhyForName('gelatin');
const GEL_BOVINE = t134uWhyForName('gelatin (bovine)');
const GLYCERIN = t134uWhyForName('glycerin');
const WATER = cleanTokenWhyForName('water');
const RED = t135uWhyForName('Red 40', 'softgel');
const BLUE = t135uWhyForName('Blue 1', 'softgel');
if (!VANILLIN || !CARMINE || !CARAMEL || !TOCO || !NATURAL_TOCO || !GEL || !GEL_BOVINE || !GLYCERIN || !WATER || !RED || !BLUE) {
  throw new Error('t289u why');
}

const ETHYL = flag('ethyl vanillin', 'limited', true, VANILLIN.why, 't265u');
const SORBITOL = flag('sorbitol', 'limited', true, T128U_SORBITOL_WHY, 't160u');
const GELATIN = flag('gelatin', 'cleared', false, GEL, 't134u');
const GLY = flag('glycerin', 'cleared', false, GLYCERIN, 't134u');
const H2O = flag('water', 'cleared', false, WATER, 't108u');

const KRILL: IngredientFlag[] = [
  GELATIN,
  GLY,
  H2O,
  ETHYL,
  SORBITOL,
];

const FOUR: IngredientFlag[] = [
  GELATIN,
  GLY,
  H2O,
  ETHYL,
  flag('caramel color', 'limited', true, CARAMEL.why, 't251u'),
  flag('carmine color', 'limited', true, CARMINE.why, 't289u'),
  flag('natural mixed tocopherols', 'cleared', false, NATURAL_TOCO.why, 't252u'),
];

const NINE: IngredientFlag[] = [
  flag('gelatin (bovine)', 'cleared', false, GEL_BOVINE, 't134u'),
  GLY,
  H2O,
  flag('Red 40', 'high', false, RED, 't135u'),
  ETHYL,
  flag('mixed tocopherols', 'cleared', false, TOCO.why, 't251u'),
  flag('caramel color', 'limited', true, CARAMEL.why, 't251u'),
  flag('Blue 1', 'high', false, BLUE, 't135u'),
];

const SIX: IngredientFlag[] = [
  flag('gelatin (bovine)', 'cleared', false, GEL_BOVINE, 't134u'),
  GLY,
  H2O,
  ETHYL,
  SORBITOL,
  flag('caramel color', 'limited', true, CARAMEL.why, 't251u'),
  flag('mixed tocopherols', 'cleared', false, TOCO.why, 't251u'),
];

function row(
  id: string,
  name: string,
  formulaId: string,
  ingredients: IngredientFlag[],
  verdict: RatingRecord['verdict'],
  source: string,
  barcode?: string,
  note?: string,
): RatingRecord {
  return {
    id,
    productName: name,
    brand: 'MegaRed',
    category: 'Vitamins',
    formulaId,
    form: 'softgel',
    audience: 'adult',
    minAge: 18,
    recordStatus: UNVERIFIED,
    productType: SUPPLEMENT,
    retailers: ['MegaRed'],
    ...(barcode ? { barcode } : {}),
    activeIngredients: [{ name: 'Label actives', strength: 'as labeled' }],
    inactiveIngredients: ingredients,
    verdict,
    ...(note ? { honestNote: note, founderHonestNote: note } : {}),
    sourcesGeneral: [source],
  };
}

const BRAND = 'https://www.schiffvitamins.com/collections/megared/products';

export const BATCH436_KYR6E_T289U: RatingRecord[] = [
  row(
    'megared-b436-krill-350-60',
    'MegaRed Omega-3 Krill Oil 350 mg 60 Softgels',
    'megared-b436-krill-350',
    KRILL,
    'caution',
    `${BRAND}/megared-350mg-omega3-krill-oil/ is the ingredient panel. Size 60CT. Counted Limited: ethyl vanillin; sorbitol. No honest note. DSLD 213028 matches this panel. UPC 020525104342. The check digit passes.`,
    '020525104342',
  ),
  row(
    'megared-b436-krill-350-120',
    'MegaRed Omega-3 Krill Oil 350 mg 120 Softgels',
    'megared-b436-krill-350',
    KRILL,
    'caution',
    `${BRAND}/megared-350mg-omega3-krill-oil/ is the ingredient panel. Size 120CT. Same other ingredients as the 60 count. DSLD 240005 matches this panel. UPC 020525953308. The check digit passes.`,
    '020525953308',
  ),
  row(
    'megared-b436-krill-350-130',
    'MegaRed Omega-3 Krill Oil 350 mg 130 Softgels',
    'megared-b436-krill-350',
    KRILL,
    'caution',
    `${BRAND}/megared-350mg-omega3-krill-oil/ is the ingredient panel. Size 130CT. Same other ingredients as the 60 count. DSLD 65419 matches this panel. UPC 020525951267. The check digit passes.`,
    '020525951267',
  ),
  row(
    'megared-b436-extra-500-40',
    'MegaRed Extra Strength Krill Oil 500 mg 40 Softgels',
    'megared-b436-extra-500',
    KRILL,
    'caution',
    `${BRAND}/megared-500mg-extra-strength/ is the ingredient panel. Size 40CT. Counted Limited: ethyl vanillin; sorbitol. No honest note. No matching 40-count UPC. Missing UPC.`,
  ),
  row(
    'megared-b436-extra-500-80',
    'MegaRed Extra Strength Krill Oil 500 mg 80 Softgels',
    'megared-b436-extra-500',
    KRILL,
    'caution',
    `${BRAND}/megared-500mg-extra-strength/ is the ingredient panel. Size 80CT. Same other ingredients as the 40 count. DSLD 241056 and DSLD 65315 are both on-market 80-count labels with this panel and different UPCs, so no UPC was chosen. Missing UPC.`,
  ),
  row(
    'megared-b436-ultra-1000-30',
    'MegaRed Ultra Concentrate Krill Oil 1000 mg 30 Softgels',
    'megared-b436-ultra-1000-30',
    KRILL,
    'caution',
    `${BRAND}/megared-1000mg-ultra-concentrate-pro-omega-3-krill-oil-softgels/ is the ingredient panel. Size 30CT. Counted Limited: ethyl vanillin; sorbitol. No honest note. The page schema gtin is 020525996374 and DSLD 65538 prints 020525105264, so no UPC was chosen. Missing UPC.`,
  ),
  row(
    'megared-b436-4in1-500-25',
    'MegaRed Advanced 4in1 500 mg 25 Softgels',
    'megared-b436-4in1-500',
    FOUR,
    'avoid',
    `${BRAND}/megared-advanced-4in1-500mg/ is the ingredient panel. Size 25CT. Counted Limited: ethyl vanillin; caramel color; carmine color. No Avoid ingredient. The exact 3+ note is stored. DSLD 212926 omits natural on the tocopherols, so that UPC was not used. Missing UPC.`,
    undefined,
    T252U_STACK_NOTE,
  ),
  row(
    'megared-b436-4in1-500-40',
    'MegaRed Advanced 4in1 500 mg 40 Softgels',
    'megared-b436-4in1-500',
    FOUR,
    'avoid',
    `${BRAND}/megared-advanced-4in1-500mg/ is the ingredient panel. Size 40CT. Same other ingredients as the 25 count. DSLD 261926 matches and has no UPC. Missing UPC.`,
    undefined,
    T252U_STACK_NOTE,
  ),
  row(
    'megared-b436-4in1-500-80',
    'MegaRed Advanced 4in1 500 mg 80 Softgels',
    'megared-b436-4in1-500',
    FOUR,
    'avoid',
    `${BRAND}/megared-advanced-4in1-500mg/ is the ingredient panel. Size 80CT. Same other ingredients as the 25 count. DSLD 241068 omits natural on the tocopherols, so that UPC was not used. Missing UPC.`,
    undefined,
    T252U_STACK_NOTE,
  ),
  row(
    'megared-b436-4in1-900-40',
    'MegaRed Advanced 4in1 900 mg 40 Softgels',
    'megared-b436-4in1-900-40',
    NINE,
    'avoid',
    `${BRAND}/megared-advanced-4in1-900mg-40ct/ is the ingredient panel. Size 40CT. Avoid ingredients: Red 40; Blue 1. No 3+ note. DSLD 65563 matches this count. UPC 020525963994. The check digit passes.`,
    '020525963994',
  ),
  row(
    'megared-b436-6x-800-80',
    'MegaRed Advanced 6X 800 mg 80 Softgels',
    'megared-b436-6x-800-80',
    SIX,
    'avoid',
    `${BRAND}/megared-advanced-6x-better-absorption-800mg-softgels-omega-3-fish-oil-supplement/ is the ingredient panel. Size 80CT. Counted Limited: ethyl vanillin; sorbitol; caramel color. No Avoid ingredient. The exact 3+ note is stored. DSLD 241102 adds carmine color, so that UPC was not used. Missing UPC.`,
    undefined,
    T252U_STACK_NOTE,
  ),
];
