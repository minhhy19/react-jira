import { call, put, select, takeLatest } from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationJira'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';
import { HANDLE_CHANGE_POST_API_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA, CHANGE_TASK_MODAL, CHANGE_ASSIGNESS, REMOVE_USER_ASSIGN, CREATE_TASK_SAGA } from '../../constants/Jira/TaskConstants'
import { CLOSE_DRAWER } from '../../constants/DrawerConstant';
import { GET_PROJECT_DETAIL_SAGA } from '../../constants/Jira/ProjectConstants';
function* createTaskSaga(action) {
    try {
        yield put({
            type: DISPLAY_LOADING
        })
        const { data, status } = yield call(() => taskService.createTask(action.taskObject));

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS && data.statusCode === STATUS_CODE.SUCCESS) {
            console.log(data)
            notificationFunction('success', 'Create task successfully !');
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
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function * getTaskDetailSaga(action) {

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
    }
}

export function * theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function * updateTaskStatusSaga(action) {

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
        }
    }
    catch (err) {
        console.log(err.response?.data)
        notificationFunction('error', err.response?.data.message);
    }
}

export function * theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}