import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//setup redux
import {Provider} from "react-redux";
import store from "./redux/configStore";

import "antd/dist/antd.min.css"; // or 'antd/dist/antd.less'
import './assets/css/style.min.css';
import { Router } from "react-router-dom";
import { history } from "./util/constants/settingSystem";

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);
reportWebVitals();
