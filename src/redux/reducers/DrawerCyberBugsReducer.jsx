const initialState = {
    visible: false,
    title: '',
    ComponentContentDrawer: <p>Default</p>,
    callBackSubmit: (propsValue) => {
        alert('click demo')
    }
}

export const DrawerCyberBugsReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER':
            return { ...state, visible: true }
        case 'CLOSE_DRAWER':
            return { ...state, visible: false }
        case 'OPEN_FORM_EDIT_PROJECT': {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }
        case 'SET_SUBMIT_CREATE_TASK' : {
            return {...state, callBackSubmit:action.submitFunction}
        }
        case 'OPEN_FORM_CREATE_TASK': {
            state.visible = true;
            state.ComponentContentDrawer = action.Component;
            state.title = action.title;
            return { ...state }
        }
        default:
            return state
    }
}
