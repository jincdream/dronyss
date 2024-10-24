/**
 * This file only purpose is to copy files before npm publish and strip churn/security sensitive metadata from package.json
 *
 * **NOTE:**
 * 👉 This file should not use any 3rd party dependency
 */
const { writeFileSync, copyFileSync, statSync } = require('fs')
const { resolve, basename } = require('path')
const packageJson = require('../package.json')
const { FileParser } = require('../src/file-parser');
const { DependencyAnalyzer } = require('../src/dependency-analyzer');
const { DataStorage } = require('../src/data-storage');
const { updatePackageJsonDependencies } = require('../src/update-package-json-dependencies');

main()

function main() {
  const projectRoot = resolve(__dirname, '..')
  const distPath = resolve(projectRoot, 'dist')
  const distPackageJson = createDistPackageJson(packageJson)

  const cpFiles = ['README.md', 'CHANGELOG.md', 'LICENSE.md', '.npmignore'].map(
    (file) => resolve(projectRoot, file)
  )

  cp(cpFiles, distPath)

  writeFileSync(resolve(distPath, 'package.json'), distPackageJson)

  handleFileDependencies(projectRoot);
  updateDependencies(projectRoot);
}

/**
 *
 * @param {string[]|string} source
 * @param {string} target
 */
function cp(source, target) {
  const isDir = statSync(target).isDirectory()

  if (isDir) {
    if (!Array.isArray(source)) {
      throw new Error(
        'if <target> is directory you need to provide source as an array'
      )
    }

    source.forEach((file) =>
      copyFileSync(file, resolve(target, basename(file)))
    )

    return
  }

  copyFileSync(/** @type {string} */ (source), target)
}

/**
 * @param {typeof packageJson} packageConfig
 * @return {string}
 */
function createDistPackageJson(packageConfig) {
  const {
    devDependencies,
    scripts,
    engines,
    config,
    husky,
    'lint-staged': lintStaged,
    ...distPackageJson
  } = packageConfig

  return JSON.stringify(distPackageJson, null, 2)
}

function handleFileDependencies(projectRoot) {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(projectRoot); // Implement this function to get all file paths in the project

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

function updateDependencies(projectRoot) {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(projectRoot); // Implement this function to get all file paths in the project

  filePaths.forEach(filePath => {
    const fileContent = fileParser.parseFile(filePath);
    const dependencies = fileParser.extractDependencies(fileContent);
    dataStorage.addFileMetadata(filePath, fileContent);
    dataStorage.addDependencyInfo(filePath, dependencies);
  });

  const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);

  updatePackageJsonDependencies(externalDependencies);
}
