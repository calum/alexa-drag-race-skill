# Testing

## `lambda-local`
The [lambda-local](https://www.npmjs.com/package/lambda-local) NPM module is used to simulate the Lambda function on the amazon web server.

Each intent programmed into the `src/handlers.js` must have at least one test in `test/lambda_tests.js`. They all follow a pattern:

 1. Create your request in `test/test_data/test_intents.js` from the template.
 2. Add your test into `test/lambda_tests.js` using the same structure as follows:
  ```js
  it('should launch with RuPaul quote', function(done) {
    winston.debug('Executing "Start drag race facts."')
    lambda.execute({
      event: intents.launch,
      lambdaFunc: drag_race_facts,
      callback: function (err, data) {
        if (err) {
          return done(err)
        }
        if (data.response.outputSpeech.ssml.includes("She Already Had Had Hersesszzz")) {
          return done()
        }
        return done(new Error('Response was incorrect: '+JSON.stringify(data.response)))
      }
    })
  })
  ```
  Where `intents.launch` will be your intent.

  ## API Tests
  Any new API functionality is tested in the `test/api_tests.js` file.
