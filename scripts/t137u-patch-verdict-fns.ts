/**
 * Point batch-local verdictFromFlags helpers at lib/scan-preview/verdictFromFlags.ts (t137u).
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const IMPORT_LINE =
  "import { computeVerdictFromInactiveIngredients, verdictFromFlagSpecs, verdictFromRiskLevels } from '../scan-preview/verdictFromFlags';";

const dir = join(process.cwd(), 'lib/rating-drafts');
let touched = 0;

for (const file of readdirSync(dir)) {
  if (!file.endsWith('.ts')) continue;
  const path = join(dir, file);
  let text = readFileSync(path, 'utf8');
  if (!text.includes('function verdictFromFlags(')) continue;

  if (!text.includes("from '../scan-preview/verdictFromFlags'")) {
    const ratingImport = text.match(/^import .+ from '\.\.\/ratingRecord';?\n/m);
    if (ratingImport) {
      text = text.replace(ratingImport[0], `${ratingImport[0]}${IMPORT_LINE}\n`);
    } else {
      text = `${IMPORT_LINE}\n${text}`;
    }
  }

  text = text.replace(
    /function verdictFromFlags\(flags: FlagSpec\[\]\): RatingRecord\['verdict'\] \{[\s\S]*?\n\}/m,
    `function verdictFromFlags(flags: FlagSpec[]): RatingRecord['verdict'] {\n  return verdictFromFlagSpecs(flags);\n}`,
  );
  text = text.replace(
    /function verdictFromFlags\(levels: RiskLevel\[\]\): RatingRecord\['verdict'\] \{[\s\S]*?\n\}/m,
    `function verdictFromFlags(levels: RiskLevel[]): RatingRecord['verdict'] {\n  return verdictFromRiskLevels(levels);\n}`,
  );
  text = text.replace(
    /function verdictFromFlags\(spec: \{ flags: FlagSpec\[\] \}\): RatingRecord\['verdict'\] \{[\s\S]*?\n\}/m,
    `function verdictFromFlags(spec: { flags: FlagSpec[] }): RatingRecord['verdict'] {\n  return verdictFromFlagSpecs(spec.flags);\n}`,
  );

  text = text.replace(
    /function expectedVerdict\(record: RatingRecord\): RatingRecord\['verdict'\] \{[\s\S]*?\n\}/m,
    `function expectedVerdict(record: RatingRecord): RatingRecord['verdict'] {\n  return computeVerdictFromInactiveIngredients(record.inactiveIngredients, record.activeSafetyFlag).verdict;\n}`,
  );

  writeFileSync(path, text);
  touched++;
  console.log('patched', file);
}
console.log({ touched });
