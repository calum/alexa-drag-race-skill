var fs = require('fs')
var path = require('path')

var winston = require('winston')
winston.level = process.env.LOG_LEVEL || 'info'

var intents = require('../config/intents.json')
var types = require('../config/types.json')
var prompts = require('../config/prompts.json')
var dialog = require('../config/dialog.json')

var models = {
  intents: intents,
  types: types,
  prompts: prompts,
  dialog: dialog
}

fs.writeFile(path.join(__dirname, '../build/models.json'), JSON.stringify(models, null, 2), 'utf8', function(err) {
  if (err) {
    return winston.error(err)
  }

  winston.log('built build/models.json!')
})
