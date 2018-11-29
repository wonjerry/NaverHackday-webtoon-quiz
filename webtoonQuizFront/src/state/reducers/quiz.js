import { actionTypes } from '../actions/quiz'

const initialState = {
  question: {
    title: "다음의 등장인물이 나오는 웹툰의 제목을 고르시오.",
    imgSrc: '../../img/jo.png',
    choices: ["자까","조석","박용제"]  ,
    type : "ox" 
  },
  answer: 0,
  endQuiz: false,
  endGame: false
}

const setQuestion = (state, { question }) => {
  return {
    ...state,
    ...question
  }
}

const setAnswer = (state, { answer }) => {
  return {
    ...state,
   answer
  }
}

const endQuiz = (state, { isEnd }) => {
  return {
    ...state,
    endQuiz: isEnd
  }
}

const endGame = (state, { isEnd }) => {
  return {
    ...state,
    endGame: isEnd
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION:
      return setQuestion(state, action.payload)
    case actionTypes.SET_ANSWER:
      return setAnswer(state, action.payload)
    case actionTypes.END_QUIZ:
      return endQuiz(state, action.payload)
    case actionTypes.END_GAME:
      return endGame(state, action.payload)
    default:
      return state
  }
}
