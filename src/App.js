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
                <UserLoginTemplate
                    exact
                    path="/login"
                    Component={LoginCyberBugs}
                />
                <UserLoginTemplate
                    exact
                    path="/home"
                    Component={Home}
                />
            </Switch>
        </>
    );
}

export default App;
