// SCOPE PARK (Sept 14): Pedialyte-class drinks are food/drink-shaped.
// Hide from user-facing Search / Home / Cabinet browse and from
// night-photo queues. Draft files stay on disk — do not delete.
// This list is Pedialyte only. Protein-park work is out of scope.
// Liquid I.V. / Gatorade are not in rating-drafts; do not hide others.

export const PARKED_PEDIALYTE_BROWSE_IDS = [
  'pedialyte-classic-unflavored',
  'pedialyte-classic-flavored',
  'pedialyte-freezer-pops',
] as const;

const PARKED_BROWSE_IDS = new Set<string>(PARKED_PEDIALYTE_BROWSE_IDS);

export function isParkedBrowseId(id: string | undefined): boolean {
  if (!id) return false;
  if (PARKED_BROWSE_IDS.has(id)) return true;
  // Any later draft id that still matches Pedialyte.
  return id.toLowerCase().includes('pedialyte');
}

export function isParkedBrowseRecord(record: {
  id: string;
  brand?: string;
  productName?: string;
}): boolean {
  if (isParkedBrowseId(record.id)) return true;
  const brand = (record.brand ?? '').trim().toLowerCase();
  if (brand === 'pedialyte') return true;
  return (record.productName ?? '').toLowerCase().includes('pedialyte');
}
