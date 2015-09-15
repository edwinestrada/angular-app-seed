(function() {
  'use strict';

  var browserSync = require('browser-sync');
  var concat = require('gulp-concat');
  var del = require('del');
  var gulp = require('gulp');
  var inject = require('gulp-inject');
  var jshint = require('gulp-jshint');
  var jscs = require('gulp-jscs');
  var nodemon = require('gulp-nodemon');
  var runSequence = require('run-sequence');
  var sass = require('gulp-sass');
  var stylish = require('gulp-jscs-stylish');
  var wiredep = require('wiredep').stream;

  var config = require('./config.js');

  gulp.task('build', ['clean'], function(){
    return gulp
      .src( config.buildComponents )
      .pipe( gulp.dest( config.client ) );
  });

  gulp.task('ci', function ( done ) {
    return runTests( true, done );
  });

  gulp.task('clean', function(){
    return del([ config.client ]);
  });

  gulp.task('compile:js', function( done ){
    runSequence(
      'build',
      'inject',
      done
    );
  });

  gulp.task('default', function ( done ) {
    runSequence(
      'inject',
      'server',
      [
        'tdd',
        'monitor:html',
        'monitor:js',
        'monitor:styles'
      ],
      done
    );
  });

  gulp.task('heroku', function ( done ) {
    runSequence(
      'inject',
      done
    );
  });

  gulp.task('inject', ['sass'], function(){
    return gulp
      .src( config.clientIndex )
      .pipe( wiredep() )
      .pipe(
        inject(
          gulp.src(
            config.allClient
          ),
          { relative: true }
        )
      )
      .pipe( gulp.dest( config.client ) );
  });

  gulp.task('monitor:js', function(){
    return gulp.watch( config.srcJS, ['vet', 'compile:js'] );
  });

  gulp.task('monitor:styles', function(){
    gulp.watch( 'src/**/*.scss', ['inject'] );
  });

  gulp.task('monitor:html', function(){
    return gulp.watch( config.srcHTML, ['inject'] );
  });

  gulp.task('sass', ['build'], function(){
    return gulp
    .src( config.mainSass )
    .pipe( sass() )
    .pipe( gulp.dest( config.clientStyles ) );
  });

  gulp.task('server', ['inject'], function(){
    var nodemonOptions = {
      script: config.nodeServer,
      delay: 1,
      watch: ['src/']
    };
    return nodemon( nodemonOptions )
      .on('start', function(){
        startBrowserSync( browserSync );
      })
      .on('restart', function(){
        setTimeout(
          function () {
            browserSync.notify('reloading now...');
            browserSync.reload({reload: false});
          },
          config.browserReloadDelay
        );
      });
  });

  gulp.task('tdd', function ( done ) {
    //TODO work on this guy
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
    var Server = require('karma').Server;
    var testingServer = new Server(
      {
        configFile: __dirname + '/karma.conf.js',
        exclude: [],
        singleRun: singleRun
      },
      karmaCompleted
    );
    testingServer.start();

    function karmaCompleted ( karmaResult ) {
      //TODO make sense out of and fix this guy
      console.log(karmaResult);
      //karmaResult will be 1 if error
      return karmaResult === 0 ?
      done():
      done('Tests failed, this is custom');
    }
  }

  function startBrowserSync( browserSync ) {
    var options = {
      proxy: 'localhost:' + 1738,
      port: 3000,
      files: config.allClient,
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'gulp',
      notify: true,
      reloadDelay: config.browserReloadDelay
    };

    return browserSync.active ? null :
    (
      console.log( 'Starting browser sync...'),
      browserSync( options )
    );
  }



}());
