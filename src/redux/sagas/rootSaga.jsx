import { all } from "redux-saga/effects";
import * as UserSaga from './Jira/UserSaga'
import * as ProjectCategorySaga from './Jira/ProjectCategorySaga';
import * as ProjectSaga from './Jira/ProjectSaga';
import * as TaskTypeSaga from './Jira/TaskTypeSaga';
import * as PrioritySaga from './Jira/PrioritySaga';
import * as StatusSaga from './Jira/StatusSaga';
import * as TaskSaga from './Jira/TaskSaga';
import * as CommentSaga from './Jira/CommentSaga';

export function* rootSaga() {

  yield all([
    //Nghiệp vụ Jira .... 
    UserSaga.theoDoiSignUpSaga(),
    UserSaga.theoDoiSignin(),
    UserSaga.theoDoiGetUserSaga(),
    UserSaga.theoDoiGetUserByProjectIdSaga(),
    
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),

    ProjectSaga.theoDoiAddUserProjectSaga(),
    ProjectSaga.theoDoiRemoveUserProjectSaga(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    ProjectSaga.theoDoiSearchProjectSaga(),
    
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

    PrioritySaga.theoDoiGetAllPrioritySaga(),

    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiRemoveTaskSaga(),

    CommentSaga.theoDoiInsertCommentSaga(),
    CommentSaga.theoDoiDeleteCommentSaga(),
    CommentSaga.theoDoiUpdateCommentSaga(),
  ])
}