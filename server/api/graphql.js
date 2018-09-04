import Router from 'koa-router';
import { readFile } from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import authorize from '../middleware/authorize';
import resolvers from '../graphql/resolvers/index';

var router = new Router();

var schema;

readFile(__dirname + '/../graphql/schema.graphql', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}
	schema = makeExecutableSchema({
		typeDefs: data,
		resolvers: resolvers
	});
});

router.use(authorize());

router.post('/graphql', async (ctx) => {
	console.log('/graphql route...', ctx.request.body);

	var query = ctx.request.body.query;
	var variables = ctx.request.body.variables;

	var result = await graphql(schema, query, null, { db: ctx.db, session: ctx.state.session }, variables);

	console.log('/graphql route result....', result);

	ctx.body = { ok: true, ...result };
});

export default router;