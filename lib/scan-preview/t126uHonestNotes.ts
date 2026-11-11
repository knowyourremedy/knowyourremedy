import type { RatingRecord } from '../ratingRecord';

const CAPSULE_CLEARED_NOTE =
  'This product is Caution because of other Limited or Caution ingredients on the panel. The capsule shell is Cleared.';

const SET_NOTE = new Set([
  'solaray-b128-076280229639',
  'solaray-b128-076280360448',
  'solaray-b128-076280469363',
  'solaray-b128-076280600438',
  'solaray-b128-076280675559',
  'solaray-b128-076280773279',
  'solaray-b128-076280946123',
  'solaray-b128-076280955781',
  'solaray-b129-076280644753',
]);

const NATURES_ANSWER_NOTE =
  'This product is Caution because of other Caution or Limited ingredients on the panel. The capsule shell is Cleared.';

const NATURES_ANSWER = new Set([
  'naturesanswer-b326-vitamin-d3-k2-capsules',
  'naturesanswer-b326-shilajit-caps-60',
  'naturesanswer-b326-ut-answer-cranberry-capsules-90-count',
]);

/** Founder honest-note overrides. Other rows are unchanged. */
export function applyT126uHonestNotes(record: RatingRecord): RatingRecord {
  if (SET_NOTE.has(record.id)) {
    if (record.honestNote === CAPSULE_CLEARED_NOTE && record.founderHonestNote === CAPSULE_CLEARED_NOTE) {
      return record;
    }
    return { ...record, honestNote: CAPSULE_CLEARED_NOTE, founderHonestNote: CAPSULE_CLEARED_NOTE };
  }
  if (NATURES_ANSWER.has(record.id)) {
    if (record.honestNote === NATURES_ANSWER_NOTE && record.founderHonestNote === NATURES_ANSWER_NOTE) {
      return record;
    }
    return { ...record, honestNote: NATURES_ANSWER_NOTE, founderHonestNote: NATURES_ANSWER_NOTE };
  }
  return record;
}
