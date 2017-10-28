[![Build Status](https://travis-ci.org/calum/alexa-drag-race-skill.svg?branch=master)](https://travis-ci.org/calum/alexa-drag-race-skill)
_work in progress_
# Drag Race Skill for Alexa

Answers questions on Drag Race using the [Drag Race API](https://drag-race-api.readme.io/docs).

## Structure
The configuration for translating the users questions into `intents` is defined in `config/intents.json` along with other configuration files for Alexa. These files in the `config` directory are merged together into `build/models.json` when running `npm run build`.

`main.js` is the entry point for the application and users questions are passed to the handles in `src/handlers.js`.

The api requests are all defined in `src/drag_race/` directory.

The `resources/` directory will hold some useful files for other parts of the application. For instance, the list of available drag queen names is taken from a file in `resources/` and used to generate the [intent slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.htm) for Alexa.

The `build/` directory will hold files which must be manually uploaded onto the Alexa application page on amazon's website. 

## Continuous Deployment
Any commits to the master branch will trigger `travis` to deploy a new version to AWS Lambda. Pull requests will be automatically tested by travis but won't be deployed.

## Questions to be developed
* What season is `{queen}` in?
* Who eliminated `{queen}` in a lipsync battle?
* What challenges did `{queen}` win?
* Who won season `{number}`?
_TODO: Add more questions_



## TODO
* come up with a list of questions to answer
* add api requests to `src/drag_race/`
* build custom [Intent Slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html) for drag queen names. 
