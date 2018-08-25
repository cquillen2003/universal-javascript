import Router from 'koa-router';

var router = new Router();

router.get('/todos', async (ctx) => {
	try {
		var res = await ctx.db.query('SELECT * FROM todos');

		ctx.body = { ok: true, docs: res.rows };
	}
	catch (error) {
		console.log('Error caught in get /todos...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.post('/todos', async (ctx) => {
	try {
		console.log('post /todos...', ctx.request.body);
		var sql = `
			INSERT INTO todos (name, description)
			VALUES ($1, $2)
		`;
		var values = [ctx.request.body.name, ctx.request.body.description];

		var res = await ctx.db.query(sql, values);

		ctx.body = { ok: true, res: res };
	}
	catch (error) {
		console.log('Error caught in post /todos...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.put('/todos', async (ctx) => {
	try {
		//TODO
		ctx.body = { ok: true, res: 'TBD' };
	}
	catch (error) {
		console.log('Error caught in put /todos...', error);
		ctx.status = 500;
		ctx.body = { ok: true };
	}
});

export default router;