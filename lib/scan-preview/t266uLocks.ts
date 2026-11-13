import type { RatingRecord } from '../ratingRecord';

/** Slow-Mag batch421 only. No new ingredient locks. Strips a generated note. */
export function applyT266uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('slowmag-b421-')) return record;
  const next: RatingRecord = { ...record };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
