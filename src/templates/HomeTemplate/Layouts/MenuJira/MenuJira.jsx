import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuJira() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={require("../../../../assets/img/download.jfif")} alt="123" />
                </div>
                <div className="account-info">
                    <p>CyberLearn</p>
                    <p>Software project</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" />
                    <NavLink className='text-dark' activeStyle={{color:'blue'}} to="/jira" activeClassName="active" >Cyber Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" /> 
                    <NavLink className="text-dark" activeStyle={{color:'blue', fontWeight: 'bold'}} to='/project' activeClassName="active" >Project management</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" /> 
                    <NavLink className="text-dark" activeStyle={{color:'blue', fontWeight: 'bold'}} to='/projectadd' activeClassName="active" >Create project</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>


    )
}