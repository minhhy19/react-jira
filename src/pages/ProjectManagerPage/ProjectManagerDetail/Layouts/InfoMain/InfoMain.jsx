import React from 'react'
import ReactHtmlParser from "react-html-parser";
import { useDispatch } from 'react-redux';
import FormCreateTask from '../../../../../components/Forms/FormCreateTask/FormCreateTask';
import { OPEN_FORM_CREATE_TASK } from '../../../../../redux/constants/DrawerConstant';


export default function InfoMain(props) {
    const dispatch = useDispatch();
    const {projectDetail} = props;

    const renderAvatar = () => {
        return projectDetail.members?.map((user) => {
            return <div key={user.userId} className="avatar">
            <img src={user.avatar} alt={user.avatar} title={user.name} />
        </div>
        })
    }

    return (
        <>
            <h3>{projectDetail.projectName}</h3>
            <section className='my-2'>
                {ReactHtmlParser(projectDetail.description)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div className='w-100 d-flex justify-content-end'>
                    <button className='btn btn-outline-primary' onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_TASK,
                            Component: <FormCreateTask />,
                            title: 'Create task'
                        })
                    }}>Create task</button>
                </div>
            </div>
        </>
    )
}