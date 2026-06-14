KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state.
If you're a new Claude starting a session: read this entire file before responding to anything. Brandon paste-references this file at the start of every chat.

Last Updated: June 14, 2026 (app-first pivot + methodology v1.3)

================================================================
⚡ READ FIRST — How Brandon Works
================================================================
Brandon is a novice developer using Cursor IDE on Windows PowerShell. He's smart, decisive, and editorially sharp. Follow these working-style rules without exception — they were earned across many sessions.

Communication rules
- Send terminal commands ONE AT A TIME, not stacked — wait for confirmation between each. EXCEPTION: git pushes go as all 3 commands (add, commit, push) in separate blocks in one message, no waiting between them.
- One question per ask_user_input box. Multiple questions in a single ask creates friction.
- Don't stack questions after long technical messages. Give him reading time. End with a single clear next-step prompt.
- Mark recommendations "(my pick)" when offering options. Decisive beats infinite optionality; he'll override when he disagrees.
- Sketch visual mockups in the Visualizer BEFORE writing code for any UI/editorial decision. Mockups have saved 2-3 wrong directions per session.
- Verify state from current files BEFORE asserting. PROJECT_NOTES can lag reality — check the actual file before pasting edits.
- When updating any notes/docs/methodology, give him the WHOLE file to delete-all-and-paste, not section-by-section patches. Be specific about exactly what to do with it.

Code & file rules
- New files: send the New-Item terminal command (backslash paths) so he creates it that way. New-Item path\file.ext and mkdir path\folder are the patterns; New-Item ... -ItemType File -Force creates the folder too.
- Be specific with full paths (lib\clean-picks\painFeverPicks.ts, not just painFeverPicks.ts).
- PowerShell uses ; not && for chaining.
- PowerShell Rename-Item takes a filename, not a path, as the second argument.
- Multi-edit to one file = full file rewrite, not patches. This applies to notes/docs too — give him the whole file.
- < characters in JSX tags occasionally strip on paste — check that <a, <div, <Component opening brackets survived.
- Long pastes can truncate — verify the bottom matches intent.

File-system gotchas
- TypeScript Cursor cache is sticky. After renaming .js → .ts or deleting/renaming, run Ctrl+Shift+P → "TypeScript: Restart TS Server". If errors persist, Developer: Reload Window.
- After deleting routes, the .next cache holds stale per-route type validators — clear it: Remove-Item -Recurse -Force .next; npm run build.
- Check for duplicate files when fighting phantom errors: Get-ChildItem lib\clean-picks\.
- Run `npm run build` to catch dangling imports after big deletions — the Problems tab can lie, the build won't.
- Reduce push frequency. Push at feature/category milestones, not between every batch.
- Hold PROJECT_NOTES updates until the end of the session (done for the day), not mid-session.

Brandon's vision (don't lose sight of)
- BUILD EVERYTHING AS IF BUILDING THE APP. The barcode-scanner app is the committed destination and Brandon's main motivation — however long/hard it takes is irrelevant to him; it's the thing that energizes the whole project. Every decision should serve the app.
- "Big pharma made it" aesthetic — restrained, professional, generous whitespace, deliberate typography. Not a wellness-blog look.
- "Honest always, no agenda" — never preachy, never agenda-driven. Present natural + conventional + homeopathic equally, judged the same way.
- "From the shelf to the root and everything in between" — mainstream OTC and natural remedies side by side without judgment.
- Harm-first, not regulator-first: severity tracks evidence of harm to the body, NOT whether the FDA banned something. "Legal/GRAS" is never a baseline for leniency.
- Audience: women / moms managing family health, plus older adults with multiple medications — and clean-leaning shoppers (Yuka power users).

Personal / contact
- Full name: Brandon Valdez (NOT Dezman). Email: bdez1525@outlook.com. Location: Clovis, CA.
- Legal contact: personally knows Richard Aaron of Dowling Aaron (Fresno) — leverage for legal-review introductions.

================================================================
1. POSITIONING — WHAT KNOWYOURREMEDY IS (APP-FIRST)
================================================================
KnowYourRemedy is a Yuka-style platform — but for medicine, supplements, and natural remedies instead of food and cosmetics. The one question it answers: "Is this product clean — and what's actually in it?"

THE COMMITTED DESTINATION: a barcode-scanner app (scan a medicine/supplement → instant Clean / Caution / Avoid verdict + ingredient breakdown + sources). This is the product and the priority. We build everything going forward as if building the app.

The brain. The methodology + the ratings ARE the app's database ("the brain"). Two parts:
- The LOGIC — the methodology (docs/METHODOLOGY.md, currently v1.3). The rules that turn any ingredient list into a verdict. The scanner runs this engine.
- The KNOWLEDGE — the rating database. Every product as a structured record. This is what the scanner looks up on a barcode hit.
Near-term work = building the brain: populate the knowledge by hand (the verdict passes), one correct, sourced product at a time, in an app-ready shape so it copy-pastes into Supabase later.

Why app-first (the decision, June 14). The website is NOT the growth engine and not a destination:
- Acquisition = push channels (podcast promos, word of mouth, app-store visibility), NOT SEO. Yuka grew to tens of millions on word of mouth + a viral moment with zero paid marketing and no content-site funnel.
- Trust = in-product transparency + inline sourced citations (the user scans, sees the flagged additive with its primary source, and the claim is verifiable — beats outsourcing verification to a Google search that can be gamed). NOT a brand-credibility website.
- Founder motivation is decisive for a solo build, and the scanner is what energizes Brandon. That settles it.
The website therefore shrinks to a lean landing + founding-member capture + a small "how we rate / a few examples" credibility surface (for when push-channel traffic Googles the brand). It is not a content engine and not the acquisition channel.

The moat (why we win)
- No agenda — we don't sell what we rate, so ratings are trustworthy. The core differentiator. Every flag carries a citable source, shown in the breakdown.
- One transparent, documented scoring methodology applied identically to every product — conventional, natural, homeopathic alike — including the ones we'd tell you to avoid.
- The gap nobody owns — Yuka does food/cosmetics; nobody owns medicine/supplements/remedies.

================================================================
2. SCOPE — KEPT vs CUT
================================================================
KEEP & EXPAND (the heart)
- The methodology + the rating database — the app's brain. The manual rating work (Clean Picks today) is the seed of the scanner's DB.
- Oil Library — Worwood-grounded essential-oil safety reference. Framed toward caution/safety, not ingestion. Rated on cleanliness; no efficacy claims. IP: attribute Worwood, write original content, never reproduce her charts/text/recipes verbatim.
- Accounts (free) + founding-member signups — top of funnel + conversion engine for the eventual paid scanner.

LEAN / SHRINK
- Web presence: lean landing + founding-member capture + small credibility surface. NOT a content/SEO build-out. Existing Clean Picks pages stay as the first surface of the rating data but aren't expanded as a traffic play.

CUT — REMOVED May 28 (see change log)
- Dosage Calculator — liability (individualized dosing). GONE.
- Interaction Checker — liability ("safe to combine" verdicts). GONE.
- Conditions / Remedies pages — commodity content, off-mission, treatment-advice liability. GONE.
We are OUT of the "how to treat/medicate" business and INTO the "what should I buy, and is it clean" business.

================================================================
3. BRAND, DESIGN & VOICE (LOCKED)
================================================================
Colors
- Primary brand green: #2d4a3e — headers, CTAs, active states
- Rx blue: #2563eb · Blue B (section labels): #4a6781
- Rating status: Clean #27ae60 · Caution/amber #d97706 · Avoid #c0392b
- Oils: External Only #2980b9 · Dilute First #be185d · Internal Only #78350f

Typography
- Playfair Display (var(--font-playfair)) — serif headlines
- Inter (var(--font-inter)) — sans-serif body

Section label pattern (Blue B uppercase): fontSize 0.78rem, fontWeight 700, uppercase, letterSpacing 0.07em, color #4a6781, followed by a 28px × 2px rule in #4a6781.

Icons (LOCKED): Clean Picks ✨ · Essential Oils 🌱 · Home 🏠. (Old DosageCalculatorIcon.tsx still exists — the Oil Library uses it as a placeholder; swap it during the Oil Library work.)

Editorial voice (LOCKED)
- "Why this pick" callouts: ingredient quality + availability in 1-3 sentences. Brand-green left border.
- "Honest note" callouts: amber/cream banner. ALWAYS for caveats — pregnancy, age limits, allergy disclaimers, dilution honesty, dose/frequency-dependent harms.
- Goal-framing, never prescriptive. "If your goal is X, consider Y" — never "stop taking" / "you should switch."
- Honest-disclosure principle: better to mark "no data available" than write a wrong claim. Refuse-when-uncertain is the credibility differentiator.
- Honest broker: rate conventional, natural, and homeopathic the same way. Cleanliness is judged on ingredients; we NEVER make or imply an efficacy claim. Where the basis is traditional use, say so and cite it (Carlston for homeopathy, Worwood for oils); where clinical evidence exists, cite it and label its strength honestly. Not the dismissive regulator, not the hype site.
- Legal wording: flags state facts, never danger ("contains X; clean brands exclude it" — never "unsafe"). Per the Genexa/NAD ruling — can't imply a competitor's product is dangerous.

================================================================
4. RATING METHODOLOGY (SOURCE OF TRUTH)
================================================================
The documented scoring engine lives at docs/METHODOLOGY.md — now v1.3. Read it before making any rating call. Summary:

Two layers (this is also the product/app UI model):
- PRODUCT VERDICT (the badge, the glance): Clean / Caution / Avoid.
- INGREDIENT RISK LEVELS (the drill-down, the proof): each ingredient tagged Cleared (0pt) / Limited (1pt) / Moderate (2pt) / High (auto-Avoid), each with its source.

Scoring: 0 pts = Clean · 1–2 pts = Caution · 3+ pts OR any single high-risk = Avoid.

High-tier bar (locked): strong evidence of a real harm mechanism (carcinogen, genotoxic, endocrine, organ/dev/neuro). A ban or IARC/NTP classification is sufficient but NOT required. Weak/contested evidence keeps something OUT of high; legality never does.

v1.3 additions (June 14):
- ACTIVE-INGREDIENT SAFETY (verdict cap). We don't judge efficacy/medical merit, but a documented SAFETY harm in the active is in scope and caps the verdict (separate from additive points; final verdict = the worse of the two). Manageable/dose-dependent harm → caps at Caution; severe/irreversible/no-safe-threshold harm with no offsetting benefit → caps at Avoid. Boundary so it doesn't over-flag: "documented harm from as-directed use," NOT the normal dose-cautions of standard drugs used as directed (acetaminophen's liver limit at label dose = standard-of-care, not a flag).
- DOSE/FREQUENCY SENSITIVITY. Verdict reflects realistic use of the product as marketed (not the most careful user); the honest note carries the gradient. Cumulative harms (build with total exposure, e.g. silver→argyria) are lower with infrequent use and can justify Caution over Avoid. Concurrent harms (single co-administration, e.g. drug interactions) are NOT softened by infrequency.
- SOURCE STANDARD. Every flag carries ≥1 citable source, shown in the breakdown. Prefer primary/independent sources (IARC/NTP, EFSA, peer-reviewed, NCCIH). Regulator asymmetry: a regulator ACTING AGAINST a product = usable harm signal; a regulator PERMITTING/APPROVING it ≠ evidence of safety. No single source carries a verdict alone, least of all "it's approved."

Editorial discoveries (carry forward — DO NOT REVERT)
- Advil Liqui-Gels: FD&C Green No. 3 → not clean.
- Sudafed: FD&C dyes + titanium dioxide + talc → rejected.
- Mucinex (brand): FD&C Blue #1 → rejected. Equate Mucus ER (Walmart generic) is the clean equivalent — confirmed Clean (5 inert excipients, no dye/TiO2). NOTE: dye-containing Equate guaifenesin lookalikes exist ("Mucus Relief ER," "Mucus D") — specify the 5-ingredient "Equate Mucus ER" SKU.
- Sambucol Gummies: vegetable oil → rejected. Sambucol Original Syrup stays (glucose syrup acceptable).
- Maty's Vapor Rub: sunflower oil → rejected. Badger Aromatic Chest Rub is the clean alternative.
- Second-gen antihistamine TABLETS (Zyrtec/Claritin/Allegra, brand + generic): titanium dioxide → rejected. "Dye-free" kids' cetirizine syrups: parabens + propylene glycol → rejected.
- COLLOIDAL SILVER → Caution (v1.3 worked example for the active-safety cap). Additives are silver + water (Clean on additives alone), but the active carries documented harm — argyria (permanent, cumulative, no established safe level) + concurrent interactions with certain antibiotics and thyroid meds. Sources: NCCIH, Mayo, peer-reviewed argyria case reports (FDA enforcement as corroboration only). Set at Caution (argyria dose-cumulative + mostly cosmetic); the pull toward Avoid is no-safe-threshold + irreversible + frequency-proof interactions. "Natural/old" never auto-means clean.

Homeopathic eligibility: eligible if inactives are clean, available at in-scope retailers, evidentiary framework documented. Citation: Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — use in any homeopathic pick's honestNote. Low-dilution (Umcka 1X) gets a softer note; extreme dilution (Oscillococcinum 200CK) gets a STRONG note. Homeopathy/oils are rated on cleanliness only — no efficacy claims (keeps the no-efficacy-claim liability shield intact).

================================================================
5. THE RATING DATA MODEL (THE BRAIN)
================================================================
Each product is captured as a STRUCTURED RECORD (not prose, not site-only content), in an app-ready shape so it copy-pastes into Supabase later. Target fields:
- product name, brand, category
- barcode / UPC (added later, for the scanner)
- active ingredient(s) + strength
- inactive ingredients (full list)
- per-ingredient risk level (cleared/limited/moderate/high) + source per flag
- active-safety flag (if any) + source
- verdict (Clean/Caution/Avoid)
- honest note
- retailer availability

NEXT SESSION: lock this rating-record schema once, then resume the verdict pass capturing straight into that shape.

Current storage: ratings live as hardcoded TypeScript arrays in the Next.js app (lib/clean-picks/painFeverPicks.ts etc.). DIRECTION (not today): migrate to a Supabase table once the schema is locked and the ratings are correct. Content first, container later — don't refactor storage before the ratings themselves are right.

================================================================
6. ARCHITECTURE — CLEAN PICKS (existing web surface)
================================================================
Per-category folder pattern (this is what's live; first surface of the rating data):
  app/clean-picks/page.tsx (landing) · pain-fever/page.tsx · cold-flu/page.tsx · allergies/page.tsx
  components/clean-picks/ PickCard.tsx · RetailerChips.tsx · CategoryTile.tsx
  lib/clean-picks/ classColors.ts · painFeverPicks.ts (defines Pick type + ClassKey union) · coldFluPicks.ts · allergyPicks.ts

Type system: Pick type + ClassKey union live in painFeverPicks.ts (imported by all data files). PickForm = oral|topical|sublingual|nasal|eye. TopPickCategory = oral|kids|topical|nasal. CLASS_COLORS in classColors.ts must have an entry per ClassKey.

Card design (LOCKED — Option A): white card + colored top bar by drug class. Top Picks tab shows ⭐ ORAL/KIDS/TOPICAL/NASAL badges. Retailer cap: 4 visible chips + "+ More".

================================================================
7. CURRENT STATE
================================================================
Live Clean Picks categories (the seed ratings)
- Pain & Fever — 9 picks. Top: Tylenol Dye-Free (ORAL), Genexa Kids' Pain & Fever (KIDS), Voltaren Gel (TOPICAL).
- Cold & Flu — 13 picks. Top: Umcka (ORAL), Genexa Kids' Multi-Symptom (KIDS), Badger Aromatic Chest Rub (TOPICAL).
- Allergies — 8 picks. Top: Genexa Allergy Care (ORAL), Genexa Kids' Allergy (KIDS), Xlear Nasal Spray (NASAL).

Methodology pass vs v1.3 — IN PROGRESS (web-verified findings so far; NOT yet applied to the data files):
- AVOID (Pain & Fever): "Tylenol Extra Strength Dye-Free" appears to be a phantom — there is no adult dye-free Tylenol caplet; real Tylenol ES = titanium dioxide + FD&C Red 40. REPLACE with Genexa Acetaminophen Extra Strength (the real clean adult acetaminophen, already pick #5, verified clean). Children's Tylenol Dye-Free → Avoid (sucralose + sorbitol + potassium sorbate + flavors). Children's Motrin Dye-Free → Avoid (acesulfame K + others). Biofreeze → Avoid (FD&C Blue 1 + Yellow 5 + methylparaben; "colorless" version unverified for parabens).
- CONSEQUENCE: pulling those 4 drops Pain & Fever to ~5 clean picks — below the 8-pick bar. Needs more clean P&F picks or a category rethink.
- CAUTION-flagged under strict v1.2 but LIKELY CLEAR under the harm-anchored "citable harm source" rule (FINALIZE next session): Sambucol Syrup (potassium sorbate — thin harm basis), Boiron Chestal Children's (sodium benzoate — benzene pathway needs vitamin C, which it lacks), Zarbee's (natural flavor — "opacity, not a hazard," no harm source to cite). Principle: no citable HARM source → not a harm demerit (transparency note at most).
- CONFIRMED CLEAN: Equate Mucus ER. Allergies: all 8 clean, no avoids/cautions found.
- Colloidal silver → Caution (logged in methodology as the active-safety worked example).

Live routes: /, /account, /clean-picks (+ allergies/cold-flu/pain-fever), /oils (+ [slug]/carriers/safe-to-ingest), /privacy, /terms.

================================================================
8. OIL LIBRARY (KEEP & EXPAND)
================================================================
Worwood-grounded essential-oil safety reference. Frame toward caution/safety, not ingestion. Rated on cleanliness; no efficacy claims. Status colors: External Only / Dilute First / Internal Only.
Current wiring: reads oil data from lib/medsData.js (oils in the essential_oils category) and app/oils/[slug]/page.tsx uses DosageCalculatorIcon as a placeholder. Clean-up task: give oils their own data file (lib/oilsData.js) + a fitting icon, THEN medsData.js + DosageCalculatorIcon.tsx can be removed.

================================================================
9. MONETIZATION & PRICING
================================================================
Freemium with the CORE feature gated:
- Free: full website + free app account with manual product lookup/browse. Top of funnel.
- Premium: unlocks the scanner (the core feature). Gate the core, not peripheral extras (aim to beat Yuka's sub-1% conversion).
Payment: web-based Stripe ("Netflix model"), NOT in-app purchase — avoids app-store commissions/legal flux. App unlocks the scanner after web purchase.
"Lock in today's rate for life": each subscriber locks their signup rate while continuously subscribed; founding members $10/year; later cohorts lock the then-current rate. Run multiple Stripe price objects (one per cohort). California auto-renewal compliance (clear disclosure, easy cancel, renewal notices) — include in attorney review.
Acquisition (reaffirmed): podcast promos / word of mouth / app-store visibility — NOT SEO. Convert via founding-member waitlist + a "request/upvote a product to rate" capture, not a sign-up wall.
Live now: home App CTA is a working founding-member signup routing to /account. Stripe NOT integrated; premium flag exists in Supabase, unenforced.

================================================================
10. DATA FOUNDATION FOR THE SCANNER (PHASE 2)
================================================================
- Drugs/OTC: FDA openFDA API + DailyMed (structured labels incl. inactive ingredients) + NDC Directory. (DailyMed is already our go-to for verifying inactive-ingredient lists during audits.)
- Supplements: NIH Dietary Supplement Label Database (DSLD).
- Oils/remedies: no standardized product DB — NOT a scan target; stays a content reference.
- Scanner targets drugs + supplements. Verify current API access/terms at build time.

================================================================
11. PHASING (APP-FIRST)
================================================================
- Phase 1 (now): BUILD THE BRAIN. Lock the methodology (v1.3 done), define the rating-record schema, and seed the rating database by hand (correct, sourced verdicts). Keep a lean web presence (landing + founding-member capture + small credibility surface). The brain must be correct/seeded before anything goes live, because the scan-then-verify trust loop is unforgiving — the v1.3 audit already caught ~4 mislabeled products out of 30 under human review.
- Phase 2 (the destination): the scanner app — barcode scan → openFDA/DailyMed/DSLD lookup → methodology engine scoring → verdict + sourced breakdown; backend + data pipeline; accounts/auth + Stripe per-cohort billing; iOS/Android (free browse for all, scanner for premium). Bigger, harder, longer build — and the point of the whole thing.

================================================================
12. LEGAL POSTURE (NON-NEGOTIABLE)
================================================================
- No individualized medical advice and no efficacy claims anywhere — information + product-cleanliness ratings only. (Why the Dosage Calculator, Interaction Checker, and Conditions pages were cut; why homeopathy/oils are rated on cleanliness, not whether they "work"; why a member forum stays deferred — UGC reintroduces that liability.)
- Every "Avoid" rests on citable evidence; flags state facts, never "unsafe."
- Strong Medical Disclaimer, Affiliate Disclosure, Privacy Policy, solid About page.
- Affiliate links are compatible with no-agenda IF the rating is decided before and independently of any affiliate relationship (same methodology on products that pay and don't); attach at the retailer level; disclose plainly (FTC). Fold into attorney review.
- Owner to-do: form an LLC; one-time attorney review before launch (incl. auto-renewal/subscription compliance + affiliate disclosure) — via Richard Aaron @ Dowling Aaron.

================================================================
13. TECH BASICS
================================================================
- Site: knowyourremedy.com · Local: C:\Users\bdez1\OneDrive\Desktop\knowyourremedy
- Stack: Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
- Supabase: profiles (auto-created via auth trigger), family_profiles (kept). Orphaned tables to prune in console: dose_profiles, dose_logs, saved_remedies. Email confirmation OFF. AuthForm uses .upsert() to handle the auto-create race.
- Methodology doc: docs/METHODOLOGY.md (v1.3).

================================================================
14. PENDING WORK
================================================================
The brain (priority)
- NEXT SESSION: lock the rating-record schema (Section 5 fields), then resume the verdict pass capturing straight into it.
- Finish the v1.3 verdict pass on the 30 live picks: apply the 4 Avoids, replace phantom "Tylenol ES Dye-Free" with Genexa Acetaminophen ES, finalize the 3 Cautions under the harm-anchored rule, and resolve Pain & Fever falling below 8 clean picks.
- Migrate ratings from TS arrays → Supabase table once schema is locked and ratings are correct.

Oil Library
- Split oil data out of medsData.js into lib/oilsData.js; swap the placeholder dosage-calculator icon; THEN remove medsData.js + DosageCalculatorIcon.tsx. Deepen Worwood-grounded content.

Web (lean) & monetization
- Landing + founding-member capture + small credibility surface. Optional inline email capture on the home CTA. "Request / upvote a product to rate" form.
- Stripe web billing + per-cohort locked-rate pricing + founding-member flow.

Data cleanup
- Prune orphaned Supabase tables (dose_profiles, dose_logs, saved_remedies).

Launch prep
- Attorney review (Terms, Privacy, Medical Disclaimer, auto-renewal + affiliate disclosure) via Richard Aaron. LLC formation. Reconcile footer Legal links (/disclaimer, /affiliate-disclosure, /about don't exist; /terms + /privacy are live). Update Footer copyright year. Final QA.

Phase 2
- The scanner app (Sections 10–11).

Post-launch backlog
- Member forum — revisit once there's critical mass + moderation bandwidth (UGC medical-advice liability + cold-start problem).

================================================================
15. CHANGE LOG (recent first)
================================================================
June 14 — App-first pivot confirmed + Methodology v1.3
- DECISION: app-first. The barcode-scanner app is the committed destination and the priority; build everything as if building the app. The methodology + ratings are the app's database ("the brain"); capture ratings as structured, source-of-truth data, not website-only content. Website shrinks to a lean landing + founding-member capture + small credibility surface; it is NOT the acquisition channel. Acquisition = podcast promos / word of mouth / app-store visibility. Rationale: Yuka grew via word of mouth + virality with no content-site funnel; trust comes from in-product transparency + inline sourced citations (scan-then-verify), not a brand site; founder motivation (the scanner is Brandon's fuel) is decisive for a solo build.
- METHODOLOGY v1.3 (docs/METHODOLOGY.md) locked: active-ingredient safety as a verdict cap (with the acetaminophen boundary), dose/frequency sensitivity (cumulative vs concurrent harms), source standard + regulator asymmetry (FDA approval ≠ safety; enforcement = harm signal), two-layer presentation (verdict badge + sourced per-ingredient drill-down). Colloidal silver added as the worked example → Caution.
- Methodology pass on the 30 live picks STARTED (web-verified): 4 Avoids found (Tylenol ES Dye-Free phantom/TiO2+dye, Children's Tylenol Dye-Free, Children's Motrin Dye-Free, Biofreeze), Equate Mucus ER confirmed Clean, 3 Cautions flagged but likely clearing under the harm-anchored rule. To be finalized + applied to data files next session.

May 28 — Cut features removed; home reshaped with founding-member CTA
- Removed Dosage Calculator, Interaction Checker, Conditions/Remedies entirely (routes, components, libs, redirects). Build green. Home reshaped: hero search → Browse Clean Picks CTA; App CTA → working founding-member signup. Account dashboard stripped of dose-log + saved-remedy sections; family profiles + settings kept. medsData.js + DosageCalculatorIcon.tsx SURVIVED (Oil Library depends on them).

May 28 — Strategic pivot to Yuka-for-medicine + methodology + Allergies
- Repositioned as Yuka for medicine/supplements/remedies with a barcode-scanner endgame. Clean Rating Methodology v1 committed to docs/METHODOLOGY.md (4-tier harm-first engine). Allergies Clean Picks shipped (8 picks); added nasal + eye PickForms, antihistamine + salineNasal classKeys, 'nasal' top-pick bucket.

May 26 — Cold & Flu Clean Picks (13) + editorial standard locked (seed oils, TiO2, FD&C dyes disqualifying). Discoveries: Sudafed/Mucinex/Maty's rejected; Equate Mucus ER + Badger as clean equivalents. Advil removed from Pain & Fever (→ 9 picks).
May 26 — Pain & Fever Clean Picks shipped; per-category folder architecture locked; Card design Option A.
May 25 — Clean Brands → Everyday Clean Picks rename (/brands → /clean-picks). Scope locked to mainstream retailers.
May 22 — Visual direction locks (vintage scientific plates, Blue B section label, Worwood internal-use gate).
Earlier — Conditions rename, interaction checker, dosage calculator, Supabase schema. [most now cut]