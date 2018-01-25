var tvdb = require('../src/drag_race/tvdb_api')
var assert = require('assert')

var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'info'

describe('The TVDB API Tests', function() {
  var api_token

  it('should get a valid API token', function(done) {
    tvdb.getToken(function (err, api_token) {
      if (err) {
        winston.error(err)
        return done(err)
      }
      winston.debug('API token: '+api_token)
      return done()
    })
  })

  it('should get the next episode', function(done) {
    tvdb.getNextEpisode("2018-01-25", function(err, next_episode) {
      if (err) {
        winston.error(err)
        return done(err)
      }
      winston.log(next_episode)
      if (next_episode.firstAired == "2018-01-25", "Returned incorrect episode: "
        +JSON.stringify(next_episode)
      ) {
        return done()
      }
    })
  })
})
