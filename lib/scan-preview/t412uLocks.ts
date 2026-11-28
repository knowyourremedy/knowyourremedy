import type { T320uHit } from './t320uLocks';
import { t410uResolve } from './t410uLocks';

type Lock = { grade: 'cleared' | 'limited' | 'moderate' | 'high'; counts: boolean; why: string };

const TREMELLA = 'Tremella mushroom extract is an extract of the tremella mushroom. It is included for its plant compounds.';
const CARROT = 'Black carrot juice is juice from black carrots. It is used to color the product.';
const APPLE = 'Natural apple flavor is a flavor from apple. It adds apple taste to the product.';
const RADISH = 'Red radish is a vegetable. It is used to color the product.';
const PRUNE = 'Prune is a dried plum. It is included for its plant compounds.';
const BILBERRY = 'Wild bilberry extract is an extract of bilberry. It is included for its plant compounds.';
const SPROUT = 'Broccoli sprout is a young broccoli plant. It is included for its plant compounds.';
const ONION = 'Onion extract is an extract of onion. It is included for its plant compounds.';
const KALE = 'Kale is a leafy vegetable. It is included for its plant compounds.';

const CLEARED: Array<[string, string]> = [
  ['Tremella Mushroom Extract (Tremella fuciformis) (Fruiting Body) (200:1)', TREMELLA],
  ['Black Carrot Juice (for color)', CARROT],
  ['Natural Apple Flavor', APPLE],
  ['Red Radish (for color)', RADISH],
  ['Prune', PRUNE],
  ['Wild Bilberry Extract', BILBERRY],
  ['Broccoli Sprout', SPROUT],
  ['Onion Extract', ONION],
  ['Kale', KALE],
];

function keyOf(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

const BY_KEY = new Map<string, Lock>();
for (const [name, why] of CLEARED) {
  const key = keyOf(name);
  if (BY_KEY.has(key)) throw new Error(`t412u duplicate ${name}`);
  if (t410uResolve(name, 'gummy') || t410uResolve(name, 'liquid')) throw new Error(`t412u conflict ${name}`);
  BY_KEY.set(key, { grade: 'cleared', counts: false, why });
}

/** Cleared locks for the remaining Fungies strings. A prior lock wins. */
export function t412uResolve(name: string, form?: string): T320uHit | undefined {
  const exact = BY_KEY.get(keyOf(name));
  if (exact) return { lock: exact, mark: 't412u' };
  return t410uResolve(name, form);
}

for (const [name, why] of CLEARED) {
  const hit = t412uResolve(name, 'gummy');
  if (hit?.mark !== 't412u' || hit.lock.grade !== 'cleared' || hit.lock.counts || hit.lock.why !== why) {
    throw new Error(`t412u ${name}`);
  }
}
if (t412uResolve('Bilberry Extract', 'gummy')?.mark === 't412u') throw new Error('t412u bilberry');
if (t412uResolve('Red Radish', 'gummy')?.mark === 't412u') throw new Error('t412u bare radish');
if (t412uResolve('Natural Flavors', 'gummy')?.mark === 't412u') throw new Error('t412u natural flavors');
