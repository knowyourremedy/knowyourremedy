/**
 * t133u founder rescan — Carnauba wax → Cleared (supersedes L1002 Caution).
 * Run: npx tsx scripts/t133u-rescan.ts
 * Apply: npx tsx scripts/t133u-rescan.ts --apply
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord, RiskLevel } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { plainIngredientWhy } from '../lib/scan-preview/plainLanguage';

export const T133U_CARNAUBA_LOCK_SOURCE =
  'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).';

function batchNumberFromPath(filePath: string): number | null {
  const m = filePath.match(/batch(\d+)/);
  return m ? Number(m[1]) : null;
}

function isProtectedBatch(n: number | null): boolean {
  if (n === null) return false;
  return n === 59 || (n >= 70 && n <= 143);
}

/** Standalone carnauba / palm-leaf-glaze tokens — not combined palm-oil lines. */
export function isCarnaubaIngredient(name: string): boolean {
  const raw = name.trim();
  const n = raw.toLowerCase();
  if (/brazil wax/.test(n)) return true;
  if (/^natural palm leaf glaze$/i.test(raw)) return true;
  if (!/carnauba|carnuaba/.test(n)) return false;
  if (/oil\b/.test(n) && /contain(s|ing)\s+carnauba/.test(n)) return false;
  if (n.includes('vegetable oil') && /carnauba/.test(n)) return false;
  if (n.includes('sunflower oil') && /carnauba/.test(n)) return false;
  if (n.includes('palm oil') && /carnauba/.test(n) && !/^carnauba/.test(n)) return false;
  return true;
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function rowInScope(record: RatingRecord): boolean {
  return record.inactiveIngredients.some((i) => isCarnaubaIngredient(i.name));
}

function recomputeRecord(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    if (!isCarnaubaIngredient(ingredient.name)) return ingredient;
    const panel = ingredient.source?.split(';')[0]?.trim() ?? 'Panel';
    return {
      ...ingredient,
      riskLevel: 'cleared' as const,
      source: `${panel}; ${T133U_CARNAUBA_LOCK_SOURCE}`,
    };
  });
  const verdict = verdictFromFlags(inactiveIngredients.map((i) => i.riskLevel));
  return { ...record, inactiveIngredients, verdict };
}

function findFileForId(id: string): { path: string; batch: number | null; protected: boolean } | null {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const path = join(dir, file);
    const text = readFileSync(path, 'utf8');
    if (text.includes(`'${id}'`) || text.includes(`"${id}"`)) {
      const batch = batchNumberFromPath(file);
      return { path, batch, protected: isProtectedBatch(batch) };
    }
  }
  return null;
}

const catalog = allPreviewCatalogRecords();
const inScope = catalog.filter(rowInScope);

const gradeChanges: {
  id: string;
  productName: string;
  oldVerdict: string;
  newVerdict: string;
  protected: boolean;
  file: string | null;
}[] = [];
const whyOnly: string[] = [];
const protectedRows: typeof gradeChanges = [];

for (const record of inScope) {
  const next = recomputeRecord(record);
  const fileInfo = findFileForId(record.id);
  const entry = {
    id: record.id,
    productName: record.productName,
    oldVerdict: record.verdict,
    newVerdict: next.verdict,
    protected: fileInfo?.protected ?? false,
    file: fileInfo?.path ?? null,
  };
  const verdictChanged = record.verdict !== next.verdict;
  const whyChanged = record.inactiveIngredients.some((ing, idx) => {
    const a = ing.source ?? '';
    const b = next.inactiveIngredients[idx]?.source ?? '';
    return a !== b || ing.riskLevel !== next.inactiveIngredients[idx]?.riskLevel;
  });
  if (entry.protected) {
    if (verdictChanged || whyChanged) protectedRows.push(entry);
    continue;
  }
  if (verdictChanged) gradeChanges.push(entry);
  else if (whyChanged) whyOnly.push(record.id);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function patchRecordBlock(text: string, record: RatingRecord, next: RatingRecord): string {
  const marker = `id: '${record.id}'`;
  const idIdx = text.indexOf(marker);
  if (idIdx < 0) return text;
  let end = text.indexOf("\n  {\n    id:", idIdx + marker.length);
  if (end < 0) {
    const alt = text.indexOf('\nexport const BATCH', idIdx);
    end = alt > idIdx ? alt : text.length;
  }
  let block = text.slice(idIdx, end);
  for (let i = 0; i < next.inactiveIngredients.length; i++) {
    const ing = next.inactiveIngredients[i];
    const old = record.inactiveIngredients[i];
    if (!old || !isCarnaubaIngredient(ing.name)) continue;
    if (ing.riskLevel === old.riskLevel && ing.source === old.source) continue;
    const nameRe = escapeRe(ing.name);
    block = block.replace(
      new RegExp(`(${nameRe}['"],\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
      `$1'${ing.riskLevel}'`,
    );
    block = block.replace(
      new RegExp(`(\\['${nameRe}'\\s*,\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
      `$1'${ing.riskLevel}'`,
    );
    if (ing.source && old.source && ing.source !== old.source) {
      const oldMeth = old.source.split(';').slice(1).join(';').trim();
      const newMeth = ing.source.split(';').slice(1).join(';').trim();
      if (oldMeth && block.includes(oldMeth)) {
        block = block.replace(oldMeth, newMeth);
      }
    }
  }
  if (record.verdict !== next.verdict) {
    block = block.replace(
      new RegExp(`verdict: '${escapeRe(record.verdict)}'`),
      `verdict: '${next.verdict}'`,
    );
  }
  return text.slice(0, idIdx) + block + text.slice(end);
}

const METH_REPLACEMENTS: [RegExp, string][] = [
  [
    /Methodology §5 Caution \(carnauba wax[^)]*\)\.?/gi,
    T133U_CARNAUBA_LOCK_SOURCE,
  ],
  [
    /Methodology §5 Limited \(natural palm leaf glaze \/ carnauba family\)\.?/gi,
    T133U_CARNAUBA_LOCK_SOURCE,
  ],
  [
    /Methodology §5 Cleared \(carnauba wax — wax family row per DSLD-aligned panel\)\.?/gi,
    T133U_CARNAUBA_LOCK_SOURCE,
  ],
];

function applyPatches(): void {
  const touched = new Set<string>();
  for (const record of inScope) {
    const next = recomputeRecord(record);
    const fileInfo = findFileForId(record.id);
    if (!fileInfo || fileInfo.protected) continue;
    let text = readFileSync(fileInfo.path, 'utf8');
    const updated = patchRecordBlock(text, record, next);
    if (updated !== text) {
      text = updated;
      touched.add(fileInfo.path);
    }
    writeFileSync(fileInfo.path, text);
  }
  const dir = join(process.cwd(), 'lib/rating-drafts');
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const batch = batchNumberFromPath(file);
    if (isProtectedBatch(batch)) continue;
    const path = join(dir, file);
    let text = readFileSync(path, 'utf8');
    let changed = false;
    for (const [re, repl] of METH_REPLACEMENTS) {
      const next = text.replace(re, repl);
      if (next !== text) {
        text = next;
        changed = true;
      }
    }
    if (changed) {
      writeFileSync(path, text);
      touched.add(path);
    }
  }
  console.log(`touched ${touched.size} files`);
}

const analyze = !process.argv.includes('--apply');
if (analyze) {
  console.log(
    JSON.stringify(
      {
        inScopeCount: inScope.length,
        gradeChanges,
        whyOnlyCount: whyOnly.length,
        whyOnly,
        protectedRows,
      },
      null,
      2,
    ),
  );
} else {
  applyPatches();
}

for (const record of inScope) {
  const next = recomputeRecord(record);
  const fileInfo = findFileForId(record.id);
  if (!fileInfo || fileInfo.protected) continue;
  for (const ing of next.inactiveIngredients) {
    if (isCarnaubaIngredient(ing.name) && !plainIngredientWhy(ing)) {
      throw new Error(`blank why after t133u ${record.id} ${ing.name}`);
    }
  }
}
