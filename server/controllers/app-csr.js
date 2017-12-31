import Router from 'koa-router';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';

var router = new Router();

router.use(authorize());

router.get('/app/*', ctx => {
	console.log('/app/* route for client-side rendering...');

	var dir = process.env.NODE_ENV === 'production' ? '../../dist' : '../../tmp';
	var manifest = require(dir + '/manifest.json');

	if (ctx.userAgent.isMobile) {
		ctx.body = createDocument({ 
			title: 'Universal JS Mobile',
			body: '<p>Loading...</p>',
			styles: manifest['mobile.css'],
			scripts: manifest['mobile.js']
		});
	}
	else {
		ctx.body = createDocument({ 
			title: 'Universal JS Desktop',
			body: '<p>Loading...</p>',
			styles: manifest['desktop.css'], 
			scripts: manifest['desktop.js']
		});
	}
	
});

export default router;