import Router from 'koa-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import 'ignore-styles';
import AppDesktop from '../views/apps/desktop/component';
import createDocument from '../views/layouts/index.html';
import authorize from '../middleware/authorize';
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

		body = ReactDOMServer.renderToString(<AppDesktop/>);
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