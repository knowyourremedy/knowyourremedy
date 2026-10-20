import type { RatingRecord, RiskLevel } from '../ratingRecord';
import { isSiliconDioxideStackExempt } from './verdictFromFlags';

const SIO2_CAP_METH =
  'Methodology §5 Limited (silicon dioxide / silica — 0-pt nanoparticle Caution cap). Does not by itself make Avoid.';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function methFromSource(source: string | undefined): string | null {
  if (!source) return null;
  const idx = source.search(/Methodology §5/i);
  if (idx < 0) return null;
  return source.slice(idx).trim();
}

function withMeth(panel: string, meth: string, existing?: string): string {
  const kept = methFromSource(existing);
  if (kept && kept === meth) return existing ?? `${panel}; ${meth}`;
  return `${panel}; ${meth}`;
}

/** Align 0-pt Caution caps and §5 Caution METH stamps with strict rollup (t138u audit). */
export function applyCautionCapLocks(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const src = ingredient.source ?? '';
    const panel = panelPrefix(ingredient.source);

    if (isSiliconDioxideStackExempt(ingredient.name)) {
      if (ingredient.riskLevel === 'cleared' || ingredient.riskLevel === 'moderate') {
        const meth = methFromSource(src);
        const useMeth =
          meth && /silicon dioxide|silica|precautionary|0-pt|caution cap/i.test(meth)
            ? meth
            : SIO2_CAP_METH;
        return {
          ...ingredient,
          riskLevel: 'limited' as RiskLevel,
          stackCountExempt: true,
          source: withMeth(panel, useMeth, ingredient.source),
        };
      }
      return ingredient;
    }

    if (ingredient.riskLevel !== 'cleared') return ingredient;

    if (/Methodology §5 Caution/.test(src)) {
      return { ...ingredient, riskLevel: 'moderate' as RiskLevel };
    }

    if (/Methodology §5 Precautionary/.test(src) && /caution/i.test(src)) {
      return { ...ingredient, riskLevel: 'limited' as RiskLevel };
    }

    if (/Methodology §5 Limited/.test(src)) {
      return { ...ingredient, riskLevel: 'limited' as RiskLevel };
    }

    if (/Founder graded this SKU Caution/i.test(src)) {
      return { ...ingredient, riskLevel: 'moderate' as RiskLevel };
    }

    return ingredient;
  });
  if (inactiveIngredients.every((ing, i) => ing === record.inactiveIngredients[i])) {
    return record;
  }
  return { ...record, inactiveIngredients };
}
