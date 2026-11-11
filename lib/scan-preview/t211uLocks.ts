import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import { computeVerdictFromInactiveIngredients } from './verdictFromFlags';

type Lock = { grade: RiskLevel; why: string; counts: boolean };

export const T211U: Record<string, Lock> = {
  'Cane Alcohol 22-28%': { grade: 'cleared', counts: false, why: 'Cane alcohol at 22-28% by volume. It is the liquid that extracts and carries the plant ingredients.' },
  'Cane Alcohol 17-23%': { grade: 'cleared', counts: false, why: 'Cane alcohol at 17-23% by volume. It is the liquid that extracts and carries the plant ingredients.' },
  'Capsule (Hydroxypropyl Methylcellulose, Purified Water)': { grade: 'cleared', counts: false, why: 'Capsule shell made from hydroxypropyl methylcellulose and purified water. Hydroxypropyl methylcellulose is a plant-derived cellulose polymer used to form vegan capsules.' },
  'Capsule (Hydroxypropyl Methylcellulose, Purified water)': { grade: 'cleared', counts: false, why: 'Capsule shell made from hydroxypropyl methylcellulose and purified water. Hydroxypropyl methylcellulose is a plant-derived cellulose polymer used to form vegan capsules.' },
  'Capsule (Hydroxypropyl methylcellulose, Purified water)': { grade: 'cleared', counts: false, why: 'Capsule shell made from hydroxypropyl methylcellulose and purified water. Hydroxypropyl methylcellulose is a plant-derived cellulose polymer used to form vegan capsules.' },
  'Capsule (Hydroxypropyl Methylcellulose)': { grade: 'cleared', counts: false, why: 'Capsule shell made from hydroxypropyl methylcellulose. Hydroxypropyl methylcellulose is a plant-derived cellulose polymer used to form vegan capsules.' },
  'Capsule (Tapioca)': { grade: 'cleared', counts: false, why: 'Capsule shell made from tapioca. Tapioca is a plant starch used to form vegan capsules.' },
  'Ascorbic Acid': { grade: 'cleared', counts: false, why: 'Ascorbic acid, a form of vitamin C. It is added to help keep the product stable.' },
  'Concentrated seawater': { grade: 'cleared', counts: false, why: 'Concentrated seawater. It supplies natural minerals to the product.' },
  'Bovine Tissue': { grade: 'cleared', counts: false, why: 'Bovine tissue. It supplies animal-sourced nutrients to the product.' },
  'Cellulose': { grade: 'cleared', counts: false, why: 'Cellulose, a plant fiber. It is used as a filler and to help the capsule or tablet hold its shape.' },
  'Honey Powder': { grade: 'cleared', counts: false, why: 'Powdered honey. It adds a small amount of natural sweetness and flavor.' },
  'Rosemary (Rosmarinus officinalis) Leaf Extract': { grade: 'cleared', counts: false, why: 'Extract from rosemary leaves. It is added to help keep the product fresh.' },
  'Rosemary ( Rosmarinus officinalis ) Leaf Extract': { grade: 'cleared', counts: false, why: 'Extract from rosemary leaves. It is added to help keep the product fresh.' },
  'Rosemary (Rosmarinus officinalis) extract oil (as preservative)': { grade: 'cleared', counts: false, why: 'Rosemary leaf extract oil. It is added as a natural preservative to help keep the product fresh.' },
  'Magnesium Stearate (Vegetarian)': { grade: 'cleared', counts: false, why: 'Vegetarian magnesium stearate. It is a lubricant that helps the powder flow into capsules or tablets.' },
  'Lemon (Citrus × limon) Powder': { grade: 'cleared', counts: false, why: 'Powdered lemon. It adds lemon flavor and a small amount of natural acidity.' },
  'Lemon ( Citrus × limon ) Peel Powder': { grade: 'cleared', counts: false, why: 'Powdered lemon peel. It adds lemon flavor and a small amount of natural acidity.' },
  'L-Leucine': { grade: 'cleared', counts: false, why: 'L-leucine, an amino acid. It is used to help the powder flow and to keep the tablet or capsule from sticking.' },
  'Elder Berry Juice Concentrate': { grade: 'cleared', counts: false, why: 'Concentrated elderberry juice. It adds elderberry flavor and color.' },
  'Raspberry Juice Concentrate': { grade: 'cleared', counts: false, why: 'Concentrated raspberry juice. It adds raspberry flavor and color.' },
  'Grapefruit Seed Extract': { grade: 'cleared', counts: false, why: 'Extract from grapefruit seeds. It is added as a natural preservative.' },
  'd-alpha Tocopherol (Vitamin E)': { grade: 'cleared', counts: false, why: 'Natural vitamin E. It is added to help keep the product fresh.' },
  'Organic Inulin': { grade: 'cleared', counts: false, why: 'Organic inulin, a fiber from plants. It is used as a filler and to support the mixture.' },
  'Microcrystaline Cellulose': { grade: 'cleared', counts: false, why: 'Microcrystalline cellulose, a refined plant fiber. It is used as a filler and to help the tablet or capsule hold its shape.' },
  'Soy Lecithin': { grade: 'cleared', counts: false, why: 'Lecithin from soy. It helps keep the ingredients mixed and prevents separation.' },
  'Non-GMO Potato Starch': { grade: 'cleared', counts: false, why: 'Non-GMO potato starch. It is a plant starch used as a filler and binder.' },
  'Palmitic Acid': { grade: 'cleared', counts: false, why: 'Palmitic acid, a fatty acid. It is used as a lubricant to help the powder flow.' },
  'Ascorbyl Palmitate (as preservative)': { grade: 'cleared', counts: false, why: 'Ascorbyl palmitate, a form of vitamin C. It is added as a preservative to help keep the product fresh.' },
  'Aloe barbadensis (Aloe Vera) Leaf Juice': { grade: 'cleared', counts: false, why: 'Juice from aloe vera leaves. It is added for its soothing plant compounds.' },
  'Clove': { grade: 'cleared', counts: false, why: 'Clove. It adds clove flavor and aroma.' },
  'Peppermint': { grade: 'cleared', counts: false, why: 'Peppermint. It adds mint flavor and aroma.' },
  'Sage': { grade: 'cleared', counts: false, why: 'Sage. It adds sage flavor and aroma.' },
  'Spilanthes': { grade: 'cleared', counts: false, why: 'Spilanthes. It adds the plant’s natural flavor and compounds.' },
  'Wild Thyme': { grade: 'cleared', counts: false, why: 'Wild thyme. It adds thyme flavor and aroma.' },
  'Prunus amygdalus dulcis (Sweet Almond) Oil': { grade: 'cleared', counts: false, why: 'Sweet almond oil. It is used as a carrier oil in the product.' },
  'Melaleuca alternifolia (Tea Tree) Oil': { grade: 'cleared', counts: false, why: 'Tea tree oil. It is used for its plant compounds.' },
  'Glyceryl Stearate': { grade: 'cleared', counts: false, why: 'Glyceryl stearate. It helps keep the cream or lotion mixed and smooth.' },
  'Sodium Stearoyl Lactylate': { grade: 'cleared', counts: false, why: 'Sodium stearoyl lactylate. It helps keep the ingredients mixed and prevents separation.' },
  'Garlic Extract': { grade: 'cleared', counts: false, why: 'Extract from garlic. It adds garlic flavor and plant compounds.' },
  'Amylase': { grade: 'cleared', counts: false, why: 'Amylase, an enzyme that breaks down starch. It is added to help with digestion of the product’s ingredients.' },
  'Protease': { grade: 'cleared', counts: false, why: 'Protease, an enzyme that breaks down protein. It is added to help with digestion of the product’s ingredients.' },
  'Lipase': { grade: 'cleared', counts: false, why: 'Lipase, an enzyme that breaks down fat. It is added to help with digestion of the product’s ingredients.' },
  'Cucumis melo (Melon) Fruit Extract': { grade: 'cleared', counts: false, why: 'Extract from melon fruit. It adds melon flavor and plant compounds.' },
  'Lonicera caprifolium (Honeysuckle) Flower Extract': { grade: 'cleared', counts: false, why: 'Extract from honeysuckle flowers. It adds the plant’s natural compounds.' },
  'Lonicera japonica (Honeysuckle) Flower Extract': { grade: 'cleared', counts: false, why: 'Extract from honeysuckle flowers. It adds the plant’s natural compounds.' },
  'Natural Mixed Berry Flavor': { grade: 'cleared', counts: false, why: 'Natural mixed berry flavoring made from berries. It adds mixed berry taste to the product.' },
  'Cane Alcohol': { grade: 'limited', counts: true, why: 'Cane alcohol. It is the liquid that extracts and carries the plant ingredients. The panel does not print the strength, so the exact concentration is not shown. Alcohol used as a vehicle is graded Limited when the strength is not printed.' },
  'Maltodextran': { grade: 'limited', counts: true, why: 'Maltodextrin, a starch-derived carbohydrate. It is used as a filler and to help the powder flow. Maltodextrin is graded Limited because it is a highly processed starch.' },
  'Ethanol 3%': { grade: 'limited', counts: true, why: 'Ethanol at 3%. It is the liquid that extracts and carries the plant ingredients. Alcohol used as a vehicle is graded Limited when the strength is low or the source is not fully named on the panel.' },
  'Carbomer': { grade: 'moderate', counts: false, why: 'Carbomer, a synthetic polymer. It is used to thicken creams and lotions. Carbomer is graded Caution because it is a man-made thickener.' },
  'Sodium Hydroxide': { grade: 'moderate', counts: false, why: 'Sodium hydroxide. It is used in tiny amounts to adjust the pH of the product. Sodium hydroxide is graded Caution as a strong processing chemical.' },
  'Cetearyl Cane Alcohol': { grade: 'moderate', counts: false, why: 'Cetearyl alcohol made from cane. It is used as a thickener and emulsifier in creams. Cetearyl alcohol is graded Caution as a fatty alcohol thickener.' },
  'Cetyl Cane Alcohol': { grade: 'moderate', counts: false, why: 'Cetyl alcohol made from cane. It is used as a thickener and emulsifier in creams. Cetyl alcohol is graded Caution as a fatty alcohol thickener.' },
  'Diheptyl Succinate': { grade: 'moderate', counts: false, why: 'Diheptyl succinate. It is used as an emollient in creams. It is graded Caution as a synthetic ester.' },
  'Capryloyl Glycerin/Sebacic Acid Copolymer': { grade: 'moderate', counts: false, why: 'A copolymer of capryloyl glycerin and sebacic acid. It is used as an emollient in creams. It is graded Caution as a synthetic polymer.' },
}

const SOURCE: Record<RiskLevel, string> = {
  cleared: 'Methodology §5 Cleared (founder lock t211u). Does not count toward the t137u stack.',
  moderate: 'Methodology §5 Caution (founder lock t211u). Does not count toward the t137u stack.',
  limited: 'Methodology §5 Limited (founder lock t211u). Counts toward the 3+ Limited stack.',
  high: 'Methodology §5 Avoid (founder lock t211u).',
};

export function t211uLock(name: string): Lock | undefined {
  return T211U[name.trim()];
}

export function applyT211uIngredients(ingredients: readonly IngredientFlag[]): IngredientFlag[] {
  let changed = false;
  const next = ingredients.map((ingredient) => {
    const lock = t211uLock(ingredient.name);
    if (!lock) return ingredient;
    const source = (ingredient.source ?? '').includes('founder lock t211u')
      ? ingredient.source
      : ingredient.source ? `${ingredient.source}; ${SOURCE[lock.grade]}` : SOURCE[lock.grade];
    const exempt = !lock.counts;
    if (ingredient.riskLevel === lock.grade && ingredient.stackCountExempt === exempt && ingredient.why === lock.why && source === ingredient.source) {
      return ingredient;
    }
    changed = true;
    return { ...ingredient, riskLevel: lock.grade, stackCountExempt: exempt, why: lock.why, source };
  });
  return changed ? next : ingredients as IngredientFlag[];
}

export function applyT211uTokenWhy(record: RatingRecord): RatingRecord {
  if (!record.inactiveIngredients.some((ingredient) => t211uLock(ingredient.name))) return record;
  const before = record.inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  const inactiveIngredients = applyT211uIngredients(record.inactiveIngredients);
  if (inactiveIngredients === record.inactiveIngredients) return record;
  const after = inactiveIngredients.map((ingredient) =>
    `${ingredient.name}|${ingredient.riskLevel}|${ingredient.stackCountExempt ?? ''}`).join(';');
  if (before === after) return { ...record, inactiveIngredients };
  const rollup = computeVerdictFromInactiveIngredients(inactiveIngredients, record.activeSafetyFlag);
  return { ...record, inactiveIngredients, verdict: rollup.verdict };
}

if (t211uLock('Cane Alcohol')?.grade !== 'limited' || t211uLock('Cane Alcohol')?.counts !== true) throw new Error('t211u cane');
if (t211uLock('Cane Alcohol')?.why !== 'Cane alcohol. It is the liquid that extracts and carries the plant ingredients. The panel does not print the strength, so the exact concentration is not shown. Alcohol used as a vehicle is graded Limited when the strength is not printed.') throw new Error('t212u cane why');
if (t211uLock('Ethanol 3%')?.grade !== 'limited' || t211uLock('Ethanol 3%')?.counts !== true) throw new Error('t211u ethanol');
if (t211uLock('Ethanol 3%')?.why !== 'Ethanol at 3%. It is the liquid that extracts and carries the plant ingredients. Alcohol used as a vehicle is graded Limited when the strength is low or the source is not fully named on the panel.') throw new Error('t212u ethanol why');
if (t211uLock('Cane Alcohol 22-28%')?.grade !== 'cleared') throw new Error('t211u cane strength');
if (t211uLock('Capsule (Hydroxypropyl Methylcellulose, Purified water)')?.why === t211uLock('Capsule (Hydroxypropyl methylcellulose, Purified water)')?.why) {
  // same why text is intended
}
if (!t211uLock('Lemon (Citrus × limon) Powder')) throw new Error('t211u lemon');
if (t211uLock('Spilanthes')?.why.includes("plant's") && !t211uLock('Spilanthes')?.why.includes('’')) throw new Error('apostrophe');
