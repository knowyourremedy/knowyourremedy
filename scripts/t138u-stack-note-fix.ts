/**
 * Fix stack-Avoid honest notes for all strict-rollup limited_stack rows.
 * npx tsx scripts/t138u-stack-note-fix.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients, replaceLimitedStackHonestNote } from '../lib/scan-preview/verdictFromFlags';
import { extractBlock, patchBlock } from './t138u-audit-patch-helpers';

const STACK_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

function findFileForId(id: string): string | null {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const path = join(dir, file);
    const text = readFileSync(path, 'utf8');
    if (text.includes(`'${id}'`) || text.includes(`"${id}"`)) return path;
  }
  return null;
}

function main() {
  const byFile = new Map<string, { id: string; tokens: string[] }[]>();
  for (const before of allPreviewCatalogRecords()) {
    if (before.verdict !== 'avoid') continue;
    const after = recomputeFounderRescanRecord(before);
    const rollup = computeVerdictFromInactiveIngredients(
      after.inactiveIngredients,
      after.activeSafetyFlag,
    );
    if (rollup.cause !== 'limited_stack' || (rollup.limitedStackTokens?.length ?? 0) < 3) continue;
    const tokens = rollup.limitedStackTokens ?? [];
    const note = before.honestNote ?? (before as { note?: string }).note ?? '';
    const line = `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
    if (STACK_RE.test(note) && note.includes(line)) continue;
    const path = findFileForId(before.id);
    if (!path) continue;
    if (!byFile.has(path)) byFile.set(path, []);
    byFile.get(path)!.push({ id: before.id, tokens });
  }

  let fixed = 0;
  for (const [path, rows] of byFile) {
    let text = readFileSync(path, 'utf8');
    for (const { id, tokens } of rows) {
      const before = allPreviewCatalogRecords().find((r) => r.id === id);
      if (!before) continue;
      const after = recomputeFounderRescanRecord(before);
      const loc = extractBlock(text, id);
      if (!loc) continue;
      const newBlock = patchBlock(loc.block, before, after, false, tokens, true);
      if (newBlock === loc.block) continue;
      text = text.slice(0, loc.start) + newBlock + text.slice(loc.end);
      fixed++;
    }
    writeFileSync(path, text);
  }
  console.log(JSON.stringify({ files: byFile.size, rowsFixed: fixed }, null, 2));
}

main();
