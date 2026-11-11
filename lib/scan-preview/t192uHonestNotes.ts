import type { RatingRecord } from '../ratingRecord';
import { t190uDecision, t190uFormOils, type T190uDecision } from './t190uHonestNotes';

export type T192uForm = 'capsule' | 'softgel' | 'tablet';

/** Capsule, softgel, or tablet. Other forms, including film-coated tablets, stay out. */
export function t192uFormWord(form: string | undefined): T192uForm | null {
  const value = (form ?? '').trim().toLowerCase();
  if (value === 'capsule' || value === 'softgel' || value === 'tablet') return value;
  return null;
}

function capFirst(name: string): string {
  const text = name.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function fillHonestNote(oil: string, form: T192uForm): string {
  return `${capFirst(oil)} is graded Cleared here because it is only the fill of this ${form}. In that form it functions as a carrier. The same oil is graded Avoid when it is the base of a gummy, lozenge, or chew.`;
}

export type T192uDecision =
  | { kind: 'skip' }
  | { kind: 'clear' }
  | { kind: 'write'; note: string; oil: string; multi: boolean }
  | { kind: 'hold'; oil: string; form: string };

/** Clears stack holds and writes the fill note on Cleared capsule, softgel, and tablet rows. */
export function t192uDecision(record: RatingRecord, prior: T190uDecision = t190uDecision(record)): T192uDecision {
  if (prior.kind !== 'hold') return { kind: 'skip' };
  if (prior.reasons.includes('a-not-Avoid') || prior.reasons.includes('a-has-Avoid-token')) {
    return { kind: 'clear' };
  }
  if (!prior.reasons.includes('b-not-Avoid-form')) return { kind: 'skip' };
  const oils = t190uFormOils(record.inactiveIngredients ?? []);
  const form = t192uFormWord(record.form);
  const first = oils[0];
  const oil = first?.name.trim() ?? '';
  const rowForm = (record.form ?? '').trim();
  if (!form || !first || first.riskLevel !== 'cleared') {
    return { kind: 'hold', oil, form: rowForm };
  }
  return {
    kind: 'write',
    note: fillHonestNote(first.name, form),
    oil,
    multi: oils.length > 1,
  };
}

if (t192uFormWord('tablet') !== 'tablet') throw new Error('t192u tablet');
if (t192uFormWord('softgel') !== 'softgel') throw new Error('t192u softgel');
if (t192uFormWord('capsule') !== 'capsule') throw new Error('t192u capsule');
if (t192uFormWord('pearl') !== null) throw new Error('t192u pearl');
if (t192uFormWord('film-coated tablet') !== null) throw new Error('t192u film-coated');
if (t192uFormWord('powder') !== null) throw new Error('t192u powder');
const sample = fillHonestNote('soybean oil', 'softgel');
if (!sample.startsWith('Soybean oil is graded Cleared here because it is only the fill of this softgel. ')) {
  throw new Error('t192u fill text');
}
