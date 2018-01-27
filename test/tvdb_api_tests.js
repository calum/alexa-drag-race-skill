var tvdb = require('../src/drag_race/tvdb_api')
var assert = require('assert')

var logger = require('../src/logger')

describe('The TVDB API Tests', function() {
  var api_token

  it('should get a valid API token', function(done) {
    tvdb.getToken(function (err, api_token) {
      if (err) {
        logger.error(err)
        return done(err)
      }
      logger.debug('API token: '+api_token)
      return done()
    })
  })

  it('should get the next episode', function(done) {
    tvdb.getNextEpisode("2018-01-27", function(err, next_episode) {
      if (err) {
        logger.error(err)
        return done(err)
      }
      logger.debug("Episode returned is: " + JSON.stringify(next_episode))
      if (next_episode.firstAired != "2018-02-01") {
        return done(new Error("Returned incorrect episode: "+JSON.stringify(next_episode)))
        return done
      } else {
        return done()
      }
    })
  })
})
