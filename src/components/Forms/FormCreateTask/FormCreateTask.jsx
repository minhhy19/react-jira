import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Select, Radio, Slider } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/CyberBugs/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/CyberBugs/TaskTypeConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/CyberBugs/PriorityConstants';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/CyberBugs/StatusConstant';

const { Option } = Select;

const children = [];

for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function FormCreateTask(props) {
    const dispatch = useDispatch();
    // lấy dữ liệu từ redux
    const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);

    const [size, setSize] = React.useState('default');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    });

    function handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    useEffect(() => {
        dispatch({type: GET_ALL_PROJECT_SAGA});
        dispatch({type: GET_ALL_TASK_TYPE_SAGA});
        dispatch({type: GET_ALL_PRIORITY_SAGA});
        dispatch({type: GET_ALL_STATUS_SAGA});

    }, [])

    const children = [];
    return (
        <div className='container'>
            <div className="form-group">
                <p>Project</p>
                <select className='form-control' name='projectId'>
                    {arrProject.map((project, index) => {
                        return <option value={project.id} key={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name="statusId" className="form-control">
                    {arrStatus.map((statusItem) => {
                        return <option key={statusItem.statusId} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control">
                            {arrPriority.map((priority)=>{
                                return <option key={priority.priorityId} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId">
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
                            options={[{value: 'a10', label: 'a10'}, {value: 'c12', label: 'c12'}]}
                            placeholder="Please select"
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            {children}
                        </Select>
                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" />
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

                                    // setFieldValue('timeTrackingSpent',e.target.value);
                                }} />
                            </div>

                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    // setFieldValue('timeTrackingRemaining',e.target.value);
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
                        // setFieldValue('description',content);
                    }}
                />
            </div>
        </div>
    )
}
