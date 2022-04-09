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
    }
}