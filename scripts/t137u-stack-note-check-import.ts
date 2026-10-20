import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const STACK_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

async function main() {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'docs/t137u-results.json'), 'utf8'));
  const stack = data.gradeChanges.filter((g: { cause: string }) => g.cause === 'limited_stack');
  const dir = join(process.cwd(), 'lib/rating-drafts');
  const files = readdirSync(dir).filter((f) => f.startsWith('batch') && f.endsWith('.ts'));
  const map = new Map<string, { honestNote?: string; verdict?: string; file: string }>();
  for (const f of files) {
    try {
      const mod = await import(join(process.cwd(), 'lib/rating-drafts', f) + `?audit=${Date.now()}`);
      for (const v of Object.values(mod)) {
        if (!Array.isArray(v)) continue;
        for (const r of v) {
          if (r && typeof r === 'object' && 'id' in r && typeof (r as { id: string }).id === 'string') {
            const rec = r as { id: string; honestNote?: string; verdict?: string };
            map.set(rec.id, { honestNote: rec.honestNote, verdict: rec.verdict, file: f });
          }
        }
      }
    } catch {
      /* skip */
    }
  }
  const missing: { id: string; file?: string; verdict?: string }[] = [];
  for (const g of stack) {
    const r = map.get(g.id);
    const note = r?.honestNote ?? '';
    if (!STACK_RE.test(note)) missing.push({ id: g.id, file: r?.file, verdict: r?.verdict });
  }
  const byFile: Record<string, number> = {};
  for (const m of missing) {
    const f = m.file ?? 'unknown';
    byFile[f] = (byFile[f] ?? 0) + 1;
  }
  console.log(JSON.stringify({ missing: missing.length, byFile, ids: missing.map((m) => m.id) }, null, 2));
}

main();
