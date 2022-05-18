import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import MenuJira from './Layouts/MenuJira/MenuJira';
import ModalJira from './Layouts/ModalJira/ModalJira'
import SidebarJira from './Layouts/SidebarJira/SidebarJira';
import _ from 'lodash';

import '../../index.css';
import { USER_LOGIN } from '../../util/constants/settingSystem';
import { messageApp } from '../../util/Common/Message';
import { Redirect } from 'react-router-dom';
import { notificationFunction } from '../../util/Notification/notificationJira';

export const HomeTemplate = (props) => {
    const { messageAuthorization } = messageApp;

    let userInfo = localStorage.getItem(USER_LOGIN);
    if (!_.isEmpty(userInfo) && !_.isNull(userInfo)) {
        userInfo = JSON.parse(userInfo);
    }

    const handleRender = () => {
        switch (true) {
            case !userInfo: {
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
                        <MenuJira />
                        <Component {...propsRoute} />
                        <ModalJira />
                    </div>
                </>
            }} />}
        </>
    );

}