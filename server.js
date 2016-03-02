(function () {
  'use strict';

  var express = require('express');
  var chalk = require('chalk');
  var logger = require('morgan');

  var app = express();
  var PORT = process.env.PORT || 8080;

  app
    .use(logger('dev'))
    .use('/', express.static(__dirname + '/build'))
    .listen(PORT);

  console.log(chalk.cyan('Express server setup on http://localhost:%d'), PORT);

}());
