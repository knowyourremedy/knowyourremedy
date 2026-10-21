import type { RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isTapiocaMaltodextrinName,
  shouldDemoteFalseLimited,
  t141uMeth,
} from './limitedStackEligibility';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

export function applyT141uIngredientLocks(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const panel = panelPrefix(ingredient.source);

    if (isTapiocaMaltodextrinName(ingredient.name)) {
      const meth = t141uMeth();
      if (ingredient.riskLevel === 'limited' && (ingredient.source ?? '').includes('t141u')) {
        return ingredient;
      }
      return {
        ...ingredient,
        riskLevel: 'limited' as RiskLevel,
        stackCountExempt: undefined,
        source: `${panel}; ${meth}`,
      };
    }

    if (shouldDemoteFalseLimited(ingredient)) {
      return {
        ...ingredient,
        riskLevel: 'moderate' as RiskLevel,
        stackCountExempt: true,
      };
    }

    if (ingredient.riskLevel === 'moderate' && !ingredient.stackCountExempt) {
      const src = ingredient.source ?? '';
      if (/Methodology §5 Caution|Moderate-risk|Founder graded this SKU Caution/i.test(src)) {
        return { ...ingredient, stackCountExempt: true };
      }
    }

    return ingredient;
  });

  return { ...record, inactiveIngredients };
}
