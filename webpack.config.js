'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry:  {
    application: [
      path.resolve(__dirname, 'application', 'assets', 'sass', 'index.sass'),
      path.resolve(__dirname, 'application', 'assets', 'js', 'index.js'),
    ]
  },
  output: {
    path: path.resolve(__dirname, 'application', 'static'),
    publicPath: '../',
    filename: '[name]/[name].js'
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    root: path.resolve(__dirname, 'assets'),
    alias: {
      _fonts: 'fonts',
      _images: 'images',
      _scss: 'scss',
      _js: 'js',
    },
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {presets: ['es2015']}
    }, {
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif|svg)$/,
      loader: 'url?name=[name]/[hash].[ext]&limit=5000',
    }, {
      test: /\.(css|sass)$/,
      loader: ExtractTextPlugin.extract('css!postcss-loader?sass?sourceMap&indentedSyntax'),
    }],
  },

  postcss: [
    autoprefixer({
      browsers: "last 3 versions"
    })
  ],

  debug: true,

  watch: true,

  devtool: 'source-map',

  plugins: [
    // new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]/[name].css', {allChunks: true}),
    new AssetsPlugin({
      filename: 'static.json',
      path: path.resolve(__dirname, 'static'),
      update: true,
      prettyPrint: true,
    }),
  ]
};