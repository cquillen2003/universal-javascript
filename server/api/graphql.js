import Router from 'koa-router';
import { readFile } from 'fs';
import { makeExecutableSchema, assertResolveFunctionsPresent } from 'graphql-tools';
import { graphql } from 'graphql';
import authorize from '../middleware/authorize';
import resolvers from '../graphql/resolvers/index';

var router = new Router();

var schema;

readFile(__dirname + '/../graphql/schema.gql', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}
	console.log(data);
	schema = makeExecutableSchema({
		typeDefs: data,
		resolvers: resolvers
	});

	//Test graphql
	graphql(schema, '{ hello }', null, {}).then(res => {
		console.log(res);
	});
});

router.use(authorize());

router.post('/graphql', async (ctx) => {
	console.log('/graphql route...', ctx.request.body);

	var query = `{
		appointments {
			job {
				number
				customer {
					name
				}
				job_address {
					street
				}
			}
			start_time
			duration
		}
		resources {
			name
		}
	}`;

	var result = await graphql(schema, query, null, {
		db: ctx.db,
		session: ctx.state.session
	});

	ctx.body = { ok: true, ...result };
});

export default router;