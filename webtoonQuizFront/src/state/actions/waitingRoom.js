const SET_START_TIME = 'waitingRoom/SET_START_TIME'
const START_QUIZ = 'waitingRoom/START_QUIZ'

export const actionTypes = {
  SET_START_TIME,
  START_QUIZ
}

const setStartTime = (startTime) => ({
  type: SET_START_TIME,
  payload: {
    startTime
  }
})

const startQuiz = (isStart) => ({
  type: START_QUIZ,
  payload: {
    isStart
  }
})

export const actionCreators = {
  setStartTime,
  startQuiz
}
