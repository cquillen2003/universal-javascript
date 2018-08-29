import Router from 'koa-router';
import authorize from '../middleware/authorize';

/*
TBD if I decide to test PostgreSQL beyond the GraphQL end-point
*/

var router = new Router();

router.use(authorize());

router.get('/jobs', async (ctx) => {
	try {
		var sql = `
			SELECT * FROM todos
			WHERE company_id = $1::int
		`;
		var values = [ctx.state.session.company_id];

		//var res = await ctx.db.query(sql, values);

		ctx.body = { ok: true, docs: [] };
	}
	catch (error) {
		console.log('Error caught in get /todos...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.post('/jobs', async (ctx) => {
	try {
		console.log('post /jobs...', ctx.request.body);
		var sql = `
			INSERT INTO todos (name, company_id, description)
			VALUES ($1, $2, $3)
		`;
		var values = [ctx.request.body.name, ctx.state.session.company_id, ctx.request.body.description];

		//var res = await ctx.db.query(sql, values);

		ctx.body = { ok: true, res: 'TBD' };
	}
	catch (error) {
		console.log('Error caught in post /todos...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}
});

router.put('/jobs', async (ctx) => {
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