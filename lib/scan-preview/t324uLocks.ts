import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import { t323uResolve } from './t323uLocks';
import type { T320uHit } from './t320uLocks';

type Lock = { grade: RiskLevel; counts: boolean; why: string };

function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function mineral(name: string): string {
  return `${name}. It is included as a source of that mineral.`;
}

const PUMPKIN = 'Pumpkin oil is oil from pumpkin seeds. It is used as a fill in the softgel. Pumpkin oil is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed oils as distinct from whole-food oils).';
const CAFFEINE = 'Caffeine is a stimulant compound. It is included for its stimulant properties.';

const PLANTS = [
  'Turmeric extract',
  'Maca powder',
  'Beet powder',
  'Milk Thistle extract',
  'Ashwagandha extract',
  'Spirulina powder',
] as const;
const MINERALS = ['Manganese', 'Copper', 'Molybdenum'] as const;

const LOCKS: Array<[string, Lock]> = [
  ...PLANTS.map((name) => [name, { grade: 'cleared' as const, counts: false, why: plant(name) }] as [string, Lock]),
  ...MINERALS.map((name) => [name, { grade: 'cleared' as const, counts: false, why: mineral(name) }] as [string, Lock]),
  ['Caffeine', { grade: 'cleared', counts: false, why: CAFFEINE }],
];

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [fold(name), lock]));

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare).replace(/cornsilk/g, 'corn silk').replace(/uvaursi/g, 'uva ursi');
}

function hasRatio(name: string): boolean {
  return /\(\s*\d+\s*:\s*\d+\s*\)/.test(name);
}

function stripNoise(name: string): string {
  let current = name.replace(/[®™]/g, ' ').replace(/[’']/g, '').replace(/\s+/g, ' ').trim();
  const first = name.trim().split(/\s+/)[0] ?? '';
  if (/[®™]/.test(first)) current = current.split(/\s+/).slice(1).join(' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => {
      if (/\d+\s*:\s*\d+/.test(inner)) return full;
      if (/%/.test(inner) || /\b(?:mg|mcg|µg|g|iu|hu)\b/i.test(inner)) return ' ';
      if (/^(?:b\d{1,2}|color|colour|coating)$/i.test(inner.trim())) return ' ';
      return ' ';
    }).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function isPumpkinSeedOil(name: string): boolean {
  return /\bpumpkin\s+seed\s+oil\b/i.test(stripNoise(name));
}

function isPumpkinExtract(name: string): boolean {
  return /\bpumpkin\s+extract\b/i.test(stripNoise(name));
}

function isPumpkinOil(name: string): boolean {
  return fold(stripNoise(name)) === fold('Pumpkin Oil');
}

/** Irwin rows only. Pumpkin oil is Caution only as a softgel fill. */
export function t324uLock(name: string, form?: string): Lock | undefined {
  if (isPumpkinSeedOil(name) || isPumpkinExtract(name)) return undefined;
  if (isPumpkinOil(name)) {
    if (/\bsoftgel\b/.test((form ?? '').toLowerCase())) {
      return { grade: 'moderate', counts: false, why: PUMPKIN };
    }
    return undefined;
  }
  if (hasRatio(name)) return undefined;
  const key = fold(stripNoise(name));
  return BY_KEY.get(key);
}

export function t324uResolve(name: string, form?: string): T320uHit | undefined {
  if (/full-spectrum hemp extract blend|broad-spectrum hemp extract blend/i.test(name)) return undefined;
  if (isPumpkinSeedOil(name) || isPumpkinExtract(name)) return undefined;
  if (isPumpkinOil(name)) {
    const fill = t324uLock(name, form);
    return fill ? { lock: fill, mark: 't324u' } : undefined;
  }
  const prior = t323uResolve(name, form);
  if (prior) return prior;
  const own = t324uLock(name, form);
  return own ? { lock: own, mark: 't324u' } : undefined;
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t324u duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t324uLock(name, 'softgel');
  if (hit?.why !== lock.why || hit.grade !== lock.grade || hit.counts !== lock.counts) throw new Error(`t324u ${name}`);
}
if (t324uLock('Pumpkin Oil (seed)', 'softgel')?.grade !== 'moderate') throw new Error('t324u pumpkin fill');
if (t324uLock('Pumpkin Oil (seed)', 'softgel')?.counts !== false) throw new Error('t324u pumpkin count');
if (t324uLock('Pumpkin Oil (Cucurbita pepo L.) (seed)', 'softgel')?.why !== PUMPKIN) throw new Error('t324u pumpkin latin');
if (t324uLock('Pumpkin Oil (seed)', 'liquid')) throw new Error('t324u pumpkin base');
if (t324uLock('Pumpkin Seed Oil', 'softgel')) throw new Error('t324u pumpkin seed oil');
if (t324uLock('Pumpkin Seed Oil (seed)', 'softgel')) throw new Error('t324u pumpkin seed oil paren');
if (t324uLock('Pumpkin extract', 'softgel')) throw new Error('t324u pumpkin extract');
if (t324uLock('Turmeric extract (95% curcuminoids, 95 mg)(root)')?.why !== plant('Turmeric extract')) throw new Error('t324u turmeric');
if (t324uLock('Turmeric powder (root)')) throw new Error('t324u turmeric powder');
if (t324uLock('Curcumin C3 Complex® Turmeric extract (95% curcuminoids, 142.5 mg)(rhizome)')) throw new Error('t324u curcumin complex');
if (t324uLock('Maca powder (gelatinized)(root)')?.why !== plant('Maca powder')) throw new Error('t324u maca');
if (t324uLock('Black Maca powder (Lepidium meyenii)(root)')) throw new Error('t324u black maca');
if (t324uLock('Maca extract (4:1)(root)')) throw new Error('t324u maca ratio');
if (t324uLock('AQTIV™ Beet powder (root)')?.why !== plant('Beet powder')) throw new Error('t324u beet');
if (t324uLock('Organic Beet powder')) throw new Error('t324u organic beet');
if (t324uLock('Beet extract')) throw new Error('t324u beet extract');
if (t324uLock('Milk Thistle extract (45% silymarin, 123.75 mg)(seed)')?.why !== plant('Milk Thistle extract')) throw new Error('t324u milk thistle');
if (t324uLock('Milk Thistle extract (25:1)(seed)')) throw new Error('t324u milk thistle ratio');
if (t324uLock('Milk Thistle powder (seed)')) throw new Error('t324u milk thistle powder');
if (t324uLock('Sensoril® Ashwagandha extract (root, leaf)')?.why !== plant('Ashwagandha extract')) throw new Error('t324u sensoril');
if (t324uLock('Ashwagandha extract (4:1)(root)')) throw new Error('t324u ashwagandha ratio');
if (t324uLock('Ashwagandha extract (5:1)(root)')) throw new Error('t324u ashwagandha 5');
if (t324uLock('Spirulina (Arthrospira platensis) powder (whole plant)')?.why !== plant('Spirulina powder')) throw new Error('t324u spirulina');
if (t324uLock('Manganese (as Manganese Citrate)')?.why !== mineral('Manganese')) throw new Error('t324u manganese');
if (t324uLock('Copper (as Copper Amino Acid Chelate)')?.why !== mineral('Copper')) throw new Error('t324u copper chelate');
if (t324uResolve('Copper (as Copper Citrate)', 'softgel')?.mark !== 't322u') throw new Error('t324u copper citrate stays');
if (t324uLock('Molybdenum (as Molybdenum Citrate)')?.why !== mineral('Molybdenum')) throw new Error('t324u molybdenum');
if (t324uLock('Caffeine (from Green Coffee (Coffea arabica)(bean))')?.why !== CAFFEINE) throw new Error('t324u caffeine');
if (t324uLock('InnovaTea® Caffeine (from Camellia sinensis extract)(leaf)')?.why !== CAFFEINE) throw new Error('t324u innovatea');
if (t324uLock("InnovaTea® Caffeine 98% (from Camellia sinensis, 50.96 mg)(leaf)")) throw new Error('t324u caffeine percent');
if (t324uLock('Guaraná (Paullinia cupana)(seed)')) throw new Error('t324u guarana');
if (t324uResolve('irwin-b456-mega-b-complex')) throw new Error('t324u row id');
