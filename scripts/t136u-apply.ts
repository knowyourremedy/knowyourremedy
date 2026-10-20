/**
 * t136u Step 2 (risk tab drift) + Step 3 (citation-only).
 * npx tsx scripts/t136u-apply.ts --step2
 * npx tsx scripts/t136u-apply.ts --step3
 * npx tsx scripts/t136u-apply.ts --step2 --step3
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import {
  findMissingMethodologyLocks,
  recomputeFounderRescanRecord,
  verdictFromFlagsStrict,
} from '../lib/scan-preview/founderRescan';
import { ingredientDeltas } from '../lib/scan-preview/t135uValidate';

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

function hasRiskDrift(before: RatingRecord, after: RatingRecord): boolean {
  return ingredientDeltas(before, after).some((d) => d.oldRisk !== d.newRisk);
}

function hasSourceOnlyDrift(before: RatingRecord, after: RatingRecord): boolean {
  const deltas = ingredientDeltas(before, after);
  if (deltas.length === 0) return false;
  return deltas.every((d) => d.oldRisk === d.newRisk && d.oldSource !== d.newSource);
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

const doStep2 = process.argv.includes('--step2');
const doStep3 = process.argv.includes('--step3');
if (!doStep2 && !doStep3) {
  console.error('Pass --step2 and/or --step3');
  process.exit(1);
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

type Pair = { before: RatingRecord; after: RatingRecord; applyVerdict: boolean };
const pairs: Pair[] = [];

for (const before of catalog) {
  const after = recomputeFounderRescanRecord(before);
  const risk = hasRiskDrift(before, after);
  const srcOnly = hasSourceOnlyDrift(before, after);
  if (doStep2 && risk) {
    const applyVerdict =
      before.verdict !== after.verdict
      && verdictFromFlagsStrict({ ...after, verdict: after.verdict }) === after.verdict;
    pairs.push({ before, after, applyVerdict });
  } else if (doStep3 && srcOnly && !risk) {
    pairs.push({ before, after, applyVerdict: false });
  }
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
  for (const { before, after, applyVerdict } of filePairs) {
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
    if (doStep3) {
      text = patchMethBlockOnly(text, before, after);
    }
    loc = extractBlock(text, before.id);
    if (!loc) {
      patchMiss.push(before.id);
      continue;
    }
    const newBlock = patchBlock(loc.block, before, after, applyVerdict);
    text = text.slice(0, loc.start) + newBlock + text.slice(loc.end);
    if (applyVerdict && before.verdict !== after.verdict) {
      gradeChanges.push({
        id: before.id,
        oldVerdict: before.verdict,
        newVerdict: after.verdict,
      });
    }
  }
  if (doStep3) {
    text = patchCarnaubaClearedHelpers(text);
  }
  writeFileSync(path, text);
  const rel = path.replace(process.cwd() + '/', '');
  if (PROTECTED_FILE_RE.test(rel)) protectedEdited.add(rel);
}

if (doStep3) {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const path = join(dir, file);
    const patched = patchCarnaubaClearedHelpers(readFileSync(path, 'utf8'));
    writeFileSync(path, patched);
  }
}

execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

const report = {
  step2: doStep2,
  step3: doStep3,
  patchedRowCount: pairs.length - patchMiss.length,
  patchMiss,
  gradeChanges,
  protectedFilesEdited: [...protectedEdited].sort(),
};
writeFileSync(join(process.cwd(), 'docs/t136u-apply-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
