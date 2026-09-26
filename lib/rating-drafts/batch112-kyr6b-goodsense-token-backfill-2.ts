// DRAFT / not verified / batch 112 KYR6-b GoodSense token backfill 2.
// Methodology v1.6 + MAIN §5 through the Sept 26, 2026 #348 founder stamp.
// Harm-first. No invented grades. No invented OI. No invented UPCs.
// No new token strings. Founder owns final Avoid vs Caution vs Clean.
// Family lock beats spelling. Exact-string refuse is only for tokens
// with no family on main.
//
// Scope is ONLY the 54 SKUs still REFUSED in PR #348 (batch111).
// A row is written only when every inactive on that opened DailyMed
// panel maps to a lock already on main, including the #348 family stamp.
// Calcium polycarbophil, docusate sodium, salicylic acid, and sodium
// polystyrene sulfonate: Active header drops the refuse. Inactive header
// maps to Caution.
// Exact pack is the SPL quantity already pinned for that setid.
// recordStatus is 'unverified'.
// Internal keys only: clean | caution | avoid.
// Search wiring only. Not wired into Clean Picks UI.
//
// Do NOT edit batch70–batch111. No house Amazon. No HealthA2Z.
// No A+Health. No TIME-Cap. No toothpaste. No Sprouts. No factory.
// Oil form split stays as it is on main. Dual-panel day/night stays no-row.
// Formaldehyde-releasers stay Avoid. Gummy vegetable oil and gummy
// coconut oil stay Avoid.
// UPC only where a DailyMed carton or label barcode decoded for that exact pack.
//
// TALLY (unverified drafts in THIS file): 45 rows —
// Clean 0 / Caution 12 / Avoid 33.
// NEW 35 / REUSE-formula 10 /
// SKIPPED 0 (no_OI 0 / OUT 0 / already-on-MAIN 0) /
// REFUSED 12.
// 42 of the 54 setids lock fully.
// Search grade: Clean 0 / Caution 12 / Avoid 33.
// UPC count: 8.
// TALLY is asserted at the bottom.

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const KIDS = 'kids' as const;
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
  flavor: 'Methodology §5 Caution (flavor family). Split junk "natural and artificial" maps here. Inactive-header menthol, menthol-dl, and non-gel eucalyptus oil map here (Sept 26, 2026). Lime oil, benzaldehyde, masking agent, and prosweet map here (Sept 26, 2026 #348). Not a menthol-inactive class. Not Avoid.',
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
  glycyrrhizin: 'Methodology §5 Caution (ammonium glycyrrhizin). Not Avoid.',
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
  audience: typeof ADULT | typeof KIDS;
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
    id: 'goodsense-b112-allergy-2a73',
    barcode: '368071373448',
    upcNote:
      'UPC-A 368071373448 is the Data Matrix GTIN on DailyMed image 68071-3734-4.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=2861b801-e778-822d-e063-6394a90aa1a8&name=68071-3734-4.jpg). 5 mL, NDC 68071-3734-4.',
    productName: 'GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 5 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-allergy-2a73',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Hydrochloride', strength: '12.5mg' }],
    flags: [['citric acid', 'cleared', 'citric'], ['d&c red #33', 'high', 'dye'], ['fd&c red #40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['high fructose corn syrup', 'limited', 'hfcs'], ['poloxamer 407', 'limited', 'poloxamer'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium chloride', 'cleared', 'cleared'], ['sodium citrate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 5 mL = avoid. Drivers: d&c red #33, fd&c red #40. DailyMed setid 2861b801-e778-822d-e063-6394a90aa1a8. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Stamp: `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2861b801-e778-822d-e063-6394a90aa1a8; setid 2861b801-e778-822d-e063-6394a90aa1a8; NDC 68071-3734). Package quantity pinned on the opened SPL: 5 mL. Active: Diphenhydramine Hydrochloride 12.5mg. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-allergy-2a73-118-ml',
    productName: 'GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 118 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-allergy-2a73',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Hydrochloride', strength: '12.5mg' }],
    flags: [['citric acid', 'cleared', 'citric'], ['d&c red #33', 'high', 'dye'], ['fd&c red #40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['high fructose corn syrup', 'limited', 'hfcs'], ['poloxamer 407', 'limited', 'poloxamer'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium chloride', 'cleared', 'cleared'], ['sodium citrate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 118 mL = avoid. Drivers: d&c red #33, fd&c red #40. DailyMed setid bf5039a0-2109-41a2-84a9-b5167d0a93da. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Stamp: `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bf5039a0-2109-41a2-84a9-b5167d0a93da; setid bf5039a0-2109-41a2-84a9-b5167d0a93da; NDC 0113-0379). Package quantity pinned on the opened SPL: 118 mL. Active: Diphenhydramine Hydrochloride 12.5mg. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-allergy-2a73-237-ml',
    productName: 'GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 237 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-allergy-2a73',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Hydrochloride', strength: '12.5mg' }],
    flags: [['citric acid', 'cleared', 'citric'], ['d&c red #33', 'high', 'dye'], ['fd&c red #40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['glycerin', 'cleared', 'cleared'], ['high fructose corn syrup', 'limited', 'hfcs'], ['poloxamer 407', 'limited', 'poloxamer'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium chloride', 'cleared', 'cleared'], ['sodium citrate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Allergy (Diphenhydramine Hydrochloride 12.5mg), 237 mL = avoid. Drivers: d&c red #33, fd&c red #40. DailyMed setid bf5039a0-2109-41a2-84a9-b5167d0a93da. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Stamp: `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bf5039a0-2109-41a2-84a9-b5167d0a93da; setid bf5039a0-2109-41a2-84a9-b5167d0a93da; NDC 0113-0379-00). Package quantity pinned on the opened SPL: 237 mL. Active: Diphenhydramine Hydrochloride 12.5mg. Inactive ingredients: citric acid, d&c red #33, fd&c red #40, flavor, glycerin, high fructose corn syrup, poloxamer 407, purified water, sodium benzoate, sodium chloride, sodium citrate, sorbitol. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-c5cd',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-c5cd',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['mica-based pearlescent pigment', 'limited', 'mica'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['natural and artificial icy mint cooling flavor', 'limited', 'flavor'], ['natural and artificial icy mint flavor', 'limited', 'flavor'], ['peppermint oil', 'limited', 'limited'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['titanium dioxide', 'high', 'tio2'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 20 count = avoid. Drivers: titanium dioxide. DailyMed setid 5c89061b-1452-4962-9f25-212f2ae8e41e. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Stamp: `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5c89061b-1452-4962-9f25-212f2ae8e41e; setid 5c89061b-1452-4962-9f25-212f2ae8e41e; NDC 0113-5023). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 4mg. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-c5cd-40',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 40 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-c5cd',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['mica-based pearlescent pigment', 'limited', 'mica'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['natural and artificial icy mint cooling flavor', 'limited', 'flavor'], ['natural and artificial icy mint flavor', 'limited', 'flavor'], ['peppermint oil', 'limited', 'limited'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['titanium dioxide', 'high', 'tio2'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 40 count = avoid. Drivers: titanium dioxide. DailyMed setid 5c89061b-1452-4962-9f25-212f2ae8e41e. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Stamp: `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5c89061b-1452-4962-9f25-212f2ae8e41e; setid 5c89061b-1452-4962-9f25-212f2ae8e41e; NDC 0113-5023-58). Package quantity pinned on the opened SPL: 40 count. Active: Nicotine 4mg. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-817b',
    productName: 'GoodSense OMEPRAZOLE (Omeprazole Magnesium 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-817b',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Omeprazole Magnesium', strength: '20mg' }],
    flags: [['fd&c yellow # 6', 'high', 'dye'], ['ferric oxide', 'limited', 'iron'], ['gelatin', 'cleared', 'cleared'], ['glyceryl monostearate', 'cleared', 'cleared'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['meglumine', 'limited', 'meglumine'], ['methacrylic acid copolymer', 'limited', 'methacrylic'], ['polyethylene glycol', 'moderate', 'peg'], ['polysorbate 80', 'moderate', 'ps80'], ['shellac', 'cleared', 'cleared'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense OMEPRAZOLE (Omeprazole Magnesium 20mg), 14 count = avoid. Drivers: fd&c yellow # 6, talc, titanium dioxide. DailyMed setid b840439b-540b-465a-8faa-f7b1024c628e. Inactive ingredients: fd&c yellow # 6, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid copolymer, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b840439b-540b-465a-8faa-f7b1024c628e; setid b840439b-540b-465a-8faa-f7b1024c628e; NDC 0113-6010-00). Package quantity pinned on the opened SPL: 14 count. Active: Omeprazole Magnesium 20mg. Inactive ingredients: fd&c yellow # 6, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid copolymer, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-childrens-allergy-relief-3685',
    productName: 'GoodSense Childrens allergy relief (Loratadine 5mg), 120 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-childrens-allergy-relief-3685',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '5mg' }],
    flags: [['edetate disodium', 'limited', 'edtaHydrate'], ['glycerin', 'cleared', 'cleared'], ['maltitol', 'limited', 'sugarAlcohol'], ['monobasic sodium phosphate', 'cleared', 'phosphate'], ['natural and artificial grape flavor', 'limited', 'flavor'], ['phosphoric acid', 'limited', 'phosphoric'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Childrens allergy relief (Loratadine 5mg), 120 mL = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 637e309d-9846-45a1-ad11-f67ea85c87b8. Inactive ingredients: edetate disodium, glycerin, maltitol, monobasic sodium phosphate, natural and artificial grape flavor, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. Stamp: `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=637e309d-9846-45a1-ad11-f67ea85c87b8; setid 637e309d-9846-45a1-ad11-f67ea85c87b8; NDC 0113-0671). Same 120 mL on the Good Sense childrens allergy relief (68788-8657) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=27bb0a40-35ee-4c19-bd6f-fb054c8a2586; setid 27bb0a40-35ee-4c19-bd6f-fb054c8a2586; NDC 68788-8657). Same 120 mL on the Good Sense childrens allergy relief (68071-3904) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40d25cdf-b63f-d5c9-e063-6394a90af509; setid 40d25cdf-b63f-d5c9-e063-6394a90af509; NDC 68071-3904). Package quantity pinned on the opened SPL: 120 mL. Active: Loratadine 5mg. Inactive ingredients: edetate disodium, glycerin, maltitol, monobasic sodium phosphate, natural and artificial grape flavor, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-childrens-allergy-relief-3685-240-ml',
    productName: 'GoodSense Childrens allergy relief (Loratadine 5mg), 240 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-childrens-allergy-relief-3685',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '5mg' }],
    flags: [['edetate disodium', 'limited', 'edtaHydrate'], ['glycerin', 'cleared', 'cleared'], ['maltitol', 'limited', 'sugarAlcohol'], ['monobasic sodium phosphate', 'cleared', 'phosphate'], ['natural and artificial grape flavor', 'limited', 'flavor'], ['phosphoric acid', 'limited', 'phosphoric'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Childrens allergy relief (Loratadine 5mg), 240 mL = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 4ce244e2-9fbc-4371-8806-789fd3a61a09. Inactive ingredients: edetate disodium, glycerin, maltitol, monobasic sodium phosphate, natural and artificial grape flavor, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. Stamp: `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4ce244e2-9fbc-4371-8806-789fd3a61a09; setid 4ce244e2-9fbc-4371-8806-789fd3a61a09; NDC 0113-1719). Package quantity pinned on the opened SPL: 240 mL. Active: Loratadine 5mg. Inactive ingredients: edetate disodium, glycerin, maltitol, monobasic sodium phosphate, natural and artificial grape flavor, phosphoric acid, propylene glycol, purified water, sodium benzoate, sorbitol, sucralose. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-aspirin-334c',
    productName: 'GoodSense Aspirin (Aspirin 81mg), 36 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-aspirin-334c',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81mg' }],
    flags: [['corn starch', 'cleared', 'cleared'], ['d&c red #27 aluminum lake', 'high', 'dye'], ['fd&c red #40 aluminum lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['saccharin sodium', 'limited', 'saccharinNa']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Aspirin (Aspirin 81mg), 36 count = avoid. Drivers: d&c red #27 aluminum lake, fd&c red #40 aluminum lake. DailyMed setid e150dd59-8db8-449f-9c9a-1aa6deb3be2e. Inactive ingredients: corn starch, d&c red #27 aluminum lake, fd&c red #40 aluminum lake, flavors, glucose, saccharin sodium. Stamp: `dextrose excipient` → dextrose excipient → bare glucose Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e150dd59-8db8-449f-9c9a-1aa6deb3be2e; setid e150dd59-8db8-449f-9c9a-1aa6deb3be2e; NDC 0113-0274). Package quantity pinned on the opened SPL: 36 count. Active: Aspirin 81mg. Inactive ingredients: corn starch, d&c red #27 aluminum lake, fd&c red #40 aluminum lake, flavors, glucose, saccharin sodium. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose excipient` → dextrose excipient → bare glucose Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-esomeprazole-magnesium-bcb4',
    productName: 'GoodSense Esomeprazole magnesium (Esomeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-esomeprazole-magnesium-bcb4',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Esomeprazole', strength: '20mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['d&c yellow #10', 'high', 'dye'], ['fd&c blue #1', 'high', 'dye'], ['fd&c red #3', 'high', 'dye'], ['gelatin', 'cleared', 'cleared'], ['glyceryl monostearate', 'cleared', 'cleared'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['meglumine', 'limited', 'meglumine'], ['menthol', 'limited', 'flavor'], ['methacrylic acid and ethyl acrylate copolymer dispersion', 'limited', 'methacrylic'], ['natural and artificial cool mint flavor', 'limited', 'flavor'], ['peppermint oil', 'limited', 'limited'], ['pharmaceutical ink', 'limited', 'ink'], ['polyethylene glycol', 'moderate', 'peg'], ['polysorbate 80', 'moderate', 'ps80'], ['sodium lauryl sulfate', 'limited', 'sls'], ['spearmint oil', 'limited', 'spearmint'], ['sucralose', 'moderate', 'sucralose'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Esomeprazole magnesium (Esomeprazole 20mg), 14 count = avoid. Drivers: d&c yellow #10, fd&c blue #1, fd&c red #3, talc, titanium dioxide. DailyMed setid f13088de-6841-453e-acb0-08bbdf9529d1. Inactive ingredients: acacia, d&c yellow #10, fd&c blue #1, fd&c red #3, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, menthol, methacrylic acid and ethyl acrylate copolymer dispersion, natural and artificial cool mint flavor, peppermint oil, pharmaceutical ink, polyethylene glycol, polysorbate 80, sodium lauryl sulfate, spearmint oil, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f13088de-6841-453e-acb0-08bbdf9529d1; setid f13088de-6841-453e-acb0-08bbdf9529d1; NDC 0113-2022-01). Package quantity pinned on the opened SPL: 14 count. Active: Esomeprazole 20mg. Inactive ingredients: acacia, d&c yellow #10, fd&c blue #1, fd&c red #3, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, menthol, methacrylic acid and ethyl acrylate copolymer dispersion, natural and artificial cool mint flavor, peppermint oil, pharmaceutical ink, polyethylene glycol, polysorbate 80, sodium lauryl sulfate, spearmint oil, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-c5cd-b',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-c5cd-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['mica-based pearlescent pigment', 'limited', 'mica'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['natural and artificial icy mint cooling flavor', 'limited', 'flavor'], ['natural and artificial icy mint flavor', 'limited', 'flavor'], ['peppermint oil', 'limited', 'limited'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['titanium dioxide', 'high', 'tio2'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 20 count = avoid. Drivers: titanium dioxide. DailyMed setid 0ac7f87a-63f4-4d74-ba5b-d1444803b100. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Stamp: `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0ac7f87a-63f4-4d74-ba5b-d1444803b100; setid 0ac7f87a-63f4-4d74-ba5b-d1444803b100; NDC 0113-2502). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 2mg. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-c5cd-b-40',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 40 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-c5cd-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['mica-based pearlescent pigment', 'limited', 'mica'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['natural and artificial icy mint cooling flavor', 'limited', 'flavor'], ['natural and artificial icy mint flavor', 'limited', 'flavor'], ['peppermint oil', 'limited', 'limited'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['titanium dioxide', 'high', 'tio2'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 40 count = avoid. Drivers: titanium dioxide. DailyMed setid 0ac7f87a-63f4-4d74-ba5b-d1444803b100. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Stamp: `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0ac7f87a-63f4-4d74-ba5b-d1444803b100; setid 0ac7f87a-63f4-4d74-ba5b-d1444803b100; NDC 0113-2502-58). Package quantity pinned on the opened SPL: 40 count. Active: Nicotine 2mg. Inactive ingredients: acacia, acesulfame potassium, hypromellose, magnesium stearate, mannitol, mica-based pearlescent pigment, microcrystalline cellulose, natural and artificial icy mint cooling flavor, natural and artificial icy mint flavor, peppermint oil, polysorbate 80, propylene glycol, sodium carbonate, sucralose, titanium dioxide, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `mica` → mica → mica-based pearlescent pigment Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-2f22',
    productName: 'GoodSense NICOTINE (Nicotine 2mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-2f22',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['lime oil', 'limited', 'flavor'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial citrus flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense NICOTINE (Nicotine 2mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 632283a5-c617-4759-8933-7dc015e551c7. Inactive ingredients: acacia, acesulfame potassium, calcium polycarbophil, lime oil, magnesium stearate, maltodextrin, mannitol, natural and artificial citrus flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check); `lime oil` → lime oil → flavor Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=632283a5-c617-4759-8933-7dc015e551c7; setid 632283a5-c617-4759-8933-7dc015e551c7; NDC 0113-7969-27). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 2mg. Inactive ingredients: acacia, acesulfame potassium, calcium polycarbophil, lime oil, magnesium stearate, maltodextrin, mannitol, natural and artificial citrus flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) `lime oil` → lime oil → flavor Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-bb29',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-bb29',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial mint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 20 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf; setid 1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf; NDC 0113-0957). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 4mg. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-bb29-27',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-bb29',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial mint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf; setid 1a7cfbdc-53cc-4cd2-86b2-6e27a7979abf; NDC 0113-0957-01). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 4mg. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-2f22-b',
    productName: 'GoodSense Nicotine (Nicotine 4mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-2f22-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['lime oil', 'limited', 'flavor'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial citrus flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 4mg), 20 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 1e2631b6-b99e-4345-840e-9ddd0873a421. Inactive ingredients: acacia, acesulfame potassium, calcium polycarbophil, lime oil, magnesium stearate, maltodextrin, mannitol, natural and artificial citrus flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check); `lime oil` → lime oil → flavor Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e2631b6-b99e-4345-840e-9ddd0873a421; setid 1e2631b6-b99e-4345-840e-9ddd0873a421; NDC 0113-7999-00). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 4mg. Inactive ingredients: acacia, acesulfame potassium, calcium polycarbophil, lime oil, magnesium stearate, maltodextrin, mannitol, natural and artificial citrus flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) `lime oil` → lime oil → flavor Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-aspirin-16c3',
    productName: 'GoodSense Aspirin (Aspirin 81mg), 36 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-aspirin-16c3',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Aspirin', strength: '81mg' }],
    flags: [['corn starch', 'cleared', 'cleared'], ['fd&c yellow no. 6 aluminum lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['saccharin sodium', 'limited', 'saccharinNa']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Aspirin (Aspirin 81mg), 36 count = avoid. Drivers: fd&c yellow no. 6 aluminum lake. DailyMed setid e9fddbc1-11fe-4cf6-8794-1650fa1b32ae. Inactive ingredients: corn starch, fd&c yellow no. 6 aluminum lake, flavors, glucose, saccharin sodium. Stamp: `dextrose excipient` → dextrose excipient → bare glucose Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e9fddbc1-11fe-4cf6-8794-1650fa1b32ae; setid e9fddbc1-11fe-4cf6-8794-1650fa1b32ae; NDC 0113-0467). Same 36 count on the good sense aspirin (71205-442) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=73013074-9c6e-43c7-acde-4d9d8ed0133d; setid 73013074-9c6e-43c7-acde-4d9d8ed0133d; NDC 71205-442-36). Same 36 count on the good sense aspirin (50090-5533) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=baff37ed-663a-45d3-8599-b935da7e5772; setid baff37ed-663a-45d3-8599-b935da7e5772; NDC 50090-5533). Package quantity pinned on the opened SPL: 36 count. Active: Aspirin 81mg. Inactive ingredients: corn starch, fd&c yellow no. 6 aluminum lake, flavors, glucose, saccharin sodium. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose excipient` → dextrose excipient → bare glucose Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-8a46',
    productName: 'GoodSense NICOTINE (Nicotine 2mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-8a46',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['benzaldehyde', 'limited', 'flavor'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['menthol-dl', 'limited', 'flavor'], ['natural and artificial cherry flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense NICOTINE (Nicotine 2mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid d1aa6f5c-3358-48f9-b0ac-5c91ea801a7a. Inactive ingredients: acacia, acesulfame potassium, benzaldehyde, calcium polycarbophil, magnesium stearate, mannitol, menthol-dl, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `benzaldehyde` → benzaldehyde → flavor Caution (Sept 26 #348); `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d1aa6f5c-3358-48f9-b0ac-5c91ea801a7a; setid d1aa6f5c-3358-48f9-b0ac-5c91ea801a7a; NDC 0113-7020-00). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 2mg. Inactive ingredients: acacia, acesulfame potassium, benzaldehyde, calcium polycarbophil, magnesium stearate, mannitol, menthol-dl, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `benzaldehyde` → benzaldehyde → flavor Caution (Sept 26 #348) `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-8a46-b',
    productName: 'GoodSense NICOTINE (Nicotine 4mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-8a46-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '4mg' }],
    flags: [['acacia', 'cleared', 'cleared'], ['acesulfame potassium', 'moderate', 'acek'], ['benzaldehyde', 'limited', 'flavor'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['menthol-dl', 'limited', 'flavor'], ['natural and artificial cherry flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense NICOTINE (Nicotine 4mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 357240fd-adc0-420a-bf79-8f2eef2bc5da. Inactive ingredients: acacia, acesulfame potassium, benzaldehyde, calcium polycarbophil, magnesium stearate, mannitol, menthol-dl, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `benzaldehyde` → benzaldehyde → flavor Caution (Sept 26 #348); `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=357240fd-adc0-420a-bf79-8f2eef2bc5da; setid 357240fd-adc0-420a-bf79-8f2eef2bc5da; NDC 0113-7031-27). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 4mg. Inactive ingredients: acacia, acesulfame potassium, benzaldehyde, calcium polycarbophil, magnesium stearate, mannitol, menthol-dl, natural and artificial cherry flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `benzaldehyde` → benzaldehyde → flavor Caution (Sept 26 #348) `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-bb29-b',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 20 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-bb29-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial mint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 20 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 477689fc-688a-4c76-8c02-35a7a15adc5e. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=477689fc-688a-4c76-8c02-35a7a15adc5e; setid 477689fc-688a-4c76-8c02-35a7a15adc5e; NDC 0113-0734). Package quantity pinned on the opened SPL: 20 count. Active: Nicotine 2mg. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-nicotine-bb29-b-27',
    productName: 'GoodSense Nicotine (Nicotine 2mg), 27 count',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-nicotine-bb29-b',
    audience: ADULT,
    minAge: 12,
    form: 'lozenge',
    productType: OTC,
    actives: [{ name: 'Nicotine', strength: '2mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['calcium polycarbophil', 'limited', 'headerCheck'], ['magnesium stearate', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['natural and artificial mint flavor', 'limited', 'flavor'], ['potassium bicarbonate', 'cleared', 'bicarb'], ['sodium alginate', 'cleared', 'cleared'], ['sodium carbonate', 'cleared', 'bicarb'], ['sucralose', 'moderate', 'sucralose'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Nicotine (Nicotine 2mg), 27 count = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 477689fc-688a-4c76-8c02-35a7a15adc5e. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Stamp: `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=477689fc-688a-4c76-8c02-35a7a15adc5e; setid 477689fc-688a-4c76-8c02-35a7a15adc5e; NDC 0113-0734-01). Package quantity pinned on the opened SPL: 27 count. Active: Nicotine 2mg. Inactive ingredients: acesulfame potassium, calcium polycarbophil, magnesium stearate, mannitol, natural and artificial mint flavor, potassium bicarbonate, sodium alginate, sodium carbonate, sucralose, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `calcium polycarbophil` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-pain-relief-roll-on-0885',
    barcode: '846036009842',
    upcNote:
      'UPC-A 846036009842 is the EAN-13 under the bars on DailyMed image GS_Pain Relief Roll-On IFC_GDS-LDRLR-25_VIEW2 copy.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=38e76fd6-e5fb-493c-e063-6294a90afed4&name=GS_Pain+Relief+Roll-On+IFC_GDS-LDRLR-25_VIEW2+copy.jpg). 2.5 oz (71 g).',
    productName: 'GoodSense Pain Relief Roll On (Lidocaine Hydrochloride 4g per 100g), 71 g',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-pain-relief-roll-on-0885',
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    productType: OTC,
    actives: [{ name: 'Lidocaine Hydrochloride', strength: '4g per 100g' }],
    flags: [['acrylates/c10-30 alkyl acrylate crosspolymer', 'limited', 'acrylate'], ['alcohol denat', 'limited', 'alcohol'], ['aloe barbadensis leaf extract', 'limited', 'aloe'], ['aminomethyl propanol', 'limited', 'amp'], ['c30-45 alkyl cetearyl dimethicone crosspolymer', 'limited', 'c3045'], ['caprylyl methicone', 'limited', 'capMeth'], ['cetearyl alcohol', 'cleared', 'fattyAlc'], ['ceteth-20 phosphate', 'limited', 'ceteth'], ['dicetyl phosphate', 'limited', 'dicetyl'], ['dimethicone', 'cleared', 'dimeth'], ['disodium edta', 'cleared', 'edtaTrace'], ['ethylhexylglycerin', 'limited', 'ehg'], ['glyceryl monostearate', 'cleared', 'gms'], ['methylparaben', 'high', 'paraben'], ['steareth-21', 'limited', 'steareth'], ['water', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Pain Relief Roll On (Lidocaine Hydrochloride 4g per 100g), 71 g = avoid. Drivers: methylparaben. DailyMed setid 38e76fd6-e5fb-493c-e063-6294a90afed4. Inactive ingredients: acrylates/c10-30 alkyl acrylate crosspolymer, alcohol denat, aloe barbadensis leaf extract, aminomethyl propanol, c30-45 alkyl cetearyl dimethicone crosspolymer, caprylyl methicone, cetearyl alcohol, ceteth-20 phosphate, dicetyl phosphate, dimethicone, disodium edta, ethylhexylglycerin, glyceryl monostearate, methylparaben, steareth-21, water. Stamp: `glycerin stearate` → glycerin stearate → GMS / glyceryl monostearate Cleared (Sept 26 #348; not mono- and diglycerides Caution).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38e76fd6-e5fb-493c-e063-6294a90afed4; setid 38e76fd6-e5fb-493c-e063-6294a90afed4; NDC 50804-187-02). Package quantity pinned on the opened SPL: 71 g. Active: Lidocaine Hydrochloride 4g per 100g. Inactive ingredients: acrylates/c10-30 alkyl acrylate crosspolymer, alcohol denat, aloe barbadensis leaf extract, aminomethyl propanol, c30-45 alkyl cetearyl dimethicone crosspolymer, caprylyl methicone, cetearyl alcohol, ceteth-20 phosphate, dicetyl phosphate, dimethicone, disodium edta, ethylhexylglycerin, glyceryl monostearate, methylparaben, steareth-21, water. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `glycerin stearate` → glycerin stearate → GMS / glyceryl monostearate Cleared (Sept 26 #348; not mono- and diglycerides Caution) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-lansoprazole-5143',
    productName: 'GoodSense Lansoprazole (Lansoprazole 15mg), 3 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-lansoprazole-5143',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Lansoprazole', strength: '15mg' }],
    flags: [['ascorbic acid', 'cleared', 'cleared'], ['cetyl alcohol', 'cleared', 'fattyAlc'], ['colloidal silicon dioxide', 'limited', 'sio2'], ['copovidone', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['flavor', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose phthalate', 'limited', 'methacrylic'], ['maize maltodextrin', 'limited', 'maltodextrin'], ['maltitol', 'limited', 'sugarAlcohol'], ['mannitol', 'limited', 'sugarAlcohol'], ['meglumine', 'limited', 'meglumine'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['silicon dioxide', 'limited', 'sio2'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Lansoprazole (Lansoprazole 15mg), 3 count = avoid. Drivers: talc, titanium dioxide. DailyMed setid d86585b7-e146-4f04-9016-412b16e06f55. Inactive ingredients: ascorbic acid, cetyl alcohol, colloidal silicon dioxide, copovidone, crospovidone, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, maltitol, mannitol, meglumine, microcrystalline cellulose, polysorbate 80, propylene glycol, silicon dioxide, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row); `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d86585b7-e146-4f04-9016-412b16e06f55; setid d86585b7-e146-4f04-9016-412b16e06f55; NDC 0113-0116-55). Package quantity pinned on the opened SPL: 3 count. Active: Lansoprazole 15mg. Inactive ingredients: ascorbic acid, cetyl alcohol, colloidal silicon dioxide, copovidone, crospovidone, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, maltitol, mannitol, meglumine, microcrystalline cellulose, polysorbate 80, propylene glycol, silicon dioxide, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row) `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-lansoprazole-5143-14',
    productName: 'GoodSense Lansoprazole (Lansoprazole 15mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-lansoprazole-5143',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Lansoprazole', strength: '15mg' }],
    flags: [['ascorbic acid', 'cleared', 'cleared'], ['cetyl alcohol', 'cleared', 'fattyAlc'], ['colloidal silicon dioxide', 'limited', 'sio2'], ['copovidone', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['flavor', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose phthalate', 'limited', 'methacrylic'], ['maize maltodextrin', 'limited', 'maltodextrin'], ['maltitol', 'limited', 'sugarAlcohol'], ['mannitol', 'limited', 'sugarAlcohol'], ['meglumine', 'limited', 'meglumine'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['polysorbate 80', 'moderate', 'ps80'], ['propylene glycol', 'moderate', 'pg'], ['silicon dioxide', 'limited', 'sio2'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Lansoprazole (Lansoprazole 15mg), 14 count = avoid. Drivers: talc, titanium dioxide. DailyMed setid d86585b7-e146-4f04-9016-412b16e06f55. Inactive ingredients: ascorbic acid, cetyl alcohol, colloidal silicon dioxide, copovidone, crospovidone, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, maltitol, mannitol, meglumine, microcrystalline cellulose, polysorbate 80, propylene glycol, silicon dioxide, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row); `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d86585b7-e146-4f04-9016-412b16e06f55; setid d86585b7-e146-4f04-9016-412b16e06f55; NDC 0113-0116). Package quantity pinned on the opened SPL: 14 count. Active: Lansoprazole 15mg. Inactive ingredients: ascorbic acid, cetyl alcohol, colloidal silicon dioxide, copovidone, crospovidone, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, maltitol, mannitol, meglumine, microcrystalline cellulose, polysorbate 80, propylene glycol, silicon dioxide, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row) `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-644b',
    productName: 'GoodSense Omeprazole (Omeprazole 20mg), 3 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-644b',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20mg' }],
    flags: [['amino methacrylate copolymer', 'limited', 'methacrylic'], ['ascorbic acid', 'cleared', 'cleared'], ['cetyl alcohol', 'cleared', 'fattyAlc'], ['colloidal silicon dioxide', 'limited', 'sio2'], ['crospovidone', 'cleared', 'cleared'], ['ferric oxide', 'limited', 'iron'], ['flavor', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose phthalate', 'limited', 'methacrylic'], ['maize maltodextrin', 'limited', 'maltodextrin'], ['mannitol', 'limited', 'sugarAlcohol'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['propylene glycol', 'moderate', 'pg'], ['silicon dioxide', 'limited', 'sio2'], ['sodium stearate', 'cleared', 'stearate'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Omeprazole (Omeprazole 20mg), 3 count = avoid. Drivers: talc, titanium dioxide. DailyMed setid dcd93796-8904-415d-a379-c4ea590cf544. Inactive ingredients: amino methacrylate copolymer, ascorbic acid, cetyl alcohol, colloidal silicon dioxide, crospovidone, ferric oxide, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, mannitol, microcrystalline cellulose, propylene glycol, silicon dioxide, sodium stearate, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `amino methacrylate copolymer` → amino methacrylate copolymer → methacrylic enteric Caution (Sept 26 #348); `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row); `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dcd93796-8904-415d-a379-c4ea590cf544; setid dcd93796-8904-415d-a379-c4ea590cf544; NDC 0113-0520-55). Package quantity pinned on the opened SPL: 3 count. Active: Omeprazole 20mg. Inactive ingredients: amino methacrylate copolymer, ascorbic acid, cetyl alcohol, colloidal silicon dioxide, crospovidone, ferric oxide, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, mannitol, microcrystalline cellulose, propylene glycol, silicon dioxide, sodium stearate, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `amino methacrylate copolymer` → amino methacrylate copolymer → methacrylic enteric Caution (Sept 26 #348) `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row) `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-644b-14',
    productName: 'GoodSense Omeprazole (Omeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-644b',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20mg' }],
    flags: [['amino methacrylate copolymer', 'limited', 'methacrylic'], ['ascorbic acid', 'cleared', 'cleared'], ['cetyl alcohol', 'cleared', 'fattyAlc'], ['colloidal silicon dioxide', 'limited', 'sio2'], ['crospovidone', 'cleared', 'cleared'], ['ferric oxide', 'limited', 'iron'], ['flavor', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose phthalate', 'limited', 'methacrylic'], ['maize maltodextrin', 'limited', 'maltodextrin'], ['mannitol', 'limited', 'sugarAlcohol'], ['microcrystalline cellulose', 'cleared', 'cleared'], ['propylene glycol', 'moderate', 'pg'], ['silicon dioxide', 'limited', 'sio2'], ['sodium stearate', 'cleared', 'stearate'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose', 'moderate', 'sucralose'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Omeprazole (Omeprazole 20mg), 14 count = avoid. Drivers: talc, titanium dioxide. DailyMed setid dcd93796-8904-415d-a379-c4ea590cf544. Inactive ingredients: amino methacrylate copolymer, ascorbic acid, cetyl alcohol, colloidal silicon dioxide, crospovidone, ferric oxide, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, mannitol, microcrystalline cellulose, propylene glycol, silicon dioxide, sodium stearate, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `amino methacrylate copolymer` → amino methacrylate copolymer → methacrylic enteric Caution (Sept 26 #348); `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row); `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dcd93796-8904-415d-a379-c4ea590cf544; setid dcd93796-8904-415d-a379-c4ea590cf544; NDC 0113-0520). Package quantity pinned on the opened SPL: 14 count. Active: Omeprazole 20mg. Inactive ingredients: amino methacrylate copolymer, ascorbic acid, cetyl alcohol, colloidal silicon dioxide, crospovidone, ferric oxide, flavor, hypromellose, hypromellose phthalate, maize maltodextrin, mannitol, microcrystalline cellulose, propylene glycol, silicon dioxide, sodium stearate, sodium stearyl fumarate, sorbitol, sucralose, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `amino methacrylate copolymer` → amino methacrylate copolymer → methacrylic enteric Caution (Sept 26 #348) `hypromellose phthalate` → hypromellose phthalate → enteric polymer Caution (Sept 26 #348; methacrylic row, not PVAP row) `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-c62e',
    productName: 'GoodSense Omeprazole (Omeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-c62e',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20mg' }],
    flags: [['carnauba wax', 'limited', 'carnauba'], ['ferric oxide red', 'limited', 'iron'], ['ferric oxide yellow', 'limited', 'iron'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose acetate succinate', 'limited', 'methacrylic'], ['lactose monohydrate', 'cleared', 'cleared'], ['monoethanolamine', 'limited', 'mea'], ['propylene glycol', 'moderate', 'pg'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sodium starch glycolate', 'cleared', 'cleared'], ['sodium stearate', 'cleared', 'stearate'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Omeprazole (Omeprazole 20mg), 14 count = avoid. Drivers: talc, titanium dioxide. DailyMed setid 11dfbf6c-59bf-4a30-b627-f49ccd31c0d0. Inactive ingredients: carnauba wax, ferric oxide red, ferric oxide yellow, hypromellose, hypromellose acetate succinate, lactose monohydrate, monoethanolamine, propylene glycol, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, talc, titanium dioxide, triethyl citrate. Stamp: `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC); `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348); `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=11dfbf6c-59bf-4a30-b627-f49ccd31c0d0; setid 11dfbf6c-59bf-4a30-b627-f49ccd31c0d0; NDC 0113-0915). Package quantity pinned on the opened SPL: 14 count. Active: Omeprazole 20mg. Inactive ingredients: carnauba wax, ferric oxide red, ferric oxide yellow, hypromellose, hypromellose acetate succinate, lactose monohydrate, monoethanolamine, propylene glycol, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC) `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348) `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-effervescent-cold-relief-81e2',
    barcode: '846036001631',
    upcNote:
      'UPC-A 846036001631 is the EAN-13 under the bars on DailyMed image 87360 GS C2 Good Sense Cold 20_APPRVL.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=cd25e250-bb8b-7e83-e053-2a95a90a2639&name=87360+GS+C2+Good+Sense+Cold+20_APPRVL.jpg). 10 tablets, NDC 50804-873-20.',
    productName: 'GoodSense Effervescent Cold Relief (Chlorpheniramine Maleate 2mg / Aspirin 325mg / Phenylephrine Bitartrate 7.8mg), 10 count',
    category: 'Allergies',
    formulaId: 'goodsense-b112-effervescent-cold-relief-81e2',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Chlorpheniramine Maleate', strength: '2mg' }, { name: 'Aspirin', strength: '325mg' }, { name: 'Phenylephrine Bitartrate', strength: '7.8mg' }],
    flags: [['acesulfame potassium', 'moderate', 'acek'], ['aspartame', 'high', 'aspartame'], ['citric acid', 'cleared', 'cleared'], ['docusate sodium', 'limited', 'headerCheck'], ['flavors', 'limited', 'flavor'], ['mannitol', 'limited', 'sugarAlcohol'], ['povidone', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium bicarbonate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Effervescent Cold Relief (Chlorpheniramine Maleate 2mg / Aspirin 325mg / Phenylephrine Bitartrate 7.8mg), 10 count = avoid. Drivers: aspartame. DailyMed setid cd25e250-bb8b-7e83-e053-2a95a90a2639. Inactive ingredients: acesulfame potassium, aspartame, citric acid, docusate sodium, flavors, mannitol, povidone, sodium benzoate, sodium bicarbonate. Stamp: `docusate sodium` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cd25e250-bb8b-7e83-e053-2a95a90a2639; setid cd25e250-bb8b-7e83-e053-2a95a90a2639; NDC 50804-873-20). Package quantity pinned on the opened SPL: 10 count. Active: Chlorpheniramine Maleate 2mg / Aspirin 325mg / Phenylephrine Bitartrate 7.8mg. Inactive ingredients: acesulfame potassium, aspartame, citric acid, docusate sodium, flavors, mannitol, povidone, sodium benzoate, sodium bicarbonate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `docusate sodium` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-sleep-time-c1b4',
    productName: 'GoodSense Sleep Time (Diphenhydramine Hydrochloride 50mg), 177 mL',
    category: 'Sleep',
    formulaId: 'goodsense-b112-sleep-time-c1b4',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Hydrochloride', strength: '50mg' }],
    flags: [['alcohol', 'limited', 'alcohol'], ['citric acid', 'cleared', 'citric'], ['fd&c blue #1', 'high', 'dye'], ['fd&c red #40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['high fructose corn syrup', 'limited', 'hfcs'], ['poloxamer 407', 'limited', 'poloxamer'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['saccharin sodium', 'limited', 'saccharinNa'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Sleep Time (Diphenhydramine Hydrochloride 50mg), 177 mL = avoid. Drivers: fd&c blue #1, fd&c red #40. DailyMed setid 164200a9-b1f8-44c9-8598-a7dff5020e9d. Inactive ingredients: alcohol, citric acid, fd&c blue #1, fd&c red #40, flavor, high fructose corn syrup, poloxamer 407, propylene glycol, purified water, saccharin sodium, sodium benzoate, sodium citrate. Stamp: `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=164200a9-b1f8-44c9-8598-a7dff5020e9d; setid 164200a9-b1f8-44c9-8598-a7dff5020e9d; NDC 0113-0186-30). Package quantity pinned on the opened SPL: 177 mL. Active: Diphenhydramine Hydrochloride 50mg. Inactive ingredients: alcohol, citric acid, fd&c blue #1, fd&c red #40, flavor, high fructose corn syrup, poloxamer 407, propylene glycol, purified water, saccharin sodium, sodium benzoate, sodium citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-sleep-time-c1b4-355-ml',
    barcode: '301130186405',
    upcNote:
      'UPC-A 301130186405 is the upc field on the Thrifty White product JSON for Good Sense Sleep Time Liquid, Berry - 12 oz, the 355 mL pack (https://shop.thriftywhite.com/good-sense-sleep-time-liquid-berry-12-oz/).',
    productName: 'GoodSense Sleep Time (Diphenhydramine Hydrochloride 50mg), 355 mL',
    category: 'Sleep',
    formulaId: 'goodsense-b112-sleep-time-c1b4',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Diphenhydramine Hydrochloride', strength: '50mg' }],
    flags: [['alcohol', 'limited', 'alcohol'], ['citric acid', 'cleared', 'citric'], ['fd&c blue #1', 'high', 'dye'], ['fd&c red #40', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['high fructose corn syrup', 'limited', 'hfcs'], ['poloxamer 407', 'limited', 'poloxamer'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['saccharin sodium', 'limited', 'saccharinNa'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Sleep Time (Diphenhydramine Hydrochloride 50mg), 355 mL = avoid. Drivers: fd&c blue #1, fd&c red #40. DailyMed setid 164200a9-b1f8-44c9-8598-a7dff5020e9d. Inactive ingredients: alcohol, citric acid, fd&c blue #1, fd&c red #40, flavor, high fructose corn syrup, poloxamer 407, propylene glycol, purified water, saccharin sodium, sodium benzoate, sodium citrate. Stamp: `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=164200a9-b1f8-44c9-8598-a7dff5020e9d; setid 164200a9-b1f8-44c9-8598-a7dff5020e9d; NDC 0113-0186-40). Package quantity pinned on the opened SPL: 355 mL. Active: Diphenhydramine Hydrochloride 50mg. Inactive ingredients: alcohol, citric acid, fd&c blue #1, fd&c red #40, flavor, high fructose corn syrup, poloxamer 407, propylene glycol, purified water, saccharin sodium, sodium benzoate, sodium citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `poloxamer 407` → poloxamer 407 → poloxamer family Caution with poloxamer 182 (Sept 26 #348; not High) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-arthritis-pain-99d8',
    productName: 'GoodSense Arthritis pain (Diclofenac Sodium 10mg), 100 g',
    category: 'Pain & Fever',
    formulaId: 'goodsense-b112-arthritis-pain-99d8',
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    productType: OTC,
    actives: [{ name: 'Diclofenac Sodium', strength: '10mg' }],
    flags: [['carbomer homopolymer type c', 'cleared', 'cleared'], ['cocoyl caprylocaprate', 'cleared', 'cocoyl'], ['fragrance', 'limited', 'fragrance'], ['isopropyl alcohol', 'limited', 'alcohol'], ['mineral oil', 'limited', 'mineralOil'], ['polyoxyl 20 cetostearyl ether', 'limited', 'poe'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['strong ammonia solution', 'limited', 'ammoniaStrong']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Arthritis pain (Diclofenac Sodium 10mg), 100 g = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 5f1ca9c1-c7fe-4a91-af5e-dc22b175f083. Inactive ingredients: carbomer homopolymer type c, cocoyl caprylocaprate, fragrance, isopropyl alcohol, mineral oil, polyoxyl 20 cetostearyl ether, propylene glycol, purified water, strong ammonia solution. Stamp: `polyoxyl 20 cetostearyl ether` → polyoxyl 20 cetostearyl ether → POE cetyl ether Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5f1ca9c1-c7fe-4a91-af5e-dc22b175f083; setid 5f1ca9c1-c7fe-4a91-af5e-dc22b175f083; NDC 50090-7250). Package quantity pinned on the opened SPL: 100 g. Active: Diclofenac Sodium 10mg. Inactive ingredients: carbomer homopolymer type c, cocoyl caprylocaprate, fragrance, isopropyl alcohol, mineral oil, polyoxyl 20 cetostearyl ether, propylene glycol, purified water, strong ammonia solution. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `polyoxyl 20 cetostearyl ether` → polyoxyl 20 cetostearyl ether → POE cetyl ether Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-esomeprazole-magnesium-9c8f',
    productName: 'GoodSense Esomeprazole Magnesium (Esomeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-esomeprazole-magnesium-9c8f',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Esomeprazole', strength: '20mg' }],
    flags: [['fd&c blue no. 1', 'high', 'dye'], ['fd&c red no. 3', 'high', 'dye'], ['ferric oxide', 'limited', 'iron'], ['gelatin', 'cleared', 'cleared'], ['glyceryl monostearate', 'cleared', 'cleared'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['meglumine', 'limited', 'meglumine'], ['methacrylic acid and ethyl acrylate copolymer dispersion', 'limited', 'methacrylic'], ['polyethylene glycol', 'moderate', 'peg'], ['polysorbate 80', 'moderate', 'ps80'], ['shellac', 'cleared', 'cleared'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Esomeprazole Magnesium (Esomeprazole 20mg), 14 count = avoid. Drivers: fd&c blue no. 1, fd&c red no. 3, talc, titanium dioxide. DailyMed setid 4a89b4b5-5c42-44ee-98a9-e26a237aaef7. Inactive ingredients: fd&c blue no. 1, fd&c red no. 3, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid and ethyl acrylate copolymer dispersion, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4a89b4b5-5c42-44ee-98a9-e26a237aaef7; setid 4a89b4b5-5c42-44ee-98a9-e26a237aaef7; NDC 0113-0898). Package quantity pinned on the opened SPL: 14 count. Active: Esomeprazole 20mg. Inactive ingredients: fd&c blue no. 1, fd&c red no. 3, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid and ethyl acrylate copolymer dispersion, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-esomeprazole-magnesium-35c8',
    productName: 'GoodSense Esomeprazole magnesium (Esomeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-esomeprazole-magnesium-35c8',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Esomeprazole', strength: '20mg' }],
    flags: [['fd&c blue no. 1', 'high', 'dye'], ['fd&c blue no. 1 aluminum lake', 'high', 'dye'], ['fd&c red no. 3', 'high', 'dye'], ['ferric oxide', 'limited', 'iron'], ['gelatin', 'cleared', 'cleared'], ['glyceryl monostearate', 'cleared', 'cleared'], ['hypromellose', 'cleared', 'cleared'], ['magnesium stearate', 'cleared', 'cleared'], ['meglumine', 'limited', 'meglumine'], ['methacrylic acid and ethyl acrylate copolymer dispersion', 'limited', 'methacrylic'], ['polyethylene glycol', 'moderate', 'peg'], ['polysorbate 80', 'moderate', 'ps80'], ['shellac', 'cleared', 'cleared'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Esomeprazole magnesium (Esomeprazole 20mg), 14 count = avoid. Drivers: fd&c blue no. 1, fd&c blue no. 1 aluminum lake, fd&c red no. 3, talc, titanium dioxide. DailyMed setid e54f2cc9-1d5f-4f0a-8bcf-bd5b917d98ec. Inactive ingredients: fd&c blue no. 1, fd&c blue no. 1 aluminum lake, fd&c red no. 3, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid and ethyl acrylate copolymer dispersion, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Stamp: `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e54f2cc9-1d5f-4f0a-8bcf-bd5b917d98ec; setid e54f2cc9-1d5f-4f0a-8bcf-bd5b917d98ec; NDC 0113-0651). Package quantity pinned on the opened SPL: 14 count. Active: Esomeprazole 20mg. Inactive ingredients: fd&c blue no. 1, fd&c blue no. 1 aluminum lake, fd&c red no. 3, ferric oxide, gelatin, glyceryl monostearate, hypromellose, magnesium stearate, meglumine, methacrylic acid and ethyl acrylate copolymer dispersion, polyethylene glycol, polysorbate 80, shellac, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-delayed-release-d05d',
    productName: 'GoodSense Omeprazole delayed release (Omeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-delayed-release-d05d',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20mg' }],
    flags: [['carnauba wax', 'limited', 'carnauba'], ['fd&c blue #1/brilliant blue fcf aluminum lake', 'high', 'dye'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose acetate succinate', 'limited', 'methacrylic'], ['lactose monohydrate', 'cleared', 'cleared'], ['menthol', 'limited', 'flavor'], ['monoethanolamine', 'limited', 'mea'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sodium starch glycolate', 'cleared', 'cleared'], ['sodium stearate', 'cleared', 'stearate'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sucralose', 'moderate', 'sucralose'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triacetin', 'cleared', 'cleared'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Omeprazole delayed release (Omeprazole 20mg), 14 count = avoid. Drivers: fd&c blue #1/brilliant blue fcf aluminum lake, talc, titanium dioxide. DailyMed setid 38082e59-c509-4be5-b29c-33a97565df1c. Inactive ingredients: carnauba wax, fd&c blue #1/brilliant blue fcf aluminum lake, hypromellose, hypromellose acetate succinate, lactose monohydrate, menthol, monoethanolamine, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, sucralose, talc, titanium dioxide, triacetin, triethyl citrate. Stamp: `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC); `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348); `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38082e59-c509-4be5-b29c-33a97565df1c; setid 38082e59-c509-4be5-b29c-33a97565df1c; NDC 0113-1803-01). Package quantity pinned on the opened SPL: 14 count. Active: Omeprazole 20mg. Inactive ingredients: carnauba wax, fd&c blue #1/brilliant blue fcf aluminum lake, hypromellose, hypromellose acetate succinate, lactose monohydrate, menthol, monoethanolamine, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, sucralose, talc, titanium dioxide, triacetin, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC) `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348) `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-lansoprazole-60b5',
    productName: 'GoodSense Lansoprazole (Lansoprazole 15mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-lansoprazole-60b5',
    audience: ADULT,
    minAge: 12,
    form: 'capsule',
    productType: OTC,
    actives: [{ name: 'Lansoprazole', strength: '15mg' }],
    flags: [['d&c red no. 28', 'high', 'dye'], ['d&c yellow no. 10', 'high', 'dye'], ['fd&c blue no. 1', 'high', 'dye'], ['fd&c red no. 40', 'high', 'dye'], ['gelatin', 'cleared', 'cleared'], ['hydroxypropyl cellulose', 'cleared', 'hpc'], ['hypromellose', 'cleared', 'cleared'], ['mannitol', 'limited', 'sugarAlcohol'], ['meglumine', 'limited', 'meglumine'], ['methacrylic acid copolymer', 'limited', 'methacrylic'], ['pharmaceutical ink', 'limited', 'ink'], ['polyethylene glycol', 'moderate', 'peg'], ['polysorbate 80', 'moderate', 'ps80'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sugar spheres', 'limited', 'sugarSpheres'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Lansoprazole (Lansoprazole 15mg), 14 count = avoid. Drivers: d&c red no. 28, d&c yellow no. 10, fd&c blue no. 1, fd&c red no. 40, talc, titanium dioxide. DailyMed setid 91d69826-df5c-47a2-b852-3083629d1893. Inactive ingredients: d&c red no. 28, d&c yellow no. 10, fd&c blue no. 1, fd&c red no. 40, gelatin, hydroxypropyl cellulose, hypromellose, mannitol, meglumine, methacrylic acid copolymer, pharmaceutical ink, polyethylene glycol, polysorbate 80, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide. Stamp: `meglumine` → meglumine → Caution (Sept 26 #348).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=91d69826-df5c-47a2-b852-3083629d1893; setid 91d69826-df5c-47a2-b852-3083629d1893; NDC 0113-1114). Package quantity pinned on the opened SPL: 14 count. Active: Lansoprazole 15mg. Inactive ingredients: d&c red no. 28, d&c yellow no. 10, fd&c blue no. 1, fd&c red no. 40, gelatin, hydroxypropyl cellulose, hypromellose, mannitol, meglumine, methacrylic acid copolymer, pharmaceutical ink, polyethylene glycol, polysorbate 80, sodium lauryl sulfate, sugar spheres, talc, titanium dioxide. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `meglumine` → meglumine → Caution (Sept 26 #348) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-omeprazole-172a',
    productName: 'GoodSense Omeprazole (Omeprazole 20mg), 14 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-omeprazole-172a',
    audience: ADULT,
    minAge: 12,
    form: 'tablet',
    productType: OTC,
    actives: [{ name: 'Omeprazole', strength: '20mg' }],
    flags: [['benzyl alcohol', 'limited', 'benzyl'], ['carmine', 'limited', 'carmine'], ['carnauba wax', 'limited', 'carnauba'], ['fd&c blue #2/indigo carmine aluminum lake', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['hypromellose', 'cleared', 'cleared'], ['hypromellose acetate succinate', 'limited', 'methacrylic'], ['lactose monohydrate', 'cleared', 'cleared'], ['menthol', 'limited', 'flavor'], ['modified starch', 'limited', 'modStarch'], ['monoethanolamine', 'limited', 'mea'], ['polyethylene glycol 3350', 'moderate', 'peg'], ['sodium lauryl sulfate', 'limited', 'sls'], ['sodium starch glycolate', 'cleared', 'cleared'], ['sodium stearate', 'cleared', 'stearate'], ['sodium stearyl fumarate', 'cleared', 'cleared'], ['sucralose', 'moderate', 'sucralose'], ['talc', 'high', 'talc'], ['titanium dioxide', 'high', 'tio2'], ['triacetin', 'cleared', 'cleared'], ['triethyl citrate', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Omeprazole (Omeprazole 20mg), 14 count = avoid. Drivers: fd&c blue #2/indigo carmine aluminum lake, talc, titanium dioxide. DailyMed setid db333c49-2c3e-4ade-a202-7d4499205fc4. Inactive ingredients: benzyl alcohol, carmine, carnauba wax, fd&c blue #2/indigo carmine aluminum lake, flavor, hypromellose, hypromellose acetate succinate, lactose monohydrate, menthol, modified starch, monoethanolamine, polyethylene glycol 3350, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, sucralose, talc, titanium dioxide, triacetin, triethyl citrate. Stamp: `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC); `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348); `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db333c49-2c3e-4ade-a202-7d4499205fc4; setid db333c49-2c3e-4ade-a202-7d4499205fc4; NDC 0113-1723). Package quantity pinned on the opened SPL: 14 count. Active: Omeprazole 20mg. Inactive ingredients: benzyl alcohol, carmine, carnauba wax, fd&c blue #2/indigo carmine aluminum lake, flavor, hypromellose, hypromellose acetate succinate, lactose monohydrate, menthol, modified starch, monoethanolamine, polyethylene glycol 3350, sodium lauryl sulfate, sodium starch glycolate, sodium stearate, sodium stearyl fumarate, sucralose, talc, titanium dioxide, triacetin, triethyl citrate. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `hypromellose acetate succinate` → hypromellose acetate succinate → enteric polymer Caution (Sept 26 #348; not Cleared HPC/HPMC) `monoethanolamine` → monoethanolamine → Caution (Sept 26 #348) `sodium stearate` → sodium stearate → stearate family Cleared (Sept 26 #348; Mg stearate / calcium laurate) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-product-7da9',
    productName: 'GoodSense Product (Loratadine 5mg), 120 mL',
    category: 'Allergies',
    formulaId: 'goodsense-b112-product-7da9',
    audience: KIDS,
    minAge: 2,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Loratadine', strength: '5mg' }],
    flags: [['glycerin', 'cleared', 'cleared'], ['grape flavor', 'limited', 'flavor'], ['maltitol solution', 'limited', 'maltitolSol'], ['masking agent', 'limited', 'flavor'], ['phosphoric acid', 'limited', 'phosphoric'], ['polyethylene glycol', 'moderate', 'peg'], ['propylene glycol', 'moderate', 'pg'], ['purified water', 'cleared', 'cleared'], ['sodium benzoate', 'limited', 'benzoate'], ['sodium metabisulfite', 'limited', 'sulfite'], ['sodium phosphate monobasic dihydrate', 'cleared', 'phosphate'], ['sorbitol', 'limited', 'sugarAlcohol'], ['sucralose powder', 'moderate', 'sucralose']],
    verdict: 'caution',
    note: 'DRAFT: GoodSense Product (Loratadine 5mg), 120 mL = caution. No High. Grade follows the Limited or Moderate inactive. DailyMed setid 1cd1d710-0c4d-49ef-8b7d-daac8597b2a9. Inactive ingredients: glycerin, grape flavor, maltitol solution, masking agent, phosphoric acid, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium metabisulfite, sodium phosphate monobasic dihydrate, sorbitol, sucralose powder. Stamp: `masking agent` → masking agent → unspecified flavor Caution (Sept 26 #348); `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1cd1d710-0c4d-49ef-8b7d-daac8597b2a9; setid 1cd1d710-0c4d-49ef-8b7d-daac8597b2a9; NDC 50804-092). Package quantity pinned on the opened SPL: 120 mL. Active: Loratadine 5mg. Inactive ingredients: glycerin, grape flavor, maltitol solution, masking agent, phosphoric acid, polyethylene glycol, propylene glycol, purified water, sodium benzoate, sodium metabisulfite, sodium phosphate monobasic dihydrate, sorbitol, sucralose powder. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `masking agent` → masking agent → unspecified flavor Caution (Sept 26 #348) `phosphoric acid` → phosphoric acid → Caution (Sept 26 #348; not the phosphate-salt Cleared class) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-extra-strength-antacid-74c0',
    productName: 'GoodSense Extra Strength Antacid (Calcium Carbonate 750mg), 96 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-extra-strength-antacid-74c0',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '750mg' }],
    flags: [['adipic acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['fd&c blue 1 lake', 'high', 'dye'], ['fd&c red 40 lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Extra Strength Antacid (Calcium Carbonate 750mg), 96 count = avoid. Drivers: fd&c blue 1 lake, fd&c red 40 lake, talc. DailyMed setid 2fcdeb06-17de-49d8-97bb-8d31e1c0c61f. Inactive ingredients: adipic acid, corn starch, crospovidone, fd&c blue 1 lake, fd&c red 40 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2fcdeb06-17de-49d8-97bb-8d31e1c0c61f; setid 2fcdeb06-17de-49d8-97bb-8d31e1c0c61f; NDC 50804-129-22). Same 96 count on the Goodsense Extra Strength Antacid (50804-151) label (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=193a1805-9f57-29cd-e063-6394a90ab99f; setid 193a1805-9f57-29cd-e063-6394a90ab99f; NDC 50804-151-22). Package quantity pinned on the opened SPL: 96 count. Active: Calcium Carbonate 750mg. Inactive ingredients: adipic acid, corn starch, crospovidone, fd&c blue 1 lake, fd&c red 40 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-ultra-strength-antacid-74c0',
    productName: 'GoodSense Ultra Strength Antacid (Calcium Carbonate 1000mg), 72 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-ultra-strength-antacid-74c0',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '1000mg' }],
    flags: [['adipic acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['fd&c blue 1 lake', 'high', 'dye'], ['fd&c red 40 lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ultra Strength Antacid (Calcium Carbonate 1000mg), 72 count = avoid. Drivers: fd&c blue 1 lake, fd&c red 40 lake, talc. DailyMed setid 492deace-7ea1-4fe3-a4c7-b2c6f195d68c. Inactive ingredients: adipic acid, corn starch, crospovidone, fd&c blue 1 lake, fd&c red 40 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=492deace-7ea1-4fe3-a4c7-b2c6f195d68c; setid 492deace-7ea1-4fe3-a4c7-b2c6f195d68c; NDC 50804-175-68). Package quantity pinned on the opened SPL: 72 count. Active: Calcium Carbonate 1000mg. Inactive ingredients: adipic acid, corn starch, crospovidone, fd&c blue 1 lake, fd&c red 40 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-ultra-strength-antacid-peppermint-0eb5',
    productName: 'GoodSense Ultra Strength Antacid Peppermint (Calcium Carbonate 1000mg), 72 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-ultra-strength-antacid-peppermint-0eb5',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '1000mg' }],
    flags: [['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['flavor', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ultra Strength Antacid Peppermint (Calcium Carbonate 1000mg), 72 count = avoid. Drivers: talc. DailyMed setid 04950b56-7760-4b6c-8110-86b6a3f795b4. Inactive ingredients: corn starch, crospovidone, flavor, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04950b56-7760-4b6c-8110-86b6a3f795b4; setid 04950b56-7760-4b6c-8110-86b6a3f795b4; NDC 50804-176-68). Package quantity pinned on the opened SPL: 72 count. Active: Calcium Carbonate 1000mg. Inactive ingredients: corn starch, crospovidone, flavor, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-regular-strength-antacid-peppermint-0eb5',
    barcode: '846036008449',
    upcNote:
      'UPC-A 846036008449 is the upc field on the Thrifty White product JSON for Good Sense Antacid RS Chew Tablets, Peppermint - 150 ct (https://shop.thriftywhite.com/good-sense-antacid-rs-chew-tablets-peppermint-150-ct/).',
    productName: 'GoodSense Regular Strength Antacid Peppermint (Calcium Carbonate 500mg), 150 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-regular-strength-antacid-peppermint-0eb5',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '500mg' }],
    flags: [['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['flavor', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Regular Strength Antacid Peppermint (Calcium Carbonate 500mg), 150 count = avoid. Drivers: talc. DailyMed setid 32c04f3e-59f3-44aa-ad92-672444982710. Inactive ingredients: corn starch, crospovidone, flavor, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=32c04f3e-59f3-44aa-ad92-672444982710; setid 32c04f3e-59f3-44aa-ad92-672444982710; NDC 50804-113-17). Package quantity pinned on the opened SPL: 150 count. Active: Calcium Carbonate 500mg. Inactive ingredients: corn starch, crospovidone, flavor, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-ultra-strength-antacid-assorted-frui-e6fb',
    barcode: '846036008456',
    upcNote:
      'UPC-A 846036008456 is the upc field on the Thrifty White product JSON for Good Sense Antacid Ultra Strength Chewable Tablets, Asst Fruit - 72 ct (https://shop.thriftywhite.com/good-sense-antacid-ultra-strength-chewable-tablets-asst-fruit-72-ct/).',
    productName: 'GoodSense Ultra Strength Antacid Assorted Fruit (Calcium Carbonate 1000mg), 72 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-ultra-strength-antacid-assorted-frui-e6fb',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '1000mg' }],
    flags: [['adipic acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['d&c red 27 lake', 'high', 'dye'], ['d&c red 30 lake', 'high', 'dye'], ['d&c yellow 10 lake', 'high', 'dye'], ['fd&c blue 1 lake', 'high', 'dye'], ['fd&c yellow 6 lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Ultra Strength Antacid Assorted Fruit (Calcium Carbonate 1000mg), 72 count = avoid. Drivers: d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, talc. DailyMed setid ad4d51f6-b55b-45db-b034-fb3da54fbe99. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad4d51f6-b55b-45db-b034-fb3da54fbe99; setid ad4d51f6-b55b-45db-b034-fb3da54fbe99; NDC 50804-171-68). Package quantity pinned on the opened SPL: 72 count. Active: Calcium Carbonate 1000mg. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-extra-strength-antacid-assorted-frui-e6fb',
    barcode: '846036008463',
    upcNote:
      'UPC-A 846036008463 is the upc field on the Thrifty White product JSON for Good Sense Antacid XS Chewable Tablets, Asst Fruit - 96 ct (https://shop.thriftywhite.com/good-sense-antacid-xs-chewable-tablets-asst-fruit-96-ct/).',
    productName: 'GoodSense Extra Strength Antacid Assorted Fruit (Calcium Carbonate 750mg), 96 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-extra-strength-antacid-assorted-frui-e6fb',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '750mg' }],
    flags: [['adipic acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['d&c red 27 lake', 'high', 'dye'], ['d&c red 30 lake', 'high', 'dye'], ['d&c yellow 10 lake', 'high', 'dye'], ['fd&c blue 1 lake', 'high', 'dye'], ['fd&c yellow 6 lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Extra Strength Antacid Assorted Fruit (Calcium Carbonate 750mg), 96 count = avoid. Drivers: d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, talc. DailyMed setid ae6270fc-0f8d-4bba-8f12-adba3f07f7c5. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae6270fc-0f8d-4bba-8f12-adba3f07f7c5; setid ae6270fc-0f8d-4bba-8f12-adba3f07f7c5; NDC 50804-127-22). Package quantity pinned on the opened SPL: 96 count. Active: Calcium Carbonate 750mg. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-maximum-strength-stomach-relief-528-2970',
    productName: 'GoodSense Maximum strength Stomach Relief 528 (Bismuth Subsalicylate 1050mg), 236 mL',
    category: 'Digestive',
    formulaId: 'goodsense-b112-maximum-strength-stomach-relief-528-2970',
    audience: ADULT,
    minAge: 12,
    form: 'liquid',
    productType: OTC,
    actives: [{ name: 'Bismuth Subsalicylate', strength: '1050mg' }],
    flags: [['benzoic acid', 'limited', 'benzoic'], ['d&c red # 22', 'high', 'dye'], ['d&c red # 28', 'high', 'dye'], ['flavor', 'limited', 'flavor'], ['hydroxyethyl cellulose', 'cleared', 'cleared'], ['potassium hydroxide', 'limited', 'koh'], ['purified water', 'cleared', 'cleared'], ['saccharin sodium', 'limited', 'saccharinNa'], ['salicylic acid', 'limited', 'headerCheck'], ['simethicone', 'limited', 'simethicone'], ['xanthan gum', 'cleared', 'cleared']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Maximum strength Stomach Relief 528 (Bismuth Subsalicylate 1050mg), 236 mL = avoid. Drivers: d&c red # 22, d&c red # 28. DailyMed setid 19a4191a-6196-f8ac-e063-6394a90a47ab. Inactive ingredients: benzoic acid, d&c red # 22, d&c red # 28, flavor, hydroxyethyl cellulose, potassium hydroxide, purified water, saccharin sodium, salicylic acid, simethicone, xanthan gum. Stamp: `salicylic acid` → inactive header → Caution (Sept 26 #348 header check).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=19a4191a-6196-f8ac-e063-6394a90a47ab; setid 19a4191a-6196-f8ac-e063-6394a90a47ab; NDC 50804-154-04). Package quantity pinned on the opened SPL: 236 mL. Active: Bismuth Subsalicylate 1050mg. Inactive ingredients: benzoic acid, d&c red # 22, d&c red # 28, flavor, hydroxyethyl cellulose, potassium hydroxide, purified water, saccharin sodium, salicylic acid, simethicone, xanthan gum. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `salicylic acid` → inactive header → Caution (Sept 26 #348 header check) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  },
  {
    id: 'goodsense-b112-regular-strength-antacid-e6fb',
    barcode: '846036008432',
    upcNote:
      'UPC-A 846036008432 is the EAN-13 under the bars on DailyMed image gs-126.jpg (https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=53de9018-fbe4-425a-85f6-ebf08d108730&name=gs-126.jpg). 150 chewable tablets.',
    productName: 'GoodSense Regular Strength Antacid (Calcium Carbonate 500mg), 150 count',
    category: 'Digestive',
    formulaId: 'goodsense-b112-regular-strength-antacid-e6fb',
    audience: ADULT,
    minAge: 12,
    form: 'chewable tablet',
    productType: OTC,
    actives: [{ name: 'Calcium Carbonate', strength: '500mg' }],
    flags: [['adipic acid', 'cleared', 'cleared'], ['corn starch', 'cleared', 'cleared'], ['crospovidone', 'cleared', 'cleared'], ['d&c red 27 lake', 'high', 'dye'], ['d&c red 30 lake', 'high', 'dye'], ['d&c yellow 10 lake', 'high', 'dye'], ['fd&c blue 1 lake', 'high', 'dye'], ['fd&c yellow 6 lake', 'high', 'dye'], ['flavors', 'limited', 'flavor'], ['glucose', 'limited', 'glucose'], ['magnesium stearate', 'cleared', 'cleared'], ['maltodextrin', 'limited', 'maltodextrin'], ['sucrose', 'limited', 'sucrose'], ['talc', 'high', 'talc']],
    verdict: 'avoid',
    note: 'DRAFT: GoodSense Regular Strength Antacid (Calcium Carbonate 500mg), 150 count = avoid. Drivers: d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, talc. DailyMed setid 53de9018-fbe4-425a-85f6-ebf08d108730. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Stamp: `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose).',
    cite: 'DailyMed SPL (https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=53de9018-fbe4-425a-85f6-ebf08d108730; setid 53de9018-fbe4-425a-85f6-ebf08d108730; NDC 50804-112-17). Package quantity pinned on the opened SPL: 150 count. Active: Calcium Carbonate 500mg. Inactive ingredients: adipic acid, corn starch, crospovidone, d&c red 27 lake, d&c red 30 lake, d&c yellow 10 lake, fd&c blue 1 lake, fd&c yellow 6 lake, flavors, glucose, magnesium stearate, maltodextrin, sucrose, talc. Token backfill of PR #348 refuse onto the Sept 26, 2026 #348 founder stamp. `dextrose` → dextrose → bare glucose Caution (Sept 26 #348; not Cleared glucose syrup; not cultured dextrose) No GTIN-12 printed under barcode bars was opened. NDC is not a UPC.',
  }
];

export const BATCH112_KYR6B_GOODSENSE_TOKEN_BACKFILL_2: RatingRecord[] = PACKS.map(expand);

export const BATCH112_SKIPPED_NO_OI: { sku: string; reason: string }[] = [

];

export const BATCH112_SKIPPED_OUT: { sku: string; reason: string }[] = [

];

export const BATCH112_SKIPPED_ALREADY: { sku: string; reason: string }[] = [

];

export const BATCH112_SKIPPED: { sku: string; reason: string }[] = [
  ...BATCH112_SKIPPED_NO_OI,
  ...BATCH112_SKIPPED_OUT,
  ...BATCH112_SKIPPED_ALREADY,
];

export const BATCH112_REFUSED: { sku: string; reason: string }[] = [
  { sku: 'good sense nicotine (0113-6305)', reason: 'REFUSED exact panel string `ethyl butyrate`. Setid 0f55f79b-a5ab-4e9e-9219-a9b8f401b792. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0f55f79b-a5ab-4e9e-9219-a9b8f401b792.' },
  { sku: 'Good Sense Cough DM (0113-0958)', reason: 'REFUSED exact panel string `tragacanth gum`. Setid 5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5a2e9bef-42cb-4b72-9a26-c3ae71dcb4ea.' },
  { sku: 'Good Sense Tussin DM Max (0113-0927)', reason: 'REFUSED exact panel string `acetic acid`. Setid d2541ef0-a73c-43aa-91ff-fdbce2748c4f. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d2541ef0-a73c-43aa-91ff-fdbce2748c4f.' },
  { sku: 'GOOD SENSE DUAL ACTION COMPLETE (0113-7050)', reason: 'REFUSED exact panel string `polyacrylate dispersion`. Setid b5a36da3-7316-493c-b50f-fc5393d858c0. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b5a36da3-7316-493c-b50f-fc5393d858c0.' },
  { sku: 'Good Sense Antacid Soft Chew (50804-027)', reason: 'REFUSED exact panel string `hydrogenated coconut oil`. Setid c7420218-b20e-0f0d-e053-2995a90a2386. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c7420218-b20e-0f0d-e053-2995a90a2386.' },
  { sku: 'Good Sense Dual Action Complete (0113-0032)', reason: 'REFUSED exact panel string `polyacrylate dispersion`. Setid b7154648-8c8c-4ce6-88b7-5442a16143c5. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b7154648-8c8c-4ce6-88b7-5442a16143c5.' },
  { sku: 'good sense cough dm (0113-0384)', reason: 'REFUSED exact panel string `tragacanth gum`. Setid 1b11b25b-2716-45f9-830f-ddf622366e60. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1b11b25b-2716-45f9-830f-ddf622366e60.' },
  { sku: 'good sense ibuprofen pm (0113-0050)', reason: 'REFUSED exact panel string `glyceryl behenate`. Setid 0488786f-9b6b-4935-bb57-bcb2565447f8. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0488786f-9b6b-4935-bb57-bcb2565447f8.' },
  { sku: 'good sense anti itch (50090-7255)', reason: 'REFUSED exact panel string `isostearyl neopentanoate`. Setid 072dd455-24a5-4a44-aaef-d3e137d005a6. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=072dd455-24a5-4a44-aaef-d3e137d005a6.' },
  { sku: 'Good Sense ibuprofen (68258-2994)', reason: 'REFUSED exact panel string `ammonium glycerrhizin`. Setid 56cb55bf-3fd8-4613-bc45-73e53204dc97. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=56cb55bf-3fd8-4613-bc45-73e53204dc97.' },
  { sku: 'GoodSense Cherry Zinc Lozenges (75981-011)', reason: 'REFUSED exact panel string `glycine`. Setid c5fe07e0-3a2b-adf5-e053-2995a90a99ae. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5fe07e0-3a2b-adf5-e053-2995a90a99ae.' },
  { sku: 'GoodSense Antacid Fruit Chews (75981-012)', reason: 'REFUSED exact panel string `ethyl acetate`, `hydrogenated coconut oil`. Setid c5ffaaee-0f78-4a13-e053-2995a90ad6ba. NO Search row. URL https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5ffaaee-0f78-4a13-e053-2995a90ad6ba.' },
];

const _ROWS = BATCH112_KYR6B_GOODSENSE_TOKEN_BACKFILL_2;
const _grades = {
  clean: _ROWS.filter((r) => r.verdict === 'clean').length,
  caution: _ROWS.filter((r) => r.verdict === 'caution').length,
  avoid: _ROWS.filter((r) => r.verdict === 'avoid').length,
};
if (_ROWS.length !== 45) throw new Error('batch112 row count drift');
if (_grades.clean !== 0) throw new Error('batch112 clean drift');
if (_grades.caution !== 12) throw new Error('batch112 caution drift');
if (_grades.avoid !== 33) throw new Error('batch112 avoid drift');
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
if (_new !== 35 || _reuse !== 10) throw new Error('batch112 NEW/REUSE drift');
if (BATCH112_SKIPPED_NO_OI.length !== 0) throw new Error('batch112 no_OI drift');
if (BATCH112_SKIPPED_OUT.length !== 0) throw new Error('batch112 OUT drift');
if (BATCH112_SKIPPED_ALREADY.length !== 0) throw new Error('batch112 already drift');
if (BATCH112_REFUSED.length !== 12) throw new Error('batch112 REFUSED drift');
if (_ROWS.some((r) => r.recordStatus !== 'unverified')) {
  throw new Error('batch112 recordStatus must stay unverified');
}
const _UPC: Record<string, string> = {
  'goodsense-b112-regular-strength-antacid-e6fb': '846036008432',
  'goodsense-b112-pain-relief-roll-on-0885': '846036009842',
  'goodsense-b112-effervescent-cold-relief-81e2': '846036001631',
  'goodsense-b112-allergy-2a73': '368071373448',
  'goodsense-b112-regular-strength-antacid-peppermint-0eb5': '846036008449',
  'goodsense-b112-ultra-strength-antacid-assorted-frui-e6fb': '846036008456',
  'goodsense-b112-extra-strength-antacid-assorted-frui-e6fb': '846036008463',
  'goodsense-b112-sleep-time-c1b4-355-ml': '301130186405',
};
function _upcOk(code: string): boolean {
  if (!/^\d{12}$/.test(code)) return false;
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(code[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(code[11]);
}
if (Object.keys(_UPC).length !== 8) throw new Error('batch112 UPC allowlist drift');
for (const record of _ROWS) {
  const expected = _UPC[record.id];
  if (expected) {
    if (record.barcode !== expected) throw new Error(`batch112 UPC attach drift on ${record.id}`);
    if (!_upcOk(record.barcode ?? '')) throw new Error(`batch112 barcode failed UPC-A check on ${record.id}`);
  } else if (record.barcode) {
    throw new Error(`batch112 unexpected barcode on ${record.id}`);
  }
}
const _upcValues = Object.values(_UPC);
if (new Set(_upcValues).size !== _upcValues.length) throw new Error('batch112 duplicate UPC');
if (_ROWS.some((r) => !r.id.startsWith('goodsense-b112-'))) {
  throw new Error('batch112 ids must use goodsense-b112-');
}
const _ids = new Set(_ROWS.map((r) => r.id));
if (_ids.size !== _ROWS.length) throw new Error('batch112 duplicate id');
const _formulas = new Set(_ROWS.map((r) => r.formulaId));
if (![..._formulas].every((id) => _ids.has(id!))) {
  throw new Error('batch112 formulaId must point at a row in this file');
}
if (_ROWS.some((r) => r.verdict === 'avoid' && !r.inactiveIngredients?.some((f) => f.riskLevel === 'high'))) {
  throw new Error('batch112 Avoid without High');
}
if (_ROWS.some((r) => r.verdict === 'clean' && (r.inactiveIngredients ?? []).some((f) => f.riskLevel !== 'cleared'))) {
  throw new Error('batch112 Clean row has a non-cleared inactive');
}
if (_ROWS.some((r) => r.verdict !== 'clean' && !(r.inactiveIngredients?.length))) {
  throw new Error('batch112 non-clean row missing a printed inactive');
}
const _blob = [
  ..._ROWS.map((r) => `${r.productName} ${r.id}`),
  ...BATCH112_SKIPPED.map((s) => s.sku),
  ...BATCH112_REFUSED.map((s) => s.sku),
].join('\n');
if (/HealthA2Z|A\+Health|\bTIME-Cap\b|toothpaste|Sprouts|Basic Care|Amazon Elements|\bSolimo\b/i.test(_blob)) {
  throw new Error('batch112 excluded brand leaked');
}
