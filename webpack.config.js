var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

	var devtool, plugins, dir;
	
	if (env === 'production') {
		devtool = 'source-map';
		plugins = [
			new CleanWebpackPlugin(['dist']),
			new UglifyJSPlugin({ sourceMap: true })
		];
		dir = 'dist';
	}
	else {
		devtool = 'cheap-module-eval-source-map';
		plugins = [
			new CleanWebpackPlugin(['tmp'])
		];
		dir = 'tmp';
	}

	return {
		entry: {
			app: './src/index.js',
			login: './server/pages/login/index.js'
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
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, dir)
		}
	}
};