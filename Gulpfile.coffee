browserSync = require('browser-sync').create()
del = require 'del'
gulp = require 'gulp'
jshint = require 'gulp-jshint'
jscs = require 'gulp-jscs'
concat = require 'gulp-concat'
inject = require 'gulp-inject'
sass = require 'gulp-sass'
sourcemaps = require 'gulp-sourcemaps'
Server = require('karma').Server
stylish = require 'gulp-jscs-stylish'
runSequence = require 'run-sequence'

wiredep = require('wiredep')()

gulp.task 'default', (done) ->
  runSequence(
    'default-1:clean-build-folder',
    'default-2:vet-javascript-files',
    'default-3:copy-all-src-except-scss-to-build',
    'default-4:sass-all-stylesheets',
    'default-5:concat-all-bower-css-into-one-file',
    'default-6:concat-all-bower-js-into-one-file',
    'default-7:inject-deps-into-index',
    'default-8:start-server',
    [
      'monitor-sass',
      'monitor-html',
      'monitor-js'
    ],
    done
  )

gulp.task 'default-1:clean-build-folder', () ->
  del ['build']


gulp.task 'default-2:vet-javascript-files', () ->
  gulp.src [
      'src/**/*.js',
      '!src/components/**/*.*'
    ]
  .pipe jshint()
  .pipe jscs()
  .on 'error', () ->
    console.log 'Fix your JS!'
  .pipe stylish.combineWithHintResults()
  .pipe jshint.reporter('jshint-stylish')

gulp.task 'default-3:copy-all-src-except-scss-to-build', () ->
  gulp.src [
    'src/**/*',
    '!**/*.scss'
  ]
    .pipe gulp.dest 'build'

gulp.task 'default-4:sass-all-stylesheets', () ->
  sassOptions =
    includePaths : [
      'src/components/foundation-sites/scss/'
    ]
  gulp.src ['./src/stylesheets/app.scss']
    .pipe sourcemaps.init()
    .pipe sass(sassOptions).on 'error', sass.logError
    .pipe sourcemaps.write()
    .pipe gulp.dest 'build/assets/stylesheets/'
    .pipe browserSync.stream()

gulp.task 'default-5:concat-all-bower-css-into-one-file', () ->
  gulp.src wiredep.css or []
    .pipe concat 'bower-styles.css'
    .pipe gulp.dest 'build/assets/stylesheets'

gulp.task 'default-6:concat-all-bower-js-into-one-file', () ->
  return gulp.src wiredep.js
    .pipe concat 'bower-scripts.js'
    .pipe gulp.dest 'build/assets/scripts'

gulp.task 'default-7:inject-deps-into-index', () ->
  depsToInject = [
    'build/assets/scripts/bower-scripts.js'
    'build/app.js'
    'build/assets/stylesheets/bower-styles.css'
    'build/**/*.module.js'
    'build/**/*'
    '!build/**/*.spec.js'
    '!build/components/**/*.*'
  ]
  gulp.src 'build/index.html'
    .pipe inject(gulp.src(depsToInject, read: false), relative: true)
    .pipe gulp.dest 'build'
    .pipe browserSync.stream()

gulp.task 'default-8:start-server', () ->
  initConfig =
    server:
      baseDir: './build'
  browserSync.init initConfig

gulp.task 'heroku', (done) ->
  runSequence(
    'default-1:clean-build-folder',
    'default-2:vet-javascript-files',
    'default-3:copy-all-src-except-scss-to-build',
    'default-4:sass-all-stylesheets',
    'default-5:concat-all-bower-css-into-one-file',
    'default-6:concat-all-bower-js-into-one-file',
    'default-7:inject-deps-into-index',
    done
  )


gulp.task 'monitor-sass', () ->
  gulp.watch ['src/**/*.scss'], ['default-4:sass-all-stylesheets']


gulp.task 'monitor-html', () ->
  gulp.watch ['src/**/*.html', '!src/components/**/*.*'], [ 'refresh' ]

gulp.task 'monitor-js', () ->
  gulp.watch ['src/**/*.js', '!src/components/**/*.*'], ['refresh' ]

gulp.task 'refresh', (done) ->
  runSequence(
    'default-1:clean-build-folder',
    'default-2:vet-javascript-files',
    'default-3:copy-all-src-except-scss-to-build',
    'default-4:sass-all-stylesheets',
    'default-5:concat-all-bower-css-into-one-file',
    'default-6:concat-all-bower-js-into-one-file',
    'default-7:inject-deps-into-index',
    done
  )

gulp.task 'test', ['default-6:concat-all-bower-js-into-one-file'], (done) ->
  serverConfig =
    configFile: __dirname + '/karma.conf.js',
    singleRun: true

  new Server serverConfig
  .on 'run_complete', (browser, results) ->
    if results.failed
      return done 1
    done()
  .start()

gulp.task 'ci', (done) ->
  runSequence 'refresh', 'test', done
