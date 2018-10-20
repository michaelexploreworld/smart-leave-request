import React, { Component } from 'react';  
import { connect } from 'react-redux';  

import { loginSelectors } from '../login/duck';
import { isAuthenticated } from '../../utils/userService';
import LoginContainer from '../login/LoginContainer';

export default function withAuthentication(WrappedComponent) {

    class AuthenticatedComponent extends Component {
        render() {
            const { user, loggingIn  } = this.props;

            if(loggingIn && isAuthenticated(user)) {
                return <WrappedComponent />;
            } else {
                return <LoginContainer />;
            }
        }
    }

    const mapStateToProps = (state) => ({
        user: loginSelectors.getUser(state),
        loggingIn: loginSelectors.getLoggingIn(state)
    });

    return connect(mapStateToProps)(AuthenticatedComponent)
}