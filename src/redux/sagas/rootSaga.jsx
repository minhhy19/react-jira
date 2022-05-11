import { all } from "redux-saga/effects";
import * as UserSaga from './Jira/UserSaga'
import * as ProjectCategorySaga from './Jira/ProjectCategorySaga';
import * as ProjectSaga from './Jira/ProjectSaga';
import * as TaskTypeSaga from './Jira/TaskTypeSaga';
import * as PrioritySaga from './Jira/PrioritySaga';
import * as StatusSaga from './Jira/StatusSaga';
import * as TaskSaga from './Jira/TaskSaga';

export function* rootSaga() {

  yield all([
    //Nghiệp vụ Jira .... 
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