import { USER_LOGIN } from "../../util/constants/settingSystem";
import { EDIT_USER, GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, USLOGIN } from "../constants/Jira/UserConstants";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}


const stateDefault = {
    userLogin: usLogin,
    userSearch: [],
    arrUser:[], // Array user cho thẻ select create task
    userEdit: {}
}

export const UserReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return {...state}
        }
        case GET_USER_SEARCH: {
            state.userSearch = action.lstUserSearch;
            return {...state}
        }
        case GET_USER_BY_PROJECT_ID: {
            return {...state, arrUser:action.arrUser}
        }
        case EDIT_USER: {
            state.userEdit = action.userEditModel;
            return {...state}
        }
        default: return {...state};
    }
}