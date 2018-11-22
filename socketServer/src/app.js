const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const GameRoom = require('./Gameroom.js')

const PORT = 5000
const HOST = '0.0.0.0'

app.use('/', express.static(path.join(__dirname, '../public')))

const gameroom = new GameRoom(io)

io.on('connection', (socket) => {
  socket.on('join', (message) => {
    console.log(`Client has connected!!:  ${socket.id}`)
    gameroom.addClient(socket)
  })

  socket.on('disconnect', () => {
    console.log(`Client has disconnected: ${socket.id}`)
    gameroom.removeClient(socket)
  })

  socket.on('message', (message) => {
    console.log(`Client message: ${JSON.stringify(message)}`)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}/`)
})
