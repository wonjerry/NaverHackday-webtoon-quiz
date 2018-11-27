import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home';
import Result from './Components/Result/Result';
import Login from './Components/Login/Login';
class App extends Component {
  render() {
    return (
      <Router>
       
        <div className="body">
      
          <p className="WEBTOON-LIVE-LOGO">WEBTOON
          
          <p className="text-style-1">LIVE</p>     
          </p>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/result" component={Result} />
        </div>
      </Router>
    );
  }
}

export default App;
