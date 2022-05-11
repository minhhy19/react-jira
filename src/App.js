import {BrowserRouter, Switch, Router} from "react-router-dom";
import "./App.css";
import {UserLoginTemplate} from "./templates/HomeTemplate/UserLoginTemplate";
import LoginJira from "./pages/Jira/LoginJira/LoginJira";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import {history} from "./util/constants/settingSystem";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import { JiraTemplate } from "./templates/HomeTemplate/JiraTemplate";
import CreateProject from "./pages/Jira/CreateProject/CreateProject";
import ProjectManagement from "./pages/Jira/ProjectManagement/ProjectManagement";
import ProjecDetail from "./pages/Jira/ProjectDetail/ProjecDetail";
import DrawerJira from "./HOC/DrawerJira";

function App() {
	// const history = useHistory()
	// const dispatch = useDispatch();
    // useEffect(() => {
	// 	dispatch({type: 'ADD_HISTORY', history: history});
	// }, []);
    return (
        <>
            <LoadingComponent />
            <DrawerJira />
            <Switch>
                <UserLoginTemplate exact path="/login" Component={LoginJira} />
                <JiraTemplate exact path='/jira' Component={ProjecDetail} />
                <JiraTemplate exact path='/createproject' Component={CreateProject} />
                <JiraTemplate exact path='/projectmanagement' Component={ProjectManagement} />
                <JiraTemplate exact path='/projectdetail/:projectId' Component={ProjecDetail} />
                <JiraTemplate exact path="/" Component={ProjectManagement} />
            </Switch>
        </>
    );
}

export default App;
