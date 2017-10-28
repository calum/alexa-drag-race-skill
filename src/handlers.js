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

    if (!season_number) {
      return this.emit('error')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number.replace(/all stars/ig, 'A')

    api.get_season_winner(season_number, (err, winner) => {
      if (err) {
        console.error(err)
        return this.emit('error')
      }
      this.emit(':tell', winner + ' was the winner of season ' + season_number)
    })
  },

  // "what challenges did {queen} win"
  'getchallengesfromqueen': function() {
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    // get the exact queen name:
    api.get_exact_queen_name(queen, (err, exact_queen) => {
      if (err) {
        console.error(err)
        return this.emit('error')
      }

      api.get_challenge_wins(exact_queen, (err, challenges_won) => {
        if (err) {
          console.error(err)
          return this.emit('error')
        }

        var answer = exact_queen + ' has won ' + challenges_won.total_main +
                      ' main challenges and ' + challenges_won.total_mini +
                      ' mini challenges: '
        answer += challenges_won.names.pop()
        while(challenges_won.names.length > 0) {
          answer += ' and ' + challenges_won.names.pop()
        }

        // send the answer back
        this.emit(':tell', answer)
      })
    })
  },

  // "Who were the top three in season {season_number}"
  'gettopthreefromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    if (!season_number) {
      return this.emit('error')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number.replace(/all stars/ig, 'A')

    api.get_season_top_three(season_number, (err, top_three) => {
      if (err) {
        console.error(err)
        return this.emit('error')
      }
      var answer = 'The top three for season ' + season_number + ' are ' +
                    top_three[0] + ', ' +
                    top_three[1] + ', and ' +
                    top_three[2] + '.'
      this.emit(':tell', answer)
    })
  },

  // "who was miss congeniality in season {season_number}"
  'getcongenialityfromseason': function() {
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    if (!season_number) {
      return this.emit('error')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number.replace(/all stars/ig, 'A')

    api.miss_congeniality_season(season_number, (err, winner) => {
      if (err) {
        console.error(err)
        return this.emit('error')
      }
      var answer = winner + ' was Miss Congeniality for season ' + season_number
      this.emit(':tell', answer)
    })
  },

  'error': function() {
    this.emit(':tell', 'Sorry, an error occured')
  }
}

module.exports = {
  handlers: handlers
}
