var request = require('request')

if (!process.env.TVDB_API_KEY) {
  winston.error("You must set the environment varaible TVDB_API_KEY to hold your API key for the TVDB. See README for more info.")
}

var api_key = process.env.TVDB_API_KEY

function getToken() {

}

function getNextEpisode() {

}

module.exports = {
  getToken: getToken,
  getNextEpisode: getNextEpisode
}
