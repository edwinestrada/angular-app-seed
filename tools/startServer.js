import webpack from 'webpack';
import config from '../webpack.config';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import moment from 'moment';
import chalk from 'chalk';

const bundler = webpack(config);
const watchOptions = {};

bundler.watch(watchOptions, (err, stats) => {
  if (err) {
    return console.warn(err);
  }

  let currentTime = moment().format('MM-DD, h:mm:ssA');

  if (stats.hasErrors()) {
    let firstError = stats.toJson("errors-only").errors[0];
    return console.warn(`${chalk.red(currentTime)}:`, firstError);
  }


  console.log(`${chalk.green(currentTime)}: All good!`);
});

browserSync({
  port: process.env.PORT || 3001,
  server: {
    baseDir: 'src'
  },
  middleware: [
    webpackDevMiddleware(bundler, {
      publicPath: config.output.publicPath,
      noInfo: false,
      quiet: false,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }),
    webpackHotMiddleware(bundler)
  ],
  files: [
    'src/**/*.{html,scss}'
  ]
});