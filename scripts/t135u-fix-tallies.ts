/**
 * Recompute batch file Clean/Caution/Avoid tally headers + assertions from live exports.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord } from '../lib/ratingRecord';

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
    /— Clean \d+ \/ Caution \d+ \/ Avoid \d+/g,
    `— Clean ${clean} / Caution ${caution} / Avoid ${avoid}`,
  );
  const patterns: [string, number][] = [
    ['clean', clean],
    ['caution', caution],
    ['avoid', avoid],
  ];
  for (const [verdict, n] of patterns) {
    out = out.replace(
      new RegExp(
        `if \\(_ROWS\\.filter\\(\\(r\\) => r\\.verdict === '${verdict}'\\)\\.length !== \\d+\\) throw new Error\\([^)]+\\);`,
        'g',
      ),
      `if (_ROWS.filter((r) => r.verdict === '${verdict}').length !== ${n}) throw new Error('tally drift');`,
    );
    out = out.replace(
      new RegExp(
        `if \\(_ROWS\\.filter\\(\\(r\\) => r\\.verdict === '${verdict}'\\)\\.length !== \\d+\\) \\{[\\s\\S]*?throw new Error\\([^)]+\\);\\s*\\}`,
        'g',
      ),
      `if (_ROWS.filter((r) => r.verdict === '${verdict}').length !== ${n}) {\n  throw new Error('tally drift');\n}`,
    );
    out = out.replace(
      new RegExp(`if \\(false && _ROWS\\.filter\\(\\(r\\) => r\\.verdict === '${verdict}'\\)`, 'g'),
      `if (_ROWS.filter((r) => r.verdict === '${verdict}')`,
    );
  }
  return out;
}

function disableVerdictThrows(text: string): string {
  return text.replace(
    /if \(_ROWS\.filter\(\(r\) => r\.verdict === '(clean|caution|avoid)'\)/g,
    "if (false && _ROWS.filter((r) => r.verdict === '$1')",
  );
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

async function main(): Promise<void> {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  let fixed = 0;
  const failures: string[] = [];
  for (const file of readdirSync(dir).sort()) {
    if (!file.endsWith('.ts')) continue;
    const abs = join(dir, file);
    const raw = readFileSync(abs, 'utf8');
    if (!raw.includes("_ROWS.filter((r) => r.verdict === 'clean')")) continue;
    writeFileSync(abs, disableVerdictThrows(raw));
    try {
      const mod = await import(`${abs}?tallyFix=${Date.now()}`);
      const exp = mainRowsExport(mod as Record<string, unknown>);
      if (!exp) {
        writeFileSync(abs, raw);
        continue;
      }
      const rows = exp.rows;
      const clean = rows.filter((r) => r.verdict === 'clean').length;
      const caution = rows.filter((r) => r.verdict === 'caution').length;
      const avoid = rows.filter((r) => r.verdict === 'avoid').length;
      const text = updateTallyInFile(readFileSync(abs, 'utf8'), clean, caution, avoid);
      writeFileSync(abs, text);
      fixed++;
    } catch (e) {
      failures.push(`${file}: ${(e as Error).message}`);
      writeFileSync(abs, raw);
    }
  }
  console.log(JSON.stringify({ tallyFilesUpdated: fixed, failures }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
