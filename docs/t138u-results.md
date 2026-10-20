# t138u catalog rescan results (post-audit)

Generated: 2026-10-20T23:21:20.878Z

## t138u founder locks

Polysorbate 20/60/80/(unspecified), oral propylene glycol, sucralose, acesulfame potassium, saccharin, and PEG families → **Limited** (t138u). Full strict rollup uses `applyCautionCapLocks` for SiO2 / §5 Caution METH stamps.

## Audit (bogus caution→clean)

The original t138u report listed **254** caution→clean flips. Those were strict-rollup artifacts (0-pt caps stored as Cleared on disk). **0** caution→clean grade changes remain after audit; ingredient tabs were patched where needed.

**Stack-driven Avoid rows (strict rollup):** 475. Run `npx tsx scripts/t138u-stack-note-verify.ts`.

## t138u rescan grade changes (post-audit)

- **caution->avoid/limited_stack**: 97

**Total:** 97

## patchMiss

Persisted: **0**. Still not on disk: **19** — `claritin-allergy-liquid`, `benadryl-liqui-gels`, `childrens-claritin-liquid`, `childrens-allegra-liquid`, `childrens-benadryl-allergy-plus-congestion`, `tylenol-pm-es`, `cvs-sleep-aid-liquid-dyefree`, `pure-encapsulations-melatonin-sr-3mg`, `amazon-basics-mometasone-nasal`, `advil-targeted-relief-cream`, `goodsense-naproxen-220`, `goodsense-dual-action`, `goodsense-childrens-ibuprofen-chew`, `goodsense-ibuprofen-liquid-gels`, `goodsense-es-pain-relief-l484`, `timecap-naproxen-220`, `timecap-ibuprofen-200`, `allegra-b138-d24-10`, `allegra-b138-d24-15`