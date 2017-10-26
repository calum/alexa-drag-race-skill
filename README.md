[![Build Status](https://travis-ci.org/calum/alexa-drag-race-skill.svg?branch=master)](https://travis-ci.org/calum/alexa-drag-race-skill)
_work in progress_
# Drag Race Skill for Alexa

Answers questions on Drag Race using the [Drag Race API](https://drag-race-api.readme.io/docs).

## Structure
The configuration for translating the users questions into `intents` is defined in `config/models.json`.

`main.js` is the entry point for the application and users questions are passed to the handles in `src/handlers.js`.

The api requests are all defined in `src/drag_race/` directory.

## Continuous Deployment
Any commits to the master branch will trigger `travis` to deploy a new version to AWS Lambda. Pull requests will be automatically tested by travis but won't be deployed.

## TODO
* come up with a list of questions to answer
* add api requests to `src/drag_race/`
* build custom [Intent Slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.html) for drag queen names. The current slots are really bad.
