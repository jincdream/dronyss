import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import * as vueCompiler from 'vue-template-compiler';
import * as htmlparser2 from 'htmlparser2';
import * as css from 'css';

interface FileContent {
  content: string;
  filePath: string;
}

interface DependencyList {
  dependencies: string[];
}

class FileParser {
  parseFile(filePath: string): FileContent {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { content, filePath };
  }

  extractDependencies(fileContent: FileContent): DependencyList {
    const dependencies: string[] = [];
    const ext = path.extname(fileContent.filePath);

    switch (ext) {
      case '.vue':
        this.extractVueDependencies(fileContent.content, dependencies);
        break;
      case '.ts':
      case '.js':
      case '.tsx':
      case '.jsx':
        this.extractScriptDependencies(fileContent.content, dependencies);
        break;
      case '.html':
        this.extractHtmlDependencies(fileContent.content, dependencies);
        break;
      case '.css':
        this.extractCssDependencies(fileContent.content, dependencies);
        break;
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }

    return { dependencies };
  }

  private extractVueDependencies(content: string, dependencies: string[]) {
    const parsed = vueCompiler.parseComponent(content);
    if (parsed.script) {
      this.extractScriptDependencies(parsed.script.content, dependencies);
    }
    if (parsed.styles) {
      parsed.styles.forEach(style => {
        this.extractCssDependencies(style.content, dependencies);
      });
    }
    if (parsed.template) {
      this.extractHtmlDependencies(parsed.template.content, dependencies);
    }
  }

  private extractScriptDependencies(content: string, dependencies: string[]) {
    const sourceFile = ts.createSourceFile('tempFile.ts', content, ts.ScriptTarget.Latest, true);
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
        dependencies.push(moduleSpecifier);
      }
    });
  }

  private extractHtmlDependencies(content: string, dependencies: string[]) {
    const parser = new htmlparser2.Parser({
      onopentag(name, attribs) {
        if (name === 'script' && attribs.src) {
          dependencies.push(attribs.src);
        }
        if (name === 'link' && attribs.rel === 'stylesheet' && attribs.href) {
          dependencies.push(attribs.href);
        }
      }
    });
    parser.write(content);
    parser.end();
  }

  private extractCssDependencies(content: string, dependencies: string[]) {
    const parsed = css.parse(content);
    parsed.stylesheet?.rules.forEach(rule => {
      if (rule.type === 'import') {
        const importRule = rule as css.Import;
        dependencies.push(importRule.import);
      }
    });
  }
}

export { FileParser };
