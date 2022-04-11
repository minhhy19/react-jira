import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberbugsService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/CyberBugs/CyberBugs';

function * getAllProjectCategorySaga (action) {
    try {
        // Gọi API lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.getAllProjectCategory());

        // Gọi API thành công thì dispatch lên reducer thông qua put
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }

        console.log(data);
    } catch(err) {
        console.log(err);
    }
    
}

export function * theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}