// DRAFT / not verified / batch 32 Genexa US catalog / methodology
// v1.6 + Sept 14 locks. Founder owns final Avoid vs Caution vs Clean.
//
// Genexa in-scope OTC / homeopathic / supplement drafts. Whole in-scope
// line — not one aisle. Mixed categories · audience adult except kids /
// infant rows · recordStatus is 'unverified' on every row. Internal keys
// only: clean | caution | avoid. Do NOT invent Clean. Do NOT invent UPCs /
// barcodes. Pack sizes share formulaId. formulaId == id on every NEW row.
// Form is labeled on cleanAlternatives, not a hard filter (§6). Not wired
// into Clean Picks UI. No live Clean Picks file is edited. Methodology.md /
// PROJECT_NOTES.md / verdictLabels.ts / parkedBrowseIds.ts are untouched.
// Letter tiles only on new ids — no photo factory. No MegaFood / Pedialyte
// / unrelated brand edits.
//
// REUSE ONLY (do not rewrite / do not regrade except the two OI updates
// called out in the write brief — those edits live on the original files):
// - genexa-acetaminophen-es (batch1) = Clean
// - genexa-kids-apap-liquid (batch2) = Clean
// - genexa-infants-apap-liquid (batch2) = Clean
// - genexa-kids-apap-chewable (batch2) = Caution
// - genexa-kids-multi-cold-flu-liquid (batch4) = Clean
// - genexa-kids-cold-crush (batch4) = Caution
// - genexa-allergy-care (batch5) = Caution
// - genexa-kids-allergy-dph-liquid (batch6) = Clean — OI update on that file
// - genexa-kids-allergy-care (batch6) = Caution
// - genexa-acetaminophen-pm (batch7) = Caution
// - genexa-kids-sleepology (batch8) = Caution
// - genexa-kids-tummy-relief (batch11) = Caution — OI update on that file
//
// TALLY (unverified drafts in THIS file): 16 rows — Clean 1 / Caution 15 /
// Avoid 0.
// Independently Clean in THIS batch: Infants' Vitamin D drops only.
//
// SEPT 14 LOCKS APPLIED
// - organic rice bran extract = Cleared (hull/concentrate family)
// - unspecified “rice extract” = Caution (none on these cartons)
// - organic beet root = Cleared-class whole-food
// - Grape Flavor / Natural Citrus Extract = Limited flavor
// - organic chamomile extract = standalone Caution
// - organic cultured dextrose = standalone Caution
// - organic acerola = Cleared-class food
// - honey = Cleared-class sweetener; honest note not for under 1; no dosing
// - Infants’ Vitamin D sunflower oil as DROP carrier = NOT gummy Avoid
//
// Organic flavors / organic blueberry / organic açaí = Cleared (§5).
// Organic maltodextrin is Limited on every chew (same as non-organic; §5
// housekeeping lock). Vanilla-lavender Sleep / Calm / Stress chews keep
// flavor Limited + organic MDX Limited = 2 pts Caution.
//
// KITS / BUNDLES OUT (no rows): Baby’s First Sick Day / Wellness /
// Medicine Cabinet kits; Family Pain Bundle; Kids' Cough, Pain & Fever
// Relief Bundle; Kids' Multi-Symptom Day + Night Combo Pack; Kids' Pain
// & Allergy Relief 2 Pack; Daytime Cough + Nighttime Severe Cold & Flu
// Combo Pack; Severe Daytime + Nighttime Cold & Flu Combo Pack; Kids'
// Daytime + Nighttime Cough & Chest Congestion Value Pack. Night /
// combo formulas are written as the single-formula row only.
//
// STILL BLOCKED: none — every writable SKU had gradeable OI after locks.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const COLD_FLU = 'Cold & Flu';
const PAIN_FEVER = 'Pain & Fever';
const DIGESTIVE = 'Digestive';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune Support';
const VITAMINS = 'Vitamins';
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const HOMEOPATHIC = 'homeopathic' as const;
const BRAND = 'Genexa';

const UNVERIFIED_NOTE = 'draft, not verified';

const METH = {
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  citrus:
    'Methodology §5 Limited-risk (Natural Citrus Extract — Limited flavor; Sept 14 lock)',
  grape:
    'Methodology §5 Limited-risk (Grape Flavor — Limited flavor; Sept 14 lock)',
  xylitol: 'Methodology §5 Limited-risk (xylitol, oral)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic and non-organic; same Limited row)',
  chamomile:
    'Methodology §5 Caution (organic chamomile extract — standalone Caution, not Avoid; Sept 14 lock)',
  culturedDextrose:
    'Methodology §5 Caution (organic cultured dextrose — standalone Caution, not Avoid; Sept 14 lock)',
  riceBran:
    'Methodology §5 Cleared (organic rice bran extract — hull/concentrate family; locked Sept 14, 2026)',
  beet: 'Methodology §5 Cleared-class (organic beet root — whole-food; Sept 14 lock)',
  acerola: 'Methodology §5 Cleared-class (organic acerola — food; Sept 14 lock)',
  honey:
    'Methodology §5 Cleared-class (honey — sweetener; Sept 14 lock). Honest note only: not for under 1. No dosing.',
  organicFlavor: 'Methodology §5 Cleared (organic agave / organic flavors / organic colors)',
  citrusTap:
    'Label and DailyMed only say citrus fruit extract. They don’t name lemon, orange, or lime, or juice vs peel. We mark that Caution because the form isn’t clear.',
  cleared: 'Methodology §5 Cleared',
} as const;

const DROP_OIL_TEXT =
  'Seed/industrial oils are flagged in gummies. In this capsule/softgel/drop fill they are not that High rule.';

const CARLSTON =
  'Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — homeopathic eligibility is cleanliness + documented evidentiary framework only; no efficacy claim.';

const ZINC_PARKED =
  'Zinc is parked as of Methodology v1.6 — active-safety-cap review is not done. This draft grades inactives only and does not invent an active-safety grade for zinc.';

const SEDATING =
  'First-generation / sedating antihistamine — listed as a cleanliness / use note only, not an efficacy claim.';

const GENEXA_RETAILERS = [
  'Genexa.com',
  'Whole Foods',
  'Sprouts',
  'Amazon',
  'Walmart',
  'CVS',
  'Target',
] as const;

const GENEXA_MULTI = 'genexa-kids-multi-cold-flu-liquid';
const COLDCALM = 'boiron-coldcalm-meltaways';
const CHESTAL = 'boiron-chestal-kids-pellets';
const OSCILLO = 'oscillococcinum';
const GENEXA_ES = 'genexa-acetaminophen-es';
const CALMS_FORTE = 'hylands-calms-forte';
const HYLANDS_CALM = 'hylands-4kids-calm-restful';
const PHILLIPS = 'phillips-mom-original';
const VIT_D_ID = 'genexa-infants-vitamin-d';

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

const KIDS_COLD_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_MULTI,
    'Closest independently Clean kids Cold & Flu analog already on main (conventional liquid, APAP + DXM, minAge 4). Form: liquid — labeled, not a hard filter (§6).',
  ),
  alt(
    COLDCALM,
    'Independently Clean kids-usable homeopathic meltaway already on main (minAge 4). Form: meltaway tablet — labeled, not a hard filter (§6).',
  ),
  alt(
    CHESTAL,
    'Independently Clean kids cough pellet already on main (minAge 4). Form: pellet — labeled, not a hard filter (§6).',
  ),
];

const ADULT_COLD_ALTS: CleanAlternative[] = [
  alt(
    OSCILLO,
    'Independently Clean adult Cold & Flu analog already on main (Boiron Oscillococcinum). Form: meltaway pellets vs liquid / chewable — labeled, not a hard filter (§6). Cleanliness only.',
  ),
  alt(
    COLDCALM,
    'Independently Clean homeopathic meltaway already on main. Form: meltaway tablet — labeled, not a hard filter (§6).',
  ),
];

const PAIN_ALTS: CleanAlternative[] = [
  alt(
    GENEXA_ES,
    'Independently Clean adult acetaminophen already on main (Genexa Extra Strength). Different actives (homeopathic arnica → APAP). Form: caplet vs chewable — labeled, not a hard filter (§6).',
  ),
];

const SLEEP_ALTS: CleanAlternative[] = [
  alt(
    CALMS_FORTE,
    'Independently Clean adult Sleep analog already on main (Hyland\'s Calms Forte). Form: tablet vs chewable — labeled, not a hard filter (§6). Homeopathic — cleanliness only.',
  ),
];

const KIDS_CALM_ALTS: CleanAlternative[] = [
  alt(
    HYLANDS_CALM,
    'Independently Clean kids calm analog already on main (Hyland\'s 4 Kids Calm & Restful, minAge 2). Form: meltaway vs chewable — labeled, not a hard filter (§6).',
  ),
];

const ANTACID_ALTS: CleanAlternative[] = [
  alt(
    PHILLIPS,
    'Independently Clean adult Digestive analog already on main (Phillips\' Milk of Magnesia Original). Form: liquid vs chewable — labeled, not a hard filter (§6). Do not invent a Clean Genexa antacid.',
  ),
];

export const BATCH32_GENEXA: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  {
    id: VIT_D_ID,
    barcode: '857630006601',
    productName: "Genexa Infants' Vitamin D",
    brand: BRAND,
    category: VITAMINS,
    formulaId: VIT_D_ID,
    audience: KIDS,
    minAge: 0,
    form: 'drops',
    recordStatus: UNVERIFIED,
    productType: 'Vitamin',
    activeIngredients: [{ name: 'Vitamin D3', strength: '400 IU / 2 drops' }],
    inactiveIngredients: [
      flag(
        'Organic sunflower seed oil',
        'cleared',
        `https://www.genexa.com/products/vitamin-d-3-drops-for-babies; ${DROP_OIL_TEXT}`,
      ),
      flag(
        'Organic vanilla flavor',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/vitamin-d-3-drops-for-babies',
          `${METH.organicFlavor} — organic vanilla is the §5 organic-flavor Cleared row, not Limited natural flavors / Grape Flavor / Natural Citrus Extract`,
        ),
      ),
    ],
    verdict: 'clean',
    honestNote:
      `FOUNDER-STYLE DRAFT: Genexa Infants' Vitamin D = Clean. Sunflower oil is a liquid-drop carrier — not the gummy seed-oil High rule. Organic vanilla flavor is Cleared-class organic flavor (§5), not Limited natural-flavor opacity. Demerit math: 0 pts. Infant-labeled drops (6 months–12 months as directed on carton). No DailyMed drug SPL (dietary supplement). Pack sizes share formulaId. No dosing or medical advice in this draft.`,
    retailers: [...GENEXA_RETAILERS],
    sourcesGeneral: [
      `https://www.genexa.com/products/vitamin-d-3-drops-for-babies — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`,
    ],
  },

  // ── Caution — scan list 2 ────────────────────────────────
  {
    id: 'genexa-kids-cough-chest-congestion-liquid',
    barcode: '850015736018',
    productName: "Genexa Kids' Cough & Chest Congestion",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-kids-cough-chest-congestion-liquid',
    audience: KIDS,
    minAge: 4,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '5mg / 5mL' },
      { name: 'Guaifenesin', strength: '100mg / 5mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-cough-chest-congestion-liquid',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-cough-chest-congestion-liquid',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Natural flavors',
        'limited',
        labelCite(
          'https://www.genexa.com/products/kids-cough-chest-congestion-liquid',
          METH.flavors,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-cough-chest-congestion-liquid',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids\' Cough & Chest Congestion = Caution. Driver is natural flavors Limited 1 pt. Organic agave / organic blueberry are Cleared. Do not apply the Kids Multi / Kids APAP don\'t-demerit-natural-flavors exception — that exception is locked to those REUSE ids only. Prefer live Genexa.com OI (natural flavors; no citrus on the standalone page). Combo-pack DailyMed twins may list Natural Citrus Extract — same Limited flavor family, still Caution; one formulaId for pack sizes. Ages 4+ (under 4: do not use). Always dose with the enclosed cup. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/kids-cough-chest-congestion-liquid — ${UNVERIFIED_NOTE}`,
      `DailyMed setid a7ab2140-de09-158f-e053-2a95a90a25a0 (actives; ${UNVERIFIED_NOTE})`,
    ],
  },
  {
    id: 'genexa-kids-nighttime-cough',
    productName: "Genexa Kids' Nighttime Cough / Long-Acting Nighttime Cough",
    brand: BRAND,
    category: COLD_FLU,
    barcode: '850015736605',
    formulaId: 'genexa-kids-nighttime-cough',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Chlorpheniramine maleate', strength: '2mg / 10mL' },
      { name: 'Dextromethorphan HBr', strength: '15mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        dailymed('024bb864-4214-1d8b-e063-6394a90aa573', METH.organicFlavor),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        dailymed('024bb864-4214-1d8b-e063-6394a90aa573', METH.organicFlavor),
      ),
      flag(
        'Natural flavors',
        'limited',
        dailymed('024bb864-4214-1d8b-e063-6394a90aa573', METH.flavors),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('024bb864-4214-1d8b-e063-6394a90aa573', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids\' Nighttime Cough / Long-Acting Nighttime Cough = Caution. One formula for the combo naming. Driver is natural flavors Limited 1 pt. Organic agave / organic blueberry are Cleared. DailyMed setid 024bb864. Combo-pack twins may also list Natural Citrus Extract (same Limited flavor family). Do not add a second row. ' +
      SEDATING +
      ' Ages 6+ (under 6: do not use). Always dose with the enclosed cup. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid 024bb864-4214-1d8b-e063-6394a90aa573 — ${UNVERIFIED_NOTE}`,
    ],
  },
  {
    id: 'genexa-daytime-severe-cold-flu',
    productName: 'Genexa Daytime Severe Cold & Flu',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '850015736421',
    formulaId: 'genexa-daytime-severe-cold-flu',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 20mL' },
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-severe-cold-flu',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-severe-cold-flu',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Natural flavor',
        'limited',
        labelCite(
          'https://www.genexa.com/products/daytime-severe-cold-flu',
          METH.flavors,
        ),
      ),
      flag(
        'Xylitol',
        'limited',
        labelCite(
          'https://www.genexa.com/products/daytime-severe-cold-flu',
          METH.xylitol,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-severe-cold-flu',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Daytime Severe Cold & Flu = Caution. Demerit math: natural flavor Limited 1 + xylitol oral Limited 1 = 2 pts Caution (not Avoid). Organic agave / organic blueberry are Cleared. Live Genexa.com OI. Stay under 4 g/day acetaminophen, same as any APAP. Ages 12+ (under 4: do not use; 4–under 12: ask a doctor). Kit / combo packs are OUT — this is the daytime formula only. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ADULT_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/daytime-severe-cold-flu — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 22f23aeb-f874-6e54-e063-6394a90a9565 (actives; ${UNVERIFIED_NOTE})`,
    ],
  },
  {
    id: 'genexa-kids-nighttime-multi-cold-flu',
    productName: "Genexa Kids' Nighttime Multi-Symptom Cold & Flu",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-kids-nighttime-multi-cold-flu',
    audience: KIDS,
    minAge: 6,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 10mL' },
      { name: 'Diphenhydramine HCl', strength: '12.5mg / 10mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        dailymed('213fe898-dace-9a0f-e063-6394a90afd64', METH.organicFlavor),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        dailymed('213fe898-dace-9a0f-e063-6394a90afd64', METH.organicFlavor),
      ),
      flag(
        'Flavors (natural)',
        'limited',
        dailymed('213fe898-dace-9a0f-e063-6394a90afd64', METH.flavors),
      ),
      flag(
        'Purified water',
        'cleared',
        dailymed('213fe898-dace-9a0f-e063-6394a90afd64', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids\' Nighttime Multi-Symptom Cold & Flu = Caution. Driver is flavors (natural) Limited 1 pt. Organic agave / organic blueberry are Cleared. DailyMed night-formula OI on setid 213fe898 (combo SPL; kit row is OUT). Website combo pages also list xylitol / chamomile on a mixed day+night block — night SPL inactives are agave / blueberry / natural flavors / water only; do not invent those extras onto this formula. Do not apply the Kids Multi daytime Clean flavor exception. ' +
      SEDATING +
      ' Stay under 4 g/day acetaminophen. Ages 6+ (under 6: do not use unless directed by a doctor). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid 213fe898-dace-9a0f-e063-6394a90afd64 — ${UNVERIFIED_NOTE}`,
    ],
  },
  {
    id: 'genexa-infants-daytime-cough-immune',
    barcode: '850015736933',
    productName: "Genexa Infants' Daytime Cough & Immune Support",
    brand: BRAND,
    category: IMMUNE,
    formulaId: 'genexa-infants-daytime-cough-immune',
    audience: KIDS,
    minAge: 0,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    activeIngredients: [{ name: 'Zinc', strength: 'as labeled' }],
    inactiveIngredients: [
      flag(
        'Agave syrup (organic)',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/infants-daytime-cough-immune-support',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Flavor (natural)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/infants-daytime-cough-immune-support',
          METH.flavors,
        ),
      ),
      flag(
        'Citric acid (natural)',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/infants-daytime-cough-immune-support',
          METH.cleared,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/infants-daytime-cough-immune-support',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Infants\' Daytime Cough & Immune Support = Caution. Driver is flavor (natural) Limited 1 pt. Organic agave / citric acid / water are Cleared. Zinc is the labeled active. ' +
      ZINC_PARKED +
      ' Dietary supplement — not an OTC cough monograph. Carton is 6 months+. No DailyMed drug SPL. Pack sizes share formulaId. No dosing or medical advice in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/infants-daytime-cough-immune-support — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`,
    ],
  },

  // ── Caution — question SKUs unlocked this pass ───────────
  {
    id: 'genexa-antacid-maximum-strength',
    barcode: '857630006571',
    productName: 'Genexa Antacid Maximum Strength',
    brand: BRAND,
    category: DIGESTIVE,
    formulaId: 'genexa-antacid-maximum-strength',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [{ name: 'Calcium carbonate', strength: '1000mg' }],
    inactiveIngredients: [
      flag(
        'Organic beet root',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          METH.beet,
        ),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          METH.riceBran,
        ),
      ),
      flag(
        'Organic flavors',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          `${METH.organicFlavor} — organic flavors are Cleared (§5 + Genexa chew pattern). Not Limited natural flavors.`,
        ),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          METH.cleared,
        ),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Antacid Maximum Strength = Caution. Organic beet root + organic rice bran extract are Cleared under Sept 14 locks. Organic flavors are Cleared (§5) — they do not count as Limited. Driver is organic maltodextrin Limited 1 pt, matching locked Genexa chew siblings (do not invent Clean; do not extend the adult ES maltodextrin exception). DailyMed setid d4eb1687 matches the live Genexa.com list. Ages 12+. Calcium-carbonate antacid — cleanliness only. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ANTACID_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/antacid-maximum-strength-acid-indigestion-relief-medicine — ${UNVERIFIED_NOTE}`,
      `DailyMed setid d4eb1687-0544-5aa0-e053-2995a90a0280 — ${UNVERIFIED_NOTE}`,
    ],
  },
  {
    id: 'genexa-arnica-pain',
    productName: 'Genexa Arnica Pain',
    brand: BRAND,
    category: PAIN_FEVER,
    barcode: '857630006083',
    formulaId: 'genexa-arnica-pain',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Arnica montana', strength: '30X HPUS' },
      { name: 'Calendula officinalis', strength: '6X HPUS' },
      { name: 'Ledum palustre', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '12X HPUS' },
      { name: 'Ruta graveolens', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite('https://www.genexa.com/products/arnica-pain', METH.riceBran),
      ),
      flag(
        'Grape Flavor',
        'limited',
        labelCite('https://www.genexa.com/products/arnica-pain', METH.grape),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite('https://www.genexa.com/products/arnica-pain', METH.maltodextrin),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite('https://www.genexa.com/products/arnica-pain', METH.cleared),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite('https://www.genexa.com/products/arnica-pain', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Arnica Pain = Caution. Organic rice bran extract is Cleared. Driver is Grape Flavor Limited 1 pt (Sept 14 lock); organic maltodextrin is also Limited on this chew pattern (1+1 = 2 pts Caution, not Avoid). Do not invent Clean. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Adult SKU (12+; a 3–11 chart exists). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: PAIN_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/arnica-pain — ${UNVERIFIED_NOTE}`,
      `DailyMed setid b6fcbd3a-f5ba-e70d-e053-2995a90a8769 — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-sleepology',
    barcode: '857630006090',
    productName: 'Genexa Sleepology',
    brand: BRAND,
    category: SLEEP,
    formulaId: 'genexa-sleepology',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Alfalfa', strength: '6X HPUS' },
      { name: 'Avena sativa', strength: '6X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Eschscholzia californica', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Nux moschata', strength: '9X HPUS' },
      { name: 'Passiflora incarnata', strength: '6X HPUS' },
      { name: 'Piper methysticum', strength: '6X HPUS' },
      { name: 'Valeriana officinalis', strength: '6X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Natural vanilla lavender flavor',
        'limited',
        labelCite('https://www.genexa.com/products/sleepology-sleep-aid', METH.flavors),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite('https://www.genexa.com/products/sleepology-sleep-aid', METH.riceBran),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/sleepology-sleep-aid',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/sleepology-sleep-aid',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite('https://www.genexa.com/products/sleepology-sleep-aid', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Sleepology (adult) = Caution. Separate id from genexa-kids-sleepology — do not clone. Natural vanilla lavender flavor Limited 1 pt + organic maltodextrin Limited 1 pt = 2 pts Caution. Organic rice bran extract is Cleared. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 12+ (a 3–11 chart exists — this row is the adult SKU). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/sleepology-sleep-aid — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 1e11f655-374c-59ac-e054-00144ff8d46c — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-kids-calm-keeper',
    barcode: '857630006106',
    productName: "Genexa Kids' Calm Keeper",
    brand: BRAND,
    category: SLEEP,
    formulaId: 'genexa-kids-calm-keeper',
    audience: KIDS,
    minAge: 3,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '12X HPUS' },
      { name: 'Calcarea phosphorica', strength: '8X HPUS' },
      { name: 'Chamomilla', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Ignatia amara', strength: '12X HPUS' },
      { name: 'Kali carbonicum', strength: '8X HPUS' },
      { name: 'Passiflora incarnata', strength: '3X HPUS' },
      { name: 'Valeriana officinalis', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Natural vanilla lavender flavor',
        'limited',
        labelCite(
          'https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children',
          METH.flavors,
        ),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children',
          METH.riceBran,
        ),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids\' Calm Keeper = Caution. Organic rice bran extract is Cleared. Natural vanilla lavender flavor Limited 1 pt + organic maltodextrin Limited 1 pt = 2 pts Caution. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 3–11 (under 3: ask a doctor). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_CALM_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/calm-keeper-medicine-to-calm-down-children — ${UNVERIFIED_NOTE}`,
      `DailyMed setid ba5de524-dac6-8b54-e053-2995a90ac6ef — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-stress',
    barcode: '857630006007',
    productName: 'Genexa Stress',
    brand: BRAND,
    category: SLEEP,
    formulaId: 'genexa-stress',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '12X HPUS' },
      { name: 'Calcarea carbonica', strength: '8X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Lycopodium clavatum', strength: '12X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
      { name: 'Passiflora incarnata', strength: '3X HPUS' },
      { name: 'Valeriana officinalis', strength: '3X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Natural vanilla lavender flavor',
        'limited',
        labelCite('https://www.genexa.com/products/stress-relief-pills', METH.flavors),
      ),
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite('https://www.genexa.com/products/stress-relief-pills', METH.riceBran),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/stress-relief-pills',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/stress-relief-pills',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite('https://www.genexa.com/products/stress-relief-pills', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Stress = Caution. Organic rice bran extract is Cleared. Natural vanilla lavender flavor Limited 1 pt + organic maltodextrin Limited 1 pt = 2 pts Caution. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 12+ (a 3–11 chart exists — this row is the adult SKU). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: SLEEP_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/stress-relief-pills — ${UNVERIFIED_NOTE}`,
      `DailyMed setid b86a2e37-fbc0-7c31-e053-2a95a90ad5d0 — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-flu-fix',
    barcode: '857630006038',
    productName: 'Genexa Flu Fix',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-flu-fix',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '12X HPUS' },
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Anas barbariae', strength: '6C HPUS' },
      { name: 'Bryonia alba', strength: '9X HPUS' },
      { name: 'Echinacea angustifolia', strength: '6X HPUS' },
      { name: 'Eupatorium perfoliatum', strength: '6X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Ipecacuanha', strength: '12X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '9X HPUS' },
      { name: 'Rhus toxicodendron', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite('https://www.genexa.com/products/flu-fix-flu-medicine', METH.riceBran),
      ),
      flag(
        'Açaí berry flavor (organic)',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/flu-fix-flu-medicine',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/flu-fix-flu-medicine',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite('https://www.genexa.com/products/flu-fix-flu-medicine', METH.cleared),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite('https://www.genexa.com/products/flu-fix-flu-medicine', METH.cleared),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Flu Fix = Caution. Organic rice bran extract is Cleared. Organic açaí flavor is Cleared. Driver is organic maltodextrin Limited 1 pt, matching locked genexa-kids-cold-crush — do not invent Clean. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 12+ (a 4–11 chart exists — this row is the adult SKU). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ADULT_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/flu-fix-flu-medicine — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 7900b6f2-a563-831c-e053-2a91aa0a558d — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-cold-crush',
    barcode: '857630006069',
    productName: 'Genexa Cold Crush',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-cold-crush',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    recordStatus: UNVERIFIED,
    ...homeopathicFields(),
    activeIngredients: [
      { name: 'Aconitum napellus', strength: '6X HPUS' },
      { name: 'Allium cepa', strength: '6X HPUS' },
      { name: 'Bryonia alba', strength: '12X HPUS' },
      { name: 'Euphrasia officinalis', strength: '6X HPUS' },
      { name: 'Gelsemium sempervirens', strength: '12X HPUS' },
      { name: 'Nux vomica', strength: '12X HPUS' },
      { name: 'Pulsatilla', strength: '6X HPUS' },
      { name: 'Rhus toxicodendron', strength: '12X HPUS' },
      { name: 'Sabadilla', strength: '12X HPUS' },
    ],
    inactiveIngredients: [
      flag(
        'Organic rice bran extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough',
          METH.riceBran,
        ),
      ),
      flag(
        'Açaí berry flavor (organic)',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Maltodextrin (organic)',
        'limited',
        labelCite(
          'https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough',
          METH.maltodextrin,
        ),
      ),
      flag(
        'Organic carnauba wax',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough',
          METH.cleared,
        ),
      ),
      flag(
        'Organic dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Cold Crush (adult) = Caution. Different id from genexa-kids-cold-crush — do not clone. Organic rice bran extract is Cleared. Organic açaí flavor is Cleared. Driver is organic maltodextrin Limited 1 pt, matching locked kids-cold-crush — do not invent Clean. Homeopathic chewable — cleanliness only, no efficacy claim. ' +
      CARLSTON +
      ' Ages 12+ (a 4–11 chart exists — this row is the adult SKU). No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ADULT_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/cold-crush-tablets-for-cold-and-cough — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 78ff93d3-5c77-b951-e053-2a91aa0adda9 — ${UNVERIFIED_NOTE}`,
      CARLSTON,
    ],
  },
  {
    id: 'genexa-kids-honey-cough-syrup',
    barcode: '857630006953',
    productName: "Genexa Kids' Honey Cough Syrup",
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-kids-honey-cough-syrup',
    audience: KIDS,
    minAge: 1,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'Supplement',
    productSubtype: 'herbal',
    activeIngredients: [
      { name: 'Organic elderberry', strength: 'as labeled' },
      { name: 'Organic echinacea', strength: 'as labeled' },
    ],
    inactiveIngredients: [
      flag(
        'Organic cultured dextrose',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-honey-cough-syrup',
          METH.culturedDextrose,
        ),
      ),
      flag(
        'Organic acerola fruit extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-honey-cough-syrup',
          METH.acerola,
        ),
      ),
      flag(
        'Organic honey',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-honey-cough-syrup',
          METH.honey,
        ),
      ),
      flag(
        'Citric acid',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-honey-cough-syrup',
          METH.cleared,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/kids-honey-cough-syrup',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Kids\' Honey Cough Syrup = Caution. Driver is organic cultured dextrose (standalone Caution, not Avoid; Sept 14 lock). Organic acerola is Cleared-class food. Honey is Cleared-class sweetener — honest note only: not for under 1. No dosing. Dietary supplement / herbal syrup — no DailyMed drug SPL. Carton has a 1–3 chart; this row is minAge 1 because honey is not for infants under 1. Pack sizes share formulaId. No medical advice in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: KIDS_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/kids-honey-cough-syrup — ${UNVERIFIED_NOTE}; no DailyMed drug SPL`,
    ],
  },
  {
    id: 'genexa-cough-chest-congestion',
    // KYR5-c barcode-tile chunk 6 — HelloPharmacist GTIN-13
    // 0850015736858 / Palletfly wholesale unit UPC-A 850015736858
    // on the 6 fl oz (177 mL) adult bottle (NDC 69676-0077-9).
    // Not combo 850015736834 / not kids 850015736018.
    productName: 'Genexa Cough & Chest Congestion (6 fl oz)',
    brand: BRAND,
    category: COLD_FLU,
    barcode: '850015736858',
    formulaId: 'genexa-cough-chest-congestion',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Dextromethorphan HBr', strength: '20mg / 20mL' },
      { name: 'Guaifenesin', strength: '400mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cough-chest-congestion',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cough-chest-congestion',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Natural Citrus Extract',
        'limited',
        labelCite(
          'https://www.genexa.com/products/cough-chest-congestion',
          `${METH.citrus}. ${METH.citrusTap}`,
        ),
      ),
      flag(
        'Natural flavor',
        'limited',
        labelCite(
          'https://www.genexa.com/products/cough-chest-congestion',
          METH.flavors,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/cough-chest-congestion',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Cough & Chest Congestion (adult) = Caution. Prefer live Genexa.com OI. Driver is Natural Citrus Extract Limited 1 pt (Sept 14 lock); accompanying natural flavor is the same Limited flavor-opacity family (still Caution, not Avoid). Organic agave / organic blueberry are Cleared. Ages 12+ (under 12: do not use). Combo packs are OUT — this is the daytime cough formula only. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ADULT_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/cough-chest-congestion — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 18835205-a9e3-15c2-e063-6394a90a8107 (combo SPL daytime part / actives; ${UNVERIFIED_NOTE})`,
    ],
  },
  {
    id: 'genexa-nighttime-severe-cold-flu',
    productName: 'Genexa Nighttime Severe Cold & Flu',
    brand: BRAND,
    category: COLD_FLU,
    formulaId: 'genexa-nighttime-severe-cold-flu',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    recordStatus: UNVERIFIED,
    productType: 'OTC',
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 20mL' },
      { name: 'Dextromethorphan HBr', strength: '30mg / 20mL' },
      { name: 'Doxylamine succinate', strength: '12.5mg / 20mL' },
    ],
    inactiveIngredients: [
      flag(
        'Organic chamomile extract',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack',
          METH.chamomile,
        ),
      ),
      flag(
        'Natural flavor',
        'limited',
        labelCite(
          'https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack',
          METH.flavors,
        ),
      ),
      flag(
        'Organic agave syrup',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Organic blueberry flavor',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack',
          METH.organicFlavor,
        ),
      ),
      flag(
        'Purified water',
        'cleared',
        labelCite(
          'https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack',
          METH.cleared,
        ),
      ),
    ],
    verdict: 'caution',
    honestNote:
      'FOUNDER-STYLE DRAFT: Nighttime Severe Cold & Flu = Caution. Driver is organic chamomile extract (standalone Caution, not Avoid; Sept 14 lock). Natural flavor is also Limited 1 pt. Organic agave / organic blueberry are Cleared. Night formula only — the day+night combo pack itself is OUT (no kit row). Live source is the combo product page because no standalone night PDP is sold. Stay under 4 g/day acetaminophen. ' +
      SEDATING +
      ' Ages 12+. No dosing in this draft.',
    retailers: [...GENEXA_RETAILERS],
    cleanAlternatives: ADULT_COLD_ALTS,
    sourcesGeneral: [
      `https://www.genexa.com/products/daytime-cough-nighttime-severe-cold-flu-combo-pack (night formula) — ${UNVERIFIED_NOTE}`,
      `DailyMed setid 18835205-a9e3-15c2-e063-6394a90a8107 (night part actives; ${UNVERIFIED_NOTE})`,
    ],
  },
];
