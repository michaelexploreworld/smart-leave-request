import types from './types';
import { isValid, extractUser, logout } from '../../../utils/userService';

let INITIAL_STATE;
if(isValid()) {
    let user = extractUser();
    INITIAL_STATE = { 
        loggedIn: true, 
        user 
    };
} else {
    INITIAL_STATE = {};
    logout();
} 

const applyLoginSuccess = (state, action) => ({
    loggingIn: true,
    user: action.user
});

const applyLoginFailure = (state, action) => ({
    message: action.error
});

const applyLogout = (state, action) => {};

const signinReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.LOGIN_SUCCESS: {
            return applyLoginSuccess(state, action);
        }
        case types.LOGIN_FAILURE: {
            return applyLoginFailure(state, action);
        }
        case types.LOGOUT: {
            return applyLogout(state, action);
        }
        default: return state;
    }
};

export default signinReducer;