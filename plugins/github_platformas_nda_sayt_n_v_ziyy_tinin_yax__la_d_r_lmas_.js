class ProjectManager {
  constructor() {
    this.storageLimit = 1024 * 1024; // 1 TB in MB
    this.usedStorage = 0;
    this.projects = new Map();
  }

  createProject(name, sizeInMB) {
    if (this.usedStorage + sizeInMB > this.storageLimit) {
      throw new Error("Yaddaş çatışmır: 1 TB limiti aşıldı.");
    }

    const project = {
      id: Date.now(),
      name,
      size: sizeInMB,
      status: 'active',
      createdAt: new Date()
    };

    this.projects.set(project.id, project);
    this.usedStorage += sizeInMB;
    return project;
  }

  deleteProject(projectId) {
    const project = this.projects.get(projectId);
    if (project) {
      this.usedStorage -= project.size;
      this.projects.delete(projectId);
      return true;
    }
    return false;
  }

  getStorageStats() {
    return {
      used: this.usedStorage,
      remaining: this.storageLimit - this.usedStorage,
      capacity: this.storageLimit
    };
  }

  listProjects() {
    return Array.from(this.projects.values());
  }
}

const robotManager = new ProjectManager();