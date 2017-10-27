var fs = require('fs')

var intents = require('./config/intents.json')
var types = require('./config/types.json')
var prompts = require('./config/prompts.json')
var dialog = require('./config/dialog.json')

var models = {
	intents: intents,
	types: types,
	prompts: prompts,
	dialog: dialog
}

fs.writeFile('build/models.json', JSON.stringify(models), 'utf8', function(err) {
	if (err) {
		return console.error(err)
	}
	
	console.log('built models.json!')
})

