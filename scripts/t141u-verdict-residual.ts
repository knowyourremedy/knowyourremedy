/**
 * Patch file verdicts where strict rollup differs (post t141u).
 * npx tsx scripts/t141u-verdict-residual.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import {
  extractBlock,
  findFileForId,
  patchBlock,
  patchMethBlockOnly,
} from './t138u-audit-patch-helpers';

function isSpringValleyId(id: string): boolean {
  return id.startsWith('springvalley-');
}

function main() {
  const byFile = new Map<string, { before: ReturnType<typeof allPreviewCatalogRecords>[number]; after: ReturnType<typeof recomputeFounderRescanRecord> }[]>();
  for (const before of allPreviewCatalogRecords()) {
    if (isSpringValleyId(before.id)) continue;
    const after = recomputeFounderRescanRecord(before);
    if (before.verdict === after.verdict) continue;
    const path = findFileForId(before.id);
    if (!path) continue;
    if (!byFile.has(path)) byFile.set(path, []);
    byFile.get(path)!.push({ before, after });
  }
  let n = 0;
  for (const [path, items] of byFile) {
    let text = readFileSync(path, 'utf8');
    for (const { before, after } of items) {
      let out = patchMethBlockOnly(text, before, after);
      const loc = extractBlock(out, before.id);
      if (!loc) continue;
      const stripStack = before.verdict === 'avoid' && after.verdict !== 'avoid';
      const newBlock = patchBlock(loc.block, before, after, true, undefined, false, stripStack);
      out = out.slice(0, loc.start) + newBlock + out.slice(loc.end);
      text = out;
      n++;
    }
    writeFileSync(path, text);
  }
  console.log(JSON.stringify({ verdictResidualPatched: n }, null, 2));
}

main();
