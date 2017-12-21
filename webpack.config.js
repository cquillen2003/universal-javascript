var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {

	var plugins, dir;
	
	if (env === 'production') {
		plugins = [
			new UglifyJSPlugin()
		];
		dir = 'dist';
	}
	else {
		plugins = [];
		dir = 'tmp';
	}

	return {
		entry: {
			app: './src/index.js',
			login: './server/pages/login/index.js'
		},
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