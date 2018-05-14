import Router from 'koa-router';

var router = new Router();

router.post('/documents', async (ctx) => {
	try {
		var res = await ctx.db.collection('todos').insertOne(ctx.request.body);

		ctx.body = { ok: true, res: res };
	}
	catch (error) {
		console.log('Error caught in post /documents...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.get('/documents', async (ctx) => {
	try {
		var res = await ctx.db.collection('todos').find({}).toArray();

		ctx.body = { ok: true, docs: res };
	}
	catch (error) {
		console.log('Error caught in get /documents...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

export default router;