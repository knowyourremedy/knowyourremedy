import { readFileSync, writeFileSync } from 'fs';

const raw = JSON.parse(readFileSync('/workspace/docs/tmp-or-report/t81u-candidates-raw.json', 'utf8'));

const AISLE_ORDER = `From PROJECT_NOTES night photo aisle order (lines 541–548):
1 Pain & Fever → 2 Cold & Flu → 3 Allergies → 4 Sleep → 5 Immune Support → 6 First Aid → 7 Vitamins → 8 Prenatal → 9 Digestive`;

const METH_QUOTE =
  'Token check uses exact Methodology §5 table rows only (PROJECT_NOTES hunt order + METH §5). Actives on Supplement Facts are ungraded per batch187–189 founder rule; row verdict from Other Ingredients only.';

function fmtActives(c) {
  if (c.actives?.length) return c.actives.map((a) => `${a.name}: ${a.amount}`).join('; ');
  return c.activesNote || '— (not extracted at step 2)';
}

function fmtTokens(c) {
  const locked = (c.tokens?.locked || []).map((t) => `LOCKED — ${t.token} → ${t.lock}`);
  const ungraded = (c.tokens?.ungraded || []).map((t) => `UNGRADED — ${t}`);
  return [...locked, ...ungraded].join('\n  - ') || '—';
}

function candidateBlock(c, idx) {
  return `#### ${idx}. ${c.productName}

| Field | Value |
| --- | --- |
| Brand | ${c.brand} |
| Count | ${c.count ?? '—'} |
| Brand URL | ${c.brandUrl} |
| DailyMed setid | ${c.dailymedSetid ?? 'none (0 drug SPLs for supplement brands at step 1)'} |
| Search tab | ${c.searchTab} |
| Panel | **${c.panel?.status}** — ${c.panel?.reason} |
| Call | **${c.call}**${c.dupMainId ? ` (MAIN \`${c.dupMainId}\`)` : ''} |

**Actives (ungraded):** ${fmtActives(c)}

**Other Ingredients (verbatim):** ${c.otherIngredients || '—'}

**UPC:** ${c.upc ? `${c.upc} — ${c.upcSource}` : '—'}

**Token check:**
  - ${fmtTokens(c)}
`;
}

function groupByUrl(flat) {
  const m = new Map();
  for (const c of flat) {
    const k = `${c.brand}::${c.brandUrl}`;
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(c);
  }
  return m;
}

let md = `# t81u — US supplement brand candidates (ladder steps 1–2)

**Branch:** \`cursor/t81u-candidates-04e1\`  
**Generated:** ${raw.meta.generated}  
**Mode:** READ ONLY enumeration — no catalog rows written.

## Methodology

- **Ladder steps:** (1) DailyMed / official drug label when NDC exists; (2) official brand site — every count tab and accordion. Retailer PDPs are **not** opened in this pass (pending stores).
- **DailyMed:** ${raw.meta.dailymedNote}
- **Excluded MAIN rows (any matching count → \`DUP\`, not re-listed as write candidates):** \`schiff-b189-neuriva-original-30\`, \`move-free-b188-advanced-80\`, \`move-free-b189-advanced-msm-120\`, \`caltrate-b187-600-d3-60\`, \`caltrate-b187-600-d3-200\`, \`caltrate-b188-600-d3-120\`, \`slowfe-b187-iron-60\`, \`rainbow-b187-womens-one-30\`, \`rainbow-b187-womens-one-150\`, \`rainbow-b188-womens-one-60\`.
- **Search tabs:** ${AISLE_ORDER}
- **Tokens:** ${METH_QUOTE}
- **Calls:** \`WRITE-READY (pending stores)\` = panel + tokens OK at steps 1–2 but sale/UPC ladder not run; \`HOLD-PANEL\` / \`HOLD-TOKEN\` / \`NO TAB\` / \`DUP\` as labeled.

## Summary counts (non-DUP candidates)

| Brand | Distinct count-variant candidates |
| --- | ---: |
${Object.entries(raw.summary)
  .map(([b, n]) => `| ${b} | ${n} |`)
  .join('\n')}
| **Total non-DUP** | **${raw.flat.filter((c) => c.call !== 'DUP').length}** |

`;

const brandOrder = ['Schiff', 'Move Free', 'Osteo Bi-Flex', 'Caltrate', 'Citracal', 'Slow Fe', 'Rainbow Light'];

for (const brand of brandOrder) {
  const flat = raw.flat.filter((c) => c.brand === brand || (brand === 'Schiff' && c.brand === 'Schiff'));
  const nonDup = flat.filter((c) => c.call !== 'DUP');
  const dup = flat.filter((c) => c.call === 'DUP');
  md += `\n---\n\n## ${brand}\n\n`;
  md += `**Candidates enumerated:** ${flat.length} (${nonDup.length} non-DUP, ${dup.length} DUP vs MAIN).\n\n`;
  if (brand === 'Schiff') {
    md += `Scope: schiffvitamins.com collections excluding Move Free / Osteo Bi-Flex product URLs. Gatsby \`page-data.json\` parsed for \`netContentStatement\` count variants.\n\n`;
  }
  if (brand === 'Move Free') {
    md += `Scope: movefree.com + Schiff Move Free section. movefree.com \`page-data.json\` often unavailable; many PDPs are image-only at step 2.\n\n`;
  }
  if (brand === 'Citracal') {
    md += `Scope: citracal.com blocked (403/maintenance). Counts from [DSLD brand-products Citracal](https://dsld.od.nih.gov/brand-products/Citracal) (On Market rows).\n\n`;
  }
  if (brand === 'Slow Fe') {
    md += `Scope: **30-count only** per task. slowfe.com 404 in VM; panel from DSLD label family (see batch187 60ct citation).\n\n`;
  }
  if (brand === 'Rainbow Light') {
    md += `Scope: [products.json](https://www.rainbowlight.com/products.json?limit=250) (89 products). PDP supplement-facts images linked; typed OI when present in HTML.\n\n`;
  }

  const grouped = groupByUrl(nonDup);
  let idx = 1;
  for (const [key, group] of grouped) {
    if (group.length === 1) {
      md += candidateBlock(group[0], idx++);
      continue;
    }
    md += `#### ${idx}. ${group[0].productName.replace(/\s*\(\d+.*\)$/, '')} — ${group.length} count variants\n\n`;
    md += `**Brand URL:** ${group[0].brandUrl}\n\n`;
    for (const c of group) {
      md += `- **${c.count ?? '?'} ct** — Panel ${c.panel?.status}; call \`${c.call}\`; OI: ${c.otherIngredients ? c.otherIngredients.slice(0, 120) + (c.otherIngredients.length > 120 ? '…' : '') : '—'}\n`;
    }
    md += '\n';
    idx++;
  }

  if (dup.length) {
    md += `### DUP (excluded MAIN)\n\n`;
    for (const c of dup) {
      md += `- ${c.productName} → \`${c.dupMainId}\`\n`;
    }
  }
}

// UNGRADED packet
const ungradedMap = new Map();
for (const c of raw.flat) {
  for (const t of c.tokens?.ungraded || []) {
    const k = t.toLowerCase();
    if (!ungradedMap.has(k)) ungradedMap.set(k, new Set());
    ungradedMap.get(k).add(`${c.brand}: ${c.productName}`);
  }
}

md += `\n---\n\n## UNGRADED token packet (aggregate)\n\n`;
md += `Tokens appearing on at least one candidate without an exact §5 lock match in automated pass. Founder 7-step before write.\n\n`;
const sorted = [...ungradedMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
for (const [tok, products] of sorted) {
  md += `- **${tok}** — ${products.size} candidate(s) (e.g. ${[...products].slice(0, 2).join('; ')})\n`;
}

md += `\n---\n\n## Compact candidate table (non-DUP)\n\n`;
md += `| Brand | Product | Count | Panel | Tab | Call |\n| --- | --- | ---: | --- | --- | --- |\n`;
for (const c of raw.flat.filter((x) => x.call !== 'DUP')) {
  const name = c.productName.replace(/\|/g, '/').slice(0, 70);
  md += `| ${c.brand} | ${name} | ${c.count ?? ''} | ${c.panel?.status} | ${c.searchTab} | ${c.call} |\n`;
}

writeFileSync('/workspace/docs/tmp-or-report/t81u-candidates.md', md);
console.log('Wrote', '/workspace/docs/tmp-or-report/t81u-candidates.md', 'lines', md.split('\n').length);
