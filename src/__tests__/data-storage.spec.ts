import { DataStorage } from '../data-storage';

describe('DataStorage', () => {
  let dataStorage: DataStorage;

  beforeEach(() => {
    dataStorage = new DataStorage();
  });

  it('should add and retrieve file metadata', () => {
    const filePath = 'test-file.ts';
    const metadata = { content: 'test content' };
    dataStorage.addFileMetadata(filePath, metadata);
    const retrievedMetadata = dataStorage.getFileMetadata(filePath);
    expect(retrievedMetadata).toEqual(metadata);
  });

  it('should add and retrieve dependency info', () => {
    const filePath = 'test-file.ts';
    const dependency = { dependencies: ['some-module'] };
    dataStorage.addDependencyInfo(filePath, dependency);
    const retrievedDependency = dataStorage.getDependencyInfo(filePath);
    expect(retrievedDependency).toEqual(dependency);
  });
});
