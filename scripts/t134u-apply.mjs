import { readFileSync, writeFileSync } from 'node:fs';

const IDS = [
  'now-odorless-garlic-250',
  'now-nadh-10-mg-60',
  'now-odorless-garlic-concentrated-extract-100',
  'now-glucofit-60',
  'now-zinc-glycinate-120',
  'now-prostate-support-180',
  'now-e-400-d-alpha-with-mixed-tocopherols-100',
  'now-prostate-support-90',
  'now-pantethine-60',
  'now-coq10-with-selenium-vitamin-e-100',
  'now-pantethine-60-733739004895',
  'now-saw-palmetto-extract-90',
  'now-sports-men-s-active-sports-multi-180',
  'now-coq10-with-omega-3-fish-oil-120',
  'now-sports-men-s-active-sports-multi-90',
  'now-coq10-with-selenium-vitamin-e-50-softgel',
  'now-red-omega-fish-oil-with-red-yeast-rice-and-coq10-180',
  'now-coq10-fish-oil-60',
  'now-red-omega-fish-oil-with-red-yeast-rice-and-coq10-90',
  'now-adam-superior-men-s-multi-180-softgels',
  'now-adam-superior-men-s-multi-90-softgels',
];

const FILE_BY_ID = {
  'now-odorless-garlic-250': 'lib/rating-drafts/batch71-kyr6-amazon-3p-now.ts',
  'now-nadh-10-mg-60': 'lib/rating-drafts/batch71-kyr6-amazon-3p-now.ts',
  'now-odorless-garlic-concentrated-extract-100': 'lib/rating-drafts/batch71-kyr6-amazon-3p-now.ts',
  'now-glucofit-60': 'lib/rating-drafts/batch71-kyr6-amazon-3p-now.ts',
  'now-adam-superior-men-s-multi-180-softgels': 'lib/rating-drafts/batch73-kyr6-now-exact-s5-backfill.ts',
  'now-adam-superior-men-s-multi-90-softgels': 'lib/rating-drafts/batch73-kyr6-now-exact-s5-backfill.ts',
};

const DEFAULT_FILE = 'lib/rating-drafts/batch72-kyr6-now-refuse-backfill.ts';

const BEES_SPLIT_DQ =
  '["Beeswax", "cleared", "beeswax"], ["Carnauba wax", "cleared", "carnaubaT133u"]';
const BEES_SPLIT_SQ =
  "['Beeswax', 'cleared', 'beeswax'], ['Carnauba wax', 'cleared', 'carnaubaT133u']";
const OLD_BEES_DQ = '["Beeswax / carnauba wax", "cleared", "gelatin"]';
const OLD_BEES_SQ = "['Beeswax / carnauba wax', 'cleared', 'gelatin']";

const CLEAN_NOTE =
  'FOUNDER-LOCK DRAFT: Clean. Pinned Other Ingredients are Cleared-class only (HPMC / gelatin / glycerin / water / stearate / named oil fill / fiber as present). Carnauba wax tab carries founder lock t133u Cleared (§4 prior-lock re-eval). Named oil as softgel fill is not the gummy seed-oil High rule.';

const METH_PATCH = `  beeswax: 'Methodology §5 Cleared (beeswax — softgel shell wax)',
  carnaubaT133u:
    'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).',
`;

function patchBlock(block) {
  let b = block;
  if (b.includes(OLD_BEES_DQ)) b = b.replace(OLD_BEES_DQ, BEES_SPLIT_DQ);
  else if (b.includes(OLD_BEES_SQ)) b = b.replace(OLD_BEES_SQ, BEES_SPLIT_SQ);
  else throw new Error('no beeswax combo in block');
  b = b.replace(/verdict: "caution"/, 'verdict: "clean"');
  b = b.replace(/verdict: 'caution'/, "verdict: 'clean'");
  b = b.replace(
    /note: "FOUNDER-LOCK DRAFT: Caution\.[^"]*"/,
    `note: "${CLEAN_NOTE}"`,
  );
  b = b.replace(
    /note: 'FOUNDER-LOCK DRAFT: Caution\.[^']*'/,
    `note: '${CLEAN_NOTE}'`,
  );
  return b;
}

function extractBlock(text, id) {
  const patterns = [
    new RegExp(`\\n  \\{\\n    id: "${id}"`),
    new RegExp(`\\n  \\{\\n    id: '${id}'`),
  ];
  let start = -1;
  for (const p of patterns) {
    const m = p.exec(text);
    if (m) {
      start = m.index + 1;
      break;
    }
  }
  if (start === -1) throw new Error(`block not found for ${id}`);
  const rest = text.slice(start + 1);
  const next = rest.search(/\n  \},\n  \{/);
  const end = next === -1 ? text.length : start + 1 + next + 5;
  return { start, end, block: text.slice(start, end) };
}

const files = new Map();
for (const id of IDS) {
  const file = FILE_BY_ID[id] ?? DEFAULT_FILE;
  if (!files.has(file)) files.set(file, readFileSync(file, 'utf8'));
}

for (const id of IDS) {
  const file = FILE_BY_ID[id] ?? DEFAULT_FILE;
  let text = files.get(file);
  if (!text.includes('carnaubaT133u')) {
    text = text.replace(
      /  gelatin: 'Methodology §5 Cleared \(gelatin \/ beeswax \/ carnauba \/ purified water\)',\n/,
      `  gelatin: 'Methodology §5 Cleared (gelatin / beeswax / carnauba / purified water)',\n${METH_PATCH}`,
    );
  }
  const { start, end, block } = extractBlock(text, id);
  const nextBlock = patchBlock(block);
  text = text.slice(0, start) + nextBlock + text.slice(end);
  files.set(file, text);
}

for (const [file, text] of files) {
  writeFileSync(file, text);
  console.log('Wrote', file);
}
