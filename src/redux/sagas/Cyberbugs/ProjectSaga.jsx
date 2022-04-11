import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';

function * createProjectSaga(action) {
    console.log('createProjectAction', action)
    // hiển thị loading
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProject(action.newProject));

        // Gọi API thành công thì dispatch lên reducer thông qua put
        if(status === STATUS_CODE.SUCCESS) {
            // yield put({
            //     type: 'CREATE_PROJECT',
            //     data: data.content
            // })
        }

        console.log(data);
    } catch(err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })
    
}

export function * theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}