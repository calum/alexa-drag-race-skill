var audio = require('../resources/audio_urls.json')

function get_random_quote() {
  var num_urls = audio.urls.length
  var base_url = audio.base
  var sound_url = audio.urls[Math.floor(Math.random()*num_urls)]

  return base_url + sound_url
}

module.exports = {
  get_random_quote: get_random_quote
}
