import type { RatingRecord } from '../ratingRecord';

const T134U_NOW_IDS = new Set([
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
]);

export function isLiveMethodologyLockSource(source: string | undefined): boolean {
  if (!source) return false;
  if (/founder lock t(132|133|134|111|118|120|121)u/i.test(source)) return true;
  if (/Founder override Oct \d+, 2026 t(111|118|120|121|132|133)u/i.test(source)) return true;
  if (/hydrogenated.*t107u|Locked Oct 15, 2026.*hydrogenated/i.test(source)) return true;
  if (/fruit and vegetable juice|Fruit or vegetable juice/i.test(source)) return true;
  if (/Locked Oct 15, 2026/.test(source) && /juice|puree/i.test(source)) return true;
  if (/beeswax — softgel shell wax/i.test(source)) return true;
  if (/Carnauba wax — founder lock t133u/i.test(source)) return true;
  if (/named vegetable juice color/i.test(source)) return true;
  if (/juice-as-color/i.test(source)) return true;
  if (/MCT — founder lock t132u/i.test(source)) return true;
  if (/MCT in a gummy — founder lock t132u/i.test(source)) return true;
  return false;
}

export type IngredientDelta = {
  name: string;
  oldRisk: string;
  newRisk: string;
  oldSource: string;
  newSource: string;
};

export function ingredientDeltas(before: RatingRecord, after: RatingRecord): IngredientDelta[] {
  const deltas: IngredientDelta[] = [];
  const hadCombo = before.inactiveIngredients.some(
    (i) => i.name.trim().toLowerCase() === 'beeswax / carnauba wax',
  );
  const hasSplit = after.inactiveIngredients.some((i) => i.name === 'Carnauba wax');
  if (hadCombo && hasSplit) {
    deltas.push({
      name: 'Beeswax / carnauba wax (split)',
      oldRisk: 'cleared',
      newRisk: 'cleared',
      oldSource: '',
      newSource: 't133u split',
    });
  }
  for (const ing of after.inactiveIngredients) {
    const old = before.inactiveIngredients.find((x) => x.name === ing.name);
    if (!old) continue;
    if (old.riskLevel !== ing.riskLevel || (old.source ?? '') !== (ing.source ?? '')) {
      deltas.push({
        name: ing.name,
        oldRisk: old.riskLevel,
        newRisk: ing.riskLevel,
        oldSource: old.source ?? '',
        newSource: ing.source ?? '',
      });
    }
  }
  return deltas;
}

export type RescanClassification =
  | { kind: 'noop' }
  | { kind: 'apply'; applyVerdict: boolean; drivingToken: string; deltas: IngredientDelta[] }
  | { kind: 'excluded'; reason: string; deltas: IngredientDelta[] };

export function classifyRescanDelta(before: RatingRecord, after: RatingRecord): RescanClassification {
  const deltas = ingredientDeltas(before, after);
  const verdictChange = before.verdict !== after.verdict;

  if (deltas.length === 0 && !verdictChange) return { kind: 'noop' };

  if (before.id === 'genexa-acetaminophen-es' && verdictChange) {
    return { kind: 'excluded', reason: 'genexa-acetaminophen-es must stay Caution', deltas };
  }
  if (T134U_NOW_IDS.has(before.id) && verdictChange && after.verdict !== 'clean') {
    return { kind: 'excluded', reason: 't134u NOW row must stay Clean unless live lock', deltas };
  }

  if (deltas.length === 0 && verdictChange) {
    return {
      kind: 'excluded',
      reason: 'verdict-only (no ingredient delta; not traced to live lock)',
      deltas,
    };
  }

  const badRisk = deltas.filter((d) => {
    if (d.name.includes('split')) return false;
    if (d.oldRisk === d.newRisk) return false;
    if (!isLiveMethodologyLockSource(d.newSource)) return true;
    if (/vegetable oil/i.test(d.name) && d.newRisk === 'cleared') return true;
    return false;
  });
  if (badRisk.length > 0) {
    return {
      kind: 'excluded',
      reason: `risk change without live lock (${badRisk.map((d) => d.name).join(', ')})`,
      deltas,
    };
  }

  const lockDeltas = deltas.filter(
    (d) => d.name.includes('split') || isLiveMethodologyLockSource(d.newSource),
  );
  if (lockDeltas.length === 0) {
    return {
      kind: 'excluded',
      reason: 'no live METHODOLOGY lock in recomputed sources',
      deltas,
    };
  }

  const driving =
    lockDeltas.find((d) => d.oldRisk !== d.newRisk)?.name
    ?? lockDeltas[0]?.name
    ?? 'unknown';

  const applyVerdict =
    verdictChange
    && lockDeltas.some((d) => d.oldRisk !== d.newRisk || d.name.includes('split'));

  return { kind: 'apply', applyVerdict, drivingToken: driving, deltas };
}
