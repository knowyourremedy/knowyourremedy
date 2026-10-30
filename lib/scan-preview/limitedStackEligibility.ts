import type { IngredientFlag } from '../ratingRecord';
import { isSiliconDioxideStackExempt } from './siliconDioxide';
import { isOralPropyleneGlycolName, t138uFamilyLabel } from './t138uLocks';

const T141U_PRIOR_REEVAL = '§4 prior-lock re-eval';

const VANILLA_EXTRACT_OPTIONAL =
  /\b(glycerin|glycerine|glycerol|sugar|corn syrup|propylene glycol|dextrose|glucose)\b/;

function vanillaToken(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** t50u: extract / alcohol / water only. Optionals declared on the token are graded as themselves. */
export function isPureVanillaExtractName(name: string): boolean {
  const n = vanillaToken(name);
  if (VANILLA_EXTRACT_OPTIONAL.test(n)) return false;
  const core = n
    .replace(/\b(organic|natural|pure|alcohol|ethyl|water|and|with|in)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return core === 'vanilla extract' || core === 'vanilla bean extract';
}

function t51uToken(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** t51u exact Cleared strings. Thaumatin powder maps here under t55u. Not fish oil powder. Not a Supplement Facts active. */
export function isT51uClearedName(name: string): boolean {
  const n = t51uToken(name);
  return (
    n === 'glucono delta lactone'
    || n === 'thaumatin'
    || n === 'liquid fish oil'
    || n === 'almond butter'
    || n === 'floli50'
    || n === 'vitamin c inactive'
    || n === 'zinc citrate'
    || n === 'sodium hyaluronate'
  );
}

/** t51u exact Caution strings. They do not count toward the t137u stack. */
export function isT51uCautionName(name: string): boolean {
  const n = t51uToken(name);
  return n === 'd ribose' || n === 'myrrh oil' || n === 'organic cane syrup';
}

/** t51u exact Limited strings. Malodextrin is the misspelling, not maltodextrin. Berry flavoring moved to Cleared under t54u. */
export function isT51uLimitedName(name: string): boolean {
  const n = t51uToken(name);
  return n === 'malodextrin';
}

function t54uFlavorKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * t54u: exact natural-flavor wordings whose documented products contain a Limited
 * carrier, solvent, or other docked component. Not a new token family.
 */
const T54U_LIMITED_FLAVOR = new Set([
  'natural flavors',
  'natural flavor',
  'organic flavors',
  'organic flavor',
  'organic natural flavors',
  'organic natural flavor',
  'natural lemon flavor',
  'natural peppermint flavor',
  'natural orange flavor',
  'natural strawberry flavor',
  'natural raspberry flavor',
  'natural berry flavor',
  'natural grape flavor',
  'natural vanilla lavender flavor',
  'natural lemon lime flavor',
  'natural watermelon flavor',
  'natural ginger flavor',
  'natural & artificial wild berry flavor',
]);

/** t54u: exact wordings with no documented product that contains a docked carrier. */
const T54U_CLEARED_FLAVOR = new Set([
  'berry flavoring',
  'vanilla flavoring',
  'natural flavoring',
  'organic vanilla flavoring',
]);

export function isT54uLimitedFlavorName(name: string): boolean {
  return T54U_LIMITED_FLAVOR.has(t54uFlavorKey(name));
}

export function isT54uClearedFlavorName(name: string): boolean {
  return T54U_CLEARED_FLAVOR.has(t54uFlavorKey(name));
}

function t55uToken(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const FISH_OIL_SPECIES = new Set([
  'cod',
  'anchovy',
  'anchovies',
  'jack',
  'pompano',
  'smelt',
  'salmon',
  'sardine',
  'sardines',
  'mackerel',
  'herring',
  'tuna',
  'menhaden',
  'and',
]);

/** t55u: printed Fish Oil, including a species parenthesis, maps to liquid fish oil. Not the powder. Not the Supplement Facts active. */
export function isFishOilInactiveMap(name: string): boolean {
  const n = t55uToken(name);
  if (/\bpowder\b|\bliver\b|\bconcentrate\b|\bester\b/.test(n)) return false;
  if (n === 'fish oil') return true;
  if (!n.startsWith('fish oil ')) return false;
  return n.slice('fish oil '.length).split(' ').every((word) => FISH_OIL_SPECIES.has(word));
}

/** t55u: "Natural color (named color)" . Not bare natural color. Not unspecified natural colors. */
export function isNaturalColorParenthesis(name: string): boolean {
  return /^natural colou?r\s*\([^)]+\)$/i.test(name.trim().replace(/\s+/g, ' '));
}

/** t55u exact Limited strings. They count toward the t137u stack. */
export function isT55uLimitedName(name: string): boolean {
  const n = t55uToken(name);
  return n === 'natural berry flavoring' || n === 'isomalto oligosaccharides';
}

/** Exact "Carob (color)". Square brackets are a different print. */
export function isCarobColor(name: string): boolean {
  return /^carob\s*\(\s*color\s*\)$/i.test(name.trim().replace(/\s+/g, ' '));
}

/** Exact "black carrot concentrate (color)". A comma is a different print. */
export function isBlackCarrotConcentrateColor(name: string): boolean {
  const raw = name.trim().replace(/\s+/g, ' ');
  if (/,/.test(raw)) return false;
  return /^black carrot concentrate\s*\(\s*color\s*\)$/i.test(raw);
}

/** t55u Cleared strings, including the mapped aliases. */
export function isT55uClearedName(name: string): boolean {
  const n = t55uToken(name);
  return (
    isCarobColor(name)
    || isBlackCarrotConcentrateColor(name)
    || n === 'thaumatin powder'
    || n === 'non gmo almond butter'
    || n === 'sodium hyaluronate hyaluronic acid'
    || isFishOilInactiveMap(name)
    || isNaturalColorParenthesis(name)
  );
}

function t56uRaw(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

/** t56u: "Yellow Bees Wax" maps to Yellow Beeswax. One word stays the older row. */
export function isYellowBeesWaxSpaced(name: string): boolean {
  return /^yellow bees wax$/i.test(t56uRaw(name));
}

/** t56u: the comma print maps to black carrot concentrate (color). The no-comma string stays t55u. */
export function isBlackCarrotCommaColor(name: string): boolean {
  return /^black carrot,\s*concentrate\s*\(\s*color\s*\)$/i.test(t56uRaw(name));
}

/** t56u: this flower-extract print maps to marigold extract. Not "Marigold extract (Tagetes erecta)". */
export function isMarigoldFlowerExtract(name: string): boolean {
  return /^marigold\s*\(\s*tagetes erecta\s*\)\s*flower extract$/i.test(t56uRaw(name));
}

/** t56u: the Hyalogic anti-sticking print. Not "(to prevent sticking)". */
export function isVegetableOilAntiSticking(name: string): boolean {
  return /^vegetable oil\s*\(\s*coconut\s*,\s*canola\s*\)\s*and carnauba leaf wax\s*\(\s*for anti-sticking\s*\)$/i.test(t56uRaw(name));
}

/** t56u exact Limited string. It counts toward the t137u stack. */
export function isT56uLimitedName(name: string): boolean {
  return /^organic natural flavor\s*\(\s*organic dextrose and natural flavors\s*\)$/i.test(t56uRaw(name));
}

function t57uRaw(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

/** t57u exact Limited strings. The parenthesis is part of the token. They count. */
export function isT57uLimitedName(name: string): boolean {
  const raw = t57uRaw(name);
  return (
    /^organic cashew milk powder\s*\(\s*organic cashew kernel\s*,\s*organic tapioca maltodextrin\s*\)$/i.test(raw)
    || /^organic cashew nut milk powder\s*\(\s*organic cashew kernel\s*,\s*organic tapioca maltodextrin\s*\)$/i.test(raw)
  );
}

/** t57u exact Cleared strings. Not Himalayan rock salt. Not the Limited cashew-powder prints. */
export function isT57uClearedName(name: string): boolean {
  const n = t55uToken(name);
  return n === 'organic cashew kernel' || n === 'himalayan pink salt' || n === 'himalayan salt';
}

/** t56u Cleared strings, including the mapped aliases. */
export function isT56uClearedName(name: string): boolean {
  const n = t55uToken(name);
  return (
    isYellowBeesWaxSpaced(name)
    || isBlackCarrotCommaColor(name)
    || isMarigoldFlowerExtract(name)
    || isVegetableOilAntiSticking(name)
    || n === 'peruvian cacao'
    || n === 'cocoa powder'
    || n === 'organic cacao powder'
    || n === 'cashew milk powder'
  );
}

/** t50u remain-Limited strings. Not vanilla flavor. Not natural vanilla powder. */
export function isT50uRemainLimitedVanillaFlavorName(name: string): boolean {
  const n = vanillaToken(name);
  return (
    n === 'natural vanilla flavor'
    || n === 'organic natural vanilla flavor'
  );
}

export function isTapiocaMaltodextrinName(name: string): boolean {
  const n = name.trim().toLowerCase();
  return (
    n === 'tapioca maltodextrin'
    || n === 'organic tapioca maltodextrin'
    || /^organic\s+tapioca\s+maltodextrin\b/.test(n)
    || /^tapioca\s+maltodextrin\b/.test(n)
  );
}

export function t141uMeth(): string {
  return `Methodology §5 Limited (Tapioca Maltodextrin — founder lock t141u Oct 20, 2026; ${T141U_PRIOR_REEVAL}; distinct from Cleared tapioca starch and from generic maltodextrin when the panel names tapioca source).`;
}

/** §5 Caution-row tokens stored as limited must not count toward the t137u stack (t141u). */
export function isMethodologyCautionStamp(source: string | undefined): boolean {
  if (!source) return false;
  if (/Methodology §5 Caution/i.test(source)) return true;
  if (/Moderate-risk/i.test(source) && !/founder lock t138u/i.test(source)) return true;
  if (/Founder graded this SKU Caution/i.test(source)) return true;
  return false;
}

const T106U_CAUTION = new Set([
  'milk protein concentrate',
  'nonfat dry milk powder',
  'steviol glycoside',
  'natural lemon and lime flavors with other natural flavors',
  'natural peach and mango flavors with other natural flavors',
  'natural raspberry and lemon flavors with other natural flavors',
  'caramel',
  'malt sugar',
  'natural fruit flavors',
  'natural mandarin orange flavor',
  'organic lemonade flavor',
  'organic lemon flavor',
  'menthyl lactate',
]);

/** t106u Caution locks. Do not stack. Not Steviol Glycosides plural. Not Nonfat Dry Milk. Not Organic Cassava Dextrin. */
export function isT106uCautionName(name: string): boolean {
  const n = name.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
  return T106U_CAUTION.has(n);
}

function t121uToken(name: string): string {
  return name.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}

/** t121u exact Cleared strings. Tapioca is the bare word, not syrup, starch, maltodextrin, or dextrin. */
export function isT121uClearedName(name: string): boolean {
  const n = t121uToken(name);
  return n === 'tapioca' || n === 'fair trade natural vanilla extract';
}

/** t122e exact Cleared strings. Menthol is the bare word only when the row stores Cleared. Natural Menthol still counts. */
export function isT122eClearedName(name: string, riskLevel?: string): boolean {
  const n = t121uToken(name);
  if (n === 'organic cassava dextrin') return true;
  if (n === 'illicium verum aniseed fruit seed oil') return true;
  if (n === 'commiphora myrrha myrrh oil') return true;
  if (n === 'menthol' && riskLevel === 'cleared') return true;
  return false;
}

/** t123e exact Cleared strings. The milk-powder parenthesis is one token. */
export function isT123eClearedName(name: string): boolean {
  const n = t121uToken(name);
  return (
    n === 'organic cinnamon powder'
    || n === 'peanut flour'
    || n === 'coconut milk powder coconut milk cassava dextrin'
    || n === 'organic coconut milk powder organic coconut milk cassava dextrin'
  );
}

/** t124e exact Cleared strings. The organic cassava parenthesis is one token. */
export function isT124eClearedName(name: string): boolean {
  const n = t121uToken(name);
  return (
    n === 'organic cocoa powder'
    || n === 'organic coconut milk powder organic coconut milk organic cassava dextrin'
  );
}

/** t121u exact Caution string. Does not count toward the t137u stack. */
export function isT121uCautionName(name: string): boolean {
  return t121uToken(name) === 'natural lemon balm citrus flavor';
}

/** Names that map to METH §5 Caution rows when mis-stored as limited (not exhaustive — source stamp wins). */
export function isMethCautionIngredientName(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (isPureVanillaExtractName(name)) return false;
  if (isT50uRemainLimitedVanillaFlavorName(name)) return false;
  if (isT51uLimitedName(name) || isT51uClearedName(name)) return false;
  if (isT55uLimitedName(name) || isT55uClearedName(name)) return false;
  if (isT56uLimitedName(name) || isT56uClearedName(name)) return false;
  if (isT57uLimitedName(name) || isT57uClearedName(name)) return false;
  if (isT51uCautionName(name)) return true;
  if (isT106uCautionName(name)) return true;
  if (isT121uCautionName(name)) return true;
  if (/huito extract/.test(n)) return true;
  if (n === 'natural vanilla powder') return true;
  if (/\brice flour\b/.test(n)) return true;
  if (/annatto/.test(n)) return true;
  if (/sodium lauryl sulfate|\bsls\b/.test(n)) return true;
  if (
    /^sugar$|^glucose$|^dextrose$|invert sugar|glucose syrup|corn syrup|beet sugar/.test(n)
    && !/organic cultured dextrose|tapioca dextrose/.test(n)
  ) {
    return true;
  }
  if (n === 'sugar alcohol') return true;
  if (/\bmaltitol\b|\bsorbitol\b|\bxylitol\b|\berythritol\b|\bmannitol\b|\bisomalt\b/.test(n)) {
    return true;
  }
  if (
    /\bbenzoate\b/.test(n)
    && !/polysorbate/.test(n)
    && !/sorbate\s*80|sorbate\s*60|sorbate\s*20/.test(n)
  ) {
    return true;
  }
  if (/\bpotassium benzoate\b|\bsodium benzoate\b/.test(n)) return true;
  if (/natural flavor|artificial flavor|flavor\)/.test(n) && !/^natural\s+[\w\s/&+-]+\s+flavor$/i.test(name.trim())) {
    if (n === 'natural flavors' || n === 'natural flavor') return false;
    if (n === 'artificial flavor' || n === 'artificial flavoring') return false;
    if (n.startsWith('natural and artificial')) return false;
    if (/^natural\s+[\w\s/&+-]+\s+flavor$/i.test(name.trim())) return false;
    return true;
  }
  if (/vegetable capsule|vegetarian capsule|veggie capsule|veggie softgel/.test(n) && !/hypromellose|hpmc|pullulan|tapioca starch/.test(n)) {
    return true;
  }
  if (/iron oxide|ferric oxide|titanium dioxide|talc\b/.test(n) && !/high|avoid/i.test(n)) {
    return false;
  }
  return false;
}

/** Limited-risk rows that may remain `limited` and count toward stack when not exempt. */
export function isMethLimitedIngredientName(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (isT51uLimitedName(name) || isT55uLimitedName(name) || isT56uLimitedName(name) || isT57uLimitedName(name)) return true;
  if (
    isT51uCautionName(name)
    || isT51uClearedName(name)
    || isT55uClearedName(name)
    || isT56uClearedName(name)
    || isT57uClearedName(name)
  ) return false;
  if (isTapiocaMaltodextrinName(name)) return true;
  if (n === 'ceteth-20' || n === 'ceteth 20') return true;
  if (n === 'chlorocresol') return true;
  if (/fractionated coconut and palm kernel oil/.test(n)) return true;
  if (/\bmaltodextrin\b/.test(n)) return true;
  if (/polydextrose/.test(n)) return true;
  if (/modified (corn |food )?starch|modified starch|food starch-modified|hydroxypropyl starch/.test(n)) {
    return true;
  }
  if (n === 'natural flavors' || n === 'natural flavor') return true;
  if (isT50uRemainLimitedVanillaFlavorName(name)) return true;
  if (n === 'artificial flavor' || n === 'artificial flavoring') return true;
  if (/natural and artificial flavor/.test(n) && !/s$/.test(n)) return true;
  if (/strawberry watermelon raspberry flavor/.test(n)) return true;
  if (/tapioca dextrin|tapioca powder|organic tapioca (powder|starch)|organic tapioca starch/.test(n)) {
    return true;
  }
  if (/^fructose$|organic fructose/.test(n)) return true;
  if (/rice extract/.test(n) && !/hull|bran|concentrate|protein|fiber/.test(n)) return true;
  if (/unspecified rice extract|rice extract blend/.test(n)) return true;
  if (/lemon oil/.test(n) && /flavor/.test(n)) return true;
  if (t138uFamilyLabel(name)) return true;
  if (isOralPropyleneGlycolName(name)) return true;
  if (n.replace(/[^a-z0-9]+/g, '') === 'gomct') return true;
  if (/\bmct\b|medium chain triglyceride/.test(n) && !/coconut|palm|from\s+\w+/i.test(name)) return true;
  if (n === 'triglycerides') return true;
  return false;
}

export function hasExplicitLimitedLockSource(source: string | undefined): boolean {
  if (!source) return false;
  if (/founder lock t138u|founder lock t141u/i.test(source)) return true;
  if (/MCT in a gummy — founder lock t132u/i.test(source)) return true;
  if (/Methodology §5 Limited/i.test(source) && !isMethodologyCautionStamp(source)) return true;
  return false;
}

/** §5 Caution-row names that must not stack even when a stale §5 Limited-risk stamp is on disk. */
export function isNeverStackLimitedName(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (n === 'natural flavors' || n === 'natural flavor') return false;
  if (isT50uRemainLimitedVanillaFlavorName(name)) return false;
  if (isT51uLimitedName(name) || isT55uLimitedName(name) || isT56uLimitedName(name) || isT57uLimitedName(name)) return false;
  if (n === 'artificial flavor' || n === 'artificial flavoring') return false;
  if (n === 'flavors' || n === 'flavor') return true;
  if (/\bsodium benzoate\b|\bpotassium benzoate\b/.test(n)) return true;
  if (/\bcitric acid\b|\bmalic acid\b|\btartaric acid\b/.test(n)) return true;
  if (/\bdicalcium phosphate\b|\btricalcium phosphate\b|\bsodium citrate\b/.test(n)) return true;
  if (/\bmicrocrystalline cellulose\b/.test(n)) return true;
  if (/\bdextrin\b/.test(n) && !/tapioca dextrin|maltodextrin/.test(n)) return true;
  if (/\bblue spirulina\b/.test(n)) return true;
  return isMethCautionIngredientName(name);
}

/** True only for Limited tokens that count toward t137u 3+ Avoid (t141u). */
export function ingredientCountsTowardLimitedStack(ingredient: IngredientFlag): boolean {
  if (ingredient.stackCountExempt) return false;
  if (isPureVanillaExtractName(ingredient.name)) return false;
  if (isT121uClearedName(ingredient.name) || isT121uCautionName(ingredient.name)) return false;
  if (isT122eClearedName(ingredient.name, ingredient.riskLevel)) return false;
  if (isT123eClearedName(ingredient.name)) return false;
  if (isT124eClearedName(ingredient.name)) return false;
  if (
    isT51uClearedName(ingredient.name)
    || isT55uClearedName(ingredient.name)
    || isT56uClearedName(ingredient.name)
    || isT57uClearedName(ingredient.name)
  ) return false;
  if (isT54uClearedFlavorName(ingredient.name)) return false;
  if (ingredient.riskLevel !== 'limited') return false;
  if (
    isT54uLimitedFlavorName(ingredient.name)
    && /t54u natural-flavor rule/i.test(ingredient.source ?? '')
  ) {
    return true;
  }
  if (isSiliconDioxideStackExempt(ingredient.name)) return false;

  const src = ingredient.source ?? '';
  if (isMethodologyCautionStamp(src)) return false;
  if (isNeverStackLimitedName(ingredient.name)) {
    if (t138uFamilyLabel(ingredient.name) && /founder lock t138u/i.test(src)) {
      // fall through — this tab is the t138u Limited token
    } else if (isOralPropyleneGlycolName(ingredient.name) && /founder lock t138u/i.test(src)) {
      // fall through
    } else {
      return false;
    }
  }

  if (/founder lock t141u/i.test(src) && isTapiocaMaltodextrinName(ingredient.name)) return true;
  if (/founder lock t138u/i.test(src) && (t138uFamilyLabel(ingredient.name) || isOralPropyleneGlycolName(ingredient.name))) {
    return true;
  }
  if (/MCT in a gummy — founder lock t132u/i.test(src)) return true;
  if (/Methodology §5 Limited/i.test(src)) return true;

  if (t138uFamilyLabel(ingredient.name)) return true;
  if (isOralPropyleneGlycolName(ingredient.name) && !isTopicalPgSource(src)) return true;
  if (isTapiocaMaltodextrinName(ingredient.name)) return true;
  if (isMethLimitedIngredientName(ingredient.name)) return true;

  return false;
}

function isTopicalPgSource(src: string): boolean {
  const s = src.toLowerCase();
  return (
    s.includes('topical form')
    || s.includes('nasal spray')
    || s.includes('does not score on this nasal')
    || s.includes('pgnasal')
  );
}

/** Demote mis-stored `limited` Caution tokens to moderate + stackCountExempt (t141u). */
export function shouldDemoteFalseLimited(ingredient: IngredientFlag): boolean {
  if (ingredient.riskLevel !== 'limited') return false;
  if (ingredient.stackCountExempt) return false;
  if (isSiliconDioxideStackExempt(ingredient.name)) return false;
  const src = ingredient.source ?? '';
  if (isNeverStackLimitedName(ingredient.name)) {
    if (t138uFamilyLabel(ingredient.name) && /founder lock t138u/i.test(src)) {
      return false;
    }
    if (isOralPropyleneGlycolName(ingredient.name) && /founder lock t138u/i.test(src)) {
      return false;
    }
    return true;
  }
  return !ingredientCountsTowardLimitedStack(ingredient);
}
