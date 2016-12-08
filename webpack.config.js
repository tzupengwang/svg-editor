const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.styl$/,
      loaders: ['style', 'css', 'stylus?paths=node_modules/bootstrap-stylus/stylus/'],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=src/fonts/[name].[ext]',
    },
    ],
  },
};
