const _ = require('lodash')
const GAMESTATE = {
  READY: 0,
  START_QUIZ: 1,
  READY_ANSWER_COUNT: 2,
  END_QUIZ: 3,
  READY_NEXT_QUIZ_COUNT: 4,
  TOTAL_RESULT: 5
}

class Game {
  static get GAMESTATE() {
    return GAMESTATE
  }

  // TODO(wonjerry): Delete default parameter when api server connected.
  constructor(
    quizzes = [
      { answer: 1 },
      { answer: 1 },
      { answer: 1 },
      { answer: 1 },
      { answer: 1 }
    ]
  ) {
    this.quizzes = quizzes
    this.state = GAMESTATE.READY
    this.process = {
      current: 1,
      total: 5
    }
    this.players = new Map()
  }

  startQuiz(clients) {
    console.log(`Start Quiz: ${this.process.current}`)
    this.state = GAMESTATE.START_QUIZ

    clients.forEach((client, id) => {
      this.players.set(id, {
        answers: [],
        nickname: client.nickname,
        isSurvivor: true
      })
    })
  }

  readyAnswers() {
    console.log('Ready Answers')
    this.state = GAMESTATE.READY_ANSWER_COUNT
  }

  endQuiz() {
    console.log('End Quiz')
    this.state = GAMESTATE.START_END
    return this.calculateResult()
  }

  readyNextQuiz() {
    console.log('Ready Next Quiz')
    this.state = GAMESTATE.READY_NEXT_QUIZ_COUNT
  }

  finishGame() {
    console.log('Finish Game')
    this.state = GAMESTATE.TOTAL_RESULT
    return this.calculateResult()
  }

  isFinish() {
    return this.process.current > this.process.total
  }

  // TODO(wonjerry): Implement enable modify answer later.
  setAnswer(id, answer) {
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
    const correctAnswer = this.quizzes[this.process.current - 1].answer
    this.player.forEach((_, player) => {
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
    return [...this.player.entries()]
      .filter(([_, player]) => player.isSurvivor)
      .map(([_, player]) => player.nickname)
  }

  getAnswerStatics() {
    return [...this.player.entries()].map(
      ([_, player]) => player.isSurvivor && player.answers[this.process.current - 1]
    )
  }
}

module.exports = Game
