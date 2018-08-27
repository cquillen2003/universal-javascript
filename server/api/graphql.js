import Router from 'koa-router';
import { readFile } from 'fs';
import { graphql, buildSchema } from 'graphql';

var router = new Router();

var schema;

//Resolvers
var root = {
	hello: () => 'Hello world!'
};

readFile(__dirname + '/../graphql/schema.gql', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	}
	console.log(data);
	schema = buildSchema(data);

	//Test graphql
	graphql(schema, '{ hello }', root).then(res => {
		console.log(res);
	})
})

router.post('/graphql', async (ctx) => {
	console.log('/graphql route...', ctx.request.body);

	ctx.body = { ok: true, data: {} };
});

export default router;