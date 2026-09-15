// DRAFT / not verified / batch 41 same-aisle pain rubs /
// methodology v1.6 + Sept 15 parabens-High-every-form lock on main.
// Founder owns final Avoid vs Caution vs Clean.
//
// ONE write. Pain & Fever only (pain rubs live with swallow SKUs).
// Do NOT invent a Topical aisle. Do NOT move Arniflora off First Aid.
// recordStatus would be 'unverified' on every row IF any row were
// written. Internal keys only: clean | caution | avoid. Do NOT invent
// Clean. Do NOT invent UPCs / barcodes. Pack sizes of the same
// name+form+inactives share formulaId. Form is labeled on
// cleanAlternatives, not a hard filter (§6). Not wired into Clean
// Picks UI. No live Clean Picks file is edited. No photos. Letter
// tiles only on new ids. No fake Clean alts. No methodology rewrite.
//
// TALLY (unverified drafts in THIS file): 0 rows — Clean 0 /
// Caution 0 / Avoid 0.
// Independently Clean topical analog already on main:
// boiron-arnicare-gel. No Clean conventional NSAID / lidocaine /
// menthol cream invented.
//
// REUSE ONLY (do not rewrite / do not clone) — existing ids:
// Batch 37: medinatura-t-relief-pain-gel, medinatura-t-relief-xs-gel,
//   medinatura-t-relief-pain-cream, medinatura-t-relief-xs-cream,
//   medinatura-t-relief-arthritis-xs-cream,
//   medinatura-t-relief-lidocaine-4-cream, medinatura-traumeel-ointment,
//   bt-triflora-arthritis-gel
//   bt-arniflora-arnica-gel stays First Aid — do not move or rewrite.
// Batch 33: hylands-leg-cramps-arnica-cream,
//   hylands-leg-cramps-arnica-pm-cream
// Batch 38: natures-way-sports-gel already Caution — leave alone.
//
// LIST 3 — 11 SKUs REFUSED (do not invent). DailyMed OI pulled; every
// unused inactive was checked against current Methodology §5 on main
// (including the Sept 15 parabens High-in-every-form lock). After that
// check, each SKU still has at least one inactive that is not in §5.
// Named topical strings from the pain-rub scan (olivate / palmitate /
// copolymer, oleth-3-phosphate, emulsifying / cetyl esters wax, cocoyl
// caprylocaprate, polyoxyl 20 cetostearyl ether, ammonia, AleveX
// EO / aerosol stack, patch DEGEE / isopropyl laurate, vanillyl butyl
// ether) are NOT rows in §5 on main. Do not invent sibling grades.
// Menthol / camphor / lidocaine actives stay parked.
//
// REFUSED (setid → missing §5 inactives):
// 1. Tylenol Precise Pain Relieving Cream (fragrance-free)
//    fc1e0451-8c84-729e-e053-6394a90aaba0
//    Missing: cetearyl olivate; isopropyl palmitate.
//    Mapped leftover: phenoxyethanol Caution; sodium polyacrylate
//    Caution; sorbitan olivate is a sorbitan ester (Caution table);
//    cetyl alcohol / glycerin / water Cleared. Lidocaine parked.
// 2. Tylenol Precise Cooling Cream
//    fc0a3404-b174-3952-e053-6294a90a1e02
//    Pack sizes share one SPL / NDC 69968-0793 family — would share
//    formulaId. Same missing pair as #1. Menthol + lidocaine parked.
// 3. Tylenol Precise Warming Cream
//    0c60b607-ade9-68f2-e063-6394a90a4025
//    Missing: cetearyl olivate; isopropyl palmitate; vanillyl butyl
//    ether; carbomer interpolymer type A (only carbomer HOMOPOLYMER
//    is Cleared). Lidocaine parked.
// 4. Tylenol Precise Nighttime Cream
//    2ef4fe16-0820-6aad-e063-6294a90a8449
//    Same missing stack as #3. Camphor + menthol parked.
// 5. Tylenol Precise Lidocaine 4% Patch
//    36a95afd-97e5-2271-e063-6394a90aea18
//    Missing: diethylene glycol monoethyl ether (DEGEE); isopropyl
//    laurate. Methylparaben + ethylparaben are High in every form
//    (Sept 15 lock) — IF written this row would be Avoid. Patch
//    copolymers are not on this SPL. Lidocaine parked. PG is
//    oral-scoped (not a topical demerit). Refuse stands on DEGEE +
//    isopropyl laurate.
// 6. Advil Targeted Relief Cream
//    16e6be21-7b43-443a-89ec-3bdf0ec0dfc1
//    2.3 / 2.5 / 4 oz / pouch share NDC 0573-6555 — would share
//    formulaId. Missing: cetyl esters wax; isocetyl stearate;
//    oleth-3-phosphate. Camphor / capsaicin / menthol / methyl
//    salicylate parked.
// 7. Motrin Arthritis Pain Gel
//    db5b4288-13ec-826b-e053-2995a90a275e
//    50 g / 100 g share. Missing: cocoyl caprylocaprate; isopropyl
//    alcohol (not the ethyl-alcohol vehicle row); ammonia; polyoxyl
//    20 cetostearyl ether. Diclofenac is the monograph active
//    (not an inactive-table row).
// 8. Aleve Arthritis Pain Gel
//    bad675d1-1204-0136-e053-2995a90a994e
//    Same missing stack as #7 (same diclofenac-gel OI family).
// 9. AleveX Pain Relieving Lotion roll-on
//    bc66bc1b-c0d5-2481-e053-2a95a90a75de
//    Missing AleveX EO / lotion stack: peppermint oil (gel inactive,
//    not the oral-flavor row); linseed oil; frankincense oil;
//    isopulegol; carbomer interpolymer type A; pentylene glycol;
//    rosemary oil; Thymus mastichina flowering-top oil; vanillyl
//    butyl ether; 3-((l-menthyl)oxy)propane-1,2-diol;
//    aminomethylpropanol; clove oil. Menthol + camphor parked.
// 10. AleveX Pain Relieving Lotion tube 77 g
//    bafdf06b-25f5-e29e-e053-2a95a90a5e1b
//    DailyMed OI MATCHES the roll-on exactly (same 20 inactives,
//    different order; NDC 0280-0063 vs 0280-0050). Would SHARE
//    formulaId with #9 if both were written. Still refused — same
//    missing stack. Do not merge a written row later unless OI
//    still matches exactly.
// 11. AleveX Pain Relieving Spray
//    bafd199a-e198-d5d1-e053-2995a90ad1cb
//    Missing #9 EO stack PLUS aerosol / film stack: isobutane;
//    propane; isopentane; propanediol; dimethylaminoethyl
//    methacrylate–butyl methacrylate–methyl methacrylate copolymer;
//    n-vinylcaprolactam; n-vinylpyrrolidinone; dimethyl isosorbide.
//    Separate formulaId from the lotion (OI does not match).
//
// LIST 4 — no Search rows (PR-comment only):
// - Genexa Pain Crush (menthol 7% roll-on gel) — DailyMed setid
//   6e8dd8bb-7204-34ca-e053-2a91aa0a9ef3; NDC 69676-0004-6.
//   DailyMed banner: contains inactivated NDC. Discontinued comment
//   only. Do not write a Search row.
// - Kits
// - Excedrin / Bayer — no topical in this pass (batch 40 leftovers)
// - T-Relief Pet
// - Heel legacy Traumeel
// - Mexico B&T SPLs
// - Wound-only First Aid (Arniflora stays First Aid, not moved)

import type { RatingRecord } from '../ratingRecord';

export const BATCH41_PAIN_RUB_REFUSED = [
  'tylenol-precise-pain-relieving-cream',
  'tylenol-precise-cooling-cream',
  'tylenol-precise-warming-cream',
  'tylenol-precise-nighttime-cream',
  'tylenol-precise-lidocaine-4-patch',
  'advil-targeted-relief-cream',
  'motrin-arthritis-pain-gel',
  'aleve-arthritis-pain-gel',
  'alevex-pain-relieving-lotion-roll-on',
  'alevex-pain-relieving-lotion-tube',
  'alevex-pain-relieving-spray',
] as const;

// Zero Search rows. Refused list-3 SKUs stay comment-only until every
// inactive is a Methodology §5 lock (do not invent).
export const BATCH41_PAIN_RUBS: RatingRecord[] = [];

// Verdict tally (0 records): Clean 0 · Caution 0 · Avoid 0
// List 3 refused: 11 · List 4 comment-only: Genexa Pain Crush + kits /
//   no-topical Bayer-Excedrin / pet / Heel / Mexico / wound-only FA
