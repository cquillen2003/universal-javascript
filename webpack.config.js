var path = require('path');

module.exports = env => {

	console.log('Env in webpack.config.js:', env);

	var dir = env === 'production' ? 'dist' : 'tmp';

	return {
		entry: './src/index.js',
		module: {
			rules: [
				{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
			]
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, dir)
		}
	}
};