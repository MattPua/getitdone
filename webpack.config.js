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
        loader: ExtractTextPlugin.extract("css!sass")
        // loaders:['style','css','sass']
      },
      {
        test:   /\.html/,
        loader: 'html',
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      }, 
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      }, 
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: "file-loader"
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: 'react'
    })
    // new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;