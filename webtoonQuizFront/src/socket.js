import io from 'socket.io-client'
import moment from 'moment'
import { actionCreators as homeActionCreators } from './state/actions/home'
import { actionCreators as waitingRoomActionCreators } from './state/actions/waitingRoom'
import { actionCreators as quizActionCreators } from './state/actions/quiz'
import { actionCreators as scoreActionCreators } from './state/actions/score'
import { actionCreators as resultActionCreators } from './state/actions/result'

const GAMESTATE = {
  READY: 0,
  WAITING: 1,
  START_QUIZ: 2,
  END_QUIZ: 3,
  TOTAL_RESULT: 4,
  INIT_SERVER_NAME: 5,
}

let socket = null
let name = null

const setupSocket = (dispatch) => {
  socket = io('ws://106.10.33.128:27017')

  socket.on('message', (message) => {
    console.log(message)
    if (message.state === GAMESTATE.INIT_SERVER_NAME) {
      name = message.name[0]
      return
    }

    console.log(message.name, name)
    if (message.name !== name) {
      return
    }

    switch (message.state) {
      case GAMESTATE.READY:
        dispatch(quizActionCreators.endGame(false))
        dispatch(homeActionCreators.enableStart(true))
        break
      case GAMESTATE.WAITING:
        dispatch(waitingRoomActionCreators.setStartTime(message.startTime))
        break
      case GAMESTATE.START_QUIZ:
        dispatch(waitingRoomActionCreators.startQuiz(true))
        dispatch(quizActionCreators.endQuiz(false))
        dispatch(quizActionCreators.setQuestion(message.question))
        dispatch(scoreActionCreators.restartQuiz(true))
        break
      case GAMESTATE.END_QUIZ:
        dispatch(scoreActionCreators.restartQuiz(false))
        dispatch(quizActionCreators.endQuiz(true))
        dispatch(scoreActionCreators.setResult(message.result))
        break
      case GAMESTATE.TOTAL_RESULT:
        dispatch(resultActionCreators.setTotalResult(message.totalResult))
        dispatch(quizActionCreators.endGame(true))
        dispatch(waitingRoomActionCreators.startQuiz(false))
        dispatch(scoreActionCreators.restartQuiz(false))
        dispatch(homeActionCreators.enableStart(false))
        dispatch(waitingRoomActionCreators.startQuiz(false))
        break
      default:
        console.log(`Server name : ${message.serverName}`)
    }
  })

  return socket
}

const getSocket = () => {
  return socket
}

export { setupSocket, getSocket }
