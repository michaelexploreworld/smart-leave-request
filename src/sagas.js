import { takeEvery, all } from 'redux-saga/effects';
import { loginTypes, loginOperations } from './app/login/duck/';
import { homeTypes, homeOperations } from './app/home/duck';

function *watchAll() {
    yield all([
        takeEvery(loginTypes.LOGIN_REQUEST, loginOperations.handleLoginRequest),
        takeEvery(homeTypes.FETCH_LEAVE_REQUESTS, homeOperations.handleFetchLeaveRequestsRequest),
        takeEvery(homeTypes.CREATE_LEAVE_REQUEST, homeOperations.handleCreateLeaveRequestRequest),
        takeEvery(homeTypes.DELETE_LEAVE_REQUESTS, homeOperations.handleDeleteLeaveRequestsRequest),
    ])
}

export default watchAll;