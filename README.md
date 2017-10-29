[![Build Status](https://travis-ci.org/calum/alexa-drag-race-skill.svg?branch=master)](https://travis-ci.org/calum/alexa-drag-race-skill) ![dependencies](https://david-dm.org/calum/alexa-drag-race-skill.svg)

# Drag Race Skill for Alexa

No one knows more about drag race. For those moments when you forget who won Miss Congeniality in season 3.

With the smartest drag race fan by your side, you will never be far from answers to those burning drag questions.

Built using the [No Key No Shade drag race API](https://drag-race-api.readme.io/docs).

1. What season was Katya in?
2. What challenges did Alaska win?
3. Who was Miss Congeniality in season four?


## Structure
The configuration for translating the users questions into `intents` is defined in `config/intents.json` along with other configuration files for Alexa. These files in the `config` directory are merged together into `build/models.json` when running `npm run build`.

`main.js` is the entry point for the application and users questions are passed to the handles in `src/handlers.js`.

The api requests are all defined in `src/drag_race/` directory.

The `resources/` directory will hold some useful files for other parts of the application. For instance, the list of available drag queen names is taken from a file in `resources/` and used to generate the [intent slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.htm) for Alexa.

The `build/` directory will hold files which must be manually uploaded onto the Alexa application page on amazon's website.

## Questions that Alexa can answer
* What season was `{queen}` in?
* Who won season `{number}`?
* What challenges did `{queen}` win?
* Who were the top three in season `{number}`?
* Who was Miss Congeniality in season `{number}`?
* Who did `{name}` for snatch game? [_TODO_]
* Who won the `{challenge_name}` challenge? [_TODO_]

## Continuous Deployment
Any commits to the master branch will trigger `travis` to deploy a new version to AWS Lambda. Pull requests will be automatically tested by travis but won't be deployed.

## Testing and linting
`JSHint` is the chosen linter and `mocha` the chosen testing framework.
`npm test` will run the linter and then the tests together.
`npm run lint` will run just the linter - for when you want to quickly check a file for typos.

## Contribute
Check out the [issues](https://github.com/calum/alexa-drag-race-skill/issues) page to see what needs to be done. Pull requests are welcome.
