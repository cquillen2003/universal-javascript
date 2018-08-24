var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');

/*
TODO: Re-add SWPrecacheWebpackPlugin to generate service-worker.js file
or try WorkboxPlugin as recommended in webpack's documentation on PWAs
*/


module.exports = (env) => {

	//Shared variables for public and private builds
	var directory = env.production ? 'build' : 'tmp';

	var rules = [
		{ 
			test: /\.js$/, 
			exclude: /node_modules/, 
			use: ['babel-loader'] 
		},
		{ 
			test: /\.css$/,
			//exclude: /node_modules/, 
			use: [MiniCssExtractPlugin.loader, 'css-loader']
		},
		{ 
			test: /\.scss$/, 
			exclude: '/node_modules/', 
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
		},
		{ 
			test: /\.(png|svg|jpg|gif)$/, 
			use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }] 
		},
		{ 
			test: /\.(woff|woff2|eot|ttf|otf)$/, 
			use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }] 
		}
	];

	var plugins = [
		new MiniCssExtractPlugin({
			filename: env.production ? '[name].[chunkhash].css' : '[name].css',
		}),
		new ManifestPlugin()
	];

	//Config settings for building public assets
	var public = {
		mode: env.production ? 'production' : 'development',
		devtool: env.production ? 'source-map': 'eval',
		entry: {
			login: ['babel-polyfill', './server/views/pages/login/index.js']
		},
		output: {
			path: path.resolve(__dirname, 'public/' + directory),
			filename: env.production ? '[name].[chunkhash].js' : '[name].js'
		},
		module: {
			rules: rules
		},
		plugins: [
			new CleanWebpackPlugin(['public/' + directory]),
			...plugins
		]
	};

	//Config settings for building private assets
	var private = {
		mode: env.production ? 'production' : 'development',
		devtool: env.production ? 'source-maps': 'eval',
		entry: {
			mobile: ['babel-polyfill', './server/views/apps/mobile/index.js'],
			desktop: ['babel-polyfill', './server/views/apps/desktop/index.js']
		},
		output: {
			path: path.resolve(__dirname, 'dist/' + directory),
			filename: env.production ? '[name].[chunkhash].js' : '[name].js'
		},
		module: {
			rules: rules
		},
		plugins: [
			new CleanWebpackPlugin(['dist/' + directory]),
			...plugins
		]
	};

	return [public, private];
};