const GAMESTATE = {
  READY: 0,
  START_QUIZ: 1,
  READY_ANSWER_COUNT: 2,
  END_QUIZ: 3,
  READY_NEXT_QUIZ_COUNT: 4,
  TOTAL_RESULT: 6
}

class Game {
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

  static get GAMESTATE() {
    return GAMESTATE
  }

  startQuiz(clients) {
    console.log(`Start Quiz: ${this.process.current}`)
    this.state = GAMESTATE.START_QUIZ

    clients.forEach((client, id) => {
      this.players.set(id, {
        isCorrect: false,
        answers: [],
        life: 1,
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
    return this.getSurvivors()
  }

  readyNextQuiz() {
    console.log('Ready Next Quiz')
    this.state = GAMESTATE.READY_NEXT_QUIZ_COUNT
  }

  finishGame() {
    console.log('Finish Game')
    this.state = GAMESTATE.TOTAL_RESULT
    return this.getSurvivors()
  }

  isFinish() {
    return this.process.current > this.process.total
  }

  // TODO(wonjerry): Check users can change their answer.
  setAnswer(id, answer) {
    if (!this.players.has(id)) {
      return
    }

    const player = this.players.get(id)
    if (player.life < 0) {
      return
    }

    // TODO(wonjerry): Implement modify answer later.
    if (player.answers[this.process.current - 1]) {
      return
    }

    player.answers.push(answer)
    player.isCorrect = answer == this.quizzes[this.process.current - 1].answer
  }

  getSurvivors() {
    const survivors = []
    this.players.forEach((player, _) => {
      if (player.isCorrect) {
        survivors.push(player.nickname)
      } else {
        player.life--
      }
      player.isCorrect = false
    })
    return survivors
  }
}

module.exports = Game
