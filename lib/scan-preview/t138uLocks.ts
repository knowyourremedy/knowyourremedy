import type { RatingRecord, RiskLevel } from '../ratingRecord';

const T138U_PRIOR_REEVAL = '§4 prior-lock re-eval';

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function t138uMeth(label: string): string {
  return `Methodology §5 Limited (${label} — founder lock t138u Oct 20, 2026; ${T138U_PRIOR_REEVAL}; supersedes prior Moderate-risk label).`;
}

function isTopicalOrNasalPropyleneGlycol(ingredient: RatingRecord['inactiveIngredients'][number]): boolean {
  if (ingredient.riskLevel === 'cleared') return true;
  const src = (ingredient.source ?? '').toLowerCase();
  return (
    src.includes('topical form')
    || src.includes('nasal spray')
    || src.includes('does not score on this nasal')
    || src.includes('pgnasal')
  );
}

export function isOralPropyleneGlycolName(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (!/propylene glycol|\bpg\b|\be1520\b/.test(n)) return false;
  if (/dicaprylate|dipelargonate|dipropylene/.test(n)) return false;
  return true;
}

function isPegFamilyName(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (/^polyethylene\b/.test(n) && !/glycol/.test(n)) return false;
  return (
    /polyethylene glycol|polyethyleneglycol|\bpeg[- ]?\d|polyethylene glycol \(\s*peg\s*\)|\bmacrogol\b|pegoxol|lauroyl macrogol/.test(
      n,
    ) || /\bpeg\b/.test(n)
  );
}

export function t138uFamilyLabel(name: string): string | null {
  const raw = name.trim();
  const n = raw.toLowerCase();
  if (/polysorbate/.test(n)) {
    if (/polysorbate\s*20|\btween\s*20\b/.test(n)) return 'Polysorbate 20';
    if (/polysorbate\s*60|\btween\s*60\b/.test(n)) return 'Polysorbate 60';
    if (/polysorbate\s*80|\btween\s*80\b/.test(n)) return 'Polysorbate 80';
    if (n === 'polysorbate' || /^polysorbate[^0-9]*$/.test(n)) return 'Polysorbate (unspecified)';
    return 'Polysorbate';
  }
  if (isPegFamilyName(raw)) return 'PEGs / polyethylene glycol';
  if (/sucralose|\be955\b|splenda/.test(n)) return 'Sucralose';
  if (/acesulfame|ace[- ]?k|\be950\b/.test(n)) return 'Acesulfame potassium';
  if (/\bsaccharin\b/.test(n) || /saccharin sodium|sodium saccharin/.test(n)) return 'Saccharin';
  return null;
}

function t138uOverride(
  ingredient: RatingRecord['inactiveIngredients'][number],
): { riskLevel: RiskLevel; meth: string } | null {
  const name = ingredient.name;
  if (isOralPropyleneGlycolName(name)) {
    if (isTopicalOrNasalPropyleneGlycol(ingredient)) return null;
    if (ingredient.riskLevel !== 'moderate' && !(ingredient.source ?? '').includes('Moderate-risk')) {
      if (ingredient.riskLevel === 'limited' && (ingredient.source ?? '').includes('t138u')) return null;
      if (ingredient.riskLevel === 'limited') {
        return { riskLevel: 'limited', meth: t138uMeth('Propylene glycol (oral)') };
      }
      return null;
    }
    return { riskLevel: 'limited', meth: t138uMeth('Propylene glycol (oral)') };
  }
  const family = t138uFamilyLabel(name);
  if (!family) return null;
  if (
    ingredient.riskLevel !== 'moderate'
    && !(ingredient.source ?? '').includes('Moderate-risk')
    && !(ingredient.source ?? '').includes('Moderate-risk (')
  ) {
    if (ingredient.riskLevel === 'limited' && (ingredient.source ?? '').includes('t138u')) return null;
    if (ingredient.riskLevel === 'limited') {
      return { riskLevel: 'limited', meth: t138uMeth(family) };
    }
    return null;
  }
  return { riskLevel: 'limited', meth: t138uMeth(family) };
}

export function applyT138uIngredientLocks(record: RatingRecord): RatingRecord {
  const inactiveIngredients = record.inactiveIngredients.map((ingredient) => {
    const ov = t138uOverride(ingredient);
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

export type T138uPgSplitStats = {
  oralLimited: number;
  nonOralUnchanged: number;
};

/** Count propylene glycol tabs on a record after t138u (for rescan reporting). */
export function countPropyleneGlycolSplit(record: RatingRecord): T138uPgSplitStats {
  let oralLimited = 0;
  let nonOralUnchanged = 0;
  for (const ing of record.inactiveIngredients) {
    if (!isOralPropyleneGlycolName(ing.name)) continue;
    if (isTopicalOrNasalPropyleneGlycol(ing) || ing.riskLevel === 'cleared') {
      nonOralUnchanged++;
    } else if (ing.riskLevel === 'limited' && (ing.source ?? '').includes('t138u')) {
      oralLimited++;
    }
  }
  return { oralLimited, nonOralUnchanged };
}
