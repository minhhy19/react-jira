import { baseService } from "./baseService";

export class TaskService extends baseService {

    constructor(){
        super();
    }
    createTask = (taskObject) => {
        return this.post('Project/createTask',taskObject);
    }

    getTaskDetail = (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`);
    }
    
    updateStatusTask = (taskUpdateStatus) => {
        return this.put(`Project/updateStatus`, taskUpdateStatus);
    }
}   


export const taskService = new TaskService();