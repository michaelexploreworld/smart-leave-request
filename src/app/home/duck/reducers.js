import types from './types';

let INITIAL_STATE = {
    leaveRequests: [],
    fetchMessage: '',
    createMessage: '',
    deleteMessage: ''
};

const applySetLeaveRequests = (state, action) => {
    return {
        ...state,
        leaveRequests: action.leaveRequests,
        fetchMessage: 'success'
    }
}

const applyAddLeaveRequest = (state, action) => {
    return {
        ...state,
        leaveRequests: [...state.leaveRequests, action.leaveRequest],
        createMessage: 'success'
    }
}

const applyDeleteLeaveRequests = (state, action) => {
    const deleteRequests = action.ids;
    const leaveRequests = state.leaveRequests;
    const result = leaveRequests.filter(request => !deleteRequests.includes(request.id));

    return {
        ...state,
        leaveRequests: result,
        deleteMessage: 'success'
    }
}

const applySetFetchLeaveRequestsError = (state, action) => {
    return {
        ...state,
        fetchMessage: action.message
    }
}

const applyClearFetchLeaveRequestsError = (state, action) => {
    return {
        ...state,
        fetchMessage: ''
    }
}

const applySetCreateLeaveRequestError = (state, action) => {
    return {
        ...state,
        createMessage: action.message
    }
}

const applyClearCreateLeaveRequestError = (state, action) => {
    return {
        ...state,
        createMessage: ''
    }
}

const applySetDeleteLeaveRequestsError = (state, action) => {
    return {
        ...state,
        deleteMessage: action.message
    }
}

const applyClearDeleteLeaveRequestsError = (state, action) => {
    return {
        ...state,
        deleteMessage: ''
    }
}

const homeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.SET_LEAVE_REQUESTS: {
            return applySetLeaveRequests(state, action);
        }
        case types.ADD_LEAVE_REQUEST: {
            return applyAddLeaveRequest(state, action);
        }
        case types.REMOVE_LEAVE_REQUESTS: {
            return applyDeleteLeaveRequests(state, action);
        }
        case types.SET_FETCH_LEAVE_REQUESTS_ERROR: {
            return applySetFetchLeaveRequestsError(state, action);
        }
        case types.CLEAR_FETCH_LEAVE_REQUESTS_ERROR: {
            return applyClearFetchLeaveRequestsError(state, action);
        }
        case types.SET_CREATE_LEAVE_REQUEST_ERROR: {
            return applySetCreateLeaveRequestError(state, action);
        }
        case types.CLEAR_CREATE_LEAVE_REQUEST_ERROR: {
            return applyClearCreateLeaveRequestError(state, action);
        }
        case types.SET_DELETE_LEAVE_REQUESTS_ERROR: {
            return applySetDeleteLeaveRequestsError(state, action);
        }
        case types.CLEAR_DELETE_LEAVE_REQUESTS_ERROR: {
            return applyClearDeleteLeaveRequestsError(state, action);
        }
        default: return state;
    }
};

export default homeReducer;