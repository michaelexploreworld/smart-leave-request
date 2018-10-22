import { call, put } from 'redux-saga/effects';

import actions from './actions';
import { fetchLeaveRequests, createLeaveRequest, deleteLeaveRequest } from '../../../utils/apolloService';

function* handleFetchLeaveRequestsRequest(action) {
    try {
        const leaveRequests = yield call(fetchLeaveRequests);

        if(leaveRequests) {
            yield put(actions.doSetLeaveRequests(leaveRequests));
        }
    } catch(error) {
        yield put(actions.doSetCreateLeaveRequestError(error.message));
    }
}

function* handleCreateLeaveRequestRequest(action) {
    try {
        const { userId, leaveType, startDate, endDate } = action;
        
        yield call(createLeaveRequest, userId, leaveType, startDate, endDate);
        yield put(actions.doAddLeaveRequest(userId, leaveType, startDate, endDate));
    } catch(error) {
        yield put(actions.doSetCreateLeaveRequestError(error.message));
    }
}

function* handleDeleteLeaveRequestsRequest(action) {
    const { ids } = action;
    let deletedRequests = [];
    
    try {
        for(const id of ids) {
            yield call(deleteLeaveRequest, id);
            deletedRequests.push(id);
        }
        yield put(actions.doRemoveLeaveRequests(deletedRequests));
    } catch(error) {
        yield put(actions.doRemoveLeaveRequests(deletedRequests));
        yield put(actions.doSetDeleteLeaveRequestsError(error.message));
    }
};

export default { 
    handleFetchLeaveRequestsRequest,
    handleCreateLeaveRequestRequest,
    handleDeleteLeaveRequestsRequest
};