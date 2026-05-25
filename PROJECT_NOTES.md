# KnowYourRemedy.com — Project Notes

> **This is the single source of truth for design decisions, conventions, and project status.**
> Keep this file updated as decisions are made. If working with Claude in a new chat, paste this file's contents at the start of the conversation to restore full context.

**Last Updated:** May 20, 2026

---

## 1. PROJECT BASICS

**Site:** knowyourremedy.com
**Local path:** `C:\Users\bdez1\OneDrive\Desktop\knowyourremedy`
**Stack:** Next.js 16.2.6 (Turbopack) · Supabase · Vercel · GitHub
**Supabase URL:** `https://pmmvwbddolpcisjqvpcp.supabase.co`
**Account email:** bdez1525@outlook.com
**Target launch:** End of month (~Dec 1, 2026 from this writing)
**Launch philosophy:** Launch big, polish small — "blow people's minds with only minor tweaks afterwards"
**Aesthetic target:** Looks like big pharma made it — restrained, professional, generous whitespace, deliberate typography

---

## 2. BRAND VOICE & DESIGN STANDARDS (LOCKED)

### Brand voice
- **"Honest always, no agenda"**
- **"From the shelf to the root and everything in between"**
- Present every option equally (natural + conventional) — never push either side
- Never preachy, never agenda-driven
- Educational without being condescending
- Avoid "Natural first" language anywhere (corrected from earlier brand voice)

### Primary brand color
- **Green:** `#2d4a3e` — primary brand color, used for headers, CTAs, active states

### Interaction status colors
- **External Only:** `#2980b9`
- **Dilute First:** `#be185d`
- **Internal Only:** `#78350f`
- **Cleaner:** `#27ae60` (safe / green)
- **Decent:** `#d97706` (caution / amber — renamed from "Acceptable")
- **Last / Avoid:** `#c0392b` (red)
- **Rx:** `#2563eb`
- **Pregnancy safe:** `#27ae60`
- **Avoid:** `#c0392b`
- **Ask doctor:** `#e67e22`

### Typography
- **Playfair Display** — serif, used for headlines (`var(--font-playfair)`)
- **Inter** — sans-serif body text (`var(--font-inter)`)

### Premium tier
- **$10/year** — Premium subscription
- **Founding member promotion** — grandfathered rights, deadline configurable in `AuthForm.tsx` via `FOUNDING_MEMBER_DEADLINE` constant (currently June 30, 2027)

---

## 3. ICON CONVENTIONS (LOCKED)

### Site-wide feature icons
- **Dosage Calculator:** Custom SVG component at `components/icons/DosageCalculatorIcon.tsx` — accepts `size`/`color`/`className` props. Used in 4 places: home card, QuickNav, "Calculate Dose" pill on remedy pages, interaction checker callout
- **Interaction Checker:** `💊🌿` — pill + leaf combo, tells the brand story
- **Clean Brands:** `✨` sparkles
- **Remedies:** `🌿`
- **Essential Oils:** `🌱`
- **Home:** `🏠`

### medsData.js category icons
```javascript
otc:            '🏪'   // storefront — Mainstream/OTC
prescription:   '⚕️'   // caduceus — Prescription (maxSelections: 2, sharedCapGroup: 'pharma')
supplements:    '💪'   // flexed biceps — Vitamins & Supps (label abbreviated to "Vitamins & Supps")
herbal:         '🌿'   // herb branch
essential_oils: '🌱'   // sprout
home:           '🏠'   // home
```

### Category order (for tab display)
Herbal sits between Prescription and Supps, so the leaf 🌿 and sprout 🌱 are NOT side-by-side:
```
Row 1: OTC | Prescription | Herbal
Row 2: Supps | Essential Oils | Home
```

### Quality icon decisions
- ❌ NO lotion bottle 🧴 anywhere (was wrong for supplements)
- ❌ NO ⚠️ warning emoji for Interaction Checker (use 💊🌿 instead — brand storytelling)
- ❌ NO 🏪 for Clean Brands (use ✨ instead, since OTC also uses 🏪)

---

## 4. CRITICAL FILE INVENTORY

### Pages
- `app/page.tsx` — Home page (feature cards)
- `app/account/page.tsx` — Smart router for auth/dashboard
- `app/terms/page.tsx` — Terms of Service (draft, awaiting attorney review)
- `app/privacy/page.tsx` — Privacy Policy (draft, awaiting attorney review)
- `app/remedies/page.tsx` — Remedies index with search bar
- `app/remedies/[slug]/page.tsx` — Individual remedy pages
- `app/interaction-checker/page.jsx` — Multi-medication interaction checker
- `app/interaction-checker/InteractionChecker.module.css`
- `app/dosage-calculator/page.jsx` — Dosage calculator with chip-collapse steps
- `app/dosage-calculator/DosageCalculator.module.css`
- `app/layout.tsx` — Root layout (Nav + QuickNav + DoseTrackerBadge wrap)
- `app/globals.css`

### Components
- `components/Nav.tsx` — Top navigation
- `components/QuickNav.tsx` — Bottom mobile/floating nav with feature icons
- `components/AuthForm.tsx` — Signup/login with tier comparison, age gate, founding member banner
- `components/AccountDashboard.tsx` — Logged-in dashboard with profiles, doses, medicine cabinet, settings
- `components/LegalPageLayout.tsx` — Shared legal page wrapper (cream bg, serif headlines)
- `components/RemedyLayout.tsx` — Wrapper for remedies index
- `components/RemedyPageLayout.tsx` — Wrapper for individual remedy pages (has "Calculate Dose" + "Check Interactions" pill buttons)
- `components/DoseTrackerBadge.jsx` — Floating dose tracker UI
- `components/icons/DosageCalculatorIcon.tsx` — Custom calculator SVG
- `components/AuthModal.tsx` — **DEPRECATED**, no longer imported

### Data & libs
- `lib/medsData.js` — Categories, medications, formats, concentrations
- `lib/interactionData.js` — Pair-wise drug interactions
- `lib/supabase.js` — Supabase client init
- `lib/supabaseHelpers.js` — Profile/dose log helpers

---

## 5. INTERACTION CHECKER — DESIGN LOCKED IN

### Multi-medication picker rules
- **Total cap:** 10 items across all categories
- **Pharma cap:** Max 2 from OTC + Prescription COMBINED (they share `sharedCapGroup: 'pharma'`)
- **All other categories:** Unlimited within the total cap

### Why the pharma cap exists (DON'T REMOVE IT)
- Pair-wise OTC/Rx interactions are well-documented
- 3+ pharmaceutical stacking has poor data (tertiary interactions exist)
- The cap is what allows us to give an honest "all together" verdict
- This is a feature, not a limitation — we communicate it as "we cap pharmaceuticals at 2 to stay accurate"

### Verdict logic
The chip color and verdict banner reflect the OVERALL stack verdict:
- **✅ All N likely safe** — if all pairs check clear
- **⚠️ Some concerns** — if any pair is caution
- **🚫 Do not combine** — if any pair is avoid
- **🔍 Limited data** — if all pairs are no-data

### UI Layout
- **Two-column on desktop:** Picker left, selected chips right
- **Single-column on mobile portrait** (`@media max-width: 768px`)
- **Verdict banner sits ABOVE the chips** in the right column (so user sees it without scrolling)
- **Cumulative-effects disclaimer** appears only when 3+ items selected AND at least one is pharma
- **Single-medication exploration:** When only 1 med selected, show "View all interactions for X" feature
- **Auto-display results** the moment 2+ meds selected (no "Check" button)
- **Chips color-coded** by overall verdict — when any pair is avoid, ALL chips turn red

### Picker UX details
- "Already added: [active ingredient]" greys out duplicate brand-name items
- Pharma tabs visually dim when cap reached
- "Pharmaceutical limit reached" message appears when on pharma tab and capped
- Category tabs in 2-row grid (3 cols × 2 rows) with subtle gray dividers
- Counter pill shows "X of 10 selected"

### URL params (supported)
- `?med=ibuprofen` — legacy single-med pre-fill
- `?meds=ibuprofen,acetaminophen,benadryl` — new multi-med pre-fill

---

## 6. DOSAGE CALCULATOR — DESIGN LOCKED IN

### Chip-collapse step pattern
- **One step expanded at a time** — others show as compact chips
- **Each step only renders when `activeStep` is at that step or higher** (prevents premature popups)
- **Step 1:** Who is this for? (Child / Adult)
- **Step 2:** Weight + Age (with units toggle)
- **Step 3:** Medication picker (search + category tabs)
- **Step 4:** Format
- **Step 5:** Concentration
- **Then:** Calculate button + result

### Smart re-validation rules
- **Changing "Who"** → resets EVERYTHING downstream (different med rules for child vs adult)
- **Changing weight/age** → KEEPS medication, format, concentration (med is still valid). If all downstream filled, auto-recalculates new dose.
- **Changing medication** → resets format and concentration (med-specific)
- **Changing format** → resets concentration (format-specific)

### Tap-to-edit chips
- Tapping any completed chip re-expands that step
- Downstream chips clear when an upstream step is changed (per smart re-validation rules)

### Format-aware dose rounding (CRITICAL — DO NOT REMOVE)
Each format entry has a `splittable` field:
- **Liquids** → `splittable: true` — any decimal mL OK
- **Tablets / chewables** → `splittable: true` — rounds to nearest 0.5 unit
- **Gel caps / capsules / suppositories / patches** → `splittable: false` — rounds to nearest whole unit
- **If rounded dose = 0** → shows red "NOT RECOMMENDED" card with "Try a liquid form" guidance

### Zero-mg / Below-minimum result card
- Red border + glow + `⚠️ NOT RECOMMENDED` header
- Shows reason from `med.contraindication` field if present
- Falls back to generic "no established safe dosing data" message for very young children
- For below-minimum (less than 1 gel cap, etc.) → shows 💧 "Try a different format" guidance
- For true contraindication → shows 👨‍⚕️ "Speak with a pediatrician" guidance

### Hero subtitle styling
- Cream-green background callout with brand-green left border
- More visual weight than gray fine print

---

## 7. PRICING & GATING (PLANNED)

### Free tier
- Dosage calculator (calculate without saving)
- Interaction checker (check without saving)
- Read all remedy pages
- Read all clean brand info

### Premium tier ($10/year)
- **Save profiles** (Family Profiles)
- **Save calculated doses to history**
- **Dose tracking** (next-eligible reminders)
- **Saved Medicine Cabinet**
- **Saved Remedies** (bookmarks)
- **Future:** Email/SMS dose reminders

### Current gating state
- **Stripe NOT yet integrated** — premium tier infrastructure exists in Supabase schema but not enforced
- Founding member promo messaging shows on signup (deadline June 30, 2027)
- Dose tracker UI is functional for everyone (falls back to localStorage)
- **Decision: Option C** — leave as-is, gate properly when Stripe is built. The premium-tier flag exists in Supabase; we just don't check it yet.

---

## 8. SUPABASE SCHEMA

### Tables (all with Row Level Security)
- `profiles` — user accounts (auto-created via trigger on auth signup)
- `family_profiles` — children, spouses, parents managed by one user
- `dose_logs` — recorded dose administrations
- `saved_remedies` — bookmarked remedy pages

### Important fields
- `profiles.selected_tier_at_signup` — tracks what tier they signed up for

### Auth settings
- Email confirmation = OFF
- URL configuration includes: `knowyourremedy.com/**` + `localhost:3000/**`
- Hybrid email verification approach: banner on dashboard, gate at premium upgrade

### Known issue
- `.update()` was changed to `.upsert()` in AuthForm to handle race condition with auto-create trigger

---

## 9. REMEDIES INDEX

### Structure
- Single `CATEGORIES` array in `app/remedies/page.tsx` holds all 7 categories + 31 remedies
- Pill-shaped search input at top with 🔍 icon and ✕ clear button
- Real-time filter by remedy name OR category name
- "X remedies matching" count under search bar
- Empty state when nothing matches

### Categories
1. Pain and Inflammation (6)
2. Fever and Immune (5)
3. Digestive (6)
4. Allergies and Respiratory (3)
5. Skin and External (5)
6. Sleep and Stress (4)
7. Children and Infants (4)

### Empty page
- **`app/remedies/skin-allergies/page.tsx`** — needs content (TODO)

---

## 10. PEDIATRIC ICON SYSTEM (PLANNED)

### Format decided
- Specific age cutoffs: "Safe 6mo+" / "Not for under 2" / "Ask pediatrician"
- 12+ defaults to adult dosing

### Three-bucket system (for the 31 existing pages)
- **Bucket 1 — pediatric ONLY, no pregnancy icons:**
  - Teething Pain, Colic, Diaper Rash, Growing Pains
- **Bucket 2 — adult ONLY, no pediatric icons:**
  - Menstrual Cramps
- **Bucket 3 — BOTH icons:**
  - All 26 others

### Future pediatric pages to build
- **Phase 1:** Cradle Cap, Infant Gas, Baby Eczema, Hand-Foot-Mouth
- **Phase 2:** Croup, Lice, Pediatric Fever
- **Phase 3:** Misc lower priority

---

## 11. RECURRING ISSUES / GOTCHAS

### Cursor IDE quirks
- **`<` characters in JSX tags occasionally get stripped on paste** — always check that `<a`, `<div`, `<DosageCalculatorIcon`, etc. have their opening `<` after pasting
- **Long pastes can be truncated mid-message** — always verify the bottom of pasted code
- **Multiple code changes to the same file:** Build whole-file replacements instead of multiple find-and-replace edits (reduces paste errors)

### Hardware
- F12 on user's keyboard is airplane mode toggle — use Fn+F12 or Ctrl+Shift+J for dev tools

### Mobile testing
- localhost from phone often blocked by Windows Firewall
- Workaround: just push to Vercel and test on live site

---

## 12. ROADMAP TO LAUNCH

### Completed (May 20)
- [x] Multi-medication interaction checker with smart 2-pharma cap, live verdict, color-coded chips
- [x] Dosage calculator with progressive chip-collapse steps
- [x] Smart re-validation between steps
- [x] Format-aware dose rounding (no more "0.2 gel caps")
- [x] Zero-mg / below-minimum red NOT RECOMMENDED card
- [x] Dosage calculator search + category tabs (no sidebar)
- [x] Custom Dosage Calculator SVG icon site-wide
- [x] Remedies index search bar
- [x] Brand voice icon updates (💊🌿, ✨, 💪, etc.)
- [x] Category emoji swap (Herbal and Supps reordered to avoid leaf-vs-sprout adjacency)
- [x] "Vitamins & Supps" label abbreviation
- [x] Mobile portrait layout for interaction checker (stacked, not cramped 2-col)
- [x] Database expansion banner on interaction checker
- [x] Legal pages (Terms, Privacy — drafts)
- [x] Account dashboard with family profiles, doses, settings
- [x] AuthForm with tier comparison, age gate, founding member banner
- [x] Supabase schema (profiles, family_profiles, dose_logs, saved_remedies)

### Launch-blocking — content
- [ ] **Medication catalog expansion:** prescriptions, oils library, more supplements/herbs (~50+ new entries)
- [ ] **Interaction database:** 60-80 pair-wise entries with status, summary, mechanism, safe limits, sources
- [ ] **Cumulative-risk class rules:** ~15-25 rules covering NSAID stacking, anticholinergic burden, liver stress, bleeding risk, serotonin syndrome
- [ ] **Pediatric icon component** with age cutoffs
- [ ] **Three-bucket icon implementation** across all 31 remedy pages
- [ ] **Pediatric pages — Phase 1:** Cradle Cap, Infant Gas, Baby Eczema, Hand-Foot-Mouth
- [ ] **Pediatric pages — Phase 2:** Croup, Lice, Pediatric Fever
- [ ] **Skin Allergies page content**

### Launch-blocking — infrastructure
- [ ] **Stripe integration** for $10/year billing + founding-member flow
- [ ] **Email service** (welcome, verification, password reset, future dose reminders)
- [ ] **SEO long-tail pages** (~15-25 symptom + remedy combinations)

### Launch-blocking — polish
- [ ] **Remedy subpage overhaul** — reconsider sidebar, remove "Natural first" language
- [ ] **Polish pass** on whole site for major-corporation feel

### Launch-blocking — legal & ops
- [ ] **Attorney review** of Terms + Privacy + Medical Disclaimer
- [ ] **Final QA pass** across all pages, devices, flows
- [ ] **Launch announcement prep**

### Post-launch nice-to-haves
- Cumulative-risk class rules v2 (more sophisticated logic)
- Additional pediatric pages (Phase 3)
- Pet safety database
- Food-drug interactions
- Prenatal vitamins detail
- Admin page at `/admin` for user submissions
- App waitlist page at `/app`
- Email verification reminder service

---

## 13. MOBILE-FIRST DESIGN PRINCIPLES (LOCKED)

- **Build mobile-web-first with native app in mind** — design patterns now translate to React Native later
- **No forced orientation** — design portrait layouts that work, never tell users to rotate their phone
- **Chip-based progressive disclosure** — answered questions collapse into editable chips
- **Stack two-column layouts vertically** on mobile portrait

---

## 14. QUALITY STANDARDS

- **AI medical content** is acceptable for content sprint, but must be reviewed by a pharmacist before launch
- **Refuse-when-uncertain bias** — better to mark a pair "no data available" than write a wrong interaction
- **Honest disclaimers** — never hide what we don't know, frame gaps as growth
- **No forced anything** — no popups blocking content, no required rotations, no required signups to view info

---

## 15. CONVERSATION CONTEXT NOTES

- User is a novice developer using Cursor IDE
- Heavy on assistant for code generation
- Primary audience: women / moms managing family health, plus older adults with multiple medications
- User explicitly does NOT want to launch half-baked: "blow people's minds with only minor tweaks afterwards"
- User stuck through multiple long debugging sessions (CSS corruption, paste errors) — collaborative tone
- "Big pharma aesthetic" is the visual bar — restrained, professional, intentional
---

## 16. ARCHITECTURAL DECISIONS PENDING (locked direction, future execution)

### Remedies → Conditions rename (in progress this chat)
- Top-level section renamed from "Remedies" to "Conditions"
- URLs change from `/remedies/*` to `/conditions/*` with permanent redirects
- Subpages still display remedies; only the section label is changing
- Brand line "From the shelf to the root and everything in between" unchanged

### Remedy subpage layout overhaul (planned, future)
- The current condition subpage layout (RemedyPageLayout.tsx) is acknowledged
  as needing a polish/redesign pass before any new condition content is added
- Skin Allergies content and any new pediatric/pregnancy pages are PAUSED
  until the layout overhaul is complete
- Do not pump new content into the current layout — it will need to be
  refit afterward, doubling the work

### Future dedicated Pediatrics and Pregnancy top-level sections
- When dedicated Pediatrics and/or Pregnancy sections are eventually built
  as their own top-level navigation items (separate from Conditions), the
  following condition pages will be MIGRATED OUT of /conditions/:
  - Exclusively pediatric pages: Teething Pain, Colic, Diaper Rash,
    Growing Pains, and any future Phase 1/2/3 pediatric pages (Cradle Cap,
    Infant Gas, Baby Eczema, Hand-Foot-Mouth, Croup, Lice, Pediatric Fever)
  - Exclusively pregnancy pages: any content built specifically for
    pregnant users
- Conditions remains the catch-all section for general adult/family
  conditions (Bucket 3 in section 10's three-bucket system)
- Pediatric/Pregnancy icons on shared Conditions pages stay where they
  are — they're cross-cutting indicators, not section markers
- This migration is post-launch unless explicitly prioritized
---

## 17. Visual Direction Lock — Hero Illustration System

**Decided:** May 22, 2026 morning session. After identifying that condition and oil detail pages felt "textbooky," locked the long-term visual direction.

### The aesthetic
- **Vintage scientific plates** as the hero anchor on every detail page (oils + conditions)
- Specifically the **Köhler's Medizinal-Pflanzen (1887)** style for plants — chromolithographic, scientifically accurate, soft muted color, multiple views of the subject, Latin name italicized at bottom
- For conditions: **vintage medical anatomy plates** (Gray's Anatomy 1858 style) in the same era and aesthetic — head/nerve anatomy for headache, dental for teething, joint cross-sections for joint pain, etc.
- For abstract conditions where anatomy doesn't fit (anxiety, insomnia): vintage etching-style symbols in matching era aesthetic — fallback only

### The layout pattern (locked)
- **Option A — Full-bleed hero strip** at the top of every detail page, ~220-260px tall
- Soft cream/aged-paper background tone for the hero (`#f5efe0` or similar)
- Illustration centered, no overlay text on the image
- H1 + scientific subtitle below the hero, NOT on it
- Mobile: collapses cleanly to stacked

### Why this works
- Matches "Honest always, no agenda" — vintage scientific = implicit credibility
- Echoes Worwood and Tisserand source materials (their books use this style)
- Unique among modern wellness sites (everyone else uses minimalist line art)
- Free, public-domain source (Wikimedia Commons has thousands)
- Scales: every plant + most body systems have a plate available

### Condition page redesign — 5 structural fixes locked
1. **Vintage anatomy hero illustration** anchors each page (NEW)
2. 2. **Each BODY SYSTEM gets its own distinct hero — conditions affecting the same system share the illustration.** ~10 body-system plates cover all 31 conditions. (Updated May 22 night session — original "unique per condition" plan was overpromising; many conditions share anatomy.)
3. **Natural / Mainstream / In a Pinch tabs COLLAPSE into one unified list** with type badges (🌿 Natural / 🏪 OTC / ⚡ In a pinch) + filter chips (Kid-safe / Pregnancy-safe / Drugstore-available)
4. **Calculate Dose + Check Interactions PROMOTED** to their own dedicated section near the bottom — bigger, bolder, sticky on desktop
5. **"When to see a doctor" PROMOTED** to a dedicated red-callout section just below the header — not buried as the top emergency strip

### Visual family across the site
Oil pages and condition pages share:
- Same hero pattern (vintage scientific illustration, cream paper bg)
- Same H1 + scientific subtitle pattern
- Same neutral safety badge style (`#f1efe8` bg, `#5f5e5a` text)
- Same dilution/warning callout treatments (red for kids, amber for adults, red for "see a doctor")
- Same cream-and-green palette
- Same "Sources" footer with citations
- Eventually: same pattern for carrier oils, blends, supplements

### Implementation phases (estimated)
| Phase | Work | Sessions |
|---|---|---|
| 1 | Build oil page hero on real lavender detail page, test pattern | 1 |
| 2 | Roll out plates to all 18 existing oils | 1 |
| 3 | Design new ConditionPageLayout component | 1 |
| 4 | Source anatomy illustrations for 5-6 starter conditions | 1 |
| 5 | Build new ConditionPageLayout component | 1 |
| 6 | Migrate all 31 condition pages to new component | 1 |
| 7 | Source illustrations for abstract conditions | half |

**Total:** ~6-7 focused sessions, 2-3 weeks of evening work.

### Sources / asset pipeline
- Wikimedia Commons: Köhler's Medizinal-Pflanzen (plants) + Gray's Anatomy (1858) + other public domain medical texts
- Backup if no Köhler plate exists for a given plant: similar-era botanical plates from Pictureboxblue, The Graphics Fairy (public domain)
- Each plate downloaded to `/public/illustrations/oils/[oil-slug].jpg` and `/public/illustrations/conditions/[condition-slug].jpg`
- Optional: light cleanup in a free tool (background isolation, contrast tweak) before saving — but keep the original aged-paper feel
---

## 18. Section Label Treatment — Site-Wide Pattern

**Decided:** May 22, 2026 morning session, after locking Blue B on oil detail pages.

### The rule
Reference pages get the Blue B uppercase section label pattern with the 28px chapter rule beneath. Tool pages keep their own existing in-context label conventions (step headers, etc.). Don't fight working interfaces.

### Applies to (reference pages)
- ✅ Oil detail pages (`/oils/[slug]`) — already done
- ⏳ Oil hub (`/oils`) — apply next touch
- ⏳ Conditions hub (`/conditions`) — apply next touch
- ⏳ Condition detail pages (`/conditions/[tag]`) — apply during the full redesign, NOT separately
- ⏳ About / Sources / Disclaimer / footer pages — apply next touch
- ⏳ Homepage section labels (if any) — review and align

### Does NOT apply to (tool pages)
- ❌ Interaction Checker — its panel and badge UI is its own system
- ❌ Dosage Calculator — step headers + step chips ARE its label system

### The pattern (CSS values)
- `fontSize: '0.78rem'`
- `fontWeight: 700`
- `textTransform: 'uppercase'`
- `letterSpacing: '0.07em'`
- `color: '#4a6781'` (Blue B)
- `marginBottom: '0.4rem'`

Followed by a 28px wide × 2px tall horizontal rule in `#4a6781`, with `marginBottom: '0.7rem'`.

### Rollout approach
Incremental — apply to each reference page on its next touch (whenever we're already in that file for another reason). No dedicated site-wide section label sprint needed.

---

## 19. Essential Oil Ingestion Architecture Lock

**Last updated:** May 22, 2026 night session.

### The Internal use type — what it actually means

"Internal" on knowyourremedy.com refers to any FDA-compliant ingestion method. The gating rule is the source oil, NOT the delivery method.

**Gate (required for ALL internal use):** Supplement Facts panel on the label. This is the only reliable indicator an oil is FDA-cleared for ingestion. Marketing claims like "100% pure," "therapeutic grade," "natural," or any brand's own certification DO NOT qualify.

**Delivery methods (any are valid IF the oil passes the gate):**
- Enteric-coated capsules / softgels (e.g., IBgard, Pepogest for peppermint; oregano oil softgels)
- Drops in food or baking (e.g., lemon oil in icing, peppermint oil in honey)
- Drops in tea or warm water (with carrier such as honey or milk)
- Direct sublingual drops (for some specific products with practitioner guidance)

### Per-oil ingestion stance

The following oils have legitimate internal use SOMEWHERE in published guidance:
- **Peppermint** — enteric capsules (IBS, headache); drops in honey/tea
- **Lemon** — culinary use (Worwood); drops in baking, water, dressings
- **Sweet Orange** — culinary use (Worwood); drops in baking, beverages
- **Ginger** — capsules; drops in tea or culinary use
- **Frankincense** — boswellic acid capsules (joint health, anti-inflammatory)
- **Oregano** — enteric-coated softgels ONLY; never drops in food (too potent)

### Source hierarchy for internal use guidance

**Primary source: Worwood, Valerie Ann — Complete Book of Essential Oils and Aromatherapy 2nd ed., 2016.**
### Reference citation conventions
- **Tisserand R, Young R:** Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 (current most recent edition)
- **Worwood VA:** The Complete Book of Essential Oils and Aromatherapy, Revised and Expanded 25th Anniversary Edition. New World Library 2016 (current most recent edition)
- **TODO before launch:** Sweep all medsData.js `source` fields for citation accuracy during legal review polish pass

knowyourremedy.com follows Worwood as the primary source for essential oil ingestion guidance — capsules, drops in carriers, and culinary use. She is also the primary source for diffusion ages (decided in May 22, 2026 session).

**Gate (overrides all sources):** FDA framing — Supplement Facts panel = required. No oil, no matter what source recommends it internally, qualifies for internal use without a Supplement Facts panel on the label.

**Tertiary source:** Tisserand & Young (Essential Oil Safety 2nd ed., 2014) — referenced only for specific dermal maxima (e.g., ylang ylang 0.8%, lemongrass 0.7%) and topical safety thresholds where Worwood is less specific. Per-oil mixing of Tisserand into otherwise-Worwood guidance must be documented in that oil's source citation.

**Secondary source:** NIH NCCIH — used for evidence-based clinical claims (e.g., peppermint capsules for IBS) and as cross-reference for safety claims.

**Editorial rule:** Where Worwood and Tisserand conflict on a specific oil, we follow Worwood unless safety margin is thin enough to warrant Tisserand's conservatism. Such exceptions must be flagged in PROJECT_NOTES.
### What knowyourremedy.com does and does NOT teach

**Does teach:**
- The Supplement Facts panel rule for selecting ingestible oils
- Specific commercial product references where well-known (IBgard, Pepogest)
- Worwood-aligned culinary use for citrus oils and select others
- Per-oil age ranges for internal use
- Pregnancy guidance for internal use

**Does NOT teach:**
- "Just drop it in your water" with unspecified oil sourcing
- High-dose ingestion without practitioner guidance
- Internal use for oils where evidence is thin or risk is high
- Specific dosing for unfamiliar internal protocols

### Cross-reference

- The condition pages' Internal use type tap-to-reveal pattern fires the Internal Modal on first interaction per session.
- The Internal Modal teaches the Supplement Facts panel rule before revealing any internal-use content.
- The full `/oils/safe-to-ingest` explainer page provides deeper context, FDA labeling background, and visual examples of Supplement Facts panels.

### Where the data lives

- `lib/medsData.js` — each ingestible oil has an `internal` format block with concentrations covering different delivery methods
- `components/ConditionPageLayoutV2.tsx` — renders Internal section per-condition with tap-to-reveal
- `app/oils/[slug]/page.tsx` — renders Internal section per-oil with same tap-to-reveal pattern
- `app/oils/safe-to-ingest/page.tsx` — full explainer page
---

## 20. Body System → Anatomy Plate Mapping

**Decided:** May 22, 2026 night session.

Each anatomy plate maps to a body system. Conditions affecting that system share the plate.

| Body system plate | Filename | Conditions it covers |
|---|---|---|
| Cranial / head / nerves | `head.jpg` | Headache, migraines, tension headaches |
| Respiratory / sinus | `respiratory.jpg` | Sinus congestion, cold and flu, sore throat |
| Mouth / dental | `dental.jpg` | Dental pain, teething pain |
| Ear | `ear.jpg` | Ear pain |
| Eye | `eye.jpg` | Itchy eyes, seasonal allergies (partial) |
| Digestive / abdominal | `digestive.jpg` | Upset stomach, nausea, heartburn, bloating and gas, diarrhea, constipation, colic |
| Musculoskeletal | `musculoskeletal.jpg` | Muscle pain, joint pain, back pain, growing pains |
| Skin | `skin.jpg` | Minor cuts, burns and sunburn, insect bites, rashes, diaper rash, skin allergies |
| Female reproductive | `reproductive.jpg` | Menstrual cramps |
| Nervous / sleep | `nervous.jpg` | Insomnia, anxiety and stress |

### Storage location
All plates live in `public/illustrations/conditions/` (NOT `public/illustrations/oils/`).

### How the lookup works in code
The condition page's `tag` (from the URL) maps to a body system, and the body system maps to the filename. The mapping helper lives in `lib/conditionAnatomy.js` (to be built). Adding a new condition just requires deciding which body system it belongs to — no new illustration needed unless it's a brand-new system.

### Sourcing strategy
Late 1800s anatomical atlases are the target style — Sobotta, Spalteholz, Gray's (when aged-cream scans are available), Vesalius (woodcut), and Andreas Heusinger. Black ink line drawings on white background WILL work with CSS `mix-blend-mode: multiply` to integrate with the cream hero strip — same trick we use for oils.

### Why this is honest
Headache and migraine ARE the same anatomy with different mechanisms. Same for cold and sinus. Pretending they need different illustrations would be fake variety. The bold H1 + scientific subtitle + content makes each condition distinct; the anatomy plate identifies "this is a head condition" / "this is a digestive condition" / etc.
## SESSION UPDATE — May 23, 2026

### Dosage Calculator — Prescription handling overhaul
- **New component:** `components/PrescriptionAcknowledgmentModal.tsx`
  - Reusable across Dosage Calculator + Interaction Checker
  - Triggers when user clicks ⚕️ Prescription tab in MedPicker (first time only)
  - Uses sessionStorage key `kyr_rx_acknowledged` — one acknowledgment per session covers both tools
  - Export `hasAcknowledgedRx()` for checking from any component
  - Visual style: matches essential oils "Internal Only" modal pattern, blue Rx accent (#2563eb)

- **New result card:** "Prescription-Individualized" (blue-bordered)
  - Renders when `med.requiresIndividualization === true`
  - Skips Steps 4 (Format) and 5 (Concentration) entirely
  - Shows `med.standardRange` field + warnings + interaction CTA
  - CSS classes use `individualized*` prefix
  - Located inline in `app/dosage-calculator/page.jsx` as `IndividualizedResultCard` component

### medsData.js — new flags in use
- **`controlled: 'Schedule II' | 'Schedule IV'`** — DEA scheduling for legal/UX gating
- **`requiresIndividualization: true`** — triggers the blue Individualized card instead of dose calculation
- **`standardRange: 'string'`** — human-readable typical dose range for the Individualized card

### Prescription catalog status
- **34 total prescriptions** now in medsData.js (was 24, added 10 in this session)
- New additions: alprazolam, bupropion, cephalexin, ciprofloxacin, clonazepam, doxycycline, hydrocodoneAcetaminophen, lorazepam, tramadol, zolpidem
- 6 controlled substances flagged: alprazolam (IV), clonazepam (IV), hydrocodoneAcetaminophen (II), lorazepam (IV), tramadol (IV), zolpidem (IV)
- 9 entries use `requiresIndividualization`: all 6 controlled + insulinLongActing + insulinRapidActing + warfarin

### Legal/UX pattern decisions (LOCKED)
- **Prescription modal copy** is the legally-reviewed acknowledgment — do not edit without legal review
- **Per-session acknowledgment** (sessionStorage, not localStorage) — courts prefer fresh acknowledgments
- **Modal triggers from BOTH tools** with shared key — Dosage Calculator AND Interaction Checker
- **Individualized cards replace dose calculation** rather than showing wrong numbers — defensible posture

### Reference citation conventions (added earlier this session)
- Tisserand R, Young R: Essential Oil Safety, 2nd ed. Churchill Livingstone 2014 (current most recent edition)
- Worwood VA: The Complete Book of Essential Oils and Aromatherapy, Revised and Expanded 25th Anniversary Edition. New World Library 2016 (current most recent edition)
- TODO before launch: Sweep all medsData.js `source` fields for citation accuracy during legal review polish pass

### Next session priorities
1. **File 4 (CSS for Individualized card)** — left undone at session end. Without it, the Individualized card renders unstyled. File 3 is committed but needs File 4 to look right.
2. **Interaction Checker — Prescription gating** — import PrescriptionAcknowledgmentModal, gate first prescription selection
3. **Interaction database dump** — 60-80 pair-wise entries (next major content push)
4. **Clean Brands page** — content additions + likely rename to "Clean OTC Options" or similar (currently we promote products not brands)

### Working session rhythm (LOCKED for this user)
- Brandon prefers terminal commands for file creation, not right-click instructions
- When multiple edits to one file: send full file rewrite, not line-by-line patches
- Sketch visual mockups (via Visualizer) BEFORE writing code for any UI decision
- Mark recommendation as "(my pick)" when offering options
- Pause for reading time — don't stack question boxes immediately after long messages
- Push to git between code batches to create save points

## SESSION UPDATE — May 23, 2026 (Part 2)

### Visual sync — picker tab system across both tools
- **Inactive tabs:** `#f0fdf4` background + `#166534` text (soft mint)
- **Hover:** `#dcfce7` background
- **Active tab:** `#2d4a3e` background + white text (brand green solid)
- **Selected medication highlight:** changed from `#e8f3ec` to `#d4e7d8` (deeper sage) — fixes green-on-green collision with the new tab green
- Applied identically to BOTH `DosageCalculator.module.css` AND `InteractionChecker.module.css`
- Locked decision: green stays the only accent color in pickers (rejected blue/aggressive options for pharma-restraint aesthetic)

### Always-visible step chips (Dosage Calculator)
- Steps 1 & 2 chips now persist when user is in Step 3
- Tap any chip to jump back to that step
- Improves back-nav UX — no more dead-end if user mid-medication-pick wants to fix age/weight
- Active step card renders below chips, not in place of them

### File 4 (CSS for Individualized card) — COMPLETE
- All `individualized*` classes added to `DosageCalculator.module.css`
- Blue-bordered card with two-line header treatment, blue range box, amber controlled-substance box, brand-green sources footer
- Renders correctly for all 9 individualized meds (6 controlled + 2 insulins + warfarin)

### Next session priorities (updated)
1. **Interaction Checker — Prescription gating** — import PrescriptionAcknowledgmentModal, gate first prescription selection in the interaction checker's MedPicker. Uses shared `kyr_rx_acknowledged` sessionStorage key.
2. **Interaction database dump** — 60-80 pair-wise entries (next major content push). Important: this needs to handle controlled substances thoughtfully — likely "limited data / consult prescriber" verdicts rather than naming specific interactions for Schedule II/IV drugs.
3. **Clean Brands page** — content additions + likely rename to "Clean OTC Options" or similar

## SESSION UPDATE — May 24, 2026 (Part 2)

### Interaction database architecture LOCKED

The interaction system will have THREE LAYERS working together:

**Layer 1 — Class Rules (NEW)**
- Detects cumulative stacking patterns across categories
- Sits ABOVE pair-by-pair results in UI
- 7 rules at launch (no "coming soon")
- File: `lib/interactionClassRules.js`

**Layer 2 — Pair-wise Interactions (EXISTING)**
- Current schema is pharma-grade — DO NOT CHANGE
- Grows to ~80 entries via class-based content batches
- File: `lib/interactionData.js`

**Layer 3 — Single-med Lookup (EXISTING)**
- Already built — gets richer as Layer 2 grows

### The 7 Class Rules (locked)

| Rule ID | Icon | Severity | Threshold |
|---|---|---|---|
| `bleeding_stack` | 🩸 | avoid | 3 |
| `sedation_stack` | 🧠 | avoid | 3 |
| `serotonin_syndrome` | 🌀 | avoid | 2 |
| `cardiovascular_stress` | 🫀 | caution | 3 |
| `liver_stress` | 🫁 | caution | 3 |
| `absorption_block` | 🥛 | caution | 2 |
| `dehydration_diuretic` | 💧 | caution | 3 |

### Threshold philosophy
- **Threshold 2** = acute risk that compounds fast (serotonin syndrome can kill within hours; absorption block defeats meds immediately)
- **Threshold 3** = dose-cumulative effects where 2 is usually fine but 3+ adds genuine risk

### Class membership via `pharmClasses` tag (NOT hardcoded keys)
Each med in `medsData.js` gets an optional `pharmClasses: []` array. Engine matches by tag. Reasons:
- Future meds auto-participate by getting tagged
- One source of truth (medsData.js)
- Multiple class membership per med (tramadol is BOTH opioid AND serotonergic)

### Tone rule (LOCKED for class rule copy)
- ALWAYS use goal-framing: "If your goal is X, consider Y"
- NEVER prescriptive: no "stop taking" or "switch to"
- Mirrors site brand voice: "honest always, no agenda"

### UI Layout (LOCKED)
Class warnings render BETWEEN `<VerdictBanner />` and `<SelectedStack />`. Max 3 visible, "+N more" collapsible if 4+.

### Content batch order (when we start writing pair entries)
1. NSAIDs
2. Sedatives (benzos × opioids × Z-drugs × antihistamines)
3. Anticoagulants (warfarin, apixaban × NSAIDs, ginkgo, vitamin K foods)
4. SSRIs/serotonergic
5. CYP3A4 substrates (statins × grapefruit, antibiotics)
6. Diabetes meds (metformin, semaglutide × alcohol, contrast)
7. Thyroid (absorption interactions)
8. Cold meds (decongestants × stimulants, MAOIs)

### Controlled-substance pair pattern (HYBRID)
- Concrete data for well-documented deadly combos (e.g., benzo + opioid — FDA black box)
- "Limited data — consult prescriber" pattern for less-documented Schedule II/IV pairs
- Mirrors the Dosage Calculator's "Prescription-Individualized" approach

### Next session priorities (updated)
1. **Class rule implementation** — tag medsData.js + build `interactionClassRules.js` + UI component
2. **Pair-wise content batches** — start with NSAIDs class group
3. **Clean Brands rename + content** — likely "Clean OTC Options"