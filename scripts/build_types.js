var jsonify_drag_queens = require('../src/utils').jsonify_drag_queens
var path = require('path')
var fs = require('fs')

var output_file = path.join(__dirname, '../config/types.json')

jsonify_drag_queens(function(err, drag_queens) {
  if (err) {
    return console.error(err)
  }
  var types =  {
    "name": "drag_queen",
    "values": []
  }

  drag_queens.forEach((drag_queen) => {
    var type = {
      "id": null,
      "name": {
        "value": drag_queen["Drag Name"],
        "synonyms": [
          drag_queen["Real Name"]
        ]
      }
    }

    types.values.push(type)
  })

  fs.writeFile(path.join(__dirname, '../config/types.json'), JSON.stringify(types, null, 2), 'utf8', function(err) {
  	if (err) {
  		return console.error(err)
  	}

  	console.log('built config/types.json!')
  })
})
