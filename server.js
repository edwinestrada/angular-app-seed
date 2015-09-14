(function() {
  'use strict';

  var express = require('express');
  var logger = require('morgan');
  var app = express();
  var PORT = process.env.PORT ? process.env.PORT : 1738;

  app
    .use( logger('dev') )
    .use( '/', express.static('build') )
    .use( '/bower_components', express.static('bower_components') )
    .listen( PORT );

  console.log( 'Express server running on port %s', PORT );

}());
