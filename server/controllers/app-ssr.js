import Router from 'koa-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import 'ignore-styles';
import AppDesktop from '../views/apps/desktop/component';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';
import rootReducer from '../../src/reducers/app';
import couch from '../../src/services/couch';
import loadDocs from '../../src/actions';

var router = new Router();

router.use(authorize());

router.get('/app/*', ctx => {
	console.log('/app/* route for server-side rendering...');

	couch.setUrl('/some-couch-url');
	loadDocs();

	var dir = process.env.NODE_ENV === 'production' ? '../../dist' : '../../tmp';
	var manifest = require(dir + '/manifest.json');

	var store = createStore(rootReducer);

	store.dispatch({ type: 'LOAD_DOCS', payload: { docType: 'todo', docs: [ { _id: '1', name: 'Sample todo' }] } });

	console.log('State is', store.getState());

	var body, props;

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
		body = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter basename="/app" location={ctx.url} context={{}}>
					<AppDesktop/>
				</StaticRouter>
			</Provider>
		);
		//body = '<p>Loading...</p>';

		props = {
			title: 'Universal JS Desktop',
			body: body,
			styles: manifest['desktop.css'],
			scripts: manifest['desktop.js']
		};
	}
	
	ctx.body = createDocument(props);
});

export default router;