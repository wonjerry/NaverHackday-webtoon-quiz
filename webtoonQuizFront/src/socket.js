import io from 'socket.io-client'

import { actionCreators as homeActionCreators } from './state/actions/home'
import { actionCreators as quizActionCreators } from './state/actions/quiz'

const GAMESTATE = {
  READY: 0,
  START_QUIZ: 1,
  END_QUIZ: 2,
  TOTAL_RESULT: 3
}

let socket = null

const setupSocket = (dispatch) => {
  socket = io('http://localhost:5000')

  socket.on('message', (message) => {
    switch(message.state) {
      case GAMESTATE.READY:
        // 만약 Home 이면은 home의 isStart true로
        dispatch(homeActionCreators.enableStart(true))
        break
      case GAMESTATE.START_QUIZ:
        // Set question and count time until endtime
        break
      case GAMESTATE.END_QUIZ:
        // Set statics and count time until endtime 
        break
      case GAMESTATE.TOTAL_RESULT:
        // Set statics and end game
        dispatch(homeActionCreators.enableStart(false))
        break
      default:
        // Do nothing.
    }
  })

  return socket
}

const getSocket = () => {
  return socket
}

export { setupSocket, getSocket }