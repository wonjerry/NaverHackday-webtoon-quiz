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

  socket.on('admin', (message) => {
    console.log(`Admin client join: ${socket.id}`)
    socket.emit('admin', { text: 'Admin client join'})

    // TODO(wonjerry): get this signal from admin
    socket.on('startNextQuiz', () => {
      // Do nothing.
      if (this.game.state == Game.GAMESTATE.END_QUIZ) {
        this.game.startQuiz()
      }
    })
  })
})

const { HOST, PORT } = process.env

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}/`)
})
