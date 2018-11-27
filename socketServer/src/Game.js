const _ = require('lodash')
const GAMESTATE = {
  READY: 0,
  START_QUIZ: 1,
  READY_ANSWER_COUNT: 2,
  END_QUIZ: 3,
  READY_NEXT_QUIZ_COUNT: 4,
  TOTAL_RESULT: 6
}
const RANK_SIZE = 10

class Game {
  static get GAMESTATE() {
    return GAMESTATE
  }

  // TODO(wonjerry): Delete default parameter when api server sonnected.
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
        isCorrect: false,
        answers: [],
        correctNum: 0,
        nickname: client.nickname
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
    return this.calculateRank()
  }

  readyNextQuiz() {
    console.log('Ready Next Quiz')
    this.state = GAMESTATE.READY_NEXT_QUIZ_COUNT
  }

  finishGame() {
    console.log('Finish Game')
    this.state = GAMESTATE.TOTAL_RESULT
    return this.calculateRank()
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
    player.isCorrect = answer == this.quizzes[this.process.current - 1].answer
  }

  calculateRank() {
    this.players.forEach((player, _) => {
      if (player.isCorrect) {
        this.players.correctNum++
      }
      player.isCorrect = false
    })

    return [...this.player.entries()]
      .sort((a, b) => b[1].correctNum - a[1].correctNum)
      .slice(0, RANK_SIZE)
      .map(entry => ({
        nickname: entry[0].nickname,
        correctNum: entry[0].correctNum
      }))
  }
}

module.exports = Game
