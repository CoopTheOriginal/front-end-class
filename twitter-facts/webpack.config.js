const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devServer: {
    contentBase: path.resolve(__dirname, './src')
  },
  entry: ['./app.js', './scss/base.scss'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new webpack.IgnorePlugin(/ajv/),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      }
    ]
  },
};
