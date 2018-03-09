const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const commons = {
  context: path.join(__dirname, 'lib'),
  entry: './index.js',
  output: {
    globalObject: 'this',
    library: [ 'mysam', 'core' ],
    libraryTarget: 'umd',
    filename: 'mysam-core.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(@feathersjs|mysam|feathers))/,
      loader: 'babel-loader'
    }, {
      test: path.resolve(__dirname, 'node_modules/webworker-threads/index.js'),
      use: 'null-loader'
    }]
  },
  node: {
    fs: 'empty'
  }
};

const dev = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3030,
    contentBase: '.',
    compress: true
  }
};

const production = {
  mode: 'production',
  output: {
    filename: 'mysam-core.min.js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

module.exports = merge(commons, env !== 'development' ? production : dev);
