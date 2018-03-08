var lambda = require('lambda-local')
var drag_race_facts = require('../src/main')
var logger = require('../src/logger')

var intents = require('./test_data/test_intents')


describe('AWS Lambda tests', function() {
  this.timeout('4000')

  before(function(done) {
    logger.debug('Before function')
    lambda.setLogger(logger)
    done()
  })

  it('should launch with RuPaul quote', function(done) {
    logger.debug('Executing "Start drag race facts."')
    lambda.execute({
      event: intents.launch,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("She done already done had herses")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should give useful help', function(done) {
    logger.debug('Executing "help."')
    lambda.execute({
      event: intents.help,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes(
          "Ask me who won season 4, who were the top three in all stars two, and who was miss congeniality in season 7"
        )) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should say something when stopped', function(done) {
    logger.debug('Executing "stop."')
    lambda.execute({
      event: intents.stop,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Sashay Away")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the correct season for a queen', function(done) {
    logger.debug('Executing "What season is Katya in?"')
    lambda.execute({
      event: intents.season_from_queen,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Katya Zamolodchikova was in season all stars 2 and season 7")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the correct winner for a season', function(done) {
    logger.debug('Executing "Who won season five?"')
    lambda.execute({
      event: intents.getwinnerfromseason,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Jinkx Monsoon was the winner of season 5")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the correct number of challenges won for a queen', function(done) {
    logger.debug('Executing "What challenges did Willam win?"')
    lambda.execute({
      event: intents.getchallengesfromqueen,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Willam Belli has won 2 main challenges and 3 mini challenges")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the top three for a given season', function(done) {
    logger.debug('Executing "Top three for season four?"')
    lambda.execute({
      event: intents.gettopthreefromseason,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Chad Michaels")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the Miss Congeniality winner for a given season', function(done) {
    logger.debug('Executing "Miss congeniality for season one?"')
    lambda.execute({
      event: intents.getcongenialityfromseason,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Nina Flowers was Miss Congeniality for season 1")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('Should handle an error gracefully', function(done) {
    logger.debug('Executing "error"')
    lambda.execute({
      event: intents.error,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Sorry, something went wrong. Try asking that again")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('Should answer when the next episode is airing', function(done) {
    logger.debug('Executing "When is the next episode?"')
    lambda.execute({
      event: intents.nextepisode,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("Sorry, I was unable to find the date of the next episode.") ||
            data.response.outputSpeech.ssml.includes("The next episode will be airing on the")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('Should play a random quote sound file', function(done) {
    logger.debug('Executing "Play me a quote."')
    lambda.execute({
      event: intents.randomquote,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        logger.debug("response quote: "+data.response.outputSpeech.ssml)
        if (data.response.outputSpeech.ssml.includes('<audio src="')) {
          return done()
        }
        return done(new Error('Audio was not in the response'))
      }
    })
  })

  it('Should play a answer "how is your head?"', function(done) {
    logger.debug('Executing "How is your head?"')
    lambda.execute({
      event: intents.howsyourhead,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        logger.debug("response head: "+data.response.outputSpeech.ssml)
        if (data.response.outputSpeech.ssml.includes('never had any complaints')) {
          return done()
        }
        return done(new Error('Response was not funny'))
      }
    })
  })
})
