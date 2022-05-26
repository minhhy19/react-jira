import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/Jira/TaskConstants"

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 1,
            "priority": "High"
        },
        "taskTypeDetail": {
            "id": 1,
            "taskType": "bug"
        },
        "assigness": [
            {
                "id": 68,
                "avatar": "https://ui-avatars.com/api/?name=khải",
                "name": "khải",
                "alias": "khai"
            },
            {
                "id": 69,
                "avatar": "https://ui-avatars.com/api/?name=thoa",
                "name": "thoa",
                "alias": "thoa"
            }
        ],
        "lstComment": [],
        "taskId": 54,
        "taskName": "",
        "alias": "",
        "description": "<p></p>",
        "statusId": "2",
        "originalEstimate": 30,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 10,
        "typeId": 1,
        "priorityId": 1,
        "projectId": 109,
        "createdAt": '',
        "updatedAt": ''
    }
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL: {
            return { ...state, taskDetailModal: action.taskDetailModal }
        }
        case CHANGE_TASK_MODAL: {
            const { name, value } = action;
            console.log('name', name);
            console.log('value', value);
            return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } }
        }
        case CHANGE_ASSIGNESS: {
            state.taskDetailModal.assigness = [ ...state.taskDetailModal.assigness, action.userSelected ];
            // console.log('state',state)
            return { ...state }
        }
        case REMOVE_USER_ASSIGN: {
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
            return {...state}
        }
        default:
            return { ...state }
    }
}
