/**
 * Audit / fix t137u stack-Avoid honest notes on disk.
 * npx tsx scripts/t137u-stack-note-audit.ts [--fix]
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { appendLimitedStackHonestNote } from '../lib/scan-preview/verdictFromFlags';

const FIX = process.argv.includes('--fix');
const STACK_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

const DYE_FREE_INFANT_GAS_IDS = new Set([
  'cvs-infants-gas-dyefree',
  'walgreens-infants-gas-dyefree',
]);

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function idPatternsInFile(text: string, id: string): RegExp[] {
  const patterns: RegExp[] = [new RegExp(`id:\\s*['"]${escapeRe(id)}['"]`, 'g')];
  const idBlockRe = /const\s+ID\s*=\s*\{([\s\S]*?)\}\s*as\s+const/g;
  for (const m of text.matchAll(idBlockRe)) {
    const body = m[1];
    for (const line of body.matchAll(/(\w+):\s*['"]([^'"]+)['"]/g)) {
      if (line[2] === id) {
        patterns.push(new RegExp(`id:\\s*ID\\.${line[1]}\\b`, 'g'));
      }
    }
  }
  for (const m of text.matchAll(new RegExp(`\\b(\\w+):\\s*['"]${escapeRe(id)}['"]`, 'g'))) {
    patterns.push(new RegExp(`id:\\s*ID\\.${m[1]}\\b`, 'g'));
  }
  for (const m of text.matchAll(new RegExp(`const\\s+(\\w+)\\s*=\\s*['"]${escapeRe(id)}['"]`, 'g'))) {
    patterns.push(new RegExp(`id:\\s*${m[1]}\\b`, 'g'));
  }
  return patterns;
}

function extractAllBlocks(text: string, id: string): { start: number; end: number; block: string }[] {
  const out: { start: number; end: number; block: string }[] = [];
  const patterns = idPatternsInFile(text, id);
  for (const idRe of patterns) {
  for (const m of text.matchAll(idRe)) {
    const idx = m.index ?? 0;
    const openBrace = text.lastIndexOf('{', idx);
    if (openBrace < 0) continue;
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
    const lineStart = text.lastIndexOf('\n', openBrace) + 1;
    out.push({ start: lineStart, end, block: text.slice(lineStart, end) });
  }
  }
  return out;
}

function pickRowBlock(blocks: { start: number; end: number; block: string }[]): {
  start: number;
  end: number;
  block: string;
} | null {
  const scored = blocks
    .map((b) => {
      const hasIng = /inactiveIngredients:|inactives:|flags:/.test(b.block);
      const hasVerdict = /verdict:/.test(b.block);
      const isCallOnly = /^\s*\w+\(\{/.test(b.block) && !hasIng;
      return { ...b, score: (hasIng ? 4 : 0) + (hasVerdict ? 2 : 0) - (isCallOnly ? 5 : 0) };
    })
    .filter((b) => b.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored[0] ?? blocks.find((b) => /inactiveIngredients:|inactives:/.test(b.block)) ?? null;
}

type NoteField = 'honestNote' | 'note' | 'math';

function readNoteFromBlock(block: string): { field: NoteField; inner: string; full: string } | null {
  const honestRe = /(honestNote:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
  const m = honestRe.exec(block);
  if (m) {
    return { field: 'honestNote', inner: m[2].slice(1, -1), full: m[0] };
  }
  const noteRe = /(note:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
  const nm = noteRe.exec(block);
  if (nm) {
    return { field: 'note', inner: nm[2].slice(1, -1), full: nm[0] };
  }
  const mathRe = /(math:\s*)(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"[^"\\]*(?:\\.[^"\\]*)*")/;
  const mm = mathRe.exec(block);
  if (mm) {
    return { field: 'math', inner: mm[2].slice(1, -1), full: mm[0] };
  }
  return null;
}

function escapeForQuote(merged: string, quote: string): string {
  if (quote === '`') return merged.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
  return merged.replace(/\\/g, '\\\\').replace(new RegExp(quote, 'g'), `\\${quote}`);
}

function patchBlockNote(block: string, merged: string): string {
  let b = block.replace(/verdict:\s*['"]caution['"]/g, "verdict: 'avoid'");
  const existing = readNoteFromBlock(b);
  if (existing) {
    const quote = existing.full.match(/[`'"]/)?.[0] ?? "'";
    const escaped = escapeForQuote(merged, quote);
    let out = b.replace(existing.full, `${existing.field}: ${quote}${escaped}${quote}`);
    if (/expand\s*\(\{/.test(out) && !/verdict:\s*['"]avoid['"]/.test(out)) {
      out = out.replace(/(\n\s+note:\s*[^\n]+\n)/, `$1    verdict: 'avoid',\n`);
    }
    return out;
  }
  const verdictM = /(\n\s+verdict:\s*['"]avoid['"],?\n)/.exec(b);
  if (verdictM) {
    const escaped = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return b.replace(verdictM[1], `${verdictM[1]}    honestNote: '${escaped}',\n`);
  }
  const mathM = /(\n\s+math:\s*)/.exec(b);
  if (mathM) {
    const escaped = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    let out = b.replace(/(\n\s+)(inactives:)/, `\n    verdict: 'avoid',\n$1$2`);
    if (!/verdict:\s*'avoid'/.test(out)) {
      out = b;
    }
    const existingMath = readNoteFromBlock(out);
    if (existingMath?.field === 'math') {
      const quote = existingMath.full.match(/[`'"]/)?.[0] ?? "'";
      const esc = escapeForQuote(merged, quote);
      return out.replace(existingMath.full, `${existingMath.field}: ${quote}${esc}${quote}`);
    }
    return out;
  }
  return block;
}

function patchDyeFreeInfantGasHelper(text: string, tokens: string[]): string | null {
  if (!/function dyeFreeInfantGasRow/.test(text)) return null;
  const merged = appendLimitedStackHonestNote('', tokens);
  const esc = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const out = text.replace(
    /(function dyeFreeInfantGasRow\([\s\S]*?verdict:\s*)'caution',(\s*\n\s*retailers:)/,
    `$1'avoid',\n    honestNote: '${esc}',$2`,
  );
  return out === text ? null : out;
}

function noteConstName(block: string): string | null {
  const m = /note:\s*(\w+),/.exec(block);
  return m?.[1] ?? null;
}

function readNoteConstFromFile(text: string, constName: string): string | null {
  const constRe = new RegExp(`const ${constName} =\\s*\\n?\\s*'([\\s\\S]*?)';`);
  const cm = constRe.exec(text);
  return cm?.[1] ?? null;
}

function patchNoteConstInFile(text: string, constName: string, merged: string): string | null {
  const constRe = new RegExp(`(const ${constName} =\\s*\\n?\\s*)'([\\s\\S]*?)';`);
  if (!constRe.test(text)) return null;
  const esc = merged.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const out = text.replace(constRe, `$1'${esc}';`);
  return out === text ? null : out;
}

function diskHasStackNote(block: string, fileText?: string): boolean {
  const n = readNoteFromBlock(block);
  if (n && STACK_RE.test(n.inner)) return true;
  const cn = noteConstName(block);
  if (cn && fileText) {
    const inner = readNoteConstFromFile(fileText, cn);
    if (inner && STACK_RE.test(inner)) return true;
  }
  return STACK_RE.test(block);
}

type StackRow = { id: string; limitedStackTokens: string[] };

function main() {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'docs/t137u-results.json'), 'utf8'));
  const stackRows: StackRow[] = data.gradeChanges
    .filter((g: { cause: string }) => g.cause === 'limited_stack')
    .map((g: { id: string; limitedStackTokens?: string[] }) => ({
      id: g.id,
      limitedStackTokens: g.limitedStackTokens ?? [],
    }));

  const dir = join(process.cwd(), 'lib/rating-drafts');
  const files = readdirSync(dir).filter((f) => f.startsWith('batch') && f.endsWith('.ts'));

  let alreadyOk = 0;
  let fixed = 0;
  const patchFailed: string[] = [];
  const fileEdits = new Map<string, string>();
  let dyeFreePatched = false;

  for (const row of stackRows) {
    if (DYE_FREE_INFANT_GAS_IDS.has(row.id)) {
      const file = 'batch11-kids-digestive.ts';
      const text = fileEdits.get(file) ?? readFileSync(join(dir, file), 'utf8');
      if (diskHasStackNote(text) && /dyeFreeInfantGasRow[\s\S]*honestNote:[\s\S]*stacking rule \(t137u\)/.test(text)) {
        alreadyOk++;
        continue;
      }
      if (!FIX) {
        patchFailed.push(`${row.id} (dyeFreeInfantGasRow helper)`);
        continue;
      }
      const patched = patchDyeFreeInfantGasHelper(text, row.limitedStackTokens);
      if (!patched) {
        patchFailed.push(`${row.id} (dyeFreeInfantGasRow noop)`);
        continue;
      }
      fileEdits.set(file, patched);
      dyeFreePatched = true;
      fixed++;
      continue;
    }

    let foundFile: string | null = null;
    let blockInfo: { start: number; end: number; block: string } | null = null;
    for (const file of files) {
      const text = fileEdits.get(file) ?? readFileSync(join(dir, file), 'utf8');
      const blocks = extractAllBlocks(text, row.id);
      const picked = pickRowBlock(blocks);
      if (picked) {
        foundFile = file;
        blockInfo = picked;
        if (!fileEdits.has(file)) fileEdits.set(file, text);
        break;
      }
    }
    if (!foundFile || !blockInfo) {
      patchFailed.push(`${row.id} (block not found)`);
      continue;
    }
    const textForCheck = fileEdits.get(foundFile)!;
    if (diskHasStackNote(blockInfo.block, textForCheck)) {
      alreadyOk++;
      continue;
    }
    if (!FIX) {
      patchFailed.push(`${row.id} (needs note)`);
      continue;
    }
    let text = fileEdits.get(foundFile)!;
    const existing = readNoteFromBlock(blockInfo.block);
    const constName = noteConstName(blockInfo.block);
    const baseNote =
      existing?.inner ??
      (constName ? readNoteConstFromFile(text, constName) ?? undefined : undefined);
    let merged = appendLimitedStackHonestNote(baseNote, row.limitedStackTokens);
    let newText = text;
    if (!existing && constName) {
      const patchedConst = patchNoteConstInFile(text, constName, merged);
      if (patchedConst) newText = patchedConst;
    }
    let newBlock = patchBlockNote(blockInfo.block, merged);
    if (newBlock === blockInfo.block && /expand\s*\(\{/.test(blockInfo.block)) {
      newBlock = blockInfo.block.replace(
        /(\n\s+note:\s*[^\n]+\n)/,
        `$1    verdict: 'avoid',\n`,
      );
    }
    if (newBlock !== blockInfo.block) {
      newText = newText.slice(0, blockInfo.start) + newBlock + newText.slice(blockInfo.end);
    }
    if (newText === text) {
      patchFailed.push(`${row.id} (patch noop)`);
      continue;
    }
    fileEdits.set(foundFile, newText);
    fixed++;
  }

  if (FIX) {
    for (const [file, content] of fileEdits) {
      writeFileSync(join(dir, file), content);
    }
  }

  const needsFix = patchFailed.filter((p) => p.includes('needs note') || p.includes('helper')).length;
  console.log(
    JSON.stringify(
      {
        stackRows: stackRows.length,
        alreadyHadNote: alreadyOk,
        needsFix: FIX ? 0 : needsFix,
        fixed,
        dyeFreeHelperPatched: dyeFreePatched,
        patchFailed,
        filesEdited: FIX ? [...fileEdits.keys()].length : 0,
      },
      null,
      2,
    ),
  );
}

main();
