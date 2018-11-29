import io from 'socket.io-client'

import { actionTypes as homeActionTypes } from './state/actions/home'
import { actionTypes as quizActionTypes } from './state/actions/quiz'

const setupSocket = (dispatch) => {
  const socket = io('http://localhost:5000')

  socket.emit('join game', {
    nickname: 'wonjerry'
  })

  socket.on('waiting', ({ currentTime, endTime}) => {
    console.log(endTime)
  })
  socket.on('disconnect', () => {})

  return socket
}

export { setupSocket }