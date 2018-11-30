const _ = require('lodash')
const axios = require('axios')
const moment = require('moment')

const Game = require('./Game')
const Timer = require('./Timer')
const utils = require('./utils')

const CLIENT_WAITING_TIME = 1000 * 15
const GAME_WAITING_TIME = 1000 * 5
const SHOW_RESULT_TIME = 1000 * 5

class Gameroom {
  constructor(io, name) {
    this.io = io
    this.name = name[0]
    this.clients = new Map()
    this.game = null
    this.gameStartTime = 0
    this.otherSurvivors = []

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
      this.io.in('game').emit('set answer', { id: client.id, answer: message.answer})
    })
    const player = {
      id: client.id,
      nickname: client.nickname
    }
    this.game.addPlayer(player)
    this.io.in('game').emit('add player', player)
  }

  removeClient(client) {
    client.removeAllListeners('answer')
    this.clients.delete(client.id)
  }

  broadCastMessage(message) {
    console.log('in board: ' , this.name)
    this.io.in('game').emit('broad',{
        ...message,
        name: this.name
    })
  }

  async startGame() {
    while (true) {
      this.game.startQuiz()
      this.broadCastMessage({
        state: this.game.state,
        question: this.game.getCurrentQuestion(),
        questionNum: this.game.process.current,
        totalQuizSize: this.game.process.total
      })
      console.log(this.players)

      await utils.sleep(GAME_WAITING_TIME)

      const result = this.game.endQuiz()
      console.log(this.players)

      if (this.game.isFinish()) {
        break
      }

      this.broadCastMessage({
        state: this.game.state,
        result
      })

      await utils.sleep(SHOW_RESULT_TIME)

      this.game.process.current += 1
    }

    const totalResult = this.game.finishGame()
    console.log(this.players)
    this.broadCastMessage({
      state: this.game.state,
      totalResult
    })

    this.restart()
  }

  syncSurvivors(survivors) {
    if (this.game.state == Game.GAMESTATE.END_QUIZ) {
      this.otherSurvivors = this.otherSurvivors.concat(survivors)
    }
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
