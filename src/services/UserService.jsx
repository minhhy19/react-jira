import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }

    signup = (userSignUp) => {
        return this.post(`users/signup`, userSignUp)
    }

    signin = (userLogin) => {
        return this.post(`users/signin`, userLogin)
    }

    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    getUserByProjectId = (idProject) =>{ 
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }

    editUser = (userEdit) =>{ 
        return this.put(`users/editUser`, userEdit)
    }

    deleteUser = (userId) =>{ 
        return this.delete(`users/deleteUser?id=${userId}`)
    }
}

export const userService = new UserService();