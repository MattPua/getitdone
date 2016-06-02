var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');


var config = {
  entry: [
  APP_DIR + '/app.js',
  'webpack-dev-server/client?http://0.0.0.0:8080', //WebpackDevServer host and port
  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loaders: ['react-hot'],
        include : APP_DIR, // What directory to look for extensions
        loader : 'babel'
      },
      { 
        test: /\.scss$/, 
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader","sass-loader")
        loaders:['style','css','sass']
      },
      {
        test:   /\.html/,
        loader: 'html',
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin("style.css", { allChunks: true })
    // new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;