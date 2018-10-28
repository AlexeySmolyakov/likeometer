const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',

  entry: [
    './src/index.js',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash:5].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:5].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:5].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),
  ],

  watchOptions: {
    aggregateTimeout: 300,
  },

  devServer: {
    hot: true,
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: true,
  },

  externals: {
    VK: 'VK',
  },
};