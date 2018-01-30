var api = require('./drag_race/api')
var tvdb = require('./drag_race/tvdb_api')
var logger = require('./logger')
var res_gen = require('./response_generator')

if (!process.env.TVDB_API_KEY) {
  logger.error('You must set the environment varaible TVDB_API_KEY to hold your API key for the TVDB. See README for more info.')
}
tvdb.setKey(process.env.TVDB_API_KEY)

var handlers = {
  // Useful function to do any error handling
  handle_error: function(err) {
    if (err) logger.error(err)
    return this.emit('error')
  },

  'LaunchRequest': function() {
    logger.info('LaunchRequest event')
    this.emit(':tell', 'She Already Had Had Hersesszzz')
  },

  'AMAZON.CancelIntent': function () {
    logger.info('CancelIntent event')
    this.emit(':tell', 'Okay.')
  },

  'AMAZON.HelpIntent': function() {
    logger.info('HelpIntent event')
    this.emit(':tell', 'Ask me who won season 4, who were the top three in all stars two, and who was miss congeniality in season 7.')
  },

  'AMAZON.StopIntent': function() {
    logger.info('StopIntent event')
    this.emit(':tell', 'Sashay Away')
  },

  // "what season was {queen} in"
  'getseasonfromqueen': function() {
    logger.info('getseasonfromqueen event')
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    if (!queen) {
      return this.emit(':ask', 'I could not work out which queen you are asking about. Please ask again.', 'Please ask that again.')
    }

    // get the exact queen name:
    api.get_exact_queen_name(queen, (err, exact_queen) => {
      if (err) this.handle_error(err)

      api.get_season_from_queen(exact_queen, (err, seasons) => {
        if (err) this.handle_error(err)

        var answer = exact_queen + ' was in season ' + seasons.pop().replace('A', 'all stars ')
        while(seasons.length > 0) {
          answer += ' and season ' + seasons.pop().replace('A', 'all stars ')
        }

        logger.info('season: '+answer)
        // send the answer back
        this.emit(':tell', answer)
      })
    })
  },

  // "who won season {season_number}"
  'getwinnerfromseason': function() {
    logger.info('getwinnerfromseason event')
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    if (!season_number) {
      return this.emit(':ask', 'I could not work out which season you are asking about. Please ask again.', 'Please ask that again.')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number = season_number.replace(/all stars/ig, 'A')
    season_number = season_number.replace(/stars/ig, 'A')
    season_number = season_number.replace(/\s/ig, '') // remove spaces
    season_number = season_number.trim()

    api.get_season_winner(season_number, (err, winner, used_season_number) => {
      if (err) this.handle_error(err)
      logger.info('winner: '+winner)
      this.emit(':tell', winner + ' was the winner of season ' + used_season_number.replace('A', 'all stars '))
    })
  },

  // "what challenges did {queen} win?"
  'getchallengesfromqueen': function() {
    logger.info('getchallengesfromqueen event')
    // get the queen name from the intent slots
    var queen = this.event.request.intent.slots.queen.value

    if (!queen) {
      return this.emit(':ask', 'I could not work out which queen you are asking about. Please ask again.', 'Please ask that again.')
    }

    // get the exact queen name:
    api.get_exact_queen_name(queen, (err, exact_queen) => {
      if (err) this.handle_error(err)

      api.get_challenge_wins(exact_queen, (err, challenges_won) => {
        if (err) this.handle_error(err)

        var answer = res_gen.challenges_from_queen_response(exact_queen, challenges_won)

        // send the answer back
        logger.info('answer: '+answer)
        this.emit(':tell', answer)
      })
    })
  },

  // "Who were the top three in season {season_number}"
  'gettopthreefromseason': function() {
    logger.info('gettopthreefromseason event')
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    if (!season_number) {
      return this.emit(':ask', 'I could not work out which season you are asking about. Please ask again.', 'Please ask that again.')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number = season_number.replace(/all stars/ig, 'A')
    season_number = season_number.replace(/stars/ig, 'A')
    season_number = season_number.replace(/\s/ig, '') // remove spaces
    season_number = season_number.trim()

    api.get_season_top_three(season_number, (err, top_three, used_season_number) => {
      if (err) this.handle_error(err)
      var answer = 'The top three for season ' + used_season_number.replace('A', 'all stars ') + ' are ' +
                    top_three[0] + ', ' +
                    top_three[1] + ', and ' +
                    top_three[2] + '.'
      logger.info('answer: '+answer)
      this.emit(':tell', answer)
    })
  },

  // "who was miss congeniality in season {season_number}"
  'getcongenialityfromseason': function() {
    logger.info('getcongenialityfromseason event')
    // get the season number from the intent slots
    var season_number = this.event.request.intent.slots.season_number.value

    if (!season_number) {
      return this.emit(':ask', 'I could not work out which season you are asking about. Please ask again.', 'Please ask that again.')
    }

    // replace case insensitive 'all stars' with the letter 'A'
    season_number = season_number.replace(/all stars/ig, 'A')
    season_number = season_number.replace(/stars/ig, 'A')
    season_number = season_number.replace(/\s/ig, '') // remove spaces
    season_number = season_number.trim()

    api.miss_congeniality_season(season_number, (err, winner) => {
      if (err) this.handle_error(err)
      var answer = winner + ' was Miss Congeniality for season ' + season_number.replace('A', 'all stars ')
      logger.info('answer: '+answer)
      this.emit(':tell', answer)
    })
  },

  'nextepisode': function() {
    logger.info('nextepisode event')
    tvdb.getNextEpisode((err, next_episode) => {
      if (err) this.handle_error(err)
      if (!next_episode || !next_episode.firstAired) {
        this.emit(':tell', 'Sorry, I was unable to find the date of the next episode.')
      }
      var date = next_episode.firstAired.split('-')
      var speak_date = '<say-as interpret-as="date">'+date[0]+date[1]+date[2]+'</say-as>'
      var answer = 'The next episode will be airing on the ' +speak_date
      logger.info('answer: '+answer)
      this.emit(':tell', answer)
    })
  },

  'Unhandled': function() {
    this.emit('error')
  },

  'error': function() {
    logger.error('error event'+ JSON.stringify(this.event.request, null, 2))
    this.emit(':tell', 'Sorry, something went wrong. Try asking that again.')
  }
}

module.exports = {
  handlers: handlers
}
