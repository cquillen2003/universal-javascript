var Koa = require('koa');
var app = new Koa();

app.use(async ctx => {
	ctx.body = 'Hello World';
});

app.listen(3000);