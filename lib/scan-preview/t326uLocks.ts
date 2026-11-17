import type { RiskLevel } from '../ratingRecord';
import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t325uResolve } from './t325uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function plant(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}

const LOCKS: Array<[string, Lock]> = [
  ['CoQ10', { grade: 'cleared', counts: false, why: 'CoQ10 is coenzyme Q10. It is included for its antioxidant compounds.' }],
  ['Citrus grandis', { grade: 'cleared', counts: false, why: 'Citrus grandis is grapefruit. It is included for its plant compounds.' }],
  ['Fenugreek extract', { grade: 'cleared', counts: false, why: 'Fenugreek extract is an extract of fenugreek. It is included for its plant compounds.' }],
  ['Fenugreek extract (8:1)', { grade: 'cleared', counts: false, why: 'Fenugreek extract is an extract of fenugreek. It is included for its plant compounds.' }],
  ['InnovaTea Caffeine 98%', { grade: 'cleared', counts: false, why: 'InnovaTea Caffeine 98% is a concentrated caffeine extract. It is included for its stimulant properties.' }],
  ['Saw Palmetto Oil', { grade: 'cleared', counts: false, why: 'Saw palmetto oil is oil from saw palmetto berries. It is included for its plant compounds.' }],
  ['Belleric Myrobalan powder', { grade: 'cleared', counts: false, why: plant('Belleric Myrobalan powder') }],
  ['Cococin Coconut Water powder', { grade: 'cleared', counts: false, why: plant('Cococin Coconut Water powder') }],
  ['Damiana extract (4:1)', { grade: 'cleared', counts: false, why: plant('Damiana extract (4:1)') }],
  ['Epimedium extract', { grade: 'cleared', counts: false, why: plant('Epimedium extract') }],
  ['Holy Basil extract', { grade: 'cleared', counts: false, why: plant('Holy Basil extract') }],
  ['Lemon Balm extract (10:1)', { grade: 'cleared', counts: false, why: plant('Lemon Balm extract (10:1)') }],
  ['Passionflower extract (4:1)', { grade: 'cleared', counts: false, why: plant('Passionflower extract (4:1)') }],
  ['L-Tyrosine', { grade: 'cleared', counts: false, why: 'L-tyrosine is an amino acid. It is included for its amino acid content.' }],
];

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare);
}

function ratioToken(name: string): string {
  const match = name.match(/\(\s*(\d+)\s*:\s*(\d+)\s*\)/);
  return match ? `${match[1]}:${match[2]}` : '';
}

/** Drop role, percentage, Latin, and plant-part parentheticals. A ratio stays. */
function core(name: string): string {
  let current = name.replace(/[®™]/g, ' ').replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim();
  const ratio = ratioToken(current);
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => (
      /\d+\s*:\s*\d+/.test(inner) ? full : ' '
    )).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  const folded = fold(current);
  return ratio ? `${folded} ${ratio}` : folded;
}

const BY_KEY = new Map<string, Lock>(LOCKS.map(([name, lock]) => [core(name), lock]));

export function t326uLock(name: string): Lock | undefined {
  return BY_KEY.get(core(name));
}

export function t326uResolve(name: string, form?: string): T320uHit | undefined {
  if (/full-spectrum hemp extract blend|broad-spectrum hemp extract blend/i.test(name)) return undefined;
  const prior = t325uResolve(name, form);
  if (prior) return prior;
  const own = t326uLock(name);
  return own ? { lock: own, mark: 't326u' } : undefined;
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t326u duplicate');
for (const [name, lock] of LOCKS) {
  const hit = t326uLock(name);
  if (hit?.why !== lock.why || hit.grade !== 'cleared' || hit.counts !== false) throw new Error(`t326u ${name}`);
}
if (t326uResolve('CoQ10', 'softgel')?.lock.why !== LOCKS[0][1].why) throw new Error('t326u coq10');
if (t326uResolve('Coenzyme Q10', 'softgel')?.mark === 't326u') throw new Error('t326u coenzyme stays t325');
if (t326uLock('Citrus grandis (fruit)')?.why !== 'Citrus grandis is grapefruit. It is included for its plant compounds.') throw new Error('t326u citrus');
if (t326uResolve('Fenugreek extract (4:1)(seed)', 'softgel')?.mark === 't326u') throw new Error('t326u fenugreek 4 stays');
if (t326uLock('Fenugreek extract (8:1)(seed)')?.why !== 'Fenugreek extract is an extract of fenugreek. It is included for its plant compounds.') throw new Error('t326u fenugreek 8');
if (t326uLock('Testosurge® Fenugreek extract (seed)')) throw new Error('t326u testosurge');
if (t326uLock('InnovaTea® Caffeine 98% (from Camellia sinensis, 50.96 mg)(leaf)')?.why !== 'InnovaTea Caffeine 98% is a concentrated caffeine extract. It is included for its stimulant properties.') throw new Error('t326u innovatea');
if (t326uLock('Saw Palmetto Oil (fruit)')?.why !== 'Saw palmetto oil is oil from saw palmetto berries. It is included for its plant compounds.') throw new Error('t326u saw oil');
if (t326uLock('Belleric Myrobalan powder (fruit)')?.why !== plant('Belleric Myrobalan powder')) throw new Error('t326u belleric');
if (t326uLock('Chebulic Myrobalan powder (fruit)')) throw new Error('t326u chebulic');
if (t326uLock('Cococin™ Coconut Water powder (fruit)')?.why !== plant('Cococin Coconut Water powder')) throw new Error('t326u cococin');
if (t326uLock('Damiana extract (4:1)(leaf)')?.why !== plant('Damiana extract (4:1)')) throw new Error('t326u damiana');
if (t326uLock('Damiana (Turnera diffusa) powder (leaf)')) throw new Error('t326u damiana powder');
if (t326uLock('Epimedium (Epimedium sagittatum) (Horny Goat Weed) extract (10% icariins, 12 mg)(aerial)')?.why !== plant('Epimedium extract')) throw new Error('t326u epimedium');
if (t326uLock('Epimedium (Horny Goat Weed)(Epimedium sagittatum) extract (15:1)(aerial)')) throw new Error('t326u epimedium 15');
if (t326uLock('Epimedium (Horny Goat Weed)(Epimedium sagittatum) extract (8:1)(aerial)')) throw new Error('t326u epimedium 8');
if (t326uLock('Horny Goat Weed (Epimedium sagittatum) extract (4:1)(aerial)')) throw new Error('t326u epimedium 4');
if (t326uLock('Holy Basil extract (2% ursolic acid, 3 mg)(herb)')?.why !== plant('Holy Basil extract')) throw new Error('t326u holy basil');
if (t326uLock('Holixer™ Holy Basil (Tulsi) (Ocimum tenuiflorum) extract (herb)')) throw new Error('t326u holixer');
if (t326uLock('Lemon Balm extract (10:1)(aerial)')?.why !== plant('Lemon Balm extract (10:1)')) throw new Error('t326u lemon 10');
if (t326uLock('Lemon Balm extract (4:1)(leaf)')) throw new Error('t326u lemon 4');
if (t326uLock('Lemon Balm extract')) throw new Error('t326u lemon bare');
if (t326uLock('Passionflower extract (4:1)(flower)')?.why !== plant('Passionflower extract (4:1)')) throw new Error('t326u passion 4');
if (t326uLock('Passionflower extract (4:1)(whole herb)')?.why !== plant('Passionflower extract (4:1)')) throw new Error('t326u passion herb');
if (t326uLock('Passionflower (Passiflora incarnata) extract (aerial)')) throw new Error('t326u passion bare');
if (t326uLock('L-Tyrosine')?.why !== 'L-tyrosine is an amino acid. It is included for its amino acid content.') throw new Error('t326u tyrosine');
