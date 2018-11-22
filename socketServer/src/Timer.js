const schedule = require('node-schedule')

function createOption(startTime, endTime) {
  return {
    start: startTime,
    end: endTime,
    rule: '*/1 * * * * *'
  }
}

function isFinish(fireTime, endTime) {
  return new Date(fireTime).getSeconds() == new Date(endTime).getSeconds()
}

module.exports.startTimer = (
  startTime,
  endTime,
  fireCallback,
  finishCallback
) => {
  const option = createOption(startTime, endTime)

  schedule.scheduleJob(option, (fireTime) => {
    fireCallback(fireTime)

    if (isFinish(fireTime, endTime) && finishCallback) {
      // TODO(wonjerry): Change to Promise
      finishCallback()
    }
  })
}
