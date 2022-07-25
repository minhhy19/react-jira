import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import MenuJira from './Layouts/MenuJira/MenuJira';
import ModalJira from './Layouts/ModalJira/ModalJira'
import SidebarJira from './Layouts/SidebarJira/SidebarJira';
import _ from 'lodash';
import { Layout } from 'antd';

import '../../index.css';
import { ACCESS_TOKEN, USER_LOGIN } from '../../util/constants/settingSystem';
import { messageApp } from '../../util/Common/Message';
import { Redirect } from 'react-router-dom';
import { notificationFunction } from '../../util/Notification/notificationJira';
import HeaderJira from './Layouts/HeaderJira/HeaderJira';

export const HomeTemplate = (props) => {
    const { messageAuthorization } = messageApp;

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    let userInfo = localStorage.getItem(USER_LOGIN);
    if (!_.isEmpty(userInfo) && !_.isNull(userInfo)) {
        userInfo = JSON.parse(userInfo);
    }

    const handleRender = () => {
        switch (true) {
            case !userInfo || !accessToken: {
                // notificationFunction('warning', messageAuthorization);
                return <Redirect to='/login' />;
            }

            default:
                return null;
        }
    };

    const { Component, ...restParam } = props;
    return (
        <>
            {handleRender() || <Route {...restParam} render={(propsRoute) => {
                return <>
                    <div className="jira">
                        <SidebarJira />
                        {/* <MenuJira /> */}
                        <Layout className='ant-layout--background'>
                            <HeaderJira />
                            <Component {...propsRoute} />
                        </Layout>
                        <ModalJira />
                    </div>
                </>
            }} />}
        </>
    );

}