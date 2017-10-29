var Alexa = require('alexa-sdk')

var handlers = require('./handlers').handlers

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback)

  // register the handler
  alexa.registerHandlers(handlers)

  // run the skills logic
  alexa.execute()
}
