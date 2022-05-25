import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { commentService } from '../../../services/CommentService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { INSERT_COMMENT_SAGA } from '../../constants/Jira/CommentConstants';
import { GET_TASK_DETAIL_SAGA } from '../../constants/Jira/TaskConstants';

function * insertCommentSaga(action) {
    try {
        const {data, status} = yield call(() => commentService.insertComment(action.newComment))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: data.content?.taskId
            })
        }

    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
    }
}

export function * theoDoiInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}