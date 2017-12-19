var path = require('path');

module.exports = env => {

	console.log('Env in webpack.config.js:', env);

	var dir = env === 'production' ? 'dist' : 'tmp';

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
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, dir)
		}
	}
};