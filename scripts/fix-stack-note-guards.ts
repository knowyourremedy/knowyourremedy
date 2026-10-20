import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const STACK_ALLOW =
  'row.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \\(t137u\\):/.test(row.honestNote)';
const STACK_ALLOW_RECORD =
  'record.honestNote && !/Avoid: three or more Limited tokens triggered the stacking rule \\(t137u\\):/.test(record.honestNote)';

const dir = join(process.cwd(), 'lib/rating-drafts');
let n = 0;
for (const file of readdirSync(dir)) {
  if (!file.endsWith('.ts')) continue;
  const path = join(dir, file);
  let text = readFileSync(path, 'utf8');
  const orig = text;
  text = text.replace(/if \(row\.honestNote\) throw/g, `if (${STACK_ALLOW}) throw`);
  text = text.replace(/if \(record\.honestNote\) throw/g, `if (${STACK_ALLOW_RECORD}) throw`);
  if (text !== orig) {
    writeFileSync(path, text);
    n++;
  }
}
console.log({ filesUpdated: n });
