/**
 * Converts the first character of a string to uppercase.
 *
 * @param {string} myStr - The string to convert.
 * @returns {string} The string with the first character converted to uppercase.
 */
function toUpperCase(myStr: string): string {
  return `${myStr.charAt(0).toUpperCase()}${myStr.substr(1)}`;
}

export { toUpperCase };
