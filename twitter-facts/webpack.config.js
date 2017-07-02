const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devServer: {
    contentBase: path.resolve(__dirname, './src')
  },
  entry: {
    app: './app.js'
  },
  // target: "node-webkit",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new webpack.IgnorePlugin(/ajv/)
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true
  }
  // "module": {
  //       "loaders": [{
  //           "test": /\.json$/,
  //           "loader": "json"
  //       }]
  //   }
};
