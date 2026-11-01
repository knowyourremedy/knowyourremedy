import type { IngredientFlag, RatingRecord, RiskLevel } from '../ratingRecord';
import {
  isPureVanillaExtractName,
  isT50uRemainLimitedVanillaFlavorName,
  isT51uCautionName,
  isT51uClearedName,
  isT51uLimitedName,
  isT54uClearedFlavorName,
  isT54uLimitedFlavorName,
  isT55uClearedName,
  isT55uLimitedName,
  isT56uClearedName,
  isT56uLimitedName,
  isT57uClearedName,
  isT57uLimitedName,
  isBlackCarrotCommaColor,
  isBlackCarrotConcentrateColor,
  isCarobColor,
  isFishOilInactiveMap,
  isMarigoldFlowerExtract,
  isNaturalColorParenthesis,
  isVegetableOilAntiSticking,
  isYellowBeesWaxSpaced,
  isT130eClearedName,
  isT130eLimitedName,
  isT131eClearedName,
  isT135eClearedName,
  isT136eClearedName,
  isT138eCautionName,
  isT138eClearedName,
  isT138eLimitedName,
  isT139eClearedName,
} from './limitedStackEligibility';
import {
  isT159uPaprikaColorClearedName,
  isT159uSteviaExtractLimitedName,
} from './t159uLocks';

// Shopper copy for the honest-note lock and the ingredient tab.
// Facts below are the ones already stated in docs/METHODOLOGY.md and docs/SOURCES.md.
// No new studies, doses, or grades.

function norm(value: string): string {
  return value.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function riskWord(level: RiskLevel): string {
  if (level === 'high') return 'High risk';
  if (level === 'moderate') return 'Moderate risk';
  if (level === 'limited') return 'Limited risk';
  return 'Cleared';
}

function close(fact: string, level: RiskLevel): string {
  return `${fact} That is why it is ${riskWord(level)}.`;
}

const UNNAMED_FLAVOR =
  'This is an unnamed flavor. The word hides the mixture, so you cannot see the solvents or the carriers. That is why it is Usable.';

const UNNAMED_FLAVOR_WORDS = new Set([
  'natural',
  'artificial',
  'flavor',
  'flavors',
  'flavour',
  'flavours',
  'and',
  'other',
  'with',
  'organic',
  'the',
  'a',
  'an',
  'of',
]);

function isUnnamedFlavor(name: string): boolean {
  return name.split(' ').every((word) => UNNAMED_FLAVOR_WORDS.has(word));
}

function unnamedFlavorWhy(level: RiskLevel): string {
  if (level === 'high') {
    return close('This is an unnamed flavor. The word hides the mixture, so you cannot see the solvents or the carriers.', level);
  }
  return UNNAMED_FLAVOR;
}

function namedFlavorWhy(food: string, level: RiskLevel, extra?: string): string {
  const aside = extra ? ` ${extra}` : '';
  const fact = `This flavor names ${food}. It is not a hidden flavor blend.${aside}`;
  if (level === 'high') return close(fact, level);
  return `${fact} That is why it is Usable.`;
}

function formWord(record: Pick<RatingRecord, 'form' | 'productName'>): string {
  const form = norm(`${record.form ?? ''} ${record.productName ?? ''}`);
  if (/\bsoftgel/.test(form)) return 'softgel';
  if (/\bcapsule/.test(form)) return 'capsule';
  if (/\b(cream|ointment|lotion|balm)\b/.test(form)) return 'cream';
  if (/\b(drop|drops)\b/.test(form)) return 'drop';
  if (/\b(gummy|gummies)\b/.test(form)) return 'gummy';
  if (/\b(lozenge|cough drop)\b/.test(form)) return 'lozenge';
  if (/\b(tablet|caplet|gelcap)\b/.test(form)) return 'tablet';
  const raw = (record.form ?? '').trim().toLowerCase();
  return raw || 'product';
}

function listPhrase(names: string[]): string {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function titleOil(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Seed and industrial oils that are Not clean in a gummy and not that rule in another form.
function seedOilLabel(name: string): string | null {
  const n = norm(name);
  if (!/\boil\b/.test(n) && !/fractionated coconut/.test(n)) return null;
  if (/lecithin|wax|phospholipid|glycerin|glycerine|glycerol|cellulose|capsule|starch|protein|sterol|fatty acid/.test(n)) {
    return null;
  }
  if (/fractionated coconut and palm kernel/.test(n)) return null;
  if (/fractionated coconut/.test(n)) return 'fractionated coconut oil';
  if (/sunflower/.test(n) && /\boil\b/.test(n)) return 'sunflower oil';
  if (/safflower/.test(n) && /\boil\b/.test(n)) return 'safflower oil';
  if (/soybean oil|\bsoy oil\b/.test(n)) return 'soybean oil';
  if (/canola/.test(n) && /\boil\b/.test(n)) return 'canola oil';
  if (/vegetable oil/.test(n)) return 'vegetable oil';
  if (/corn oil/.test(n)) return 'corn oil';
  if (/\bpalm oil\b/.test(n)) return 'palm oil';
  return null;
}

function differenceSentence(where: string, plural: boolean): string {
  const oil = plural ? 'The oils are' : 'The oil is';
  const they = plural ? 'they' : 'it';
  if (where === 'softgel') {
    return `This product is a softgel. ${oil} the fill that holds the vitamin, not a gummy you chew, so ${they} did not pull this grade down.`;
  }
  if (where === 'capsule') {
    return `This product is a capsule. ${oil} the fill inside the capsule, not a gummy you chew, so ${they} did not pull this grade down.`;
  }
  if (where === 'cream') {
    return `This product is a cream. ${oil} in the cream, not in a gummy you chew, so ${they} did not pull this grade down.`;
  }
  if (where === 'drop') {
    return `This product is a liquid drop. ${oil} the carrier in the drop, not a gummy you chew, so ${they} did not pull this grade down.`;
  }
  if (where === 'tablet') {
    return `This product is a tablet. ${oil} not the base of a gummy you chew, so ${they} did not pull this grade down.`;
  }
  if (where === 'lozenge') {
    return `This product is a lozenge. ${oil} not the base of a gummy you chew, so ${they} did not pull this grade down.`;
  }
  return `This product is not a gummy. ${oil} not the base of a gummy you chew, so ${they} did not pull this grade down.`;
}

export function contradictionHonestNote(record: RatingRecord): string | null {
  const sentences: string[] = [];
  const where = formWord(record);
  const oils = new Map<string, IngredientFlag>();
  const namedRice = new Set<string>();

  for (const ingredient of record.inactiveIngredients ?? []) {
    const oil = seedOilLabel(ingredient.name);
    if (oil && ingredient.riskLevel !== 'high') {
      oils.set(oil, ingredient);
    }
    const rice = namedRiceForm(ingredient.name);
    if (rice && ingredient.riskLevel === 'cleared') namedRice.add(rice);
  }

  if (oils.size > 0) {
    const labels = [...oils.keys()];
    const fractionated = labels.includes('fractionated coconut oil');
    const rest = labels.filter((label) => label !== 'fractionated coconut oil');
    if (fractionated) {
      sentences.push(
        'This is coconut oil, a named oil. It is Cleared in a gummy and in a capsule. This label lists fractionated coconut oil. That form is not the seed or vegetable oil this app flags in a gummy, so it did not pull this grade down.',
      );
    }
    if (rest.length > 0) {
      const subject = listPhrase(rest.map(titleOil));
      const plural = rest.length > 1;
      const be = plural ? 'are' : 'is';
      const pronoun = plural ? 'they are' : 'it is';
      sentences.push(
        `${subject} ${be} Not clean when ${pronoun} the base of a gummy. That is the form this app flags. ${differenceSentence(where, plural)}`,
      );
    }
  }

  if (namedRice.size > 0) {
    const named = listPhrase([...namedRice]);
    const plural = named.includes(' and ') || named.includes(', ');
    sentences.push(
      `Rice extract is flagged when the label does not name the form. That unnamed wording is what this app treats as the problem. This label names ${named}. ${plural ? 'Those named forms are' : 'That named form is'} not the vague extract, so the flag did not pull this grade down.`,
    );
  }

  if (sentences.length === 0) return null;
  return sentences.join(' ');
}

function namedRiceForm(name: string): string | null {
  const n = norm(name);
  if (!/\brice\b/.test(n)) return null;
  if (/flour|starch|syrup|protein|powder|oil|wax|dextrin|malt/.test(n)) return null;
  if (/\bhull/.test(n)) return 'rice hull';
  if (/bran (extract|concentrate)/.test(n) || /rice bran extract/.test(n) || /rice bran concentrate/.test(n)) {
    return 'rice bran';
  }
  if (/concentrate/.test(n) && !/\bextract\b/.test(n.replace('concentrate', ''))) return 'rice concentrate';
  if (/rice concentrate|whole rice concentrate/.test(n)) return 'rice concentrate';
  return null;
}

function isSyntheticDye(name: string): boolean {
  const n = norm(name);
  if (/dye free|dyefree|no dye|without dye|undyed/.test(n)) return false;
  return (
    /\bfd c/.test(n)
    || /\bd c\b/.test(n)
    || /aluminum lake|brilliant blue|sunset yellow|allura red|tartrazine|indigo carmine|erythrosine|fast green/.test(n)
    || /\b(red|yellow|blue|green) no \d/.test(n)
    || /\b(red|yellow|blue|green) \d+\b/.test(n)
  );
}

function isVagueRice(name: string): boolean {
  const n = norm(name);
  if (!/\brice\b/.test(n)) return false;
  if (namedRiceForm(name)) return false;
  if (/flour|starch|syrup|protein|oil|wax|hull|bran|concentrate|dextrin|fiber/.test(n)) return false;
  return /\brice extract\b/.test(n) || n === 'rice' || /\borganic rice\b/.test(n) || /\brice extract blend\b/.test(n);
}

export const FRUIT_VEGETABLE_JUICE_LOCK_SOURCE =
  'Methodology §5 Cleared (fruit and vegetable juice, puree, concentrate, and powder). Clean. Named or not. Sweetener or color. Not a sugar row. Not Usable. High fructose corn syrup stays its own row. Locked Oct 15, 2026.';

export const HYDROGENATED_OIL_LOCK_SOURCE =
  'Methodology §5 Avoid (hydrogenated cottonseed oil, hydrogenated soybean oil, hydrogenated vegetable oil, hydrogenated coconut oil, hydrogenated castor oil, and hydrogenated palm oil). The panel says hydrogenated. It does not say partial or fully. Partial is the banned form. Locked Oct 15, 2026; hydrogenated palm oil alias Oct 17, 2026 t107u.';

export const T111U_RICE_BRAN_LOCK_SOURCE =
  'Methodology §5 Cleared (organic rice bran / rice bran, unspecified bran). Founder override Oct 17, 2026 t111u; was Caution Sept 23, 2026.';

export const T111U_COCONUT_OIL_LOCK_SOURCE =
  'Methodology §5 Cleared (coconut oil, named, any form). Founder override Oct 17, 2026 t111u; the Sept 25, 2026 gummy-Avoid restamp is struck. Hydrogenated coconut oil stays Avoid.';

export function isT111uRiceBranLock(name: string): boolean {
  const n = norm(name);
  if (/extract|concentrate|\boil\b|wax|flour|protein/.test(n)) return false;
  return /^(organic )?rice br(a|ai)n$/.test(n);
}

export function isT111uCoconutOilLock(name: string): boolean {
  const n = norm(name);
  if (/hydrogenated|canola|palm|soy|sunflower|safflower|mct|medium chain|triglycer|caprylic|fractionated/.test(n)) {
    return false;
  }
  if (/cocos nucifera/.test(n) && /\boil\b/.test(n)) return true;
  return /\bcoconut\b/.test(n) && /\boil\b/.test(n);
}

export const T118U_SUCROSE_LOCK_SOURCE =
  'Methodology §5 Cleared (sucrose / Sucrose). Founder override Oct 17, 2026 t118u; was Limited.';

export const T118U_MCT_OIL_LOCK_SOURCE =
  'Methodology §5 Cleared (MCT oil — named capsule / softgel / tablet coating or fill). Founder override Oct 17, 2026 t118u; distinct from Limited unlabeled MCT.';

export const T118U_POMEGRANATE_POWDER_LOCK_SOURCE =
  'Methodology §5 Cleared (pomegranate powder / Pomegranate Powder). Founder override Oct 17, 2026 t118u; fruit-powder rule.';

export const T118U_DL_ALPHA_TOCOPHEROL_LOCK_SOURCE =
  'Methodology §5 Cleared (DL-Alpha Tocopherol / DL alpha tocopherol — mixed-tocopherols row). Founder override Oct 17, 2026 t118u.';

export const T118U_D_ALPHA_TOCOPHERYL_ACETATE_LOCK_SOURCE =
  'Methodology §5 Cleared (d-alpha Tocopheryl Acetate — DL-alpha tocopheryl acetate row). Founder override Oct 17, 2026 t118u.';

export const T120U_NATURAL_APPLE_FLAVOR_LOCK_SOURCE =
  'Methodology §5 Cleared (Natural Apple Flavor / natural apple flavor — named apple flavor). Founder override Oct 18, 2026 t120u; strikes flavor-row Caution mapping.';

export function isT120uNaturalAppleFlavorLock(name: string): boolean {
  return norm(name) === 'natural apple flavor';
}

export function t120uLockKind(name: string): 'naturalAppleFlavor' | null {
  if (isT120uNaturalAppleFlavorLock(name)) return 'naturalAppleFlavor';
  return null;
}

export function t120uLockSourceForKind(kind: 'naturalAppleFlavor'): string {
  if (kind === 'naturalAppleFlavor') return T120U_NATURAL_APPLE_FLAVOR_LOCK_SOURCE;
  return T120U_NATURAL_APPLE_FLAVOR_LOCK_SOURCE;
}

export const T121U_SPIRULINA_COLOR_LOCK_SOURCE =
  'Methodology §5 Cleared (spirulina (color) — named spirulina color). Founder override Oct 18, 2026 t121u; distinct from Caution spirulina (for color).';

export function isT121uSpirulinaColorLock(name: string): boolean {
  const n = norm(name);
  if (n.includes('extract') || n.includes('powder')) return false;
  if (/\bfor color\b/.test(n)) return false;
  if (/\bblue\b/.test(n)) return false;
  return n === 'spirulina color';
}

export function t121uLockKind(name: string): 'spirulinaColor' | null {
  if (isT121uSpirulinaColorLock(name)) return 'spirulinaColor';
  return null;
}

export function t121uLockSourceForKind(kind: 'spirulinaColor'): string {
  return T121U_SPIRULINA_COLOR_LOCK_SOURCE;
}

export function isT118uSucroseLock(name: string): boolean {
  return norm(name) === 'sucrose';
}

/** Exact panel token `MCT oil` only — not coconut MCT, not medium chain triglycerides alone. */
export function isT118uMctOilLock(name: string): boolean {
  return norm(name) === 'mct oil';
}

export function isT118uPomegranatePowderLock(name: string): boolean {
  return norm(name) === 'pomegranate powder';
}

export function isT118uDlAlphaTocopherolLock(name: string): boolean {
  const n = norm(name);
  if (/acetate|tocopheryl/.test(n)) return false;
  return n === 'dl alpha tocopherol';
}

export function isT118uDAlphaTocopherylAcetateLock(name: string): boolean {
  const n = norm(name);
  return n === 'd alpha tocopheryl acetate' || n === 'dl alpha tocopheryl acetate';
}

export function t118uLockKind(name: string): 'sucrose' | 'mctOil' | 'pomegranate' | 'dlTocopherol' | 'dTocopherylAcetate' | null {
  if (isT118uSucroseLock(name)) return 'sucrose';
  if (isT118uMctOilLock(name)) return 'mctOil';
  if (isT118uPomegranatePowderLock(name)) return 'pomegranate';
  if (isT118uDlAlphaTocopherolLock(name)) return 'dlTocopherol';
  if (isT118uDAlphaTocopherylAcetateLock(name)) return 'dTocopherylAcetate';
  return null;
}

export function t118uLockSourceForKind(
  kind: 'sucrose' | 'mctOil' | 'pomegranate' | 'dlTocopherol' | 'dTocopherylAcetate',
): string {
  switch (kind) {
    case 'sucrose':
      return T118U_SUCROSE_LOCK_SOURCE;
    case 'mctOil':
      return T118U_MCT_OIL_LOCK_SOURCE;
    case 'pomegranate':
      return T118U_POMEGRANATE_POWDER_LOCK_SOURCE;
    case 'dlTocopherol':
      return T118U_DL_ALPHA_TOCOPHEROL_LOCK_SOURCE;
    case 'dTocopherylAcetate':
      return T118U_D_ALPHA_TOCOPHERYL_ACETATE_LOCK_SOURCE;
  }
}

const HYDROGENATED_OIL_WHY =
  'The panel says hydrogenated. It does not say partial or fully. Partial is the form the agencies banned, because it is the trans-fat source. This app cannot tell which form is in the box, so the grade goes to the harder one. That is why it is High risk.';

// Five named hydrogenated oils. Lecithin is not an oil. Polyoxyl and PEG castor stay their own row.
export function isHydrogenatedOilLock(name: string): boolean {
  const n = norm(name);
  if (/lecithin|polyoxyl|\bpeg\b|polyethylene glycol/.test(n)) return false;
  return /hydrogenated (cottonseed|soybean|vegetable|coconut|castor|palm) oil/.test(n);
}

const FRUIT_VEGETABLE_JUICE_WHY = close(
  'This is fruit or vegetable juice, puree, concentrate, or powder. It is not a sugar, and it is not high fructose corn syrup.',
  'cleared',
);

export function isFruitVegetableJuiceLock(name: string): boolean {
  const n = norm(name);
  if (/high fructose/.test(n)) return false;
  if (/cane sugar/.test(n)) return false;
  if (/\bflavou?r/.test(n)) return false;
  if (/aloe/.test(n)) return false;
  if (/bioflavonoid/.test(n)) return false;
  if (/brown rice/.test(n)) return false;
  if (/whole food base/.test(n)) return false;
  if (/\brice\b/.test(n) && /concentrate|extract/.test(n)) return false;
  if (/lo han|monk fruit|mogroside/.test(n)) return false;
  if (/annatto|bixin|norbixin/.test(n)) return false;
  if (/\bextract\b/.test(n) && !/juice|puree/.test(n)) return false;
  if (/juice|puree/.test(n)) return true;
  if (/colou?rs? (added )?\(?from fruits? and vegetables?/.test(n)) return true;
  const fruit =
    /fruit|vegetable|carrot|cranberry|blueberry|raspberry|orange|lemon|grapefruit|apple|\bberry\b|grape|beet|cherry|elderberry|maqui|mango|peach|strawberry|blackberry|acerola|pomegranate|tomato/;
  return fruit.test(n) && /concentrate|powder/.test(n);
}

function t51uIngredientWhy(name: string, level: RiskLevel): string {
  const n = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (n === 'glucono delta lactone') {
    return close(
      'Glucono delta lactone is the same substance as gluconolactone. The founder locked this panel string Cleared (t51u). 21 CFR 184.1318 affirms it as GRAS with no limitation other than good manufacturing practice.',
      level,
    );
  }
  if (n === 'thaumatin') {
    return close(
      'Thaumatin is a sweetener protein. The founder locked this exact token Cleared (t51u). FDA GRAS notice GRN 738 closed with a letter that FDA has no questions. That letter is not an FDA affirmation. Thaumatin powder maps to this token.',
      level,
    );
  }
  if (n === 'liquid fish oil') {
    return close(
      'Liquid fish oil printed as an other ingredient is Cleared under founder lock t51u. It is a named marine oil, the same posture as fish oil powder. 21 CFR 184.1472 affirms menhaden oil as GRAS within the listed food uses. It is not fish oil powder, and it is not hydrogenated menhaden oil. Fish oil as the Supplement Facts active stays ungraded.',
      level,
    );
  }
  if (n === 'almond butter') {
    return close(
      'Almond butter is a named food. The founder locked this exact token Cleared (t51u). Rowanberry stays ungraded.',
      level,
    );
  }
  if (n === 'floli50') {
    return close(
      'Floli50 is an organic brown rice grain blend used as an anti-caking flow excipient. The founder locked it Cleared (t51u). It is not silicon dioxide, and it is not magnesium stearate.',
      level,
    );
  }
  if (n === 'vitamin c inactive') {
    return close(
      'Vitamin C (inactive) is ascorbic acid printed as an other ingredient. The founder locked that exact token Cleared (t51u). 21 CFR 182.3013 lists ascorbic acid as GRAS under good manufacturing practice. Vitamin C on the Supplement Facts panel stays ungraded.',
      level,
    );
  }
  if (n === 'zinc citrate') {
    return close(
      'Zinc citrate printed as an other ingredient is Cleared under founder lock t51u. It is the same inactive mineral-salt posture as zinc gluconate. Zinc as an active stays ungraded.',
      level,
    );
  }
  if (n === 'sodium hyaluronate') {
    return close(
      'Sodium hyaluronate printed as an other ingredient is Cleared under founder lock t51u. FDA GRAS notice GRN 976 closed because, at the notifier\'s request, FDA ceased to evaluate the notice. That is not a no-questions letter. Hyaluronic acid as an active stays ungraded.',
      level,
    );
  }
  if (n === 'd ribose') {
    return close(
      'D-ribose as an other ingredient is Caution under founder lock t51u. EFSA found it safe up to 36 mg/kg body weight per day, and this app cannot check that intake on the pack. FDA GRAS notice GRN 243 closed with a letter that FDA has no questions for use with an additional carbohydrate energy source. It does not count toward the three-or-more Limited stack. D-ribose as a Supplement Facts active stays ungraded.',
      level,
    );
  }
  if (n === 'myrrh oil') {
    return close(
      'Myrrh oil is Caution under founder lock t51u. FDA lists it as a flavoring agent under 21 CFR 172.510. An FDA flavor allow is not Clean. It is the same essential-oil posture as thyme oil. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }
  if (n === 'organic cane syrup') {
    return close(
      'Organic cane syrup is Caution under founder lock t51u. It is not Cleared cane sugar, and it is not Cleared organic sugar. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }
  if (n === 'malodextrin') {
    return close(
      'Malodextrin is the literal misspelling of maltodextrin. The founder locked that spelling Limited (t51u), the same grade as maltodextrin. It counts toward the three-or-more Limited stack. It is not tapioca maltodextrin.',
      level,
    );
  }
  if (n === 'berry flavoring') {
    return close(
      'Berry flavoring is an unnamed flavor. No documented product uses that exact wording with a Limited carrier or solvent. The t54u rule clears it. It is not natural berry flavor.',
      level,
    );
  }
  return close('The founder locked this exact token in t51u.', level);
}

function t55uIngredientWhy(name: string, level: RiskLevel): string {
  const n = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (n === 'natural berry flavoring') {
    return close(
      'Natural Berry Flavoring is a vague flavor. The founder locked this exact wording Limited (t55u). It is not berry flavoring.',
      level,
    );
  }
  if (n === 'isomalto oligosaccharides') {
    return close(
      'Isomalto-oligosaccharides are Limited under founder lock t55u. This spelling is not isomalt, and it is not Isomaltooligosaccharides (IMO). It counts toward the three-or-more Limited stack.',
      level,
    );
  }
  if (isCarobColor(name)) {
    return close(
      'Carob (color) is a named plant color. The founder locked that exact string Cleared (t55u). It is not carob powder.',
      level,
    );
  }
  if (isBlackCarrotConcentrateColor(name)) {
    return close(
      'Black carrot concentrate (color) is a named plant color. The founder locked that exact string Cleared (t55u). It is not a synthetic dye.',
      level,
    );
  }
  if (n === 'thaumatin powder') {
    return close(
      'Thaumatin powder is the same sweetener as thaumatin. The founder locked it Cleared (t55u). It maps to the thaumatin row. FDA GRAS notice GRN 738 closed with a letter that FDA has no questions.',
      level,
    );
  }
  if (isFishOilInactiveMap(name)) {
    return close(
      'Fish Oil printed as an other ingredient maps to liquid fish oil. The founder locked that string Cleared (t55u). It is a named marine oil. A species list in parentheses is part of this token. It is not fish oil powder. Fish oil as the Supplement Facts active stays ungraded.',
      level,
    );
  }
  if (n === 'non gmo almond butter') {
    return close(
      'Non-GMO Almond Butter maps to almond butter. The founder locked that string Cleared (t55u). It is a named food. Rowanberry stays ungraded.',
      level,
    );
  }
  if (n === 'sodium hyaluronate hyaluronic acid') {
    return close(
      'Sodium Hyaluronate (Hyaluronic Acid) maps to sodium hyaluronate. The founder locked that string Cleared (t55u). Hyaluronic acid as an active stays ungraded.',
      level,
    );
  }
  if (isNaturalColorParenthesis(name)) {
    return close(
      'This is a natural color, and the parenthesis names the color. The founder locked that parenthesis Cleared (t55u). It is not bare natural color.',
      level,
    );
  }
  return close('The founder locked this exact token in t55u.', level);
}

function t56uIngredientWhy(name: string, level: RiskLevel): string {
  const n = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (isYellowBeesWaxSpaced(name)) {
    return close(
      'Yellow Bees Wax maps to Yellow Beeswax. The founder locked that spaced print Cleared (t56u). It is not synthetic beeswax.',
      level,
    );
  }
  if (isBlackCarrotCommaColor(name)) {
    return close(
      'Black Carrot, Concentrate (Color) maps to black carrot concentrate (color). The founder locked that comma print Cleared (t56u). It is a named plant color.',
      level,
    );
  }
  if (isMarigoldFlowerExtract(name)) {
    return close(
      'Marigold (Tagetes erecta) Flower Extract maps to marigold extract. The founder locked this print Cleared (t56u). It is not the Caution string Marigold extract (Tagetes erecta).',
      level,
    );
  }
  if (isVegetableOilAntiSticking(name)) {
    return close(
      'Vegetable Oil (Coconut, Canola) and Carnauba Leaf Wax (for anti-sticking) is one print. The founder locked that exact string Cleared (t56u). The print that says “to prevent sticking” is a different string.',
      level,
    );
  }
  if (n === 'peruvian cacao') {
    return close(
      'Peruvian cacao is a named cacao. The founder locked that exact token Cleared (t56u). It is not cocoa powder.',
      level,
    );
  }
  if (n === 'cocoa powder') {
    return close(
      'Cocoa powder is the Sept 21 Cleared powder. The founder confirmed that exact token (t56u). It is not cocoa powder alkali, and it is not cocoa seed butter.',
      level,
    );
  }
  if (n === 'organic cacao powder') {
    return close(
      'Organic cacao powder is a named cacao powder. The founder locked that exact token Cleared (t56u). It is not cocoa powder, and it is not cocoa powder alkali.',
      level,
    );
  }
  if (n === 'cashew milk powder') {
    return close(
      'Cashew-milk powder is a named nut-milk powder. The founder locked that exact token Cleared (t56u). The hyphen and the space are the same print.',
      level,
    );
  }
  if (isT56uLimitedName(name)) {
    return close(
      'Organic Natural Flavor (Organic Dextrose and Natural Flavors) is a vague flavor. The parenthesis names organic dextrose and natural flavors. The founder locked that exact string Limited (t56u). It counts toward the three-or-more Limited stack.',
      level,
    );
  }
  return close('The founder locked this exact token in t56u.', level);
}

function t57uIngredientWhy(name: string, level: RiskLevel): string {
  const n = name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (/^organic cashew milk powder\s*\(\s*organic cashew kernel\s*,\s*organic tapioca maltodextrin\s*\)$/i.test(name.trim().replace(/\s+/g, ' '))) {
    return close(
      'Organic Cashew Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin) is one print. The parenthesis names Organic Cashew Kernel and Organic Tapioca Maltodextrin. The founder locked this exact string Limited (t57u). It counts toward the three-or-more Limited stack.',
      level,
    );
  }
  if (/^organic cashew nut milk powder\s*\(\s*organic cashew kernel\s*,\s*organic tapioca maltodextrin\s*\)$/i.test(name.trim().replace(/\s+/g, ' '))) {
    return close(
      'Organic Cashew Nut Milk Powder (Organic Cashew Kernel, Organic Tapioca Maltodextrin) is one print. The parenthesis names Organic Cashew Kernel and Organic Tapioca Maltodextrin. The founder locked this exact string Limited (t57u). It counts toward the three-or-more Limited stack.',
      level,
    );
  }
  if (n === 'organic cashew kernel') {
    return close(
      'Organic Cashew Kernel is a named nut. The founder locked that exact token Cleared (t57u).',
      level,
    );
  }
  if (n === 'himalayan pink salt') {
    return close(
      'Himalayan Pink Salt is a salt. The founder locked that exact token Cleared (t57u). It is not Himalayan rock salt.',
      level,
    );
  }
  if (n === 'himalayan salt') {
    return close(
      'Himalayan Salt is a salt. The founder locked that exact token Cleared (t57u). It is not Himalayan rock salt, and it is not Himalayan Pink Salt.',
      level,
    );
  }
  return close('The founder locked this exact token in t57u.', level);
}

function t139eWhy(name: string, level: RiskLevel): string {
  const n = norm(name);
  if (n === 'adhesive crafted with 10 mg caffeine per patch') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t139e). It does not count toward the three-or-more Limited stack. The full phrase is one token. It is not the exact word Adhesive, and it is not Adhesive Crafted with 25 mg caffeine per patch.`,
      level,
    );
  }
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t139e). It does not count toward the three-or-more Limited stack. The full phrase is one token. It is not the exact word Adhesive, and it is not Adhesive Crafted with 3 mg melatonin per patch.`,
    level,
  );
}

function t138eWhy(name: string, level: RiskLevel): string {
  const n = norm(name);
  if (isT138eLimitedName(name)) {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Limited (t138e). It counts toward the three-or-more Limited stack. It is not the Cleared token Acrylates Copolymer, and it is not Acrylates/ C10-30 Alkyl Acrylate Crosspolymer.`,
      level,
    );
  }
  if (isT138eCautionName(name)) {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Caution (t138e). It does not count toward the three-or-more Limited stack. Black cohosh printed as a Supplement Facts or Drug Facts active stays ungraded. This print is the inactive line.`,
      level,
    );
  }
  if (n === 'organic tart cherry flavor') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is a named tart cherry flavor. It is not the Limited token Natural Flavors.`,
      level,
    );
  }
  if (n === 'organic apple cider') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Organic Apple Cider Vinegar.`,
      level,
    );
  }
  if (n === 'organic cane alcohol') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Organic Cane Alcohol (45-55% by volume).`,
      level,
    );
  }
  if (n === 'organic cane alcohol 45 55 by volume') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). The parenthesis is part of this one token. It does not count toward the three-or-more Limited stack. It is not bare Organic Cane Alcohol.`,
      level,
    );
  }
  if (n === 'organic myceliated brown rice') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Organic Myceliated Oats, and it is not rice flour.`,
      level,
    );
  }
  if (n === 'pink salt') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Himalayan Pink Salt.`,
      level,
    );
  }
  if (n === 'organic stevia extract') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Stevia extract, it is not stevia leaf extract, and it is not Organic Stevia extract (REB A). Stevia extract and stevia leaf extract stay the Limited t159u row.`,
      level,
    );
  }
  if (n === 'organic stevia extract reb a') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). The parenthesis is part of this one token. It does not count toward the three-or-more Limited stack. It is not bare Stevia extract, and it is not the exact token organic Rebaudioside A.`,
      level,
    );
  }
  if (n === 'organic lemonade flavor powder') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not Organic Lemon Flavor.`,
      level,
    );
  }
  if (n === 'organic blue spirulina') {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. It is not bare blue spirulina, and it is not Spirulina Extract (for color).`,
      level,
    );
  }
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t138e). It does not count toward the three-or-more Limited stack. The full phrase is one token. It is not the exact word Adhesive.`,
    level,
  );
}

function t136eWhy(name: string, level: RiskLevel): string {
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t136e). It does not count toward the three-or-more Limited stack. It is the same material as Organic Rice Fiber (Nu-FLOW®). It is not that exact string, and it is not bare Organic Rice Fiber.`,
    level,
  );
}

function t135eWhy(name: string, level: RiskLevel): string {
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t135e). It does not count toward the three-or-more Limited stack. Natural Passionfruit Flavor, Natural Mango Flavor, Natural Pineapple Flavor, and Natural Peach Flavor are named fruit flavors. They are not the exact Limited token Natural Flavors. Malted Rice is not rice extract and it is not rice flour. Organic Rice Fiber (Nu-FLOW®) is not bare Organic Rice Fiber.`,
    level,
  );
}

function t131eWhy(name: string, level: RiskLevel): string {
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t131e). It does not count toward the three-or-more Limited stack. Crystallized Lemon (Citric Acid, Lemon Oil, Lemon Juice) is one token and it is not bare Crystallized Lemon. Hibiscus Extract & Carrot Extract (for color) is one token. Monkfruit Extract is not Monk Fruit Extract.`,
    level,
  );
}

function t130eWhy(name: string, level: RiskLevel): string {
  if (isT130eLimitedName(name)) {
    return close(
      `${name.trim()} is the exact printed string. The founder locked this token Limited (t130e). It counts toward the three-or-more Limited stack. Acrylates/ C10-30 Alkyl Acrylate Crosspolymer is not the Cleared token Acrylates Copolymer.`,
      level,
    );
  }
  return close(
    `${name.trim()} is the exact printed string. The founder locked this token Cleared (t130e). It does not count toward the three-or-more Limited stack. 80-92% Certified Organic Alcohol is not 80-92% By Volume Certified Organic Alcohol. Rebaudioside A (Stevia Leaf Extract) is not bare Rebaudioside A. Spirulina Extract (for color) is not spirulina (color) and it is not spirulina (for color).`,
    level,
  );
}

export function plainIngredientWhy(ingredient: IngredientFlag): string | null {
  let n = norm(ingredient.name);
  // Spellings the methodology already aliases onto a named row.
  n = n
    .replace(/gylcerin/g, 'glycerin')
    .replace(/glylcol/g, 'glycol')
    .replace(/pregelantinized/g, 'pregelatinized')
    .replace(/\bacadia\b/g, 'acacia')
    .replace(/paraban/g, 'paraben')
    .replace(/dioxyde/g, 'dioxide')
    .replace(/cellulosse/g, 'cellulose')
    .replace(/celluose/g, 'cellulose')
    .replace(/crosscarmellose/g, 'croscarmellose')
    .replace(/benazalkonium/g, 'benzalkonium')
    .replace(/carboxymethylcellulose/g, 'carboxymethyl cellulose')
    .replace(/^water purified$/, 'purified water')
    .replace(/^water usp$/, 'purified water')
    .replace(/^water aqua eau$/, 'water')
    .replace(/^water aqua$/, 'water')
    .replace(/^aqua$/, 'water')
    .replace(/^filtered water$/, 'water');
  if (n === 'tapioca') {
    return close(
      'Tapioca printed alone is the named starch food. The founder locked this exact token Cleared (t121u). It does not count toward the three-or-more Limited stack. It is not tapioca syrup, tapioca starch, tapioca maltodextrin, or tapioca dextrin.',
      ingredient.riskLevel,
    );
  }
  if (n === 'fair trade natural vanilla extract') {
    return close(
      'Fair Trade Natural Vanilla Extract is a named vanilla extract. The founder locked this exact token Cleared (t121u). It does not count toward the three-or-more Limited stack. It is not natural vanilla flavor, and it is not vanilla flavoring.',
      ingredient.riskLevel,
    );
  }
  if (n === 'natural lemon balm citrus flavor') {
    return close(
      'Natural Lemon Balm Citrus Flavor names lemon balm and citrus. The founder locked this exact token Caution (t121u). It does not count toward the three-or-more Limited stack. It is not the exact Limited natural flavors mixture, and it is not a single t54u fruit flavor.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic cassava dextrin') {
    return close(
      'Organic Cassava Dextrin is a named starch dextrin. The founder locked this exact token Cleared (t122e). It does not count toward the three-or-more Limited stack. It is not the plain-print Cassava Dextrin lock, and it is not tapioca dextrin.',
      ingredient.riskLevel,
    );
  }
  if (n === 'illicium verum aniseed fruit seed oil') {
    return close(
      'Illicium verum (Aniseed) Fruit/Seed Oil is a named aniseed oil. The founder locked this exact token Cleared (t122e). It does not count toward the three-or-more Limited stack. It is not an unnamed flavor.',
      ingredient.riskLevel,
    );
  }
  if (n === 'commiphora myrrha myrrh oil') {
    return close(
      'Commiphora myrrha (Myrrh) Oil is a named myrrh oil. The founder locked this exact token Cleared (t122e). It does not count toward the three-or-more Limited stack. It is not the Caution token Myrrh oil.',
      ingredient.riskLevel,
    );
  }
  if (n === 'menthol' && ingredient.riskLevel === 'cleared') {
    return close(
      'Menthol printed alone is a named cooling ingredient. The founder locked this exact token Cleared (t122e). It does not count toward the three-or-more Limited stack. It is not Natural Menthol, which stays the t42u Limited lock. It is not Menthol Lactate, and it is not Menthyl Lactate. Menthol printed as a Drug Facts active stays ungraded.',
      ingredient.riskLevel,
    );
  }
  if (isT139eClearedName(ingredient.name)) {
    return t139eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (isT138eClearedName(ingredient.name) || isT138eCautionName(ingredient.name) || isT138eLimitedName(ingredient.name)) {
    return t138eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (isT136eClearedName(ingredient.name)) {
    return t136eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (isT135eClearedName(ingredient.name)) {
    return t135eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (isT131eClearedName(ingredient.name)) {
    return t131eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (isT130eClearedName(ingredient.name) || isT130eLimitedName(ingredient.name)) {
    return t130eWhy(ingredient.name, ingredient.riskLevel);
  }
  if (n === 'cinnamon powder') {
    return close(
      'Cinnamon Powder is a named spice powder. The founder locked this exact token Cleared (t127e). It does not count toward the three-or-more Limited stack. It is not the exact token Cinnamon, and it is not Organic Cinnamon Powder.',
      ingredient.riskLevel,
    );
  }
  if (n === 'nutmeg powder') {
    return close(
      'Nutmeg Powder is a named spice powder. The founder locked this exact token Cleared (t127e). It does not count toward the three-or-more Limited stack. It is not the exact token Nutmeg.',
      ingredient.riskLevel,
    );
  }
  if (n === 'clove powder') {
    return close(
      'Clove Powder is a named spice powder. The founder locked this exact token Cleared (t127e). It does not count toward the three-or-more Limited stack. It is not clove oil.',
      ingredient.riskLevel,
    );
  }
  if (n === 'grape powder for color') {
    return close(
      'Grape Powder (for color) is a named grape color. The founder locked this exact token Cleared (t127e). The parenthesis is part of this one token. It does not count toward the three-or-more Limited stack. It is not Grape (fruit) Powder (for color).',
      ingredient.riskLevel,
    );
  }
  if (n === 'grape fruit powder for color') {
    return close(
      'Grape (fruit) Powder (for color) is a named grape color. The founder locked this exact token Cleared (t127e). Both parentheses are part of this one token. It does not count toward the three-or-more Limited stack. It is not Grape Powder (for color).',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic cinnamon powder') {
    return close(
      'Organic Cinnamon Powder is a named spice powder. The founder locked this exact token Cleared (t123e). It does not count toward the three-or-more Limited stack. It is not the exact token Cinnamon, and it is not cinnamon bark oil.',
      ingredient.riskLevel,
    );
  }
  if (n === 'peanut flour') {
    return close(
      'Peanut Flour is a named food flour. The founder locked this exact token Cleared (t123e). It does not count toward the three-or-more Limited stack. It is not peanut oil.',
      ingredient.riskLevel,
    );
  }
  if (n === 'coconut milk powder coconut milk cassava dextrin') {
    return close(
      'Coconut Milk Powder (Coconut Milk, Cassava Dextrin) is one printed token. The founder locked this exact string Cleared (t123e). It does not count toward the three-or-more Limited stack. Cassava Dextrin inside the parenthesis is not graded again, and it is not Organic Cassava Dextrin.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic coconut milk powder organic coconut milk cassava dextrin') {
    return close(
      'Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin) is one printed token. The founder locked this exact string Cleared (t123e). It does not count toward the three-or-more Limited stack. The Organic: prefix does not make a separate Organic Cassava Dextrin row. It is not Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin).',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic cocoa powder') {
    return close(
      'Organic Cocoa Powder is a named cocoa powder. The founder locked this exact token Cleared (t124e). It does not count toward the three-or-more Limited stack. It is not cocoa powder, and it is not organic cacao powder.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic coconut milk powder organic coconut milk organic cassava dextrin') {
    return close(
      'Organic Coconut Milk Powder (Organic: Coconut Milk, Organic Cassava Dextrin) is one printed token. The founder locked this exact string Cleared (t124e). It does not count toward the three-or-more Limited stack. Organic Cassava Dextrin inside the parenthesis is not graded again. It is not Organic Coconut Milk Powder (Organic: Coconut Milk, Cassava Dextrin).',
      ingredient.riskLevel,
    );
  }
  if (n === 'acrylates copolymer') {
    return close(
      'Acrylates copolymer is a named coating polymer. The founder locked this exact token Cleared (t112u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'adhesive') {
    return close(
      'Adhesive printed alone is the patch adhesive. The founder locked this exact token Cleared (t112u). It does not count toward the three-or-more Limited stack. A longer phrase that contains the word adhesive is not this lock.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic mullein extract') {
    return close(
      'Organic mullein extract is a named plant extract. The founder locked this exact token Cleared (t111u). It does not count toward the three-or-more Limited stack. It is not bare mullein extract.',
      ingredient.riskLevel,
    );
  }
  if (n === 'premium hemp extract') {
    return close(
      'Premium hemp extract is a named hemp extract. The founder locked this exact token Cleared (t111u). It does not count toward the three-or-more Limited stack. It is not industrial hemp extract, and it is not Adhesive.',
      ingredient.riskLevel,
    );
  }
  if (n === 'ashwagandha') {
    return close(
      'Ashwagandha printed alone is the named root. The founder locked this exact token Cleared (t111u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'passionflower') {
    return close(
      'Passionflower printed alone is the named flower. The founder locked this exact token Cleared (t111u). It does not count toward the three-or-more Limited stack. It is not passionflower powder.',
      ingredient.riskLevel,
    );
  }
  if (
    n === 'organic mullein oil'
    || n === 'organic garlic oil'
    || n === 'organic tea tree oil'
    || n === 'organic lavender oil'
  ) {
    return close(
      'This is a named organic plant oil. The founder locked this exact token Cleared (t108u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'essential oils of peppermint eucalyptus cajeput wintergreen juniper and clove') {
    return close(
      'This is the named Olbas oil blend. The founder locked this exact sentence Cleared (t108u). It does not count toward the three-or-more Limited stack. A different word order is not this lock.',
      ingredient.riskLevel,
    );
  }
  if (n === 'industrial hemp extract') {
    return close(
      'Industrial hemp extract is a named hemp extract. The founder locked this exact token Cleared (t108u). It does not count toward the three-or-more Limited stack. It is not Adhesive.',
      ingredient.riskLevel,
    );
  }
  if (n === 'menthol lactate') {
    return close(
      'Menthol lactate is a named cooling ester. The founder locked this exact token Cleared (t108u). It does not count toward the three-or-more Limited stack. It is not Menthyl Lactate, which stays Caution.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic natural color') {
    return close(
      'Organic natural color is a named color class. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not bare natural color.',
      ingredient.riskLevel,
    );
  }
  if (n === 'citrus orange bioflavonoids') {
    return close(
      'Citrus (Orange) Bioflavonoids names orange. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not unnamed citrus.',
      ingredient.riskLevel,
    );
  }
  if (n === 'citrus fiber') {
    return close(
      'Citrus fiber is a named fiber. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'gluten free oat flour') {
    return close(
      'Gluten-free oat flour is a named oat flour. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not oat fiber, and it is not bare oats.',
      ingredient.riskLevel,
    );
  }
  if (n === 'milk protein concentrate') {
    return close(
      'Milk protein concentrate is a milk protein. The founder locked this exact token Caution (t106u). It does not count toward the three-or-more Limited stack. It is not nonfat dry milk.',
      ingredient.riskLevel,
    );
  }
  if (n === 'nonfat dry milk powder') {
    return close(
      'Nonfat dry milk powder is Caution under founder lock t106u. It does not count toward the three-or-more Limited stack. It is not Nonfat Dry Milk, which stays the Limited lock and still counts.',
      ingredient.riskLevel,
    );
  }
  if (n === 'steviol glycoside') {
    return close(
      'Steviol glycoside, singular, is Caution under founder lock t106u. It does not count toward the three-or-more Limited stack. Steviol glycosides, plural, stays the Limited lock and still counts.',
      ingredient.riskLevel,
    );
  }
  if (
    n === 'natural lemon and lime flavors with other natural flavors'
    || n === 'natural peach and mango flavors with other natural flavors'
    || n === 'natural raspberry and lemon flavors with other natural flavors'
    || n === 'natural fruit flavors'
    || n === 'natural mandarin orange flavor'
    || n === 'organic lemonade flavor'
    || n === 'organic lemon flavor'
  ) {
    return close(
      'This flavor wording is Caution under founder lock t106u. It does not count toward the three-or-more Limited stack. It is not the exact Limited natural flavors mixture, and it is not a single t54u fruit flavor.',
      ingredient.riskLevel,
    );
  }
  if (n === 'policosanol') {
    return close(
      'Policosanol is a named plant wax alcohol. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'whole rice concentrate') {
    return close(
      'Whole rice concentrate names the rice form. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not the vague rice extract.',
      ingredient.riskLevel,
    );
  }
  if (n === 'caramel') {
    return close(
      'Caramel printed alone is Caution under founder lock t106u. It does not count toward the three-or-more Limited stack. It is not caramel color, and it is not caramel sugar syrup.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic rice concentrate') {
    return close(
      'Organic rice concentrate names the rice form. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not the vague rice extract.',
      ingredient.riskLevel,
    );
  }
  if (n === 'organic rice hulls') {
    return close(
      'Organic rice hulls are a named rice hull. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. It is not the vague rice extract.',
      ingredient.riskLevel,
    );
  }
  if (n === 'malt sugar') {
    return close(
      'Malt sugar is Caution under founder lock t106u. It does not count toward the three-or-more Limited stack. It is not bare sugar, and it is not maltodextrin.',
      ingredient.riskLevel,
    );
  }
  if (n === 'magnesium beta hydroxybutyrate') {
    return close(
      'Magnesium beta hydroxybutyrate is a named magnesium salt. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'menthyl lactate') {
    return close(
      'Menthyl lactate is a named cooling ester. The founder locked this exact token Caution (t106u). It does not count toward the three-or-more Limited stack. It is not menthol.',
      ingredient.riskLevel,
    );
  }
  if (n === 'blueberry extract') {
    return close(
      'Blueberry extract is a named fruit extract. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack.',
      ingredient.riskLevel,
    );
  }
  if (n === 'cassava dextrin') {
    return close(
      'Cassava dextrin is a named starch dextrin. The founder locked this exact token Cleared (t106u). It does not count toward the three-or-more Limited stack. Organic Cassava Dextrin is its own Cleared lock (t122e). It is not this plain print.',
      ingredient.riskLevel,
    );
  }
  const source = norm(ingredient.source ?? '');
  const level = ingredient.riskLevel;
  const juiceLockSource = /fruit and vegetable juice, puree, concentrate, and powder/i.test(ingredient.source ?? '');
  if (isFruitVegetableJuiceLock(ingredient.name) && (level !== 'cleared' || juiceLockSource)) {
    return FRUIT_VEGETABLE_JUICE_WHY;
  }
  if (isHydrogenatedOilLock(ingredient.name)) return HYDROGENATED_OIL_WHY;
  const oil = seedOilLabel(ingredient.name);

  if (/fractionated coconut and palm kernel oil/.test(n)) {
    return close(
      'Fractionated coconut and palm kernel oil is a combined oil. The founder locked it Limited (t150u). It is not the Cleared fractionated coconut oil row, and it is not named medium-chain triglycerides from palm kernel oil.',
      level,
    );
  }

  if (n === 'colored with red cabbage color') {
    return close(
      'Named plant color (red cabbage anthocyanin). Not an unnamed color and not a synthetic dye. The founder locked this exact token Cleared (t83u).',
      level,
    );
  }

  if (n === 'normal saline') {
    return close(
      '0.9% sodium chloride aqueous vehicle. Same Cleared sodium-chloride family. The founder locked this exact token Cleared (t83u).',
      level,
    );
  }

  if (n === 'grape alcohol') {
    return close(
      'Named grape-derived alcohol vehicle. Not bare alcohol and not a drinking-alcohol dose. The founder locked this exact token Cleared (t84u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (
    n === 'blackcurrant and carrot extract as color'
    || n === 'natural flavouring'
    || n === 'colouring foods carrot and blackcurrant concentrate'
    || n === 'color added red cabbage'
  ) {
    return close(
      'Named plant color. Not an unnamed color and not a synthetic dye. The founder locked this exact token Cleared (t84u). Same named plant-color family as Colored with Red Cabbage Color when the panel names red cabbage. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'l glycine') {
    return close(
      'L-Glycine is an amino acid. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'potassium gluconate' || n === 'calcium citrate') {
    return close(
      'Named mineral salt. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'organic mixed berry powder') {
    return close(
      'Named fruit powder. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'stabilized rice bran') {
    return close(
      'Named rice bran. Maps to the rice-bran / rice-hull fiber family. Distinct from the Limited rice extract. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'organic rice fiber' || n === 'rice fiber') {
    return close(
      'Exact named fiber. Maps to the Cleared rice-hull / rice-fiber family. Distinct from the Limited rice extract. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'natural peppermint') {
    return close(
      'Named natural peppermint flavor. No Limited carrier is named on this token. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (
    n === 'elderberry fruit extract'
    || n === 'elderberry sambucus nigra fruit extract'
    || n === 'slippery elm bark extract'
    || n === 'wild cherry bark extract'
    || n === 'organic slippery elm bark powder'
    || n === 'organic slippery elm powder'
  ) {
    return close(
      'Named plant-part extract or powder used as an inactive. The founder locked this exact token Cleared (t84u).',
      level,
    );
  }

  if (n === 'clove bud oil') {
    return close(
      'Named essential oil (clove bud). Not a seed oil in a gummy. The founder locked this exact token Caution (t84u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'brazzein' || n === 'brazzein oubli fruit sweet protein') {
    return close(
      'Sweet protein (brazzein). The founder locked this exact token Caution (t84u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'thaumatin katemfe fruit extract') {
    return close(
      'Named sweet protein from katemfe fruit. The founder locked this exact token Cleared (t87u). It is not bare thaumatin and it is not thaumatin powder. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'thaumatin powder katemfe fruit extract') {
    return close(
      'Thaumatin Powder (Katemfe Fruit Extract) is the same sweetener as the prior Thaumatin lock. The parenthesis names katemfe fruit. The founder locked this exact token Cleared (t98u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === '27 grape alcohol solution') {
    return close(
      '27% grape alcohol solution is the liquid that carries a Bach flower remedy. The founder locked this exact token Caution (t98u). It is not the Cleared Grape Alcohol token. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === '27 alcohol') {
    return close(
      '27% alcohol is the alcohol vehicle printed on this bottle. The founder graded this print with the existing t98u Caution lock for 27% grape alcohol solution. It is not the Limited Alcohol vehicle on the Rescue spray. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'whole milk powder') {
    return close(
      'Whole milk powder is whole dry milk. The founder locked whole dry milk Cleared (Oct 15, 2026). It is milk. It is not non-fat dry milk.',
      level,
    );
  }

  if (n === 'unsweetened chocolate') {
    return close(
      'Unsweetened chocolate is the chocolate food named inside the milk chocolate. It is not cocoa powder, and it is not cocoa extract.',
      level,
    );
  }

  if (n === 'nonfat dry milk' || n === 'non fat dry milk') {
    return close(
      'Nonfat dry milk is the Sept 21, 2026 Limited lock. It is an allergen disclosure, not a High risk listing. It is not whole dry milk, and it is not skim milk powder. It counts toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'milkfat' || n === 'milk fat') {
    return close(
      'Milkfat is the butterfat of milk. It is not a seed oil, and it is not vegetable oil.',
      level,
    );
  }

  if (n === 'rice starch') {
    return close(
      'Rice starch names the plant. It is a simple starch, in the same family as corn starch. It is not Organic Rice Starch, which is the Limited modified-starch row.',
      level,
    );
  }

  if (n === 'cocoa extract') {
    return close(
      'Cocoa extract is not Cleared cocoa powder. The cocoa powder lock says the powder is distinct from the extract. A named food extract that is not the powder stays Caution, the same posture as Carob Extract. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (
    n === 'beeswax'
    || n === 'shea butter'
    || n === 'grapeseed oil'
    || n === 'sustainable palm kernel oil'
    || n === 'xanthan gum'
    || n === 'medium chain triglycerides from coconut rapeseed oil'
    || n === 'elder extract'
    || n === 'elderflower extract'
    || n === 'red cabbage extract'
    || n === 'black carrot extract'
    || n === 'elderberry concentrate as color'
    || n === 'vegetable juice color from paprika carrot'
    || n === 'fruit vegetable juice color from carrot cherry'
    || n === 'bilberry concentrate'
    || n === 'blackcurrant concentrate'
    || n === 'strawberry concentrate'
    || n === 'watermelon concentrate as flavor'
    || n === 'cranberry concentrate'
  ) {
    return close(
      n === 'cranberry concentrate'
        ? 'Cranberry concentrate is a named plant concentrate. The founder locked this exact token Cleared (t99u). It is not cranberry (as flavor). It does not count toward the three-or-more Limited stack.'
        : 'The founder locked this exact token Cleared (t98u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (
    n === 'natural mixed berry flavor'
    || n === 'organic black cherry flavor'
    || n === 'organic fruit punch flavor'
    || n === 'cranberry as flavor'
    || n === 'lemon as flavor'
    || n === 'black currant as flavor'
    || n === 'elderflower as flavor'
    || n === 'orange as flavor'
    || n === 'turmeric'
    || n === 'turmeric as flavor color'
    || n === 'caprylyl glycol'
    || n === 'cetearyl alcohol'
    || n === 'cetyl palmitate'
    || n === 'glyceryl stearate citrate'
    || n === 'isopropyl palmitate'
    || n === 'potassium sorbate'
  ) {
    return close(
      'The founder locked this exact token Caution (t98u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'natural flavors menthol vanilla peppermint and spearmint essential oils and citral') {
    return close(
      'Essential-oil and scent line. The parenthesis names menthol, vanilla, peppermint, spearmint essential oils, and citral. The superscript 1 means organic and does not change the grade. The founder locked this exact token Caution (t87u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (
    n === 'quercetin dihydrate'
    || n === 'quercetin dihydrate from sophora japonica extract'
    || n === 'l selenomethionine'
  ) {
    return close(
      'Inactive on this panel. The founder locked this exact token Caution (t84u). It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'sodium hypochlorite') {
    return close(
      'Sodium hypochlorite is a residual oxidizer. The founder locked this exact token Caution (t16u). An FDA allow is not Clean. It is not the wound-wash token Sodium Hypochlorite (Trace).',
      level,
    );
  }

  if (n === 'lactase enzyme') {
    return close(
      'Lactase enzyme is a food enzyme used as an excipient. The founder locked it Cleared (t22u). FDA lists lactase enzyme preparation as GRAS (21 CFR 184.1388). It is not invertase, which stays its own Cleared row.',
      level,
    );
  }

  if (n === 'sugar alcohol') {
    return close(
      'Sugar alcohol printed as a class name is Caution under founder lock t22u. The polyol is not named. Large amounts of sugar alcohols can upset the gut. It does not count toward the three-or-more Limited stack. Xylitol, mannitol, sorbitol, and isomalt stay their own rows.',
      level,
    );
  }

  if (n === 'colors') {
    return close(
      'Colors printed alone is Caution under founder lock t22u. The label does not name the color. That is the same unnamed-color Caution as Natural Color and bare color added. It is not a named juice, and it is not a named synthetic dye. It does not count toward the three-or-more Limited stack.',
      level,
    );
  }

  if (n === 'fish oil powder') {
    return close(
      'Fish oil powder printed as an other ingredient is Cleared under founder lock t24u. It is a named marine oil used as a carrier. The named-fill rule clears a named oil used as fill, and fish oil is not a seed or vegetable oil. Fish oil printed as the Supplement Facts active stays ungraded.',
      level,
    );
  }

  if (isT57uClearedName(ingredient.name) || isT57uLimitedName(ingredient.name)) {
    return t57uIngredientWhy(ingredient.name, level);
  }

  if (isT56uClearedName(ingredient.name) || isT56uLimitedName(ingredient.name)) {
    return t56uIngredientWhy(ingredient.name, level);
  }

  if (isT55uClearedName(ingredient.name) || isT55uLimitedName(ingredient.name)) {
    return t55uIngredientWhy(ingredient.name, level);
  }

  if (isT51uClearedName(ingredient.name) || isT51uCautionName(ingredient.name) || isT51uLimitedName(ingredient.name)) {
    return t51uIngredientWhy(ingredient.name, level);
  }

  if (n === 'digestion resistant maltodextrin') {
    return close(
      'Digestion-resistant maltodextrin is Limited under founder lock t16u. It counts toward the three-or-more Limited stack. It is not generic maltodextrin, and it is not soluble corn fiber.',
      level,
    );
  }

  if (n === 'steviol glycosides' && (level === 'limited' || /t16u/i.test(ingredient.source ?? ''))) {
    return close(
      'Steviol glycosides printed without high-purity are Limited under founder lock t16u (Oct 22, 2026). They count toward the three-or-more Limited stack. High-purity steviol glycosides stay Cleared.',
      level,
    );
  }

  if (n === 'rice maltodextrin') {
    return close(
      'Rice maltodextrin is Limited under founder lock t16u. The panel names rice. It counts toward the three-or-more Limited stack. It is not generic maltodextrin, and it is not tapioca maltodextrin.',
      level,
    );
  }

  if (n === 'acacia hydrolysate') {
    return close(
      'Acacia hydrolysate is a fiber. The founder locked it Cleared (t16u). It is not acacia gum.',
      level,
    );
  }

  if (n === 'rebaudioside a' && (level === 'limited' || /t16u/i.test(ingredient.source ?? ''))) {
    return close(
      'Rebaudioside A printed without organic or extracted is Limited under founder lock t16u. It counts toward the three-or-more Limited stack. Organic Rebaudioside A stays Cleared.',
      level,
    );
  }

  if (n === 'oat bran') {
    return close(
      'Oat bran is a food bran. The founder locked it Cleared (t16u). It is not the exact token Oats, and it is not oat fiber.',
      level,
    );
  }

  if (n === 'larch arabinogalactan') {
    return close(
      'Larch arabinogalactan is a fiber. The founder locked it Cleared (t16u). It is not a mushroom active.',
      level,
    );
  }

  if (n === 'wheat dextrin') {
    return close(
      'Wheat dextrin is a fiber. The founder locked that exact token Cleared (t16u) when it is an other ingredient. It is not bare dextrin.',
      level,
    );
  }

  if (n === 'trehalose') {
    return close(
      'Trehalose is a sugar. The founder locked it Cleared (t16u). It is not sucrose, and it is not maltose.',
      level,
    );
  }

  if (n === 'palm kernel oil') {
    return close(
      'Palm kernel oil printed alone in a yogurt coating is Caution under founder lock t16u. It does not count toward the three-or-more Limited stack. It is not the Limited combined coconut-and-palm-kernel oil, and it is not named medium-chain triglycerides from palm kernel oil.',
      level,
    );
  }

  if (n === 'whey powder') {
    return close(
      'Whey powder is a dairy powder. The founder locked it Cleared (t16u). It is not the exact token Whey.',
      level,
    );
  }

  if (n === 'skim milk powder') {
    return close(
      'Skim milk powder is a dairy powder. The founder locked it Cleared (t16u). It is not non-fat dry milk.',
      level,
    );
  }

  if (n === 'yogurt powder') {
    return close(
      'Yogurt powder is a dairy powder. The founder locked it Cleared (t16u).',
      level,
    );
  }

  if (isPureVanillaExtractName(n)) {
    return close(
      'Pure vanilla extract lists only the extract, alcohol, and water. No optional ingredients are declared. Residual alcohol is the solvent and is not docked. The founder locked it Cleared (t50u).',
      level,
    );
  }

  if ((isT54uClearedFlavorName(ingredient.name) || isT54uClearedFlavorName(n)) && level === 'cleared') {
    return close(
      'No documented product that uses this exact flavor wording contains propylene glycol, glycerin, maltodextrin, polyethylene glycol, or a blended natural flavor. The t54u rule clears it.',
      level,
    );
  }

  if (
    (isT54uLimitedFlavorName(ingredient.name) || isT54uLimitedFlavorName(n) || isT50uRemainLimitedVanillaFlavorName(n))
    && level === 'limited'
  ) {
    return close(
      'This flavor is vague. A Limited carrier is present on the panel.',
      level,
    );
  }

  if (n === 'vanilla') {
    return close(
      'Vanilla printed alone is Caution under founder lock t16u. It does not count toward the three-or-more Limited stack. It is not vanilla flavor, and it is not the Limited natural flavors mixture.',
      level,
    );
  }

  if (n === 'inulin syrup') {
    return close(
      'Inulin syrup is a fiber syrup. The founder locked it Cleared (t16u). It is not inulin, and it is not inulin powder.',
      level,
    );
  }

  if (/medium chain triglyceride/.test(n) && /coconut/.test(n)) {
    return close(
      'This label names medium-chain triglycerides from coconut. That named plant source is Cleared. It is not unlabeled MCT.',
      level,
    );
  }

  if (/aspartame|nutrasweet|\be951\b/.test(n)) {
    return 'Aspartame is a sweetener. In 2023, the World Health Organization\'s cancer research agency classified it as possibly carcinogenic to humans. That is why it is High risk.';
  }

  if (isSyntheticDye(ingredient.name)) {
    return close(
      'This is a synthetic dye. European labels warn that this dye family can affect activity and attention in children.',
      level === 'high' ? 'high' : level,
    );
  }

  if (/paraben/.test(n)) {
    return close(
      'This is a paraben preservative. The European Union banned propylparaben in food, and it classes some parabens as able to disrupt hormones. The same flag applies in creams and patches.',
      level === 'high' ? 'high' : level,
    );
  }

  if (/titanium dioxide|titanium oxide|\be171\b/.test(n)) {
    return close(
      'Titanium dioxide is a white color. In 2022 the European Union stopped allowing it in food after its food-safety agency could not rule out damage to DNA.',
      level === 'high' ? 'high' : level,
    );
  }

  if (/\btalc\b/.test(n) || n === 'magnesium silicate') {
    return close(
      'Talc is a mineral powder. The World Health Organization\'s cancer research agency classifies talc as probably carcinogenic to humans.',
      level === 'high' ? 'high' : level,
    );
  }

  if (/butylated hydroxyanisole|\bbha\b|\be320\b/.test(n)) {
    return close(
      'BHA is a preservative. The U.S. National Toxicology Program lists it as reasonably anticipated to be a human carcinogen, and California lists it under Proposition 65.',
      level,
    );
  }

  if (/butylated hydroxytoluene|\bbht\b|\be321\b/.test(n)) {
    return close(
      'BHT is a preservative. The European Union restricted it in 2022 because it can disrupt hormones.',
      level,
    );
  }

  if (/propyl gallate|\be310\b/.test(n)) {
    return close(
      'Propyl gallate is a preservative. A 2018 study found it can disrupt hormones, on its own and mixed with BHA and BHT.',
      level,
    );
  }

  if (/brominated vegetable|\bbvo\b|brominated soybean/.test(n)) {
    return close(
      'Brominated vegetable oil is a food additive the United States banned in 2024. It can build bromine up in body tissue.',
      level,
    );
  }

  if (/diazolidinyl urea|imidazolidinyl urea|dmdm hydantoin|quaternium 15|bronopol|bronidox/.test(n)) {
    return close(
      'This preservative can release formaldehyde.',
      level,
    );
  }

  if (/methylisothiazolinone|\bmit\b/.test(n)) {
    return close(
      'Methylisothiazolinone is a preservative used in leave-on creams.',
      level,
    );
  }

  if (/caramel/.test(n) && !/sugar syrup|caramel sugar/.test(n) && level === 'high') {
    return close(
      'This is caramel color, and the label does not name a class that is free of ammonia. The ammonia process can leave 4-MEI, which the World Health Organization\'s cancer research agency classifies as possibly carcinogenic.',
      'high',
    );
  }

  if (/blend of oils/.test(n) && /coconut|palm/.test(n)) {
    return 'This blend can be coconut oil, palm oil, or both. Palm oil is Not clean when it is the base of a gummy. That is the form this app flags. That is why it is ' + riskWord(level) + '.';
  }

  if (isT111uCoconutOilLock(ingredient.name)) {
    return close(
      'This is coconut oil, a named oil. It is not the seed or vegetable oil this app flags in a gummy.',
      level,
    );
  }

  if (isT111uRiceBranLock(ingredient.name)) {
    return close(
      'This is rice bran, a named rice-plant fiber used as a filler or flow agent. It is not the vague rice extract that leaves the form unnamed.',
      level,
    );
  }

  if (/boron glycinate/.test(n)) {
    return close(
      'Boron glycinate is a boron mineral salt. Sources call boron safe within a daily upper limit, and this app cannot check your total intake.',
      level,
    );
  }

  if (oil) {
    if (oil === 'corn oil' && /wafer|t156u/i.test(`${ingredient.source ?? ''} ${ingredient.name}`) && level !== 'high') {
      return close(
        'Corn oil in a fiber wafer is Cleared. The founder locked that form (t156u). Gummy corn oil stays Not clean. A wafer is not that gummy form.',
        level,
      );
    }
    if (oil === 'fractionated coconut oil') {
      return 'This is coconut oil, a named oil. It is Cleared in a gummy and in a capsule. Fractionated coconut oil is not the seed or vegetable oil this app flags in a gummy, so it did not pull this grade down.';
    }
    if (level === 'high') {
      if (oil === 'vegetable oil') {
        return 'Vegetable oil is Not clean when it is the base of a gummy, a lozenge, or a chew. That is the form this app flags. That is why it is High risk.';
      }
      return `${titleOil(oil)} is Not clean when it is the base of a gummy. That is the form this app flags. That is why it is High risk.`;
    }
    return `${titleOil(oil)} is Not clean when it is the base of a gummy. That is the form this app flags. In this product the oil is not a gummy you chew, so it did not pull this grade down.`;
  }

  if (/dipropylene glycol/.test(n)) {
    return 'Dipropylene glycol is a cousin of propylene glycol. It is not propylene glycol. That is why it is Usable.';
  }

  if (/peg 75 shea|shea butter glycerides/.test(n)) {
    return 'Shea in a cream is Cleared. The PEG is the process. That is why it is Usable.';
  }

  if (/polyoxyl 15 hydroxystearate/.test(n)) {
    return 'Polyoxyl 15 hydroxystearate is a USP excipient. The Cosmetic Ingredient Review says hydroxystearic acid is safe when the formula is non-irritating. This app does not have that formula. It cannot confirm the condition, so the grade drops one level. That is why it is Usable.';
  }

  if (/ppg 12 buteth 16|peg 12 buteth 16/.test(n)) {
    return 'The Cosmetic Ingredient Review says this ingredient is safe when the formula is non-irritating. This app does not have that formula. It cannot confirm the condition, so the grade drops one level. That is why it is Usable.';
  }

  if (/octyldodecanol/.test(n)) {
    return 'The Cosmetic Ingredient Review says octyldodecanol is safe as used. EWG rates it low. That is why it is Usable.';
  }

  if (/benzethonium chloride/.test(n)) {
    return 'Benzethonium chloride does the same job as benzalkonium chloride. The Cosmetic Ingredient Review says it is safe at 0.5% on skin. That percent is how it is used. That is why it is Usable.';
  }

  if (/starch acrylates acrylamide copolymer/.test(n)) {
    return 'Starch/acrylates/acrylamide copolymer maps to polyacrylamide. That is why it is Usable.';
  }

  if (/stearalkonium hectorite/.test(n)) {
    return 'The Cosmetic Ingredient Review says stearalkonium hectorite is safe as used. That is why it is Usable.';
  }

  if (/dimethyl ether/.test(n)) {
    return 'Dimethyl ether is a spray propellant. It has low toxicity. That is why it is Usable.';
  }

  if (/silica dimethyl silylate/.test(n)) {
    return 'The Cosmetic Ingredient Review says silica dimethyl silylate is safe when the final product is not irritating or sensitizing to the respiratory tract. This app does not have that formula. It cannot confirm the condition, so the grade drops one level. That is why it is Usable.';
  }

  if (/cyclomethicone/.test(n)) {
    return 'The Cosmetic Ingredient Review says cyclomethicone is safe as used. Europe restricts the D4 impurity. That is why it is Usable.';
  }

  if (/dimethicone vinyl dimethicone crosspolymer|vinyl dimethicone methicone silsesquioxane crosspolymer/.test(n)) {
    return 'The Cosmetic Ingredient Review says this silicone crosspolymer is safe as used. That is why it is Usable.';
  }

  if (/polyoxyl lauryl ether|polyoxyl stearyl ether|polyoxyethylene \(23\) cetyl ether|polyoxyl 20 cetostearyl ether/.test(n)) {
    return 'This is in the polyoxyl family. That is why it is Usable.';
  }

  if (/propylene glycol dicaprylate/.test(n)) {
    return 'Propylene glycol dicaprylate is its own ingredient. It is not the swallowed propylene glycol. That is why it is Usable.';
  }

  if (/cetyl palmitate/.test(n)) {
    return close('Cetyl palmitate is a wax ester in the fatty-alcohol family.', level);
  }

  if (/decyl glucoside|capramidopropyl betaine|cocamidopropyl betaine/.test(n)) {
    return 'The source says this ingredient is safe when the formula is non-irritating. This app does not have that formula. It cannot confirm the condition, so the grade drops one level. That is why it is Usable.';
  }

  if (/carbomer interpolymer/.test(n)) {
    if (level === 'cleared') {
      return 'Carbomer interpolymer is a thickener in the carbomer family. The Cosmetic Ingredient Review says it is safe as used. The European Food Safety Authority set an acceptable daily intake. That is why it is Cleared.';
    }
    return 'Carbomer interpolymer is a thickener in the carbomer family. The Cosmetic Ingredient Review says it is safe as used, and also when the formula is non-irritating. This app does not have that formula. It cannot confirm the condition, so the grade drops one level. The European Food Safety Authority set an acceptable daily intake. That is why it is Usable.';
  }

  if (/acetylated monoglyceride/.test(n)) {
    return 'Acetylated monoglycerides are a mono- and diglyceride. The Food and Drug Administration lists them as a food additive. The European Food Safety Authority found no adverse effects for humans and set no acceptable daily intake. That is why it is Usable.';
  }

  if (/cellacefate|cellulose acetate phthalate/.test(n)) {
    return 'Cellacefate is cellulose acetate phthalate. It is an enteric coating, the same job as the enteric polymer. It is not a free phthalate. That is why it is Usable.';
  }

  if (/sulisobenzone/.test(n)) {
    return 'Sulisobenzone is a UV filter. The European Union cleared it at 5%, and it has no cancer finding at that use level. That percent is how it is used. That is why it is Usable.';
  }

  if (/glyceryl oleate/.test(n)) {
    return 'Glyceryl oleate is a glycerin ester. It is not glycerin, and it is not glyceryl stearate. That is why it is Usable.';
  }

  if (/raspberry ketone/.test(n)) {
    return 'Raspberry ketone is a named chemical. It is not a flavor blend. That is why it is Usable.';
  }

  if (/methyl salicylate/.test(n)) {
    return 'Methyl salicylate is a named chemical. On this label it is inactive, not the drug. That is why it is Usable.';
  }

  if (/pyrophosphate/.test(n)) {
    return 'This is a pyrophosphate salt. It is not the sodium phosphate filler. That is why it is Usable.';
  }

  if (/glycyrrhizin|glycyrrhizate|glycrrhizate/.test(n) && !/dipotassium/.test(n)) {
    return 'This is a licorice salt. It is not the licorice extract. That is why it is Usable.';
  }

  if (/lanolin/.test(n)) {
    return 'Lanolin is wool wax. It can bother people who are sensitive to wool alcohols. That is why it is Usable.';
  }

  if (/white wax/.test(n)) {
    return 'White wax is not beeswax. That is why it is Usable.';
  }

  if (/thyme|thymus/.test(n) && /\boil\b/.test(n)) {
    return 'This is a scent oil. It is not an oral thyme extract. That is why it is Usable.';
  }

  if (/sucrose stearate|sucrose distearate/.test(n)) {
    return 'This is a sucrose ester used to mix oil and water. It is not the sugar sucrose. That is why it is Usable.';
  }

  if (/propylene glycol|\bpg\b|\be1520\b/.test(n) && !/dicaprylate|dipelargonate|dipropylene/.test(n)) {
    if (level === 'cleared' || source.includes('topical')) {
      return close('On this label propylene glycol is the topical form, not the swallowed solvent.', level);
    }
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'Propylene glycol (oral) is Limited under the t138u founder lock (§4 prior-lock re-eval). It is a swallowed solvent that cleaner brands often leave out.',
        level,
      );
    }
    return close(
      'Propylene glycol is a solvent. The direct evidence of harm is thin, and cleaner formulas leave it out of things you swallow.',
      level,
    );
  }

  if (/sucralose|\be955\b|splenda/.test(n)) {
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'Sucralose is Limited under the t138u founder lock (§4 prior-lock re-eval). A 2023 study raised DNA and gut-bacteria questions.',
        level,
      );
    }
    return close(
      'Sucralose is a sweetener. A 2023 study found a signal that a breakdown product can damage DNA, and other work has raised questions about gut bacteria.',
      level,
    );
  }

  if (/acesulfame|ace k|\be950\b/.test(n)) {
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'Acesulfame potassium is Limited under the t138u founder lock (§4 prior-lock re-eval). Early genotoxicity and microbiome signals are still thin.',
        level,
      );
    }
    return close(
      'Acesulfame potassium is a sweetener. Studies have raised early questions about DNA damage and gut bacteria, and that evidence is still thin.',
      level,
    );
  }

  if (/saccharin|\be954\b/.test(n)) {
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'Saccharin is Limited under the t138u founder lock (§4 prior-lock re-eval). Later reviews walked back the older rat cancer signal.',
        level,
      );
    }
    return close(
      'Saccharin is a sweetener. Older rat studies raised a cancer question. Later reviews by the National Toxicology Program and the cancer research agency did not keep that classification.',
      level,
    );
  }

  if (/poloxamer/.test(n)) {
    return close(
      'Poloxamer is a surfactant in the same family as polyethylene glycol. It is not on the High risk list.',
      level,
    );
  }

  if (/polyethylene glycol|polyethyleneglycol|\bpeg\b|macrogol|pegoxol|lauroyl macrogol/.test(n)) {
    if (/polyethylene\b/.test(n) && !/glycol/.test(n)) {
      return close('This polyethylene is a chew binder, not polyethylene glycol.', level);
    }
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'PEG / polyethylene glycol is Limited under the t138u founder lock (§4 prior-lock re-eval). Manufacturing can leave traces of ethylene oxide and 1,4-dioxane.',
        level,
      );
    }
    return close(
      'Polyethylene glycol is a coating ingredient. Making it can leave traces of ethylene oxide and 1,4-dioxane.',
      level,
    );
  }

  if (/polysorbate/.test(n)) {
    if (level === 'limited' || /founder lock t138u/i.test(source)) {
      return close(
        'Polysorbate is Limited under the t138u founder lock (§4 prior-lock re-eval). A 2023 study found it can weaken the gut barrier.',
        level,
      );
    }
    return close(
      'Polysorbate is an emulsifier that keeps oil and water mixed. A 2023 study found it can weaken the gut barrier.',
      level,
    );
  }

  if (/silicon dioxide|\bsilica\b|\be551\b|colloidal anhydrous silica|colloidal silicone dioxide/.test(n) && !/silicate|6x|homeopathic|dimethyl silylate/.test(n)) {
    return close(
      'Silicon dioxide is a powder that keeps ingredients from clumping. A 2018 European review found no confirmed harm, but left an open question about the tiny-particle form.',
      level,
    );
  }

  if (/xylitol|erythritol|sorbitol|maltitol|mannitol|\bisomalt\b/.test(n) && !/sorbitan/.test(n)) {
    if (level === 'cleared') {
      return close('This sugar alcohol is on the skin or in the nose, not swallowed. The gut warning is for the swallowed form.', level);
    }
    return close('This is a sugar alcohol. Large amounts can upset the gut.', level);
  }

  if ((/n butyl alcohol/.test(n) || /n butanol/.test(n)) && !/tert/.test(n)) {
    return 'N-butyl alcohol is a flavor solvent, the same kind of vehicle as grain alcohol. The vapor and workplace irritant finding is not this chewable dose. That is why it is Usable.';
  }

  if (/ethyl acetate/.test(n)) {
    return 'Ethyl acetate is a flavor solvent. That is why it is Usable.';
  }

  if (/^alcohol\b|ethyl alcohol|sd alcohol|alcohol denat|isopropyl alcohol|isopropanol|methylated spirit|grain alcohol|\bethanol\b/.test(n)) {
    return close(
      'This alcohol is the liquid that carries the other ingredients. It is not a drinking-alcohol dose, and it is not the gummy seed-oil rule.',
      level,
    );
  }

  if (isVagueRice(ingredient.name)) {
    return close(
      'The label says rice extract and does not name hull, bran, or concentrate. Named rice hull is a different form and is not this flag.',
      level,
    );
  }

  if (namedRiceForm(ingredient.name) && level === 'cleared') {
    return close(
      'This is named rice hull, rice bran, or rice concentrate, used as a plant-fiber flow agent. It is not the vague rice extract that leaves the form unnamed.',
      level,
    );
  }

  if (n === 'natural ginger flavor') {
    return namedFlavorWhy('ginger', level);
  }

  if (n === 'natural strawberry flavor') {
    return namedFlavorWhy('strawberry', level);
  }

  if (n === 'natural apple flavor') {
    if (level === 'cleared') {
      return close(
        'This flavor names apple. It is not a hidden flavor blend. Named apple flavor is Cleared under the t120u founder lock.',
        level,
      );
    }
    return namedFlavorWhy('apple', level);
  }

  if (n === 'natural mixed berry elderberry flavor') {
    return namedFlavorWhy('mixed berry and elderberry', level);
  }

  if (n === 'natural honey flavor') {
    return namedFlavorWhy('honey', level, 'It is not the honey sweetener.');
  }

  if (n === 'flavor' || n === 'flavors') {
    return unnamedFlavorWhy(level);
  }

  if (/natural and artificial/.test(n) && /\bflavou?r/.test(n)) {
    return close(
      'This is a natural and artificial flavor mixture. The label names a taste and does not list every part of the mixture. Methodology §5 Limited (natural and artificial flavors).',
      level,
    );
  }

  if (n === 'artificial flavor' || n === 'artificial flavoring') {
    return close(
      'Artificial Flavor is Limited, the same substance as the plural Artificial flavors lock (t42u). It is not a named fruit flavor.',
      level,
    );
  }

  if (/\bflavou?rs?\b/.test(n)) {
    if (isUnnamedFlavor(n)) return unnamedFlavorWhy(level);
    const food = n
      .split(' ')
      .filter((word) => !UNNAMED_FLAVOR_WORDS.has(word))
      .join(' ');
    return namedFlavorWhy(food, level);
  }

  if (/sorbic acid/.test(n)) {
    return close('Sorbic acid is a preservative in the same limited family as caprylyl glycol.', level);
  }

  if (/sodium benzoate|potassium benzoate|potassium sorbate|benzoic acid/.test(n)) {
    return close(
      'This is a preservative. On its own the risk is low. Benzoate plus vitamin C can form a trace of benzene.',
      level,
    );
  }

  if (/carrageenan|\be407\b/.test(n)) {
    return close(
      'Carrageenan is a seaweed thickener. Researchers disagree about whether it inflames the gut.',
      level,
    );
  }

  if (/magnesium stearate|stearic acid|calcium stearate|calcium laurate|sodium stearate|stearate family/.test(n) || /maanesium stearate|magnesium sterate|magenesium stereate|magensium stearate/.test(n)) {
    return close(
      'This is a stearate lubricant that helps a tablet press and leave the mold. A 2018 European review found no safety concern.',
      level,
    );
  }

  if (n === 'modified cellulose gum') {
    return close(
      'Modified cellulose gum is Caution under founder lock t42u. It is not Cleared cellulose gum, and it is not Limited unlabeled modified cellulose.',
      level,
    );
  }

  if (/carboxymethyl cellulose calcium/.test(n)) {
    return 'Carboxymethylcellulose calcium is a cellulose gum. That is why it is Usable.';
  }

  if (/microcrystalline cellulose|croscarmellose|cellulose gum|powdered cellulose|carboxymethyl cellulose|methylcellulose|silicified microcrystalline/.test(n) || n === 'cellulose' || n === 'mcc') {
    return close(
      'This is a cellulose filler or disintegrant. A 2017 European review found no carcinogenicity and no need for a daily intake limit.',
      level,
    );
  }

  if (
    n === 'hydroxypropyl'
    || (/hypromellose|hydroxypropyl cellulose|\bhpmc\b|\bhpc\b/.test(n) && !/acetate succinate|phthalate/.test(n))
  ) {
    return close(
      'This is a cellulose coating. Reviews have found no genotoxicity, carcinogenicity, or reproductive findings, and no set daily limit.',
      level,
    );
  }

  if (/povidone|polyvinylpyrrolidone|crospovidone|copovidone|\bpvp\b/.test(n)) {
    return close(
      'Povidone is a tablet binder. A European review found a sufficient safety margin and called it unlikely to be a safety concern. The lung risk that shows up in reports is from injecting crushed tablets, not from swallowing one.',
      level,
    );
  }

  if (/^water$|purified water|deionized water|distilled water|water for injection|sterile water/.test(n)) {
    return close('This is water used as a base.', level);
  }

  if (/\bseawater\b/.test(n) && !/evaporated|trace mineral/.test(n)) {
    return close('This is seawater used as the saline in a nasal spray. It is not evaporated sea water.', level);
  }

  if (/modified corn starch|modified food starch|modified starch/.test(n)) {
    return close('This is a modified starch. Plain corn starch and potato starch are a different line.', level);
  }

  if (/corn starch|potato starch|pregelatinized starch|tapioca starch|^starch$/.test(n)) {
    return close('This is a simple starch filler. Reviews have not found a safety concern for this form.', level);
  }

  if (/cane sugar|glucose syrup|tapioca syrup|caramel sugar syrup|\bcorn syrup\b|\brice syrup\b|molasses/.test(n)) {
    return close('This is a food sugar or syrup used as a sweetener.', level);
  }

  if (/^sucrose$|beet sugar|^fructose$|maltose|maltodextrin|polydextrose/.test(n)) {
    return close('This is a sugar or a starch-based bulk sweetener. It is not a High risk sweetener.', level);
  }

  if (/lactose/.test(n)) {
    return close('Lactose is a milk sugar used as a filler.', level);
  }

  if (/^gelatin\b|gelatin capsule/.test(n)) {
    return close('Gelatin is the capsule or gummy base.', level);
  }

  if (/glycerin|glycerine|glycerol/.test(n) && !/monostearate|stearate|dibeben/.test(n)) {
    return close('Glycerin is a moisture-keeping ingredient and a softgel plasticizer.', level);
  }

  if (/sodium ascorbate/.test(n)) {
    return close('Sodium ascorbate is in the same ascorbate family as calcium ascorbate.', 'cleared');
  }

  if (/citric acid|ascorbic acid|sodium citrate|trisodium citrate|magnesium citrate|potassium citrate|calcium ascorbate/.test(n)) {
    return close('This is citric acid or a citrate salt, used to set acidity. Anhydrous citric acid is the same acid without water.', level);
  }

  if (/hydrogenated lecithin/.test(n)) {
    return close(
      'Hydrogenated lecithin is its own ingredient. It is not soy lecithin or sunflower lecithin.',
      level,
    );
  }

  if (/lecithin/.test(n)) {
    if (/soy/.test(n)) {
      return close(
        'Lecithin is an emulsifier. A 2017 European review found no safety concern and set no daily limit. Soy lecithin is a soy allergen disclosure, not a toxicity flag.',
        level,
      );
    }
    if (n === 'lecithin') {
      return close(
        'Lecithin with no source named is the same emulsifier as soy lecithin and sunflower lecithin. A 2017 European review found no safety concern and set no daily limit. The soy note applies only when the label says soy.',
        level,
      );
    }
    return close(
      'Lecithin is an emulsifier from soy, sunflower, or canola. A 2017 European review found no safety concern and set no daily limit.',
      level,
    );
  }

  if (/glycyrrhiza|licorice/.test(n) && !/ammonium|monoammonium|dipotassium/.test(n)) {
    return 'Licorice extract is a named plant ingredient. Very high intakes of glycyrrhizin can affect blood pressure and potassium. That is not this syrup dose. That is why it is Cleared.';
  }

  if (n === 'sodium') {
    return 'The label says sodium and does not name the salt. That is why it is Usable.';
  }

  if (/calcium gluconate monohydrate/.test(n)) {
    return close('Calcium gluconate monohydrate is calcium gluconate. It is not a new ingredient.', level);
  }

  if (/sodium gluconate/.test(n)) {
    return close('Sodium gluconate is in the same gluconate family as calcium gluconate.', level);
  }

  if (/zinc gluconate/.test(n)) {
    return close('Zinc gluconate is in that same gluconate family.', level);
  }

  if (/calcium gluconate/.test(n)) {
    return close('Calcium gluconate is a mineral salt used as an inactive.', level);
  }

  if (/whole dry milk/.test(n)) {
    return close('This is milk.', level);
  }

  if (/lipolyzed butteroil|lipolysed butter oil|lipolyzed butter oil/.test(n)) {
    return close('Lipolyzed butteroil is butterfat.', level);
  }

  if (/sodium chloride|sodium bicarbonate|potassium chloride|himalayan rock salt|sea salt/.test(n)) {
    return close('This is a salt used as a base or electrolyte.', level);
  }

  if (/sodium polyphosphate/.test(n)) {
    return close('Sodium polyphosphate has its own line. It is not a phosphate salt used as a mineral filler, and it is not phosphoric acid.', level);
  }

  if (/dicalcium phosphate|tricalcium phosphate|calcium phosphate|sodium phosphate/.test(n) && !/3x|6x|pyrophosphate/.test(n)) {
    return close('This is a phosphate salt used as a mineral filler. It is not phosphoric acid.', level);
  }

  if ((/medium chain triglyceride/.test(n) || /\bmct\b/.test(n)) && /acacia/.test(n)) {
    return close(
      'The label says MCT and does not name the plant. A medium-chain triglyceride that names coconut or palm is a different line.',
      level,
    );
  }

  if (/xanthan|guar gum|gum arabic|arabic gum|acacia|pectin|gellan|locust bean|tragacanth|agar/.test(n)) {
    return close('This is a food gum or seaweed gel used to thicken.', level);
  }

  if (n === 'oligofructose') {
    return close('Oligofructose is in the same family as a fructooligosaccharide blend. Inulin is a different line.', level);
  }

  if (/inulin|psyllium|chicory root fiber|fructooligosaccharide|\bfos\b|oat fiber|corn fiber|vegetable fiber/.test(n)) {
    return close('This is a food fiber.', level);
  }

  if (/tocopherol|ascorbyl palmitate|vitamin e\b/.test(n) && !/acetate/.test(n)) {
    return close('This is a vitamin E antioxidant used to keep oils from going rancid.', level);
  }

  if (/^fragrance$|parfum/.test(n)) {
    if (level === 'high') {
      return close('This is an unnamed fragrance. The word hides the mixture, so you cannot see the solvents or the carriers.', level);
    }
    return 'This is an unnamed fragrance. The word hides the mixture, so you cannot see the solvents or the carriers. That is why it is Usable.';
  }

  if (/sodium lauryl sulfate|\bsls\b/.test(n)) {
    return close(
      'Sodium lauryl sulfate is a foaming agent. Skin studies use it as a standard irritant. It can irritate skin or the mouth. It is not classified as a carcinogen.',
      level,
    );
  }

  if (/sulfiting agents/.test(n)) {
    return close(
      'Sulfiting agents can trigger serious reactions in people who are sensitive to them, including some people with asthma. The U.S. Food and Drug Administration requires the label when sulfites are present at 10 parts per million or more.',
      level,
    );
  }

  if (/metabisulfite|bisulfite|\bsulfite/.test(n)) {
    return close(
      'Sulfites can trigger serious reactions in people who are sensitive to them, including some people with asthma. The U.S. Food and Drug Administration requires a warning on drugs that contain them.',
      level,
    );
  }

  if (/annatto|bixin|norbixin/.test(n)) {
    return close(
      'Annatto is a plant color. A study of people with chronic hives found that many of them reacted to it, and a European review warned that high consumers can pass the acceptable daily intake for one of its pigments.',
      level,
    );
  }

  if (/beta carotene|beta-carotene|carotene/.test(n) || /beta carotene/.test(n)) {
    return close(
      'Beta-carotene here is a color, not the vitamin dose. A large French study linked higher intake of some natural colors, including beta-carotene, with higher rates of cancer and type 2 diabetes. That link is not proof of cause.',
      level,
    );
  }

  if (/benzalkonium|benzylkonium|\bbkc\b/.test(n)) {
    return close(
      'Benzalkonium chloride can damage cilia in lab tests. Studies in people do not all agree. That split is why it stays on the Caution list.',
      level,
    );
  }

  if (/benzyl alcohol/.test(n)) {
    return close(
      'Benzyl alcohol has caused gasping syndrome in newborns at high doses. At ordinary doses in older children and adults it is far below that threshold.',
      level,
    );
  }

  if (/carmine|cochineal|carminic/.test(n)) {
    return close('Carmine is a red color made from insects. It can cause allergic reactions in some people.', level);
  }

  if (/chlorophyllin/.test(n)) {
    return close('Sodium copper chlorophyllin is a copper color complex. It is not the green plant pigment chlorophyll.', level);
  }

  if (/^chlorophyll\b/.test(n)) {
    return close('This is the named green plant pigment, not the copper color complex chlorophyllin.', level);
  }

  if (n === 'stevia' || n === 'rebaudioside a extracted and purified from natural stevia leaf') {
    return close(
      'This stevia string is Limited under the t158u founder lock. Stevia extract and stevia leaf extract are the same Limited row (t159u). Organic Rebaudioside A stays Cleared. High-purity steviol glycosides and Rebaudioside M stay Cleared.',
      level,
    );
  }

  if (n === 'paprika extract color' || isT159uPaprikaColorClearedName(n)) {
    return close(
      'Paprika extract (color), Paprika extract (natural color), and Paprika (color) are the same named plant color. The founder locked them Cleared (t158u and t159u).',
      level,
    );
  }

  if (n === 'natural mixed berry flavors') {
    return close(
      'Natural mixed berry flavors names the fruit. The founder locked that exact string Cleared (t158u). Exact Natural flavors stays Limited.',
      level,
    );
  }

  if (n === 'oats') {
    return close(
      'Oats are a food grain. The founder locked that exact string Cleared (t158u). It is not Organic Oat Hull Fiber.',
      level,
    );
  }

  if (n === 'cinnamon') {
    return close(
      'Cinnamon is a spice. The founder locked that exact string Cleared (t158u). It is not cinnamon bark oil.',
      level,
    );
  }

  if (n === 'nutmeg') {
    return close('Nutmeg is a spice. The founder locked that exact string Cleared (t158u).', level);
  }

  if (/stearia|stevia|rebaudioside|reb m|monk fruit|mogroside|lo han/.test(n)) {
    if (isT159uSteviaExtractLimitedName(n)) {
      return close(
        'Stevia extract and stevia leaf extract are Limited under founder lock t159u (Oct 21, 2026), the same row as Stevia and rebaudioside A extracted and purified. They count toward the three-or-more Limited stack. Organic Rebaudioside A, high-purity steviol glycosides, and Rebaudioside M stay Cleared.',
        level,
      );
    }
    if (/whole leaf|crude|leaf extract|^stevia extract$|stevia leaf/.test(n) || (level !== 'cleared' && /stevia/.test(n) && !/rebaudioside|reb m|high purity/.test(n))) {
      return close('This is a stevia extract that is not the high-purity steviol glycoside. The high-purity form is a different row.', level);
    }
    return close(
      'This is a high-purity stevia or monk-fruit sweetener. A European review set an acceptable daily intake for high-purity steviol glycosides and did not find a cancer, DNA, or hormone signal.',
      level,
    );
  }

  if (/sorbitan/.test(n)) {
    return close('Sorbitan is an emulsifier in the same neighborhood as polysorbate. It is not the sugar alcohol sorbitol.', level);
  }

  if (/potassium hydroxide|sodium hydroxide|\bnaoh\b/.test(n)) {
    return close('This is a pH adjuster used in a trace amount. It is the same job as sodium hydroxide.', level);
  }

  if (/triacetin|glycerol triacetate/.test(n) && level === 'cleared') {
    return close('Triacetin is a plasticizer in a tablet coating.', level);
  }

  if (/castor oil|polyoxyl castor/.test(n)) {
    return close(
      'Castor oil in a swallowed or skin product has looked essentially non-toxic in acute and chronic studies. The serious allergy history is from castor oil given in a vein, which this catalog does not grade.',
      level,
    );
  }

  if (/petrolatum|paraffin|mineral oil|ceresin/.test(n)) {
    if (level === 'cleared') {
      return close('This is an ointment base in the petrolatum family. It is not an oil you swallow.', level);
    }
    return close('Mineral oil here is not the topical ointment base. The ointment form is a different line.', level);
  }

  if (/honey\b/.test(n)) {
    return close('Honey is a food sweetener. It is not for infants under 1 year.', level);
  }

  if (/citrus/.test(n) && /extract|oil/.test(n)) {
    return close(
      'The label says citrus and does not name lemon, orange, or lime, or juice versus peel. A named citrus oil is a different line.',
      level,
    );
  }

  if (/^color added$|colors added|colorant added|artificial color/.test(n)) {
    return close('The label says color was added and does not name the color. A named plant color is a different line.', level);
  }

  if (n === 'natural color') {
    return close('The label says natural color and does not name the plant. A named color such as turmeric, or a named juice color, names the plant and is a different line.', level);
  }

  if (/cellulose acetate/.test(n)) {
    return close('Cellulose acetate is a coating polymer. It is not plain cellulose, microcrystalline cellulose, or hypromellose.', level);
  }

  if (/cellulose|vegetable capsule|vegetarian capsule|veggie capsule/.test(n)) {
    if (/cellulose/.test(n) && !/capsule/.test(n)) {
      return close('This is a cellulose capsule or filler, in the same family as microcrystalline cellulose and hypromellose.', level);
    }
    if (level === 'cleared' && /capsule/.test(n)) {
      return close(
        'This is a plant-cellulose vegetarian capsule shell (hypromellose, pullulan, or tapioca family). Under the t130u unnamed rule, the shell is Cleared when a named form would not change severity.',
        level,
      );
    }
    return close('The label says vegetable capsule and does not name cellulose or hypromellose. A named cellulose capsule is a different line.', level);
  }

  if (/^rice powder$|^organic rice powder$/.test(n)) {
    return close(
      'Rice powder is a food-state rice filler. Under the t132u founder lock it is Cleared, distinct from Caution rice flour.',
      level,
    );
  }

  if (/rice flour/.test(n)) {
    return close('Rice flour is a flour. It is not rice hull or rice bran. Those named forms are a different grade.', level);
  }

  if (/^natural\s+.+\s+flavor$/i.test(n) && !/^natural\s+flavors?$/i.test(n) && !/natural and artificial/i.test(n)) {
    return close(
      'This names the fruit in the flavor. Under the t132u founder lock, named Natural [fruit] Flavor is Cleared; bare Natural flavor or Natural flavors is a different line.',
      level,
    );
  }

  if (/carnauba/.test(n)) {
    return close(
      'Carnauba wax is a plant wax used as a coating. Under the t133u founder lock it is Cleared (§4 prior-lock re-eval).',
      level,
    );
  }

  if (/beeswax/.test(n)) {
    return close('Beeswax is a wax used as a coating or base.', level);
  }

  if (/malic acid|lactic acid|tartaric acid|fumaric acid|adipic acid/.test(n)) {
    return close('This is an organic acid, in the same family as citric acid, used to set acidity.', level);
  }

  if (/olive oil/.test(n)) {
    return close('This is olive oil used as a softgel fill. It is not the olive oil you cook with, and it is not the gummy seed-oil rule.', level);
  }

  if (/sodium starch glycolate/.test(n)) {
    return close('Sodium starch glycolate is a starch disintegrant that helps a tablet break apart.', level);
  }

  if (/beet root|beetroot|beet powder|beet juice/.test(n)) {
    return close('This is beet root used as a plant color. It is not a synthetic dye.', level);
  }

  if (/potassium aluminum silicate/.test(n)) {
    return 'Potassium aluminum silicate is an aluminum salt. That is why it is Usable.';
  }

  if (/calcium silicate|magnesium trisilicate|magnesium aluminum silicate/.test(n)) {
    return close('This is a silicate powder used to keep ingredients from clumping. It is not the silicon dioxide nanoparticle cap.', level);
  }

  if (/iron oxide|ferric oxide/.test(n)) {
    return close('Iron oxide is a mineral color. It is not a synthetic FD&C dye.', level);
  }

  if (/edible dye free ink|dye free ink/.test(n)) {
    return 'The colorant in this ink is not named. It is not an FD&C lake. That is why it is Usable.';
  }

  if (/pharmaceutical ink|edible ink|imprinting ink|black ink|white ink/.test(n) || n === 'ink') {
    return close('This is printing ink on a tablet or capsule. The label does not name every pigment in the ink.', level);
  }

  if (/shellac|pharmaceutical glaze/.test(n)) {
    return close('Shellac is a glaze used to coat tablets.', level);
  }

  if (/dimethicone|dimethiconol/.test(n) && !/crosspolymer|cyclomethicone/.test(n)) {
    return close('Dimethicone is a silicone used as a skin protectant or coating.', level);
  }

  if (/grape seed extract/.test(n) && !/\boil\b/.test(n)) {
    return close('Grape seed extract is a named seed extract used as an inactive. It is not grape seed oil.', level);
  }

  if (/^aloe\b|aloe barbadensis|aloe vera/.test(n)) {
    return close('Aloe on this label is a plant juice or gel. The topical base and the other-ingredient juice are graded from how the label uses it.', level);
  }

  if (n === 'ceteth-20' || n === 'ceteth 20') {
    return close(
      'Ceteth-20 is an emulsifier. The founder locked it Limited (t150u). It is not ceteth-20 phosphate, and it is not cetostearyl alcohol.',
      level,
    );
  }

  if (n === 'chlorocresol') {
    return close(
      'Chlorocresol is a preservative. The founder locked it Limited (t150u). It is not chloroxylenol.',
      level,
    );
  }

  if (/steareth|ceteareth|ceteth|stearyl alcohol|cetearyl alcohol|cetyl alcohol|cetostearyl/.test(n)) {
    return close('This is a fatty alcohol or a fatty-alcohol ether used in a cream base.', level);
  }

  if (/glyceryl stearate|glyceryl monostearate|glycerol monostearate/.test(n)) {
    return close('Glyceryl stearate is a wax-like emulsifier used in creams and coatings.', level);
  }

  if (/acetyl tributyl citrate/.test(n)) {
    return close('Acetyl tributyl citrate is a coating plasticizer. It is not triethyl citrate.', level);
  }

  if (/triethyl citrate/.test(n)) {
    return close('Triethyl citrate is a coating plasticizer.', level);
  }

  if (/polyvinyl alcohol|\bpva\b/.test(n)) {
    return close('Polyvinyl alcohol is a film used to coat a tablet.', level);
  }

  if (/alginate|alginic/.test(n)) {
    return close('Alginate is a seaweed gum used to thicken.', level);
  }

  if (/carbomer/.test(n)) {
    return close('Carbomer is a gel thickener. Current grades are not the older benzene-residue carbomers.', level);
  }

  if (/tocopheryl acetate|tocopherol acetate|vitamin e acetate/.test(n)) {
    return close('Tocopheryl acetate is a vitamin E ester. It is not the same token as mixed tocopherols.', level);
  }

  if (/edetate|disodium edta|\bedta\b/.test(n)) {
    return close('This is an EDTA salt used as a stabilizer. The chelation risk in the literature is about large intravenous doses, not this trace use.', level);
  }

  if (n === 'natural menthol' || /^menthol\b|menthol dl/.test(n)) {
    if (level === 'limited' && /t42u|fast-dissolve/i.test(source)) {
      return close(
        'Menthol on a fast-dissolve tablet is Limited under founder lock t42u. Natural Menthol is the same grade. It is a named chemical, not a hidden flavor blend. Inactive menthol in a spray, a rinse, or a gel stays Caution. A lozenge inactive menthol stays the flavor Caution row.',
        level,
      );
    }
    if (level === 'high') {
      return close('Menthol is a named chemical, not a hidden flavor blend. On this label it is the cooling inactive, not the drug.', level);
    }
    return 'Menthol is a named chemical, not a hidden flavor blend. On this label it is the cooling inactive, not the drug. That is why it is Usable.';
  }

  if (/^eucalyptol\b/.test(n)) {
    if (level === 'high') {
      return close('Eucalyptol is a named chemical, not a hidden flavor blend. In this spray it is the scent inactive, not the drug.', level);
    }
    return 'Eucalyptol is a named chemical, not a hidden flavor blend. In this spray it is the scent inactive, not the drug. That is why it is Usable.';
  }

  if (/high fructose corn syrup|\bhfcs\b/.test(n)) {
    return close('High fructose corn syrup is a sweetener. It is not the gummy seed-oil rule.', level);
  }

  if (/tapioca\s+maltodextrin/i.test(n)) {
    if (level === 'limited' || /founder lock t141u/i.test(source)) {
      return close(
        'Tapioca maltodextrin is Limited under the t141u founder lock (§4 prior-lock re-eval). The panel names tapioca as the starch source, distinct from Cleared tapioca starch.',
        level,
      );
    }
    return close('This is a tapioca-based maltodextrin bulking sweetener.', level);
  }

  if (/^dextrin\b|tapioca dextrin|maltodextrin/.test(n)) {
    return close('This is a starch breakdown product used as a filler or sweetener bulk.', level);
  }

  if (/bamboo/.test(n)) {
    return close('Bamboo extract here is a plant silica source used as a flow agent. It is not the silicon dioxide cap by another name until the label says silica.', level);
  }

  if (/gum base/.test(n)) {
    return close('Gum base is an unnamed mix of gum, resin, and wax. The label does not name each part.', level);
  }

  if (/glyceride/.test(n) && (/\bmono\b|\bdi\b|monoglyceride|diglyceride/.test(n))) {
    return close(
      'This is a mono- and diglyceride emulsifier. It is not a named medium-chain triglyceride.',
      level,
    );
  }

  if (n === 'gomct') {
    return close(
      'goMCT is a branded medium-chain triglyceride, typically coconut-derived C8/C10. The founder locked it Limited (t49u), the same grade as unlabeled MCT and medium-chain triglycerides. FDA GRAS for MCT and the EFSA evaluation of MCT oil are the sources. The dock rule does not dock it, and prior locks were not treated as binding. It counts toward the three-or-more Limited stack. It is not the Cleared MCT oil row.',
      level,
    );
  }

  if (/medium chain triglyceride|\bmct\b|caprylic capric triglyceride|caprylic capric glyceride/.test(n)) {
    if (/coconut|palm/.test(n)) {
      return close('This medium-chain triglyceride names its plant source. It is not the unlabeled MCT line, and it is not the gummy seed-oil rule.', level);
    }
    return close('The label says MCT and does not name the plant. A medium-chain triglyceride that names coconut or palm is a different line.', level);
  }

  if (n === 'triglycerides') {
    return close(
      'Triglycerides printed alone does not name the chain length. Medium-chain triglycerides are already Limited, and the unnamed rule applies (founder lock t36u). It counts toward the three-or-more Limited stack.',
      level,
    );
  }

  if (/simethicone/.test(n)) {
    return close('Simethicone is an anti-gas agent. On an other-ingredients line it is not the labeled active.', level);
  }

  if (/color \(calcium carbonate\)/.test(n)) {
    return close(
      'The label lists calcium carbonate as a color, not as the mineral filler or buffer. That is an unusual color use on the panel.',
      level,
    );
  }

  if (/calcium carbonate|magnesium hydroxide|sodium carbonate|potassium bicarbonate|calcium sulfate|sodium bicarbonate/.test(n)) {
    return close('This is a mineral salt used as a filler or to set acidity.', level);
  }

  if (n === 'sugar' || n === 'bare sugar' || /confectioner/.test(n)) {
    return close('The label says sugar and does not name cane sugar. Cane sugar is a different line.', level);
  }

  if (/peppermint oil|peppermint leaf/.test(n)) {
    return close('Peppermint oil is a flavor oil. It is not the gummy seed-oil rule.', level);
  }

  if (/^alcohol \(vehicle\)|alcohol vehicle/.test(n)) {
    return close('This alcohol is the liquid that carries the other ingredients. It is not a drinking-alcohol dose.', level);
  }

  if (/dandelion|alfalfa|parsley|watercress|nettle|chamomile|fennel seed|lemon balm|rose hip|eleuthero|ginger|yellow dock|horsetail|rosemary|burdock|arctium|chamomilla|matricaria|gotu kola|centella|saw palmetto|pygeum|cranberry/.test(n) && !/\boil\b/.test(n)) {
    return close('This is a named plant-part ingredient. It is not an unnamed flavor mixture.', level);
  }

  if (/ferment media|cultured yeast|culture media/.test(n)) {
    return close('This is a yeast ferment medium used as a food-state base. It is not the silicon dioxide cap.', level);
  }

  if (/phenoxyethanol/.test(n)) {
    return close('Phenoxyethanol is a preservative used on the skin.', level);
  }

  if (/sodium polyacrylate|polyacrylic acid|polyacrylate/.test(n)) {
    return close('This is a polyacrylate gel polymer.', level);
  }

  if (/triethanolamine|trolamine/.test(n) || n === 'tea') {
    return close('Triethanolamine is a pH adjuster. It is not the salicylate drug.', level);
  }

  if (/poly epsilon lysine|polyepsilon lysine/.test(n)) {
    return close('Poly-epsilon lysine is a fermentation preservative. Harm studies on it are clean. It is not the amino acid lysine.', level);
  }

  if (/\bnisin\b/.test(n)) {
    return close('Nisin is a food preservative. Intake stays under the European food limit. It is not a Not clean flag.', level);
  }

  if (/eucalyptus globulus/.test(n) && !/\boil\b/.test(n)) {
    return close('This is a eucalyptus leaf extract. It is not the parked eucalyptus oil.', level);
  }

  if (/origanum vulgare/.test(n) && !/\boil\b/.test(n)) {
    return close('This is an oregano leaf extract. It is not oregano oil.', level);
  }

  if (/\brosemary oil\b/.test(n)) {
    return close('Rosemary oil is a scent oil. It is not the oral rosemary extract.', level);
  }

  if (/arnica|ilex paraguariensis|camellia sinensis|calendula|echinacea|boswellia|eucalyptus oil|jojoba oil|clove oil/.test(n)) {
    return close('This is a plant extract used as a scent or an inactive in a cream. A named plant used as a cream base oil is a different line.', level);
  }

  if (/isopropyl myristate|isopropyl palmitate/.test(n)) {
    return close('This is an emollient ester used in a cream.', level);
  }

  if (/isostearyl neopentanoate/.test(n)) {
    return close('Isostearyl neopentanoate is an emollient ester used in a cream.', level);
  }

  if (/spirulina/.test(n)) {
    return close('Spirulina is an algae color or powder. A color listing is not the same as an unnamed algae powder, and neither one is a synthetic dye.', level);
  }

  if (/pea starch/.test(n)) {
    return close('Pea starch is a starch filler. It is not pea protein.', level);
  }

  if (/rice bran wax/.test(n)) {
    return close('Rice bran wax is a wax. It is not rice bran extract and it is not rice bran oil.', level);
  }

  if (/rice bran oil/.test(n)) {
    if (level === 'high') {
      return close(
        'Rice bran oil is Not clean when it is the base of a gummy. You are chewing the oil. That is the form this app flags.',
        level,
      );
    }
    if (/oral liquid drop|t16u/i.test(ingredient.source ?? '')) {
      return close(
        'Rice bran oil in an oral liquid drop is Cleared under founder lock t16u. The drop is not the gummy you chew. Gummy rice bran oil stays Not clean.',
        level,
      );
    }
    return close('Rice bran oil is a carrier oil in a softgel or capsule fill. It is not the gummy you chew, and it is not rice bran extract.', level);
  }

  if (/oat oil/.test(n)) {
    if (level === 'high') {
      return close(
        'Oat oil is Not clean when it is the base of a gummy. You are chewing the oil. That is the form this app flags.',
        level,
      );
    }
    return close(
      'Oat oil is a carrier oil in a softgel or capsule fill. It is not the gummy you chew. Same form split as sunflower oil and rice bran oil.',
      level,
    );
  }

  if (/^l leucine$|^leucine$/.test(n)) {
    return close('Leucine is an amino acid used as a tablet filler.', level);
  }

  if (/agave/.test(n)) {
    return close('Agave here is a plant sweetener or a plant fiber, depending on the label words. It is not a synthetic sweetener.', level);
  }

  if (/^brown rice$|organic brown rice/.test(n)) {
    return close('This is brown rice as a food-state ingredient. It is not unspecified rice extract.', level);
  }

  if (/rice protein/.test(n)) {
    return close('Rice protein is a food protein. It is not unspecified rice extract.', level);
  }

  if (/\bdextrose\b/.test(n)) {
    return close('Dextrose is a sugar. Syrup forms that name tapioca or glucose syrup are a different line from bare dextrose.', level);
  }

  if (/sodium carbonate/.test(n)) {
    return close('Sodium carbonate is a mineral salt used to set acidity.', level);
  }

  if (/ethylcellulose/.test(n)) {
    return close('Ethylcellulose is a cellulose coating.', level);
  }

  if (/hydroxyethyl cellulose|hydroxyethylcellulose/.test(n)) {
    return close('Hydroxyethyl cellulose is a cellulose thickener.', level);
  }

  if (/pullulan/.test(n)) {
    return close('Pullulan is a starch-like capsule polymer in the same family as hypromellose capsules.', level);
  }

  if (/gelatin/.test(n)) {
    return close('Gelatin is the capsule or gummy base.', level);
  }

  if (/allantoin/.test(n)) {
    return close('Allantoin is a skin soother used in creams.', level);
  }

  if (/^kaolin\b|calcined kaolin/.test(n)) {
    return close('Kaolin is a clay used as an absorbent. Calcined kaolin is a different token from plain kaolin.', level);
  }

  if (/^glycine\b/.test(n)) {
    return close('Glycine is an amino acid used as a filler.', level);
  }

  if (/propanediol|pentylene glycol/.test(n)) {
    return close('Propanediol is a moisture-keeping solvent.', level);
  }

  if (/sugar alcohol/.test(n)) {
    return close('This is a sugar alcohol. Large amounts can upset the gut.', level);
  }

  if (/^carob\b|carob extract|carob powder/.test(n)) {
    return close('Carob as a powder is a food ingredient. Carob extract is a different line from the powder.', level);
  }

  if (/ammonium hydroxide/.test(n)) {
    return close('Ammonium hydroxide is a pH adjuster. It is not strong ammonia solution.', level);
  }

  if (/^glucose\b|bare glucose/.test(n)) {
    return close('Glucose is a sugar. Glucose syrup is a different line from bare glucose.', level);
  }

  if (/enteric coating|vegetable coating|vegetable based tablet coating|aqueous coating/.test(n)) {
    return close('The label names a coating and does not say it is hypromellose and glycerin. A coating that names those two is a different line.', level);
  }

  if (
    /puree|juice concentrate|juice from concentrate/.test(n) &&
    !/high fructose corn syrup/.test(n) &&
    /these are the fruit/i.test(ingredient.source ?? '')
  ) {
    return close(
      'This is the fruit. It is not a sugar, and it is not high fructose corn syrup.',
      level,
    );
  }

  if (/lemon oil|lemon juice concentrate/.test(n)) {
    return close('This is a named lemon oil or lemon juice. An unnamed citrus extract is a different line.', level);
  }

  if (/modified food starch|modified starch/.test(n)) {
    return close('This is a modified starch. Plain corn starch and potato starch are a different line.', level);
  }

  if (/hydrochloric acid/.test(n)) {
    return close('Hydrochloric acid here is a pH adjuster in a finished spray. It is not the concentrated acid, and it is not sodium hydroxide.', level);
  }

  if (/^mica\b|mica based pearlescent|pearlescent pigment/.test(n)) {
    return close('Mica is a mineral pigment used for shine. It is not a synthetic dye.', level);
  }

  if (/sodium stearyl fumarate/.test(n)) {
    return close('Sodium stearyl fumarate is a lubricant in the stearate family. A 2018 European review found no safety concern for that lubricant family.', level);
  }

  if (/grape \(fruit\) powder|grape fruit powder/.test(n)) {
    return close('This is grape fruit powder used as a plant color. It is not a synthetic dye.', level);
  }

  if (/acerola/.test(n)) {
    return close('Acerola is a food fruit. It is not a synthetic color.', level);
  }

  if (/tapioca fiber|soluble tapioca/.test(n)) {
    return close('This is tapioca fiber, in the same fiber family as inulin.', level);
  }

  if (/^dextrates\b/.test(n)) {
    return close('Dextrates are a starch sugar. Hydrated dextrates are a different line from bare dextrates.', level);
  }

  if (/sugar spheres/.test(n)) {
    return close('Sugar spheres are a sugar core. The label does not name cane sugar.', level);
  }

  if (/boric acid/.test(n)) {
    return close('Boric acid here is the eye-drop form. It is not the swallowed dose.', level);
  }

  if (/hypromellose phthalate|hypromellose acetate succinate|polyvinyl acetate phthalate|polyvinyl acetate pthalate|methacrylic|eudragit/.test(n)) {
    return close('This is an enteric coating polymer. It is not plain hypromellose.', level);
  }

  if (/phosphoric acid/.test(n)) {
    return close('Phosphoric acid sets acidity. It is not the phosphate salt used as a mineral filler.', level);
  }

  if (/magnesium oxide/.test(n)) {
    return close('Magnesium oxide on an other-ingredients line is a mineral filler. It is not graded as the active antacid.', level);
  }

  if (/allulose/.test(n)) {
    return close('Allulose is a rare sugar. It is not sucralose.', level);
  }

  if (/cocoa butter|theobroma cacao|shea butter|butyrospermum/.test(n) && !/\bpeg\b/.test(n)) {
    return close('This is a butter used as an ointment or cream base. It is not the gummy seed-oil rule.', level);
  }

  if (/caprylyl glycol|hexanediol/.test(n)) {
    return close('This is a skin-conditioning solvent in the caprylyl glycol and hexanediol family.', level);
  }

  if (n === 'vegetable protein isolate') {
    return close('The label says vegetable protein isolate and does not name the plant. Pea protein isolate names the plant and is a different line. This is not soy protein isolate.', level);
  }

  if (/pea protein/.test(n)) {
    return close('Pea protein is a food protein used as a filler. It is not pea starch.', level);
  }

  if (/candelilla/.test(n)) {
    return close('Candelilla wax is a plant wax used as a coating.', level);
  }

  if (/turmeric/.test(n)) {
    return close('This is turmeric used as a plant color. It is not a synthetic dye.', level);
  }

  if (/color added/.test(n) && /vegetable juice/.test(n) && /fruit juice/.test(n)) {
    return close('This box names vegetable juice and fruit juice as the color. It is not bare color added, and it is not the titanium dioxide color.', level);
  }

  if (/juice/.test(n) && /color|concentrate|powder|carrot|vegetable|fruit/.test(n)) {
    return close('This is a named fruit or vegetable juice used as a plant color. It is not a synthetic dye.', level);
  }

  if (/panthenol/.test(n)) {
    return close('Panthenol is a form of vitamin B5 used in a cream.', level);
  }

  if (/glyceryl dibehenate|glyceryl behenate|dibehenin/.test(n)) {
    return close('Glyceryl dibehenate is a tablet lubricant. It is not the mono- and diglyceride row.', level);
  }

  if (/strong ammonia|ammonia solution/.test(n)) {
    return close('This is an ammonia solution used to set pH. It is not ammonium hydroxide.', level);
  }

  if (/isobutane|isopentane|\bpropane\b|\bbutane\b/.test(n)) {
    return close('This is a propellant in a spray. It is not an oil you swallow.', level);
  }

  if (/soy protein isolate/.test(n)) {
    return close('Soy protein isolate names the soy protein. It is not bare soy, and it is not pea protein isolate.', level);
  }

  if (n === 'soy' || n === 'bare soy') {
    return close('The label says soy and does not name lecithin. Soy lecithin is a different line.', level);
  }

  if (n === 'wheat flour') {
    return close(
      'Wheat flour is a food flour. The founder locked it Cleared (t157u). It is not rice flour, and it is not bare wheat.',
      level,
    );
  }

  if (n === 'brown sugar') {
    return close(
      'Brown sugar is a sugar, and the label does not name cane sugar. The founder locked it Caution (t157u). It is not molasses, and it is not the bare sugar row.',
      level,
    );
  }

  if (n === 'oat hull fiber') {
    return close(
      'Oat hull fiber is a food fiber. The founder locked it Cleared (t157u). It is not Organic Oat Hull Fiber, and it is not the oat fiber row.',
      level,
    );
  }

  if (/violet carrot/.test(n)) {
    return close(
      'Violet carrot extract is a named plant color. The founder locked it Cleared (t156u). It is not a synthetic dye, and it is not bare carrot.',
      level,
    );
  }

  if (/black carrot|carrot concentrate|carrot juice/.test(n)) {
    return close('This is a named carrot color. It is not a synthetic dye.', level);
  }

  if (/huito extract/.test(n)) {
    return close(
      'Huito extract is a plant color. The founder locked it Caution (t150u). It is not a synthetic dye.',
      level,
    );
  }

  if (/watermelon extract/.test(n)) {
    return close(
      'Watermelon extract is a named plant color. The founder locked it Cleared (t150u). It is not a synthetic dye.',
      level,
    );
  }

  if (/natural vanilla powder/.test(n)) {
    return close(
      'Natural vanilla powder names vanilla. Under the natural tie-breaker it takes the better of the natural-flavors and vanilla-flavor rows, which is the Caution vanilla flavor line. It is not the Limited natural flavors mixture.',
      level,
    );
  }

  if (/^kelp\b/.test(n)) {
    return close('Kelp is a seaweed. It is not an unnamed flavor mixture.', level);
  }

  return whyFromCitedLock(ingredient);
}

function finishLock(fact: string, level: RiskLevel): string {
  return `${fact.replace(/\.$/, '')}. That is why it is ${riskWord(level)}.`;
}

function whyFromCitedLock(ingredient: IngredientFlag): string | null {
  const source = ingredient.source ?? '';
  const name = ingredient.name.trim();
  const level = ingredient.riskLevel;
  if (!source.trim()) return null;

  if (/not in methodology|ungraded/i.test(source)) {
    if (/residual sanitizer|clean-blocker/i.test(source)) {
      return finishLock(
        `${name} is a residual sanitizer. The ingredient rules do not treat that trace as a High risk flag`,
        level,
      );
    }
    return finishLock(
      `${name} has no row in the ingredient rules, and that gap was not used to invent a High risk flag`,
      level,
    );
  }

  if (/not the gummy seed-oil/i.test(source)) {
    return finishLock(
      `${name} is not the oil that is Not clean as the base of a gummy`,
      level,
    );
  }

  const block = pickMethodologyBlock(name, source);
  if (!block) {
    if (/founder lock/i.test(source)) {
      return finishLock(`${name} is named in the ingredient rules for this row`, level);
    }
    return null;
  }

  return finishLock(roleFact(name, block.grade, block.paren), level);
}

function pickMethodologyBlock(name: string, source: string): { grade: string; paren: string } | null {
  const parts = source.split(/Methodology §5/i).slice(1);
  if (parts.length === 0) return null;
  const tokens = norm(name).split(' ').filter((word) => word.length > 4);
  const hit = parts.find((part) => tokens.some((token) => part.toLowerCase().includes(token))) ?? parts[0];
  const paren = hit.slice(0, 500);
  const grade = paren.match(/^\s*(Cleared|Clear|Caution|Limited-risk|Limited|High|Avoid)/i)?.[1] ?? '';
  return { grade, paren };
}

function roleFact(name: string, gradeWord: string, paren: string): string {
  const detail = paren.toLowerCase();
  if (/milk-protein|non-fat dry milk|nonfat dry milk/.test(detail)) {
    return `${name} is a milk protein. The ingredient rules group it with non-fat dry milk, and that line is not a High risk listing`;
  }
  if (/topical emollient/.test(detail)) {
    return `${name} is an emollient used on the skin. The ingredient rules list that use on its own line`;
  }
  if (/patch adhesive/.test(detail)) {
    return `${name} is an adhesive used on a patch. The ingredient rules give that use its own line, and that line is not a High risk listing`;
  }
  if (/topical botanical|fragrance/.test(detail)) {
    return `${name} is a plant scent used as an inactive. The ingredient rules give that use its own line, and that line is not a High risk listing`;
  }
  if (/oral antacid|swallowed antacid/.test(detail)) {
    return `${name} is listed here as an inactive ingredient, not as a swallowed antacid. The ingredient rules keep that line off the High risk list`;
  }
  if (/inactive header|says inactive/.test(detail)) {
    return `${name} is on the inactive part of the label. The ingredient rules flag that listing, and the flag is not a High risk listing`;
  }
  if (/^clear/i.test(gradeWord) && !/caution/.test(detail)) {
    return `${name} is on the Cleared list in the ingredient rules`;
  }
  if (/caution|limited|not high|not avoid|standalone/.test(`${gradeWord} ${detail}`)) {
    return `${name} has its own line in the ingredient rules, and that line is not a High risk listing`;
  }
  return `${name} is named in the ingredient rules for this row`;
}
