const SET_QUESTION = 'quiz/SET_QUESTION'
const SET_ANSWER = 'quiz/SET_ANSWER'

export const actionTypes = {
  SET_QUESTION,
  SET_ANSWER
}

const setQuestion = (question) => ({
  type: SET_QUESTION,
  payload: {
    question
  }
})

const setAnswer = (answer) => ({
  type: SET_ANSWER,
  payload: {
    answer
  }
})

export const actionCreators = {
  setQuestion,
  setAnswer
}
