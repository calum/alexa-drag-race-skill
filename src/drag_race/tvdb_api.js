var request = require('request')
var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'info'

if (!process.env.TVDB_API_KEY) {
  winston.error('You must set the environment varaible TVDB_API_KEY to hold your API key for the TVDB. See README for more info.')
}

var api_key = process.env.TVDB_API_KEY

var api_url = 'https://api.thetvdb.com/'

var series = [
  85002, // RuPauls Drag Race
  263380 // RuPaul's All Stars Drag Race
]

/**
* Gets an API token
**/
function getToken(callback) {
  request.post(api_url+'login', {json: {'apikey':api_key}}, function(err, response) {
    if (err) {
      winston.error(err)
      return callback(err)
    }
    winston.debug('TVDB api token: '+response.body.token)
    return callback(null, response.body.token)
  })
}

/**
* Returns all episodes given a series id
**/
function allEpisodes(id, token, callback) {
  if (!callback || !token) {
    return winston.error('You must provide a TVDB api token')
  }

  var options = {
    uri: api_url+'series/'+id+'/episodes?page=1',
    method: 'GET',
    headers: {
      Authorization: ' Bearer '+token
    }
  }

  winston.debug('Making get request for all episodes for '+id)
  request.get(options, function(err, response) {
    if (err) {
      winston.error(err)
      return callback(err)
    }
    var data = JSON.parse(response.body).data
    winston.debug('Number of episodes returned: '+data.length)

    return callback(null, data)
  })
}

/**
* Searches over Drag Race & Drag Race All Stars
* to find the next air date available
**/
function getNextEpisode(today, callback) {
  getToken(function(err, token) {
    // get the date in the format YYYY-MM-DD
    var date
    if (!callback) {
      callback = today
      date = new Date(Date.now()).toISOString().split('T')[0]
    } else {
      date = today
    }

    var air_dates = []

    var promises = []
    for(var i=0; i<series.length; i++) {
      var id = series[i]
      promises.push(new Promise(function(resolve, reject) {
        allEpisodes(id, token, function(err, episodes) {
          if (err) {
            winston.error(err)
            return reject(err)
          }
          episodes.forEach(episode => {
            // exclude all episodes with a firstAired before today
            winston.debug('Episode '+episode.airedEpisodeNumber+' from season '
            +episode.airedSeason + ' has aired dated: '+episode.firstAired)
            if (episode.firstAired >= date) {
              air_dates.push(episode)
            }
          })
          return resolve()
        })
      }))
    }

    Promise.all(promises).then(function() {
      // loop over air_dates to find the nearest to today
      if (air_dates.length == 0) {
        return callback()
      }
      var closest_episode = air_dates[0]
      winston.debug('First episode: '+JSON.stringify(closest_episode, null, 2))
      var now = new Date(date)
      var days = (new Date(closest_episode.firstAired)) - now
      air_dates.forEach(episode => {
        var date_to_air = new Date(episode.firstAired)
        if (date_to_air - now > days) {
          days = date_to_air - now
          closest_episode = episode
        }
      })
      return callback(null, closest_episode)
    }, function(err) {
      return callback(err)
    })
  })
}

module.exports = {
  getToken: getToken,
  getNextEpisode: getNextEpisode
}
