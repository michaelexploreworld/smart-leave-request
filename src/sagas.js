import { takeEvery, all } from 'redux-saga/effects';
import { loginTypes, loginOperations } from './app/login/duck/';

function *watchAll() {
    yield all([
        takeEvery(loginTypes.LOGIN_REQUEST, loginOperations.handleLoginRequest),
    ])
}

export default watchAll;