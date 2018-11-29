const axios = require('axios')
const moment = require('moment')

const Game = require('./Game')
const Timer = require('./Timer')
const utils = require('./utils')

const CLIENT_WAITING_TIME = 1000 * 60 * 3
const GAME_WAITING_TIME = 1000 * 10
const SHOW_RESULT_TIME = 1000 * 5

class Gameroom {
  constructor(io) {
    this.io = io
    this.clients = new Map()
    this.game = null
    this.gameStartTime = 0

    this.waitClients()
  } 

  async waitClients() {
    console.log('Wait clients')
    // TODO(wonjerry): Connect with api server.
    // const quizzes = await this.getQuizzes()
    this.game = new Game()
    this.gameStartTime = moment().valueOf() + CLIENT_WAITING_TIME
    this.game.waitClients()
    await utils.sleep(CLIENT_WAITING_TIME)

    await this.startGame()
    this.restart()
  }

  async getQuizzes() {
    const { data } = await axios.get('http://localhost:8080/api/quizs')
    return data.quizs
  }

  addClient(client, nickname) {
    if (this.clients.has(client.id)) {
      this.clients.set(client.id, client)
    }

    client.join('game')
    client.nickname = nickname

    client.on('answer', (message) => {
      if (this.game.state !== Game.GAMESTATE.READY_ANSWER_COUNT) {
        return
      }
      this.game.setAnswer(client.id, message.answer)
    })
  }

  removeClient(client) {
    client.removeAllListeners('answer')
    this.clients.delete(client.id)
  }

  broadCastMessage(eventName, message) {
    this.io.in('game').emit(eventName, message)
  }

  async startCountDown(millisecond) {
    await Timer.start(millisecond, (fireTime, endTime) => {
      this.broadCastMessage('countDown', {
        state: this.game.state,
        currentTime: fireTime,
        endTime
      })
    })
  }

  async startGame() {
    while (true) {
      this.game.startQuiz(this.clients)
      this.broadCastMessage('message', {
        state: this.game.state,
        questionNum: this.game.process.current++,
        totalQuizSize: this.game.process.total
      })

      this.game.readyAnswers()
      await this.startCountDown(GAME_WAITING_TIME)

      const result = this.game.endQuiz()
      this.broadCastMessage('quiz', {
        state: this.game.state,
        result
      })
      await utils.sleep(2000)

      if (this.game.isFinish()) {
        break
      }

      this.game.readyNextQuiz()
      await this.startCountDown(SHOW_RESULT_TIME)
    }

    const result = this.game.finishGame()
    this.broadCastMessage('quiz', {
      state: this.game.state,
      result
    })
  }

  restart() {
    this.clients.forEach((client, _) => {
      client.removeAllListeners('answer')
      client.leave('game')
    })

    this.clients.clear()
    this.game = null
  }
}

module.exports = Gameroom
