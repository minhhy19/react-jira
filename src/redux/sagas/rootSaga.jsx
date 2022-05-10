import { all } from "redux-saga/effects";
import * as UserSaga from './Cyberbugs/UserSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga';
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';

export function* rootSaga() {

  yield all([
    //Nghiệp vụ cyberbugs .... 
    UserSaga.theoDoiSignin(),
    UserSaga.theoDoiGetUserSaga(),
    UserSaga.theoDoiAddUserProjectSaga(),
    UserSaga.theoDoiRemoveUserProjectSaga(),
    UserSaga.theoDoiGetUserByProjectIdSaga(),
    
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),

    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

    PrioritySaga.theoDoiGetAllPrioritySaga(),

    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
  ])
}