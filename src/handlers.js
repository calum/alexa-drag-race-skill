var api = require('./drag_race/api')

var handlers = {
  'LaunchRequest': function() {
    this.emit(':tell', 'Hey, welcome')
  },

  'getseasonfromqueen': function() {
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    if (!queen) {
      return this.emit('error')
    }

    api.get_season_from_queen(queen, function(seasons) {
      var answer = queen + ' was in season ' + seasons.pop()
      while(seasons.length > 0) {
        answer += ' and ' + seasons.pop()
      }

      // send the answer back
      this.emit(':tell', answer)
    })
  },

  'getwinnerfromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  'getchallengesfromqueen': function() {
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  'gettopthreefromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  'getcongenialityfromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  'error': function() {
    this.emit(':tell', 'Sorry, an error occured')
  }
}

module.exports = {
  handlers: handlers
}
