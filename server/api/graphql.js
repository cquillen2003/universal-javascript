import Router from 'koa-router';
import { readFile } from 'fs';
import { graphql, buildSchema } from 'graphql';
import authorize from '../middleware/authorize';
import root from '../graphql/resolvers/index';

var router = new Router();

var schema;

readFile(__dirname + '/../graphql/schema.gql', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}
	console.log(data);
	schema = buildSchema(data);

	//Test graphql
	graphql(schema, '{ hello }', root).then(res => {
		console.log(res);
	});
});

router.use(authorize());

router.post('/graphql', async (ctx) => {
	console.log('/graphql route...', ctx.request.body);

	var query = `{
		appointments {
			start_time
			duration
		}
	}`;

	var result = await graphql(schema, query, root, {
		db: ctx.db,
		session: ctx.state.session
	});

	ctx.body = { ok: true, data: result };
});

export default router;