import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';

export const STEVIA_EXTRACT_LIMITED_SOURCE =
  'Methodology §5 Limited (Stevia extract / stevia leaf extract — founder lock t159u Oct 21, 2026; same Limited row as Stevia and rebaudioside a extracted and purified; counts toward the t137u stack). Not Cleared organic Rebaudioside A. Not Cleared high-purity steviol glycosides. Not Cleared Rebaudioside M.';

export const PAPRIKA_COLOR_CLEARED_SOURCE =
  'Methodology §5 Cleared (Paprika extract (natural color) / Paprika (color) — founder lock t159u Oct 21, 2026; same Cleared named plant color as Paprika extract (color)).';

function normName(name: string): string {
  return name.trim().toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}

/** Reb M, organic Reb A, and high-purity steviol glycosides stay put. */
export function isT159uSteviaExtractLimitedName(name: string): boolean {
  const n = normName(name);
  if (/\brebaudioside m\b|\breb m\b/.test(n)) return false;
  if (/high purity/.test(n)) return false;
  if (/organic/.test(n) && /rebaudioside a/.test(n)) return false;
  if (n === 'organic rebaudioside a' || n.startsWith('organic rebaudioside a ')) return false;
  // Cleared Reb A glycoside strings. Not the leaf-extract caution row.
  if (n === 'stevia extract powder reb a' || n === 'stevia extract rebaudioside a') return false;
  if (n === 'stevia extract' || n === 'stevia leaf extract') return true;
  if (n === 'stevia extract stevioside' || n === 'stevia extract stevia rebaudiana leaf') return true;
  if (n === 'organic stevia leaf extract' || n === 'stevia leaf extract') return true;
  if (n.startsWith('organic stevia leaf extract ') && !/rebaudioside a/.test(n)) return true;
  if (n.startsWith('stevia leaf extract ')) return true;
  if (n.startsWith('stevia extract ') && !/\breb a\b|rebaudioside a/.test(n)) return true;
  return false;
}

export function isT159uPaprikaColorClearedName(name: string): boolean {
  const n = normName(name);
  return n === 'paprika extract natural color' || n === 'paprika color';
}

export function t159uLockForName(name: string): { riskLevel: RiskLevel; source: string } | null {
  if (isT159uSteviaExtractLimitedName(name)) {
    return { riskLevel: 'limited', source: STEVIA_EXTRACT_LIMITED_SOURCE };
  }
  if (isT159uPaprikaColorClearedName(name)) {
    return { riskLevel: 'cleared', source: PAPRIKA_COLOR_CLEARED_SOURCE };
  }
  return null;
}

export function applyT159uIngredientLocks(record: RatingRecord): { record: RatingRecord; changed: boolean } {
  let changed = false;
  const inactiveIngredients: IngredientFlag[] = record.inactiveIngredients.map((ingredient) => {
    const lock = t159uLockForName(ingredient.name);
    if (!lock) return ingredient;
    if (ingredient.riskLevel === lock.riskLevel && (ingredient.source ?? '').includes('founder lock t159u')) {
      return ingredient;
    }
    if (ingredient.riskLevel === lock.riskLevel && (ingredient.source ?? '').includes(lock.source)) {
      return ingredient;
    }
    changed = true;
    const panel = ingredient.source?.split(';')[0]?.trim();
    const source = panel && !/^methodology/i.test(panel) ? `${panel}; ${lock.source}` : lock.source;
    return { ...ingredient, riskLevel: lock.riskLevel, source };
  });
  if (!changed) return { record, changed: false };
  return { record: { ...record, inactiveIngredients }, changed: true };
}
