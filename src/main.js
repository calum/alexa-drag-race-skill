require('dotenv').config()

var Alexa = require('alexa-sdk')
var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'info'

var handlers = require('./handlers').handlers

exports.handler = function(event, context, callback) {
  winston.debug('Received intent: '+JSON.stringify(event.request.intent))

  var alexa = Alexa.handler(event, context, callback)

  // register the handler
  alexa.registerHandlers(handlers)

  // run the skills logic
  alexa.execute()
}
