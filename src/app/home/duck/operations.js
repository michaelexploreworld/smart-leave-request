import { call, put } from 'redux-saga/effects';
import moment from 'moment-timezone';

import actions from './actions';
import { fetchLeaveRequests, createLeaveRequest, deleteLeaveRequest } from '../../../utils/apolloService';

function* handleFetchLeaveRequestsRequest(action) {
    try {
        const leaveRequests = yield call(fetchLeaveRequests);
        let formatedLeaveRequests = [];

        if(leaveRequests) {
            for(const request of leaveRequests) {
                const { id, leave_type, start_datetime, end_datetime, created_time } = request;
                if(id && leave_type && leave_type.label && start_datetime && end_datetime && created_time) {
                    formatedLeaveRequests.push({
                        id,
                        start_datetime,
                        end_datetime,
                        created_time,
                        leave_type: leave_type.label
                    }) ;
                }
            }
            yield put(actions.doSetLeaveRequests(formatedLeaveRequests));
        }
    } catch(error) {
        yield put(actions.doSetCreateLeaveRequestError(error.message));
    }
}

function* handleCreateLeaveRequestRequest(action) {
    try {
        const { userId, leaveType, startDate, endDate} = action;
        let leaveRequest;
        const id = yield call(createLeaveRequest, userId, leaveType.id, startDate, endDate);

        leaveRequest = {
            id: id,
            leave_type: leaveType.label,
            start_datetime: startDate,
            end_datetime: endDate,
            created_time: moment.tz('Australia/Sydney').format('YYYY-MM-DD')
        };
        
        yield put(actions.doAddLeaveRequest(leaveRequest));
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