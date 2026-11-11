import type { RatingRecord } from '../ratingRecord';

const SILICA =
  'Silica and processed cellulose are graded Caution when they appear as fillers. This product contains one or both. They did not stack with other Limited tokens.';

const AVOID =
  'This product is Avoid because it contains three or more ingredients that are each graded Limited. When three or more Limited ingredients appear together, the product is graded Avoid.';

const SUNFLOWER =
  'Sunflower oil is graded Avoid when it is the base of a gummy or lozenge. In that form you chew the oil. This product is a softgel. The oil is only the fill, not the base of a gummy you chew, so it did not pull this grade down.';

/** Exact stored notes. Later generated sentences do not replace these. */
export const T212U_NOTES: Record<string, string> = {
  'energetix-b394-adrenal-force-60-capsules': SILICA,
  'energetix-b394-adrenatran-180-capsules': SILICA,
  'energetix-b394-aminogest-180-capsules': SILICA,
  'energetix-b394-buffered-vitamin-c': SILICA,
  'energetix-b394-catalyst-7-180-capsules': SILICA,
  'energetix-b394-catalyst-7-90-capsules': SILICA,
  'energetix-b394-catalyst-u-90-capsules': SILICA,
  'energetix-b394-colon-clear-90-capsules': SILICA,
  'energetix-b394-dgl-chewable': SILICA,
  'energetix-b394-flora-synergy-150-capsules': SILICA,
  'energetix-b394-galt-immune-90-capsules': SILICA,
  'energetix-b394-pure-body-clear-180-capsules': SILICA,
  'energetix-b394-flora-chewable-60-tablets': AVOID,
  'energetix-b394-melatonin-spray': AVOID,
  'energetix-b394-phyto-efa': SUNFLOWER,
};

export function applyT212uHonestNotes(record: RatingRecord): RatingRecord {
  const note = T212U_NOTES[record.id];
  if (!note) return record;
  if (record.honestNote === note && record.founderHonestNote === note) return record;
  return { ...record, honestNote: note, founderHonestNote: note };
}

if (Object.keys(T212U_NOTES).length !== 15) throw new Error('t212u note count');
if (new Set(Object.values(T212U_NOTES)).size !== 3) throw new Error('t212u note texts');
