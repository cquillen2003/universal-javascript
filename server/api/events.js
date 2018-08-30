import Router from 'koa-router';
import { Readable, PassThrough } from 'stream';
import authorize from '../middleware/authorize';

/*
Push incoming text messages to client via Server Sent Events (SSE)
https://www.ibm.com/developerworks/library/wa-http-server-push-with-websocket-sse/
https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93
https://github.com/koajs/examples/tree/master/stream-server-side-events
https://devcenter.heroku.com/articles/request-timeout
*/

var router = new Router();

router.use(authorize());

router.get('/events', async (ctx) => {
	try {
		console.log('get /events.....', ctx.state);

		//Create readable (source) stream
		var stream = new Readable();

		//Work around for error message
		//TODO: Try creating the stream using the Simplified Constructor approach from the docs
		//See implementing a readable stream in the Node.js docs
		stream._read = function() {}; 

		//Test stream callback
		//TODO: Maybe add error handling callbacks
		/*
		stream.on('data', (chunk) => {
			console.log('Readable stream on data callback...\n\n');
		});
		*/

		//Write data to the readable (source) stream rightaway to avoid server timeout
		stream.push('data: ' + JSON.stringify({ operationType: 'ping' }) + '\n\n');

		//Simulate change events for testing
		setInterval(() => {
			var doc = { to: 'tbd', from: 'tbd', message: 'Sample incoming message' };
			var payload = { operationType: 'insert', doc: doc };

			stream.push('data: ' + JSON.stringify(payload) + '\n\n');
		}, 9000);

		ctx.set('Content-Type', 'text/event-stream');
		ctx.set('Cache-Control', 'no-cache');

		ctx.body = stream.pipe(PassThrough());
	}
	catch (error) {
		console.log('Error caught in get /events...', error);
		ctx.status = 500;
		ctx.body = { ok: false };
	}	
});

export default router;