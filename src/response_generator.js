/**
* This module contains functions to generate responses for
* the Alexa handlers to speak back to the user.
**/

function challenges_from_queen_response(queen, challenges) {
  var answer = queen + ' has won ' + challenges.total_main +
                ' main challenges and ' + challenges.total_mini +
                ' mini challenges: '

  if (challenges.names.length > 0) {
    answer += challenges.names.pop()
  }

  while(challenges.names.length > 0) {
    answer += '. ' + challenges.names.pop()
  }

  return answer
}


module.exports = {
  challenges_from_queen_response: challenges_from_queen_response
}
