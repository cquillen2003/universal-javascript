import Router from 'koa-router';

var router = new Router();

router.post('/sessions', ctx => {
	console.log('/sessions route...', ctx.request.body);

	//User ID and password hard coded for seed project
	if (ctx.request.body.user === 'admin' && ctx.request.body.password === 'admin') {
		ctx.cookies.set('AuthToken', 'abc123');
		ctx.redirect('/app/home');
	}
	else {
		ctx.throw(401);
	}
	
});

export default router;