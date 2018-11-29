import { combineReducers } from 'redux'
import home from './home'
import quiz from './quiz'
import waitingRoom from './waitingRoom'

export default combineReducers({
  home,
  quiz,
  waitingRoom
})