import { call, put, select, takeLatest } from 'redux-saga/effects'
import { taskService } from '../../../services/TaskService'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationJira'
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConstant';
import { HANDLE_CHANGE_POST_API_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA, CHANGE_TASK_MODAL, CHANGE_ASSIGNESS, REMOVE_USER_ASSIGN, CREATE_TASK_SAGA } from '../../constants/Jira/TaskConstants'
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
            type: 'CLOSE_DRAWER'
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