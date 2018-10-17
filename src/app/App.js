import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

import './App.css';
import HomeComponent from './home/HomeComponent';
import LoginComponent from './login/LoginComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route component={LoginComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
