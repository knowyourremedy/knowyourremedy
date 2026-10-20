/**
 * t138u full catalog rescan — Moderate→Limited founder locks + t137u stacking.
 * npx tsx scripts/t138u-rescan-apply.ts
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import {
  findMissingMethodologyLocks,
  recomputeFounderRescanRecord,
  recordsEqual,
} from '../lib/scan-preview/founderRescan';
import {
  appendLimitedStackHonestNote,
  computeVerdictFromInactiveIngredients,
  replaceLimitedStackHonestNote,
} from '../lib/scan-preview/verdictFromFlags';
import { countPropyleneGlycolSplit } from '../lib/scan-preview/t138uLocks';

const PROTECTED_FILE_RE = /batch59-|batch(?:7[0-9]|[89]\d|1[0-3]\d|14[0-3])-/;

const BEESWAX_SPLIT_DQ =
  '["Beeswax", "cleared", "beeswax"], ["Carnauba wax", "cleared", "carnaubaT133u"]';
const BEESWAX_SPLIT_SQ =
  "['Beeswax', 'cleared', 'beeswax'], ['Carnauba wax', 'cleared', 'carnaubaT133u']";
const OLD_BEES_DQ = '["Beeswax / carnauba wax", "cleared", "gelatin"]';
const OLD_BEES_SQ = "['Beeswax / carnauba wax', 'cleared', 'gelatin']";

const CARNAUBA_T133U_METH =
  'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).';
const CARNAUBA_METH_KEY = 'carnaubaT133u';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function constAliasesForId(id: string, text: string): string[] {
  const aliases: string[] = [];
  const re = new RegExp(`const\\s+(\\w+)\\s*=\\s*['"]${escapeRe(id)}['"]`, 'g');
  for (const m of text.matchAll(re)) aliases.push(m[1]);
  const re2 = new RegExp(`\\b([A-Za-z_$][\\w$]*):\\s*['"]${escapeRe(id)}['"]`, 'g');
  for (const m of text.matchAll(re2)) aliases.push(m[1]);
  return [...new Set(aliases)];
}

function extractBlock(text: string, id: string): { start: number; end: number; block: string } | null {
  const aliases = constAliasesForId(id, text);
  const patterns = [
    new RegExp(`\\n  expand\\(\\{\\n    id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`\\n  \\{\\n    id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`\\n    \\{\\n      id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`id:\\s*['"]${escapeRe(id)}['"]`),
    ...aliases.flatMap((a) => [
      new RegExp(`id:\\s*${a}\\b`),
      new RegExp(`id:\\s*ID\\.${a}\\b`),
    ]),
  ];
  let start = -1;
  let fromExpand = false;
  for (const p of patterns) {
    const m = p.exec(text);
    if (m) {
      start = m.index;
      fromExpand = m[0].includes('expand');
      break;
    }
  }
  if (start === -1) return null;
  const lineStart = text.lastIndexOf('\n', start) + 1;
  const openBrace = fromExpand
    ? text.indexOf('{', lineStart)
    : text.indexOf('{', start);
  if (openBrace < 0) return null;
  let depth = 0;
  let end = openBrace;
  for (let i = openBrace; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return { start: lineStart, end, block: text.slice(lineStart, end) };
}

function patchBlock(
  block: string,
  before: RatingRecord,
  after: RatingRecord,
  applyVerdict: boolean,
  stackTokens?: string[],
): string {
  let b = block;
  if (before.inactiveIngredients.some((i) => i.name.trim().toLowerCase() === 'beeswax / carnauba wax')) {
    if (b.includes(OLD_BEES_DQ)) b = b.replace(OLD_BEES_DQ, BEESWAX_SPLIT_DQ);
    if (b.includes(OLD_BEES_SQ)) b = b.replace(OLD_BEES_SQ, BEESWAX_SPLIT_SQ);
  }
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old) continue;
    if (ing.riskLevel === old.riskLevel && (ing.source ?? '') === (old.source ?? '')) continue;
    const nameRe = escapeRe(ing.name);
    const names = [ing.name, ing.name.toLowerCase()];
    for (const n of names) {
      const nr = escapeRe(n);
      b = b.replace(
        new RegExp(`(\\["${nr}"\\s*,\\s*)"(limited|moderate|high|cleared)"`, 'gi'),
        `$1"${ing.riskLevel}"`,
      );
      b = b.replace(
        new RegExp(`(\\['${nr}'\\s*,\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
        `$1'${ing.riskLevel}'`,
      );
    }
    b = b.replace(
      new RegExp(`flag\\(\\s*['"]${nameRe}['"]\\s*,\\s*['"](limited|moderate|high|cleared)['"]`, 'gi'),
      (m) => m.replace(/'(limited|moderate|high|cleared)'|"(limited|moderate|high|cleared)"/, `'${ing.riskLevel}'`),
    );
    if (ing.source && old.source && ing.source !== old.source) {
      const oldMeth = old.source.split(';').slice(1).join(';').trim();
      const newMeth = ing.source.split(';').slice(1).join(';').trim();
      if (
        oldMeth === 'Methodology §5 Cleared'
        && newMeth.includes('Carnauba wax — founder lock t133u')
      ) {
        const clearedRe = new RegExp(
          `cleared\\(([^,)]+),\\s*['"]${nameRe}['"]\\)`,
          'g',
        );
        if (clearedRe.test(b)) {
          const citeFn = /function cite\(/.test(b) ? 'cite' : 'dailymed';
          b = b.replace(
            clearedRe,
            `flag('${ing.name}', 'cleared', ${citeFn}($1, METH.${CARNAUBA_METH_KEY}))`,
          );
        }
      }
      if (oldMeth && b.includes(oldMeth)) b = b.replace(oldMeth, newMeth);
      else if (oldMeth.length > 40) {
        const shortOld = oldMeth.slice(0, 60);
        if (b.includes(shortOld)) b = b.replace(shortOld, newMeth.slice(0, 60));
      }
      if (b.includes(old.source)) b = b.replace(old.source, ing.source);
    }
  }
  if (applyVerdict && before.verdict !== after.verdict) {
    b = b.replace(new RegExp(`verdict: "${escapeRe(before.verdict)}"`), `verdict: "${after.verdict}"`);
    b = b.replace(new RegExp(`verdict: '${escapeRe(before.verdict)}'`), `verdict: '${after.verdict}'`);
  }
  const beforeStack = computeVerdictFromInactiveIngredients(
    before.inactiveIngredients,
    before.activeSafetyFlag,
  );
  const stackChanged =
    stackTokens
    && stackTokens.length >= 3
    && (beforeStack.cause !== 'limited_stack'
      || (beforeStack.limitedStackTokens ?? []).join('|') !== stackTokens.join('|'));
  if (
    after.verdict === 'avoid'
    && stackTokens
    && stackTokens.length >= 3
    && (applyVerdict || stackChanged)
  ) {
    const noteRe = /(honestNote:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
    const noteM = noteRe.exec(b);
    if (noteM) {
      const quote = noteM[2][0];
      const inner = noteM[2].slice(1, -1);
      const merged = stackChanged
        ? replaceLimitedStackHonestNote(inner, stackTokens)
        : appendLimitedStackHonestNote(inner, stackTokens);
      b = b.replace(noteM[0], `${noteM[1]}${quote}${merged}${quote}`);
    } else {
      const plainNote = /(note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const nm = plainNote.exec(b);
      if (nm) {
        const quote = nm[2][0];
        const inner = nm[2].slice(1, -1);
        const merged = stackChanged
          ? replaceLimitedStackHonestNote(inner, stackTokens)
          : appendLimitedStackHonestNote(inner, stackTokens);
        b = b.replace(nm[0], `${nm[1]}${quote}${merged}${quote}`);
      }
    }
  }
  return b;
}

function ensureMethKey(text: string, key: string, value: string): string {
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  if (new RegExp(`\\b${key}:\\s*'`).test(text)) {
    return text.replace(new RegExp(`${escapeRe(key)}:\\s*'[^']*'`), `${key}: '${escaped}'`);
  }
  const methStart = text.match(/const METH = \{/);
  if (!methStart || methStart.index === undefined) return text;
  const insertAt = methStart.index + methStart[0].length;
  return `${text.slice(0, insertAt)}\n  ${key}: '${escaped}',${text.slice(insertAt)}`;
}

function patchCarnaubaClearedHelpers(text: string): string {
  if (!/cleared\([^)]+,\s*['"]Carnauba wax/.test(text)) return text;
  const citeFn = /function cite\(/.test(text) ? 'cite' : 'dailymed';
  let out = ensureMethKey(text, CARNAUBA_METH_KEY, CARNAUBA_T133U_METH);
  out = out.replace(
    /cleared\(([^,)]+),\s*'(Carnauba wax[^']*)'\)/g,
    `flag('$2', 'cleared', ${citeFn}($1, METH.${CARNAUBA_METH_KEY}))`,
  );
  out = out.replace(
    /cleared\(([^,)]+),\s*"(Carnauba wax[^"]*)"\)/g,
    `flag("$2", "cleared", ${citeFn}($1, METH.${CARNAUBA_METH_KEY}))`,
  );
  out = out.replace(
    new RegExp(`dailymed\\(([^,)]+),\\s*METH\\.${CARNAUBA_METH_KEY}\\)`, 'g'),
    `${citeFn}($1, METH.${CARNAUBA_METH_KEY})`,
  );
  return out;
}

function patchMethBlockOnly(text: string, before: RatingRecord, after: RatingRecord): string {
  const methRe = /const METH = \{[\s\S]*?\n\};/m;
  const m = methRe.exec(text);
  if (!m || m.index === undefined) return text;
  let methBody = m[0];
  let changed = false;
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old || (old.source ?? '') === (ing.source ?? '')) continue;
    const idxOld = (old.source ?? '').search(/Methodology §5/i);
    const idxNew = (ing.source ?? '').search(/Methodology §5/i);
    if (idxOld < 0 || idxNew < 0) continue;
    const oldMeth = (old.source ?? '').slice(idxOld).trim();
    const newMeth = (ing.source ?? '').slice(idxNew).trim();
    if (oldMeth.length < 24 || oldMeth === newMeth) continue;
    if (methBody.includes(oldMeth)) {
      methBody = methBody.replace(oldMeth, newMeth);
      changed = true;
    }
  }
  if (!changed) return text;
  return text.slice(0, m.index) + methBody + text.slice(m.index + m[0].length);
}

function patchAllCompactFlagsInFile(
  text: string,
  before: RatingRecord,
  after: RatingRecord,
): string {
  let out = text;
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old || ing.riskLevel === old.riskLevel) continue;
    for (const n of [ing.name, ing.name.toLowerCase()]) {
      const nameRe = escapeRe(n);
      out = out.replace(
        new RegExp(`(\\['${nameRe}'\\s*,\\s*)'${escapeRe(old.riskLevel)}'`, 'gi'),
        `$1'${ing.riskLevel}'`,
      );
      out = out.replace(
        new RegExp(`(\\["${nameRe}"\\s*,\\s*)"${escapeRe(old.riskLevel)}"`, 'gi'),
        `$1"${ing.riskLevel}"`,
      );
      const flagRiskRe = new RegExp(
        `(flag\\([^)]*['"]${nameRe}['"]\\s*,\\s*['"])${escapeRe(old.riskLevel)}(['"])`,
        'gi',
      );
      out = out.replace(flagRiskRe, `$1${ing.riskLevel}$2`);
    }
  }
  if (
    after.inactiveIngredients.some(
      (i) =>
        /sucrose/i.test(i.name)
        && before.inactiveIngredients.find((x) => x.name === i.name)?.riskLevel === 'limited'
        && i.riskLevel === 'cleared',
    )
  ) {
    out = out.replace(
      /sucrose:\s*'Methodology §5 Limited \(sucrose\)\.'/g,
      "sucrose: 'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.'",
    );
  }
  return out;
}

function patchSharedFlagsConst(
  text: string,
  flagsName: string,
  before: RatingRecord,
  after: RatingRecord,
): string {
  const re = new RegExp(`const\\s+${flagsName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`);
  const m = re.exec(text);
  if (!m || m.index === undefined) return text;
  let body = m[1];
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old) continue;
    if (ing.riskLevel === old.riskLevel && (ing.source ?? '') === (old.source ?? '')) continue;
    for (const n of [ing.name, ing.name.toLowerCase()]) {
      const nameRe = escapeRe(n);
      body = body.replace(
        new RegExp(`(\\['${nameRe}'\\s*,\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
        `$1'${ing.riskLevel}'`,
      );
    }
  }
  const patched = m[0].replace(m[1], body);
  return text.slice(0, m.index) + patched + text.slice(m.index + m[0].length);
}

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

const catalog = allPreviewCatalogRecords();
const missing: { id: string; ingredientName: string }[] = [];
for (const record of catalog) {
  const after = recomputeFounderRescanRecord(record);
  for (const m of findMissingMethodologyLocks(after)) {
    missing.push({ id: m.id, ingredientName: m.ingredientName });
  }
}
if (missing.length > 0) {
  console.error(JSON.stringify({ stop: true, missing }, null, 2));
  process.exit(1);
}

type Pair = {
  before: RatingRecord;
  after: RatingRecord;
  applyVerdict: boolean;
  rollup: ReturnType<typeof computeVerdictFromInactiveIngredients>;
};
const pairs: Pair[] = [];
const noGradeChangeIds: string[] = [];

for (const before of catalog) {
  const after = recomputeFounderRescanRecord(before);
  const rollup = computeVerdictFromInactiveIngredients(
    after.inactiveIngredients,
    after.activeSafetyFlag,
  );
  const changed = before.verdict !== after.verdict || !recordsEqual(before, after);
  if (!changed) continue;
  if (before.verdict === after.verdict) {
    noGradeChangeIds.push(before.id);
  }
  pairs.push({
    before,
    after,
    applyVerdict: before.verdict !== after.verdict,
    rollup,
  });
}

const byFile = new Map<string, Pair[]>();
const patchMiss: string[] = [];
const gradeChanges: {
  id: string;
  oldVerdict: string;
  newVerdict: string;
}[] = [];
const protectedEdited = new Set<string>();

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
  for (const { before, after, applyVerdict, rollup } of filePairs) {
    text = patchAllCompactFlagsInFile(text, before, after);
    let loc = extractBlock(text, before.id);
    if (!loc) {
      patchMiss.push(before.id);
      continue;
    }
    const flagsMatch = loc.block.match(/flags:\s*(\w+)/);
    if (flagsMatch && !loc.block.includes(`${flagsMatch[1]}()`)) {
      text = patchSharedFlagsConst(text, flagsMatch[1], before, after);
    }
    text = patchMethBlockOnly(text, before, after);
    loc = extractBlock(text, before.id);
    if (!loc) {
      patchMiss.push(before.id);
      continue;
    }
    const stackTokens =
      rollup.cause === 'limited_stack' ? rollup.limitedStackTokens : undefined;
    const newBlock = patchBlock(loc.block, before, after, applyVerdict, stackTokens);
    text = text.slice(0, loc.start) + newBlock + text.slice(loc.end);
    if (applyVerdict && before.verdict !== after.verdict) {
      gradeChanges.push({
        id: before.id,
        oldVerdict: before.verdict,
        newVerdict: after.verdict,
      });
    }
  }
  writeFileSync(path, text);
  const rel = path.replace(process.cwd() + '/', '');
  if (PROTECTED_FILE_RE.test(rel)) protectedEdited.add(rel);
}

execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

const gradeChangeDetails = pairs
  .filter((p) => p.before.verdict !== p.after.verdict)
  .map((p) => ({
    id: p.before.id,
    name: p.before.productName,
    oldGrade: p.before.verdict,
    newGrade: p.after.verdict,
    cause: p.rollup.cause,
    driver: p.rollup.driver,
    limitedStackTokens: p.rollup.limitedStackTokens,
  }));

const byDirCause: Record<string, { count: number; ids: string[] }> = {};
for (const row of gradeChangeDetails) {
  const key = `${row.oldGrade}->${row.newGrade}/${row.cause}`;
  if (!byDirCause[key]) byDirCause[key] = { count: 0, ids: [] };
  byDirCause[key].count++;
  byDirCause[key].ids.push(row.id);
}

let pgOralTabs = 0;
let pgNonOralTabs = 0;
for (const record of catalog) {
  const after = recomputeFounderRescanRecord(record);
  const split = countPropyleneGlycolSplit(after);
  pgOralTabs += split.oralLimited;
  pgNonOralTabs += split.nonOralUnchanged;
}

const md: string[] = [
  '# t138u catalog rescan results',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## t138u founder locks',
  '',
  'Polysorbate 20/60/80/(unspecified), oral propylene glycol, sucralose, acesulfame potassium, saccharin, and PEG families moved **Moderate → Limited** (t138u Oct 20, 2026). They count toward the t137u Limited stack (3+ → Avoid).',
  '',
  `**Propylene glycol split (tabs after rescan):** oral Limited (t138u) **${pgOralTabs}**; non-oral / nasal / topical unchanged **${pgNonOralTabs}**.`,
  '',
  '## Grade changes by direction and cause',
  '',
];
for (const [key, val] of Object.entries(byDirCause).sort((a, b) => b[1].count - a[1].count)) {
  md.push(`### ${key} (${val.count})`, '');
  md.push('| id | name | old | new | driver | limited tokens |');
  md.push('|---|---|---|---|---|---|');
  for (const row of gradeChangeDetails.filter(
    (r) => `${r.oldGrade}->${r.newGrade}/${r.cause}` === key,
  )) {
    const tok = row.limitedStackTokens?.join(', ') ?? '';
    md.push(
      `| \`${row.id}\` | ${row.name.replace(/\|/g, '/')} | ${row.oldGrade} | ${row.newGrade} | ${row.driver.replace(/\|/g, '/')} | ${tok.replace(/\|/g, '/')} |`,
    );
  }
  md.push('');
}

md.push('## Ingredient-only updates (no grade change)', '');
md.push(`Count: **${noGradeChangeIds.length}**`, '');
md.push(noGradeChangeIds.map((id) => `\`${id}\``).join(', '));

writeFileSync(join(process.cwd(), 'docs/t138u-results.md'), md.join('\n'));
writeFileSync(
  join(process.cwd(), 'docs/t138u-results.json'),
  JSON.stringify(
    {
      gradeChangeCount: gradeChangeDetails.length,
      gradeChanges: gradeChangeDetails,
      noGradeChangeCount: noGradeChangeIds.length,
      noGradeChangeIds,
      patchMiss,
      protectedFilesEdited: [...protectedEdited].sort(),
      propyleneGlycolSplit: { oralLimitedTabs: pgOralTabs, nonOralUnchangedTabs: pgNonOralTabs },
    },
    null,
    2,
  ),
);

const report = {
  patchedRowCount: pairs.length - patchMiss.length,
  patchMiss,
  gradeChangeCount: gradeChanges.length,
  noGradeChangeCount: noGradeChangeIds.length,
  protectedFilesEdited: [...protectedEdited].sort(),
};
console.log(JSON.stringify(report, null, 2));
