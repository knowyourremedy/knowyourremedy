/**
 * t141u: Caution vs Limited stack fix + full catalog recompute (no Spring Valley writes).
 * npx tsx scripts/t141u-apply.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients } from '../lib/scan-preview/verdictFromFlags';
import {
  ingredientCountsTowardLimitedStack,
  shouldDemoteFalseLimited,
} from '../lib/scan-preview/limitedStackEligibility';
import {
  extractBlock,
  findFileForId,
  patchBlock,
  patchMethBlockOnly,
  patchSharedFlagsConst,
} from './t138u-audit-patch-helpers';

const STACK_LINE_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

function isSpringValleyId(id: string): boolean {
  return id.startsWith('springvalley-');
}

function inactiveTabsEqual(a: RatingRecord, b: RatingRecord): boolean {
  if (a.inactiveIngredients.length !== b.inactiveIngredients.length) return false;
  return a.inactiveIngredients.every((ing, i) => {
    const other = b.inactiveIngredients[i];
    return (
      ing.name === other.name
      && ing.riskLevel === other.riskLevel
      && (ing.source ?? '') === (other.source ?? '')
      && Boolean(ing.stackCountExempt) === Boolean(other.stackCountExempt)
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
  stripStackNote: boolean;
};

function pairFor(before: RatingRecord): Pair {
  const after = recomputeFounderRescanRecord(before);
  const rollup = computeVerdictFromInactiveIngredients(
    after.inactiveIngredients,
    after.activeSafetyFlag,
  );
  const applyVerdict = before.verdict !== after.verdict;
  const hadStack = STACK_LINE_RE.test(rowNote(before));
  const needsStack =
    rollup.cause === 'limited_stack'
    && after.verdict === 'avoid'
    && (rollup.limitedStackTokens?.length ?? 0) >= 3;
  const forceStackNote = needsStack && !stackNoteOk(before, rollup.limitedStackTokens ?? []);
  const stripStackNote = hadStack && !needsStack;
  return { before, after, rollup, applyVerdict, forceStackNote, stripStackNote };
}

function applyPairToFile(text: string, pair: Pair): { text: string; ok: boolean } {
  const { before, after, applyVerdict, rollup, forceStackNote, stripStackNote } = pair;
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
    stripStackNote,
  );
  if (newBlock.length > Math.max(loc.block.length * 2 + 4000, loc.block.length + 120000)) {
    return { text, ok: false };
  }
  out = out.slice(0, loc.start) + newBlock + out.slice(loc.end);
  return { text: out, ok: true };
}

function auditWrongLimited(): { name: string; count: number; sampleIds: string[] }[] {
  const byName = new Map<string, { count: number; sampleIds: string[] }>();
  for (const record of allPreviewCatalogRecords()) {
    if (isSpringValleyId(record.id)) continue;
    const after = recomputeFounderRescanRecord(record);
    for (let i = 0; i < record.inactiveIngredients.length; i++) {
      const beforeIng = record.inactiveIngredients[i];
      const afterIng = after.inactiveIngredients[i];
      if (!afterIng || beforeIng.name !== afterIng.name) continue;
      if (beforeIng.riskLevel !== 'limited') continue;
      if (afterIng.riskLevel === 'moderate' || (beforeIng.riskLevel === 'limited' && shouldDemoteFalseLimited(beforeIng))) {
        const key = beforeIng.name.trim();
        const cur = byName.get(key) ?? { count: 0, sampleIds: [] };
        cur.count++;
        if (cur.sampleIds.length < 3) cur.sampleIds.push(record.id);
        byName.set(key, cur);
      }
    }
  }
  return [...byName.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.count - a.count);
}

function main() {
  const gradeChanges: {
    id: string;
    name: string;
    oldGrade: string;
    newGrade: string;
  }[] = [];
  let tabOrNoteOnly = 0;

  const pairs: Pair[] = [];
  for (const before of allPreviewCatalogRecords()) {
    if (isSpringValleyId(before.id)) continue;
    const pair = pairFor(before);
    const tabsChanged = !inactiveTabsEqual(before, pair.after);
    const noteBefore = rowNote(before);
    const noteAfter = rowNote(pair.after);
    const noteChanged = noteBefore !== noteAfter;
    if (pair.applyVerdict) {
      gradeChanges.push({
        id: before.id,
        name: before.productName,
        oldGrade: before.verdict,
        newGrade: pair.after.verdict,
      });
    }
    if ((tabsChanged || noteChanged || pair.forceStackNote || pair.stripStackNote) && !pair.applyVerdict) {
      tabOrNoteOnly++;
    }
    if (
      pair.applyVerdict
      || tabsChanged
      || noteChanged
      || pair.forceStackNote
      || pair.stripStackNote
    ) {
      pairs.push(pair);
    }
  }

  const wrongLimited = auditWrongLimited();

  const byFile = new Map<string, Pair[]>();
  const patchFail: string[] = [];
  for (const pair of pairs) {
    const path = findFileForId(pair.before.id);
    if (!path) {
      patchFail.push(pair.before.id);
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
        if (!res.ok) patchFail.push(pair.before.id);
        else text = res.text;
      } catch {
        patchFail.push(pair.before.id);
      }
    }
    writeFileSync(path, text);
  }

  execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

  const results = {
    gradeChanges,
    tabOrNoteOnly,
    wrongLimitedBeforeApply: wrongLimited,
    pairsPatched: pairs.length,
    patchFail: [...new Set(patchFail)],
  };

  writeFileSync(join(process.cwd(), 'docs/t141u-results.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main();
