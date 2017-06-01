'use strict';

require('dotenv').config();
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

let plugins = [
    new HTMLPlugin({ template: `${__dirname}/app/index.html` }),
    new ExtractPlugin('bundle-[hash].css'),
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(process.env.NODE_ENV),
      __DEBUG__: JSON.stringify(!production),
    }),
];

if(production){
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new CleanPlugin(),
  ]);
};

module.exports = {
  plugins, 
  devtool: 'eval',
  entry: `${__dirname}/app/entry.js`,
  output: {
    filename: 'bundle-[hash].js',
    path: `${__dirname}/build`,
    publicPath: process.env.CDN_URL,
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(jpg|jpeg|tiff|bmp|gif|png|svg)$/,
        loader: 'url-loader?limit=60000&name=/image/[name].[ext]'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=60000&name=/image/[name].[ext]'
      },
    ],
  },
}
