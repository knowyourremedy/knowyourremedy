/**
 * t135u batch-scoped catalog applier — one batch module at a time, tally from _ROWS.
 * Analyze: npx tsx scripts/t135u-batch-apply.ts
 * Apply:   npx tsx scripts/t135u-batch-apply.ts --apply
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { findMissingMethodologyLocks, recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { classifyRescanDelta } from '../lib/scan-preview/t135uValidate';

const PROTECTED_FILE_RE = /batch59-|batch(?:7[0-9]|[89]\d|1[0-3]\d|14[0-3])-/;

const BEESWAX_SPLIT_DQ =
  '["Beeswax", "cleared", "beeswax"], ["Carnauba wax", "cleared", "carnaubaT133u"]';
const BEESWAX_SPLIT_SQ =
  "['Beeswax', 'cleared', 'beeswax'], ['Carnauba wax', 'cleared', 'carnaubaT133u']";
const OLD_BEES_DQ = '["Beeswax / carnauba wax", "cleared", "gelatin"]';
const OLD_BEES_SQ = "['Beeswax / carnauba wax', 'cleared', 'gelatin']";

const METH_KEYS_PATCH = `  beeswax: 'Methodology §5 Cleared (beeswax — softgel shell wax)',
  carnaubaT133u:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
`;

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

function constAliasesForId(id: string, text: string): string[] {
  const aliases: string[] = [];
  const re = new RegExp(`const\\s+(\\w+)\\s*=\\s*['"]${escapeRe(id)}['"]`, 'g');
  for (const m of text.matchAll(re)) aliases.push(m[1]);
  return aliases;
}

function extractBlock(text: string, id: string): { start: number; end: number; block: string } | null {
  const aliases = constAliasesForId(id, text);
  const patterns = [
    new RegExp(`\\n  \\{\\n    id: "${escapeRe(id)}"`),
    new RegExp(`\\n  \\{\\n    id: '${escapeRe(id)}'`),
    new RegExp(`\\n    \\{\\n      id: "${escapeRe(id)}"`),
    new RegExp(`\\n    \\{\\n      id: '${escapeRe(id)}'`),
    new RegExp(`id: ['"]${escapeRe(id)}['"]`),
    ...aliases.map((a) => new RegExp(`id:\\s*${a}\\b`)),
  ];
  let start = -1;
  let indent = 2;
  for (const p of patterns) {
    const m = p.exec(text);
    if (m) {
      start = m.index;
      if (text.slice(start - 4, start).includes('    ')) indent = 4;
      break;
    }
  }
  if (start === -1) return null;
  const lineStart = text.lastIndexOf('\n', start) + 1;
  const openBrace = text.indexOf('{', start);
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
  const block = text.slice(lineStart, end);
  return { start: lineStart, end, block };
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
    b = b.replace(
      new RegExp(`(\\["${nameRe}"\\s*,\\s*)"(limited|moderate|high|cleared)"`, 'gi'),
      `$1"${ing.riskLevel}"`,
    );
    b = b.replace(
      new RegExp(`(\\['${nameRe}'\\s*,\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
      `$1'${ing.riskLevel}'`,
    );
    b = b.replace(
      new RegExp(`(${nameRe}["']\\s*,\\s*)"(limited|moderate|high|cleared)"`, 'gi'),
      `$1"${ing.riskLevel}"`,
    );
    b = b.replace(
      new RegExp(`flag\\(\\s*['"]${nameRe}['"]\\s*,\\s*['"](limited|moderate|high|cleared)['"]`, 'gi'),
      (m) => m.replace(/'(limited|moderate|high|cleared)'|"(limited|moderate|high|cleared)"/, `'${ing.riskLevel}'`),
    );
    if (ing.source && old.source && ing.source !== old.source) {
      const oldMeth = old.source.split(';').slice(1).join(';').trim();
      const newMeth = ing.source.split(';').slice(1).join(';').trim();
      if (oldMeth && b.includes(oldMeth)) b = b.replace(oldMeth, newMeth);
      else if (oldMeth.length > 40) {
        const shortOld = oldMeth.slice(0, 60);
        if (b.includes(shortOld)) b = b.replace(shortOld, newMeth.slice(0, 60));
      }
    }
  }
  if (applyVerdict && before.verdict !== after.verdict) {
    b = b.replace(new RegExp(`verdict: "${escapeRe(before.verdict)}"`), `verdict: "${after.verdict}"`);
    b = b.replace(new RegExp(`verdict: '${escapeRe(before.verdict)}'`), `verdict: '${after.verdict}'`);
  }
  return b;
}

function patchSharedFlagsConst(
  text: string,
  flagsName: string,
  before: RatingRecord,
  after: RatingRecord,
): string {
  const re = new RegExp(`const\\s+${flagsName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`);
  const m = re.exec(text);
  if (!m) return text;
  let body = m[1];
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old) continue;
    if (ing.riskLevel === old.riskLevel && (ing.source ?? '') === (old.source ?? '')) continue;
    const names = [ing.name, ing.name.toLowerCase()];
    for (const n of names) {
      const nameRe = escapeRe(n);
      body = body.replace(
        new RegExp(`(\\['${nameRe}'\\s*,\\s*)'(limited|moderate|high|cleared)'`, 'gi'),
        `$1'${ing.riskLevel}'`,
      );
      body = body.replace(
        new RegExp(`(\\["${nameRe}"\\s*,\\s*)"(limited|moderate|high|cleared)"`, 'gi'),
        `$1"${ing.riskLevel}"`,
      );
    }
  }
  return text.slice(0, m.index) + text.slice(m.index, m.index + m[0].length).replace(m[1], body) + text.slice(m.index + m[0].length);
}

function ensureMethKeys(text: string): string {
  if (text.includes('carnaubaT133u')) return text;
  return text.replace(
    /  gelatin: 'Methodology §5 Cleared \(gelatin \/ beeswax \/ carnauba \/ purified water\)',\n/,
    `  gelatin: 'Methodology §5 Cleared (gelatin / beeswax / carnauba / purified water)',\n${METH_KEYS_PATCH}`,
  );
}

function updateTallyInFile(text: string, clean: number, caution: number, avoid: number): string {
  if (clean === 0 && caution === 0 && avoid === 0) {
    throw new Error('refusing 0/0/0 tally update');
  }
  let out = text;
  out = out.replace(
    /\/\/ Clean \d+ \/ Caution \d+ \/ Avoid \d+\./g,
    `// Clean ${clean} / Caution ${caution} / Avoid ${avoid}.`,
  );
  out = out.replace(
    /TALLY[^:]*: \d+ rows — Clean \d+ \/ Caution \d+ \/ Avoid \d+\./g,
    (m) => m.replace(/Clean \d+ \/ Caution \d+ \/ Avoid \d+/, `Clean ${clean} / Caution ${caution} / Avoid ${avoid}`),
  );
  out = out.replace(
    /if \(_ROWS\.filter\(\(r\) => r\.verdict === 'clean'\)\.length !== \d+\)/g,
    `if (_ROWS.filter((r) => r.verdict === 'clean').length !== ${clean})`,
  );
  out = out.replace(
    /if \(_ROWS\.filter\(\(r\) => r\.verdict === 'caution'\)\.length !== \d+\)/g,
    `if (_ROWS.filter((r) => r.verdict === 'caution').length !== ${caution})`,
  );
  out = out.replace(
    /if \(_ROWS\.filter\(\(r\) => r\.verdict === 'avoid'\)\.length !== \d+\)/g,
    `if (_ROWS.filter((r) => r.verdict === 'avoid').length !== ${avoid})`,
  );
  return out;
}

function mainRowsExport(mod: Record<string, unknown>): { key: string; rows: RatingRecord[] } | null {
  let best: { key: string; rows: RatingRecord[] } | null = null;
  for (const [key, val] of Object.entries(mod)) {
    if (!key.startsWith('BATCH') || !Array.isArray(val) || val.length === 0) continue;
    const rows = val as RatingRecord[];
    if (!rows[0]?.id) continue;
    if (!best || rows.length > best.rows.length) best = { key, rows };
  }
  return best;
}

const catalog = allPreviewCatalogRecords();
const missingMap = new Map<string, { id: string; productName: string; ingredientName: string }>();
for (const record of catalog) {
  for (const m of findMissingMethodologyLocks(record)) {
    missingMap.set(`${m.id}\0${m.ingredientName}`, m);
  }
}
const missing = [...missingMap.values()];
if (missing.length > 0) {
  console.error(JSON.stringify({ stop: true, missingCount: missing.length, missing: missing.slice(0, 30) }, null, 2));
  process.exit(1);
}

type GradeRow = {
  id: string;
  productName: string;
  oldVerdict: string;
  newVerdict: string;
  drivingToken: string;
};

const applyRows: { before: RatingRecord; after: RatingRecord; applyVerdict: boolean; drivingToken: string }[] =
  [];
const whyOnly: string[] = [];
const gradeChanges: GradeRow[] = [];
const excluded: { id: string; reason: string }[] = [];
const byDrivingToken = new Map<string, GradeRow[]>();

for (const record of catalog) {
  const after = recomputeFounderRescanRecord(record);
  const cls = classifyRescanDelta(record, after);
  if (cls.kind === 'noop') continue;
  if (cls.kind === 'excluded') {
    excluded.push({ id: record.id, reason: cls.reason });
    continue;
  }
  applyRows.push({
    before: record,
    after,
    applyVerdict: cls.applyVerdict,
    drivingToken: cls.drivingToken,
  });
  if (record.verdict !== after.verdict && cls.applyVerdict) {
    const row: GradeRow = {
      id: record.id,
      productName: record.productName,
      oldVerdict: record.verdict,
      newVerdict: after.verdict,
      drivingToken: cls.drivingToken,
    };
    gradeChanges.push(row);
    const list = byDrivingToken.get(cls.drivingToken) ?? [];
    list.push(row);
    byDrivingToken.set(cls.drivingToken, list);
  } else if (record.verdict === after.verdict) {
    whyOnly.push(record.id);
  }
}

const protectedEdited = new Set<string>();
const report = {
  totalRows: catalog.length,
  applyRowCount: applyRows.length,
  gradeChangeCount: gradeChanges.length,
  whyOnlyCount: whyOnly.length,
  excludedCount: excluded.length,
  gradeChanges,
  whyOnly,
  excluded,
  byDrivingToken: Object.fromEntries(
    [...byDrivingToken.entries()].map(([k, v]) => [k, v.length]),
  ),
};

mkdirSync(join(process.cwd(), 'docs'), { recursive: true });
writeFileSync(join(process.cwd(), 'docs/t135u-rescan-report.json'), JSON.stringify(report, null, 2));

if (!process.argv.includes('--apply')) {
  console.log(
    JSON.stringify(
      {
        ...report,
        byDrivingTokenDetail: Object.fromEntries(byDrivingToken),
        message: 'Wrote docs/t135u-rescan-report.json',
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

async function applyBatchScoped(): Promise<void> {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  const batchFiles = readdirSync(dir)
    .filter((f) => f.startsWith('batch') && f.endsWith('.ts'))
    .sort();
  const idToPair = new Map(applyRows.map((p) => [p.before.id, p]));
  const touchedFiles = new Set<string>();
  const patchMiss: string[] = [];

  for (const file of batchFiles) {
    const rel = join('lib/rating-drafts', file);
    const abs = join(process.cwd(), rel);
    const mod = await import(`${abs}?t135u=${Date.now()}`);
    const exp = mainRowsExport(mod as Record<string, unknown>);
    if (!exp) continue;
    const pairs = exp.rows.map((r) => idToPair.get(r.id)).filter(Boolean) as typeof applyRows;
    if (pairs.length === 0) continue;

    let text = ensureMethKeys(readFileSync(abs, 'utf8'));
    for (const { before, after, applyVerdict } of pairs) {
      const loc = extractBlock(text, before.id);
      if (!loc) {
        patchMiss.push(before.id);
        continue;
      }
      const flagsMatch = loc.block.match(/flags:\s*(\w+)/);
      if (flagsMatch) {
        text = patchSharedFlagsConst(text, flagsMatch[1], before, after);
      }
      const newBlock = patchBlock(loc.block, before, after, applyVerdict);
      text = text.slice(0, loc.start) + newBlock + text.slice(loc.end);
    }
    writeFileSync(abs, text);
    touchedFiles.add(rel);
    if (PROTECTED_FILE_RE.test(file)) protectedEdited.add(rel);
  }

  const { execSync } = await import('node:child_process');
  execSync('npx tsx scripts/t135u-fix-tallies.ts', { stdio: 'inherit', cwd: process.cwd() });

  const previewPath = join(process.cwd(), 'lib/scan-preview/previewCatalog.ts');
  let previewText = readFileSync(previewPath, 'utf8');
  if (previewText.includes('T134U_CARNAUBA_FILE_LOCKED_IDS')) {
    previewText = previewText.replace(
      /\/\*\* t134u founder file edits[\s\S]*?\n\]\);\n\n/,
      '',
    );
    previewText = previewText.replace(
      /  if \(!options\?\.ignoreFileLockedSkip && T134U_CARNAUBA_FILE_LOCKED_IDS\.has\(record\.id\)\) \{\n    return record;\n  }\n/,
      '',
    );
    previewText = previewText.replace(
      /export function applyT133uLocks\(\n  record: RatingRecord,\n  options\?: \{ ignoreFileLockedSkip\?: boolean \},\n\)/,
      'export function applyT133uLocks(record: RatingRecord)',
    );
    previewText = previewText.replace(
      /applyT133uLocks\(rec, \{ ignoreFileLockedSkip: options\?\.applyT133uToFileLockedIds \}\)/,
      'applyT133uLocks(rec)',
    );
    writeFileSync(previewPath, previewText);
  }

  const finalReport = {
    ...report,
    applied: true,
    touchedFileCount: touchedFiles.size,
    touchedFiles: [...touchedFiles].sort(),
    protectedFilesEdited: [...protectedEdited].sort(),
    patchMiss,
  };
  writeFileSync(join(process.cwd(), 'docs/t135u-rescan-report.json'), JSON.stringify(finalReport, null, 2));
  console.log(JSON.stringify(finalReport, null, 2));
}

applyBatchScoped().catch((err) => {
  console.error(err);
  process.exit(1);
});
