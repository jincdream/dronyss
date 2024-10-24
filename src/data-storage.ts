class DataStorage {
  fileMetadata: Map<string, any>;
  dependencyInfo: Map<string, any>;

  constructor() {
    this.fileMetadata = new Map();
    this.dependencyInfo = new Map();
  }
}

export { DataStorage };
