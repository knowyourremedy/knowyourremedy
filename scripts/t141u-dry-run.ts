/**
 * npx tsx scripts/t141u-dry-run.ts
 */
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { shouldDemoteFalseLimited } from '../lib/scan-preview/limitedStackEligibility';

function isSpringValleyId(id: string): boolean {
  return id.startsWith('springvalley-');
}

function main() {
  const gradeChanges: { id: string; old: string; new: string }[] = [];
  const wrong = new Map<string, number>();
  for (const before of allPreviewCatalogRecords()) {
    if (isSpringValleyId(before.id)) continue;
    const after = recomputeFounderRescanRecord(before);
    if (before.verdict !== after.verdict) {
      gradeChanges.push({ id: before.id, old: before.verdict, new: after.verdict });
    }
    for (const ing of before.inactiveIngredients) {
      if (ing.riskLevel === 'limited' && shouldDemoteFalseLimited(ing)) {
        wrong.set(ing.name, (wrong.get(ing.name) ?? 0) + 1);
      }
    }
  }
  console.log(
    JSON.stringify(
      {
        gradeChangeCount: gradeChanges.length,
        avoidToCaution: gradeChanges.filter((g) => g.old === 'avoid' && g.new === 'caution').length,
        avoidToClean: gradeChanges.filter((g) => g.old === 'avoid' && g.new === 'clean').length,
        cautionToAvoid: gradeChanges.filter((g) => g.old === 'caution' && g.new === 'avoid').length,
        wrongLimitedTokens: [...wrong.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40),
        sampleGradeChanges: gradeChanges.slice(0, 30),
      },
      null,
      2,
    ),
  );
}

main();
