// DRAFT / not verified / batch 33 Hyland’s US catalog / methodology
// v1.6 + Sept 14 locks + Sept 15 founder-carton closeout.
// Founder owns final Avoid vs Caution vs Clean.
//
// Hyland’s in-scope OTC / homeopathic / supplement drafts. Whole in-scope
// line — not one aisle. Mixed categories · recordStatus is 'unverified' on
// every row. Internal keys only: clean | caution | avoid. Do NOT invent
// Clean. Do NOT invent UPCs / barcodes. Pack sizes share formulaId.
// formulaId == id on every NEW row. Form is labeled on cleanAlternatives,
// not a hard filter (§6). Not wired into Clean Picks UI. No live Clean
// Picks file is edited. No photos. Letter tiles only on new ids.
// No MegaFood / Genexa rewrites. No fake Clean alts.
//
// REUSE ONLY (do not rewrite grades except the grape-daytime OI update
// on batch4 — glycyrrhiza now Cleared; verdict stays Caution):
// - hylands-calms-forte — clean
// - hylands-sleep — clean
// - hylands-rest — clean
// - hylands-4kids-calm-restful — clean
// - hylands-4kids-cold-n-cough — caution (Grape daytime liquid ONLY;
//   grape packets share this formula). Do NOT reuse for Original or Nighttime.
// - hylands-naturals-earache-drops — clean
//
// TALLY (unverified drafts in THIS file): 49 rows — Clean 28 / Caution 20 /
// Avoid 1.
// Independently Clean in THIS batch: all acacia+lactose / lactose+stearate+MCC
// tablets, the four Organic Cough & Immune syrups (water + citric acid), and
// the two Organic Baby All-in-One Cough syrups (agave + glycerin + water).
//
// SEPT 14 LOCKS APPLIED
// - Glycyrrhiza / licorice extract = Cleared named botanical. Do NOT Caution
//   the product on licorice alone. Tap + honest-note line (exact):
//   “Licorice extract. Very high intakes of glycyrrhizin can affect blood
//   pressure and potassium — that is not this syrup dose.”
// - Wood rosin / colophony (topical) = Caution, not Avoid.
// - FDA is one source, not a veto.
// SEPT 15 FOUNDER-CARTON CLOSEOUT
// - Lavender oil (topical) = fragrance-style Caution. Wintergreen extract
//   (topical inactive) = Caution. Vegetable oil in cream is NOT gummy High
//   (form-scope tap). Rebaudioside M = Cleared steviol-glycoside sibling.
// - Ethyl alcohol Limited / petrolatum / stearyl / SSG / tapioca fiber /
//   lactic / malic already in §5 — creams + PRID now writable.
// - Limited-only stack stays Caution (no 3-pt Avoid).
// - Kids melatonin = on-carton only, no dosing. Zinc parked.
// - Organic natural flavors on these liquids = Limited flavor-opacity
//   (founder Caution). Cherry flavor Limited 1 on Soothing Gels + Drops.
// - Named food/botanical extracts as oral inactive (fennel / chamomile /
//   calendula / lemon balm and like named plant-part food botanicals) =
//   Cleared. Same class as grape seed extract. Do not Caution on those
//   extracts alone.
// - Lecithin ≠ seed oil. FOS is active on Digestive Support gummies.
// - Organic sunflower oil in a gummy = High Avoid.
// - SiO2 / Silicea is a homeopathic ACTIVE on Cell Salt #12 and among
//   Bioplasma / Baby Mucus actives — not the inactive nanoparticle cap.
//
// KITS / BUNDLES OUT (no rows): Kids Cold & Cough combo; Kids Cough & Mucus
// combo; Baby Mucus combo; Baby Tiny Cold combo; Organic Kids/Baby Cough &
// Immune combos; Organic Kids/Baby All-in-One combos; Organic Baby Soothing
// Gel/Drops combos; Leg Cramps Trio; 8 Cell Salts Bundle. Night / combo
// formulas are written as the single-formula row only.
//
// STILL BLOCKED (do not invent): none. Hyland leftovers: none.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const COLD_FLU = 'Cold & Flu';
const PAIN_FEVER = 'Pain & Fever';
const ALLERGIES = 'Allergies';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune Support';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const BRAND = "Hyland's";
const UNVERIFIED_NOTE = 'draft, not verified';

const LICORICE_LINE =
  'Licorice extract. Very high intakes of glycyrrhizin can affect blood pressure and potassium — that is not this syrup dose.';

const METH = {
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  benzoate: 'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / acacia / pectin — locked v1.6)',
  cleared: 'Methodology §5 Cleared',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors / organic colors)',
  glycyrrhiza:
    `Methodology §5 Cleared (glycyrrhiza / licorice extract — named botanical; locked Sept 14, 2026). ${LICORICE_LINE}`,
  seedOilGummies:
    'Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, "vegetable oil", sunflower, palm)',
  creamVegOil:
    'Seed/industrial oils are flagged in gummies. In this cream they are not that High rule. Methodology §5 form-scope (cream / topical vegetable oil — not the gummy High).',
  sorbate: 'Methodology §5 Limited-risk (synthetic preservatives — potassium sorbate)',
  ethylAlcohol:
    'Methodology §5 Limited-risk (ethyl alcohol as topical / drawing-salve vehicle). Not oral-PG. Not Avoid.',
  sugarAlcohols:
    'Methodology §5 Limited-risk (sugar alcohols — maltitol / xylitol / erythritol; GI effects at volume)',
  lavender:
    'Methodology §5 Caution (lavender oil — fragrance-style topical; standalone Caution, not additive-scored, not Avoid). Can irritate skin or trigger allergy in sensitive people.',
  wintergreen:
    'Methodology §5 Caution (wintergreen extract, topical inactive — standalone Caution, not additive-scored, not Avoid).',
  woodRosin:
    'Methodology §5 Caution (wood rosin / colophony, topical — contact-allergy pattern; standalone Caution, not Avoid).',
  petrolatum: 'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol, topical — fatty alcohols)',
  ssg: 'Methodology §5 Cleared (sodium stearoyl glutamate — stearate-family emulsifier)',
  organicAcid: 'Methodology §5 Cleared (lactic acid / malic acid — organic acids with citric)',
  tapiocaFiber:
    'Methodology §5 Cleared (FOS / fructooligosaccharides / soluble tapioca fiber syrup — fiber family with inulin / tapioca syrup)',
  inulin: 'Methodology §5 Cleared (inulin as fiber)',
  lecithin:
    'Methodology §5 Cleared (sunflower lecithin). Lecithin is not the gummy seed-oil High rule.',
  plantJuice:
    'Methodology §5 Cleared (named fruit-or-vegetable juice as color)',
  rebM:
    'Methodology §5 Cleared (Rebaudioside M — high-purity steviol glycoside sibling; locked with stevia extract)',
  namedBotanical:
    'Methodology §5 Cleared (named food/botanical extract as oral inactive — fennel / chamomile / calendula / lemon balm and like named plant-part food botanicals; same class as grape seed extract). Do not Caution the product on these extracts alone.',
} as const;

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const ZINC_PARKED =
  'Zinc is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const MELATONIN_CARTON =
  'Kids melatonin is on-carton only — no dosing in this draft. Cleanliness grade only; no efficacy claim.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid.';

const CREAM_OIL_LINE =
  'Seed/industrial oils are flagged in gummies. In this cream they are not that High rule.';

const HYLANDS_RETAILERS = [
  'Hylands.com',
  'CVS',
  'Walgreens',
  'Walmart',
  'Target',
  'Amazon',
  'Whole Foods',
  'Sprouts',
] as const;

const GENEXA_MULTI = 'genexa-kids-multi-cold-flu-liquid';
const COLDCALM = 'boiron-coldcalm-meltaways';
const OSCILLO = 'oscillococcinum';
const STUFFY = 'hylands-4kids-stuffy-nose-sinus';
const ORG_KIDS_DAY = 'hylands-organic-kids-cough-immune-day';
const TINY_COLD_DAY = 'hylands-baby-tiny-cold-day';
const ORG_BABY_ALLINONE_DAY = 'hylands-organic-baby-all-in-one-cough-day';
const BABY_ORAL_PAIN_DAY = 'hylands-baby-oral-pain-day';
const LEG_CRAMPS_TABS = 'hylands-leg-cramps';
const ARNICA_30X = 'hylands-arnica-30x';
const HYLANDS_SLEEP = 'hylands-sleep';
const HYLANDS_4KIDS_CALM = 'hylands-4kids-calm-restful';
const CALENDULA_OINT = 'boiron-calendula-ointment';
const ARNICARE_GEL = 'boiron-arnicare-gel';

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function dailymed(setid: string, meth: string): string {
  return `DailyMed setid ${setid}; ${meth}`;
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function homeopathicFields() {
  return {
    productType: 'OTC' as const,
    productSubtype: HOMEOPATHIC,
    homeopathicSubtype: HOMEOPATHIC,
  };
}

function acaciaLactose(setid: string): IngredientFlag[] {
  return [
    flag('Acacia gum', 'cleared', dailymed(setid, METH.gums)),
    flag('Lactose', 'cleared', dailymed(setid, METH.cleared)),
  ];
}

function acaciaLactoseSite(url: string): IngredientFlag[] {
  return [
    flag('Acacia gum', 'cleared', labelCite(url, METH.gums)),
    flag('Lactose', 'cleared', labelCite(url, METH.cleared)),
  ];
}

function syrupBase(setid: string, extras: IngredientFlag[] = []): IngredientFlag[] {
  return [
    flag('Citric acid', 'cleared', dailymed(setid, METH.cleared)),
    flag('Glycerin', 'cleared', dailymed(setid, METH.cleared)),
    flag('Glycyrrhiza extract', 'cleared', dailymed(setid, METH.glycyrrhiza)),
    ...extras,
    flag('Purified water', 'cleared', dailymed(setid, METH.cleared)),
    flag('Sodium benzoate', 'limited', dailymed(setid, METH.benzoate)),
  ];
}

const KIDS_COLD_ALTS: CleanAlternative[] = [
  alt(
    ORG_KIDS_DAY,
    'Independently Clean kids Cold & Flu analog in this batch (Organic Kids Cough & Immune Daytime, minAge 1). Form: liquid — labeled, not a hard filter (§6). Dietary supplement vs homeopathic — cleanliness only.',
  ),
  alt(
    STUFFY,
    "Independently Clean kids homeopathic tablet in this batch (Hyland's Kids Stuffy Nose & Sinus, minAge 2). Form: meltaway tablet vs liquid — labeled, not a hard filter (§6).",
  ),
  alt(
    GENEXA_MULTI,
    'Closest independently Clean kids Cold & Flu analog already on main (conventional liquid, APAP + DXM, minAge 4). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    COLDCALM,
    'Independently Clean kids-usable homeopathic meltaway already on main (minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  ),
];

const BABY_COLD_ALTS: CleanAlternative[] = [
  alt(
    TINY_COLD_DAY,
    "Independently Clean baby homeopathic tablet in this batch (Hyland's Baby Tiny Cold Daytime, minAge 0 / 6-month chart). Form: tablet vs liquid — labeled, not a hard filter (§6). Cleanliness only.",
  ),
];

const ELDERBERRY_ALTS: CleanAlternative[] = [
  alt(
    OSCILLO,
    'Independently Clean Immune analog already on main (Boiron Oscillococcinum, minAge 2). Form: meltaway pellets vs gummy — labeled, not a hard filter (§6). Cleanliness only. Do not invent a Clean Hyland’s elderberry.',
  ),
];

const CREAM_ALTS: CleanAlternative[] = [
  alt(
    LEG_CRAMPS_TABS,
    "Independently Clean adult Leg Cramps analog in this batch (Hyland's Leg Cramps tablets). Form: meltaway tablet vs cream — labeled, not a hard filter (§6).",
  ),
  alt(
    ARNICA_30X,
    "Independently Clean adult Arnica analog in this batch (Hyland's Arnica 30X). Form: meltaway tablet vs cream — labeled, not a hard filter (§6).",
  ),
  alt(
    ARNICARE_GEL,
    'Independently Clean adult first-aid / topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream — labeled, not a hard filter (§6). Cleanliness only.',
  ),
];

const SLEEP_CALM_ALTS: CleanAlternative[] = [
  alt(
    HYLANDS_4KIDS_CALM,
    "Independently Clean kids homeopathic Sleep analog already on main (Hyland's 4 Kids Calm & Restful, minAge 2). Form: meltaway tablet vs liquid — labeled, not a hard filter (§6). Do not invent a Clean kids melatonin.",
  ),
  alt(
    HYLANDS_SLEEP,
    "Independently Clean kids-usable homeopathic Sleep analog already on main (Hyland's Sleep, minAge 6). Form: meltaway tablet vs liquid — labeled, not a hard filter (§6).",
  ),
];

const KIDS_ALLINONE_ALTS: CleanAlternative[] = [
  alt(
    ORG_KIDS_DAY,
    'Independently Clean kids Cold & Flu analog in this batch (Organic Kids Cough & Immune Daytime, minAge 1). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    ORG_BABY_ALLINONE_DAY,
    'Independently Clean baby All-in-One analog in this batch (Organic Baby All-in-One Cough Daytime; carton 6+ months). Form: liquid — labeled, not a hard filter (§6).',
  ),
];

const SOOTHING_GEL_ALTS: CleanAlternative[] = [
  alt(
    BABY_ORAL_PAIN_DAY,
    "Independently Clean baby oral-pain analog in this batch (Hyland's Baby Oral Pain Relief Daytime, minAge 0). Form: meltaway tablet vs gel — labeled, not a hard filter (§6).",
  ),
];

const SOOTHING_DROPS_ALTS: CleanAlternative[] = [
  alt(
    BABY_ORAL_PAIN_DAY,
    "Independently Clean baby oral-pain analog in this batch (Hyland's Baby Oral Pain Relief Daytime, minAge 0). Form: meltaway tablet vs drops — labeled, not a hard filter (§6).",
  ),
];

const PRID_ALTS: CleanAlternative[] = [
  alt(
    CALENDULA_OINT,
    'Independently Clean adult First Aid analog already on main (Boiron Calendula Ointment). Form: ointment vs salve — labeled, not a hard filter (§6). Cleanliness only.',
  ),
  alt(
    ARNICARE_GEL,
    'Independently Clean adult first-aid topical analog already on main (Boiron Arnicare Gel). Form: gel vs salve — labeled, not a hard filter (§6). Cleanliness only.',
  ),
];

function homeoNote(lead: string): string {
  return `${lead} Homeopathic — cleanliness only, no efficacy claim. ${CARLSTON} Contains lactose. Pack sizes share formulaId.`;
}

export const BATCH33_HYLANDS: RatingRecord[] = [
  // ── Clean tablets (acacia + lactose = 0) ─────────────────
  {
    id: 'hylands-arnica-30x',
    barcode: '354973326613',
    productName: "Hyland's Arnica 30X Tablets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-arnica-30x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Arnica montana', strength: '30X HPUS' }],
    inactiveIngredients: acaciaLactose('85fcf1c8-6f89-4862-85a8-4983cbea28f4'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Hyland's Arnica 30X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-arnica-tablets-30x — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=85fcf1c8-6f89-4862-85a8-4983cbea28f4 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-baby-oral-pain-day',
    barcode: '354973331518',
    productName: "Hyland's Baby Oral Pain Relief Daytime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-baby-oral-pain-day',
    audience: KIDS,
    minAge: 0,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30X HPUS' },
      { name: 'Calcarea carbonica', strength: '12X HPUS' },
      { name: 'Calcarea phosphorica', strength: '12X HPUS' },
      { name: 'Chamomilla', strength: '12X HPUS' },
      { name: 'Coffea cruda', strength: '6X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '12X HPUS' },
    ],
    inactiveIngredients: acaciaLactoseSite(
      'https://hylands.com/products/hylands-baby-oral-pain-relief',
    ),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Baby Oral Pain Daytime = Clean. Acacia gum + lactose = 0 pt. Site OI (no DailyMed SPL in the scan). Different actives from Nighttime — do not merge. Carton starts under 6 months (minAge 0).",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-oral-pain-relief — ' + UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-baby-oral-pain-night',
    barcode: '354973332416',
    productName: "Hyland's Baby Oral Pain Relief Nighttime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-baby-oral-pain-night',
    audience: KIDS,
    minAge: 0,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30X HPUS' },
      { name: 'Calcarea carbonica', strength: '12X HPUS' },
      { name: 'Calcarea phosphorica', strength: '12X HPUS' },
      { name: 'Chamomilla', strength: '12X HPUS' },
      { name: 'Coffea cruda', strength: '6X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '12X HPUS' },
      { name: 'Magnesia phosphorica', strength: '12X HPUS' },
      { name: 'Silicea', strength: '12X HPUS' },
    ],
    inactiveIngredients: acaciaLactoseSite(
      'https://hylands.com/products/hylands-baby-nighttime-oral-pain-relief',
    ),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Baby Oral Pain Nighttime = Clean. Acacia gum + lactose = 0 pt. Adds Magnesia Phosphorica + Silicea vs daytime — do not merge. Site OI (no DailyMed SPL in the scan). Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. Carton starts under 6 months (minAge 0).",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-nighttime-oral-pain-relief — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-ferrum-phos-6x',
    productName: "Hyland's Cell Salt #4 Ferrum Phos 6X",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-ferrum-phos-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Ferrum phosphoricum', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('db9e7a2f-5ee0-57c7-e053-2995a90a7542'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Ferrum Phos 6X = Clean. Acacia gum + lactose = 0 pt. 30X Amazon bottles are a different strength — not this row.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-ferrum-phos — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db9e7a2f-5ee0-57c7-e053-2995a90a7542 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-mag-phos-6x',
    barcode: '354973409415',
    productName: "Hyland's Cell Salt #8 Mag Phos 6X",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-mag-phos-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Magnesia phosphorica', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dd0750b0-f6b5-354f-e053-2995a90a9d1f'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Mag Phos 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-mag-phos — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd0750b0-f6b5-354f-e053-2995a90a9d1f — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-leg-cramps',
    barcode: '354973295612 354973295667',
    productName: "Hyland's Leg Cramps Tablets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-leg-cramps',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '6X HPUS' },
      { name: 'Cinchona officinalis', strength: '3X HPUS' },
      { name: 'Gnaphalium polycephalum', strength: '3X HPUS' },
      { name: 'Ledum palustre', strength: '6X HPUS' },
      { name: 'Magnesia phosphorica', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Viscum album', strength: '3X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('53425c3b-6117-475c-bd8c-08f05b452078'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Leg Cramps tablets = Clean. Acacia gum + lactose = 0 pt. Current meltaway SPL only — do not merge with the older swallowed-tablet SPL (lactose + magnesium stearate + MCC) or with PM / +Arnica caplets / creams. 50/100 share formulaId.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-leg-cramps — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=53425c3b-6117-475c-bd8c-08f05b452078 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-leg-cramps-pm',
    barcode: '354973309319',
    productName: "Hyland's Leg Cramps PM Tablets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-leg-cramps-pm',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calcarea carbonica', strength: '12X HPUS' },
      { name: 'Causticum', strength: '12X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Cinchona officinalis', strength: '3X HPUS' },
      { name: 'Cuprum metallicum', strength: '12X HPUS' },
      { name: 'Lycopodium', strength: '12X HPUS' },
      { name: 'Magnesia phosphorica', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Silicea', strength: '12X HPUS' },
      { name: 'Sulphur', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('b0574a7e-88fa-417e-b6d5-60ced59eba47'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Leg Cramps PM tablets = Clean. Acacia gum + lactose = 0 pt. Different actives from daytime tablets — do not merge. Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. 50/100 share formulaId.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-leg-cramps-pm — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b0574a7e-88fa-417e-b6d5-60ced59eba47 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-leg-cramps-arnica-caplets',
    barcode: '354973412620',
    productName: "Hyland's Leg Cramps + Arnica Caplets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-leg-cramps-arnica-caplets',
    audience: ADULT,
    minAge: 12,
    form: 'caplet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '5X HPUS' },
      { name: 'Arnica montana', strength: '5X HPUS' },
      { name: 'Cinchona officinalis', strength: '2X HPUS' },
      { name: 'Gnaphalium polycephalum', strength: '2X HPUS' },
      { name: 'Ledum palustre', strength: '5X HPUS' },
      { name: 'Magnesia phosphorica', strength: '5X HPUS' },
      { name: 'Rhus toxicodendron', strength: '5X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Lactose',
        'cleared',
        dailymed('142ea9b2-63f9-6a04-e063-6394a90a7fc9', METH.cleared),
      ),
      flag(
        'Magnesium stearate',
        'cleared',
        dailymed('142ea9b2-63f9-6a04-e063-6394a90a7fc9', METH.cleared),
      ),
      flag(
        'Microcrystalline cellulose',
        'cleared',
        dailymed('142ea9b2-63f9-6a04-e063-6394a90a7fc9', METH.cleared),
      ),
    ],
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Leg Cramps + Arnica caplets = Clean. Lactose + magnesium stearate + MCC = 0 pt. Not the meltaway tablet and not the cream rows.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/leg-cramps-arnica-caplets — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=142ea9b2-63f9-6a04-e063-6394a90a7fc9 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-restful-legs',
    barcode: '354973316218',
    productName: "Hyland's Restful Legs Tablets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-restful-legs',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arsenicum album', strength: '12X HPUS' },
      { name: 'Lycopodium', strength: '6X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '6X HPUS' },
      { name: 'Zincum metallicum', strength: '12X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('36e5843c-916a-425c-becc-15674cda7a65'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Restful Legs = Clean. Acacia gum + lactose = 0 pt. Different actives from Restful Legs PM — do not merge. 50/100 share formulaId.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-restful-legs — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=36e5843c-916a-425c-becc-15674cda7a65 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-restful-legs-pm',
    barcode: '354973335219',
    productName: "Hyland's Restful Legs PM Tablets",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-restful-legs-pm',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arsenicum album', strength: '12X HPUS' },
      { name: 'Chamomilla', strength: '3X HPUS' },
      { name: 'Coffea cruda', strength: '3X HPUS' },
      { name: 'Lycopodium', strength: '6X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '6X HPUS' },
      { name: 'Zincum metallicum', strength: '12X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('67667af8-b27b-1511-e053-2991aa0a3988'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Restful Legs PM = Clean. Acacia gum + lactose = 0 pt. Adds Chamomilla + Coffea vs daytime — do not merge. 50/100 share formulaId.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-restful-legs-pm — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=67667af8-b27b-1511-e053-2991aa0a3988 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-seasonal-allergy-relief',
    barcode: '354973301214',
    productName: "Hyland's Seasonal Allergy Relief Tablets",
    brand: BRAND,
    category: ALLERGIES,
    formulaId: 'hylands-seasonal-allergy-relief',
    audience: ADULT,
    minAge: 12,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Galphimia glauca', strength: '12X HPUS' },
      { name: 'Histaminum hydrochloricum', strength: '12X HPUS' },
      { name: 'Luffa operculata', strength: '12X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Nux vomica', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('101e6b80-cdae-49e5-acfb-f056448856ec'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Seasonal Allergy Relief = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-seasonal-allergy-relief-tablets — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=101e6b80-cdae-49e5-acfb-f056448856ec — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-nerve-tonic',
    barcode: '354973301443',
    productName: "Hyland's Nerve Tonic Tablets",
    brand: BRAND,
    category: SLEEP,
    formulaId: 'hylands-nerve-tonic',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calcarea phosphorica', strength: '3X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '3X HPUS' },
      { name: 'Kali phosphoricum', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '3X HPUS' },
      { name: 'Natrum phosphoricum', strength: '3X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('c7ea84ee-5844-4b14-9792-2c45729fccab'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Nerve Tonic = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-nerve-tonic — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7ea84ee-5844-4b14-9792-2c45729fccab — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: STUFFY,
    barcode: '354973340619',
    productName: "Hyland's Kids Stuffy Nose & Sinus",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: STUFFY,
    audience: KIDS,
    minAge: 2,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calcarea carbonica', strength: '3X HPUS' },
      { name: 'Hydrastis canadensis', strength: '6X HPUS' },
      { name: 'Kali bichromicum', strength: '6X HPUS' },
      { name: 'Pulsatilla nigricans', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('a00f1db3-cae4-5729-e053-2a95a90ab001'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Kids Stuffy Nose & Sinus = Clean. Acacia gum + lactose = 0 pt. Ages 2+.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hyland-s-4-kids-stuffy-nose-sinus — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a00f1db3-cae4-5729-e053-2a95a90ab001 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: TINY_COLD_DAY,
    barcode: '354973315815',
    productName: "Hyland's Baby Tiny Cold Tablets Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: TINY_COLD_DAY,
    audience: KIDS,
    minAge: 0,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Eupatorium perfoliatum', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6X HPUS' },
      { name: 'Kali iodatum', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('7576bd5e-502e-4edf-99da-59cb1e97043f'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Baby Tiny Cold Daytime = Clean. Acacia gum + lactose = 0 pt. Different actives from Nighttime — do not merge. Under 6 months: ask a doctor (minAge 0).",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-tiny-cold-tablets — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7576bd5e-502e-4edf-99da-59cb1e97043f — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-baby-tiny-cold-night',
    productName: "Hyland's Baby Tiny Cold Tablets Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-baby-tiny-cold-night',
    audience: KIDS,
    minAge: 0,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '6X HPUS' },
      { name: 'Kali iodatum', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('275f18d5-739e-4055-9553-10ae2be836ad'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Baby Tiny Cold Nighttime = Clean. Acacia gum + lactose = 0 pt. Adds Chamomilla vs daytime — do not merge. Combo-only on Hylands.com; written as the single-formula row. Under 6 months: ask a doctor (minAge 0).",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-tiny-cold-tablets-day-and-nighttime-value-pack — combo page; ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=275f18d5-739e-4055-9553-10ae2be836ad — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-bioplasma',
    barcode: '354973408616',
    productName: "Hyland's Cell Salt Bioplasma Tablets",
    brand: BRAND,
    category: IMMUNE,
    formulaId: 'hylands-bioplasma',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Calcarea fluorica', strength: '6X HPUS' },
      { name: 'Calcarea phosphorica', strength: '3X HPUS' },
      { name: 'Calcarea sulphurica', strength: '3X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '3X HPUS' },
      { name: 'Kali muriaticum', strength: '3X HPUS' },
      { name: 'Kali phosphoricum', strength: '3X HPUS' },
      { name: 'Kali sulphuricum', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '3X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Natrum phosphoricum', strength: '3X HPUS' },
      { name: 'Natrum sulphuricum', strength: '3X HPUS' },
      { name: 'Silicea', strength: '6X HPUS' },
    ],
    inactiveIngredients: acaciaLactose('dd0a7ed2-d112-4b96-e053-2995a90ac6b6'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Bioplasma = Clean. Acacia gum + lactose = 0 pt. Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. 100/300 share formulaId. Not the 8 Cell Salts Bundle kit.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-bioplasma — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd0a7ed2-d112-4b96-e053-2995a90ac6b6 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-calc-fluor-6x',
    barcode: '354973408715',
    productName: "Hyland's Cell Salt #1 Calc Fluor 6X",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-calc-fluor-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Calcarea fluorica', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dbed54cc-12ec-0a73-e053-2a95a90a8cc2'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #1 Calc Fluor 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-calc-fluor — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dbed54cc-12ec-0a73-e053-2a95a90a8cc2 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-calc-phos-6x',
    productName: "Hyland's Cell Salt #2 Calc Phos 6X",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-calc-phos-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Calcarea phosphorica', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dbef661a-26e9-7c2b-e053-2995a90a80e0'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #2 Calc Phos 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-calc-phos — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dbef661a-26e9-7c2b-e053-2995a90a80e0 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-kali-phos-6x',
    barcode: '354973409217',
    productName: "Hyland's Cell Salt #6 Kali Phos 6X",
    brand: BRAND,
    category: SLEEP,
    formulaId: 'hylands-kali-phos-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Kali phosphoricum', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dbfe86e8-c06f-2a84-e053-2a95a90a1f3d'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #6 Kali Phos 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-kali-phos — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dbfe86e8-c06f-2a84-e053-2a95a90a1f3d — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-nat-mur-6x',
    barcode: '354973409514',
    productName: "Hyland's Cell Salt #9 Nat Mur 6X",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-nat-mur-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Natrum muriaticum', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dcf0e2ac-3b69-3ae4-e053-2a95a90aaf41'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #9 Nat Mur 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-nat-mur — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dcf0e2ac-3b69-3ae4-e053-2a95a90aaf41 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-nat-phos-6x',
    barcode: '354973409613',
    productName: "Hyland's Cell Salt #10 Nat Phos 6X",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'hylands-nat-phos-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Natrum phosphoricum', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('dc7c259e-4bcc-c3d9-e053-2a95a90a0c01'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #10 Nat Phos 6X = Clean. Acacia gum + lactose = 0 pt.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-nat-phos — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dc7c259e-4bcc-c3d9-e053-2a95a90a0c01 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-silicea-6x',
    barcode: '354973409811',
    productName: "Hyland's Cell Salt #12 Silicea 6X",
    brand: BRAND,
    category: FIRST_AID,
    formulaId: 'hylands-silicea-6x',
    audience: ADULT,
    minAge: 6,
    form: 'meltaway tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [{ name: 'Silicea (silicon dioxide)', strength: '6X HPUS' }],
    inactiveIngredients: acaciaLactose('db4be3c1-aa7e-24a2-e053-2a95a90a0c66'),
    verdict: 'clean',
    honestNote: homeoNote(
      "FOUNDER-STYLE DRAFT: Cell Salt #12 Silicea 6X = Clean. Acacia gum + lactose = 0 pt. Silicon dioxide / Silicea is the homeopathic ACTIVE, not an inactive — the SiO2 nanoparticle Caution cap does not apply.",
    ),
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/hylands-silicea — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db4be3c1-aa7e-24a2-e053-2a95a90a0c66 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  // ── Clean supplements (water + citric acid) ──────────────
  {
    id: ORG_KIDS_DAY,
    barcode: '810087820183',
    productName: "Hyland's Organic Kids Cough & Immune Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: ORG_KIDS_DAY,
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-cough-immune-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-cough-immune-daytime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER-STYLE DRAFT: Organic Kids Cough & Immune Daytime = Clean. Other Ingredients are water + citric acid = 0 pt. Honey / pomegranate sit on the formula side, not OI. Carton ages 1–12. Distinct from Nighttime and from Baby Daytime despite the same OI. No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId.",
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-kids-cough-immune-daytime — ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-kids-cough-immune-night',
    barcode: '810087820190',
    productName: "Hyland's Organic Kids Cough & Immune Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-kids-cough-immune-night',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-cough-immune-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-cough-immune-nighttime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER-STYLE DRAFT: Organic Kids Cough & Immune Nighttime = Clean. Other Ingredients are water + citric acid = 0 pt. Chamomile sits on the formula side, not OI. Do not merge with daytime. Carton ages 1–12. No DailyMed drug SPL (dietary supplement).",
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-kids-cough-immune-nighttime — ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-baby-cough-immune-day',
    barcode: '810087820268',
    productName: "Hyland's Organic Baby Cough & Immune Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-baby-cough-immune-day',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-cough-immune-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-cough-immune-daytime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER-STYLE DRAFT: Organic Baby Cough & Immune Daytime = Clean. Other Ingredients are water + citric acid = 0 pt. No honey on the baby daytime formula (unlike Kids DT). Distinct from Kids Daytime despite the same OI. Babies 12 months and up (minAge 1). No DailyMed drug SPL (dietary supplement).",
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-cough-immune-daytime — ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-baby-cough-immune-night',
    barcode: '810087820275',
    productName: "Hyland's Organic Baby Cough & Immune Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-baby-cough-immune-night',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-cough-immune-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-cough-immune-nighttime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      "FOUNDER-STYLE DRAFT: Organic Baby Cough & Immune Nighttime = Clean. Other Ingredients are water + citric acid = 0 pt. Chamomile sits on the formula side, not OI. Do not merge with Baby Daytime. Babies 12 months and up (minAge 1). No DailyMed drug SPL (dietary supplement).",
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-cough-immune-nighttime — ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },

  // ── Avoid — elderberry gummies (sunflower oil in gummy) ──
  {
    id: 'hylands-organic-elderberry-plus-gummies',
    barcode: '810087820022 810087820008',
    productName: "Hyland's Organic Elderberry Plus Gummies",
    brand: BRAND,
    category: IMMUNE,
    formulaId: 'hylands-organic-elderberry-plus-gummies',
    audience: ADULT,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
      { name: 'Organic elderberry fruit powder', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Organic tapioca syrup',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
      flag(
        'Organic cane sugar',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
      flag(
        'Organic natural flavors',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic sunflower oil',
        'high',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.seedOilGummies,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
      flag(
        'Pectin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.gums,
        ),
      ),
      flag(
        'Sodium citrate',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-elderberry-plus-gummies',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'avoid',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Elderberry Plus Gummies = Avoid. Organic sunflower oil in a gummy is the seed/industrial-oil High rule. Organic tapioca syrup / cane sugar / water / citric acid / organic flavors / carnauba / pectin / sodium citrate are 0 pt and do not save it. Adult 60ct + kids 48ct are ONE formula (same OI) — one formulaId. Kids carton ages 2+. ' +
      ZINC_PARKED +
      ' No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: ELDERBERRY_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-elderberry-plus-gummies — ' + UNVERIFIED_NOTE,
      'https://hylands.com/products/kids-organic-elderberry-plus-gummies — kids 48ct same formula; ' +
        UNVERIFIED_NOTE,
      ZINC_PARKED,
    ],
  },

  // ── Caution — glycyrrhiza now Cleared; rest of OI from §5 ─
  {
    id: 'hylands-4kids-cold-n-cough-original',
    barcode: '354973307513',
    productName: "Hyland's Kids Cold & Cough Daytime Original",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-4kids-cold-n-cough-original',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Phosphorus', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: syrupBase('804e0e7a-20eb-128b-e053-2991aa0aa82c'),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Cold & Cough Daytime Original = Caution. Sodium benzoate Limited 1 pt. Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' No grape flavor. Do not reuse `hylands-4kids-cold-n-cough` (Grape daytime). Adds Sulphur vs the grape daytime actives. Ages 2+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-4-kids-cold-n-cough — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=804e0e7a-20eb-128b-e053-2991aa0aa82c — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-4kids-cold-n-cough-night-original',
    barcode: '354973337510',
    productName: "Hyland's Kids Cold & Cough Nighttime Original",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-4kids-cold-n-cough-night-original',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Coffea cruda', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Phosphorus', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: syrupBase('71e93027-33c9-6147-e053-2a95a90aaa09'),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Cold & Cough Nighttime Original = Caution. Sodium benzoate Limited 1 pt. Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' No grape flavor. Adds Chamomilla + Coffea vs daytime Original — do not merge. Do not reuse grape daytime. Ages 2+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-4-kids-nighttime-cold-n-cough — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=71e93027-33c9-6147-e053-2a95a90aaa09 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-4kids-cold-n-cough-night-grape',
    barcode: '354973337718',
    productName: "Hyland's Kids Cold & Cough Nighttime Grape",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-4kids-cold-n-cough-night-grape',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Coffea cruda', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Phosphorus', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: syrupBase('7923e59a-f62c-44df-e053-2991aa0afc1e', [
      flag(
        'Natural grape flavor',
        'limited',
        dailymed('7923e59a-f62c-44df-e053-2991aa0afc1e', METH.flavors),
      ),
    ]),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Cold & Cough Nighttime Grape = Caution. Natural grape flavor + sodium benzoate (1+1). Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' Different actives from daytime grape (adds Chamomilla + Coffea). Do not reuse `hylands-4kids-cold-n-cough`. Ages 2+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-4-kids-nighttime-cold-n-cough — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7923e59a-f62c-44df-e053-2991aa0afc1e — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-kids-cough-mucus-day',
    barcode: '354973405615',
    productName: "Hyland's Kids Cough & Mucus Daytime Grape",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-kids-cough-mucus-day',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '15X HPUS' },
      { name: 'Bryonia alba', strength: '15X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '12X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Ipecacuanha', strength: '12X HPUS' },
      { name: 'Phosphorus', strength: '15X HPUS' },
      { name: 'Pulsatilla', strength: '12X HPUS' },
      { name: 'Rumex crispus', strength: '6X HPUS' },
    ],
    inactiveIngredients: syrupBase('d0eb15c6-bf12-19b7-e053-2a95a90abbe0', [
      flag(
        'Natural grape flavor',
        'limited',
        dailymed('d0eb15c6-bf12-19b7-e053-2a95a90abbe0', METH.flavors),
      ),
    ]),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Cough & Mucus Daytime = Caution. Natural grape flavor + sodium benzoate (1+1). Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' Same grape-style inactives as Cold ’n Cough grape, but different actives — do not reuse `hylands-4kids-cold-n-cough`. Ages 2+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/kids-cough-mucus — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d0eb15c6-bf12-19b7-e053-2a95a90abbe0 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-kids-cough-mucus-night',
    barcode: '354973405714',
    productName: "Hyland's Kids Cough & Mucus Nighttime Grape",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-kids-cough-mucus-night',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Antimonium tartaricum', strength: '15X HPUS' },
      { name: 'Bryonia alba', strength: '15X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Ferrum phosphoricum', strength: '12X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis canadensis', strength: '15X HPUS' },
      { name: 'Ipecacuanha', strength: '12X HPUS' },
      { name: 'Phosphorus', strength: '15X HPUS' },
      { name: 'Pulsatilla', strength: '12X HPUS' },
      { name: 'Rumex crispus', strength: '6X HPUS' },
    ],
    inactiveIngredients: syrupBase('d83e7877-f599-b364-e053-2995a90ab35f', [
      flag(
        'Natural grape flavor',
        'limited',
        dailymed('d83e7877-f599-b364-e053-2995a90ab35f', METH.flavors),
      ),
    ]),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Cough & Mucus Nighttime = Caution. Natural grape flavor + sodium benzoate (1+1). Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' Adds Chamomilla + Hydrastis vs daytime — do not merge. Do not reuse grape daytime Cold ’n Cough. Ages 2+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/kids-cough-mucus-pm — ' + UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d83e7877-f599-b364-e053-2995a90ab35f — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-baby-mucus-cold-day',
    barcode: '354973328419',
    productName: "Hyland's Baby Mucus + Cold Relief Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-baby-mucus-cold-day',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Bryonia alba', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Natrum muriaticum', strength: '30X HPUS' },
      { name: 'Phosphorus', strength: '30X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Rumex crispus', strength: '6X HPUS' },
      { name: 'Silicea', strength: '12X HPUS' },
    ],
    inactiveIngredients: syrupBase('d934cc8a-1e43-4942-858a-05b5d068679a'),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Baby Mucus + Cold Daytime = Caution. Sodium benzoate Limited 1 pt. Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' No grape flavor — do not reuse `hylands-4kids-cold-n-cough`. Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. Under 6 months: ask a doctor (minAge 0). ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: BABY_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-mucus-plus-cold-relief — ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d934cc8a-1e43-4942-858a-05b5d068679a — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-baby-mucus-cold-night',
    barcode: '354973337121',
    productName: "Hyland's Baby Mucus + Cold Relief Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-baby-mucus-cold-night',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Bryonia alba', strength: '6X HPUS' },
      { name: 'Chamomilla', strength: '3X HPUS' },
      { name: 'Coffea cruda', strength: '3X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Hydrastis', strength: '6X HPUS' },
      { name: 'Natrum muriaticum', strength: '6X HPUS' },
      { name: 'Phosphorus', strength: '30X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Rumex crispus', strength: '6X HPUS' },
      { name: 'Silicea', strength: '12X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: syrupBase('736b2487-e81d-d172-e053-2a91aa0ab0cf'),
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Baby Mucus + Cold Nighttime = Caution. Sodium benzoate Limited 1 pt. Glycyrrhiza extract is Cleared — do not Caution on licorice alone. ' +
      LICORICE_LINE +
      ' No grape flavor. Different actives from daytime — do not merge. Combo-only on Hylands.com; written as the single-formula row. Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. Under 6 months: ask a doctor (minAge 0). ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: BABY_COLD_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-baby-mucus-plus-cold-relief-day-and-night-value-pack — combo page; ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=736b2487-e81d-d172-e053-2a91aa0ab0cf — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },

  // ── Sept 15 founder-carton closeout ──────────────────────
  {
    id: 'hylands-leg-cramps-arnica-pm-cream',
    productName: "Hyland's Leg Cramps + Arnica PM Cream",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-leg-cramps-arnica-pm-cream',
    audience: ADULT,
    minAge: 6,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Arnica montana', strength: '3X HPUS' },
      { name: 'Ledum palustre', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '10X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Viscum album', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Beeswax',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.cleared),
      ),
      flag(
        'Cetearyl alcohol',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.fattyAlcohol),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.cleared),
      ),
      flag(
        'Ethyl alcohol',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.ethylAlcohol),
      ),
      flag(
        'Glycerin',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.cleared),
      ),
      flag(
        'Lavender oil',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.lavender),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.sorbate),
      ),
      flag(
        'Water',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.cleared),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.benzoate),
      ),
      flag(
        'Sodium stearoyl glutamate',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.ssg),
      ),
      flag(
        'Vegetable oil',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.creamVegOil),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-pm-cream', METH.gums),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Leg Cramps + Arnica PM Cream = Caution. Lavender oil is fragrance-style Caution (standalone, not Avoid). Ethyl alcohol Limited + potassium sorbate + sodium benzoate are Limited-only. ' +
      LIMITED_STACK +
      ' ' +
      CREAM_OIL_LINE +
      ' Separate row from the daytime cream (no wintergreen on this carton). Not the tablets / caplets. Ages 6+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: CREAM_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-leg-cramps-pm-cream — founder carton OI; ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-leg-cramps-arnica-cream',
    productName: "Hyland's Leg Cramps + Arnica Cream",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-leg-cramps-arnica-cream',
    audience: ADULT,
    minAge: 6,
    form: 'cream',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '3X HPUS' },
      { name: 'Arnica montana', strength: '3X HPUS' },
      { name: 'Ledum palustre', strength: '3X HPUS' },
      { name: 'Magnesia phosphorica', strength: '10X HPUS' },
      { name: 'Rhus toxicodendron', strength: '6X HPUS' },
      { name: 'Viscum album', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Beeswax',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.cleared),
      ),
      flag(
        'Cetearyl alcohol',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.fattyAlcohol),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.cleared),
      ),
      flag(
        'Ethyl alcohol',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.ethylAlcohol),
      ),
      flag(
        'Glycerin',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.cleared),
      ),
      flag(
        'Potassium sorbate',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.sorbate),
      ),
      flag(
        'Water',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.cleared),
      ),
      flag(
        'Sodium benzoate',
        'limited',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.benzoate),
      ),
      flag(
        'Sodium stearoyl glutamate',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.ssg),
      ),
      flag(
        'Vegetable oil',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.creamVegOil),
      ),
      flag(
        'Wintergreen extract',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.wintergreen),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite('https://hylands.com/products/hylands-leg-cramps-cream', METH.gums),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Leg Cramps + Arnica Cream (day) = Caution. Wintergreen extract inactive is standalone Caution (not Avoid). Ethyl alcohol Limited + potassium sorbate + sodium benzoate are Limited-only. ' +
      LIMITED_STACK +
      ' ' +
      CREAM_OIL_LINE +
      ' Separate row from PM (no lavender on this carton). Not the tablets / caplets. Ages 6+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: CREAM_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/hylands-leg-cramps-cream — founder carton OI; ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-kids-sleep-calm-immunity',
    barcode: '810087820664',
    productName: "Hyland's Kids Sleep Calm + Immunity",
    brand: BRAND,
    category: SLEEP,
    formulaId: 'hylands-kids-sleep-calm-immunity',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Melatonin', strength: 'on-carton only' },
      { name: 'Zinc', strength: 'label' },
      { name: 'Vitamin D', strength: 'label' },
      { name: 'Magnesium', strength: 'label' },
      { name: 'Organic elderberry fruit extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic lemon balm leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic passionflower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ginger root extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite('https://hylands.com/products/kids-sleep-calm-immunity', METH.cleared),
      ),
      flag(
        'Water',
        'cleared',
        labelCite('https://hylands.com/products/kids-sleep-calm-immunity', METH.cleared),
      ),
      flag(
        'Organic natural flavors',
        'limited',
        labelCite('https://hylands.com/products/kids-sleep-calm-immunity', METH.flavors),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite('https://hylands.com/products/kids-sleep-calm-immunity', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Sleep Calm + Immunity (purple, with melatonin) = Caution. Organic natural flavors Limited (opacity). ' +
      LIMITED_STACK +
      ' ' +
      MELATONIN_CARTON +
      ' ' +
      ZINC_PARKED +
      ' Separate row from the blue melatonin-free Organic twin. Carton ages 2+. No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SLEEP_CALM_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/kids-sleep-calm-immunity — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      MELATONIN_CARTON,
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-kids-sleep-calm-immunity-organic',
    barcode: '810087820657',
    productName: "Hyland's Organic Kids Sleep Calm + Immunity",
    brand: BRAND,
    category: SLEEP,
    formulaId: 'hylands-kids-sleep-calm-immunity-organic',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Zinc', strength: 'label' },
      { name: 'Vitamin D', strength: 'label' },
      { name: 'Magnesium', strength: 'label' },
      { name: 'Organic elderberry fruit extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic lemon balm leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic passionflower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ginger root extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-organic-sleep-calm-immunity',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-organic-sleep-calm-immunity',
          METH.cleared,
        ),
      ),
      flag(
        'Organic natural flavors',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-organic-sleep-calm-immunity',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-organic-sleep-calm-immunity',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Kids Sleep Calm + Immunity (blue, no melatonin) = Caution. Same OI as the purple melatonin twin — organic natural flavors Limited (opacity). ' +
      LIMITED_STACK +
      ' No melatonin on this carton. ' +
      ZINC_PARKED +
      ' Separate row from the purple melatonin SKU. Carton ages 2+. No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SLEEP_CALM_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/kids-organic-sleep-calm-immunity — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-organic-kids-all-in-one-cough-day',
    barcode: '810087820626',
    productName: "Hyland's Organic Kids All-in-One Cough Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-kids-all-in-one-cough-day',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ivy leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Wild cherry bark extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Vitamin D', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic natural flavors',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-daytime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-daytime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Kids All-in-One Cough Daytime = Caution. Organic natural flavors Limited (opacity). ' +
      LIMITED_STACK +
      ' Honey / agave / botanicals sit on the formula side, not OI. ' +
      ZINC_PARKED +
      ' Distinct from Nighttime and from Baby All-in-One (no flavor line; Clean). Carton ages 1–12. No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_ALLINONE_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-kids-allinone-coughsyrup-daytime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-organic-kids-all-in-one-cough-night',
    barcode: '810087820633',
    productName: "Hyland's Organic Kids All-in-One Cough Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-kids-all-in-one-cough-night',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ivy leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Wild cherry bark extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Vitamin D', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic natural flavors',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-nighttime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-kids-allinone-coughsyrup-nighttime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Kids All-in-One Cough Nighttime = Caution. Same OI as daytime — organic natural flavors Limited (opacity). ' +
      LIMITED_STACK +
      ' Chamomile sits on the formula side. Do not merge with daytime. ' +
      ZINC_PARKED +
      ' Carton ages 1–12. No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: KIDS_ALLINONE_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-kids-allinone-coughsyrup-nighttime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: ORG_BABY_ALLINONE_DAY,
    productName: "Hyland's Organic Baby All-in-One Cough Daytime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: ORG_BABY_ALLINONE_DAY,
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ivy leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Wild cherry bark extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-daytime',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-daytime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby All-in-One Cough Daytime = Clean. Other Ingredients are organic agave syrup + organic glycerin + water = 0 pt. No flavor line. Botanicals / zinc sit on the formula side, not OI. ' +
      ZINC_PARKED +
      ' Distinct from Nighttime and from Kids All-in-One (flavored = Caution). Carton ages 6 months+ (minAge 0). No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-allinone-coughsyrup-daytime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-organic-baby-all-in-one-cough-night',
    productName: "Hyland's Organic Baby All-in-One Cough Nighttime",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'hylands-organic-baby-all-in-one-cough-night',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic black elderberry', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic ivy leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Wild cherry bark extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-nighttime',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-allinone-coughsyrup-nighttime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby All-in-One Cough Nighttime = Clean. Same OI as daytime — organic agave syrup + organic glycerin + water = 0 pt. No flavor line. Chamomile sits on the formula side. Do not merge with Baby Daytime. ' +
      ZINC_PARKED +
      ' Carton ages 6 months+ (minAge 0). No DailyMed drug SPL (dietary supplement).',
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-allinone-coughsyrup-nighttime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-organic-baby-soothing-gel-day',
    productName: "Hyland's Organic Baby Soothing Gel Daytime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-organic-baby-soothing-gel-day',
    audience: KIDS,
    minAge: 0,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic ginger root extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic fennel seed extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic calendula extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic thyme leaf extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite('https://hylands.com/products/organic-baby-soothing-gel-daytime', METH.gums),
      ),
      flag(
        'Organic cherry flavor',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-daytime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-daytime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby Soothing Gel Daytime = Caution. Organic cherry flavor Limited 1. ' +
      LIMITED_STACK +
      ' Herb list differs from Nighttime (night adds lemon balm + passionflower) — do not merge. Carton: do not use on babies less than 2 months (minAge 0). Distinct from Organic Baby Soothing Drops (different SKU; drops list botanicals on the OI). No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SOOTHING_GEL_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-soothing-gel-daytime — founder carton; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-baby-soothing-gel-night',
    productName: "Hyland's Organic Baby Soothing Gel Nighttime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-organic-baby-soothing-gel-night',
    audience: KIDS,
    minAge: 0,
    form: 'gel',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic ginger root extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic lemon balm leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic passionflower herb extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic fennel seed extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic calendula extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic thyme leaf extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-nighttime',
          METH.gums,
        ),
      ),
      flag(
        'Organic cherry flavor',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-nighttime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-gel-nighttime',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby Soothing Gel Nighttime = Caution. Organic cherry flavor Limited 1. ' +
      LIMITED_STACK +
      ' Adds lemon balm + passionflower vs daytime — do not merge. Carton: do not use on babies less than 2 months (minAge 0). Distinct from Organic Baby Soothing Drops (different SKU; drops list botanicals on the OI). No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SOOTHING_GEL_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-soothing-gel-nighttime — founder carton; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-baby-soothing-drops-day',
    barcode: '810087820596',
    productName: "Hyland's Organic Baby Soothing Drops Daytime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-organic-baby-soothing-drops-day',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic fennel seed extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic calendula extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic fennel seed extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Organic chamomile flower extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Organic calendula extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Sodium citrate dihydrate',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic cherry flavor',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.cleared,
        ),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-daytime',
          METH.gums,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby Soothing Drops Daytime = Caution. Organic cherry flavor Limited 1. ' +
      LIMITED_STACK +
      ' Named botanicals on the OI (fennel / chamomile / calendula) are Cleared-class food/botanical — do not Caution on those extracts alone. Distinct from Nighttime (night swaps calendula for lemon balm) — do not merge. Distinct from Organic Baby Soothing Gel (different SKU; gels keep botanicals formula-side). Carton: do not use on babies less than 2 months (minAge 0). No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SOOTHING_DROPS_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-soothing-drops-daytime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-organic-baby-soothing-drops-night',
    barcode: '810087820602',
    productName: "Hyland's Organic Baby Soothing Drops Nighttime",
    brand: BRAND,
    category: PAIN_FEVER,
    formulaId: 'hylands-organic-baby-soothing-drops-night',
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic fennel seed extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic lemon balm leaf extract', strength: 'formula-side (not a drug SPL)' },
      { name: 'Organic chamomile flower extract', strength: 'formula-side (not a drug SPL)' },
    ],
    inactiveIngredients: [
      flag(
        'Organic glycerin',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic fennel seed extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Organic lemon balm leaf extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Organic chamomile flower extract',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.namedBotanical,
        ),
      ),
      flag(
        'Sodium citrate dihydrate',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Organic cherry flavor',
        'limited',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.cleared,
        ),
      ),
      flag(
        'Xanthan gum',
        'cleared',
        labelCite(
          'https://hylands.com/products/organic-baby-soothing-drops-nighttime',
          METH.gums,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Organic Baby Soothing Drops Nighttime = Caution. Organic cherry flavor Limited 1. ' +
      LIMITED_STACK +
      ' Named botanicals on the OI (fennel / lemon balm / chamomile) are Cleared-class food/botanical — do not Caution on those extracts alone. Adds lemon balm vs daytime calendula — do not merge. Distinct from Organic Baby Soothing Gel (different SKU; gels keep botanicals formula-side). Carton: do not use on babies less than 2 months (minAge 0). No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: SOOTHING_DROPS_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/organic-baby-soothing-drops-nighttime — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
    ],
  },
  {
    id: 'hylands-prid-drawing-salve',
    barcode: '354973413016 354973406919',
    productName: "Hyland's PRID Drawing Salve",
    brand: BRAND,
    category: FIRST_AID,
    formulaId: 'hylands-prid-drawing-salve',
    audience: ADULT,
    minAge: 6,
    form: 'salve',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '3X HPUS' },
      { name: 'Calendula officinalis', strength: '3X HPUS' },
      { name: 'Echinacea angustifolia', strength: '3X HPUS' },
      { name: 'Hepar sulph calc', strength: '12X HPUS' },
      { name: 'Ichthammol', strength: '2X HPUS' },
      { name: 'Silicea', strength: '12X HPUS' },
      { name: 'Sulphur', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Beeswax',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.cleared),
      ),
      flag(
        'Ethyl alcohol',
        'limited',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.ethylAlcohol),
      ),
      flag(
        'Glycerin',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.cleared),
      ),
      flag(
        'Petrolatum',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.petrolatum),
      ),
      flag(
        'Water',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.cleared),
      ),
      flag(
        'Stearyl alcohol',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.fattyAlcohol),
      ),
      flag(
        'Wood rosin',
        'cleared',
        dailymed('d22eca2f-d7e6-3412-e053-2995a90a6384', METH.woodRosin),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: PRID Drawing Salve = Caution. Wood rosin is standalone Caution (contact-allergy pattern, not Avoid). Ethyl alcohol Limited (topical vehicle — not oral-PG, not Avoid). Petrolatum + stearyl alcohol + beeswax + glycerin + water are Cleared. Not Avoid. Silicea is a homeopathic active, not the inactive SiO2 nanoparticle cap. Ages 6+. ' +
      CARLSTON,
    retailers: [...HYLANDS_RETAILERS],
    cleanAlternatives: PRID_ALTS,
    sourcesGeneral: [
      'https://hylands.com/products/prid-drawing-salve — founder carton OI; ' +
        UNVERIFIED_NOTE,
      'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22eca2f-d7e6-3412-e053-2995a90a6384 — ' +
        UNVERIFIED_NOTE,
      CARLSTON,
    ],
  },
  {
    id: 'hylands-kids-multi-brain-eye-gummies',
    barcode: '810087820732',
    productName: "Hyland's Kids Multi + Brain & Eye Gummies",
    brand: BRAND,
    category: VITAMINS,
    formulaId: 'hylands-kids-multi-brain-eye-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    productSubtype: 'gummy',
    activeIngredients: [
      { name: 'Vitamin A', strength: 'label' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Vitamin D3', strength: 'label' },
      { name: 'Vitamin E', strength: 'label' },
      { name: 'Vitamin K2', strength: 'label' },
      { name: 'Vitamin B6', strength: 'label' },
      { name: 'Folate', strength: 'label' },
      { name: 'Vitamin B12', strength: 'label' },
      { name: 'Biotin', strength: 'label' },
      { name: 'Pantothenic acid', strength: 'label' },
      { name: 'Choline', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
      { name: 'Lutein', strength: 'label' },
      { name: 'Zeaxanthin', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Inulin syrup',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.inulin,
        ),
      ),
      flag(
        'Maltitol syrup',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.sugarAlcohols,
        ),
      ),
      flag(
        'Xylitol',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.sugarAlcohols,
        ),
      ),
      flag(
        'Erythritol',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.sugarAlcohols,
        ),
      ),
      flag(
        'Pectin',
        'cleared',
        labelCite('https://hylands.com/products/kids-multivitamin-brain-and-eye', METH.gums),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.flavors,
        ),
      ),
      flag(
        'Lactic acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.organicAcid,
        ),
      ),
      flag(
        'Malic acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.organicAcid,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.cleared,
        ),
      ),
      flag(
        'Sunflower lecithin',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.lecithin,
        ),
      ),
      flag(
        'Vegetable juice for color',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-brain-and-eye',
          METH.plantJuice,
        ),
      ),
      flag(
        'Rebaudioside M',
        'cleared',
        labelCite('https://hylands.com/products/kids-multivitamin-brain-and-eye', METH.rebM),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Multi + Brain & Eye Gummies = Caution. Maltitol + xylitol + erythritol + natural flavors are Limited-only. ' +
      LIMITED_STACK +
      ' Sunflower lecithin is Cleared — lecithin is not the gummy seed-oil High rule. Rebaudioside M is Cleared (high-purity steviol glycoside). Named vegetable juice color is Cleared. ' +
      ZINC_PARKED +
      ' No independently Clean kids multi on main — cleanAlternatives omitted (do not invent). Carton ages 2+. No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/kids-multivitamin-brain-and-eye — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
  {
    id: 'hylands-kids-multi-digestive-gummies',
    barcode: '810087820756',
    productName: "Hyland's Kids Multi + Digestive Support Gummies",
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'hylands-kids-multi-digestive-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    productSubtype: 'gummy',
    activeIngredients: [
      { name: 'Fructooligosaccharides (FOS)', strength: 'label — active fiber' },
      { name: 'Vitamin A', strength: 'label' },
      { name: 'Vitamin C', strength: 'label' },
      { name: 'Vitamin D3', strength: 'label' },
      { name: 'Vitamin E', strength: 'label' },
      { name: 'Vitamin K2', strength: 'label' },
      { name: 'Thiamine', strength: 'label' },
      { name: 'Riboflavin', strength: 'label' },
      { name: 'Vitamin B6', strength: 'label' },
      { name: 'Folate', strength: 'label' },
      { name: 'Vitamin B12', strength: 'label' },
      { name: 'Biotin', strength: 'label' },
      { name: 'Pantothenic acid', strength: 'label' },
      { name: 'Choline', strength: 'label' },
      { name: 'Zinc', strength: 'label' },
      { name: 'Bacillus coagulans', strength: 'label' },
    ],
    inactiveIngredients: [
      flag(
        'Soluble tapioca fiber',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.tapiocaFiber,
        ),
      ),
      flag(
        'Maltitol',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.sugarAlcohols,
        ),
      ),
      flag(
        'Pectin',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.gums,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.cleared,
        ),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.flavors,
        ),
      ),
      flag(
        'Fruit and vegetable juice (color)',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.plantJuice,
        ),
      ),
      flag(
        'Water',
        'cleared',
        labelCite(
          'https://hylands.com/products/kids-multivitamin-digestive-support',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids Multi + Digestive Support Gummies = Caution. Maltitol + natural flavors are Limited-only. ' +
      LIMITED_STACK +
      ' FOS / fructooligosaccharides is an active on this carton, not an OI score. Soluble tapioca fiber is Cleared (fiber family). Named fruit and vegetable juice color is Cleared. ' +
      ZINC_PARKED +
      ' No independently Clean kids multi on main — cleanAlternatives omitted (do not invent). Carton ages 2+. No DailyMed drug SPL.',
    retailers: [...HYLANDS_RETAILERS],
    sourcesGeneral: [
      'https://hylands.com/products/kids-multivitamin-digestive-support — founder carton OI; ' +
        UNVERIFIED_NOTE +
        '; no DailyMed drug SPL',
      ZINC_PARKED,
    ],
  },
];
