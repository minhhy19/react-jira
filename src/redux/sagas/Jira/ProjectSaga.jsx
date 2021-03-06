import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { projectService } from '../../../services/ProjectService';
import { messageApp } from '../../../util/Common/Message';
import { history, STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationJira';
import { CLOSE_DRAWER } from '../../constants/DrawerConstant';
import { ADD_USER_PROJECT_API, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_PROJECT_DETAIL, GET_PROJECT_DETAIL_SAGA, REMOVE_USER_PROJECT_API, SEARCH_PROJECT_SAGA, UPDATE_PROJECT_SAGA } from '../../constants/Jira/ProjectConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/Jira/UserConstants';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';

const {
    messageAddUserProjectSuccess,
    messageRemoveUserProjectSuccess,
    messageCreateProjectSuccess,
    messageUpdateProjectSuccess,
    messageDeleteProjectSuccess,
    messageDeleteProjectFailed,
} = messageApp;

function* addUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.assignUserProject(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', messageAddUserProjectSuccess);
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
        }
    } catch (err) {
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiAddUserProjectSaga() {
    yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.deleteUserFromProject(action.userProject));
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', messageRemoveUserProjectSuccess);
            yield put({
                type: GET_ALL_PROJECT_SAGA
            })
        }
    } catch (err) {
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiRemoveUserProjectSaga() {
    yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

function* createProjectSaga(action) {
    // hi????n thi?? loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.createProject(action.newProject));

        // Go??i API tha??nh c??ng thi?? dispatch l??n reducer th??ng qua put
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', messageCreateProjectSuccess);
            history.push('/project');
        }
    } catch (err) {
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiCreateProjectSaga() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

// Saga du??ng ?????? update project
function* updateProjectSaga(action) {
    // hi????n thi?? loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.updateProject(action.projectUpdate));

        // Go??i API tha??nh c??ng thi?? dispatch l??n reducer th??ng qua put
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', messageUpdateProjectSuccess);
        }
        // load la??i list project
        yield call(getAllProjectSaga);

        // t????t drawer
        yield put({
            type: CLOSE_DRAWER
        })
    } catch (err) {
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// Saga du??ng ?????? delete project
function* deleteProjectSaga(action) {
    // hi????n thi?? loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));

        // Go??i API tha??nh c??ng thi?? dispatch l??n reducer th??ng qua put
        if (status === STATUS_CODE.SUCCESS) {
            notificationFunction('success', messageDeleteProjectSuccess)
        } else {
            notificationFunction('error', messageDeleteProjectFailed)
        }
        // load la??i list project
        yield call(getAllProjectSaga);

        // t????t drawer
        yield put({
            type: CLOSE_DRAWER
        })
    } catch (err) {
        notificationFunction('error', err.response?.data.message || messageDeleteProjectFailed)
        console.log(err.response?.data);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiDeleteProjectSaga() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
    // hi????n thi?? loading
    // yield put({
    //     type: DISPLAY_LOADING
    // })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        // L????y d???? li????u tha??nh c??ng thi?? ????a d???? li????u l??n redux
        yield put({
            type: GET_PROJECT_DETAIL,
            projectDetail: data.content
        })
    } catch (err) {
        console.log(err.response?.data);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        } else {
            history.push('/project')
        }
    }
    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function* theoDoiGetProjectDetailSaga() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

function* getAllProjectSaga(action) {
    // hi????n thi?? loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.getAllProject());
        // L????y d???? li????u tha??nh c??ng thi?? ????a d???? li????u l??n redux
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })

        yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            idProject: data.content[0].id
        })
    } catch (err) {
        console.log(err.response?.data);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

function* searchProjectSaga(action) {
    // hi????n thi?? loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Go??i API l????y d???? li????u v????
        const { data, status } = yield call(() => projectService.searchProject(action.keyWord));
        // L????y d???? li????u tha??nh c??ng thi?? ????a d???? li????u l??n redux
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
    } catch (err) {
        console.log(err.response?.data);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiSearchProjectSaga() {
    yield takeLatest(SEARCH_PROJECT_SAGA, searchProjectSaga);
}