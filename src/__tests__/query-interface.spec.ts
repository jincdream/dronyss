import { QueryInterface } from '../query-interface';

describe('QueryInterface', () => {
  let queryInterface: QueryInterface;

  beforeEach(() => {
    queryInterface = new QueryInterface();
  });

  it('should get file content', () => {
    const filePath = 'path/to/file';
    const fileContent = queryInterface.getFileContent(filePath);
    expect(fileContent).toEqual({ content: '', filePath });
  });

  it('should get file dependencies', () => {
    const filePath = 'path/to/file';
    const fileDependencies = queryInterface.getFileDependencies(filePath);
    expect(fileDependencies).toEqual({ dependencies: [] });
  });

  it('should correctly get file content', () => {
    const filePath = 'path/to/file';
    const fileContent = queryInterface.getFileContent(filePath);
    expect(fileContent).toEqual({ content: '', filePath });
  });

  it('should correctly get file dependencies', () => {
    const filePath = 'path/to/file';
    const fileDependencies = queryInterface.getFileDependencies(filePath);
    expect(fileDependencies).toEqual({ dependencies: [] });
  });
});
