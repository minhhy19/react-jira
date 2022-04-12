import { all } from "redux-saga/effects";
import * as Cyberbugs from './Cyberbugs/UserCyberbugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';

export function* rootSaga() {

  yield all([
    //Nghiệp vụ cyberbugs .... 
    Cyberbugs.theoDoiSignin(),
    
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),

    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga()

  ])
}