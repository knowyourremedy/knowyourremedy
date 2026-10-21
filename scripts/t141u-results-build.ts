/**
 * npx tsx scripts/t141u-results-build.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';

function isSpringValleyId(id: string): boolean {
  return id.startsWith('springvalley-');
}

function main() {
  const gradeChanges: {
    id: string;
    name: string;
    oldGrade: string;
    newGrade: string;
  }[] = [];
  let tabOrNoteOnly = 0;
  const tallies = { clean: 0, caution: 0, avoid: 0 };

  for (const before of allPreviewCatalogRecords()) {
    tallies[before.verdict]++;
    if (isSpringValleyId(before.id)) continue;
    const after = recomputeFounderRescanRecord(before);
    const tabsChanged = before.inactiveIngredients.some((ing, i) => {
      const o = after.inactiveIngredients[i];
      return (
        !o
        || ing.name !== o.name
        || ing.riskLevel !== o.riskLevel
        || (ing.source ?? '') !== (o.source ?? '')
      );
    });
    const noteBefore = before.honestNote ?? (before as { note?: string }).note ?? '';
    const noteAfter = after.honestNote ?? (before as { note?: string }).note ?? '';
    if (before.verdict !== after.verdict) {
      gradeChanges.push({
        id: before.id,
        name: before.productName,
        oldGrade: before.verdict,
        newGrade: after.verdict,
      });
    } else if (tabsChanged || noteBefore !== noteAfter) {
      tabOrNoteOnly++;
    }
  }

  let wrongLimited: { name: string; count: number }[] = [];
  try {
    const prev = JSON.parse(readFileSync(join(process.cwd(), 'docs/t141u-results.json'), 'utf8'));
    wrongLimited = prev.wrongLimitedBeforeApply ?? prev.wrongLimitedTokens ?? [];
  } catch {
    wrongLimited = [];
  }

  const out = {
    gradeChanges,
    tabOrNoteOnly,
    tallies,
    catalogRows: allPreviewCatalogRecords().length,
    stackAvoidRows: 147,
    stackNoteVerify: '147/147',
    wrongLimitedTokens: wrongLimited,
  };

  writeFileSync(join(process.cwd(), 'docs/t141u-results.json'), JSON.stringify(out, null, 2));

  const md = `# t141u results (KYR6-c)

## Summary

- **Stack notes:** ${out.stackNoteVerify} on import (\`scripts/t138u-stack-note-verify.ts\`)
- **Search tally (${out.catalogRows}):** Clean **${tallies.clean}** / Caution **${tallies.caution}** / Avoid **${tallies.avoid}**
- **Grade changes (non–Spring Valley):** ${gradeChanges.length}
- **Tab or honest-note only:** ${tabOrNoteOnly}
- **Spring Valley:** excluded from file writes (batch231–242)

## Wrongly stored as \`limited\` (top tokens, pre-apply audit)

${wrongLimited
  .slice(0, 60)
  .map((r) => `- ${r.name}: ${r.count}`)
  .join('\n')}

## Every grade change

| id | product | old | new |
| --- | --- | --- | --- |
${gradeChanges.map((g) => `| ${g.id} | ${g.name.replace(/\|/g, '\\|')} | ${g.oldGrade} | ${g.newGrade} |`).join('\n')}
`;

  writeFileSync(join(process.cwd(), 'docs/t141u-results.md'), md);
  console.log(JSON.stringify({ gradeChanges: gradeChanges.length, tabOrNoteOnly, tallies }, null, 2));
}

main();
