import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MenuJira from './Layouts/MenuJira/MenuJira';
import ModalJira from './Layouts/ModalJira/ModalJira'
import SidebarJira from './Layouts/SidebarJira/SidebarJira';

import '../../index.css';

export const HomeTemplate = (props) => {

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