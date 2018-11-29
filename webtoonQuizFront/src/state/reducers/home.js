import { actionTypes } from '../actions/home'

const initialState = {
  nickname: ''
}

const setNickname = (state, { nickname }) => {
  return {
    ...state,
    nickname
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NICKNAME:
      return setNickname(state, action.payload)
    default:
      return state
  }
}
