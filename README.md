# Angular 1.x Application Seed
[![Build Status](https://travis-ci.org/sirhodes/angular-app-seed.svg)](https://travis-ci.org/sirhodes/angular-app-seed)

Angular application with batteries included :battery:. Package contents:
+ [Webpack](http://webpack.github.io/) as a bundler/general magic worker.
+ [Babel](http://babeljs.io/) for future-proof JavaScript :fire:.
+ [Foundation for Sites](https://github.com/zurb/foundation-sites) for front-end :sparkles:.
+ [NPM scripts](https://docs.npmjs.com/misc/scripts) for task management.
+ [Browsersync](http://www.browsersync.io/) for less refreshes.
+ [Sass](http://sass-lang.com/) compilation.
+ [Karma](https://github.com/karma-runner/karma) as a unit test runner.
+ [Protractor](http://angular.github.io/protractor/#/) for end to end tests.
+ A Procfile so deploying to [Heroku](https://www.heroku.com/) is super easy :sunglasses:

## FAQs
+ **How do I start/run the app**? Run `npm start`.
+ **How do I run unit tests?** Run `npm test`.
+ **How do I run end to end tests** Start the app using `npm start` in one terminal. In another (make sure you have protractor installed globally using `npm install -g protractor`), run `webdriver-manager update && webdriver-manager start`. In your third terminal, run `npm run test:e2e`.


Originally created by [Pixbit](http://thinkpixbit.com) with :fire:.