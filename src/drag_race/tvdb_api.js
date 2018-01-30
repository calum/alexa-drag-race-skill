var request = require('request')
var logger = require('../logger')

var api_key

var api_url = 'https://api.thetvdb.com/'

var series = [
  85002, // RuPauls Drag Race
  263380 // RuPaul's All Stars Drag Race
]

/**
* Set the TVDB API key
**/
function setKey(key) {
  api_key = key
}

/**
* Gets an API token
**/
function getToken(callback) {
  logger.debug('Using TVDB API KEY: '+api_key)
  request.post(api_url+'login', {json: {'apikey':api_key}}, function(err, response) {
    if (err) {
      logger.error(err)
      return callback(err)
    }
    if (response.body.Error) {
      var request_err = new Error(response.body.Error)
      logger.error(request_err)
      return callback(request_err)
    }
    logger.debug('TVDB api token: '+response.body.token)
    return callback(null, response.body.token)
  })
}

/**
* Returns all episodes given a series id
**/
function allEpisodes(id, token, callback) {
  if (!callback || !token) {
    return logger.error('You must provide a TVDB api token')
  }

  var options = {
    uri: api_url+'series/'+id+'/episodes?page=1',
    method: 'GET',
    headers: {
      Authorization: ' Bearer '+token
    }
  }

  logger.debug('Making get request for all episodes for '+id)
  request.get(options, function(err, response) {
    if (err) {
      logger.error(err)
      return callback(err)
    }
    var data = JSON.parse(response.body).data
    logger.debug('Number of episodes returned: '+data.length)

    return callback(null, data)
  })
}

/**
* Returns a promise which fullfils with an array of
* unaired episodes.
**/
function findUnairedEpisodes(date, id, token) {
  var unaired = []

  return new Promise(function(resolve, reject) {
    allEpisodes(id, token, function(err, episodes) {
      if (err) {
        logger.error(err)
        return reject(err)
      }
      episodes.forEach(episode => {
        // exclude all episodes with a firstAired before today
        logger.debug('Episode '+episode.airedEpisodeNumber+' from season '
        +episode.airedSeason + ' has aired dated: '+episode.firstAired)
        if (episode.firstAired >= date) {
          unaired.push(episode)
        }
      })
      return resolve(unaired)
    })
  })
}

/**
* function to loop over an array of episodes
* and returns the episode with an air date
* closest to today's date
**/
function findClosestEpisode(date, unaired) {
  var closest_episode = unaired[0]
  logger.debug('First episode: '+JSON.stringify(closest_episode, null, 2))
  var now = new Date(date)
  var days = (new Date(closest_episode.firstAired)) - now
  unaired.forEach(episode => {
    var date_to_air = new Date(episode.firstAired)
    if (date_to_air - now < days) {
      days = date_to_air - now
      closest_episode = episode
    }
  })

  return closest_episode
}

/**
* Searches over Drag Race & Drag Race All Stars
* to find the next air date available
**/
function getNextEpisode(today, callback) {
  getToken(function(err, token) {
    // get the date in the format YYYY-MM-DD
    var date = today
    if (!callback) {
      callback = today
      date = new Date(Date.now()).toISOString().split('T')[0]
    }

    // find all the unaired episodes from all stars and standard drag race
    var promises = [
      findUnairedEpisodes(date, series[0], token),
      findUnairedEpisodes(date, series[1], token)
    ]

    Promise.all(promises).then(function(unaired_arrays) {
      // merge the two arrays of episodes
      var unaired = unaired_arrays[0].concat(unaired_arrays[1])

      // loop over air_dates to find the nearest to today
      if (unaired.length == 0) {
        return callback()
      }

      return callback(null, findClosestEpisode(date, unaired))
    }, function(err) {
      return callback(err)
    })
  })
}

module.exports = {
  getToken: getToken,
  getNextEpisode: getNextEpisode,
  setKey: setKey,

  /**
  * Exported for testing
  **/
  _getToken: getToken
}
