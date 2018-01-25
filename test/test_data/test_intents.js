var template = require('./template')

/**
* These tests work by cloning the template with a JSON parse
* and JSON stringify. Then, add the specific intent to that template.
**/

var launch = JSON.parse(JSON.stringify(template))
launch.request = {
  "type": "LaunchRequest",
  "requestId": "EdwRequestId.4a8e7f3b-2890-4ca6-b68f-cd5439a07e54",
  "locale": "en-GB",
  "timestamp": "2018-01-25T17:45:42Z"
}

var help = JSON.parse(JSON.stringify(template))
help.request.intent = {
  "name": "AMAZON.HelpIntent",
  "slots": {}
}

var stop = JSON.parse(JSON.stringify(template))
stop.request.intent = {
  "name": "AMAZON.StopIntent",
  "slots": {}
}

var season_from_queen = JSON.parse(JSON.stringify(template))
season_from_queen.request.intent = {
  "name": "getseasonfromqueen",
  "slots": {
    "queen": {
      "name": "queen",
      "value": "is Katya"
    }
  }
}

getwinnerfromseason = JSON.parse(JSON.stringify(template))
getwinnerfromseason.request.intent = {
  "name": "getwinnerfromseason",
  "slots": {
    "season_number": {
      "name": "season_number",
      "value": "5"
    }
  }
}

getchallengesfromqueen = JSON.parse(JSON.stringify(template))
getchallengesfromqueen.request.intent = {
  "name": "getchallengesfromqueen",
  "slots": {
    "queen": {
      "name": "queen",
      "value": "willam have"
    }
  }
}

gettopthreefromseason = JSON.parse(JSON.stringify(template))
gettopthreefromseason.request.intent = {
  "name": "gettopthreefromseason",
  "slots": {
    "season_number": {
      "name": "season_number",
      "value": "4"
    }
  }
}

getcongenialityfromseason = JSON.parse(JSON.stringify(template))
getcongenialityfromseason.request.intent = {
  "name": "getcongenialityfromseason",
  "slots": {
    "season_number": {
      "name": "season_number",
      "value": "1"
    }
  }
}

error = JSON.parse(JSON.stringify(template))
error.request.intent = {
  "name": "a",
  "slots": {
    "season_number": {
      "name": "season_number",
      "value": "1"
    }
  }
}


module.exports = {
  launch: launch,
  season_from_queen: season_from_queen,
  help: help,
  stop: stop,
  getwinnerfromseason: getwinnerfromseason,
  getchallengesfromqueen: getchallengesfromqueen,
  gettopthreefromseason: gettopthreefromseason,
  getcongenialityfromseason: getcongenialityfromseason,
  error: error
}
