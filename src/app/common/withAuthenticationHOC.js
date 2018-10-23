import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

import { isAuthenticated, logout } from '../../utils/userService';
import LoginContainer from '../login/LoginContainer';
import { loginActions, loginSelectors } from '../login/duck';

export default function withAuthentication(WrappedComponent) {

    class AuthenticatedComponent extends Component {
        render() {
            const { user, loggingIn, onLogoutRequest  } = this.props;

            if(loggingIn && isAuthenticated(user)) {
                return <WrappedComponent {...this.props}/>;
            } else if(loggingIn && !isAuthenticated(user)) {
                logout();
                onLogoutRequest();
                return <LoginContainer {...this.props}/>;
            } else {
                return <LoginContainer {...this.props} />;
            }
        }
    }

    const mapStateToProps = state => ({
        user: loginSelectors.getUser(state),
        loggingIn: loginSelectors.getLoggingIn(state),
    });
    
    const mapDispatchToProps = dispatch => ({
        onLogoutRequest: () => dispatch(loginActions.doLogout())
    });

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}