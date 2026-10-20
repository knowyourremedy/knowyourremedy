/**
 * t132u founder rescan — analyze catalog rows with Rice Powder or named natural fruit flavors.
 * Run: npx tsx scripts/t132u-rescan.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord, RiskLevel } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { plainIngredientWhy } from '../lib/scan-preview/plainLanguage';

const T132U_METH = {
  ricePowder:
    'Methodology §5 Cleared (Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  organicRicePowder:
    'Methodology §5 Cleared (Organic Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  naturalNamedFruitFlavor:
    'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  naturalCranberryFlavor:
    'Methodology §5 Cleared (Natural Cranberry Flavor — founder lock t132u Oct 20, 2026; named fruit flavor family).',
  naturalOrangeExtract:
    'Methodology §5 Cleared (natural Orange extract — founder lock t132u Oct 20, 2026; named fruit extract).',
  naturalStrawberryOrangeExtract:
    'Methodology §5 Cleared (natural Strawberry and Orange extract — founder lock t132u Oct 20, 2026).',
  dlTartaric:
    'Methodology §5 Cleared (DL-Tartaric Acid — founder lock t132u Oct 20, 2026; §4 re-eval).',
  beetJuiceColor:
    'Methodology §5 Cleared (Beet Juice Color — founder lock t132u Oct 20, 2026; named vegetable juice color).',
  soybeanOilHighlyRefinedFill:
    'Methodology §5 Cleared (Soybean Oil (Highly Refined) — founder lock t132u Oct 20, 2026; non-gummy fill).',
  soybeanOilHighlyRefinedGummy:
    'Methodology §5 Avoid (Soybean Oil (Highly Refined) — founder lock t132u Oct 20, 2026; gummy/lozenge seed-oil rule).',
  naturalVitaminE:
    'Methodology §5 Cleared (Natural Vitamin E — founder lock t132u Oct 20, 2026).',
  pineappleJuiceColor:
    'Methodology §5 Cleared (Pineapple Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; juice-as-color).',
  carrotJuiceColor:
    'Methodology §5 Cleared (Black/Purple Carrot Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; juice-as-color).',
  organicRebaudiosideA:
    'Methodology §5 Cleared (organic Rebaudioside A — founder lock t132u Oct 20, 2026; steviol glycoside row).',
  mctGummyUnlabeled:
    'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
  mctGummyNamed:
    'Methodology §5 Cleared (MCT — founder lock t132u Oct 20, 2026; plant source named on panel).',
} as const;

function batchNumberFromPath(filePath: string): number | null {
  const m = filePath.match(/batch(\d+)/);
  return m ? Number(m[1]) : null;
}

function isProtectedBatch(n: number | null): boolean {
  if (n === null) return false;
  return n === 59 || (n >= 70 && n <= 143);
}

function isRicePowderToken(name: string): boolean {
  const n = name.trim().toLowerCase();
  return n === 'rice powder' || n === 'organic rice powder';
}

function isNaturalNamedFruitFlavorToken(name: string): boolean {
  const raw = name.trim();
  const n = raw.toLowerCase();
  if (n === 'natural flavors' || n === 'natural flavor') return false;
  if (n.startsWith('natural and artificial')) return false;
  if (/^natural\s+[\w\s/&+-]+\s+flavor$/i.test(raw) && !/^natural\s+flavors?$/i.test(raw)) {
    return true;
  }
  if (n === 'natural cranberry flavor') return true;
  if (n === 'natural orange extract' || n.includes('natural strawberry and orange extract')) return true;
  return false;
}

function isGummyOrLozengeForm(form: string | undefined): boolean {
  const f = (form ?? '').toLowerCase();
  return f.includes('gummy') || f.includes('lozenge') || f.includes('chew');
}

function t132uOverride(
  name: string,
  form: string | undefined,
): { riskLevel: RiskLevel; meth: string } | null {
  const n = name.trim().toLowerCase();
  if (n === 'rice powder') return { riskLevel: 'cleared', meth: T132U_METH.ricePowder };
  if (n === 'organic rice powder') return { riskLevel: 'cleared', meth: T132U_METH.organicRicePowder };
  if (n === 'dl-tartaric acid' || n === 'dl tartaric acid') {
    return { riskLevel: 'cleared', meth: T132U_METH.dlTartaric };
  }
  if (n === 'beet juice color' || n === 'beet juice (color)') {
    return { riskLevel: 'cleared', meth: T132U_METH.beetJuiceColor };
  }
  if (n.includes('soybean oil') && n.includes('highly refined')) {
    return isGummyOrLozengeForm(form)
      ? { riskLevel: 'high', meth: T132U_METH.soybeanOilHighlyRefinedGummy }
      : { riskLevel: 'cleared', meth: T132U_METH.soybeanOilHighlyRefinedFill };
  }
  if (n === 'natural vitamin e') return { riskLevel: 'cleared', meth: T132U_METH.naturalVitaminE };
  if (n === 'natural cranberry flavor') {
    return { riskLevel: 'cleared', meth: T132U_METH.naturalCranberryFlavor };
  }
  if (n === 'pineapple juice concentrate (color)') {
    return { riskLevel: 'cleared', meth: T132U_METH.pineappleJuiceColor };
  }
  if (n.includes('black/purple carrot juice concentrate')) {
    return { riskLevel: 'cleared', meth: T132U_METH.carrotJuiceColor };
  }
  if (n === 'organic rebaudioside a') {
    return { riskLevel: 'cleared', meth: T132U_METH.organicRebaudiosideA };
  }
  if (n === 'natural orange extract') {
    return { riskLevel: 'cleared', meth: T132U_METH.naturalOrangeExtract };
  }
  if (n.includes('natural strawberry and orange extract')) {
    return { riskLevel: 'cleared', meth: T132U_METH.naturalStrawberryOrangeExtract };
  }
  if (isNaturalNamedFruitFlavorToken(name)) {
    return { riskLevel: 'cleared', meth: T132U_METH.naturalNamedFruitFlavor };
  }
  if (isGummyOrLozengeForm(form) && /\bmct\b|medium chain triglyceride/i.test(name)) {
    const hasPlant = /coconut|palm|from\s+\w+/i.test(name);
    return hasPlant
      ? { riskLevel: 'cleared', meth: T132U_METH.mctGummyNamed }
      : { riskLevel: 'limited', meth: T132U_METH.mctGummyUnlabeled };
  }
  if (n === 'organic mushroom powder') return null; // hold — no change
  return null;
}

function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

function rowInScope(record: RatingRecord): boolean {
  return record.inactiveIngredients.some(
    (i) => isRicePowderToken(i.name) || isNaturalNamedFruitFlavorToken(i.name),
  );
}

function recomputeRecord(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const ov = t132uOverride(ingredient.name, record.form);
    if (!ov) return ingredient;
    const panel = ingredient.source?.split(';')[0]?.trim() ?? 'Panel';
    return {
      ...ingredient,
      riskLevel: ov.riskLevel,
      source: `${panel}; ${ov.meth}`,
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
    if (!old || (ing.riskLevel === old.riskLevel && ing.source === old.source)) continue;
    const nameRe = escapeRe(ing.name);
    block = block.replace(
      new RegExp(`(${nameRe}['"],\\s*)'(limited|moderate|high|cleared)'`, 'g'),
      `$1'${ing.riskLevel}'`,
    );
    if (ing.source && old.source && ing.source !== old.source) {
      const oldMeth = old.source.split(';').slice(1).join(';').trim();
      if (oldMeth) {
        block = block.replace(oldMeth, ing.source.split(';').slice(1).join(';').trim());
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
    /Methodology §5 Caution \(Rice Powder[^)]*\)\./g,
    T132U_METH.ricePowder,
  ],
  [
    /Methodology §5 Limited \(Rice Powder[^)]*\)\./g,
    T132U_METH.ricePowder,
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
  for (const path of touched) {
    let text = readFileSync(path, 'utf8');
    for (const [re, repl] of METH_REPLACEMENTS) {
      text = text.replace(re, repl);
    }
    writeFileSync(path, text);
  }
}

const analyze = !process.argv.includes('--apply');
if (analyze) {
  console.log(JSON.stringify({ gradeChanges, whyOnlyCount: whyOnly.length, whyOnly, protectedRows }, null, 2));
} else {
  applyPatches();
  console.log('applied patches to editable batch files');
}

for (const record of inScope) {
  const next = recomputeRecord(record);
  const fileInfo = findFileForId(record.id);
  if (!fileInfo || fileInfo.protected) continue;
  for (const ing of next.inactiveIngredients) {
    if (!plainIngredientWhy(ing)) {
      throw new Error(`blank why after t132u ${record.id} ${ing.name}`);
    }
  }
}
