const moment = require('moment')
const Timer = require('./Timer')

const Game = require('./Game')

const CLIENT_WAITING_TIME = 1000 * 5
const GAME_WAITIONG_TIME = 1000 * 10
const SHOW_RESULT_TIME = 1000 * 5

class Gameroom {
  constructor(io) {
    this.io = io
    this.clients = new Map()
    this.game = new Game()
  }

  restart() {
    for (const [_, client] of this.clients) {
      client.leave('game')
    }

    this.clients.clear()
    this.game.init()
  }

  async waitClients() {
    console.log('wait clients')
    const startTime = moment().valueOf()
    const endTime = startTime + CLIENT_WAITING_TIME

    await Timer.start(
      startTime,
      endTime,
      (fireTime) => {
        this.broadCastMessage('waiting', {
          currentTime: fireTime,
          endTime
        })
      }
    )

    this.startGame()
  }

  addClient(client) {
    if (this.clients.has(client.id)) {
      this.clients.set(client.id, client)
    }

    client.join('game')
  }

  removeClient(client) {
    this.clients.delete(client.id)
  }

  broadCastMessage(eventName, message) {
    this.io.in('game').emit(eventName, message)
  }

  startCountDown(millisecond) {
    const startTime = moment().valueOf()
    const endTime = startTime + millisecond
    return Timer.start(
      startTime,
      endTime,
      (fireTime) => {
        this.broadCastMessage('countDown', {
          currentTime: fireTime,
          endTime
        })
      } 
    )
  }

  async startGame() {
    while (this.game.isFinish()) {

      this.game.startQuiz()
      this.broadCastMessage('quiz', {
        state: this.game.state,
        questionNum: this.game.process.current++,
        totalQuizSize: this.game.process.total
      })

      await this.startCountDown(GAME_WAITIONG_TIME)

      this.game.endQuiz()
      this.broadCastMessage('quiz', {
        state: this.game.state,
        result: {
          rightAnswerUsers: 10,
          top10: []
        }
      })

      await this.startCountDown(SHOW_RESULT_TIME)
    }

    this.game.finishGame()
    this.broadCastMessage('quiz', {
      state: this.game.state,
      rank: []
    })
    this.restart()
  }
}

module.exports = Gameroom
