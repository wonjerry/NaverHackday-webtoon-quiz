import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Result from './components/Result'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="body">
          <p className="WEBTOON-LIVE-LOGO">WEBTOON</p>
          <p className="text-style-1">LIVE</p>

          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Quiz" component={Quiz} />
          <Route exact path="/Result" component={Result} />
        </div>
      </Router>
    )
  }
}

export default App
