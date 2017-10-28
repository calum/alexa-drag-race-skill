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
* Get a queen's id
**/
function get_queen_id(queen, callback) {
  get('queens?name='+queen, (err, queen) => {
    if (err) {
      return callback(err)
    }
    return callback(null, queen[0].id)
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
* Returns the winner for a season
**/
function get_season_winner(season_number, callback) {
  get('seasons', function(err, seasons) {
    if (err) {
      return callback(err)
    }

    // run fuzzy match to find the closest season match
    var season_numbers = []
    seasons.forEach((season) => {
      season_numbers.push(season.seasonNumber)
    })
    var season_picked = fuzzy.filter(season_number, season_numbers)
    try {
      season_picked = season_picked[0].original
    } catch (e) {
      console.error(e)
      return callback(e)
    }

    // find the season the user is asking about
    var chosen_season = seasons.find(
        (season) => season_picked == season.seasonNumber
    )

    // find the winner of that season
    var winner = chosen_season.winnerId

    // retreive this queen
    var queen = chosen_season.queens.find((queen) => queen.id == winner)

    // return this queen
    return callback(null, queen.name)
  })
}

/**
* returns an array of challenge names that a queen
* has won
**/
function get_challenge_wins(queen, callback) {
  // get the queen's id
  get_queen_id(queen, (err, id) => {
    if (err) {
      return callback(err)
    }
    // get the queen's challenges
    get('queens/'+id+'/challenges', (err, challenges) => {
      if (err) {
        return callback(err)
      }
      // build an object of all challenges which have been won
      var challenges_won = {
        total_mini: 0,
        total_main: 0,
        names: []
      }
      challenges.forEach((challenge) => {
        if (challenge.won) {
          switch(challenge.type) {
            case 'mini':
              challenges_won.total_mini += 1
              break
            case 'main':
              challenges_won.total_main += 1
              break
          }
          challenges_won.names.push(challenge.description)
        }
      })

      // return the challenges won object
      return callback(null, challenges_won)
    })
  })
}

/**
* returns the top three queens in a certain season
**/
function get_season_top_three(season_number, callback) {
  get('seasons', function(err, seasons) {
    if (err) {
      return callback(err)
    }

    // run fuzzy match to find the closest season match
    var season_numbers = []
    seasons.forEach((season) => {
      season_numbers.push(season.seasonNumber)
    })
    var season_picked = fuzzy.filter(season_number, season_numbers)
    try {
      season_picked = season_picked[0].original
    } catch (e) {
      console.error(e)
      return callback(e)
    }

    // find the season the user is asking about
    var chosen_season = seasons.find(
        (season) => season_picked == season.seasonNumber
    )

    // find the top three queens
    var top_three = chosen_season.queens.filter(queen => queen.place <= 3)

    // put them into an array
    var top_three_array = [
      top_three[0].name,
      top_three[1].name,
      top_three[2].name
    ]

    // return this queen
    return callback(null, top_three_array)
  })
}

/**
* checks who won miss congeniality for a given season
**/
function miss_congeniality_season(season_number, callback) {
  get('queens/congeniality', (err, winners) => {
    if (err) {
      return callback(err)
    }
    winners.forEach((winner) => {
      winner.seasons.forEach((season) => {
        if (season.seasonNumber == season_number) {
          return callback(null, winner.name)
        }
      })
    })
  })
}

/**
* Functions to be exported
**/
module.exports = {
  get: get,
  get_exact_queen_name: get_exact_queen_name,
  _get_queen_id: get_queen_id,
  get_season_from_queen: get_season_from_queen,
  get_season_winner: get_season_winner,
  get_challenge_wins: get_challenge_wins,
  get_season_top_three: get_season_top_three,
  miss_congeniality_season: miss_congeniality_season
}
