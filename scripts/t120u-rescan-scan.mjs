import { allPreviewCatalogRecords, applyT120uLocks } from '../lib/scan-preview/previewCatalog.ts';
import { isT120uNaturalAppleFlavorLock } from '../lib/scan-preview/plainLanguage.ts';

function norm(value) {
  return value.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function batchFromId(id) {
  const m = id.match(/(?:^|[-_])b(\d{2,3})(?:[-_]|$)/i) || id.match(/batch(\d{2,3})/i);
  if (m) return Number(m[1]);
  const m2 = id.match(/-b(\d{2,3})-/i);
  if (m2) return Number(m2[1]);
  return null;
}

function isProtectedBatch(n) {
  return n !== null && n >= 70 && n <= 143;
}

function verdictLabel(v) {
  if (v === 'clean') return 'Clean';
  if (v === 'caution') return 'Caution';
  return 'Avoid';
}

function hasExactNaturalAppleFlavor(record) {
  return record.inactiveIngredients.some((ing) => isT120uNaturalAppleFlavorLock(ing.name));
}

function nearVariantsInCatalog(catalog) {
  const appleFlavor = [];
  const appleFlavour = [];
  const bareAppleFlavor = [];
  for (const record of catalog) {
    for (const ing of record.inactiveIngredients) {
      const n = norm(ing.name);
      if (n === 'natural apple flavor') continue;
      if (n === 'natural apple flavour') appleFlavour.push({ id: record.id, name: ing.name });
      else if (/\bapple flavou?r\b/.test(n) && n !== 'natural apple flavor') {
        bareAppleFlavor.push({ id: record.id, name: ing.name });
      }
    }
  }
  return { appleFlavour, bareAppleFlavor };
}

const changed = [];
let checkedWithToken = 0;

const CATALOG = allPreviewCatalogRecords();
for (const record of CATALOG) {
  if (!hasExactNaturalAppleFlavor(record)) continue;
  checkedWithToken++;
  const after = applyT120uLocks(record);
  if (after.verdict === record.verdict) continue;
  const driver =
    record.inactiveIngredients.find(
      (ing) => isT120uNaturalAppleFlavorLock(ing.name) && ing.riskLevel !== 'cleared',
    )?.name ?? 'Natural apple flavor';
  changed.push({
    id: record.id,
    product: record.productName,
    old: verdictLabel(record.verdict),
    new: verdictLabel(after.verdict),
    reason: `Natural apple flavor cleared (t120u); worst remaining token decides`,
    token: driver,
    batch: batchFromId(record.id),
    protected: isProtectedBatch(batchFromId(record.id)),
  });
}

const unchangedCount = checkedWithToken - changed.length;
const near = nearVariantsInCatalog(CATALOG);
console.log(
  JSON.stringify({ changed, unchangedCount, checkedWithToken, nearVariants: near }, null, 2),
);
