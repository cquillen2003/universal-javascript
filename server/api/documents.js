import Router from 'koa-router';

var router = new Router();

router.get('/documents/:collection', async (ctx) => {
	try {
		var res = await ctx.db.collection(ctx.params.collection).find({}).toArray();

		ctx.body = { ok: true, docs: res };
	}
	catch (error) {
		console.log('Error caught in get /documents...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.post('/documents/:collection', async (ctx) => {
	try {
		var res = await ctx.db.collection(ctx.params.collection).insertOne(ctx.request.body);

		ctx.body = { ok: true, res: res };
	}
	catch (error) {
		console.log('Error caught in post /documents...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.put('/documents/:collection', async (ctx) => {
	try {
		var doc = ctx.request.body;
		console.log('Doc is', doc);
		var res = await ctx.db.collection(ctx.params.collection).replaceOne({ _id: doc._id }, doc);

		ctx.body = { ok: true, res: res };
	}
	catch (error) {
		console.log('Error caught in put /documents...', error);
		ctx.status = 500;
		ctx.body = { ok: true };
	}
});

export default router;