import { actionTypes } from '../actions/result'

const initialState = {
  totalResult: {
    survivors: []
  }
}

const setTotalResult = (state, { totalResult }) => {
  return {
    ...state,
    totalResult
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOTAL_RESULT:
      return setTotalResult(state, action.payload)
    default:
      return state
  }
}
