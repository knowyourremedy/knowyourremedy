import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

export const T125U_BARE_SHELL_WHY =
  'This is a vegetarian capsule shell. The common materials used for these shells (pullulan, hypromellose, cellulose, or tapioca) are all Cleared, so the bare name is Cleared.';

const BARE_SHELL = new Set([
  'vegetable capsule',
  'vegetarian capsule',
  'vegan capsule',
  'veggie softgel',
]);

/** Exact bare shell only. Case is not a second token. A named material in the same string is not this lock. */
export function isT125uBareShellName(name: string): boolean {
  const token = name.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
  return BARE_SHELL.has(token);
}

function panelPrefix(source: string | undefined): string {
  const panel = source?.split(';')[0]?.trim();
  return panel && panel.length > 0 ? panel : 'Panel';
}

function clearBareShell(ingredient: IngredientFlag): IngredientFlag {
  if (!isT125uBareShellName(ingredient.name)) return ingredient;
  const source = `${panelPrefix(ingredient.source)}; Methodology §5 Cleared (t125u). This exact bare shell does not stack. The prior t83 Limited lock is not binding.`;
  if (
    ingredient.riskLevel === 'cleared'
    && ingredient.stackCountExempt
    && ingredient.why === T125U_BARE_SHELL_WHY
    && ingredient.source === source
  ) {
    return ingredient;
  }
  return {
    ...ingredient,
    riskLevel: 'cleared' as RiskLevel,
    stackCountExempt: true,
    why: T125U_BARE_SHELL_WHY,
    source,
  };
}

/** Replaces the t83 Limited lock on the four bare shells. Other tokens stay as they are. */
export function applyT125uBareShellRow(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => isT125uBareShellName(ingredient.name))) return record;
  const inactiveIngredients = record.inactiveIngredients.map(clearBareShell);
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  const becameClean = record.verdict !== 'clean' && rollup.verdict === 'clean';
  const honestNote = becameClean ? undefined : record.honestNote;
  const founderHonestNote = becameClean ? '' : record.founderHonestNote;
  const sameIngredients = inactiveIngredients.every((ingredient, index) => ingredient === record.inactiveIngredients[index]);
  if (
    sameIngredients
    && rollup.verdict === record.verdict
    && honestNote === record.honestNote
    && founderHonestNote === record.founderHonestNote
  ) {
    return record;
  }
  return {
    ...record,
    inactiveIngredients,
    verdict: rollup.verdict,
    honestNote,
    founderHonestNote,
  };
}

for (const name of ['Vegetable Capsule', 'vegetarian capsule.', 'VEGAN CAPSULE', 'Veggie Softgel']) {
  if (!isT125uBareShellName(name)) throw new Error(`t125u missed ${name}`);
}
for (const name of ['Vegetable capsule (hypromellose)', 'Vegetarian Capsule (Pullulan)', 'vegetable cellulose capsule', 'veggie capsule']) {
  if (isT125uBareShellName(name)) throw new Error(`t125u over-matched ${name}`);
}
