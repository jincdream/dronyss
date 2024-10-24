import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

class DependencyAnalyzer {
  analyzeProjectDependencies(filePaths: string[]): ProjectDependencies {
    const projectDependencies: ProjectDependencies = {};

    filePaths.forEach(filePath => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

      ts.forEachChild(sourceFile, node => {
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
          const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
          if (!projectDependencies[filePath]) {
            projectDependencies[filePath] = [];
          }
          projectDependencies[filePath].push(moduleSpecifier);
        }
      });
    });

    return projectDependencies;
  }

  analyzeExternalDependencies(filePaths: string[]): ExternalDependencies {
    const externalDependencies: ExternalDependencies = {};

    filePaths.forEach(filePath => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

      ts.forEachChild(sourceFile, node => {
        if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
          const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
          if (moduleSpecifier.startsWith('http') || moduleSpecifier.startsWith('//')) {
            if (!externalDependencies[filePath]) {
              externalDependencies[filePath] = [];
            }
            externalDependencies[filePath].push(moduleSpecifier);
          }
        }
      });
    });

    return externalDependencies;
  }
}

export { DependencyAnalyzer };
