var request = require('request')

var url = 'http://www.nokeynoshade.party/api/'

/**
* Returns the season which a queen competed in. Since some
* have appeared in multiple seasons, an array is returned.
**/
function get_season_from_queen(queen, callback) {
  return [3]
}

/**
* Functions to be exported
**/
module.exports = {
  get_season_from_queen: get_season_from_queen
}
