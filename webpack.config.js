var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = env => {

	var devtool, plugins, dir;
	
	if (env === 'production') {
		devtool = 'source-map';
		plugins = [
			new CleanWebpackPlugin(['dist']),
			new UglifyJSPlugin({ sourceMap: true }),
			new ManifestPlugin()
		];
		dir = 'dist';
	}
	else {
		devtool = 'cheap-module-eval-source-map';
		plugins = [
			new CleanWebpackPlugin(['tmp']),
			new ManifestPlugin()
		];
		dir = 'tmp';
	}

	return {
		entry: {
			mobile: './server/views/apps/mobile/index.js',
			desktop: './server/views/apps/desktop/index.js',
			login: './server/views/pages/login/index.js'
		},
		devtool: devtool,
		module: {
			rules: [
				{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
				{ test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] },
				{ test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] }
			]
		},
		plugins: plugins,
		output: {
			filename: '[name].bundle.[chunkhash].js',
			path: path.resolve(__dirname, dir)
		}
	}
};