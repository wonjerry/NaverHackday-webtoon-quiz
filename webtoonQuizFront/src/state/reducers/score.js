import { actionTypes } from '../actions/score'

const initialState = {
  result: {
    survivors: []
  },
  restartQuiz: false
}

const setResult = (state, { result }) => {
  return {
    ...state,
    result
  }
}

const restartQuiz = (state, { isRestart }) => {
  return {
    ...state,
    restartQuiz: isRestart
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RESULT:
      return setResult(state, action.payload)
    case actionTypes.RESTART_QUIZ:
      return restartQuiz(state, action.payload)
    default:
      return state
  }
}
