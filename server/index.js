require('babel-register');
require('dotenv').config();

var Koa = require('koa');
var app = new Koa();

var serve = require('koa-static');

var createDocument = require('./index.html').default;

var dir = process.env.NODE_ENV === 'production' ? '/../dist' : '/../tmp';

var pages = require('./routes/pages').default;

app.use(serve(__dirname + dir));

app.use(pages.routes(), pages.allowedMethods());

app.use(async ctx => {
	ctx.body = createDocument({ bundle: 'app.bundle.js' });
});

//Use process.env.PORT on Heroku
app.listen(process.env.PORT || 3000);