const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Import development configuration
const configuration = require('./webpack.config');

// Plugins
configuration.plugins = configuration.plugins.concat([
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new ExtractTextPlugin('[name].css'),
  new FaviconsWebpackPlugin({
    logo: './src/assets/favicon.png',
    background: 'transparent',
    prefix: '',
  }),
]);

// Rules
let rules = configuration.module.rules;
rules = rules.map(function (rule) {
  if (rule.test.toString() === /\.scss$/.toString()) {
    rule.use = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        },
      ]
    })
  }
  return rule;
});

// Devtools
configuration.devtool = 'cheap-module-source-map';
configuration.output.publicPath = '/likeometer-redux/';
module.exports = configuration;