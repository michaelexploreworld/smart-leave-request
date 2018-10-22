import { gql } from 'apollo-boost';

const getLeaveRequestsQuery = gql` 
    {
        LeaveRequests {
            id
            leave_type {
                id
                type
                label
            }
            start_datetime
            end_datetime
            created_time
        }
    }
`;

const getLeaveTypesQuery = gql`
    {
        LeaveTypes {
            id
            type
            label
        }
    }
`;

const createLeaveRequestMutation = gql`
    mutation($leave_request: LeaveRequestCreate!) {
        LeaveRequests  {
            create(leave_request: $leave_request) {
                id
            }
        }
    }
`;

const deleteLeaveRequestMutataion = gql`
    mutation($id: Int!) {
        LeaveRequests {
            delete(id: $id) {
                id
            }
        }
    }
`;

export {
    getLeaveRequestsQuery,
    getLeaveTypesQuery,
    createLeaveRequestMutation,
    deleteLeaveRequestMutataion
};