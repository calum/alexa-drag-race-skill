var fs = require('fs')
var path = require('path')

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
		return console.error(err)
	}

	console.log('built build/models.json!')
})
