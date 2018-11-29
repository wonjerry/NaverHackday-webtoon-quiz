import { actionTypes } from '../actions/waitingRoom'

const initialState = {
  startTime: 0,
  startQuiz: false
}

const setStartTime = (state, { startTime }) => {
  return {
    ...state,
    startTime
  }
}

const startQuiz = (state, { isStart }) => {
  return {
    ...state,
    startQuiz: isStart
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_START_TIME:
      return setStartTime(state, action.payload)
    case actionTypes.START_QUIZ:
      return startQuiz(state, action.payload)
    default:
      return state
  }
}
