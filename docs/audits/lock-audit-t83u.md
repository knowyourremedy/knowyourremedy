# Lock audit (t83u)

Verification only. North American Herb & Spice is not closed. No pull request. No new product page was opened for this audit. The six capsule writes use the saved brand photographs.

## What was reviewed

| List | Count | How it was read |
|---|---|---|
| Methodology §5 table rows | 771 | Every row under the additive table. The row title plus the grade words in that row. |
| Changelog token calls | 181 unique | Every `**Token** → grade` and `**Token**: grade` call above the table. A later call is the live grade when both name the same string. |
| t83u exact strings | 17 | The Nov 9 semicolon list, checked one by one against the table and against bare lookalikes. |
| Engine sets | 41 sets, 214 strings, 59 `n ===` checks | `lib/scan-preview/limitedStackEligibility.ts`. These implement locks. They are not a second grade source. |

Standing rules checked against that population: t137u (one Avoid, or three Limited, makes the product Avoid; one or two Limited makes Caution; Cleared does not stack); t130u unnamed tie-break; t54u flavor-carrier rule; unlabeled MCT stays Limited and named plant MCT stays Cleared; the Oct 15 hydrogenated-oil Avoid rule and its later exact carve-outs; named oil as fill versus scent oil; natural takes the better tie and man-made takes the worse tie only when the repo already states which one it is.

## Result

| Bucket | Count | Basis |
|---|---|---|
| Lock grade changed | 1 | `Clove Bud Oil`. The Oct 27 t84u call was Caution. The Nov 9 t83u call is Cleared and does not stack. The §5 row and the t84u sentence now say that. |
| New locks, no prior grade | 16 | The other t83u strings. Each is Cleared and does not stack. |
| Unchanged | The other 770 table rows and the other changelog calls | No standing rule assigns a different grade, or a later exact sentence already sets the grade. Bare `cassia oil`, bare citric acid, bare cellulose, `Organic pullulan`, `Vegetarian Capsule (Pullulan)`, `Gelatin Capsule`, `BSE-free Beef Gelatin`, `Clove Oil`, and `Clove Powder` stay their own rows. Exact `Natural flavors` and `Natural flavor` stay Limited because a documented product with that wording names a Limited carrier. Unlabeled MCT, `Medium Chain Triglycerides` with no plant named, `goMCT®`, and bare triglycerides stay Limited. `MCT oil` stays Cleared. The 3+ Limited Avoid rule stays a product rule. |
| Ambiguous, not regraded | 6 | Listed below. A founder decision is required. No row was rewritten for these. |

## Ambiguous tokens

`Vegetable Capsule`, `Vegetarian Capsule`, `Vegan Capsule`, and `Veggie Softgel`. t90u and t87u call the bare shell Caution. t130u strikes Caution-only-because-unnamed and points at the tie-break. Named hypromellose, pullulan, and cellulose capsules are Cleared, so that tie-break does not force a worse grade. The unnamed-Limited rule would make the same strings Limited. The repo does not say which polymer a bare vegetable capsule is. The engine still treats these strings as non-stacking. No grade was changed.

`Hydrogenated Castor Oil`. The Oct 15 rule and the §5 hydrogenated-oil row say Avoid. The Nov 2 t144e sentence says Caution and says it is not that Avoid row. The later exact sentence is left in place. No grade was changed.

`hydrogenated peanut oil`. The Oct 15 family rule says Avoid. The Nov 1 t141e sentence says Caution and says it is not that Avoid row. The later exact sentence is left in place. No grade was changed.

`Rosemary Oil (Antioxidant)` is not an exact lock. A prior dry run proposed Cleared from the named-fill rule. The scent-oil family text says Caution. It was not regraded.

`organic Mushroom powder` is still a hold, not a lock.

## Recompute

One lock grade changed, so every stored row containing that string was checked.

| Row | File on disk | Token before eval | Token at eval | Product before | Product after |
|---|---|---|---|---|---|
| `quantum-b291-therazinc-spray-2` | `lib/rating-drafts/batch291-kyr6d-t84u.ts`, restored to the prior text | Clove Bud Oil Caution | Cleared | Caution | Caution |
| `quantum-b291-therazinc-spray-4` | same shared flag | Clove Bud Oil Caution | Cleared | Caution | Caution |

Menthol on both rows stays Caution, so the product grade stays Caution. The product file is not rewritten for the ingredient change. `applyT83uRow` in `lib/scan-preview/previewCatalog.ts` applies Cleared at catalog eval. `plainIngredientWhy` returns the Cleared t83u sentence for that string, including the stored Caution flag. The old Caution sentence does not remain a live lock.

No other stored row contained one of the 17 strings at a grade other than Cleared. Rows that already store `Pullulan` as Cleared were not rewritten. Bare `Cassia oil` rows stay Caution. They are not `Cassia oil (cinnamon)`.

Stored bare citric acid and `Clove Oil` rows that do not match their existing locks were left as they are. Those locks did not change in this pass.

## Diff scope

Product rows whose grade did not change are not given a new ingredient grade on disk. `batch291` matches the file from `540470725b6ae212bbff9398762ab52743f7935a` after the restore. Batch 363 stays the eight Clean rows. Batch 364 adds the six photographed capsule packs. Methodology, the lock engine, project notes, and this audit file are the lock and evidence edits.
