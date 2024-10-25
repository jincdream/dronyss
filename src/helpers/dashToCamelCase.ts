/**
 * Converts a dash case string to a camel case string.
 *
 * @param {string} myStr - The dash case string to convert.
 * @returns {string} The camel case string.
 */
function dashToCamelCase(myStr: string): string {
  return myStr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

export { dashToCamelCase };
