import { USER_SIGNIN_API, USER_SIGNUP_API } from "../constants/Jira/UserConstants"

export const signinAction = (email, passWord) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email,
            passWord
        }
    }
}

export const signupAction = (userSignUpInfo) => {
    const { name, phoneNumber, email, passWord } = userSignUpInfo;
    return {
        type: USER_SIGNUP_API,
        userSignUp: {
            name,
            phoneNumber,
            email,
            passWord
        }
    }
}