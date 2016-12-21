import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
  entry: [
    'babel-polyfill',
    './src/app.module.js'
  ],
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  target: 'web',
  output: {
    path: `${__dirname}/src/`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("stylesheets/bundle.css")
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)?$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /(\.ttf|\.otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /(\.css|\.scss)$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      },
      {test: /\.(jpeg|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'}
    ]
  },
  sassLoader: {
    includePaths: `${__dirname}/node_modules/foundation-sites/scss`
  }
};