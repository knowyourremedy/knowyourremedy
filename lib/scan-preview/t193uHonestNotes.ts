import type { RatingRecord } from '../ratingRecord';
import { t190uFormOils } from './t190uHonestNotes';

const CLEAR = new Set([
  'genexa-acetaminophen-pm',
  'medinatura-t-relief-pain-cream',
  'medinatura-t-relief-xs-cream',
  'medinatura-t-relief-lidocaine-4-cream',
  'natures-way-probiotic-pearls-womens',
  'natures-way-probiotic-pearls-acidophilus',
  'natures-way-probiotic-pearls-complete',
  'natures-way-probiotic-pearls-elite',
  'natures-way-probiotic-pearls-max',
  'natures-way-probiotic-pearls-adult-50',
  'natures-way-primadophilus-reuteri-pearls',
  'biogaia-protectis-baby-drops-d3',
  'now-liquid-vitamin-d-3-1-000-iu-1-fl-oz-30-ml',
  'now-liquid-vitamin-d-3-2-fl-oz-59-ml',
  'now-liquid-coq10-orange-4-fl-oz-118-ml',
  'solaray-b118-076280731613',
  'physicianschoice-b225-kids-probiotic-fiber-24',
  'metamucil-b253-fiber-thins-apple-12',
  'metamucil-b254-fiber-thins-cinnamon-12',
  'culturelle-b258-baby-calm-drops',
  'culturelle-b258-baby-immune-drops',
]);

const CHEW = new Set([
  'natures-way-actifruit',
  'physicianschoice-b226-kids-probiotic-chewable-30',
  'physicianschoice-b226-kids-probiotic-chewable-60',
  'gol-kids-plus-strawberry-banana',
]);

function capFirst(name: string): string {
  const text = name.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function chewableHonestNote(oil: string): string {
  return `${capFirst(oil)} is graded Avoid here because it is the base of this chewable. In that form you chew the oil. The same oil is graded Cleared when it is only the fill of a capsule, softgel, or tablet.`;
}

export type T193uDecision =
  | { kind: 'skip' }
  | { kind: 'clear' }
  | { kind: 'write'; note: string; oil: string }
  | { kind: 'hold'; oil: string };

/** Clears 21 form holds and writes the chewable note only on Avoid rows. */
export function t193uDecision(record: RatingRecord): T193uDecision {
  if (CLEAR.has(record.id)) return { kind: 'clear' };
  if (!CHEW.has(record.id)) return { kind: 'skip' };
  const oils = t190uFormOils(record.inactiveIngredients ?? []);
  const avoid = oils.find((ingredient) => ingredient.riskLevel === 'high');
  const oil = (avoid ?? oils[0])?.name.trim() ?? '';
  if (record.verdict !== 'avoid') return { kind: 'hold', oil };
  if (!avoid) return { kind: 'hold', oil };
  return { kind: 'write', note: chewableHonestNote(avoid.name), oil: avoid.name.trim() };
}

if (CLEAR.size !== 21) throw new Error('t193u clear count');
if (CHEW.size !== 4) throw new Error('t193u chew count');
for (const id of CLEAR) {
  if (CHEW.has(id)) throw new Error(`t193u overlap ${id}`);
}
const sample = chewableHonestNote('palm oil');
if (sample !== 'Palm oil is graded Avoid here because it is the base of this chewable. In that form you chew the oil. The same oil is graded Cleared when it is only the fill of a capsule, softgel, or tablet.') {
  throw new Error('t193u chew text');
}
