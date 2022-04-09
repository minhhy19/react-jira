import Axios from 'axios';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { ACCESS_TOKEN, history, USER_LOGIN } from '../../../util/constants/settingSystem';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/CyberBugs/CyberBugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';


// Quản lý các action saga

function * signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    // yield delay(500);
    // Gọi api
    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));
        // lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        // console.log(data);

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // let history = yield select(state => state.HistoryReducer.history)
        history.push('/home');
    } catch(err) {
        console.log(err.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}