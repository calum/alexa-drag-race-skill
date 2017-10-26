var Alexa = require('alexa-sdk')

var api = require('./drag_race/api')
var handlers = require('./handlers').handlers

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback)

  // register the handler
  alexa.registerHandlers(handlers)

  // run the skills logic
  alexa.execute()
}
