import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t330uResolve } from './t330uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function choline(name: string): string {
  return `${name}. It is included as a source of choline.`;
}
function fruit(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function nutrient(name: string): string {
  return `${name}. It is included for its nutrient compounds.`;
}

const CORDYCEPS: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Cordyceps is a mushroom. It is included for its plant compounds.',
};
const SILIPHOS: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Siliphos is a milk thistle and lecithin complex. It is included for its plant compounds.',
};

const LOCKS: Array<[string, Lock]> = [
  ['CDP-Choline', { grade: 'cleared', counts: false, why: choline('CDP-Choline') }],
  ['Choline Bitartrate', { grade: 'cleared', counts: false, why: choline('Choline Bitartrate') }],
  ['Grape', { grade: 'cleared', counts: false, why: fruit('Grape') }],
  ['Lemon', { grade: 'cleared', counts: false, why: fruit('Lemon') }],
  ['Papaya', { grade: 'cleared', counts: false, why: fruit('Papaya') }],
  ['Pineapple', { grade: 'cleared', counts: false, why: fruit('Pineapple') }],
  ['Tomato', { grade: 'cleared', counts: false, why: fruit('Tomato') }],
  ['Montmorillonite', { grade: 'cleared', counts: false, why: nutrient('Montmorillonite') }],
  ['NADH', { grade: 'cleared', counts: false, why: nutrient('NADH') }],
  ['PrimaVie Shilajit', { grade: 'cleared', counts: false, why: nutrient('PrimaVie Shilajit') }],
  ['Quercetin', { grade: 'cleared', counts: false, why: nutrient('Quercetin') }],
  ['Theobromine', { grade: 'cleared', counts: false, why: nutrient('Theobromine') }],
  ['Vitamin D', { grade: 'cleared', counts: false, why: nutrient('Vitamin D') }],
];

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare);
}

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [fold(name), lock]));
BY_KEY.set('shilajit', BY_KEY.get('primavie shilajit')!);

function core(name: string): string {
  const asInner = name.match(/\(\s*as\s+([^)]+)\)/i);
  if (asInner) {
    const innerKey = fold(stripParens(asInner[1])).replace(/\s+dihydrate$/, '');
    if (BY_KEY.has(innerKey)) return innerKey;
  }
  let key = fold(stripParens(name)).replace(/^(?:primavie)\s+/, '');
  key = key.replace(/\s+(?:extract|powder|dihydrate)$/g, (suffix) => (
    /^(?:cordyceps|shilajit|quercetin)\b/.test(key) ? '' : suffix
  )).replace(/\s+/g, ' ').trim();
  return key;
}

function founderAlias(name: string, form?: string): T320uHit | undefined {
  const key = fold(stripParens(name));
  if (/\beuropean elder\b/.test(key) || key === 'elderberry' || key === 'elder berry' || /\belder berry\b/.test(key) && /\beuropean\b/.test(key)) {
    return t330uResolve('Black Elder extract', form);
  }
  if (key === 'beet juice powder' || key === 'beet juice') return t330uResolve('Beet powder', form);
  if (key === 'alfalfa extract') return t330uResolve('Alfalfa', form);
  return undefined;
}

export function t331uLock(name: string): Lock | undefined {
  if (/\bsiliphos\b/i.test(name)) return SILIPHOS;
  const key = core(name);
  if (key === 'cordyceps' || key.startsWith('cordyceps ')) {
    if (/\borganic\b/i.test(name)) return undefined;
    return CORDYCEPS;
  }
  return BY_KEY.get(key);
}

export function t331uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  if (/\b(lion'?s mane|agaricus|chaga|maitake|reishi|shiitake|turkey tail)\b/i.test(name)) return t330uResolve(name, form);
  const alias = founderAlias(name, form);
  if (alias) return alias;
  const prior = t330uResolve(name, form);
  if (prior) return prior;
  const own = t331uLock(name);
  return own ? { lock: own, mark: 't331u' } : undefined;
}

if (t331uLock('CDP-Choline')?.why !== 'CDP-Choline. It is included as a source of choline.') throw new Error('t331u cdp why');
if (t331uResolve('Choline (as Choline Bitartrate)', 'softgel')?.lock.why !== 'Choline Bitartrate. It is included as a source of choline.') throw new Error('t331u bitartrate');
if (t331uResolve('Choline (as CDP-Choline)', 'softgel')?.lock.why !== 'CDP-Choline. It is included as a source of choline.') throw new Error('t331u cdp as');
if (t331uResolve('Cordyceps (Cordyceps sinensis) extract (mycelium)', 'softgel')?.lock.why !== CORDYCEPS.why) throw new Error('t331u cordyceps extract');
if (t331uResolve('Cordyceps powder (mycelium)', 'softgel')?.lock.why !== CORDYCEPS.why) throw new Error('t331u cordyceps powder');
if (t331uResolve('Organic Cordyceps (Cordyceps sinensis) Mushroom powder (mycelium)', 'softgel')) throw new Error('t331u organic cordyceps');
if (t331uResolve('Grape (fruit)', 'softgel')?.lock.why !== fruit('Grape')) throw new Error('t331u grape');
if (!t331uResolve('Grape extract (seed)', 'softgel')?.lock.why.includes('Grape Seed')) throw new Error('t331u grape extract');
if (t331uResolve('Lemon (fruit)', 'softgel')?.lock.why !== fruit('Lemon')) throw new Error('t331u lemon');
if (t331uResolve('Lemon Balm extract', 'softgel')?.mark === 't331u') throw new Error('t331u lemon balm');
if (t331uResolve('Papaya (fruit)', 'softgel')?.lock.why !== fruit('Papaya')) throw new Error('t331u papaya');
if (t331uResolve('Pineapple (fruit)', 'softgel')?.lock.why !== fruit('Pineapple')) throw new Error('t331u pineapple');
if (t331uResolve('Tomato (fruit)', 'softgel')?.lock.why !== fruit('Tomato')) throw new Error('t331u tomato');
if (t331uResolve('Montmorillonite', 'softgel')?.lock.why !== nutrient('Montmorillonite')) throw new Error('t331u clay');
if (t331uResolve('NADH (Nicotinamide Adenine Dinucleotide)', 'softgel')?.lock.why !== nutrient('NADH')) throw new Error('t331u nadh');
if (t331uResolve('PrimaVie® Shilajit extract', 'softgel')?.lock.why !== nutrient('PrimaVie Shilajit')) throw new Error('t331u shilajit');
if (t331uResolve('Shilajit extract (6:1)', 'softgel')?.lock.why !== nutrient('PrimaVie Shilajit')) throw new Error('t331u shilajit bare');
if (t331uResolve('Quercetin (as Quercetin Dihydrate)', 'softgel')?.lock.why !== nutrient('Quercetin')) throw new Error('t331u quercetin');
if (t331uResolve('Theobromine', 'softgel')?.lock.why !== nutrient('Theobromine')) throw new Error('t331u theobromine');
if (t331uResolve('Vitamin D', 'softgel')?.lock.why !== nutrient('Vitamin D')) throw new Error('t331u vitamin d');
if (t331uResolve('Vitamin D3 (as Cholecalciferol)', 'softgel')?.mark === 't331u') throw new Error('t331u d3 stays');
if (t331uResolve('Siliphos® Silybin Phospholipid (Milk Thistle extract (fruit) and Sunflower Lecithin)', 'softgel')?.lock.why !== SILIPHOS.why) throw new Error('t331u siliphos');
if (t331uResolve("Lion's Mane Mushroom powder (fruiting body)", 'softgel')) throw new Error('t331u lions');
if (t331uResolve('Organic Reishi (Ganoderma lucidum) Mushroom powder (fruiting body)', 'softgel')) throw new Error('t331u reishi');
if (t331uResolve('European Elder (Elderberry) extract (4:1)(fruit)', 'softgel')?.lock.why !== 'Black Elder extract. It is included for its plant or nutrient compounds.') throw new Error('t331u european elder');
if (t331uResolve('European Elder Berry powder', 'softgel')?.lock.why !== 'Black Elder extract. It is included for its plant or nutrient compounds.') throw new Error('t331u elder berry');
if (t331uResolve('Beet Juice Powder (root)', 'softgel')?.lock.why !== 'Beet powder. It is included for its plant compounds.') throw new Error('t331u beet juice');
if (t331uResolve('Alfalfa extract (aerial)', 'softgel')?.lock.why !== 'Alfalfa. It is included for its plant or nutrient compounds.') throw new Error('t331u alfalfa extract');
if (t331uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t331u blend');
