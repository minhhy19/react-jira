import axios from "axios"
import { DOMAIN, TOKEN_CYBERSOFT } from "../util/constants/settingSystem"

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
            url: `${DOMAIN}/project/createProject`,
            method: "POST",
            data: newProject,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })
    }
}