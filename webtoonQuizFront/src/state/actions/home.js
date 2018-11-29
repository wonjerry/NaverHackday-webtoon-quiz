const SET_NICKNAME = 'home/SET_NICKNAME'

export const actionTypes = {
  SET_NICKNAME
}

const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: {
    nickname
  }
})

export const actionCreators = {
  setNickname
}
