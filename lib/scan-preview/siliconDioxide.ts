/** Silicon dioxide family: 0-pt Caution cap; does not count toward the Limited stack (t137u). */
export function isSiliconDioxideStackExempt(name: string): boolean {
  const n = name.trim().toLowerCase();
  if (
    /calcium silicate|magnesium silicate|aluminum silicate|sodium silicate|potassium aluminum silicate|lithium magnesium sodium silicate/.test(
      n,
    )
  ) {
    return false;
  }
  if (/\b6x\b/.test(n) && /silica/.test(n)) return false;
  return (
    n === 'silicon dioxide'
    || n === 'silica'
    || n === 'silica gel'
    || n === 'sipernat'
    || n === 'colloidal silicon dioxide'
    || n === 'colloidal silicone dioxide'
    || n === 'colloidal anhydrous silica'
    || n === 'anhydrous silica'
    || /^silicon dioxide\b/.test(n)
    || /^colloidal (silicon|silica)/.test(n)
  );
}
