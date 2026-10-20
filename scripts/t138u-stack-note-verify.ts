/**
 * Verify every stack-driven Avoid row has the t137u stacking honest-note line (imported records).
 * npx tsx scripts/t138u-stack-note-verify.ts
 */
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients } from '../lib/scan-preview/verdictFromFlags';
import type { RatingRecord } from '../lib/ratingRecord';

const STACK_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

function stackLine(tokens: string[]): string {
  return `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
}

function main() {
  const records = allPreviewCatalogRecords();

  const stackRows: { id: string; file: string; tokens: string[]; note?: string }[] = [];
  const missing: string[] = [];
  const wrongTokens: { id: string; expected: string; got?: string }[] = [];

  for (const record of records) {
    const recomputed = recomputeFounderRescanRecord(record);
    const rollup = computeVerdictFromInactiveIngredients(
      recomputed.inactiveIngredients,
      recomputed.activeSafetyFlag,
    );
    if (rollup.cause !== 'limited_stack' || rollup.verdict !== 'avoid') continue;
    if (record.verdict !== 'avoid') continue;
    const ext = record as RatingRecord & { note?: string; math?: string };
    const note = [record.honestNote, ext.note, ext.math].filter(Boolean).join(' ');
    const tokens = rollup.limitedStackTokens ?? [];
    stackRows.push({ id: record.id, file: '', tokens, note });
    if (!STACK_RE.test(note)) {
      missing.push(record.id);
      continue;
    }
    const expected = stackLine(tokens);
    if (!note.includes(expected)) {
      wrongTokens.push({ id: record.id, expected, got: note.match(STACK_RE)?.[0] });
    }
  }

  console.log(
    JSON.stringify(
      {
        stackAvoidRows: stackRows.length,
        ok: stackRows.length - missing.length - wrongTokens.length,
        missing,
        wrongTokens,
      },
      null,
      2,
    ),
  );
  process.exit(missing.length || wrongTokens.length ? 1 : 0);
}

main();
// sync entrypoint
