/**
 * Refresh t137u stack honest-notes after t141u token list changes.
 * npx tsx scripts/t141u-stack-note-fix.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import { recomputeFounderRescanRecord } from '../lib/scan-preview/founderRescan';
import { computeVerdictFromInactiveIngredients, replaceLimitedStackHonestNote } from '../lib/scan-preview/verdictFromFlags';
import { findFileForId } from './t138u-audit-patch-helpers';
import type { RatingRecord } from '../lib/ratingRecord';

function isSpringValleyId(id: string): boolean {
  return id.startsWith('springvalley-');
}

function rowNote(record: RatingRecord): string {
  const r = record as RatingRecord & { note?: string };
  return record.honestNote ?? r.note ?? '';
}

function stackNoteOk(record: RatingRecord, tokens: string[]): boolean {
  const note = rowNote(record);
  const expected = `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
  return note.includes(expected);
}

const STACK_LINE_RE =
  /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):[^.]+\./;

function patchHonestNoteNearId(text: string, id: string, tokens: string[]): string | null {
  const anchors = [`id: '${id}'`, `id: "${id}"`];
  if (id === 'naturewise-b85-vegan-b-complex') {
    anchors.push('id: BCOMPLEX');
  }
  let idIdx = -1;
  for (const anchor of anchors) {
    idIdx = text.indexOf(anchor);
    if (idIdx >= 0) break;
  }
  if (idIdx < 0) return null;
  const windowEnd = Math.min(text.length, idIdx + 16000);
  const slice = text.slice(idIdx, windowEnd);
  const newLine = `Avoid: three or more Limited tokens triggered the stacking rule (t137u): ${tokens.join(', ')}.`;
  const stackM = STACK_LINE_RE.exec(slice);
  if (stackM && stackM.index !== undefined) {
    if (stackM[0] === newLine) return null;
    const absStart = idIdx + stackM.index;
    return text.slice(0, absStart) + newLine + text.slice(absStart + stackM[0].length);
  }
  const noteM =
    /honestNote:\s*'((?:[^'\\]|\\.)*)'/.exec(slice)
    ?? /note:\s*"((?:[^"\\]|\\.)*)"/.exec(slice)
    ?? /note:\s*'((?:[^'\\]|\\.)*)'/.exec(slice);
  if (!noteM || noteM.index === undefined) return null;
  const oldInner = noteM[1];
  const newInner = replaceLimitedStackHonestNote(oldInner, tokens);
  if (newInner === oldInner) return null;
  const field = noteM[0].startsWith('note:') ? 'note' : 'honestNote';
  const quote = noteM[0].includes('"') ? '"' : "'";
  const esc = newInner.replace(/\\/g, '\\\\').replace(new RegExp(quote, 'g'), `\\${quote}`);
  const oldFull = noteM[0];
  const newFull = `${field}: ${quote}${esc}${quote}`;
  const absStart = idIdx + noteM.index;
  return text.slice(0, absStart) + newFull + text.slice(absStart + oldFull.length);
}

function main() {
  const byFile = new Map<string, { id: string; tokens: string[] }[]>();

  for (const before of allPreviewCatalogRecords()) {
    if (isSpringValleyId(before.id)) continue;
    const after = recomputeFounderRescanRecord(before);
    const rollup = computeVerdictFromInactiveIngredients(
      after.inactiveIngredients,
      after.activeSafetyFlag,
    );
    if (rollup.cause !== 'limited_stack' || after.verdict !== 'avoid' || before.verdict !== 'avoid') {
      continue;
    }
    const tokens = rollup.limitedStackTokens ?? [];
    if (tokens.length < 3) continue;
    if (stackNoteOk(before, tokens)) continue;
    const path = findFileForId(before.id);
    if (!path) continue;
    if (!byFile.has(path)) byFile.set(path, []);
    byFile.get(path)!.push({ id: before.id, tokens });
  }

  let fixed = 0;
  for (const [path, items] of byFile) {
    let text = readFileSync(path, 'utf8');
    for (const { id, tokens } of items) {
      const next = patchHonestNoteNearId(text, id, tokens);
      if (next) {
        text = next;
        fixed++;
      }
    }
    writeFileSync(path, text);
  }

  console.log(JSON.stringify({ stackNotesFixed: fixed, files: byFile.size }, null, 2));
}

main();
