import { Avatar } from 'antd';
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../../../redux/constants/Jira/TaskConstants';
export default function ContentMain(props) {

    const { projectDetail } = props;
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        // console.log(result);
        let {projectId, taskId} = JSON.parse( result.draggableId ); //Lấy ra chuỗi sau mỗi lần draggable

        // console.log({projectId,taskId} )
        let { source, destination } = result;
        if (!result.destination) {
            return;
        }
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        // Gọi api cập nhật lại status
        dispatch({
            type: UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                "projectId": projectId
            }
        })
    }

    const renderPriority = (priority) => {
        switch(priority.priorityId) {
            case 1: {
                return <i className="fa fa-arrow-up fa-arrow-up--high" />
            }
            case 2: {
                return <i className="fa fa-arrow-up fa-arrow-up--medium" />
            }
            case 3: {
                return <i className="fa fa-arrow-down fa-arrow-down--low" />
            }
            case 4: {
                return <i className="fa fa-arrow-down fa-arrow-down--lowest" />
            }
            default: return '';
        }
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetail.lstTask?.map((taskListDetail) => {
                    return <Droppable key={taskListDetail.statusId} droppableId={taskListDetail.statusId.toString()}>
                        {(provided) => {
                            return <div
                                className="card pb-2" style={{ width: '24.5%', height: 'auto' }} >
                                <div className="card-header">
                                    {taskListDetail.statusName}
                                </div>
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    key={taskListDetail.statusId}
                                    className="list-group list-group-flush" style={{ height: '100%' }}>
                                    {taskListDetail.lstTaskDeTail.map((task, index) => {
                                        return <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({ projectId: task.projectId, taskId: task.taskId })}>
                                            {(provided) => {
                                                return <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={task.taskId} className="list-group-item"
                                                    data-toggle="modal"
                                                    data-target="#infoModal"
                                                    onClick={() => {
                                                        dispatch({ type: GET_TASK_DETAIL_SAGA, taskId: task.taskId });
                                                    }}>
                                                    <p className="font-weight-300">
                                                        {task.taskName}
                                                    </p>
                                                    <div className="block" style={{ display: 'flex' }}>
                                                        <div className="block-left">
                                                            {task.typeId === 1 ? <i className="fas fa-exclamation-circle"></i> : <i className="fas fa-check-square"></i>}
                                                            {/* <span className="text-danger">{task.priorityTask.priority}</span> */}
                                                            {renderPriority(task.priorityTask)}
                                                        </div>
                                                        <div className="block-right">
                                                            <div className="avatar-group" style={{ display: 'flex' }}>
                                                                {task.assigness?.slice(0, 7).map((mem) => {
                                                                    return <div className="avatar" key={mem.id}>
                                                                        <img src={mem.avatar} alt={mem.avatar} />
                                                                    </div>
                                                                })}
                                                                {task.assigness?.length > 7 ?  <div className='avatar'><Avatar>...</Avatar></div> : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }}
                                        </Draggable>
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        }}
                    </Droppable>
                })}
        </DragDropContext>
    }
    return (
        <div className="content">
            {renderCardTaskList()}
        </div>
    )
}