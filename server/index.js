require('babel-polyfill');
require('babel-register');
require('dotenv').config();

var Koa = require('koa');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var userAgent = require('koa-useragent');

var connect = require('../db').default;

var authorize = require('./middleware/authorize').default;
var pages = require('./controllers/pages').default;
var sessions = require('./api/sessions').default;
var spa = require('./controllers/app').default;
var documents = require('./api/documents').default;
var events = require('./api/events').default;
var jobs = require('./api/jobs').default;
var graphql = require('./api/graphql').default;

var app = new Koa();

//Apply middleware
app.use(bodyParser());
app.use(userAgent);

//Public assets
var dir = process.env.NODE_ENV === 'production' ? 'build' : 'tmp';
app.use(serve(__dirname + '/../public/' + dir));
app.use(serve(__dirname + '/../public'));

//Connect database and add instance to ctx
connect().then(db => {
	app.context.db = db;
});

//Routes
app.use(pages.routes(), pages.allowedMethods());
app.use(sessions.routes(), sessions.allowedMethods());
app.use(spa.routes(), spa.allowedMethods());
app.use(documents.routes(), documents.allowedMethods());
app.use(events.routes(), events.allowedMethods());
app.use(jobs.routes(), jobs.allowedMethods());
app.use(graphql.routes(), graphql.allowedMethods());

//Private assets
app.use(authorize());
var dir = process.env.NODE_ENV === 'production' ? 'build' : 'tmp';
app.use(serve(__dirname + '/../dist/' + dir));

//Use process.env.PORT on Heroku
app.listen(process.env.PORT || 3000);