import { FileParser } from '../file-parser';

describe('FileParser', () => {
  let fileParser: FileParser;

  beforeEach(() => {
    fileParser = new FileParser();
  });

  it('should parse a TypeScript file and extract dependencies', () => {
    const fileContent = {
      content: `import { something } from 'some-module';`,
      filePath: 'test-file.ts',
    };
    const dependencies = fileParser.extractDependencies(fileContent);
    expect(dependencies.dependencies).toContain('some-module');
  });

  it('should parse a Vue file and extract dependencies', () => {
    const fileContent = {
      content: `<template>
                  <div>Hello World</div>
                </template>
                <script>
                  import { something } from 'some-module';
                </script>
                <style>
                  @import 'some-style.css';
                </style>`,
      filePath: 'test-file.vue',
    };
    const dependencies = fileParser.extractDependencies(fileContent);
    expect(dependencies.dependencies).toContain('some-module');
    expect(dependencies.dependencies).toContain('some-style.css');
  });

  it('should parse an HTML file and extract dependencies', () => {
    const fileContent = {
      content: `<html>
                  <head>
                    <link rel="stylesheet" href="some-style.css">
                  </head>
                  <body>
                    <script src="some-script.js"></script>
                  </body>
                </html>`,
      filePath: 'test-file.html',
    };
    const dependencies = fileParser.extractDependencies(fileContent);
    expect(dependencies.dependencies).toContain('some-style.css');
    expect(dependencies.dependencies).toContain('some-script.js');
  });

  it('should parse a CSS file and extract dependencies', () => {
    const fileContent = {
      content: `@import 'some-style.css';`,
      filePath: 'test-file.css',
    };
    const dependencies = fileParser.extractDependencies(fileContent);
    expect(dependencies.dependencies).toContain('some-style.css');
  });
});
