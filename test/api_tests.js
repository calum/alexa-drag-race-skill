var api = require('../src/drag_race/api')
var tvdb = require('../src/drag_race/tvdb_api')

var logger = require('../src/logger')

describe('No Key No Shade API Tests', function() {
  this.timeout('5000')

  it('should fix any slight typos in a queen\'s name', function(done) {
    api.get_exact_queen_name('katya', (err, exact_name) => {
      if (exact_name == "Katya Zamolodchikova") {
        return done()
      }
      return done(err || new Error("Failed to find the correct name: "+exact_name))
    })
  })

  it('should get a queen\'s id from their name', function(done) {
    api._get_queen_id("Trixie Mattel", function(err, id) {
      if (id == 89) {
        return done()
      }
      return done(err || new Error('got the wrong id for a queen: '+id))
    })
  })

  it('should get all seasons for a given queen', function(done) {
    api.get_season_from_queen('Trixie Mattel', function(err, seasons) {
      if (seasons.indexOf("7") > -1 && seasons.indexOf("A3") > -1) {
        return done()
      } else {
        return done(new Error('Failed to get a queen\'s seasons'))
      }
    })
  })

  it('should return the correct season winner', function(done) {
    api.get_season_winner('6', function(err, queen) {
      if (queen == "Bianca Del Rio") {
        return done()
      }
      done(err || new Error('Returned the wrong queen: '+queen))
    })
  })

  it('should return the correct season winner for all stars', function(done) {
    api.get_season_winner('A1', function(err, queen, season_number) {
      if (queen == "Chad Michaels" && season_number == 'A1') {
        return done()
      }
      done(err || new Error('Returned the wrong queen: '+queen))
    })
  })

  it('should get all the challenges that a queen has won', function(done) {
    api.get_challenge_wins('Raven', function(err, challenges_won) {
      if (challenges_won.total_main == 2) {
        return done()
      }
      done(err || new Error('Wrong number of won challenges: ' + JSON.stringify(challenges_won)))
    })
  })

  it('should get the top three from a season', function(done) {
    api.get_season_top_three('3', function(err, top_three, season_number) {
      if (top_three.indexOf('Raja') > -1 &&
          top_three.indexOf('Alexis Mateo') > -1 &&
          top_three.indexOf('Manila Luzon') > -1 &&
          season_number == '3'
          ) {
        return done()
      }
      done(err || new Error('Wrong top three ' + JSON.stringify(top_three)))
    })
  })

  it('should return the winner of congeniality for a given season', function(done) {
    api.miss_congeniality_season('A2', (err, winner) => {
      if (winner == "Katya Zamolodchikova") {
        return done()
      }
      done(err || new Error('returned the wrong winner: '+winner))
    })
  })
})
