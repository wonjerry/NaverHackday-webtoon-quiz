import { combineReducers } from 'redux'
import result from './result'
import home from './home'
import quiz from './quiz'
import score from './score'
import waitingRoom from './waitingRoom'

export default combineReducers({
  home,
  waitingRoom,
  quiz,
  score,
  result
})