import type { RiskLevel } from '../lib/ratingRecord';
import { BATCH71_KYR6_AMAZON_3P_NOW } from '../lib/rating-drafts/batch71-kyr6-amazon-3p-now';
import { BATCH72_KYR6_NOW_REFUSE_BACKFILL } from '../lib/rating-drafts/batch72-kyr6-now-refuse-backfill';
import { BATCH73_KYR6_NOW_EXACT_S5_BACKFILL } from '../lib/rating-drafts/batch73-kyr6-now-exact-s5-backfill';

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

function verdictFromFlags(levels: RiskLevel[]): 'clean' | 'caution' | 'avoid' {
  if (levels.includes('high')) return 'avoid';
  if (levels.includes('moderate') || levels.includes('limited')) return 'caution';
  return 'clean';
}

const all = [...BATCH71_KYR6_AMAZON_3P_NOW, ...BATCH72_KYR6_NOW_REFUSE_BACKFILL, ...BATCH73_KYR6_NOW_EXACT_S5_BACKFILL];

for (const id of IDS) {
  const r = all.find((x) => x.id === id);
  if (!r) {
    console.log('MISSING', id);
    continue;
  }
  const computed = verdictFromFlags(r.inactiveIngredients.map((i) => i.riskLevel));
  const bad = r.inactiveIngredients.filter((i) => i.riskLevel !== 'cleared');
  console.log(
    JSON.stringify({
      id,
      stored: r.verdict,
      computed,
      bad: bad.map((i) => `${i.name}=${i.riskLevel}`),
    }),
  );
}
