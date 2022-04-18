const initialState = {
    visible: false,
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
            return { ...state, visible: true, ComponentContentDrawer: action.Component }
        }
        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction;
            return { ...state }
        }
        default:
            return state
    }
}
