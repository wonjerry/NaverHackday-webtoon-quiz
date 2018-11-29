const axios = require('axios')
const moment = require('moment')

const Game = require('./Game')
const Timer = require('./Timer')
const utils = require('./utils')

const CLIENT_WAITING_TIME = 1000 * 15
const GAME_WAITING_TIME = 1000 * 5
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
    const quizzes = await this.getQuizzes()
    this.game = new Game(quizzes)
    this.gameStartTime = moment().valueOf() + CLIENT_WAITING_TIME
    this.game.waitClients()
    await utils.sleep(CLIENT_WAITING_TIME)

    this.game.setPlayers(this.clients)
    await this.startGame()
  }

  async getQuizzes() {
    const { data } = await axios.get(
      'http://106.10.33.128:8080/api/quizzes/round'
    )
    return data
  }

  addClient(client, nickname) {
    if (!this.clients.has(client.id)) {
      this.clients.set(client.id, client)
    }

    client.join('game')
    client.nickname = nickname

    client.on('answer', (message) => {
      if (this.game.state !== Game.GAMESTATE.START_QUIZ) {
        return
      }
      this.game.setAnswer(client.id, message.answer)
    })
  }

  removeClient(client) {
    client.removeAllListeners('answer')
    this.clients.delete(client.id)
  }

  broadCastMessage(message) {
    const name = process.argv.slice(3, 4)
    this.io.in('game').emit('message', { serverName: name })
    this.io.in('game').emit('message', message)
  }

  async startCountDown(millisecond) {
    await Timer.start(millisecond, (fireTime, endTime) => {
      this.broadCastMessage({
        state: this.game.state,
        currentTime: fireTime,
        endTime
      })
    })
  }

  async startGame() {
    // TODO(wonjerry): Check the client is joined game.
    this.game.setPlayers(this.clients)
    while (true) {
      this.game.startQuiz()
      console.log( this.game.getCurrentQuestion())
      this.broadCastMessage({
        state: this.game.state,
        question: this.game.getCurrentQuestion(),
        questionNum: this.game.process.current,
        totalQuizSize: this.game.process.total
      })

      await utils.sleep(GAME_WAITING_TIME)

      if (this.game.isFinish()) {
        break
      }

      const result = this.game.endQuiz()
      this.broadCastMessage({
        state: this.game.state,
        result
      })

      await utils.sleep(SHOW_RESULT_TIME)

      this.game.process.current += 1
    }

    const totalResult = this.game.finishGame()
    this.broadCastMessage({
      state: this.game.state,
      totalResult
    })

    this.restart()
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
