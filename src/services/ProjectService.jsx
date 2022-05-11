import { baseService } from "./baseService";

export class ProjectService extends baseService {
    constructor() {
        super();
    }
    
    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }

    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject)
    }

    createProject = (newProject) => {
        return this.post(`project/createProjectAuthorize`, newProject)
    }

    updateProject = (projectUpdate) => {
        return this.put(`project/updateProject?projectId=${projectUpdate.id}`, projectUpdate)
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`)
    }

    deleteProject = (id) => {
        return this.delete(`Project/deleteProject?projectId=${id}`)
    }

    getProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
}

export const projectService = new ProjectService();