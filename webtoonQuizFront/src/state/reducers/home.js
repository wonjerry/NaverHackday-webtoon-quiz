import { actionTypes } from '../actions/home'

const initialState = {
  nickname: '',
  isStart: false
}

const setNickname = (state, { nickname }) => {
  return {
    ...state,
    nickname
  }
}

const enableStart = (state, { isStart }) => {
  return {
    ...state,
    isStart
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NICKNAME:
      return setNickname(state, action.payload)
    case actionTypes.ENABLE_START:
      return enableStart(state, action.payload)
    default:
      return state
  }
}
