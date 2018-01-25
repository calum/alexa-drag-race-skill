var lambda = require('lambda-local')
var drag_race_facts = require('../src/main')
var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'info'
winston.info('LOG_LEVEL set to '+winston.level)

var intents = require('./test_data/test_intents')


describe('AWS Lambda tests', function() {

  before(function(done) {
    winston.debug('Before function')
    lambda.setLogger(winston)
    done()
  })

  it('should launch with RuPaul quote', function(done) {
    winston.debug('Executing "Start drag race facts."')
    lambda.execute({
      event: intents.launch,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("She Already Had Had Hersesszzz")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should give useful help', function(done) {
    winston.debug('Executing "help."')
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
    winston.debug('Executing "stop."')
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
    winston.debug('Executing "What season is Katya in?"')
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
    winston.debug('Executing "Who won season five?"')
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
    winston.debug('Executing "What challenges did Willam win?"')
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
    winston.debug('Executing "Top three for season four?"')
    lambda.execute({
      event: intents.gettopthreefromseason,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("The top three for season 4 are Willam Belli, Phi Phi O'Hara, and Chad Michaels.")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })

  it('should get the Miss Congeniality winner for a given season', function(done) {
    winston.debug('Executing "Miss congeniality for season one?"')
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
    winston.debug('Executing "error"')
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
    winston.debug('Executing "When is the next episode?"')
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
})
