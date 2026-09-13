// Preview wiring only. Imports existing draft rows — does not copy
// product data or change verdicts / recordStatus.

import { BATCH10_ADULT_DIGESTIVE } from '@/lib/rating-drafts/batch10-adult-digestive';
import type { Verdict } from '@/lib/clean-picks/verdictLabels';
import type { IngredientFlag, ProductImage, RatingRecord, RiskLevel } from '@/lib/ratingRecord';

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

// Preview-only shopper copy. Does not edit draft rows or verdict keys.
const PREVIEW_HONEST_NOTE_OVERLAY: Record<string, string> = {
  [PREVIEW_CLEAN_ID]:
    'This Original liquid is Clean. The bottle is magnesium hydroxide in purified water, plus a residual sanitizer that does not change the rating. Labeled for ages 12 and up. Fine for occasional digestive use; mint and cherry Phillips bottles are different formulas.',
  [PREVIEW_USABLE_ID]:
    'This Gold tablet is Usable, not Clean, because it uses mannitol — a sugar alcohol that can bother the gut at volume. Magnesium stearate is cleared, and the formula is aspirin-free. Labeled for ages 12 and up. Fine in moderation for occasional heartburn; pause if sugar alcohols upset your stomach.',
  [PREVIEW_AVOID_ID]:
    'This Assorted Fruit chew is Avoid because of synthetic dye lakes and talc — both High-risk extras. The dyes are the family linked to hyperactivity warnings in the EU; flavors are a smaller listing. Labeled for ages 12 and up. Skip this bottle for everyday use and pick a cleaner chew if you want one without dyes or talc.',
};

// Preview-only catalog pack shots. Does not edit draft rows.
// verifiedSku is true only when the DailyMed file is the exact SKU.
const PREVIEW_IMAGE_OVERLAY: Record<string, ProductImage> = {
  [PREVIEW_CLEAN_ID]: {
    url: '/scan-preview/phillips-mom-original.jpg',
    source: 'catalog',
    verifiedSku: true,
  },
  [PREVIEW_USABLE_ID]: {
    url: '/scan-preview/alka-seltzer-gold.jpg',
    source: 'catalog',
    verifiedSku: true,
  },
  [PREVIEW_AVOID_ID]: {
    url: '/scan-preview/tums-ultra-fruit-dyed.jpg',
    source: 'catalog',
    verifiedSku: true,
  },
};

// Reuse the three existing pack shots only. Match id or formulaId;
// do not invent a photo or fetch a new file.
export function previewOverlayImage(
  record: Pick<RatingRecord, 'id' | 'formulaId'>,
): ProductImage | undefined {
  const fromId = PREVIEW_IMAGE_OVERLAY[record.id];
  if (fromId) return fromId;
  if (record.formulaId && record.formulaId !== record.id) {
    return PREVIEW_IMAGE_OVERLAY[record.formulaId];
  }
  return undefined;
}

function withPreviewHonestNote(record: RatingRecord): RatingRecord {
  const honestNote = PREVIEW_HONEST_NOTE_OVERLAY[record.id];
  const productImage = PREVIEW_IMAGE_OVERLAY[record.id];
  if (!honestNote && !productImage) return record;
  return {
    ...record,
    ...(honestNote ? { honestNote } : {}),
    ...(productImage ? { productImage } : {}),
  };
}

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
    if (found) return withPreviewHonestNote(found);
  }
  return withPreviewHonestNote(PREVIEW_CLEAN);
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

// Resting gray line — never the word "High" alone.
export function restingRiskLabel(level: RiskLevel): string {
  if (level === 'high') return 'High risk';
  if (level === 'moderate') return 'Moderate risk';
  if (level === 'limited') return 'Limited risk';
  return 'Cleared';
}

// Five flagged-row types only. Short gray labels, not paragraphs.
export type FlagIconKind =
  | 'dye'
  | 'preservative'
  | 'sweetener'
  | 'additive'
  | 'active-safety';

export function ingredientTypeKind(ingredient: IngredientFlag): FlagIconKind {
  const name = normalizeName(ingredient.name);
  const source = (ingredient.source ?? '').toLowerCase();

  if (
    source.includes('synthetic dyes')
    || /fd c|d c|aluminum lake|blue no|red no|yellow no|green no/.test(name)
    || name.includes('dye')
  ) {
    return 'dye';
  }

  if (
    /sorbate|benzoate|paraben/.test(name)
    || source.includes('paraben')
    || source.includes('benzoate')
    || source.includes('sorbate')
  ) {
    return 'preservative';
  }

  if (
    /aspartame|sucralose|saccharin|acesulfame|ace k|mannitol|sorbitol|xylitol|erythritol|maltitol|isomalt/.test(name)
    || source.includes('sugar alcohol')
    || source.includes('mannitol')
    || source.includes('sorbitol')
    || source.includes('sucralose')
    || source.includes('aspartame')
    || source.includes('saccharin')
  ) {
    return 'sweetener';
  }

  return 'additive';
}

export function ingredientTypeLabel(kind: FlagIconKind): string {
  if (kind === 'dye') return 'Synthetic dye';
  if (kind === 'preservative') return 'Preservative';
  if (kind === 'sweetener') return 'Sweetener';
  if (kind === 'active-safety') return 'Active-safety cap';
  return 'Additive';
}

export function restingTypeLine(ingredient: IngredientFlag): string {
  return `${ingredientTypeLabel(ingredientTypeKind(ingredient))} · ${restingRiskLabel(ingredient.riskLevel)}`;
}

export function dailyMedHref(source?: string): string | null {
  if (!source) return null;
  const match = source.match(/DailyMed setid\s+([0-9a-f-]+)/i);
  if (!match) return null;
  return `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${match[1]}`;
}

export type IngredientWhy = {
  body: string;
  sourceName: string | null;
  sourceHref: string | null;
};

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function sourceDisplay(source?: string): Pick<IngredientWhy, 'sourceName' | 'sourceHref'> {
  if (!source) return { sourceName: null, sourceHref: null };
  const sourceHref = dailyMedHref(source);
  if (sourceHref) return { sourceName: 'DailyMed', sourceHref };
  const first = source.split(';').map((part) => part.trim()).find(Boolean);
  return { sourceName: first ?? source, sourceHref: null };
}

// Locked §5 wording + the draft source field. Do not invent studies, %, or grades.
function lockedWhyBody(ingredient: IngredientFlag): string | null {
  const name = normalizeName(ingredient.name);
  const source = (ingredient.source ?? '').toLowerCase();

  if (
    source.includes('synthetic dyes')
    || /fd c|d c|aluminum lake|blue no|red no|yellow no|green no/.test(name)
  ) {
    return 'Synthetic color. Independent reviews link this dye family to hyperactivity warnings in the EU; we score the family High risk, and cleaner formulas exclude it.';
  }

  if (name.includes('talc') || source.includes('talc')) {
    return 'Contains talc (magnesium silicate). IARC classifies talc Group 2A, with a separate asbestos-contamination pathway; we score it High risk, and cleaner formulas exclude it.';
  }

  if (
    name.includes('mannitol')
    || name.includes('sorbitol')
    || source.includes('mannitol')
    || source.includes('sorbitol')
    || source.includes('sugar alcohols')
  ) {
    return 'Sugar alcohol. Limited risk from GI effects at volume; cleaner formulas exclude it.';
  }

  if (name.includes('flavor') || source.includes('flavors — opacity') || source.includes('natural / artificial flavors')) {
    return 'Undisclosed flavor mixture. Limited risk for opacity, not a known hazard; cleaner formulas exclude it.';
  }

  if (ingredient.riskLevel === 'cleared') {
    if (source.includes('not in methodology') || source.includes('ungraded')) {
      return 'Why pending review';
    }
    if (name.includes('magnesium stearate') || name.includes('stearic acid') || name.includes('calcium stearate')) {
      return 'Standard lubricant (stearate-family class). EFSA 2018 found no safety concern.';
    }
    if (name.includes('purified water')) {
      return 'Purified water. Methodology §5 lists it among cleared bases.';
    }
    if (name.includes('corn starch') || name.includes('pregelatinized starch')) {
      return 'Simple starch. Methodology §5 treats corn starch and similar starches as well-established, with no concern found.';
    }
    if (name === 'sucrose' || name.includes('cane sugar')) {
      return 'Acceptable sweetener. Methodology §5 lists cane sugar among cleared sweeteners.';
    }
    if (name.includes('croscarmellose')) {
      return 'Standard disintegrant. EFSA 2017: no carcinogenicity, no ADI needed.';
    }
    if (name.includes('lactose')) {
      return 'Lactose. Methodology §5 lists it among cleared inactives.';
    }
  }

  return null;
}

export function ingredientWhy(ingredient: IngredientFlag): IngredientWhy {
  const display = sourceDisplay(ingredient.source);
  const body = lockedWhyBody(ingredient);
  if (body) return { body, ...display };
  return {
    body: 'Why pending review',
    ...display,
  };
}
