const SET_TOTAL_RESULT = 'result/SET_TOTAL_RESULT'

export const actionTypes = {
  SET_TOTAL_RESULT
}

const setTotalResult = (totalResult) => ({
  type: SET_TOTAL_RESULT,
  payload: {
    totalResult
  }
})

export const actionCreators = {
  setTotalResult
}
