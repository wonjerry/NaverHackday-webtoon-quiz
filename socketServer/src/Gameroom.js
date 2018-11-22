const _ = require('lodash')
const Timer = require('./Timer')

const WAITING_TIME = 60 * 3 * 1000

class Gameroom {
  constructor(io) {
    this.io = io
    this.clients = []

    this.startTimer()
  }

  startTimer() {
    const startTime = new Date(Date.now())
    const endTime = new Date(startTime.getTime() + WAITING_TIME)

    Timer.startTimer(
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
    if (!_.find(this.clients, (ele) => ele.age == client.id)) {
      this.clients.push(client)
    }

    client.emit('welcome')
  }

  removeClient(client) {
    this.clients = _.remove(this.client, (ele) => ele.id == client.id)
  }

  broadCastMessage(eventName, message) {
    this.io.emit(eventName, message)
  }

  startGame() {
    // TODO(wonjerry): Implement game logic when game started
  }
}

module.exports = Gameroom
