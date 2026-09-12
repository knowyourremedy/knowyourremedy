// Preview wiring only. Imports existing draft rows — does not copy
// product data or change verdicts / recordStatus.

import { BATCH10_ADULT_DIGESTIVE } from '@/lib/rating-drafts/batch10-adult-digestive';
import type { Verdict } from '@/lib/clean-picks/verdictLabels';
import type { RatingRecord } from '@/lib/ratingRecord';

const CATALOG: RatingRecord[] = BATCH10_ADULT_DIGESTIVE;

function mustFind(id: string): RatingRecord {
  const row = CATALOG.find((record) => record.id === id);
  if (!row) {
    throw new Error(`Scan preview is missing draft row "${id}"`);
  }
  return row;
}

// Real Batch 10 rows — existing ids / formulaIds / verdict keys unchanged.
export const PREVIEW_CLEAN_ID = 'phillips-mom-original';
export const PREVIEW_USABLE_ID = 'alka-seltzer-gold';
export const PREVIEW_AVOID_ID = 'tums-ultra-fruit-dyed';

export const PREVIEW_SWITCHER: { id: string; verdict: Verdict }[] = [
  { id: PREVIEW_CLEAN_ID, verdict: 'clean' },
  { id: PREVIEW_USABLE_ID, verdict: 'caution' },
  { id: PREVIEW_AVOID_ID, verdict: 'avoid' },
];

export const PREVIEW_SWITCHER_IDS = PREVIEW_SWITCHER.map((item) => item.id);

export const PREVIEW_CLEAN = mustFind(PREVIEW_CLEAN_ID);
export const PREVIEW_USABLE = mustFind(PREVIEW_USABLE_ID);
export const PREVIEW_AVOID = mustFind(PREVIEW_AVOID_ID);

if (PREVIEW_CLEAN.verdict !== 'clean') {
  throw new Error('phillips-mom-original must stay verdict clean');
}
if (PREVIEW_USABLE.verdict !== 'caution') {
  throw new Error('alka-seltzer-gold must stay verdict caution');
}
if (PREVIEW_AVOID.verdict !== 'avoid') {
  throw new Error('tums-ultra-fruit-dyed must stay verdict avoid');
}

export type MatchedCleanAlternative = {
  record: RatingRecord;
  rankReason: string;
};

export function findDraftRecord(id: string): RatingRecord | undefined {
  return CATALOG.find((record) => record.id === id || record.formulaId === id);
}

export function getPreviewRecord(id: string | undefined): RatingRecord {
  if (id) {
    const found = findDraftRecord(id);
    if (found) return found;
  }
  return PREVIEW_CLEAN;
}

export const PREVIEW_CABINET_KEY = 'kyr-scan-preview-cabinet';

type CabinetListener = () => void;
const cabinetListeners = new Set<CabinetListener>();

function emitCabinetChange() {
  cabinetListeners.forEach((listener) => listener());
}

export function loadPreviewCabinetIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PREVIEW_CABINET_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function getPreviewCabinetSnapshot(): string {
  return JSON.stringify(loadPreviewCabinetIds());
}

export function getPreviewCabinetServerSnapshot(): string {
  return '[]';
}

export function subscribePreviewCabinet(listener: CabinetListener): () => void {
  cabinetListeners.add(listener);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', listener);
  }
  return () => {
    cabinetListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', listener);
    }
  };
}

export function togglePreviewCabinetId(id: string): { ids: string[]; saved: boolean } {
  const current = new Set(loadPreviewCabinetIds());
  const saved = !current.has(id);
  if (saved) current.add(id);
  else current.delete(id);
  const ids = [...current];
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(PREVIEW_CABINET_KEY, JSON.stringify(ids));
  }
  emitCabinetChange();
  return { ids, saved };
}

export function recordsForCabinet(ids: string[]): RatingRecord[] {
  const seen = new Set<string>();
  const records: RatingRecord[] = [];
  for (const id of ids) {
    const record = findDraftRecord(id);
    if (!record || seen.has(record.id)) continue;
    seen.add(record.id);
    records.push(record);
  }
  return records;
}

function ageMatches(scanned: RatingRecord, alt: RatingRecord): boolean {
  if (scanned.minAge == null || alt.minAge == null) return true;
  // Required: never recommend a higher minimum-age swap.
  return alt.minAge <= scanned.minAge;
}

export function matchCleanAlternatives(
  scanned: RatingRecord,
): MatchedCleanAlternative[] {
  const refs = scanned.cleanAlternatives ?? [];
  const matched: MatchedCleanAlternative[] = [];

  for (const ref of refs) {
    const alt = findDraftRecord(ref.productId);
    if (!alt) continue;
    // Independently Clean only. Do not invent a Clean. Do not pad with Usable.
    if (alt.verdict !== 'clean') continue;
    if (!ageMatches(scanned, alt)) continue;
    matched.push({ record: alt, rankReason: ref.rankReason });
  }

  // Form is labeled, not a hard filter — same-form first, then draft rank.
  // Audience: kids products prioritize other kids products.
  return matched
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (scanned.audience === 'kids') {
        const kidsA = a.item.record.audience === 'kids' ? 0 : 1;
        const kidsB = b.item.record.audience === 'kids' ? 0 : 1;
        if (kidsA !== kidsB) return kidsA - kidsB;
      }
      const formA =
        scanned.form && a.item.record.form === scanned.form ? 0 : 1;
      const formB =
        scanned.form && b.item.record.form === scanned.form ? 0 : 1;
      if (formA !== formB) return formA - formB;
      return a.index - b.index;
    })
    .map(({ item }) => item);
}

export const NO_CLEANER_MATCH_COPY = 'No cleaner match on this shelf yet';
