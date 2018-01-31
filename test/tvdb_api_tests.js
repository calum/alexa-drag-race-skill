var tvdb = require('../src/drag_race/tvdb_api')
var assert = require('assert')

var logger = require('../src/logger')

tvdb.setKey(process.env.TVDB_API_KEY)

describe('The TVDB API Tests', function() {
  this.timeout('3000')
  
  var api_token

  it('should fail when there is no TVDB api key', function(done) {
    tvdb.setKey(undefined)
    tvdb._getToken(function(err, token) {
      // set the key back for the other tests
      tvdb.setKey(process.env.TVDB_API_KEY)

      if (err) {
        logger.error(err)
        return done()
      }
      return done(new Error('Expected an error to be returned.'))
    })
  })

  it('should return an error if no token is provided', function(done) {
    tvdb._allEpisodes('id', function(err) {
      if (err.message == 'You must provide a TVDB api token') {
        return done()
      }
      return done(new Error('Expected an error but did not get one.'))
    })
  })

  it('should find the closest date out of an array of aired dates', function() {
    var date = '2018-01-30'
    var unaired = [
      {
        firstAired: '2018-03-13'
      },
      {
        firstAired: '2019-01-01'
      },
      {
        firstAired: '2018-02-10'
      }
    ]

    var closest = tvdb._findClosestEpisode(date, unaired)
    assert.equal(closest.firstAired, '2018-02-10')
  })

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
