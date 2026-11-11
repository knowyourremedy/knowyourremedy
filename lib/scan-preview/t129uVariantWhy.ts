import type { RatingRecord } from '../ratingRecord';
import { isT125uBareShellName } from './t125uBareShell';
import {
  T128U_MALTODEXTRIN_WHY,
  T128U_MCT_WHY,
  T128U_NATURAL_FLAVOR_WHY,
  T128U_SILICA_WHY,
  T128U_SORBITOL_WHY,
  t128uTokenKey,
} from './t128uTokenWhy';

export type T129uFamily = 'silica' | 'mct' | 'natural flavor' | 'sorbitol' | 'maltodextrin';

const FAMILY_WHY: Record<T129uFamily, string> = {
  silica: T128U_SILICA_WHY,
  mct: T128U_MCT_WHY,
  'natural flavor': T128U_NATURAL_FLAVOR_WHY,
  sorbitol: T128U_SORBITOL_WHY,
  maltodextrin: T128U_MALTODEXTRIN_WHY,
};

const SILICA_WORDS = new Set([
  'colloidal', 'anhydrous', 'hydrated', 'silicon', 'dioxide', 'silica', 'sio2', 'anticaking', 'anti', 'caking', 'agent',
]);
const MCT_WORDS = new Set([
  'mct', 'medium', 'middle', 'chain', 'triglyceride', 'triglycerides', 'oil', 'oils', 'organic', 'coconut',
  'fractionated', 'palm', 'kernel', 'rapeseed', 'vegetable', 'named', 'unlabeled', 'source', 'not', 'from',
  'derived', 'and',
]);
const MALTO_WORDS = new Set([
  'maltodextrin', 'from', 'derived', 'non', 'gmo', 'corn', 'maize', 'tapioca', 'potato', 'rice', 'organic', 'powder',
]);
const SORBITOL_WORDS = new Set(['sorbitol', 'solution', 'usp', '70', '70%']);

function tokenText(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™¹²³⁴⁵⁶⁷⁸⁹⁰]/g, '')
    .replace(/[‐‑–—-]/g, ' ')
    .replace(/&/g, ' ')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9%]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordsOf(name: string): string[] {
  const text = tokenText(name);
  return text ? text.split(' ') : [];
}

function allowed(words: string[], allow: Set<string>): boolean {
  return words.length > 0 && words.every((word) => allow.has(word));
}

/** Named excludes stay on their old why. */
export function t129uIsExcluded(name: string): boolean {
  const text = tokenText(name);
  if (/\bsorbitol\b/.test(text) && (/\bsorbitan\b|\bspecial\b|\bmannitol\b/.test(text))) return true;
  if (/digestion resistant maltodextrin/.test(text)) return true;
  if (/\bsilica 6x\b|\bdimethyl silylate\b|\bsilica gel\b|\bsilica mineral\b/.test(text)) return true;
  if (/\bbamboo\b/.test(text) && /\bsilica\b/.test(text)) return true;
  if (/\b(caprylic|capric)\b/.test(text) && /\btriglycerides?\b/.test(text)) return true;
  if (/\bacacia\b/.test(text) && /\b(mct|triglycerides?)\b/.test(text)) return true;
  if (/modified coconut/.test(text)) return true;
  if (/\bcoating\b/.test(text) && /\b(mct|triglycerides?)\b/.test(text)) return true;
  if (/\bartificial\b/.test(text) && /\bnatural flavors?\b/.test(text)) return true;
  if (/\bnatural flavors?\b/.test(text) && /\b(menthol|essential|citral|oil|oils|extract)\b/.test(text)) return true;
  if (/\bcashew\b/.test(text) && /\bmaltodextrin\b/.test(text)) return true;
  if (/clean tablet/.test(text)) return true;
  if (/organic coating/.test(text)) return true;
  if (/\bdextrose\b/.test(text) && /\bnatural flavors?\b/.test(text)) return true;
  if (/vegetable capsule/.test(text) && /modified cellulose/.test(text)) return true;
  return false;
}

function silicaFamily(name: string): boolean {
  const text = tokenText(name);
  if (/bamboo|6x|dimethyl|silylate|\bgel\b|\bmineral\b|silicate|silicone|\bcapsule\b/.test(text)) return false;
  const words = wordsOf(name);
  if (!allowed(words, SILICA_WORDS)) return false;
  return words.includes('silica') || (words.includes('silicon') && words.includes('dioxide'));
}

function mctFamily(name: string): boolean {
  const text = tokenText(name);
  if (/\b(caprylic|capric|acacia)\b|\bmodified coconut\b|\bcoating\b|\bpowder\b/.test(text)) return false;
  const words = wordsOf(name);
  if (!allowed(words, MCT_WORDS)) return false;
  if (words.includes('mct')) return true;
  return words.some((word) => word === 'medium' || word === 'middle') && words.some((word) => word.startsWith('triglyceride'));
}

function maltodextrinFamily(name: string): boolean {
  const text = tokenText(name);
  if (/digestion|resistant|cashew|coating|dextrose|lecithin|guar|\bblend\b|tablet/.test(text)) return false;
  const words = wordsOf(name);
  if (!words.includes('maltodextrin') || !allowed(words, MALTO_WORDS)) return false;
  return true;
}

function sorbitolFamily(name: string): boolean {
  const text = tokenText(name);
  if (/sorbitan|mannitol|\bspecial\b/.test(text)) return false;
  const words = wordsOf(name);
  return words.includes('sorbitol') && allowed(words, SORBITOL_WORDS);
}

function naturalFlavorFamily(name: string): boolean {
  const text = tokenText(name);
  if (!/\bnatural flavors?\b/.test(text)) return false;
  if (/\bartificial\b|\bmenthol\b|\bessential\b|\bcitral\b|\boils?\b|\bextract\b|\bdextrose\b|\bcapsule\b|\bcoating\b|\bcashew\b|\btablet\b|\bguar\b|\blecithin\b/.test(text)) {
    return false;
  }
  return true;
}

/** Variant family for a non-exact name. Exact t128 names and excludes return undefined. */
export function t129uFamily(name: string): T129uFamily | undefined {
  if (isT125uBareShellName(name) || t128uTokenKey(name) || t129uIsExcluded(name)) return undefined;
  if (silicaFamily(name)) return 'silica';
  if (mctFamily(name)) return 'mct';
  if (maltodextrinFamily(name)) return 'maltodextrin';
  if (sorbitolFamily(name)) return 'sorbitol';
  if (naturalFlavorFamily(name)) return 'natural flavor';
  return undefined;
}

export function t129uWhyForName(name: string): string | undefined {
  const family = t129uFamily(name);
  return family ? FAMILY_WHY[family] : undefined;
}

/** Stored why only. Notes, grades, Clean rows, and bare shells stay as they are. */
export function applyT129uVariantWhy(record: RatingRecord): RatingRecord {
  if (record.verdict === 'clean') return record;
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const why = t129uWhyForName(ingredient.name);
    if (!why || ingredient.why === why) return ingredient;
    changed = true;
    return { ...ingredient, why };
  });
  if (!changed) return record;
  return { ...record, inactiveIngredients };
}

const MUST_MATCH: Array<[string, T129uFamily]> = [
  ['Colloidal silicon dioxide', 'silica'],
  ['hydrated silica', 'silica'],
  ['Silicon dioxide (silica)', 'silica'],
  ['Silica (silicon dioxide)', 'silica'],
  ['Silicon dioxide (SiO2)', 'silica'],
  ['Silicon dioxide (colloidal)', 'silica'],
  ['Silicon Dioxide (Anticaking Agent)', 'silica'],
  ['Silica / silicon dioxide', 'silica'],
  ['Silicon dioxide / silica', 'silica'],
  ['colloidal anhydrous silica', 'silica'],
  ['colloidal silica', 'silica'],
  ['MCT oil', 'mct'],
  ['Organic MCT oil', 'mct'],
  ['Coconut MCT oil', 'mct'],
  ['Medium-chain triglycerides', 'mct'],
  ['Organic medium chain triglycerides', 'mct'],
  ['Medium chain triglycerides from coconut oil', 'mct'],
  ['Medium chain triglycerides (derived from palm kernel oil)', 'mct'],
  ['Medium chain triglycerides (source not named)', 'mct'],
  ['Medium Chain Triglycerides (vegetable)', 'mct'],
  ['MCT (unlabeled source)', 'mct'],
  ['MCT (named coconut/palm kernel)', 'mct'],
  ['MCT (from Fractionated Coconut Oil)', 'mct'],
  ['Coconut (MCT) oil', 'mct'],
  ['MCT oil (medium chain triglycerides)', 'mct'],
  ['Medium chain triglyceride oil', 'mct'],
  ['Natural Cherry Flavor with other Natural Flavors', 'natural flavor'],
  ['Natural Flavor (Raspberry)', 'natural flavor'],
  ['Natural Flavors (Blackberry, Raspberry, Strawberry)', 'natural flavor'],
  ['Organic natural flavors', 'natural flavor'],
  ['Natural flavors blend', 'natural flavor'],
  ['Natural flavors blend (orange and vanilla)', 'natural flavor'],
  ['Raspberry natural flavor', 'natural flavor'],
  ['Natural Grape Flavor with other Natural Flavors (milk)', 'natural flavor'],
  ['Peach Flavors with other Natural Flavors (Soy)', 'natural flavor'],
  ['other Natural Flavors (milk, soy)', 'natural flavor'],
  ['Sorbitol solution', 'sorbitol'],
  ['Sorbitol 70% solution', 'sorbitol'],
  ['sorbitol 70% solution USP', 'sorbitol'],
  ['Maltodextrin (from Non-GMO Corn)', 'maltodextrin'],
  ['Maltodextrin (organic)', 'maltodextrin'],
  ['Non-GMO Maltodextrin', 'maltodextrin'],
  ['organic tapioca maltodextrin', 'maltodextrin'],
  ['Tapioca maltodextrin', 'maltodextrin'],
  ['rice maltodextrin', 'maltodextrin'],
  ['maize maltodextrin', 'maltodextrin'],
  ['Maltodextrin Powder', 'maltodextrin'],
  ['Potato Maltodextrin', 'maltodextrin'],
];

for (const [name, family] of MUST_MATCH) {
  if (t129uFamily(name) !== family || t129uWhyForName(name) !== FAMILY_WHY[family]) {
    throw new Error(`t129u missed ${name}`);
  }
}

for (const name of [
  'Sorbitol sorbitan solution',
  'sorbitol special',
  'Sorbitol or mannitol',
  'Digestion-resistant maltodextrin',
  'Silica 6x',
  'Silica dimethyl silylate',
  'silica gel',
  'silica mineral',
  'Silica (from Bamboo Shoot Extract)',
  'Bamboo Leaf Extract (Silica)',
  'Caprylic/capric triglyceride (unlabeled MCT)',
  'MCT Oil (Medium Chain Triglyceride, Acacia Gum)',
  'Medium Chain Triglycerides Powder (MCT Oil, Gum Acacia)',
  'Medium chain triglycerides (modified coconut oil)',
  'Medium chain triglyceride (MCT) (coating)',
  'Artificial and natural flavors',
  'natural flavors (menthol, vanilla, peppermint, and spearmint essential oils, and citral)',
  'Natural flavors (lemon oil, ginger extract)',
  'Natural flavor (organic orange oil)',
  'Organic Cashew Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin)',
  'Clean tablet technology blend (organic dextrose, organic tapioca maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  'Organic coating (organic tapioca maltodextrin, organic sunflower lecithin, organic palm oil, organic guar gum)',
  'Organic Natural Flavor (Organic Dextrose and Natural Flavors)',
  'Vegetable capsule (modified cellulose, water)',
  'Vegetable Capsule',
  'Calcium Silicate',
  'goMCT®',
  'Natural Lemon Flavor',
  'Silica',
  'Maltodextrin',
  'Sorbitol',
]) {
  if (t129uWhyForName(name)) throw new Error(`t129u over-matched ${name}`);
}
