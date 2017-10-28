var api = require('./drag_race/api')

var handlers = {
  'LaunchRequest': function() {
    this.emit(':tell', 'Hey, welcome')
  },

  // "what season was {queen} in"
  'getseasonfromqueen': function() {
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    if (!queen) {
      return this.emit('error')
    }

    // get the exact queen name:
    api.get_exact_queen_name(queen, (err, exact_queen) => {
      if (err) {
        console.error(err)
        return this.emit('error')
      }

      api.get_season_from_queen(exact_queen, (err, seasons) => {
        if (err) {
          console.error(err)
          return this.emit('error')
        }

        var answer = exact_queen + ' was in season ' + seasons.pop()
        while(seasons.length > 0) {
          answer += ' and ' + seasons.pop()
        }

        // send the answer back
        this.emit(':tell', answer)
      })
    })
  },

  // "who won season {season_number}"
  'getwinnerfromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  // "what challenges did {queen} win"
  'getchallengesfromqueen': function() {
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  // "Who were the top three in season {season_number}"
  'gettopthreefromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    this.emit(':tell', 'Sorry, I can\'t answer that right now')
  },

  // "who was miss congeniality in season {season_number}"
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
