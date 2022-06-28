import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function MenuJira() {
    const { userLogin } = useSelector(state => state.UserReducer);
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    {userLogin?.avatar ?
                        (<img src={userLogin.avatar} alt={userLogin.avatar} />) :
                        (<img src={require("../../../../assets/img/download.jfif")} alt="123" />)
                    }
                </div>
                <div className="account-info">
                    <p>{userLogin.name}</p>
                    <p>Software project</p>
                </div>
            </div>
            <div className="control">
                {/* <div>
                    <i className="fa fa-credit-card" />
                    <NavLink className='text-dark' activeStyle={{color:'blue'}} to="/jira" activeClassName="active" >Cyber Board</NavLink>
                </div> */}
                <div>
                    <NavLink className="text-dark" activeStyle={{ color: 'blue', fontWeight: 'bold' }} to='/projectadd' activeClassName="active">
                        <i className="fa fa-plus"></i>
                        <span>Create project</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="text-dark" activeStyle={{ color: 'blue', fontWeight: 'bold' }} to='/project' activeClassName="active">
                        <i className="fa fa-table"></i>
                        <span>Project management</span>
                    </NavLink>
                </div>
                <div>
                    <NavLink className="text-dark" activeStyle={{ color: 'blue', fontWeight: 'bold' }} to='/user' activeClassName="active">
                        <i className="fa fa-users"></i>
                        <span>User management</span>
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <a className="text-dark" href='#'>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </a>
                <a className="text-dark" href='#'>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </a>
                <a className="text-dark" href='#'>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </a>
                <a className="text-dark" href='#'>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </a>
                <a className="text-dark" href='#'>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </a>
            </div>
        </div>


    )
}