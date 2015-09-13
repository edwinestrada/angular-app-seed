(function() {
  'use strict';

  var del = require('del');
  var gulp = require('gulp');
  var config = require('./config.js');
  gulp.task('ci', function ( done ) {
    return runTests( true, done );
  });

  gulp.task('clean', function(){
    return del(['build']);
  });

  function runTests( singleRun, done ) {
    var karma = require('karma').server;

    karma
      .start(
        {
          configFile: __dirname + '/karma.conf.js',
          exclude: [],
          singleRun: singleRun
        },
        karmaCompleted
      );

    function karmaCompleted ( karmaResult ) {
      //karmaResult will be 1 if error
      return karmaResult === 1 ?
      done('Tests failed') :
      done();
    }
  }



}());
