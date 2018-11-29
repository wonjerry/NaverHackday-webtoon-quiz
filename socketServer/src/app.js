const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
require('dotenv').config()

const GameRoom = require('./Gameroom.js')

app.use('/', express.static(path.join(__dirname, '../public')))

const gameroom = new GameRoom(io)

io.on('connection', (socket) => {
  console.log(`Client has connected!!:  ${socket.id}`)

  // socket.emit('message', {
  //   state: 0,
  // })

  socket.on('join game', (message) => {
    console.log(`Client join Game: ${socket.id}`)
    gameroom.addClient(socket, message.nickname)
    socket.emit('message', {
      state: gameroom.game.state,
      startTime: gameroom.gameStartTime
    })
  })

  socket.on('chat', (message) => {
    io.emit('chat', { text: message.text })
  })

  socket.on('disconnect', () => {
    console.log(`Client has disconnected: ${socket.id}`)
    gameroom.removeClient(socket)
  })

  // TODO(wonjerry): get this signal from admin
  socket.on('Register Start time', () => {
    // Do nothing.
  })
})

const { HOST, PORT } = process.env

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}/`)
})
