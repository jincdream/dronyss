/**
 * Returns the output file name based on the input file name and the production flag.
 *
 * @param {string} fileName - The input file name.
 * @param {boolean} [isProd=false] - The production flag.
 * @returns {string} The output file name.
 */
function getOutputFileName(fileName: string, isProd: boolean = false): string {
  return isProd ? fileName.replace(/\.js$/, '.min.js') : fileName;
}

export { getOutputFileName };
