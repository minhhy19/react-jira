import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/CyberBugs/CyberBugs";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: usLogin
}

export const UserLoginCyberbugsReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        default: return {...state};
    }
}