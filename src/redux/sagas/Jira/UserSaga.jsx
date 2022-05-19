import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { userService } from '../../../services/UserService';
import { ACCESS_TOKEN, history, STATUS_CODE, USER_LOGIN } from '../../../util/constants/settingSystem';
import { GET_USER_SAGA, GET_USER_SEARCH, USER_SIGNIN_API, USLOGIN } from '../../constants/Jira/UserConstants';
import { GET_ALL_PROJECT_SAGA } from '../../constants/Jira/ProjectConstants';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/Jira/UserConstants';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';
import { notificationFunction } from '../../../util/Notification/notificationJira';
import { messageApp } from '../../../util/Common/Message';

const {
    messageLoginSuccess
} = messageApp;


// Quản lý các action saga

function * signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    // yield delay(500);
    // Gọi api
    try {
        const { data, status } = yield call(() => userService.signin(action.userLogin));
        if(status === STATUS_CODE.SUCCESS) {
            // lưu vào localstorage khi đăng nhập thành công
            localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
            // console.log(data);

            yield put({
                type: USLOGIN,
                userLogin: data.content
            })
            notificationFunction('success', messageLoginSuccess);
            // let history = yield select(state => state.HistoryReducer.history)
            history.push('/');
        }
    } catch(err) {
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}



function * getUserSaga(action) {

    // action.keyWord

    // Gọi api
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));
        console.log('data', data);
        yield put({
            type: GET_USER_SEARCH,
            lstUserSearch: data.content
        })
    } catch(err) {
        console.log(err.response?.data);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function * theoDoiGetUserSaga() {
    yield takeLatest(GET_USER_SAGA, getUserSaga);
}

function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    // console.log('action',idProject)

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
        // console.log('checkdata',data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser:[]
            })
        }
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}