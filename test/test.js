var api = require('../src/drag_race/api')

describe('API tests', function() {
  it('should fix any slight typos in a queen\'s name', function(done) {
    api.get_exact_queen_name('katya', (err, exact_name) => {
      if (exact_name == "Katya Zamolodchikova") {
        return done()
      }
      return done(err || new Error("Failed to find the correct name: "+exact_name))
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
})
