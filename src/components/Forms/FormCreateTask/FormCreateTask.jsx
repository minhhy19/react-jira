import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch, connect } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/Jira/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/Jira/TaskTypeConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/Jira/PriorityConstants';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/Jira/StatusConstant';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../redux/constants/Jira/UserConstants';
import { CREATE_TASK_SAGA } from '../../../redux/constants/Jira/TaskConstants';
import { SET_SUBMIT_CREATE_TASK } from '../../../redux/constants/DrawerConstant';

const { Option } = Select;

function FormCreateTask(props) {
    const dispatch = useDispatch();
    // lấy dữ liệu từ redux
    const { arrProject } = useSelector(state => state.ProjectReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrUser } = useSelector(state => state.UserReducer);

    //Hàm biến đổi options cho thẻ select
    const userOptions = arrUser.map((item) => {
        return { value: item.userId, label: item.name }
    })

    //Do kết nối với withformik => component có các props
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    const [size, setSize] = React.useState('default');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    });

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_STATUS_SAGA });

        // Đưa hàm handle submit lên drawer reducer để cập nhật lại sự kiện cho nút submit
        dispatch({ type: SET_SUBMIT_CREATE_TASK, submitFunction: handleSubmit })
    }, [])

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select className='form-control' name='projectId' onChange={(e) => {
                    // dispatch giá trị làm thay đổi arrUser
                    const { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        idProject: value
                    })
                    //Cập nhật giá trị cho project Id
                    setFieldValue('projectId', value);
                }}>
                    {arrProject.map((project) => {
                        return <option value={project.id} key={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />
                <div className='text-danger'>{errors.taskName}</div>
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name="statusId" className="form-control" onChange={(e) => {
                    const { value } = e.target;
                    //Cập nhật giá trị cho statusID
                    setFieldValue('statusId', value);
                }}>
                    {arrStatus.map((statusItem) => {
                        return <option key={statusItem.statusId} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        {/* <select name="priorityId" className="form-control">
                            {arrPriority.map((priority) => {
                                return <option key={priority.priorityId} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select> */}
                        <Select
                            name="priorityId"
                            defaultValue={arrPriority[0]?.priorityId}
                            style={{ width: '100%' }}
                            onChange={(value) => {
                                setFieldValue('priorityId', value);
                            }}>
                            {arrPriority.map((item) => {
                                let priorityIcon;
                                switch (item.priorityId) {
                                    case 1: {
                                        priorityIcon = <i className="fa fa-arrow-up fa-arrow-up--high mr-2" />
                                        break;
                                    }
                                    case 2: {
                                        priorityIcon = <i className="fa fa-arrow-up fa-arrow-up--medium mr-2" />
                                        break;
                                    }
                                    case 3: {
                                        priorityIcon = <i className="fa fa-arrow-down fa-arrow-down--low mr-2" />
                                        break;
                                    }
                                    case 4: {
                                        priorityIcon = <i className="fa fa-arrow-down fa-arrow-down--lowest mr-2" />
                                        break;
                                    }
                                    default: priorityIcon = '';
                                }
                                return <Option key={item.priorityId} value={item.priorityId} >{priorityIcon}{item.priority}</Option>
                            })}
                        </Select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" onChange={(e) => {
                            const { value } = e.target;
                            //Cập nhật giá trị cho typeId
                            setFieldValue('typeId', value);
                        }}>
                            {arrTaskType.map((taskType) => {
                                return <option key={taskType.id} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>

            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            options={userOptions}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onChange={(values) => {
                                //set lại giá trị cho lstUserAsign
                                setFieldValue('listUserAsign', values);
                            }}
                            onSelect={(value) => {
                            }}
                            style={{ width: '100%' }}
                        ></Select>
                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                            </div>
                        </div>

                    </div>
                    <div className="col-6">
                        <p>Time tracking</p>

                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row" style={{ marginTop: 5 }}>
                            <div className="col-6">
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });

                                    setFieldValue('timeTrackingSpent', e.target.value);
                                }} />
                            </div>

                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
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
                        setFieldValue('description', content);
                    }}
                />
            </div>
        </form>
    )
}

const formCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
        // if(arrProject?.length > 0){
        //     props.dispatch({type: GET_USER_BY_PROJECT_ID_SAGA, idProject: arrProject[0]?.id});
        // }
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({
        taskName: Yup.string().required('Task name is required'),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
    },
    displayName: 'createTaskForm',
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    }
}


export default connect(mapStateToProps)(formCreateTask);
