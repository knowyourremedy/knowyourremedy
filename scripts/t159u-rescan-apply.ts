/**
 * t159u catalog rescan — stevia extract / stevia leaf extract Limited,
 * paprika extract (natural color) / Paprika (color) Cleared.
 * npx tsx scripts/t159u-rescan-apply.ts
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import {
  applyT159uIngredientLocks,
  PAPRIKA_COLOR_CLEARED_SOURCE,
  STEVIA_EXTRACT_LIMITED_SOURCE,
  t159uLockForName,
} from '../lib/scan-preview/t159uLocks';
import {
  appendLimitedStackHonestNote,
  computeVerdictFromInactiveIngredients,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from '../lib/scan-preview/verdictFromFlags';

const DRAFTS = join(process.cwd(), 'lib/rating-drafts');
const STEVIA_KEY = 'steviaT159u';
const PAPRIKA_KEY = 'paprikaT159u';

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
    ...aliases.flatMap((a) => [new RegExp(`id:\\s*${a}\\b`), new RegExp(`id:\\s*ID\\.${a}\\b`)]),
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
  const openBrace = fromExpand ? text.indexOf('{', lineStart) : text.indexOf('{', start);
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

function ensureMethKey(text: string, key: string, value: string): string {
  if (new RegExp(`\\b${key}\\s*:`).test(text)) return text;
  const methStart = text.match(/const METH[^=]*=\s*\{/);
  if (!methStart || methStart.index === undefined) return text;
  const insertAt = methStart.index + methStart[0].length;
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `${text.slice(0, insertAt)}\n  ${key}: '${escaped}',${text.slice(insertAt)}`;
}

function patchIngredientSites(text: string, name: string, level: string, key: string): { text: string; count: number } {
  let count = 0;
  const n = escapeRe(name);
  const levels = 'limited|moderate|high|cleared';
  const tuple = new RegExp(
    `\\[\\s*(['"])${n}\\1\\s*,\\s*(['"])(?:${levels})\\2\\s*,\\s*(['"])[^'"]+\\3`,
    'g',
  );
  text = text.replace(tuple, (_m, q1: string, q2: string, q3: string) => {
    count++;
    return `[${q1}${name}${q1}, ${q2}${level}${q2}, ${q3}${key}${q3}`;
  });
  const directMeth = new RegExp(
    `(['"])${n}\\1(\\s*,\\s*)(['"])(?:${levels})\\3(\\s*,\\s*)METH\\.([A-Za-z0-9_]+)`,
    'g',
  );
  text = text.replace(directMeth, (_m, q1: string, gap: string, q3: string, mid: string) => {
    count++;
    return `${q1}${name}${q1}${gap}${q3}${level}${q3}${mid}METH.${key}`;
  });
  const citeMeth = new RegExp(
    `(['"])${n}\\1(\\s*,\\s*)(['"])(?:${levels})\\3(\\s*,\\s*(?:dailymed|labelCite|cite)\\((?:[^()]|\\([^()]*\\)){0,3}?METH\\.)([A-Za-z0-9_]+)`,
    'g',
  );
  text = text.replace(citeMeth, (_m, q1: string, gap: string, q3: string, mid: string) => {
    count++;
    return `${q1}${name}${q1}${gap}${q3}${level}${q3}${mid}${key}`;
  });
  const stringKey = new RegExp(
    `(flag\\(\\s*)([^,\\n]+)(,\\s*)(['"])${n}\\4(\\s*,\\s*)(['"])(?:${levels})\\6(\\s*,\\s*)(['"])[A-Za-z0-9_]+\\8`,
    'g',
  );
  text = text.replace(
    stringKey,
    (_m, flagOpen: string, panel: string, comma: string, q1: string, gap: string, q3: string, mid: string, q5: string) => {
      count++;
      return `${flagOpen}${panel}${comma}${q1}${name}${q1}${gap}${q3}${level}${q3}${mid}${q5}${key}${q5}`;
    },
  );
  return { text, count };
}

function mapNoteFields(block: string, fn: (inner: string) => string): { block: string; hits: number } {
  let hits = 0;
  const next = block.replace(
    /(honestNote:\s*|note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g,
    (_full, pre: string, quoted: string) => {
      hits++;
      const q = quoted[0];
      const inner = quoted.slice(1, -1);
      return `${pre}${q}${fn(inner)}${q}`;
    },
  );
  return { block: next, hits };
}

type Plan = {
  id: string;
  productName: string;
  stored: string;
  before: string;
  after: string;
  publish: boolean;
  cause: string;
  tokens: string[];
  beforeTokens: string[];
  stackNow: boolean;
  tokensChanged: boolean;
};

const rows = allPreviewCatalogRecords();
const plans: Plan[] = [];
const names = new Map<string, { level: string; key: string }>();

for (const record of rows) {
  const applied = applyT159uIngredientLocks(record);
  if (!applied.changed) continue;
  for (let i = 0; i < record.inactiveIngredients.length; i++) {
    const beforeIng = record.inactiveIngredients[i];
    const afterIng = applied.record.inactiveIngredients[i];
    if (beforeIng.riskLevel === afterIng.riskLevel && (beforeIng.source ?? '') === (afterIng.source ?? '')) {
      continue;
    }
    const lock = t159uLockForName(beforeIng.name);
    if (!lock) continue;
    const key = lock.riskLevel === 'limited' ? STEVIA_KEY : PAPRIKA_KEY;
    names.set(beforeIng.name, { level: lock.riskLevel, key });
  }
  const beforeV = computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag);
  const afterV = computeVerdictFromInactiveIngredients(
    applied.record.inactiveIngredients,
    applied.record.activeSafetyFlag,
  );
  const beforeTokens = beforeV.limitedStackTokens ?? [];
  const tokens = afterV.limitedStackTokens ?? [];
  const tokensChanged = beforeTokens.join('|') !== tokens.join('|');
  const verdictChanged = beforeV.verdict !== afterV.verdict;
  if (!verdictChanged && !(afterV.cause === 'limited_stack' && tokensChanged)) continue;
  plans.push({
    id: record.id,
    productName: record.productName,
    stored: record.verdict,
    before: beforeV.verdict,
    after: afterV.verdict,
    publish: verdictChanged && record.verdict !== afterV.verdict,
    cause: afterV.cause,
    tokens,
    beforeTokens,
    stackNow: afterV.cause === 'limited_stack',
    tokensChanged,
  });
}

const files = readdirSync(DRAFTS).filter((f) => f.endsWith('.ts'));
const siteCounts = new Map<string, number>();
for (const file of files) {
  const path = join(DRAFTS, file);
  let text = readFileSync(path, 'utf8');
  const original = text;
  for (const [name, lock] of names) {
    if (!text.includes(name)) continue;
    const patched = patchIngredientSites(text, name, lock.level, lock.key);
    text = patched.text;
    if (patched.count) siteCounts.set(name, (siteCounts.get(name) ?? 0) + patched.count);
  }
  if (text.includes(STEVIA_KEY)) text = ensureMethKey(text, STEVIA_KEY, STEVIA_EXTRACT_LIMITED_SOURCE);
  if (text.includes(PAPRIKA_KEY)) text = ensureMethKey(text, PAPRIKA_KEY, PAPRIKA_COLOR_CLEARED_SOURCE);

  for (const plan of plans) {
    if (!text.includes(plan.id)) continue;
    const found = extractBlock(text, plan.id);
    if (!found) {
      console.log(`NO BLOCK ${plan.id} in ${file}`);
      continue;
    }
    let block = found.block;
    if (plan.publish) {
      block = block.replace(
        new RegExp(`verdict:\\s*['"]${escapeRe(plan.stored)}['"]`),
        (m) => m.replace(plan.stored, plan.after),
      );
    }
    if (plan.stackNow && (plan.tokensChanged || plan.publish || plan.before !== plan.after)) {
      const mapped = mapNoteFields(block, (inner) => {
        let note = inner;
        if (note.includes('whole-leaf stevia Caution-table')) {
          note = note
            .replaceAll('whole-leaf stevia Caution-table', 'organic stevia (leaf) extract Limited (founder lock t159u)')
            .replaceAll(' = Caution.', ' = Avoid.')
            .replaceAll('→ Caution.', '→ Avoid.');
        }
        return replaceLimitedStackHonestNote(note, plan.tokens);
      });
      block = mapped.block;
      if (mapped.hits === 0) {
        const line = appendLimitedStackHonestNote(undefined, plan.tokens);
        const escaped = line.replace(/'/g, "\\'");
        block = block.replace(
          /^([ \t]*)verdict:\s*['"][^'"]+['"],?\n/m,
          (m, indent: string) => `${m}${indent}honestNote: '${escaped}',\n`,
        );
      }
    } else if (plan.publish && !plan.stackNow) {
      const mapped = mapNoteFields(block, (inner) => stripLimitedStackHonestNote(inner));
      block = mapped.block;
    }
    if (block !== found.block) {
      text = text.slice(0, found.start) + block + text.slice(found.end);
    }
  }

  if (text !== original) {
    writeFileSync(path, text);
    console.log(`patched ${file}`);
  }
}

const published = plans.filter((p) => p.publish);
console.log(`names ${names.size} plans ${plans.length} published ${published.length}`);
for (const [name, count] of siteCounts) console.log(`sites ${count} ${name}`);
for (const name of names.keys()) {
  if (!siteCounts.has(name)) console.log(`UNMATCHED NAME ${name}`);
}
for (const p of published) {
  console.log(`GRADE ${p.stored} -> ${p.after} ${p.id} ${p.cause} ${p.tokens.join(', ')}`);
}
for (const p of plans.filter((p) => !p.publish && p.stackNow && p.tokensChanged)) {
  console.log(`NOTE ${p.id} ${p.tokens.join(', ')}`);
}
writeFileSync('/tmp/t159u-apply-plan.json', JSON.stringify({ published, plans }, null, 2));
