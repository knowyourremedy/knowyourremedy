import { t240uNorm } from './t240uLocks';
import type { T320uHit } from './t320uLocks';
import { t333uResolve } from './t333uLocks';

type Lock = { grade: 'cleared' | 'moderate'; counts: false; why: string };

function gum(name: string): string {
  return `${name}. It is used as a thickener and binder.`;
}
function color(name: string): string {
  return `${name}. It is used to color the product.`;
}
function flavor(name: string): string {
  return `${name}. It adds flavor to the product.`;
}
function oil(name: string): string {
  return `${name}. It is used as a fill in the softgel. ${name} is graded Caution as a fill and Limited or Avoid when it is the base of the product (highly processed oil; EFSA and FDA treat refined seed and fruit oils as distinct from whole-food oils).`;
}

const GUMS = ['agar (organic)', 'vegetable gum'] as const;
const COLORS = ['red cabbage powder', 'natural bright yellow', 'natural red rubescent'] as const;
const FLAVORS = ['other natural flavors', 'natural lemon lime flavor', 'natural raspberry flavor'] as const;
const OILS = [
  'organic safflower oil',
  'English Lavender Essential Oil',
  'Grape Oil (seed)',
  'Millet oil',
  'Moroccan Argan Oil',
  'Oregano Oil',
  'PomePunic Pomegranate Oil',
] as const;

const PROBIOTIC = 'IS-2 Bacillus coagulans is a probiotic strain. It is included for its live bacteria.';
const DUNALIELLA = 'Dunaliella extract is an extract of the Dunaliella alga. It is included for its plant compounds.';

const BY_KEY = new Map<string, Lock>();
function add(key: string, lock: Lock) {
  if (key && !BY_KEY.has(key)) BY_KEY.set(key, lock);
}
for (const name of GUMS) add(t240uNorm(name), { grade: 'cleared', counts: false, why: gum(name) });
for (const name of COLORS) add(t240uNorm(name), { grade: 'cleared', counts: false, why: color(name) });
for (const name of FLAVORS) add(t240uNorm(name), { grade: 'cleared', counts: false, why: flavor(name) });
for (const name of OILS) add(t240uNorm(name), { grade: 'moderate', counts: false, why: oil(name) });
add('is 2 bacillus coagulans', { grade: 'cleared', counts: false, why: PROBIOTIC });
add('dunaliella extract', { grade: 'cleared', counts: false, why: DUNALIELLA });

function stripParens(name: string): string {
  let current = name.replace(/[®™]/g, ' ');
  for (let i = 0; i < 8; i += 1) {
    const next = current.replace(/\s*\([^()]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (next === current) break;
    current = next;
  }
  return current;
}

function isSoftgel(form?: string): boolean {
  return /\bsoftgel\b/.test((form ?? '').toLowerCase());
}

function complex(name: string): boolean {
  const key = t240uNorm(name);
  if (/deep ocean minerals/.test(key)) return true;
  if (/elevatp|ancient peat and apple/.test(key)) return true;
  if (/dnf\s*10|dnf10/.test(key)) return true;
  if (/phytosome/.test(key) && /green tea/.test(key)) return true;
  return false;
}

function oilKey(name: string): string | undefined {
  const bare = t240uNorm(stripParens(name));
  const raw = t240uNorm(name);
  if (/\bessential oil\b/.test(bare) && /\blavender\b/.test(bare)) return t240uNorm('English Lavender Essential Oil');
  if (/\boil\b/.test(bare) && /\bgrape\b/.test(bare) && !/\bextract\b/.test(bare)) return t240uNorm('Grape Oil (seed)');
  if (/\boil\b/.test(bare) && /\bmillet\b/.test(bare)) return t240uNorm('Millet oil');
  if (/\boil\b/.test(bare) && /\bargan\b/.test(bare)) return t240uNorm('Moroccan Argan Oil');
  if (/\boil\b/.test(bare) && /\boregano\b/.test(bare) && !/\bextract\b/.test(bare)) return t240uNorm('Oregano Oil');
  if (/\boil\b/.test(bare) && /pomegranate|pomepunic/.test(bare) && !/\bextract\b/.test(bare)) return t240uNorm('PomePunic Pomegranate Oil');
  if (/\boil\b/.test(raw) && /\bsafflower\b/.test(raw) && /\borganic\b/.test(raw)) return t240uNorm('organic safflower oil');
  return undefined;
}

export function t334uLock(name: string, form?: string): Lock | undefined {
  if (complex(name)) return undefined;
  const oilName = oilKey(name);
  if (oilName) return isSoftgel(form) ? BY_KEY.get(oilName) : undefined;
  if (/bacillus coagulans/i.test(name) && /is-?\s*2/i.test(name)) return BY_KEY.get('is 2 bacillus coagulans');
  if (/dunaliella/i.test(name) && /extract/i.test(name)) return BY_KEY.get('dunaliella extract');
  return BY_KEY.get(t240uNorm(name));
}

export function t334uResolve(name: string, form?: string): T320uHit | undefined {
  if (/\bblend\b/i.test(name)) return undefined;
  if (complex(name)) return undefined;
  if (oilKey(name)) {
    const own = t334uLock(name, form);
    return own ? { lock: own, mark: 't334u' } : undefined;
  }
  const own = t334uLock(name, form);
  if (own) return { lock: own, mark: 't334u' };
  return t333uResolve(name, form);
}

if (t334uResolve('agar (organic)', 'gummy')?.lock.why !== gum('agar (organic)')) throw new Error('t334u agar');
if (t334uResolve('vegetable gum', 'softgel')?.lock.why !== gum('vegetable gum')) throw new Error('t334u gum');
if (t334uResolve('red cabbage powder (color)', 'softgel')?.lock.why !== color('red cabbage powder')) throw new Error('t334u cabbage');
if (t334uResolve('natural bright yellow (color)', 'gummy')?.lock.why !== color('natural bright yellow')) throw new Error('t334u yellow');
if (t334uResolve('natural red rubescent (color)', 'gummy')?.lock.why !== color('natural red rubescent')) throw new Error('t334u red');
if (t334uResolve('other natural flavors', 'liquid')?.lock.why !== flavor('other natural flavors')) throw new Error('t334u flavors');
if (t334uResolve('natural lemon lime flavor', 'gummy')?.lock.why !== flavor('natural lemon lime flavor')) throw new Error('t334u lemon');
if (t334uResolve('natural raspberry flavor', 'gummy')?.lock.why !== flavor('natural raspberry flavor')) throw new Error('t334u raspberry');
if (t334uResolve('Unique IS-2™ Bacillus Coagulans (providing 4.5 Billion organisms )', 'softgel')?.lock.why !== PROBIOTIC) throw new Error('t334u bacillus');
if (t334uResolve('dunaliella extract', 'softgel')?.lock.why !== DUNALIELLA) throw new Error('t334u dunaliella');
for (const name of OILS) {
  if (t334uResolve(name, 'softgel')?.lock.why !== oil(name) || t334uResolve(name, 'softgel')?.lock.grade !== 'moderate') throw new Error(`t334u oil ${name}`);
  if (t334uResolve(name, 'liquid')) throw new Error(`t334u oil base ${name}`);
}
if (t334uResolve('English Lavender (Lavandula angustifolia) Essential Oil (flower)', 'softgel')?.lock.why !== oil('English Lavender Essential Oil')) throw new Error('t334u lavender oil');
if (t334uResolve('Millet oil (seed)', 'softgel')?.lock.why !== oil('Millet oil')) throw new Error('t334u millet');
if (t334uResolve('Moroccan Argan (Argania spinosa) Oil (kernel)', 'softgel')?.lock.why !== oil('Moroccan Argan Oil')) throw new Error('t334u argan');
if (t334uResolve('Oregano Oil (60% carvacrol, 43.2 mg)(leaf)', 'softgel')?.lock.why !== oil('Oregano Oil')) throw new Error('t334u oregano');
if (t334uResolve('PomePunic® Pomegranate Oil (seed)', 'softgel')?.lock.why !== oil('PomePunic Pomegranate Oil')) throw new Error('t334u pomepunic');
if (t334uResolve('Grape Oil (seed)', 'softgel')?.lock.why !== oil('Grape Oil (seed)')) throw new Error('t334u grape oil');
if (t334uResolve('organic safflower oil', 'softgel')?.mark !== 't334u') throw new Error('t334u safflower mark');
if (t334uResolve('English Lavender (Lavandula angustifolia) extract (4:1)(aerial)', 'softgel')?.mark === 't334u') throw new Error('t334u lavender extract');
if ((t334uResolve('Grape (fruit)', 'softgel')?.lock.why ?? '').toLowerCase().includes('oil')) throw new Error('t334u grape fruit');
if (t334uResolve('red cabbage extract (color)', 'softgel')?.mark === 't334u') throw new Error('t334u cabbage extract');
if (t334uResolve('Deep Ocean Minerals™', 'softgel')) throw new Error('t334u minerals');
if (t334uResolve('elevATP® Ancient Peat and Apple extract', 'softgel')) throw new Error('t334u elevatp');
if (t334uResolve('DNF-10® (from Yeast Hydrolysate (Saccharomyces cerevisiae))', 'softgel')) throw new Error('t334u dnf');
if (t334uResolve('GreenSelect® Phytosome Green Tea (Camellia sinensis) extract (1:2)(leaf)', 'softgel')) throw new Error('t334u phytosome');
if (t334uResolve('Broad-Spectrum Hemp extract blend (aerial)', 'liquid')) throw new Error('t334u blend');
