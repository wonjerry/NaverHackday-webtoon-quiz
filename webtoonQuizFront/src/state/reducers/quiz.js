import { actionTypes } from '../actions/home'

const initialState = {
  question: {
    title: "다음의 등장인물이 나오는 웹툰의 제목을 고르시오.",
    imgSrc: '../../img/jo.png',
    choices: ["자까","조석","박용제"]
  },
  answer: 0
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

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTION:
      return setQuestion(state, action.payload)
    case actionTypes.SET_ANSWER:
      return setAnswer(state, action.payload)
    default:
      return state
  }
}
