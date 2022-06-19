import { EDIT_PROJECT, GET_ALL_PROJECT, GET_PROJECT_DETAIL } from "../constants/Jira/ProjectConstants";

const initialState = {
    projectEdit: {
        id: 0,
        projectName: "string",
        creator: 0,
        description: "string",
        categoryId: "1"
    },
    projectDetail: {

    },
    arrProject: [] // Get all project cho dropdown
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROJECT: {
            state.projectEdit = action.projectEditModel;
            // console.log("actionProject", action.projectEditModel)
            return {...state}
        }
        case GET_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail;
            return { ...state }
        }
        case GET_ALL_PROJECT: {
            state.arrProject = action.arrProject;
            return {...state}
        }
        default:
            return state
    }
}
