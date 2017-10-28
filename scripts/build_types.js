var jsonify_drag_queens = require('../src/utils').jsonify_drag_queens
var path = require('path')
var fs = require('fs')

var api = require('../src/drag_race/api')

var output_file = path.join(__dirname, '../config/types.json')

jsonify_drag_queens(function(err, drag_queens) {
  if (err) {
    return console.error(err)
  }
  var types =  [
    {
      "name": "drag_queen",
      "values": []
    },
    {
      "name": "season_number",
      "values": []
    }
  ]

  drag_queens.forEach((drag_queen) => {
    var type = {
      "id": null,
      "name": {
        "value": drag_queen["Drag Name"]
      }
    }
    if (drag_queen["Real Name"] != "") {
      type.name.synonyms = [
        drag_queen["Real Name"]
      ]
    }

    // don't add duplicates
    var duplicate = types[0].values.find(check_type => {
      return check_type.name.value == type.name.value
    })
    if (duplicate == undefined) {
      types[0].values.push(type)
    }
  })

  // add the season numbers:
  api.get('seasons', (err, seasons) => {
    if (err) {
      console.error(err)
    }
    seasons.forEach(season => {
      types[1].values.push({
        "id": null,
        "name": {
          "value": season.seasonNumber.replace('A', 'all stars ')
        }
      })
    })

    // write the file
    fs.writeFile(path.join(__dirname, '../config/types.json'), JSON.stringify(types, null, 2), 'utf8', function(err) {
      if (err) {
        return console.error(err)
      }

      console.log('built config/types.json!')
    })
  })
})
