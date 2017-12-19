var Koa = require('koa');
var app = new Koa();

var serve = require('koa-static');

var createDocument = require('./index.html');

app.use(serve(__dirname + '/../public'));

app.use(async ctx => {
	ctx.body = createDocument({});
});

app.listen(3000);