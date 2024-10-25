import { dashToCamelCase } from './dashToCamelCase';
import { toUpperCase } from './toUpperCase';

/**
 * Converts a dash case string to a pascal case string.
 *
 * @param {string} myStr - The dash case string to convert.
 * @returns {string} The pascal case string.
 */
function pascalCase(myStr: string): string {
  return toUpperCase(dashToCamelCase(myStr));
}

export { pascalCase };
