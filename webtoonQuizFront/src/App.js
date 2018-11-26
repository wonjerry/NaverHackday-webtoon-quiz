import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Result from './Components/Result/Result';
import Login from './Components/Login/Login';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/result" component={Result} />

        </div>
      </Router>
    );
  }
}

export default App;
