import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '../../../../src/reducers/app';
import AppDesktop from './component';
import couch from '../../../../src/services/couch';

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
			<AppDesktop/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);