const SET_NICKNAME = 'home/SET_NICKNAME'
const ENABLE_START = 'home/ENABLE_START'

export const actionTypes = {
  SET_NICKNAME,
  ENABLE_START
}

const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: {
    nickname
  }
})

const enableStart = (isStart) => ({
  type: ENABLE_START,
  payload: {
    isStart
  }
})

export const actionCreators = {
  setNickname,
  enableStart
}
