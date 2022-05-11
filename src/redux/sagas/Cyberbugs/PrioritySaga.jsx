import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { priorityService } from '../../../services/PriorityService';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from '../../constants/Jira/PriorityConstants';

function * getAllPrioritySaga(action) {
    try {
        const {data, status} = yield call(() => priorityService.getAllPriority())
        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })

    } catch (err) {
        console.log(err);
    }
}

export function * theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}