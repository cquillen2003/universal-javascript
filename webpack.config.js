var path = require('path');

module.exports = env => {

	console.log('Env in webpack.config.js:', env);

	var dir = env === 'production' ? 'dist' : 'tmp';

	return {
		entry: './src/index.js',
		module: {
			rules: [
				{ test: /\.js$/, include: path.resolve(__dirname, 'src'), loader: 'babel-loader' },
				{ test: /\.css$/, include: path.resolve(__dirname, 'src'), use: ['style-loader', 'css-loader'] },
				{ test: /\.scss$/, include: path.resolve(__dirname, 'src'), use: ['style-loader', 'css-loader', 'sass-loader'] }
			]
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, dir)
		}
	}
};