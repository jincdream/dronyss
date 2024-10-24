import { RepositoryManager } from '../repository-manager';

describe('RepositoryManager', () => {
  let repositoryManager: RepositoryManager;

  beforeEach(() => {
    repositoryManager = new RepositoryManager();
  });

  it('should add a file to the repository', () => {
    const file = { content: 'file content', filePath: 'test-file.ts' };
    repositoryManager.addFile(file);
    const retrievedFile = repositoryManager.getFile('test-file.ts');
    expect(retrievedFile).toEqual(file);
  });

  it('should delete a file from the repository', () => {
    const file = { content: 'file content', filePath: 'test-file.ts' };
    repositoryManager.addFile(file);
    repositoryManager.deleteFile('test-file.ts');
    const retrievedFile = repositoryManager.getFile('test-file.ts');
    expect(retrievedFile).toBeUndefined();
  });

  it('should update a file in the repository', () => {
    const file = { content: 'file content', filePath: 'test-file.ts' };
    repositoryManager.addFile(file);
    const updatedFile = { content: 'updated content', filePath: 'test-file.ts' };
    repositoryManager.updateFile(updatedFile);
    const retrievedFile = repositoryManager.getFile('test-file.ts');
    expect(retrievedFile).toEqual(updatedFile);
  });

  it('should get a file from the repository', () => {
    const file = { content: 'file content', filePath: 'test-file.ts' };
    repositoryManager.addFile(file);
    const retrievedFile = repositoryManager.getFile('test-file.ts');
    expect(retrievedFile).toEqual(file);
  });
});
