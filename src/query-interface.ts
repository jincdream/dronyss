class QueryInterface {
  getFileContent(filePath: string): FileContent {
    // Get file content
    return { content: '', filePath };
  }

  getFileDependencies(filePath: string): DependencyList {
    // Get file dependencies
    return { dependencies: [] };
  }
}

export { QueryInterface };
