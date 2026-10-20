/**
 * t139u: Step 3 regrades, Step 1 stack notes, Step 2 patchMiss persistence.
 * npx tsx scripts/t139u-apply.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients } from '../lib/scan-preview/verdictFromFlags';
import {
  extractBlock,
  findFileForId,
  patchBlock,
  patchMethBlockOnly,
  patchSharedFlagsConst,
} from './t138u-audit-patch-helpers';

const PATCH_MISS: string[] = JSON.parse(
  readFileSync(join(process.cwd(), 'docs/t138u-results.json'), 'utf8'),
).patchMiss as string[];

const STACK_LINE_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

function inactiveTabsEqual(a: RatingRecord, b: RatingRecord): boolean {
  if (a.inactiveIngredients.length !== b.inactiveIngredients.length) return false;
  return a.inactiveIngredients.every((ing, i) => {
    const other = b.inactiveIngredients[i];
    return (
      ing.name === other.name
      && ing.riskLevel === other.riskLevel
      && (ing.source ?? '') === (other.source ?? '')
    );
  });
}

function rowNote(record: RatingRecord): string {
  const r = record as RatingRecord & { note?: string };
  return record.honestNote ?? r.note ?? '';
}

function stackNoteOk(record: RatingRecord, tokens: string[]): boolean {
  const note = rowNote(record);
  if (!STACK_LINE_RE.test(note)) return false;
  const expected = `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
  return note.includes(expected);
}

type Pair = {
  before: RatingRecord;
  after: RatingRecord;
  rollup: ReturnType<typeof computeVerdictFromInactiveIngredients>;
  applyVerdict: boolean;
  forceStackNote: boolean;
};

function pairFor(before: RatingRecord): Pair {
  const after = recomputeFounderRescanRecord(before);
  const rollup = computeVerdictFromInactiveIngredients(
    after.inactiveIngredients,
    after.activeSafetyFlag,
  );
  const applyVerdict = before.verdict !== after.verdict;
  const forceStackNote =
    rollup.cause === 'limited_stack'
    && before.verdict === 'avoid'
    && (rollup.limitedStackTokens?.length ?? 0) >= 3
    && !stackNoteOk(before, rollup.limitedStackTokens ?? []);
  return { before, after, rollup, applyVerdict, forceStackNote };
}

function applyPairToFile(text: string, pair: Pair): { text: string; ok: boolean } {
  const { before, after, applyVerdict, rollup, forceStackNote } = pair;
  let out = patchMethBlockOnly(text, before, after);
  let loc = extractBlock(out, before.id);
  if (!loc) return { text, ok: false };
  const flagsMatch = loc.block.match(/flags:\s*(\w+)/);
  if (flagsMatch && !loc.block.includes(`${flagsMatch[1]}()`)) {
    out = patchSharedFlagsConst(out, flagsMatch[1], before, after);
  }
  loc = extractBlock(out, before.id);
  if (!loc) return { text, ok: false };
  const stackTokens =
    rollup.cause === 'limited_stack' ? rollup.limitedStackTokens : undefined;
  const newBlock = patchBlock(
    loc.block,
    before,
    after,
    applyVerdict,
    stackTokens,
    forceStackNote,
  );
  if (newBlock.length > loc.block.length * 4 + 8000) {
    return { text, ok: false };
  }
  out = out.slice(0, loc.start) + newBlock + out.slice(loc.end);
  return { text: out, ok: true };
}

function main() {
  const step3Regrades: {
    id: string;
    name: string;
    oldGrade: string;
    newGrade: string;
  }[] = [];

  const targetIds = new Set<string>(PATCH_MISS);
  for (const before of allPreviewCatalogRecords()) {
    const after = recomputeFounderRescanRecord(before);
    if (before.verdict === 'avoid' && after.verdict !== 'avoid') {
      step3Regrades.push({
        id: before.id,
        name: before.productName,
        oldGrade: before.verdict,
        newGrade: after.verdict,
      });
      targetIds.add(before.id);
    }
  }

  const pairs: Pair[] = [];
  for (const id of targetIds) {
    const before = allPreviewCatalogRecords().find((r) => r.id === id);
    if (!before) continue;
    const pair = pairFor(before);
    if (
      PATCH_MISS.includes(id)
      || !inactiveTabsEqual(before, pair.after)
      || pair.applyVerdict
    ) {
      pairs.push(pair);
    }
  }

  const patchMissPersisted: string[] = [];
  const patchMissStill: string[] = [];
  const byFile = new Map<string, Pair[]>();
  for (const pair of pairs) {
    const path = findFileForId(pair.before.id);
    if (!path) {
      if (PATCH_MISS.includes(pair.before.id)) patchMissStill.push(pair.before.id);
      continue;
    }
    if (!byFile.has(path)) byFile.set(path, []);
    byFile.get(path)!.push(pair);
  }

  for (const [path, filePairs] of byFile) {
    let text = readFileSync(path, 'utf8');
    for (const pair of filePairs) {
      try {
        const res = applyPairToFile(text, pair);
        if (!res.ok) {
          console.error(JSON.stringify({ patchFail: pair.before.id }));
          if (PATCH_MISS.includes(pair.before.id)) patchMissStill.push(pair.before.id);
        } else {
          text = res.text;
          if (PATCH_MISS.includes(pair.before.id)) patchMissPersisted.push(pair.before.id);
        }
      } catch (err) {
        console.error(JSON.stringify({ patchError: pair.before.id, err: String(err) }));
        if (PATCH_MISS.includes(pair.before.id)) patchMissStill.push(pair.before.id);
      }
    }
    writeFileSync(path, text);
  }

  execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

  writeFileSync(
    join(process.cwd(), 'docs/t139u-results.json'),
    JSON.stringify(
      {
        step3Regrades,
        patchMissPersisted: [...new Set(patchMissPersisted)],
        patchMissStill: [...new Set(patchMissStill)],
      },
      null,
      2,
    ),
  );

  console.log(
    JSON.stringify(
      {
        step3RegradeCount: step3Regrades.length,
        step3Regrades,
        pairsPatched: pairs.length,
        patchMissPersisted: [...new Set(patchMissPersisted)],
        patchMissStill: [...new Set(patchMissStill)],
      },
      null,
      2,
    ),
  );
}

main();
