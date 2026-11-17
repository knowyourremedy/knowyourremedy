import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { T327U_CANONICALS } from './t327uCanonicals';
import { t275uLock } from './t275uLocks';
import { t326uLock, t326uResolve } from './t326uLocks';

const PLAIN_BRAND = new Set([
  'holixer', 'sensoril', 'shoden', 'testosurge', 'aqtiv', 'sabeet', 'oxystorm', 'primavie',
  'astragin', 'greenselect', 'bacomind', 'siliphos', 'verisol', 'optizinc', 'pomepunic',
  'lycomato', 'diosvein', 'cordiart', 'saffserene', 'glucovantage', 'geniuspure', 'caloriburn',
  'thermogp', 'pacran', 'elevatp', 'alphawave', 'bioperine', 'ksm66',
]);

const PARTS = ['root', 'leaf', 'fruit', 'seed', 'herb', 'aerial', 'bark', 'rhizome', 'flower', 'bulb', 'color', 'coating', 'carob'];

const PART_WORD = /^(?:root|leaf|leaves|fruit|seed|seeds|herb|aerial|bark|rhizome|flower|bulb|color|colour|coating|peel|berry|berries|stigma|mycelium)$/i;

function coreOf(name: string): string {
  let text = stripBrand(stripParens(name)).replace(/-/g, '');
  text = text.replace(/\bflax\s+seed\b/gi, 'flaxseed').replace(/\b\d+\s*:\s*\d+\b/g, ' ');
  const words = text.split(/\s+/).filter((word) => word && !PART_WORD.test(word));
  text = (words.length ? words : text.split(/\s+/)).join(' ');
  return fold(text);
}

let index: Map<string, string[]> | undefined;
function indexMap(): Map<string, string[]> {
  if (index) return index;
  index = new Map();
  for (const name of T327U_CANONICALS) {
    if (/\bblend\b/i.test(name)) continue;
    if (!t326uResolve(name, 'softgel') && !t326uResolve(name, 'liquid') && !t326uResolve(name, 'gummy')) continue;
    const key = coreOf(name);
    const list = index.get(key) ?? [];
    list.push(name);
    index.set(key, list);
  }
  for (const list of index.values()) list.sort((a, b) => a.length - b.length);
  return index;
}

function fromIndex(name: string, form?: string): T320uHit | undefined {
  const list = indexMap().get(coreOf(name));
  if (!list) return undefined;
  const hits: T320uHit[] = [];
  const seen = new Set<string>();
  for (const canonical of list) {
    const hit = t326uResolve(canonical, form);
    if (!hit) continue;
    const id = `${hit.lock.grade}|${hit.lock.why}`;
    if (seen.has(id)) continue;
    seen.add(id);
    hits.push(hit);
  }
  if (!hits.length) return undefined;
  if (new Set(hits.map((hit) => hit.lock.grade)).size > 1) return undefined;
  return hits[0];
}

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare).replace(/\bflax seed\b/g, 'flaxseed').replace(/cornsilk/g, 'corn silk').replace(/uvaursi/g, 'uva ursi');
}

/** Drop parentheticals. A chemical "(as ...)" form stays; it is a distinct ingredient. */
function stripParens(name: string): string {
  let current = name.replace(/\band\s*\/\s*or\b/gi, 'and');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\(([^()]*)\)/g, (full, inner: string) => (
      /^\s*as\s+/i.test(inner) ? full : ' '
    )).replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current.replace(/[®™]/g, ' ').replace(/\s+/g, ' ').trim();
}

function isBrandToken(token: string): boolean {
  if (/[®™]/.test(token)) return true;
  if (/[a-z][A-Z]/.test(token)) return true;
  if (/\d/.test(token) && !/^(?:b\d{1,2}|d\d)$/i.test(token.replace(/[®™]/g, ''))) return true;
  const bare = token.replace(/[®™]/g, '').replace(/-/g, '').toLowerCase();
  return PLAIN_BRAND.has(bare);
}

function stripBrand(name: string): string {
  const tokens = name.split(/\s+/).filter(Boolean);
  let index = 0;
  while (index < tokens.length - 1 && isBrandToken(tokens[index])) {
    const rest = tokens.slice(index + 1).join(' ');
    if (!/[A-Za-z]{3,}/.test(rest)) break;
    index += 1;
  }
  return tokens.slice(index).join(' ');
}

function candidates(name: string): string[] {
  const spaced = stripParens(name).replace(/\bflax\s+seed\b/gi, 'flaxseed');
  const bases = [spaced, spaced.replace(/-/g, ''), stripBrand(spaced), stripBrand(spaced).replace(/-/g, '')];
  const out: string[] = [];
  const push = (value: string) => {
    const next = value.replace(/\s+/g, ' ').trim();
    if (next && !out.includes(next)) out.push(next);
  };
  for (const base of bases) {
    push(base);
    if (/\band\b/i.test(base)) continue;
    for (const part of PARTS) push(`${base} (${part})`);
    push(`${base} (carob)(color)`);
  }
  return out;
}

export function t327uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  const fillOil = t275uLock(name, form);
  if (fillOil) return { lock: fillOil, mark: 't275u' };
  const direct = t326uResolve(name, form);
  if (direct) return direct;
  for (const candidate of candidates(name)) {
    const hit = t326uResolve(candidate, form);
    if (hit) return hit;
  }
  const indexed = fromIndex(name, form);
  if (indexed) return indexed;
  const asInner = name.match(/\(\s*as\s+([^)]+)\)/i);
  if (asInner) {
    const inner = asInner[1].trim();
    const named = t326uResolve(inner, form) ?? fromIndex(inner, form);
    if (named) return named;
  }
  const key = fold(stripBrand(stripParens(name)).replace(/-/g, ''));
  const ratioFree: Record<string, string> = {
    'lemon balm extract': 'Lemon Balm extract (10:1)',
    'passionflower extract': 'Passionflower extract (4:1)',
    'damiana extract': 'Damiana extract (4:1)',
  };
  const canonical = ratioFree[key];
  if (!canonical) return undefined;
  const lock = t326uLock(canonical);
  return lock ? { lock, mark: 't326u' } : undefined;
}

if (t327uResolve('Lemon Balm extract (4:1)(leaf)', 'softgel')?.lock.why !== 'Lemon Balm extract (10:1). It is included for its plant compounds.') {
  throw new Error('t327u lemon 4');
}
if (t327uResolve('Lemon Balm extract', 'softgel')?.lock.why !== 'Lemon Balm extract (10:1). It is included for its plant compounds.') {
  throw new Error('t327u lemon bare');
}
if (t327uResolve('Lemon Balm (Melissa officinalis) extract (aerial)', 'softgel')?.mark !== 't326u') throw new Error('t327u lemon latin');
if (!t327uResolve('Epimedium (Horny Goat Weed)(Epimedium sagittatum) extract (15:1)(aerial)', 'softgel')?.lock.why.includes('Epimedium extract')) {
  throw new Error('t327u epimedium 15');
}
if (t327uResolve('Horny Goat Weed (Epimedium sagittatum) extract (4:1)(aerial)', 'softgel')) throw new Error('t327u horny goat');
if (t327uResolve('Testosurge® Fenugreek extract (seed)', 'softgel')?.lock.why !== 'Fenugreek extract is an extract of fenugreek. It is included for its plant compounds.') {
  throw new Error('t327u testosurge');
}
if (t327uResolve('Holixer™ Holy Basil (Tulsi) (Ocimum tenuiflorum) extract (herb)', 'softgel')?.lock.why !== 'Holy Basil extract. It is included for its plant compounds.') {
  throw new Error('t327u holixer');
}
if (t327uResolve('Damiana (Turnera diffusa) powder (leaf)', 'softgel')) throw new Error('t327u damiana powder');
if (t327uResolve('Chebulic Myrobalan powder (fruit)', 'softgel')) throw new Error('t327u chebulic');
if (!t327uResolve('Maca extract (4:1)(root)', 'softgel')?.lock.why.startsWith('Maca extract')) throw new Error('t327u maca extract');
if (t327uResolve('Maca extract', 'softgel')?.lock.why.includes('Maca powder')) throw new Error('t327u maca bare powder');
if (t327uResolve('Beet extract', 'softgel')) throw new Error('t327u beet extract');
if (t327uResolve('Ginkgo powder (leaf)', 'softgel')) throw new Error('t327u ginkgo powder');
if (t327uResolve('Pumpkin extract (25% fatty acids, 6 mg)(seed)', 'softgel')?.lock.grade === 'moderate') throw new Error('t327u pumpkin extract');
if (t327uResolve('Pumpkin Oil (seed)', 'liquid')) throw new Error('t327u pumpkin base');
if (t327uResolve('Pumpkin Oil (seed)', 'softgel')?.lock.grade !== 'moderate') throw new Error('t327u pumpkin fill');
if (t327uResolve('Organic Chlorella Powder', 'softgel')?.mark === 't325u') throw new Error('t327u organic chlorella');
if (t327uResolve('InnovaTea® Natural Tea extract (98% caffeine, 23.52 mg)(leaf)', 'softgel')) throw new Error('t327u tea extract');
if (t327uResolve('Chromium (as Chromium Polynicotinate)', 'softgel')) throw new Error('t327u polynicotinate');
if (t327uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t327u blend');
if (t327uResolve('Ginkgo extract (4:1)(leaf)', 'softgel')?.mark !== 't322u') throw new Error('t327u ginkgo ratio');
if (t327uResolve('AstraGin® Asian Ginseng (Panax notoginseng) extract (50:1)(root)', 'softgel')?.lock.why.includes('Asian ginseng extract') !== true) {
  throw new Error('t327u astragin');
}
const passion = t327uResolve('Passionflower (Passiflora incarnata) extract (aerial)', 'softgel');
if (passion?.lock.grade !== 'cleared' || !/passionflower/i.test(passion.lock.why)) throw new Error('t327u passion bare');
if (t327uResolve('Flax Seed Oil (50% ALA)', 'softgel')?.lock.grade !== 'moderate') throw new Error('t327u flax seed');
if (t327uResolve('fruit and/or vegetable juice (color)', 'gummy')?.lock.grade !== 'cleared') throw new Error('t327u juice');
if (t327uResolve("St. John's Bread (color)", 'softgel')?.lock.grade !== 'cleared') throw new Error('t327u carob');
if (t327uResolve('di-calcium phosphate', 'softgel')?.lock.grade !== 'cleared') throw new Error('t327u dicalcium');
if (t327uResolve('sunflower oil', 'softgel')?.lock.grade !== 'moderate') throw new Error('t327u sunflower fill');
if (t327uResolve('Vitamin C (as Ascorbic Acid)', 'softgel')?.lock.why.startsWith('Ascorbic Acid') !== true) throw new Error('t327u ascorbic');
