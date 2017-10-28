var request = require('request')

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
  get_season_from_queen: get_season_from_queen
}
