import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './state/reducers'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { setupSocket } from './socket'

import './index.css'

const store = createStore(reducer)

setupSocket(store.dispatch)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
