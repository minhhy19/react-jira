import { call, put, select, takeLatest } from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { history, STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationJira'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';
import { HANDLE_CHANGE_POST_API_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA, CHANGE_TASK_MODAL, CHANGE_ASSIGNESS, REMOVE_USER_ASSIGN, CREATE_TASK_SAGA, REMOVE_TASK_SAGA } from '../../constants/Jira/TaskConstants'
import { CLOSE_DRAWER } from '../../constants/DrawerConstant';
import { GET_PROJECT_DETAIL_SAGA } from '../../constants/Jira/ProjectConstants';
import { messageApp } from '../../../util/Common/Message';

const {
    messageCreateTaskSuccess,
    messageUpdateTaskStatusSuccess,
    messageUpdateTaskSuccess,
    messageRemoveTaskSuccess
} = messageApp;
function* createTaskSaga(action) {
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const { taskObject } = action;
        const { data, status } = yield call(() => taskService.createTask(taskObject));

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS && data.statusCode === STATUS_CODE.SUCCESS) {
            console.log(data)
            if (history.location.pathname === `/project/detail/${taskObject.projectId}`) {
                yield put({
                    type: GET_PROJECT_DETAIL_SAGA,
                    projectId: taskObject.projectId
                })
            }
            notificationFunction('success', messageCreateTaskSuccess);
        } else {
            notificationFunction('error', data.message);
        }

        yield put({
            type: CLOSE_DRAWER
        })

    }
    catch (err) {
        console.log(err.response?.data)
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {

    try {
        const { taskId } = action;
        const { data, status } = yield call(() => taskService.getTaskDetail(taskId));

        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })
    }
    catch (err) {
        console.log(err.response?.data)
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {

    try {
        const { taskUpdateStatus } = action;
        const { data, status } = yield call(() => taskService.updateStatusTask(taskUpdateStatus));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateStatus.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
            notificationFunction('success', messageUpdateTaskStatusSuccess);
        }
    }
    catch (err) {
        console.log(err.response?.data)
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

// function* updateTaskSaga(action) {

// }

// export function* theoDoiUpdateTaskSaga() {
//     yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
// }

export function* handleChangePostApi(action) {
    // Gọi action làm thay đổi taskDetail modal
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });
        }; break;
        case CHANGE_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_ASSIGNESS,
                userSelected
            })
        }; break;
        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            })
        }; break;
        default: break;
    }

    // Save qua api updateTaskSaga
    // Lây dữ liệu từ state.taskDetailModal 
    let { taskDetailModal } = yield select(state => state.TaskReducer);
    // console.log('taskDetailModal sau khi thay đổi', taskDetailModal)
    // Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

    const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });

    const taskUpdateApi = { ...taskDetailModal, listUserAsign }
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: taskUpdateApi.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
            notificationFunction('success', messageUpdateTaskSuccess);
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}

function* removeTaskSaga(action) {

    try {
        const { taskId, projectId } = action;
        const { data, status } = yield call(() => taskService.removeTask(taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: projectId
            })
            notificationFunction('success', messageRemoveTaskSuccess);
        }
    }
    catch (err) {
        console.log(err.response?.data)
        notificationFunction('error', err.response?.data.message);
        if (err.response?.status === STATUS_CODE.UNAUTHORIZED) {
            history.push('/login')
        }
    }
}

export function* theoDoiRemoveTaskSaga() {
    yield takeLatest(REMOVE_TASK_SAGA, removeTaskSaga);
}