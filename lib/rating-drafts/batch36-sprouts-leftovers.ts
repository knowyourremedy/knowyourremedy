// DRAFT / not verified / batch 36 Sprouts leftover SKUs / methodology
// v1.6 + Sept 14–15 locks already on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE leftover write of founder-specified Sprouts house SKUs that were
// not in batch35. Do NOT clone or rewrite any batch35 rows. Mixed
// categories · recordStatus is 'unverified' on every row. Internal keys
// only: clean | caution | avoid. Do NOT invent Clean. Do NOT invent
// UPCs / barcodes. Pack sizes share formulaId. formulaId == id on every
// NEW row unless a pack sibling is named below. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean Picks
// UI. No live Clean Picks file is edited. No photos. Letter tiles only
// on new ids. No fake Clean alts. No night photos. No methodology
// rewrite. No other brand rewrites.
//
// FOUNDER-LOCKED leftover grades (applied, not re-derived). OI drivers
// are the Sept 15 leftover lock + RESCAN productId/slug where the
// harvest named that SKU. Store-brand PDPs are not OI. Alcohol % is
// not invented when the carton % was not dumped. Alcohol vehicle =
// Limited, not Avoid.
//
// TALLY (unverified drafts in THIS file): 70 rows — Clean 34 /
// Caution 35 / Avoid 1.
//
// REFUSED (do not invent OI):
// - Sprouts Organic Once Daily Men's Multivitamin — PDP
//   34853416 is front-only; cannot verify the OI line matches
//   Women's Organic Once Daily. Do not invent.
// - Sprouts Chlorophyll Glycerite — cropped panel; do not guess.
// - Sprouts UT Support liquid — no liquid SKU/OI in harvest (only
//   unread probiotic cap 25648164). Do not invent a tincture.
//
// Do NOT write List-B food/protein/shots/drinks/cosmetics/oil bottles.
// Do NOT write walk-list names with no OI beyond the refused list.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const VITAMIN = 'Vitamin' as const;
const SUPPLEMENT = 'Supplement' as const;
const BRAND = 'Sprouts';
const RETAILERS = ['Sprouts'] as const;

const PAIN_FEVER = 'Pain & Fever';
const SLEEP = 'Sleep';
const IMMUNE = 'Immune Support';
const VITAMINS = 'Vitamins';
const DIGESTIVE = 'Digestive';
const PRENATAL = 'Prenatal';

const CAPSULE_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this capsule/softgel/liquid-drop fill they are not that High rule.';

const GUMMY_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this gummy they are that High rule. This is not the capsule/softgel/liquid-drop fill rule.';

const ALCOHOL_VEHICLE_LINE =
  'Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active.';

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid.';

const MCT_UNLABELED_TAP =
  'Label says medium-chain triglycerides and does not name coconut. We mark that Limited because the source isn’t clear. MCT labeled from coconut is Cleared on oral capsule/softgel/liquid supplements (not a cooking-oil bottle).';

const BROWN_RICE_EXTRACT_TAP =
  'Label says organic brown rice extract — that is not the Cleared organic rice bran / rice hull family. We mark Caution because the label did not name hull, bran, or concentrate.';

const STEVIA_LEAF_TAP =
  'Stevia leaf extract is the whole-leaf / crude Caution row. It is not high-purity Reb A / Reb M (Cleared).';

const COCONUT_GUMMY_TAP =
  'Coconut oil alone in gummies/chews is NOT the seed/industrial-oil High rule.';

const CHLOROPHYLL_TAP =
  'Named chlorophyll (not sodium copper chlorophyllin) is Cleared. Chlorophyllin is a different Caution color row.';

const METH = {
  sio2:
    'Methodology §5 Precautionary (silicon dioxide — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  flavors: 'Methodology §5 Limited-risk (natural / artificial flavors — opacity)',
  maltodextrin:
    'Methodology §5 Limited-risk (organic maltodextrin — same Limited as non-organic)',
  alcoholVehicle: `Methodology §5 Limited-risk (alcohol / ethyl alcohol / grain alcohol / organic alcohol as a VEHICLE). ${ALCOHOL_VEHICLE_LINE} Not Avoid.`,
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  riceExtract: `Methodology §5 Limited-risk (unspecified rice extract / organic brown rice extract — not the Cleared bran/hull family). ${BROWN_RICE_EXTRACT_TAP}`,
  gummyOil: `Methodology §5 High-tier (seed/industrial oils in gummies). ${GUMMY_OIL_TAP}`,
  steviaLeaf: `Methodology §5 Caution (whole-leaf / crude stevia — do not auto-Clean; not Reb A / Reb M). ${STEVIA_LEAF_TAP}`,
  cleared: 'Methodology §5 Cleared',
  lecithin: 'Methodology §5 Cleared (lecithin — soy or sunflower — locked v1.6)',
  pullulan:
    'Methodology §5 Cleared (organic pullulan — starch capsule polymer; HPMC-family vegan cap)',
  brownRice:
    'Methodology §5 Cleared (rice protein / ferment media / organic/brown rice / rice syrup — food-state / starch family; not SiO2)',
  capsuleOil: `Methodology §5 — oil in a capsule / softgel / liquid-drop fill is NOT the gummy seed/industrial-oil High rule. ${CAPSULE_OIL_TAP}`,
  coconutGummy: `Methodology §5 Cleared (coconut oil alone in gummies/chews — NOT seed-oil High). ${COCONUT_GUMMY_TAP}`,
  chlorophyll: `Methodology §5 Cleared (named chlorophyll / named plant-part food botanical — not chlorophyllin). ${CHLOROPHYLL_TAP}`,
  wax: 'Methodology §5 Cleared (carnauba wax / beeswax / wax family)',
  gums: 'Methodology §5 Cleared (xanthan gum / gum arabic / acacia / pectin / gellan / guar — locked v1.6)',
} as const;

function flag(
  name: string,
  riskLevel: IngredientFlag['riskLevel'],
  source: string,
): IngredientFlag {
  return { name, riskLevel, source };
}

function labelCite(label: string, meth: string): string {
  return `${label}; ${meth}`;
}

function labelCleared(label: string, name: string): IngredientFlag {
  return flag(name, 'cleared', labelCite(label, METH.cleared));
}

function pdp(slug: string): string {
  return `https://shop.sprouts.com/store/sprouts/products/${slug}`;
}

const FOUNDER_LOCK =
  'Founder-locked Sept 15 leftover harvest. Store-brand PDP HTML is not Other Ingredients.';

function harvestCite(slug: string | undefined, oi: string): string {
  const loc = slug ? `${pdp(slug)} ` : '';
  return `${loc}${FOUNDER_LOCK} OI: ${oi}`;
}

const ID = {
  d3k2: 'sprouts-d3-k2-gummies',
  prenatalGummies: 'sprouts-prenatal-gummies',
  b12raspberry: 'sprouts-b12-raspberry-1000',
  b6: 'sprouts-b6-100',
  glutathione: 'sprouts-glutathione-500',
  melatoninTabs: 'sprouts-melatonin-3mg-tablets',
  superFiber: 'sprouts-super-fiber-tabs',
  tartCherry: 'sprouts-tart-cherry-turmeric',
  ryr: 'sprouts-red-yeast-rice',
  vitCRose: 'sprouts-vitamin-c-rose-hips-1000',
  b122500: 'sprouts-b12-2500',
  lionsManeCap: 'sprouts-lions-mane-veggie-cap',
  turmericCap: 'sprouts-turmeric-capsules',
  womensOrganic: 'sprouts-organic-womens-once-daily-multi',
  colonClean: 'sprouts-colon-clean-powder-cap',
  cranberry: 'sprouts-cranberry-powder-cap',
  cranberryDmannose: 'sprouts-cranberry-d-mannose-cap',
  fenugreek: 'sprouts-fenugreek-powder-cap',
  megaMag: 'sprouts-mega-magnesium',
  maca: 'sprouts-maca-powder-cap',
  thyroid: 'sprouts-thyroid-powder-cap',
  triphala: 'sprouts-triphala-powder-cap',
  oreganoSupreme: 'sprouts-oregano-supreme',
  garlicCap: 'sprouts-garlic-capsules',
  hawthornCap: 'sprouts-hawthorn-cap',
  holyBasilCap: 'sprouts-holy-basil-cap',
  mulleinCap: 'sprouts-mullein-cap',
  nettleCap: 'sprouts-nettle-cap',
  rhodiolaCap: 'sprouts-rhodiola-powder-cap',
  sawPalmettoCap: 'sprouts-saw-palmetto-powder-cap',
  liverDetox: 'sprouts-liver-detox-milk-thistle',
  garlicSoftgel: 'sprouts-garlic-softgels',
  sawPalmettoSoftgel: 'sprouts-saw-palmetto-160-softgels',
  dandelionAf: 'sprouts-fresh-dandelion-af',
  iodineKelp: 'sprouts-iodine-with-kelp',
  kavaLiq: 'sprouts-kava-liquid',
  lionsManeLiq: 'sprouts-lions-mane-liquid',
  valerianAf: 'sprouts-valerian-alcohol-free',
  kavaCap: 'sprouts-kava-powder-cap',
  reishiCap: 'sprouts-reishi-cap',
  turkeyTail: 'sprouts-turkey-tail',
  moringaCap: 'sprouts-moringa-powder-cap',
  moringaPowder: 'sprouts-moringa-100-powder',
  irishMoss: 'sprouts-organic-irish-moss-100-powder',
  mushroomBlend: 'sprouts-organic-mushroom-blend-100-powder',
  folic: 'sprouts-folic-acid-800',
  vitE1000: 'sprouts-vitamin-e-1000',
  vitESelenium: 'sprouts-vitamin-e-with-selenium',
} as const;

const B35 = {
  d3_1000: 'sprouts-d3-1000-rice-bran',
  sleepCap: 'sprouts-sleep-powder-cap',
  relaxCalm: 'sprouts-relax-all-calm-sleep',
  immuneRescue: 'sprouts-immune-rescue',
  ginkgo: 'sprouts-ginkgo-biloba',
  vitE400: 'sprouts-vitamin-e-400',
  oreganoCap: 'sprouts-oregano-oil-liquid-cap',
  zincPicolinate: 'sprouts-zinc-picolinate-30',
  peMelatonin: 'pure-encapsulations-melatonin-sr-3mg',
} as const;

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ALTS = {
  d3: [
    alt(
      B35.d3_1000,
      'Independently Clean Sprouts Vitamin D3 1000 IU softgel already on main in batch 35 (gelatin / glycerin / water / rice bran oil fill — not gummy High). Form: softgel — labeled, not a hard filter (§6). Same D3 shelf.',
    ),
  ],
  sleep: [
    alt(
      B35.sleepCap,
      'Independently Clean Sprouts Sleep Powder Cap already on main in batch 35 (modified vegetable cellulose only). Form: capsule — labeled, not a hard filter (§6). Same Sleep shelf.',
    ),
    alt(
      B35.relaxCalm,
      'Independently Clean Sprouts Relax-All Calm & Sleep already on main in batch 35 (cellulose capsule only). Form: capsule — labeled, not a hard filter (§6).',
    ),
    alt(
      B35.peMelatonin,
      'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already graded on main in batch 24. Form: capsule — labeled, not a hard filter (§6).',
    ),
  ],
  immune: [
    alt(
      B35.immuneRescue,
      'Independently Clean Sprouts 100% Vegetarian Immune Rescue already on main in batch 35 (modified vegetable cellulose + organic mycellated brown rice). Form: capsule — labeled, not a hard filter (§6).',
    ),
  ],
  oregano: [
    alt(
      B35.oreganoCap,
      'Independently Clean Sprouts Oregano Oil Liquid Cap already on main in batch 35 (soy lecithin / MVC / extra-virgin olive oil fill — not gummy High). Form: liquid capsule — labeled, not a hard filter (§6).',
    ),
  ],
  e: [
    alt(
      B35.vitE400,
      'Independently Clean Sprouts Vitamin E 400 IU Mixed Tocopherol already on main in batch 35 (gelatin / glycerin / soybean oil fill — not gummy High). Form: softgel — labeled, not a hard filter (§6). Same E shelf.',
    ),
  ],
  zinc: [
    alt(
      B35.zincPicolinate,
      'Independently Clean Sprouts Zinc Picolinate 30 mg already on main in batch 35 (gelatin / cellulose / magnesium stearate). Form: capsule — labeled, not a hard filter (§6).',
    ),
  ],
  herb: [
    alt(
      B35.ginkgo,
      'Independently Clean Sprouts Ginkgo Biloba veggie caps already on main in batch 35 (vegetable cellulose only). Form: veggie capsule — labeled, not a hard filter (§6).',
    ),
  ],
} as const;

type Draft = {
  id: string;
  productName: string;
  category: string;
  form: string;
  productType?: typeof VITAMIN | typeof SUPPLEMENT;
  actives: RatingRecord['activeIngredients'];
  inactives: IngredientFlag[];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  alts?: CleanAlternative[];
};

function row(d: Draft): RatingRecord {
  const barcode = BATCH36_CATCHUP_BARCODES[d.id];
  return {
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.id,
    audience: ADULT,
    minAge: 18,
    form: d.form,
    recordStatus: UNVERIFIED,
    productType: d.productType ?? SUPPLEMENT,
    activeIngredients: d.actives,
    inactiveIngredients: d.inactives,
    verdict: d.verdict,
    honestNote:
      `${d.note} Pack sizes share formulaId when the other-ingredients list holds. No DailyMed drug SPL (dietary supplement unless noted). No dosing or medical advice in this draft. Draft, not verified.`
        .replace(/\s+/g, ' ')
        .trim(),
    retailers: [...RETAILERS],
    cleanAlternatives: d.alts,
    sourcesGeneral: [`${d.cite} — draft, not verified; no DailyMed drug SPL`],
    ...(barcode ? { barcode } : {}),
  };
}

const CITE = {
  d3k2: harvestCite(
    '30044339-sprouts-d3-k2-gummies-60-ct',
    'sunflower oil in the gummy (High). Founder lock: seed-oil High in gummies, not the capsule/softgel fill rule.',
  ),
  prenatalGummies: harvestCite(
    '26928646-sprouts-prenatal-gummies-60-ct',
    'natural flavors (Limited); stevia leaf extract (Caution, not Reb A/M); coconut oil in gummy (Cleared).',
  ),
  b12raspberry: harvestCite(
    '17855338-sprouts-sublingual-liquid-vitamin-b12-1-fl-oz',
    'natural flavors (Limited). Distinct from batch35 B12 AF sublingual and B Complex Raspberry.',
  ),
  b6: harvestCite(
    '17858723-sprouts-100-milligram-vitamin-b6-100-ct',
    'silica / silicon dioxide (Caution cap). 250 ct productId 17858725 shares this formulaId.',
  ),
  glutathione: harvestCite(
    '25055382-sprouts-500mg-reduced-active-glutathione-caplets-30-ct',
    'silica / silicon dioxide (Caution cap); calcium stearate Cleared.',
  ),
  melatoninTabs: harvestCite(
    '17859173-sprouts-3-mg-melatonin-60-ct',
    'silica / silicon dioxide (Caution cap). Distinct from batch35 Melatonin 3 mg liquid.',
  ),
  superFiber: harvestCite(
    '17859041-sprouts-super-fiber-tablets-100-ct',
    'silica / silicon dioxide (Caution cap).',
  ),
  tartCherry: harvestCite(
    '17859129-sprouts-tart-cherry-with-turmeric-30-ct',
    'silica / silicon dioxide (Caution cap).',
  ),
  ryr: harvestCite(
    '17859119-sprouts-red-yeast-rice-supplements-60-ct',
    'silica / silicon dioxide (Caution cap).',
  ),
  vitCRose: harvestCite(
    '118563882-sprouts-vitamin-c-with-rose-hips-1000-mg',
    'silica / silicon dioxide (Caution cap). 250 ct sibling shares this formulaId. Distinct from batch35 Vitamin C 1000 capsules.',
  ),
  b122500: harvestCite(
    '17859159-sprouts-2500-micrograms-vitamin-b12-100-ct',
    'natural flavors (Limited) + silica / silicon dioxide (Caution cap).',
  ),
  lionsManeCap: harvestCite(
    '29421759-sprouts-lion-s-mane-herbal-supplement-veggie-capsules-60-ct',
    'organic brown rice extract (Caution / Limited opacity — not bran/hull); organic pullulan + myceliated brown rice Cleared.',
  ),
  turmericCap: harvestCite(
    '17858613-sprouts-turmeric-120-g',
    'unlabeled MCT (Limited); chlorophyll not chlorophyllin (Cleared). Distinct from batch35 Omega-3 + Turmeric TiO2 Avoid.',
  ),
  womensOrganic: harvestCite(
    '34822276-sprouts-women-s-once-daily-organic-multivitamins-1-each',
    'organic tapioca maltodextrin (Limited); wax / sunflower lecithin / glycerin / guar Cleared.',
  ),
  colonClean: harvestCite(
    '17858467-sprouts-colon-cleanse-powder-capsules-90-ct',
    'modified vegetable cellulose only.',
  ),
  cranberry: harvestCite(
    '17855350-sprouts-cranberry-powder-vegetarian-capsules-90-ct',
    'modified vegetable cellulose only. Distinct from batch35 D-Mannose + Cranberry flavored powder.',
  ),
  cranberryDmannose: harvestCite(
    '17858627-sprouts-cranberry-d-mannose-60-ct',
    'modified vegetable cellulose only. 120 ct productId 74372542 shares this formulaId. Distinct from batch35 flavored powder.',
  ),
  fenugreek: harvestCite(
    '17858479-sprouts-fenugreek-powder-vegetarian-capsules-90-ct',
    'modified vegetable cellulose only.',
  ),
  megaMag: harvestCite(
    '17858817-sprouts-mega-magnesium-90-ct',
    'modified vegetable cellulose only.',
  ),
  maca: harvestCite(
    '17858587-sprouts-maca-powder-capsules-90-ct',
    'modified vegetable cellulose only.',
  ),
  thyroid: harvestCite(
    '17858559-sprouts-thyroid-powder-capsule-90-ct',
    'modified vegetable cellulose only.',
  ),
  triphala: harvestCite(
    '17858597-sprouts-triphala-powder-capsules-90-ct',
    'modified vegetable cellulose only.',
  ),
  oreganoSupreme: harvestCite(
    '21965672-sprouts-oregano-supreme-capsules-90-ct',
    'vegetable / modified vegetable cellulose. Distinct from batch35 Oregano Oil Liquid Cap.',
  ),
  garlicCap: harvestCite(
    '17855354-sprouts-garlic-capsules-90-ct',
    'modified vegetable cellulose only.',
  ),
  hawthornCap: harvestCite(undefined, 'modified vegetable cellulose only. Separate formulaId from Hawthorn liquid.'),
  holyBasilCap: harvestCite(undefined, 'modified vegetable cellulose only. Separate formulaId from Holy Basil liquid.'),
  mulleinCap: harvestCite(
    '35863908-sprouts-mullein-capsules',
    'modified vegetable cellulose only. Separate formulaId from Mullein liquid.',
  ),
  nettleCap: harvestCite(undefined, 'modified vegetable cellulose only. Separate formulaId from Nettle liquid.'),
  rhodiolaCap: harvestCite(undefined, 'modified vegetable cellulose only. Separate formulaId from Rhodiola liquid.'),
  sawPalmettoCap: harvestCite(
    undefined,
    'modified vegetable cellulose only. Separate formulaId from Saw Palmetto liquid and from 160 mg softgels.',
  ),
  liverDetox: harvestCite(
    '17858517-sprouts-liver-detox-powder-capsules-90-ct',
    'modified vegetable cellulose only. Distinct from unread liquid-veg-cap sibling 17855320 (do not merge; do not invent MCT onto this powder-cap row).',
  ),
  garlicSoftgel: harvestCite(
    undefined,
    'soybean oil as softgel fill (not gummy High) + typical gelatin/glycerin shell. Separate formulaId from Garlic Capsules (MVC).',
  ),
  sawPalmettoSoftgel: harvestCite(
    '17859033-sprouts-saw-palmetto-160-mg',
    'olive oil fill + gelatin / glycerin / carob. Pack-name twins (160 mg / Saw Palmetto softgels) share this formulaId when the other-ingredients list holds.',
  ),
  dandelionAf: harvestCite(
    '21023196-sprouts-alcohol-free-fresh-dandelion-1-fl-oz',
    'glycerin + water. Alcohol-free.',
  ),
  iodineKelp: harvestCite(
    '17858497-sprouts-iodine-with-kelp',
    'glycerin + water.',
  ),
  kavaLiq: harvestCite(
    '17858661-sprouts-alcohol-free-kava-1-fl-oz',
    'glycerin + water. Alcohol-free. Distinct from unread alcohol Kava 17858645 (not written).',
  ),
  lionsManeLiq: harvestCite(
    undefined,
    'glycerin + water. Separate formulaId from Lion’s Mane veggie cap.',
  ),
  valerianAf: harvestCite(
    '17858563-sprouts-valerian-alcohol-free-1-fl-oz',
    'glycerin + water. Alcohol-free. Distinct from batch35 Valerian liquid (grain alcohol Caution).',
  ),
  kavaCap: harvestCite(
    undefined,
    'modified vegetable cellulose + flax seed powder. Separate formulaId from Kava liquid.',
  ),
  reishiCap: harvestCite(
    '29421834-sprouts-reishi-veggie-capsules-60-ct',
    'capsule + myceliated brown rice (ferment / food-state Cleared). Separate formulaId from Reishi liquid.',
  ),
  turkeyTail: harvestCite(
    '29421725-sprouts-turkey-tail-mushroom-herbal-supplement-veggie-caps-60-ct',
    'capsule + myceliated brown rice (ferment / food-state Cleared).',
  ),
  moringaCap: harvestCite(
    undefined,
    'modified vegetable cellulose only. Separate formulaId from Moringa liquid and from 100% powder.',
  ),
  moringaPowder: harvestCite(
    undefined,
    '100% moringa powder — no other-ingredients line beyond the named powder.',
  ),
  irishMoss: harvestCite(
    '21141140-sprouts-100-vegetarian-organic-irish-mosh-4-oz',
    '100% organic Irish moss powder — no other-ingredients line beyond the named powder. Slug spelling irish-mosh as published.',
  ),
  mushroomBlend: harvestCite(
    '25766185-sprouts-organic-mushroom-blend-5-oz',
    '100% organic mushroom blend powder — no other-ingredients line beyond the named powder.',
  ),
  folic: harvestCite(
    '17858789-sprouts-800mcg-folic-acid-tablets-250-ct',
    'lactose / cellulose / vegetable calcium stearate.',
  ),
  vitE1000: harvestCite(
    '17858897-sprouts-1000-iu-mixed-tocopherols-vitamin-e-each',
    'soybean oil as softgel fill (not gummy High). Distinct from batch35 Vitamin E 400 IU.',
  ),
  vitESelenium: harvestCite(
    '17858939-sprouts-vitamin-e-with-selenium-caplets-60-ct',
    'soy oil fill + beeswax (not gummy High).',
  ),
} as const;

// KYR5-b in-store Sprouts chunks 1–2 — official shop.sprouts PDP "UPC:"
// field (GTIN-14 00+UPC-A → 12-digit UPC-A). Pack extras share formulaId
// and are exact same-name count siblings already justified in cites.
const BATCH36_CATCHUP_BARCODES: Record<string, string> = {
  [ID.d3k2]: '646670549069',
  [ID.prenatalGummies]: '646670548147',
  [ID.b12raspberry]: '646670150418',
  [ID.b6]: '646670670138 646670670152',
  [ID.glutathione]: '646670699054',
  [ID.superFiber]: '646670681042',
  [ID.melatoninTabs]: '646670690303',
  [ID.tartCherry]: '646670682100',
  [ID.ryr]: '646670682056',
  [ID.vitCRose]: '646670528637 646670528644',
  [ID.b122500]: '646670690198',
  [ID.lionsManeCap]: '646670549175',
  [ID.turmericCap]: '646670621420',
  [ID.womensOrganic]: '646670548499',
  [ID.colonClean]: '646670620256',
  [ID.cranberry]: '646670154409',
  [ID.cranberryDmannose]: '646670621499 646670545887',
  [ID.fenugreek]: '646670620379',
  [ID.megaMag]: '646670671548',
  [ID.maca]: '646670621277',
  [ID.thyroid]: '646670621017',
  [ID.triphala]: '646670621345',
  [ID.oreganoSupreme]: '646670621666',
  [ID.garlicCap]: '646670154805',
  [ID.hawthornCap]: '646670155406',
  [ID.holyBasilCap]: '646670621253',
  [ID.mulleinCap]: '646670547881',
  [ID.nettleCap]: '646670155802',
  [ID.rhodiolaCap]: '646670621314',
  [ID.liverDetox]: '646670620669',
  [ID.sawPalmettoSoftgel]: '646670680892 646670680908',
  [ID.dandelionAf]: '646670621642',
  [ID.iodineKelp]: '646670620546',
  [ID.kavaLiq]: '646670631351',
  [ID.valerianAf]: '646670621055',
  [ID.kavaCap]: '646670155604',
  [ID.reishiCap]: '646670549199',
  [ID.turkeyTail]: '646670549205',
  [ID.moringaCap]: '646670621567',
  [ID.irishMoss]: '646670621611',
  [ID.mushroomBlend]: '646670681745',
  [ID.folic]: '646670671067',
  [ID.vitE1000]: '646670672590',
  [ID.vitESelenium]: '646670673023',
  'sprouts-astragalus-liquid': '646670631184',
  'sprouts-black-walnut-liquid': '646670037917',
  'sprouts-burdock-liquid': '646670620171',
  'sprouts-detox-drops': '646670116513',
  'sprouts-hawthorn-liquid': '646670631252',
  'sprouts-holy-basil-liquid': '646670157813',
  'sprouts-lemonbalm-liquid': '646670620621',
  'sprouts-licorice-liquid': '646670620638',
  'sprouts-lymph-tonic-liquid': '646670048210',
  'sprouts-male-virility-liquid': '646670046810',
  'sprouts-moringa-liquid': '646670621383',
  'sprouts-mullein-liquid': '646670620713',
  'sprouts-nettle-liquid': '646670631481',
  'sprouts-osha-liquid': '646670043611',
  'sprouts-parasite-cleanse-liquid': '646670631405',
  'sprouts-peppermint-spirits': '646670620782',
  'sprouts-propolis-liquid': '646670620799',
  'sprouts-red-chinese-ginseng-liquid': '646670620805',
  'sprouts-reishi-liquid': '646670620843',
  'sprouts-rhodiola-liquid': '646670620881',
  'sprouts-saw-palmetto-liquid': '646670631306',
  'sprouts-slippery-elm-liquid': '646670460296',
};

type AlcoholDraft = {
  id: string;
  productName: string;
  category: string;
  active: string;
  slug?: string;
  capAlt?: string;
};

const ALCOHOL_LIQUIDS: AlcoholDraft[] = [
  { id: 'sprouts-astragalus-liquid', productName: 'Sprouts Astragalus Liquid', category: IMMUNE, active: 'Astragalus extract', slug: '17858631-sprouts-astragalus-1-fl-oz' },
  { id: 'sprouts-black-walnut-liquid', productName: 'Sprouts Black Walnut Liquid', category: DIGESTIVE, active: 'Black walnut extract', slug: '17855260-sprouts-black-walnut-1-fl-oz' },
  { id: 'sprouts-burdock-liquid', productName: 'Sprouts Burdock Liquid', category: DIGESTIVE, active: 'Burdock extract', slug: '17858453-sprouts-burdock-1-fl-oz' },
  { id: 'sprouts-detox-drops', productName: 'Sprouts Detox Drops', category: DIGESTIVE, active: 'Detox herbal extract blend', slug: '17855298-sprouts-detox-1-fl-oz' },
  { id: 'sprouts-hawthorn-liquid', productName: 'Sprouts Hawthorn Liquid', category: VITAMINS, active: 'Hawthorn extract', slug: '17858641-sprouts-hawthorn-1-fl-oz', capAlt: ID.hawthornCap },
  { id: 'sprouts-holy-basil-liquid', productName: 'Sprouts Holy Basil Liquid', category: SLEEP, active: 'Holy basil extract', slug: '17855384-sprouts-holy-basil-1-fl-oz', capAlt: ID.holyBasilCap },
  { id: 'sprouts-lemonbalm-liquid', productName: 'Sprouts Lemonbalm Liquid', category: SLEEP, active: 'Lemon balm extract', slug: '17858511-sprouts-lemonbalm-1-fl-oz' },
  { id: 'sprouts-licorice-liquid', productName: 'Sprouts Licorice Liquid', category: DIGESTIVE, active: 'Licorice extract', slug: '17858513-sprouts-licorice-11-fl-oz' },
  { id: 'sprouts-lymph-tonic-liquid', productName: 'Sprouts Lymph Tonic', category: IMMUNE, active: 'Lymph tonic herbal extract blend', slug: '17855278-sprouts-lymph-tonic-1-fl-oz' },
  { id: 'sprouts-male-virility-liquid', productName: 'Sprouts Male Virility', category: VITAMINS, active: 'Male virility herbal extract blend', slug: '17855276-sprouts-male-virility-1-fl-oz' },
  { id: 'sprouts-moringa-liquid', productName: 'Sprouts Moringa Liquid', category: VITAMINS, active: 'Moringa extract', slug: '17858605-sprouts-moringa-1-fl-oz', capAlt: ID.moringaCap },
  { id: 'sprouts-mullein-liquid', productName: 'Sprouts Mullein Liquid', category: IMMUNE, active: 'Mullein extract', slug: '17858523-sprouts-mullein-1-fl-oz', capAlt: ID.mulleinCap },
  { id: 'sprouts-nettle-liquid', productName: 'Sprouts Nettle Liquid', category: IMMUNE, active: 'Nettle extract', slug: '17858681-sprouts-nettle-1-fl-oz', capAlt: ID.nettleCap },
  { id: 'sprouts-osha-liquid', productName: 'Sprouts Osha Liquid', category: IMMUNE, active: 'Osha extract', slug: '17855270-sprouts-osha-1-fl-oz' },
  { id: 'sprouts-parasite-cleanse-liquid', productName: 'Sprouts Parasite Cleanse Liquid', category: DIGESTIVE, active: 'Parasite cleanse herbal extract blend', slug: '17858667-sprouts-parasite-cleanse-1-fl-oz' },
  { id: 'sprouts-peppermint-spirits', productName: 'Sprouts Peppermint Spirits', category: DIGESTIVE, active: 'Peppermint spirits extract', slug: '17858531-sprouts-peppermint-spirits-1-fl-oz' },
  { id: 'sprouts-propolis-liquid', productName: 'Sprouts Propolis Liquid', category: IMMUNE, active: 'Propolis extract', slug: '17858533-sprouts-propolis-1-fl-oz' },
  { id: 'sprouts-red-chinese-ginseng-liquid', productName: 'Sprouts Red Chinese Ginseng Liquid', category: IMMUNE, active: 'Red Chinese ginseng extract', slug: '17858535-sprouts-red-chinese-ginseng-1-fl-oz' },
  { id: 'sprouts-reishi-liquid', productName: 'Sprouts Reishi Liquid', category: IMMUNE, active: 'Reishi extract', slug: '17858537-sprouts-reishi-1-fl-oz', capAlt: ID.reishiCap },
  { id: 'sprouts-rhodiola-liquid', productName: 'Sprouts Rhodiola Liquid', category: SLEEP, active: 'Rhodiola extract', slug: '17858541-sprouts-rhodiola-1-fl-oz', capAlt: ID.rhodiolaCap },
  { id: 'sprouts-saw-palmetto-liquid', productName: 'Sprouts Saw Palmetto Liquid', category: VITAMINS, active: 'Saw palmetto extract', slug: '17858651-sprouts-saw-palmetto-1-fl-oz', capAlt: ID.sawPalmettoCap },
  { id: 'sprouts-slippery-elm-liquid', productName: 'Sprouts Slippery Elm Liquid Extract', category: DIGESTIVE, active: 'Slippery elm extract', slug: '26859109-sprouts-slippery-elm-liquid-extract-1-fl-oz' },
];

function alcoholRow(a: AlcoholDraft): RatingRecord {
  const cite = harvestCite(
    a.slug,
    'grain alcohol / organic alcohol as extract vehicle + deionized water. Alcohol % not invented.',
  );
  const capAlts = a.capAlt
    ? [
        alt(
          a.capAlt,
          `Independently Clean in-batch matching powder/veggie cap (modified vegetable cellulose). Form: capsule — labeled, not a hard filter (§6). Separate formulaId from this liquid.`,
        ),
      ]
    : [...ALTS.herb];
  return row({
    id: a.id,
    productName: a.productName,
    category: a.category,
    form: 'liquid tincture',
    actives: [{ name: a.active, strength: 'label serving' }],
    inactives: [
      flag(
        'Grain alcohol / organic alcohol (as vehicle)',
        'limited',
        labelCite(cite, METH.alcoholVehicle),
      ),
      labelCleared(cite, 'Deionized water'),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: ${a.productName} = Caution. Driver is grain / organic alcohol as the extract vehicle (Limited, not Avoid). ${ALCOHOL_VEHICLE_LINE} Deionized water is Cleared. Alcohol percentage is not invented. Separate formulaId from any matching capsule / powder-cap row. ${LIMITED_STACK}`,
    cite,
    alts: capAlts,
  });
}

function silicaFlags(cite: string, extraCleared: string[] = []): IngredientFlag[] {
  return [
    ...extraCleared.map((name) => labelCleared(cite, name)),
    flag('Silicon dioxide (silica)', 'cleared', labelCite(cite, METH.sio2)),
  ];
}

function mvcRow(opts: {
  id: string;
  productName: string;
  category: string;
  form?: string;
  active: string;
  cite: string;
  extraNote?: string;
}): RatingRecord {
  return row({
    id: opts.id,
    productName: opts.productName,
    category: opts.category,
    form: opts.form ?? 'powder capsule',
    actives: [{ name: opts.active, strength: '1 capsule (label serving)' }],
    inactives: [labelCleared(opts.cite, 'Modified vegetable cellulose')],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: ${opts.productName} = Clean. Other Ingredients are modified vegetable cellulose (Cleared hypromellose / capsule cellulose). ${opts.extraNote ?? ''}`.trim(),
    cite: opts.cite,
  });
}

function glycerinWaterRow(opts: {
  id: string;
  productName: string;
  category: string;
  active: string;
  cite: string;
  extraNote?: string;
}): RatingRecord {
  return row({
    id: opts.id,
    productName: opts.productName,
    category: opts.category,
    form: 'liquid',
    actives: [{ name: opts.active, strength: 'label serving' }],
    inactives: [
      labelCleared(opts.cite, 'Vegetable glycerin'),
      labelCleared(opts.cite, 'Deionized water'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: ${opts.productName} = Clean. Other Ingredients are glycerin + water (Cleared). Alcohol-free. ${opts.extraNote ?? ''}`.trim(),
    cite: opts.cite,
  });
}

export const BATCH36_SPROUTS_LEFTOVERS: RatingRecord[] = [
  // ── Avoid ────────────────────────────────────────────────
  row({
    id: ID.d3k2,
    productName: 'Sprouts D3/K2 Gummies',
    category: VITAMINS,
    form: 'gummy',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin D3 (cholecalciferol)', strength: 'label serving' },
      { name: 'Vitamin K2', strength: 'label serving' },
    ],
    inactives: [
      flag('Sunflower oil (gummy)', 'high', labelCite(CITE.d3k2, METH.gummyOil)),
    ],
    verdict: 'avoid',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts D3/K2 Gummies = Avoid. Driver is sunflower oil in the gummy (High). ${GUMMY_OIL_TAP}`,
    cite: CITE.d3k2,
    alts: [...ALTS.d3],
  }),

  // ── Caution — grain/organic alcohol + water ───────────────
  ...ALCOHOL_LIQUIDS.map(alcoholRow),

  // ── Caution — other ──────────────────────────────────────
  row({
    id: ID.prenatalGummies,
    productName: 'Sprouts Prenatal Gummies',
    category: PRENATAL,
    form: 'gummy',
    productType: VITAMIN,
    actives: [{ name: 'Prenatal multivitamin (gummy)', strength: 'label serving' }],
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.prenatalGummies, METH.flavors)),
      flag(
        'Stevia leaf extract',
        'cleared',
        labelCite(CITE.prenatalGummies, METH.steviaLeaf),
      ),
      flag(
        'Coconut oil (gummy)',
        'cleared',
        labelCite(CITE.prenatalGummies, METH.coconutGummy),
      ),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Prenatal Gummies = Caution. Drivers are natural flavors (Limited) and stevia leaf extract (Caution — not Reb A / Reb M). ${STEVIA_LEAF_TAP} Coconut oil in this gummy is Cleared. ${COCONUT_GUMMY_TAP} Distinct from batch16 organic prenatal tablets (still no OI — not rewritten). ${LIMITED_STACK} No independently Clean prenatal on this shelf — cleanAlternatives omitted.`,
    cite: CITE.prenatalGummies,
  }),
  row({
    id: ID.b12raspberry,
    productName: 'Sprouts B-12 Raspberry 1000 mcg',
    category: VITAMINS,
    form: 'liquid sublingual',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-12', strength: '1000 mcg' }],
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.b12raspberry, METH.flavors)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts B-12 Raspberry 1000 mcg = Caution. Driver is natural flavors (1 Limited). Distinct formulaId from batch35 B12 Alcohol Free sublingual and B Complex Raspberry liquid. Full carrier line not invented. ${LIMITED_STACK} No independently Clean Sprouts B-12 liquid — cleanAlternatives omitted.`,
    cite: CITE.b12raspberry,
  }),
  row({
    id: ID.b6,
    productName: 'Sprouts B-6 100 mg',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-6', strength: '100mg' }],
    inactives: silicaFlags(CITE.b6),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts B-6 100 mg = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). 100 ct and 250 ct share this formulaId. No independently Clean Sprouts B-6 — cleanAlternatives omitted.',
    cite: CITE.b6,
  }),
  row({
    id: ID.glutathione,
    productName: 'Sprouts Glutathione 500 mg',
    category: IMMUNE,
    form: 'caplet',
    actives: [{ name: 'Glutathione (reduced / active)', strength: '500mg' }],
    inactives: silicaFlags(CITE.glutathione, ['Calcium stearate']),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Glutathione 500 mg = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Calcium stearate is Cleared. No independently Clean glutathione — cleanAlternatives omitted.',
    cite: CITE.glutathione,
  }),
  row({
    id: ID.melatoninTabs,
    productName: 'Sprouts Melatonin 3 mg Tablets',
    category: SLEEP,
    form: 'tablet',
    actives: [{ name: 'Melatonin', strength: '3mg' }],
    inactives: silicaFlags(CITE.melatoninTabs),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Melatonin 3 mg tablets = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Distinct formulaId from batch35 Melatonin 3 mg liquid (natural flavors).',
    cite: CITE.melatoninTabs,
    alts: [...ALTS.sleep],
  }),
  row({
    id: ID.superFiber,
    productName: 'Sprouts Super Fiber Tabs',
    category: DIGESTIVE,
    form: 'tablet',
    actives: [{ name: 'Fiber blend', strength: 'label serving' }],
    inactives: silicaFlags(CITE.superFiber),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Super Fiber Tabs = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). No independently Clean Sprouts fiber tablet — cleanAlternatives omitted.',
    cite: CITE.superFiber,
  }),
  row({
    id: ID.tartCherry,
    productName: 'Sprouts Tart Cherry With Turmeric',
    category: PAIN_FEVER,
    form: 'capsule',
    actives: [
      { name: 'Tart cherry', strength: 'label serving' },
      { name: 'Turmeric', strength: 'label serving' },
    ],
    inactives: silicaFlags(CITE.tartCherry),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Tart Cherry With Turmeric = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Distinct from Turmeric capsules (unlabeled MCT). No independently Clean tart-cherry row — cleanAlternatives omitted.',
    cite: CITE.tartCherry,
  }),
  row({
    id: ID.ryr,
    productName: 'Sprouts Red Yeast Rice',
    category: VITAMINS,
    form: 'capsule',
    actives: [{ name: 'Red yeast rice', strength: 'label serving' }],
    inactives: silicaFlags(CITE.ryr),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Red Yeast Rice = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). No independently Clean red-yeast-rice row — cleanAlternatives omitted.',
    cite: CITE.ryr,
  }),
  row({
    id: ID.vitCRose,
    productName: 'Sprouts Vitamin C + Rose Hips 1000 mg',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin C (ascorbic acid)', strength: '1000mg' },
      { name: 'Rose hips', strength: 'label serving' },
    ],
    inactives: silicaFlags(CITE.vitCRose),
    verdict: 'caution',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Vitamin C + Rose Hips 1000 mg = Caution. Driver is silica / silicon dioxide (0-pt Caution cap). Distinct formulaId from batch35 Vitamin C 1000 capsules. Pack siblings share this formulaId. No independently Clean Sprouts vitamin C — cleanAlternatives omitted.',
    cite: CITE.vitCRose,
  }),
  row({
    id: ID.b122500,
    productName: 'Sprouts Vitamin B-12 2500 mcg',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin B-12', strength: '2500 mcg' }],
    inactives: [
      flag('Natural flavors', 'limited', labelCite(CITE.b122500, METH.flavors)),
      flag('Silicon dioxide (silica)', 'cleared', labelCite(CITE.b122500, METH.sio2)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Vitamin B-12 2500 mcg = Caution. Drivers are natural flavors (Limited) and silica / silicon dioxide (0-pt Caution cap). Distinct from batch35 B-12 1000 PR and B-12 500 resin. ${LIMITED_STACK} No independently Clean Sprouts B-12 tablet — cleanAlternatives omitted.`,
    cite: CITE.b122500,
  }),
  row({
    id: ID.lionsManeCap,
    productName: "Sprouts Lion's Mane Veggie Capsules",
    category: IMMUNE,
    form: 'veggie capsule',
    actives: [{ name: "Lion's mane mushroom", strength: 'label serving' }],
    inactives: [
      flag(
        'Organic brown rice extract',
        'limited',
        labelCite(CITE.lionsManeCap, METH.riceExtract),
      ),
      flag('Organic pullulan capsule', 'cleared', labelCite(CITE.lionsManeCap, METH.pullulan)),
      flag(
        'Myceliated brown rice',
        'cleared',
        labelCite(CITE.lionsManeCap, METH.brownRice),
      ),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Lion's Mane veggie cap = Caution. Driver is organic brown rice extract (Limited / Caution opacity — not the Cleared bran/hull family). ${BROWN_RICE_EXTRACT_TAP} Organic pullulan and myceliated brown rice are Cleared. Separate formulaId from Lion's Mane liquid. ${LIMITED_STACK}`,
    cite: CITE.lionsManeCap,
    alts: [...ALTS.immune],
  }),
  row({
    id: ID.turmericCap,
    productName: 'Sprouts Turmeric Capsules',
    category: PAIN_FEVER,
    form: 'capsule',
    actives: [{ name: 'Turmeric', strength: 'label serving' }],
    inactives: [
      flag(
        'Medium chain triglycerides (source not named)',
        'limited',
        labelCite(CITE.turmericCap, METH.mctUnlabeled),
      ),
      flag('Chlorophyll', 'cleared', labelCite(CITE.turmericCap, METH.chlorophyll)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Turmeric capsules = Caution. Driver is unlabeled MCT (Limited opacity — coconut source not named). ${MCT_UNLABELED_TAP} Chlorophyll (not chlorophyllin) is Cleared. Distinct from batch35 Omega-3 + Turmeric (TiO2 Avoid) and from Tart Cherry With Turmeric (silica). ${LIMITED_STACK} No independently Clean Sprouts turmeric capsule — cleanAlternatives omitted.`,
    cite: CITE.turmericCap,
  }),
  row({
    id: ID.womensOrganic,
    productName: "Sprouts Organic Once Daily Women's Multivitamin",
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: "Organic women's once daily multivitamin", strength: '1 tablet (label serving)' }],
    inactives: [
      flag(
        'Organic tapioca maltodextrin',
        'limited',
        labelCite(CITE.womensOrganic, METH.maltodextrin),
      ),
      flag('Wax', 'cleared', labelCite(CITE.womensOrganic, METH.wax)),
      flag('Sunflower lecithin', 'cleared', labelCite(CITE.womensOrganic, METH.lecithin)),
      labelCleared(CITE.womensOrganic, 'Glycerin'),
      flag('Guar gum', 'cleared', labelCite(CITE.womensOrganic, METH.gums)),
    ],
    verdict: 'caution',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Organic Once Daily Women's Multivitamin = Caution. Driver is organic tapioca maltodextrin (1 Limited — same as non-organic). Wax, sunflower lecithin, glycerin, and guar are Cleared. Men's Organic Once Daily is REFUSED — front-only PDP 34853416; OI line not confirmable as a match. Distinct from batch16 organic prenatals (empty OI, not rewritten) and from Women's Hair Skin Nails (batch35 Clean). ${LIMITED_STACK} No independently Clean Sprouts multi — cleanAlternatives omitted.`,
    cite: CITE.womensOrganic,
  }),

  // ── Clean — MVC / modified vegetable cellulose ────────────
  mvcRow({
    id: ID.colonClean,
    productName: 'Sprouts Colon Clean Powder Cap',
    category: DIGESTIVE,
    active: 'Colon clean herbal powder blend',
    cite: CITE.colonClean,
  }),
  mvcRow({
    id: ID.cranberry,
    productName: 'Sprouts Cranberry',
    category: DIGESTIVE,
    form: 'vegetarian capsule',
    active: 'Cranberry powder',
    cite: CITE.cranberry,
    extraNote: 'Distinct formulaId from Cranberry + D-Mannose caps and from batch35 D-Mannose + Cranberry powder.',
  }),
  mvcRow({
    id: ID.cranberryDmannose,
    productName: 'Sprouts Cranberry + D-Mannose',
    category: DIGESTIVE,
    form: 'capsule',
    active: 'Cranberry and D-mannose',
    cite: CITE.cranberryDmannose,
    extraNote: '60 ct and 120 ct share this formulaId. Distinct from batch35 flavored D-Mannose + Cranberry powder (maltodextrin Caution).',
  }),
  mvcRow({
    id: ID.fenugreek,
    productName: 'Sprouts Fenugreek Powder Cap',
    category: VITAMINS,
    form: 'vegetarian capsule',
    active: 'Fenugreek powder',
    cite: CITE.fenugreek,
  }),
  mvcRow({
    id: ID.megaMag,
    productName: 'Sprouts Mega Magnesium',
    category: VITAMINS,
    form: 'capsule',
    active: 'Magnesium',
    cite: CITE.megaMag,
  }),
  mvcRow({
    id: ID.maca,
    productName: 'Sprouts Maca Powder Cap',
    category: VITAMINS,
    active: 'Maca powder',
    cite: CITE.maca,
    extraNote: 'Separate formulaId from unread maca liquid (not written).',
  }),
  mvcRow({
    id: ID.thyroid,
    productName: 'Sprouts Thyroid Powder Cap',
    category: VITAMINS,
    active: 'Thyroid herbal powder blend',
    cite: CITE.thyroid,
  }),
  mvcRow({
    id: ID.triphala,
    productName: 'Sprouts Triphala Powder Cap',
    category: DIGESTIVE,
    active: 'Triphala powder',
    cite: CITE.triphala,
  }),
  mvcRow({
    id: ID.oreganoSupreme,
    productName: 'Sprouts Oregano Supreme',
    category: IMMUNE,
    form: 'capsule',
    active: 'Oregano herbal blend',
    cite: CITE.oreganoSupreme,
    extraNote: 'Distinct from batch35 Oregano Oil Liquid Cap.',
  }),
  mvcRow({
    id: ID.garlicCap,
    productName: 'Sprouts Garlic Capsules',
    category: IMMUNE,
    form: 'capsule',
    active: 'Garlic',
    cite: CITE.garlicCap,
    extraNote: 'Separate formulaId from Garlic Softgels (soy fill).',
  }),
  mvcRow({
    id: ID.hawthornCap,
    productName: 'Sprouts Hawthorn Cap',
    category: VITAMINS,
    form: 'capsule',
    active: 'Hawthorn powder',
    cite: CITE.hawthornCap,
    extraNote: 'Separate formulaId from Hawthorn liquid (alcohol vehicle Caution).',
  }),
  mvcRow({
    id: ID.holyBasilCap,
    productName: 'Sprouts Holy Basil Cap',
    category: SLEEP,
    form: 'capsule',
    active: 'Holy basil powder',
    cite: CITE.holyBasilCap,
    extraNote: 'Separate formulaId from Holy Basil liquid (alcohol vehicle Caution).',
  }),
  mvcRow({
    id: ID.mulleinCap,
    productName: 'Sprouts Mullein Cap',
    category: IMMUNE,
    form: 'capsule',
    active: 'Mullein powder',
    cite: CITE.mulleinCap,
    extraNote: 'Separate formulaId from Mullein liquid (alcohol vehicle Caution).',
  }),
  mvcRow({
    id: ID.nettleCap,
    productName: 'Sprouts Nettle Cap',
    category: IMMUNE,
    form: 'capsule',
    active: 'Nettle powder',
    cite: CITE.nettleCap,
    extraNote: 'Separate formulaId from Nettle liquid (alcohol vehicle Caution).',
  }),
  mvcRow({
    id: ID.rhodiolaCap,
    productName: 'Sprouts Rhodiola Powder Cap',
    category: SLEEP,
    active: 'Rhodiola powder',
    cite: CITE.rhodiolaCap,
    extraNote: 'Separate formulaId from Rhodiola liquid (alcohol vehicle Caution).',
  }),
  mvcRow({
    id: ID.sawPalmettoCap,
    productName: 'Sprouts Saw Palmetto Powder Cap',
    category: VITAMINS,
    active: 'Saw palmetto powder',
    cite: CITE.sawPalmettoCap,
    extraNote: 'Separate formulaId from Saw Palmetto liquid and from 160 mg softgels.',
  }),
  mvcRow({
    id: ID.liverDetox,
    productName: 'Sprouts Liver Detox with Milk Thistle',
    category: DIGESTIVE,
    form: 'powder capsule',
    active: 'Liver detox herbal blend with milk thistle',
    cite: CITE.liverDetox,
    extraNote: 'Powder-cap MVC row only. Do not merge the liquid-veg-cap sibling.',
  }),

  row({
    id: ID.garlicSoftgel,
    productName: 'Sprouts Garlic Softgels',
    category: IMMUNE,
    form: 'softgel',
    actives: [{ name: 'Garlic', strength: 'label serving' }],
    inactives: [
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.garlicSoftgel, METH.capsuleOil)),
      labelCleared(CITE.garlicSoftgel, 'Gelatin'),
      labelCleared(CITE.garlicSoftgel, 'Glycerin'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Garlic Softgels = Clean. Soybean oil is a softgel fill, not gummy seed-oil High. ${CAPSULE_OIL_TAP} Separate formulaId from Garlic Capsules (MVC Clean).`,
    cite: CITE.garlicSoftgel,
  }),
  row({
    id: ID.sawPalmettoSoftgel,
    productName: 'Sprouts Saw Palmetto 160 mg Softgels',
    category: VITAMINS,
    form: 'softgel',
    actives: [{ name: 'Saw palmetto', strength: '160mg' }],
    inactives: [
      flag(
        'Olive oil (softgel fill)',
        'cleared',
        labelCite(CITE.sawPalmettoSoftgel, METH.capsuleOil),
      ),
      labelCleared(CITE.sawPalmettoSoftgel, 'Gelatin'),
      labelCleared(CITE.sawPalmettoSoftgel, 'Glycerin'),
      labelCleared(CITE.sawPalmettoSoftgel, 'Carob'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Saw Palmetto 160 mg softgels = Clean. Olive oil is a softgel fill, not gummy High. ${CAPSULE_OIL_TAP} Gelatin / glycerin / carob are Cleared. Saw Palmetto softgel pack-name twins share this formulaId when the other-ingredients list holds. Separate formulaId from Saw Palmetto powder cap and from Saw Palmetto liquid.`,
    cite: CITE.sawPalmettoSoftgel,
  }),

  glycerinWaterRow({
    id: ID.dandelionAf,
    productName: 'Sprouts Fresh Dandelion Alcohol Free',
    category: DIGESTIVE,
    active: 'Fresh dandelion extract',
    cite: CITE.dandelionAf,
  }),
  glycerinWaterRow({
    id: ID.iodineKelp,
    productName: 'Sprouts Iodine With Kelp',
    category: VITAMINS,
    active: 'Iodine with kelp',
    cite: CITE.iodineKelp,
  }),
  glycerinWaterRow({
    id: ID.kavaLiq,
    productName: 'Sprouts Kava Liquid',
    category: SLEEP,
    active: 'Kava extract',
    cite: CITE.kavaLiq,
    extraNote: 'Retail AF SKU 17858661. Unread alcohol Kava is not written.',
  }),
  glycerinWaterRow({
    id: ID.lionsManeLiq,
    productName: "Sprouts Lion's Mane Liquid",
    category: IMMUNE,
    active: "Lion's mane extract",
    cite: CITE.lionsManeLiq,
    extraNote: "Separate formulaId from Lion's Mane veggie cap (brown rice extract Caution).",
  }),
  glycerinWaterRow({
    id: ID.valerianAf,
    productName: 'Sprouts Valerian Alcohol Free',
    category: SLEEP,
    active: 'Valerian extract',
    cite: CITE.valerianAf,
    extraNote: 'Distinct from batch35 Valerian liquid (grain alcohol Caution).',
  }),

  row({
    id: ID.kavaCap,
    productName: 'Sprouts Kava Powder Cap',
    category: SLEEP,
    form: 'powder capsule',
    actives: [{ name: 'Kava powder', strength: '1 capsule (label serving)' }],
    inactives: [
      labelCleared(CITE.kavaCap, 'Modified vegetable cellulose'),
      labelCleared(CITE.kavaCap, 'Flax seed powder'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Kava powder cap = Clean. Other Ingredients are modified vegetable cellulose and flax seed powder (Cleared food powder). Separate formulaId from Kava liquid (glycerin + water).',
    cite: CITE.kavaCap,
  }),
  row({
    id: ID.reishiCap,
    productName: 'Sprouts Reishi Cap',
    category: IMMUNE,
    form: 'capsule',
    actives: [{ name: 'Reishi mushroom', strength: '1 capsule (label serving)' }],
    inactives: [
      labelCleared(CITE.reishiCap, 'Capsule (vegetable cellulose)'),
      flag(
        'Myceliated brown rice',
        'cleared',
        labelCite(CITE.reishiCap, METH.brownRice),
      ),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Reishi cap = Clean. Capsule plus myceliated brown rice (ferment / food-state Cleared — not SiO2; not brown-rice-extract opacity). Separate formulaId from Reishi liquid (alcohol vehicle Caution).',
    cite: CITE.reishiCap,
  }),
  row({
    id: ID.turkeyTail,
    productName: 'Sprouts Turkey Tail',
    category: IMMUNE,
    form: 'veggie capsule',
    actives: [{ name: 'Turkey tail mushroom', strength: '1 capsule (label serving)' }],
    inactives: [
      labelCleared(CITE.turkeyTail, 'Capsule (vegetable cellulose)'),
      flag(
        'Myceliated brown rice',
        'cleared',
        labelCite(CITE.turkeyTail, METH.brownRice),
      ),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Turkey Tail = Clean. Capsule plus myceliated brown rice (ferment / food-state Cleared).',
    cite: CITE.turkeyTail,
  }),
  mvcRow({
    id: ID.moringaCap,
    productName: 'Sprouts Moringa Powder Cap',
    category: VITAMINS,
    active: 'Moringa powder',
    cite: CITE.moringaCap,
    extraNote: 'Separate formulaId from Moringa liquid and from Moringa 100% powder.',
  }),
  row({
    id: ID.moringaPowder,
    productName: 'Sprouts Moringa 100% Powder',
    category: VITAMINS,
    form: 'powder',
    actives: [{ name: 'Moringa powder', strength: 'label serving' }],
    inactives: [labelCleared(CITE.moringaPowder, 'None beyond named 100% moringa powder')],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Moringa 100% powder = Clean. No other-ingredients line beyond the named powder. Separate formulaId from Moringa powder cap and Moringa liquid. Not a food/protein tub.',
    cite: CITE.moringaPowder,
  }),
  row({
    id: ID.irishMoss,
    productName: 'Sprouts Organic Irish Moss 100% Powder',
    category: VITAMINS,
    form: 'powder',
    actives: [{ name: 'Organic Irish moss powder', strength: 'label serving' }],
    inactives: [labelCleared(CITE.irishMoss, 'None beyond named 100% organic Irish moss powder')],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Organic Irish Moss 100% powder = Clean. Supplement-aisle 100% powder — not a food/shot bottle. No other-ingredients line beyond the named powder.',
    cite: CITE.irishMoss,
  }),
  row({
    id: ID.mushroomBlend,
    productName: 'Sprouts Organic Mushroom Blend 100% Powder',
    category: IMMUNE,
    form: 'powder',
    actives: [{ name: 'Organic mushroom blend powder', strength: 'label serving' }],
    inactives: [labelCleared(CITE.mushroomBlend, 'None beyond named 100% organic mushroom blend powder')],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Organic Mushroom Blend 100% powder = Clean. Supplement-aisle 100% powder. No other-ingredients line beyond the named powder.',
    cite: CITE.mushroomBlend,
  }),
  row({
    id: ID.folic,
    productName: 'Sprouts Folic Acid 800 mcg',
    category: VITAMINS,
    form: 'tablet',
    productType: VITAMIN,
    actives: [{ name: 'Folic acid', strength: '800 mcg' }],
    inactives: [
      labelCleared(CITE.folic, 'Lactose'),
      labelCleared(CITE.folic, 'Cellulose'),
      labelCleared(CITE.folic, 'Vegetable calcium stearate'),
    ],
    verdict: 'clean',
    note:
      'FOUNDER-LOCKED DRAFT: Sprouts Folic Acid 800 mcg = Clean. Other Ingredients are lactose, cellulose, and vegetable calcium stearate (Cleared). Contains lactose.',
    cite: CITE.folic,
  }),
  row({
    id: ID.vitE1000,
    productName: 'Sprouts Vitamin E 1000 IU',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [{ name: 'Vitamin E (mixed tocopherols)', strength: '1000 IU' }],
    inactives: [
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.vitE1000, METH.capsuleOil)),
      labelCleared(CITE.vitE1000, 'Gelatin'),
      labelCleared(CITE.vitE1000, 'Glycerin'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Vitamin E 1000 IU = Clean. Soybean oil is a softgel fill, not gummy High. ${CAPSULE_OIL_TAP} Distinct formulaId from batch35 Vitamin E 400 IU Mixed Tocopherol.`,
    cite: CITE.vitE1000,
  }),
  row({
    id: ID.vitESelenium,
    productName: 'Sprouts Vitamin E With Selenium',
    category: VITAMINS,
    form: 'softgel',
    productType: VITAMIN,
    actives: [
      { name: 'Vitamin E', strength: 'label serving' },
      { name: 'Selenium', strength: 'label serving' },
    ],
    inactives: [
      flag('Soybean oil (softgel fill)', 'cleared', labelCite(CITE.vitESelenium, METH.capsuleOil)),
      labelCleared(CITE.vitESelenium, 'Beeswax'),
    ],
    verdict: 'clean',
    note:
      `FOUNDER-LOCKED DRAFT: Sprouts Vitamin E With Selenium = Clean. Soy oil is a softgel fill, not gummy High. ${CAPSULE_OIL_TAP} Beeswax is Cleared. Distinct formulaId from Vitamin E 1000 IU and from batch35 Vitamin E 400 IU.`,
    cite: CITE.vitESelenium,
  }),
];

for (const record of BATCH36_SPROUTS_LEFTOVERS) {
  const expected = BATCH36_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 36 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 36 must not invent barcodes on ${record.id}`);
  }
}
