# Socket server for webtoon quiz.

## Requirements
- Install nodejs(9.11.2), npm(5.6.0), yarn
- Install dependency

```bash
  yarn
```

## Run

```bash
  yarn start
```

## Socket Signals

| From   | Event Name  | Payload                                                            | Game State            | Description                                                                                                        |
|--------|-------------|--------------------------------------------------------------------|-----------------------|--------------------------------------------------------------------------------------------------------------------|
| Client | 'join game' | { nickname: String }                                               | READY                 | Only logged in users with nickname can join.                                                                       |
| Server | 'waiting'   | { currentTime: timestamp, endTime: timestamp }                     | READY                 |                                                                                                                    |
| Server | 'quiz'      | { state: Enum, questionNum: Number, totalQuizSize: Number }        | START_QUIZ            | state is current game state. question number is current question number. totalQuizSize is total number of quizzes. |
| Server | 'countDown' | { state: Enum, currentTime: timestamp, endTime: timestamp }        | READY_ANSWER_COUNT    |                                                                                                                    |
| Server | 'quiz'      | { state: Enum, rank: [{ correctNum: Number, nickname: String  }] } | END_QUIZ              | state is current game state. rank is array of Object                                                               |
| Server | 'countDown' | { state: Enum, currentTime: timestamp, endTime: timestamp }        | READY_NEXT_QUIZ_COUNT |                                                                                                                    |
| Server | 'quiz'      | { state: Enum, rank }                                              | TOTAL_RESULT          |                                                                                                                    |

