const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

var BUILD_DIR = path.resolve(__dirname, 'client/dist');
var APP_DIR = path.resolve(__dirname, 'client/src');

var config = {
  entry: './client/src/productionView.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle-prod.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
      }
    ]
  },
  plugins: [
    new Dotenv()
  ],
}


module.exports = config;
