import axios from "axios"
import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT } from "../util/constants/settingSystem"

export const cyberbugsService = {
    signinCyberBugs: (userLogin) => {
        return axios({
            url: `${DOMAIN}/users/signin`,
            method: 'POST',
            data: userLogin,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    },
    getAllProjectCategory: () => {
        return axios({
            url: `${DOMAIN}/projectCategory`,
            method: "GET",
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    },
    createProject: (newProject) => {
        return axios({
            url: `${DOMAIN}/project/createProjectAuthorize`,
            method: "POST",
            data: newProject,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    },
    getListProject: () => {
        return axios({
            url: `${DOMAIN}/project/getAllProject`,
            method: "GET",
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    },
    updateProject: (projectUpdate) => {
        return axios({
            url: `${DOMAIN}/project/updateProject?projectId=${projectUpdate.id}`,
            method: "PUT",
            data: projectUpdate,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    },
}