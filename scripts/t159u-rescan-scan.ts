import { writeFileSync } from 'node:fs';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { applyT159uIngredientLocks } from '../lib/scan-preview/t159uLocks';
import {
  computeVerdictFromInactiveIngredients,
  limitedStackHonestNoteIfAny,
} from '../lib/scan-preview/verdictFromFlags';

const rows = allPreviewCatalogRecords();
const gradeChanges: {
  id: string;
  productName: string;
  oldGrade: string;
  storedGrade: string;
  newGrade: string;
  tokens: string[];
  cause: string;
}[] = [];
const touched: { id: string; name: string; from: string; to: string; ingredient: string }[] = [];

for (const record of rows) {
  const applied = applyT159uIngredientLocks(record);
  if (!applied.changed) continue;
  for (let i = 0; i < record.inactiveIngredients.length; i++) {
    const before = record.inactiveIngredients[i];
    const after = applied.record.inactiveIngredients[i];
    if (before.riskLevel !== after.riskLevel) {
      touched.push({
        id: record.id,
        name: record.productName,
        ingredient: before.name,
        from: before.riskLevel,
        to: after.riskLevel,
      });
    }
  }
  const beforeV = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  const afterV = computeVerdictFromInactiveIngredients(
    applied.record.inactiveIngredients,
    applied.record.activeSafetyFlag,
  );
  if (beforeV.verdict !== afterV.verdict) {
    gradeChanges.push({
      id: record.id,
      productName: record.productName,
      oldGrade: beforeV.verdict,
      storedGrade: record.verdict,
      newGrade: afterV.verdict,
      tokens: afterV.limitedStackTokens ?? [],
      cause: afterV.cause ?? '',
    });
  }
}

const out = {
  catalog: rows.length,
  ingredientTouches: touched.length,
  gradeChanges: gradeChanges.length,
  gradeChanges,
  touched,
};
writeFileSync('/tmp/t159u-scan.json', JSON.stringify(out, null, 2));
console.log(`catalog ${rows.length} touches ${touched.length} gradeChanges ${gradeChanges.length}`);
for (const row of gradeChanges) {
  console.log(`${row.storedGrade} stored / ${row.oldGrade} -> ${row.newGrade}\t${row.cause}\t${row.id}\t${row.tokens.join(', ')}`);
}
