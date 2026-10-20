/**
 * Verify all 336 t137u stack-Avoid rows have stacking honest-note line on disk (imported records).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const STACK_RE = /Avoid: three or more Limited tokens triggered the stacking rule \(t137u\):/;

async function main() {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'docs/t137u-results.json'), 'utf8'));
  const stackIds = data.gradeChanges
    .filter((g: { cause: string }) => g.cause === 'limited_stack')
    .map((g: { id: string }) => g.id);
  const dir = join(process.cwd(), 'lib/rating-drafts');
  const files = readdirSync(dir).filter((f) => f.startsWith('batch') && f.endsWith('.ts'));
  const map = new Map<string, { honestNote?: string; file: string }>();
  for (const f of files) {
    try {
      const mod = await import(join(process.cwd(), 'lib/rating-drafts', f) + `?v=${Date.now()}`);
      for (const v of Object.values(mod)) {
        if (!Array.isArray(v)) continue;
        for (const r of v) {
          if (
            r &&
            typeof r === 'object' &&
            'id' in r &&
            'verdict' in r &&
            typeof (r as { id: string }).id === 'string'
          ) {
            const rec = r as { id: string; honestNote?: string; note?: string };
            const note = rec.honestNote ?? rec.note;
            map.set(rec.id, { honestNote: note, file: f });
          }
        }
      }
    } catch (e) {
      console.error('import fail', f, (e as Error).message.split('\n')[0]);
    }
  }
  const missing: string[] = [];
  for (const id of stackIds) {
    const r = map.get(id);
    if (!r || !STACK_RE.test(r.honestNote ?? '')) missing.push(id);
  }
  console.log(JSON.stringify({ stackRows: stackIds.length, ok: stackIds.length - missing.length, missing }, null, 2));
  process.exit(missing.length ? 1 : 0);
}

main();
