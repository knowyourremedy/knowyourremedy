KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state. If you're a new Claude starting a session: read this entire file before responding to anything. Brandon paste-references this file at the start of every chat.

Last Updated: September 11, 2026 (synced §4/§8 to main after PRs 1–3 — P&F/C&F removals, Caution drafts, lib/rating-drafts/)

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
THE COMMITTED DESTINATION: a barcode-scanner app (scan a medicine/supplement/vitamin → instant Clean / Caution / Avoid verdict + ingredient breakdown + sources; scan an essential oil → informational usage lookup, no verdict — see §9). This is the product and the priority. We build everything going forward as if building the app.

The brain. The methodology + the ratings ARE the app's database ("the brain"). Two parts:

The LOGIC — the methodology (docs/METHODOLOGY.md, currently v1.4). The rules that turn any ingredient list into a verdict. The scanner runs this engine. ~80% categorized as of Aug 2026; remaining work is adding preferred multi-source references and locking the last ingredients. Founder (Brandon) owns final calls on automatic Avoid vs Caution vs Clean — not delegable to bots (see §12).
The KNOWLEDGE — the rating database. Every product as a structured record. This is what the scanner looks up on a barcode hit. Near-term work = building the brain: populate the knowledge by hand today, transitioning to bot-assisted bulk generation once the methodology is fully locked (see §12).
Why app-first (the decision, June 14). The website is NOT the growth engine and not a destination:

Acquisition = push channels (podcast promos, word of mouth, app-store visibility), NOT SEO. Yuka grew to tens of millions on word of mouth + a viral moment with zero paid marketing and no content-site funnel.
Trust = in-product transparency + inline sourced citations (the user scans, sees the flagged additive with its primary source, and the claim is verifiable — beats outsourcing verification to a Google search that can be gamed). NOT a brand-credibility website.
Founder motivation is decisive for a solo build, and the scanner is what energizes Brandon. That settles it. The website therefore shrinks to a lean landing + founding-member capture + a small "how we rate / a few examples" credibility surface (for when push-channel traffic Googles the brand). It is not a content engine and not the acquisition channel.
The moat (why we win)

No agenda — we don't sell what we rate, so ratings are trustworthy. The core differentiator. Every flag carries a citable source, shown in the breakdown.
One transparent, documented scoring methodology applied identically to every product — conventional, natural, homeopathic alike — including the ones we'd tell you to avoid.
The gap nobody owns — Yuka does food/cosmetics; nobody owns medicine/supplements/remedies.
================================================================ 2. SCOPE & CATEGORIZATION (MAJOR UPDATE — August 2026)

Graded product scope: OTC medicines, vitamins, supplements. Protein powders/shakes are IN SCOPE as a database category (they are dietary supplements, not conventional food, and get NO separate grading system — same methodology applies) but are DEPRIORITIZED — Brandon's explicit call: most customers mentally file protein powder as food, not medicine, so it isn't needed for launch. Code the category now so it exists in the schema, but do not populate/launch it until after launch or whenever it's revisited. This is a deliberate scope choice, not an oversight — do not "helpfully" add protein powder data before Brandon asks.

Essential oils are scanned but NEVER graded (info-only — see §9). Firm, permanent distinction, not a launch-time limitation.

CATEGORIZATION MODEL (locked Aug 2026 — supersedes any earlier category structure):

Primary, user-facing category = WHAT THE PRODUCT IS USED FOR (use-based), not product type. Examples: Cold & Flu, Allergies, Immune Support, Pain & Fever, Sleep, Digestive, Headache, etc. This is what users browse/search by, and it's the ONLY thing that should ever be exposed as a category filter in the UI. Rationale (Brandon's reasoning, locked): a shopper standing in Whole Foods scanning an elderberry+zinc gummy is thinking "I have a cold coming" or "immune support," not "show me vitamins." Forcing OTC/Vitamin/Supplement as the primary organizing structure creates artificial, unhelpful splits for products that legitimately span categories.
product_type (OTC / Vitamin / Supplement / Protein Powder) and product_subtype (e.g. homeopathic, herbal) are INTERNAL DATABASE METADATA ONLY. They exist to help Brandon and bots organize/query the database and apply the right methodology nuances — they are NEVER shown to users as a filter, label, or organizing structure. Do not build a "filter by OTC vs Supplement" UI — this was explicitly rejected as benefiting the database, not the user.
Homeopathic products: categorize by use, same as everything else (e.g. Umcka goes in Cold & Flu). Tag product_subtype = homeopathic for internal tracking. Do NOT create a separate "Homeopathic" category.
Herbal/natural remedies (echinacea, elderberry, valerian, etc.) are NOT a separate category either — they slot into whatever use-category fits, tagged product_subtype = herbal (or similar) internally if useful for later filtering work, but never surfaced as a distinct section.
Do not recategorize existing products before database/schema work is done — this is a forward-looking rule for new records, not a mandate to redo Pain & Fever/Cold & Flu/Allergies right now.
KEEP & EXPAND (the heart)

The methodology + the rating database — the app's brain. The manual rating work (Clean Picks today) is the seed of the scanner's DB.
Oil Library — Worwood-grounded essential-oil safety reference, now scan-based (Aug 2026 decision — see §9). Oils are scanned by barcode like other products but are NOT rated Clean/Caution/Avoid — no standardized safety database exists to support that verdict for oils the way DailyMed does for drugs. IP: attribute Worwood, write original content, never reproduce her charts/text/recipes verbatim.
Medicine Cabinet — users can star/save any product to a personal Medicine Cabinet in their profile (the "liked/remembered items" area). This is a BRAND-NEW feature (Aug 2026), unrelated to and NOT a revival of the old saved_remedies Supabase table (deleted Aug 8 — that table belonged to the cut May 28 Dosage Calculator/Conditions system). Do not confuse the two or assume this reintroduces cut functionality.
LEAN / SHRINK

Web presence: lean landing + founding-member capture + small credibility surface. NOT a content/SEO build-out. Existing Clean Picks pages stay as the first surface of the rating data but aren't expanded as a traffic play.
CUT — REMOVED May 28 (see change log)

Dosage Calculator — liability (individualized dosing). GONE.
Interaction Checker — liability ("safe to combine" verdicts). GONE.
Conditions / Remedies pages — commodity content, off-mission, treatment-advice liability. GONE. We are OUT of the "how to treat/medicate" business and INTO the "what should I buy, and is it clean" business.
================================================================ 3. BRAND, DESIGN & VOICE (LOCKED)
Colors

Primary brand green: #2d4a3e — headers, CTAs, active states
Rx blue: #2563eb · Blue B (section labels): #4a6781
Rating status (verdict wording UNCHANGED — still Clean/Caution/Avoid, NOT Good/Caution/Avoid; confirm this every session, it gets asked about): Clean #27ae60 · Caution/amber #d97706 · Avoid #c0392b
Oils: usage classification colors TBD (old External Only / Dilute First / Internal Only superseded — see §9; new three-way classification is Topical only / Internal confirmed / Unknown-unconfirmed)
Typography

Playfair Display (var(--font-playfair)) — serif headlines
Inter (var(--font-inter)) — sans-serif body
Section label pattern (Blue B uppercase): fontSize 0.78rem, fontWeight 700, uppercase, letterSpacing 0.07em, color #4a6781, followed by a 28px × 2px rule in #4a6781.

Icons (LOCKED): Clean Picks ✨ · Essential Oils 🌱 · Home 🏠.

Editorial voice (LOCKED)

"Why this pick" callouts: ingredient quality + availability in 1-3 sentences. Brand-green left border.
"Honest note" callouts: amber/cream banner. ALWAYS for caveats — pregnancy, age limits, allergy disclaimers, dilution honesty, dose/frequency-dependent harms.
Goal-framing, never prescriptive. "If your goal is X, consider Y" — never "stop taking" / "you should switch."
Honest-disclosure principle: better to mark "no data available" than write a wrong claim. Refuse-when-uncertain is the credibility differentiator.
Honest broker: rate conventional, natural, and homeopathic the same way. Cleanliness is judged on ingredients; we NEVER make or imply an efficacy claim. Where the basis is traditional use, say so and cite it (Carlston for homeopathy, Worwood for oils); where clinical evidence exists, cite it and label its strength honestly. Not the dismissive regulator, not the hype site.
Legal wording: flags state facts, never danger ("contains X; clean brands exclude it" — never "unsafe"). Per the Genexa/NAD ruling — can't imply a competitor's product is dangerous.
================================================================ 4. RATING METHODOLOGY (SOURCE OF TRUTH)
The documented scoring engine lives at docs/METHODOLOGY.md — now v1.4. Read it before making any rating call. Applies to OTC medicines, vitamins, supplements (protein powder included in scope but deprioritized — see §2) — NOT essential oils, which are informational-only (see §9). Summary:

Two layers (this is also the product/app UI model):

PRODUCT VERDICT (the badge, the glance): Clean / Caution / Avoid.
INGREDIENT RISK LEVELS (the drill-down, the proof): each ingredient tagged Cleared (0pt) / Limited (1pt) / Moderate (2pt) / High (auto-Avoid), each with its source.
Scoring: 0 pts = Clean · 1–2 pts = Caution · 3+ pts OR any single high-risk = Avoid.

STATUS (Aug 2026): methodology is ~80% categorized across the ingredient universe. Remaining work: add preferred multi-source references for the last uncategorized ingredients, and lock final calls on the borderline ones. Founder (Brandon) has final say on every automatic-Avoid-vs-Caution-vs-Clean call — this is explicitly NOT delegable to bots (see §12), even once bulk database generation starts.

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
Equate Mucus-ER (Walmart): CORRECTED Aug 8 — previously listed as "confirmed Clean, 5 inert excipients, no dye." The actual verified DailyMed label (setid a2cc6dec) shows FD&C Blue #1 aluminum lake among the inactive ingredients. Per Methodology §5, synthetic dyes (including lake forms) are High-tier. CORRECTED VERDICT: AVOID, not Clean. APPLIED on main (PRs 1–3): removed from coldFluPicks.ts. Do not restore. Cold & Flu still needs a verified dye-free guaifenesin pick to restore the Mucinex-alternative slot.
REMOVED FROM LIVE CLEAN PICKS (PRs 1–3 — do not restore): "Tylenol Extra Strength Dye-Free" (phantom — no adult dye-free Tylenol caplet), Children's Tylenol Dye-Free, Children's Motrin Dye-Free, Biofreeze. Adult clean acetaminophen on the page is Genexa Acetaminophen Extra Strength. Those removed SKUs may appear as unverified drafts in lib/rating-drafts/ — that is not a Clean Picks restore.
Sambucol Gummies: vegetable oil → rejected. Sambucol Black Elderberry Original Syrup is a Caution draft (potassium sorbate) — not verified Clean. See §8.
Maty's Vapor Rub: sunflower oil → rejected. Badger Aromatic Chest Rub is the clean alternative.
Second-gen antihistamine TABLETS (Zyrtec/Claritin/Allegra, brand + generic): titanium dioxide → rejected. "Dye-free" kids' cetirizine syrups: parabens + propylene glycol → rejected.
COLLOIDAL SILVER → Caution (v1.3 worked example for the active-safety cap). Additives are silver + water (Clean on additives alone), but the active carries documented harm — argyria (permanent, cumulative, no established safe level) + concurrent interactions with certain antibiotics and thyroid meds. Sources: NCCIH, Mayo, peer-reviewed argyria case reports (FDA enforcement as corroboration only). Set at Caution (argyria dose-cumulative + mostly cosmetic); the pull toward Avoid is no-safe-threshold + irreversible + frequency-proof interactions. "Natural/old" never auto-means clean.
SILICON DIOXIDE (v1.4 worked example for the Nanoparticle Precautionary Rule) → Caution, capped not scored. No confirmed harm mechanism at ingested/amorphous-form use levels (EFSA 2018: no safety concern at reported levels), but the same EFSA review left an open nanoparticle absorption/behavior data gap that hasn't closed. Distinct from crystalline silica (inhaled, IARC Group 1 — unrelated hazard). Cap lifts if the EFSA review closes clean; converts to a demerit tier if it finds harm.
Verified-safe excipients (Aug 8 research pass, full citations in Methodology §5 Cleared table): hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, carbomer homopolymer (Type A/B/C monograph — note the older 934/940/941 grades had a since-addressed benzene concern that does NOT apply to the current monograph).
Homeopathic eligibility: eligible if inactives are clean, available at in-scope retailers, evidentiary framework documented. Citation: Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — use in any homeopathic pick's honestNote. Low-dilution (Umcka 1X) gets a softer note; extreme dilution (Oscillococcinum 200CK) gets a STRONG note. Homeopathy is rated on cleanliness only — no efficacy claims (keeps the no-efficacy-claim liability shield intact). Oils are no longer rated at all as of Aug 2026 (see §9) — this line's oils reference is superseded; homeopathic half stands.

================================================================ 5. THE RATING DATA MODEL (THE BRAIN)
Each graded product is captured as a STRUCTURED RECORD (not prose, not site-only content), in an app-ready shape so it copy-pastes into Supabase later. This applies to OTC/vitamins/supplements (protein powder schema exists but is dormant — see §2) — NOT essential oils, which use a separate, verdict-free record type (OilInfoRecord — see §9). This Section 5 list IS the canonical rating-record field set (there is no separate schema file). Target fields:

product name, brand
use-based category (what it's for — the ONLY user-facing category; see §2) — e.g. Cold & Flu, Immune Support, Sleep
product_type (OTC / Vitamin / Supplement / Protein Powder) — INTERNAL METADATA ONLY, never shown to users (see §2)
product_subtype (e.g. homeopathic, herbal) — INTERNAL METADATA ONLY, never shown to users (see §2)
formulaId — links this record to sibling records that share the exact same formula/inactive-ingredient list across different pack sizes. ADDED Aug 2026 (see barcode/formula rule below).
barcode / UPC — every distinct barcode gets its own record (a barcode is how the scanner finds a record at all — no way around this). If a manufacturer genuinely reuses one barcode across pack sizes (uncommon, verify per-product, don't assume), one record can legitimately cover it. DEFAULT ASSUMPTION when unverified: separate records per barcode, linked via shared formulaId, since different pack sizes typically DO have different barcodes.
active ingredient(s) + strength
inactive ingredients (full list)
per-ingredient risk level (cleared/limited/moderate/high) + source per flag
active-safety flag (if any) + source
verdict (Clean/Caution/Avoid) — conceptually lives at the FORMULA level: correcting one variant's grade should propagate to every barcode/record sharing that formulaId, not require manual re-editing of each pack-size variant individually.
honest note
retailer availability
minAge — minimum labeled age (e.g. {years: 2} or {months: 6}). Required for the age-matching rule on cleaner alternatives (see §6). Not optional to skip when populating real records.
audience — kids vs adult flag, used alongside minAge for alternative-matching (see §6).
productImage — the ONE canonical shot everyone sees; catalog-seeded by us, keyed to the exact barcode/SKU (see §6 image rules)
userPhotos[] — community submission pool; auto-normalized BACKFILL only, and the correction path when catalog art is stale (see §11 for the full submission/review-queue workflow)
cleanAlternatives — ordered list of swap product ids, ranked closest-analog-first, filtered by category/age/audience match (populated for Caution + Avoid records; see §6 Cleaner options)
recordStatus — verified / provisional-pending-review / unverified. New fields from the submission workflow (§11): a provisional record can go live with an auto-generated grade if the label photos are readable and match the methodology, but is flagged pending review; a verified record can never be overwritten by a later unverified submission.
MONETIZATION BACKDOOR FIELDS (coded now, inactive/null at launch — see §10 for full spec): is_sponsored (boolean), sponsor_id (string, nullable), click_tracker_count (integer, silent).

STATUS: schema now exists in code, needs updating for this session's changes. lib/clean-picks/verdictLabels.ts holds the Verdict type + VERDICT_LABELS/VERDICT_COLORS as the single source of truth for verdict wording (confirmed UNCHANGED this session — still Clean/Caution/Avoid). lib/ratingRecord.ts holds the RatingRecord type — NEEDS UPDATING to add: formulaId, product_type, product_subtype (as internal-only fields), audience, recordStatus, and the three monetization backdoor fields (§10). Not yet done as of this note. lib/oilInfoRecord.ts holds the separate OilInfoRecord type for scanned oils (UsageClassification, dosing fields, no verdict) — see §9. NEXT SESSION: update lib/ratingRecord.ts with the new fields above, then begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into this shape.

Current storage: ratings live as hardcoded TypeScript arrays in the Next.js app (lib/clean-picks/painFeverPicks.ts etc.). DIRECTION (not today): migrate to a Supabase table once the schema is locked and the ratings are correct. Content first, container later — don't refactor storage before the ratings themselves are right.

================================================================ 6. APP UI & DESIGN SYSTEM (v2 — locked August 8, 2026; open questions closed September 11, 2026)
The post-scan product-detail screen is the app's centerpiece; it presents the two-layer methodology (verdict + per-ingredient proof) for graded products (OTC/vitamins/supplements). Essential oils get a DIFFERENT scan-result screen — informational only, no verdict (see §9). Built in a deliberately plain, Yuka-clean idiom. Full screen mocked and approved in the Aug 8 session (mockups: verdict-placement A/B test, cleaner-alternatives carousel, flagged-row drill-down, full assembled screen). Sept 11 lock closed the two remaining open questions (trigger + display) and locked the Flagged/Cleared + verdict-banner behavior below.

Layout — post-scan / product-detail screen (graded products)

White background, generous whitespace, hairline dividers. ONE monochrome line-icon per row. No cards and no source chips at the top level. The ONLY tinted banner on this screen is the Caution/Avoid verdict banner (see below) — do not add other tinted banners.
VERDICT PLACEMENT (locked Aug 8 — supersedes July 12 version): the verdict — colored status dot + verdict WORD, no score — sits on its OWN row at the very TOP of the screen, above the product image/name/brand block, with the saved star (Medicine Cabinet toggle — see §2) on the same row (right-aligned). This was an explicit A/B decision: putting the verdict below the title (the more Yuka-literal placement) tested as "clean but slightly hidden" — it competed with the product name for attention and softened the instant gut-read the scan-then-verify trust loop depends on. Verdict-first wins.
VERDICT BANNER (locked Sept 11, 2026): Caution and Avoid use a light tinted verdict banner — a light wash of the rating color (amber #d97706 / red #c0392b), not a heavy filled block. Clean stays untinted (colored status dot + word only). This is a locked exception to the earlier "no tinted banners" line; it does not open the door to other tinted chrome.
Below the verdict row: catalog product image + product name (Playfair serif — the one KYR signature flourish, everything else is clean sans) + brand + active ingredient/strength.
Two sections: FLAGGED (the concerns) and CLEARED (the fine stuff) — our analog to Yuka's Negatives/Positives.
FLAGGED (locked Sept 11, 2026): ingredient names are visible without a tap. Each flagged row at rest: line-icon · bold ingredient name · one gray reason line · status dot · chevron. Tapping a flagged row expands it in place (chevron flips down→up) to reveal "Why this is flagged" in plain language + tappable source links. Sources stay behind the tap — names do not.
CLEARED (locked Sept 11, 2026): stays collapsed by default. Do not expand the cleared list on first view. Tap to expand a cleared row (or the section) and reveal the why + sources. This keeps the Overview calm so Flagged is what you read first.
Tabs up top (below the header block, above Flagged/Cleared): Overview · Ingredients · Photos.
Color discipline (LOCKED) — color has exactly TWO jobs; everything else is monochrome:

RATING color (Clean #27ae60 / Caution #d97706 / Avoid #c0392b) = the verdict WORD + the per-row status dots + the light Caution/Avoid verdict-banner wash. Always means "how clean it is."
BRAND green (#2d4a3e) = tappable/actionable things ONLY (scan button, "See all", active nav, links, the saved star). Always means "you can act here." Product photos carry the visual warmth — never colored UI chrome except the locked Caution/Avoid verdict-banner wash. Rare exception allowed: a colored row-icon for an active-safety cap (e.g., colloidal silver), if it genuinely needs to stand out — start conservative.
Saved star / Medicine Cabinet

Tapping saves the product to the user's personal Medicine Cabinet (profile area for liked/remembered items — see §2; NOT related to the old cut dosage-tracking system).
Fills BRAND GREEN when saved (NOT gold — gold would be a third color and break the two-color system). Outline = not saved; solid green = saved.
Tap feedback: outline→solid + quick bounce + a momentary toast ("Saved to your cabinet" / "Removed") that fades. State change + brief confirmation = unmistakable.
Cleaner alternatives (REDESIGNED Aug 8, matching rules expanded Aug 2026; trigger + display LOCKED Sept 11, 2026)

TRIGGER (locked Sept 11, 2026 — closes the prior open question): fires on CAUTION AND AVOID. Clean results do not show alternatives.
DISPLAY (locked Sept 11, 2026 — closes the prior open question): inline horizontal carousel on the Overview tab. Peeking/partially-visible next card at the row's edge so it's obvious there's more to scroll. A "See all →" link opens the full ranked list. Do NOT use a slide-up sheet as the primary alternatives UI. Section header reads "N clean alternatives" (dynamic count) so plurality is obvious before any tap. Each card shows: product image, name, brand, verdict word + colored dot (NOT a numeric score — deliberately does not copy Yuka's "84/100" format; conflicts with the locked no-0-100-score rule, Methodology §3), and retailer availability chips directly on the card (e.g. "Whole Foods, Sprouts" or a flagged "Not at Walmart").
MATCHING RULES (expanded Aug 2026 — CORE recommendation-engine logic, not optional filters, applied BEFORE ranking):
Only independently-Clean-scoring products are eligible as alternatives.
Use-based category match preferred (same "what it's for" category as the scanned product — see §2).
Age matching is REQUIRED: a 2+ product must only recommend other 2+-or-lower-minimum swaps — never 6+ or 12+ as a direct substitute, never infant-only as a swap for a 2+ product.
Audience matching: if the scanned product is clearly a children's product, prioritize other children's products.
Product-type matching: a graded item should not be recommended as an alternative to an essential oil or vice versa (oils aren't graded at all — see §9).
FORM IS NOT A HARD FILTER (added Aug 2026): if the scanned product is a syrup, it's fine to recommend a chewable or capsule that treats the same use-category, matches age/audience, and scores Clean — a store may only carry two syrups, so same-form-only filtering is too limiting. Form can be stored/shown as a label and same-form options sorted first, but other age-appropriate Clean-scoring forms in the same use-category should still appear. Nuance: if the original is clearly for a child who can't swallow pills, still allow age-appropriate chewables as options — just label the form clearly so the parent can choose.
Ranking order (after the hard matching filters above): same medicine/closest analog first → same-store availability → specialty/harder-to-find last.
ENGAGEMENT TRACKING (added Aug 2026): track whether the alternatives section is expanded/viewed, scrolled into view, a product is tapped, or a product is saved to the Medicine Cabinet from within it. Feeds the monetization/leverage data in §10.
Only VERIFIED swaps are listed (refuse-when-uncertain). Use a "More as we verify them" honest slot rather than padding the list.
Product images (catalog-first — LOCKED)

Canonical productImage is SEEDED BY US from catalog sources (DailyMed / openFDA for OTC drugs + supplements; retailer/UPC image DBs for shelf packaging), keyed to the EXACT barcode / UPC / SKU so the image matches the product physically on the shelf.
IMAGE FIDELITY IS A HARD REQUIREMENT (a trust feature, not just aesthetic): match the exact SKU, or show the placeholder — NEVER a wrong/mismatched image. A wrong photo breaks the scan-then-verify trust loop before the user even reads the verdict.
Every image (catalog OR user) is NORMALIZED to ONE white frame — product centered on white, same crop/padding — so the source becomes invisible and the grid reads as one uniform set. Background-removal on user uploads.
User photos are an auto-normalized BACKFILL only: the fallback for products the catalog doesn't cover, and the correction when catalog art is stale (packaging redesigns). NOT the primary source. See §11 for the full user-submission/review-queue workflow (expanded Aug 2026 — this used to be a simple backfill note, now a whole intake pipeline).
Placeholder copy: "Image coming" headline + a small secondary "＋ Add a photo" tap. ("No image yet" is the fully-honest alternative — Brandon's editorial call; currently "Image coming.")
Curation is NOT manual-per-photo: catalog seeding covers most products; automated vision screening auto-rejects blur/junk/inappropriate and auto-accepts clean shots; community upvote decides canonical at scale; light human review only for genuinely borderline cases (see §11 for the exceptions-only review queue model).
================================================================ 7. ARCHITECTURE — CLEAN PICKS (existing web surface)
Per-category folder pattern (this is what's live; first surface of the rating data): app/clean-picks/page.tsx (landing) · pain-fever/page.tsx · cold-flu/page.tsx · allergies/page.tsx components/clean-picks/ PickCard.tsx · RetailerChips.tsx · CategoryTile.tsx lib/clean-picks/ classColors.ts · painFeverPicks.ts (defines Pick type + ClassKey union) · coldFluPicks.ts · allergyPicks.ts · verdictLabels.ts (Verdict type + VERDICT_LABELS/VERDICT_COLORS, added Aug 8, confirmed unchanged this session) lib/ratingRecord.ts (RatingRecord type — the app-wide schema for graded products, added Aug 8, NEEDS UPDATING per §5 for formulaId/product_type/product_subtype/audience/recordStatus/monetization fields) lib/oilInfoRecord.ts (OilInfoRecord type — separate schema for scanned oils, no verdict, added Aug 2026) lib/oilsData.js (essential-oils data — content source for both the current browsable hub AND the upcoming scan-based lookup; split out of medsData.js on Aug 8; medsData.js and DosageCalculatorIcon.tsx have been DELETED — see change log)

NOTE (Aug 2026): the /clean-picks route/page name and existing category folders (pain-fever, cold-flu, allergies) predate the use-based-category-only rule in §2 and are effectively already use-based categories, just not yet reorganized under a single unified category system. Existing routes are NOT being renamed or restructured today — this is a note for when the broader category system gets built out, not an active task.

Type system: Pick type + ClassKey union live in painFeverPicks.ts (imported by all data files). PickForm = oral|topical|sublingual|nasal|eye. TopPickCategory = oral|kids|topical|nasal. CLASS_COLORS in classColors.ts must have an entry per ClassKey.

Card design (LOCKED — Option A): white card + colored top bar by drug class. Top Picks tab shows ⭐ ORAL/KIDS/TOPICAL/NASAL badges. Retailer cap: 4 visible chips + "+ More".

================================================================ 8. CURRENT STATE
Live Clean Picks categories (seed ratings) — matches main after PRs 1–3. Methodology ingredient grades UNCHANGED.

Pain & Fever — 5 picks remaining after hard removals. Not marked verified. Top: Genexa Acetaminophen Extra Strength (ORAL), Genexa Kids' Pain & Fever (KIDS), Voltaren Gel (TOPICAL). Also: Boiron Arnicare Cream/Gel, Boiron Arnica 30C Pellets.
REMOVED — do not restore onto Clean Picks: "Tylenol Extra Strength Dye-Free" (phantom), Children's Tylenol Dye-Free, Children's Motrin Dye-Free, Biofreeze. Category is below the old 8-pick bar; needs more clean P&F picks or a category rethink — do not fill the gap by putting the removed SKUs back.
Cold & Flu — 11 picks. Top: Umcka (ORAL), Genexa Kids' Multi-Symptom (KIDS), Badger Aromatic Chest Rub (TOPICAL). Equate Mucus-ER removed (Avoid / FD&C Blue #1 lake) — do not restore. Still needs a verified dye-free guaifenesin pick.
CAUTION DRAFTS (on the Cold & Flu page, verdict: caution, not verified — do not treat as Clean; supersedes the old "likely clear" note): Sambucol Black Elderberry Original Syrup (potassium sorbate), Boiron Chestal Honey Cough Syrup (Children's) (sodium benzoate), Zarbee's Children's Cough Syrup + Immune (natural flavor), Source Naturals Wellness Formula (silicon dioxide nanoparticle cap).
Allergies — 8 picks, still treated as clean. Top: Genexa Allergy Care (ORAL), Genexa Kids' Allergy (KIDS), Xlear Nasal Spray (NASAL).
Draft rating batches (not wired into Clean Picks UI): lib/rating-drafts/ is the home for batches 1–3. Batch 1 on disk: batch1-adult-apap-ibu.ts (adult APAP + IBU; recordStatus unverified). Do not convert painFeverPicks.ts / coldFluPicks.ts from those drafts. Do not treat a draft row as a live Clean Pick.
Colloidal silver → Caution (logged in methodology as the active-safety worked example).
Silicon dioxide → Caution (logged in methodology as the Nanoparticle Precautionary Rule worked example, v1.4).
Live routes: /, /account, /clean-picks (+ allergies/cold-flu/pain-fever), /oils (+ [slug]/carriers/safe-to-ingest), /privacy, /terms.

================================================================ 9. OIL LIBRARY & SCANNER (MAJOR REDESIGN — August 2026)
Oils are informational-only, never rated. This is a firm, permanent distinction from graded products, not a temporary limitation — no standardized ingredient-safety database exists for essential oils the way DailyMed exists for drugs, so there is no defensible basis for a Clean/Caution/Avoid verdict on an oil. Worwood-grounded safety framing stays; efficacy claims stay out of scope, same as always.

Scan-based lookup (replaces standalone browsable library as the primary access path). A user scans an oil's barcode and gets an informational screen pulling from the SAME underlying content already built in lib/oilsData.js (~20-22 oils) — this is a new entry point into existing content, not new content:

Standard product info: name, brand, size, image (via basic UPC/retailer lookup — see §11, separate from the rating pipeline).
What it's used for: existing "best for" condition tags (headache, nausea, sinus congestion, etc.) — informational framing only, no efficacy claims, same as the current library.
Usage classification (three-way, supersedes old External Only / Dilute First / Internal Only colors):
Topical use only
Internal use — confirmed (only when THIS manufacturer's specific label confirms it, e.g. a visible Supplement Facts panel or explicit internal-use directions — "100% pure" / "therapeutic grade" claims alone do NOT count, same principle already used in the existing internal-use modal on the oil detail page)
Unknown / not confirmed
Dosing info, pulled from existing oilsData.js content: topical dilution ratio by age, diffusion drop count, and internal dosing ONLY if usage classification is internal-confirmed for that specific product.
Mandatory safety disclaimer whenever internal use is not clearly confirmed: "This product's labeling does not confirm internal use. Always check the physical label for a Supplement Facts panel or explicit internal-use directions before consuming. When in doubt, treat as topical only." This is a backup/liability safeguard, shown prominently, not buried.
Optional supporting content (application methods, carrier-oil notes, commonly associated uses) stays non-medical and non-claim, matching existing editorial voice rules (§3).
Migration: lib/oilsData.js (content already verified/built during the Aug 8 Oil Library split) becomes the content source for this scan lookup, replacing the standalone static library as the primary access path. The current browsable hub page (app/oils/page.tsx) and detail page (app/oils/[slug]/page.tsx) may be deprecated, repurposed as a secondary browse view, or kept alongside the scan feature — DECIDE AT BUILD TIME, not yet decided. No content rewrite needed.

STATUS (Aug 8 cleanup, still valid): data lives in lib/oilsData.js; medsData.js + DosageCalculatorIcon.tsx deleted; dead Tools-row links removed from the detail page. See change log.
================================================================ 10. MONETIZATION & PRICING (MAJOR UPDATE — August 2026)
PRICING MODEL — REVERSED from earlier freemium plan: paid-only app, $10/year, NO permanent free tier. Trial length leaning 3–5 days, final number to be decided closer to launch (founder-owned decision, not for bots/AI to set). Founding-member $10/year-for-life offer already exists and stays live on KnowYourRemedy.com (the home CTA / founding-member signup flow already built stays functionally the same — it's the pricing philosophy around it that changed from "free forever, pay to unlock scanner" to "pay from day one, with a short trial"). LIVE SITE NOTE: current homepage/footer copy still reflects the OLD freemium framing ("Free: full website... Premium: unlocks the scanner") — this is now stale and needs updating to reflect paid-only + trial, not yet done as of this note.

BACKDOOR MONETIZATION SCHEMA FIELDS (Aug 2026) — these are real coding work that needs to happen, but they are backdoor/future-potential infrastructure, NOT active features to build UI around at launch. Brandon's framing: "not right now this moment, but needs to be done so there's easy access to it later if/when needed." Three fields, added to the rating-record schema (§5):

1. global_partner_url — a master config text string mapped to user-facing purchase buttons. Launch: keep null. When null, the app defaults to standard organic affiliate retail links. Later: paste one marketplace master tracking URL here to reroute every product purchase link app-wide without needing an app-store update.
2. is_sponsored + sponsor_id — boolean + sponsor ID on alternative-product records. Launch: ALL is_sponsored = false; alternatives rank by objective score/rules only (§6 matching rules), never by payment. Later (after meaningful scale, ~10k users, per Brandon): a verified-Clean-scoring product's is_sponsored can be toggled true so backend query logic can pin it to a featured position — but ONLY among products that already independently score Clean. Payment can buy better ranking/placement; payment can NEVER change a grade. This is a hard, non-negotiable boundary — the whole "no agenda" trust moat depends on it. Keep an organic/unpaid list visible even when sponsored placement exists later. Do not cold-DM brands about Avoid grades — not part of the model.
3. click_tracker_count — a silent integer that increments when a user taps an alternative's purchase link. Launch: collect from day one (passive data collection, no UI). Later: use category/product click data as leverage in brand/marketplace conversations.

================================================================ 11. USER SUBMISSIONS & REVIEW QUEUE (NEW — August 2026)
When a scanned barcode isn't in the database yet, users can submit photos to help build the record: front of package, Drug Facts/Supplement Facts panel, and the inactive-ingredient list if it's on a separate panel. The app attempts to process this LIVE, in-aisle, not as a delayed backend-only task.

In-aisle flow:

Create a draft product record from the barcode + submitted photos.
Attempt to read product name, barcode, and inactive ingredients from the photos (OCR/vision, implementation TBD).
IF the photos appear to belong to the same product AND the inactive ingredients are readable AND already covered by the locked methodology → show a PROVISIONAL grade immediately, marked recordStatus = provisional-pending-review (see §5).
IF the label is blurry, incomplete, or the photos don't appear to match each other → show NO grade. Ask the user to retake the facts-panel photo for that exact product. Refuse-when-uncertain applies here just like it does to ingredient sourcing (§3, §4).
Mismatch protection (before any auto-grade is shown):

Compare the scanned barcode against any barcode readable in the photos themselves.
Compare the product name on the front-of-package photo against the name on the facts-panel photo.
If barcode, name, or panel appear to belong to different products → do NOT auto-grade. Flag for review.
A user submission can NEVER overwrite a verified record (recordStatus = verified is protected).
If the same barcode receives conflicting submissions from different users → freeze auto-grading for that barcode and send to the review queue.
Review queue (founder/admin workload management):

Matching, readable, non-conflicting submissions can go live as provisional immediately and simply wait for a later spot-check — Brandon does NOT need to review every ordinary matching submission in real time.
Founder/admin review is needed ONLY for exceptions: mismatches, unrecognized/uncategorized ingredients, conflicting submissions on the same barcode, or a proposed change to an already-verified product.
User-facing language requirement: when showing an auto-generated grade from a user submission, make CLEAR to the user that the grade is based on their submitted label photos and may be marked pending verification. Never present a provisional grade with the same confidence/framing as a verified one.
Package/SKU variants (barcode/formula rule — see §5 for the schema): different pack sizes of the same formula (e.g. 60ct vs 120ct) usually have different barcodes and therefore need separate records, linked via a shared formulaId, so a grade correction on one propagates to all. VERIFY PER-PRODUCT rather than assuming — if a manufacturer genuinely reuses one barcode/SKU across sizes (uncommon), one record can cover it. Default to separate-records-with-shared-formulaId when unverified, since that's the common case. Do not re-grade each size separately unless the inactive ingredients actually differ between sizes.

================================================================ 12. BOT-ASSISTED DATABASE SCALING (NEW — August 2026)
Once the methodology is fully locked (currently ~80% there — see §4), the plan shifts from fully-manual product-by-product rating to bot-assisted bulk database generation, to scale coverage across the huge number of retail products.

Division of labor:

Bots CAN: draft and structure product records at scale — pull ingredient lists, apply the ALREADY-LOCKED methodology rules to categorize additives, structure the data into the RatingRecord shape, and flag anything uncertain rather than guessing.
Bots are NOT the final authority. Unverified barcode/label/ingredient records should NOT go live without a review flag (recordStatus = provisional or similar — ties into §11's review queue).
Founder-owned, NOT delegable to bots: the final inactive-ingredient reference list and any remaining un-categorized methodology calls (§4); exact trial length (§10); whether/when to turn on paid sponsored placement (§10).
Brand coverage priority order for bulk database building: target brands actually carried by Walmart, Target, CVS, Walgreens, Costco, Sam's Club, Sprouts, Whole Foods, Safeway, and Save Mart FIRST (including those retailers' store/private-label brands). Amazon is included in scope but done LAST — Amazon's catalog is the broadest and shouldn't delay brick-and-mortar coverage; the goal is the brands those physical stores carry now, not every obscure Amazon-only listing.
Planned tooling: likely Cursor Ultra for heavy bot/database-generation usage. A chat-only AI subscription (used for early planning conversations) is optional/separate and not required for the build itself.
Source of truth reminder: PROJECT_NOTES.md (this file) is the source of truth for implementation — not any other chat tool used for planning/brainstorming. Once decisions are made elsewhere, they get folded into this file, and Cursor-based work (notes + code) is where implementation actually happens, to keep notes and code in sync.
================================================================ 13. DATA FOUNDATION FOR THE SCANNER (PHASE 2)
Drugs/OTC/vitamins/supplements: FDA openFDA API + DailyMed (structured labels incl. inactive ingredients AND product/label images) + NDC Directory. (DailyMed is already our go-to for verifying inactive-ingredient lists during audits, and is the seed source for catalog product images per §6.)
Supplements: NIH Dietary Supplement Label Database (DSLD).
Product images: DailyMed/openFDA + retailer/UPC image databases, keyed to barcode/SKU (see §6 image rules).
Oils: scanned via barcode for BASIC PRODUCT INFO ONLY (name/brand/size/image via general UPC/retailer databases) — a separate, lighter pipeline from the rating pipeline above. Oils do NOT run through the openFDA/DailyMed/DSLD verdict engine and never receive a grade. See §9 for full scan-result behavior.
Scanner targets OTC/vitamins/supplements (graded) + oils (info-only). Protein powder schema exists but is dormant (§2). Verify current API access/terms at build time.
================================================================ 14. PHASING (APP-FIRST)
Phase 1 (now): BUILD THE BRAIN. Methodology at v1.4, ~80% categorized (§4). Rating-record schema defined (§5, needs a code update per this session's new fields). Seed the rating database by hand today, transitioning to bot-assisted bulk generation once methodology is fully locked (§12). Keep a lean web presence (landing + founding-member capture + small credibility surface). The brain must be correct/seeded before anything goes live, because the scan-then-verify trust loop is unforgiving — the audit work so far has already caught mislabeled products (the phantom Tylenol ES Dye-Free, and the Equate Mucus-ER dye finding) that had gone unverified in earlier sessions.
Phase 2 (the destination): the scanner app — barcode scan → openFDA/DailyMed/DSLD lookup (or basic UPC lookup for oils) → methodology engine scoring (graded products only) → verdict + sourced breakdown + age/audience-matched alternatives; backend + data pipeline including the user-submission/review-queue system (§11); accounts/auth + Stripe paid-only billing with trial (§10); Medicine Cabinet; iOS/Android. Bigger, harder, longer build — and the point of the whole thing.
================================================================ 15. LEGAL POSTURE (NON-NEGOTIABLE)
No individualized medical advice and no efficacy claims anywhere — information + product-cleanliness ratings only. (Why the Dosage Calculator, Interaction Checker, and Conditions pages were cut; why homeopathy is rated on cleanliness, not whether it "works"; why oils carry no verdict at all; why a member forum stays deferred — UGC reintroduces that liability.)
Every "Avoid" rests on citable evidence; flags state facts, never "unsafe."
Strong Medical Disclaimer, Affiliate Disclosure, Privacy Policy, solid About page. STATUS (Aug 8): footer no longer links to /disclaimer, /affiliate-disclosure, or /about — those pages don't exist yet and writing draft legal copy before attorney review risked content debt (draft now, rewrite after review). Footer currently links only to the two live pages (Privacy Policy, Terms of Service) plus site nav. These three pages remain a pre-launch to-do, to be written once during attorney review, not before.
SEQUENCING NOTE (Aug 8, still current): attorney review is intentionally scheduled LAST, as one single comprehensive session — not staged as data/methodology/UI change throughout the build. Reviewing a moving target means paying for repeat passes. LLC formation is the one exception: cheap, doesn't depend on settled content, and protects Brandon personally — can happen any time, independent of the review timing.
User-submitted product photos (§11) are now a full intake pipeline, not just light backfill UGC — need clear content moderation policy + a license grant / content policy in the terms, and clear user-facing language distinguishing verified vs. provisional/pending-review grades (§11). Fold into attorney review.
Affiliate links / sponsored placement (§10) are compatible with no-agenda IF the rating is decided before and independently of any payment relationship (payment can buy ranking, never a grade — hard boundary); disclose plainly (FTC) once sponsored placement activates post-launch. Fold into attorney review.
Owner to-do: form an LLC; one-time attorney review before launch (incl. paid-only/trial subscription compliance + auto-renewal disclosure + affiliate/sponsorship disclosure + About/Disclaimer/Affiliate-Disclosure page copy + user-submission/UGC policy) — via Richard Aaron @ Dowling Aaron.
================================================================ 16. TECH BASICS
Site: knowyourremedy.com · Local: C:\Users\bdez1\OneDrive\Desktop\knowyourremedy
Stack: Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
Supabase: profiles (auto-created via auth trigger), family_profiles (kept). STATUS (Aug 8): dose_logs and saved_remedies tables DELETED — confirmed zero code references via repo-wide grep before deletion, clean npm run build after. (Note: dose_profiles referenced in earlier notes did not actually exist as a separate table — likely a naming mismatch with dose_logs in an earlier session. Also note: the NEW Medicine Cabinet feature, §2/§6, is unrelated to the deleted saved_remedies table — do not confuse the two.) profiles and family_profiles are the only tables currently. NEW TABLES NEEDED (not yet built): rating records with the updated schema (§5), medicine_cabinet (user-saved products), and the review-queue/submission tracking tables (§11). Email confirmation OFF. AuthForm uses .upsert() to handle the auto-create race.
Methodology doc: docs/METHODOLOGY.md (v1.4).
================================================================ 17. PENDING WORK
The brain (priority)

Update lib/ratingRecord.ts with the new fields from this session: formulaId, product_type (internal), product_subtype (internal), audience, recordStatus, and the three monetization backdoor fields (§10).
DONE (Sept 11, 2026): Cleaner Alternatives trigger + display — locked in §6. Trigger = Caution AND Avoid. Display = inline horizontal carousel on Overview, peeking next card, "See all →". Slide-up sheet is NOT the primary alternatives UI.
Begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into the RatingRecord shape once the schema update above is done.
DONE on main (PRs 1–3): removed phantom Tylenol ES Dye-Free / Children's Tylenol Dye-Free / Children's Motrin Dye-Free / Biofreeze / Equate Mucus-ER from live Clean Picks. Do not restore. STILL OPEN: Pain & Fever is at 5 picks (below the old 8-pick bar); Cold & Flu still needs a verified dye-free guaifenesin replacement; four Cold & Flu Caution drafts (Sambucol, Chestal kids, Zarbee's, Source Naturals) are not verified. Draft batches live in lib/rating-drafts/.
DONE (Aug 2026, updated for Methodology v1.6): "Preferred multi-source references" / "trusted sources reference list" — resolved by the v1.5 merge. docs/METHODOLOGY.md §4a holds the full Tier 1/2/2-3 source hierarchy plus the 7-step workflow. No separate docs/SOURCES.md needed.
DONE (Aug 2026, v1.6): the remaining ~20% inactive-ingredient categorization gap is CLOSED — roughly 20 ingredients were run through the full §4a workflow and locked with founder calls in one extended session (see docs/METHODOLOGY.md §7 calibration log for the full list: caramel color's 3-way class split, talc, sulfites, SLS, fragrance/parfum, stevia/monk fruit, the povidone/crospovidone/methylcellulose/starches housekeeping batch, xanthan/guar/gum arabic/pectin, annatto, turmeric/curcumin-as-color, beta-carotene-as-color, BVO, disodium EDTA trace use, aluminum hydroxide as an active-safety-cap case, castor oil/polyoxyl castor oil, propyl gallate, benzyl alcohol's population split, benzalkonium chloride, lecithin, mixed tocopherols/ascorbyl palmitate, cochineal/carmine).
GATE NOW OPEN: the inactive-ingredient methodology is locked enough to begin bot-assisted database batches (§12). The earlier hard gate blocking §12 work is LIFTED as of v1.6.
DO NOT change any locked grade from this session or earlier without a fresh, explicit founder decision — this includes not "helpfully" re-deriving a grade using the default-trigger table, which is for brand-new ingredients only (Methodology §0).
PARKED, STAYS PARKED unless the founder revisits: formaldehyde-releasers (DMDM hydantoin, diazolidinyl urea, etc. — cosmetics/topical only, out of scope), HFCS (food/beverage sweetener, not confirmed on any real in-scope label), zinc as a nutrient/active (belongs to the active-safety-cap process, not the inactive table, and does not block database work), and the pending topical actives (menthol, camphor, eucalyptol — camphor specifically needs a young-children look whenever this gets picked up; also does not block database work).
ONGOING PROCESS RULE (permanent, not a one-time step, Methodology §4a): any inactive ingredient a bot or session encounters that ISN'T already in the Methodology §5 table does NOT get graded on the spot and does NOT go live in any product record. It gets the full 7-step workflow and a founder call first. Do not proactively hunt for more ingredients to pre-grade — new ones get handled reactively as real products actually surface them during database work, unless the founder specifically asks for another sweep.
Migrate ratings from TS arrays → Supabase table once schema is locked and ratings are correct.
App UI (design system v2 locked — §6; Sept 11 trigger/display/banner/Flagged-Cleared locks closed the last open questions — ready to build)

Build the post-scan product-detail screen as a real React component using placeholder data in the RatingRecord shape. Verdict-first header with light tinted Caution/Avoid banner (Clean untinted), Flagged names visible at rest / tap expands sources, Cleared collapsed by default, inline Overview carousel of cleaner alternatives (Caution + Avoid) with peeking next card + "See all →" + retailer chips + age/audience/category matching. No slide-up sheet as the primary alternatives UI.
Ingredients tab and Photos tab content/behavior not yet designed — only Overview tab was mocked.
Catalog-first image pipeline, saved-star (Medicine Cabinet) tap animation/toast — designed on paper, not yet built.
Build the oil scan-result screen (§9) — usage classification, dosing display, safety disclaimer logic.
Build the user-submission intake flow + review queue (§11) — draft record creation, OCR/vision label reading, mismatch detection, provisional-grade display with correct user-facing language.
Oil Library

DONE (Aug 8): data split into lib/oilsData.js; medsData.js + DosageCalculatorIcon.tsx removed; dead Tools-row links removed from the detail page.
Remaining: build the scan-based lookup (§9); decide fate of the browsable hub page; deepen Worwood-grounded content.
Monetization

Build the three backdoor schema fields (§10) into the rating-record schema and database — null/false/zero at launch, just needs to exist.
Update site copy (home CTA, footer) to reflect paid-only + trial pricing — currently stale, still says freemium.
Stripe integration for paid-only billing with trial (exact trial length TBD, founder-owned).
Web (lean)

Landing + founding-member capture + small credibility surface (existing founding-member flow stays, pricing philosophy around it updates per §10).
Data cleanup

DONE (Aug 8): pruned orphaned Supabase tables (dose_logs, saved_remedies).
Bot-assisted database scaling (new track, §12)

Gate: CLEARED (Aug 2026, Methodology v1.6) — the remaining ~20% inactive-ingredient categorization is closed. Database batch work can begin. New inactive ingredients encountered during batch work still get the 7-step packet + founder call before going live (Methodology §4a) — this is an ongoing per-ingredient check, not a blocking gate on starting the work itself.
When ready: bulk-generate draft records prioritizing Walmart/Target/CVS/Walgreens/Costco/Sam's Club/Sprouts/Whole Foods/Safeway/Save Mart brands (incl. store brands) first, Amazon-only brands last.
All bot-generated records need a review flag; founder retains final say on borderline methodology calls.
Launch prep

Attorney review (Terms, Privacy, Medical Disclaimer, About, Affiliate/Sponsorship Disclosure page copy, paid-only/trial + auto-renewal compliance, user-submission/UGC policy) via Richard Aaron — scheduled LAST per §15 sequencing note. LLC formation (can happen any time, independent of review timing). Footer Legal section currently lean (Privacy + Terms only) by design until attorney review. Final QA.
Phase 2

The scanner app (Sections 13–14), including the full submission/review-queue system (§11) and Medicine Cabinet.
Post-launch backlog

Protein powder category population (schema exists, dormant per Brandon's call — see §2).
Sponsored/paid placement activation (only after ~10k users, only among independently-Clean products — see §10).
Member forum — revisit once there's critical mass + moderation bandwidth (UGC medical-advice liability + cold-start problem).
================================================================ 18. CHANGE LOG (recent first)
September 11, 2026 (later) — Synced §4/§8 to main after PRs 1–3

Live Clean Picks counts now 5 Pain & Fever / 11 Cold & Flu / 8 Allergies. Removed Tylenol Dye-Free (phantom + kids), Children's Motrin Dye-Free, Biofreeze, Equate Mucus-ER — do not restore. Sambucol Original Syrup, Chestal kids, Zarbee's, Source Naturals marked Caution drafts (not the old "likely clear"). Pointed current-state to lib/rating-drafts/ for batches 1–3. Methodology ingredient grades unchanged.
September 11, 2026 — Closed §6 open questions + locked Overview behavior

CLEANER ALTERNATIVES TRIGGER: locked to Caution AND Avoid. Clean does not show alternatives. Closes the Aug 8 "Avoid only vs Avoid + Caution" open question.
CLEANER ALTERNATIVES DISPLAY: locked to inline horizontal carousel on Overview, peeking next card, "See all →". Slide-up sheet is NOT the primary alternatives UI. Closes the Aug 8 carousel-vs-sheet open question.
VERDICT BANNER: Caution and Avoid use a light tinted wash of the rating color. Clean stays untinted (dot + word only). Locked exception to the earlier "no tinted banners" line — no other tinted chrome.
FLAGGED / CLEARED: Flagged ingredient names are visible without a tap; tap expands sources. Cleared stays collapsed by default.
Grades unchanged. No Clean Picks data edits in this notes pass.
August 8 (session 2) — Major spec update: categorization, pricing, schema, submissions, bot scaling

CATEGORIZATION: locked use-based categories (what the product is for) as the ONLY user-facing organizing structure. product_type (OTC/Vitamin/Supplement/Protein Powder) and product_subtype (homeopathic, herbal, etc.) become internal-only database metadata, never a user-facing filter. Homeopathic and herbal products categorize by use, tagged by subtype internally, no separate sections.
SCOPE: protein powder added to schema as a category but explicitly deprioritized/dormant until after launch (Brandon's call — customers associate it with food, not medicine). Confirmed verdict terminology STAYS Clean/Caution/Avoid — a "Good/Caution/Avoid" wording appeared in an external planning doc but was a recall error, not an intended change.
PRICING REVERSED: paid-only app, $10/year, no permanent free tier, 3-5 day trial (exact length TBD). Founding-member $10/year-for-life offer unaffected. Live site copy is now stale (still reflects old freemium model) — flagged as pending work.
SCHEMA: formulaId added to link pack-size variants that share a formula but have different barcodes (the common case — verify per-product before assuming one barcode covers multiple sizes). recordStatus (verified/provisional/unverified) added for the new user-submission workflow. audience field added for age/audience-matched alternatives. Three monetization backdoor fields specified: global_partner_url, is_sponsored + sponsor_id, click_tracker_count — coded now as inactive infrastructure, not launch features.
CLEANER ALTERNATIVES matching expanded: use-category match, required age-matching, audience-matching, and explicit "form is not a hard filter" rule (a syrup can recommend a matching chewable/capsule in the same use-category if it's the best age-appropriate Clean option available). Engagement tracking (viewed/scrolled/tapped/saved) added. Two open questions were still unresolved in this session (Caution trigger; carousel vs slide-up) — CLOSED Sept 11, 2026 (see change log above).
NEW: Medicine Cabinet feature specified — user profile area for saved/liked products (star icon, already partly designed in the Aug 8 session 1 mockups). Explicitly NOT related to the old deleted saved_remedies table.
NEW: full user-submission + review-queue workflow (§11) — in-aisle photo submission, live draft-record generation with mismatch protection, provisional grading with required "pending verification" user-facing language, exceptions-only founder review queue.
NEW: bot-assisted database scaling plan (§12) — division of labor between bots (drafting/structuring at scale) and founder (final methodology calls, never delegable), brand-coverage priority order (brick-and-mortar retailers first, Amazon last), Cursor Ultra as likely tooling.
August 8 (session 1) — Cleanup sweep + post-scan screen design v2 + Methodology v1.4

Oil Library split: lib/oilsData.js created (22 oils); app/oils/page.tsx and app/oils/[slug]/page.tsx repointed to it; lib/medsData.js and components/icons/DosageCalculatorIcon.tsx deleted after confirming zero references; dead "Tools row" (Compatibility/Dosage links to already-cut routes) removed from the oil detail page. Clean build confirmed at each step.
Footer fixed: removed 3 dead links (/disclaimer, /affiliate-disclosure, /about); added working Terms of Service link; copyright year corrected to 2026.
Supabase cleanup: dose_logs and saved_remedies tables deleted after confirming zero code references. profiles and family_profiles are the only remaining tables (prior to this session's planned new tables — see §16).
Rating-record schema implemented in code: lib/clean-picks/verdictLabels.ts and lib/ratingRecord.ts (base version — updated further in session 2 above).
Equate Mucus-ER correction: verified DailyMed label shows FD&C Blue #1 aluminum lake — corrected to Avoid per Methodology §5.
Five excipients researched and confirmed Cleared with primary-source citations (hypromellose, magnesium stearate, microcrystalline cellulose, sodium starch glycolate, carbomer homopolymer Type A/B/C).
METHODOLOGY v1.4: added the Nanoparticle Precautionary Rule; silicon dioxide reclassified from Cleared to Precautionary.
Post-scan product-detail screen fully mocked and locked, v2: verdict moved above the title (A/B tested), cleaner alternatives redesigned as a scrollable carousel with retailer chips instead of a single static card. Flagged/Cleared drill-down also mocked.
July 12 — App UI & design system v1 locked (post-scan screen) [SUPERSEDED Aug 8 — see above]

Designed the post-scan product-detail screen in a Yuka-clean idiom. Color discipline locked. Saved star + Cleaner Options feature + catalog-first images all specified at v1 (later redesigned per Aug 8 session 1 above). Schema (Section 5) additions: productImage, userPhotos[], cleanAlternatives.
June 14 — App-first pivot confirmed + Methodology v1.3

DECISION: app-first. Methodology v1.3 locked: active-ingredient safety cap, dose/frequency sensitivity, source standard + regulator asymmetry, two-layer presentation. Colloidal silver worked example. Methodology pass on 30 live picks started — 4 Avoids found, Equate Mucus ER confirmed Clean [SUPERSEDED Aug 8 — actually Avoid], 3 Cautions likely clearing.
May 28 — Cut features removed; home reshaped with founding-member CTA

Removed Dosage Calculator, Interaction Checker, Conditions/Remedies entirely. medsData.js + DosageCalculatorIcon.tsx SURVIVED at the time (Oil Library depended on them) [SUPERSEDED Aug 8 — both deleted after the Oil Library split].
May 28 — Strategic pivot to Yuka-for-medicine + methodology + Allergies

Repositioned as Yuka for medicine/supplements/remedies. Clean Rating Methodology v1 committed. Allergies Clean Picks shipped (8 picks).
May 26 — Cold & Flu Clean Picks (13) + editorial standard locked. Equate Mucus ER + Badger as clean equivalents [Equate correction — see Aug 8]. Advil removed from Pain & Fever. Pain & Fever Clean Picks shipped; per-category folder architecture locked; Card design Option A. May 25 — Clean Brands → Everyday Clean Picks rename. May 22 — Visual direction locks. Earlier — Conditions rename, interaction checker, dosage calculator, Supabase schema. [most now cut]
