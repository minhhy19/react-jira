import { USER_SIGNIN_API } from "../constants/CyberBugs/CyberBugs"




export const signinAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            passWord: password
        }
    }
}