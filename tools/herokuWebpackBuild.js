import webpack from 'webpack';
import moment from 'moment';
import chalk from 'chalk';

import prodConfig from '../webpack.config.prod';

let bundler = webpack(prodConfig);

bundler.run((err, stats) => {
  if (err) {
    console.warn(err);
    return process.exit(1);
  }

  let currentTime = moment().format('MM-DD, h:mm:ssA');

  if (stats.hasErrors()) {
    let firstError = stats.toJson("errors-only").errors[0];
    console.warn(`${chalk.red(currentTime)}:`, firstError);
    return process.exit(1);
  }


  console.log(`${chalk.green(currentTime)}: All good!`);
  return process.exit(0);
});