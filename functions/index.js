var functions = require('firebase-functions')
var ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.dragRaceFacts = functions.https.onRequest((req, res) => {
  var assistant = new ActionsSdkAssistant({request: req, response: res})

  var actionMap = new Map()

  actionMap.set(assistant.StandardIntents.MAIN, function(assistant) {
    assistant.tell('She done already done had herses')
  })

  assistant.handleRequest(actionMap)
})
