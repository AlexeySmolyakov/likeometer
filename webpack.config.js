const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		application: './src/index.js',
	},

	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				]
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name]-[sha512:hash:base64:7].[ext]',
					},
				}],
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/pages/index.html',
			chunks: ['application']
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),
	],

	devtool: 'eval',

	watchOptions: {
		aggregateTimeout: 300
	},

	devServer: {
		hot: true,
		port: 8080,
		historyApiFallback: true
	},

	externals: {
		VK: 'VK',
	}
};