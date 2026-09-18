// DRAFT / not verified / batch 50 list-3 Pain & Fever WRITE /
// methodology v1.6 + current main §5 exact Additive / “also appears
// as” / locked exact-INCI rows only. No invented grades. No
// cousin-match. Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus is 'unverified' on every row. Internal keys only:
// clean | caution | avoid. Do NOT invent UPCs / barcodes except
// KYR5-b catch-up allowlist. Pack sizes
// of the same name+form+inactives share formulaId. Same OI+actives
// share formulaId. Form is labeled on cleanAlternatives, not a hard
// filter (§6). Not wired into Clean Picks UI. No live Clean Picks
// file is edited. Do NOT restore Biofreeze Clean Picks. No photos.
// Letter tiles only on new ids. No fake Clean alts. No methodology
// rewrite. No Sprouts. Do NOT rewrite list-2 batch 49 or batches
// 41–48.
//
// TALLY (unverified drafts in THIS file): 44 rows — Clean 0 /
// Caution 31 / Avoid 13.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — already on main:
// Batch 41: Precise creams/patch + AleveX
// Batch 42: advil-targeted-relief-cream, motrin-arthritis-pain-gel,
//   aleve-arthritis-pain-gel
// Batch 44 list-2 (13 rows)
// Batch 45 remaining (18 rows)
// Batch 46: Tiger Balm Pain Relieving Patch + Hydrogel Patch +
//   Neck & Shoulder vanishing scent Avoid
// Batch 47: Icy Hot / Aspercreme leftover + Salonpas lidocaine
//   gel-patch / FLEX / Pain Relieving Patch + LARGE
// Batch 48: remaining Salonpas / Tiger Balm
// Batch 49 list-2: UltraFlex / UltraFlex Plus / Capzasin Quick
//   Relief / Mineral Ice Extreme Spray
//
// LIST 3 written (44 Search rows / 33 formulaIds) under current
// §5 locks. LIST 4 — no Search rows (OUT).
//
// REFUSED (still missing an exact §5 row — do not invent):
// - Biofreeze Foot Cream (32450cbf-…) → "Tetrasodium EDTA"
// - Bengay Ultra Strength Pain Relieving Patch 5% (f57ccc33-…)
//   → "calcined kaolin"
// - Mineral Ice Original Therapeutic Menthol Gel 2% (7b30076a-…)
//   → "ammonium hydroxide"

import type {
  CleanAlternative,
  IngredientFlag,
  RatingRecord,
} from '../ratingRecord';

const UNVERIFIED = 'unverified' as const;
const ADULT = 'adult' as const;
const OTC = 'OTC' as const;
const PAIN_FEVER = 'Pain & Fever';
const UNVERIFIED_NOTE = 'draft, not verified';

const PF_RETAILERS = [
  'Walmart',
  'Target',
  'CVS',
  'Walgreens',
  'Safeway',
] as const;

const LIMITED_STACK =
  'Limited-only stack stays Caution (no 3-pt Avoid). Limited-only never Avoid. Avoid needs High.';

const PARKED_ACTIVES =
  'Menthol / camphor / lidocaine / methyl salicylate / capsaicin / capsicum / benzyl alcohol / trolamine salicylate / phenol actives stay parked (no invented active-safety cap). Inactives graded only.';

const PG_TOPICAL_TAP =
  'Propylene glycol is oral-scoped Moderate. On this topical it is not that Moderate row.';

const MINERAL_OIL_TAP =
  'Paraffin + petrolatum / mineral oil as a topical occlusive is Cleared (petrolatum neighborhood). Tap: not an oral oil.';

const CREAM_OIL_TAP =
  'Seed/industrial oils are flagged in gummies. In this cream / stick / spray fill they are not that High rule. Named single oil as the base or fill is Cleared.';

const ADHESIVE_IGNORE =
  'Adhesive plaster / film / backing is a patch device material — not a gradeable inactive; omitted, not a block.';

const MCT_UNLABELED_TAP =
  'Label says caprylic/capric triglyceride and does not name coconut. We mark that Limited because the source isn’t clear. This cream fill is not the gummy seed-oil High rule.';

const METH = {
  dyes:
    'Methodology §5 High-tier (synthetic dyes — FD&C/D&C colors, aluminum lakes)',
  parabens:
    'Methodology §5 High-tier (parabens — High in every form, including rubs and patches; locked Sept 15, 2026)',
  tio2: 'Methodology §5 High-tier (titanium dioxide — E171; EU food-additive ban after EFSA genotoxicity data-gap). No topical exception on this row.',
  alcoholVehicle:
    'Methodology §5 Limited-risk (alcohol / ethyl alcohol / alcohol denat. / SD alcohol / methylated spirit / dehydrated alcohol / ethanol as a VEHICLE). Alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active. Not Avoid.',
  ipa: 'Methodology §5 Limited-risk (isopropyl alcohol — IPA / isopropanol; alcohol-vehicle family; locked Sept 15, 2026). Not Avoid.',
  benzoate:
    'Methodology §5 Limited-risk (synthetic preservatives — sodium benzoate, potassium sorbate)',
  caprylyl:
    'Methodology §5 Limited-risk (caprylyl glycol / hexanediol / sorbic acid — Limited preservative family; locked Sept 14, 2026)',
  hexanediol:
    'Methodology §5 Limited-risk (caprylyl glycol / 1,2-hexanediol / sorbic acid — Limited preservative family; locked Sept 14, 2026)',
  sorbitol:
    'Methodology §5 Limited-risk (other sugar alcohols — sorbitol / maltitol / mannitol)',
  mctUnlabeled: `Methodology §5 Limited-risk (unlabeled MCT — coconut vs other source not named; opacity; not Avoid). ${MCT_UNLABELED_TAP}`,
  ps80: 'Methodology §5 Moderate-risk (polysorbate 80)',
  ps60: 'Methodology §5 Moderate-risk (polysorbate 60 — same Moderate family as P80 / P20)',
  peg: 'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate, pegoxol-7 stearate, lauroyl macrogolglycerides; ethylene-oxide / 1,4-dioxane)',
  pegStearate:
    'Methodology §5 Moderate-risk (PEGs — polyethylene glycol 400/3350, PEG-stearate, pegoxol-7 stearate, lauroyl macrogolglycerides). PEG-40 stearate sits on the PEG-stearate also-appears-as line.',
  fragrance:
    'Methodology §5 Caution (fragrance / parfum, topical OTC — population/sensitization; standalone Caution, not additive-scored, not Avoid)',
  botanical:
    'Methodology §5 Caution (topical botanical extracts/oils used as inactives — arnica; burdock; boswellia resin extract; calendula extract or flower oil; camellia leaf oil/extract; ilex; lemon balm; chamomile; echinacea; juniper; white tea; wormwood extract; wormwood oil; ginger extract; camphor leaf oil; gaultheria fragrantissima oil; spearmint bare — fragrance/EO line; locked Sept 15, 2026). Do not Clear just because they are plants.',
  herbalUnspec:
    'Methodology §5 Caution (herbal extract, unspecified — exact token; locked Sept 15, 2026)',
  camphorInactive:
    'Methodology §5 Caution (camphor / dl-camphor as inactive — exact token when listed as inactive; distinct from parked camphor-as-active; locked Sept 15, 2026)',
  tea:
    'Methodology §5 Caution (TEA / trolamine / triethanolamine as inactive — not the salicylate active; standalone Caution, not Avoid; locked Sept 15, 2026)',
  sio2:
    'Methodology §5 Precautionary (silicon dioxide / silica — EFSA 2018 nanoparticle data-gap; Caution cap, 0 demerit points)',
  hydratedSilica:
    'Methodology §5 Caution (hydrated silica, topical — exact token; distinct from the oral silicon-dioxide nanoparticle cap; standalone Caution, not Avoid; locked Sept 15, 2026)',
  denatonium:
    'Methodology §5 Caution (denatonium / denatonium benzoate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  tertButyl:
    'Methodology §5 Caution (tert-butyl alcohol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ipbc:
    'Methodology §5 Caution (IPBC / iodopropynyl butylcarbamate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  peg4:
    'Methodology §5 Caution (PEG-4 laurate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  peg12:
    'Methodology §5 Caution (PEG-12 dimethicone — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  bisPeg:
    'Methodology §5 Caution (bis-PEG-10 dimethicone — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ppg24:
    'Methodology §5 Caution (PPG-24-glycereth-24 — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  hecPhosphate:
    'Methodology §5 Caution (hydroxyethyl cetyldimonium phosphate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthylOxalate:
    'Methodology §5 Caution (menthyl ethylamido oxalate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  tetraGlu:
    'Methodology §5 Caution (tetrasodium glutamate diacetate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  lauralkonium:
    'Methodology §5 Caution (lauralkonium chloride — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  nonoxynol10:
    'Methodology §5 Caution (nonoxynol-10 — exact INCI; distinct from nonoxynol-30 and bare nonoxynol; standalone Caution, not Avoid; locked Sept 15, 2026)',
  isoceteth20:
    'Methodology §5 Caution (isoceteth-20 — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ceteth10:
    'Methodology §5 Caution (ceteth-10 phosphate — exact INCI; distinct from ceteth-20 phosphate and ceteth phosphate; standalone Caution, not Avoid; locked Sept 15, 2026)',
  ceteth20:
    'Methodology §5 Caution (ceteth-20 phosphate — standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyacrylateStarch:
    'Methodology §5 Caution (sodium polyacrylate starch — exact INCI; distinct from sodium polyacrylate / polyacrylic acid; standalone Caution, not Avoid; locked Sept 15, 2026)',
  benzylTopical:
    'Methodology §5 Caution (benzyl alcohol as topical inactive — exact token on topical OTC; does not change the oral benzyl-alcohol population-split rule; standalone Caution, not Avoid; locked Sept 15, 2026)',
  thymol:
    'Methodology §5 Caution (thymol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  polyCross6:
    'Methodology §5 Caution (polyacrylate crosspolymer-6 — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  phenethyl:
    'Methodology §5 Caution (phenethyl alcohol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  acetone:
    'Methodology §5 Caution (acetone — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  chloroxylenol:
    'Methodology §5 Caution (chloroxylenol — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026). SPL spells chloroxylene.',
  iodine:
    'Methodology §5 Caution (iodine / potassium iodide — exact tokens; standalone Caution, not Avoid; locked Sept 15, 2026)',
  butane:
    'Methodology §5 Caution (butane, spray propellant — exact token; pain-spray propellant family with isobutane / isopentane / propane; standalone Caution, not Avoid; locked Sept 15, 2026)',
  isobutane:
    'Methodology §5 Caution (isobutane / isopentane / propane, pain-spray propellants — standalone Caution, not Avoid; locked Sept 15, 2026)',
  hydroxyaceto:
    'Methodology §5 Caution (hydroxyacetophenone — standalone Caution, not Avoid; locked Sept 15, 2026)',
  phenoxy:
    'Methodology §5 Caution (phenoxyethanol, topical preservative — standalone Caution, not additive-scored, not Avoid)',
  steareth:
    'Methodology §5 Caution (steareth-2 / steareth-21 — standalone Caution, not Avoid; locked Sept 15, 2026)',
  ethylhexyl:
    'Methodology §5 Caution (ethylhexylglycerin — standalone Caution, not Avoid; locked Sept 15, 2026)',
  acrylate:
    'Methodology §5 Caution (acrylate / acrylamide copolymers not already locked — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amp:
    'Methodology §5 Caution (aminomethyl propanol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  amps:
    'Methodology §5 Caution (hydroxyethyl acrylate / sodium acryloyldimethyltaurate copolymer — AMPS family; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dicetyl:
    'Methodology §5 Caution (dicetyl phosphate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  dmdm:
    'Methodology §5 Caution (DMDM hydantoin / diazolidinyl urea — formaldehyde-donor; standalone Caution, not Avoid unless founder later bumps; locked Sept 15, 2026)',
  lanolin:
    'Methodology §5 Caution (lanolin, topical — hypersensitivity pattern, not Avoid)',
  lavender:
    'Methodology §5 Caution (lavender oil / spike lavender oil, topical — fragrance-style; standalone Caution, not Avoid; locked Sept 15, 2026)',
  bkc:
    'Methodology §5 Caution (benzalkonium chloride — contested ciliotoxicity; standalone Caution, not Avoid)',
  polyacrylate:
    'Methodology §5 Caution (sodium polyacrylate / polyacrylic acid, topical gel polymer — standalone Caution, not Avoid; locked Sept 15, 2026)',
  dihydroxyAl:
    'Methodology §5 Caution (dihydroxyaluminum aminoacetate — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  patchAdhesive:
    'Methodology §5 Caution (rosin esters / terpene resin / SIS / polyisobutylene patch adhesives — standalone Caution, not Avoid; locked Sept 15, 2026)',
  eucalyptus:
    'Methodology §5 Caution (eucalyptus oil as a gel / liniment / ointment / patch inactive — fragrance/EO line; standalone Caution, not Avoid)',
  clove:
    'Methodology §5 Caution (clove oil / boswellia oil / thymus / flower oils as lotion scent — fragrance/EO line; standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthaArvensis:
    'Methodology §5 Caution (Mentha arvensis leaf oil — exact INCI; standalone Caution, not Avoid; locked Sept 15, 2026)',
  menthoxy:
    'Methodology §5 Caution (isopulegol / menthoxypropanediol — standalone Caution, not Avoid; locked Sept 15, 2026)',
  sorbitanOleate:
    'Methodology §5 Caution (sorbitan oleate / sorbitan monooleate, topical — standalone Caution, not additive-scored, not Avoid)',
  polyoxylCastor:
    'Methodology §5 Cleared (castor oil / polyoxyl castor oil derivatives, oral/topical — locked v1.6). PEG-40 hydrogenated castor oil is polyoxyl 40 hydrogenated castor oil on this row.',
  grapeSeed: `Methodology §5 Cleared (grape seed oil as cream fill — named single oil as cream vehicle; not gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  safflower: `Methodology §5 Cleared (safflower oil / soybean oil as cream or ointment base — named single oil fill; not gummy High; locked Sept 15, 2026). ${CREAM_OIL_TAP}`,
  fattyAcid:
    'Methodology §5 Cleared (arachidic acid / lauric acid / linoleic acid / linolenic acid / myristic acid / palmitic acid — exact fatty-acid tokens; locked Sept 15, 2026)',
  hco: 'Methodology §5 Cleared (hydrogenated castor oil — exact INCI; distinct from the castor / polyoxyl castor row; locked Sept 15, 2026)',
  glycerylSE:
    'Methodology §5 Cleared (glyceryl stearate SE — exact INCI; distinct from glyceryl stearate; locked Sept 15, 2026)',
  glycerylDistearate:
    'Methodology §5 Cleared (glyceryl distearate — exact INCI; distinct from glyceryl stearate; locked Sept 15, 2026)',
  caGluconate:
    'Methodology §5 Cleared (calcium gluconate — exact INCI; locked Sept 15, 2026)',
  gluconolactone:
    'Methodology §5 Cleared (gluconolactone — exact INCI; locked Sept 15, 2026)',
  ssl: 'Methodology §5 Cleared (sodium stearoyl lactylate — exact INCI; stearate-family emulsifier; distinct from sodium stearoyl glutamate; locked Sept 15, 2026)',
  mgSulfate:
    'Methodology §5 Cleared (magnesium sulfate — exact INCI; locked Sept 15, 2026)',
  lysine: 'Methodology §5 Cleared (lysine — exact INCI; locked Sept 15, 2026)',
  cuSulfate:
    'Methodology §5 Cleared (copper sulfate / cupric sulfate — both spellings; exact tokens; locked Sept 15, 2026)',
  salts:
    'Methodology §5 Cleared (manganese chloride / aluminum chloride / magnesium chloride / zinc chloride — exact salt tokens; locked Sept 15, 2026)',
  laurylLaurate:
    'Methodology §5 Cleared (lauryl laurate — exact INCI; locked Sept 15, 2026)',
  bisabolol:
    'Methodology §5 Cleared (bisabolol — exact INCI; locked Sept 15, 2026)',
  hec: 'Methodology §5 Cleared (hydroxyethylcellulose / hydroxyethyl cellulose — both spellings; exact tokens; locked Sept 15, 2026)',
  c1519: 'Methodology §5 Cleared (C15-19 alkane — exact INCI; locked Sept 15, 2026)',
  oleic: 'Methodology §5 Cleared (oleic acid — fatty-acid / stearate cousin; locked Sept 15, 2026)',
  msm: 'Methodology §5 Cleared (MSM / methylsulfonylmethane / dimethyl sulfone as labeled inactive — exact token; locked Sept 15, 2026)',
  carbomer:
    'Methodology §5 Cleared (carbomer / carbomer interpolymer / carbomer copolymer — locked Sept 15, 2026; older 934/940/941 benzene concern does not apply)',
  fattyAlcohol:
    'Methodology §5 Cleared (stearyl alcohol / cetearyl alcohol / cetyl alcohol / cetostearyl alcohol — fatty-alcohol family)',
  glycerylStearate:
    'Methodology §5 Cleared (glyceryl stearate / glyceryl monostearate — topical emollient / stearate cousin; locked Sept 15, 2026)',
  dimethicone:
    'Methodology §5 Cleared (dimethicone / dimethicone copolyol — locked Sept 14, 2026)',
  ipm: 'Methodology §5 Cleared (glycol stearate, isopropyl myristate, stearyl heptanoate — topical emollients; locked Sept 15, 2026)',
  ipp: 'Methodology §5 Cleared (isopropyl palmitate / isopropyl laurate — IPM family; locked Sept 15, 2026)',
  pentylene:
    'Methodology §5 Cleared (pentylene glycol / propanediol — humectant / solvent; locked Sept 15, 2026)',
  aloe: 'Methodology §5 Cleared (aloe as topical base; locked Sept 15, 2026)',
  mineralOil: `Methodology §5 Cleared (paraffin + mineral oil as topical ointment occlusive — petrolatum neighborhood; locked Sept 15, 2026). ${MINERAL_OIL_TAP}`,
  petrolatum:
    'Methodology §5 Cleared (petrolatum, topical — first-aid ointment base; locked Sept 14, 2026)',
  tocopherol:
    'Methodology §5 Cleared (mixed tocopherols / tocopheryl acetate / alpha-tocopherol acetate as antioxidants — locked v1.6)',
  edta: 'Methodology §5 Cleared (disodium EDTA / edetate sodium / edetate disodium, TRACE preservative/stabilizer use — locked v1.6)',
  naoh: 'Methodology §5 Cleared (sodium hydroxide as pH adjuster — locked Sept 14, 2026)',
  koh: 'Methodology §5 Cleared (potassium hydroxide — pH adjuster, trace; locked Sept 15, 2026)',
  stearic: 'Methodology §5 Cleared (stearic acid — stearate-family lubricant)',
  cellulose:
    'Methodology §5 Cleared (cellulose gum / carboxymethylcellulose sodium — MCC / cellulose-family filler)',
  kaolin: 'Methodology §5 Cleared (kaolin — clay / absorbent; locked Sept 15, 2026)',
  tartaric: 'Methodology §5 Cleared (tartaric acid / L-tartaric acid — organic acid with citric; locked Sept 15, 2026)',
  pva: 'Methodology §5 Cleared (PVA / polyvinyl alcohol, topical film; locked Sept 15, 2026)',
  povidone: 'Methodology §5 Cleared (povidone / PVP — locked v1.6)',
  zno: 'Methodology §5 Cleared (zinc oxide as labeled inactive / topical — exact token; distinct from parked zinc-as-active; locked Sept 15, 2026)',
  squalane: 'Methodology §5 Cleared (squalane — exact INCI; locked Sept 15, 2026)',
  butylene: 'Methodology §5 Cleared (butylene glycol — exact INCI; locked Sept 15, 2026)',
  kcl: 'Methodology §5 Cleared (potassium chloride — salt / electrolyte; locked Sept 15, 2026)',
  nacl: 'Methodology §5 Cleared (sodium chloride / sodium bicarbonate — saline bases)',
  pgTopical: `Methodology §5 Moderate-risk (propylene glycol, oral) does not score on this topical. ${PG_TOPICAL_TAP}`,
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

function cleared(setid: string, name: string): IngredientFlag {
  return flag(name, 'cleared', dailymed(setid, METH.cleared));
}

function alt(productId: string, rankReason: string): CleanAlternative {
  return { productId, rankReason };
}

const ARNICARE_GEL = 'boiron-arnicare-gel';

const TOPICAL_ALTS: CleanAlternative[] = [
  alt(
    ARNICARE_GEL,
    'Independently Clean topical Arnica analog already on main (Boiron Arnicare Gel). Form: gel vs cream / balm / ointment / roll-on / spray / patch / foam / stick / pen — labeled, not a hard filter (§6). Different actives. No Clean conventional NSAID / lidocaine cream invented.',
  ),
];

const SET = {
  greenGel: '83d5c2f2-2413-4d28-83b2-0808d0917b4d',
  greenRoll: 'ebbbe9cb-b1ce-4dac-9fca-f54a2470c4fb',
  colorlessGel: '939dbbc3-71ec-4990-840e-7c9b8d430562',
  colorlessRoll: 'a8d59d45-0e85-43d1-affd-bbe922c4acb1',
  gel35: '684faf63-5e44-4471-8384-e8fa7c0d842a',
  proGel: '6bef9ccb-7a5a-4c67-b1bc-a92b167312da',
  proRoll: 'f62f8ec3-593d-480a-85a0-01fcd7f1790c',
  proColorGel: '4639201c-a67a-475f-8df6-3dc6225803ad',
  proColorRoll: 'bae9946a-4c68-4759-9fb3-0a61a7ad0eb7',
  ovnGel: 'f5c8c08b-c7c0-f84d-e053-2a95a90add15',
  ovnRoll: 'f67d7b7a-8922-73f6-e053-2995a90a2e80',
  sprayDenat: '00bb462a-27d0-6f74-e063-6394a90a90ec',
  proAerosol: '00bba5d2-b0e0-701c-e063-6294a90a5741',
  sprayAlc: '4c798b06-6ee5-41d1-8a14-f6889512ade3',
  proSprayAlc: 'db982baf-31ea-4f09-90e3-cd5facb5dfe5',
  spray10: '5edddb99-6596-4a3b-b361-1cc04d032c31',
  proSpray13: '485c8208-c93b-5b84-e063-6394a90ab77a',
  pen: 'b4cc1db5-a33f-17bc-e053-2995a90ab7eb',
  creamJar: 'a227213b-e89f-7144-e053-2a95a90a7e74',
  ovnCream: '10a8face-47da-ebbe-e063-6294a90a42fe',
  foam: '890191e8-99ad-489c-8f21-2592f3d31936',
  stick: '26d62cd2-9209-8cca-e063-6394a90a2028',
  tripleRoll: '5089c088-3026-233a-e063-6394a90a93b6',
  tripleGel: '511852c8-7428-3234-e063-6394a90a5bc2',
  mentholPatch: '71a36691-9d9e-479d-bfdc-6f6b192ad2d0',
  ovnPatch: '07be6e88-1850-4d6a-946d-f03830b8c4a2',
  flexStrip: '6ec26bae-e395-49aa-969e-8c653d6f0b27',
  bengayCream: '0a41ec65-bd0b-4fc6-807d-74f353341cc7',
  bengayGel: '6cc3294b-3b0f-44d0-af71-61db1022d269',
  bengayLido: 'c416320a-c0d7-401e-b0fa-44114d76a557',
  capzasinHp: '345c9159-0efe-436b-9068-3b717678936b',
  miExtremeGel: '56d3ca3d-21e1-a40a-e063-6294a90a9ff4',
  miStick: '4f81be91-92e5-1205-e063-6394a90a6e82',
  absPlusA: 'fd5d77fc-dc73-2aec-2c7f-0fca5d7d3a75',
  absPlusB: '46f4ad3c-7418-a6bf-e063-6394a90a4eb8',
  absProRoll: '470efcd0-d350-3dc4-e063-6394a90ab8c1',
  absProCream: '17b3f1e6-5554-4f3e-b133-76ae8ffea919',
  absNoMess: 'a7172f17-1525-4738-b72c-92479c730af2',
  absProSpray: 'e1de73bb-917c-48d1-9a78-00c76edddb98',
  absNeck: '22f2f191-9146-3075-e063-6394a90aef5f',
  absBack: '22f5147e-ff2b-4ae8-e063-6394a90a4e54',
  absKnee: '22f71254-e521-2d82-e063-6394a90a12d8',
  absUltra: 'cf329707-d90a-29dd-f2c2-acfd5af614f3',
  absXl: 'd656e7f6-ca26-1873-6c11-08aa82091bb0',
  absPlusKnee: '3ad8718d-ebf1-474f-8a91-48c78ab3b5c1',
} as const;

const ID = {
  greenGel: 'biofreeze-pain-relief-gel-4',
  greenRoll: 'biofreeze-pain-relief-roll-on-4',
  colorlessGel: 'biofreeze-colorless-gel-4',
  colorlessRoll: 'biofreeze-colorless-roll-on-4',
  gel35: 'biofreeze-gel-3-5-paraben',
  proGel: 'biofreeze-professional-gel-5',
  proRoll: 'biofreeze-professional-roll-on-5',
  proColorGel: 'biofreeze-professional-colorless-gel-5',
  proColorRoll: 'biofreeze-professional-colorless-roll-on-5',
  ovnGel: 'biofreeze-overnight-gel-4',
  ovnRoll: 'biofreeze-overnight-roll-on-4',
  sprayDenat: 'biofreeze-pain-relief-spray-10-5-denatonium',
  proAerosol: 'biofreeze-professional-aerosol-10-5-denatonium',
  sprayAlc: 'biofreeze-pain-relief-spray-10-5',
  proSprayAlc: 'biofreeze-professional-spray-10-5',
  pen: 'biofreeze-precision-relief-pen',
  spray10: 'biofreeze-pain-relief-spray-10',
  proSpray13: 'biofreeze-professional-spray-13',
  creamJar: 'biofreeze-pain-relief-cream',
  ovnCream: 'biofreeze-overnight-relief-cream',
  foam: 'biofreeze-foam',
  stick: 'biofreeze-dry-stick',
  tripleRoll: 'biofreeze-triple-target-roll-on',
  tripleGel: 'biofreeze-triple-target-gel',
  mentholPatch: 'biofreeze-menthol-patches',
  ovnPatch: 'biofreeze-overnight-relief-patches',
  flexStrip: 'biofreeze-flexible-relief-strip',
  bengayCream: 'bengay-ultra-strength-nongreasy',
  bengayGel: 'bengay-vanishing-scent-gel',
  bengayLido: 'bengay-lidocaine-tropical-jasmine',
  capzasinHp: 'capzasin-hp-arthritis-cream',
  miExtremeGel: 'mineral-ice-extreme-gel',
  miStick: 'mineral-ice-extreme-dry-stick',
  absPlus: 'absorbine-jr-plus-es-liquid',
  absProRoll: 'absorbine-jr-pro-roll-on-liquid',
  absProCream: 'absorbine-jr-pro-cream',
  absNoMess: 'absorbine-jr-pro-no-mess',
  absProSpray: 'absorbine-jr-pro-spray',
  absNeck: 'absorbine-jr-neck-patch',
  absBack: 'absorbine-jr-back-patch',
  absKnee: 'absorbine-jr-knee-patch',
  absUltra: 'absorbine-jr-plus-ultra-patch',
  absXl: 'absorbine-jr-xl-back-patch',
  absPlusKnee: 'absorbine-jr-plus-knee-patch',
} as const;

const FID = {
  green4: ID.greenGel,
  colorless4: ID.colorlessGel,
  gel35: ID.gel35,
  pro5: ID.proGel,
  proColor5: ID.proColorGel,
  ovnGel: ID.ovnGel,
  ovnRoll: ID.ovnRoll,
  sprayDenat: ID.sprayDenat,
  sprayAlc: ID.sprayAlc,
  spray10: ID.spray10,
  proSpray13: ID.proSpray13,
  creamJar: ID.creamJar,
  ovnCream: ID.ovnCream,
  foam: ID.foam,
  stick: ID.stick,
  triple: ID.tripleRoll,
  mentholPatch: ID.mentholPatch,
  ovnPatch: ID.ovnPatch,
  flexStrip: ID.flexStrip,
  bengayCream: ID.bengayCream,
  bengayGel: ID.bengayGel,
  bengayLido: ID.bengayLido,
  capzasinHp: ID.capzasinHp,
  miExtremeGel: ID.miExtremeGel,
  miStick: ID.miStick,
  absPlus: ID.absPlus,
  absProCream: ID.absProCream,
  absNoMess: ID.absNoMess,
  absProSpray: ID.absProSpray,
  absPatch75: ID.absNeck,
  absUltra: ID.absUltra,
  absXl: ID.absXl,
  absPlusKnee: ID.absPlusKnee,
} as const;

function row(opts: RatingRecord): RatingRecord {
  return {
    productType: OTC,
    recordStatus: UNVERIFIED,
    ...opts,
  };
}

function botanicals(setid: string, names: string[]): IngredientFlag[] {
  return names.map((name) => flag(name, 'cleared', dailymed(setid, METH.botanical)));
}

function greenFourInactives(setid: string): IngredientFlag[] {
  return [
    flag('Aloe Barbadensis Leaf Extract', 'cleared', dailymed(setid, METH.aloe)),
    ...botanicals(setid, [
      'Arctium Lappa Root (Burdock) Extract',
      'Arnica Montana Flower Extract',
    ]),
    flag('Blue 1', 'high', dailymed(setid, METH.dyes)),
    ...botanicals(setid, [
      'Boswellia Carterii Resin Extract',
      'Calendula Officinalis Extract',
      'Camellia Sinensis Leaf Extract',
    ]),
    flag('Camphor', 'cleared', dailymed(setid, METH.camphorInactive)),
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    cleared(setid, 'Glycerin'),
    ...botanicals(setid, ['Ilex Paraguariensis Leaf Extract']),
    flag('Isopropyl Alcohol', 'limited', dailymed(setid, METH.ipa)),
    flag('Isopropyl Myristate', 'cleared', dailymed(setid, METH.ipm)),
    ...botanicals(setid, ['Melissa Officinalis (Lemon Balm) Leaf Extract']),
    flag('Silica', 'cleared', dailymed(setid, METH.sio2)),
    flag('Tocopheryl Acetate', 'cleared', dailymed(setid, METH.tocopherol)),
    flag('Triethanolamine', 'cleared', dailymed(setid, METH.tea)),
    cleared(setid, 'Water'),
    flag('Yellow 5', 'high', dailymed(setid, METH.dyes)),
  ];
}

function colorlessFourInactives(setid: string): IngredientFlag[] {
  return greenFourInactives(setid).filter(
    (item) => item.name !== 'Blue 1' && item.name !== 'Yellow 5',
  );
}

function proGreenFiveInactives(setid: string): IngredientFlag[] {
  return greenFourInactives(setid).filter((item) => item.name !== 'Camphor');
}

function proColorlessFiveInactives(setid: string): IngredientFlag[] {
  return colorlessFourInactives(setid).filter((item) => item.name !== 'Camphor');
}

function overnightGelInactives(setid: string, withSilica: boolean): IngredientFlag[] {
  const out: IngredientFlag[] = [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Aloe Barbadensis Leaf Extract', 'cleared', dailymed(setid, METH.aloe)),
    ...botanicals(setid, [
      'Arctium Lappa Root Extract',
      'Arnica Montana Flower Extract',
      'Boswellia Carterii Resin Extract',
      'Calendula Officinalis Leaf Extract',
      'Camellia Sinensis Leaf Extract',
    ]),
    flag('Carbomer Interpolymer', 'cleared', dailymed(setid, METH.carbomer)),
  ];
  if (withSilica) {
    out.push(
      flag('Colloidal Silicon Dioxide', 'cleared', dailymed(setid, METH.sio2)),
    );
  }
  out.push(
    flag('Fragrance', 'cleared', dailymed(setid, METH.fragrance)),
    cleared(setid, 'Glycerin'),
    ...botanicals(setid, ['Ilex Paraguariensis Leaf Extract']),
    flag('Isopropyl Alcohol', 'limited', dailymed(setid, METH.ipa)),
    ...botanicals(setid, ['Melissa Officinalis Leaf Extract']),
    cleared(setid, 'Purified Water'),
    flag('Tocopherol Acetate', 'cleared', dailymed(setid, METH.tocopherol)),
    flag('Trolamine', 'cleared', dailymed(setid, METH.tea)),
  );
  return out;
}

function denatoniumSprayInactives(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    ...botanicals(setid, [
      'Arnica Montana Flower Extract',
      'Calendula Officinalis Flower Oil',
      'Camellia Sinensis Leaf Oil',
      'Chamomilla Recutita (Matricaria) Flower Extract',
    ]),
    flag('Denatonium Benzoate', 'cleared', dailymed(setid, METH.denatonium)),
    ...botanicals(setid, [
      'Echinacea Angustifolia Extract',
    ]),
    cleared(setid, 'Glycerin'),
    ...botanicals(setid, ['Ilex Paraguariensis Leaf Extract']),
    flag('Isopropyl Alcohol', 'limited', dailymed(setid, METH.ipa)),
    flag('Isopropyl Myristate', 'cleared', dailymed(setid, METH.ipm)),
    ...botanicals(setid, ['Juniperus Communis Fruit Extract']),
    flag('Methylsulfonylmethane', 'cleared', dailymed(setid, METH.msm)),
    cleared(setid, 'Purified Water'),
    flag('Tert-Butyl Alcohol', 'cleared', dailymed(setid, METH.tertButyl)),
  ];
}

function alcoholDenatSprayInactives(setid: string): IngredientFlag[] {
  return [
    flag('Alcohol Denat.', 'limited', dailymed(setid, METH.alcoholVehicle)),
    ...botanicals(setid, [
      'Arnica Montana Flower Extract',
      'Calendula Officinalis Flower Extract',
      'Camellia Sinensis Leaf Extract',
      'Chamomilla Recutita (Matricaria) Flower Extract',
    ]),
    flag('Dimethyl Sulfone (MSM)', 'cleared', dailymed(setid, METH.msm)),
    ...botanicals(setid, [
      'Echinacea Angustifolia Extract',
      'Ilex Paraguariensis Leaf Extract',
    ]),
    flag('Isopropyl Myristate', 'cleared', dailymed(setid, METH.ipm)),
    ...botanicals(setid, ['Juniperus Communis Fruit Extract']),
    cleared(setid, 'Water'),
  ];
}

function tripleTargetInactives(setid: string): IngredientFlag[] {
  return [
    flag('1,2-Hexanediol', 'limited', dailymed(setid, METH.hexanediol)),
    flag(
      'Acrylates/C10-30 Alkyl Acrylate Crosspolymer',
      'cleared',
      dailymed(setid, METH.acrylate),
    ),
    flag('Alcohol', 'limited', dailymed(setid, METH.alcoholVehicle)),
    flag('Caprylyl Glycol', 'limited', dailymed(setid, METH.caprylyl)),
    flag('Carbomer', 'cleared', dailymed(setid, METH.carbomer)),
    flag('Denatonium Benzoate', 'cleared', dailymed(setid, METH.denatonium)),
    flag('Ethylhexylglycerin', 'cleared', dailymed(setid, METH.ethylhexyl)),
    cleared(setid, 'Glycerin'),
    flag(
      'Menthyl Ethylamido Oxalate',
      'cleared',
      dailymed(setid, METH.menthylOxalate),
    ),
    flag('Phenoxyethanol', 'cleared', dailymed(setid, METH.phenoxy)),
    flag('Propanediol', 'cleared', dailymed(setid, METH.pentylene)),
    cleared(setid, 'Purified Water'),
    flag('Steareth-2', 'cleared', dailymed(setid, METH.steareth)),
    flag('Steareth-21', 'cleared', dailymed(setid, METH.steareth)),
    flag('T-Butyl Alcohol', 'cleared', dailymed(setid, METH.tertButyl)),
    flag(
      'Tetrasodium Glutamate Diacetate',
      'cleared',
      dailymed(setid, METH.tetraGlu),
    ),
    flag('Trolamine', 'cleared', dailymed(setid, METH.tea)),
  ];
}

function plusLiquidInactives(setid: string): IngredientFlag[] {
  return [
    flag('acetone', 'cleared', dailymed(setid, METH.acetone)),
    flag('chloroxylene', 'cleared', dailymed(setid, METH.chloroxylenol)),
    flag('FD&C blue #1', 'high', dailymed(setid, METH.dyes)),
    flag('Iodine', 'cleared', dailymed(setid, METH.iodine)),
    ...botanicals(setid, [
      'plant extracts of calendula',
      'echinacea',
      'wormwood herb',
    ]),
    flag('potassium iodide', 'cleared', dailymed(setid, METH.iodine)),
    flag('thymol', 'cleared', dailymed(setid, METH.thymol)),
    cleared(setid, 'water'),
    ...botanicals(setid, ['wormwood oil']),
  ];
}

function neckFamilyInactives(setid: string): IngredientFlag[] {
  return [
    flag(
      'glyceryl hydrogenated rosinate',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
    flag('hydrated silica', 'cleared', dailymed(setid, METH.hydratedSilica)),
    flag('mineral oil', 'cleared', dailymed(setid, METH.mineralOil)),
    flag('PEG-400', 'moderate', dailymed(setid, METH.peg)),
    flag('polyisobutylene', 'cleared', dailymed(setid, METH.patchAdhesive)),
    flag(
      'styrene/isoprene copolymer',
      'cleared',
      dailymed(setid, METH.patchAdhesive),
    ),
  ];
}

export const BATCH50_PAIN_FEVER_LIST3: RatingRecord[] = [
  row({
    id: ID.greenGel,
    productName: 'Biofreeze Pain Relief Gel 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000033 731124002037 731124000170 731124000200 731124000811 731124110015',
    formulaId: FID.green4,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: greenFourInactives(SET.greenGel),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relief Gel 4% = Avoid. Drivers are Blue 1 + Yellow 5 (synthetic dyes High). Remaining Drug Facts exact: aloe Cleared; burdock / arnica / boswellia / calendula / camellia / ilex / lemon balm botanical extracts Caution; camphor-as-inactive Caution; carbomer / glycerin / IPM / tocopheryl acetate / water Cleared; IPA Limited; silica is the SiO2 nanoparticle Caution cap; TEA Caution. Gel + Roll-On 4% share formulaId biofreeze-pain-relief-gel-4 (same OI + menthol 4%). Pack sizes (NDC 59316-102) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.greenGel} (NDC 59316-102) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.greenRoll,
    productName: 'Biofreeze Pain Relief Roll-On 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000064 731124000163 731124000194 731124000828 731124110008',
    formulaId: FID.green4,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: greenFourInactives(SET.greenRoll),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relief Roll-On 4% = Avoid. Same OI + menthol 4% as the green gel — shared formulaId biofreeze-pain-relief-gel-4. Drivers are Blue 1 + Yellow 5. Pack sizes (NDC 59316-205) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.greenRoll} (NDC 59316-205) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with green gel setid ${SET.greenGel} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.colorlessGel,
    productName: 'Biofreeze Colorless Pain Relief Gel 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000040 731124120014 731124000583 731124000613',
    formulaId: FID.colorless4,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: colorlessFourInactives(SET.colorlessGel),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Colorless Pain Relief Gel 4% = Caution. No High. Same botanical / camphor-inactive / silica / TEA / IPA stack as the green 4% gel minus Blue 1 + Yellow 5. Gel + Colorless Roll-On share formulaId biofreeze-colorless-gel-4. Pack sizes (NDC 59316-103) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.colorlessGel} (NDC 59316-103) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.colorlessRoll,
    productName: 'Biofreeze Colorless Pain Relief Roll-On 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124120007 731124000576 731124000606',
    formulaId: FID.colorless4,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: colorlessFourInactives(SET.colorlessRoll),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Colorless Pain Relief Roll-On 4% = Caution. Same OI + menthol 4% as the colorless gel — shared formulaId biofreeze-colorless-gel-4. No High. Pack sizes (NDC 59316-206) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.colorlessRoll} (NDC 59316-206) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with colorless gel setid ${SET.colorlessGel} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.gel35,
    productName: 'Biofreeze Pain Relieving Gel 3.5% (paraben SPL)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.gel35,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '3.5%' },
    ],
    inactiveIngredients: [
      flag('carbomer', 'cleared', dailymed(SET.gel35, METH.carbomer)),
      flag('FD and C blue # 1', 'high', dailymed(SET.gel35, METH.dyes)),
      flag('FD and C yellow # 5', 'high', dailymed(SET.gel35, METH.dyes)),
      cleared(SET.gel35, 'glycerine'),
      flag('herbal extract (llex paraguariensis)', 'cleared', dailymed(SET.gel35, METH.herbalUnspec)),
      flag('isopropyl alcohol USP', 'limited', dailymed(SET.gel35, METH.ipa)),
      flag('methylparaben', 'high', dailymed(SET.gel35, METH.parabens)),
      flag('natural camphor USP (for scent)', 'cleared', dailymed(SET.gel35, METH.camphorInactive)),
      flag('propylene glycol', 'cleared', dailymed(SET.gel35, METH.pgTopical)),
      flag('silicon dioxide', 'cleared', dailymed(SET.gel35, METH.sio2)),
      flag('triethanolamine', 'cleared', dailymed(SET.gel35, METH.tea)),
      cleared(SET.gel35, 'purified water USP'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relieving Gel 3.5% (older paraben SPL) = Avoid. Drivers are methylparaben (High in every form) + FD&C Blue #1 / Yellow #5. Unspecified herbal extract (ilex named in parentheses) is the locked herbal-extract Caution token. Camphor listed for scent is camphor-as-inactive Caution. ${PG_TOPICAL_TAP} Pack sizes (NDC 59316-101) share this formulaId. Distinct from the current 4% green gel (no paraben). Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.gel35} (NDC 59316-101) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proGel,
    productName: 'Biofreeze Professional Gel 5%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000248 731124000279',
    formulaId: FID.pro5,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: proGreenFiveInactives(SET.proGel),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Gel 5% = Avoid. Drivers are Blue 1 + Yellow 5. Same botanical / silica / TEA / IPA stack as the 4% green gel minus camphor-as-inactive. Professional Gel + Professional Roll-On 5% share formulaId biofreeze-professional-gel-5 (same OI + menthol 5%). Do not clone the 4% green formulaId (that SPL lists camphor as inactive). Pack sizes (NDC 59316-115) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proGel} (NDC 59316-115) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proRoll,
    productName: 'Biofreeze Professional Roll-On 5%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000231 731124000262',
    formulaId: FID.pro5,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: proGreenFiveInactives(SET.proRoll),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Roll-On 5% = Avoid. Same OI + menthol 5% as Professional Gel — shared formulaId biofreeze-professional-gel-5. Drivers are Blue 1 + Yellow 5. Pack sizes (NDC 59316-117) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proRoll} (NDC 59316-117) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with professional gel setid ${SET.proGel} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proColorGel,
    productName: 'Biofreeze Professional Colorless Gel 5%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124445353',
    formulaId: FID.proColor5,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: proColorlessFiveInactives(SET.proColorGel),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Colorless Gel 5% = Caution. No High. Same botanical / silica / TEA / IPA stack as the 4% colorless gel minus camphor-as-inactive. Professional Colorless Gel + Colorless Roll-On 5% share formulaId biofreeze-professional-colorless-gel-5. Do not clone the 4% colorless formulaId. Pack sizes (NDC 59316-116) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proColorGel} (NDC 59316-116) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proColorRoll,
    productName: 'Biofreeze Professional Colorless Roll-On 5%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.proColor5,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: proColorlessFiveInactives(SET.proColorRoll),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Colorless Roll-On 5% = Caution. Same OI + menthol 5% as Professional Colorless Gel — shared formulaId biofreeze-professional-colorless-gel-5. No High. Pack sizes (NDC 59316-118) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proColorRoll} (NDC 59316-118) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with professional colorless gel setid ${SET.proColorGel} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ovnGel,
    productName: 'Biofreeze Overnight Relief Gel 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444141',
    formulaId: FID.ovnGel,
    audience: ADULT,
    minAge: 2,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: overnightGelInactives(SET.ovnGel, false),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Overnight Relief Gel 4% = Caution. Fragrance + botanical extracts are standalone Caution. Alcohol + IPA Limited. Carbomer interpolymer / aloe / glycerin / tocopherol acetate / water Cleared. No High. Distinct from Overnight Roll-On (that SPL adds colloidal silicon dioxide) — own formulaId. Pack sizes (NDC 59316-121) share this formulaId. Ages 2+ (2–12: use only under adult supervision; under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ovnGel} (NDC 59316-121) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ovnRoll,
    productName: 'Biofreeze Overnight Relief Roll-On 4%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444158',
    formulaId: FID.ovnRoll,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: overnightGelInactives(SET.ovnRoll, true),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Overnight Relief Roll-On 4% = Caution. Same overnight botanical / fragrance / alcohol stack as the Overnight Gel plus colloidal silicon dioxide (SiO2 nanoparticle Caution cap). Own formulaId — do not clone the Overnight Gel. No High. Pack sizes (NDC 59316-207) share this formulaId. Ages 2+ (under 2: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ovnRoll} (NDC 59316-207) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.sprayDenat,
    productName: 'Biofreeze Pain Relief Spray 10.5% (denatonium)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.sprayDenat,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '10.5%' },
    ],
    inactiveIngredients: denatoniumSprayInactives(SET.sprayDenat),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relief Spray 10.5% (denatonium) = Caution. Denatonium benzoate + botanical extracts/oils + tert-butyl alcohol are standalone Caution. Alcohol + IPA Limited. MSM / IPM / glycerin / water Cleared. No High. Consumer spray + Professional aerosol share formulaId biofreeze-pain-relief-spray-10-5-denatonium (same OI + menthol 10.5%). Distinct from the alcohol-denat. 10.5% spray (no denatonium / no tert-butyl alcohol). Pack sizes (NDC 59316-833) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.sprayDenat} (NDC 59316-833) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proAerosol,
    productName: 'Biofreeze Professional Spray 10.5% (denatonium aerosol)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.sprayDenat,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '10.5%' },
    ],
    inactiveIngredients: denatoniumSprayInactives(SET.proAerosol),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Spray 10.5% (denatonium aerosol) = Caution. Same OI + menthol 10.5% as the consumer denatonium spray — shared formulaId biofreeze-pain-relief-spray-10-5-denatonium. No High. Pack sizes (NDC 59316-834) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proAerosol} (NDC 59316-834) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with consumer denatonium spray setid ${SET.sprayDenat} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.sprayAlc,
    productName: 'Biofreeze Pain Relief Spray 10.5% (alcohol denat.)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000071 731124001146',
    formulaId: FID.sprayAlc,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '10.5%' },
    ],
    inactiveIngredients: alcoholDenatSprayInactives(SET.sprayAlc),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relief Spray 10.5% (alcohol denat., no denatonium) = Caution. Botanical extracts Caution. Alcohol denat. Limited. Dimethyl sulfone (MSM) / IPM / water Cleared. No High. Consumer spray + Professional spray + Precision Relief Pen share formulaId biofreeze-pain-relief-spray-10-5 (same OI + menthol 10.5%). Distinct from the denatonium 10.5% aerosol. Pack sizes (NDC 59316-114) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.sprayAlc} (NDC 59316-114) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proSprayAlc,
    productName: 'Biofreeze Professional Spray 10.5% (alcohol denat.)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124000255 731124000286',
    formulaId: FID.sprayAlc,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '10.5%' },
    ],
    inactiveIngredients: alcoholDenatSprayInactives(SET.proSprayAlc),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Spray 10.5% (alcohol denat.) = Caution. Same OI + menthol 10.5% as the consumer alcohol-denat. spray and the Precision Relief Pen — shared formulaId biofreeze-pain-relief-spray-10-5. No High. Pack sizes (NDC 59316-120) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proSprayAlc} (NDC 59316-120) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with alcohol-denat. spray setid ${SET.sprayAlc} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.pen,
    productName: 'Biofreeze Precision Relief Pen 10.5%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124003485',
    formulaId: FID.sprayAlc,
    audience: ADULT,
    minAge: 12,
    form: 'pen',
    activeIngredients: [
      { name: 'Menthol', strength: '10.5%' },
    ],
    inactiveIngredients: alcoholDenatSprayInactives(SET.pen),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Precision Relief Pen 10.5% = Caution. Same OI + menthol 10.5% as the alcohol-denat. 10.5% sprays — shared formulaId biofreeze-pain-relief-spray-10-5. Form (pen vs spray) is labeled, not a hard filter. No High. Pack sizes (NDC 59316-830) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.pen} (NDC 59316-830) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with alcohol-denat. spray setid ${SET.sprayAlc} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.spray10,
    productName: 'Biofreeze Pain Relieving Spray 10%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.spray10,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      ...botanicals(SET.spray10, [
        'Arnica Montana',
        'Calendula',
        'Chamomile',
      ]),
      flag('Dimethyl Sulfone', 'cleared', dailymed(SET.spray10, METH.msm)),
      ...botanicals(SET.spray10, ['Echinacea']),
      flag('Ethanol', 'limited', dailymed(SET.spray10, METH.alcoholVehicle)),
      ...botanicals(SET.spray10, ['ilex Paraguarenis']),
      flag('Isopropyl Myristate', 'cleared', dailymed(SET.spray10, METH.ipm)),
      ...botanicals(SET.spray10, ['Juniper Berry']),
      cleared(SET.spray10, 'water'),
      ...botanicals(SET.spray10, ['White Tea']),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relieving Spray 10% (older SPL) = Caution. Arnica / calendula / chamomile / echinacea / ilex / juniper berry / white tea are locked topical-botanical Caution tokens. Ethanol Limited. Dimethyl sulfone is MSM Cleared. IPM / water Cleared. No High. Distinct from the current 10.5% sprays (different OI). Pack sizes (NDC 59316-104) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.spray10} (NDC 59316-104) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.proSpray13,
    productName: 'Biofreeze Professional Spray 13%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    formulaId: FID.proSpray13,
    audience: ADULT,
    minAge: 12,
    form: 'spray',
    activeIngredients: [
      { name: 'Menthol', strength: '13%' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.proSpray13, METH.alcoholVehicle)),
      ...botanicals(SET.proSpray13, [
        'Arnica Montana Flower Extract',
        'Calendula Officinalis Flower Extract',
        'Camellia Sinensis Leaf Oil',
        'Chamomilla Recutita (Matricaria) Flower Extract',
        'Echinacea Angustifolia Extract',
      ]),
      cleared(SET.proSpray13, 'Glycerin'),
      ...botanicals(SET.proSpray13, ['Ilex Paraguariensis Leaf Extract']),
      flag('Isopropyl Alcohol', 'limited', dailymed(SET.proSpray13, METH.ipa)),
      flag('Isopropyl Myristate', 'cleared', dailymed(SET.proSpray13, METH.ipm)),
      ...botanicals(SET.proSpray13, ['Juniperus Communis Fruit Extract']),
      flag('Methylsulfonylmethane', 'cleared', dailymed(SET.proSpray13, METH.msm)),
      flag('Propylene Glycol', 'cleared', dailymed(SET.proSpray13, METH.pgTopical)),
      cleared(SET.proSpray13, 'Purified Water'),
      flag('Tert-Butyl Alcohol', 'cleared', dailymed(SET.proSpray13, METH.tertButyl)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Professional Spray 13% = Caution. Botanical extracts/oils + tert-butyl alcohol Caution. Alcohol + IPA Limited. MSM / IPM / glycerin / water Cleared. ${PG_TOPICAL_TAP} No High. Distinct from the 10.5% sprays (menthol 13% + PG on this SPL). Pack sizes (NDC 59316-835) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.proSpray13} (NDC 59316-835) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.creamJar,
    productName: 'Biofreeze Pain Relief Cream',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124001009',
    formulaId: FID.creamJar,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Caprylic/Capric Triglyceride', 'limited', dailymed(SET.creamJar, METH.mctUnlabeled)),
      flag('Caprylyl Glycol', 'limited', dailymed(SET.creamJar, METH.caprylyl)),
      flag('Alcohol', 'limited', dailymed(SET.creamJar, METH.alcoholVehicle)),
      flag('Dimethicone', 'cleared', dailymed(SET.creamJar, METH.dimethicone)),
      flag('Gluconolactone', 'cleared', dailymed(SET.creamJar, METH.gluconolactone)),
      cleared(SET.creamJar, 'Glycerin'),
      flag('Glyceryl Stearate', 'cleared', dailymed(SET.creamJar, METH.glycerylStearate)),
      flag('Hydroxyacetophenone', 'cleared', dailymed(SET.creamJar, METH.hydroxyaceto)),
      ...botanicals(SET.creamJar, ['Ilex Paraguariensis Leaf Extract']),
      flag('Iodopropynyl Butylcarbamate', 'cleared', dailymed(SET.creamJar, METH.ipbc)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.creamJar, METH.phenoxy)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.creamJar, METH.ps60)),
      flag('Sodium Benzoate', 'limited', dailymed(SET.creamJar, METH.benzoate)),
      flag('Sodium Hydroxide', 'cleared', dailymed(SET.creamJar, METH.naoh)),
      flag('Sodium Stearoyl Lactylate', 'cleared', dailymed(SET.creamJar, METH.ssl)),
      flag('Tocopheryl Acetate', 'cleared', dailymed(SET.creamJar, METH.tocopherol)),
      flag('Vitis Vinifera (Grape) Seed Oil', 'cleared', dailymed(SET.creamJar, METH.grapeSeed)),
      cleared(SET.creamJar, 'Water'),
      flag('Calcium Gluconate', 'cleared', dailymed(SET.creamJar, METH.caGluconate)),
      flag('Cetostearyl Alcohol', 'cleared', dailymed(SET.creamJar, METH.fattyAlcohol)),
      flag('Edetate Sodium', 'cleared', dailymed(SET.creamJar, METH.edta)),
      flag('Isopropyl Alcohol', 'limited', dailymed(SET.creamJar, METH.ipa)),
      flag('PEG-4 Laurate', 'cleared', dailymed(SET.creamJar, METH.peg4)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Pain Relief Cream (jar) = Caution. Polysorbate 60 is Moderate (2 pts). Caprylic/capric triglyceride is unlabeled-MCT Limited. Alcohol / IPA / caprylyl glycol / sodium benzoate Limited. Ilex extract / IPBC / hydroxyacetophenone / phenoxyethanol / PEG-4 laurate standalone Caution. Grape seed oil is the named cream-vehicle Cleared oil (not gummy High). ${CREAM_OIL_TAP} No High. Distinct from Overnight Relief Cream (that SPL adds fragrance). Pack sizes (NDC 59316-869) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.creamJar} (NDC 59316-869) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ovnCream,
    productName: 'Biofreeze Overnight Relief Cream',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444547',
    formulaId: FID.ovnCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Alcohol', 'limited', dailymed(SET.ovnCream, METH.alcoholVehicle)),
      flag('Calcium Gluconate', 'cleared', dailymed(SET.ovnCream, METH.caGluconate)),
      flag('Caprylic/Capric Triglyceride', 'limited', dailymed(SET.ovnCream, METH.mctUnlabeled)),
      flag('Caprylyl Glycol', 'limited', dailymed(SET.ovnCream, METH.caprylyl)),
      flag('Cetostearyl Alcohol', 'cleared', dailymed(SET.ovnCream, METH.fattyAlcohol)),
      flag('Dimethicone', 'cleared', dailymed(SET.ovnCream, METH.dimethicone)),
      flag('Edetate Sodium', 'cleared', dailymed(SET.ovnCream, METH.edta)),
      flag('Fragrance', 'cleared', dailymed(SET.ovnCream, METH.fragrance)),
      flag('Gluconolactone', 'cleared', dailymed(SET.ovnCream, METH.gluconolactone)),
      cleared(SET.ovnCream, 'Glycerin'),
      flag('Glyceryl Stearate', 'cleared', dailymed(SET.ovnCream, METH.glycerylStearate)),
      flag('Grapeseed Oil Refined', 'cleared', dailymed(SET.ovnCream, METH.grapeSeed)),
      flag('Hydroxyacetophenone', 'cleared', dailymed(SET.ovnCream, METH.hydroxyaceto)),
      ...botanicals(SET.ovnCream, ['Ilex Paraguariensis Leaf Extract']),
      flag('Iodopropynyl Butylcarbamate', 'cleared', dailymed(SET.ovnCream, METH.ipbc)),
      flag('Isopropyl Alcohol', 'limited', dailymed(SET.ovnCream, METH.ipa)),
      flag('PEG-4 Laurate', 'cleared', dailymed(SET.ovnCream, METH.peg4)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.ovnCream, METH.phenoxy)),
      flag('Polysorbate 60', 'moderate', dailymed(SET.ovnCream, METH.ps60)),
      cleared(SET.ovnCream, 'Purified Water'),
      flag('Sodium Benzoate', 'limited', dailymed(SET.ovnCream, METH.benzoate)),
      flag('Sodium Hydroxide', 'cleared', dailymed(SET.ovnCream, METH.naoh)),
      flag('Sodium Stearoyl Lactylate', 'cleared', dailymed(SET.ovnCream, METH.ssl)),
      flag('Tocopheryl Acetate', 'cleared', dailymed(SET.ovnCream, METH.tocopherol)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Overnight Relief Cream = Caution. Fragrance + ilex extract / IPBC / hydroxyacetophenone / phenoxyethanol / PEG-4 laurate standalone Caution. Polysorbate 60 Moderate. Alcohol / IPA / unlabeled MCT / caprylyl glycol / sodium benzoate Limited. Grapeseed oil refined is the named cream-vehicle Cleared oil. ${CREAM_OIL_TAP} Own formulaId — do not clone the jar cream (that SPL has no fragrance). No High. Pack sizes (NDC 59316-870) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ovnCream} (NDC 59316-870) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.foam,
    productName: 'Biofreeze Foam 7%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124002822',
    formulaId: FID.foam,
    audience: ADULT,
    minAge: 12,
    form: 'foam',
    activeIngredients: [
      { name: 'Menthol', strength: '7%' },
    ],
    inactiveIngredients: [
      flag('Alcohol Denat.', 'limited', dailymed(SET.foam, METH.alcoholVehicle)),
      flag('Aloe Barbadensis Leaf Extract', 'cleared', dailymed(SET.foam, METH.aloe)),
      ...botanicals(SET.foam, [
        'Arctium Lappa Root Extract',
        'Arnica Montana Flower Extract',
      ]),
      flag('Bis-PEG-10 Dimethicone', 'cleared', dailymed(SET.foam, METH.bisPeg)),
      ...botanicals(SET.foam, [
        'Boswellia Carterii Resin Extract',
        'Calendula Officinalis Flower Extract',
        'Camellia Sinensis Leaf Extract',
      ]),
      flag(
        'Hydroxyethyl Cetyldimonium Phosphate',
        'cleared',
        dailymed(SET.foam, METH.hecPhosphate),
      ),
      ...botanicals(SET.foam, ['Ilex Paraguariensis Leaf Extract']),
      flag('Isopropyl Palmitate', 'cleared', dailymed(SET.foam, METH.ipp)),
      ...botanicals(SET.foam, ['Melissa Officinalis Leaf Extract']),
      flag('PEG-12 Dimethicone', 'cleared', dailymed(SET.foam, METH.peg12)),
      flag('Pentylene Glycol', 'cleared', dailymed(SET.foam, METH.pentylene)),
      flag('PPG-24-Glycereth-24', 'cleared', dailymed(SET.foam, METH.ppg24)),
      cleared(SET.foam, 'Water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Foam 7% = Caution. Botanical extracts + bis-PEG-10 dimethicone / PEG-12 dimethicone / PPG-24-glycereth-24 / hydroxyethyl cetyldimonium phosphate standalone Caution. Alcohol denat. Limited. Aloe / isopropyl palmitate / pentylene glycol / water Cleared. No High. Pack sizes (NDC 59316-991) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.foam} (NDC 59316-991) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.stick,
    productName: 'Biofreeze Dry Stick 15%',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444950',
    formulaId: FID.stick,
    audience: ADULT,
    minAge: 12,
    form: 'stick',
    activeIngredients: [
      { name: 'Menthol', strength: '15%' },
    ],
    inactiveIngredients: [
      flag('alpha-tocopherol acetate', 'cleared', dailymed(SET.stick, METH.tocopherol)),
      flag('arachidic acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('c15-19 alkane', 'cleared', dailymed(SET.stick, METH.c1519)),
      flag('hydrogenated castor oil', 'cleared', dailymed(SET.stick, METH.hco)),
      flag('lauric acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('linoleic acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('linolenic acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('menthyl ethylamido oxalate', 'cleared', dailymed(SET.stick, METH.menthylOxalate)),
      flag('myristic acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('oleic acid', 'cleared', dailymed(SET.stick, METH.oleic)),
      flag('palmitic acid', 'cleared', dailymed(SET.stick, METH.fattyAcid)),
      flag('paraffin', 'cleared', dailymed(SET.stick, METH.mineralOil)),
      flag('petrolatum', 'cleared', dailymed(SET.stick, METH.petrolatum)),
      flag('stearic acid', 'cleared', dailymed(SET.stick, METH.stearic)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Dry Stick 15% = Caution. Menthyl ethylamido oxalate is standalone Caution. Named fatty acids / C15-19 alkane / hydrogenated castor oil / oleic / stearic / tocopherol acetate Cleared. Paraffin + petrolatum are topical-occlusive Cleared. ${MINERAL_OIL_TAP} No High. Pack sizes (NDC 59316-230) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.stick} (NDC 59316-230) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tripleRoll,
    productName: 'Biofreeze Triple Target Roll-On',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444905',
    formulaId: FID.triple,
    audience: ADULT,
    minAge: 12,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Camphor', strength: '6%' },
      { name: 'Capsaicin', strength: '0.05%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: tripleTargetInactives(SET.tripleRoll),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Triple Target Roll-On = Caution. Denatonium / ethylhexylglycerin / menthyl ethylamido oxalate / phenoxyethanol / steareth-2 / steareth-21 / tert-butyl alcohol / tetrasodium glutamate diacetate / TEA / acrylate crosspolymer standalone Caution. Alcohol / 1,2-hexanediol / caprylyl glycol Limited. Carbomer / glycerin / propanediol / water Cleared. No High. Roll-On + Gel share formulaId biofreeze-triple-target-roll-on (same OI + camphor 6% / capsaicin 0.05% / menthol 10%). Pack sizes (NDC 59316-208) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tripleRoll} (NDC 59316-208) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.tripleGel,
    productName: 'Biofreeze Triple Target Gel',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124444912',
    formulaId: FID.triple,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [
      { name: 'Camphor', strength: '6%' },
      { name: 'Capsaicin', strength: '0.05%' },
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: tripleTargetInactives(SET.tripleGel),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Triple Target Gel = Caution. Same OI + actives as Triple Target Roll-On — shared formulaId biofreeze-triple-target-roll-on. No High. Pack sizes (NDC 59316-122) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.tripleGel} (NDC 59316-122) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with Triple Target Roll-On setid ${SET.tripleRoll} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.mentholPatch,
    productName: 'Biofreeze Menthol Pain Relief Patches (Large / XL)',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124001719 731124001696 731124002778',
    formulaId: FID.mentholPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: [
      flag('1,2-Hexanediol', 'limited', dailymed(SET.mentholPatch, METH.hexanediol)),
      flag('Aloe Barbadensis Leaf Extract', 'cleared', dailymed(SET.mentholPatch, METH.aloe)),
      ...botanicals(SET.mentholPatch, [
        'Arnica Montana Flower Extract',
        'Boswellia Carterii Resin Extract',
        'Camellia Sinensis Leaf Extract',
      ]),
      flag('Carboxymethylcellulose Sodium', 'cleared', dailymed(SET.mentholPatch, METH.cellulose)),
      flag('Dihydroxyaluminum Aminoacetate', 'cleared', dailymed(SET.mentholPatch, METH.dihydroxyAl)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.mentholPatch, METH.ethylhexyl)),
      cleared(SET.mentholPatch, 'Glycerin'),
      flag('Iodopropynyl Butylcarbamate', 'cleared', dailymed(SET.mentholPatch, METH.ipbc)),
      flag('Kaolin', 'cleared', dailymed(SET.mentholPatch, METH.kaolin)),
      flag('Mineral Oil', 'cleared', dailymed(SET.mentholPatch, METH.mineralOil)),
      flag('Petrolatum', 'cleared', dailymed(SET.mentholPatch, METH.petrolatum)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.mentholPatch, METH.phenoxy)),
      flag('Polyacrylic Acid', 'cleared', dailymed(SET.mentholPatch, METH.polyacrylate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.mentholPatch, METH.ps80)),
      flag('Povidone', 'cleared', dailymed(SET.mentholPatch, METH.povidone)),
      flag('Propylene Glycol', 'cleared', dailymed(SET.mentholPatch, METH.pgTopical)),
      cleared(SET.mentholPatch, 'Purified Water'),
      flag('Sodium Polyacrylate', 'cleared', dailymed(SET.mentholPatch, METH.polyacrylate)),
      flag('Tartaric Acid', 'cleared', dailymed(SET.mentholPatch, METH.tartaric)),
      flag('Titanium Dioxide', 'high', dailymed(SET.mentholPatch, METH.tio2)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Menthol Pain Relief Patches (Large / XL) = Avoid. Driver is titanium dioxide (High; no topical exception). Botanical extracts / IPBC / ethylhexylglycerin / phenoxyethanol / dihydroxyaluminum aminoacetate / polyacrylate standalone Caution. Polysorbate 80 Moderate. 1,2-hexanediol Limited. ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} Large / XL pack sizes (NDC 59316-992) share this formulaId — one Search row. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.mentholPatch} (NDC 59316-992) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.ovnPatch,
    productName: 'Biofreeze Overnight Relief Patches',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124003935',
    formulaId: FID.ovnPatch,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: [
      flag('Benzalkonium Chloride', 'cleared', dailymed(SET.ovnPatch, METH.bkc)),
      flag('Carboxymethylcellulose Sodium', 'cleared', dailymed(SET.ovnPatch, METH.cellulose)),
      flag('Dihydroxyaluminum Aminoacetate', 'cleared', dailymed(SET.ovnPatch, METH.dihydroxyAl)),
      flag('Edetate Disodium', 'cleared', dailymed(SET.ovnPatch, METH.edta)),
      cleared(SET.ovnPatch, 'Glycerin'),
      flag('Kaolin', 'cleared', dailymed(SET.ovnPatch, METH.kaolin)),
      flag('Lauralkonium Chloride', 'cleared', dailymed(SET.ovnPatch, METH.lauralkonium)),
      flag('Lavender Oil', 'cleared', dailymed(SET.ovnPatch, METH.lavender)),
      flag('Mineral Oil', 'cleared', dailymed(SET.ovnPatch, METH.mineralOil)),
      flag('Petrolatum', 'cleared', dailymed(SET.ovnPatch, METH.petrolatum)),
      flag('Polyacrylic Acid', 'cleared', dailymed(SET.ovnPatch, METH.polyacrylate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.ovnPatch, METH.ps80)),
      flag('Povidone', 'cleared', dailymed(SET.ovnPatch, METH.povidone)),
      flag('Propylene Glycol', 'cleared', dailymed(SET.ovnPatch, METH.pgTopical)),
      cleared(SET.ovnPatch, 'Purified Water'),
      flag('Sodium Polyacrylate', 'cleared', dailymed(SET.ovnPatch, METH.polyacrylate)),
      flag('Tartaric Acid', 'cleared', dailymed(SET.ovnPatch, METH.tartaric)),
      flag('Titanium Dioxide', 'high', dailymed(SET.ovnPatch, METH.tio2)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Overnight Relief Patches = Avoid. Driver is titanium dioxide (High). BKC / lauralkonium chloride / lavender oil / dihydroxyaluminum aminoacetate / polyacrylate standalone Caution. Polysorbate 80 Moderate. ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} Pack sizes (NDC 59316-005) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.ovnPatch} (NDC 59316-005) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.flexStrip,
    productName: 'Biofreeze Flexible Relief Strip',
    brand: 'Biofreeze',
    category: PAIN_FEVER,
    barcode: '731124003782',
    formulaId: FID.flexStrip,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '5.6%' },
    ],
    inactiveIngredients: [
      flag('Aloe Barbadensis Leaf Extract', 'cleared', dailymed(SET.flexStrip, METH.aloe)),
      ...botanicals(SET.flexStrip, [
        'Arnica Montana Flower Extract',
      ]),
      flag('Benzalkonium Chloride', 'cleared', dailymed(SET.flexStrip, METH.bkc)),
      ...botanicals(SET.flexStrip, [
        'Boswellia Carterii Resin Extract',
        'Camellia Sinensis Leaf Extract',
      ]),
      flag('Carboxymethylcellulose Sodium', 'cleared', dailymed(SET.flexStrip, METH.cellulose)),
      flag('Dihydroxyaluminum Aminoacetate', 'cleared', dailymed(SET.flexStrip, METH.dihydroxyAl)),
      flag('Edetate Disodium', 'cleared', dailymed(SET.flexStrip, METH.edta)),
      cleared(SET.flexStrip, 'Glycerin'),
      flag('Isopropyl Myristate', 'cleared', dailymed(SET.flexStrip, METH.ipm)),
      flag('Kaolin', 'cleared', dailymed(SET.flexStrip, METH.kaolin)),
      flag('L-Tartaric Acid', 'cleared', dailymed(SET.flexStrip, METH.tartaric)),
      flag('Lauralkonium Chloride', 'cleared', dailymed(SET.flexStrip, METH.lauralkonium)),
      flag('Mineral Oil', 'cleared', dailymed(SET.flexStrip, METH.mineralOil)),
      flag('Nonoxynol-10', 'cleared', dailymed(SET.flexStrip, METH.nonoxynol10)),
      flag('Petrolatum', 'cleared', dailymed(SET.flexStrip, METH.petrolatum)),
      flag('Polyacrylic Acid', 'cleared', dailymed(SET.flexStrip, METH.polyacrylate)),
      flag('Polysorbate 80', 'moderate', dailymed(SET.flexStrip, METH.ps80)),
      flag('Propylene Glycol', 'cleared', dailymed(SET.flexStrip, METH.pgTopical)),
      flag('PVP', 'cleared', dailymed(SET.flexStrip, METH.povidone)),
      flag('Sodium Polyacrylate', 'cleared', dailymed(SET.flexStrip, METH.polyacrylate)),
      flag('Titanium Dioxide', 'high', dailymed(SET.flexStrip, METH.tio2)),
      cleared(SET.flexStrip, 'Water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Biofreeze Flexible Relief Strip = Avoid. Driver is titanium dioxide (High). Botanical extracts / BKC / lauralkonium / nonoxynol-10 / dihydroxyaluminum aminoacetate / polyacrylate standalone Caution. Polysorbate 80 Moderate. ${PG_TOPICAL_TAP} ${MINERAL_OIL_TAP} Pack sizes (NDC 59316-004) share this formulaId. Ages 12+ (under 12: consult a physician). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'biofreeze.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.flexStrip} (NDC 59316-004) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bengayCream,
    productName: 'Bengay Ultra Strength Non-Greasy Cream',
    brand: 'Bengay',
    category: PAIN_FEVER,
    barcode: '074300081946',
    formulaId: FID.bengayCream,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Camphor', strength: '4%' },
      { name: 'Menthol', strength: '10%' },
      { name: 'Methyl salicylate', strength: '30%' },
    ],
    inactiveIngredients: [
      flag('carbomer', 'cleared', dailymed(SET.bengayCream, METH.carbomer)),
      flag('disodium EDTA', 'cleared', dailymed(SET.bengayCream, METH.edta)),
      flag('glyceryl stearate SE', 'cleared', dailymed(SET.bengayCream, METH.glycerylSE)),
      flag('lanolin', 'cleared', dailymed(SET.bengayCream, METH.lanolin)),
      flag('polysorbate 80', 'moderate', dailymed(SET.bengayCream, METH.ps80)),
      flag('potassium hydroxide', 'cleared', dailymed(SET.bengayCream, METH.koh)),
      flag('stearic acid', 'cleared', dailymed(SET.bengayCream, METH.stearic)),
      flag('triethanolamine', 'cleared', dailymed(SET.bengayCream, METH.tea)),
      cleared(SET.bengayCream, 'water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Bengay Ultra Strength Non-Greasy Cream = Caution. Lanolin + TEA standalone Caution. Polysorbate 80 Moderate. Glyceryl stearate SE / carbomer / disodium EDTA / KOH / stearic acid / water Cleared. No High. 57 g + 113 g pack sizes (NDC 69968-0538) share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bengayCream} (NDC 69968-0538) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bengayGel,
    productName: 'Bengay Vanishing Scent Gel',
    brand: 'Bengay',
    category: PAIN_FEVER,
    barcode: '074300081977',
    formulaId: FID.bengayGel,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '2.5%' },
    ],
    inactiveIngredients: [
      flag('camphor', 'cleared', dailymed(SET.bengayGel, METH.camphorInactive)),
      flag('carbomer', 'cleared', dailymed(SET.bengayGel, METH.carbomer)),
      flag('DMDM hydantoin', 'cleared', dailymed(SET.bengayGel, METH.dmdm)),
      flag('isoceteth-20', 'cleared', dailymed(SET.bengayGel, METH.isoceteth20)),
      flag('isopropyl alcohol', 'limited', dailymed(SET.bengayGel, METH.ipa)),
      flag('PEG-40 hydrogenated castor oil', 'cleared', dailymed(SET.bengayGel, METH.polyoxylCastor)),
      flag('sodium hydroxide', 'cleared', dailymed(SET.bengayGel, METH.naoh)),
      cleared(SET.bengayGel, 'water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Bengay Vanishing Scent Gel = Caution. Camphor listed as inactive + DMDM hydantoin + isoceteth-20 standalone Caution. IPA Limited. PEG-40 hydrogenated castor oil sits on the locked polyoxyl castor oil Cleared row. Carbomer / NaOH / water Cleared. No High. Pack sizes (NDC 69968-0595) share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bengayGel} (NDC 69968-0595) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.bengayLido,
    productName: 'Bengay 4% Lidocaine Tropical Jasmine Cream',
    brand: 'Bengay',
    category: PAIN_FEVER,
    barcode: '074300081793',
    formulaId: FID.bengayLido,
    audience: ADULT,
    minAge: 12,
    form: 'cream',
    activeIngredients: [
      { name: 'Lidocaine HCl', strength: '4%' },
    ],
    inactiveIngredients: [
      flag(
        'acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.bengayLido, METH.acrylate),
      ),
      flag('aminomethyl propanol', 'cleared', dailymed(SET.bengayLido, METH.amp)),
      flag('butylene glycol', 'cleared', dailymed(SET.bengayLido, METH.butylene)),
      flag('caprylyl glycol', 'limited', dailymed(SET.bengayLido, METH.caprylyl)),
      flag('ceteth-10 phosphate', 'cleared', dailymed(SET.bengayLido, METH.ceteth10)),
      flag('cetostearyl alcohol', 'cleared', dailymed(SET.bengayLido, METH.fattyAlcohol)),
      flag('dicetyl phosphate', 'cleared', dailymed(SET.bengayLido, METH.dicetyl)),
      flag('dimethicone', 'cleared', dailymed(SET.bengayLido, METH.dimethicone)),
      flag('fragrance', 'cleared', dailymed(SET.bengayLido, METH.fragrance)),
      cleared(SET.bengayLido, 'glycerin'),
      flag('glyceryl distearate', 'cleared', dailymed(SET.bengayLido, METH.glycerylDistearate)),
      flag('glyceryl monostearate', 'cleared', dailymed(SET.bengayLido, METH.glycerylStearate)),
      flag(
        'hydroxyethyl acrylate/sodium acryloyldimethyl taurate copolymer',
        'cleared',
        dailymed(SET.bengayLido, METH.amps),
      ),
      flag('phenoxyethanol', 'cleared', dailymed(SET.bengayLido, METH.phenoxy)),
      flag('polysorbate 60', 'moderate', dailymed(SET.bengayLido, METH.ps60)),
      flag('SD alcohol 40-B', 'limited', dailymed(SET.bengayLido, METH.alcoholVehicle)),
      flag('squalane', 'cleared', dailymed(SET.bengayLido, METH.squalane)),
      flag('steareth-21', 'cleared', dailymed(SET.bengayLido, METH.steareth)),
      cleared(SET.bengayLido, 'water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Bengay 4% Lidocaine Tropical Jasmine Cream = Caution. Fragrance / AMP / AMPS / ceteth-10 phosphate / dicetyl phosphate / steareth-21 / phenoxyethanol / acrylate crosspolymer standalone Caution. Polysorbate 60 Moderate. SD alcohol 40-B + caprylyl glycol Limited. Glyceryl distearate / glyceryl monostearate / squalane / butylene glycol / dimethicone / cetostearyl alcohol / glycerin / water Cleared. No High. Pack sizes (NDC 69968-0614) share this formulaId. Ages 12+ (under 12: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.bengayLido} (NDC 69968-0614) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.capzasinHp,
    productName: 'Capzasin HP Arthritis Pain Relief Cream 0.1%',
    brand: 'Capzasin',
    category: PAIN_FEVER,
    barcode: '041167751466',
    formulaId: FID.capzasinHp,
    audience: ADULT,
    minAge: 18,
    form: 'cream',
    activeIngredients: [
      { name: 'Capsaicin', strength: '0.1%' },
    ],
    inactiveIngredients: [
      flag('benzyl alcohol', 'cleared', dailymed(SET.capzasinHp, METH.benzylTopical)),
      flag('cetyl alcohol', 'cleared', dailymed(SET.capzasinHp, METH.fattyAlcohol)),
      flag('glyceryl stearate', 'cleared', dailymed(SET.capzasinHp, METH.glycerylStearate)),
      flag('isopropyl myristate', 'cleared', dailymed(SET.capzasinHp, METH.ipm)),
      flag('PEG-40 stearate', 'moderate', dailymed(SET.capzasinHp, METH.pegStearate)),
      flag('petrolatum', 'cleared', dailymed(SET.capzasinHp, METH.petrolatum)),
      flag('sorbitol', 'limited', dailymed(SET.capzasinHp, METH.sorbitol)),
      cleared(SET.capzasinHp, 'water'),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Capzasin HP Arthritis Pain Relief Cream 0.1% = Caution. Benzyl alcohol as topical inactive is standalone Caution (does not change the oral population-split rule). PEG-40 stearate sits on the PEG-stearate Moderate row. Sorbitol Limited. Cetyl / glyceryl stearate / IPM / petrolatum / water Cleared. No High. Distinct from Capzasin Quick Relief Gel (batch 49, paraben Avoid). Pack sizes (NDC 41167-7514) share this formulaId. Ages 18+ (18 or younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.capzasinHp} (NDC 41167-7514) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.miExtremeGel,
    productName: 'Mineral Ice Extreme Gel',
    brand: 'Mineral Ice',
    category: PAIN_FEVER,
    barcode: '850078192035',
    formulaId: FID.miExtremeGel,
    audience: ADULT,
    minAge: 12,
    form: 'gel',
    activeIngredients: [
      { name: 'Menthol', strength: '10%' },
    ],
    inactiveIngredients: [
      flag('Alcohol Denat.', 'limited', dailymed(SET.miExtremeGel, METH.alcoholVehicle)),
      cleared(SET.miExtremeGel, 'Aqua (Water)'),
      flag('Propylene Glycol', 'cleared', dailymed(SET.miExtremeGel, METH.pgTopical)),
      flag('Polyacrylate Crosspolymer-6', 'cleared', dailymed(SET.miExtremeGel, METH.polyCross6)),
      flag(
        'Acrylates/C10-30 Alkyl Acrylate Crosspolyer',
        'cleared',
        dailymed(SET.miExtremeGel, METH.acrylate),
      ),
      flag('Aminomethyl Propanol', 'cleared', dailymed(SET.miExtremeGel, METH.amp)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.miExtremeGel, METH.ethylhexyl)),
      flag('Lysine', 'cleared', dailymed(SET.miExtremeGel, METH.lysine)),
      flag('Copper Sulfate', 'cleared', dailymed(SET.miExtremeGel, METH.cuSulfate)),
      flag('Manganese Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.salts)),
      flag('Aluminum Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.salts)),
      flag('Gluconolactone', 'cleared', dailymed(SET.miExtremeGel, METH.gluconolactone)),
      flag('Magnesium Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.salts)),
      flag('Potassium Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.kcl)),
      flag('Phenethyl Alcohol', 'cleared', dailymed(SET.miExtremeGel, METH.phenethyl)),
      flag('Sodium Benzoate', 'limited', dailymed(SET.miExtremeGel, METH.benzoate)),
      flag('Zinc Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.salts)),
      flag('Caprylyl Glycol', 'limited', dailymed(SET.miExtremeGel, METH.caprylyl)),
      flag('Calcium Gluconate', 'cleared', dailymed(SET.miExtremeGel, METH.caGluconate)),
      flag('Fragrance (Parfum)', 'cleared', dailymed(SET.miExtremeGel, METH.fragrance)),
      flag('Phenoxyethanol', 'cleared', dailymed(SET.miExtremeGel, METH.phenoxy)),
      flag('Sodium Chloride', 'cleared', dailymed(SET.miExtremeGel, METH.nacl)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Mineral Ice Extreme Gel = Caution. Fragrance / AMP / ethylhexylglycerin / phenoxyethanol / phenethyl alcohol / polyacrylate crosspolymer-6 / acrylate crosspolymer (SPL spells Crosspolyer) standalone Caution. Alcohol denat. / sodium benzoate / caprylyl glycol Limited. ${PG_TOPICAL_TAP} Named salts / lysine / gluconolactone / calcium gluconate / water Cleared. No High. Distinct from batch 49 Mineral Ice Extreme Spray. Pack sizes (NDC 82632-253) share this formulaId. Ages 12+ (under 12: do not use, consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'mineraliceextreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.miExtremeGel} (NDC 82632-253) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.miStick,
    productName: 'Mineral Ice Extreme Dry Stick 16%',
    brand: 'Mineral Ice',
    category: PAIN_FEVER,
    barcode: '850078192080',
    formulaId: FID.miStick,
    audience: ADULT,
    minAge: 12,
    form: 'stick',
    activeIngredients: [
      { name: 'Menthol', strength: '16%' },
    ],
    inactiveIngredients: [
      flag('C15-19 Alkane', 'cleared', dailymed(SET.miStick, METH.c1519)),
      flag('Fragrance', 'cleared', dailymed(SET.miStick, METH.fragrance)),
      flag('Hydrogenated Castor Oil', 'cleared', dailymed(SET.miStick, METH.hco)),
      flag('Lauryl Laurate', 'cleared', dailymed(SET.miStick, METH.laurylLaurate)),
      flag('Menthoxypropanediol', 'cleared', dailymed(SET.miStick, METH.menthoxy)),
      flag('Oleic Acid', 'cleared', dailymed(SET.miStick, METH.oleic)),
      flag('Paraffin', 'cleared', dailymed(SET.miStick, METH.mineralOil)),
      flag('Petrolatum', 'cleared', dailymed(SET.miStick, METH.petrolatum)),
      flag('Tocopheryl Acetate', 'cleared', dailymed(SET.miStick, METH.tocopherol)),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Mineral Ice Extreme Dry Stick 16% = Caution. Fragrance + menthoxypropanediol standalone Caution. C15-19 alkane / hydrogenated castor oil / lauryl laurate / oleic / tocopheryl acetate Cleared. Paraffin + petrolatum topical-occlusive Cleared. ${MINERAL_OIL_TAP} SPL lists fragrance twice (including Fragrance @ 2.0%) — one fragrance Caution, not a second class. No High. Pack sizes (NDC 82632-250) share this formulaId. Ages 12+. ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS, 'mineraliceextreme.com'],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.miStick} (NDC 82632-250) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absPlus,
    productName: 'Absorbine Jr. Plus Extra Strength Liquid 4%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476412049',
    formulaId: FID.absPlus,
    audience: ADULT,
    minAge: 2,
    form: 'liquid',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: plusLiquidInactives(SET.absPlusA),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Plus Extra Strength Liquid 4% = Avoid. Driver is FD&C Blue #1 (synthetic dye High). Acetone / chloroxylene (SPL spelling of chloroxylenol) / iodine / potassium iodide / thymol / calendula / echinacea / wormwood herb / wormwood oil standalone Caution. Water Cleared. Two setids (fd5d77fc-… NDC 69693-411 + 46f4ad3c-… NDC 69693-424) share this formulaId — one Search row. PRO Roll-On Liquid has the same OI + menthol 4% and shares this formulaId as a second Search row. Ages 2+ (under 2: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absPlusA} (NDC 69693-411) — ${UNVERIFIED_NOTE}`,
      `twin setid ${SET.absPlusB} (NDC 69693-424) — same OI + actives, shared formulaId — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absProRoll,
    productName: 'Absorbine Jr. PRO Roll-On Liquid 4%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    formulaId: FID.absPlus,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Menthol', strength: '4%' },
    ],
    inactiveIngredients: plusLiquidInactives(SET.absProRoll),
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. PRO Roll-On Liquid 4% = Avoid. Same OI + menthol 4% as Plus Extra Strength Liquid — shared formulaId absorbine-jr-plus-es-liquid. Driver is FD&C Blue #1. Pack sizes (NDC 69693-426) share this formulaId. Ages 2+ (under 2: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absProRoll} (NDC 69693-426) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with Plus Extra Strength Liquid setid ${SET.absPlusA} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absProCream,
    barcode: '889476414036',
    productName: 'Absorbine Jr. PRO Cream',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    formulaId: FID.absProCream,
    audience: ADULT,
    minAge: 2,
    form: 'cream',
    activeIngredients: [
      { name: 'Lidocaine HCl', strength: '4%' },
      { name: 'Phenol', strength: '1.5%' },
    ],
    inactiveIngredients: [
      flag(
        'Acrylates/C10-30 alkyl acrylate crosspolymer',
        'cleared',
        dailymed(SET.absProCream, METH.acrylate),
      ),
      flag('Aloe barbadensis leaf juice', 'cleared', dailymed(SET.absProCream, METH.aloe)),
      flag('Aminomethyl propanol', 'cleared', dailymed(SET.absProCream, METH.amp)),
      flag('Bisabolol', 'cleared', dailymed(SET.absProCream, METH.bisabolol)),
      flag('Cetearyl alcohol', 'cleared', dailymed(SET.absProCream, METH.fattyAlcohol)),
      flag('Ceteth-20 phosphate', 'cleared', dailymed(SET.absProCream, METH.ceteth20)),
      ...botanicals(SET.absProCream, ['Cinnamomum camphora (camphor) leaf oil']),
      flag('Dicetyl phosphate', 'cleared', dailymed(SET.absProCream, METH.dicetyl)),
      flag('Disodium EDTA', 'cleared', dailymed(SET.absProCream, METH.edta)),
      flag('Ethylhexylglycerin', 'cleared', dailymed(SET.absProCream, METH.ethylhexyl)),
      flag('Fragrance', 'cleared', dailymed(SET.absProCream, METH.fragrance)),
      flag('Glyceryl stearate', 'cleared', dailymed(SET.absProCream, METH.glycerylStearate)),
      flag('Mentha arvensis leaf oil', 'cleared', dailymed(SET.absProCream, METH.menthaArvensis)),
      flag('Methylparaben', 'high', dailymed(SET.absProCream, METH.parabens)),
      flag('SD alcohol 40', 'limited', dailymed(SET.absProCream, METH.alcoholVehicle)),
      flag('Steareth-21', 'cleared', dailymed(SET.absProCream, METH.steareth)),
      cleared(SET.absProCream, 'Water'),
      ...botanicals(SET.absProCream, ['Zingiber officinale (ginger) root extract']),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. PRO Cream = Avoid. Driver is methylparaben (High in every form). Camphor leaf oil / ginger extract / Mentha arvensis leaf oil / fragrance / AMP / ceteth-20 phosphate / dicetyl phosphate / ethylhexylglycerin / steareth-21 / acrylate crosspolymer standalone Caution. SD alcohol 40 Limited. Aloe / bisabolol / cetearyl / glyceryl stearate / EDTA / water Cleared. Distinct from PRO No-Mess (no paraben on that SPL). Pack sizes (NDC 69693-418) share this formulaId. Ages 2+ (under 2: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absProCream} (NDC 69693-418) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absNoMess,
    productName: 'Absorbine Jr. PRO No-Mess Roll-On',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476414029',
    formulaId: FID.absNoMess,
    audience: ADULT,
    minAge: 2,
    form: 'roll-on',
    activeIngredients: [
      { name: 'Lidocaine HCl', strength: '4%' },
      { name: 'Phenol', strength: '1.5%' },
    ],
    inactiveIngredients: [
      flag('aloe barbadensis leaf juice', 'cleared', dailymed(SET.absNoMess, METH.aloe)),
      flag('aminomethyl propanol', 'cleared', dailymed(SET.absNoMess, METH.amp)),
      flag('bisabolol', 'cleared', dailymed(SET.absNoMess, METH.bisabolol)),
      ...botanicals(SET.absNoMess, ['cinnamomum camphora (camphor) leaf oil']),
      flag('fragrance', 'cleared', dailymed(SET.absNoMess, METH.fragrance)),
      cleared(SET.absNoMess, 'glycerin'),
      flag('hydroxyethylcellulose', 'cleared', dailymed(SET.absNoMess, METH.hec)),
      flag('mentha arvensis leaf oil', 'cleared', dailymed(SET.absNoMess, METH.menthaArvensis)),
      flag('SD alcohol 40', 'limited', dailymed(SET.absNoMess, METH.alcoholVehicle)),
      cleared(SET.absNoMess, 'water'),
      ...botanicals(SET.absNoMess, ['zingiber oficinale (ginger)']),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. PRO No-Mess Roll-On = Caution. Camphor leaf oil / ginger (SPL spelling zingiber oficinale) / Mentha arvensis leaf oil / fragrance / AMP standalone Caution. SD alcohol 40 Limited. Aloe / bisabolol / glycerin / hydroxyethylcellulose / water Cleared. No High. Distinct from PRO Cream (that SPL has methylparaben). Pack sizes (NDC 69693-419) share this formulaId. Ages 2+ (under 2: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absNoMess} (NDC 69693-419) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absProSpray,
    productName: 'Absorbine Jr. PRO Spray',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476441148',
    formulaId: FID.absProSpray,
    audience: ADULT,
    minAge: 2,
    form: 'spray',
    activeIngredients: [
      { name: 'Lidocaine HCl', strength: '4%' },
      { name: 'Phenol', strength: '1.5%' },
    ],
    inactiveIngredients: [
      flag('alcohol denat.', 'limited', dailymed(SET.absProSpray, METH.alcoholVehicle)),
      flag('aloe barbadersis leaf extract', 'cleared', dailymed(SET.absProSpray, METH.aloe)),
      flag('bisabolol', 'cleared', dailymed(SET.absProSpray, METH.bisabolol)),
      flag('butane', 'cleared', dailymed(SET.absProSpray, METH.butane)),
      flag('camphor', 'cleared', dailymed(SET.absProSpray, METH.camphorInactive)),
      flag(
        'carthamus tinctorius (safflower) seed oil',
        'cleared',
        dailymed(SET.absProSpray, METH.safflower),
      ),
      flag('fragrance', 'cleared', dailymed(SET.absProSpray, METH.fragrance)),
      flag('isobutane', 'cleared', dailymed(SET.absProSpray, METH.isobutane)),
      flag('isopropyl myristate', 'cleared', dailymed(SET.absProSpray, METH.ipm)),
      flag('mentha arvensis leaf oil', 'cleared', dailymed(SET.absProSpray, METH.menthaArvensis)),
      flag('phenoxyethanol', 'cleared', dailymed(SET.absProSpray, METH.phenoxy)),
      cleared(SET.absProSpray, 'water'),
      ...botanicals(SET.absProSpray, ['zingiber offcinale (ginger) root extract']),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. PRO Spray = Caution. Butane / isobutane / camphor-as-inactive / fragrance / Mentha arvensis leaf oil / ginger extract / phenoxyethanol standalone Caution. Alcohol denat. Limited. Safflower seed oil is the named single-oil fill (not gummy High). ${CREAM_OIL_TAP} Aloe (SPL spells barbadersis) / bisabolol / IPM / water Cleared. No High. Pack sizes (NDC 69693-420) share this formulaId. Ages 2+ (under 2: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absProSpray} (NDC 69693-420) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absNeck,
    productName: 'Absorbine Jr. Neck & Shoulder Patch 7.5%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476187534',
    formulaId: FID.absPatch75,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '7.5%' },
    ],
    inactiveIngredients: neckFamilyInactives(SET.absNeck),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Neck & Shoulder Patch 7.5% = Caution. Glyceryl hydrogenated rosinate / polyisobutylene / styrene/isoprene copolymer sit on the locked patch-adhesive Caution row. Hydrated silica is the locked topical Caution token. PEG-400 Moderate. Mineral oil topical-occlusive Cleared. ${MINERAL_OIL_TAP} No High. Neck + Back + Knee 7.5% menthol patches share formulaId absorbine-jr-neck-patch (same OI + menthol 7.5%). Pack sizes (NDC 69693-422) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absNeck} (NDC 69693-422) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absBack,
    productName: 'Absorbine Jr. Back Patch 7.5%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    formulaId: FID.absPatch75,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '7.5%' },
    ],
    inactiveIngredients: neckFamilyInactives(SET.absBack),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Back Patch 7.5% = Caution. Same OI + menthol 7.5% as the Neck & Shoulder and Knee 7.5% patches — shared formulaId absorbine-jr-neck-patch. No High. Pack sizes (NDC 69693-421) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absBack} (NDC 69693-421) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with neck patch setid ${SET.absNeck} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absKnee,
    productName: 'Absorbine Jr. Pain Relieving Knee Patch 7.5%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    formulaId: FID.absPatch75,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '7.5%' },
    ],
    inactiveIngredients: neckFamilyInactives(SET.absKnee),
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Pain Relieving Knee Patch 7.5% = Caution. Same OI + menthol 7.5% as the Neck & Shoulder and Back 7.5% patches — shared formulaId absorbine-jr-neck-patch. No High. Pack sizes (NDC 69693-423) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absKnee} (NDC 69693-423) — ${UNVERIFIED_NOTE}`,
      `shared formulaId with neck patch setid ${SET.absNeck} — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absUltra,
    productName: 'Absorbine Jr. Plus Ultra Strength Patch 6.5%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476413183',
    formulaId: FID.absUltra,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '6.5%' },
    ],
    inactiveIngredients: [
      flag('alcohol', 'limited', dailymed(SET.absUltra, METH.alcoholVehicle)),
      flag('camphor', 'cleared', dailymed(SET.absUltra, METH.camphorInactive)),
      flag('cellulose gum', 'cleared', dailymed(SET.absUltra, METH.cellulose)),
      flag(
        'Methylacrylate-2-ethylhexyacrylate copolymer',
        'cleared',
        dailymed(SET.absUltra, METH.acrylate),
      ),
      cleared(SET.absUltra, 'glycerin'),
      flag('isopropyl myristate', 'cleared', dailymed(SET.absUltra, METH.ipm)),
      flag('kaolin', 'cleared', dailymed(SET.absUltra, METH.kaolin)),
      flag('polysorbate 80', 'moderate', dailymed(SET.absUltra, METH.ps80)),
      flag('polyvinyl alcohol', 'cleared', dailymed(SET.absUltra, METH.pva)),
      flag('silica', 'cleared', dailymed(SET.absUltra, METH.sio2)),
      flag('sodium polyacrylate', 'cleared', dailymed(SET.absUltra, METH.polyacrylate)),
      flag(
        'sodium polyacrylate starch',
        'cleared',
        dailymed(SET.absUltra, METH.polyacrylateStarch),
      ),
      flag('sorbitan oleate', 'cleared', dailymed(SET.absUltra, METH.sorbitanOleate)),
      flag('sorbitol', 'limited', dailymed(SET.absUltra, METH.sorbitol)),
      flag('tartaric acid', 'cleared', dailymed(SET.absUltra, METH.tartaric)),
      flag('titanium dioxide', 'high', dailymed(SET.absUltra, METH.tio2)),
      cleared(SET.absUltra, 'water'),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Plus Ultra Strength Patch 6.5% = Avoid. Driver is titanium dioxide (High). Camphor-as-inactive / acrylate copolymer / silica / sodium polyacrylate / sodium polyacrylate starch / sorbitan oleate standalone Caution. Polysorbate 80 Moderate. Alcohol + sorbitol Limited. Pack sizes (NDC 69693-413) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absUltra} (NDC 69693-413) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absXl,
    productName: 'Absorbine Jr. XL Back Patch 5%',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476412186',
    formulaId: FID.absXl,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Menthol', strength: '5%' },
    ],
    inactiveIngredients: [
      flag('aloe extract', 'cleared', dailymed(SET.absXl, METH.aloe)),
      flag('dl-camphor', 'cleared', dailymed(SET.absXl, METH.camphorInactive)),
      flag('purified lanolin', 'cleared', dailymed(SET.absXl, METH.lanolin)),
      ...botanicals(SET.absXl, ['spearmint']),
      flag('titanium dioxide', 'high', dailymed(SET.absXl, METH.tio2)),
      flag('zinc oxide', 'cleared', dailymed(SET.absXl, METH.zno)),
    ],
    verdict: 'avoid',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. XL Back Patch 5% = Avoid. Driver is titanium dioxide (High). ${ADHESIVE_IGNORE} dl-camphor as inactive / purified lanolin / spearmint (bare) standalone Caution. Aloe extract + zinc oxide (inactive) Cleared. Pack sizes (NDC 69693-412) share this formulaId. Ages 12+ (under 12: consult a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absXl} (NDC 69693-412) — ${UNVERIFIED_NOTE}`,
    ],
  }),
  row({
    id: ID.absPlusKnee,
    productName: 'Absorbine Jr. Plus Knee Patch',
    brand: 'Absorbine Jr.',
    category: PAIN_FEVER,
    barcode: '889476412513',
    formulaId: FID.absPlusKnee,
    audience: ADULT,
    minAge: 12,
    form: 'patch',
    activeIngredients: [
      { name: 'Camphor', strength: '7%' },
      { name: 'Menthol', strength: '7%' },
    ],
    inactiveIngredients: [
      flag(
        'eucalyptus globulus leaf oil',
        'cleared',
        dailymed(SET.absPlusKnee, METH.eucalyptus),
      ),
      ...botanicals(SET.absPlusKnee, [
        'gaultheria fragrantissima (wintergreen) oil',
      ]),
      flag(
        'clove (syzygum aromaticum) flower oil',
        'cleared',
        dailymed(SET.absPlusKnee, METH.clove),
      ),
    ],
    verdict: 'caution',
    honestNote:
      `FOUNDER-LOCK DRAFT: Absorbine Jr. Plus Knee Patch = Caution. ${ADHESIVE_IGNORE} Eucalyptus leaf oil / gaultheria fragrantissima (wintergreen) oil / clove flower oil are locked fragrance/EO Caution tokens. No High. Distinct from the 7.5% menthol-only Knee Patch (different OI + actives). Pack sizes (NDC 69693-416) share this formulaId. Ages 12+ (12 or younger: ask a doctor). ${PARKED_ACTIVES} ${LIMITED_STACK} Draft, not verified.`,
    retailers: [...PF_RETAILERS],
    cleanAlternatives: TOPICAL_ALTS,
    sourcesGeneral: [
      `DailyMed setid ${SET.absPlusKnee} (NDC 69693-416) — ${UNVERIFIED_NOTE}`,
    ],
  })
];

export const BATCH50_LIST3_REFUSED = [
  {
    sku: 'Biofreeze Foot Cream',
    setid: '32450cbf-4ed4-402b-a30e-e08a17bba3fb',
    missing: ['Tetrasodium EDTA'],
  },
  {
    sku: 'Bengay Ultra Strength Pain Relieving Patch 5%',
    setid: 'f57ccc33-400b-4401-a348-c54d1eb9f5d0',
    missing: ['calcined kaolin'],
  },
  {
    sku: 'Mineral Ice Original Therapeutic Menthol Gel 2%',
    setid: '7b30076a-0af6-2f74-e053-2a91aa0ae08d',
    missing: ['ammonium hydroxide'],
  },
] as const;

const GREEN = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.greenGel);
const GREEN_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.greenRoll);
const COLOR = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.colorlessGel);
const COLOR_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.colorlessRoll);
const PRO5 = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proGel);
const PRO5_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proRoll);
const PRO_COLOR = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proColorGel);
const PRO_COLOR_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proColorRoll);
const SPRAY_DENAT = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.sprayDenat);
const PRO_AERO = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proAerosol);
const SPRAY_ALC = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.sprayAlc);
const PRO_ALC = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.proSprayAlc);
const PEN = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.pen);
const TRIPLE_R = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.tripleRoll);
const TRIPLE_G = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.tripleGel);
const ABS_PLUS = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.absPlus);
const ABS_PRO_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.absProRoll);
const ABS_NECK = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.absNeck);
const ABS_BACK = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.absBack);
const ABS_KNEE = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.absKnee);
const CAP_HP = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.capzasinHp);
const OVN_GEL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.ovnGel);
const OVN_ROLL = BATCH50_PAIN_FEVER_LIST3.find((r) => r.id === ID.ovnRoll);

if (BATCH50_PAIN_FEVER_LIST3.length !== 44) {
  throw new Error('batch 50 must write exactly 44 list-3 Search rows');
}
if (BATCH50_PAIN_FEVER_LIST3.filter((r) => r.verdict === 'clean').length !== 0) {
  throw new Error('batch 50 Clean tally is 0');
}
if (BATCH50_PAIN_FEVER_LIST3.filter((r) => r.verdict === 'caution').length !== 31) {
  throw new Error('batch 50 Caution tally is 31');
}
if (BATCH50_PAIN_FEVER_LIST3.filter((r) => r.verdict === 'avoid').length !== 13) {
  throw new Error('batch 50 Avoid tally is 13');
}
if (BATCH50_PAIN_FEVER_LIST3.some((record) => record.category !== PAIN_FEVER)) {
  throw new Error('batch 50 stays on Pain & Fever');
}
const BATCH50_CATCHUP_BARCODES: Record<string, string> = {
  [ID.greenGel]: '731124000033 731124002037 731124000170 731124000200 731124000811 731124110015',
  [ID.greenRoll]: '731124000064 731124000163 731124000194 731124000828 731124110008',
  [ID.bengayCream]: '074300081946',
  [ID.capzasinHp]: '041167751466',
  [ID.bengayGel]: '074300081977',
  [ID.absPlus]: '889476412049',
  [ID.colorlessGel]: '731124000040 731124120014 731124000583 731124000613',
  [ID.colorlessRoll]: '731124120007 731124000576 731124000606',
  [ID.proGel]: '731124000248 731124000279',
  [ID.proRoll]: '731124000231 731124000262',
  [ID.ovnGel]: '731124444141',
  [ID.ovnRoll]: '731124444158',
  [ID.sprayAlc]: '731124000071 731124001146',
  [ID.proSprayAlc]: '731124000255 731124000286',
  [ID.pen]: '731124003485',
  [ID.ovnPatch]: '731124003935',
  [ID.flexStrip]: '731124003782',
  [ID.bengayLido]: '074300081793',
  [ID.absNoMess]: '889476414029',
  [ID.foam]: '731124002822',
  [ID.tripleRoll]: '731124444905',
  [ID.tripleGel]: '731124444912',
  [ID.absProCream]: '889476414036',
  [ID.stick]: '731124444950',
  [ID.absProSpray]: '889476441148',
  [ID.proColorGel]: '731124445353',
  [ID.miExtremeGel]: '850078192035',
  [ID.creamJar]: '731124001009',
  [ID.ovnCream]: '731124444547',
  [ID.mentholPatch]: '731124001719 731124001696 731124002778',
  [ID.absNeck]: '889476187534',
  [ID.absXl]: '889476412186',
  [ID.absPlusKnee]: '889476412513',
  [ID.miStick]: '850078192080',
  // KYR5-b set-id-only chunk 19 — Dollar General grocery PDP 1-ct
  // Ultra Strength 5½×4 in (NDC 69693-413 / setid cf329707). Do not steal
  // 889476412186 (5% XL Back) or 889476412513 (Plus Knee).
  [ID.absUltra]: '889476413183',
};
for (const record of BATCH50_PAIN_FEVER_LIST3) {
  const expected = BATCH50_CATCHUP_BARCODES[record.id];
  if (expected) {
    if (record.barcode !== expected) {
      throw new Error(`batch 50 catch-up UPC drift on ${record.id}`);
    }
  } else if (record.barcode) {
    throw new Error(`batch 50 must not invent barcodes on ${record.id}`);
  }
}
if (BATCH50_PAIN_FEVER_LIST3.some((record) => record.recordStatus !== UNVERIFIED)) {
  throw new Error('batch 50 recordStatus must stay unverified');
}
if (GREEN?.formulaId !== GREEN_ROLL?.formulaId || GREEN?.formulaId !== FID.green4) {
  throw new Error('green 4% gel + roll-on must share formulaId');
}
if (COLOR?.formulaId !== COLOR_ROLL?.formulaId || COLOR?.formulaId !== FID.colorless4) {
  throw new Error('colorless 4% gel + roll-on must share formulaId');
}
if (PRO5?.formulaId !== PRO5_ROLL?.formulaId || PRO5?.formulaId !== FID.pro5) {
  throw new Error('professional 5% gel + roll-on must share formulaId');
}
if (PRO_COLOR?.formulaId !== PRO_COLOR_ROLL?.formulaId) {
  throw new Error('professional colorless 5% gel + roll-on must share formulaId');
}
if (SPRAY_DENAT?.formulaId !== PRO_AERO?.formulaId) {
  throw new Error('denatonium 10.5% spray + professional aerosol must share formulaId');
}
if (
  SPRAY_ALC?.formulaId !== PRO_ALC?.formulaId ||
  SPRAY_ALC?.formulaId !== PEN?.formulaId
) {
  throw new Error('alcohol-denat. 10.5% sprays + precision pen must share formulaId');
}
if (TRIPLE_R?.formulaId !== TRIPLE_G?.formulaId) {
  throw new Error('Triple Target roll-on + gel must share formulaId');
}
if (ABS_PLUS?.formulaId !== ABS_PRO_ROLL?.formulaId) {
  throw new Error('Plus ES liquid + PRO roll-on liquid must share formulaId');
}
if (
  ABS_NECK?.formulaId !== ABS_BACK?.formulaId ||
  ABS_NECK?.formulaId !== ABS_KNEE?.formulaId
) {
  throw new Error('neck / back / knee 7.5% patches must share formulaId');
}
function mustDiffer(a: string | undefined, b: string | undefined, msg: string) {
  if (a && b && a === b) throw new Error(msg);
}
mustDiffer(GREEN?.formulaId, COLOR?.formulaId, 'green 4% must not clone colorless 4%');
mustDiffer(GREEN?.formulaId, PRO5?.formulaId, '4% green must not clone professional 5%');
mustDiffer(COLOR?.formulaId, PRO_COLOR?.formulaId, '4% colorless must not clone professional colorless 5%');
mustDiffer(SPRAY_DENAT?.formulaId, SPRAY_ALC?.formulaId, 'denatonium 10.5% must not clone alcohol-denat. 10.5%');
mustDiffer(OVN_GEL?.formulaId, OVN_ROLL?.formulaId, 'overnight gel must not clone overnight roll-on');
if (GREEN?.verdict !== 'avoid' || COLOR?.verdict !== 'caution') {
  throw new Error('green 4% Avoid (dyes); colorless 4% Caution (no High)');
}
if (CAP_HP?.verdict !== 'caution' || CAP_HP?.minAge !== 18) {
  throw new Error('Capzasin HP must stay Caution and 18+');
}
if (BATCH50_LIST3_REFUSED.length !== 3) {
  throw new Error('batch 50 refused list must stay 3 SKUs');
}
if (BATCH50_LIST3_REFUSED.some((item) => item.missing[0] == null)) {
  throw new Error('each refused SKU must quote the missing exact token');
}

// Verdict tally (44 records): Clean 0 · Caution 31 · Avoid 13
// Written: list-3 Biofreeze / Bengay / Capzasin HP / Mineral Ice Extreme
//   gel + stick / Absorbine Jr. (minus 3 refused)
// Reuse: batches 41 / 42 / 44 / 45 / 46 / 47 / 48 / 49 untouched
// List 4 OUT. No Biofreeze Clean Picks restore.
// Refused still-missing exact §5: Tetrasodium EDTA / calcined kaolin /
//   ammonium hydroxide
