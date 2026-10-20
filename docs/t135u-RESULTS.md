# t135u full catalog rescan — results

## Summary counts

| Metric | Count |
|--------|------:|
| Catalog rows | 6156 |
| Initial overlay grade deltas (analyze) | 785 |
| **Excluded** (verdict-only / no live lock / artifacts) | ~770 |
| **Lock-traced apply targets** | 387 |
| **File grade changes landed** | 13 |
| Why-only ingredient/source patches (applied) | ~374 |
| Post-apply `recordsEqual` drift vs `recomputeFounderRescanRecord` | 1157 |
| — verdict-only (intentionally not edited) | 770 |
| — risk level still on disk vs overlay | 83 |
| — source/why text only (METH key vs expanded overlay cite) | 304 |

Missing-token stop gate: **0** (proceed).

## Hard constraints

- `genexa-acetaminophen-es`: **Caution** (unchanged).
- 21 NOW t134u softgel ids: **Clean** (unchanged).

## Grade changes landed (id, old → new, driving token)

| id | old | new | driving token |
|----|-----|-----|----------------|
| `boudreauxs-butt-barrier` | clean | avoid | Hydrogenated castor oil |
| `icy-hot-pro-massaging-balm` | caution | avoid | Hydrogenated vegetable oil |
| `biofreeze-dry-stick` | caution | avoid | hydrogenated castor oil |
| `mineral-ice-extreme-dry-stick` | caution | avoid | Hydrogenated Castor Oil |
| `topricin-pain-relief-cream` | caution | avoid | Hydrogenated Vegetable Oil |
| `nutricost-melatonin-extended-release-capsules-5mg-240-capsules` | caution | avoid | Hydrogenated vegetable oil |
| `rookie-wake-raspberry-lemonade` | caution | clean | Natural lemon flavor (t132u) |
| `rookie-greens-peach-mango` | caution | clean | Natural peach mango flavor |
| `rookie-greens-crisp-apple` | caution | clean | Natural green apple flavor |
| `naturewise-b82-calcium-vitamin-d3` | caution | clean | MCT oil (t132u) |
| `naturewise-b82-calcium-vitamin-d3-200-count` | caution | clean | MCT oil |
| `naturewise-b86-oral-probiotics-chewable` | caution | clean | Natural peppermint flavor |
| `naturewise-b86-oral-probiotics-chewable-60` | caution | clean | Natural peppermint flavor |

(Plus batch80 Nutricost row with organic lemon juice concentrate → **Clean** tally 1/8/0.)

## Protected files edited

batch59, batch71–74, batch78, batch80, batch82–84, batch86, batch88, batch93, batch96, batch100–113, batch123–126, batch129, batch136–137 (see `docs/t135u-rescan-report.json` `protectedFilesEdited`).

## batch59 tally drift

Header + guards: **Clean 113 / Caution 108 / Avoid 20** (241 rows).

## Overlay fold

- Removed `T134U_CARNAUBA_FILE_LOCKED_IDS` and `applyT133uLocks` file-lock skip.
- Added `applyOverlayIngredientLocks`, `founderRescan.ts`, `t135uValidate.ts`, `scripts/t135u-batch-apply.ts`.

## Excluded, needs review

See `excluded` array in `docs/t135u-rescan-report.json` (769 verdict-only realignments; analyzer artifacts).

## Patch misses (AST/id-alias/compact)

Remaining ids that need manual or ts-morph follow-up (e.g. Bayer/APAP compact rows, some GoodSense): listed in report `patchMiss`.
