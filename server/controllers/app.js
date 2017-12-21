import Router from 'koa-router';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';

var router = new Router();

router.use(authorize());

router.get('/app/*', ctx => {
	console.log('/app/* route...');

	ctx.body = createDocument({ bundle: 'app.bundle.js' });
});

export default router;