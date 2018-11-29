const SET_RESULT = 'score/SET_RESULT'
const RESTART_QUIZ = 'score/RESTART_QUIZ'

export const actionTypes = {
  SET_RESULT,
  RESTART_QUIZ
}

const setResult = (result) => ({
  type: SET_RESULT,
  payload: {
    result
  }
})

const restartQuiz = (isRestart) => ({
  type: RESTART_QUIZ,
  payload: {
    isRestart
  }
})

export const actionCreators = {
  setResult,
  restartQuiz
}
