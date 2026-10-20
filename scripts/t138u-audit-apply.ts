/**
 * t138u audit: cap-lock tab fixes for bogus caution→clean set, stack honest-notes, patchMiss.
 * npx tsx scripts/t138u-audit-apply.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import {
  findMissingMethodologyLocks,
  recomputeFounderRescanRecord,
} from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients } from '../lib/scan-preview/verdictFromFlags';
import {
  extractBlock,
  patchBlock,
  patchMethBlockOnly,
  patchSharedFlagsConst,
} from './t138u-audit-patch-helpers';

const STACK_LINE_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

const ORIGINAL = JSON.parse(
  readFileSync(join(process.cwd(), 'docs/t138u-results.pre-audit.json'), 'utf8'),
) as {
  gradeChanges: { id: string; oldGrade: string; newGrade: string }[];
  patchMiss: string[];
};

const BOGUS_CLEAN_IDS = new Set(
  ORIGINAL.gradeChanges
    .filter((g) => g.oldGrade === 'caution' && g.newGrade === 'clean')
    .map((g) => g.id),
);

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
  const stackFlip =
    rollup.cause === 'limited_stack' && before.verdict !== 'avoid' && after.verdict === 'avoid';
  const forceStackNote =
    rollup.cause === 'limited_stack'
    && before.verdict === 'avoid'
    && (rollup.limitedStackTokens?.length ?? 0) >= 3
    && !stackNoteOk(before, rollup.limitedStackTokens ?? []);
  return {
    before,
    after,
    rollup,
    applyVerdict: stackFlip,
    forceStackNote,
  };
}

function applyPairToFile(text: string, pair: Pair): { text: string; ok: boolean } {
  const { before, after, applyVerdict, rollup, forceStackNote } = pair;
  let out = text;
  let loc = extractBlock(out, before.id);
  if (!loc) return { text, ok: false };
  const flagsMatch = loc.block.match(/flags:\s*(\w+)/);
  if (flagsMatch && !loc.block.includes(`${flagsMatch[1]}()`)) {
    out = patchSharedFlagsConst(out, flagsMatch[1], before, after);
  }
  out = patchMethBlockOnly(out, before, after);
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
  out = out.slice(0, loc.start) + newBlock + out.slice(loc.end);
  return { text: out, ok: true };
}

function main() {
  for (const record of allPreviewCatalogRecords()) {
    const after = recomputeFounderRescanRecord(record);
    for (const m of findMissingMethodologyLocks(after)) {
      console.error(JSON.stringify({ stop: true, missing: m }, null, 2));
      process.exit(1);
    }
  }

  const targetIds = new Set<string>(BOGUS_CLEAN_IDS);
  for (const before of allPreviewCatalogRecords()) {
    const after = recomputeFounderRescanRecord(before);
    const rollup = computeVerdictFromInactiveIngredients(
      after.inactiveIngredients,
      after.activeSafetyFlag,
    );
    if (rollup.cause === 'limited_stack' && before.verdict === 'avoid') {
      targetIds.add(before.id);
    }
  }

  const pairs: Pair[] = [];
  for (const before of allPreviewCatalogRecords()) {
    if (!targetIds.has(before.id)) continue;
    const pair = pairFor(before);
    const tabsChanged = !inactiveTabsEqual(before, pair.after);
    if (!tabsChanged && !pair.applyVerdict && !pair.forceStackNote) continue;
    pairs.push(pair);
  }

  const patchMiss: string[] = [];
  const byFile = new Map<string, Pair[]>();
  for (const pair of pairs) {
    const path = findFileForId(pair.before.id);
    if (!path) {
      patchMiss.push(pair.before.id);
      continue;
    }
    if (!byFile.has(path)) byFile.set(path, []);
    byFile.get(path)!.push(pair);
  }

  for (const [path, filePairs] of byFile) {
    let text = readFileSync(path, 'utf8');
    for (const pair of filePairs) {
      const res = applyPairToFile(text, pair);
      if (!res.ok) patchMiss.push(pair.before.id);
      else text = res.text;
    }
    writeFileSync(path, text);
  }

  const patchMissPersisted: string[] = [];
  const patchMissStill: string[] = [];
  for (const id of ORIGINAL.patchMiss) {
    const before = allPreviewCatalogRecords().find((r) => r.id === id);
    if (!before) {
      patchMissStill.push(id);
      continue;
    }
    const pair = pairFor(before);
    if (inactiveTabsEqual(before, pair.after) && before.verdict === pair.after.verdict) {
      patchMissStill.push(id);
      continue;
    }
    const path = findFileForId(id);
    if (!path) {
      patchMissStill.push(id);
      continue;
    }
    let text = readFileSync(path, 'utf8');
    const res = applyPairToFile(text, pair);
    if (!res.ok) {
      patchMissStill.push(id);
      continue;
    }
    writeFileSync(path, res.text);
    patchMissPersisted.push(id);
  }

  execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

  const catalog = allPreviewCatalogRecords();
  const preAudit = ORIGINAL.gradeChanges as {
    id: string;
    name?: string;
    oldGrade: string;
    newGrade: string;
    cause: string;
    driver?: string;
    limitedStackTokens?: string[];
  }[];
  const gradeChangeDetails = preAudit.filter(
    (g) => !(g.oldGrade === 'caution' && g.newGrade === 'clean'),
  );
  const byDirCause: Record<string, number> = {};
  for (const row of gradeChangeDetails) {
    const key = `${row.oldGrade}->${row.newGrade}/${row.cause}`;
    byDirCause[key] = (byDirCause[key] ?? 0) + 1;
  }

  let stackAvoidCount = 0;
  for (const before of catalog) {
    const after = recomputeFounderRescanRecord(before);
    const rollup = computeVerdictFromInactiveIngredients(
      after.inactiveIngredients,
      after.activeSafetyFlag,
    );
    if (rollup.cause === 'limited_stack' && before.verdict === 'avoid') stackAvoidCount++;
  }

  const audit254 = {
    bogusCautionToCleanInT138uReport: BOGUS_CLEAN_IDS.size,
    revertedAsGradeChanges: BOGUS_CLEAN_IDS.size,
    ingredientTabPatchesAmong254: pairs.filter((p) => BOGUS_CLEAN_IDS.has(p.before.id)).length,
    keptCautionToCleanGradeChanges: 0,
  };

  writeFileSync(
    join(process.cwd(), 'docs/t138u-audit-summary.json'),
    JSON.stringify({ audit254, stackAvoidCount, patchMissPersisted, patchMissStill }, null, 2),
  );

  const md = [
    '# t138u catalog rescan results (post-audit)',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## t138u founder locks',
    '',
    'Polysorbate 20/60/80/(unspecified), oral propylene glycol, sucralose, acesulfame potassium, saccharin, and PEG families → **Limited** (t138u). Full strict rollup uses `applyCautionCapLocks` for SiO2 / §5 Caution METH stamps.',
    '',
    '## Audit (bogus caution→clean)',
    '',
    `The original t138u report listed **${BOGUS_CLEAN_IDS.size}** caution→clean flips. Those were strict-rollup artifacts (0-pt caps stored as Cleared on disk). **0** caution→clean grade changes remain after audit; ingredient tabs were patched where needed.`,
    '',
    `**Stack-driven Avoid rows (strict rollup):** ${stackAvoidCount}. Run \`npx tsx scripts/t138u-stack-note-verify.ts\`.`,
    '',
    '## t138u rescan grade changes (post-audit)',
    '',
    ...Object.entries(byDirCause)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `- **${k}**: ${n}`),
    '',
    `**Total:** ${gradeChangeDetails.length}`,
    '',
    '## patchMiss',
    '',
    `Persisted: **${patchMissPersisted.length}**. Still not on disk: **${patchMissStill.length}** — ${patchMissStill.map((id) => `\`${id}\``).join(', ') || '(none)'}`,
  ].join('\n');

  writeFileSync(join(process.cwd(), 'docs/t138u-results.md'), md);
  writeFileSync(
    join(process.cwd(), 'docs/t138u-results.json'),
    JSON.stringify(
      {
        gradeChangeCount: gradeChangeDetails.length,
        gradeChanges: gradeChangeDetails,
        audit254,
        stackAvoidRowCount: stackAvoidCount,
        patchMiss: [...new Set([...patchMiss, ...patchMissStill])],
        patchMissPersisted,
        gradeChangesByDirection: byDirCause,
      },
      null,
      2,
    ),
  );

  console.log(
    JSON.stringify(
      {
        pairsApplied: pairs.length,
        audit254,
        stackAvoidCount,
        patchMissPersisted,
        patchMissStill,
        gradeChangeCount: gradeChangeDetails.length,
        byDirCause,
      },
      null,
      2,
    ),
  );
}

main();
