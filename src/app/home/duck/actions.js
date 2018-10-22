import types from './types';

const doFetchLeaveRequests = () => ({ 
    type: types.FETCH_LEAVE_REQUESTS
});

const doCreateLeaveRequest = (userId, leaveType, startDate, endDate) => ({
    type: types.CREATE_LEAVE_REQUEST,
    userId,
    leaveType,
    startDate,
    endDate
});

const doDeleteLeaveRequests = (ids) => ({
    type: types.DELETE_LEAVE_REQUESTS,
    ids
});

const doSetLeaveRequests = (leaveRequests) => ({
    type : types.SET_LEAVE_REQUESTS,
    leaveRequests
})

const doAddLeaveRequest = (leaveRequest) => ({
    type: types.ADD_LEAVE_REQUEST,
    leaveRequest
});

const doRemoveLeaveRequests = (ids) => ({
    type: types.REMOVE_LEAVE_REQUESTS,
    ids
});

const doSetFetchLeaveRequestsError = (message) => ({
    type: types.SET_FETCH_LEAVE_REQUESTS_ERROR,
    message
});

const doClearFetchLeaveRequestsError = () => ({
    type: types.CLEAR_FETCH_LEAVE_REQUESTS_ERROR
});

const doSetCreateLeaveRequestError = (message) => ({
    type: types.SET_CREATE_LEAVE_REQUEST_ERROR,
    message
});

const doClearCreateLeaveRequestError = () => ({
    type: types.CLEAR_CREATE_LEAVE_REQUEST_ERROR,
});

const doSetDeleteLeaveRequestsError = (message) => ({
    type: types.SET_DELETE_LEAVE_REQUESTS_ERROR,
    message
});

const doClearDeleteLeaveRequestsError = () => ({
    type: types.CLEAR_DELETE_LEAVE_REQUESTS_ERROR
});

export default {
    doFetchLeaveRequests,
    doCreateLeaveRequest,
    doDeleteLeaveRequests,
    doSetLeaveRequests,
    doAddLeaveRequest,
    doRemoveLeaveRequests,
    doSetFetchLeaveRequestsError,
    doClearFetchLeaveRequestsError,
    doSetCreateLeaveRequestError,
    doClearCreateLeaveRequestError,
    doSetDeleteLeaveRequestsError,
    doClearDeleteLeaveRequestsError
};
