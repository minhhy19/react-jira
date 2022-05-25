import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { commentService } from '../../../services/CommentService';
import { messageApp } from '../../../util/Common/Message';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notificationFunction } from '../../../util/Notification/notificationJira';
import { DELETE_COMMENT_SAGA, INSERT_COMMENT_SAGA } from '../../constants/Jira/CommentConstants';
import { GET_TASK_DETAIL_SAGA } from '../../constants/Jira/TaskConstants';

const {
    messageDeleteCommentSuccess
} = messageApp;

function * insertCommentSaga(action) {
    try {
        console.log(action)
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

function * deleteCommentSaga(action) {
    try {
        const {data, status} = yield call(() => commentService.deleteComment(action.commentId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId
            })
            notificationFunction('success', messageDeleteCommentSuccess)
        }

    } catch (err) {
        notificationFunction('error', err.response?.data.message);
        console.log(err);
        console.log(err.response?.data);
    }
}

export function * theoDoiDeleteCommentSaga() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}