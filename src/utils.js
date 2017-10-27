var csv = require('csv')
var fs = require('fs')
var path = require('path')

/**
* Converts the CSV file `resources/drag_queens.csv` into a
* json object
**/
function jsonify_drag_queens(callback) {
  var drag_queens = []

  fs.readFile(path.join(__dirname, '../resources/drag_queens.csv'), 'utf-8', (err, data) => {
    if (err) {
      return callback(err)
    }

    csv.parse(data, function(err, data){
      if (err) {
        return callback(err)
      }

      for(i=0; i<data.length-1; i++) {
        drag_queen = {}
        for(j=0; j<data[0].length; j++) {
          drag_queen[data[0][j]] = data[i+1][j]
        }

        drag_queens.push(drag_queen)
      }
      return callback(null,drag_queens)
    })
  })
}

module.exports = {
  jsonify_drag_queens: jsonify_drag_queens
}
