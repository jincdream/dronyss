import { FileParser } from './file-parser';
import { DependencyAnalyzer } from './dependency-analyzer';
import { DataStorage } from './data-storage';
import { updatePackageJsonDependencies } from './update-package-json-dependencies';
import * as fs from 'fs';
import * as path from 'path';

function handleFileDependencies(projectRoot: string) {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(projectRoot);

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

function getFilePaths(dir: string): string[] {
  const filePaths: string[] = [];

  function readDirRecursive(directory: string) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirRecursive(filePath);
      } else {
        filePaths.push(filePath);
      }
    });
  }

  readDirRecursive(dir);
  return filePaths;
}

function updateDependencies(projectRoot: string) {
  const fileParser = new FileParser();
  const dependencyAnalyzer = new DependencyAnalyzer();
  const dataStorage = new DataStorage();

  const filePaths = getFilePaths(projectRoot);

  filePaths.forEach(filePath => {
    const fileContent = fileParser.parseFile(filePath);
    const dependencies = fileParser.extractDependencies(fileContent);
    dataStorage.addFileMetadata(filePath, fileContent);
    dataStorage.addDependencyInfo(filePath, dependencies);
  });

  const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);

  updatePackageJsonDependencies(externalDependencies);
}

export { handleFileDependencies, updateDependencies, getFilePaths };
