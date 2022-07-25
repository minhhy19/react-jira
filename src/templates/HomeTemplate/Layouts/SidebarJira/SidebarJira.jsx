import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarsOutlined,
    SearchOutlined,
    PlusOutlined
} from '@ant-design/icons';

import {useDispatch, useSelector} from 'react-redux'
import FormCreateTask from '../../../../components/Forms/FormCreateTask/FormCreateTask'; //../Forms/FormCreateTask/FormCreateTask
import { OPEN_FORM_CREATE_TASK } from '../../../../redux/constants/DrawerConstant';
import { history } from '../../../../util/constants/settingSystem';

const { Header, Sider, Content } = Layout;

export default function SidebarJira() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        collapsed: true
    })
    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };
    const { userLogin } = useSelector(state => state.UserReducer);
    return (
        <div>

            <Sider width='300' className="menu" theme="dark" trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
                <div className="text-right pr-2" onClick={toggle} >
                    {
                        state.collapsed ? <MenuUnfoldOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: 20 }} /> :
                        <MenuFoldOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: 20 }} />
                    }
                    {/* <BarsOutlined style={{ cursor: 'pointer', color: '#fff', fontSize: 25 }} /> */}
                </div>
                <div className="account">
                    <div className="avatar">
                        {userLogin?.avatar ?
                            (<img src={userLogin.avatar} alt={userLogin.avatar} />) :
                            (<img src={require("../../../../assets/img/download.jfif")} alt="123" />)
                        }
                    </div>
                    <div className={state.collapsed ? 'account-info d-none' : 'account-info'} style={{ color: '#fff' }}>
                        <p>{userLogin.name}</p>
                        <p>Software project</p>
                    </div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                    {/* <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: 20 }} />} onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_TASK,
                            Component: <FormCreateTask />,
                            title: 'Create task'
                        })

                    }}>
                        <span className="mb-2">Create task</span>
                    </Menu.Item> */}
                    <Menu.Item key="1" icon={<i className="fa fa-plus"></i>} onClick={() => {
                        history.push('/projectadd');
                    }}>
                        Create project
                    </Menu.Item>
                    <Menu.Item key="2" icon={<i className="fa fa-table"></i>} onClick={() => {
                        history.push('/project');
                    }}>
                        Project management
                    </Menu.Item>
                    <Menu.Item key="3" icon={<i className="fa fa-users"></i>} onClick={() => {
                        history.push('/user');
                    }}>
                        User management
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>


    )
}