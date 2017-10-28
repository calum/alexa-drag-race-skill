var api = require('../src/drag_race/api')

describe('API tests', function() {
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
