KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state. If you're a new Claude starting a session: read this entire file before responding to anything. Brandon paste-references this file at the start of every chat.

Last Updated: August 8, 2026 (post-scan screen design v2 — verdict placement + cleaner alternatives carousel)

================================================================ ⚡ READ FIRST — How Brandon Works
Brandon is a novice developer using Cursor IDE on Windows PowerShell. He's smart, decisive, and editorially sharp. Follow these working-style rules without exception — they were earned across many sessions.

Communication rules

Send terminal commands ONE AT A TIME, not stacked — wait for confirmation between each. EXCEPTION: git pushes go as all 3 commands (add, commit, push) in separate blocks in one message, no waiting between them.
One question per ask_user_input box. Multiple questions in a single ask creates friction.
Don't stack questions after long technical messages. Give him reading time. End with a single clear next-step prompt.
Mark recommendations "(my pick)" when offering options. Decisive beats infinite optionality; he'll override when he disagrees.
Sketch visual mockups in the Visualizer BEFORE writing code for any UI/editorial decision. Mockups have saved 2-3 wrong directions per session.
Verify state from current files BEFORE asserting. PROJECT_NOTES can lag reality — check the actual file before pasting edits.
When updating any notes/docs/methodology, give him the WHOLE file to delete-all-and-paste, not section-by-section patches. Be specific about exactly what to do with it.
Code & file rules

New files: send the New-Item terminal command (backslash paths) so he creates it that way. New-Item path\file.ext and mkdir path\folder are the patterns; New-Item ... -ItemType File -Force creates the folder too.
Be specific with full paths (lib\clean-picks\painFeverPicks.ts, not just painFeverPicks.ts).
PowerShell uses ; not && for chaining.
PowerShell Rename-Item takes a filename, not a path, as the second argument.
Multi-edit to one file = full file rewrite, not patches. This applies to notes/docs too — give him the whole file.
< characters in JSX tags occasionally strip on paste — check that <a, <div, <Component opening brackets survived.
Long pastes can truncate — verify the bottom matches intent.
File-system gotchas

TypeScript Cursor cache is sticky. After renaming .js → .ts or deleting/renaming, run Ctrl+Shift+P → "TypeScript: Restart TS Server". If errors persist, Developer: Reload Window.
After deleting routes, the .next cache holds stale per-route type validators — clear it: Remove-Item -Recurse -Force .next; npm run build.
Check for duplicate files when fighting phantom errors: Get-ChildItem lib\clean-picks.
Run npm run build to catch dangling imports after big deletions — the Problems tab can lie, the build won't.
Reduce push frequency. Push at feature/category milestones, not between every batch.
Hold PROJECT_NOTES updates until the end of the session (done for the day), not mid-session — exception made when stale info would actively mislead a fresh session before then (e.g. a locked design detail that changed).
Brandon's vision (don't lose sight of)

BUILD EVERYTHING AS IF BUILDING THE APP. The barcode-scanner app is the committed destination and Brandon's main motivation — however long/hard it takes is irrelevant to him; it's the thing that energizes the whole project. Every decision should serve the app.
"Big pharma made it" aesthetic — restrained, professional, generous whitespace, deliberate typography. Not a wellness-blog look.
"Honest always, no agenda" — never preachy, never agenda-driven. Present natural + conventional + homeopathic equally, judged the same way.
"From the shelf to the root and everything in between" — mainstream OTC and natural remedies side by side without judgment.
Harm-first, not regulator-first: severity tracks evidence of harm to the body, NOT whether the FDA banned something. "Legal/GRAS" is never a baseline for leniency.
Audience: women / moms managing family health, plus older adults with multiple medications — and clean-leaning shoppers (Yuka power users).
Personal / contact

Full name: Brandon Valdez (NOT Dezman). Email: bdez1525@outlook.com. Location: Clovis, CA.
Legal contact: personally knows Richard Aaron of Dowling Aaron (Fresno) — leverage for legal-review introductions.
================================================================

POSITIONING — WHAT KNOWYOURREMEDY IS (APP-FIRST) ================================================================ KnowYourRemedy is a Yuka-style platform — but for medicine, supplements, and natural remedies instead of food and cosmetics. The one question it answers: "Is this product clean — and what's actually in it?"
THE COMMITTED DESTINATION: a barcode-scanner app (scan a medicine/supplement → instant Clean / Caution / Avoid verdict + ingredient breakdown + sources). This is the product and the priority. We build everything going forward as if building the app.

The brain. The methodology + the ratings ARE the app's database ("the brain"). Two parts:

The LOGIC — the methodology (docs/METHODOLOGY.md, currently v1.4). The rules that turn any ingredient list into a verdict. The scanner runs this engine.
The KNOWLEDGE — the rating database. Every product as a structured record. This is what the scanner looks up on a barcode hit. Near-term work = building the brain: populate the knowledge by hand (the verdict passes), one correct, sourced product at a time, in an app-ready shape so it copy-pastes into Supabase later.
Why app-first (the decision, June 14). The website is NOT the growth engine and not a destination:

Acquisition = push channels (podcast promos, word of mouth, app-store visibility), NOT SEO. Yuka grew to tens of millions on word of mouth + a viral moment with zero paid marketing and no content-site funnel.
Trust = in-product transparency + inline sourced citations (the user scans, sees the flagged additive with its primary source, and the claim is verifiable — beats outsourcing verification to a Google search that can be gamed). NOT a brand-credibility website.
Founder motivation is decisive for a solo build, and the scanner is what energizes Brandon. That settles it. The website therefore shrinks to a lean landing + founding-member capture + a small "how we rate / a few examples" credibility surface (for when push-channel traffic Googles the brand). It is not a content engine and not the acquisition channel.
The moat (why we win)

No agenda — we don't sell what we rate, so ratings are trustworthy. The core differentiator. Every flag carries a citable source, shown in the breakdown.
One transparent, documented scoring methodology applied identically to every product — conventional, natural, homeopathic alike — including the ones we'd tell you to avoid.
The gap nobody owns — Yuka does food/cosmetics; nobody owns medicine/supplements/remedies.
================================================================ 2. SCOPE — KEPT vs CUT
KEEP & EXPAND (the heart)

The methodology + the rating database — the app's brain. The manual rating work (Clean Picks today) is the seed of the scanner's DB.
Oil Library — Worwood-grounded essential-oil safety reference. Framed toward caution/safety, not ingestion. Rated on cleanliness; no efficacy claims. IP: attribute Worwood, write original content, never reproduce her charts/text/recipes verbatim.
Accounts (free) + founding-member signups — top of funnel + conversion engine for the eventual paid scanner.
LEAN / SHRINK

Web presence: lean landing + founding-member capture + small credibility surface. NOT a content/SEO build-out. Existing Clean Picks pages stay as the first surface of the rating data but aren't expanded as a traffic play.
CUT — REMOVED May 28 (see change log)

Dosage Calculator — liability (individualized dosing). GONE.
Interaction Checker — liability ("safe to combine" verdicts). GONE.
Conditions / Remedies pages — commodity content, off-mission, treatment-advice liability. GONE. We are OUT of the "how to treat/medicate" business and INTO the "what should I buy, and is it clean" business.
================================================================ 3. BRAND, DESIGN & VOICE (LOCKED)
Colors

Primary brand green: 
#2d4a3e — headers, CTAs, active states
Rx blue: 
#2563eb · Blue B (section labels): 
#4a6781
Rating status: Clean 
#27ae60 · Caution/amber 
#d97706 · Avoid 
#c0392b
Oils: External Only 
#2980b9 · Dilute First 
#be185d · Internal Only 
#78350f
Typography

Playfair Display (var(--font-playfair)) — serif headlines
Inter (var(--font-inter)) — sans-serif body
Section label pattern (Blue B uppercase): fontSize 0.78rem, fontWeight 700, uppercase, letterSpacing 0.07em, color 
#4a6781, followed by a 28px × 2px rule in 
#4a6781.

Icons (LOCKED): Clean Picks ✨ · Essential Oils 🌱 · Home 🏠.

Editorial voice (LOCKED)

"Why this pick" callouts: ingredient quality + availability in 1-3 sentences. Brand-green left border.
"Honest note" callouts: amber/cream banner. ALWAYS for caveats — pregnancy, age limits, allergy disclaimers, dilution honesty, dose/frequency-dependent harms.
Goal-framing, never prescriptive. "If your goal is X, consider Y" — never "stop taking" / "you should switch."
Honest-disclosure principle: better to mark "no data available" than write a wrong claim. Refuse-when-uncertain is the credibility differentiator.
Honest broker: rate conventional, natural, and homeopathic the same way. Cleanliness is judged on ingredients; we NEVER make or imply an efficacy claim. Where the basis is traditional use, say so and cite it (Carlston for homeopathy, Worwood for oils); where clinical evidence exists, cite it and label its strength honestly. Not the dismissive regulator, not the hype site.
Legal wording: flags state facts, never danger ("contains X; clean brands exclude it" — never "unsafe"). Per the Genexa/NAD ruling — can't imply a competitor's product is dangerous.
================================================================ 4. RATING METHODOLOGY (SOURCE OF TRUTH)
The documented scoring engine lives at docs/METHODOLOGY.md — now v1.4. Read it before making any rating call. Summary:

Two layers (this is also the product/app UI model):

PRODUCT VERDICT (the badge, the glance): Clean / Caution / Avoid.
INGREDIENT RISK LEVELS (the drill-down, the proof): each ingredient tagged Cleared (0pt) / Limited (1pt) / Moderate (2pt) / High (auto-Avoid), each with its source.
Scoring: 0 pts = Clean · 1–2 pts = Caution · 3+ pts OR any single high-risk = Avoid.

High-tier bar (locked): strong evidence of a real harm mechanism (carcinogen, genotoxic, endocrine, organ/dev/neuro). A ban or IARC/NTP classification is sufficient but NOT required. Weak/contested evidence keeps something OUT of high; legality never does.

NO 0–100 SCORE, EVER (Methodology §3). A number implies a precision we can't defend ingredient-by-ingredient and invites "why 72 not 75" arguments. The three-tier verdict is the glance; the per-ingredient breakdown is the proof.

Synthetic dyes are ALREADY High-tier (Methodology §5): Red 40, Yellow 5/6, Blue 1/2, Green 3 — any one → Avoid, including lake (insoluble tablet) forms of the same dyes. Do NOT re-rate any of them as moderate. Rationale leads with independent science (EU hyperactivity warning labels / Southampton study, plus state-level bans); FDA action is corroboration only.

Source ordering (Methodology §4 regulator asymmetry): lead every flag with independent/primary sources (IARC/NTP, EFSA, OEHHA, peer-reviewed, NCCIH). A regulator ACTING AGAINST a product (ban/warning/refusal-to-recognize-as-safe) is a usable harm signal — but only as corroboration, the tail of the citation. A regulator PERMITTING/APPROVING a product is NEVER evidence of safety. Never anchor a verdict on "the FDA allows/approves it."

v1.3 additions (June 14):

ACTIVE-INGREDIENT SAFETY (verdict cap). We don't judge efficacy/medical merit, but a documented SAFETY harm in the active is in scope and caps the verdict (separate from additive points; final verdict = the worse of the two). Manageable/dose-dependent harm → caps at Caution; severe/irreversible/no-safe-threshold harm with no offsetting benefit → caps at Avoid. Boundary so it doesn't over-flag: "documented harm from as-directed use," NOT the normal dose-cautions of standard drugs used as directed (acetaminophen's liver limit at label dose = standard-of-care, not a flag).
DOSE/FREQUENCY SENSITIVITY. Verdict reflects realistic use of the product as marketed (not the most careful user); the honest note carries the gradient. Cumulative harms (build with total exposure, e.g. silver→argyria) are lower with infrequent use and can justify Caution over Avoid. Concurrent harms (single co-administration, e.g. drug interactions) are NOT softened by infrequency.
SOURCE STANDARD. Every flag carries ≥1 citable source, shown in the breakdown (see regulator asymmetry above).
v1.4 addition (August 8) — NANOPARTICLE PRECAUTIONARY RULE. A second, narrower cap distinct from active-safety: any ingredient with an open, unresolved regulatory safety review that specifically cites nanoparticle-form concerns is capped at Caution, even with 0 additive demerit points and no confirmed harm mechanism. Stricter than the general "no citable harm → no demerit" posture, deliberately — the trigger is a live, ingredient-specific data-gap review, not mere unfamiliarity. Silicon dioxide moved from Cleared to this new tier as the first case (EFSA 2018 nanoparticle data-gap, still open). Full detail + worked example in docs/METHODOLOGY.md §4 and §5.

Editorial discoveries (carry forward — DO NOT REVERT)

Advil Liqui-Gels: FD&C Green No. 3 → not clean.
Sudafed: FD&C dyes + titanium dioxide + talc → rejected.
Mucinex (brand): FD&C Blue #1 → rejected.
Equate Mucus-ER (Walmart): CORRECTED Aug 8 — previously listed as "confirmed Clean, 5 inert excipients, no dye." The actual verified DailyMed label (setid a2cc6dec) shows FD&C Blue #1 aluminum lake among the inactive ingredients. Per Methodology §5, synthetic dyes (including lake forms) are High-tier. CORRECTED VERDICT: AVOID, not Clean. The prior "confirmed Clean" claim was never actually source-verified against DailyMed — treat as a caution against trusting unverified prior-session claims generally. Cold & Flu category needs a replacement dye-free guaifenesin pick (not yet found/verified) to restore its Mucinex-alternative slot. coldFluPicks.ts still needs this correction applied.
Sambucol Gummies: vegetable oil → rejected. Sambucol Original Syrup stays (glucose syrup acceptable).
Maty's Vapor Rub: sunflower oil → rejected. Badger Aromatic Chest Rub is the clean alternative.
Second-gen antihistamine TABLETS (Zyrtec/Claritin/Allegra, brand + generic): titanium dioxide → rejected. "Dye-free" kids' cetirizine syrups: parabens + propylene glycol → rejected.
COLLOIDAL SILVER → Caution (v1.3 worked example for the active-safety cap). Additives are silver + water (Clean on additives alone), but the active carries documented harm — argyria (permanent, cumulative, no established safe level) + concurrent interactions with certain antibiotics and thyroid meds. Sources: NCCIH, Mayo, peer-reviewed argyria case reports (FDA enforcement as corroboration only). Set at Caution (argyria dose-cumulative + mostly cosmetic); the pull toward Avoid is no-safe-threshold + irreversible + frequency-proof interactions. "Natural/old" never auto-means clean.
SILICON DIOXIDE (v1.4 worked example for the Nanoparticle Precautionary Rule) → Caution, capped not scored. No confirmed harm mechanism at ingested/amorphous-form use levels (EFSA 2018: no safety concern at reported levels), but the same EFSA review left an open nanoparticle absorption/behavior data gap that hasn't closed. Distinct from crystalline silica (inhaled, IARC Group 1 — unrelated hazard). Cap lifts if the EFSA review closes clean; converts to a demerit tier if it finds harm.
Verified-safe excipients (Aug 8 research pass, full citations in Methodology §5 Cleared table): hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, carbomer homopolymer (Type A/B/C monograph — note the older 934/940/941 grades had a since-addressed benzene concern that does NOT apply to the current monograph).
Homeopathic eligibility: eligible if inactives are clean, available at in-scope retailers, evidentiary framework documented. Citation: Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — use in any homeopathic pick's honestNote. Low-dilution (Umcka 1X) gets a softer note; extreme dilution (Oscillococcinum 200CK) gets a STRONG note. Homeopathy/oils are rated on cleanliness only — no efficacy claims (keeps the no-efficacy-claim liability shield intact).

================================================================ 5. THE RATING DATA MODEL (THE BRAIN)
Each product is captured as a STRUCTURED RECORD (not prose, not site-only content), in an app-ready shape so it copy-pastes into Supabase later. This Section 5 list IS the canonical rating-record field set (there is no separate schema file). Target fields:

product name, brand, category
barcode / UPC (added later, for the scanner)
active ingredient(s) + strength
inactive ingredients (full list)
per-ingredient risk level (cleared/limited/moderate/high) + source per flag
active-safety flag (if any) + source
verdict (Clean/Caution/Avoid)
honest note
retailer availability
productImage — the ONE canonical shot everyone sees; catalog-seeded by us, keyed to the exact barcode/SKU (see §6 image rules)
userPhotos[] — community submission pool; auto-normalized BACKFILL only, and the correction path when catalog art is stale
cleanAlternatives — ordered list of swap product ids, ranked closest-analog-first (populated for Caution + Avoid records; see §6 Cleaner options)
STATUS: schema now exists in code. lib/clean-picks/verdictLabels.ts holds the Verdict type + VERDICT_LABELS/VERDICT_COLORS as the single source of truth for verdict wording (so a future wording change, e.g. from legal review, is a one-line edit instead of a find-and-replace). lib/ratingRecord.ts holds the full RatingRecord type matching this section's field list (ActiveIngredient[], IngredientFlag[] with RiskLevel, optional ActiveSafetyFlag, ProductImage, CleanAlternative[]). NEXT SESSION: begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into this shape.

Current storage: ratings live as hardcoded TypeScript arrays in the Next.js app (lib/clean-picks/painFeverPicks.ts etc.). DIRECTION (not today): migrate to a Supabase table once the schema is locked and the ratings are correct. Content first, container later — don't refactor storage before the ratings themselves are right.

================================================================ 6. APP UI & DESIGN SYSTEM (v2 — locked August 8, 2026)
The post-scan product-detail screen is the app's centerpiece; it presents the two-layer methodology (verdict + per-ingredient proof). Built in a deliberately plain, Yuka-clean idiom. Full screen mocked and approved in the Aug 8 session (mockups: verdict-placement A/B test, cleaner-alternatives carousel, flagged-row drill-down, full assembled screen).

Layout — post-scan / product-detail screen

White background, generous whitespace, hairline dividers. ONE monochrome line-icon per row. No cards, no tinted banners, no source chips at the top level.
VERDICT PLACEMENT (locked Aug 8 — supersedes July 12 version): the verdict — colored status dot + verdict WORD, no score — sits on its OWN row at the very TOP of the screen, above the product image/name/brand block, with the saved star on the same row (right-aligned). This was an explicit A/B decision: putting the verdict below the title (the more Yuka-literal placement) tested as "clean but slightly hidden" — it competed with the product name for attention and softened the instant gut-read the scan-then-verify trust loop depends on. Verdict-first wins.
Below the verdict row: catalog product image + product name (Playfair serif — the one KYR signature flourish, everything else is clean sans) + brand + active ingredient/strength.
Two sections: FLAGGED (the concerns) and CLEARED (the fine stuff) — our analog to Yuka's Negatives/Positives.
Each row: line-icon · bold title · one gray reason line · status dot · chevron. Tapping a row expands it in place (chevron flips down→up) to reveal "Why this is flagged/cleared" in plain language + tappable source links. ALL proof lives behind this drill-down, keeping the top level calm — you only see detail on tap. This is the key move that keeps it readable.
Tabs up top (below the header block, above Flagged/Cleared): Overview · Ingredients · Photos.
Color discipline (LOCKED) — color has exactly TWO jobs; everything else is monochrome:

RATING color (Clean 
#27ae60 / Caution 
#d97706 / Avoid 
#c0392b) = the verdict WORD + the per-row status dots. Always means "how clean it is."
BRAND green (
#2d4a3e) = tappable/actionable things ONLY (scan button, "See all", active nav, links, the saved star). Always means "you can act here." Product photos carry the visual warmth — never colored UI chrome. Rare exception allowed: a colored row-icon for an active-safety cap (e.g., colloidal silver), if it genuinely needs to stand out — start conservative.
Saved star (medicine cabinet)

Fills BRAND GREEN when saved (NOT gold — gold would be a third color and break the two-color system). Outline = not saved; solid green = saved.
Tap feedback: outline→solid + quick bounce + a momentary toast ("Saved to your cabinet" / "Removed") that fades. State change + brief confirmation = unmistakable.
Cleaner alternatives (REDESIGNED Aug 8 — supersedes July 12 single-card version)

Fires on any AVOID and any CAUTION result. (Methodology §3 already commits Caution→clean alternative; extended to Avoid — an Avoid with no way forward is a dead end.)
FORMAT CHANGE: previously a single static card showing one "best" swap. User feedback (Aug 8): a lone product card reads as "tap here to go to THIS product's page," not "tap here to see your options" — and if that one shown pick isn't carried at the shopper's store, there was no visible reason to tap further. NEW FORMAT: a horizontally scrollable carousel of alternative cards (Yuka-style "Recommendations" row, adapted). Section header reads "N clean alternatives" (dynamic count, not the word "Cleaner alternative" singular) so plurality is obvious before any tap. Each card shows: product image, name, brand, verdict word + colored dot (NOT a numeric score — a Yuka screenshot referenced in this session shows "54/100 Good," which we deliberately do NOT copy; conflicts with the locked no-0-100-score rule, Methodology §3), and retailer availability chips directly on the card (e.g. "Whole Foods, Sprouts" or a flagged "Not at Walmart") so a shopper can tell at a glance whether a given pick is worth pursuing without tapping in. A partially-visible, faded card at the row's edge hints there's more to scroll. A "See all →" link in the section header still opens the full ranked list on its own page.
Ranking rule (LOCKED, unchanged): same medicine / closest analog first → then weighted toward what's easy to find where the user already shops (same-store availability) → specialty / harder-to-find last.
Only VERIFIED swaps are listed (refuse-when-uncertain). Use a "More as we verify them" honest slot rather than padding the list.
Product images (catalog-first — LOCKED)

Canonical productImage is SEEDED BY US from catalog sources (DailyMed / openFDA for OTC drugs + supplements; retailer/UPC image DBs for shelf packaging), keyed to the EXACT barcode / UPC / SKU so the image matches the product physically on the shelf.
IMAGE FIDELITY IS A HARD REQUIREMENT (a trust feature, not just aesthetic): match the exact SKU, or show the placeholder — NEVER a wrong/mismatched image. A wrong photo breaks the scan-then-verify trust loop before the user even reads the verdict.
Every image (catalog OR user) is NORMALIZED to ONE white frame — product centered on white, same crop/padding — so the source becomes invisible and the grid reads as one uniform set. Background-removal on user uploads.
User photos are an auto-normalized BACKFILL only: the fallback for products the catalog doesn't cover, and the correction when catalog art is stale (packaging redesigns). NOT the primary source. (All-user-photos was REJECTED: it causes a cold-start blank grid at launch + inconsistent snapshots.)
Placeholder copy: "Image coming" headline + a small secondary "＋ Add a photo" tap. ("No image yet" is the fully-honest alternative — Brandon's editorial call; currently "Image coming.")
Curation is NOT manual-per-photo: catalog seeding covers most products; automated vision screening auto-rejects blur/junk/inappropriate and auto-accepts clean shots; community upvote decides canonical at scale; light human review only for genuinely borderline cases.
================================================================ 7. ARCHITECTURE — CLEAN PICKS (existing web surface)
Per-category folder pattern (this is what's live; first surface of the rating data): app/clean-picks/page.tsx (landing) · pain-fever/page.tsx · cold-flu/page.tsx · allergies/page.tsx components/clean-picks/ PickCard.tsx · RetailerChips.tsx · CategoryTile.tsx lib/clean-picks/ classColors.ts · painFeverPicks.ts (defines Pick type + ClassKey union) · coldFluPicks.ts · allergyPicks.ts · verdictLabels.ts (Verdict type + VERDICT_LABELS/VERDICT_COLORS, added Aug 8) lib/ratingRecord.ts (RatingRecord type — the app-wide schema, added Aug 8, imports Verdict from clean-picks/verdictLabels) lib/oilsData.js (essential-oils-only data, split out of medsData.js on Aug 8; medsData.js and DosageCalculatorIcon.tsx have been DELETED — see change log)

Type system: Pick type + ClassKey union live in painFeverPicks.ts (imported by all data files). PickForm = oral|topical|sublingual|nasal|eye. TopPickCategory = oral|kids|topical|nasal. CLASS_COLORS in classColors.ts must have an entry per ClassKey.

Card design (LOCKED — Option A): white card + colored top bar by drug class. Top Picks tab shows ⭐ ORAL/KIDS/TOPICAL/NASAL badges. Retailer cap: 4 visible chips + "+ More".

================================================================ 8. CURRENT STATE
Live Clean Picks categories (the seed ratings)

Pain & Fever — 9 picks. Top: Tylenol Dye-Free (ORAL), Genexa Kids' Pain & Fever (KIDS), Voltaren Gel (TOPICAL).
Cold & Flu — 13 picks. Top: Umcka (ORAL), Genexa Kids' Multi-Symptom (KIDS), Badger Aromatic Chest Rub (TOPICAL). NOTE: Equate Mucus-ER (previously listed here as a confirmed-clean pick) is corrected to AVOID as of Aug 8 — see Section 4 discoveries. Not yet applied to coldFluPicks.ts. Category needs a new verified dye-free guaifenesin pick.
Allergies — 8 picks. Top: Genexa Allergy Care (ORAL), Genexa Kids' Allergy (KIDS), Xlear Nasal Spray (NASAL).
Methodology pass vs v1.3/v1.4 — IN PROGRESS (web-verified findings so far; NOT yet applied to the data files):

AVOID (Pain & Fever): "Tylenol Extra Strength Dye-Free" appears to be a phantom — there is no adult dye-free Tylenol caplet; real Tylenol ES = titanium dioxide + FD&C Red 40. REPLACE with Genexa Acetaminophen Extra Strength (the real clean adult acetaminophen, already pick #5, verified clean). Children's Tylenol Dye-Free → Avoid (sucralose + sorbitol + potassium sorbate + flavors). Children's Motrin Dye-Free → Avoid (acesulfame K + others). Biofreeze → Avoid (FD&C Blue 1 + Yellow 5 + methylparaben; "colorless" version unverified for parabens).
CONSEQUENCE: pulling those 4 drops Pain & Fever to ~5 clean picks — below the 8-pick bar. Needs more clean P&F picks or a category rethink.
CAUTION-flagged under strict v1.2 but LIKELY CLEAR under the harm-anchored "citable harm source" rule (FINALIZE next session): Sambucol Syrup (potassium sorbate — thin harm basis), Boiron Chestal Children's (sodium benzoate — benzene pathway needs vitamin C, which it lacks), Zarbee's (natural flavor — "opacity, not a hazard," no harm source to cite). Principle: no citable HARM source → not a harm demerit (transparency note at most).
Allergies: all 8 clean, no avoids/cautions found (confirmed June 14).
Colloidal silver → Caution (logged in methodology as the active-safety worked example).
Silicon dioxide → Caution (logged in methodology as the Nanoparticle Precautionary Rule worked example, v1.4).
Live routes: /, /account, /clean-picks (+ allergies/cold-flu/pain-fever), /oils (+ [slug]/carriers/safe-to-ingest), /privacy, /terms.

================================================================ 9. OIL LIBRARY (KEEP & EXPAND)
Worwood-grounded essential-oil safety reference. Frame toward caution/safety, not ingestion. Rated on cleanliness; no efficacy claims. Status colors: External Only / Dilute First / Internal Only.

STATUS (Aug 8 — cleanup complete): Oil data now lives in its own file, lib/oilsData.js (22 oils, split out of the old medsData.js). Both app/oils/page.tsx (hub) and app/oils/[slug]/page.tsx (detail) import from oilsData.js. The old medsData.js and components/icons/DosageCalculatorIcon.tsx have been DELETED — confirmed no remaining references via repo-wide grep before deletion, clean npm run build after. The detail page's old "Tools row" (Compatibility → /interaction-checker, Dosage → /dosage-calculator) was also removed entirely, since both linked to routes cut back on May 28 — this resolved the placeholder-icon cleanup task by making the icon dependency moot rather than replacing it.

================================================================ 10. MONETIZATION & PRICING
Freemium with the CORE feature gated:

Free: full website + free app account with manual product lookup/browse. Top of funnel.
Premium: unlocks the scanner (the core feature). Gate the core, not peripheral extras (aim to beat Yuka's sub-1% conversion). Payment: web-based Stripe ("Netflix model"), NOT in-app purchase — avoids app-store commissions/legal flux. App unlocks the scanner after web purchase. "Lock in today's rate for life": each subscriber locks their signup rate while continuously subscribed; founding members $10/year; later cohorts lock the then-current rate. Run multiple Stripe price objects (one per cohort). California auto-renewal compliance (clear disclosure, easy cancel, renewal notices) — include in attorney review. Acquisition (reaffirmed): podcast promos / word of mouth / app-store visibility — NOT SEO. Convert via founding-member waitlist + a "request/upvote a product to rate" capture, not a sign-up wall. Live now: home App CTA is a working founding-member signup routing to /account. Stripe NOT integrated; premium flag exists in Supabase, unenforced.
================================================================ 11. DATA FOUNDATION FOR THE SCANNER (PHASE 2)
Drugs/OTC: FDA openFDA API + DailyMed (structured labels incl. inactive ingredients AND product/label images) + NDC Directory. (DailyMed is already our go-to for verifying inactive-ingredient lists during audits, and is the seed source for catalog product images per §6.)
Supplements: NIH Dietary Supplement Label Database (DSLD).
Product images: DailyMed/openFDA + retailer/UPC image databases, keyed to barcode/SKU (see §6 image rules).
Oils/remedies: no standardized product DB — NOT a scan target; stays a content reference.
Scanner targets drugs + supplements. Verify current API access/terms at build time.
================================================================ 12. PHASING (APP-FIRST)
Phase 1 (now): BUILD THE BRAIN. Lock the methodology (v1.4 done), define the rating-record schema (done — see §5), and seed the rating database by hand (correct, sourced verdicts). Keep a lean web presence (landing + founding-member capture + small credibility surface). The brain must be correct/seeded before anything goes live, because the scan-then-verify trust loop is unforgiving — the audit work so far has already caught mislabeled products (the phantom Tylenol ES Dye-Free, and now the Equate Mucus-ER dye finding) that had gone unverified in earlier sessions.
Phase 2 (the destination): the scanner app — barcode scan → openFDA/DailyMed/DSLD lookup → methodology engine scoring → verdict + sourced breakdown; backend + data pipeline; accounts/auth + Stripe per-cohort billing; iOS/Android (free browse for all, scanner for premium). Bigger, harder, longer build — and the point of the whole thing.
================================================================ 13. LEGAL POSTURE (NON-NEGOTIABLE)
No individualized medical advice and no efficacy claims anywhere — information + product-cleanliness ratings only. (Why the Dosage Calculator, Interaction Checker, and Conditions pages were cut; why homeopathy/oils are rated on cleanliness, not whether they "work"; why a member forum stays deferred — UGC reintroduces that liability.)
Every "Avoid" rests on citable evidence; flags state facts, never "unsafe."
Strong Medical Disclaimer, Affiliate Disclosure, Privacy Policy, solid About page. STATUS (Aug 8): footer no longer links to /disclaimer, /affiliate-disclosure, or /about — those pages don't exist yet and writing draft legal copy before attorney review risked content debt (draft now, rewrite after review). Footer currently links only to the two live pages (Privacy Policy, Terms of Service) plus site nav. These three pages remain a pre-launch to-do, to be written once during attorney review, not before.
User-submitted product photos (§6) are light UGC: need basic content moderation + a license grant / content policy in the terms. Low-risk vs a forum, but fold into attorney review.
Affiliate links are compatible with no-agenda IF the rating is decided before and independently of any affiliate relationship (same methodology on products that pay and don't); attach at the retailer level; disclose plainly (FTC). Fold into attorney review.
Owner to-do: form an LLC; one-time attorney review before launch (incl. auto-renewal/subscription compliance + affiliate disclosure + About/Disclaimer/Affiliate-Disclosure page copy) — via Richard Aaron @ Dowling Aaron.
================================================================ 14. TECH BASICS
Site: knowyourremedy.com · Local: C:\Users\bdez1\OneDrive\Desktop\knowyourremedy
Stack: Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
Supabase: profiles (auto-created via auth trigger), family_profiles (kept). STATUS (Aug 8): dose_logs and saved_remedies tables DELETED from Supabase — confirmed zero code references via repo-wide grep before deletion, clean npm run build after. (Note: dose_profiles referenced in earlier notes did not actually exist as a separate table — likely a naming mismatch with dose_logs in an earlier session.) profiles and family_profiles are now the only tables. Email confirmation OFF. AuthForm uses .upsert() to handle the auto-create race.
Methodology doc: docs/METHODOLOGY.md (v1.4).
================================================================ 15. PENDING WORK
The brain (priority)

Begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into the RatingRecord shape now that the schema exists in code (lib/ratingRecord.ts).
Finish the v1.3/v1.4 verdict pass on the live picks: apply the 4 Pain & Fever Avoids, replace phantom "Tylenol ES Dye-Free" with Genexa Acetaminophen ES, finalize the 3 Cautions under the harm-anchored rule, resolve Pain & Fever falling below 8 clean picks, AND apply the new Equate Mucus-ER → Avoid correction + find its dye-free guaifenesin replacement for Cold & Flu.
Migrate ratings from TS arrays → Supabase table once schema is locked and ratings are correct.
Gather a "trusted sources" reference list (Brandon in progress) to speed up future ingredient research — was the trigger for pausing the deep ingredient-audit topic on Aug 8.
App UI (design system v2 locked — §6; ready to build)

Build the post-scan product-detail screen as a real React component using placeholder data in the RatingRecord shape. Full design locked Aug 8: verdict-first header, Flagged/Cleared tap-to-expand drill-down, cleaner-alternatives carousel with retailer chips. This is the recommended next-session starting point.
Ingredients tab and Photos tab content/behavior not yet designed — only Overview tab was mocked.
Catalog-first image pipeline, saved-star tap animation/toast — designed on paper, not yet built.
Oil Library

DONE (Aug 8): data split into lib/oilsData.js; medsData.js + DosageCalculatorIcon.tsx removed; dead Tools-row links removed from the detail page.
Remaining: deepen Worwood-grounded content; expand oil count.
Web (lean) & monetization

Landing + founding-member capture + small credibility surface. Optional inline email capture on the home CTA. "Request / upvote a product to rate" form.
Stripe web billing + per-cohort locked-rate pricing + founding-member flow.
Data cleanup

DONE (Aug 8): pruned orphaned Supabase tables (dose_logs, saved_remedies).
Launch prep

Attorney review (Terms, Privacy, Medical Disclaimer, About, Affiliate Disclosure page copy, auto-renewal + affiliate disclosure + user-photo UGC) via Richard Aaron. LLC formation. Footer Legal section currently lean (Privacy + Terms only) by design until attorney review — see §13. Final QA.
Phase 2

The scanner app (Sections 11–12).
Post-launch backlog

Member forum — revisit once there's critical mass + moderation bandwidth (UGC medical-advice liability + cold-start problem).
================================================================ 16. CHANGE LOG (recent first)
August 8 — Cleanup sweep + post-scan screen design v2 + Methodology v1.4

Oil Library split: lib/oilsData.js created (22 oils); app/oils/page.tsx and app/oils/[slug]/page.tsx repointed to it; lib/medsData.js and components/icons/DosageCalculatorIcon.tsx deleted after confirming zero references; dead "Tools row" (Compatibility/Dosage links to already-cut routes) removed from the oil detail page. Clean build confirmed at each step.
Footer fixed: removed 3 dead links (/disclaimer, /affiliate-disclosure, /about — none exist yet, and writing draft legal copy pre-attorney-review risked content debt); added working Terms of Service link; copyright year corrected to 2026.
Supabase cleanup: dose_logs and saved_remedies tables deleted after confirming zero code references. profiles and family_profiles are the only remaining tables.
Rating-record schema implemented in code: lib/clean-picks/verdictLabels.ts (Verdict type, VERDICT_LABELS, VERDICT_COLORS — single source of truth for verdict wording) and lib/ratingRecord.ts (full RatingRecord type per PROJECT_NOTES §5).
Equate Mucus-ER correction: verified DailyMed label shows FD&C Blue #1 aluminum lake — contradicts prior "confirmed Clean" claim from an earlier, unverified session. Corrected to Avoid per Methodology §5 (dyes are High-tier, lake form included). Not yet applied to coldFluPicks.ts; category needs a new verified dye-free replacement pick.
Five excipients researched and confirmed Cleared with primary-source citations (hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, carbomer homopolymer Type A/B/C) — added to Methodology §5 Cleared table with sources.
METHODOLOGY v1.4: added the Nanoparticle Precautionary Rule (open ingredient-specific nanoparticle regulatory review → capped at Caution, even at 0 demerit points). Silicon dioxide reclassified from Cleared to this new Precautionary tier as the first case; EFSA 2018 open data-gap review is the trigger. Full rule + worked example in docs/METHODOLOGY.md.
Post-scan product-detail screen fully mocked and locked, v2 (supersedes July 12 v1 in two respects): (1) VERDICT PLACEMENT moved to its own row at the very top of the screen, above the product title, after an explicit A/B mockup comparison — the July 12 "below the title" placement tested as too easily overlooked. (2) CLEANER ALTERNATIVES redesigned from a single static card to a horizontally scrollable carousel (Yuka-style "Recommendations" row, adapted) showing multiple verified swaps at once, each with verdict word + dot (never a numeric score) and retailer availability chips, so a shopper can tell at a glance whether a pick is worth pursuing at their store. Flagged/Cleared row tap-to-expand drill-down also mocked and confirmed (chevron flips, reveals plain-language reasoning + source links). Full assembled screen mockup approved as the reference for the next-session build.
July 12 — App UI & design system v1 locked (post-scan screen) [SUPERSEDED Aug 8 — see above for current version]

Designed the post-scan product-detail screen in a Yuka-clean idiom: white, hairline rows, one line-icon per row, FLAGGED/CLEARED sections, all sources behind a per-row chevron drill-down, no score.
Color discipline locked: rating color (verdict word + dots) + brand green (actions) ONLY; everything else monochrome; photos carry the warmth. Verdict word colored in its status color.
Saved star fills brand green (NOT gold) with bounce + momentary toast.
Cleaner Options feature: fires on Avoid + Caution; best swap INLINE on the result screen, full ranked list on tap-through; ranking = closest analog first → same-store availability → specialty; verified-only.
Product images: catalog-first (DailyMed/openFDA/UPC), seeded by us and keyed to the EXACT SKU; image fidelity a HARD requirement (exact match or placeholder, NEVER a wrong image); all images normalized to one white frame; user photos are auto-normalized backfill + stale-art correction; placeholder = "Image coming" + quiet "Add a photo"; curation automated (catalog seed + vision screening + community upvote), not hand-curated.
Schema (Section 5) additions: productImage (canonical, catalog-seeded), userPhotos[] (backfill pool), cleanAlternatives (ordered, closest-first). Confirmed the canonical rating-record field list IS PROJECT_NOTES Section 5 (no separate schema file).
Reaffirmed methodology alignment: synthetic dyes incl. Red 40 are already High-tier (§5); lead citations with independent science, FDA action as corroboration only (§4); no 0–100 score (§3).
June 14 — App-first pivot confirmed + Methodology v1.3

DECISION: app-first. The barcode-scanner app is the committed destination and the priority; build everything as if building the app. The methodology + ratings are the app's database ("the brain"); capture ratings as structured, source-of-truth data, not website-only content. Website shrinks to a lean landing + founding-member capture + small credibility surface; it is NOT the acquisition channel. Acquisition = podcast promos / word of mouth / app-store visibility. Rationale: Yuka grew via word of mouth + virality with no content-site funnel; trust comes from in-product transparency + inline sourced citations (scan-then-verify), not a brand site; founder motivation (the scanner is Brandon's fuel) is decisive for a solo build.
METHODOLOGY v1.3 (docs/METHODOLOGY.md) locked: active-ingredient safety as a verdict cap (with the acetaminophen boundary), dose/frequency sensitivity (cumulative vs concurrent harms), source standard + regulator asymmetry (FDA approval ≠ safety; enforcement = harm signal), two-layer presentation (verdict badge + sourced per-ingredient drill-down). Colloidal silver added as the worked example → Caution.
Methodology pass on the 30 live picks STARTED (web-verified): 4 Avoids found (Tylenol ES Dye-Free phantom/TiO2+dye, Children's Tylenol Dye-Free, Children's Motrin Dye-Free, Biofreeze), Equate Mucus ER confirmed Clean [SUPERSEDED Aug 8 — actually Avoid, see above], 3 Cautions flagged but likely clearing under the harm-anchored rule. To be finalized + applied to data files next session.
May 28 — Cut features removed; home reshaped with founding-member CTA

Removed Dosage Calculator, Interaction Checker, Conditions/Remedies entirely (routes, components, libs, redirects). Build green. Home reshaped: hero search → Browse Clean Picks CTA; App CTA → working founding-member signup. Account dashboard stripped of dose-log + saved-remedy sections; family profiles + settings kept. medsData.js + DosageCalculatorIcon.tsx SURVIVED (Oil Library depends on them) [SUPERSEDED Aug 8 — both deleted after the Oil Library split].
May 28 — Strategic pivot to Yuka-for-medicine + methodology + Allergies

Repositioned as Yuka for medicine/supplements/remedies with a barcode-scanner endgame. Clean Rating Methodology v1 committed to docs/METHODOLOGY.md (4-tier harm-first engine). Allergies Clean Picks shipped (8 picks); added nasal + eye PickForms, antihistamine + salineNasal classKeys, 'nasal' top-pick bucket.
May 26 — Cold & Flu Clean Picks (13) + editorial standard locked (seed oils, TiO2, FD&C dyes disqualifying). Discoveries: Sudafed/Mucinex/Maty's rejected; Equate Mucus ER + Badger as clean equivalents [Equate correction — see Aug 8]. Advil removed from Pain & Fever (→ 9 picks). May 26 — Pain & Fever Clean Picks shipped; per-category folder architecture locked; Card design Option A. May 25 — Clean Brands → Everyday Clean Picks rename (/brands → /clean-picks). Scope locked to mainstream retailers. May 22 — Visual direction locks (vintage scientific plates, Blue B section label, Worwood internal-use gate). Earlier — Conditions rename, interaction checker, dosage calculator, Supabase schema. [most now cut]