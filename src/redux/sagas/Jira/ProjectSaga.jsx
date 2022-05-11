import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { projectService } from '../../../services/ProjectService';
import { history, STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationCyberbugs';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from '../../constants/Jira/ProjectConstants';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';

function * createProjectSaga(action) {
    // console.log('createProjectAction', action)
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => projectService.createProject(action.newProject));

        // Gọi API thành công thì dispatch lên reducer thông qua put
        if(status === STATUS_CODE.SUCCESS) {
            console.log(data);
            history.push('/projectmanagement');
        }
    } catch(err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}

// Saga dùng để update project
function * updateProjectSaga(action) {
    // console.log('actionupdateProjectSaga', action)
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => projectService.updateProject(action.projectUpdate));

        // Gọi API thành công thì dispatch lên reducer thông qua put
        if(status === STATUS_CODE.SUCCESS) {
            console.log(data);
            // history.push('/projectmanagement');
        }
        // load lại list project
        yield call(getAllProjectSaga);

        // tắt drawer
        yield put({
            type: 'CLOSE_DRAWER'
        })
    } catch(err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}

// Saga dùng để delete project
function * deleteProjectSaga(action) {
    // console.log('actionupdateProjectSaga', action)
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));

        // Gọi API thành công thì dispatch lên reducer thông qua put
        if(status === STATUS_CODE.SUCCESS) {
            console.log(data);
            // history.push('/projectmanagement');
            notificationFunction('success', 'Delete project successfully!')
        } else {
            notificationFunction('error', 'Delete project fail!')
        }
        // load lại list project
        yield call(getAllProjectSaga);

        // tắt drawer
        yield put({
            type: 'CLOSE_DRAWER'
        })
    } catch(err) {
        notificationFunction('error', 'Delete project fail!')
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}

function * getProjectDetailSaga(action) {
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        // Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })
    } catch(err) {
        console.log(err);
        history.push('/projectmanagement')
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function* theoDoiGetProjectDetailSaga() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);
}

function * getAllProjectSaga(action) {
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => projectService.getAllProject());
        // Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
    } catch(err) {
        console.log(err);
        history.push('/projectmanagement')
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}