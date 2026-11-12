import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t256uResolve, t256uSpellingVariants } from './t256uLocks';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function nutrient(name: string): string {
  return `${name}. It is added for its nutrient compounds.`;
}
function plant(name: string): string {
  return `${name}. It is added for its plant compounds.`;
}
function fiber(name: string): string {
  return `${name}. It is added for its plant compounds or fiber.`;
}
function juice(name: string): string {
  return `${name}. It is added for color and plant compounds.`;
}
function fishFill(name: string): string {
  return `${name}. It is used as a fill or added for its oil compounds. Fish oil is graded Cleared as a named oil fill.`;
}
function fishConc(fish: string): string {
  return `Fish oil concentrate from ${fish}. It is used as a fill or carrier. Fish oil is graded Cleared as a named oil fill.`;
}
function baseWhy(name: string): string {
  return `${name}. It is the base of this product (or used as a coating). ${name} is graded Limited when it is the base of the product or a surface coating, and Caution when it is only a fill (highly processed oil; EFSA and FDA treat refined seed and coconut oils as distinct from whole-food oils).`;
}
function fillWhy(name: string): string {
  return `${name}. It is used as a fill in the softgel. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).`;
}
function soyWhy(name: string): string {
  return `${name}. It is added for its plant compounds. Soy phospholipid concentrate and plant sterols are graded Limited as processed soy or plant extracts (EFSA and FDA treat refined soy fractions as distinct from whole soy).`;
}

const PUMPKIN_POWDER = 'Pumpkin powder. It is added for its plant compounds.';
const LEMONADE = 'Natural lemonade flavoring. It adds lemonade taste to the product.';
const MALTO = 'Maltodextrin. It is used as a filler. Maltodextrin is graded Limited because it is a highly processed starch (EFSA 2018).';
const PEA = 'Pea protein. It is used as a protein filler. Pea protein is graded Limited as a processed plant protein (EFSA and FDA treat isolated plant proteins as distinct from whole peas).';
const CARRAGEENAN = 'Carrageenan. It is used as a thickener. Carrageenan is graded Limited as a processed seaweed extract (EFSA 2018 re-evaluation).';
const ANNATTO = 'Annatto extract. It is used as a color. Annatto extract is graded Limited as a processed color (EFSA and FDA treat annatto extract as a refined color).';
const CANE = 'Evaporated cane. It is used as a sweetener. Evaporated cane is graded Limited as a processed sugar (FDA and EFSA treat refined cane products as processed sweeteners).';
const FLAVORS = 'Organic flavors. It adds flavor to the product. Organic flavors are graded Limited because the exact sources and processing are not fully specified on the panel (FDA 21 CFR 101.22).';
const SORBITOL = 'Sorbitol sorbitan solution. It is used as a plasticizer in the softgel. Sorbitol is graded Limited as a sugar alcohol (FDA 21 CFR 184.1835).';

const FISH_ANCH = fishConc('anchovy, mackerel, and sardine');
const FISH_TUNA = fishConc('anchovy, sardine, and tuna');
const FISH_COD = fishConc('cod');

function keyOf(name: string): string {
  return t240uNorm(name);
}

const FISH_KEYS = new Map<string, string>([
  [keyOf('molecularly distilled Fish Oil Concentrate (Anchovy, Mackerel, Sardine)'), FISH_ANCH],
  [keyOf('pharmaceutical grade, molecularly distilled Fish Oil concentrate (Anchovy, Mackerel, Sardine)'), FISH_ANCH],
  [keyOf('purified Fish Oil (Anchovy, Sardine, Tuna)'), FISH_TUNA],
  [keyOf('Pure & pristine, molecularly distilled, pharmaceutical grade Cod Liver Oil (deep-sea, cold water Icelandic cod)'), FISH_COD],
]);

const CLEARED = new Map<string, string>([
  [keyOf('Vitamin E'), nutrient('Vitamin E')],
  [keyOf('Vitamin E TPGS'), nutrient('Vitamin E TPGS')],
  [keyOf('Vitamin D3'), nutrient('Vitamin D3')],
  [keyOf('Ubiquinone'), nutrient('Ubiquinone')],
  [keyOf('organic Rosemary extract'), plant('organic Rosemary extract')],
  [keyOf('Green Tea'), plant('Green Tea')],
  [keyOf('Sage Extract'), plant('Sage Extract')],
  [keyOf('Maca extract 4:1'), plant('Maca extract 4:1')],
  [keyOf('decaffeinated Coffee extract'), plant('decaffeinated Coffee extract')],
  [keyOf('decaffeinated Coffee powder'), plant('decaffeinated Coffee powder')],
  [keyOf('Acai Extract'), plant('Acai Extract')],
  [keyOf('Acai extract 4:1'), plant('Acai extract 4:1')],
  [keyOf('organic Flax'), fiber('organic Flax')],
  [keyOf('Flaxseed'), fiber('Flaxseed')],
  [keyOf('Flaxseed SDG'), fiber('Flaxseed SDG')],
  [keyOf('Flaxseed SDG Lignan'), fiber('Flaxseed SDG Lignan')],
  [keyOf('Chia'), fiber('Chia')],
  [keyOf('Coconut'), fiber('Coconut')],
  [keyOf('Quinoa'), fiber('Quinoa')],
  [keyOf('Red Beet'), fiber('Red Beet')],
  [keyOf('Cloves'), fiber('Cloves')],
  [keyOf('Clove'), fiber('Clove')],
  [keyOf('Hops'), fiber('Hops')],
  [keyOf('Mint'), fiber('Mint')],
  [keyOf('Pepper'), fiber('Pepper')],
  [keyOf('Allspice'), fiber('Allspice')],
  [keyOf('Cinnamon'), fiber('Cinnamon')],
  [keyOf('Ginger'), fiber('Ginger')],
  [keyOf('Nutmeg'), fiber('Nutmeg')],
  [keyOf('organic Acai'), fiber('organic Acai')],
  [keyOf('Acerola'), fiber('Acerola')],
  [keyOf('Camu Camu'), fiber('Camu Camu')],
  [keyOf('Blueberry'), fiber('Blueberry')],
  [keyOf('Raspberry powders'), fiber('Raspberry powders')],
  [keyOf('organic Strawberry'), fiber('organic Strawberry')],
  [keyOf('Fruit juice'), juice('Fruit juice')],
  [keyOf('Blackberry Juice'), juice('Blackberry Juice')],
  [keyOf('Blueberry juice concentrate'), juice('Blueberry juice concentrate')],
  [keyOf('natural Lemonade flavoring'), LEMONADE],
  [keyOf('Salmon'), fishFill('Salmon')],
  [keyOf('Cod Liver Oil'), fishFill('Cod Liver Oil')],
  [keyOf('Salmon Oil'), fishFill('Salmon Oil')],
  [keyOf('Pumpkin'), PUMPKIN_POWDER],
  [keyOf('Powder'), PUMPKIN_POWDER],
]);

const LIMITED = new Map<string, string>([
  [keyOf('organic Hemp stalk Oil'), baseWhy('organic Hemp stalk Oil')],
  [keyOf('Medium Chain Triglyceride Oil'), baseWhy('Medium Chain Triglyceride Oil')],
  [keyOf('Medium Chain Triglycerides (MCT) Oil'), baseWhy('Medium Chain Triglycerides (MCT) Oil')],
  [keyOf('Soy Phospholipid concentrate'), soyWhy('Soy Phospholipid concentrate')],
  [keyOf('Plant Sterols'), soyWhy('Plant Sterols')],
  [keyOf('Maltodextrin'), MALTO],
  [keyOf('Pea Protein'), PEA],
  [keyOf('Carrageenan'), CARRAGEENAN],
  [keyOf('Annatto extract'), ANNATTO],
  [keyOf('evaporated Cane'), CANE],
  [keyOf('organic Flavors'), FLAVORS],
  [keyOf('Sorbitol Sorbitan solution'), SORBITOL],
]);

const QUALIFIED = new Map<string, { name: string; bases: Array<'liquid' | 'gummy'> }>([
  [keyOf('organic Hempseed Oil'), { name: 'organic Hempseed Oil', bases: ['liquid'] }],
  [keyOf('Styrian Pumpkin seed oil'), { name: 'Styrian Pumpkin seed oil', bases: ['liquid'] }],
  [keyOf('Flaxseed Oil'), { name: 'Flaxseed Oil', bases: ['liquid', 'gummy'] }],
  [keyOf('unrefined and unfiltered organic 100% Flaxseed Oil'), { name: 'unrefined and unfiltered organic 100% Flaxseed Oil', bases: ['liquid'] }],
]);

const DUAL = new Map<string, string>([
  [keyOf('Canola Oil'), 'Canola Oil'],
  [keyOf('Palm Oil'), 'Palm Oil'],
  [keyOf('Palm Kernel Oil'), 'Palm Kernel Oil'],
  [keyOf('Palm Kernel'), 'Palm Kernel'],
]);

function productKind(form?: string): 'softgel' | 'liquid' | 'gummy' | 'other' {
  const text = (form ?? '').toLowerCase();
  if (/\bsoftgel\b/.test(text)) return 'softgel';
  if (/\bliquid\b/.test(text)) return 'liquid';
  if (/\bgummy\b/.test(text)) return 'gummy';
  return 'other';
}

function fromKey(key: string, form?: string): Lock | undefined {
  const fish = FISH_KEYS.get(key);
  if (fish) return { grade: 'cleared', counts: false, why: fish };
  const qualified = QUALIFIED.get(key);
  if (qualified) {
    const kind = productKind(form);
    if (kind === 'softgel') return { grade: 'moderate', counts: false, why: fillWhy(qualified.name) };
    if (qualified.bases.includes(kind as 'liquid' | 'gummy')) {
      return { grade: 'limited', counts: true, why: baseWhy(qualified.name) };
    }
    return undefined;
  }
  const dual = DUAL.get(key);
  if (dual) {
    if (productKind(form) === 'softgel') return { grade: 'moderate', counts: false, why: fillWhy(dual) };
    return { grade: 'limited', counts: true, why: baseWhy(dual) };
  }
  const limited = LIMITED.get(key);
  if (limited) return { grade: 'limited', counts: true, why: limited };
  const cleared = CLEARED.get(key);
  if (cleared) return { grade: 'cleared', counts: false, why: cleared };
  return undefined;
}

/** Barlean's batch418 only. Exact strings, plus spelling and punctuation variants. */
export function t259uLock(name: string, form?: string): Lock | undefined {
  const exact = fromKey(keyOf(name), form);
  if (exact) return exact;
  for (const variant of t256uSpellingVariants(name)) {
    const hit = fromKey(keyOf(variant), form);
    if (hit) return hit;
  }
  return undefined;
}

const FISH_SPECIES = new Set(['anchovy', 'mackerel', 'sardine', 'tuna', 'pollock', 'hake', 'salmon', 'menhaden', 'cod', 'herring']);

function isDescriptor(part: string): boolean {
  return /deep-sea|cold water|icelandic|pharmaceutical|distilled|pristine|molecular|ultra-purif|\bgrade\b/i.test(part);
}

/** Listed ingredients inside a blend or wrapper. The four fish-oil strings stay whole. */
export function t259uPieces(name: string): string[] {
  if (FISH_KEYS.has(keyOf(name))) return [name];
  if (keyOf(name) === 'pumpkin powder') return ['Pumpkin', 'Powder'];
  const start = name.indexOf('(');
  if (start < 0) return [name];
  let depth = 0;
  let listStart = -1;
  let inner: string[] | undefined;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === '(') {
      if (depth === 0) listStart = i + 1;
      depth++;
    } else if (name[i] === ')') {
      depth--;
      if (depth === 0 && listStart >= 0) {
        const body = name.slice(listStart, i);
        if (body.includes(',')) {
          const parts: string[] = [];
          let part = '';
          let innerDepth = 0;
          for (const char of body) {
            if (char === '(') innerDepth++;
            if (char === ')') innerDepth--;
            if (char === ',' && innerDepth === 0) {
              parts.push(part.trim());
              part = '';
            } else part += char;
          }
          parts.push(part.trim());
          const cleaned = parts.filter(Boolean);
          if (cleaned.length >= 2) inner = cleaned;
        }
        listStart = -1;
      }
    }
  }
  if (!inner) return [name];
  const species = inner.every((part) => FISH_SPECIES.has(part.toLowerCase().replace(/[^a-z ]/g, '').trim()));
  if (species && /\bfish oil\b|\bcod liver\b/i.test(name)) return [name];
  if (inner.every(isDescriptor)) return [name];
  const wrapper = /\bblend\b|softgel|freshlok|\bcontains\b|^antioxidant\b/i.test(name);
  if (wrapper || inner.length >= 2) return inner;
  return [name];
}

const SOURCE: Record<string, (grade: RiskLevel) => string> = {
  t259u: (grade) => grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t259u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t259u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t259u). Does not count toward the t137u stack.',
  t256u: () => 'Methodology §5 Caution (founder lock t256u). Does not count toward the t137u stack.',
  t255u: (grade) => grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t255u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t255u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t255u). Does not count toward the t137u stack.',
  t254u: (grade) => grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t254u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t254u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t254u). Does not count toward the t137u stack.',
  t253u: () => 'Methodology §5 Caution (founder lock t253u). Does not count toward the t137u stack.',
  t252u: (grade) => grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t252u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t252u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t252u). Does not count toward the t137u stack.',
  t251u: (grade) => grade === 'limited'
    ? 'Methodology §5 Limited (founder lock t251u). Counts toward the 3+ Limited stack.'
    : grade === 'moderate'
      ? 'Methodology §5 Caution (founder lock t251u). Does not count toward the t137u stack.'
      : 'Methodology §5 Cleared (founder lock t251u). Does not count toward the t137u stack.',
  t250u: () => 'Methodology §5 Caution (founder lock t250u). Does not count toward the t137u stack.',
};

/** Individual ingredients only. A blend string is not graded as one token. */
export function t259uGrade(name: string, form?: string, panel: string[] = []): { lock: Lock; mark: string } | undefined {
  if (/\bblend\b/i.test(name) || /^antioxidant\b/i.test(name) || /^softgel\b/i.test(name) || /freshlok/i.test(name)) {
    return undefined;
  }
  const own = t259uLock(name, form);
  if (own) return { lock: own, mark: 't259u' };
  const hit = t256uResolve(name, form, panel);
  if (!hit || hit.mark === 'stored') {
    if (!hit) return undefined;
    return { lock: hit.lock, mark: hit.mark };
  }
  return { lock: hit.lock, mark: hit.mark };
}

/** Barlean's batch418 only. Other brands keep their stored grades. */
export function applyT259uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b418-')) return record;
  const panel = record.inactiveIngredients.map((ingredient) => ingredient.name);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const hit = t259uGrade(ingredient.name, record.form, panel);
    if (!hit || !SOURCE[hit.mark]) return ingredient;
    const own = hit.lock;
    const exempt = !own.counts;
    const stamp = SOURCE[hit.mark](own.grade);
    const source = (ingredient.source ?? '').includes(`founder lock ${hit.mark}`)
      ? ingredient.source
      : `${ingredient.source ?? 'Panel'}; ${stamp}`;
    if (
      ingredient.riskLevel === own.grade
      && ingredient.stackCountExempt === exempt
      && ingredient.why === own.why
      && source === ingredient.source
    ) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: own.grade, stackCountExempt: exempt, why: own.why, source };
  });
  const next: RatingRecord = changed
    ? {
        ...record,
        inactiveIngredients,
        verdict: computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag).verdict,
      }
    : { ...record, inactiveIngredients };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t259uLock('Vitamin E')?.why !== nutrient('Vitamin E')) throw new Error('t259u vitamin e');
if (t259uLock('Vitamin E')?.counts !== false) throw new Error('t259u vitamin count');
if (t259uLock('organic Acai powder')) throw new Error('t259u acai powder mismatch');
if (t259uLock('organic Acerola powder')) throw new Error('t259u acerola mismatch');
if (t259uLock('organic Camu Camu powder')) throw new Error('t259u camu mismatch');
if (t259uLock('organic Blueberry powder')) throw new Error('t259u blueberry mismatch');
if (t259uLock('organic Raspberry powder')) throw new Error('t259u raspberry mismatch');
if (t259uLock('organic Acai')?.why !== fiber('organic Acai')) throw new Error('t259u acai');
if (t259uLock('organic Strawberry')?.grade !== 'cleared') throw new Error('t259u strawberry');
if (t259uLock('Flaxseed Oil', 'liquid')?.counts !== true) throw new Error('t259u flax liquid');
if (t259uLock('Flaxseed Oil', 'gummy')?.grade !== 'limited') throw new Error('t259u flax gummy');
if (t259uLock('Flaxseed Oil', 'softgel')?.grade !== 'moderate') throw new Error('t259u flax softgel');
if (t259uLock('Flaxseed Oil', 'softgel')?.counts !== false) throw new Error('t259u flax softgel count');
if (t259uLock('Flaxseed Oil', 'powder')) throw new Error('t259u flax powder');
if (t259uLock('organic Hempseed Oil', 'liquid')?.counts !== true) throw new Error('t259u hemp liquid');
if (t259uLock('organic Hempseed Oil', 'softgel')?.grade !== 'moderate') throw new Error('t259u hemp softgel');
if (t259uLock('organic Hempseed Oil', 'capsule')) throw new Error('t259u hemp capsule');
if (t259uLock('Styrian Pumpkin seed oil', 'liquid')?.counts !== true) throw new Error('t259u styrian liquid');
if (t259uLock('Styrian Pumpkin seed oil', 'softgel')?.grade !== 'moderate') throw new Error('t259u styrian softgel');
if (t259uLock('Styrian Pumpkin seed oil', 'gummy')) throw new Error('t259u styrian gummy');
if (t259uLock('Canola Oil', 'softgel')?.grade !== 'moderate') throw new Error('t259u canola softgel');
if (t259uLock('Canola Oil', 'liquid')?.counts !== true) throw new Error('t259u canola liquid');
if (t259uLock('Palm Oil', 'gummy')?.counts !== true) throw new Error('t259u palm gummy');
if (t259uLock('Palm Kernel', 'liquid')?.counts !== true) throw new Error('t259u palm kernel');
if (t259uLock('Medium Chain Triglycerides (MCT) Oil', 'softgel')?.counts !== true) throw new Error('t259u mct');
if (t259uLock('Sorbitol Sorbitan solution')?.why !== SORBITOL) throw new Error('t259u sorbitol');
if (t259uLock('Sorbitol Sorbitan solution')?.counts !== true) throw new Error('t259u sorbitol count');
if (!t259uLock('molecularly distilled Fish Oil Concentrate (Anchovy, Mackerel, Sardine)')?.why.includes('anchovy, mackerel, and sardine')) {
  throw new Error('t259u fish anchovy');
}
if (!t259uLock('Pure & pristine, molecularly distilled, pharmaceutical grade Cod Liver Oil (deep-sea, cold water Icelandic cod)')?.why.includes('from cod.')) {
  throw new Error('t259u fish cod');
}
if (t259uLock('Pumpkin')?.why !== PUMPKIN_POWDER) throw new Error('t259u pumpkin');
if (t259uLock('Total Omega Oil Blend (Borage Oil, Fish Oil, Flaxseed Oil)')) throw new Error('t259u blend');
if (t259uPieces('Total Omega Oil Blend (Borage Oil, Fish Oil, Flaxseed Oil)').join('|') !== 'Borage Oil|Fish Oil|Flaxseed Oil') {
  throw new Error('t259u split blend');
}
if (t259uPieces('molecularly distilled Fish Oil Concentrate (Anchovy, Mackerel, Sardine)').length !== 1) {
  throw new Error('t259u keep fish string');
}
