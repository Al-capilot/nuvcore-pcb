class RobotProjectManager {
  constructor() {
    this.storageCapacity = 1024 * 1024 * 1024 * 1024;
    this.usedStorage = 0;
    this.projects = new Map();
  }

  async checkWebsite(url) {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const dataSize = new Blob([data]).size;

      if (this.usedStorage + dataSize > this.storageCapacity) {
        throw new Error("Yaddaş çatışmazlığı");
      }

      const report = {
        url,
        status: response.status,
        size: dataSize,
        timestamp: new Date().toISOString()
      };

      this.usedStorage += dataSize;
      return report;
    } catch (error) {
      return { url, error: error.message };
    }
  }

  createProject(projectId, urls = []) {
    this.projects.set(projectId, { urls, logs: [] });
  }

  async runProject(projectId) {
    const project = this.projects.get(projectId);
    if (!project) return;

    for (const url of project.urls) {
      const result = await this.checkWebsite(url);
      project.logs.push(result);
    }
    return project.logs;
  }

  getStorageStatus() {
    return {
      used: this.usedStorage,
      remaining: this.storageCapacity - this.usedStorage
    };
  }
}