import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
// DOMAIN API CỦA CYBERSOFT
// export const DOMAIN = 'https://jiranew.cybersoft.edu.vn/api';

// export const DOMAIN = 'http://localhost:5500';

// DOMAIN API TỰ VIẾT
// export const DOMAIN = 'https://jira-nodejs-app.herokuapp.com';
export const DOMAIN = 'https://jira-nodejs.onrender.com';
export const ACCESS_TOKEN = 'Authorization';
export const USER_LOGIN = 'USER_LOGIN';
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzAiLCJIZXRIYW5TdHJpbmciOiIxNC8xMC8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NjU3MDU2MDAwMDAiLCJuYmYiOjE2Mzc0Mjc2MDAsImV4cCI6MTY2NTg1MzIwMH0.RAzH9H37ZyQ8ZT6A62fw3_bDfJOCq0A9vz08qT262EU'

export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500
}
