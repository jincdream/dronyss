import { DependencyAnalyzer } from '../dependency-analyzer';

describe('DependencyAnalyzer', () => {
  let dependencyAnalyzer: DependencyAnalyzer;

  beforeEach(() => {
    dependencyAnalyzer = new DependencyAnalyzer();
  });

  it('should analyze project dependencies', () => {
    const filePaths = ['test-file.ts'];
    const projectDependencies = dependencyAnalyzer.analyzeProjectDependencies(filePaths);
    expect(projectDependencies['test-file.ts']).toContain('some-module');
  });

  it('should analyze external dependencies', () => {
    const filePaths = ['test-file.ts'];
    const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);
    expect(externalDependencies['test-file.ts']).toContain('http://some-external-module');
  });
});
