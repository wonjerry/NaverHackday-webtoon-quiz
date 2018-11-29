const _ = require('lodash')

const GAMESTATE = {
  READY: 0,
  WAITING: 1,
  START_QUIZ: 2,
  END_QUIZ: 3,
  TOTAL_RESULT: 4
}

class Game {
  static get GAMESTATE() {
    return GAMESTATE
  }

  constructor(quizzes) {
    this.quizzes = quizzes
    this.state = GAMESTATE.READY
    this.process = {
      current: 1,
      total: quizzes.length
    }
    this.players = new Map()
  }

  waitClients() {
    this.state = GAMESTATE.WAITING
  }

  setPlayers(clients) {
    clients.forEach((client, id) => {
      this.players.set(id, {
        answers: [],
        nickname: client.nickname,
        isSurvivor: true
      })
    })
  }

  getCurrentQuestion() {
    return this.quizzes[this.process.current - 1]
  }

  startQuiz() {
    console.log(`Start Quiz: ${this.process.current}`)
    this.state = GAMESTATE.START_QUIZ
  }

  endQuiz() {
    console.log('End Quiz')
    this.state = GAMESTATE.END_QUIZ
    return this.calculateResult()
  }

  finishGame() {
    console.log('Finish Game')
    this.state = GAMESTATE.TOTAL_RESULT
    return this.calculateResult()
  }

  isFinish() {
    return this.process.current >= this.process.total
  }

  // TODO(wonjerry): Implement enable modify answer later.
  setAnswer(id, answer) {
    console.log('setAnswer : ', answer)
    if (!this.players.has(id)) {
      return
    }

    const player = this.players.get(id)
    if (player.answers[this.process.current - 1]) {
      return
    }

    player.answers.push(answer)
  }

  calculateResult() {
    console.log(this.players)
    const correctAnswer = this.quizzes[this.process.current - 1].quiz.solution
    this.players.forEach((player, _) => {
      console.log(player.answers[this.process.current - 1], correctAnswer)
      if (player.answers[this.process.current - 1] != correctAnswer) {
        player.isSurvivor = false
      }
    })
    return {
      survivors: this.getSurvivors(),
      answerStatics: this.getAnswerStatics()
    }
  }

  getSurvivors() {
    return [...this.players.entries()]
      .filter(([_, player]) => player.isSurvivor)
      .map(([_, player]) => player.nickname)
  }

  getAnswerStatics() {
    return [...this.players.entries()].map(
      ([_, player]) =>
        player.isSurvivor && player.answers[this.process.current - 1]
    )
  }
}

module.exports = Game
