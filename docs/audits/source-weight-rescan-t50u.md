# Source-weight rescan (t50u)

Read-only. No grade and no lock was changed for this audit.

Rule used: PROJECT_NOTES, Token recommendation rule (PR #994). When sources disagree, the two integrative medicine sources hold more weight than a simple majority. FDA, CIR, and FEMA are supporting sources. They do not override the integrative sources when those two agree.

Integrative sources are the ones named in Methodology §4a Tier 2/3: Natural Medicines Database, NIH NCCIH, MSK About Herbs, Examine.com, ConsumerLab, German Commission E, ESCOP, EMA herbal monographs, and the other names in that list. A token can be assessed only when its existing tab or methodology entry already records the positions of two of those sources. Positions were not invented.

## Would change

None. No locked token's existing tab or methodology entry records two integrative medicine sources agreeing on a grade that differs from the current lock.

## Cannot assess, sources not recorded

190 exact strings sit in the lock sets in `lib/scan-preview/limitedStackEligibility.ts`. Their tabs and methodology entries do not record two integrative positions. Examples:

- Silicon dioxide. The tab cites the EFSA 2018 nanoparticle review. No integrative pair is recorded.
- Sodium carbonate. The entry cites FDA GRAS (21 CFR 184.1742), EFSA, and CIR. CIR is a supporting source. No integrative pair is recorded.
- Myrrh oil. The entry cites FDA 21 CFR 172.510 and FEMA 2766. Both are supporting sources. No integrative pair is recorded.
- Decyl glucoside, carbomer interpolymer, and the other CIR condition-rule rows. The entry cites CIR. CIR is a supporting source. No integrative pair is recorded.
- Colloidal silver. The worked example cites NCCIH once, plus Mayo and case reports. That is one integrative source, not two.

Methodology entries outside those 190 set strings were checked the same way. The paragraphs that name two or more integrative sources are the §4a source list itself and a process restatement. They do not record a per-token grade from those sources. They are not would-change items.
