const getLeaveRequests = ({ home }) => {
    return home.leaveRequests;
};

const getFetchMeaage = ({ home }) => {
    return home.fetchMessage;
}

const getCreateMessage = ({ home }) => {
    return home.createMessage;
}

const getDeleteMessage = ({ home }) => {
    return home.deleteMessage;
}

export default {
    getLeaveRequests,
    getFetchMeaage,
    getCreateMessage,
    getDeleteMessage
};