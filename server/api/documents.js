import Router from 'koa-router';
import authorize from '../middleware/authorize';

var router = new Router();

router.use(authorize());

router.get('/documents/:collection', async (ctx) => {
	try {
		var query = { company_id: ctx.state.session.company_id };
		var res = await ctx.db.collection(ctx.params.collection).find(query).toArray();

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
		var doc = {
			company_id: ctx.state.session.company_id,
			...ctx.request.body
		};
		var res = await ctx.db.collection(ctx.params.collection).insertOne(doc);

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