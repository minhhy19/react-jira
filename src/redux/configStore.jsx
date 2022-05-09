import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
import LoadingReducers from './reducers/LoadingReducers';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserLoginCyberbugsReducer } from './reducers/UserCyberbugsReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectCyberbugsReducer } from './reducers/ProjectCyberbugsReducer';
import { DrawerCyberBugsReducer } from './reducers/DrawerCyberBugsReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    //Nơi chứa các state của ứng dụng
    LoadingReducers,
    HistoryReducer,
    UserLoginCyberbugsReducer,
    ProjectCategoryReducer,
    ProjectCyberbugsReducer,
    DrawerCyberBugsReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer
});

let middleWare = applyMiddleware(reduxThunk, middleWareSaga);

let composeCustom = compose(
    middleWare,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, composeCustom)

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;