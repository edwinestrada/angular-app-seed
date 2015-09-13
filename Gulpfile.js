(function() {
  'use strict';

  var del = require('del');
  var gulp = require('gulp');
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  var runSequence = require('run-sequence');
  var sass = require('gulp-sass');
  var stylish = require('gulp-jscs-stylish');

  var config = require('./config.js');

  gulp.task('ci', function ( done ) {
    return runTests( true, done );
  });

  gulp.task('clean', function(){
    return del(['build']);
  });

  gulp.task('default', function ( done ) {
    runSequence(
      'clean',
      'vet',
      'sass',
      done
    );
  });

  gulp.task('sass', function(){
    return gulp
    .src( config.mainSass )
    .pipe( sass() )
    .pipe( gulp.dest( config.buildFolder ) );
  });

  gulp.task('tdd', function ( done ) {
    return runTests( false, done );
  });

  gulp.task('vet', function(){
    return gulp
      .src( config.allJS )
      .pipe( jshint() )
      .pipe( jscs() )
      .on( 'error', function(){} )
      .pipe( stylish.combineWithHintResults() )
      .pipe( jshint.reporter('jshint-stylish') );
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
