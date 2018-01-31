<div align="center">
  <img src="https://github.com/calum/alexa-drag-race-skill/raw/master/docs/assets/logo.png" alt="Drag Race Facts" />
</div>

<h1 align="center">
Drag Race Facts
</h1>

<div align="center">
  <a href="https://travis-ci.org/calum/alexa-drag-race-skill">
    <img src="https://travis-ci.org/calum/alexa-drag-race-skill.svg?branch=master" alt="Build Status" />
  </a>
  <a href="https://david-dm.org/calum/alexa-drag-race-skill.svg">
    <img src="https://david-dm.org/calum/alexa-drag-race-skill.svg" alt="dependencies" />
  </a>
  <a href="https://codeclimate.com/github/calum/alexa-drag-race-skill/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/409ed3abb15f08c7983e/maintainability" alt="Maintainability" />
  </a>
  <a href="https://codeclimate.com/github/calum/alexa-drag-race-skill/test_coverage">
    <img src="https://api.codeclimate.com/v1/badges/409ed3abb15f08c7983e/test_coverage" alt="Code Coverage" />
  </a>
</div>

<div align="center">Alexa, shantay you stay! 👠</div>

<br />

Drag Race Facts can answer questions about any of the queens and seasons from RuPaul's Drag Race.

This Alexa skill is open source and so if you have a question that isn't currently supported, you can put an issue on our GitHub page or even add the functionality yourself!

The GitHub page is found at https://github.com/calum/alexa-drag-race-skill.

This skill is built using the [No Key No Shade drag race API](https://drag-race-api.readme.io/docs).

1. What season was Katya in?
2. Who were the top three in all stars two?
3. When is the next episode of Drag Race?


## Structure
The configuration for translating the users questions into `intents` is defined in `config/intents.json` along with other configuration files for Alexa. These files in the `config` directory are merged together into `build/models.json` when running `npm run build`.

`main.js` is the entry point for the application and users questions are passed to the handles in `src/handlers.js`.

The api requests are all defined in `src/drag_race/` directory. For API calls to [The TVDB](https://api.thetvdb.com/swagger#!/Authentication/post_login), you must set the environment variable `TVDB_API_KEY`. You can register an API key [here](https://thetvdb.com/?tab=apiregister).

The `resources/` directory will hold some useful files for other parts of the application. For instance, the list of available drag queen names is taken from a file in `resources/` and used to generate the [intent slots](https://developer.amazon.com/docs/custom-skills/custom-interaction-model-reference.htm) for Alexa.

The `build/` directory will hold files which must be manually uploaded onto the Alexa application page on amazon's website.

## Questions that Alexa can answer
* What season was `{queen}` in?
* Play a random quote!
* Who won season `{number}`?
* What challenges did `{queen}` win?
* Who were the top three in season `{number}`?
* Who was Miss Congeniality in season `{number}`?
* When is the next episode of Drag Race?

## Continuous Deployment
Any commits to the master branch with a `git` tag, will trigger `travis` to deploy a new version to AWS Lambda. Pull requests will be automatically tested by travis but won't be deployed.

## Testing and linting
`ESLint` is the chosen linter and `mocha` the chosen testing framework. `Istanbul` is used to generate the code coverage reports.
`npm test` will run the linter and then the tests together.
`npm run lint` will run just the linter - for when you want to quickly check a file for typos.

See the testing [README]('test/README.md') file in `test/` for a more detailed explanation on the testing.

## Monitoring
The GitHub extension, [Rollbar](https://rollbar.com/calumforster/alexa-drag-race-skill) is used to monitor any errors or logs from the alexa skill. The monitoring dashboard can be found [here](https://rollbar.com/calumforster/alexa-drag-race-skill/items/).

When an error is logged, a issue is raised automatically by Rollbar.

## Contribute
Check out the [issues](https://github.com/calum/alexa-drag-race-skill/issues) page to see what needs to be done. Pull requests are welcome.

_A Fan Made Drag Race Skill for Alexa_
