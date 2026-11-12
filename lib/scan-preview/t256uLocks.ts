import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { t138uGroup, T138U_EXPECTED_RISK } from './t138uTokenWhy';
import { t160uGrade } from './t160uLocks';
import { t162uGrade } from './t162uLocks';
import { t165uGrade } from './t165uLocks';
import { t166uGrade } from './t166uLocks';
import { t169uGrade } from './t169uLocks';
import { t225uLock } from './t225uLocks';
import { t240uLock, t240uNorm } from './t240uLocks';
import { t242uLock } from './t242uLocks';
import { t243uLock } from './t243uLocks';
import { t247uLock } from './t247uLocks';
import { t250uLock } from './t250uLocks';
import { t251uLock } from './t251uLocks';
import { t252uLock } from './t252uLocks';
import { t253uLock } from './t253uLocks';
import { t254uLock } from './t254uLocks';
import { t255uLock } from './t255uLocks';
import { cleanAliasGroup } from './cleanTokenWhy';
import { computeVerdictFromInactiveIngredients, ingredientCountsTowardLimitedStack } from './verdictFromFlags';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function fillWhy(name: string): string {
  return `${name}. It is used as a fill in the softgel. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).`;
}

const HEMP = fillWhy('organic Hempseed Oil');
const PUMPKIN = fillWhy('organic Styrian Pumpkin seed oil');

const OILS = new Map<string, string>([
  ['organic hempseed oil', HEMP],
  ['organic styrian pumpkin seed oil', PUMPKIN],
]);

const SOURCE: Record<string, (grade: RiskLevel) => string> = {
  t256u: (grade) => grade === 'moderate'
    ? 'Methodology §5 Caution (founder lock t256u). Does not count toward the t137u stack.'
    : 'Methodology §5 Cleared (founder lock t256u). Does not count toward the t137u stack.',
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

function tokenKey(name: string): string {
  return t240uNorm(name).split(' ').filter(Boolean).sort().join(' ');
}

/** Caution, no stack, only as a softgel fill. Any other form stays unlocked. */
export function t256uLock(name: string, form?: string): Lock | undefined {
  const key = tokenKey(name);
  const why = [...OILS.entries()].find(([label]) => tokenKey(label) === key)?.[1];
  if (!why) return undefined;
  if (!/\bsoftgel\b/.test((form ?? '').toLowerCase())) return undefined;
  return { grade: 'moderate', counts: false, why };
}

function founderLock(name: string, form?: string): { lock: Lock; mark: string } | undefined {
  const chain: Array<[Lock | undefined, string]> = [
    [t256uLock(name, form), 't256u'],
    [t255uLock(name, form), 't255u'],
    [t254uLock(name, form), 't254u'],
    [t253uLock(name, form), 't253u'],
    [t252uLock(name, form), 't252u'],
    [t251uLock(name, form), 't251u'],
    [t250uLock(name), 't250u'],
  ];
  const found = chain.find(([lock]) => lock);
  if (!found?.[0]) return undefined;
  return { lock: found[0], mark: found[1] };
}

function olderLock(name: string, form?: string): Lock | undefined {
  const prior = t247uLock(name) || t243uLock(name, form) || t242uLock(name, form) || t240uLock(name, form);
  if (prior) return { grade: prior.grade, counts: prior.counts, why: prior.why };
  const t225 = t225uLock(name);
  if (t225) return t225;
  const graded = t160uGrade(name) || t162uGrade(name) || t165uGrade(name) || t166uGrade(name) || t169uGrade(name);
  if (graded) return { grade: graded, counts: graded === 'limited' && !t160uGrade(name), why: '' };
  if (cleanAliasGroup(name)) return { grade: 'cleared', counts: false, why: '' };
  const group = t138uGroup(name);
  if (group) {
    const grade = T138U_EXPECTED_RISK[group];
    return { grade, counts: grade === 'limited', why: '' };
  }
  return undefined;
}

function exactLock(name: string, form?: string): { lock: Lock; mark: string } | undefined {
  return founderLock(name, form) ?? (olderLock(name, form) ? { lock: olderLock(name, form)!, mark: 'stored' } : undefined);
}

/** Spelling and punctuation only. An added or dropped word is not a variant. */
export function t256uSpellingVariants(name: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>([name]);
  const add = (value: string) => {
    const next = value.replace(/\s+/g, ' ').trim();
    if (!next || seen.has(next)) return;
    seen.add(next);
    out.push(next);
  };
  add(name.replace(/glycerine/gi, 'glycerin'));
  add(name.replace(/glycerin(?!e)/gi, 'glycerine'));
  add(name.replace(/\bparticulates\b/gi, 'particulate'));
  add(name.replace(/\bparticulate\b/gi, 'particulates'));
  add(name.replace(/\(tm\)/gi, ' ').replace(/™/g, ' ').replace(/\btm\b/gi, ' '));
  add(name.replace(/\b([A-Za-z]{4,})s\b/g, '$1'));
  const words = name.split(/\s+/);
  words.forEach((word, index) => {
    if (!/^[A-Za-z]{4,}$/.test(word) || /s$/i.test(word)) return;
    const copy = [...words];
    copy[index] = `${word}s`;
    add(copy.join(' '));
  });
  add(
    name
      .replace(/glycerine/gi, 'glycerin')
      .replace(/\bparticulates\b/gi, 'particulate')
      .replace(/\(tm\)/gi, ' ')
      .replace(/™/g, ' ')
      .replace(/\btm\b/gi, ' ')
      .replace(/\b([A-Za-z]{4,})s\b/g, '$1'),
  );
  return out;
}

function isoflavoneSplit(name: string, panel: string[]): { lock: Lock; mark: string } | undefined {
  const key = t240uNorm(name);
  if (key !== 'isoflavones' && key !== 'saponins soy') return undefined;
  const norms = new Set(panel.map((item) => t240uNorm(item)));
  if (!norms.has('isoflavones') || !norms.has('saponins soy')) return undefined;
  const lock = t254uLock('isoflavones and saponins (Soy)');
  if (!lock) return undefined;
  return { lock, mark: 't254u' };
}

export type T256uHit = { lock: Lock; mark: string; via: 'exact' | 'variant' | 'split'; from?: string };

/** Existing locks, plus spelling variants. The two oils match only as a softgel fill. */
export function t256uResolve(name: string, form?: string, panel: string[] = []): T256uHit | undefined {
  const exact = exactLock(name, form);
  if (exact) return { ...exact, via: 'exact' };
  const split = isoflavoneSplit(name, panel);
  if (split) return { ...split, via: 'split' };
  for (const variant of t256uSpellingVariants(name)) {
    const hit = exactLock(variant, form);
    if (!hit) continue;
    if (hit.mark === 't256u') continue;
    return { ...hit, via: 'variant', from: variant };
  }
  return undefined;
}

/** Barlean's batch417 only. Other brands keep their stored grades. */
export function applyT256uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('barleans-b417-')) return record;
  const panel = record.inactiveIngredients.map((ingredient) => ingredient.name);
  let changed = false;
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const hit = t256uResolve(ingredient.name, record.form, panel);
    if (!hit || hit.mark === 'stored' || !SOURCE[hit.mark]) return ingredient;
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
  const counted = inactiveIngredients.filter((ingredient) => ingredientCountsTowardLimitedStack(ingredient)).length;
  if (counted >= 3) {
    delete next.honestNote;
    delete next.founderHonestNote;
    return next;
  }
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}

if (t256uLock('organic Hempseed Oil', 'softgel')?.grade !== 'moderate') throw new Error('t256u hemp');
if (t256uLock('organic Hempseed Oil', 'softgel')?.counts !== false) throw new Error('t256u hemp count');
if (!t256uLock('organic Hempseed Oil', 'softgel')?.why.startsWith('organic Hempseed Oil. It is used as a fill in the softgel.')) {
  throw new Error('t256u hemp why');
}
if (t256uLock('organic Hempseed Oil', 'liquid')) throw new Error('t256u hemp liquid');
if (t256uLock('organic Styrian Pumpkin seed oil', 'softgel')?.why !== PUMPKIN) throw new Error('t256u pumpkin');
if (t256uLock('organic Styrian Pumpkin seed oil', 'liquid')) throw new Error('t256u pumpkin liquid');
if (t256uLock('organic Styrian Pumpkin seed oil', 'capsule')) throw new Error('t256u pumpkin capsule');
if (t256uLock('Styrian Pumpkin seed oil', 'softgel')) throw new Error('t256u bare pumpkin');
if (t256uResolve('Softgel (Gelatin, Glycerine, Water)', 'softgel')?.lock.why !== t251uLock('Softgel (Gelatin, Glycerine, Water)', 'softgel')?.why) {
  throw new Error('t256u glycerine softgel');
}
if (t256uResolve('Softgel (Gelatin, Glycerin, Water)', 'softgel')?.via !== 'exact') throw new Error('t256u glycerin already locked');
if (t256uResolve('flaxseed particulates', 'softgel')?.lock.why !== t251uLock('flaxseed particulate', 'softgel')?.why) {
  throw new Error('t256u particulates');
}
if (t256uResolve('Isoflavones', 'softgel', ['Isoflavones']) ) throw new Error('t256u isoflavones alone');
if (t256uResolve('Isoflavones', 'softgel', ['Isoflavones', 'Saponins (Soy)'])?.lock.why !== t254uLock('isoflavones and saponins (Soy)')?.why) {
  throw new Error('t256u isoflavone split');
}
if (t256uResolve('organic Flax', 'powder')) throw new Error('t256u organic flax');
if (t256uResolve('Softgel (Caramel color, Gelatin, Glycerine, Sorbitol Sorbitan solution, Water)', 'softgel')?.via === 'variant') {
  throw new Error('t256u caramel softgel is already an exact lock');
}
