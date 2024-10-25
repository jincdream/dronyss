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

  it('should correctly analyze project dependencies', () => {
    const filePaths = ['path/to/project/file1.ts', 'path/to/project/file2.ts'];
    const projectDependencies = dependencyAnalyzer.analyzeProjectDependencies(filePaths);
    expect(projectDependencies['path/to/project/file1.ts']).toContain('some-module');
    expect(projectDependencies['path/to/project/file2.ts']).toContain('another-module');
  });

  it('should correctly analyze external dependencies', () => {
    const filePaths = ['path/to/project/file1.ts', 'path/to/project/file2.ts'];
    const externalDependencies = dependencyAnalyzer.analyzeExternalDependencies(filePaths);
    expect(externalDependencies['path/to/project/file1.ts']).toContain('http://some-external-module');
    expect(externalDependencies['path/to/project/file2.ts']).toContain('http://another-external-module');
  });
});
