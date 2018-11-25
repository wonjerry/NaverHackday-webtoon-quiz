const axios = require('axios')

const GAMESTATE = {
  INIT: 0,
  START_QUIZ: 1,
  END_QUIZ: 2,
  RESULT: 3
}

class Game {
  constructor() {
    this.state = null
    this.process = null
    this.init()
  }

  init() {
    this.state = GAMESTATE.INIT
    this.process = {
      current: 1,
      total: this.getQuizSize()
    }
  }

  isFinish() {
    return this.process.current <= this.process.total
  }

  // TODO(wonjerry): Get Quiz size.
  async getQuizSize() {
    const { data } =  await axios.get('http://localhost:8080/api/quizs')
    return data.quizs.size()
  }

  startQuiz() {
    console.log(`Start Quiz: ${this.process.current}`)
    this.state = GAMESTATE.START_QUIZ
  }

  endQuiz() {
    console.log('End Quiz')
    this.state = GAMESTATE.START_END
  }

  finishGame() {
    console.log('Result')
    this.state = GAMESTATE.RESULT
  }
}

module.exports = Game
