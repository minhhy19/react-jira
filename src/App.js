import {BrowserRouter, Switch, Router} from "react-router-dom";
// import "./App.css";
import {UserLoginTemplate} from "./templates/UserLoginTemplate/UserLoginTemplate";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Home from "./pages/Home/Home";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import DrawerJira from "./HOC/DrawerJira";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProjectManagerPage from "./pages/ProjectManagerPage/ProjectManagerPage";
import ProjectManagerAdd from "./pages/ProjectManagerPage/ProjectManagerAdd/ProjectManagerAdd";
import ProjectManagerDetail from "./pages/ProjectManagerPage/ProjectManagerDetail/ProjectManagerDetail";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <>
            <Loading />
            <DrawerJira />
            <Switch>
                <UserLoginTemplate exact path="/login" Component={LoginPage} />
                <UserLoginTemplate exact path="/signup" Component={SignUpPage} />
                {/* <HomeTemplate exact path='/jira' Component={ProjecDetail} /> */}
                <HomeTemplate exact path='/projectadd' Component={ProjectManagerAdd} />
                <HomeTemplate exact path='/project' Component={ProjectManagerPage} />
                <HomeTemplate exact path='/project/detail/:projectId' Component={ProjectManagerDetail} />
                <HomeTemplate exact path="/" Component={ProjectManagerPage} />
            </Switch>
        </>
    );
}

export default App;
