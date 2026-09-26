// DRAFT / not verified / batch 113 KYR6-b GoodSense token backfill 3.
// Methodology v1.6 + MAIN §5 through the Sept 26, 2026 #349 founder stamp.
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// No new token strings. Founder owns final Avoid vs Caution vs Clean.
// Family lock beats spelling. Exact-string refuse is only for tokens
// with no family on main.
//
// Scope is ONLY the 12 SKUs still REFUSED in PR #349 (batch112).
// A row is written only when every inactive on that opened DailyMed
// panel maps to a lock already on main, including the #349 family stamp.
// Calcium polycarbophil, docusate sodium, salicylic acid, and sodium
// polystyrene sulfonate: Active header drops the refuse. Inactive header
// maps to Caution.
// Exact pack is the SPL quantity already pinned for that setid.
// recordStatus is 'unverified'.
// Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch112. No house Amazon. No HealthA2Z.
// No A+Health. No TIME-Cap. No toothpaste. No Sprouts. No factory.
// Oil form split stays as it is on main. Dual-panel day/night stays no-row.
// Formaldehyde-releasers stay Avoid. Gummy vegetable oil and gummy
// coconut oil stay Avoid.
// UPC only where a DailyMed carton or label barcode decoded for that exact pack.
//
// TALLY (unverified drafts in THIS file): 16 rows —
// Clean 0 / Caution 0 / Avoid 16.
// NEW 11 / REUSE-formula 5 /
// SKIPPED 0 (no_OI 0 / OUT 0 / already-on-MAIN 0) /
// REFUSED 0.
// 12 of the 12 setids lock fully.
// Search grade: Clean 0 / Caution 0 / Avoid 16.
// UPC count: 3.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const UNVERIFIED_NOTE = 'draft, not verified';

const BRAND = 'GoodSense';
const AMAZON = ['Amazon', 'GoodSense'] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const METH = {
  cleared: 'Methodology §5 Cleared. The printed inactive is a locked Cleared excipient (housekeeping filler, coat, gum, salt, or named simple starch).',
  dye: 'Methodology §5 High (FD&C / D&C synthetic dye, including lakes, FD-C, D-C, and no. spellings). The printed spelling is the flag name.',
  tio2: 'Methodology §5 High (titanium dioxide). Split junk "and titanium dioxide" is this token.',
  talc: 'Methodology §5 High (talc in an oral / swallow product).',
  aspartame: 'Methodology §5 High (aspartame).',
  paraben: 'Methodology §5 High (parabens, including methyl, propyl, and butyl).',
  bht: 'Methodology §5 High (BHT / BHA / propyl gallate).',
  formaldehyde: 'Methodology §5 High (formaldehyde-releaser as an Other Ingredient). Avoid.',
  caramel: 'Methodology §5 High (undisclosed caramel color / plain caramel powder).',
  seedOil: 'Methodology §5 High (seed oil or coconut oil on a chew, lozenge, or gummy). Not the Cleared softgel-fill row.',
  peg: 'Methodology §5 Moderate (polyethylene glycol / PEGs, including polyethylene glycol 3350 and 400, and macrogol). Not the Avoid driver.',
  pg: 'Methodology §5 Moderate (propylene glycol, oral).',
  sucralose: 'Methodology §5 Moderate (sucralose). Split junk "sucralose and water" uses this row plus purified water.',
  acek: 'Methodology §5 Moderate (acesulfame potassium).',
  ps80: 'Methodology §5 Moderate (polysorbate 80). Not the Avoid driver.',
  saccharin: 'Methodology §5 Moderate (saccharin). Distinct from Caution saccharin sodium.',
  sio2: 'Methodology §5 Limited (silicon dioxide / silica / colloidal silicon dioxide / colloidal anhydrous silica / colloidal silicone dioxide). Spacing "colloidal silicondioxide" sits on this same SiO2 cap. Not a new grade.',
  carnauba: 'Methodology §5 Caution (carnauba wax — Sept 25, 2026). Not the old Cleared wax row. Not Avoid.',
  iron: 'Methodology §5 Caution (iron oxide as color). Not Avoid.',
  benzoate: 'Methodology §5 Limited (sodium benzoate — synthetic preservative). Not Avoid.',
  maltodextrin: 'Methodology §5 Limited (maltodextrin).',
  sls: 'Methodology §5 Caution (sodium lauryl sulfate). Not Avoid.',
  sugarAlcohol: 'Methodology §5 Limited (oral sorbitol, mannitol, xylitol, or maltitol powder). Sorbitol solution and noncrystallizing sorbitol solution map here (Sept 26, 2026). Not sorbitol sorbitan solution. Not sorbitol special.',
  sucrose: 'Methodology §5 Limited (sucrose). Distinct from Caution bare sugar. Split junk "sucrose and water" uses this row plus purified water.',
  natFlavor: 'Methodology §5 Limited (natural flavors / natural and artificial flavors / artificial flavors). Not the Caution named-flavor row.',
  flavor: 'Methodology §5 Caution (flavor family). Split junk "natural and artificial" maps here. Inactive-header menthol, menthol-dl, and non-gel eucalyptus oil map here (Sept 26, 2026). Lime oil, benzaldehyde, masking agent, and prosweet map here (Sept 26, 2026 #348). Ethyl acetate and ethyl butyrate map here (Sept 26, 2026 #349). Not a menthol-inactive class. Not Avoid.',
  ink: 'Methodology §5 Caution (pharmaceutical ink). Split junk "may contain pharmaceutical ink" is this token. Not Avoid.',
  koh: 'Methodology §5 Caution (potassium hydroxide — Sept 25, 2026). Not Avoid.',
  ammonium: 'Methodology §5 Caution (ammonium hydroxide). Not Avoid.',
  sss: 'Methodology §5 Caution (sorbitol sorbitan solution or sorbitan monooleate). Not Avoid.',
  mineralOil: 'Methodology §5 Caution (mineral oil / light liquid paraffin on an oral product). Not Avoid.',
  mct: 'Methodology §5 Limited (unlabeled medium chain triglycerides).',
  simethicone: 'Methodology §5 Caution (simethicone as an Other Ingredient). Not Avoid.',
  benzyl: 'Methodology §5 Caution (benzyl alcohol on a general oral OTC). Not the infant Avoid split.',
  saccharinNa: 'Methodology §5 Caution (saccharin sodium / sodium saccharin). Not Avoid.',
  sugarSpheres: 'Methodology §5 Caution (sugar spheres — bare sugar).',
  pvap: 'Methodology §5 Caution (polyvinyl acetate phthalate). Bare polyvinyl acetate does not map here (Sept 26, 2026). Not Avoid.',
  glycyrrhizin: 'Methodology §5 Caution (ammonium glycyrrhizin). Ammonium glycerrhizin is this label misspelling (Sept 26, 2026 #349). Not Cleared licorice. Not Avoid.',
  carmine: 'Methodology §5 Caution (carmine / cochineal). Not Avoid.',
  sulfite: 'Methodology §5 Caution (sulfites). Not Avoid.',
  benzoic: 'Methodology §5 Caution (benzoic acid). Not Avoid.',
  maltitolSol: 'Methodology §5 Caution (maltitol solution or isomalt). Maltitol syrup maps here (Sept 26, 2026). Distinct from Limited maltitol powder.',
  dextrates: 'Methodology §5 Caution (bare dextrates).',
  shellacWax: 'Methodology §5 Caution (shellac wax). Distinct from Cleared shellac.',
  methacrylic: 'Methodology §5 Caution (methacrylic enteric polymer). Hypromellose acetate succinate, hypromellose phthalate, and amino methacrylate copolymer map here (Sept 26, 2026 #348). Not Cleared HPC/HPMC. Not Avoid.',
  alcohol: 'Methodology §5 Limited (alcohol as a vehicle). Not Avoid.',
  bkc: 'Methodology §5 Caution (benzalkonium chloride). Not Avoid.',
  pyruvate: 'Methodology §5 Caution (sodium pyruvate). Not Avoid.',
  milk: 'Methodology §5 Limited (nonfat dry milk). Not Avoid.',
  mica: 'Methodology §5 Caution (mica-based pearlescent pigment). Bare mica maps here (Sept 26, 2026 #348). Same token. Not a new grade. Not Avoid.',
  carrageenan: 'Methodology §5 Limited (carrageenan). Not Avoid.',
  modStarch: 'Methodology §5 Limited (modified food starch / modified starch).',
  limited: 'Methodology §5 Limited. The printed inactive sits on a locked Limited row. Not Avoid.',
  fattyAlc: 'Methodology §5 Cleared (stearyl / cetearyl alcohol; cetyl alcohol and cetostearyl alcohol sit on this same fatty-alcohol cream base, Sept 24). Not a new grade.',
  edtaTrace: 'Methodology §5 Cleared (disodium EDTA, trace preservative/stabilizer). Distinct from Caution edetate disodium dihydrate and from Caution tetrasodium EDTA. Bare edetate disodium is not this row.',
  c3045: 'Methodology §5 Caution (C30-45 alkyl cetearyl dimethicone crosspolymer — Sept 24). Distinct from C30-45 alkyl dimethicone. Not Avoid.',
  bicarb: 'Methodology §5 Cleared (Mg / K / ammonium / Na carbonate or bicarbonate → bicarb / mineral-filler; NOW token lock). Sodium carbonate anhydrous is this Na carbonate lock. Not a new grade.',
  betaCar: 'Methodology §5 Caution (beta-carotene as color). Bare beta-carotene maps here (Sept 25). Not a new grade. Not Avoid.',
  tocAc: 'Methodology §5 Caution (tocopheryl acetate — Sept 15). Distinct from Cleared DL-alpha tocopheryl acetate and from Cleared mixed tocopherols. Not Avoid.',
  dimeth: 'Methodology §5 Cleared (dimethicone / dimethicone copolyol — Sept 14).',
  cocoaButter: 'Methodology §5 Cleared (cocoa butter / cocoa seed butter as the cream vehicle — Sept 15). Not cocoa powder. Not gummy High.',
  petrolatum: 'Methodology §5 Cleared (petrolatum topical / white petrolatum). Distinct from special petrolatum. Not a new grade.',
  namedOil: 'Methodology §5 Cleared (named single oil as ointment base or fill — Sept 15 form rule). Tap: fill is not gummy High.',
  ceteareth: 'Methodology §5 Caution (ceteareth-20 — Sept 15). Not Avoid.',
  ceteth: 'Methodology §5 Caution (ceteth-20 phosphate — Sept 15). Not Avoid.',
  capMeth: 'Methodology §5 Caution (caprylyl methicone — Sept 15). Not Avoid.',
  ehg: 'Methodology §5 Caution (ethylhexylglycerin — Sept 15). Not Avoid.',
  steareth: 'Methodology §5 Caution (steareth-2 / steareth-21 — Sept 15). Not Avoid.',
  amp: 'Methodology §5 Caution (aminomethyl propanol — Sept 15). Not Avoid.',
  ammoniaStrong: 'Methodology §5 Caution (strong ammonia solution — Sept 15). Distinct from ammonium hydroxide. Not Avoid.',
  dicetyl: 'Methodology §5 Caution (dicetyl phosphate — Sept 15). Not Avoid.',
  ipm: 'Methodology §5 Cleared (isopropyl myristate — topical emollient, Sept 15).',
  cetylPalm: 'Methodology §5 Cleared (cetyl palmitate — Sept 14).',
  cocoyl: 'Methodology §5 Cleared (cocoyl caprylocaprate — Sept 15). Distinct from coco-caprylate/caprate.',
  sorbate: 'Methodology §5 Limited (potassium sorbate — synthetic preservative, with sodium benzoate). Not Avoid.',
  sorbic: 'Methodology §5 Limited (sorbic acid — caprylyl glycol / hexanediol / sorbic acid). Not Avoid.',
  spearmint: 'Methodology §5 Caution (spearmint oil — fragrance/EO, Sept 15). Not Avoid.',
  aloe: 'Methodology §5 Caution (aloe as OI). Aloe barbadensis leaf extract maps here (Sept 23). Aloe barbadensis leaf juice maps here (Sept 26, 2026 #348). Juice vs extract is the same family. Not Avoid.',
  acrylate: 'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — Sept 15). Not Avoid.',
  fragrance: 'Methodology §5 Caution (fragrance / parfum, topical OTC). Not Avoid.',
  honey: 'Methodology §5 Cleared (honey, oral sweetener — Sept 14). Tap: not for under 1. Not Avoid.',
  eucalyptus: 'Methodology §5 Caution (eucalyptus oil as a gel inactive — Sept 15). Non-gel inactive eucalyptus oil maps to flavor, not this row. Not Avoid.',
  citric: 'Methodology §5 Cleared (anhydrous citric acid → citric acid; hydration, same as sodium citrate dihydrate — Sept 26, 2026). Not a new grade.',
  phosphate: 'Methodology §5 Cleared (phosphate-salt class: tribasic sodium phosphate, monobasic sodium phosphate, sodium phosphate monobasic dihydrate, and anhydrous dibasic calcium phosphate → calcium phosphate — Sept 26, 2026). Not phosphoric acid. Not a new grade.',
  edtaHydrate: 'Methodology §5 Caution (edetate disodium with edetate disodium dihydrate — Sept 26, 2026). Not Cleared disodium EDTA trace. Not Avoid.',
  hpc: 'Methodology §5 Cleared (hydroxypropyl cellulose / HPC, HPMC family). Low substituted and low-substituted hydroxypropyl cellulose map here (Sept 26, 2026). Hyphen is spelling. Not a new grade.',
  cornSyrup: 'Methodology §5 Caution (corn syrup and corn syrup solids — Sept 26, 2026). Sorn syrup solids is the label typo for corn syrup solids. Not Cleared glucose syrup. Not gummy-oil Avoid.',
  hfcs: 'Methodology §5 Caution (high fructose corn syrup — Sept 26, 2026). Neighbor is sugar / glucose Caution. Not gummy-oil Avoid. Not Limited fructose.',
  gumBase: 'Methodology §5 Caution (gum base — unnamed elastomer/resin/wax blend, Sept 26, 2026). Distinct from Cleared named gums. Not Avoid.',
  bareSugar: 'Methodology §5 Caution (bare sugar). Confectioner\'s sugar maps here (Sept 26, 2026). Distinct from Limited sucrose. Not Avoid.',
  sorbitanEsters: 'Methodology §5 Caution (sorbitan esters — Sept 26, 2026). Bare sorbitan maps here. Not sorbitol. Not sorbitol sorbitan solution. Not Avoid.',
  glucose: 'Methodology §5 Caution (bare glucose). Dextrose and dextrose excipient map here (Sept 26, 2026 #348). Not Cleared glucose syrup. Not Caution organic cultured dextrose. Not gummy-oil Avoid.',
  poloxamer: 'Methodology §5 Caution (poloxamer family, with poloxamer 182). Poloxamer 407 maps here (Sept 26, 2026 #348). Not High. Not a new grade.',
  stearate: 'Methodology §5 Cleared (stearate family: magnesium stearate, stearic acid, calcium stearate, calcium laurate). Sodium stearate maps here (Sept 26, 2026 #348). Not a new grade.',
  gms: 'Methodology §5 Cleared (glyceryl monostearate / GMS). Glycerin stearate maps here (Sept 26, 2026 #348). Distinct from Caution unspecified mono- and diglycerides. Not a new grade.',
  poe: 'Methodology §5 Caution (POE cetyl ether / polyoxyethylene (23) cetyl ether). Polyoxyl 20 cetostearyl ether maps here (Sept 26, 2026 #348). Not High.',
  pva: 'Methodology §5 Caution (polyvinyl acetate — Sept 26, 2026 #348). Distinct from PVAP and from Cleared polyvinyl alcohol. Not Avoid.',
  phosphoric: 'Methodology §5 Caution (phosphoric acid — Sept 26, 2026 #348). Not the phosphate-salt Cleared class. Not Avoid.',
  meglumine: 'Methodology §5 Caution (meglumine — Sept 26, 2026 #348). Not High.',
  mea: 'Methodology §5 Caution (monoethanolamine — Sept 26, 2026 #348). Distinct from aminomethyl propanol and from strong ammonia solution. Not High.',
  polyacrylic: 'Methodology §5 Caution (polyacrylic acid / sodium polyacrylate). Polyacrylate dispersion maps here (Sept 26, 2026 #349). Not sodium polyacrylate starch. Not Avoid.',
  dibehenate: 'Methodology §5 Cleared (glyceryl dibehenate). Glyceryl behenate maps here (Sept 26, 2026 #349). Distinct from Caution behenoyl polyoxyl-8 glycerides. Not a new grade.',
  glycine: 'Methodology §5 Cleared (glycine — Sept 26, 2026 #349). Amino-acid filler. Neighborhood with lysine. Not the same token as lysine.',
  acetic: 'Methodology §5 Cleared (acetic acid — Sept 26, 2026 #349). Acidulant with citric acid. Distinct from phosphoric acid Caution.',
  neopentanoate: 'Methodology §5 Caution (isostearyl neopentanoate — Sept 26, 2026 #349). Not High.',
  hvoOi: 'Methodology §5 Caution (hydrogenated vegetable oil as an Other Ingredient). Hydrogenated coconut oil maps here when the SPL dosage form is not a gummy (Sept 26, 2026 #349). Not seed-oil High. Not Avoid.',
  coconutGummy: 'Methodology §5 Avoid (coconut oil in a gummy). Hydrogenated coconut oil maps here when the SPL dosage form is a gummy (Sept 26, 2026 #349). Not the fractionated-coconut exception. Not seed-oil High.',
  headerCheck: 'Methodology §5 Caution when the DailyMed header says Inactive (Sept 26, 2026 #348): calcium polycarbophil, docusate sodium, salicylic acid, sodium polystyrene sulfonate. An Active header drops the refuse and is not this flag. Not a new severity. Not Avoid.',
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

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

function row(
  opts: Omit<RatingRecord, 'recordStatus'> & {
    recordStatus?: RatingRecord['recordStatus'];
  },
): RatingRecord {
  return { ...opts, recordStatus: opts.recordStatus ?? UNVERIFIED };
}

type Compact = {
  id: string;
  productName: string;
  category: string;
  formulaId: string;
  audience: typeof ADULT;
  minAge: number;
  form: string;
  productType: typeof OTC;
  actives: RatingRecord['activeIngredients'];
  flags: [string, IngredientFlag['riskLevel'], keyof typeof METH][];
  verdict: RatingRecord['verdict'];
  note: string;
  cite: string;
  barcode?: string;
  upcNote?: string;
};

function expand(d: Compact): RatingRecord {
  const alts: CleanAlternative[] = [];
  if (d.verdict !== 'clean') {
    const main = {
      Allergies: [
        'claritin-allergy-tablets-plain',
        'Independently Clean Claritin plain loratadine already on main. Form labeled, not a hard filter (§6).',
      ],
      Sleep: [
        'pure-encapsulations-melatonin-sr-3mg',
        'Independently Clean Pure Encapsulations Melatonin-SR 3 mg already on main. Form labeled, not a hard filter (§6).',
      ],
      Digestive: [
        'megafood-magnesium-300-capsules',
        'Independently Clean MegaFood Magnesium 300 already on main. Form labeled, not a hard filter (§6).',
      ],
      'Cold & Flu': [
        'coldcalm-meltaways',
        'Independently Clean Boiron ColdCalm already on main. Form labeled, not a hard filter (§6).',
      ],
      'Pain & Fever': [
        'thorne-glucosamine-chondroitin',
        'Independently Clean Thorne Glucosamine & Chondroitin already on main. Form labeled, not a hard filter (§6).',
      ],
    } as const;
    const pair = main[d.category as keyof typeof main];
    if (pair) alts.push(alt(pair[0], pair[1]));
  }
  return row({
    id: d.id,
    productName: d.productName,
    brand: BRAND,
    category: d.category,
    formulaId: d.formulaId,
    audience: d.audience,
    minAge: d.minAge,
    form: d.form,
    productType: d.productType,
    activeIngredients: d.actives,
    inactiveIngredients: d.flags.map(([n, risk, meth]) =>
      flag(n, risk, labelCite(d.cite, METH[meth])),
    ),
    verdict: d.verdict,
    honestNote: `${d.note} ${LIMITED_STACK} Pack sizes share formulaId \`${d.formulaId}\` when this OI list holds. No dosing or medical advice. Draft, not verified.`,
    retailers: [...AMAZON],
    cleanAlternatives: alts.length ? alts : undefined,
    barcode: d.barcode,
    sourcesGeneral: [`${d.cite}${d.upcNote ? ` ${d.upcNote}` : ''} — ${UNVERIFIED_NOTE}`],
  });
}

const PACKS: Compact[] = [
  {
    id: 'goodsense-b113-nicotine-7ac8',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-nicotine-7ac8',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['ethyl butyrate', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['mannitol', 'limited', 'sugarAlcohol'], ['menthol', 'limited', 'flavor'], ['mica-based pearlescent pigment', 'limited', 'mica'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['natural & artificial wild berry flavor', 'limited', 'flavor'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['titanium dioxide', 'high', 'tio2'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 20 count = avoid. Drivers: titanium dioxide. DailyMed setid 0f55f79b-a5ab-4e9e-9219-a9b8f401b792. Inactive ingredients: acacia, acesulfame potassium, ethyl butyrate, hypromellose, magnesium stearate, maltodextrin, mannitol, menthol, mica-based pearlescent pigment, microcrystalline cellulose, natural & artificial wild berry flavor, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Stamp: `ethyl butyrate` → ethyl butyrate → flavor Caution (Sept 26 #349).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0f55f79b-a5ab-4e9e-9219-a9b8f401b792; setid 0f55f79b-a5ab-4e9e-9219-a9b8f401b792; NDC 0113-6305-20). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 2mg. Inactive ingredients: acacia, acesulfame potassium, ethyl butyrate, hypromellose, magnesium stearate, maltodextrin, mannitol, menthol, mica-based pearlescent pigment, microcrystalline cellulose, natural & artificial wild berry flavor, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `ethyl butyrate` → ethyl butyrate → flavor Caution (Sept 26 #349) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-cough-dm-d543',
    productName: 'GoodSense Cough DM (Dextromethorphan Hydrobromide 30mg), 89 mL',
    category: 'Cold & Flu',
    formulaId: 'goodsense-b113-cough-dm-d543',
    audience: ADULT,
    minAge: 12,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Dextromethorphan Hydrobromide', strength: '30mg' }],
    flags: [['d&c red #30 aluminum lake', 'high', 'dye'], ['d&c yellow #10 aluminum lake', 'high', 'dye'], ['glycerin', 'cleared', 'cleared'], ['high fructose corn syrup', 'limited', 'hfcs'], ['methylparaben', 'high', 'paraben'], ['natural and artificial orange flavor', 'limited', 'flavor'], ['polysorbate 80', 'moderate', 'ps80'], ['polyvinyl acetate', 'limited', 'pva'], ['povidone', 'cleared', 'cleared'], ['propylparaben', 'high', 'paraben'], ['purified water', 'cleared', 'cleared'], ['sodium metabisulfite', 'limited', 'sulfite'], ['sodium polystyrene sulfonate', 'limited', 'headerCheck'], ['sucrose', 'limited', 'sucrose'], ['tartaric acid', 'cleared', 'cleared'], ['tragacanth gum', 'cleared', 'cleared'], ['triacetin', 'cleared', 'cleared'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Cough DM (Dextromethorphan Hydrobromide 30mg), 89 mL = avoid. Drivers: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, methylparaben, propylparaben. DailyMed setid 1b11b25b-2716-45f9-830f-ddf622366e60. Inactive ingredients: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, glycerin, high fructose corn syrup, methylparaben, natural and artificial orange flavor, polysorbate 80, polyvinyl acetate, povidone, propylparaben, purified water, sodium metabisulfite, sodium polystyrene sulfonate, sucrose, tartaric acid, tragacanth gum, triacetin, xanthan gum. Stamp: `tragacanth gum` → tragacanth gum → plant-gum Cleared class with xanthan / guar / acacia / pectin (Sept 26 #349; not gum base Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1b11b25b-2716-45f9-830f-ddf622366e60; setid 1b11b25b-2716-45f9-830f-ddf622366e60; NDC 0113-0384). Same 89 mL on the Good Sense Cough DM (0113-0958) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea; setid 5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea; NDC 0113-0958). Package quantity pinned on the opened SPL: 89 mL. Active: Dextromethorphan Hydrobromide 30mg. Inactive ingredients: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, glycerin, high fructose corn syrup, methylparaben, natural and artificial orange flavor, polysorbate 80, polyvinyl acetate, povidone, propylparaben, purified water, sodium metabisulfite, sodium polystyrene sulfonate, sucrose, tartaric acid, tragacanth gum, triacetin, xanthan gum. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `tragacanth gum` → tragacanth gum → plant-gum Cleared class with xanthan / guar / acacia / pectin (Sept 26 #349; not gum base Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-cough-dm-d543-148-ml',
    productName: 'GoodSense Cough DM (Dextromethorphan Hydrobromide 30mg), 148 mL',
    category: 'Cold & Flu',
    formulaId: 'goodsense-b113-cough-dm-d543',
    audience: ADULT,
    minAge: 12,
    form: 'suspension',
    productType: OTC,
    actives: [{ name: 'Dextromethorphan Hydrobromide', strength: '30mg' }],
    flags: [['d&c red #30 aluminum lake', 'high', 'dye'], ['d&c yellow #10 aluminum lake', 'high', 'dye'], ['glycerin', 'cleared', 'cleared'], ['high fructose corn syrup', 'limited', 'hfcs'], ['methylparaben', 'high', 'paraben'], ['natural and artificial orange flavor', 'limited', 'flavor'], ['polysorbate 80', 'moderate', 'ps80'], ['polyvinyl acetate', 'limited', 'pva'], ['povidone', 'cleared', 'cleared'], ['propylparaben', 'high', 'paraben'], ['purified water', 'cleared', 'cleared'], ['sodium metabisulfite', 'limited', 'sulfite'], ['sodium polystyrene sulfonate', 'limited', 'headerCheck'], ['sucrose', 'limited', 'sucrose'], ['tartaric acid', 'cleared', 'cleared'], ['tragacanth gum', 'cleared', 'cleared'], ['triacetin', 'cleared', 'cleared'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Cough DM (Dextromethorphan Hydrobromide 30mg), 148 mL = avoid. Drivers: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, methylparaben, propylparaben. DailyMed setid 1b11b25b-2716-45f9-830f-ddf622366e60. Inactive ingredients: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, glycerin, high fructose corn syrup, methylparaben, natural and artificial orange flavor, polysorbate 80, polyvinyl acetate, povidone, propylparaben, purified water, sodium metabisulfite, sodium polystyrene sulfonate, sucrose, tartaric acid, tragacanth gum, triacetin, xanthan gum. Stamp: `tragacanth gum` → tragacanth gum → plant-gum Cleared class with xanthan / guar / acacia / pectin (Sept 26 #349; not gum base Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1b11b25b-2716-45f9-830f-ddf622366e60; setid 1b11b25b-2716-45f9-830f-ddf622366e60; NDC 0113-0384). Same 148 mL on the Good Sense Cough DM (0113-0958) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea; setid 5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea; NDC 0113-0958). Package quantity pinned on the opened SPL: 148 mL. Active: Dextromethorphan Hydrobromide 30mg. Inactive ingredients: d&c red #30 aluminum lake, d&c yellow #10 aluminum lake, glycerin, high fructose corn syrup, methylparaben, natural and artificial orange flavor, polysorbate 80, polyvinyl acetate, povidone, propylparaben, purified water, sodium metabisulfite, sodium polystyrene sulfonate, sucrose, tartaric acid, tragacanth gum, triacetin, xanthan gum. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `tragacanth gum` → tragacanth gum → plant-gum Cleared class with xanthan / guar / acacia / pectin (Sept 26 #349; not gum base Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-tussin-dm-max-26d0',
    productName: 'GoodSense Tussin DM Max (Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg), 118 mL',
    category: 'Cold & Flu',
    formulaId: 'goodsense-b113-tussin-dm-max-26d0',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Dextromethorphan Hydrobromide', strength: '20mg' }, { name: 'Guaifenesin', strength: '400mg' }],
    flags: [['acetic acid', 'cleared', 'acetic'], ['carboxymethylcellulose sodium', 'cleared', 'cleared'], ['citric acid', 'cleared', 'citric'], ['fd&c blue no. 1', 'high', 'dye'], ['fd&c red no. 40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['menthol', 'limited', 'flavor'], ['polyethylene glycol', 'moderate', 'peg'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium citrate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Tussin DM Max (Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg), 118 mL = avoid. Drivers: fd&c blue no. 1, fd&c red no. 40. DailyMed setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f. Inactive ingredients: acetic acid, carboxymethylcellulose sodium, citric acid, fd&c blue no. 1, fd&c red no. 40, flavor, glycerin, menthol, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sorbitol, sucralose, xanthan gum. Stamp: `acetic acid` → acetic acid → Cleared acidulant with citric acid (Sept 26 #349; not phosphoric acid Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d2541ef0-a73c-43aa-91ff-fdbce2748c4f; setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f; NDC 0113-0927). Package quantity pinned on the opened SPL: 118 mL. Active: Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg. Inactive ingredients: acetic acid, carboxymethylcellulose sodium, citric acid, fd&c blue no. 1, fd&c red no. 40, flavor, glycerin, menthol, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sorbitol, sucralose, xanthan gum. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `acetic acid` → acetic acid → Cleared acidulant with citric acid (Sept 26 #349; not phosphoric acid Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-tussin-dm-max-26d0-237-ml',
    productName: 'GoodSense Tussin DM Max (Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg), 237 mL',
    category: 'Cold & Flu',
    formulaId: 'goodsense-b113-tussin-dm-max-26d0',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Dextromethorphan Hydrobromide', strength: '20mg' }, { name: 'Guaifenesin', strength: '400mg' }],
    flags: [['acetic acid', 'cleared', 'acetic'], ['carboxymethylcellulose sodium', 'cleared', 'cleared'], ['citric acid', 'cleared', 'citric'], ['fd&c blue no. 1', 'high', 'dye'], ['fd&c red no. 40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['menthol', 'limited', 'flavor'], ['polyethylene glycol', 'moderate', 'peg'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium citrate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Tussin DM Max (Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg), 237 mL = avoid. Drivers: fd&c blue no. 1, fd&c red no. 40. DailyMed setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f. Inactive ingredients: acetic acid, carboxymethylcellulose sodium, citric acid, fd&c blue no. 1, fd&c red no. 40, flavor, glycerin, menthol, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sorbitol, sucralose, xanthan gum. Stamp: `acetic acid` → acetic acid → Cleared acidulant with citric acid (Sept 26 #349; not phosphoric acid Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d2541ef0-a73c-43aa-91ff-fdbce2748c4f; setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f; NDC 0113-0927). Package quantity pinned on the opened SPL: 237 mL. Active: Dextromethorphan Hydrobromide 20mg / Guaifenesin 400mg. Inactive ingredients: acetic acid, carboxymethylcellulose sodium, citric acid, fd&c blue no. 1, fd&c red no. 40, flavor, glycerin, menthol, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium citrate, sorbitol, sucralose, xanthan gum. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `acetic acid` → acetic acid → Cleared acidulant with citric acid (Sept 26 #349; not phosphoric acid Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-dual-action-complete-61cd',
    productName: 'GoodSense DUAL ACTION COMPLETE (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 50 count',
    category: 'Digestive',
    formulaId: 'goodsense-b113-dual-action-complete-61cd',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '10mg' }, { name: 'Calcium Carbonate', strength: '800mg' }, { name: 'Magnesium Hydroxide', strength: '165mg' }],
    flags: [['anhydrous lactose', 'cleared', 'cleared'], ['d&c yellow #10 aluminum lake', 'high', 'dye'], ['dextrates', 'limited', 'dextrates'], ['fd&c yellow #6 aluminum lake', 'high', 'dye'], ['glyceryl monostearate', 'cleared', 'cleared'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['modified food starch', 'limited', 'modStarch'], ['natural and artificial tropical flavor', 'limited', 'flavor'], ['polyacrylic acid', 'limited', 'polyacrylic'], ['polysorbate 80', 'moderate', 'ps80'], ['povidone', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['sodium starch glycolate', 'cleared', 'cleared'], ['sucralose', 'moderate', 'sucralose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense DUAL ACTION COMPLETE (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 50 count = avoid. Drivers: d&c yellow #10 aluminum lake, fd&c yellow #6 aluminum lake, talc. DailyMed setid b5a36da3-7316-493c-b50f-fc5393d858c0. Inactive ingredients: anhydrous lactose, d&c yellow #10 aluminum lake, dextrates, fd&c yellow #6 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, maltodextrin, microcrystalline cellulose, modified food starch, natural and artificial tropical flavor, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, sucralose, talc. Stamp: `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5a36da3-7316-493c-b50f-fc5393d858c0; setid b5a36da3-7316-493c-b50f-fc5393d858c0; NDC 0113-7050-71). Package quantity pinned on the opened SPL: 50 count. Active: Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg. Inactive ingredients: anhydrous lactose, d&c yellow #10 aluminum lake, dextrates, fd&c yellow #6 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, maltodextrin, microcrystalline cellulose, modified food starch, natural and artificial tropical flavor, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, sucralose, talc. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-antacid-soft-chew-e3e9',
    productName: 'GoodSense Antacid Soft Chew (Calcium Carbonate 1177mg), 36 count',
    category: 'Digestive',
    formulaId: 'goodsense-b113-antacid-soft-chew-e3e9',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '1177mg' }],
    flags: [['confectioner\'s sugar', 'limited', 'bareSugar'], ['corn starch', 'cleared', 'cleared'], ['corn syrup', 'limited', 'cornSyrup'], ['corn syrup solids', 'limited', 'cornSyrup'], ['fd&c red #40 aluminum lake', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['hydrogenated coconut oil', 'limited', 'hvoOi'], ['nonfat dry milk', 'limited', 'milk'], ['soy lecithin', 'cleared', 'cleared'], ['sucrose', 'limited', 'sucrose'], ['water', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Antacid Soft Chew (Calcium Carbonate 1177mg), 36 count = avoid. Drivers: fd&c red #40 aluminum lake. DailyMed setid c7420218-b20e-0f0d-e053-2995a90a2386. Inactive ingredients: confectioner\'s sugar, corn starch, corn syrup, corn syrup solids, fd&c red #40 aluminum lake, flavor, glycerin, hydrogenated coconut oil, nonfat dry milk, soy lecithin, sucrose, water. Stamp: `hydrogenated coconut oil` → hydrogenated coconut oil → Caution (Sept 26 #349; SPL dosage form `TABLET, CHEWABLE` is not a gummy; not seed-oil High; chew nickname is not the dosage form).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7420218-b20e-0f0d-e053-2995a90a2386; setid c7420218-b20e-0f0d-e053-2995a90a2386; NDC 50804-027-36). Package quantity pinned on the opened SPL: 36 count. Active: Calcium Carbonate 1177mg. Inactive ingredients: confectioner\'s sugar, corn starch, corn syrup, corn syrup solids, fd&c red #40 aluminum lake, flavor, glycerin, hydrogenated coconut oil, nonfat dry milk, soy lecithin, sucrose, water. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `hydrogenated coconut oil` → hydrogenated coconut oil → Caution (Sept 26 #349; SPL dosage form `TABLET, CHEWABLE` is not a gummy; not seed-oil High; chew nickname is not the dosage form) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-dual-action-complete-258b',
    barcode: '370030148660',
    upcNote:
      'UPC-A 370030148660 is the EAN-13 under the bars on DailyMed image goodsense-dual-action-complete-container-image.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=b7154648-8c8c-4ce6-88b7-5442a16143c5&name=goodsense-dual-action-complete-container-image.jpg). 25 chewable tablets.',
    productName: 'GoodSense Dual Action Complete (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 25 count',
    category: 'Digestive',
    formulaId: 'goodsense-b113-dual-action-complete-258b',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '10mg' }, { name: 'Calcium Carbonate', strength: '800mg' }, { name: 'Magnesium Hydroxide', strength: '165mg' }],
    flags: [['anhydrous lactose', 'cleared', 'cleared'], ['artificial berry flavor', 'limited', 'flavor'], ['aspartame', 'high', 'aspartame'], ['d&c red no. 7 calcium lake', 'high', 'dye'], ['dextrates', 'limited', 'dextrates'], ['fd&c blue no. 1 aluminum lake', 'high', 'dye'], ['fd&c red no. 40 aluminum lake', 'high', 'dye'], ['glyceryl monostearate', 'cleared', 'cleared'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polyacrylic acid', 'limited', 'polyacrylic'], ['polysorbate 80', 'moderate', 'ps80'], ['povidone', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['sodium starch glycolate', 'cleared', 'cleared'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Dual Action Complete (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 25 count = avoid. Drivers: aspartame, d&c red no. 7 calcium lake, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, talc. DailyMed setid b7154648-8c8c-4ce6-88b7-5442a16143c5. Inactive ingredients: anhydrous lactose, artificial berry flavor, aspartame, d&c red no. 7 calcium lake, dextrates, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, talc. Stamp: `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b7154648-8c8c-4ce6-88b7-5442a16143c5; setid b7154648-8c8c-4ce6-88b7-5442a16143c5; NDC 0113-0032-63). Package quantity pinned on the opened SPL: 25 count. Active: Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg. Inactive ingredients: anhydrous lactose, artificial berry flavor, aspartame, d&c red no. 7 calcium lake, dextrates, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, talc. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-dual-action-complete-258b-50',
    productName: 'GoodSense Dual Action Complete (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 50 count',
    category: 'Digestive',
    formulaId: 'goodsense-b113-dual-action-complete-258b',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Famotidine', strength: '10mg' }, { name: 'Calcium Carbonate', strength: '800mg' }, { name: 'Magnesium Hydroxide', strength: '165mg' }],
    flags: [['anhydrous lactose', 'cleared', 'cleared'], ['artificial berry flavor', 'limited', 'flavor'], ['aspartame', 'high', 'aspartame'], ['d&c red no. 7 calcium lake', 'high', 'dye'], ['dextrates', 'limited', 'dextrates'], ['fd&c blue no. 1 aluminum lake', 'high', 'dye'], ['fd&c red no. 40 aluminum lake', 'high', 'dye'], ['glyceryl monostearate', 'cleared', 'cleared'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polyacrylic acid', 'limited', 'polyacrylic'], ['polysorbate 80', 'moderate', 'ps80'], ['povidone', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['sodium starch glycolate', 'cleared', 'cleared'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Dual Action Complete (Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg), 50 count = avoid. Drivers: aspartame, d&c red no. 7 calcium lake, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, talc. DailyMed setid b7154648-8c8c-4ce6-88b7-5442a16143c5. Inactive ingredients: anhydrous lactose, artificial berry flavor, aspartame, d&c red no. 7 calcium lake, dextrates, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, talc. Stamp: `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b7154648-8c8c-4ce6-88b7-5442a16143c5; setid b7154648-8c8c-4ce6-88b7-5442a16143c5; NDC 0113-0032-71). Package quantity pinned on the opened SPL: 50 count. Active: Famotidine 10mg / Calcium Carbonate 800mg / Magnesium Hydroxide 165mg. Inactive ingredients: anhydrous lactose, artificial berry flavor, aspartame, d&c red no. 7 calcium lake, dextrates, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, glyceryl monostearate, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyacrylic acid, polysorbate 80, povidone, pregelatinized starch, sodium starch glycolate, talc. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `polyacrylate dispersion` → polyacrylate dispersion → polyacrylic acid Caution (Sept 26 #349; polyacrylate / polyacrylic acid family) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-ibuprofen-pm-b55e',
    productName: 'GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-ibuprofen-pm-b55e',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Citrate', strength: '38mg' }, { name: 'Ibuprofen', strength: '200mg' }],
    flags: [['colloidal silicon dioxide', 'limited', 'sio2'], ['croscarmellose sodium', 'cleared', 'cleared'], ['fd&c blue no. 2 aluminum lake', 'high', 'dye'], ['glyceryl dibehenate', 'cleared', 'dibehenate'], ['hydroxypropyl cellulose', 'cleared', 'cleared'], ['iron oxide black', 'limited', 'iron'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polyethylene glycol', 'moderate', 'peg'], ['polyvinyl alcohol', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 20 count = avoid. Drivers: fd&c blue no. 2 aluminum lake, talc, titanium dioxide. DailyMed setid 0488786f-9b6b-4935-bb57-bcb2565447f8. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Stamp: `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0488786f-9b6b-4935-bb57-bcb2565447f8; setid 0488786f-9b6b-4935-bb57-bcb2565447f8; NDC 0113-0050). Package quantity pinned on the opened SPL: 20 count. Active: Diphenhydramine Citrate 38mg / Ibuprofen 200mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-ibuprofen-pm-b55e-40',
    productName: 'GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 40 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-ibuprofen-pm-b55e',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Citrate', strength: '38mg' }, { name: 'Ibuprofen', strength: '200mg' }],
    flags: [['colloidal silicon dioxide', 'limited', 'sio2'], ['croscarmellose sodium', 'cleared', 'cleared'], ['fd&c blue no. 2 aluminum lake', 'high', 'dye'], ['glyceryl dibehenate', 'cleared', 'dibehenate'], ['hydroxypropyl cellulose', 'cleared', 'cleared'], ['iron oxide black', 'limited', 'iron'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polyethylene glycol', 'moderate', 'peg'], ['polyvinyl alcohol', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 40 count = avoid. Drivers: fd&c blue no. 2 aluminum lake, talc, titanium dioxide. DailyMed setid 0488786f-9b6b-4935-bb57-bcb2565447f8. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Stamp: `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0488786f-9b6b-4935-bb57-bcb2565447f8; setid 0488786f-9b6b-4935-bb57-bcb2565447f8; NDC 0113-0050). Package quantity pinned on the opened SPL: 40 count. Active: Diphenhydramine Citrate 38mg / Ibuprofen 200mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-ibuprofen-pm-b55e-80',
    productName: 'GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 80 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-ibuprofen-pm-b55e',
    audience: ADULT,
    minAge: 12,
    form: 'film-coated tablet',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Citrate', strength: '38mg' }, { name: 'Ibuprofen', strength: '200mg' }],
    flags: [['colloidal silicon dioxide', 'limited', 'sio2'], ['croscarmellose sodium', 'cleared', 'cleared'], ['fd&c blue no. 2 aluminum lake', 'high', 'dye'], ['glyceryl dibehenate', 'cleared', 'dibehenate'], ['hydroxypropyl cellulose', 'cleared', 'cleared'], ['iron oxide black', 'limited', 'iron'], ['lactose monohydrate', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polyethylene glycol', 'moderate', 'peg'], ['polyvinyl alcohol', 'cleared', 'cleared'], ['pregelatinized starch', 'cleared', 'cleared'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ibuprofen pm (Diphenhydramine Citrate 38mg / Ibuprofen 200mg), 80 count = avoid. Drivers: fd&c blue no. 2 aluminum lake, talc, titanium dioxide. DailyMed setid 0488786f-9b6b-4935-bb57-bcb2565447f8. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Stamp: `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0488786f-9b6b-4935-bb57-bcb2565447f8; setid 0488786f-9b6b-4935-bb57-bcb2565447f8; NDC 0113-0050). Package quantity pinned on the opened SPL: 80 count. Active: Diphenhydramine Citrate 38mg / Ibuprofen 200mg. Inactive ingredients: colloidal silicon dioxide, croscarmellose sodium, fd&c blue no. 2 aluminum lake, glyceryl dibehenate, hydroxypropyl cellulose, iron oxide black, lactose monohydrate, magnesium stearate, microcrystalline cellulose, polyethylene glycol, polyvinyl alcohol, pregelatinized starch, talc, titanium dioxide. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `glyceryl behenate` → glyceryl behenate → glyceryl dibehenate Cleared (Sept 26 #349; not behenoyl polyoxyl-8 glycerides Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-anti-itch-70fd',
    productName: 'GoodSense Anti itch (Hydrocortisone 1g), 28 g',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-anti-itch-70fd',
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    productType: OTC,
    actives: [{ name: 'Hydrocortisone', strength: '1g' }],
    flags: [['aloe barbadensis leaf juice', 'limited', 'aloe'], ['ceteareth-20', 'limited', 'ceteareth'], ['cetearyl alcohol', 'cleared', 'fattyAlc'], ['cetyl palmitate', 'cleared', 'cetylPalm'], ['glycerin', 'cleared', 'cleared'], ['isopropyl myristate', 'cleared', 'ipm'], ['isostearyl neopentanoate', 'limited', 'neopentanoate'], ['methylparaben', 'high', 'paraben'], ['water', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Anti itch (Hydrocortisone 1g), 28 g = avoid. Drivers: methylparaben. DailyMed setid 072dd455-24a5-4a44-aaef-d3e137d005a6. Inactive ingredients: aloe barbadensis leaf juice, ceteareth-20, cetearyl alcohol, cetyl palmitate, glycerin, isopropyl myristate, isostearyl neopentanoate, methylparaben, water. Stamp: `isostearyl neopentanoate` → isostearyl neopentanoate → Caution (Sept 26 #349; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=072dd455-24a5-4a44-aaef-d3e137d005a6; setid 072dd455-24a5-4a44-aaef-d3e137d005a6; NDC 50090-7255). Package quantity pinned on the opened SPL: 28 g. Active: Hydrocortisone 1g. Inactive ingredients: aloe barbadensis leaf juice, ceteareth-20, cetearyl alcohol, cetyl palmitate, glycerin, isopropyl myristate, isostearyl neopentanoate, methylparaben, water. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `isostearyl neopentanoate` → isostearyl neopentanoate → Caution (Sept 26 #349; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-ibuprofen-6c80',
    productName: 'GoodSense Ibuprofen (Ibuprofen 100mg), 24 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-ibuprofen-6c80',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Ibuprofen', strength: '100mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['ammonium glycyrrhizin', 'limited', 'glycyrrhizin'], ['aspartame', 'high', 'aspartame'], ['carnauba wax', 'limited', 'carnauba'], ['croscarmellose sodium', 'cleared', 'cleared'], ['fd&c yellow no. 6 aluminum lake', 'high', 'dye'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial flavors', 'limited', 'natFlavor'], ['prosweet', 'limited', 'flavor'], ['silicon dioxide', 'limited', 'sio2'], ['sodium lauryl sulfate', 'limited', 'sls'], ['soybean oil', 'high', 'seedOil'], ['succinic acid', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ibuprofen (Ibuprofen 100mg), 24 count = avoid. Drivers: aspartame, fd&c yellow no. 6 aluminum lake, soybean oil. DailyMed setid 56cb55bf-3fd8-4613-bc45-73e53204dc97. Inactive ingredients: acesulfame potassium, ammonium glycyrrhizin, aspartame, carnauba wax, croscarmellose sodium, fd&c yellow no. 6 aluminum lake, hypromellose, magnesium stearate, mannitol, natural and artificial flavors, prosweet, silicon dioxide, sodium lauryl sulfate, soybean oil, succinic acid. Stamp: `ammonium glycerrhizin` → ammonium glycerrhizin → ammonium glycyrrhizin Caution (Sept 26 #349; label misspelling; not Cleared licorice).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=56cb55bf-3fd8-4613-bc45-73e53204dc97; setid 56cb55bf-3fd8-4613-bc45-73e53204dc97; NDC 68258-2994-2). Package quantity pinned on the opened SPL: 24 count. Active: Ibuprofen 100mg. Inactive ingredients: acesulfame potassium, ammonium glycyrrhizin, aspartame, carnauba wax, croscarmellose sodium, fd&c yellow no. 6 aluminum lake, hypromellose, magnesium stearate, mannitol, natural and artificial flavors, prosweet, silicon dioxide, sodium lauryl sulfate, soybean oil, succinic acid. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `ammonium glycerrhizin` → ammonium glycerrhizin → ammonium glycyrrhizin Caution (Sept 26 #349; label misspelling; not Cleared licorice) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-cherry-zinc-lozenges-5be3',
    barcode: '846036009392',
    upcNote:
      'UPC-A 846036009392 is the EAN-13 under the bars on DailyMed image GoodSense Cherry Zinc 18ct 60001800 6-30-2021.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c5fe07e0-3a2b-adf5-e053-2995a90a99ae&name=GoodSense+Cherry+Zinc+18ct+60001800+6-30-2021.jpg). 18 lozenges.',
    productName: 'GoodSense Cherry Zinc Lozenges (Zinc Gluconate 2[hp_X]), 18 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b113-cherry-zinc-lozenges-5be3',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Zinc Gluconate', strength: '2[hp_X]' }],
    flags: [['corn starch', 'cleared', 'cleared'], ['corn syrup', 'limited', 'cornSyrup'], ['glycerine', 'cleared', 'cleared'], ['glycine', 'cleared', 'glycine'], ['medium chain triglycerides', 'limited', 'mct'], ['natural flavors', 'limited', 'natFlavor'], ['purified water', 'cleared', 'cleared'], ['soybean oil', 'high', 'seedOil'], ['sucrose', 'limited', 'sucrose']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Cherry Zinc Lozenges (Zinc Gluconate 2[hp_X]), 18 count = avoid. Drivers: soybean oil. DailyMed setid c5fe07e0-3a2b-adf5-e053-2995a90a99ae. Inactive ingredients: corn starch, corn syrup, glycerine, glycine, medium chain triglycerides, natural flavors, purified water, soybean oil, sucrose. Stamp: `glycine` → glycine → Cleared amino-acid filler (Sept 26 #349; not lysine).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5fe07e0-3a2b-adf5-e053-2995a90a99ae; setid c5fe07e0-3a2b-adf5-e053-2995a90a99ae; NDC 75981-011-18). Package quantity pinned on the opened SPL: 18 count. Active: Zinc Gluconate 2[hp_X]. Inactive ingredients: corn starch, corn syrup, glycerine, glycine, medium chain triglycerides, natural flavors, purified water, soybean oil, sucrose. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `glycine` → glycine → Cleared amino-acid filler (Sept 26 #349; not lysine) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b113-antacid-fruit-chews-5411',
    barcode: '846036009408',
    upcNote:
      'UPC-A 846036009408 is the EAN-13 under the bars on DailyMed image GoodSense Assorted Fruit Antacids 32ct 60001799 6-30-2021.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=c5ffaaee-0f78-4a13-e053-2995a90ad6ba&name=GoodSense+Assorted+Fruit+Antacids+32ct+60001799+6-30-2021.jpg). 32 chewables.',
    productName: 'GoodSense Antacid Fruit Chews (Calcium Carbonate 750mg), 32 count',
    category: 'Digestive',
    formulaId: 'goodsense-b113-antacid-fruit-chews-5411',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '750mg' }],
    flags: [['beeswax', 'cleared', 'cleared'], ['carmine', 'limited', 'carmine'], ['carnauba wax', 'limited', 'carnauba'], ['citric acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['corn syrup', 'limited', 'cornSyrup'], ['dl-alpha tocopherol', 'cleared', 'cleared'], ['ethyl acetate', 'limited', 'flavor'], ['fd&c blue no. 1 aluminum lake', 'high', 'dye'], ['fd&c red no. 40 aluminum lake', 'high', 'dye'], ['fd&c yellow no. 5 lake (tartrazine)', 'high', 'dye'], ['fd&c yellow no. 6', 'high', 'dye'], ['fd&c yellow no. 6 aluminum lake', 'high', 'dye'], ['gum arabic', 'cleared', 'cleared'], ['hydrogenated coconut oil', 'limited', 'hvoOi'], ['maltodextrin', 'limited', 'maltodextrin'], ['medium chain triglycerides', 'limited', 'mct'], ['methyl paraben', 'high', 'paraben'], ['modified corn starch', 'limited', 'modStarch'], ['natural and artificial flavors', 'limited', 'natFlavor'], ['phosphoric acid', 'limited', 'phosphoric'], ['pregelatinized corn starch', 'cleared', 'cleared'], ['propyl paraben', 'high', 'paraben'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['shellac', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sorbic acid', 'limited', 'sorbic'], ['sorbitol', 'limited', 'sugarAlcohol'], ['soy lecithin', 'cleared', 'cleared'], ['soybean oil', 'high', 'seedOil'], ['sucrose', 'limited', 'sucrose'], ['titanium dioxide', 'high', 'tio2']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Antacid Fruit Chews (Calcium Carbonate 750mg), 32 count = avoid. Drivers: fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, fd&c yellow no. 5 lake (tartrazine), fd&c yellow no. 6, fd&c yellow no. 6 aluminum lake, methyl paraben, propyl paraben, soybean oil, titanium dioxide. DailyMed setid c5ffaaee-0f78-4a13-e053-2995a90ad6ba. Inactive ingredients: beeswax, carmine, carnauba wax, citric acid, corn starch, corn syrup, dl-alpha tocopherol, ethyl acetate, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, fd&c yellow no. 5 lake (tartrazine), fd&c yellow no. 6, fd&c yellow no. 6 aluminum lake, gum arabic, hydrogenated coconut oil, maltodextrin, medium chain triglycerides, methyl paraben, modified corn starch, natural and artificial flavors, phosphoric acid, pregelatinized corn starch, propyl paraben, propylene glycol, purified water, shellac, sodium benzoate, sorbic acid, sorbitol, soy lecithin, soybean oil, sucrose, titanium dioxide. Stamp: `ethyl acetate` → ethyl acetate → flavor Caution (Sept 26 #349); `hydrogenated coconut oil` → hydrogenated coconut oil → Caution (Sept 26 #349; SPL dosage form `TABLET, CHEWABLE` is not a gummy; not seed-oil High; chew nickname is not the dosage form).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5ffaaee-0f78-4a13-e053-2995a90ad6ba; setid c5ffaaee-0f78-4a13-e053-2995a90ad6ba; NDC 75981-012-32). Package quantity pinned on the opened SPL: 32 count. Active: Calcium Carbonate 750mg. Inactive ingredients: beeswax, carmine, carnauba wax, citric acid, corn starch, corn syrup, dl-alpha tocopherol, ethyl acetate, fd&c blue no. 1 aluminum lake, fd&c red no. 40 aluminum lake, fd&c yellow no. 5 lake (tartrazine), fd&c yellow no. 6, fd&c yellow no. 6 aluminum lake, gum arabic, hydrogenated coconut oil, maltodextrin, medium chain triglycerides, methyl paraben, modified corn starch, natural and artificial flavors, phosphoric acid, pregelatinized corn starch, propyl paraben, propylene glycol, purified water, shellac, sodium benzoate, sorbic acid, sorbitol, soy lecithin, soybean oil, sucrose, titanium dioxide. Token backfill of PR #349 refuse onto the Sept 26, 2026 #349 founder stamp. `ethyl acetate` → ethyl acetate → flavor Caution (Sept 26 #349) `hydrogenated coconut oil` → hydrogenated coconut oil → Caution (Sept 26 #349; SPL dosage form `TABLET, CHEWABLE` is not a gummy; not seed-oil High; chew nickname is not the dosage form) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  }
];

export const BATCH113_KYR6B_GOODSENSE_TOKEN_BACKFILL_3: RatingRecord[] = PACKS.map(expand);

export const BATCH113_SKIPPED_NO_OI: { sku: string; reason: string }[] = [

];

export const BATCH113_SKIPPED_OUT: { sku: string; reason: string }[] = [

];

export const BATCH113_SKIPPED_ALREADY: { sku: string; reason: string }[] = [

];

export const BATCH113_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH113_SKIPPED_NO_OI,
  ...BATCH113_SKIPPED_OUT,
  ...BATCH113_SKIPPED_ALREADY,
];

export const BATCH113_REFUSED: { sku: string; reason: string }[] = [

];

const _ROWS = BATCH113_KYR6B_GOODSENSE_TOKEN_BACKFILL_3;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
if (_ROWS.length !== 16) throw new Error('batch113 row count drift');
if (_grades.clean !== 0) throw new Error('batch113 clean drift');
if (_grades.caution !== 0) throw new Error('batch113 caution drift');
if (_grades.avoid !== 16) throw new Error('batch113 avoid drift');
const _formulaFirst = new Set<string>();
let _new = 0;
let _reuse = 0;
for (const r of _ROWS) {
  const id = r.formulaId ?? r.id;
  if (_formulaFirst.has(id)) _reuse += 1;
  else {
    _formulaFirst.add(id);
    _new += 1;
  }
}
if (_new !== 11 || _reuse !== 5) throw new Error('batch113 NEW/REUSE drift');
if (BATCH113_SKIPPED_NO_OI.length !== 0) throw new Error('batch113 no_OI drift');
if (BATCH113_SKIPPED_OUT.length !== 0) throw new Error('batch113 OUT drift');
if (BATCH113_SKIPPED_ALREADY.length !== 0) throw new Error('batch113 already drift');
if (BATCH113_REFUSED.length !== 0) throw new Error('batch113 REFUSED drift');
if (_ROWS.some((r) => r.recordStatus !== 'unverified')) {
  throw new Error('batch113 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'goodsense-b113-cherry-zinc-lozenges-5be3': '846036009392',
  'goodsense-b113-antacid-fruit-chews-5411': '846036009408',
  'goodsense-b113-dual-action-complete-258b': '370030148660',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 3) throw new Error('batch113 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch113 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch113 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch113 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch113 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('goodsense-b113-'))) {
  throw new Error('batch113 ids must use goodsense-b113-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch113 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch113 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch113 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && (r.inactiveIngredients ?? []).some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch113 Clean row has a non-cleared inactive');
}
if (_ROWS.some((r) => r.verdict !== 'clean' && !(r.inactiveIngredients?.length))) {
  throw new Error('batch113 non-clean row missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH113_SKIPPED.map((s) => s.sku),
  ...BATCH113_REFUSED.map((s) => s.sku),
].join('\n');
if (/HealthA2Z|A\+Health|\bTIME-Cap\b|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch113 excluded brand leaked');
}
