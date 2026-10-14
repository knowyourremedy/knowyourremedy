// DRAFT / not verified / batch 61 Amazon house pinned-OI WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only (Sept 16 Amazon house leftover
// stamps already on MAIN — no new §5 invent). No invented grades.
// No cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Amazon HOUSE pinned-OI rows ONLY. recordStatus is
// 'unverified' on every row. Internal keys only: clean | caution |
// avoid. UPC attached only when DailyMed / NDC / carton has a real
// code — no invented codes. Missing code ≠ no row (omit barcode).
// Pack sizes of the same name+form+inactives share formulaId. Form
// is labeled on cleanAlternatives, not a hard filter (§6). Search
// wiring only. Not wired into Clean Picks UI. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology
// rewrite. PROJECT_NOTES tally-only (do not wipe LIVE NOW).
//
// DO NOT REOPEN: batch30 house wave · batch54–58 Amazon P&F ·
// batch59–60 Thrive. 3P / WELMATE / A+Health / HealthA2Z /
// TIME-Cap / GoodSense full lines stay out. Do not write
// missing-OI SKUs (Elements/Basics multis, Mama Bear D3/C/
// elderberry/probiotic, Solimo leftovers, Revly, saline,
// pour-bottle oils). Do not stash. Do not invent OI.
//
// LOCKS used (exact §5, already on MAIN): Day/night kit = two
// rows when OI differs. Basics previously Elements = one row
// unless OI changed. Lo Han Fruit Concentrate = Cleared.
// edible ink unspecified = Caution. sodium pyruvate = Caution.
// unlabeled modified cellulose = Limited. Unlabeled Vegetable
// Capsule = no grade on the shell. Mama Bear gummy sunflower
// oil = High. Caramel no class = Avoid (not on these labels).
// Display keys stay clean / caution / avoid. HFCS parked /
// notes-only on night liquids (not a live grade). Prefer
// printed Drug Facts over structured SPL extras (simethicone
// SiO2 conflict flagged in notes). APAP 650 ER is its own
// label — do not clone Tylenol 8HR families. Loperamide
// 72288-224 / 225 / 313 are OWN rows (do not merge).
//
// TALLY (unverified drafts in THIS file): 18 rows — Clean 1 /
// Caution 2 / Avoid 15. NEW 18 / REUSE 0.
//
// Independently Clean analogs already on main (not cloned):
// amazon-basic-care-loratadine-l612 ·
// amazon-basic-care-loratadine-aurohealth ·
// amazon-basic-care-triple-pain-ointment ·
// amazon-basics-clearlax-unflavored ·
// genexa-acetaminophen-es · genuine-bayer-aspirin-325 ·
// phillips-mom-original · boiron-acidcalm · coldcalm-meltaways ·
// thrive-wellmade-real-food-vitamin-c ·
// wellmade-organic-acacia-fiber.
//
// TALLY is asserted at the bottom of this file.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
const OTC = 'OTC' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const ALLERGY = 'Allergy';
const PAIN_FEVER = 'Pain & Fever';
const COLD_FLU = 'Cold & Flu';
const DIGESTIVE = 'Digestive';
const FIRST_AID = 'First Aid';
const VITAMINS = 'Vitamins';

const BASIC_CARE = 'Amazon Basic Care';
const BASICS = 'Amazon Basics';
const ELEMENTS = 'Amazon Elements';
const MAMA_BEAR = 'Mama Bear';
const AMAZON = ['Amazon'] as const;

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. Sunflower / palm / safflower / vegetable oil used as a gummy coating or fill is that High rule. Capsule / softgel / drop fill of the same oil is not.';

const OIL_FILL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule / softgel / ointment fill they are not that High rule. Named single oil / butter as the base or fill is Cleared.';

const SIO2_TAP =
  'Silicon dioxide / silica is the 0-pt nanoparticle Caution cap (EFSA 2018 data-gap). It does not push Avoid.';

const SET = {
  dph: '7d237d37-21c7-476d-a8b7-d91ea1b472ee',
  docusate: '356a889f-ec23-4eb2-a25c-bbe609475155',
  gas: '6cd13797-207b-41fa-8dc1-5688f6b86149',
  lop224: '732edad8-9a3f-4ce0-a323-c8bffa4acb5f',
  lop225: '10edd7bc-fc35-abe3-e063-6394a90aeb3f',
  lop313: '04a35525-ae8e-b41e-e063-6294a90ab10e',
  apapEr: 'e88731b1-a6a9-407a-b7f8-b58d88aa9264',
  kitLiq: '612719a9-fa2e-4c40-8f35-a399aeaafecc',
  kitSoft: 'ceb342da-ff6d-4c19-9f78-0033d028075e',
  nightSev: '1341744c-43c3-462b-b93c-1e46476fd935',
  mucusDf: '9ab3d192-0fd4-48fd-95ea-3182c63a7327',
  triple: 'c159b18d-0d6e-409f-8b2b-e8f28cd85633',
  aspirin: '265c7d85-a666-4234-9c30-ca8e31f4bcb8',
} as const;

const CITE = {
  elementsC:
    'HelloPharmacist / NIH DSLD 300213 Amazon Elements Whole Food Vitamin C 500 mg vegan capsules other-ingredients: Modified Cellulose, Water, Rice, Powder (rice powder). Unlabeled Vegetable Capsule = no grade on the shell.',
  mamaMulti:
    'HelloPharmacist / Spoonful harvest Mama Bear Organic Kids Multivitamin Gummies other-ingredients: Tapioca Syrup, Cane Sugar, Pectin, Lemon juice concentrate, Organic flavors, Sodium Citrate, Maqui berry juice concentrate, Black Carrot juice concentrate, Annatto, Sunflower Oil, Carnauba wax. No carton UPC harvested.',
  mamaFiber:
    'Harvest Mama Bear Kids Fiber Gummies other-ingredients: Chicory Root Fiber (Inulin), Cane Sugar, Pectin, Citric Acid, Sodium Citrate, Natural Flavors, Colors Added (Organic Turmeric, Organic Black Carrot Juice Concentrate, Organic Annatto), Organic Sunflower Oil, Lo Han Fruit Concentrate, Organic Carnauba Wax. Amazon / carton UPC 842379192166 (60 ct orange).',
} as const;

const BATCH61_CATCHUP_BARCODES: Record<string, string> = {
  'mama-bear-kids-fiber-gummies': '842379192166',
  'amazon-basics-loperamide-softgel-313': '195515045254',
  'amazon-basic-care-apap-650-er-l544': '370030114573',
  'amazon-basic-care-aspirin-81-chew-l467': '195515050906',
  'amazon-basic-care-mucus-er-max-dyefree': '195515012881',
  'amazon-basic-care-triple-abx-oil-blend': '370030114535',
  'amazon-basic-care-gas-relief-ultra-l657': '195515032964',
  'amazon-basic-care-loperamide-224': '370030146086',
  // KYR5-c barcode-tile chunk 1 — daytime-only 12 fl oz bottle
  // (not a day/night combo kit UPC).
  'amazon-basic-care-daytime-cold-flu-liquid': '370030145188',
  // Nighttime-only 12 fl oz cherry bottle.
  'amazon-basic-care-nighttime-cold-flu-liquid': '370030114368',
  // KYR5-c barcode-tile chunk 2 — standalone softgel bottles
  // (not the day/night kit UPC).
  'amazon-basic-care-daytime-cold-flu-softgel': '370030145171',
  'amazon-basic-care-nighttime-cold-flu-softgel': '195515012669',
  // KYR5-d online leftover — Original Severe 12 fl oz B09HJTM8DK
  // Product details field "UPC". OI matches 72288-189 (Yellow #10 +
  // Green #3 + Yellow 6; no HFCS). Do not steal Berry B00ASEO13A
  // 370030145201 (Blue #1 / Red #40) or honey 195515032933.
  'amazon-basics-nighttime-severe-cold-flu-liquid': '195515119740 370030145508',
};

const METH = {
  dyes: 'Methodology §5 High-tier (synthetic dyes, including lake forms)',
  tio2: 'Methodology §5 High-tier (titanium dioxide / E171)',
  bha: 'Methodology §5 High-tier (BHA / butylated hydroxyanisole — NTP reasonably anticipated; Prop 65)',
  seedOilGummies: `Methodology §5 High-tier (seed/industrial oils in gummies — soybean, canola, palm, safflower, sunflower, vegetable oil). ${GUMMY_OIL_TAP}`,
  peg: 'Methodology §5 Moderate-risk (PEGs — ethylene-oxide / 1,4-dioxane contamination risk)',
  pg: 'Methodology §5 Moderate-risk (propylene glycol, oral)',
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  saccharin: 'Methodology §5 Moderate-risk (saccharin)',
  sucralose: 'Methodology §5 Moderate-risk (sucralose)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol, maltitol, mannitol — GI effects at volume)',
  maltodextrin:
    'Methodology §5 Limited-risk (maltodextrin — organic or non-organic; same Limited)',
  alcohol:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / grain alcohol as a VEHICLE — Limited, not Avoid)',
  juiceBase:
    'Methodology §5 Cleared (fruit puree / juice concentrate when it is the fruit — named fruit; Clean; not a sugar row; not Usable; not high fructose corn syrup; locked Oct 14, 2026). These are the fruit.',
  modifiedCellulose:
    'Methodology §5 Limited-risk (unlabeled modified cellulose — unspecified modified cellulose/starch neighborhood; named MCC / HPMC / ethylcellulose / methylcellulose stay Cleared; locked Sept 16, 2026)',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  sio2: `Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points). ${SIO2_TAP}`,
  edibleInk:
    'Methodology §5 Caution (edible ink unspecified — exact token; standalone Caution, not Avoid; locked Sept 16, 2026)',
  pyruvate:
    'Methodology §5 Caution (sodium pyruvate — exact token; standalone Caution, not Avoid; locked Sept 16, 2026)',
  tocopherylAcetate:
    'Methodology §5 Caution (tocopheryl acetate — exact INCI; distinct from Cleared mixed tocopherols / D-Alpha-Tocopherol; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ricePowder:
    'Methodology §5 Caution (Rice Powder — exact token; distinct from Caution rice flour and from Caution organic rice meal; not Cleared rice hull / rice bran; locked Sept 16, 2026)',
  annatto:
    'Methodology §5 Caution (annatto / Organic Annatto Extract (Color) — allergenic; standalone Caution, not additive-scored, not Avoid)',
  namedColor:
    'Methodology §5 Cleared (black carrot / named fruit-or-vegetable juice as color / maqui / turmeric-as-color)',
  loHan:
    'Methodology §5 Cleared (Lo Han Fruit Concentrate — monk fruit / luo han sibling; locked Sept 16, 2026)',
  inulin:
    'Methodology §5 Cleared (inulin / Chicory Root Fiber — same family; locked Sept 16, 2026)',
  oilFill: `Methodology §5 Cleared (named single oil / butter as the topical BASE or FILL — cottonseed / olive / cocoa; tap fill ≠ gummy High). ${OIL_FILL_TAP}`,
  petrolatum:
    'Methodology §5 Cleared (petrolatum / white petrolatum — topical occlusive)',
  castor:
    'Methodology §5 Cleared (castor oil / polyoxyl castor oil derivatives — oral/topical; locked v1.6)',
  glycerylCaprylate:
    'Methodology §5 Cleared (glyceryl caprylate — exact INCI; locked Sept 15, 2026)',
  edta: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer — locked v1.6)',
  gums: 'Methodology §5 Cleared (xanthan gum, guar gum, gum arabic / acacia, pectin, gellan gum)',
  hpmc: 'Methodology §5 Cleared (hypromellose / HPMC / hydroxypropyl methylcellulose)',
  stearic:
    'Methodology §5 Cleared (magnesium stearate / stearic acid / calcium stearate / vegetable stearate)',
  starch:
    'Methodology §5 Cleared (pregelatinized / corn / potato / tapioca starch / pea starch / similar simple starches)',
  cellulose:
    'Methodology §5 Cleared (microcrystalline cellulose / croscarmellose sodium / cellulose gum)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer homopolymer type B — current monograph; locked Sept 15, 2026)',
  ssg: 'Methodology §5 Cleared (sodium starch glycolate)',
  gelatin:
    'Methodology §5 Cleared (lactose, gelatin, carnauba wax, beeswax, purified water)',
  glycerin: 'Methodology §5 Cleared (glycerin / vegetable glycerin / organic glycerin)',
  water: 'Methodology §5 Cleared (purified water / distilled water)',
  citrate:
    'Methodology §5 Cleared (citric acid / citrate salts / malic / lactic / fumaric / adipic / tartaric)',
  dical:
    'Methodology §5 Cleared (dicalcium phosphate / tricalcium phosphate / dibasic calcium phosphate — mineral fillers / buffers)',
  sugar:
    'Methodology §5 Cleared (cane sugar, glucose syrup, tapioca syrup / dextrose / sucrose)',
  povidone: 'Methodology §5 Cleared (povidone / crospovidone — locked housekeeping)',
  monk: 'Methodology §5 Cleared (monk fruit / mogrosides / Luo Han Guo, high-purity extract)',
  cleared: 'Methodology §5 Cleared',
} as const;

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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'retailers' | 'recordStatus'> & {
    retailers?: string[];
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return {
    ...opts,
    recordStatus: opts.recordStatus ?? UNVERIFIED,
    retailers: opts.retailers ?? [...AMAZON],
  };
}

const ALLERGY_ALTS: CleanAlternative[] = [
  alt(
    'amazon-basic-care-loratadine-l612',
    'Independently Clean Amazon Basic Care plain loratadine L612 already on main. Form: tablet — labeled, not a hard filter (§6). Different active (loratadine vs DPH).',
  ),
  alt(
    'claritin-allergy-tablets-plain',
    'Independently Clean national loratadine analog already on main. Form: tablet.',
  ),
];

const DIGESTIVE_ALTS: CleanAlternative[] = [
  alt(
    'phillips-mom-original',
    'Independently Clean adult Digestive analog (Phillips Original Milk of Magnesia) already on main. Form labeled, not a hard filter (§6). Different active; cleanliness peer only.',
  ),
  alt(
    'boiron-acidcalm',
    'Independently Clean adult Digestive analog (Boiron AcidCalm) already on main. Form: meltaway tablet — labeled, not a hard filter (§6). Cleanliness only; not an efficacy swap.',
  ),
];

const APAP_ALTS: CleanAlternative[] = [
  alt(
    'genexa-acetaminophen-es',
    'Closest independently Clean adult acetaminophen 500 mg analog already on main. Form: caplet vs this ER tablet — labeled, not a hard filter (§6). Do not clone Tylenol 8HR families onto this Amazon L544 label.',
  ),
  alt(
    'cvs-health-es-castor',
    'Independently Clean adult acetaminophen 500 mg already on main. Form: film-coated tablet — labeled, not a hard filter (§6).',
  ),
];

const COLD_ALTS: CleanAlternative[] = [
  alt(
    'coldcalm-meltaways',
    'No independently Clean guaifenesin / DayQuil-class liquid exists as a same-active swap. Closest independently Clean adult Cold & Flu analog is ColdCalm meltaways already on main. Form labeled, not a hard filter (§6); not an expectorant replacement.',
  ),
];

const ASPIRIN_ALTS: CleanAlternative[] = [
  alt(
    'genuine-bayer-aspirin-325',
    'Independently Clean Genuine Bayer Aspirin 325 coated already on main. Form: coated tablet vs this orange chewable — labeled, not a hard filter (§6). Strength differs (325 vs 81). Do not invent a Clean Amazon chewable.',
  ),
];

const FIRST_AID_ALTS: CleanAlternative[] = [
  alt(
    'amazon-basic-care-triple-pain-ointment',
    'Independently Clean Amazon Basic Care Triple + Pain (petrolatum only) already on main. Same-store analog. Form: ointment. Distinct from this oil-blend / sodium pyruvate row.',
  ),
];

const VITAMIN_C_ALTS: CleanAlternative[] = [
  alt(
    'thrive-wellmade-real-food-vitamin-c',
    'Independently Clean whole-food vitamin C analog already on main (named HPMC capsule + rice hull). Form: capsule. Do not invent a Clean Amazon Elements C.',
  ),
  alt(
    'pure-encapsulations-ascorbic-acid-1000',
    'Independently Clean ascorbic-acid analog already on main. Form: capsule — labeled, not a hard filter (§6).',
  ),
];

const FIBER_ALTS: CleanAlternative[] = [
  alt(
    'wellmade-organic-acacia-fiber',
    'Independently Clean fiber analog already on main. Form: powder vs gummy — labeled, not a hard filter (§6). Do not invent a Clean Mama Bear fiber gummy.',
  ),
];

export const BATCH61_AMAZON_HOUSE_PINNED: RatingRecord[] = [
  // ── Clean ────────────────────────────────────────────────
  row({
    id: 'amazon-basic-care-mucus-er-max-dyefree',
    productName:
      'Amazon Basic Care Mucus-ER Max Dye-Free (Guaifenesin 1200 mg)',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-mucus-er-max-dyefree'],
    formulaId: 'amazon-basic-care-mucus-er-max-dyefree',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Guaifenesin', strength: '1200mg' }],
    inactiveIngredients: [
      flag('Carbomer homopolymer type B', 'cleared', dailymed(SET.mucusDf, METH.carbomer)),
      flag('Hypromellose', 'cleared', dailymed(SET.mucusDf, METH.hpmc)),
      cleared(SET.mucusDf, 'Magnesium stearate'),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.mucusDf, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.mucusDf, METH.ssg)),
    ],
    verdict: 'clean',

    sourcesGeneral: [
      `DailyMed setid ${SET.mucusDf} (Amazon Basic Care Mucus-ER Max dye-free NDC 72288-650; ${UNVERIFIED_NOTE}) — not amazon-basic-care-mucus-er-max-blue1`,
    ],
  }),

  // ── Caution ──────────────────────────────────────────────
  row({
    id: 'amazon-basic-care-triple-abx-oil-blend',
    productName: 'Amazon Basic Care Triple Antibiotic Ointment (Oil-Blend)',
    brand: BASIC_CARE,
    category: FIRST_AID,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-triple-abx-oil-blend'],
    formulaId: 'amazon-basic-care-triple-abx-oil-blend',
    audience: ADULT,
    minAge: 2,
    form: 'ointment',
    productType: OTC,
    activeIngredients: [
      { name: 'Bacitracin zinc', strength: '400 units / g' },
      { name: 'Neomycin sulfate', strength: '3.5mg / g' },
      { name: 'Polymyxin B sulfate', strength: '5,000 units / g' },
    ],
    inactiveIngredients: [
      flag('Sodium pyruvate', 'cleared', dailymed(SET.triple, METH.pyruvate)),
      flag('Tocopheryl acetate', 'cleared', dailymed(SET.triple, METH.tocopherylAcetate)),
      flag('Cocoa butter', 'cleared', dailymed(SET.triple, METH.oilFill)),
      flag('Cottonseed oil', 'cleared', dailymed(SET.triple, METH.oilFill)),
      flag('Olive oil', 'cleared', dailymed(SET.triple, METH.oilFill)),
      flag('White petrolatum', 'cleared', dailymed(SET.triple, METH.petrolatum)),
    ],
    verdict: 'caution',

    cleanAlternatives: FIRST_AID_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.triple} (Amazon Basic Care Triple Abx oil-blend NDC 72288-067; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-elements-whole-food-vitamin-c-500',
    productName: 'Amazon Elements Whole Food Vitamin C 500 mg Vegan Capsules',
    brand: ELEMENTS,
    category: VITAMINS,
    formulaId: 'amazon-elements-whole-food-vitamin-c-500',
    audience: ADULT,
    minAge: 18,
    form: 'capsule',
    productType: VITAMIN,
    activeIngredients: [{ name: 'Vitamin C (whole food)', strength: '500mg' }],
    inactiveIngredients: [
      flag(
        'Modified cellulose',
        'limited',
        labelCite(CITE.elementsC, METH.modifiedCellulose),
      ),
      flag('Rice powder', 'cleared', labelCite(CITE.elementsC, METH.ricePowder)),
      flag('Water', 'cleared', labelCite(CITE.elementsC, METH.water)),
    ],
    verdict: 'caution',

    cleanAlternatives: VITAMIN_C_ALTS,
    sourcesGeneral: [`${CITE.elementsC} — ${UNVERIFIED_NOTE}`],
  }),

  // ── Avoid ────────────────────────────────────────────────
  row({
    id: 'amazon-basic-care-dph-25-l479',
    productName: 'Amazon Basic Care Allergy Relief (Diphenhydramine 25 mg, L479)',
    brand: BASIC_CARE,
    category: ALLERGY,
    barcode: '370030114146',
    formulaId: 'amazon-basic-care-dph-25-l479',
    audience: ADULT,
    minAge: 6,
    form: 'tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Diphenhydramine HCl', strength: '25mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 27 aluminum lake', 'high', dailymed(SET.dph, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.dph, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.dph, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.dph, METH.ps80)),
      flag('Carnauba wax', 'cleared', dailymed(SET.dph, METH.gelatin)),
      flag('Crospovidone', 'cleared', dailymed(SET.dph, METH.povidone)),
      flag('Dibasic calcium phosphate dihydrate', 'cleared', dailymed(SET.dph, METH.dical)),
      flag('Hypromellose', 'cleared', dailymed(SET.dph, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.dph, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.dph, METH.cellulose)),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.dph, METH.starch)),
      flag('Stearic acid', 'cleared', dailymed(SET.dph, METH.stearic)),
    ],
    verdict: 'avoid',

    cleanAlternatives: ALLERGY_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.dph} (Amazon Basic Care DPH 25 L479 NDC 72288-479; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-docusate-100-l486',
    productName: 'Amazon Basic Care Stool Softener (Docusate Sodium 100 mg, L486)',
    brand: BASIC_CARE,
    category: DIGESTIVE,
    barcode: '370030114696',
    formulaId: 'amazon-basic-care-docusate-100-l486',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    activeIngredients: [{ name: 'Docusate sodium', strength: '100mg' }],
    inactiveIngredients: [
      flag('D&C Red No. 33', 'high', dailymed(SET.docusate, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.docusate, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.docusate, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.docusate, METH.dyes)),
      flag('Titanium dioxide', 'high', dailymed(SET.docusate, METH.tio2)),
      flag('Edible ink', 'cleared', dailymed(SET.docusate, METH.edibleInk)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.docusate, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.docusate, METH.pg)),
      flag('Sorbitol sorbitan solution', 'limited', dailymed(SET.docusate, METH.sorbitol)),
      flag('Gelatin', 'cleared', dailymed(SET.docusate, METH.gelatin)),
      flag('Glycerin', 'cleared', dailymed(SET.docusate, METH.glycerin)),
      flag('Purified water', 'cleared', dailymed(SET.docusate, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.docusate} (Amazon Basic Care docusate L486 NDC 72288-486; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-gas-relief-ultra-l657',
    productName: 'Amazon Basic Care Gas Relief Ultra (Simethicone 180 mg, L657)',
    brand: BASIC_CARE,
    category: DIGESTIVE,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-gas-relief-ultra-l657'],
    formulaId: 'amazon-basic-care-gas-relief-ultra-l657',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    activeIngredients: [{ name: 'Simethicone', strength: '180mg' }],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET.gas, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.gas, METH.dyes)),
      flag('Gelatin', 'cleared', dailymed(SET.gas, METH.gelatin)),
      flag('Glycerin', 'cleared', dailymed(SET.gas, METH.glycerin)),
    ],
    verdict: 'avoid',

    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gas} (Amazon Basic Care Gas Relief Ultra L657 NDC 72288-657; printed Drug Facts OI; structured SPL also lists silicon dioxide — not scored; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-loperamide-224',
    productName: 'Amazon Basic Care Loperamide 2 mg (Film-Coated, 72288-224)',
    brand: BASIC_CARE,
    category: DIGESTIVE,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-loperamide-224'],
    formulaId: 'amazon-basic-care-loperamide-224',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Loperamide HCl', strength: '2mg' }],
    inactiveIngredients: [
      flag('D&C Yellow No. 10 aluminum lake', 'high', dailymed(SET.lop224, METH.dyes)),
      flag('FD&C Blue No. 1 aluminum lake', 'high', dailymed(SET.lop224, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.lop224, METH.peg)),
      flag('Anhydrous lactose', 'cleared', dailymed(SET.lop224, METH.gelatin)),
      flag('Carnauba wax', 'cleared', dailymed(SET.lop224, METH.gelatin)),
      flag('Hypromellose', 'cleared', dailymed(SET.lop224, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.lop224, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.lop224, METH.cellulose)),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.lop224, METH.starch)),
    ],
    verdict: 'avoid',

    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.lop224} (Amazon Basic Care loperamide film-coated NDC 72288-224; ${UNVERIFIED_NOTE}) — not 72288-225 / not 72288-313`,
    ],
  }),
  row({
    id: 'amazon-basic-care-loperamide-aurohealth-225',
    productName: 'Amazon Basic Care Loperamide 2 mg (Aurohealth, 72288-225)',
    brand: BASIC_CARE,
    category: DIGESTIVE,
    barcode: '195515048842',
    formulaId: 'amazon-basic-care-loperamide-aurohealth-225',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Loperamide HCl', strength: '2mg' }],
    inactiveIngredients: [
      flag('D&C Yellow No. 10 aluminum lake', 'high', dailymed(SET.lop225, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.lop225, METH.dyes)),
      flag('Colloidal silicon dioxide', 'cleared', dailymed(SET.lop225, METH.sio2)),
      flag('Lactose monohydrate', 'cleared', dailymed(SET.lop225, METH.gelatin)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.lop225, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.lop225, METH.cellulose)),
      flag('Sodium starch glycolate', 'cleared', dailymed(SET.lop225, METH.ssg)),
    ],
    verdict: 'avoid',

    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.lop225} (Amazon Basic Care loperamide Aurohealth NDC 72288-225; ${UNVERIFIED_NOTE}) — not 72288-224 / not 72288-313`,
    ],
  }),
  row({
    id: 'amazon-basics-loperamide-softgel-313',
    productName: 'Amazon Basics Anti-Diarrheal Loperamide 2 mg Softgel (72288-313)',
    brand: BASICS,
    category: DIGESTIVE,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basics-loperamide-softgel-313'],
    formulaId: 'amazon-basics-loperamide-softgel-313',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    activeIngredients: [{ name: 'Loperamide HCl', strength: '2mg' }],
    inactiveIngredients: [
      flag('Butylated hydroxyanisole (BHA)', 'high', dailymed(SET.lop313, METH.bha)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.lop313, METH.dyes)),
      flag('Edible ink', 'cleared', dailymed(SET.lop313, METH.edibleInk)),
      flag('Polyoxyl 40 hydrogenated castor oil', 'cleared', dailymed(SET.lop313, METH.castor)),
      flag('Glyceryl caprylate', 'cleared', dailymed(SET.lop313, METH.glycerylCaprylate)),
      flag('Gelatin', 'cleared', dailymed(SET.lop313, METH.gelatin)),
      flag('Glycerin', 'cleared', dailymed(SET.lop313, METH.glycerin)),
      flag('Purified water', 'cleared', dailymed(SET.lop313, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: DIGESTIVE_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.lop313} (Amazon Basics loperamide softgel NDC 72288-313; ${UNVERIFIED_NOTE}) — not 72288-224 / not 72288-225`,
    ],
  }),
  row({
    id: 'amazon-basic-care-apap-650-er-l544',
    productName: 'Amazon Basic Care Acetaminophen 650 mg Extended-Release (L544)',
    brand: BASIC_CARE,
    category: PAIN_FEVER,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-apap-650-er-l544'],
    formulaId: 'amazon-basic-care-apap-650-er-l544',
    audience: ADULT,
    minAge: 12,
    form: 'ER tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Acetaminophen', strength: '650mg' }],
    inactiveIngredients: [
      flag('Titanium dioxide', 'high', dailymed(SET.apapEr, METH.tio2)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.apapEr, METH.peg)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.apapEr, METH.ps80)),
      flag('Maltodextrin', 'limited', dailymed(SET.apapEr, METH.maltodextrin)),
      flag('Colloidal silicon dioxide', 'cleared', dailymed(SET.apapEr, METH.sio2)),
      flag('Carnauba wax', 'cleared', dailymed(SET.apapEr, METH.gelatin)),
      flag('Croscarmellose sodium', 'cleared', dailymed(SET.apapEr, METH.cellulose)),
      flag('Hypromellose', 'cleared', dailymed(SET.apapEr, METH.hpmc)),
      flag('Magnesium stearate', 'cleared', dailymed(SET.apapEr, METH.stearic)),
      flag('Microcrystalline cellulose', 'cleared', dailymed(SET.apapEr, METH.cellulose)),
      flag('Povidone', 'cleared', dailymed(SET.apapEr, METH.povidone)),
      flag('Pregelatinized starch', 'cleared', dailymed(SET.apapEr, METH.starch)),
      flag('Stearic acid', 'cleared', dailymed(SET.apapEr, METH.stearic)),
    ],
    verdict: 'avoid',

    cleanAlternatives: APAP_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.apapEr} (Amazon Basic Care APAP 650 ER L544 NDC 72288-544; ${UNVERIFIED_NOTE}) — not tylenol-8hr-peg / not tylenol-8hr-tio2`,
    ],
  }),
  row({
    id: 'amazon-basic-care-daytime-cold-flu-liquid',
    productName: 'Amazon Basic Care Daytime Cold & Flu Liquid (12 fl oz)',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-daytime-cold-flu-liquid'],
    formulaId: 'amazon-basic-care-daytime-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg / 15mL' },
      { name: 'Dextromethorphan HBr', strength: '10mg / 15mL' },
      { name: 'Phenylephrine HCl', strength: '5mg / 15mL' },
    ],
    inactiveIngredients: [
      flag('Butylated hydroxyanisole (BHA)', 'high', dailymed(SET.kitLiq, METH.bha)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.kitLiq, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.kitLiq, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.kitLiq, METH.pg)),
      flag('Saccharin sodium', 'moderate', dailymed(SET.kitLiq, METH.saccharin)),
      flag('Flavor', 'limited', dailymed(SET.kitLiq, METH.flavors)),
      flag('Edetate disodium', 'cleared', dailymed(SET.kitLiq, METH.edta)),
      flag('Glycerin', 'cleared', dailymed(SET.kitLiq, METH.glycerin)),
      flag('Sucrose', 'cleared', dailymed(SET.kitLiq, METH.sugar)),
      flag('Xanthan gum', 'cleared', dailymed(SET.kitLiq, METH.gums)),
      flag('Purified water', 'cleared', dailymed(SET.kitLiq, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.kitLiq} part NDC 72288-656 (Amazon Basic Care Daytime Cold & Flu liquid; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-nighttime-cold-flu-liquid',
    productName: 'Amazon Basic Care Nighttime Cold & Flu Liquid (12 fl oz)',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-nighttime-cold-flu-liquid'],
    formulaId: 'amazon-basic-care-nighttime-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 30mL' },
      { name: 'Dextromethorphan HBr', strength: '30mg / 30mL' },
      { name: 'Doxylamine succinate', strength: '12.5mg / 30mL' },
    ],
    inactiveIngredients: [
      flag('FD&C Blue No. 1', 'high', dailymed(SET.kitLiq, METH.dyes)),
      flag('FD&C Red No. 40', 'high', dailymed(SET.kitLiq, METH.dyes)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.kitLiq, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.kitLiq, METH.pg)),
      flag('Saccharin sodium', 'moderate', dailymed(SET.kitLiq, METH.saccharin)),
      flag('Alcohol', 'limited', dailymed(SET.kitLiq, METH.alcohol)),
      flag('Flavor', 'limited', dailymed(SET.kitLiq, METH.flavors)),
      flag('Anhydrous citric acid', 'cleared', dailymed(SET.kitLiq, METH.citrate)),
      flag('Sodium citrate', 'cleared', dailymed(SET.kitLiq, METH.citrate)),
      flag('Purified water', 'cleared', dailymed(SET.kitLiq, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.kitLiq} part NDC 72288-459 (Amazon Basic Care Nighttime Cold & Flu liquid; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-daytime-cold-flu-softgel',
    productName: 'Amazon Basic Care Daytime Cold & Flu Softgel (48-ct)',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-daytime-cold-flu-softgel'],
    formulaId: 'amazon-basic-care-daytime-cold-flu-softgel',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Dextromethorphan HBr', strength: '10mg' },
      { name: 'Phenylephrine HCl', strength: '5mg' },
    ],
    inactiveIngredients: [
      flag('FD&C Red No. 40', 'high', dailymed(SET.kitSoft, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.kitSoft, METH.dyes)),
      flag('Edible ink', 'cleared', dailymed(SET.kitSoft, METH.edibleInk)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.kitSoft, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.kitSoft, METH.pg)),
      flag('Sorbitol sorbitan solution', 'limited', dailymed(SET.kitSoft, METH.sorbitol)),
      flag('Gelatin', 'cleared', dailymed(SET.kitSoft, METH.gelatin)),
      flag('Glycerin', 'cleared', dailymed(SET.kitSoft, METH.glycerin)),
      flag('Povidone', 'cleared', dailymed(SET.kitSoft, METH.povidone)),
      flag('Purified water', 'cleared', dailymed(SET.kitSoft, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.kitSoft} part NDC 72288-994 (Amazon Basic Care Daytime Cold & Flu softgel; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-nighttime-cold-flu-softgel',
    productName: 'Amazon Basic Care Nighttime Cold & Flu Softgel (24-ct)',
    brand: BASIC_CARE,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-nighttime-cold-flu-softgel'],
    formulaId: 'amazon-basic-care-nighttime-cold-flu-softgel',
    audience: ADULT,
    minAge: 12,
    form: 'softgel',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '325mg' },
      { name: 'Dextromethorphan HBr', strength: '15mg' },
      { name: 'Doxylamine succinate', strength: '6.25mg' },
    ],
    inactiveIngredients: [
      flag('D&C Yellow No. 10', 'high', dailymed(SET.kitSoft, METH.dyes)),
      flag('FD&C Blue No. 1', 'high', dailymed(SET.kitSoft, METH.dyes)),
      flag('Edible ink', 'cleared', dailymed(SET.kitSoft, METH.edibleInk)),
      flag('Polyethylene glycol', 'moderate', dailymed(SET.kitSoft, METH.peg)),
      flag('Propylene glycol', 'moderate', dailymed(SET.kitSoft, METH.pg)),
      flag('Sorbitol sorbitan solution', 'limited', dailymed(SET.kitSoft, METH.sorbitol)),
      flag('Gelatin', 'cleared', dailymed(SET.kitSoft, METH.gelatin)),
      flag('Glycerin', 'cleared', dailymed(SET.kitSoft, METH.glycerin)),
      flag('Povidone', 'cleared', dailymed(SET.kitSoft, METH.povidone)),
      flag('Purified water', 'cleared', dailymed(SET.kitSoft, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.kitSoft} part NDC 72288-056 (Amazon Basic Care Nighttime Cold & Flu softgel; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basics-nighttime-severe-cold-flu-liquid',
    productName: 'Amazon Basics Nighttime Severe Cold & Flu Liquid',
    brand: BASICS,
    category: COLD_FLU,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basics-nighttime-severe-cold-flu-liquid'],
    formulaId: 'amazon-basics-nighttime-severe-cold-flu-liquid',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    activeIngredients: [
      { name: 'Acetaminophen', strength: '650mg / 30mL' },
      { name: 'Dextromethorphan HBr', strength: '20mg / 30mL' },
      { name: 'Doxylamine succinate', strength: '12.5mg / 30mL' },
      { name: 'Phenylephrine HCl', strength: '10mg / 30mL' },
    ],
    inactiveIngredients: [
      flag('D&C Yellow No. 10', 'high', dailymed(SET.nightSev, METH.dyes)),
      flag('FD&C Green No. 3', 'high', dailymed(SET.nightSev, METH.dyes)),
      flag('FD&C Yellow No. 6', 'high', dailymed(SET.nightSev, METH.dyes)),
      flag('Propylene glycol', 'moderate', dailymed(SET.nightSev, METH.pg)),
      flag('Saccharin sodium', 'moderate', dailymed(SET.nightSev, METH.saccharin)),
      flag('Sucralose', 'moderate', dailymed(SET.nightSev, METH.sucralose)),
      flag('Alcohol', 'limited', dailymed(SET.nightSev, METH.alcohol)),
      flag('Flavor', 'limited', dailymed(SET.nightSev, METH.flavors)),
      flag('Sorbitol solution', 'limited', dailymed(SET.nightSev, METH.sorbitol)),
      flag('Sodium benzoate', 'limited', dailymed(SET.nightSev, METH.benzoate)),
      flag('Edetate disodium', 'cleared', dailymed(SET.nightSev, METH.edta)),
      flag('Anhydrous citric acid', 'cleared', dailymed(SET.nightSev, METH.citrate)),
      flag('Sodium citrate', 'cleared', dailymed(SET.nightSev, METH.citrate)),
      flag('Glycerin', 'cleared', dailymed(SET.nightSev, METH.glycerin)),
      flag('Sodium chloride', 'cleared', dailymed(SET.nightSev, METH.cleared)),
      flag('Purified water', 'cleared', dailymed(SET.nightSev, METH.water)),
    ],
    verdict: 'avoid',

    cleanAlternatives: COLD_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.nightSev} (Amazon Basics Nighttime Severe Cold & Flu NDC 72288-189; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'amazon-basic-care-aspirin-81-chew-l467',
    productName: 'Amazon Basic Care Aspirin 81 mg Orange Chewable (L467)',
    brand: BASIC_CARE,
    category: PAIN_FEVER,
    barcode: BATCH61_CATCHUP_BARCODES['amazon-basic-care-aspirin-81-chew-l467'],
    formulaId: 'amazon-basic-care-aspirin-81-chew-l467',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    activeIngredients: [{ name: 'Aspirin', strength: '81mg' }],
    inactiveIngredients: [
      flag('FD&C Yellow No. 6 aluminum lake', 'high', dailymed(SET.aspirin, METH.dyes)),
      flag('Saccharin sodium', 'moderate', dailymed(SET.aspirin, METH.saccharin)),
      flag('Flavors', 'limited', dailymed(SET.aspirin, METH.flavors)),
      flag('Corn starch', 'cleared', dailymed(SET.aspirin, METH.starch)),
      flag('Dextrose excipient', 'cleared', dailymed(SET.aspirin, METH.sugar)),
    ],
    verdict: 'avoid',

    cleanAlternatives: ASPIRIN_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.aspirin} (Amazon Basic Care aspirin 81 chew L467 NDC 72288-467; ${UNVERIFIED_NOTE})`,
    ],
  }),
  row({
    id: 'mama-bear-organic-kids-multivitamin-gummies',
    productName: 'Mama Bear Organic Kids Multivitamin Gummies',
    brand: MAMA_BEAR,
    category: VITAMINS,
    barcode: '842379148811',
    formulaId: 'mama-bear-organic-kids-multivitamin-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: VITAMIN,
    activeIngredients: [
      { name: 'Kids organic multivitamin', strength: 'label serving' },
      { name: 'Zinc', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Sunflower oil',
        'high',
        labelCite(CITE.mamaMulti, METH.seedOilGummies),
      ),
      flag('Annatto', 'cleared', labelCite(CITE.mamaMulti, METH.annatto)),
      flag('Organic flavors', 'limited', labelCite(CITE.mamaMulti, METH.flavors)),
      flag(
        'Lemon juice concentrate',
        'cleared',
        labelCite(CITE.mamaMulti, METH.juiceBase),
      ),
      flag(
        'Maqui berry juice concentrate',
        'cleared',
        labelCite(CITE.mamaMulti, METH.namedColor),
      ),
      flag(
        'Black carrot juice concentrate',
        'cleared',
        labelCite(CITE.mamaMulti, METH.namedColor),
      ),
      flag('Tapioca syrup', 'cleared', labelCite(CITE.mamaMulti, METH.sugar)),
      flag('Cane sugar', 'cleared', labelCite(CITE.mamaMulti, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.mamaMulti, METH.gums)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.mamaMulti, METH.citrate)),
      flag('Carnauba wax', 'cleared', labelCite(CITE.mamaMulti, METH.gelatin)),
    ],
    verdict: 'avoid',

    sourcesGeneral: [`${CITE.mamaMulti} — ${UNVERIFIED_NOTE}`],
  }),
  row({
    id: 'mama-bear-kids-fiber-gummies',
    productName: 'Mama Bear Kids Fiber Gummies',
    brand: MAMA_BEAR,
    category: DIGESTIVE,
    barcode: BATCH61_CATCHUP_BARCODES['mama-bear-kids-fiber-gummies'],
    formulaId: 'mama-bear-kids-fiber-gummies',
    audience: KIDS,
    minAge: 2,
    form: 'gummy',
    productType: SUPPLEMENT,
    activeIngredients: [
      { name: 'Chicory root fiber (inulin)', strength: 'label serving' },
    ],
    inactiveIngredients: [
      flag(
        'Organic sunflower oil',
        'high',
        labelCite(CITE.mamaFiber, METH.seedOilGummies),
      ),
      flag('Organic annatto', 'cleared', labelCite(CITE.mamaFiber, METH.annatto)),
      flag('Natural flavors', 'limited', labelCite(CITE.mamaFiber, METH.flavors)),
      flag(
        'Lo Han Fruit Concentrate',
        'cleared',
        labelCite(CITE.mamaFiber, METH.loHan),
      ),
      flag(
        'Organic turmeric (color)',
        'cleared',
        labelCite(CITE.mamaFiber, METH.namedColor),
      ),
      flag(
        'Organic black carrot juice concentrate',
        'cleared',
        labelCite(CITE.mamaFiber, METH.namedColor),
      ),
      flag('Cane sugar', 'cleared', labelCite(CITE.mamaFiber, METH.sugar)),
      flag('Pectin', 'cleared', labelCite(CITE.mamaFiber, METH.gums)),
      flag('Citric acid', 'cleared', labelCite(CITE.mamaFiber, METH.citrate)),
      flag('Sodium citrate', 'cleared', labelCite(CITE.mamaFiber, METH.citrate)),
      flag('Organic carnauba wax', 'cleared', labelCite(CITE.mamaFiber, METH.gelatin)),
    ],
    verdict: 'avoid',

    cleanAlternatives: FIBER_ALTS,
    sourcesGeneral: [`${CITE.mamaFiber} — ${UNVERIFIED_NOTE}`],
  }),
];

export const BATCH61_REFUSED_NOT_WRITTEN: { sku: string; reason: string }[] = [
  {
    sku: 'Elements / Basics whole-food men’s / women’s / cultured multi, prenatal, B complex, C 1000, B12 lozenge, mag / iron / Ca+Mg / glucosamine, turmeric root 500, melatonin 3 mg, D3 tablet vs leftover softgel',
    reason: 'missing-OI — not pinned this pass; do not invent',
  },
  {
    sku: 'Mama Bear Organic Kids D3 / Vitamin C / elderberry / vegan probiotic gummies',
    reason: 'missing-OI — not pinned this pass; do not invent',
  },
  {
    sku: 'Solimo leftovers (adult / women’s multi, iron, D3 softgels, fiber gummies, fish-oil gummies)',
    reason: 'missing-OI / out of this pinned write; do not invent',
  },
  {
    sku: 'Revly full line',
    reason: 'out of this pinned write; do not invent',
  },
  {
    sku: 'Amazon saline spray / pour-bottle oils / EO / cooking oils',
    reason: 'hunt-list only or missing-OI; never grade bottles',
  },
  {
    sku: 'WELMATE / A+Health / HealthA2Z / TIME-Cap / GoodSense full lines; 3P brands',
    reason: 'out of file scope this pass',
  },
];

const _ROWS = BATCH61_AMAZON_HOUSE_PINNED;
if (_ROWS.length !== 18) throw new Error('batch61 tally drift: expected 18 rows');
if (_ROWS.filter((r) => r.verdict === 'clean').length !== 1) {
  throw new Error('batch61 Clean tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'caution').length !== 2) {
  throw new Error('batch61 Caution tally drift');
}
if (_ROWS.filter((r) => r.verdict === 'avoid').length !== 15) {
  throw new Error('batch61 Avoid tally drift');
}
if (_ROWS.some((r) => r.recordStatus !== UNVERIFIED)) {
  throw new Error('batch61 recordStatus must stay unverified');
}
if (_ROWS.some((r) => !r.formulaId)) {
  throw new Error('batch61 every row needs formulaId');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch61 duplicate ids');

const FORBIDDEN_IDS = [
  'amazon-basic-care-loratadine-l612',
  'amazon-basic-care-loratadine-aurohealth',
  'amazon-basic-care-mucus-er-max-blue1',
  'amazon-basic-care-triple-pain-ointment',
  'amazon-basics-petroleum-jelly',
  'amazon-elements-biotin-5000',
  'amazon-elements-melatonin-5',
  'tylenol-8hr-peg',
  'tylenol-8hr-tio2',
  'imodium-ad-caplets',
  'imodium-ad-softgels',
  'neosporin-original-ointment',
  'bayer-chewable-81-orange',
];
if (_ROWS.some((r) => FORBIDDEN_IDS.includes(r.id))) {
  throw new Error('batch61 must not clone batch30 / Tylenol 8HR / Imodium / Neosporin Original / Bayer chew ids');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => i.name.toLowerCase() === 'vegetable capsule'))) {
  throw new Error('do not invent a grade for unlabeled Vegetable Capsule');
}
if (_ROWS.some((r) => r.inactiveIngredients.some((i) => /high fructose|hfcs/i.test(i.name)))) {
  throw new Error('HFCS stays parked / notes-only — do not score it');
}
if (!_ids.has('amazon-basic-care-loperamide-224')) {
  throw new Error('loperamide 72288-224 must be its own row');
}
if (!_ids.has('amazon-basic-care-loperamide-aurohealth-225')) {
  throw new Error('loperamide 72288-225 must be its own row');
}
if (!_ids.has('amazon-basics-loperamide-softgel-313')) {
  throw new Error('loperamide 72288-313 must be its own row');
}
if (
  _ROWS.find((r) => r.id === 'amazon-basic-care-loperamide-224')?.formulaId ===
  _ROWS.find((r) => r.id === 'amazon-basic-care-loperamide-aurohealth-225')?.formulaId
) {
  throw new Error('do not merge loperamide 224 with 225');
}

for (const record of BATCH61_AMAZON_HOUSE_PINNED) {
  const expected = BATCH61_CATCHUP_BARCODES[record.id];
  if (expected && record.barcode !== expected) {
    throw new Error(`batch 61 catch-up UPC drift on ${record.id}`);
  }
}
