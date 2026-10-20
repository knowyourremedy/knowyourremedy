import { readdirSync } from 'node:fs';
import { join } from 'node:path';

async function main() {
  const dir = join(process.cwd(), 'lib/rating-drafts');
  const fails: string[] = [];
  for (const file of readdirSync(dir).filter((f) => f.startsWith('batch') && f.endsWith('.ts')).sort()) {
    try {
      await import(join(process.cwd(), 'lib/rating-drafts', file) + `?smoke=${Date.now()}`);
    } catch (e) {
      fails.push(`${file}: ${(e as Error).message.split('\n')[0]}`);
    }
  }
  try {
    await import('../lib/scan-preview/previewCatalog');
    console.log(JSON.stringify({ batchFails: fails, previewCatalog: 'ok' }, null, 2));
  } catch (e) {
    fails.push(`previewCatalog: ${(e as Error).message.split('\n')[0]}`);
    console.log(JSON.stringify({ batchFails: fails }, null, 2));
    process.exit(1);
  }
}
main();
