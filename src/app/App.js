import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import './App.css';
import HomeComponent from './home/HomeComponent';
import SigninComponent from './signin/SigninComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/login" component={SigninComponent} />
          <Route path="/addLeaveRequest" component={HomeComponent} />
          <Route component={SigninComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
