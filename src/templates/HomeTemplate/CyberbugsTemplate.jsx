import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MenuJira from '../../components/Jira/MenuJira';
import ModalJira from '../../components/Jira/ModalJira/ModalJira'
import SidebarJira from '../../components/Jira/SidebarJira';

import '../../index.css';

export const CyberbugsTemplate = (props) => {

    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SidebarJira />
                <MenuJira />
                    <Component {...propsRoute} />
                <ModalJira />
            </div>
        </>
    }} />

}