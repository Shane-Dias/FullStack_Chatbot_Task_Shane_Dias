/**
 * Classic Levenshtein edit distance - used to tolerate small typos
 * ("servises" vs "services") without pulling in an extra dependency.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const matrix: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) matrix[i][0] = i;
  for (let j = 0; j <= n; j++) matrix[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[m][n];
}

/** Returns true if `word` is within a typo-tolerant distance of `target`. */
export function isFuzzyMatch(word: string, target: string): boolean {
  if (word === target) return true;
  if (Math.abs(word.length - target.length) > 2) return false;
  // Allow 1 edit for short words, 2 for longer ones.
  const threshold = target.length <= 5 ? 1 : 2;
  return levenshtein(word, target) <= threshold;
}

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
