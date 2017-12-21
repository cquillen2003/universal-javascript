import Router from 'koa-router';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';

var router = new Router();

router.use(authorize());

router.get('/app/*', ctx => {
	console.log('/app/* route...');

	if (ctx.userAgent.isMobile) {
		ctx.body = createDocument({ title: 'Universal JS Mobile', bundle: 'mobile.bundle.js' });
	}
	else {
		ctx.body = createDocument({ title: 'Universal JS Desktop', bundle: 'desktop.bundle.js' });
	}
	
});

export default router;