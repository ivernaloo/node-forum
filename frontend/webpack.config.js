const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3002',
    'webpack/hot/only-dev-server',
    './entry.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot','babel']
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf$/,
      loader: "file-loader"
    }, {
      test: /\.eot$/,
      loader: "file-loader"
    }, {
      test: /\.svg$/,
      loader: "file-loader"
    }, {
      test: /\/bootstrap\/js\//,
      loader: 'imports?jQuery=jquery'
    }]
  },
  devServer: {
    contentBase: __dirname,
    port: 3002,
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    hot: true
    // proxy: {
    //   '*': 'http://127.0.0.1:3001',
    // }
  },
  babel: {
    presets: ['react', 'es2015']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
