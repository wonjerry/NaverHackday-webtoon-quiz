const moment = require('moment')
const schedule = require('node-schedule')

function createOption(startTime, endTime) {
  return {
    start: startTime,
    end: endTime,
    rule: '*/1 * * * * *'
  }
}

function isFinish(fireTime, endTime) {
  return moment(fireTime).isSameOrAfter(endTime, 'second')
}

module.exports.start = (
  startTime,
  endTime,
  fireCallback
) => (
  new Promise((resolve, _) => {
    const option = createOption(startTime, endTime)
    schedule.scheduleJob(option, (fireTime) => {
      fireCallback(fireTime)

      if (isFinish(fireTime, endTime)) {
        resolve()
      }
    })
  })
)
