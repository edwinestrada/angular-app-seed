var src = 'src/';
var client = 'build/';
module.exports = {
  allJS: [
    // './Gulpfile.js',
    src + '**/*.js'
  ],
  allClient: client + '**/*',
  allSrc: src + '**/*',
  browserReloadDelay: 1500,
  buildComponents: [
    src + '**/*.module.js',
    src + '**/*.*',
    '!' + src + '**/*.spec.js'
  ],
  clientCSS: client + '**/*.css',
  clientJS: client + '**/*.js',
  client: client,
  clientIndex: client + 'index.html',
  clientStyles: client + 'stylesheets/',
  index: src + 'index.html',
  mainSass: src + 'stylesheets/app.scss',
  nodeServer: 'server.js',
  srcHTML: src + '**/*.html',
  srcJS: src + '**/*.js'
};
