import React, { useEffect, useState } from 'react'
import { Popconfirm, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from '../../../../redux/constants/Jira/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../../redux/constants/Jira/PriorityConstants';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_TASK_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../../redux/constants/Jira/TaskConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../../redux/constants/Jira/TaskTypeConstant';
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik';
import { INSERT_COMMENT_SAGA } from '../../../../redux/constants/Jira/CommentConstants';
import CommentList from './ListComment/CommentList';
import moment from 'moment';

const { Option } = Select;


export default function ModalJira(props) {
    const { userLogin } = useSelector(state => state.UserReducer);

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);

    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const [visibleEditor, setVisibleEditor] = useState(false);
    const [visibleBtnAddComment, setVisibleBtnAddComment] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const [textBtnCopy, setTextBtnCopy] = useState('Copy link');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            contentComment: '',
            taskId: taskDetailModal?.taskId
        },
        onSubmit: async (values, { resetForm }) => {
            await dispatch({
                type: INSERT_COMMENT_SAGA,
                newComment: values
            })
            resetForm();
            setVisibleBtnAddComment(false);
        },
    });


    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div> <Editor
                name="description"
                initialValue={taskDetailModal.description}
                init={{
                    selector: 'textarea#myTextArea',
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={(content, editor) => {
                    setContent(content);
                }}
            />
                <button className="btn btn-primary mr-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false);
                }}>Save</button>
                <button className="btn btn-light m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })

                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: historyContent
                    // })
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div onClick={() => {
                setHistoryContent(taskDetailModal.description);
                setVisibleEditor(!visibleEditor);
            }}>{jsxDescription}</div>}
        </div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })

        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name,
        //     value
        // });
    }

    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div className='time-tracking__block'>
                <i className="fa fa-clock time-tracking--clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option key={index} value={tp.id}>{tp.taskType}</option>
                                })}
                            </select>

                            <span>{taskDetailModal.typeId === '1' ? `BUG-${taskDetailModal.taskId}` : `TASK-${taskDetailModal.taskId}`}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <button className='task-click__feedback'>
                                <i className="fab fa-telegram-plane" />
                                <span>Give feedback</span>
                            </button>
                            <button className='task-click__link' onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setTextBtnCopy('Link copied');
                                setTimeout(() => {
                                    setTextBtnCopy('Copy link');
                                }, 2000);
                            }}>
                                <i className="fa fa-link" />
                                <span>{textBtnCopy}</span>
                            </button>
                            <Popconfirm
                                title="Are you sure you want to delete this task?"
                                onConfirm={() => {
                                    dispatch({
                                        type: REMOVE_TASK_SAGA,
                                        taskId: taskDetailModal.taskId,
                                        projectId: taskDetailModal.projectId
                                    })
                                }}
                                okText='Yes'
                                cancelText="No"
                            >
                                <button className='task-click__remove-task' >
                                    <i className="fa fa-trash-alt" />
                                </button>
                            </Popconfirm>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">{taskDetailModal.taskName}</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                {/* <img src={require("../../../../assets/img/download (1).jfif")} alt='xyz' /> */}
                                                <img src={userLogin?.avatar} alt='xyz' title={userLogin?.name} />
                                            </div>
                                            <div className="input-comment">
                                                <form onSubmit={formik.handleSubmit} id="formComment" onClick={() => {
                                                    setVisibleBtnAddComment(true);
                                                }}>
                                                    <textarea type="text" value={formik.values.contentComment} name='contentComment' onChange={formik.handleChange} placeholder="Add a comment..." ></textarea>
                                                </form>
                                                {visibleBtnAddComment ? <div>
                                                    <button type='submit' form="formComment" className="btn btn-primary mr-2" >Save</button>
                                                    <button className="btn btn-light m-2" onClick={() => {
                                                        setVisibleBtnAddComment(false);
                                                    }} >Close</button>
                                                </div> :
                                                    <p className='input-comment__tip'>
                                                        <strong>Pro tip:</strong>
                                                        <span> press <span style={{ fontWeight: 'normal', backgroundColor: 'rgb(223, 225, 230)', color: 'rgb(23, 43, 77)', fontFamily: 'CircularStdBold' }}>M</span> to comment</span>
                                                    </p>}
                                            </div>
                                        </div>
                                        <CommentList />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                            handleChange(e);
                                            // const action = {
                                            //     type: UPDATE_STATUS_TASK_SAGA,
                                            //     taskUpdateStatus: {
                                            //         taskId: taskDetailModal.taskId,
                                            //         statusId: e.target.value,
                                            //         projectId: taskDetailModal.projectId
                                            //     }
                                            // };
                                            // dispatch(action);
                                        }}>
                                            {arrStatus.map((status, index) => {
                                                return <option value={status.statusId} key={index}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="row">
                                            {
                                                taskDetailModal.assigness?.map((user, index) => {
                                                    return <div className="col-6 mt-2 mb-2" key={index}>
                                                        <div key={index} style={{ display: 'flex' }} className="item">
                                                            <div className="avatar">
                                                                <img src={user.avatar} alt={user.avatar} />
                                                            </div>
                                                            <p className="name mt-1 ml-1" title={user.name}>
                                                                {user.name.slice(0, 10)}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })
                                                                    // dispatch({
                                                                    //     type: REMOVE_USER_ASSIGN,
                                                                    //     userId: user.id
                                                                    // })
                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                            <div className="col-6  mt-2 mb-2">
                                                <Select
                                                    options={projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name };
                                                    })}
                                                    optionFilterProp="label"
                                                    style={{ width: '100%' }}
                                                    name="lstUser"
                                                    value="+ Add more"
                                                    className="form-control"
                                                    onSelect={(value) => {
                                                        if (value == '0') {
                                                            return;
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                        userSelected = { ...userSelected, id: userSelected.userId };

                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                            actionType: CHANGE_ASSIGNESS,
                                                            userSelected
                                                        })

                                                        //dispatchReducer
                                                        // dispatch({
                                                        //     type: CHANGE_ASSIGNESS,
                                                        //     userSelected
                                                        // });
                                                    }}>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {
                                            renderTimeTracking()
                                        }
                                    </div>
                                    <div className='from-now'>
                                        <div>Create at {moment(taskDetailModal?.createdAt).fromNow()}</div>
                                        <div>Update at {moment(taskDetailModal?.updatedAt).fromNow()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}