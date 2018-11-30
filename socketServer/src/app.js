const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const redis = require('socket.io-redis')
require('dotenv').config()

const port = process.argv.slice(2, 3)
const name = process.argv.slice(3, 4)

if (!port && !server) {
  console.log('usage: node index.js port name')
}

const GameRoom = require('./Gameroom.js')

app.use('/', express.static(path.join(__dirname, '../public')))
app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.adapter(redis({ host: 'localhost', port: 6379 }))

const gameroom = new GameRoom(io, name)

io.set('transports', ['websocket', 'polling']);

io.on('connection', (socket) => {
  console.log(`Client has connected!!:  ${socket.id}`)
  socket.emit('message', {
        state: 5,
      name: name,
  })

  socket.on('join game', (message) => {
    console.log(`Client join Game: ${socket.id}`)
    gameroom.addClient(socket, message.nickname)
    socket.emit('message', {
      name: name[0],
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
})

io.in('game').on('sync survivors', (message) => {
  console.log(message)
  this.gameroom.syncSurvivors(message.survivors)
})

const { HOST, PORT } = process.env

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}/`)
})
