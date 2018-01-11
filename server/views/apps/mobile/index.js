import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import couch from '../../../../src/services/couch';
import rootReducer from '../../../../src/reducers/app';
import AppMobile from './component';

var couchURL = 'https://' + window.__DB_HOST__ + '/' + window.__DB_NAME__;
delete window.__DB_HOST__;
delete window.__DB_NAME__;

couch.create(couchURL);

var state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

var store = createStore(rootReducer, state, applyMiddleware(thunkMiddleware));

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter basename="/app">
			<AppMobile/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);