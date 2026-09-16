KnowYourRemedy.com — Project Notes

This is the single source of truth for project context, decisions, and current state. If you're a new Claude starting a session: read this entire file before responding to anything. Brandon paste-references this file at the start of every chat.

Last Updated: September 16, 2026 (Thrive leftover §5 stamps; mineral drops IN; Thrive still live next)

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

================================================================
⚡ SESSION LOCK — September 12–13, 2026 (read with How Brandon Works)
================================================================

Bots (Sept 16, 2026)
- KYR = old catalog bot. Dead for new work.
- KYR2 = old UI / early photo thread. Dead for new work unless Brandon reopens it.
- KYR3 = daytime CATALOG. One brand at a time. New rows: grade + UPC/set-id in the same write when carton / brand site / store PDP / DailyMed has a code. No invented codes. No code ≠ no row — list missing UPCs.
- KYR4 = PHOTO bot only. No catalog. No barcodes. No methodology. Night 12:30 / 12:45 / 3:15 / 5:45 photo cron is OFF as of Sept 16. Photos run when Brandon pastes “run N batches now.” Cap = 20 per batch. Usual catch-up = 2 batches (40). Carton → official brand mark → letter only if unattempted. Photos MAY merge. “Merge if GitHub UI flakes.” After all 9 aisles, restart at Pain & Fever for rows added after the first pass.
- KYR5 = NIGHT BARCODE backfill on rows already on main (~600+ and growing). Pain & Fever first, then the rest. Sources only: carton, brand site, store PDP, DailyMed. Pack-size variants share formulaId; extra UPCs attach — do not duplicate rows. Test runs = PR ONLY. Do not merge until Brandon says the factory is clean. Do not grade, photo, hide, or edit methodology.
- Do not stack two coding-bot jobs in one chat. Do not open a new bot every calendar day. New bot only when a thread is fat.
- Cursor = notes, git pull, npm run dev, end-of-day notes. GitHub Merge ≠ git pull.

How Brandon wants work done
- Sidebar first. No bot paste until he says “go.”
- Visual changes: sketch first, then paste. Do not ask him to imagine layout.
- One combined paste per job. Never split instructions.
- Do not start a second bot job while one is running.
- Walk Git like a novice. Only send paste text when it is time to send it.
- Founder owns grades. Batch verdicts from the KYR catalog era were methodology-applied then Brandon-skimmed — treat those as approved unless he says that batch never got a look.
- New ungraded inactive still = 7-step packet + Brandon. Do not invent a live grade.
- Display map stays in lib/clean-picks/verdictLabels.ts. Internal keys clean/caution/avoid. User sees Clean / Usable / Not clean. Usable still maps from caution + “Fine in moderation.” Not clean maps from avoid; color stays #c0392b. Do not rewrite draft verdict keys. Not a methodology grade change.

LAUNCH WEIGHT
- Row exists = coverage.
- Barcode / set-id = the scanner works.
- Carton photo = polish.
- ~600+ rows on main still need barcode backfill (KYR5). Forward catalog (KYR3) attaches UPC when the source has it.

FOUNDER CALLS — MAJORITY RULE
- New inactive / not in §5: 7-step packet + Brandon. Do not default Caution because the table is blank.
- Packet = METHODOLOGY.md on MAIN + a handful of sources. FDA is one source, not a veto. Include integrative sources when the question is harm-in-this-form.
- Majority wins. 1 scare paper out of 10 ≠ Avoid. 1 “it’s fine” out of 10 ≠ Clean. Split → bring the split to Brandon. Do not invent a grade.
- Methodology table updates on MAIN BEFORE KYR3 gets the write paste.
- Vague vs named twins need tap + honest-note text. Honest always.

BRAND-CLOSE WORKFLOW
- Finish the brand you started. Do not hop brands.
- No SKU skip. Missing OI = hunt then write or refuse. Stash only if founder calls a Sprouts-style pile.
- Bot scans the WHOLE in-scope US line first. Questions come here BEFORE the write. One merge should close the brand.
- Sidebar first. No bot or Cursor paste until Brandon says go or ready.
- Missing panel: advisor names the next SKU; Brandon hunts one-by-one (store site → DailyMed → NIH DSLD → founder photo). Minerals under the Supplement Facts bar are actives, not Other Ingredients. No Google-LLM ingredient lists.
- SPROUTS-STYLE EXCEPTION: if walk-up / gallery OI is ~25+ still-blocked panels, Brandon MAY stash leftovers so the gradeable chunk merges. Stash is founder call. Stashed names stay in this file.
- After a brand closes, log date/time on the roster. After Thrive write lands, add roster line + date/time. Not before.

Catalog status (do not invent “unsigned grades”)
- lib/rating-drafts/ is large (aisle batches through Amazon Basic Care / PR 32 and prior). Unverified as PRODUCT FILES (barcode/photo/exact-SKU check), not “grades never decided.”
- No new catalog batch unless Brandon asks.
- B-Alive store scrape was scrapped. Store may be a later hunt list for missing Clean swaps. Not a batch now.
- Preview pack shots ONLY (exact SKU): public/scan-preview/alka-seltzer-gold.jpg, phillips-mom-original.jpg, tums-ultra-fruit-dyed.jpg.

IMAGE FALLBACK (locked Sept 13)
1) Exact SKU carton if found or founder sent a DailyMed/brand link.
2) If we TRIED that SKU and have no matching carton → official brand mark from the brand’s own site. Not verifiedSku. Not a letter.
3) Letter avatar ONLY if we have not attempted that SKU yet.
Blank tile ≠ skipped. Attempted-but-no-box must not stay a letter.
- Don’t half-dress launch to hit a date.
- Cap-15 in KYR2 is a chat leash. Launch photos = later factory after barcodes.
- US only for now. Don’t add discontinued US SKUs to Search; hide when Brandon confirms dead.
- Brandon will send DailyMed/brand links for unsure cartons.

App preview route: /scan-preview (Vercel + localhost)
Four tabs: Home · Scan · Search · Cabinet. Marketing site header/old QuickNav hidden on this route.
Draft Clean/Usable/Not clean pills at the top are PREVIEW ONLY (flip sample SKUs). Not in the real app.

POST-SCAN (locked template)
- Full-width grade bar, word + subline centered, star right. Colors: Clean #27ae60, Usable #d97706, Not clean #c0392b. Internal key for Not clean stays avoid. No 0–100. No page wash.
- Small header tile + name/brand. Image coming + ＋ toast if no exact-SKU photo.
- Active ingredients · N compact under the name, collapsed, no dots (unless existing activeSafetyFlag).
- Honest note: WHITE card #fff, green stripe #2d4a3e, hairline #ece7de, collapsed, no paper icon. Product-level summary on the three preview SKUs. Not methodology jargon.
- Inactive ingredients: small Blue B label. One open list, concern first. Color mark LEFT of name only (no extra hex/check icons). Tap = white why panel. Wording High risk / Moderate risk / Limited risk / Cleared.
- Cleaner carousel on Usable + Not clean only (internal caution + avoid). Heading in Clean green #27ae60. Empty line exact: “No cleaner match on this shelf yet.” Do not invent a Clean product.
- No Overview tab. No Photos tab.

SEARCH (locked)
- Empty: search field + 2-column use-category TILES.
- Use categories only. Homeopathic is NOT a shelf. Allergy + Allergies = one Allergies tile. Prenatal is its own tile (not stuffed only under Vitamins).
- Pain rubs live under Pain & Fever with the swallow SKUs. Wound care / antibiotic ointment stays First Aid. Do not invent a third “Topical” aisle.
- Tap category: A–Z list; tiles become a thin chip row; then Clean/Usable/Not clean filter chips (multi). Type further filters that list.
- Type from the FIRST letter with NO category: matches by name/brand, cap ~35, “Keep typing to narrow” if more exist; hide category chips AND hide verdict chips.
- Back from a product restores the same Search state.
- Rows: thumb, name, brand, display badge. Draft · unverified cue once. Tap → post-scan.

HOME
- Tab Home. Page title “Know Your Remedy.”
- Dummy Scan (toast “Scanner coming soon”).
- “Previously viewed” (not scanned), newest first. Any post-scan open adds to this list.
- localStorage for this preview only.

CABINET
- Cupboard tab icon.
- 1-second doors-open (CSS/illustration, not a video file), then list.
- Group by use category, headers A–Z, header only if that category has a saved item.
- Star persists until unstar. Viewing ≠ starring.
- localStorage for this preview only.

Parked
- Real barcode camera / UPC fill
- Catalog photo factory (night routine + barcodes). Digestive demo aisle is filled; other aisles follow the night order.
- User photo upload + review queue
- Accounts / cloud sync of Cabinet
- App icon + trademark: see APP ICON + TRADEMARK (parked Sept 15 night). Do not file from a bot chat.
- docs/SOURCES.md = working bibliography for founder-call packets. Methodology §4a still owns the hierarchy and the grade. Fill this file as packets cite new refs. Worwood = oils info-only (Valerie Ann Worwood — spell it Worwood, not Norwood).
- Advisor-chat handoff letter lives with Brandon + this file; new advisor reads GitHub MAIN notes + methodology, not a Project pin. Sprouts stash is founder walk list ≈55 plus 3 refused names in batch36 header. Full name list may still sit in the old advisor thread until copied.
- Do not reopen Search / post-scan / Home / Cabinet unless broken.

Next session
- Live catalog job = Thrive hole punch. Sprouts house is stashed (~55 + 3 refused). Do not catalog Sprouts. Do not reopen 187.
- After Thrive write lands, add roster line + date/time. Not before.
- Brand-close: no SKU skip. Missing OI = hunt then write or refuse. Stash only if founder calls Sprouts-style pile.
- KYR4 photos on paste only. Cron OFF.
- KYR5 PR-only until founder OK.
- Before proposing a brand, read lib/rating-drafts/ filenames. batch37–49 already exist.
- Oils bottles: hunt-list only (name + URL). Never Search-graded.
- Do not reopen Search / post-scan / Home / Cabinet unless broken.

================================================================
APP ICON + TRADEMARK (parked Sept 15 night; do not file from this chat)
================================================================
APP ICON (locked direction, not shipped as a store asset until Brandon exports)
- Field: cream / warm paper, not white-white, not wellness mint.
- Device: green rounded-rect “scan window” (KYR green family, ~#2d4a3e).
- Type: KYR inside the window. Not the full Know Your Remedy sentence in the icon.
- Under the letters: short barcode-style pill (scan cue). Not a real UPC. Not a camera glyph. Not a leaf.
- No slogan on the icon. No “scan clean live honest.”
- iOS: 1024×1024, no rounded-corner baked in (Apple rounds it). Android adaptive: keep the scan box inside the safe center.
- Use this as the working mark for TestFlight / Play internal when Brandon is ready. Do not treat a chat mock as the final PNG until he exports it.

TRADEMARK / NAME (direction only — not legal advice, not a filing)
- Product name: Know Your Remedy. Use ™ on the name in UI/marketing until a registration issues, then ®.
- Domain (knowyourremedy.com) is NOT a trademark.
- Shipping an app listing under that name is use in commerce. It is not a registration.
- First filing to discuss with counsel: US word mark, Nice Class 009 (downloadable software / mobile app). Logo mark can wait.
- Ballpark Brandon heard: USPTO word-mark filing often ~$1k–$2k all-in if the ID is clean; logo mark later is extra. Confirm live USPTO fees + attorney quote before paying anyone.
- Brandon personally knows Richard Aaron at Dowling Aaron (Fresno) for an introduction. A simple word-mark file can be DIY; still smart to have a lawyer glance the ID and specimens.
- Do not file from a bot. Do not publish a specimen strategy as if it were filed. Park until Brandon books the intro or files.
- Canada/EU marks: not now. US app first.

Advisor handoff: new advisor reads GitHub MAIN notes + methodology, not a Project pin. Sprouts stash is founder walk list ≈55 plus 3 refused names in batch36 header. Full name list may still sit in the old advisor thread until copied.

Brandon standards (handoff)
- Don’t half-dress the catalog or UI to hit a launch date.
- US only until the US scanner ships. No Canada/EU work now.
- Exact carton when confirmed. Else official brand-mark fallback (not verifiedSku). Never glue the wrong flavor/size.
- Cap 15 is a chat-bot leash. Launch photo factory is a later batch (barcode/set-id → DailyMed → keep/skip).
- Blank tile ≠ skipped. Skips need a reason (uncertain carton / no US pack shot / discontinued).
- Founder may Google unsure SKUs and send DailyMed or brand-page links; then one wire paste.
- Discontinued US SKUs: do not add to live Search. Hide when founder confirms dead. Don’t mass-delete tonight.
- Culturelle kids “coconut gummy” is a bad draft name (product doesn’t exist) — leave unimaged until the name is fixed.
- Pedialyte “flavored” is too broad to attach a carton — split flavors before imaging.
- Display badges: Clean / Usable / Not clean. Keys stay clean / caution / avoid.
- Prenatal is its own Search shelf. Allergy+Allergies = Allergies. Homeopathic is not a shelf.
- Pain rubs file under Pain & Fever with swallow SKUs. Wound care / antibiotic ointment stays First Aid. Do not invent a third “Topical” aisle.
- New Grok/Project chat: read PROJECT_NOTES + METHODOLOGY first. Do not assume old chat memory. New Grok reads GitHub MAIN, not a Project pin.
- Brandon is full-time on KYR until mid/late November, then back to his day job. Use this window for founder locks (grades, display words, dead SKUs, carton confirms). Don’t spend it on markets we won’t ship or on 15-photo loops he could skip.

NIGHT / GROK BOT ROUTINE (Sept 16)
- Photos are ON-DEMAND on KYR4. Three-wake photo cron is OFF until Brandon turns it back on.
- Old cron math (if turned back on): 20 × 2 batches × 3 wakes = 120/night. On-demand uses whatever Brandon types.
- Aisle order unchanged: Pain & Fever → Cold & Flu → Allergies → Sleep → Immune → First Aid → Vitamins → Prenatal → Digestive. Then restart at Pain & Fever.
- Night barcodes = KYR5, PR-only until founder OK. Launch needs a ROW and a CODE. Photos are polish.
- Daytime extra photo batches only when Brandon orders them. Never add a one-off to the cron.
- Photo / barcode bots may NOT: invent grades, new inactives, UI, hide/delete, Canada/EU.

SCOPE PARKS
- Park for good (food/drink-shaped): protein powder, protein bars, meal-replacement shakes, Pedialyte-class drinks (Pedialyte, Liquid I.V., Gatorade-style, freezer pops). Pedialyte-class chug drinks stay OUT.
- Mineral / ionic drops with Supplement Facts + dropper = IN (medicine-aisle supplement). Not a Pedialyte-class chug drink.
- Exception drinks/powders that STAY in scope: lifter supplement powders (creatine, pre-workout, aminos) — in scope, low priority. Not whey/meal shakes.
- Protein powder remains schema-only / deprioritized as already noted. Do not night-photo a protein aisle.

NIGHT PHOTO AISLE ORDER
1 Pain & Fever
2 Cold & Flu
3 Allergies
4 Sleep
5 Immune Support
6 First Aid
7 Vitamins
8 Prenatal
9 Digestive
Digestive is not “closed forever.” New drafts will refill it. Night bot always takes the first aisle in this list that still has blanks, letters, or missing marks.

NIGHT SCHEDULE
- Photo cron OFF as of Sept 16. Do not restart 12:30 / 12:45 / 3:15 / 5:45 until Brandon turns it back on.
- KYR4 photos: on-demand only. Cap 20/batch. Usual catch-up 2 batches (40) unless Brandon types another N.
- KYR5 barcodes: PR-only until founder says the factory is clean. Pain & Fever first.

CATALOG STRATEGY
- Build by BRAND, in-scope US OTC/vitamins/supplements only — not every SKU the company makes (no food/pet/cosmetics).
- Keep a brand roster with seen-at stores: Sprouts, CVS, Walgreens, Target, Walmart, Costco, Sam’s, Thrive, etc. Stores = coverage tags, not a second catalog.
- Same product at two stores = ONE row. CVS and Sprouts both selling the same MegaFood bottle must not create two drafts. Before adding: match brand + name + form + strength against existing drafts. Pack-size / barcode variants share formulaId and the same grade. Do not invent a second grade.
- Next catalog day: Thrive hole punch is the live KYR3 job. Sprouts house stays STASHED. Do not catalog Sprouts.
- Culturelle kids coconut gummy = bad draft name. Pedialyte flavored = too broad until split.

================================================================
BRAND CATALOG LOOP (locked Sept 14, 2026)
================================================================
Team: Advisor answers from methodology + notes. Founder owns grades and pulls cartons when the web has no Other Ingredients line. Coding bot writes files. Cursor = notes / git pull / npm run dev / end-of-day notes.

How a brand job runs:
1) Bot scans the WHOLE in-scope US line for that one brand.
2) Before writing rows, bot brings EVERY question here: missing Other Ingredients (OI), inactive not in Methodology §5, scope gray area.
3) Advisor answers from v1.6 + locked table. New inactive = packet + founder. Do not invent a live grade.
4) If OI cannot be found on MegaFood.com / Thrive / Sprouts / Whole Foods / Amazon US, advisor asks founder for a Supplement Facts photo.
5) Only after calls are answered does the bot write the batch, wire Search like other drafts, merge to main, and say “On main.”
Do not ship 90 and block 13 as the default. Questions first, one write.

See SESSION LOCK: LAUNCH WEIGHT / FOUNDER CALLS — MAJORITY RULE / BRAND-CLOSE WORKFLOW (Sept 16).
- Finish the brand you started. Do not hop brands.
- Methodology table updates on MAIN BEFORE KYR3 gets the write paste.
- New writes include UPC/set-id when the carton / brand site / store PDP / DailyMed has a code. No invented codes. No code ≠ no row — list missing UPCs.
- SPROUTS-STYLE EXCEPTION: if walk-up / gallery OI is ~25+ still-blocked panels, Brandon MAY stash leftovers. Stash is founder call. Stashed names stay in this file. Stash only if founder calls a Sprouts-style pile.
- Missing panel hunt: store site → DailyMed → NIH DSLD → founder photo. Minerals under the Supplement Facts bar are actives, not Other Ingredients. No Google-LLM ingredient lists.
- No SKU skip. Missing OI = hunt then write or refuse.
- After a brand closes, log date/time on the roster. After Thrive write lands, add roster line + date/time. Not before.

Scope:
- In: US OTC / vitamins / supplements, including supplement-aisle powders (example: MegaFood Daily Turmeric Nutrient Booster Powder) and mineral / ionic drops with Supplement Facts + dropper (medicine-aisle supplement).
- Out: food, pet, cosmetics, protein-aisle protein powder / bars / meal shakes, Pedialyte-class drinks (chug bottles stay OUT), Canada/EU-only, discontinued US SKUs (list “looks discontinued,” don’t hide other brands).
- Same product at two stores = one row. Match brand + name + form + strength. Pack sizes share formulaId and one grade.

Seed / industrial oils (LOCKED v1.6 — do not expand without a new founder lock):
- Avoid in gummies / soft chews only (soybean, canola, palm, safflower, sunflower, “vegetable oil”). Tablet / capsule / softgel / drop fill of Organic Palm Oil, High Oleic Safflower Oil, or Medium Chain Glycerides is NOT that High rule (tap both sides).
- Capsule / softgel oil fill is NOT that High rule.
- Liquid-drop oil carriers use the same non-gummy rule as capsule/softgel fill. Tap text required (same both-sides sentence).
- Cream / topical vegetable oil uses the same non-gummy rule as capsule/softgel/liquid-drop fill. Tap: “Seed/industrial oils are flagged in gummies. In this cream they are not that High rule.”
- Coconut oil alone in gummies/chews is NOT seed-oil High (already practice; now in Methodology §5 Cleared).
- Canola / soy / sunflower lecithin stays Cleared (same lecithin lock; canola named explicitly).
- On every capsule/softgel/liquid-drop row that lists those oils as a fill, say this in BOTH honestNote AND the ingredient tap/source text: “Seed/industrial oils are flagged in gummies. In this capsule/softgel/liquid-drop fill they are not that High rule.”
- On every cream / topical row that lists vegetable oil / seed oil as a base, say this in BOTH honestNote AND the ingredient tap/source text: “Seed/industrial oils are flagged in gummies. In this cream they are not that High rule.”

Sept 14 founder calls for NEW inactives (MegaFood leftovers — do not reopen §5 locks):
- Pea protein isolate = Cleared-class food protein.
- Paprika extract as color = Caution (color/opacity).
- Sodium copper chlorophyllin = Caution (color additive).
- MCT: coconut-only = not gummy High. Unlabeled MCT source = Caution opacity, not Avoid.
- “Rice” / “rice extract” is NOT the rice-hull Clean lock. Rice flour/starch = Cleared starch. Unspecified “rice extract” = Limited opacity row until the carton says hull / concentrate / hulls / bran.
- Organic rice bran extract = Cleared (Methodology §5, locked with hull/concentrate family). Unspecified “rice extract” = Limited opacity (now its own §5 row).
- New inactive not in §5: discuss + lock in methodology BEFORE the brand write. Do not default-Caution just because the table was empty. Audit list 2 still pending founder lock; no default Caution for missing-row.

INGREDIENT TAP COPY (locked Sept 14, 2026)
Honest always. Every flagged or context-scoped inactive needs a plain-language why in the collapsed ingredient panel — not jargon, not “unsafe.”
- Vague label (unspecified rice extract, unnamed flavor class, undisclosed caramel class, etc.): say the label did not name the form/class, so we mark Caution until it does. Named locked forms stay whatever §5 says.
- Vague vs named twins: when two label strings look related but grade differently (named hull vs “rice extract”; paprika extract vs “color added”; citrus extract vs lemon oil; seed oil in gummy vs capsule/drop), the vague twin’s tap must explain the named twin. Honest always.
- Form-scoped rules (seed oils in gummies vs capsule/drop fill): say both sides in that ingredient’s tap text so users don’t think we grade sunflower two different ways for no reason.
Honest note = product-level summary only. Do not dump every ingredient essay there unless one driver is the whole story.

Organic rice bran extract = Cleared (§5). Unspecified “rice extract” = Limited opacity + the vague-form tap sentence.

Sept 14 inactive locks (now in Methodology §5 — do not reopen):
- Organic rice bran extract = Cleared (rice-hull family). Unspecified “rice extract” = Limited (opacity).
- Pea protein isolate = Cleared (food protein excipient).
- Organic beet root (food / excipient / color-food) = Cleared (whole-food, not a synthetic dye).
- Organic acerola = Cleared (food fruit).
- Honey (oral sweetener) = Cleared-class sweetener. Tap + honest: not for under 1. Not Avoid.
- Paprika extract / capsanthin as COLOR only = Cleared (named spice color; same as turmeric-as-color). Unnamed “color added” stays Caution. Named lock supersedes the leftover paprika Caution line above.
- Black carrot / named fruit-or-vegetable juice concentrate as COLOR = Cleared (named plant color; same posture as paprika / turmeric-as-color).
- Sodium copper chlorophyllin (E141) = Caution (copper-complex color, not raw chlorophyll / parsley). Not High/Avoid.
- Organic cultured dextrose = Caution (ferment preservative, not dextrose/cane sugar sweetener). Not Avoid.
- Natural citrus extract (unnamed fruit/part) = Limited / Caution opacity. DailyMed CITRUS FRUIT UNII still not lemon vs peel.
- Named lemon oil as flavor = Limited (flavor row). Named is not a Clean auto-pass.
- Unspecified “rice extract” = Limited opacity row (now in §5). Tap still uses the vague-form sentence.
- “Natural flavor” stays Limited as already written.
- Vague form tap copy stays: say the label didn’t name the form/class, so we mark Caution until it does. Vague twin must explain the named twin. Honest always. Honest note stays product-level.
- Agar / agar-agar = Cleared (seaweed gel; gum/fiber family with pectin).
- Dibehenin (vegetable) = Cleared (vegetable wax/lubricant; stearate / wax family).
- Grape seed extract as inactive = Cleared (named plant-part food botanical). Not grape seed oil unless the label says oil. Not a High row.
- Named food/botanical extracts as oral inactive (fennel seed, chamomile flower, calendula, lemon balm leaf, and like named plant-part food botanicals) = Cleared. Same class as grape seed extract. Not flavor-opacity. Do not Caution the product on these extracts alone. Sept 15, 2026 Soothing Drops leftovers.
- Rice (unspecified) = Limited/Caution opacity, same bucket as unspecified rice extract. Tap: label didn’t name hull, bran, flour, protein, concentrate, or syrup.
- Limited-only stack stays Caution (Usable). Any number of Limited flags does not become Avoid. Avoid requires a High-tier inactive (or an explicit founder/active-safety cap). Silicon dioxide remains a 0-pt Caution cap and does not push Avoid. Harm-first, not a Yuka point ladder.
- Glycyrrhiza extract / licorice extract (oral inactive) = Cleared. Named botanical. Do not Caution the product on licorice alone. High-intake glycyrrhizin BP/potassium literature is a tap + honest-note line, not an auto-Caution at cough-syrup dose. Majority Tier-1 file; FDA is one source, not a veto. Tap + honest-note line (exact): “Licorice extract. Very high intakes of glycyrrhizin can affect blood pressure and potassium — that is not this syrup dose.”
- Wood rosin / colophony (topical) = Caution (contact-allergy pattern). Not Avoid. Confirmed in §5.
- FDA is one source, not a veto.
- Petrolatum (topical) = Cleared (first-aid ointment base).
- Stearyl alcohol / cetearyl alcohol (topical) = Cleared (fatty alcohols).
- Sodium stearoyl glutamate = Cleared (stearate-family emulsifier).
- Lactic acid / malic acid = Cleared (organic acids with citric).
- FOS / fructooligosaccharides / soluble tapioca fiber syrup = Cleared (fiber family with inulin / tapioca syrup).
- Alcohol / ethyl alcohol as a VEHICLE = Limited (oral homeopathic liquid or topical first-aid). Not Avoid. Tap: alcohol is the vehicle, not the gummy seed-oil High rule. Distinct from drinking alcohol as an active.
- Arachidyl alcohol / arachidyl glucoside / behenyl alcohol = Cleared (fatty-alcohol family).
- Hard fat (suppository base) = Cleared.
- NaOH as pH adjuster = Cleared.
- Dimethicone copolyol = Cleared with dimethicone.
- Lactobacillus ferment (topical) = Caution (ferment system).
- L-carvone = Limited (flavor isolate).
- Caprylyl glycol / hexanediol / sorbic acid = Limited (preservative family).
- Shea butter / coconut oil / sweet almond oil in cream or topical = not the gummy seed-oil High rule. Form tap required.
- Acrylamide / sodium acryloyldimethyltaurate copolymer, chlorhexidine digluconate, isohexadecane, sorbitan oleate = Caution. Not Avoid.
- PS80 stays the existing Moderate row.
- Gemmotherapy IN as follow-up (full US shop).
- Cetyl palmitate = Cleared (wax ester; fatty-alcohol / wax family).
- PEG / PEG-stearate / lauroyl macrogolglycerides sit on the existing PEG Moderate/Caution row.
- Arnicare Cream setid 542b41dd = PEG-family Caution + cetyl palmitate Cleared.
- Dead lemon Arnicare Leg Cramps SPL (setid 6b658f98) = discontinued comment only. Do not write that carton. Current unflavored meltaway is setid 051a4e17.
- Lavender oil (topical) = Caution, fragrance-style (same posture as fragrance / parfum). Not Avoid. Sept 15, 2026 founder carton.
- Wintergreen extract (topical inactive) = Caution. Not Avoid. Sept 15, 2026 founder carton.
- Rebaudioside M / Reb M = Cleared (high-purity steviol glycoside sibling of the stevia lock). Sept 15, 2026.
- Vegetable oil in a cream / topical = NOT the gummy seed-oil High rule. Same form-scope as capsule / softgel / liquid-drop fill. Tap both sides.
- Rice bran oil as softgel/capsule fill = Cleared (carrier oil). NOT gummy High. NOT the same row as organic rice bran extract. Tap form sentence required.
- Organic pullulan = Cleared (starch capsule polymer; HPMC-family vegan cap).
- Caramel sugar syrup (named syrup, lozenge sweetener) = Cleared (food sugar). NOT caramel color / E150d.
- MCT oil labeled coconut (oral capsule/softgel/liquid supplement, not a cooking-oil bottle) = Cleared (notes lock).
- Unlabeled MCT = Limited (opacity). Not Avoid.
- Peppermint oil / orange essential oil as flavor = Limited (flavor/EO line). Not gummy High.
- Unspecified resin = Caution (label didn’t name the resin).
- Magnesium trisilicate = Caution (silicate-adjacent filler). Not the SiO2 0-pt cap. Not Avoid.
- Bottle / cooking oils stay info-only. Never a Search grade.
- PARKED OILS HUNT: when a brand sweep hits an oil bottle (e.g. Sprouts Organic MCT Oil), record name+URL only. Do not grade. Do not add to Search. oilInfoRecord page later.
- Store-brand PDPs are not OI. Bot reads gallery/Ingredients photos + DailyMed first. Founder photos only on misses.
- Safflower oil / soybean oil as CREAM or OINTMENT base = Cleared. Not gummy High. Tap form.
- Sunflower seed wax = Cleared (wax ≠ oil; carnauba family).
- Aloe as topical base = Cleared.
- Paraffin + mineral oil as topical ointment occlusive = Cleared (petrolatum neighborhood). Tap: not an oral oil.
- Witch hazel topical astringent = Cleared.
- Glycol stearate, isopropyl myristate, stearyl heptanoate = Cleared (topical emollients).
- Oat in oral syrup (named food soother) = Cleared.
- Barley malt (syrup/sweetener) = Limited. Not Avoid.
- Sodium polyacrylate / polyacrylic acid (topical gel polymer) = Caution. Not Avoid.
- Pine needle oil, citronella oil, eucalyptus oil, jojoba oil as gel inactives = Caution (fragrance/EO line).
- Isomaltooligosaccharides (IMO) = Cleared (prebiotic fiber / inulin neighborhood).
- Soluble corn fiber = Cleared (fiber; ≠ maltodextrin).
- Ethylcellulose = Cleared (cellulose coating family).
- Oleic acid = Cleared (fatty-acid / stearate cousin).
- Riboflavin used as color = Cleared (named B2).
- Candelilla wax = Cleared (wax family).
- Gum ghatti = Cleared (gum family with acacia/xanthan).
- Allulose = Limited (novel sweetener; not Avoid).
- Maltose = Limited (with the sugars).
- Modified starch = Limited (unspecified starch).
- Sucrose fatty acid esters = Caution (synthetic emulsifier; not Avoid).
- Calcium silicate = Caution (silicate anti-caking; Mg trisilicate neighborhood). Not the SiO2 0-pt cap.
- Potassium hydroxide = Cleared (pH adjuster, trace). Not a grade driver.
- Sorbitan (plain / sorbitan esters as emulsifier) = Caution (polysorbate neighborhood). Not Avoid. Not the same row as sorbitol. Do not flip tylenol-8hr-peg. Hydroxyethylcellulose / hydroxyethyl cellulose is now Cleared (exact tokens) — no longer parked.
- Triacetin = Cleared (tablet/caplet coating plasticizer). Not a grade driver.
- Parabens (methyl, ethyl, propyl, butyl) = High in every form, including rubs and patches. Not a topical exception.
- Carbomer / carbomer copolymer / carbomer interpolymer = Cleared (widens the homopolymer row).
- Cetearyl olivate, sorbitan olivate = Cleared.
- Isopropyl palmitate, isopropyl laurate = Cleared (IPM family).
- Cetyl esters wax, emulsifying wax = Cleared.
- Cocoyl caprylocaprate = Cleared.
- Pentylene glycol, propanediol = Cleared.
- Linseed oil in lotion/cream fill = Cleared. Not gummy High. Tap form.
- DEGEE / ethoxydiglycol = Caution. Not Cleared.
- Dimethyl isosorbide = Caution.
- Vanillyl butyl ether = Caution.
- Fragrance / parfum already in §5 Caution — do not duplicate.
- Clove oil, boswellia oil, thymus / flower oils as lotion scent = Caution (fragrance/EO line).
- Acrylamide–AMPS copolymer; DMAEMA copolymer; vinyl caprolactam / vinylpyrrolidone copolymer = Caution (widens the existing AMPS row).
- Oleth-3-phosphate = Caution.
- Polyoxyl 20 cetostearyl ether = Caution (PEG-ether family).
- Strong ammonia solution = Caution.
- Aminomethyl propanol = Caution.
- Isopulegol, menthoxypropanediol = Caution.
- Isobutane, isopentane, propane (pain-spray propellants) = Caution.
- Isocetyl stearate = Cleared (topical emollient / stearate cousin).
- Isopropyl alcohol = Limited (alcohol vehicle family). Not Avoid. Tap if useful vs ethyl alcohol.
- Potassium chloride = Cleared (salt / electrolyte). Not a grade driver.
- Pain rubs stay Pain & Fever (with swallow SKUs). No third Topical aisle.
- Glyceryl stearate = Cleared.
- Diisopropyl adipate = Cleared.
- Urea (topical) = Cleared.
- Tartaric acid = Cleared.
- Allantoin = Cleared.
- Kaolin = Cleared.
- PVA (topical film) = Cleared.
- Methyl glucose dioleate = Cleared.
- Avocado oil as cream fill = Cleared. Not gummy High. Tap form.
- Sunflower seed wax already locked Cleared — do not duplicate.
- Jojoba esters = Cleared (wax / emollient). Jojoba OIL stays Caution as scent / gel inactive.
- Steareth-2, steareth-21 = Caution.
- Ceteth-20 phosphate = Caution.
- PPG-5-ceteth-20 = Caution.
- PEG-15 cocamine = Caution.
- Nonoxynol-30 = Caution.
- Ethylhexylglycerin = Caution.
- Hydroxyacetophenone = Caution.
- TEA / trolamine as inactive = Caution (not the salicylate active).
- Farnesol = Caution.
- 4-t-butylcyclohexanol = Caution.
- Grapefruit oil, spearmint oil, cajuput oil, cassia oil, dementholized mint = Caution (fragrance/EO line).
- C30-45 alkyl dimethicone / C30-45 crosspolymer = Caution.
- Caprylyl methicone = Caution.
- Acrylate / acrylamide copolymers not already locked = Caution (widens the AMPS row).
- Aluminum glycinate = Caution.
- Hydrotalcite = Caution.
- Latex = Caution.
- Rosin esters / terpene resin / SIS / polyisobutylene (patch adhesives) = Caution.
- Menthyl lactate = Caution.
- LPG / liquefied petroleum gas = Caution.
- Synthetic beeswax = Caution (distinct from Cleared beeswax).
- Methylated spirit = Limited (same alcohol-vehicle row as ethyl alcohol). Do not invent a second alcohol class.
- Topical talc in a cream/patch = Caution. Not the oral-talc High swallow rule. Tap form.
- DMDM hydantoin / diazolidinyl urea = Caution (formaldehyde-donor). Not Avoid unless founder later bumps. Other formaldehyde-releasers stay parked.
- Polysorbate 60 = existing polysorbate Moderate row. Do not duplicate.
- Polysorbate (unspecified) aliases the existing P80/P20/P60 Moderate row so “polysorbate” matches. Do not invent a new class.
- Remaining Icy Hot / Aspercreme / Salonpas / Tiger Balm leftover table is on §5 — do not re-add those strings.
- Patch backing / adhesive plaster / film / baking cloth are backing/device, not gradeable inactives. Do not block a row on those words.
- Pain rubs stay Pain & Fever (with swallow SKUs). No third Topical aisle.
- Topical oil form rule (base vs scent-extract): named single oil/butter as the BASE or FILL = Cleared. Tap fill ≠ gummy High. Botanical EXTRACT or oil used as scent in a blend = Caution (fragrance/EO line). Unspecified “herbal extract” = Caution. Do not Clear arnica / ilex / juniper / camellia / lemon balm extracts just because they are plants. Do not Caution grape seed / avocado / cocoa butter when they are the cream vehicle.
- Tetrasodium EDTA = Caution (exact). Distinct from Cleared disodium EDTA (trace).
- calcined kaolin = Caution (exact). Kaolin already Cleared ≠ calcined kaolin.
- ammonium hydroxide = Caution (exact words). Strong ammonia ≠ ammonium hydroxide. Do not alias.
- chlorophyll (named pigment) = Cleared. Distinct from Caution chlorophyllin.
- leucine = Cleared.
- cetearyl glucoside = Cleared.
- fruit puree / juice concentrate as gummy base = Limited. Not the Cleared named juice-as-color row.
- organic rice meal = Caution. Distinct from Cleared rice-hull / rice-bran / rice protein and from Limited unspecified rice extract.
- Asutra Melt Pain Away exact tokens (do not alias cousins — add the words): sodium lactate; glyceryl stearate citrate; cetyl palmitate (already those exact words); polyglyceryl-3 diisostearate; calcium chloride; sodium hydroxide (pH adjuster) (already those exact words); arachidyl alcohol; behenyl alcohol; arachidyl glucoside; undecane; tridecane (same job as C15-19 alkane — cream emollient alkanes) = Cleared. tocopheryl acetate (≠ mixed tocopherols); pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate; Cymbopogon flexuosus oil / Cymbopogon citratus oil (lemongrass scent; extract/scent rule) = Caution.
- Amazon P&F leftover exact tokens: gamma-cyclodextrin; succinic acid; polyvinyl alcohol (oral coating); shellac; emu oil as topical fill (tap ≠ gummy High) = Cleared. rice flour; ferric oxide red; ferric oxide yellow; iron oxides; iron oxide red; polyvinyl acetate phthalate; ammonium glycyrrhizin = Caution. 3-(2-ethylhexyloxy)propane-1,2-diol / ethylhexylglycerin = same Caution (both strings written).
- Amazon P&F leftover spellings: iron oxide yellow / ferric oxide yellow = Caution (both strings written). glyceryl dibehenate = Cleared (exact words; dibehenin already Cleared ≠ this string). isomalt = Limited (was missing). oleoresin turmeric = Caution (distinct from Cleared turmeric-as-color). Do not invent a grade for unlabeled “Vegetable Capsule.”
- Amazon leftover cream exact tokens: Methylisothiazolinone / MIT (leave-on cream) = High/Avoid. D&C red #27 / #30 aluminum lake = exact High-family strings. Cleared — emu oil as topical fill (already); glyceryl caprylate; glyceryl monostearate SE (exact; aliases glyceryl stearate SE); hydrogenated vegetable oil as cream fill (tap ≠ gummy High); C12-15 alkyl benzoate; ethylhexyl stearate; methyl gluceth-20; methyl glucose sesquistearate; cetyl myristoleate; choline bitartrate; dipotassium glycyrrhizinate; coco-caprylate/caprate; dimethiconol stearate; potassium carbomer; laureth-7; trideceth-6; C13-14 isoparaffin; polyethylene (chew binder); dextrates hydrated. Caution — acetylated lanolin / hydroxylated lanolin (lanolin family); caprylhydroxamic acid; polysorbate 85; PEG-8 dimethicone; PEG-100 stearate; ceteareth-20; retinyl palmitate; horse chestnut / comfrey / zanthoxylum extracts as scent-extract; polyacrylamide; acrylate/C10-30 alkyl acrylate crosspolymer; diazolidinyl urea (already locked; exact restamped). Limited — SD alcohol 39C aliases the alcohol-vehicle row.
- Steareth-20 = Caution (exact; ≠ steareth-2 / 21 / unspecified). Glycosaminoglycans = Caution. Cholecalciferol (vitamin D3 as inactive) = Cleared. silicon = Caution (exact word when printed “silicon,” not silica; do not alias silica / silicon dioxide).
- Coconut Alkanes = Cleared (same job as C15-19 alkane; exact token, do not alias). Pyridoxine HCl (vitamin B6 as inactive) = Cleared. Tea Tree Leaf Oil / Melaleuca Alternifolia Leaf Oil = Caution (scent/EO rule; both strings written).
- Exact INCI locks (do not rely on cousin rows):
  - Cleared: cocoa seed butter; glyceryl dilaurate; soybean sterols; C15-19 alkane; potassium phosphate; panthenol; magnesium ascorbyl phosphate; triethyl citrate; butylene glycol; squalane; oleyl alcohol; zinc oxide (inactive / topical); glucosamine / glucosamine sulfate (as labeled inactive); MSM / methylsulfonylmethane (as labeled inactive); chondroitin sulfate (as labeled inactive); calcium gluconate; gluconolactone; sodium stearoyl lactylate; grape seed oil as cream fill (not gummy High; tap); arachidic acid; lauric acid; linoleic acid; linolenic acid; myristic acid; palmitic acid; hydrogenated castor oil; glyceryl stearate SE; glyceryl distearate; magnesium sulfate; lysine; copper sulfate / cupric sulfate; manganese chloride; aluminum chloride; magnesium chloride; zinc chloride; lauryl laurate; bisabolol; hydroxyethylcellulose / hydroxyethyl cellulose; chlorophyll (named pigment ≠ chlorophyllin); leucine; cetearyl glucoside; sodium lactate; glyceryl stearate citrate; cetyl palmitate; polyglyceryl-3 diisostearate; calcium chloride; sodium hydroxide (pH adjuster); arachidyl alcohol; behenyl alcohol; arachidyl glucoside; undecane; tridecane; gamma-cyclodextrin; succinic acid; polyvinyl alcohol (oral coating); shellac; emu oil as topical fill; glyceryl dibehenate; glyceryl caprylate; glyceryl monostearate SE; hydrogenated vegetable oil as cream fill; C12-15 alkyl benzoate; ethylhexyl stearate; methyl gluceth-20; methyl glucose sesquistearate; cetyl myristoleate; choline bitartrate; dipotassium glycyrrhizinate; coco-caprylate/caprate; dimethiconol stearate; potassium carbomer; laureth-7; trideceth-6; C13-14 isoparaffin; polyethylene (chew binder); dextrates hydrated; Cholecalciferol (vitamin D3 as inactive); Coconut Alkanes; Pyridoxine HCl (vitamin B6 as inactive).
  - Caution: aluminum hydroxide (topical / patch); aluminum silicate / synthetic aluminum silicate; dihydroxyaluminum aminoacetate; silodrate; dicetyl phosphate; capsaicin (when listed as inactive); ferric ferrocyanide; methyl acrylate; ethylhexyl acetate; acrylic acid; PVM/MA Decadiene Crosspolymer; tert-butyl alcohol; denatonium / denatonium benzoate; Mentha arvensis leaf oil; cinnamon oil; polygalic acid / polygallic acid; ceteth phosphate; steareth (unspecified); magnesium aluminometasilicate; nonoxynol (bare; nonoxynol-30 already present); polybutene; Mentha Oil / mentha oil (generic mint EO; distinct from Mentha arvensis); PEG-120 Methyl Glucose Dioleate; alicyclic saturated hydrocarbon resin; topical botanical extracts/oils used as inactives (arnica; burdock; boswellia resin extract; calendula extract or flower oil; camellia leaf oil/extract; ilex; lemon balm; chamomile; echinacea; juniper; white tea; wormwood extract; wormwood oil; ginger extract; camphor leaf oil; gaultheria fragrantissima oil; spearmint bare); camphor / dl-camphor as inactive; herbal extract (unspecified); IPBC / iodopropynyl butylcarbamate; PEG-4 laurate; PEG-12 dimethicone; bis-PEG-10 dimethicone; PPG-24-glycereth-24; hydroxyethyl cetyldimonium phosphate; menthyl ethylamido oxalate; tetrasodium glutamate diacetate; lauralkonium chloride; nonoxynol-10; isoceteth-20; ceteth-10 phosphate; sodium polyacrylate starch; benzyl alcohol as topical inactive; thymol; polyacrylate crosspolymer-6; phenethyl alcohol; acetone; chloroxylenol; iodine; potassium iodide; butane (spray propellant); hydrated silica (topical); Tetrasodium EDTA; calcined kaolin; ammonium hydroxide; organic rice meal; tocopheryl acetate; pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate; Cymbopogon flexuosus oil / Cymbopogon citratus oil; rice flour; ferric oxide red; ferric oxide yellow; iron oxides; iron oxide red; iron oxide yellow / ferric oxide yellow; polyvinyl acetate phthalate; ammonium glycyrrhizin; 3-(2-ethylhexyloxy)propane-1,2-diol / ethylhexylglycerin; oleoresin turmeric; acetylated lanolin / hydroxylated lanolin; caprylhydroxamic acid; polysorbate 85; PEG-8 dimethicone; PEG-100 stearate; ceteareth-20; retinyl palmitate; horse chestnut / comfrey / zanthoxylum extracts as scent-extract; polyacrylamide; acrylate/C10-30 alkyl acrylate crosspolymer; diazolidinyl urea; Steareth-20; Glycosaminoglycans; silicon (exact word; do not alias silica); Tea Tree Leaf Oil / Melaleuca Alternifolia Leaf Oil.
  - Limited: alcohol / SD alcohol / SD alcohol 39C / methylated spirit stay on the existing alcohol-vehicle row. Do not invent a second alcohol class. fruit puree / juice concentrate as gummy base = Limited (not the Cleared named juice-as-color row). isomalt = Limited. Unlabeled “Vegetable Capsule” is not graded — do not invent a grade.
  - High: Methylisothiazolinone / MIT (leave-on cream); D&C red #27 aluminum lake / D&C red #30 aluminum lake.

Sept 14 housekeeping locks (excipient siblings + tap-copy rule — now in Methodology §5 — do not reopen):
- Glycerin / vegetable glycerin / organic glycerin = Cleared.
- Calcium laurate = Cleared (stearate family).
- Cellulose gum, powdered cellulose, capsule cellulose = Cleared (cellulose family with MCC).
- Copovidone = Cleared (povidone family).
- Hydroxypropyl cellulose (HPC) = Cleared (HPMC / hypromellose family).
- Rice protein, ferment media, organic/brown rice, rice syrup = Cleared (food-state / starch family; not SiO2).
- Dicalcium phosphate, tricalcium phosphate, citrate salts as fillers/buffers = Cleared.
- Inulin as fiber = Cleared.
- Alginic acid = Cleared (gum/fiber family).
- Canola / soy / sunflower lecithin = already the lecithin lock; canola named explicitly. Not a new grade.
- Coconut oil alone in gummies/chews = NOT seed-oil High (Cleared; already practice).
- Gellan gum = Cleared with the xanthan/guar/gum arabic/pectin family (one family row).
- Organic maltodextrin = same Limited as non-organic maltodextrin.
- Polydextrose = Limited (maltodextrin-like).
- Fructose as sweetener = treat with sugars; not High (Limited row so it is not a missing-row).
- Whole-leaf / crude stevia = Caution; do not auto-Clean (already stated; now its own row).
- Methacrylic acid copolymer / unnamed delayed-release composites = Caution until specified.
- Phenoxyethanol (topical preservative) = Caution.
- Lanolin (topical) = Caution hypersensitivity pattern, not Avoid.
- Fragrance / parfum stays Caution — do not reopen.
- Sodium copper chlorophyllin, organic cultured dextrose, unnamed natural citrus, and the morning food/color locks stay as already written — not duplicated as new grades.
- Inactive not in §5 still goes to the founder before a live grade. After a lock it goes in the §5 table the same day.
- Audit list 2 still pending founder lock; no default Caution for missing-row.

STORE → BRAND HUNT (locked Sept 14, 2026)
Stores are how we find brands, not how we file rows. Same formula at two stores = one row.
Banner set we hunt from: Sprouts, Whole Foods, Thrive, CVS, Walgreens, Target, Walmart, Costco, Sam’s, Amazon US, plus drugstore drafts already on main.
Natural-grocer banners (Sprouts / WFM / Thrive) have a longer unique-brand tail — knock those down so walk-in scan rate jumps. Drugstores share fewer manufacturers and go faster later. Order is tactic, not a rule that mass-market waits forever. Every in-scope brand those stores carry gets pulled before we call the US catalog “ready.”
US only until the US app is real. No Canada/EU SKUs to fake coverage.
West Coast walk lists still catch national brands sold nationwide. Later wave: regional store brands / banners not walked yet (HEB, Publix, Meijer, etc.). That is the last slice, not launch-critical.
Launch: don’t half-dress a date. Day job returns mid/late November.

BRAND ROSTER
Completed (main, unverified drafts unless noted):
- MegaFood — Sept 14, 2026 ~11:51 AM PT — Search 107 after closeouts / later flips (Liposomal C Clean; Berberine Clean; BM2 prenatal probiotic LGG Caution after Limited-stack rule). Leftovers: none from that pass.
- Genexa — Sept 14 — Search 28 (12 reuse + 16 new).
- Hyland’s — Sept 14 evening — Search 53 after PR #73; Soothing Drops Day+Night were the last blocked pair (write sent). Confirm leftovers none when that PR lands.
- Pedialyte hidden earlier Sept 14.
- Boiron — Sept 15, 2026 — US in-scope catalog write on main (pellets / liquids / topicals / gemmo that mapped to §5). batch34-boiron.ts TALLY: Search 436 (Clean 402 / Caution 34 / Avoid 0). Dead lemon Arnicare Leg Cramps SPL = discontinued comment only. Pain & Fever photo test PR #107 — 20 official BoironUSA pellet cartons; those letters cleared. Leftovers = only what that write still listed as refused / no OI (batch file: STILL BLOCKED none on the follow-up).
- Sprouts store-brand — STASHED Sept 16, 2026 (founder call — walk not done). NOT the live catalog job.
  Written on main: batch35 = 44 (Clean 24 / Caution 18 / Avoid 2) + batch36 = 70 (Clean 34 / Caution 35 / Avoid 1). Reuse two prenatals in batch16 (still no OI): sprouts-organic-prenatal-once-daily, sprouts-organic-prenatal-whole-food.
  First unread harvest was rounded to a stale leftover count and never subtracted later writes — do not reuse that old harvest number.
  batch36 REFUSED (no OI, do not invent): (1) Sprouts Organic Once Daily Men's Multivitamin, (2) Sprouts Chlorophyll Glycerite, (3) Sprouts UT Support liquid.
  Still blocked / stashed: founder walk list ≈ 55 unread house panels + the 3 batch36 refused names above. Do not guess OI. Do not send KYR3 at this pile until Brandon un-stashes it.
  Organic MCT Oil bottle = oil hunt list, not Search.
  Do NOT write the old unread-harvest leftover count again.
- MediNatura + Boericke & Tafel — Sept 15, 2026 — batch37-medinatura-bt.ts — 39 rows (Clean 1 / Caution 38 / Avoid 0). Traumeel Tablets independently Clean. Traumeel ≠ T-Relief. List 4 PR-comment only. REFUSED OI: none. DONE for that write. Do not re-catalog.
- Nature’s Way — Sept 15, 2026 — batch38-natures-way.ts — 262 rows (Clean 126 / Caution 130 / Avoid 6). Reuse Umcka + Sambucus kids gummies + all B&T twins from batch37. naturesway.com OI pass. DONE for that write. Do not re-catalog.
- Tylenol / Advil / Aleve holes — Sept 15, 2026 — batch39-tylenol-advil-aleve-holes.ts — 20 NEW (Clean 0 / Caution 6 / Avoid 14) + reuse 28 ids from batches 1/2/7. Pain & Fever / Sleep holes only. List 4 (cold/flu, kits, CA/EU, topicals already in 41+) = not Search rows. DONE for that holes pass. Do not start a fresh full-line Tylenol catalog.
- Bayer / Excedrin / Infants’ Motrin leftover — Sept 15, 2026 — batch40-bayer-excedrin-motrin.ts — 12 rows (Clean 1 / Caution 0 / Avoid 11). Genuine Bayer Aspirin 325 independently Clean. DONE for that write.
- Pain rubs / same-aisle topicals — Sept 15, 2026 — batch41 Search 8 (Caution 7 / Avoid 1 / Clean 0). Precise creams Caution; Precise lidocaine patch Avoid (methyl/ethyl paraben). AleveX roll-on + tube share formulaId (OI matches); spray is separate. Genexa Pain Crush = discontinued comment only (inactivated NDC 69676-0004-6). Reuse T-Relief / Triflora / Hyland creams / Sports Gel untouched. Arniflora stays First Aid.
- Advil Targeted Relief + Motrin / Aleve arthritis gels — Sept 15, 2026 — batch42 Search 3 (Caution 3 / Avoid 0 / Clean 0). Isocetyl stearate Cleared; isopropyl alcohol Limited (distinct from ethyl alcohol). Motrin fragrance-free; Aleve own formulaId (fragrance Caution). Pack sizes share formulaId. REFUSED: none. Reuse batch 41 Precise / AleveX untouched. Arniflora stays First Aid.
- Goody’s / BC / Anacin / Bufferin / Ecotrin / St. Joseph — Sept 15, 2026 — batch43 Search 14 (Caution 6 / Avoid 6 / Clean 2). Shared OI shares formulaId (Max+Cool Orange+Mixed Fruit; PLUS+Hangover; BC Original+Arthritis). ES vs Back & Body = separate formulaIds (actives differ; both Clean — lactose + KCl). KCl Cleared applied. Reuse 0. REFUSED: none. List-4 OUT (no Search rows): Bufferin sanitizer / lidocaine / off-site Arthritis; Ecotrin 81 paraben SPL; Goody’s Migraine/PM caplets; BC cold/flu; Canada/EU; kits; false matches.
- Pain rubs list 2 — Sept 15, 2026 — batch44 Search 13 (Caution 13 / Avoid 0 / Clean 0). Voltaren own formulaId (Aleve math twin, not cloned). Aspercreme arthritis fragrance vs no-fragrance split. Icy Hot Performance + Pro share formulaId; Original separate (menthol-only). Icy Hot vs Aspercreme lidocaine dry sprays separate (actives differ). REFUSED still-missing §5: none from list 2. List 3/4 OUT (38 question-mark SKUs; kits; wound-only; cosmetics; Canada/EU; discontinued; private-label; Lead duplicates). Do not rewrite Precise / AleveX / Advil Targeted / Motrin or Aleve arthritis gels.
- Pain rubs remaining (Icy Hot / Aspercreme / Salonpas / Tiger Balm leftover table) — Sept 15, 2026 — leftover strings confirmed on §5. Batch45 wrote the gradeable remainder. REFUSED still-missing §5 stay questions. Pain rubs stay Pain & Fever.
- Pain rubs PR #93 refused-unlock — Sept 16, 2026 — batch46 Search 3 (Caution 2 / Avoid 1 / Clean 0). Wrote only SKUs whose current DailyMed OI now maps: Tiger Balm Pain Relieving Patch + Hydrogel Patch (shared formulaId; mentha oil gone from SPL) and Neck & Shoulder vanishing scent (PVM/MA gone; PEG-120 on PEG Moderate row; Avoid Blue 1 + parabens). Do not clone batch45 neck-shoulder formulaId. REFUSED 37 still-missing. Reuse 41/42/44/45 untouched. Pain rubs stay Pain & Fever.
- Pain rubs PR #93/#94 exact-unlock — Sept 16, 2026 — batch47 Search 25 (Caution 6 / Avoid 19 / Clean 0). Wrote only SKUs whose every current DailyMed OI token has an exact §5 row. Cousin-matching refused. REFUSED 12 still-missing exact tokens (ceteth phosphate / unspecified steareth / unspecified polysorbate; mentha oil; PEG-120 methyl glucose dioleate; magnesium aluminometasilicate / unspecified nonoxynol; polybutene; alicyclic saturated hydrocarbon resin / baking cloth / film). Reuse 41/42/44/45/46 untouched. Pain rubs stay Pain & Fever.
- Pain rubs PR #95 refused-unlock — Sept 16, 2026 — batch48 Search 12 (Caution 9 / Avoid 3 / Clean 0). Wrote the remaining Salonpas / Tiger Balm refused set after the last exact-token locks. baking cloth + film ignored (backing / device, not inactives). Four menthol 3% / methyl salicylate 10% patches share formulaId; regular + wider TB hydrogel share formulaId. REFUSED: none. Reuse 41/42/44/45/46/47 untouched. Pain rubs stay Pain & Fever.

Scale lock: Limited-only never auto-Avoid. Avoid needs High.

LIVE NOW
1) Thrive Market brand-list hole punch (in-scope US OTC / vit / supp only). Reuse anything already on main (MegaFood, Genexa, Hyland’s, Boiron, Nature’s Way, MediNatura/B&T, etc.). Same product = one row.
THEN
2) Amazon US brands not on main
3) Store generics (CVS / Walgreens / Walmart / Safeway-Vons Signature / dollar banners)
4) Un-stash Sprouts house ≈55 + 3 refused (when Brandon walks)
5) KYR5 barcode backfill (PR-only until founder OK)
Do NOT mark complete: Thrive full list, Amazon US full list, store generics. Sprouts house is STASHED (not the live job). Do not catalog Sprouts. After Thrive write lands, add roster line + date/time. Not before. MediNatura / B&T, Nature’s Way, and Tylenol / Advil / Aleve holes are DONE for those writes — do not list them as unstarted.

BOT PASTES
- Include “Merge if GitHub UI flakes” on photo jobs.
- Advisor must not send handoff or bot text until Brandon says ready or go. Sidebar after a paste is new info; don’t dump an old paste.

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
Sept 14 lock — do not populate protein powder/bars/meal shakes or Pedialyte-class drinks. Schema may exist. Night bot must not photo that aisle.

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
Rating status — INTERNAL keys UNCHANGED: 'clean' | 'caution' | 'avoid'. Do not rename the Verdict type. Do not rewrite draft files to a new key. Files keep verdict: 'caution'.
DISPLAY LOCK (Sept 12–13, 2026 — supersedes the old "badge still says Caution" confirm-every-session line; this is NOT a Good/Caution/Avoid rename and NOT a grade change):
- verdict 'clean' → badge Clean (green #27ae60)
- verdict 'caution' → badge Usable (amber #d97706) + subline "Fine in moderation"
- verdict 'avoid' → badge Not clean (red / deep tint #c0392b). Internal key stays avoid.
Amber lives on the badge, not a full-card siren. Flagged ingredient names stay visible. See §6.
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

PRODUCT VERDICT (internal key / methodology): Clean / Caution / Avoid. DISPLAY badge (Sept 13 lock): Clean / Usable / Not clean — see §3 and §6. Do not change the stored verdict key to match the badge. Not a methodology grade change.
INGREDIENT RISK LEVELS (the drill-down, the proof): each ingredient tagged Cleared (0pt) / Limited (1pt) / Moderate (2pt) / High (auto-Avoid), each with its source.
Scoring: 0 pts = Clean · Limited-only (any count) = Caution (Usable). Avoid requires a High-tier inactive (or an explicit founder/active-safety cap). Silicon dioxide is a 0-pt Caution cap and does not push Avoid. 3× Limited no longer auto-Avoid.

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

STATUS: schema now exists in code, needs updating for this session's changes. lib/clean-picks/verdictLabels.ts holds the Verdict type + VERDICT_LABELS/VERDICT_COLORS/VERDICT_SUBLINES as the single source of truth for badge display. Keys stay 'clean' | 'caution' | 'avoid'. Display: Clean / Usable / Not clean. lib/ratingRecord.ts holds the RatingRecord type — NEEDS UPDATING to add: formulaId, product_type, product_subtype (as internal-only fields), audience, recordStatus, and the three monetization backdoor fields (§10). Not yet done as of this note. lib/oilInfoRecord.ts holds the separate OilInfoRecord type for scanned oils (UsageClassification, dosing fields, no verdict) — see §9. NEXT SESSION: update lib/ratingRecord.ts with the new fields above, then begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into this shape. Do not rewrite lib/rating-drafts/ to change verdict keys.

Current storage: ratings live as hardcoded TypeScript arrays in the Next.js app (lib/clean-picks/painFeverPicks.ts etc.). DIRECTION (not today): migrate to a Supabase table once the schema is locked and the ratings are correct. Content first, container later — don't refactor storage before the ratings themselves are right.

================================================================ 6. APP UI & DESIGN SYSTEM (v2 — locked August 8, 2026; open questions closed September 11, 2026; display labels locked September 12–13, 2026)
The post-scan product-detail screen is the app's centerpiece; it presents the two-layer methodology (verdict + per-ingredient proof) for graded products (OTC/vitamins/supplements). Essential oils get a DIFFERENT scan-result screen — informational only, no verdict (see §9). Built in a deliberately plain, Yuka-clean idiom. Full screen mocked and approved in the Aug 8 session (mockups: verdict-placement A/B test, cleaner-alternatives carousel, flagged-row drill-down, full assembled screen). Sept 11 lock closed the two remaining open questions (trigger + display) and locked Flagged/Cleared. Sept 12–13 lock: user-facing badge map (Clean / Usable / Not clean) + empty cleaner-match copy (internal verdict keys unchanged).

Layout — post-scan / product-detail screen (graded products)

White background, generous whitespace, hairline dividers. ONE monochrome line-icon per row. No cards and no source chips at the top level. Do not paint a full-card siren wash for Usable.
VERDICT PLACEMENT (locked Aug 8 — supersedes July 12 version): the verdict badge sits on its OWN row at the very TOP of the screen, above the product image/name/brand block, with the saved star (Medicine Cabinet toggle — see §2) on the same row (right-aligned). No score. This was an explicit A/B decision: putting the verdict below the title (the more Yuka-literal placement) tested as "clean but slightly hidden" — it competed with the product name for attention and softened the instant gut-read the scan-then-verify trust loop depends on. Verdict-first wins.
DISPLAY LOCK (locked Sept 12–13, 2026 — internal verdict unchanged). Badge map only; do not rename stored keys; do not rewrite drafts:
- verdict 'clean' → badge Clean (green #27ae60). Untinted card.
- verdict 'caution' → badge Usable (amber #d97706) + subline "Fine in moderation". Amber on the badge, not a full-card siren.
- verdict 'avoid' → badge Not clean (red / deep tint #c0392b). Internal key stays avoid.
Sept 11 "light tinted Caution/Avoid banner" is SUPERSEDED for Usable: no amber page-wash. Not clean may keep a deep red tint on the badge/verdict row. Clean stays a green badge, no wash. Not a methodology grade change.
Below the verdict row: catalog product image + product name (Playfair serif — the one KYR signature flourish, everything else is clean sans) + brand + active ingredient/strength.
Two sections: FLAGGED (the concerns) and CLEARED (the fine stuff) — our analog to Yuka's Negatives/Positives.
FLAGGED (locked Sept 11, 2026): ingredient names are visible without a tap. Each flagged row at rest: line-icon · bold ingredient name · one gray reason line · status dot · chevron. Tapping a flagged row expands it in place (chevron flips down→up) to reveal "Why this is flagged" in plain language + tappable source links. Sources stay behind the tap — names do not.
CLEARED (locked Sept 11, 2026): stays collapsed by default. Do not expand the cleared list on first view. Tap to expand a cleared row (or the section) and reveal the why + sources. This keeps the Overview calm so Flagged is what you read first.
Tabs up top (below the header block, above Flagged/Cleared): Overview · Ingredients · Photos.
Color discipline (LOCKED) — color has exactly TWO jobs; everything else is monochrome:

RATING color (Clean #27ae60 / Usable amber #d97706 / Not clean #c0392b) = the badge WORD + the per-row status dots + Not clean's deep tint. Always means "how clean it is." Usable amber stays on the badge.
BRAND green (#2d4a3e) = tappable/actionable things ONLY (scan button, "See all", active nav, links, the saved star). Always means "you can act here." Product photos carry the visual warmth — no full-card siren chrome. Rare exception allowed: a colored row-icon for an active-safety cap (e.g., colloidal silver), if it genuinely needs to stand out — start conservative.
Saved star / Medicine Cabinet

Tapping saves the product to the user's personal Medicine Cabinet (profile area for liked/remembered items — see §2; NOT related to the old cut dosage-tracking system).
Fills BRAND GREEN when saved (NOT gold — gold would be a third color and break the two-color system). Outline = not saved; solid green = saved.
Tap feedback: outline→solid + quick bounce + a momentary toast ("Saved to your cabinet" / "Removed") that fades. State change + brief confirmation = unmistakable.
Cleaner alternatives (REDESIGNED Aug 8, matching rules expanded Aug 2026; trigger + display LOCKED Sept 11, 2026)

TRIGGER (locked Sept 11, confirmed Sept 12): fires on USABLE (internal 'caution') AND AVOID. Clean results do not show alternatives.
DISPLAY (locked Sept 11, 2026 — closes the prior open question): inline horizontal carousel on the Overview tab. Peeking/partially-visible next card at the row's edge so it's obvious there's more to scroll. A "See all →" link opens the full ranked list. Do NOT use a slide-up sheet as the primary alternatives UI. Section header reads "N clean alternatives" (dynamic count) so plurality is obvious before any tap. Each card shows: product image, name, brand, display badge (Clean / Usable / Not clean — NOT a numeric score; conflicts with the locked no-0-100-score rule, Methodology §3), and retailer availability chips directly on the card (e.g. "Whole Foods, Sprouts" or a flagged "Not at Walmart").
EMPTY STATE (locked Sept 12, 2026): if there is no independently-Clean match after the matching rules, show "No cleaner match on this shelf yet". Do not fake a Clean. Do not pad the carousel with Caution/Usable or unverified rows to hide the empty state.
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
DONE (Sept 11, 2026; display labels Sept 12): Cleaner Alternatives trigger + display — locked in §6. Trigger = Usable (internal 'caution') AND Avoid. Display = inline horizontal carousel on Overview, peeking next card, "See all →". Empty state: "No cleaner match on this shelf yet" — do not fake a Clean. Slide-up sheet is NOT the primary alternatives UI.
Begin converting live Clean Picks data (painFeverPicks.ts, coldFluPicks.ts, allergyPicks.ts) into the RatingRecord shape once the schema update above is done.
DONE on main (PRs 1–3): removed phantom Tylenol ES Dye-Free / Children's Tylenol Dye-Free / Children's Motrin Dye-Free / Biofreeze / Equate Mucus-ER from live Clean Picks. Do not restore. STILL OPEN: Pain & Fever is at 5 picks (below the old 8-pick bar); Cold & Flu still needs a verified dye-free guaifenesin replacement; four Cold & Flu Caution drafts (Sambucol, Chestal kids, Zarbee's, Source Naturals) are not verified. Draft batches live in lib/rating-drafts/.
DONE (Aug 2026, updated for Methodology v1.6): "Preferred multi-source references" / "trusted sources reference list" — §4a still owns the hierarchy and the grade. docs/SOURCES.md is the working bibliography (filled Sept 16, 2026). Fill it as packets cite new refs. Not a second grading table.
DONE (Aug 2026, v1.6): the remaining ~20% inactive-ingredient categorization gap is CLOSED — roughly 20 ingredients were run through the full §4a workflow and locked with founder calls in one extended session (see docs/METHODOLOGY.md §7 calibration log for the full list: caramel color's 3-way class split, talc, sulfites, SLS, fragrance/parfum, stevia/monk fruit, the povidone/crospovidone/methylcellulose/starches housekeeping batch, xanthan/guar/gum arabic/pectin, annatto, turmeric/curcumin-as-color, beta-carotene-as-color, BVO, disodium EDTA trace use, aluminum hydroxide as an active-safety-cap case, castor oil/polyoxyl castor oil, propyl gallate, benzyl alcohol's population split, benzalkonium chloride, lecithin, mixed tocopherols/ascorbyl palmitate, cochineal/carmine).
GATE NOW OPEN: the inactive-ingredient methodology is locked enough to begin bot-assisted database batches (§12). The earlier hard gate blocking §12 work is LIFTED as of v1.6.
DO NOT change any locked grade from this session or earlier without a fresh, explicit founder decision — this includes not "helpfully" re-deriving a grade using the default-trigger table, which is for brand-new ingredients only (Methodology §0).
PARKED, STAYS PARKED unless the founder revisits: remaining formaldehyde-releasers (imidazolidinyl urea, Quaternium-15, Bronidox, Bronopol). DMDM hydantoin / diazolidinyl urea are Caution (formaldehyde-donor, Sept 15) — not Avoid. HFCS (food/beverage sweetener, not confirmed on any real in-scope label), zinc as a nutrient/active (belongs to the active-safety-cap process, not the inactive table, and does not block database work), and the pending topical actives (menthol, camphor, eucalyptol — camphor specifically needs a young-children look whenever this gets picked up; also does not block database work).
ONGOING PROCESS RULE (permanent, not a one-time step, Methodology §4a): any inactive ingredient a bot or session encounters that ISN'T already in the Methodology §5 table does NOT get graded on the spot and does NOT go live in any product record. It gets the full 7-step workflow and a founder call first. Do not proactively hunt for more ingredients to pre-grade — new ones get handled reactively as real products actually surface them during database work, unless the founder specifically asks for another sweep.
Migrate ratings from TS arrays → Supabase table once schema is locked and ratings are correct.
App UI (design system v2 locked — §6; Sept 13 display lock — ready to build)

Build the post-scan product-detail screen as a real React component using placeholder data in the RatingRecord shape. Verdict-first header: Clean green badge / Usable amber badge + "Fine in moderation" / Not clean red deep-tint badge (internal avoid). Amber on the badge, not a full-card siren. Flagged names visible at rest / tap expands sources. Cleared collapsed by default. Inline Overview carousel on Usable and Not clean, peeking next card + "See all →" + retailer chips + age/audience/category matching. If no Clean match: "No cleaner match on this shelf yet" — do not fake a Clean. No slide-up sheet as the primary alternatives UI. Stored verdict keys stay 'clean' | 'caution' | 'avoid'.
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
September 13, 2026 — Display lock: Avoid badge → Not clean (internal key unchanged)

User-facing avoid badge is now “Not clean.” Internal key stays avoid. Color stays #c0392b. Clean and Usable unchanged. Usable still maps from caution + “Fine in moderation.” Not a methodology grade change.
September 12, 2026 — Display lock (internal verdict unchanged)

Badge map: 'clean' → Clean (green); 'caution' → Usable (amber) + "Fine in moderation"; 'avoid' → Avoid (red / deep tint). Amber on the badge, not a full-card siren. Flagged names stay visible. Cleaner carousel on Usable and Avoid. Empty cleaner state: "No cleaner match on this shelf yet" — do not fake a Clean. Files keep verdict: 'caution'. Drafts not rewritten. Methodology grades unchanged.
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
