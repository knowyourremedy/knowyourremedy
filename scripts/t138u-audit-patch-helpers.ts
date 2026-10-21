/**
 * Shared block patch helpers for t138u rescan / audit scripts.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord } from '../lib/ratingRecord';
import {
  appendLimitedStackHonestNote,
  computeVerdictFromInactiveIngredients,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from '../lib/scan-preview/verdictFromFlags';

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
  const idBlockRe = /const\s+ID\s*=\s*\{([\s\S]*?)\}\s*as\s+const/g;
  for (const m of text.matchAll(idBlockRe)) {
    for (const line of m[1].matchAll(/(\w+):\s*['"]([^'"]+)['"]/g)) {
      if (line[2] === id) aliases.push(`ID.${line[1]}`);
    }
  }
  return [...new Set(aliases)];
}

export function findFileForId(id: string, draftsDir?: string): string | null {
  const dir = draftsDir ?? join(process.cwd(), 'lib/rating-drafts');
  const idEsc = escapeRe(id);
  const idPat = new RegExp(`\\bid:\\s*['"]${idEsc}['"]`);
  const constPat = new RegExp(`const\\s+(\\w+)\\s*=\\s*['"]${idEsc}['"]`, 'g');
  const candidates: string[] = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const path = join(dir, file);
    const text = readFileSync(path, 'utf8');
    if (idPat.test(text)) {
      candidates.push(path);
      continue;
    }
    for (const m of text.matchAll(constPat)) {
      const alias = m[1];
      if (new RegExp(`\\bid:\\s*${alias}\\b`).test(text)) candidates.push(path);
    }
  }
  const uniq = [...new Set(candidates)];
  for (const path of uniq) {
    if (extractBlock(readFileSync(path, 'utf8'), id)) return path;
  }
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts')) continue;
    const path = join(dir, file);
    const text = readFileSync(path, 'utf8');
    if (text.includes(`'${id}'`) || text.includes(`"${id}"`)) {
      if (extractBlock(text, id)) return path;
    }
  }
  return null;
}

export function extractBlock(
  text: string,
  id: string,
): { start: number; end: number; block: string } | null {
  const aliases = constAliasesForId(id, text);
  const patterns = [
    new RegExp(`expand\\(\\s*['"]${escapeRe(id)}['"]`),
    new RegExp(`\\n  expand\\(\\{\\n    id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`\\n  \\{\\n    id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`\\n    \\{\\n      id: ['"]${escapeRe(id)}['"]`),
    new RegExp(`id:\\s*['"]${escapeRe(id)}['"]`),
    ...aliases.flatMap((a) => [
      new RegExp(`id:\\s*${a.replace(/\./g, '\\.')}\\b`),
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
  let lineStart = text.lastIndexOf('\n', start) + 1;
  let openBrace = -1;
  let helperCallIdx = -1;
  const before = text.slice(0, start);
  for (const m of before.matchAll(/\b[A-Za-z_$][\w$]*\(\{/g)) {
    helperCallIdx = m.index ?? -1;
  }
  if (helperCallIdx >= 0) {
    openBrace = text.indexOf('{', helperCallIdx);
    lineStart = text.lastIndexOf('\n', helperCallIdx) + 1;
  } else if (fromExpand) {
    openBrace = text.indexOf('{', lineStart);
  } else {
    openBrace = text.indexOf('{', start);
  }
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
        if (helperCallIdx >= 0 && text[end] === ')') end += 1;
        break;
      }
    }
  }
  return { start: lineStart, end, block: text.slice(lineStart, end) };
}

export function patchBlock(
  block: string,
  before: RatingRecord,
  after: RatingRecord,
  applyVerdict: boolean,
  stackTokens?: string[],
  forceStackNote = false,
  stripStackNote = false,
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
      (m) =>
        m.replace(/'(limited|moderate|high|cleared)'|"(limited|moderate|high|cleared)"/, `'${ing.riskLevel}'`),
    );
    for (const n of names) {
      const nr = escapeRe(n);
      b = b.replace(
        new RegExp(`(\\[\\s*['"]${nr}['"]\\s*,\\s*)['"](limited|moderate|high|cleared)['"]`, 'gi'),
        `$1'${ing.riskLevel}'`,
      );
    }
    if (ing.source && old.source && ing.source !== old.source) {
      const oldMeth = old.source.split(';').slice(1).join(';').trim();
      const newMeth = ing.source.split(';').slice(1).join(';').trim();
      if (
        oldMeth === 'Methodology §5 Cleared'
        && newMeth.includes('Carnauba wax — founder lock t133u')
      ) {
        const clearedRe = new RegExp(`cleared\\(([^,)]+),\\s*['"]${nameRe}['"]\\)`, 'g');
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
    if (after.verdict !== 'avoid') {
      const noteRe =
        /(honestNote:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const plainNote =
        /(note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const mathNote =
        /(math:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const nm = noteRe.exec(b) ?? plainNote.exec(b) ?? mathNote.exec(b);
      if (nm) {
        const quote = nm[2][0];
        const inner = nm[2].slice(1, -1);
        const stripped = stripLimitedStackHonestNote(inner);
        if (stripped !== inner) {
          b = b.replace(nm[0], `${nm[1]}${quote}${stripped}${quote}`);
        }
      }
    }
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
    && (applyVerdict || stackChanged || forceStackNote)
  ) {
    const noteRe = /(honestNote:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
    const noteM = noteRe.exec(b);
    if (noteM) {
      const quote = noteM[2][0];
      const inner = noteM[2].slice(1, -1);
      const merged = stackChanged || forceStackNote
        ? replaceLimitedStackHonestNote(inner, stackTokens)
        : appendLimitedStackHonestNote(inner, stackTokens);
      b = b.replace(noteM[0], `${noteM[1]}${quote}${merged}${quote}`);
    } else {
      const plainNote = /(note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const mathNote = /(math:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
      const nm = plainNote.exec(b) ?? mathNote.exec(b);
      if (nm) {
        const quote = nm[2][0];
        const inner = nm[2].slice(1, -1);
        const merged = stackChanged || forceStackNote
          ? replaceLimitedStackHonestNote(inner, stackTokens)
          : appendLimitedStackHonestNote(inner, stackTokens);
        b = b.replace(nm[0], `${nm[1]}${quote}${merged}${quote}`);
      } else if ((forceStackNote || applyVerdict) && !/honestNote:\s*/.test(b)) {
        const merged = replaceLimitedStackHonestNote('', stackTokens);
        const esc = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        if (/verdict:\s*['"]avoid['"]/.test(b)) {
          b = b.replace(
            /(verdict:\s*['"]avoid['"],?\n)/,
            `$1    honestNote: '${esc}',\n`,
          );
        } else if (/verdict:\s*/.test(b)) {
          b = b.replace(
            /(verdict:\s*[^,\n]+,?\n)/,
            `$1    honestNote: '${esc}',\n`,
          );
        }
      }
    }
  }
  if (stripStackNote) {
    const noteRe = /(honestNote:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
    const plainNote =
      /(note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
    const mathNote =
      /(math:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^`\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
    const nm = noteRe.exec(b) ?? plainNote.exec(b) ?? mathNote.exec(b);
    if (nm) {
      const quote = nm[2][0];
      const inner = nm[2].slice(1, -1);
      const stripped = stripLimitedStackHonestNote(inner);
      if (stripped !== inner) {
        b = b.replace(nm[0], `${nm[1]}${quote}${stripped}${quote}`);
      }
    }
  }
  return b;
}

export function patchMethBlockOnly(text: string, before: RatingRecord, after: RatingRecord): string {
  const methRe = /const METH = \{[\s\S]*?\n\}\s*(?:as const)?\s*;/m;
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
      continue;
    }
    const oldShort = oldMeth.replace(/^Methodology §5\s+/i, '');
    const newShort = newMeth.replace(/^Methodology §5\s+/i, '');
    if (oldShort.length >= 16 && methBody.includes(oldShort)) {
      methBody = methBody.replace(oldShort, newShort);
      changed = true;
    }
  }
  if (!changed) return text;
  return text.slice(0, m.index) + methBody + text.slice(m.index + m[0].length);
}

export function patchAllCompactFlagsInFile(
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
  return out;
}

/** Patch a file-level `const FOO_NOTE = '...'` when rows reference `note: FOO_NOTE`. */
export function patchSharedNoteConst(
  text: string,
  constName: string,
  merge: (inner: string) => string,
): string {
  const re = new RegExp(
    `(const\\s+${escapeRe(constName)}\\s*=\\s*\\n\\s*)'((?:[^'\\\\]|\\\\.)*)'`,
  );
  const m = re.exec(text);
  if (!m) return text;
  const merged = merge(m[2]);
  if (merged === m[2]) return text;
  const esc = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return text.replace(m[0], `${m[1]}'${esc}'`);
}

export function patchSharedFlagsConst(
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
