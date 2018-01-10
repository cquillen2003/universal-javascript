import Router from 'koa-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import 'ignore-styles';
import AppDesktop from '../views/apps/desktop/component';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';
import rootReducer from '../../src/reducers/app';
import couch from '../../src/services/couch';
import { fetchDocs } from '../../src/actions';

var router = new Router();

router.use(authorize());

router.get('/app/*', async (ctx) => {
	console.log('/app/* route...');

	var dir = process.env.NODE_ENV === 'production' ? '../../dist' : '../../tmp';
	var manifest = require(dir + '/manifest.json');

	var store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

	var couchURL = 'https://' + process.env.COUCH_DB_HOST + '/' + 'universal'; //TODO: Use user's db name

	couch.create(couchURL);

	var context, body, props;

	if (ctx.userAgent.isMobile) {

		body = '<p>Loading...</p>';

		props = {
			title: 'Universal JS Mobile',
			body: body,
			styles: manifest['mobile.css'],
			scripts: manifest['mobile.js']
		};
	}
	else {

		//body = '<p>Loading...</p>';

		context = { fetchers: [] };

		//Initial render to get fetchData methods via context
		var start = Date.now();
		ReactDOMServer.renderToStaticMarkup(
			<Provider store={store}>
				<StaticRouter basename="/app" location={ctx.url} context={context}>
					<AppDesktop/>
				</StaticRouter>
			</Provider>
		);
		var time = Date.now() - start;
		console.log(time + ' ms to render!');

		var promises = [];
		context.fetchers.forEach(fetcher => {
			promises.push(fetcher(store.dispatch));
		});

		await Promise.all(promises);

		context = { fetchers: [] };
		
		body = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter basename="/app" location={ctx.url} context={context}>
					<AppDesktop/>
				</StaticRouter>
			</Provider>
		);

		props = {
			title: 'Universal JS Desktop',
			body: body,
			styles: manifest['desktop.css'],
			state: store.getState(),
			host: process.env.COUCH_DB_HOST,
			db: 'universal',
			scripts: manifest['desktop.js']
		};
	}
	
	ctx.body = createDocument(props);
});

export default router;