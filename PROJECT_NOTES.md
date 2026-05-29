KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state.
If you're a new Claude starting a session: read this entire file before responding to anything. The user paste-references this file at the start of every chat.

Last Updated: May 28, 2026

⚡ READ FIRST — How Brandon Works
Brandon is a novice developer using Cursor IDE on Windows PowerShell. He's smart, decisive, and editorially sharp. Follow these working-style rules without exception — they were earned across many sessions.
Communication rules

Send terminal commands ONE AT A TIME, not stacked. Even 2-3 commands in a row cause copy-paste issues. Wait for confirmation between each.
One question per ask_user_input box. Multiple questions in a single ask creates friction. If you need 3 things answered, that's 3 separate asks across separate turns.
Don't stack questions after long technical messages. Give him reading time. End with a single clear next-step prompt.
Mark recommendations "(my pick)" when offering options. Decisive recommendations beat infinite optionality. He'll override when he disagrees.
Sketch visual mockups in the Visualizer BEFORE writing code for any UI/editorial decision. Mockups in chat have saved 2-3 wrong directions per session.
Verify state from current files BEFORE asserting. PROJECT_NOTES can lag behind reality. If a section says "in progress," default to checking the actual file before pasting edits.

Code & file rules

Use terminal commands for file/folder creation, not right-click instructions. New-Item path\file.ext and mkdir path\folder are the patterns.
PowerShell uses ; not && for command chaining.
PowerShell Rename-Item takes a filename, not a path as the second argument: Rename-Item lib\foo.js bar.ts (NOT Rename-Item lib\foo.js lib\bar.ts).
Multi-edit to one file = full file rewrite, not patches. Find-and-replace edits compound paste errors. Send the whole file when in doubt.
< characters in JSX tags occasionally strip on paste in Cursor — always check the top of pasted code that <a, <div, <Component opening brackets are intact.
Long pastes can truncate mid-message — verify the bottom of pasted code matches what you intended.

File system gotchas

TypeScript Cursor cache is sticky. After renaming .js → .ts or deleting a file, run Ctrl+Shift+P → "TypeScript: Restart TS Server". If errors persist, Developer: Reload Window. Don't trust the Problems tab without one of those refreshes.
Check for duplicate files when fighting phantom errors. Get-ChildItem lib\clean-picks\ will show if both .js and .ts versions of the same file exist.
Reduce push frequency. Push at feature/category milestones, not between every batch. His explicit feedback: "theres to much pushing and its ruining the momentum."

Brandon's vision (don't lose sight of)

"Big pharma made it" aesthetic — restrained, professional, generous whitespace, deliberate typography. Not a wellness blog look.
"Honest always, no agenda" — never preachy, never agenda-driven. Present every option (natural + conventional) equally.
"From the shelf to the root and everything in between" — brand tagline. Mainstream OTC and natural remedies live side by side without judgment.
"Blow people's minds with only minor tweaks afterwards" — launch big, polish small. Don't ship half-baked.
Audience: women / moms managing family health, plus older adults with multiple medications.

Personal/contact context

Full name: Brandon Valdez (NOT Dezman)
Email: bdez1525@outlook.com
Location: Clovis, CA
Legal contact: Personally knows Richard Aaron of Dowling Aaron (Fresno law firm) — leverage for legal review introductions.


1. PROJECT BASICS

Site: knowyourremedy.com
Local path: C:\Users\bdez1\OneDrive\Desktop\knowyourremedy
Stack: Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
Supabase URL: https://pmmvwbddolpcisjqvpcp.supabase.co
Target launch: End of month (~Dec 1, 2026 from this writing)
Premium tier: $10/year (Stripe NOT yet integrated — premium flag exists in Supabase but unenforced)
Founding member deadline: June 30, 2027 (configurable in AuthForm.tsx via FOUNDING_MEMBER_DEADLINE)


2. BRAND & DESIGN STANDARDS (LOCKED)
Colors

Primary brand green: #2d4a3e — headers, CTAs, active states
Rx blue: #2563eb
Blue B (section labels): #4a6781
Status colors:

🟢 Cleaner: #27ae60
🟡 Decent (caution/amber): #d97706 (renamed from "Acceptable")
🔴 Last/Avoid: #c0392b
🔵 External Only: #2980b9
🔴 Dilute First: #be185d
🟤 Internal Only: #78350f
Pregnancy safe: #27ae60
Ask doctor: #e67e22



Typography

Playfair Display (var(--font-playfair)) — serif, for headlines
Inter (var(--font-inter)) — sans-serif, body text

Section label pattern (Blue B uppercase)
Used on reference pages (oils, conditions, clean picks, about/legal). NOT used on tool pages (Interaction Checker, Dosage Calculator — they have their own systems).

fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em'
Color: #4a6781
Followed by a 28px × 2px horizontal rule in #4a6781


3. ICONS (LOCKED)
Feature icons

Dosage Calculator: Custom SVG (components/icons/DosageCalculatorIcon.tsx) — accepts size/color/className
Interaction Checker: 💊🌿 (pill + leaf — tells brand story)
Clean Picks: ✨
Conditions: 🌿
Essential Oils: 🌱
Home: 🏠

medsData.js category icons

otc: 🏪 · prescription: ⚕️ · supplements: 💪 (label: "Vitamins & Supps")
herbal: 🌿 · essential_oils: 🌱 · home: 🏠

Category tab order (avoids leaf/sprout adjacency)

Row 1: OTC | Prescription | Herbal
Row 2: Supps | Essential Oils | Home

Don't use

❌ lotion bottle 🧴 anywhere
❌ ⚠️ for Interaction Checker (use 💊🌿)
❌ 🏪 for Clean Picks (use ✨ — OTC already uses 🏪)


4. EDITORIAL STANDARDS — INGREDIENTS (LOCKED, May 26)
These criteria gate Clean Picks selections. They also drive condition-page rating verification.
🚫 Disqualifying (= NOT "Cleaner choice")

Seed oils: vegetable oil, canola, soybean, sunflower (incl. organic sunflower), safflower, corn oil
Titanium dioxide
Artificial dyes: any FD&C dye, aluminum lake variants
Artificial sweeteners: sucralose, aspartame, acesulfame K
Parabens
Propylene glycol
High-fructose corn syrup

✅ Acceptable

Natural sweeteners: cane sugar, glucose syrup, tapioca syrup (clean-label), agave syrup, honey, stevia/Reb-A, maltodextrin
Binders/excipients: gelatin, silica, magnesium stearate, dibasic calcium phosphate, microcrystalline cellulose
Preservatives: potassium sorbate, sodium benzoate, citric acid
Plant-derived: pectin, carnauba wax, vegetable glycerin

Homeopathic eligibility
Homeopathic products are ELIGIBLE for Clean Picks if they meet:

Clean inactive ingredients per the lists above
Available at in-scope retailers
Evidentiary framework documented

Citation: Carlston M (ed), Classical Homeopathy, Churchill Livingstone 2003 (ISBN 0-443-06565-9). Use this citation in any homeopathic pick's honestNote.
Dilution honesty: Low-dilution homeopathics (e.g., Umcka 1X with measurable plant extract) get a softer note. Extreme dilutions (e.g., Oscillococcinum 200CK) get a STRONG honest note — call out that no measurable active ingredient remains, cite Cochrane's findings, but include per locked policy.
Editorial discoveries (May 26 audit) — DO NOT REVERT

Advil Liqui-Gels: has FD&C Green No. 3 → demoted from Cleaner to Decent
Sudafed: has 3 FD&C dyes + titanium dioxide + talc → REJECTED entirely
Mucinex (brand name): has FD&C Blue #1 → REJECTED. Equate Mucus ER (Walmart generic) is the clean equivalent — same 600mg guaifenesin, 5 clean inactives, no dye.
Sambucol Gummies: contain vegetable oil → REJECTED. Sambucol Original Syrup stays Cleaner (glucose syrup is acceptable per Brandon's call).
Maty's Vapor Rub: contains sunflower oil → REJECTED. Badger Aromatic Chest Rub is the clean alternative (olive oil + castor oil base).

Available-at scope (Clean Picks)
IN: CVS, Walgreens, Target, Walmart, Costco, Whole Foods, Sprouts, major grocery (Kroger family, Publix, etc.)
OUT: Specialty wellness-only websites, Amazon-only products without retail presence

5. EDITORIAL VOICE (LOCKED)
Card content tone

"Why this pick" callouts: explain ingredient quality + availability in 1-3 sentences. Brand-green left border.
"Honest note" callouts: amber/cream banner. ALWAYS used for caveats — pregnancy warnings, age limits, allergy disclaimers, dilution honesty.
Goal-framing, never prescriptive. "If your goal is X, consider Y" — never "stop taking" or "you should switch to."
Mark cross-category picks (e.g., Tylenol Dye-Free appearing in both Pain & Fever and Cold & Flu) without apology — same product, different use cases.

Honest-disclosure principle
Better to mark a product/pair "no data available" than write a wrong claim. Refuse-when-uncertain bias is the credibility differentiator.

6. ARCHITECTURE — CLEAN PICKS
Per-category folder pattern (LOCKED)
app/clean-picks/
├── page.tsx                          # Landing tile-grid (~150 lines)
├── pain-fever/page.tsx               # Pain & Fever detail (filters + cards)
└── cold-flu/page.tsx                 # Cold & Flu detail

components/clean-picks/
├── PickCard.tsx                      # Shared card component
├── RetailerChips.tsx                 # 4 visible + "+ More" rollup
└── CategoryTile.tsx                  # Landing-page tile

lib/clean-picks/
├── classColors.ts                    # CLASS_COLORS + TOP_PICK_LABELS exports
├── painFeverPicks.ts                 # Defines Pick type, ClassKey union
└── coldFluPicks.ts                   # Cold & Flu data
Type system

Pick type lives in painFeverPicks.ts and is imported by all other data files.
ClassKey union in painFeverPicks.ts must contain every classKey used across all category data files. When adding a new class, expand this union.
CLASS_COLORS object in classColors.ts must contain a matching entry for every ClassKey. When expanding the union, also add the color entry.

Adding a new category — workflow

Create lib/clean-picks/[category]Picks.ts (data file with Pick[])
Create app/clean-picks/[category]/page.tsx (copy pain-fever/page.tsx, swap imports + counts)
Update app/clean-picks/page.tsx:

Import the new picks array
Update CATEGORIES entry (live: true, accentColor)
Update PICK_COUNTS
Update progress banner copy



Card design (LOCKED — Option A)
White card + colored top bar by drug class. Top Picks tab shows ⭐ ORAL PICK / ⭐ KIDS PICK / ⭐ TOPICAL PICK badges.
Top Picks framing
"Our 3 picks across oral, pediatric, and topical. Chosen for ingredient quality and availability at stores you can actually get to."
Retailer cap
4 visible chips + "+ More" rollup (no number — gas stations and others may also carry).
Cross-section content reinforcement
Conditions pages → Clean Picks: Every product labeled 🟢 Cleaner on a Conditions/OTC tab is a candidate for Clean Picks curation.
Clean Picks → Conditions pages: No cross-links FROM Conditions TO Clean Picks. Contextual recommendations stay where the user already is.
Net effect: Clean Picks becomes the verified source-of-truth for "Cleaner choice" labels going forward. Condition pages can pull from Clean Picks consensus.
LOCKED policy
No new meds in medsData.js until interaction pair coverage catches up. Too many "no data" results currently.

7. CURRENT STATE — CLEAN PICKS
Live categories

Pain & Fever — 9 picks (after Advil removal, May 26)

Top Picks: Tylenol Dye-Free (ORAL), Genexa Kids' Pain & Fever (KIDS), Voltaren Gel (TOPICAL)


Cold & Flu — 13 picks (shipped May 26)

Top Picks: Umcka (ORAL), Genexa Kids' Multi-Symptom (KIDS), Badger Aromatic Chest Rub (TOPICAL)

Allergies — 8 picks (shipped May 28)

Top Picks: Genexa Allergy Care (ORAL), Genexa Kids' Allergy (KIDS), Xlear Nasal Spray (NASAL)
Lineup: 3 oral (Genexa Allergy Care, Genexa Kids' Allergy, Boiron AllergyCalm), 3 nasal (Xlear, NeilMed Sinus Rinse, Beekeeper's Nasal Spray), 2 eye (Similasan Allergy Eye Relief, Alaway Preservative Free)
Allergies: antihistamine, salineNasal (reuses homeopathic + propolis). NEW PickForm values added: 'nasal', 'eye'. NEW TopPickCategory: 'nasal'.



Pending categories (in priority order)

Sleep — no pre-research yet (melatonin, magnesium, drug-free options)
First Aid — no pre-research yet (wound care, burn relief)

Pain & Fever lineup (current)

Tylenol Extra Strength Dye-Free — ⭐ ORAL PICK
Voltaren Gel — ⭐ TOPICAL PICK
Biofreeze
Genexa Kids' Pain & Fever — ⭐ KIDS PICK
Genexa Acetaminophen Extra Strength
Children's Tylenol Dye-Free
Children's Motrin Dye-Free
Boiron Arnicare Cream/Gel
Boiron Arnica 30C Pellets

Cold & Flu lineup (13 picks)

Umcka Cold Relief Syrup (Nature's Way) — ⭐ ORAL PICK
Genexa Kids' Multi-Symptom Cold & Flu — ⭐ KIDS PICK
Badger Aromatic Chest Rub — ⭐ TOPICAL PICK
Equate Mucus ER (Walmart generic — replaces Mucinex)
Tylenol Extra Strength Dye-Free (cross-listed)
Source Naturals Wellness Formula
Beekeeper's Naturals Propolis Throat Spray
Sambucol Black Elderberry Original Syrup (NOT gummies)
Boiron Coldcalm
Boiron Chestal Honey Cough Syrup (Children's)
Boiron Oscillococcinum (with strong honest note re: 200CK dilution)
Wedderspoon Organic Manuka Honey Drops
Zarbee's Children's Cough Syrup + Immune

ClassKey union (current — when adding a class, update painFeverPicks.ts AND classColors.ts)
Pain & Fever: nsaidOral, acetaminophen, pediatricNsaid, topicalNsaid, topicalDrugFree, homeopathic
Cold & Flu: expectorant, homeopathicLow, immuneHerbal, propolis, pediatricCombo, elderberry, topicalChestRub

8. ARCHITECTURE — INTERACTION SYSTEM
Three layers

Class Rules (lib/interactionClassRules.js) — detects cumulative stacking across categories. Renders ABOVE pair details.
Pair-wise (lib/interactionData.js) — pharma-grade schema, ~137 entries currently.
Single-med lookup — already built, gets richer as Layer 2 grows.

7 Class Rules (locked)
RuleIconSeverityThresholdbleeding_stack🩸avoid3sedation_stack🧠avoid3serotonin_syndrome🌀avoid2cardiovascular_stress🫀caution3liver_stress🫁caution3absorption_block🥛caution2dehydration_diuretic💧caution3
Threshold philosophy

2 = acute risk that compounds fast (serotonin syndrome, absorption block)
3 = dose-cumulative effects (2 usually fine, 3+ adds real risk)

Class membership via pharmClasses tag
Each med in medsData.js has optional pharmClasses: []. Engine matches by tag — meds auto-participate when tagged. Multiple class membership supported (tramadol is both opioid AND serotonergic).
UI rendering
Class warnings render between <VerdictBanner /> and <SelectedStack />. Max 3 visible, "+N more" collapsible.
Multi-medication picker rules

Total cap: 10 items across categories
Pharma cap: Max 2 from OTC + Prescription combined (sharedCapGroup: 'pharma')
Cap exists because pair-wise OTC/Rx data is solid but 3+ pharma stacking has poor data. The cap is communicated as "we cap pharmaceuticals at 2 to stay accurate."

Verdict logic

✅ All N likely safe · ⚠️ Some concerns · 🚫 Do not combine · 🔍 Limited data
Chips color-coded by overall verdict. Any pair "avoid" → all chips red.
Auto-display results when 2+ meds selected (no "Check" button).
Cumulative-effects disclaimer when 3+ items AND at least one pharma.

URL params

?med=ibuprofen (legacy single-med pre-fill)
?meds=ibuprofen,acetaminophen,benadryl (multi-med pre-fill)


9. ARCHITECTURE — DOSAGE CALCULATOR
Chip-collapse step pattern
One step expanded at a time. Steps 1-2 chips persist into Step 3 for back-nav.

Step 1: Who is this for? (Child / Adult)
Step 2: Weight + Age (units toggle)
Step 3: Medication picker (search + category tabs)
Step 4: Format
Step 5: Concentration

Smart re-validation rules

Changing "Who" → resets everything downstream
Changing weight/age → KEEPS med/format/concentration. Auto-recalculates if all filled.
Changing medication → resets format and concentration
Changing format → resets concentration

Format-aware dose rounding (CRITICAL — DO NOT REMOVE)
Each format entry has splittable field:

Liquids → true (any decimal mL OK)
Tablets/chewables → true (rounds to 0.5)
Gel caps/capsules/suppositories/patches → false (rounds to whole unit)
If rounded dose = 0 → shows red "NOT RECOMMENDED" card with "Try a liquid form" guidance

Prescription-Individualized result card
Triggers when med.requiresIndividualization === true. Skips Steps 4-5. Shows med.standardRange field + warnings + interaction CTA. Blue-bordered, replaces dose calculation entirely.
medsData.js flags

controlled: 'Schedule II' | 'Schedule IV' — DEA scheduling
requiresIndividualization: true — triggers Individualized card
standardRange: 'string' — human-readable typical dose
9 entries currently use requiresIndividualization: 6 controlled + insulinLongActing + insulinRapidActing + warfarin

Prescription Acknowledgment Modal
components/PrescriptionAcknowledgmentModal.tsx — fires on first Rx-tab click per session. Uses sessionStorage key kyr_rx_acknowledged — shared between Dosage Calculator and Interaction Checker. Copy is legally-reviewed — do not edit without legal review.

10. CONDITION PAGES
Current state

Conditions rename is LIVE (/conditions/*, not /remedies/*). Redirects in place.
V2 layout (components/ConditionPageLayoutV2.tsx) is active in production
V1 (ConditionPageLayout.tsx) still on disk — likely deprecated, grep imports before deletion
31 condition pages currently exist
Shared wrapper: components/ConditionLayout.tsx
One empty: app/conditions/skin-allergies/page.tsx (TODO)

V2 layout features

Unified list with filter chips: All / 🌿 Natural / 🏪 OTC / 🆗 Backup / 🤰 Pregnancy-safe
Internal Modal (FDA Supplement Facts panel rule for essential oil ingestion)
AgeBadge system
Sidebar with grouped categories
Body-system anatomy plate support
Blue B section labels

Anatomy plate system
Each plate maps to a body system (NOT to individual conditions). Conditions affecting same system share the plate. Stored in public/illustrations/conditions/. Mapping helper: lib/conditionAnatomy.js (to be built).
Body systemFileConditionsHead/nerveshead.jpgHeadache, migraines, tension headachesRespiratoryrespiratory.jpgSinus congestion, cold and flu, sore throatDentaldental.jpgDental pain, teething painEarear.jpgEar painEyeeye.jpgItchy eyes, seasonal allergiesDigestivedigestive.jpgUpset stomach, nausea, heartburn, bloating, diarrhea, constipation, colicMusculoskeletalmusculoskeletal.jpgMuscle pain, joint pain, back pain, growing painsSkinskin.jpgCuts, burns, insect bites, rashes, diaper rash, skin allergiesFemale reproductivereproductive.jpgMenstrual crampsNervous/sleepnervous.jpgInsomnia, anxiety, stress
Hero illustration aesthetic

Vintage scientific plates (Köhler's Medizinal-Pflanzen 1887 style for plants; Gray's Anatomy 1858 style for body systems)
Cream/aged-paper background (#f5efe0)
Full-bleed hero strip, ~220-260px tall, illustration centered
No overlay text on the image
H1 + scientific subtitle BELOW the hero
Use mix-blend-mode: multiply to integrate black-ink line drawings with cream bg
Source: Wikimedia Commons (public domain)

Three-bucket pediatric system

Bucket 1 — Pediatric ONLY (no pregnancy icons): Teething Pain, Colic, Diaper Rash, Growing Pains
Bucket 2 — Adult ONLY (no pediatric icons): Menstrual Cramps
Bucket 3 — BOTH icons: All 26 others

Future pediatric pages

Phase 1: Cradle Cap, Infant Gas, Baby Eczema, Hand-Foot-Mouth
Phase 2: Croup, Lice, Pediatric Fever
Phase 3: Misc lower priority

Migration plan
When dedicated Pediatrics/Pregnancy top-level sections are built, pediatric-only and pregnancy-only pages migrate OUT of /conditions/. Cross-cutting icons on shared Conditions pages stay. Post-launch unless explicitly prioritized.

11. ESSENTIAL OILS — INGESTION (LOCKED)
The "Internal" use type
Refers to any FDA-compliant ingestion method. Gate (required for ALL internal use): Supplement Facts panel on the label. Marketing claims like "100% pure" or "therapeutic grade" DO NOT qualify.
Delivery methods (valid IF oil passes the gate)

Enteric-coated capsules/softgels (IBgard, Pepogest for peppermint; oregano softgels)
Drops in food/baking (lemon in icing, peppermint in honey)
Drops in tea or warm water with carrier
Sublingual drops (specific products only, with practitioner guidance)

Source hierarchy

Primary: Worwood VA, Complete Book of Essential Oils and Aromatherapy, 25th Anniversary Ed, New World Library 2016
Secondary: NIH NCCIH (evidence-based clinical claims)
Tertiary: Tisserand R, Young R, Essential Oil Safety 2nd ed, Churchill Livingstone 2014 (dermal maxima, topical safety thresholds)

Editorial rule: Where Worwood and Tisserand conflict, follow Worwood unless safety margin is thin enough to warrant Tisserand's conservatism. Such exceptions must be flagged in PROJECT_NOTES.
Oils with legitimate internal use
Peppermint, lemon, sweet orange, ginger, frankincense, oregano (enteric softgels ONLY).
Data location

lib/medsData.js — each ingestible oil has an internal format block
components/ConditionPageLayoutV2.tsx — renders Internal section per-condition with tap-to-reveal
app/oils/[slug]/page.tsx — renders Internal section per-oil
app/oils/safe-to-ingest/page.tsx — full explainer


12. FILE INVENTORY (CRITICAL PATHS)
Pages

app/page.tsx — Home
app/account/page.tsx — Auth router
app/terms/page.tsx · app/privacy/page.tsx — Legal (draft, awaiting attorney)
app/conditions/page.tsx · app/conditions/[slug]/page.tsx
app/interaction-checker/page.jsx + .module.css
app/dosage-calculator/page.jsx + .module.css
app/clean-picks/page.tsx — Landing
app/clean-picks/pain-fever/page.tsx · app/clean-picks/cold-flu/page.tsx
app/oils/[slug]/page.tsx · app/oils/safe-to-ingest/page.tsx
app/layout.tsx — Root layout (Nav + QuickNav + DoseTrackerBadge + Footer wrap)
app/globals.css

Components

components/Nav.tsx · components/QuickNav.tsx
components/AuthForm.tsx · components/AccountDashboard.tsx
components/LegalPageLayout.tsx
components/ConditionPageLayoutV2.tsx (active) · components/ConditionLayout.tsx (wrapper)
components/RemedyLayout.tsx (legacy?) · components/RemedyPageLayout.tsx (legacy?)
components/DoseTrackerBadge.jsx
components/PrescriptionAcknowledgmentModal.tsx
components/icons/DosageCalculatorIcon.tsx
components/clean-picks/PickCard.tsx · RetailerChips.tsx · CategoryTile.tsx

Data & libs

lib/medsData.js — categories, meds, formats, concentrations (~52 entries tagged with pharmClasses)
lib/interactionData.js — ~137 pair-wise entries
lib/interactionClassRules.js — 7 class rules + engine
lib/supabase.js · lib/supabaseHelpers.js
lib/clean-picks/classColors.ts · painFeverPicks.ts · coldFluPicks.ts

Config

next.config.ts — redirects /remedies → /conditions, /brands → /clean-picks

Deprecated (check before deletion)

components/AuthModal.tsx — no longer imported
components/ConditionPageLayout.tsx (v1) — likely deprecated; grep imports
app/remedies/* — replaced by /conditions/


13. SUPABASE SCHEMA
Tables (all RLS-enabled)

profiles — user accounts (auto-created via trigger on auth signup)
family_profiles — children, spouses, parents managed by one user
dose_logs — recorded administrations
saved_remedies — bookmarks

Key fields

profiles.selected_tier_at_signup — tracks signup tier

Auth settings

Email confirmation: OFF
URL config includes: knowyourremedy.com/** + localhost:3000/**
Hybrid email verification: banner on dashboard + gate at premium upgrade

Known issue

.update() was changed to .upsert() in AuthForm to handle race condition with auto-create trigger


14. PRICING & GATING
Free tier
Dosage calculator (no save), Interaction checker (no save), read all Conditions, read all Clean Picks.
Premium ($10/year)
Save profiles (Family Profiles), save dose history, dose tracking with reminders, saved Medicine Cabinet, saved Remedies bookmarks. Future: email/SMS dose reminders.
Current state
Stripe NOT integrated. Premium flag exists in Supabase schema but not enforced. Founding member promo shows on signup. Dose tracker UI works for everyone (falls back to localStorage).

15. INTERACTION DATABASE COVERAGE
Status (May 25, 2026)

~137 pair entries
All 7 class rules have substantial pair-detail coverage

Pharmacological classes covered
ClassStatus🩸 Bleeding✅ Comprehensive (NSAID+naturals, NSAID+anticoagulants, anticoag+naturals)🧠 Sedation✅ Comprehensive (FDA black-box benzo+opioid, Z-drug+benzo, sedation+antihistamine)🌀 Serotonin✅ Comprehensive (SSRI+tramadol, SSRI+SJW, dextromethorphan combos)🫁 Liver✅ Comprehensive (acetaminophen+alcohol AVOID, +statin, hydrocodone combos)🥛 Absorption✅ Comprehensive (levothyroxine+minerals/PPIs, antibiotic+minerals)🫀 Cardiovascular✅ Operational (decongestant+SSRI, +caffeine, statin+macrolide)💧 Diuretic✅ Operational (HCTZ + caffeine/alcohol/senna, triple-stack avoid)
Notable lifestyle factors added

alcohol, caffeine, grapefruit, birthControlCombined — currently placed under home category with interaction_reference tag. Future refactor to proper "Lifestyle Factors" category planned (requires picker grid redesign).

Adding a new med to existing class
Just add the tag to pharmClasses in medsData.js. No code changes needed. Engine auto-participates.
Adding a new class rule
Add a rule object to CLASS_RULES in lib/interactionClassRules.js. Engine handles the rest. Each rule needs: id, icon, title, severity, threshold, matches function, summary, contextualRisk, goalFraming, sources.

16. PENDING WORK
Launch-blocking

Clean Picks content build — finish 2 remaining categories (Sleep → First Aid). Allergies shipped May 28.
🚨 Condition page rating audit — dedicated session needed. Search project-wide for '🟢 Cleaner choice'. Verify every product labeled Cleaner against locked editorial standard (Section 4). Known candidates for downgrade:

Sudafed (Sinus Congestion page) — has dyes + titanium dioxide
Mucinex (Cold & Flu page) — has FD&C Blue #1; specify Equate generic instead
Advil Liqui-Gels on Back Pain (and possibly other pages) — has FD&C Green No. 3
Claritin / Zyrtec / Allegra (Allergies page) — likely have titanium dioxide
Audit remaining condition pages: Pain & Fever, Dental Pain, Headache, Joint Pain, Menstrual Cramps, Migraines, Muscle Pain, Tension Headaches


Stripe integration for $10/year billing + founding member flow
Email service for welcome/verification/password reset/dose reminders
Attorney review of Terms + Privacy + Medical Disclaimer (introduce via Richard Aaron @ Dowling Aaron)
Final QA pass across all pages, devices, flows

Content depth (valuable but not strictly blocking)

More interaction database pairs — ~3-4 more batches to feel content-complete
MAOI scope decision — currently no MAOIs in DB
Add prescription diuretics (furosemide, spironolactone) — strengthens diuretic class warning
Add kava as proper med entry (referenced but missing from medsData)
Build "Lifestyle Factors" category (vs current Home placement for alcohol/caffeine/grapefruit)
medsData.js source-field citation sweep — verify all citations during legal review polish

Layout/polish

Condition page redesign per Section 10 (vintage anatomy plates, body-system mapping, 5 structural fixes)
Pediatric icon component with three-bucket system across 31 condition pages
Skin Allergies page content (currently empty)
Phase 1 pediatric pages (Cradle Cap, Infant Gas, Baby Eczema, Hand-Foot-Mouth)
Section label rollout to remaining reference pages (Section 2)
ConditionPageLayout.tsx v1 cleanup — grep imports, delete if unused

Pre-launch milestone
Friends/family review — when Clean Picks ships across all 5 categories with 8-15 picks each, ready for critique. Likely 2-3 focused sessions away.

17. CHANGE LOG (recent shipped work)

May 28 — Allergies Clean Picks shipped

8 verified picks at /clean-picks/allergies (3 oral, 3 nasal, 2 eye)
Editorial: Zyrtec/Claritin/Allegra tablets REJECTED (titanium dioxide, verified via DailyMed/FDA). "Dye-free" kids' cetirizine syrups REJECTED (parabens + propylene glycol). Clean oral options are homeopathic or sedating; the only clean conventional drug is Alaway Preservative Free (ketotifen) eye drops.
Architecture: 2 new classKeys (antihistamine = coral, salineNasal = Blue B slate #4a6781); 2 new PickForm values (nasal, eye); new 'nasal' top-pick bucket. Reused homeopathic + propolis classes.
Also fixed: Tylenol Extra Strength Dye-Free on Pain & Fever had empty retailers/priceTier — populated.

May 26 — Cold & Flu Clean Picks + Editorial Standard Locked

13 verified Cold & Flu picks shipped at /clean-picks/cold-flu
Editorial ingredient standard tightened (seed oils, titanium dioxide, FD&C dyes now disqualifying)
Discoveries: Sudafed REJECTED (dyes + TiO2), Mucinex brand REJECTED (FD&C Blue 1) → Equate Mucus ER (Walmart generic) is the actual clean choice, Maty's Vapor Rub REJECTED (sunflower oil) → Badger Aromatic Chest Rub is the clean Vicks alternative
Advil Liqui-Gels removed from Pain & Fever (FD&C Green No. 3); Pain & Fever now 9 picks (was 10)
Sore Throat condition page: Advil downgraded 🟢→🟡 with honest note
Architecture: 7 new classKey entries added (expectorant, homeopathicLow, immuneHerbal, propolis, pediatricCombo, elderberry, topicalChestRub)
Root layout bug fix: Nav/QuickNav/DoseTrackerBadge imports were missing

May 26 — Pain & Fever Clean Picks shipped

10 picks initially, reduced to 9 after Advil removal
Per-category folder architecture refactor (locked pattern in Section 6)
Top Picks default tab + filter chips (Top/Oral/Topical/Sublingual)
Card design Option A: white card + colored top bar by drug class

May 25 — Clean Brands → Everyday Clean Picks rename

/brands → /clean-picks with 308 redirect
Subtitle: "When you need something today, here are the cleaner options."
Scope locked: products available at CVS/Walgreens/Target/grocery/Costco/Whole Foods/Sprouts; NOT specialty wellness-only

May 25 — Massive interaction database expansion

~30 entries → ~137 entries (107 new pair entries)
4 new med entries: alcohol, caffeine, grapefruit, birthControlCombined
All 7 class warnings now have substantial pair-detail coverage
Bug fix: empty Safe Combinations CTA

May 24 — Class Rule System shipped

7 class rules live in production
52 medsData entries tagged with pharmClasses arrays
ClassRuleWarnings + ClassRuleCard components
CTA scroll-to-anchor for Safe Combinations

May 23 — Prescription handling overhaul

PrescriptionAcknowledgmentModal (sessionStorage-based, shared between tools)
Blue-bordered Prescription-Individualized result card
10 new prescriptions added (34 total Rx in medsData)
9 entries use requiresIndividualization

May 22 — Visual direction locks

Vintage scientific plate hero pattern (Köhler + Gray's Anatomy)
Body system → anatomy plate mapping locked
Internal use FDA Supplement Facts gate locked (Worwood primary source)
Blue B section label pattern locked

Earlier — foundations

Conditions rename live in production (/remedies → /conditions)
Multi-medication interaction checker (smart 2-pharma cap)
Dosage calculator with chip-collapse + smart re-validation + format-aware rounding
Custom DosageCalculatorIcon site-wide
Supabase schema (profiles, family_profiles, dose_logs, saved_remedies)