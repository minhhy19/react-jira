import axios from "axios"
import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT } from "../util/constants/settingSystem"
export class baseService {

    // put 
    put = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    }

    // post
    post = (url, model) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    }

    // GET
    get = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    }

    // DELETE
    delete = (url) => {
        return axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: { 
                TokenCybersoft: TOKEN_CYBERSOFT,
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
    }
}
