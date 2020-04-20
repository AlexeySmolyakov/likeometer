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

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 153600,
      maxSize: 307200,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
      favicon: './src/assets/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:5].css',
      chunkFilename: '[id].css',
    }),
  ],

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

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
