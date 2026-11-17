import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t331uResolve } from './t331uLocks';

type Lock = { grade: 'cleared'; counts: false; why: string };

function mushroom(name: string): string {
  return `${name}. It is included for its plant compounds.`;
}
function named(name: string): string {
  return `${name}. It is included for its plant, enzyme, or nutrient compounds.`;
}

const ORGANIC_CORDYCEPS: Lock = {
  grade: 'cleared',
  counts: false,
  why: 'Organic Cordyceps powder is dried Cordyceps. It is included for its plant compounds.',
};

const MUSHROOMS = [
  "Lion's Mane",
  'Agaricus',
  'Chaga',
  'Maitake',
  'Reishi',
  'Shiitake',
  'Turkey Tail',
] as const;

const NAMES = [
  'Amylase',
  'Andrographis',
  'Apple Cider Vinegar',
  'Apricot Oil',
  'Aztec Marigold',
  'Barberry',
  'Beta Glucan',
  'Betaine',
  'Bifidobacterium bifidum',
  'Bilberry',
  'Black Cohosh',
  'Bromelain',
  'calcium ascorbate',
  'Cascara Sagrada',
  'Chia Oil',
  'Chrysin',
  'Citrus Bioflavonoids',
] as const;

function fold(name: string): string {
  const bare = name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[’']/g, '');
  return t240uNorm(bare);
}

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ').replace(/\borganic\b/ig, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current
      .replace(/\s*\([^()]*\)/g, ' ')
      .replace(/\b\d[\d,]*(?:\.\d+)?\s*(?:du|gdu|hut|alu|cu|lu|usp(?:\s+units)?)\b/ig, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (next === current) break;
    current = next;
  }
  return current.replace(/\s+(?:extract|powder|mushroom|oil)\b/ig, (word) => (
    /\boil\b/i.test(word) ? word : ' '
  )).replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const name of MUSHROOMS) {
  BY_KEY.set(fold(name), { grade: 'cleared', counts: false, why: mushroom(name) });
}
for (const name of NAMES) {
  if (name === 'Apricot Oil' || name === 'Chia Oil') continue;
  BY_KEY.set(fold(name), { grade: 'cleared', counts: false, why: named(name) });
}
const APRICOT: Lock = { grade: 'cleared', counts: false, why: named('Apricot Oil') };
const CHIA: Lock = { grade: 'cleared', counts: false, why: named('Chia Oil') };

function isSoftgel(form?: string): boolean {
  return /\bsoftgel\b/.test((form ?? '').toLowerCase());
}

function oilFill(name: string, form?: string): Lock | undefined {
  const key = fold(stripParens(name).replace(/\s+oil\b/ig, ' oil'));
  const oil = key === 'apricot oil' ? APRICOT : key === 'chia oil' ? CHIA : undefined;
  if (!oil) return undefined;
  return isSoftgel(form) ? oil : undefined;
}

export function t332uLock(name: string, form?: string): Lock | undefined {
  if (/\borganic\b/i.test(name) && /\bcordyceps\b/i.test(name)) return ORGANIC_CORDYCEPS;
  const oil = oilFill(name, form);
  if (oil || fold(stripParens(name)).replace(/\s+oil\b/i, ' oil') === 'apricot oil' || fold(stripParens(name)) === 'chia oil') {
    return oil;
  }
  if (/vitamin\s*c\b/i.test(name) && /calcium ascorbate/i.test(name)) return BY_KEY.get('calcium ascorbate');
  const key = fold(stripParens(name));
  if (key === 'betaine' || key === 'betaine hydrochloride' || key === 'trimethylglycine hydrochloride') {
    return BY_KEY.get('betaine');
  }
  return BY_KEY.get(key);
}

export function t332uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  const ownFirst = t332uLock(name, form);
  if (ownFirst && (/\bcordyceps\b|\bbioflavonoid|\bapricot oil\b|\bchia oil\b|calcium ascorbate|\bbetaine\b/i.test(name) || MUSHROOMS.some((mushroomName) => new RegExp(mushroomName.replace(/'/g, "'?"), 'i').test(name)))) {
    return { lock: ownFirst, mark: 't332u' };
  }
  if (/\b(apricot oil|chia oil)\b/i.test(fold(stripParens(name))) && !isSoftgel(form)) return undefined;
  const prior = t331uResolve(name, form);
  if (prior) return prior;
  const own = t332uLock(name, form);
  return own ? { lock: own, mark: 't332u' } : undefined;
}

if (t332uLock("Lion's Mane")?.why !== "Lion's Mane. It is included for its plant compounds.") throw new Error('t332u mane why');
if (t332uResolve("Lion's Mane Mushroom powder (fruiting body)", 'softgel')?.lock.why !== mushroom("Lion's Mane")) throw new Error('t332u mane');
if (t332uResolve('Organic Lion’s Mane (Hericium erinaceus) Mushroom powder (mycelium and fruiting body)', 'softgel')?.lock.why !== mushroom("Lion's Mane")) throw new Error('t332u organic mane');
if (t332uResolve('Organic Agaricus (Agaricus blazei) Mushroom powder (mycelium)', 'softgel')?.lock.why !== mushroom('Agaricus')) throw new Error('t332u agaricus');
if (t332uResolve('Organic Chaga Mushroom powder (mycelium)', 'softgel')?.lock.why !== mushroom('Chaga')) throw new Error('t332u chaga');
if (t332uResolve('Organic Maitake Mushroom powder (mycelium)', 'softgel')?.lock.why !== mushroom('Maitake')) throw new Error('t332u maitake');
if (t332uResolve('Organic Reishi (Ganoderma lucidum) Mushroom powder (fruiting body)', 'softgel')?.lock.why !== mushroom('Reishi')) throw new Error('t332u reishi');
if (t332uResolve('Organic Shiitake Mushroom powder (mycelium and fruiting body)', 'softgel')?.lock.why !== mushroom('Shiitake')) throw new Error('t332u shiitake');
if (t332uResolve('Organic Turkey Tail Mushroom powder (fruiting body)', 'softgel')?.lock.why !== mushroom('Turkey Tail')) throw new Error('t332u turkey');
if (t332uResolve('Organic Cordyceps (Cordyceps sinensis) Mushroom powder (mycelium)', 'softgel')?.lock.why !== ORGANIC_CORDYCEPS.why) throw new Error('t332u organic cordyceps');
if (t332uResolve('Cordyceps (Cordyceps sinensis) extract (mycelium)', 'softgel')?.mark !== 't331u') throw new Error('t332u bare cordyceps stays');
if (t332uResolve('Amylase 2,297 DU', 'softgel')?.lock.why !== named('Amylase')) throw new Error('t332u amylase');
if (t332uResolve('Andrographis extract (10:1)(stem)', 'softgel')?.lock.why !== named('Andrographis')) throw new Error('t332u andro');
if (t332uResolve('Apple Cider Vinegar (Organic)', 'softgel')?.lock.why !== named('Apple Cider Vinegar')) throw new Error('t332u acv');
if (t332uResolve('Apricot Oil (kernel)', 'softgel')?.lock.why !== named('Apricot Oil')) throw new Error('t332u apricot fill');
if (t332uResolve('Apricot Oil (kernel)', 'liquid')) throw new Error('t332u apricot base');
if (t332uResolve('Aztec Marigold extract (20% lutein, 12 mg, 1% zeaxanthin, 0.6 mg)(flower)', 'softgel')?.lock.why !== named('Aztec Marigold')) throw new Error('t332u marigold');
if (t332uResolve('Barberry extract (6:1)(root)', 'softgel')?.lock.why !== named('Barberry')) throw new Error('t332u barberry');
if (t332uResolve('Beta Glucan', 'softgel')?.lock.why !== named('Beta Glucan')) throw new Error('t332u glucan');
if (t332uResolve('Betaine (as Trimethylglycine Hydrochloride)', 'softgel')?.lock.why !== named('Betaine')) throw new Error('t332u betaine as');
if (t332uResolve('Betaine Hydrochloride', 'softgel')?.lock.why !== named('Betaine')) throw new Error('t332u betaine hcl');
if (t332uResolve('Bifidobacterium bifidum (500 million CFU/g )', 'softgel')?.lock.why !== named('Bifidobacterium bifidum')) throw new Error('t332u bifido');
if (t332uResolve('Bilberry extract (25% anthocyanidins, 80 mg)(fruit)', 'softgel')?.lock.why !== named('Bilberry')) throw new Error('t332u bilberry');
if (t332uResolve('Black Cohosh extract (2.5% triterpenoid saponins, 2 mg)(root)', 'softgel')?.lock.why !== named('Black Cohosh')) throw new Error('t332u cohosh');
if (t332uResolve('Bromelain 240 GDU', 'softgel')?.lock.why !== named('Bromelain')) throw new Error('t332u bromelain');
if (t332uResolve('calcium ascorbate', 'softgel')?.lock.why !== named('calcium ascorbate')) throw new Error('t332u ascorbate');
if (t332uResolve('Vitamin C (as Calcium Ascorbate)', 'softgel')?.lock.why !== named('calcium ascorbate')) throw new Error('t332u vitamin c ascorbate');
if (t332uResolve('Cascara Sagrada extract (bark)', 'softgel')?.lock.why !== named('Cascara Sagrada')) throw new Error('t332u cascara extract');
if (t332uResolve('Cascara Sagrada powder (bark)', 'softgel')?.lock.why !== named('Cascara Sagrada')) throw new Error('t332u cascara powder');
if (t332uResolve('Chia (Salvia hispanica L.) Oil (seed)', 'softgel')?.lock.why !== named('Chia Oil')) throw new Error('t332u chia fill');
if (t332uResolve('Chia (Salvia hispanica L.) Oil (seed)', 'liquid')) throw new Error('t332u chia base');
if (t332uResolve('Chrysin', 'softgel')?.lock.why !== named('Chrysin')) throw new Error('t332u chrysin');
if (t332uResolve('Citrus (Citrus sinensis) Bioflavonoids extract (80% bioflavonoids, 160 mg)(fruit)', 'softgel')?.lock.why !== named('Citrus Bioflavonoids')) throw new Error('t332u bioflav');
if (t332uResolve('Citrus (Citrus spp.) extract (50% bioflavonoids, 50 mg)(fruit)', 'softgel')?.mark === 't332u') throw new Error('t332u citrus extract stays');
if (t332uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t332u blend');
