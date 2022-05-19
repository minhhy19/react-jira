import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { taskTypeService } from '../../../services/TaskTypeService';
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from '../../constants/Jira/TaskTypeConstant';

function * getAllTaskTypeSaga(action) {
    try {
        const {data, status} = yield call(() => taskTypeService.getAllTaskType())
        yield put({
            type: GET_ALL_TASK_TYPE,
            arrTaskType: data.content
        })

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
    }
}

export function * theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}