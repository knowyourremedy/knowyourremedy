import type { T320uHit } from './t320uLocks';
import { t399uResolve } from './t399uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const COLOSTRUM = 'Whole bovine colostrum is the first milk from cows. It is included for its protein compounds.';
const HAZELNUT = 'Organic hazelnut butter is ground hazelnuts. It is included for its plant compounds.';
const RESIN = 'Purified mineral pitch resin is a mineral resin. It is included for its mineral compounds.';
const ELDER = 'Organic elderberry extract 16:1 is a concentrated extract of elderberry. It is included for its plant compounds.';
const FLAVOR = '[Named flavor]. It adds [named] taste to the product.';

const LOCKS: Array<[string, string]> = [
  ['Whole Bovine Colostrum', COLOSTRUM],
  ['Organic Hazelnut Butter', HAZELNUT],
  ['Purified mineral pitch resin', RESIN],
  ['Organic Elderberry Extract 16:1', ELDER],
  ['Lychee Flavor', FLAVOR],
  ['Watermelon Flavor', FLAVOR],
  ['Lemon Citrus Flavor', FLAVOR],
];

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of LOCKS) {
  const key = name.toLowerCase();
  if (BY_KEY.has(key)) throw new Error(`t400u duplicate ${name}`);
  const prior = t399uResolve(name, 'liquid') || t399uResolve(name, 'powder');
  if (prior) throw new Error(`t400u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

/** Existing locks. Organic is not part of these tokens. */
const ORGANIC_BASE = new Set(['cacao powder', 'blueberry juice concentrate', 'citrus extract']);

function stripBotanicalTail(name: string): string {
  let current = name.trim();
  for (let i = 0; i < 4; i += 1) {
    if (!current.endsWith(')')) break;
    let depth = 0;
    let start = -1;
    for (let index = current.length - 1; index >= 0; index -= 1) {
      if (current[index] === ')') depth += 1;
      else if (current[index] === '(') {
        depth -= 1;
        if (depth === 0) {
          start = index;
          break;
        }
      }
    }
    if (start < 0) break;
    const inner = current.slice(start + 1, -1);
    const botanical = /\b(?:fruit|root|leaf|seed|bark|flower)\b/i.test(inner)
      || /[A-Z][a-z]+\s+[a-z]+/.test(inner);
    if (!botanical) break;
    current = current.slice(0, start).trim();
  }
  return current;
}

function organicBase(name: string, form?: string): T320uHit | undefined {
  const match = name.trim().match(/^organic\s+(.+)$/i);
  if (!match) return undefined;
  const rest = match[1].trim();
  if (!ORGANIC_BASE.has(rest.toLowerCase())) return undefined;
  return t399uResolve(rest, form);
}

/** Cleared, do not stack. The elderberry botanical parenthetical is not a new token. */
export function t400uResolve(name: string, form?: string): T320uHit | undefined {
  const exact = BY_KEY.get(name.trim().toLowerCase());
  if (exact) return { lock: exact, mark: 't400u' };
  const peeled = stripBotanicalTail(name);
  if (peeled.toLowerCase() !== name.trim().toLowerCase()) {
    const hit = BY_KEY.get(peeled.toLowerCase());
    if (hit) return { lock: hit, mark: 't400u' };
  }
  const organic = organicBase(name, form);
  if (organic) return organic;
  return t399uResolve(name, form);
}

if (BY_KEY.size !== LOCKS.length) throw new Error('t400u size');
for (const [name, why] of LOCKS) {
  const hit = t400uResolve(name, 'liquid');
  if (hit?.mark !== 't400u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t400u ${name}`);
  }
}
if (FLAVOR !== '[Named flavor]. It adds [named] taste to the product.') throw new Error('t400u flavor placeholder');
const elder = t400uResolve('Organic Elderberry Extract 16:1 (Sambucus nigra (Fruit))', 'liquid');
if (elder?.lock.why !== ELDER || elder.mark !== 't400u') throw new Error('t400u elder paren');
if (t400uResolve('European Elderberry Extract (10:1)', 'liquid')?.mark === 't400u') throw new Error('t400u european');
if (t400uResolve('Organic Cacao Powder', 'liquid')?.lock.why !== 'Cacao powder is dried cacao. It is included for its plant compounds.') {
  throw new Error('t400u cacao powder');
}
if (t400uResolve('organic Cacao extract', 'liquid')?.mark === 't400u') throw new Error('t400u cacao extract');
if (t400uResolve('Organic Blueberry Juice Concentrate', 'liquid')?.mark !== 't259u') throw new Error('t400u blueberry');
if (t400uResolve('Organic Citrus Extract', 'liquid')?.mark !== 't330u') throw new Error('t400u citrus');
