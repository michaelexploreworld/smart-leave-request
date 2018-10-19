import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isValid, logout } from '../../utils/userService';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if(isValid()) {
            return <Component {...props} />;  
        } else {
            logout();
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
    }} />
)

export default PrivateRoute;