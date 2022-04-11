import {BrowserRouter, Switch, Router} from "react-router-dom";
import "./App.css";
import {UserLoginTemplate} from "./templates/HomeTemplate/UserLoginTemplate";
import Login from "./pages/Login/Login";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import {history} from "./util/constants/settingSystem";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberbugs from "./redux/sagas/Cyberbugs/indexCyberbugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";

function App() {
	// const history = useHistory()
	// const dispatch = useDispatch();
    // useEffect(() => {
	// 	dispatch({type: 'ADD_HISTORY', history: history});
	// }, []);
    return (
        <>
            <LoadingComponent />
            <Switch>
                <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
                <CyberbugsTemplate exact path='/cyberbugs' Component={indexCyberbugs} />
                <CyberbugsTemplate exact path='/createproject' Component={CreateProject} />
                <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
                <UserLoginTemplate exact path="/home" Component={Home} />
            </Switch>
        </>
    );
}

export default App;
