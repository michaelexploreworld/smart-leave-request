import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import './App.css';
import HomeComponent from './home/HomeComponent';
import LoginContainer from './login/LoginContainer';
import PrivateRoute from './common/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path="/" exact component={HomeComponent} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute path="/addLeaveRequest" component={HomeComponent} />
          <Route component={LoginContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
