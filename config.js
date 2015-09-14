var src = 'src/';
var client = 'build/';
module.exports = {
  allJS: [
    './Gulpfile.js',
    src + '**/*.js'
  ],
  //TODO: define this
  mainSass: '',
  index: src + 'index.html',
  buildComponents: [
    src + '**/*.module.js',
    src + '**/*',
    '!' + src + '**/*.spec.js'
  ],
  client: client,
  clientIndex: client + 'index.html',
  customJS: client + '**/*.js'
};
