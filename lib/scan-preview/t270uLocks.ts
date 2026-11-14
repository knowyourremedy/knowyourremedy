import type { RatingRecord } from '../ratingRecord';

/** Purely Inspired batch423 only. No new ingredient locks. Strips a generated note. */
export function applyT270uRow(record: RatingRecord): RatingRecord {
  if (!record.id.startsWith('purelyinspired-b423-')) return record;
  const next: RatingRecord = { ...record };
  delete next.honestNote;
  delete next.founderHonestNote;
  return next;
}
