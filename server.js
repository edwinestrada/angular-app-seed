(function() {
  'use strict';

  var express = require('express');
  var chalk = require('chalk');
  var logger = require('morgan');

  var app = express();
  var PORT = process.env.PORT || 3001;

  app
    .use(logger((PORT === 3001 ? 'dev' : 'short')))
    .use('/', express.static(`${__dirname}/src`))
    .listen(PORT, () => {
      console.log(chalk.cyan('Express server setup on http://localhost:%d'), PORT);
    });

})();