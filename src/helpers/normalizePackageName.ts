/**
 * Normalizes a package name by removing the scope if present.
 *
 * @param {string} rawPackageName - The raw package name to normalize.
 * @returns {string} The normalized package name.
 */
function normalizePackageName(rawPackageName: string): string {
  const scopeEnd = rawPackageName.indexOf('/') + 1;
  return rawPackageName.substring(scopeEnd);
}

export { normalizePackageName };
