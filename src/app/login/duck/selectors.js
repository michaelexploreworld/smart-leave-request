const getLoggingIn = ({ login }) => {
    return login.loggingIn;
};

const getUser = ({ login }) => {
    return login.user;
}

const getMessage = ({ login }) => {
    return login.message;
}

export default {
    getLoggingIn,
    getUser,
    getMessage
};