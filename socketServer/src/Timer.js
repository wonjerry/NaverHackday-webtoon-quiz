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

module.exports.start = (millisecond, fireCallback = () => {}) => {
  const startTime = moment().valueOf()
  const endTime = startTime + millisecond
  return new Promise((resolve, _) => {
    const option = createOption(startTime, endTime)
    schedule.scheduleJob(option, (fireTime) => {
      fireCallback(fireTime, endTime)

      if (isFinish(fireTime, endTime)) {
        resolve()
      }
    })
  })
}
