(function() {
  'use strict';

  var concat = require('gulp-concat');
  var del = require('del');
  var gulp = require('gulp');
  var inject = require('gulp-inject');
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  var runSequence = require('run-sequence');
  var sass = require('gulp-sass');
  var stylish = require('gulp-jscs-stylish');
  var wiredep = require('wiredep').stream;

  var config = require('./config.js');

  gulp.task('ci', function ( done ) {
    return runTests( true, done );
  });

  gulp.task('clean', function(){
    return del([ config.client ]);
  });

  gulp.task('default', function ( done ) {
    runSequence(
      'clean',
      'vet',
      'sass',
      done
    );
  });

  gulp.task('build', function(){
    return gulp
      .src( config.buildComponents )
      .pipe( gulp.dest( config.client ) );
  });

  gulp.task('inject', function(){
    return gulp
      .src( config.clientIndex )
      .pipe( wiredep() )
      .pipe( inject( gulp.src( config.customJS ), { relative: true } ) )
      .pipe( gulp.dest( config.client ) );
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
