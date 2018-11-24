const _ = require('lodash')
const Timer = require('./Timer')

const WAITING_TIME = 60 * 3 * 1000

class Gameroom {
  constructor(io) {
    this.io = io
    this.clients = new Map()
    this.waitClients()
  }

  waitClients() {
    const startTime = new Date(Date.now())
    const endTime = new Date(startTime.getTime() + WAITING_TIME)

    Timer.start(
      startTime,
      endTime,
      (fireTime) => {
        this.broadCastMessage('waiting', {
          currentTime: fireTime,
          endTime
        })
      },
      () => {
        this.broadCastMessage('start', { txt: 'startGame!' })
        this.startGame()
      }
    )
  }

  addClient(client) {
    if (this.clients.has(client.id)) {
      this.clients.set(client.id, client)
    }

    client.emit('welcome')
  }

  removeClient(client) {
    this.clients.delete(client.id)
  }

  broadCastMessage(eventName, message) {
    this.io.emit(eventName, message)
  }

  startGame() {
    // TODO(wonjerry): Implement game logic when game started
  }
}

module.exports = Gameroom
