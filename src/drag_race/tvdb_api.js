var request = require('request')
var winston = require('winston')

if (!process.env.TVDB_API_KEY) {
  winston.error("You must set the environment varaible TVDB_API_KEY to hold your API key for the TVDB. See README for more info.")
}

var api_key = process.env.TVDB_API_KEY

var api_url = 'https://api.thetvdb.com/'

function getToken(callback) {
  request.post(api_url+'login', {"apikey":api_key}, function(err, res) {
    if(err) {
      winston.error(err)
      return callback(err)
    }
    var body = JSON.stringify(res).body
    return callback(null, body.token)
  })
}

function getNextEpisode() {

}

module.exports = {
  getToken: getToken,
  getNextEpisode: getNextEpisode
}
