import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t324uLock, t324uResolve } from './t324uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function named(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}

const K2 = 'Vitamin K2 is a form of vitamin K. It is included as a source of vitamin K.';
const COQ = 'Coenzyme Q10 is a coenzyme. It is included for its antioxidant compounds.';
const BETA = 'Beta sitosterol is a plant sterol. It is included for its plant compounds.';
const POTASSIUM = 'Potassium is a mineral. It is included as a source of potassium.';
const EVENING = 'Evening primrose oil is oil from evening primrose seeds. It is used as a fill in the softgel. Evening primrose oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';

const PLANTS = [
  'Chlorella powder',
  'Fenugreek extract (4:1)',
  'Grapefruit',
  'Red Ginseng extract',
  'Turmeric powder',
  'Saw Palmetto extract',
  'Yohimbe extract',
] as const;

const LOCKS: Array<[string, Lock]> = [
  ...PLANTS.map((name) => [name, { grade: 'cleared' as const, counts: false, why: named(name) }] as [string, Lock]),
  ['Vitamin K2', { grade: 'cleared', counts: false, why: K2 }],
  ['Coenzyme Q10', { grade: 'cleared', counts: false, why: COQ }],
  ['Beta Sitosterol', { grade: 'cleared', counts: false, why: BETA }],
  ['Potassium', { grade: 'cleared', counts: false, why: POTASSIUM }],
];

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare).replace(/cornsilk/g, 'corn silk').replace(/uvaursi/g, 'uva ursi');
}

function stripNoise(name: string): string {
  let current = name.replace(/[®™]/g, ' ').replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
  const first = name.trim().split(/\s+/)[0] ?? '';
  if (/[®™]/.test(first)) current = current.split(/\s+/).slice(1).join(' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => {
      if (/\d+\s*:\s*\d+/.test(inner)) return full;
      return ' ';
    }).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [fold(stripNoise(name)), lock]));

function stripPercentGroups(name: string): string {
  let out = '';
  for (let i = 0; i < name.length; i += 1) {
    if (name[i] !== '(') {
      out += name[i];
      continue;
    }
    let depth = 1;
    let j = i + 1;
    for (; j < name.length && depth > 0; j += 1) {
      if (name[j] === '(') depth += 1;
      else if (name[j] === ')') depth -= 1;
    }
    const inner = name.slice(i + 1, j - 1);
    if (!/%/.test(inner) && !/\b(?:mg|mcg|µg|g|iu|hu)\b/i.test(inner)) out += name.slice(i, j);
    i = j - 1;
  }
  return out.replace(/\s+/g, ' ').trim();
}

function isEveningPrimroseOil(name: string): boolean {
  return fold(stripNoise(name)) === fold('Evening Primrose Oil');
}

function isPumpkinSeedOil(name: string): boolean {
  return /\bpumpkin\s+seed\s+oil\b/i.test(stripNoise(name));
}

/** Confirmed aliases to locks that already exist. Not new entries. */
function existingAlias(name: string, form?: string): T320uHit | undefined {
  if (isPumpkinSeedOil(name)) {
    const lock = t324uLock('Pumpkin Oil (seed)', form);
    return lock ? { lock, mark: 't324u', from: 'Pumpkin Oil (seed)' } : undefined;
  }
  const core = fold(stripNoise(name));
  if (core === fold('Ashwagandha extract (4:1)') || core === fold('Ashwagandha extract (5:1)')) {
    const lock = t324uLock('Ashwagandha extract');
    return lock ? { lock, mark: 't324u', from: 'Ashwagandha extract' } : undefined;
  }
  if (core === fold('Milk Thistle extract (25:1)')) {
    const lock = t324uLock('Milk Thistle extract');
    return lock ? { lock, mark: 't324u', from: 'Milk Thistle extract' } : undefined;
  }
  if (core === fold('Organic Beet powder') || core === fold('AQTIV Organic Beet powder')) {
    const lock = t324uLock('Beet powder');
    return lock ? { lock, mark: 't324u', from: 'Beet powder' } : undefined;
  }
  if (core === fold('Black Maca powder')) {
    const lock = t324uLock('Maca powder');
    return lock ? { lock, mark: 't324u', from: 'Maca powder' } : undefined;
  }
  return undefined;
}

/** New strings. Evening primrose oil is Caution only as a softgel fill. Irwin rows only. */
export function t325uLock(name: string, form?: string): Lock | undefined {
  if (isEveningPrimroseOil(name)) {
    if (/\bsoftgel\b/.test((form ?? '').toLowerCase())) {
      return { grade: 'moderate', counts: false, why: EVENING };
    }
    return undefined;
  }
  return BY_KEY.get(fold(stripNoise(name)));
}

export function t325uResolve(name: string, form?: string): T320uHit | undefined {
  if (/full-spectrum hemp extract blend|broad-spectrum hemp extract blend/i.test(name)) return undefined;
  if (fold(stripNoise(name)) === 'coq10') return undefined;
  const alias = existingAlias(name, form);
  if (alias) return alias;
  if (isEveningPrimroseOil(name)) {
    const fill = t325uLock(name, form);
    return fill ? { lock: fill, mark: 't325u' } : undefined;
  }
  const prior = t324uResolve(name, form);
  if (prior) return prior;
  const peeled = stripPercentGroups(name);
  if (peeled !== name) {
    const again = t324uResolve(peeled, form);
    if (again) return again;
    const peeledOwn = t325uLock(peeled, form);
    if (peeledOwn) return { lock: peeledOwn, mark: 't325u' };
  }
  const quiet = stripNoise(name);
  if (quiet !== name) {
    const quietHit = t324uResolve(quiet, form);
    if (quietHit) return quietHit;
  }
  const asHead = name.match(/^(.*?)\s*\(\s*as\s+/i);
  if (asHead) {
    const outer = t324uResolve(asHead[1].trim(), form);
    if (outer) return outer;
  }
  const own = t325uLock(name, form);
  return own ? { lock: own, mark: 't325u' } : undefined;
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t325u duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t325uLock(name, 'softgel');
  if (hit?.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t325u ${name}`);
}
if (t325uResolve('Pumpkin Seed Oil', 'softgel')?.from !== 'Pumpkin Oil (seed)') throw new Error('t325u pumpkin seed');
if (t325uResolve('Pumpkin Seed Oil (seed)', 'softgel')?.lock.grade !== 'moderate') throw new Error('t325u pumpkin seed paren');
if (t325uResolve('Pumpkin Seed Oil', 'liquid')) throw new Error('t325u pumpkin seed base');
if (t325uResolve('Pumpkin extract', 'softgel')) throw new Error('t325u pumpkin extract');
if (t325uResolve('Ashwagandha extract (4:1)(root)')?.from !== 'Ashwagandha extract') throw new Error('t325u ashwagandha 4');
if (t325uResolve('Ashwagandha extract (5:1)(root)')?.from !== 'Ashwagandha extract') throw new Error('t325u ashwagandha 5');
if (t325uResolve('Milk Thistle extract (25:1)(seed)')?.from !== 'Milk Thistle extract') throw new Error('t325u milk thistle 25');
if (t325uResolve('Organic Beet powder')?.from !== 'Beet powder') throw new Error('t325u organic beet');
if (t325uResolve('AQTIV™ Organic Beet powder (root)')?.from !== 'Beet powder') throw new Error('t325u aqtiv organic beet');
if (t325uResolve('Black Maca powder (Lepidium meyenii)(root)')?.from !== 'Maca powder') throw new Error('t325u black maca');
if (t325uResolve('Fenugreek extract (8:1)(seed)', 'softgel')) throw new Error('t325u fenugreek 8');
if (t325uLock('Fenugreek extract (4:1)(seed)')?.why !== named('Fenugreek extract (4:1)')) throw new Error('t325u fenugreek 4');
if (t325uLock('Grapefruit (Citrus paradisi)(fruit)')?.why !== named('Grapefruit')) throw new Error('t325u grapefruit');
if (t325uLock('Citrus grandis (fruit)')) throw new Error('t325u citrus grandis');
if (t325uLock('Red Ginseng (Panax ginseng) extract (root)')?.why !== named('Red Ginseng extract')) throw new Error('t325u red ginseng');
if (t325uLock('Turmeric powder (root)')?.why !== named('Turmeric powder')) throw new Error('t325u turmeric powder');
if (t325uLock('Chlorella (Chlorella pyrenoidosa) powder (whole plant)')?.why !== named('Chlorella powder')) throw new Error('t325u chlorella');
if (t325uResolve('Organic Chlorella Powder', 'softgel')?.mark === 't325u') throw new Error('t325u organic chlorella');
if (t325uLock('Vitamin K2 (as Menaquinone-7, MK-7)')?.why !== K2) throw new Error('t325u k2');
if (t325uLock('Vitamin K2 (as Menaquinone-7 MK-7)')?.why !== K2) throw new Error('t325u k2 space');
if (t325uResolve('CoQ10', 'softgel')) throw new Error('t325u coq10');
if (t325uLock('Coenzyme Q10')?.why !== COQ) throw new Error('t325u coenzyme');
if (t325uLock('Saw Palmetto extract (85% fatty acids, 272 mg)(fruit)')?.why !== named('Saw Palmetto extract')) throw new Error('t325u saw');
if (t325uLock('Saw Palmetto Oil (fruit)')) throw new Error('t325u saw oil');
if (t325uLock('Yohimbe extract (2% total alkaloids, 1.4 mg)(bark)')?.why !== named('Yohimbe extract')) throw new Error('t325u yohimbe');
if (t325uLock('Evening Primrose Oil (seed)', 'softgel')?.grade !== 'moderate') throw new Error('t325u epo fill');
if (t325uLock('Evening Primrose (Oenothera biennis) Oil (seed)', 'softgel')?.why !== EVENING) throw new Error('t325u epo latin');
if (t325uLock('Evening Primrose Oil (seed)', 'liquid')) throw new Error('t325u epo base');
if (t325uResolve('Vitamin D3 (as Cholecalciferol)', 'softgel')?.lock.why !== 'Vitamin D3. It is added for its nutrient compounds.') {
  throw new Error('t325u vitamin d3');
}
if (t325uResolve('Flaxseed Oil (50% Alpha Linolenic Acid (ALA), 475 mg)(seed)', 'softgel')?.lock.grade !== 'moderate') {
  throw new Error('t325u flax percent');
}
if (t325uLock('Potassium (as Potassium Citrate)')?.why !== POTASSIUM) throw new Error('t325u potassium');
if (t325uLock('Beta Sitosterol')?.why !== BETA) throw new Error('t325u beta');
