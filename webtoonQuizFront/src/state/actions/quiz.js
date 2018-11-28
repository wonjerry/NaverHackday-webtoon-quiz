const SET_QUESTION = 'quiz/SET_QUESTION'

export const actionTypes = {
  SET_QUESTION
}

const setQuestion = (question) => ({
  type: SET_QUESTION,
  payload: {
    question
  }
})

export const actionCreators = {
  setQuestion
}
