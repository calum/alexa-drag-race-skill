var sounds = require('../src/sounds')
var audio_urls = require('../resources/audio_urls.json')

describe('Sounds testing', function() {
  it('should return a random drag race quote', function(done) {
    var mp3_url = sounds.get_random_quote()

    if (mp3_url.endsWith('.mp3')) {
      return done()
    }

    return done('url returned was not for an mp3 file')
  })
})
