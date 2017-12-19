require('dotenv').config();

var Koa = require('koa');
var app = new Koa();

var serve = require('koa-static');

var createDocument = require('./index.html');

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('Koa app.env:', app.env);

var dir = process.env.NODE_ENV === 'production' ? '/../public' : '/../tmp';

app.use(serve(__dirname + dir));

app.use(async ctx => {
	ctx.body = createDocument({});
});

//Use process.env.PORT on Heroku
app.listen(process.env.PORT || 3000);