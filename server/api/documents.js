import Router from 'koa-router';
import { MongoClient } from 'mongodb';

var url = 'mongodb://localhost:27017/myproject';
var dbName = 'myproject';

var router = new Router();

//Not sure if you are supposed to connect/close MongoDB connection on each request or not.
//Docs seem to suggest that you do.
router.post('/documents', async (ctx) => {
	try {
		console.log('/documents route...', ctx.request.body);

		var client = await MongoClient.connect(url);
		var db = client.db(dbName);
		var collection = 'todos';
		
		var res = await db.collection(collection).insertOne(ctx.request.body);

		ctx.body = { ok: true, res: res };
	}
	catch (error) {
		console.log('Error connecting to MongoDB...', error);
		ctx.status = 500;
		ctx.body = { error: error };
	}
});

export default router;