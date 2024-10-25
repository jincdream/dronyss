import { handleFileDependencies, updateDependencies } from '../../scripts/build';

describe('Build Script', () => {
  it('should handle file dependencies', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    handleFileDependencies();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Project Dependencies:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('External Dependencies:'));
    consoleSpy.mockRestore();
  });

  it('should update dependencies', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    updateDependencies();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Project Dependencies:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('External Dependencies:'));
    consoleSpy.mockRestore();
  });

  it('should correctly handle file dependencies', () => {
    const projectRoot = 'path/to/project';
    const consoleSpy = jest.spyOn(console, 'log');
    handleFileDependencies(projectRoot);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Project Dependencies:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('External Dependencies:'));
    consoleSpy.mockRestore();
  });

  it('should correctly update dependencies', () => {
    const projectRoot = 'path/to/project';
    const consoleSpy = jest.spyOn(console, 'log');
    updateDependencies(projectRoot);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Project Dependencies:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('External Dependencies:'));
    consoleSpy.mockRestore();
  });
});
