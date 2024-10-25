/**
 * Converts a camel case string to a dash case string.
 *
 * @param {string} myStr - The camel case string to convert.
 * @returns {string} The dash case string.
 */
function camelCaseToDash(myStr: string): string {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export { camelCaseToDash };
