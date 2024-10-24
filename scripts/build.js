/**
 * This file only purpose is to execute any build related tasks
 */

const { resolve, normalize } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const pkg = require('../package.json')
const { FileParser } = require('../src/file-parser');
const { DependencyAnalyzer } = require('../src/dependency-analyzer');
const { DataStorage } = require('../src/data-storage');

const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const TYPES_ROOT_FILE = resolve(DIST, normalize(pkg.typings))

main()

function main() {
  writeDtsHeader()
  handleFileDependencies()
}

function writeDtsHeader() {
  const dtsHeader = getDtsHeader(
    pkg.name,
    pkg.version,
    pkg.author,
    pkg.repository.url,
    pkg.devDependencies.typescript
  )

  prependFileSync(TYPES_ROOT_FILE, dtsHeader)
}

/**
 *
 * @param {string} pkgName
 * @param {string} version
 * @param {string} author
 * @param {string} repoUrl
 * @param {string} tsVersion
 */
function getDtsHeader(pkgName, version, author, repoUrl, tsVersion) {
  const extractUserName = repoUrl.match(/\.com\/([\w-]+)\/\w+/i)
  const githubUserUrl = extractUserName ? extractUserName[1] : 'Unknown'

  return `
// Type definitions for ${pkgName} ${version}
// Project: ${repoUrl}
// Definitions by: ${author} <https://github.com/${githubUserUrl}>
// Definitions: ${repoUrl}
// TypeScript Version: ${tsVersion}
`.replace(/^\s+/gm, '')
}

/**
 *
 * @param {string} path
 * @param {string | Blob} data
 */
function prependFileSync(path, data) {
  const existingFileContent = readFileSync(path, {
    encoding: 'utf8',
  })
  const newFileContent = [data, existingFileContent].join('\n')
  writeFileSync(path, newFileContent, {
    flag: 'w+',
    encoding: 'utf8',
  })
}

function handleFileDependencies() {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(ROOT); // Implement this function to get all file paths in the project

  filePaths.forEach(filePath => {
    const fileContent = fileParser.parseFile(filePath);
    const dependencies = fileParser.extractDependencies(fileContent);
    dataStorage.addFileMetadata(filePath, fileContent);
    dataStorage.addDependencyInfo(filePath, dependencies);
  });

  const projectDependencies = dependencyAnalyzer.analyzeProjectDependencies(filePaths);
  const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);

  console.log('Project Dependencies:', projectDependencies);
  console.log('External Dependencies:', externalDependencies);
}

function getFilePaths(dir) {
  // Implement this function to get all file paths in the project
  // You can use a library like 'glob' to get all file paths
  return [];
}
