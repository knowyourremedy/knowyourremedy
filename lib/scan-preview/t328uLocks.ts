import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t327uResolve } from './t327uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function named(name: string): string {
  return `${name}. It is included for its plant or nutrient compounds.`;
}

const NAMES = [
  'Stinging Nettle extract',
  'Cinnamon extract',
  'Dandelion extract',
  'Echinacea extract',
  'Gotu Kola extract',
  'Amla powder',
  'Ginkgo powder',
  'Milk Thistle powder',
  'Damiana powder',
  'Beet extract',
  'Cayenne extract',
  'Horny Goat Weed',
  'Chebulic Myrobalan',
  'Guarana',
  'Chromium Polynicotinate',
  'Selenium Aspartate',
  'InnovaTea Natural Tea extract',
] as const;

const BARE = new Set(['horny goat weed', 'chebulic myrobalan', 'guarana']);

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

const BY_KEY = new Map<string, Lock>(NAMES.map((name) => [fold(name), { grade: 'cleared', counts: false, why: named(name) }]));

function lookupKey(key: string): Lock | undefined {
  const exact = BY_KEY.get(key);
  if (exact) return exact;
  const words = key.split(' ').filter(Boolean);
  const last = words[words.length - 1];
  if ((last === 'extract' || last === 'powder') && words.length > 1) {
    const stem = words.slice(0, -1).join(' ');
    if (BARE.has(stem)) return BY_KEY.get(stem);
  }
  return undefined;
}

function candidates(name: string): string[] {
  const out: string[] = [];
  const push = (value: string) => {
    const key = fold(value);
    if (key && !out.includes(key)) out.push(key);
  };
  const asInner = name.match(/\(\s*as\s+([^)]+)\)/i);
  if (asInner) push(stripParens(asInner[1]));
  const stripped = stripParens(name);
  push(stripped);
  push(stripped.split(/\s+/).filter((word) => !/^(?:purpurea|cassia)$/i.test(word)).join(' '));
  const tokens = stripped.split(/\s+/).filter(Boolean);
  const first = name.trim().split(/\s+/)[0] ?? '';
  if (tokens.length > 1 && (/[®™]/.test(first) || /^sabeet$/i.test(tokens[0]))) push(tokens.slice(1).join(' '));
  return out;
}

export function t328uLock(name: string): Lock | undefined {
  for (const key of candidates(name)) {
    const hit = lookupKey(key);
    if (hit) return hit;
  }
  return undefined;
}

export function t328uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  const prior = t327uResolve(name, form);
  if (prior) return prior;
  const own = t328uLock(name);
  return own ? { lock: own, mark: 't328u' } : undefined;
}

const WHY = 'It is included for its plant or nutrient compounds.';
if (BY_KEY.size !== NAMES.length) throw new Error('t328u duplicate');
for (const name of NAMES) {
  const hit = t328uLock(name);
  if (hit?.why !== named(name) || !hit.why.endsWith(WHY) || hit.grade !== 'cleared' || hit.counts !== false) {
    throw new Error(`t328u ${name}`);
  }
}
if (t328uResolve('Stinging Nettle (Urtica dioica) extract (15:1)(root)', 'softgel')?.lock.why !== named('Stinging Nettle extract')) throw new Error('t328u nettle ratio');
if (t328uResolve('Stinging Nettle powder (leaf)', 'softgel')) throw new Error('t328u nettle powder');
if (t328uResolve('Nettle (Urtica dioica) extract (4:1)(root)', 'softgel')) throw new Error('t328u bare nettle');
if (t328uResolve('Cinnamon (Cassia) (Cinnamomum aromaticum) extract (4:1)(bark)', 'softgel')?.lock.why !== named('Cinnamon extract')) throw new Error('t328u cassia');
if (t328uResolve('Dandelion (Taraxacum mongolicum) extract (4:1)(root)', 'softgel')?.lock.why !== named('Dandelion extract')) throw new Error('t328u dandelion root');
if (t328uResolve('Dandelion (Taraxacum officinale) powder (leaf)', 'softgel')) throw new Error('t328u dandelion powder');
if (t328uResolve('Echinacea purpurea extract (10:1)(root)', 'softgel')?.lock.why !== named('Echinacea extract')) throw new Error('t328u echinacea');
if (t328uResolve('Gotu Kola (Centella asiatica) extract (4:1)(herb)', 'softgel')?.lock.why !== named('Gotu Kola extract')) throw new Error('t328u gotu');
if (t328uResolve('Amla powder (fruit)', 'softgel')?.lock.why !== named('Amla powder')) throw new Error('t328u amla powder');
if (t328uResolve('Amla extract (5:1)(fruit)', 'softgel')?.mark === 't328u') throw new Error('t328u amla extract stays');
if (t328uResolve('Ginkgo powder (leaf)', 'softgel')?.lock.why !== named('Ginkgo powder')) throw new Error('t328u ginkgo powder');
if (t328uResolve('Ginkgo extract (4:1)(leaf)', 'softgel')?.mark === 't328u') throw new Error('t328u ginkgo extract stays');
if (t328uResolve('Milk Thistle powder (seed)', 'softgel')?.lock.why !== named('Milk Thistle powder')) throw new Error('t328u milk thistle powder');
if (t328uResolve('Milk Thistle extract (10:1)', 'softgel')?.mark === 't328u') throw new Error('t328u milk thistle extract stays');
if (t328uResolve('Damiana (Turnera diffusa) powder (leaf)', 'softgel')?.lock.why !== named('Damiana powder')) throw new Error('t328u damiana powder');
if (t328uResolve('Damiana extract (4:1)(leaf)', 'softgel')?.mark === 't328u') throw new Error('t328u damiana extract stays');
if (t328uResolve('Sabeet® Beet extract (2% nitrates, 3 mg)(root)', 'softgel')?.lock.why !== named('Beet extract')) throw new Error('t328u sabeet');
if (t328uResolve('Beet powder (root)', 'softgel')?.mark === 't328u') throw new Error('t328u beet powder stays');
if (t328uResolve('Beet (root)', 'softgel')) throw new Error('t328u bare beet');
if (t328uResolve('Cayenne (Capsicum annuum) extract (5% capsaicin, 1.5 mg)(fruit)', 'softgel')?.lock.why !== named('Cayenne extract')) throw new Error('t328u cayenne extract');
if (t328uResolve('Cayenne powder (fruit)', 'softgel')?.mark === 't328u') throw new Error('t328u cayenne powder stays');
if (t328uResolve('Horny Goat Weed (Epimedium sagittatum) extract (4:1)(aerial)', 'softgel')?.lock.why !== named('Horny Goat Weed')) throw new Error('t328u horny goat');
if (t328uResolve('Chebulic Myrobalan (Terminalia chebula) powder (fruit)', 'softgel')?.lock.why !== named('Chebulic Myrobalan')) throw new Error('t328u chebulic powder');
if (t328uResolve('Chebulic Myrobalan extract (5:1)(fruit)', 'softgel')?.lock.why !== named('Chebulic Myrobalan')) throw new Error('t328u chebulic extract');
if (t328uResolve('Guaraná (Paullinia cupana)(seed)', 'softgel')?.lock.why !== named('Guarana')) throw new Error('t328u guarana seed');
if (t328uResolve('Guarana powder (seed)', 'softgel')?.lock.why !== named('Guarana')) throw new Error('t328u guarana powder');
if (t328uResolve('Guaraná (Paullinia cupana) extract (12% caffeine, 18 mg)(seed)', 'softgel')?.lock.why !== named('Guarana')) throw new Error('t328u guarana extract');
if (t328uResolve('Chromium (as Chromium Polynicotinate)', 'softgel')?.lock.why !== named('Chromium Polynicotinate')) throw new Error('t328u polynicotinate');
if (t328uResolve('Chromium (as Chromium Picolinate)', 'softgel')?.mark === 't328u') throw new Error('t328u picolinate stays');
if (t328uResolve('Selenium (as Selenium Aspartate)', 'softgel')?.lock.why !== named('Selenium Aspartate')) throw new Error('t328u aspartate');
if (t328uResolve('Selenium (as L-Selenomethionine)', 'softgel')?.mark === 't328u') throw new Error('t328u selenomethionine stays');
if (t328uResolve('InnovaTea® Natural Tea extract (98% caffeine, 23.52 mg)(leaf)', 'softgel')?.lock.why !== named('InnovaTea Natural Tea extract')) throw new Error('t328u tea');
if (t328uResolve('InnovaTea® Caffeine 98%', 'softgel')?.mark === 't328u') throw new Error('t328u caffeine 98 stays');
if (t328uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t328u blend');
