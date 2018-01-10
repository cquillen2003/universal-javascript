import Router from 'koa-router';
import createDocument from '../views/layouts/index.html';

var router = new Router();

router.get('/login', async (ctx) => {
	console.log('/login route...');

	var dir = process.env.NODE_ENV === 'production' ? '../../dist' : '../../tmp';
	var manifest = require(dir + '/manifest.json');

	ctx.body = createDocument({
		title: 'Universal JS Login',
		body: '<p>Loading...</p>',
		styles: manifest['login.css'],
		scripts: manifest['login.js']
	});
});

export default router;