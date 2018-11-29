const SET_QUESTION = 'quiz/SET_QUESTION'
const SET_ANSWER = 'quiz/SET_ANSWER'
const END_QUIZ = 'quiz/END_QUIZ'
const END_GAME = 'quiz/END_GAME'

export const actionTypes = {
  SET_QUESTION,
  SET_ANSWER,
  END_QUIZ,
  END_GAME
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

const endQuiz = (isEnd) => ({
  type: END_QUIZ,
  payload: {
    isEnd
  }
})

const endGame = (isEnd) => ({
  type: END_GAME,
  payload: {
    isEnd
  }
})

export const actionCreators = {
  setQuestion,
  setAnswer,
  endQuiz,
  endGame
}
