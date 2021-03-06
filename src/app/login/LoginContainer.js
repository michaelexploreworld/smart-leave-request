import { connect } from 'react-redux';
import { compose } from 'redux';

import { loginSelectors, loginActions } from './duck/';
import LoginComponent from './LoginComponent';

const mapStateToProps = state => ({
    loggingIn: loginSelectors.getLoggingIn(state),
    user: loginSelectors.getUser(state),
    message: loginSelectors.getMessage(state)
});

const mapDispatchToProps = dispatch => ({
    onLoginRequest: (username, password) => dispatch(loginActions.doLoginRequest(username, password)),
    onLogoutRequest: () => dispatch(loginActions.doLogout()),
});

const enhance = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)

export default enhance(LoginComponent);