import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t362uResolve } from './t362uLocks';

const WHY = 'Pacran cranberry concentrate powder is a concentrated cranberry extract. It is included for its plant compounds.';
const CORE = ['concentrate', 'cranberry', 'pacran', 'powder'];

function coreWords(name: string): string[] {
  let text = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = text.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => (
      /^\s*as\s+/i.test(inner) ? full : ' '
    ));
    if (next === text) break;
    text = next;
  }
  return t240uNorm(text).split(' ').filter(Boolean).sort();
}

function isPacranConcentrate(name: string): boolean {
  const words = coreWords(name);
  return words.length === CORE.length && words.every((word, index) => word === CORE[index]);
}

/** Lake is a form word. An FD&C or D&C dye printed with Lake uses the base dye's existing lock. */
function dyeWithoutLake(name: string): string | undefined {
  if (!/\b(?:fd\s*&\s*c|d\s*&\s*c)\b/i.test(name) || !/\blake\b/i.test(name)) return undefined;
  let text = name.replace(/\b(?:aluminum|aluminium|calcium)\s+lake\b/gi, ' ');
  text = text.replace(/\blake\b/gi, ' ');
  text = text.replace(/\bno\.?\s+/gi, '#');
  text = text.replace(/\s+/g, ' ').trim();
  return text && text.toLowerCase() !== name.toLowerCase() ? text : undefined;
}

/** Cleared, no stack. Same core words only. An added or missing ingredient word does not match. */
export function t383uResolve(name: string, form?: string): T320uHit | undefined {
  if (isPacranConcentrate(name)) return { lock: { grade: 'cleared', counts: false, why: WHY }, mark: 't383u' };
  const base = dyeWithoutLake(name);
  if (base) {
    const hit = t362uResolve(base, form);
    if (hit) return hit;
  }
  return t362uResolve(name, form);
}

const exact = t383uResolve('Pacran Cranberry concentrate powder', 'gummy');
if (exact?.mark !== 't383u' || exact.lock.grade !== 'cleared' || exact.lock.counts || exact.lock.why !== WHY) {
  throw new Error('t383u pacran');
}
for (const variant of [
  'pacran cranberry concentrate powder',
  'Pacran® Cranberry concentrate powder',
  'Pacran Cranberry concentrate powder (fruit)',
  'Pacran Cranberry concentrate powder (50:1)',
  'Cranberry Pacran concentrate powder',
]) {
  const hit = t383uResolve(variant, 'gummy');
  if (hit?.mark !== 't383u' || hit.lock.why !== WHY) throw new Error(`t383u variant ${variant}`);
}
for (const other of [
  'Pacran',
  'Pacran whole fruit cranberry',
  'Pacran Cranberry powder',
  'Pacran® SP Cranberry (Vaccinium macrocarpon) powder (50:1)(1.5% proanthocyanidins, 3.75 mg)(fruit)',
  'Cranberry concentrate powder',
]) {
  if (t383uResolve(other, 'gummy')?.mark === 't383u') throw new Error(`t383u over-matched ${other}`);
}
if (t362uResolve('Pacran Cranberry concentrate powder', 'gummy')) throw new Error('t383u already locked');
const yellow5 = t383uResolve('FD&C Yellow #5', 'tablet');
const yellow5Lake = t383uResolve('FD&C Yellow No. 5 Lake', 'tablet');
if (!yellow5 || yellow5.mark !== 't140u' || yellow5.lock.grade !== 'high' || yellow5.lock.counts) {
  throw new Error('t383u yellow 5 base');
}
if (!yellow5Lake || yellow5Lake.mark !== 't140u' || yellow5Lake.lock.grade !== 'high' || yellow5Lake.lock.counts || yellow5Lake.lock.why !== yellow5.lock.why) {
  throw new Error('t383u yellow 5 lake');
}
if (t383uResolve('FD&C Yellow #5 Lake', 'tablet')?.lock.why !== yellow5.lock.why) throw new Error('t383u yellow hash lake');
