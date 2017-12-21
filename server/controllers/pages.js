import Router from 'koa-router';
import createDocument from '../views/layouts/index.html';

var router = new Router();

router.get('/login', ctx => {
	console.log('/login route...');
	ctx.body = createDocument({ bundle: 'login.bundle.js' });
});

export default router;