import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t340uResolve } from './t340uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate'; counts: boolean; why: string };

function cleared(why: string): Lock {
  return { grade: 'cleared', counts: false, why };
}
function limited(why: string): Lock {
  return { grade: 'limited', counts: true, why };
}
function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function fatty(name: string): string {
  return `${name}. It is included for its fatty acid compounds.`;
}

const THIAMINE = 'Thiamine mononitrate is a form of vitamin B1. It is included as a source of thiamin.';
const FISH = 'Fish body oil is oil from fish. It is used as a fill in the softgel. Fish oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (EFSA and FDA treat refined fish oils as distinct from whole-food oils).';

const LOCKS: Array<[string, Lock]> = [
  ['Thiamine (as Thiamine Mononitrate, Vitamin B1)', cleared(THIAMINE)],
  ['Thiamine (as Thiamine Mononitrate)', cleared(THIAMINE)],
  ['Chromium (as Chromium Chloride)', cleared('Chromium chloride is a salt of chromium. It is included as a source of chromium.')],
  ['Licorice', cleared(plant('Licorice'))],
  ['Senna', cleared(plant('Senna'))],
  ['Docosahexaenoic Acid', cleared(fatty('Docosahexaenoic Acid'))],
  ['Eicosapentaenoic Acid', cleared(fatty('Eicosapentaenoic Acid'))],
  ['Total Omega-3 Fatty Acids', cleared(fatty('Total Omega-3 Fatty Acids'))],
  ['Oat Fiber', limited('Oat fiber is a plant fiber. It is used as a filler. Oat fiber is graded Limited as a processed fiber (EFSA and FDA treat refined plant fibers as processed ingredients).')],
  ['Polysorbate', limited('Polysorbate is a synthetic emulsifier. It is used as an emulsifier. Polysorbate is graded Limited as a synthetic emulsifier (FDA 21 CFR 172.840).')],
  ['PEG', limited('PEG is polyethylene glycol. It is used as a coating and plasticizer. PEG is graded Limited as a synthetic polymer (FDA 21 CFR 172.820).')],
  ['Polyplasdone', limited('Polyplasdone is crospovidone, a synthetic polymer. It is used as a disintegrant. Polyplasdone is graded Limited as a synthetic polymer (FDA 21 CFR 173.55).')],
  ['Rice Husk Concentrate', limited('Rice husk concentrate is a processed rice byproduct. It is used as a filler. Rice husk concentrate is graded Limited as a processed rice ingredient (EFSA and FDA distinguish refined rice products from whole-grain rice).')],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, lock] of LOCKS) {
  const key = t240uNorm(name);
  if (BY_KEY.has(key)) throw new Error(`t341u duplicate ${name}`);
  BY_KEY.set(key, lock);
}
const FISH_LOCK: Lock = { grade: 'moderate', counts: false, why: FISH };

function isFishBody(name: string): boolean {
  return t240uNorm(name) === 'fish body oil';
}
function isSoftgel(form?: string): boolean {
  return /\bsoftgel\b/.test((form ?? '').toLowerCase());
}

export function t341uLock(name: string, form?: string): Lock | undefined {
  if (isFishBody(name)) return isSoftgel(form) ? FISH_LOCK : undefined;
  return BY_KEY.get(t240uNorm(name));
}

export function t341uResolve(name: string, form?: string): T320uHit | undefined {
  if (isFishBody(name)) {
    const own = t341uLock(name, form);
    return own ? { lock: own, mark: 't341u' } : undefined;
  }
  const own = t341uLock(name, form);
  if (own) return { lock: own, mark: 't341u' };
  return t340uResolve(name, form);
}

for (const [name, lock] of LOCKS) {
  const hit = t341uResolve(name, 'tablet');
  if (hit?.lock.why !== lock.why || hit.lock.grade !== lock.grade || hit.mark !== 't341u') throw new Error(`t341u ${name}`);
}
if (t341uResolve('Fish Body Oil', 'softgel')?.lock.why !== FISH) throw new Error('t341u fish fill');
if (t341uResolve('Fish Body Oil', 'liquid')) throw new Error('t341u fish base');
if (t341uResolve('Fish Oil', 'softgel')?.mark === 't341u') throw new Error('t341u fish oil');
if (t341uResolve('Polysorbate 80', 'tablet')?.mark === 't341u') throw new Error('t341u p80');
if (t341uResolve('Crospovidone', 'tablet')?.mark === 't341u') throw new Error('t341u crospovidone');
if (t341uResolve('Polyethylene Glycol', 'tablet')?.mark === 't341u') throw new Error('t341u peg full');
if (t341uResolve('Vitamin A (as Beta-Carotene)', 'tablet')?.mark === 't341u') throw new Error('t341u vitamin a');
if (t341uResolve('Licorice extract', 'tablet')?.mark === 't341u') throw new Error('t341u licorice extract');
