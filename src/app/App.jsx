import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import './App.css';
import HomeContainer from './home/HomeContainer';
import LoginContainer from './login/LoginContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/addLeaveRequest" component={HomeContainer} />
          <Route component={LoginContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
