// Setup error monitoring with airbrake
var winston = require('winston')
require('winston-rollbar2')
winston.level = process.env.LOG_LEVEL || 'info'

if (process.env.ROLLBAR_TOKEN && process.env.ENVIRONMENT != 'development') {
  winston.add(winston.transports.Rollbar, {
    rollbarAccessToken: process.env.ROLLBAR_TOKEN,
    level: process.env.LOG_LEVEL || 'error',
    rollbarConfig: {
      environment: process.env.ENVIRONMENT
    }
  })
}

module.exports = winston
