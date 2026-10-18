import { allPreviewCatalogRecords, applyT121uLocks } from '../lib/scan-preview/previewCatalog.ts';
import { isT121uSpirulinaColorLock } from '../lib/scan-preview/plainLanguage.ts';

function norm(value) {
  return value.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function verdictLabel(v) {
  if (v === 'clean') return 'Clean';
  if (v === 'caution') return 'Caution';
  return 'Avoid';
}

function spirulinaVariants(catalog) {
  const forColor = [];
  const extractColor = [];
  for (const record of catalog) {
    for (const ing of record.inactiveIngredients) {
      const n = norm(ing.name);
      if (isT121uSpirulinaColorLock(ing.name)) continue;
      if (/\bspirulina\b/.test(n) && /\bfor color\b/.test(n)) {
        forColor.push({
          id: record.id,
          name: ing.name,
          grade: verdictLabel(record.verdict),
          risk: ing.riskLevel,
        });
      } else if (/\bspirulina\b/.test(n) && /\bextract\b/.test(n) && /\bcolor\b/.test(n)) {
        extractColor.push({
          id: record.id,
          name: ing.name,
          grade: verdictLabel(record.verdict),
          risk: ing.riskLevel,
        });
      }
    }
  }
  return { forColor, extractColor };
}

const changed = [];
let checkedWithToken = 0;

const CATALOG = allPreviewCatalogRecords();
for (const record of CATALOG) {
  const hasToken = record.inactiveIngredients.some((ing) => isT121uSpirulinaColorLock(ing.name));
  if (!hasToken) continue;
  checkedWithToken++;
  const after = applyT121uLocks(record);
  if (after.verdict === record.verdict) continue;
  changed.push({
    id: record.id,
    product: record.productName,
    old: verdictLabel(record.verdict),
    new: verdictLabel(after.verdict),
    why: 'spirulina (color) cleared (t121u); worst remaining token decides',
  });
}

const unchangedCount = checkedWithToken - changed.length;
const near = spirulinaVariants(CATALOG);
console.log(
  JSON.stringify({ changed, unchangedCount, checkedWithToken, nearVariants: near }, null, 2),
);
