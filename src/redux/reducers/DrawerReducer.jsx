import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, OPEN_FORM_CREATE_USER, OPEN_FORM_EDIT_PROJECT, OPEN_FORM_EDIT_USER, SET_SUBMIT_CREATE_TASK, SET_SUBMIT_CREATE_USER, SET_SUBMIT_EDIT_PROJECT } from "../constants/DrawerConstant"

const initialState = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>Default</p>,
    callBackSubmit: (propsValue) => {
        alert('click demo')
    }
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            return { ...state, visible: true }
        case CLOSE_DRAWER:
            return { ...state, visible: false }
        case OPEN_FORM_EDIT_PROJECT: {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        case SET_SUBMIT_EDIT_PROJECT: {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }
        case SET_SUBMIT_CREATE_TASK: {
            return {...state, callBackSubmit: action.submitFunction}
        }
        case SET_SUBMIT_CREATE_USER: {
            return {...state, callBackSubmit: action.submitFunction}
        }
        case OPEN_FORM_CREATE_TASK: {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        case OPEN_FORM_CREATE_USER: {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        case OPEN_FORM_EDIT_USER: {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        default:
            return state
    }
}
