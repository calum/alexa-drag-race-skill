var request = require('request')
var fuzzy = require('fuzzy')

var url = 'http://www.nokeynoshade.party/api/'

/**
* Make a GET request to the API
**/
function get(endpoint, callback) {
  request.get(url+endpoint, (err, res, body) => {
    if (err) {
      return callback(err)
    }
    return callback(null, JSON.parse(body))
  })
}

/**
* works out the closest match from a user's spoken queen
* name and the actual list of queens
**/
function get_exact_queen_name(queen_input, callback) {
  // get a list of all queen names
  get('/queens/all', function(err, queens) {
    if (err) {
      return callback(err)
    }
    var queen_names = []

    queens.forEach((queen) => {
      queen_names.push(queen.name)
    })
    // use fuzzy matching to find the nearest match
    var exact_queen_name = fuzzy.filter(queen_input, queen_names)

    // return the original string for the first match
    return callback(null, exact_queen_name[0].original)
  })
}

/**
* Returns the season which a queen competed in. Since some
* have appeared in multiple seasons, an array is returned.
**/
function get_season_from_queen(queen, callback) {
  get('queens?name='+queen, (err, queen) => {
    if (err) {
      return callback(err)
    }
    var seasons = []
    queen[0].seasons.forEach((season) => {
      seasons.push(season.seasonNumber)
    })

    return callback(null, seasons)
  })

}

/**
* Functions to be exported
**/
module.exports = {
  get_exact_queen_name: get_exact_queen_name,
  get_season_from_queen: get_season_from_queen
}
