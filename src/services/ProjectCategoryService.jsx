import { baseService } from "./baseService";

export class ProjectCategoryService extends baseService {
    constructor() {
        super();
    }

    getAllProjectCategory = () => {
        return this.get(`projectCategory`);
    }
}

export const projectCategoryService = new ProjectCategoryService();