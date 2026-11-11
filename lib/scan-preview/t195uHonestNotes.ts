import type { RatingRecord } from '../ratingRecord';

const CLEAR_ID = 'gol-kids-plus-strawberry-banana';

/** This row has no stored note. The shown sentence is generated. Suppress it here only. */
export function t195uClearsNote(record: RatingRecord): boolean {
  return record.id === CLEAR_ID;
}

if (!t195uClearsNote({ id: CLEAR_ID } as RatingRecord)) throw new Error('t195u id');
if (t195uClearsNote({ id: 'gol-organic-kids-probiotics-berry-cherry' } as RatingRecord)) {
  throw new Error('t195u other row');
}
