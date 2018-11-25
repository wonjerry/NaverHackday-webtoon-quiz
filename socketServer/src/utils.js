const moment = require('moment')

const Timer = require('./Timer')

module.exports.sleep = async (millisecond) => {
  await Timer.start(millisecond)
}
