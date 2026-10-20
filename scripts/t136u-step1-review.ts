/**
 * t136u Step 1 — read-only review of 769 verdict-only excluded grade deltas.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import type { RatingRecord } from '../lib/ratingRecord';
import { allPreviewCatalogRecords } from '../lib/scan-preview/previewCatalog';
import {
  recomputeFounderRescanRecord,
  verdictFromFlagsStrict,
} from '../lib/scan-preview/founderRescan';
import { ingredientDeltas } from '../lib/scan-preview/t135uValidate';

type Classification = 'REAL' | 'SCRIPT_ERROR';

type RowReview = {
  id: string;
  productName: string;
  fileVerdict: string;
  strictVerdict: string;
  overlayVerdict: string;
  classification: Classification;
  cause: string;
  drivingToken: string;
  flagSummary: string;
};

function flagSummary(record: RatingRecord): string {
  const highs = record.inactiveIngredients.filter((i) => i.riskLevel === 'high').map((i) => i.name);
  const mods = record.inactiveIngredients.filter((i) => i.riskLevel === 'moderate').map((i) => i.name);
  const lims = record.inactiveIngredients.filter((i) => i.riskLevel === 'limited').map((i) => i.name);
  const parts: string[] = [];
  if (highs.length) parts.push(`high:${highs.length}`);
  if (mods.length) parts.push(`mod:${mods.length}`);
  if (lims.length) parts.push(`lim:${lims.length}`);
  return parts.join(' ') || 'cleared-only';
}

function classifyVerdictOnly(
  record: RatingRecord,
  strictVerdict: RatingRecord['verdict'],
  overlayVerdict: RatingRecord['verdict'],
): { classification: Classification; cause: string; drivingToken: string } {
  const fileVerdict = record.verdict;
  const levels = record.inactiveIngredients.map((i) => i.riskLevel);
  const hasHigh = levels.includes('high');
  const hasMod = levels.includes('moderate');
  const hasLim = levels.includes('limited');
  const limCount = record.inactiveIngredients.filter((i) => i.riskLevel === 'limited').length;
  const cap = record.activeSafetyFlag?.cappedAt;

  const driver =
    record.inactiveIngredients.find((i) => i.riskLevel === 'high')?.name
    ?? record.inactiveIngredients.find((i) => i.riskLevel === 'moderate')?.name
    ?? record.inactiveIngredients.find((i) => i.riskLevel === 'limited')?.name
    ?? 'verdictFromFlags';

  if (overlayVerdict !== strictVerdict) {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 'overlay_vs_strict_verdict_mismatch',
      drivingToken: driver,
    };
  }

  if (fileVerdict === strictVerdict) {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 't135u_false_positive_no_file_delta',
      drivingToken: 'none',
    };
  }

  // Founder / active-safety cap intentionally above strict rollup
  if (cap === 'avoid' && fileVerdict === 'avoid' && strictVerdict !== 'avoid') {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 'keep_file_avoid_active_safety_cap',
      drivingToken: record.activeSafetyFlag?.cappedAt ?? 'activeSafetyFlag.cappedAt=avoid',
    };
  }
  if (cap === 'caution' && fileVerdict === 'caution' && strictVerdict === 'clean') {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 'keep_file_caution_active_safety_cap',
      drivingToken: 'activeSafetyFlag.cappedAt=caution',
    };
  }

  // Held rows (founder order) — do not auto-flip from strict rollup alone
  if (record.id === 'genexa-acetaminophen-es' && fileVerdict === 'caution' && strictVerdict === 'clean') {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 'founder_held_genexa_maltodextrin_caution',
      drivingToken: 'maltodextrin',
    };
  }

  // METHODOLOGY §5 (Sept 14, 2026): Avoid requires High; limited-only → Caution
  if (fileVerdict === 'avoid' && !hasHigh && (hasMod || hasLim)) {
    return {
      classification: 'REAL',
      cause: 'methodology_harm_first_avoid_needs_high',
      drivingToken: limCount >= 3 ? `${limCount}× limited (no High)` : driver,
    };
  }
  if (fileVerdict === 'avoid' && !hasHigh && !hasMod && !hasLim) {
    return {
      classification: 'SCRIPT_ERROR',
      cause: 'file_avoid_without_flagged_driver_on_disk',
      drivingToken: 'none',
    };
  }
  if (hasHigh && strictVerdict === 'avoid' && fileVerdict !== 'avoid') {
    return {
      classification: 'REAL',
      cause: 'methodology_high_tier_avoid',
      drivingToken: driver,
    };
  }
  if ((hasMod || hasLim) && strictVerdict === 'caution' && fileVerdict === 'avoid') {
    return {
      classification: 'REAL',
      cause: 'methodology_moderate_limited_caution',
      drivingToken: driver,
    };
  }
  if (strictVerdict === 'clean' && fileVerdict !== 'clean' && !hasHigh && !hasMod && !hasLim) {
    return {
      classification: 'REAL',
      cause: 'methodology_cleared_only_clean',
      drivingToken: driver,
    };
  }

  return {
    classification: 'SCRIPT_ERROR',
    cause: 'unclassified_verdict_delta',
    drivingToken: driver,
  };
}

const catalog = allPreviewCatalogRecords();
const reviews: RowReview[] = [];

for (const record of catalog) {
  const after = recomputeFounderRescanRecord(record);
  const deltas = ingredientDeltas(record, after);
  const verdictChanged = record.verdict !== after.verdict;
  if (!verdictChanged) continue;
  if (deltas.length > 0) continue;

  const strictVerdict = verdictFromFlagsStrict(record);
  const { classification, cause, drivingToken } = classifyVerdictOnly(
    record,
    strictVerdict,
    after.verdict,
  );

  reviews.push({
    id: record.id,
    productName: record.productName,
    fileVerdict: record.verdict,
    strictVerdict,
    overlayVerdict: after.verdict,
    classification,
    cause,
    drivingToken,
    flagSummary: flagSummary(record),
  });
}

const real = reviews.filter((r) => r.classification === 'REAL');
const scriptErr = reviews.filter((r) => r.classification === 'SCRIPT_ERROR');

const byCause = new Map<string, number>();
const byToken = new Map<string, number>();
for (const r of reviews) {
  byCause.set(r.cause, (byCause.get(r.cause) ?? 0) + 1);
  byToken.set(r.drivingToken, (byToken.get(r.drivingToken) ?? 0) + 1);
}

const out = {
  generatedAt: new Date().toISOString(),
  totalReviewed: reviews.length,
  realCount: real.length,
  scriptErrorCount: scriptErr.length,
  byCause: Object.fromEntries([...byCause.entries()].sort((a, b) => b[1] - a[1])),
  byDrivingToken: Object.fromEntries([...byToken.entries()].sort((a, b) => b[1] - a[1])),
  realRows: real.map((r) => ({
    id: r.id,
    productName: r.productName,
    oldGrade: r.fileVerdict,
    newGrade: r.strictVerdict,
    token: r.drivingToken,
    cause: r.cause,
  })),
  scriptErrorRows: scriptErr.map((r) => ({
    id: r.id,
    productName: r.productName,
    fileVerdict: r.fileVerdict,
    strictVerdict: r.strictVerdict,
    cause: r.cause,
    token: r.drivingToken,
  })),
  allIds: {
    real: real.map((r) => r.id),
    scriptError: scriptErr.map((r) => r.id),
  },
};

mkdirSync(join(process.cwd(), 'docs'), { recursive: true });
writeFileSync(join(process.cwd(), 'docs/t136u-769-review.json'), JSON.stringify(out, null, 2));

let md = `# t136u Step 1 — 769 verdict-only excluded grade review\n\n`;
md += `Generated: ${out.generatedAt}\n\n`;
md += `## Counts\n\n| Classification | Count |\n|---|---:|\n`;
md += `| **REAL** (live locks + strict rollup support file grade change) | ${real.length} |\n`;
md += `| **SCRIPT ERROR** (legacy Avoid, rollup artifact, no lock-backed delta) | ${scriptErr.length} |\n`;
md += `| **Total reviewed** | ${reviews.length} |\n\n`;
md += `## By cause\n\n`;
for (const [k, v] of [...byCause.entries()].sort((a, b) => b[1] - a[1])) {
  md += `- **${k}**: ${v}\n`;
}
md += `\n## By driving token (top 25)\n\n`;
for (const [k, v] of [...byToken.entries()].sort((a, b) => b[1] - a[1]).slice(0, 25)) {
  md += `- ${k}: ${v}\n`;
}
md += `\n## REAL rows (id, name, old → new, token)\n\n`;
md += `| id | product | old | new | token |\n|---|---|---|---|---|\n`;
for (const r of real) {
  md += `| \`${r.id}\` | ${r.productName.replace(/\|/g, '/')} | ${r.fileVerdict} | ${r.strictVerdict} | ${r.drivingToken} |\n`;
}
md += `\n## SCRIPT ERROR — full id list by cause\n\n`;
const byCauseIds = new Map<string, string[]>();
for (const r of scriptErr) {
  if (!byCauseIds.has(r.cause)) byCauseIds.set(r.cause, []);
  byCauseIds.get(r.cause)!.push(r.id);
}
for (const [cause, ids] of [...byCauseIds.entries()].sort((a, b) => b[1].length - a[1].length)) {
  md += `\n### ${cause} (${ids.length})\n\n`;
  md += ids.map((id) => `\`${id}\``).join(', ') + '\n';
}

writeFileSync(join(process.cwd(), 'docs/t136u-769-review.md'), md);
console.log(JSON.stringify({ total: reviews.length, real: real.length, scriptErr: scriptErr.length }, null, 2));
