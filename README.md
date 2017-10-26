_work in progress_
# Drag Race Skill for Alexa

Answers questions on Drag Race using the [Drag Race API](https://drag-race-api.readme.io/docs).

## Structure
The confifuration for translating the users questions into `intents` is defined in `config/models.json`.

`main.js` is the entry point for the application and users questions are passed to the handles in `src/handlers.js`.

The api requests are all defined in `src/drag_race/` directory.

## TODO
* come up with a list of questions to answer
* add api requests to `src/drag_race/`
* automate deployment to AWS Lambda [travis-ci Lambda Deployment](https://docs.travis-ci.com/user/deployment/lambda/)
* build custom Intent Slots for drag queen names
