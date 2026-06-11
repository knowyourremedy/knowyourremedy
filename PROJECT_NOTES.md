KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state.
If you're a new Claude starting a session: read this entire file before responding to anything. Brandon paste-references this file at the start of every chat.

Last Updated: May 28, 2026 (post-pivot restructure)

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

Code & file rules
- New files: send the New-Item terminal command (backslash paths) so he creates it that way. New-Item path\file.ext and mkdir path\folder are the patterns; New-Item ... -ItemType File -Force creates the folder too.
- PowerShell uses ; not && for chaining.
- PowerShell Rename-Item takes a filename, not a path, as the second argument.
- Multi-edit to one file = full file rewrite, not patches. Find-and-replace edits compound paste errors.
- < characters in JSX tags occasionally strip on paste — check that <a, <div, <Component opening brackets survived.
- Long pastes can truncate — verify the bottom matches intent.

File-system gotchas
- TypeScript Cursor cache is sticky. After renaming .js → .ts or deleting/renaming, run Ctrl+Shift+P → "TypeScript: Restart TS Server". If errors persist, Developer: Reload Window.
- Check for duplicate files when fighting phantom errors: Get-ChildItem lib\clean-picks\.
- Reduce push frequency. Push at feature/category milestones, not between every batch.
- Hold PROJECT_NOTES updates until the end of the session (done for the day), not mid-session.

Brandon's vision (don't lose sight of)
- "Big pharma made it" aesthetic — restrained, professional, generous whitespace, deliberate typography. Not a wellness-blog look.
- "Honest always, no agenda" — never preachy, never agenda-driven. Present natural + conventional equally.
- "From the shelf to the root and everything in between" — mainstream OTC and natural remedies side by side without judgment.
- "Blow people's minds with only minor tweaks afterwards" — launch big, polish small. Don't ship half-baked.
- Harm-first, not regulator-first: severity tracks evidence of harm to the body, NOT whether the FDA banned something. "Legal/GRAS" is never a baseline for leniency.
- Audience: women / moms managing family health, plus older adults with multiple medications — and clean-leaning shoppers (Yuka power users).

Personal / contact
- Full name: Brandon Valdez (NOT Dezman). Email: bdez1525@outlook.com. Location: Clovis, CA.
- Legal contact: personally knows Richard Aaron of Dowling Aaron (Fresno) — leverage for legal-review introductions.

================================================================
1. THE PIVOT — WHAT KNOWYOURREMEDY IS NOW
================================================================
KnowYourRemedy is a Yuka-style platform — but for medicine, supplements, and natural remedies instead of food and cosmetics. The one question the site and eventual app answer: "Is this product clean — and what's actually in it?"

End goal: a barcode-scanner app (scan a medicine/supplement → instant clean / caution / avoid rating + ingredient breakdown), funded as supplemental income via affiliate revenue now and a paid subscription later. We copy Yuka's destination (the scanner), not their on-ramp — as a lean solo builder, validate demand with content first, then build the app.

The moat (why we win)
- No agenda — we don't sell what we rate, so ratings are trustworthy. The core differentiator.
- One transparent, documented "clean" scoring methodology applied uniformly.
- The gap nobody owns — Yuka does food/cosmetics; nobody owns medicine/supplements/remedies.

================================================================
2. SCOPE — KEPT vs CUT
================================================================
KEEP & EXPAND (the heart)
- Everyday Clean Picks — the core, and the manual version of the scanner. Rate mainstream products by ingredient cleanliness, explain why, build each as a standalone searchable page.
- Oil Library — differentiated, trustworthy oil-safety info. Grounded in Valerie Ann Worwood's teachings. Frame toward caution/safety ("what never to ingest," "what to dilute"), not encouraging ingestion. IP: reference and attribute Worwood; write original content; do NOT reproduce her charts/text/recipes verbatim.

CUT ENTIRELY (built code that now needs removal)
- Dosage Calculator — liability (individualized dosing), heavy build, low conversion.
- Interaction Checker — liability ("safe to combine" verdicts), no payoff.
- Conditions / Remedies pages — commodity content we can't outrank vs Healthline/WebMD, off-mission, treatment-advice liability.
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

Section label pattern (Blue B uppercase): fontSize 0.78rem, fontWeight 700, uppercase, letterSpacing 0.07em, color #4a6781, followed by a 28px × 2px rule in #4a6781. Used on reference pages (Clean Picks, Oils, About/Legal).

Icons (LOCKED): Clean Picks ✨ · Essential Oils 🌱 · Home 🏠. (Dosage Calculator / Interaction Checker icons retired with those features.)

Editorial voice (LOCKED)
- "Why this pick" callouts: ingredient quality + availability in 1-3 sentences. Brand-green left border.
- "Honest note" callouts: amber/cream banner. ALWAYS for caveats — pregnancy, age limits, allergy disclaimers, dilution honesty.
- Goal-framing, never prescriptive. "If your goal is X, consider Y" — never "stop taking" / "you should switch."
- Honest-disclosure principle: better to mark "no data available" than write a wrong claim. Refuse-when-uncertain is the credibility differentiator.
- Legal wording: flags state facts, never that a product is "unsafe" (per the Genexa/NAD ruling — can't imply a competitor's product is dangerous).

================================================================
4. RATING METHODOLOGY (SOURCE OF TRUTH)
================================================================
The documented scoring engine lives at docs/METHODOLOGY.md. It powers Clean Picks now and the scanner later. Read it before making any rating call.

Summary:
- Output is three tiers — Clean / Caution / Avoid (no 0–100 score).
- Internal demerit count: limited = 1pt, moderate = 2pt; 3+ pts = Avoid; any single high-risk additive = automatic Avoid; 0 = Clean.
- Four additive levels: cleared / limited / moderate / high. Every flag carries a citable harm basis.
- HIGH-TIER BAR (locked): strong evidence of a real harm mechanism (carcinogen, genotoxic, endocrine, organ/dev/neuro). A ban or IARC/NTP classification is sufficient but NOT required. Weak/contested evidence keeps something OUT of high — legality never does.
- Calibrations: PG = moderate (oral); aspartame = high (IARC 2B); sucralose/ace-K/saccharin = moderate; BHA + BHT = high; xylitol/erythritol = limited oral, cleared topical/nasal.

Editorial discoveries (carry forward — DO NOT REVERT)
- Advil Liqui-Gels: FD&C Green No. 3 → not a clean pick.
- Sudafed: FD&C dyes + titanium dioxide + talc → rejected.
- Mucinex (brand): FD&C Blue #1 → rejected. Equate Mucus ER (Walmart generic) is the clean equivalent.
- Sambucol Gummies: vegetable oil → rejected. Sambucol Original Syrup stays clean (glucose syrup acceptable).
- Maty's Vapor Rub: sunflower oil → rejected. Badger Aromatic Chest Rub is the clean alternative.
- Second-gen antihistamine TABLETS (Zyrtec/Claritin/Allegra, brand + generic): titanium dioxide → rejected. "Dye-free" kids' cetirizine syrups: parabens + propylene glycol → rejected.

Homeopathic eligibility: eligible if inactives are clean, available at in-scope retailers, evidentiary framework documented. Citation: Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 — use in any homeopathic pick's honestNote. Low-dilution (Umcka 1X) gets a softer note; extreme dilution (Oscillococcinum 200CK) gets a STRONG note.

================================================================
5. ARCHITECTURE — CLEAN PICKS (LOCKED)
================================================================
Per-category folder pattern:
  app/clean-picks/
  ├── page.tsx                 # Landing tile-grid (~150 lines)
  ├── pain-fever/page.tsx      # detail (filters + cards)
  ├── cold-flu/page.tsx
  └── allergies/page.tsx
  components/clean-picks/
  ├── PickCard.tsx             # shared card
  ├── RetailerChips.tsx        # 4 visible + "+ More"
  └── CategoryTile.tsx         # landing tile
  lib/clean-picks/
  ├── classColors.ts           # CLASS_COLORS + TOP_PICK_LABELS
  ├── painFeverPicks.ts        # defines Pick type, ClassKey union, PickForm, TopPickCategory
  ├── coldFluPicks.ts
  └── allergyPicks.ts

Type system
- Pick type lives in painFeverPicks.ts and is imported by all other data files.
- ClassKey union (in painFeverPicks.ts) must contain every classKey used across all data files. PickForm = 'oral' | 'topical' | 'sublingual' | 'nasal' | 'eye'. TopPickCategory = 'oral' | 'kids' | 'topical' | 'nasal'.
- CLASS_COLORS (classColors.ts) must have a matching entry for every ClassKey. TOP_PICK_LABELS has a label per TopPickCategory.

Adding a new category — workflow
1. Create lib/clean-picks/[category]Picks.ts (Pick[]).
2. Create app/clean-picks/[category]/page.tsx (copy pain-fever, swap imports + filter tabs + counts).
3. Update app/clean-picks/page.tsx: import the array, set CATEGORIES entry live:true + accentColor, update PICK_COUNTS, bump the progress banner.

Card design (LOCKED — Option A): white card + colored top bar by drug class. Top Picks tab shows ⭐ ORAL/KIDS/TOPICAL/NASAL PICK badges. Top Picks framing: "Our 3 picks across [oral, pediatric, and topical / per category]." Retailer cap: 4 visible chips + "+ More" rollup (no number).

Minimum bar: 8 verified picks before a category page ships.

================================================================
6. CURRENT STATE — CLEAN PICKS
================================================================
Live categories (3 of 5 in the original roadmap)
- Pain & Fever — 9 picks. Top: Tylenol Dye-Free (ORAL), Genexa Kids' Pain & Fever (KIDS), Voltaren Gel (TOPICAL).
- Cold & Flu — 13 picks. Top: Umcka (ORAL), Genexa Kids' Multi-Symptom (KIDS), Badger Aromatic Chest Rub (TOPICAL).
- Allergies — 8 picks (shipped May 28). Top: Genexa Allergy Care (ORAL), Genexa Kids' Allergy (KIDS), Xlear Nasal Spray (NASAL). 3 oral / 3 nasal / 2 eye.

Remaining roadmap categories: Sleep, First Aid (no pre-research yet).

ClassKey union (current): Pain & Fever — nsaidOral, acetaminophen, pediatricNsaid, topicalNsaid, topicalDrugFree, homeopathic. Cold & Flu — expectorant, homeopathicLow, immuneHerbal, propolis, pediatricCombo, elderberry, topicalChestRub. Allergies — antihistamine, salineNasal (reuses homeopathic + propolis).

Available-at scope: IN — CVS, Walgreens, Target, Walmart, Costco, Whole Foods, Sprouts, major grocery. OUT — specialty wellness-only sites, Amazon-only without retail presence.

================================================================
7. OIL LIBRARY (KEEP & EXPAND)
================================================================
Worwood-grounded essential-oil safety reference. Frame toward caution/safety, not ingestion. Status colors: External Only / Dilute First / Internal Only. IP rule: attribute Worwood, write original content, never reproduce her charts/text/recipes verbatim. (Build-out pending.)

================================================================
8. MONETIZATION & PRICING (NEW MODEL)
================================================================
Freemium with the CORE feature gated:
- Free: full website + a free app account with manual product lookup/browse. Top of funnel + word-of-mouth.
- Premium: unlocks the scanner (the core feature). Gating the core, not peripheral extras, aims to beat Yuka's sub-1% conversion (target ~5–10%).

Payment: web-based Stripe signup ("Netflix model"), NOT in-app purchase — avoids Apple/Google commissions and app-store payment legal flux. App unlocks the scanner for the account after web purchase.

"Lock in today's rate for life":
- Each subscriber locks their signup rate for life while continuously subscribed. Founding members: $10/year locked. Later members lock the then-current rate.
- Lapsing forfeits the locked rate (re-subscribe at current rate). Honest perpetual urgency — today's rate is the lowest it'll ever be for you.
- Execution: never raise an existing member's rate; keep the $10 floor sustainable forever; genuinely raise the going rate over time tied to real added value; define "for life" = continuous active subscription with a grace period for failed payments; run multiple Stripe price objects (one per cohort); California auto-renewal compliance (clear disclosure, easy cancel, renewal notices) — include in attorney review.

Cost budget: Apple Developer ~$99/yr + Google Play $25 one-time + Stripe ~2.9% + $0.30/txn. Real cost is builder time maintaining ratings.

Current state: Stripe NOT integrated. Premium flag exists in Supabase, unenforced.

================================================================
9. DATA FOUNDATION FOR THE SCANNER (PHASE 2)
================================================================
- Drugs/OTC: FDA openFDA API + DailyMed (structured labels incl. inactive ingredients) + NDC Directory. The regulated, barcoded space where a scanner works.
- Supplements: NIH Dietary Supplement Label Database (DSLD).
- Oils/remedies: no standardized product DB — NOT a scan target; stays a Worwood-grounded content reference.
- Scanner targets drugs + supplements. Verify current API access/terms at build time.

================================================================
10. PHASING
================================================================
- Phase 1 (now): content-first. Build out Clean Picks + Oil Library targeting high-intent low-competition searches ("is [brand] clean," "cleanest [category]," "[product] ingredients to avoid"). Add a "request a product rating" form (captures app signups + surfaces which products to prioritize). Promote founding-member pricing.
- Phase 2 (after demand validated): build the scanner — barcode scan → openFDA/DailyMed/DSLD lookup → methodology scoring → rating + explanation; backend + data pipeline; accounts/auth + Stripe per-cohort billing; iOS/Android shell (free browse for all, scanner for premium). Ongoing: maintaining/expanding ratings (the real overhead).

================================================================
11. LEGAL POSTURE (NON-NEGOTIABLE)
================================================================
- No individualized medical advice anywhere — no dosing outputs, no "safe to combine" verdicts. Information + product-cleanliness ratings only.
- Every "Avoid" rests on citable evidence; flags state facts, never "unsafe."
- Strong Medical Disclaimer, Affiliate Disclosure, Privacy Policy, solid About page.
- Owner to-do: form an LLC; one-time attorney review before launch (include auto-renewal/subscription compliance) — via Richard Aaron @ Dowling Aaron.

================================================================
12. TECH BASICS
================================================================
- Site: knowyourremedy.com · Local: C:\Users\bdez1\OneDrive\Desktop\knowyourremedy
- Stack: Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
- Supabase: profiles (accounts, auto-created via auth trigger), family_profiles, plus legacy dose_logs/saved_remedies (tied to cut features — candidates for removal). Email confirmation OFF. AuthForm uses .upsert() to handle the auto-create race.

================================================================
13. PENDING WORK
================================================================
Pivot cleanup (removal)
- Remove Dosage Calculator (components/icons/DosageCalculatorIcon.tsx, DoseTrackerBadge, DosageCalculator_module.css, related pages).
- Remove Interaction Checker (interactionData.js, medsData.js, InteractionChecker_module.css, lib/interactionClassRules.js, related pages).
- Remove Conditions / Remedies pages and their layouts/redirects.
- Prune Supabase dose_logs/saved_remedies if nothing else uses them.

Clean Picks
- Run the 30 live picks (Pain & Fever, Cold & Flu, Allergies) through docs/METHODOLOGY.md — confirm each clears the standard; flag any that should read Caution rather than a clean pick.
- Build remaining categories: Sleep, then First Aid (8+ verified picks each).

Build-out
- Oil Library (Worwood-grounded).
- "Request a product rating" form + app-signup waitlist + founding-member pricing copy.

Launch
- Stripe web billing + per-cohort locked pricing + founding-member flow.
- Attorney review (Terms, Privacy, Medical Disclaimer, auto-renewal compliance) via Richard Aaron.
- LLC formation. Final QA pass.

Phase 2 (after demand validated): the scanner app (Section 9–10).

================================================================
14. CHANGE LOG (recent first)
================================================================
May 28 — Strategic pivot to Yuka-for-medicine + methodology + Allergies
- PIVOT: repositioned as Yuka for medicine/supplements/remedies with a barcode-scanner endgame, content-first. Master directive locked (Sections 1–11). Dosage Calculator, Interaction Checker, Conditions/Remedies CUT.
- Clean Rating Methodology v1 built and committed to docs/METHODOLOGY.md — 4-tier harm-first scoring engine (Clean/Caution/Avoid). High tier = evidence of harm, not regulatory status.
- Allergies Clean Picks shipped (8 verified picks) at /clean-picks/allergies. New PickForm values nasal + eye; new classKeys antihistamine + salineNasal; new 'nasal' top-pick bucket. Fixed empty Tylenol retailers on Pain & Fever.

(Pre-pivot history preserved below — note much of it concerns features now cut.)
May 26 — Cold & Flu Clean Picks (13) + editorial standard locked (seed oils, TiO2, FD&C dyes disqualifying). Discoveries: Sudafed/Mucinex/Maty's rejected, Equate Mucus ER + Badger as clean equivalents. Advil removed from Pain & Fever (→ 9 picks).
May 26 — Pain & Fever Clean Picks shipped; per-category folder architecture locked; Card design Option A.
May 25 — Clean Brands → Everyday Clean Picks rename (/brands → /clean-picks). Scope locked to mainstream retailers.
May 25 — Interaction database expansion (~137 entries). [feature now cut]
May 24 — Class Rule system shipped (7 rules). [feature now cut]
May 23 — Prescription handling overhaul. [feature now cut]
May 22 — Visual direction locks (vintage scientific plates, Blue B section label, Worwood internal-use gate).
Earlier — Conditions rename, interaction checker, dosage calculator, Supabase schema. [most now cut]