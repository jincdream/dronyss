class DataStorage {
  fileMetadata: Map<string, any>;
  dependencyInfo: Map<string, any>;

  constructor() {
    this.fileMetadata = new Map();
    this.dependencyInfo = new Map();
  }

  addFileMetadata(filePath: string, metadata: any) {
    this.fileMetadata.set(filePath, metadata);
  }

  getFileMetadata(filePath: string): any {
    return this.fileMetadata.get(filePath);
  }

  addDependencyInfo(filePath: string, dependency: any) {
    this.dependencyInfo.set(filePath, dependency);
  }

  getDependencyInfo(filePath: string): any {
    return this.dependencyInfo.get(filePath);
  }
}

export { DataStorage };
