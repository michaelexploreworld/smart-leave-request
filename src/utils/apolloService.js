import { readClient, mutationClient } from '../apolloClients';
import { 
    getLeaveRequestsQuery, 
    getLeaveTypesQuery, 
    createLeaveRequestMutation ,
    deleteLeaveRequestMutataion
} from '../app/queries/queries';

function fetchLeaveRequests() {
    return readClient
        .query({
            query: getLeaveRequestsQuery
        })
        .then(result => result.data.LeaveRequests);
}

function fetchRequestTypes() {
    return readClient
        .query({
            query: getLeaveTypesQuery
        })
        .then(result => result.data.LeaveTypes);
}

function createLeaveRequest(userId, leaveType, startDate, endDate) {
    return mutationClient
        .mutate({
            mutation: createLeaveRequestMutation,
            variables: {
                leave_request: {
                    user: userId.toString(),
                    leave_type: leaveType, 
                    start_datetime: startDate,
                    end_datetime: endDate
                } 
            }
        })
        .then(result => result.data.LeaveRequests.create.id);
}

function deleteLeaveRequest(id) {
    return mutationClient
        .mutate({
            mutation: deleteLeaveRequestMutataion,
            variables: {
                id: id
            }
        })
        .then(result => result.data.LeaveRequests.delete.id);
}

export {
    fetchLeaveRequests,
    fetchRequestTypes,
    createLeaveRequest,
    deleteLeaveRequest
};