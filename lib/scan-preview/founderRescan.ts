import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { plainIngredientWhy } from './plainLanguage';
import { applyOverlayIngredientLocks } from './previewCatalog';
import { verdictFromFlagsStrict } from './verdictFromFlags';
import { applyCautionCapLocks } from './cautionCapLocks';
import { applyT138uIngredientLocks } from './t138uLocks';
import { applyT141uIngredientLocks } from './t141uLocks';

export { verdictFromFlagsStrict } from './verdictFromFlags';
export type { VerdictRollup } from './verdictFromFlags';
export {
  appendLimitedStackHonestNote,
  computeVerdictFromInactiveIngredients,
  ingredientCountsTowardLimitedStack,
  isSiliconDioxideStackExempt,
  replaceLimitedStackHonestNote,
  stripLimitedStackHonestNote,
} from './verdictFromFlags';

const T133U_CARNAUBA_LOCK_SOURCE =
  'Methodology §5 Cleared (Carnauba wax — founder lock t133u Oct 20, 2026; §4 prior-lock re-eval; supersedes L1002 Sept 25 Caution).';

const BEESWAX_SOURCE =
  'Methodology §5 Cleared (beeswax — softgel shell wax)';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

export function splitCombinedIngredientTabs(record: RatingRecord): RatingRecord {
  const inactiveIngredients: RatingRecord['inactiveIngredients'] = [];
  for (const ingredient of record.inactiveIngredients) {
    const n = ingredient.name.trim().toLowerCase();
    if (n === 'beeswax / carnauba wax') {
      const panel = panelPrefix(ingredient.source);
      inactiveIngredients.push({
        name: 'Beeswax',
        riskLevel: 'cleared',
        source: `${panel}; ${BEESWAX_SOURCE}`,
      });
      inactiveIngredients.push({
        name: 'Carnauba wax',
        riskLevel: 'cleared',
        source: `${panel}; ${T133U_CARNAUBA_LOCK_SOURCE}`,
      });
      continue;
    }
    inactiveIngredients.push(ingredient);
  }
  if (inactiveIngredients.length === record.inactiveIngredients.length) return record;
  return { ...record, inactiveIngredients };
}

// t132u overrides (founder lock set Oct 20, 2026)
function isGummyOrLozengeForm(form: string | undefined): boolean {
  const f = (form ?? '').toLowerCase();
  return f.includes('gummy') || f.includes('lozenge') || f.includes('chew');
}

function isNaturalNamedFruitFlavorToken(name: string): boolean {
  const raw = name.trim();
  const n = raw.toLowerCase();
  if (n === 'natural flavors' || n === 'natural flavor') return false;
  if (n.startsWith('natural and artificial')) return false;
  if (/^natural\s+[\w\s/&+-]+\s+flavor$/i.test(raw) && !/^natural\s+flavors?$/i.test(raw)) {
    return true;
  }
  if (n === 'natural cranberry flavor') return true;
  if (n === 'natural orange extract' || n.includes('natural strawberry and orange extract')) return true;
  return false;
}

const T132U_METH: Record<string, { riskLevel: RiskLevel; meth: string }> = {
  ricePowder: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  },
  organicRicePowder: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Organic Rice Powder — founder lock t132u Oct 20, 2026; §4 re-eval before prior locks).',
  },
  dlTartaric: {
    riskLevel: 'cleared',
    meth: 'Methodology §5 Cleared (DL-Tartaric Acid — founder lock t132u Oct 20, 2026; §4 re-eval).',
  },
  beetJuiceColor: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Beet Juice Color — founder lock t132u Oct 20, 2026; named vegetable juice color).',
  },
  soybeanOilHighlyRefinedFill: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Soybean Oil (Highly Refined) — founder lock t132u Oct 20, 2026; non-gummy fill).',
  },
  soybeanOilHighlyRefinedGummy: {
    riskLevel: 'high',
    meth:
      'Methodology §5 Avoid (Soybean Oil (Highly Refined) — founder lock t132u Oct 20, 2026; gummy/lozenge seed-oil rule).',
  },
  naturalVitaminE: {
    riskLevel: 'cleared',
    meth: 'Methodology §5 Cleared (Natural Vitamin E — founder lock t132u Oct 20, 2026).',
  },
  naturalCranberryFlavor: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Natural Cranberry Flavor — founder lock t132u Oct 20, 2026; named fruit flavor family).',
  },
  pineappleJuiceColor: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Pineapple Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; juice-as-color).',
  },
  carrotJuiceColor: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (Black/Purple Carrot Juice Concentrate (Color) — founder lock t132u Oct 20, 2026; juice-as-color).',
  },
  organicRebaudiosideA: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (organic Rebaudioside A — founder lock t132u Oct 20, 2026; steviol glycoside row).',
  },
  naturalOrangeExtract: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (natural Orange extract — founder lock t132u Oct 20, 2026; named fruit extract).',
  },
  naturalStrawberryOrangeExtract: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (natural Strawberry and Orange extract — founder lock t132u Oct 20, 2026).',
  },
  naturalNamedFruitFlavor: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (named Natural [fruit] Flavor — founder lock t132u Oct 20, 2026; §4 natural takes best of two options).',
  },
  mctGummyUnlabeled: {
    riskLevel: 'limited',
    meth:
      'Methodology §5 Limited (MCT in a gummy — founder lock t132u Oct 20, 2026; no plant source named).',
  },
  mctGummyNamed: {
    riskLevel: 'cleared',
    meth:
      'Methodology §5 Cleared (MCT — founder lock t132u Oct 20, 2026; plant source named on panel).',
  },
};

function t132uOverride(
  name: string,
  form: string | undefined,
): { riskLevel: RiskLevel; meth: string } | null {
  const n = name.trim().toLowerCase();
  if (n === 'rice powder') return T132U_METH.ricePowder;
  if (n === 'organic rice powder') return T132U_METH.organicRicePowder;
  if (n === 'dl-tartaric acid' || n === 'dl tartaric acid') return T132U_METH.dlTartaric;
  if (n === 'beet juice color' || n === 'beet juice (color)') return T132U_METH.beetJuiceColor;
  if (n.includes('soybean oil') && n.includes('highly refined')) {
    return isGummyOrLozengeForm(form)
      ? T132U_METH.soybeanOilHighlyRefinedGummy
      : T132U_METH.soybeanOilHighlyRefinedFill;
  }
  if (n === 'natural vitamin e') return T132U_METH.naturalVitaminE;
  if (n === 'natural cranberry flavor') return T132U_METH.naturalCranberryFlavor;
  if (n === 'pineapple juice concentrate (color)') return T132U_METH.pineappleJuiceColor;
  if (n.includes('black/purple carrot juice concentrate')) return T132U_METH.carrotJuiceColor;
  if (n === 'organic rebaudioside a') return T132U_METH.organicRebaudiosideA;
  if (n === 'natural orange extract') return T132U_METH.naturalOrangeExtract;
  if (n.includes('natural strawberry and orange extract')) {
    return T132U_METH.naturalStrawberryOrangeExtract;
  }
  if (isNaturalNamedFruitFlavorToken(name)) return T132U_METH.naturalNamedFruitFlavor;
  if (isGummyOrLozengeForm(form) && /\bmct\b|medium chain triglyceride/i.test(name)) {
    const hasPlant = /coconut|palm|from\s+\w+/i.test(name);
    return hasPlant ? T132U_METH.mctGummyNamed : T132U_METH.mctGummyUnlabeled;
  }
  if (n === 'organic mushroom powder') return null;
  return null;
}

export function applyT132uIngredientLocks(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const ov = t132uOverride(ingredient.name, record.form);
    if (!ov) return ingredient;
    const panel = panelPrefix(ingredient.source);
    return {
      ...ingredient,
      riskLevel: ov.riskLevel,
      source: `${panel}; ${ov.meth}`,
    };
  });
  return { ...record, inactiveIngredients };
}

export function recomputeFounderRescanRecord(record: RatingRecord): RatingRecord {
  let r = splitCombinedIngredientTabs(record);
  r = applyCautionCapLocks(r);
  r = applyT132uIngredientLocks(r);
  r = applyT138uIngredientLocks(r);
  r = applyT141uIngredientLocks(r);
  r = applyOverlayIngredientLocks(r, { applyT133uToFileLockedIds: true });
  const verdict = verdictFromFlagsStrict(r);
  return { ...r, verdict };
}

export function recordsEqual(a: RatingRecord, b: RatingRecord): boolean {
  if (a.verdict !== b.verdict) return false;
  if (a.inactiveIngredients.length !== b.inactiveIngredients.length) return false;
  return a.inactiveIngredients.every((ing, i) => {
    const other = b.inactiveIngredients[i];
    return (
      ing.name === other.name
      && ing.riskLevel === other.riskLevel
      && (ing.source ?? '') === (other.source ?? '')
    );
  });
}

export type MissingLockReport = { id: string; productName: string; ingredientName: string };

export function findMissingMethodologyLocks(record: RatingRecord): MissingLockReport[] {
  const recomputed = recomputeFounderRescanRecord(record);
  const missing: MissingLockReport[] = [];
  for (const ing of recomputed.inactiveIngredients) {
    const src = ing.source ?? '';
    if (/pending dailymed review/i.test(src)) {
      missing.push({ id: record.id, productName: record.productName, ingredientName: ing.name });
      continue;
    }
    if (!plainIngredientWhy(ing)) {
      missing.push({ id: record.id, productName: record.productName, ingredientName: ing.name });
    }
  }
  return missing;
}
