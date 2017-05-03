var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    publicPath: "/assets/",
    path: __dirname + "/../public/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader'
      }
    ]
  }
};
