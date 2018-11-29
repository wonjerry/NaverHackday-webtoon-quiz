import io from 'socket.io-client'

import { actionCreators as homeActionCreators } from './state/actions/home'
import { actionCreators as waitingRoomActionCreators } from './state/actions/waitingRoom'
import { actionCreators as quizActionCreators } from './state/actions/quiz'

const GAMESTATE = {
  READY: 0,
  WAITING: 1,
  START_QUIZ: 2,
  END_QUIZ: 3,
  TOTAL_RESULT: 4
}

let socket = null

const setupSocket = (dispatch) => {
  socket = io('http://localhost:5000')

  socket.on('message', (message) => {
    switch(message.state) {
      case GAMESTATE.READY:
        dispatch(homeActionCreators.enableStart(true))
        break
      case GAMESTATE.WAITING:
        console.log(message)
        dispatch(waitingRoomActionCreators.setStartTime(message.startTime))
        break
      case GAMESTATE.START_QUIZ:
        console.log(message.question)
        // Set question and count time until endtime
        dispatch(waitingRoomActionCreators.startQuiz(true))
        dispatch(quizActionCreators.setQuestion(message.question))
        break
      case GAMESTATE.END_QUIZ:
        // Set statics and count time until endtime 
        break
      case GAMESTATE.TOTAL_RESULT:
        // Set statics and end game
        dispatch(homeActionCreators.enableStart(false))
        dispatch(waitingRoomActionCreators.enableStart(false))
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