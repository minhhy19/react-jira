import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import reduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
    //Nơi chứa các state của ứng dụng
    
});

let middleWare = applyMiddleware(reduxThunk);

let composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const store = createStore(rootReducer, composeCustom);