require('dotenv').config()

var Alexa = require('alexa-sdk')
var logger = require('./logger')
var handlers = require('./handlers').handlers

exports.handler = function(event, context, callback) {
  logger.debug('Received intent: ', event.request.intent)

  var alexa = Alexa.handler(event, context, callback)

  // register the handler
  alexa.registerHandlers(handlers)

  // run the skills logic
  alexa.execute()
}
