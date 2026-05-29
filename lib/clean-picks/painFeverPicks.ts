// ─── Pain & Fever Clean Picks ─────────────────────────────
// Each entry conforms to the Pick type defined below.
// Field reference:
//   name              - product display name
//   activeIngredient  - active ingredient + strength (shown as small caps)
//   classKey          - key into CLASS_COLORS from classColors.ts
//   classTag          - short uppercase tag shown in pill (NSAID, etc.)
//   form              - 'oral' | 'topical' | 'sublingual' | 'nasal' | 'eye' (filter category)
//   topPick           - optional: 'oral' | 'kids' | 'topical' | 'nasal' (Top Picks tab badge)
//   ageBadge          - optional: pediatric age indicator (e.g., '👶 Ages 2+')
//   subline           - one-line "what it's for"
//   why               - longer "why this pick" callout
//   honestNote        - optional: amber-banner honest disclosure
//   retailers         - array of retailer names (4 visible + "More" rollup)
//   priceTier         - 'Standard' | '$$ premium' | etc.

export type ClassKey =
  // Pain & Fever
  | 'nsaidOral'
  | 'acetaminophen'
  | 'pediatricNsaid'
  | 'topicalNsaid'
  | 'topicalDrugFree'
  | 'homeopathic'
  // Cold & Flu
  | 'expectorant'
  | 'homeopathicLow'
  | 'immuneHerbal'
  | 'propolis'
  | 'pediatricCombo'
  | 'elderberry'
  | 'topicalChestRub'
  // Allergies
  | 'antihistamine'
  | 'salineNasal';

export type PickForm = 'oral' | 'topical' | 'sublingual' | 'nasal' | 'eye';
export type TopPickCategory = 'oral' | 'kids' | 'topical' | 'nasal';

export type Pick = {
  name: string;
  activeIngredient: string;
  classKey: ClassKey;
  classTag: string;
  form: PickForm;
  topPick?: TopPickCategory;
  ageBadge?: string;
  subline: string;
  why: string;
  honestNote?: string;
  retailers: string[];
  priceTier: string;
};

export const PAIN_FEVER_PICKS: Pick[] = [
  
  {
    name: 'Tylenol Extra Strength Dye-Free',
    activeIngredient: 'Acetaminophen 500mg',
    classKey: 'acetaminophen',
    classTag: 'ACETAMINOPHEN',
    form: 'oral',
    topPick: 'oral',
    subline: 'Headache, fever, body aches, menstrual cramps, sore throat pain',
    why: 'Single active ingredient, no artificial dyes. The cleanest mainstream adult oral pain reliever widely available — found at every drugstore, grocery, and big box.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Grocery'],
    priceTier: 'Standard',
  },
  {
    name: 'Voltaren Gel',
    activeIngredient: 'Diclofenac sodium 1%',
    classKey: 'topicalNsaid',
    classTag: 'TOPICAL NSAID',
    form: 'topical',
    topPick: 'topical',
    subline: 'Joint pain, arthritis, localized muscle pain',
    why: 'Topical NSAID delivers anti-inflammatory action straight to the joint with far less systemic exposure than oral NSAIDs. FDA-approved OTC for hand, wrist, elbow, foot, ankle, and knee pain.',
    honestNote: 'Wash hands after applying. Not for use during pregnancy.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Grocery'],
    priceTier: '$$ premium',
  },
  {
    name: 'Biofreeze',
    activeIngredient: 'Menthol 3.5% or 10.5%',
    classKey: 'topicalDrugFree',
    classTag: 'TOPICAL · DRUG-FREE',
    form: 'topical',
    subline: 'Muscle pain, back pain, tension, post-workout soreness',
    why: 'Drug-free topical relief. Menthol activates cooling receptors for fast localized pain reduction. Dye-free and fragrance-free formulations available.',
    honestNote: 'External use only. Stop if skin irritation develops.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Grocery'],
    priceTier: 'Standard',
  },
  {
    name: "Genexa Kids' Pain & Fever",
    activeIngredient: 'Acetaminophen 160mg / 5mL',
    classKey: 'acetaminophen',
    classTag: 'CLEANEST',
    form: 'oral',
    topPick: 'kids',
    ageBadge: '👶 Ages 2+',
    subline: 'Kids · fever · pain',
    why: 'The cleanest pediatric acetaminophen we found. Free from artificial dyes, artificial preservatives, artificial sweeteners, common allergens. Sweetened with organic agave instead of sucralose. Same effective acetaminophen as conventional brands.',
    honestNote: 'Pediatricians surveyed by Genexa preferred this ingredient profile over conventional alternatives. Always dose by weight, not just age.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Walmart', 'Kroger', 'Whole Foods', 'Sprouts'],
    priceTier: '$$ premium',
  },
  {
    name: 'Genexa Acetaminophen Extra Strength',
    activeIngredient: 'Acetaminophen 500mg',
    classKey: 'acetaminophen',
    classTag: 'CLEANEST',
    form: 'oral',
    subline: 'Adult headache, fever, body aches',
    why: 'Same 500mg acetaminophen as Tylenol Extra Strength but without titanium dioxide and other unnecessary additives. Certified vegan. The cleanest adult acetaminophen tablet widely available.',
    honestNote: 'Stay under 4g/day total. Same liver-protective guidance as any acetaminophen.',
    retailers: ['Whole Foods', 'Sprouts', 'Walmart', 'Online'],
    priceTier: '$$ premium',
  },
  {
    name: "Children's Tylenol Dye-Free",
    activeIngredient: 'Acetaminophen 160mg / 5mL',
    classKey: 'acetaminophen',
    classTag: 'ACETAMINOPHEN',
    form: 'oral',
    ageBadge: '👶 Ages 2+',
    subline: 'Kids · fever · pain (alt to Genexa)',
    why: "Removes the artificial dyes (Red 40, etc.) found in conventional Children's Tylenol. Easier to find than Genexa at most drugstores.",
    honestNote: 'Honest: still contains sucralose, sorbitol, and other inactive ingredients. Cleaner than the colored version, not perfect. Genexa is the cleaner choice when available.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Grocery'],
    priceTier: 'Standard',
  },
  {
    name: "Children's Motrin Dye-Free",
    activeIngredient: 'Ibuprofen 100mg / 5mL',
    classKey: 'pediatricNsaid',
    classTag: 'PEDIATRIC NSAID',
    form: 'oral',
    ageBadge: '👶 Ages 2+',
    subline: 'Kids · inflammation · fever · dental · muscle',
    why: "Dye-free version of Children's Motrin — skips Red 40 and artificial colors found in the standard version.",
    honestNote: 'Honest: still contains acesulfame potassium (artificial sweetener) and other inactive ingredients. Cleaner than the colored version, not perfect.',
    retailers: ['CVS', 'Walgreens', 'Target', 'Grocery'],
    priceTier: 'Standard',
  },
  {
    name: 'Boiron Arnicare Cream / Gel',
    activeIngredient: 'Arnica montana 1X HPUS',
    classKey: 'topicalDrugFree',
    classTag: 'TOPICAL · DRUG-FREE',
    form: 'topical',
    subline: 'Muscle soreness, bruising, post-workout recovery',
    why: 'Topical arnica has real clinical evidence for musculoskeletal pain and bruising. Drug-free. No fragrance or artificial dyes in the unscented version. Suitable for kids 2+ and most adults.',
    honestNote: 'External use only. Do not apply to broken skin.',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    priceTier: 'Standard',
  },
  {
    name: 'Boiron Arnica 30C Pellets',
    activeIngredient: 'Arnica montana 30C HPUS',
    classKey: 'homeopathic',
    classTag: 'HOMEOPATHIC',
    form: 'sublingual',
    subline: 'Bruising, muscle soreness, post-workout recovery',
    why: 'Oral homeopathic arnica. Drug-free, no dye, no sugar, no gluten. Dissolves under the tongue with no water needed — useful when topical application is not practical.',
    honestNote: 'Homeopathic preparation per FDA framework. Evidence base discussed in Carlston M (ed), Classical Homeopathy (Churchill Livingstone, 2003).',
    retailers: ['CVS', 'Walgreens', 'Whole Foods', 'Sprouts'],
    priceTier: 'Standard',
  },
];