import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import MenuCyberbugs from '../../components/Cyberbugs/MenuCyberbugs';
import ModalCyberBugs from '../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs'
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';

import HeaderMain from '../../components/Cyberbugs/Main/HeaderMain';
import InfoMain from '../../components/Cyberbugs/Main/InfoMain';
import ContentMain from '../../components/Cyberbugs/Main/ContentMain';

import '../../index.css';



export const CyberbugsTemplate = (props) => {

    const { Component, ...restParam } = props;
    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SidebarCyberbugs />
                <MenuCyberbugs />
                    <Component {...propsRoute} />
                <ModalCyberBugs />
            </div>
        </>
    }} />

}