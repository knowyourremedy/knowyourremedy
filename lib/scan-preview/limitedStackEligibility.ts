import type { IngredientFlag } from '../ratingRecord';
import { isSiliconDioxideStackExempt } from './siliconDioxide';
import { isOralPropyleneGlycolName, t138uFamilyLabel } from './t138uLocks';

const T141U_PRIOR_REEVAL = '§4 prior-lock re-eval';

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

/** Names that map to METH §5 Caution rows when mis-stored as limited (not exhaustive — source stamp wins). */
export function isMethCautionIngredientName(name: string): boolean {
  const n = name.trim().toLowerCase();
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
  if (ingredient.riskLevel !== 'limited') return false;
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
