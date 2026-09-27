import type { RatingRecord } from '@/lib/ratingRecord';

const COUNT_UNIT =
  'capsules?|caplets?|tablets?|softgels?|gummies|gummy|chewables?|packets?|servings?|lozenges?|counts?|ct';
const STRENGTH_UNIT = 'fl\\.?\\s*oz|mcg|µg|mg|iu|ml|oz|g';
const NUM = '(?:\\d{1,3}(?:,\\d{3})+|\\d+)';

function sizePattern(): RegExp {
  const phrase = [
    `~?${NUM}\\s*-?\\s*pellets?(?:\\s+tube)?`,
    `${NUM}\\s*packs?\\s+of\\s+${NUM}(?:\\s*(?:${COUNT_UNIT}))?`,
    `${NUM}\\s*[x×]\\s*${NUM}(?:\\s*(?:${COUNT_UNIT}))?`,
    `~?${NUM}\\s*-?\\s*(?:${STRENGTH_UNIT}|${COUNT_UNIT})\\b`,
    `\\(\\s*${NUM}\\s*\\)`,
  ].join('|');
  return new RegExp(phrase, 'gi');
}

function cleanSizeText(name: string): string {
  let text = name.replace(sizePattern(), ' ');
  return text
    .replace(/\(\s*(?:\/\s*)+\)/g, ' ')
    .replace(/\(\s*\)/g, ' ')
    .replace(/\s*\/\s*(?=\))/g, '')
    .replace(/(?<=\()\s*\/\s*/g, '')
    .replace(/[,]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\(\s*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[,.\-–—]+|[,.\-–—]+$/g, '')
    .trim();
}

export function labeledProductKey(name: string): string {
  return cleanSizeText(name).toLowerCase();
}

export function packSizeLine(record: RatingRecord): string {
  const found = (record.productName.match(sizePattern()) ?? []).map((part) =>
    part.replace(/\s+/g, ' ').trim(),
  );
  if (found.length > 0) return found.join(' · ');
  const strength = record.activeIngredients
    .map((active) => active.strength.trim())
    .filter(Boolean)
    .join(', ');
  return strength;
}

export type SearchTile = {
  record: RatingRecord;
  packs: RatingRecord[];
};

function tileKey(record: RatingRecord): string {
  const formulaId = (record.formulaId ?? '').trim();
  const label = labeledProductKey(record.productName);
  if (!formulaId || !label) return `row\u0000${record.id}`;
  const brand = record.brand.trim().toLowerCase();
  const form = (record.form ?? '').trim().toLowerCase();
  return `${brand}\u0000${formulaId}\u0000${form}\u0000${label}`;
}

export function collapseSearchTiles(records: RatingRecord[]): SearchTile[] {
  const buckets = new Map<string, RatingRecord[]>();
  for (const record of records) {
    const key = tileKey(record);
    const list = buckets.get(key) ?? [];
    list.push(record);
    buckets.set(key, list);
  }
  const tiles: SearchTile[] = [];
  for (const packs of buckets.values()) {
    const sorted = [...packs].sort((a, b) => a.id.localeCompare(b.id));
    tiles.push({ record: sorted[0], packs: sorted });
  }
  return tiles.sort((a, b) =>
    a.record.productName.localeCompare(b.record.productName, undefined, { sensitivity: 'base' }),
  );
}

export function searchTileTitle(tile: SearchTile): string {
  if (tile.packs.length < 2) return tile.record.productName;
  return cleanSizeText(tile.record.productName) || tile.record.productName;
}

export function packsOnSearchTile(records: RatingRecord[], id: string): RatingRecord[] {
  for (const tile of collapseSearchTiles(records)) {
    if (tile.packs.some((pack) => pack.id === id)) return tile.packs;
  }
  return [];
}
