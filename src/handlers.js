var handlers = {
  'LaunchRequest': function() {
    this.emit(':tell', 'Hey, welcome')
  },

  'getseasonfromqueen': function() {
    // end this session with the text for alexa to speak
    this.emit(':tell', 'Hello, World!')
  }
}

module.exports = {
  handlers: handlers
}
