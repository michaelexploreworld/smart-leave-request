import types from './types';

const doLoginRequest = (username, password) => ({ 
    type: types.LOGIN_REQUEST,
    username,
    password
});

const doLoginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    user
});

const doLoginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    error
});

const doLogout = () => ({
    type: types.LOGOUT
});

export default {
    doLoginRequest,
    doLoginSuccess,
    doLoginFailure,
    doLogout
};